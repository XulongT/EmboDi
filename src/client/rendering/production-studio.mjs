import {languagePattern} from "../../shared/language.mjs";
import { entityLabel } from "../../shared/entity-label.mjs";
import * as THREE from "three";
import { setApiSession } from "../api.mjs";
import { applyCinema, isCamera, isLight, isRig, objectQuaternion, editableControls, curvePoints, groundCreateCommand } from "../../shared/cinema.mjs";
import { createTriggerRegionLayer } from "./trigger-region-layer.mjs";
import { createCinemaLayer } from "./cinema-layer.mjs";
import { createVirtualScene, applyRecordedTransforms } from "./virtual-video.mjs";
import { createActorLayer } from "./actor-view.mjs";
import { productionSpecialist } from "../../shared/production-intent.mjs";
import { previewScope, isolatePreviewActors } from "../../shared/preview-scope.mjs";
import { uprightMonitorPose } from "../../shared/monitor-pose.mjs";
import { createTrackTriggerRuntime } from "../../shared/track-triggers.mjs";
import { cameraViewIntent } from "../../shared/camera-view-intent.mjs";
function createProductionStudio({ world, scene, renderer, api, getState, getSelection, getView, getSpatialKey, getMeshes, pickGround = () => null, canCreate = () => true, canMonitor = () => true, assets, onState, onPreview, onChange, onSelect = () => {
}, onPlay, notice, hideMenu, pauseScene, transport }) {
  let editing = false, session = null, transitioning = false, editor = null, pending = null, saving = false, request = null, monitor = null, selectedCamera = null, playing = false, time = 0, lastMonitor = 0, definitionKey = "", speed = 0.5, neutral = false;
  const triggerRuntime = createTrackTriggerRuntime();
  let triggerKey = "", triggerStatusKey = "";
  const regionLayer = createTriggerRegionLayer(world), rig = createCinemaLayer(world), guides = new THREE.Group();
  world.add(guides);
  let hasPlayed = false, focusIds = [], activeScope = null, modeTransition = null, previewRevision = null;
  const vec = (p) => new THREE.Vector3(...p), quat = (q) => new THREE.Quaternion(...q);
  const state = () => getState(), definition = () => pending?.scene || state().scene;
  const changed = () => onChange();
  const focus = () => previewScope(state().scene, editing ? getSelection() : focusIds);
  const requestPlay = (options) => onPlay ? onPlay(options) : play(options);
  function clearGuides() {
    for (const o of [...guides.children]) {
      o.geometry?.dispose();
      o.material?.dispose();
      guides.remove(o);
    }
  }
  function dirty() {
    return !!editor || !!pending;
  }
  function requireEdit() {
    if (!editing || session?.mode !== "edit" || transitioning) throw Error("Enter edit mode first.");
    closeMonitor();
  }
  function transformable() {
    return editor?.type === "poses";
  }
  function savedCameras() {
    return state().scene.objects.filter(isCamera);
  }
  function closeMonitor() {
    if (!monitor) return;
    scene.remove(monitor.screen);
    monitor.screen.geometry.dispose();
    monitor.screen.material.dispose();
    monitor.target.dispose();
    monitor.actors.dispose();
    monitor.content.userData.cinema?.dispose();
    monitor.flood?.dispose();
    monitor.content.traverse((o) => {
      o.geometry?.dispose();
      o.material?.dispose();
    });
    monitor = null;
    changed();
  }
  async function syncMode(next) {
    transitioning = true;
    changed();
    try {
      session = await api("/api/authoring/session", { ...session ? { id: session.id, epoch: session.epoch } : {}, mode: next });
      setApiSession(session);
    } catch (error) {
      session = null;
      setApiSession(null);
      notice("Mode sync failed. Refresh and retry: " + error.message);
      throw error;
    } finally {
      transitioning = false;
      changed();
    }
  }
  function cancel() {
    if (saving) {
      notice("Saving. Undo will be available when finished.");
      return;
    }
    const hadPreview = !!pending;
    if (request) api("/api/cinema/cancel", {}).catch(() => {
    });
    request?.abort();
    request = null;
    editor = null;
    pending = null;
    clearGuides();
    if (hadPreview) onPreview(null);
    neutral = false;
    changed();
  }
  function selectCamera(id) {
    const list = savedCameras();
    if (!list.length) throw Error("Create and save a virtual camera first.");
    const selected = editing ? list.find((c) => getSelection().includes(c.id)) : null;
    const target = id ? list.find((c) => c.id === id) : selected || list.find((c) => c.id === selectedCamera) || list[0];
    if (!target) throw Error("Select a saved scene camera.");
    selectedCamera = target.id;
    return target;
  }
  function openMonitor(id) {
    if (!session || !["edit", "explore"].includes(session.mode) || dirty() || transitioning || saving || !canMonitor()) throw Error("A Save or B Cancel the current edit before viewing a saved camera.");
    const camera = selectCamera(id);
    closeMonitor();
    world.updateMatrixWorld(true);
    const content = createVirtualScene(state().scene, world.matrixWorld), actors = createActorLayer(content.userData.contentWorld, assets), flood = content.userData.flood;
    const target = new THREE.WebGLRenderTarget(768, 432), screen = new THREE.Mesh(new THREE.PlaneGeometry(1.08, 0.6075), new THREE.MeshBasicMaterial({ map: target.texture, toneMapped: false, side: THREE.DoubleSide, depthTest: false, depthWrite: false }));
    screen.renderOrder = 18;
    scene.add(screen);
    monitor = { content, actors, flood, target, screen, revision: state().revision, key: getSpatialKey() };
    recenterMonitor();
    hideMenu();
    notice(`${entityLabel(camera)} · A Recenter · B Close · Save camera edits before reopening`);
    changed();
  }
  function recenterMonitor() {
    if (!monitor) return false;
    const view = getView(), pose = uprightMonitorPose(view.getWorldPosition(new THREE.Vector3()).toArray(), view.getWorldQuaternion(new THREE.Quaternion()).toArray(), monitor.yaw || 0);
    monitor.screen.position.fromArray(pose.position);
    monitor.screen.quaternion.fromArray(pose.quaternion);
    monitor.yaw = pose.yaw;
    monitor.screen.updateMatrixWorld(true);
    changed();
    return true;
  }
  function adjustCamera() {
    const id = selectedCamera;
    requireEdit();
    if (!id) throw Error("Select a saved camera first.");
    onSelect(id);
    startPoses();
  }
  function cameraStep(delta) {
    const list = savedCameras();
    if (!list.length) return openMonitor();
    const index = list.findIndex((c) => c.id === selectedCamera);
    selectedCamera = list[(index + delta + list.length) % list.length].id;
    if (!monitor) openMonitor(selectedCamera);
    else {
      notice("Current camera: " + entityLabel(list.find((c) => c.id === selectedCamera)));
      changed();
    }
  }
  function startPoses() {
    requireEdit();
    if (dirty() || saving || request) throw Error("Save or cancel the current operation first.");
    const targets = [...state().scene.objects, ...state().scene.actors || []].filter((o) => getSelection().includes(o.id));
    if (!targets.length) throw Error("Select an object first.");
    if (targets.some((o) => o.editable !== true && (o.id === "ground" || o.category === "structure" || /^(wall|ceiling)(_|-|$)/.test(o.id)))) throw Error("Reference structure is locked.");
    pauseScene();
    playing = false;
    const poses = targets.map((o) => ({ id: o.id, position: [...o.position], quaternion: objectQuaternion(o) }));
    const forward = getView().getWorldDirection(new THREE.Vector3()).transformDirection(world.matrixWorld.clone().invert());
    forward.y = 0;
    forward.normalize();
    editor = { type: "poses", poses, revision: state().revision, key: getSpatialKey(), forward, grab: null };
    neutral = false;
    hideMenu();
    changed();
    notice("Transform: L stick Move · L grip + stick Height · R stick Rotate · R grip Grab · A Save · B Revert");
  }
  function drawControls() {
    clearGuides();
    if (editor?.type !== "curve") return;
    const points = curvePoints(editor.controls, true), path = new THREE.CurvePath();
    for (let i = 1; i < points.length; i++) path.add(new THREE.LineCurve3(vec(points[i - 1]), vec(points[i])));
    const line = new THREE.Mesh(new THREE.TubeGeometry(path, Math.min(256, points.length * 2), 0.022, 6, false), new THREE.MeshBasicMaterial({ color: "#ad95ff", toneMapped: false }));
    line.userData.curveSegment = true;
    guides.add(line);
    editor.controls.forEach((p, index) => {
      const m = new THREE.Mesh(new THREE.SphereGeometry(0.065, 12, 8), new THREE.MeshBasicMaterial({ color: editor.grab?.index === index ? "#ffffff" : "#ffcf70", depthTest: false, toneMapped: false }));
      m.position.fromArray(p);
      m.userData.controlIndex = index;
      m.renderOrder = 10;
      guides.add(m);
    });
  }
  function editCurve(id) {
    requireEdit();
    if (dirty()) throw Error("Save or cancel the current operation first.");
    const c = state().scene.curves?.find((c2) => c2.id === id);
    if (!c) throw Error("Save and select a curve first.");
    editor = { type: "curve", id, controls: editableControls(c), revision: state().revision, key: getSpatialKey(), grab: null };
    drawControls();
    hideMenu();
    changed();
    notice("Grip and pull control points · A Save smoothed curve · B Cancel");
  }
  function localHand(controller) {
    world.updateMatrixWorld(true);
    controller.updateMatrixWorld(true);
    return world.matrixWorld.clone().invert().multiply(controller.matrixWorld);
  }
  function grab(controller, ray) {
    if (!editor || editor.type === "placement" || editor.grab || saving) return false;
    const hand = localHand(controller);
    if (editor.type === "poses") editor.grab = { controller, start: hand.clone().invert(), poses: structuredClone(editor.poses) };
    else {
      const hit = ray.intersectObjects(guides.children, false)[0];
      if (!hit) return false;
      let index = hit.object.userData.controlIndex;
      if (index === void 0) {
        if (editor.controls.length >= 64) throw Error("Up to 64 control points.");
        const point = world.worldToLocal(hit.point.clone());
        let best = Infinity;
        index = 1;
        for (let i = 1; i < editor.controls.length; i++) {
          const near = new THREE.Line3(vec(editor.controls[i - 1]), vec(editor.controls[i])).closestPointToPoint(point, true, new THREE.Vector3()).distanceToSquared(point);
          if (near < best) {
            best = near;
            index = i;
          }
        }
        editor.controls.splice(index, 0, point.toArray());
      }
      editor.grab = { controller, index, start: hand.clone().invert(), point: vec(editor.controls[index]) };
      drawControls();
    }
    neutral = false;
    changed();
    return true;
  }
  function release() {
    if (editor?.grab) {
      editor.grab = null;
      neutral = false;
      changed();
    }
  }
  function input(sources, dt) {
    if (!editor || saving) return;
    dt = Math.min(dt, 0.05);
    if (editor.revision !== state().revision || editor.key !== getSpatialKey()) {
      cancel();
      notice("Scene or alignment changed. Edits reverted.");
      return;
    }
    if (editor.grab) {
      const g = editor.grab;
      if (!g.controller.visible) {
        cancel();
        notice("Tracking interrupted. Edits cancelled.");
        return;
      }
      const delta2 = localHand(g.controller).multiply(g.start), alpha = 1 - Math.exp(-20 * dt);
      if (editor.type === "poses") for (let i = 0; i < editor.poses.length; i++) {
        const base = g.poses[i], matrix = delta2.clone().multiply(new THREE.Matrix4().compose(vec(base.position), quat(base.quaternion), new THREE.Vector3(1, 1, 1))), p = new THREE.Vector3(), q2 = new THREE.Quaternion();
        matrix.decompose(p, q2, new THREE.Vector3());
        editor.poses[i].position = vec(editor.poses[i].position).lerp(p, alpha).toArray().map((v) => THREE.MathUtils.clamp(v, -99, 99));
        editor.poses[i].quaternion = quat(editor.poses[i].quaternion).slerp(q2, alpha).toArray();
      }
      else {
        const previousY = editor.controls[g.index][1];
        editor.controls[g.index] = g.point.clone().applyMatrix4(delta2).toArray().map((v) => THREE.MathUtils.clamp(v, -99, 99));
        if (state().scene.curves.find((c) => c.id === editor.id)?.mode === "floor2d") editor.controls[g.index][1] = previousY;
        drawControls();
      }
      return;
    }
    if (editor.type !== "poses") return;
    const pad = (hand) => sources.find((s) => s.handedness === hand)?.gamepad?.axes || [], left = pad("left"), right = pad("right"), axes = [left[2] || 0, left[3] || 0, right[2] || 0, right[3] || 0];
    const grip = sources.find((s) => s.handedness === "left")?.gamepad?.buttons?.[1], vertical = !!(grip && (grip.pressed || grip.value > 0.65));
    if (editor.vertical !== vertical) {
      editor.vertical = vertical;
      neutral = false;
    }
    if (!neutral) {
      neutral = axes.every((v) => Math.abs(v) < 0.18);
      return;
    }
    const [x, y, rx, ry] = axes.map((v) => Math.abs(v) > 0.18 ? v : 0);
    if (!x && !y && !rx && !ry) return;
    const forward = editor.forward, side = new THREE.Vector3(-forward.z, 0, forward.x), delta = vertical ? new THREE.Vector3(0, -y * speed * dt, 0) : side.multiplyScalar(x).addScaledVector(forward, -y).multiplyScalar(speed * dt);
    const q = new THREE.Quaternion().setFromEuler(new THREE.Euler(-ry * dt * 0.8, -rx * dt * 0.8, 0, "YXZ"));
    for (const p of editor.poses) {
      p.position = vec(p.position).add(delta).toArray().map((v) => THREE.MathUtils.clamp(v, -99, 99));
      p.quaternion = q.clone().multiply(quat(p.quaternion)).normalize().toArray();
    }
  }
  function beginPlacement(command) {
    requireEdit();
    if (dirty() || saving || request || !canCreate()) throw Error("Save or cancel the current operation first.");
    applyCinema(state().scene, groundCreateCommand(command, [0, 0, 0]));
    pauseScene();
    clearGuides();
    const cursor = new THREE.Mesh(new THREE.RingGeometry(0.18, 0.25, 48), new THREE.MeshBasicMaterial({ color: "#b79bea", side: THREE.DoubleSide, toneMapped: false }));
    cursor.rotation.x = -Math.PI / 2;
    cursor.visible = false;
    guides.add(cursor);
    editor = { type: "placement", command: structuredClone(command), point: null, cursor, revision: state().revision, key: getSpatialKey() };
    hideMenu();
    changed();
    notice("Point at ground with your right hand · A Create · B Cancel");
  }
  function updatePlacement(ray) {
    if (editor?.type !== "placement" || saving) return;
    if (editor.revision !== state().revision || editor.key !== getSpatialKey()) {
      cancel();
      notice("Scene or alignment changed. Placement cancelled.");
      return;
    }
    const hit = ray && pickGround(ray), point = hit?.toArray?.() || hit || null;
    let valid = !!point;
    try {
      if (valid) groundCreateCommand(editor.command, point);
    } catch {
      valid = false;
    }
    const wasValid = !!editor.point;
    editor.point = valid ? [...point] : null;
    editor.cursor.visible = valid;
    if (valid) editor.cursor.position.fromArray(point).add(new THREE.Vector3(0, 0.015, 0));
    if (wasValid !== valid) changed();
  }
  function preview(command) {
    requireEdit();
    if (dirty()) throw Error("Save or cancel the current operation first.");
    if (command.op === "create") return beginPlacement(command);
    pending = { command, scene: applyCinema(state().scene, command), revision: state().revision, key: getSpatialKey() };
    onPreview(pending.scene);
    changed();
  }
  async function save() {
    requireEdit();
    if (saving) return;
    if (editor?.grab) throw Error("Release the grip before saving.");
    if (editor && (editor.key !== getSpatialKey() || editor.revision !== state().revision)) {
      cancel();
      throw Error("Scene or alignment changed. Choose a new point or restart editing.");
    }
    const command = editor?.type === "placement" ? groundCreateCommand(editor.command, editor.point) : editor?.type === "poses" ? { op: "poses", poses: editor.poses } : editor?.type === "curve" ? { op: "curve", id: editor.id, controls: editor.controls, smooth: true } : pending?.command;
    if (!command) return;
    const revision = editor?.revision ?? pending.revision;
    if (revision !== state().revision) throw Error("Scene changed. Cancel and restart editing.");
    saving = true;
    changed();
    try {
      const next = await api("/api/cinema/commit", { revision, command });
      editor = null;
      pending = null;
      clearGuides();
      onPreview(null);
      onState(next);
      notice(command.op === "create" ? "Created at your point · Use Transform to adjust position and height." : "Saved · Left grip or Interaction → Rehearse selection.");
    } finally {
      saving = false;
      changed();
    }
    if (command.op === "create") onSelect(command.id);
  }
  function play({ restart = false, ids } = {}) {
    if (editing || session?.mode !== "explore" || transitioning || dirty() || saving) throw Error("Save edits, click the right stick to explore, then use left grip to rehearse.");
    const next = previewScope(state().scene, ids ?? focusIds);
    if (!next.ownerIds.length || next.missingIds.length) throw Error("Enter edit mode and select an object to rehearse.");
    if (!next.playable) throw Error("Bind a curve or save an interaction for this object first.");
    const same = activeScope && JSON.stringify(activeScope) === JSON.stringify(next) && previewRevision === state().revision;
    if (playing && !restart && same) return;
    const first = !hasPlayed || restart || !same;
    try {
      transport(first ? "start" : "resume", next);
    } catch (error) {
      activeScope = null;
      hasPlayed = false;
      playing = false;
      time = 0;
      pauseScene();
      changed();
      throw error;
    }
    if (first) {
      time = 0;
      triggerRuntime.sync(state().scene);
      triggerKey = JSON.stringify(state().scene);
      triggerRuntime.start(next.objectIds);
    } else triggerRuntime.resume();
    focusIds = [...next.ownerIds];
    activeScope = next;
    previewRevision = state().revision;
    hasPlayed = true;
    playing = true;
    hideMenu();
    notice(`Rehearsing: ${next.label} · Left grip Pause / Resume · Right stick click Edit`);
    changed();
  }
  function pause() {
    playing = false;
    triggerRuntime.pause();
    transport("pause", activeScope);
    changed();
  }
  async function handleText(text, context) {
    const viewAction = cameraViewIntent(text);
    if (viewAction === "recenter") {
      if (!monitor) return "Ask Camera Agent to open the monitor first.";
      recenterMonitor();
      return "Monitor recentered upright. Camera pose and playback are preserved.";
    }
    if (viewAction === "close") {
      closeMonitor();
      return "Camera monitor closed.";
    }
    if (viewAction) {
      if (context?.revision !== void 0 && context.revision !== state().revision) throw Error("Scene changed while speaking. Select the camera again.");
      if (dirty() || saving || transitioning || request) return "A Save or B Cancel the current edit before viewing a camera.";
      if (viewAction === "preview") {
        const ids = context?.targetIds || getSelection(), camera = state().scene.objects.find((o) => isCamera(o) && ids.includes(o.id));
        openMonitor(camera?.id);
      } else cameraStep(viewAction === "next" ? 1 : -1);
      return `Viewing saved camera ${entityLabel(savedCameras().find((c) => c.id === selectedCamera))}. B Close; editing closes the monitor.`;
    }
    if (editor?.type === "poses") {
      if (languagePattern("transform.faster").test(text)) {
        speed = Math.min(4, speed * 2);
        return `Movement speed is now ${speed} m/s.`;
      }
      if (languagePattern("transform.slower").test(text)) {
        speed = Math.max(0.025, speed / 2);
        return `Movement speed is now ${speed} m/s.`;
      }
      if (languagePattern("transform.verticalRequest").test(text)) {
        const metres = languagePattern("transform.meters").test(text) && !languagePattern("transform.centimeters").test(text), amount = Number(text.match(/\d+(?:\.\d+)?/)?.[0] || 20) * (metres ? 1 : 0.01) * (languagePattern("transform.lower").test(text) ? -1 : 1);
        for (const p of editor.poses) p.position[1] = THREE.MathUtils.clamp(p.position[1] + amount, -99, 99);
        return "Height preview adjusted. A Save, B Revert.";
      }
      return "A Save or B Cancel this edit. You can also say faster, slower, or raise by 20 centimetres.";
    }
    if (dirty()) return "A Save or B Cancel the current preview first.";
    const words = text.trim().replace(languagePattern("punctuation.production-studio.1"), "");
    if (languagePattern("preview.stop").test(words)) {
      pause();
      return "Rehearsal paused. Left grip to resume.";
    }
    if (languagePattern("preview.play").test(words)) {
      await requestPlay({ restart: languagePattern("preview.restart").test(words) });
      return `Rehearsing ${activeScope?.label || focus().label}. Left grip to pause / resume.`;
    }
    const targetIds = editing ? context?.targetIds || getSelection() : focusIds;
    const specialist = productionSpecialist(text, { scene: state().scene, ids: targetIds });
    if (editing && !specialist) return null;
    if (request || transitioning) throw Error("The previous request is still processing.");
    const captured = session && { ...session };
    if (context?.revision !== void 0 && context.revision !== state().revision) throw Error("Scene changed while speaking. Please retry.");
    if (context?.productionEpoch && context.productionEpoch !== captured?.epoch) throw Error("Mode changed while speaking. Please retry.");
    request = new AbortController();
    const controller = request;
    changed();
    try {
      const result = await api("/api/cinema/agent", { prompt: text, revision: state().revision, ids: targetIds, curveId: context?.curveId || null, specialist: specialist || "camera" }, { signal: controller.signal, timeoutMs: 125e3 });
      if (controller.signal.aborted || session?.epoch !== captured?.epoch) return null;
      if (result.action === "edit") {
        if (result.command.op === "create") {
          request = null;
          beginPlacement(result.command);
          return "Placement ready. Point at ground with your right hand. A Create, B Cancel.";
        }
        preview(result.command);
      } else if (result.action === "editCurve") editCurve(result.id);
      else if (result.action === "preview") openMonitor(result.id);
      else if (result.action === "next") cameraStep(1);
      else if (result.action === "previous") cameraStep(-1);
      else if (result.action === "close") closeMonitor();
      else if (result.action === "play") {
        request = null;
        changed();
        await requestPlay(result.id ? { ids: [result.id] } : {});
      } else if (result.action === "pause") pause();
      return result.reply || "Done.";
    } finally {
      if (request === controller) request = null;
      changed();
    }
  }
  function frame(dt, actors = [], transforms = [], flood = { states: [] }, tracking = {}) {
    const d = definition(), next = JSON.stringify(d);
    if (next !== definitionKey) {
      definitionKey = next;
      rig.sync(d);
    }
    if (activeScope && previewRevision !== state().revision) {
      activeScope = null;
      hasPlayed = false;
      playing = false;
      time = 0;
      pauseScene();
      notice("Scene updated. Select an object again to rehearse.");
      changed();
    }
    if (!editing && playing) time += Math.min(dt, 0.1);
    const targets = [...d.objects, ...(d.actors || []).map((o) => ({ ...o, position: actors.find((a) => a.id === o.id)?.position || o.position }))];
    const savedKey = JSON.stringify(state().scene);
    if (savedKey !== triggerKey) {
      triggerKey = savedKey;
      triggerRuntime.sync(state().scene);
    }
    const triggerState = triggerRuntime.tick({ ...tracking, active: !!tracking.active && !editing && playing });
    regionLayer.frame(d, { editing, states: triggerState.states });
    const statusKey = triggerState.states.map((s) => s.id + ":" + (s.fired ? "fired" : s.inside ? Math.floor(s.dwell) : "waiting")).join("|");
    if (statusKey !== triggerStatusKey) {
      triggerStatusKey = statusKey;
      const s = triggerState.states[0];
      if (s) notice(s.fired ? "Region condition met. Starting this object's movement." : s.inside ? `Dwell in region: ${s.dwell.toFixed(1)} / ${s.seconds} s` : `Enter the floor region · Dwell continuously for ${s.seconds} s`);
    }
    const activeIds = activeScope?.objectIds || [];
    const frames = rig.frame(editing ? null : time, targets, [...transforms, ...editor?.type === "poses" ? editor.poses : []], activeIds, triggerState.clocks);
    for (const p of frames) {
      const mesh = getMeshes().get(p.id);
      if (!mesh) continue;
      if (isRig(mesh.userData.definition)) {
        mesh.visible = editing;
        if (!mesh.userData.cinemaGuide) {
          const arrow = new THREE.ArrowHelper(new THREE.Vector3(0, 0, -1), new THREE.Vector3(), 2.5, isCamera(mesh.userData.definition) ? 5554943 : 16767874, 0.6, 0.3);
          mesh.add(arrow);
          mesh.userData.cinemaGuide = arrow;
        }
      }
      if (editor?.poses?.some((o) => o.id === p.id) || mesh.userData.definition.track) {
        mesh.position.fromArray(p.position);
        mesh.quaternion.fromArray(p.quaternion);
      }
    }
    if (monitor) {
      if (dirty() || !canMonitor() || monitor.revision !== state().revision || monitor.key !== getSpatialKey()) {
        closeMonitor();
        return frames;
      }
      const now = performance.now();
      if (now - lastMonitor > 1e3 / 24) {
        lastMonitor = now;
        const w = monitor.content.userData.contentWorld;
        w.matrix.copy(world.matrixWorld);
        w.matrixWorldNeedsUpdate = true;
        monitor.actors.apply(actors, { clean: false });
        applyRecordedTransforms(monitor.content, [...transforms, ...frames.filter((p) => d.objects.find((o) => o.id === p.id)?.track)]);
        monitor.flood?.frame(flood, { showRegions: false });
        const cameraLayer = monitor.content.userData.cinema;
        cameraLayer?.frame(editing ? null : time, targets, [], activeIds, triggerState.clocks);
        const camera = cameraLayer?.cameras.get(selectedCamera);
        if (camera) {
          monitor.content.updateMatrixWorld(true);
          const previous = renderer.getRenderTarget(), xr = renderer.xr.enabled;
          try {
            renderer.xr.enabled = false;
            renderer.setRenderTarget(monitor.target);
            renderer.render(monitor.content, camera);
          } finally {
            renderer.setRenderTarget(previous);
            renderer.xr.enabled = xr;
          }
        }
      }
    }
    return frames;
  }
  return {
    initialize: () => modeTransition = syncMode("edit"),
    ready: () => modeTransition,
    setEditing(value, scope = value ? "edit" : "explore") {
      if (transitioning) return false;
      if (session?.mode === scope && editing === value) return true;
      if (dirty() || saving || request) {
        notice("Save or cancel the current operation first.");
        return false;
      }
      if (!value && scope === "explore") focusIds = [...getSelection()];
      editing = value;
      closeMonitor();
      triggerRuntime.stop();
      playing = false;
      hasPlayed = false;
      activeScope = null;
      time = 0;
      pauseScene();
      neutral = false;
      modeTransition = syncMode(scope);
      modeTransition.catch(() => {
      });
      return true;
    },
    cancel,
    save,
    startPoses,
    editCurve,
    grab,
    release,
    input,
    frame,
    handleText,
    preview,
    openMonitor,
    closeMonitor,
    recenterMonitor,
    adjustCamera,
    cameraStep,
    updatePlacement,
    create(kind) {
      beginPlacement({ op: "create", id: "rig-" + crypto.randomUUID(), kind });
    },
    async complete() {
      requireEdit();
      if (dirty()) throw Error("Save the current tool edits first.");
      saving = true;
      changed();
      try {
        onState(await api("/api/cinema/commit", { revision: state().revision, command: { op: "complete" } }));
        notice("Setup complete. Explore, rehearse and record.");
      } finally {
        saving = false;
        changed();
      }
    },
    play,
    pause,
    stopClock() {
      playing = false;
      triggerRuntime.stop();
    },
    isolateActors: (frames) => isolatePreviewActors(state().scene, frames, activeScope || { actorIds: frames.filter((f) => !f.preview).map((f) => f.id) }),
    allowsInteraction: (ids) => !activeScope || playing && ids.every((id) => activeScope.targetIds.includes(id)),
    cameraView: () => !editing && selectedCamera ? rig.cameras.get(selectedCamera) : null,
    livePoses: () => editor?.type === "poses" ? editor.poses.map((p) => ({ ...p, yaw: new THREE.Euler().setFromQuaternion(quat(p.quaternion), "YXZ").y })) : [],
    state: () => ({ editing, epoch: session?.epoch, tool: editor?.type === "poses" ? "transform" : editor?.type || null, vertical: !!editor?.vertical, placing: editor?.type === "placement", placement: editor?.type === "placement" ? { kind: editor.command.kind, point: editor.point ? [...editor.point] : null, visible: editor.cursor.visible } : null, dirty: dirty(), saving, requesting: !!request, transitioning, monitor: !!monitor, monitorPose: monitor ? { position: monitor.screen.position.toArray(), quaternion: monitor.screen.quaternion.toArray() } : null, triggers: triggerRuntime.snapshot(), selectedCamera, cameraName: entityLabel(savedCameras().find((c) => c.id === selectedCamera)), playing, time, speed, previewIds: focus().targetIds, previewLabel: focus().label, canPreview: !!focus().playable, activePreviewIds: activeScope?.targetIds || [], previewObjectIds: activeScope?.objectIds || [] }),
    busy: () => dirty() || saving || !!request || transitioning || !session,
    manipulating: () => !!editor && editor.type !== "placement"
  };
}
export {
  createProductionStudio
};
