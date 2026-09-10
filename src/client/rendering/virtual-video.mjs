import { UI_THEME as T } from "../../shared/ui-theme.mjs";
import { blockoutColor } from "../../shared/categories.mjs";
import { TAKE_LIMITS } from "../../shared/take-limits.mjs";
import * as THREE from "three";
import { createActorLayer } from "./actor-view.mjs";
import { doorTransform } from "../../shared/doors.mjs";
import { createHandLayer } from "../hand-view.mjs";
import { createCinemaLayer } from "./cinema-layer.mjs";
import { isRig, objectQuaternion } from "../../shared/cinema.mjs";
import { objectGeometry } from "../../shared/object-geometry.mjs";
import { objectGeometry as objectGeometry2 } from "../../shared/object-geometry.mjs";
import { createFloodLayer } from "./flood-layer.mjs";
import { HANDS_METADATA, validateHandsSample, validateHandsMetadata } from "../../shared/hand-frame.mjs";
function createVirtualScene(definition, matrix = new THREE.Matrix4()) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(T.background);
  const world = new THREE.Group();
  world.matrixAutoUpdate = false;
  world.matrix.copy(matrix);
  scene.add(world);
  scene.userData.definitionObjects = definition.objects;
  scene.userData.contentWorld = world;
  scene.userData.objectMeshes = /* @__PURE__ */ new Map();
  scene.userData.baseTransforms = definition.objects.filter((o) => !isRig(o)).map((o) => ({ id: o.id, position: [...o.position], rotation: o.rotation, quaternion: objectQuaternion(o) }));
  scene.add(new THREE.HemisphereLight("#ffffff", "#dce2ef", 2));
  const sun = new THREE.DirectionalLight("#ffffff", 0.9);
  sun.position.set(-10, 20, 12);
  scene.add(sun);
  const rim = new THREE.DirectionalLight("#ffffff", 0.4);
  rim.position.set(15, 8, -15);
  scene.add(rim);
  for (const o of definition.objects) {
    if (isRig(o)) continue;
    const mesh = new THREE.Mesh(objectGeometry(o), new THREE.MeshStandardMaterial({ color: blockoutColor(o, definition), roughness: o.roughness, metalness: o.metalness, opacity: 1, transparent: false }));
    mesh.name = o.id;
    mesh.position.fromArray(o.position);
    mesh.scale.fromArray(o.size);
    mesh.quaternion.fromArray(objectQuaternion(o));
    world.add(mesh);
    scene.userData.objectMeshes.set(o.id, mesh);
  }
  if (definition.objects.some((o) => isRig(o) || o.track)) {
    scene.userData.cinema = createCinemaLayer(world);
    scene.userData.cinema.sync(definition);
    scene.userData.cinema.frame(null);
  }
  if (definition.floods?.length) {
    scene.userData.flood = createFloodLayer(world, { getObjectPose: (id) => {
      const mesh = scene.userData.objectMeshes.get(id);
      return mesh ? { position: mesh.position.toArray(), quaternion: mesh.quaternion.toArray() } : null;
    } });
    scene.userData.flood.sync(definition);
    scene.userData.flood.frame({ states: [] }, { showRegions: false });
  }
  if (definition.objects.some((o) => o.kind === "light")) for (const light of scene.children.filter((o) => o.isLight)) light.intensity *= 0.18;
  applyRecordedTransforms(scene, (definition.doorEffects || []).map((d) => doorTransform(definition.objects.find((o) => o.id === d.objectId), d)));
  return scene;
}
function applyRecordedTransforms(scene, updates) {
  const overrides = new Map(updates.map((o) => [o.id, o]));
  for (const base of scene.userData.baseTransforms) {
    const o = overrides.get(base.id) || base, mesh = scene.userData.objectMeshes.get(base.id);
    if (!mesh) continue;
    mesh.position.fromArray(o.position);
    if (o.quaternion) mesh.quaternion.fromArray(o.quaternion);
    else mesh.rotation.set(0, o.rotation || 0, 0);
  }
}
function createVirtualRecorder({ onChange = () => {
}, upload, sink = null, now = () => performance.now(), assets = /* @__PURE__ */ new Map(), includeActorPreviews = () => false, contentFactory = null, Renderer = THREE.WebGLRenderer, Recorder = globalThis.MediaRecorder, makeCanvas = () => document.createElement("canvas") }) {
  let status = "idle", message = "B: start / stop camera recording", renderer, scene, camera, stream, recorder, chunks = [], bytes = 0, startTime = 0, endTime = 0, lastFrame = -Infinity, frames = 0, result = null, stopPromise = null, resolveStop, rejectStop, stopTimer, generation = 0, pendingUpload = null;
  let limitTimer, pumpTimer, stopReason = "user", storageError = null;
  let content = null, actors = null, hands = null, timeline = null, definitionKey = null, recordPreviews = false, handMetadata = HANDS_METADATA;
  const emit = () => onChange(snapshot());
  const snapshot = () => ({ status, message: status === "saving" && sink ? sink.snapshot().stage === "finalizing" ? "Processing and verifying video…" : "Uploading recorded chunks…" : status === "recording" && sink?.snapshot().lastError ? "Recording · Chunks stored in browser; upload will retry" : message, takeId: sink?.snapshot().takeId, storage: sink?.snapshot(), maxSeconds: TAKE_LIMITS.seconds, stopReason, seconds: status === "recording" ? Math.floor((now() - startTime) / 1e3) : 0, frames, result, canRetry: !!pendingUpload || !!sink?.snapshot().takeId && status === "error", hands: hands?.snapshot() || null });
  async function uploadPending() {
    try {
      result = await upload(pendingUpload.blob, pendingUpload.metadata, pendingUpload.timeline);
      pendingUpload = null;
      status = "idle";
      message = "Reference video saved · Virtual scene only";
      emit();
      return result;
    } catch (error) {
      status = "error";
      message = `Video retained in this page. Retry saving: ${error.message}`;
      emit();
      throw error;
    }
  }
  async function retry() {
    if (!pendingUpload && !sink || status === "saving") return result;
    status = "saving";
    message = "Retrying video save…";
    emit();
    if (sink) {
      try {
        result = await sink.retry();
        status = "idle";
        message = "Reference video saved";
        emit();
        return result;
      } catch (error) {
        status = "error";
        message = "Recording chunks retained. Retry: " + error.message;
        emit();
        throw error;
      }
    }
    return uploadPending();
  }
  async function recover() {
    if (sink && await sink.recover()) {
      status = "error";
      message = "Unfinished recording found. Retry saving the recorded portion.";
      emit();
      return true;
    }
    return false;
  }
  function cleanup() {
    clearTimeout(limitTimer);
    clearInterval(pumpTimer);
    stream?.getTracks().forEach((t) => t.stop());
    stream = null;
    content?.dispose();
    content = null;
    actors?.dispose();
    actors = null;
    hands?.dispose();
    hands = null;
    scene?.traverse((o) => {
      o.geometry?.dispose();
      o.material?.dispose();
    });
    scene = null;
    renderer?.dispose();
    renderer = null;
    camera = null;
    recorder = null;
    clearTimeout(stopTimer);
  }
  function fail(error) {
    generation++;
    const active = recorder;
    cleanup();
    if (active?.state === "recording") try {
      active.stop();
    } catch {
    }
    status = "error";
    message = error.message || "Recording failed";
    emit();
    rejectStop?.(error);
    resolveStop = rejectStop = null;
    stopPromise = null;
  }
  function start(definition, matrix, initialView, initialActors = [], initialTransforms = [], initialHands, metadata = HANDS_METADATA, presentation = {}) {
    if (["starting", "recording", "saving"].includes(status)) throw new Error("Recording or saving in progress");
    if (pendingUpload) throw new Error("Previous video is unsaved. Retry saving it first.");
    validateHandsMetadata(metadata);
    handMetadata = structuredClone(metadata);
    if (initialHands) validateHandsSample(initialHands, handMetadata);
    if (!Recorder) throw new Error("Video recording is unavailable in this browser");
    const mime = ["video/webm;codecs=vp8", "video/webm;codecs=vp9", "video/mp4"].find((type) => Recorder.isTypeSupported(type));
    if (!mime) throw new Error("No compatible video encoder");
    const token = ++generation;
    try {
      const canvas = makeCanvas();
      renderer = new Renderer({ canvas, antialias: true, alpha: false, preserveDrawingBuffer: true });
      renderer.setPixelRatio(1);
      renderer.setSize(1280, 720, false);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.25;
      scene = createVirtualScene(definition, matrix);
      scene.userData.contentWorld.visible = presentation.visible !== false;
      camera = new THREE.PerspectiveCamera(65, 16 / 9, 0.02, 200);
      actors = createActorLayer(scene.userData.contentWorld, assets);
      definitionKey = JSON.stringify(definition);
      hands = initialHands ? createHandLayer(scene.userData.contentWorld, handMetadata) : null;
      hands?.apply(initialHands);
      recordPreviews = includeActorPreviews();
      actors.apply(initialActors, { clean: !recordPreviews });
      content = contentFactory?.(scene.userData.contentWorld, actors.views);
      content?.apply(presentation.showcase);
      if (initialTransforms.length) applyRecordedTransforms(scene, initialTransforms);
      timeline = { schema: "vrbuild-take/1", actorPreviews: recordPreviews ? "include" : "exclude", initialScene: structuredClone(definition), sceneMatrix: matrix.toArray(), assets: [...assets.values()].map(({ template, motion, ...meta }) => meta), events: [], samples: [], frameMapping: "render samples with monotonic times; encoded frames may be resampled" };
      if (initialHands) {
        timeline.handsMetadata = structuredClone(handMetadata);
        timeline.initialHands = structuredClone(initialHands);
        if (sink) {
          timeline.initialHands.sampleId = 0;
          timeline.initialHands.frameTimeMs = 0;
        }
      }
      if (initialView) {
        if (initialView.isPerspectiveCamera) {
          camera.fov = initialView.fov;
          camera.aspect = initialView.aspect;
          camera.updateProjectionMatrix();
        }
        initialView.getWorldPosition(camera.position);
        initialView.getWorldQuaternion(camera.quaternion);
        camera.updateMatrixWorld(true);
        renderer.render(scene, camera);
      }
      if (!canvas.captureStream) throw new Error("Canvas recording is unavailable in this browser");
      stream = canvas.captureStream(30);
      recorder = new Recorder(stream, { mimeType: mime, videoBitsPerSecond: 3e6 });
      chunks = [];
      bytes = 0;
      frames = 0;
      lastFrame = -Infinity;
      result = null;
      stopPromise = null;
      storageError = null;
      stopReason = "user";
      const segment = () => ({ time: Math.min(TAKE_LIMITS.seconds, Math.max(0, ((endTime || now()) - startTime) / 1e3)), samples: timeline.samples.splice(0), events: timeline.events.splice(0) });
      recorder.ondataavailable = (event2) => {
        if (token !== generation || !event2.data.size) return;
        bytes += event2.data.size;
        if (sink) {
          try {
            sink.append(event2.data, segment()).catch((error) => {
              storageError = error;
              stop("storage-error").catch(() => {
              });
            });
          } catch (error) {
            storageError = error;
            stop("storage-error").catch(() => {
            });
          }
        } else chunks.push(event2.data);
        if (bytes > TAKE_LIMITS.videoBytes && status === "recording") stop("storage-error").catch(() => {
        });
      };
      recorder.onerror = (event2) => {
        if (token === generation) fail(event2.error || new Error("Video encoding failed"));
      };
      recorder.onstop = async () => {
        if (token !== generation) return;
        clearTimeout(stopTimer);
        const duration = Math.min(TAKE_LIMITS.seconds, ((endTime || now()) - startTime) / 1e3), blob = sink ? null : new Blob(chunks, { type: mime.split(";")[0] });
        chunks = [];
        cleanup();
        try {
          if (!bytes || !frames) {
            await sink?.discardEmpty();
            throw new Error("No valid frames recorded. Start a new recording.");
          }
          if (storageError) throw storageError;
          if (sink) {
            await sink.append(new Blob([]), segment());
            message = "Uploading and processing recording…";
            emit();
            result = await sink.finish({ duration, frames, reason: stopReason });
            status = "idle";
            message = "Reference video saved · Virtual scene only";
            emit();
          } else {
            pendingUpload = { blob, metadata: { duration, width: 1280, height: 720, frames }, timeline };
            result = await uploadPending();
          }
          resolveStop?.(result);
        } catch (error) {
          status = "error";
          message = "Recording is not fully saved. Retry the retained chunks: " + error.message;
          emit();
          rejectStop?.(error);
        } finally {
          resolveStop = rejectStop = null;
          stopPromise = null;
        }
      };
      const activate = () => {
        recorder.start(1e3);
        startTime = now();
        endTime = 0;
        status = "recording";
        message = "Recording · Maximum 3 minutes · B to stop";
        limitTimer = setTimeout(() => stop("limit").catch(() => {
        }), TAKE_LIMITS.seconds * 1e3);
        pumpTimer = sink ? setInterval(() => sink.flush().catch(() => {
        }), 3e3) : null;
        emit();
      };
      if (sink) {
        status = "starting";
        message = "Preparing local recording storage…";
        emit();
        return sink.begin(structuredClone(timeline), mime.split(";")[0]).then(activate).catch((error) => {
          cleanup();
          status = "error";
          message = error.message;
          emit();
          throw error;
        });
      }
      activate();
    } catch (error) {
      cleanup();
      status = "error";
      message = error.message;
      emit();
      throw error;
    }
  }
  function stop(reason = "user") {
    if (stopPromise) return stopPromise;
    if (status !== "recording") return Promise.resolve(result);
    stopReason = reason;
    clearTimeout(limitTimer);
    clearInterval(pumpTimer);
    endTime = now();
    status = "saving";
    message = "Saving reference video…";
    emit();
    stopPromise = new Promise((resolve, reject) => {
      resolveStop = resolve;
      rejectStop = reject;
    });
    const pending = stopPromise;
    stopTimer = setTimeout(() => fail(new Error("Video encoder did not finish in time")), 15e3);
    try {
      recorder.stop();
    } catch (error) {
      fail(error);
    }
    return pending;
  }
  function syncDefinition(definition, matrix) {
    if (status !== "recording") return;
    if (matrix) {
      scene.userData.contentWorld.matrix.copy(matrix);
      scene.userData.contentWorld.matrixWorldNeedsUpdate = true;
    }
    const key = JSON.stringify(definition);
    if (key === definitionKey) return;
    definitionKey = key;
    const world = scene.userData.contentWorld;
    for (const child of [...world.children]) if (child.isMesh) {
      world.remove(child);
      child.geometry.dispose();
      child.material.dispose();
    }
    scene.userData.cinema?.dispose();
    scene.userData.flood?.dispose();
    const fresh = createVirtualScene(definition, matrix);
    fresh.userData.cinema?.dispose();
    fresh.userData.flood?.dispose();
    for (const child of [...fresh.userData.contentWorld.children]) world.add(child);
    for (const key2 of ["objectMeshes", "baseTransforms", "definitionObjects"]) scene.userData[key2] = fresh.userData[key2];
    scene.userData.cinema = null;
    scene.userData.flood = null;
    if (definition.objects.some((o) => isRig(o) || o.track)) {
      scene.userData.cinema = createCinemaLayer(world);
      scene.userData.cinema.sync(definition);
    }
    if (definition.floods?.length) {
      scene.userData.flood = createFloodLayer(world, { getObjectPose: (id) => {
        const mesh = scene.userData.objectMeshes.get(id);
        return mesh ? { position: mesh.position.toArray(), quaternion: mesh.quaternion.toArray() } : null;
      } });
      scene.userData.flood.sync(definition);
    }
    timeline.events.push({ time: Math.min(TAKE_LIMITS.seconds, (now() - startTime) / 1e3), type: "scene-update", scene: structuredClone(definition) });
  }
  function event(type, detail) {
    if (status === "recording") timeline.events.push({ time: Math.min(TAKE_LIMITS.seconds, (now() - startTime) / 1e3), type, detail: structuredClone(detail) });
  }
  function frame(time, view, actorFrames = [], objectTransforms = [], handSample, presentation = {}) {
    if (status !== "recording") return;
    if (now() - startTime >= TAKE_LIMITS.seconds * 1e3) {
      stop("limit").catch(() => {
      });
      return;
    }
    if (time - lastFrame < 1e3 / 30) return;
    const world = scene.userData.contentWorld;
    if (presentation.matrix) {
      world.matrix.copy(presentation.matrix);
      world.matrixWorldNeedsUpdate = true;
    }
    world.visible = presentation.visible !== false;
    if (handSample && !hands) hands = createHandLayer(scene.userData.contentWorld, handMetadata);
    hands?.apply(handSample);
    if (handSample && !timeline.handsMetadata) timeline.handsMetadata = structuredClone(handMetadata);
    lastFrame = Number.isFinite(lastFrame) ? time - (time - lastFrame) % (1e3 / 30) : time;
    view.getWorldPosition(camera.position);
    view.getWorldQuaternion(camera.quaternion);
    camera.updateMatrixWorld(true);
    actors?.apply(actorFrames, { clean: !recordPreviews });
    applyRecordedTransforms(scene, objectTransforms);
    content?.apply(presentation.showcase);
    if (view.isPerspectiveCamera) {
      camera.fov = view.fov;
      camera.aspect = view.aspect;
      camera.updateProjectionMatrix();
    }
    scene.userData.cinema?.frame(presentation.productionTime || 0, [...scene.userData.definitionObjects || [], ...actorFrames], [], presentation.previewObjectIds ?? null, presentation.triggerClocks || {});
    scene.userData.flood?.frame(presentation.floodState || { states: [] }, { showRegions: false });
    renderer.render(scene, camera);
    frames++;
    timeline.samples.push({ time: (now() - startTime) / 1e3, ...presentation.matrix ? { sceneMatrix: presentation.matrix.toArray(), phase: presentation.phase, worldVisible: world.visible } : {}, position: camera.position.toArray(), quaternion: camera.quaternion.toArray(), projection: camera.projectionMatrix.toArray(), ...presentation.productionTime !== void 0 ? { productionTime: presentation.productionTime, ...presentation.previewObjectIds ? { previewObjectIds: [...presentation.previewObjectIds], triggerClocks: structuredClone(presentation.triggerClocks || {}) } : {}, cameraId: presentation.cameraId || null, floodState: structuredClone(presentation.floodState || { states: [] }) } : {}, ...presentation.showcase ? { showcase: structuredClone(presentation.showcase), props: content?.snapshot?.() || [] } : {}, actors: actorFrames.map((f) => ({ ...f, visible: f.visible && (!f.preview || recordPreviews) })), objectTransforms: structuredClone(objectTransforms), ...handSample ? { hands: { ...structuredClone(handSample), ...sink ? { sampleId: frames, frameTimeMs: now() - startTime } : {} } } : {} });
  }
  return { start, stop, retry, recover, frame, snapshot, syncDefinition, event };
}
export {
  applyRecordedTransforms,
  createVirtualRecorder,
  createVirtualScene,
  objectGeometry2 as objectGeometry
};
