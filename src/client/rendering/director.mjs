import { UI_THEME as T } from "../../shared/ui-theme.mjs";
import { facingViewer } from "../../shared/cast-layout.mjs";
import * as THREE from "three";
import { actorMotionId, createPerformance, parseDirectorCommand } from "../../shared/actors.mjs";
import { actorMotionPresets, nextActorMotionPreset, STYLE_LABELS, changeCastStyle } from "../../shared/actor-presets.mjs";
import { createActorLayer } from "./actor-view.mjs";
import { CAST_SIZE as MAX_ACTORS, nextCastSlot } from "../../shared/actor-slots.mjs";
function createDirector({ authoring = false, world, assets, getState, getPhase, spatialKey, viewPosition, pickGround, occlusionDistance = () => Infinity, api, acceptState, notify, canEdit, canPlay = () => true, deferNewMotion = () => false, onSelect = () => {
}, recordEvent = () => {
}, mapFrames = (f) => f, pathCompleted = () => null }) {
  const performance = createPerformance(), layer = createActorLayer(world, assets);
  const cursor = new THREE.Mesh(new THREE.RingGeometry(0.18, 0.25, 32), new THREE.MeshBasicMaterial({ toneMapped: false, color: T.accent, side: THREE.DoubleSide, depthTest: false }));
  cursor.rotation.x = -Math.PI / 2;
  cursor.visible = false;
  cursor.renderOrder = 15;
  world.add(cursor);
  const facingArrow = new THREE.ArrowHelper(new THREE.Vector3(0, 0, 1), new THREE.Vector3(), 0.65, T.accent, 0.18, 0.12);
  facingArrow.line.material.toneMapped = facingArrow.cone.material.toneMapped = false;
  facingArrow.visible = false;
  facingArrow.line.material.depthTest = facingArrow.cone.material.depthTest = false;
  world.add(facingArrow);
  let lockedTarget = null;
  let selected = null, placing = false, placementDelay = 0, target = null, pending = false, frames = [], message = "Enter the room, then point at the floor to place an actor.";
  const emit = (text, status = true) => {
    message = text;
    notify(text, { status });
  };
  const selectedActor = () => getState()?.scene.actors?.find((a) => a.id === selected);
  function requireEdit() {
    if (getPhase() !== "explore") throw new Error("Enter the room first");
    if (pending || !canEdit()) throw new Error("Finish the current request or preview first");
  }
  function requirePlacement() {
    requireEdit();
    if ((getState().scene.actors || []).length >= MAX_ACTORS) throw new Error(`${MAX_ACTORS} actors already placed. Remove one before adding another.`);
  }
  function validTarget(anchor) {
    if (!anchor || anchor.spatialKey !== spatialKey()) throw new Error("Point at the floor. Select a new location after alignment changes.");
    return anchor;
  }
  async function persist(command2) {
    requireEdit();
    pending = true;
    try {
      const next = await api("/api/actors", { revision: getState().revision, command: command2 });
      acceptState(next);
      recordEvent("actor-edit", { command: command2, revision: next.revision });
      return next;
    } finally {
      pending = false;
    }
  }
  async function create(anchor, delay = 0) {
    requirePlacement();
    const point = validTarget(anchor), actors = getState().scene.actors || [], preset = nextActorMotionPreset(actors, assets, getState().scene.actorStyle || "zombie"), asset = authoring && [...assets.values()].find((a) => a.defaultActor) || preset || [...assets.values()].find((a) => a.preferred) || assets.values().next().value;
    if (!asset) throw new Error("The default character asset has not loaded yet");
    const delta = new THREE.Vector3().fromArray(point.viewer).sub(new THREE.Vector3().fromArray(point.position));
    const actor = { id: "actor-" + crypto.randomUUID(), castSlot: nextCastSlot(actors), assetId: asset.id, motionId: deferNewMotion() || asset.bodyOnly ? null : preset?.id || null, name: `Actor ${nextCastSlot(actors)}`, position: [...point.position], yaw: Math.atan2(delta.x, delta.z), color: "#e7e9e5", trigger: "start", delay };
    await persist({ type: "create", actor });
    selected = actor.id;
    onSelect(selected);
    placing = false;
    cursor.visible = facingArrow.visible = false;
    emit(authoring ? "Mannequin placed. Select it and describe a basic motion; no motion import is needed." : actor.motionId ? `T-Pose actor placed · ${preset.name} assigned. Use the left grip to play or select another motion.` : "Mannequin placed. Select it to request a generated motion.");
    return message;
  }
  function select(id) {
    selected = id;
    onSelect(id);
    const actor = selectedActor();
    if (actor) emit(authoring ? `${actor.name} selected. Describe a basic motion to the Agent, or draw a curve to guide this actor.` : `${actor.name} selected: ${assets.get(actorMotionId(actor))?.name || "No motion assigned"}. Choose a motion, move the actor, ask it to face you, or adjust its entrance delay. A style request changes the whole cast.`);
  }
  function updateRay(raycaster) {
    const point = pickGround(raycaster);
    target = lockedTarget ? structuredClone(lockedTarget) : point ? { position: point.toArray(), viewer: viewPosition().toArray(), spatialKey: spatialKey() } : null;
    cursor.visible = !!target && (authoring ? placing : placing || !!lockedTarget || deferNewMotion() && !getState().scene.actors?.length && canEdit());
    facingArrow.visible = cursor.visible;
    if (target) {
      cursor.position.fromArray(target.position).add(new THREE.Vector3(0, 0.015, 0));
      try {
        const yaw = facingViewer(target.position, target.viewer);
        facingArrow.position.copy(cursor.position);
        facingArrow.setDirection(new THREE.Vector3(Math.sin(yaw), 0, Math.cos(yaw)));
      } catch {
        cursor.visible = facingArrow.visible = false;
      }
    }
  }
  function beginPlacement(delay = 0) {
    requirePlacement();
    placing = true;
    placementDelay = delay;
    target = null;
    cursor.visible = facingArrow.visible = false;
    emit(authoring ? "Point at the ground to place the actor · A Create · B Cancel" : "Point at the floor and press the right trigger to place an actor.");
    return message;
  }
  async function confirmPlacement(raycaster) {
    if (!placing) return false;
    updateRay(raycaster);
    if (!target) throw Error("Point at visible ground before confirming placement");
    return create(structuredClone(target), placementDelay);
  }
  function interceptRay(raycaster) {
    if (getPhase() !== "explore") return false;
    if (placing) {
      if (authoring) {
        updateRay(raycaster);
        emit("A Create actor · B Cancel", false);
      } else confirmPlacement(raycaster).catch((e) => emit(e.message, false));
      return true;
    }
    const hit = layer.pick(raycaster);
    if (hit && hit.distance <= occlusionDistance(raycaster)) {
      select(hit.id);
      return true;
    }
    return false;
  }
  function playable(actorIds) {
    requireEdit();
    if (!canPlay()) throw new Error("Wait until ready, then say Preview or select the Preview button.");
    const all = getState().scene.actors || [], actors = actorIds ? all.filter((a) => actorIds.includes(a.id)) : all;
    if (actorIds && actors.length !== new Set(actorIds).size) throw new Error("The door-triggered cast has changed");
    if (!actors.length) throw new Error("Place actors first");
    if (!actors.some((a) => a.motionPlan || actorMotionId(a))) throw new Error("Select an actor and assign a motion first");
    if (actors.some((a) => !assets.has(a.assetId) || actorMotionId(a) && !assets.has(actorMotionId(a)))) throw new Error("Actor motions are not loaded. Playback is unavailable.");
    return actors;
  }
  function start({ actorIds } = {}) {
    playable(actorIds);
    placing = false;
    cursor.visible = false;
    performance.start(actorIds);
    recordEvent("performance-start", { ...performance.snapshot(), ...actorIds ? { actorIds: [...actorIds] } : {} });
    emit("Playing · Left grip or Stop to pause · Unassigned actors remain in T-Pose");
  }
  function arm(actorIds, { cue = "door" } = {}) {
    playable(actorIds);
    placing = false;
    cursor.visible = false;
    performance.arm(actorIds);
    recordEvent("performance-armed", { ...performance.snapshot(), actorIds: [...actorIds] });
    emit(cue === "preview" ? "Actors are ready at the first frame. Press the left grip to preview." : "Actors are ready at the first frame. Open the door to start them together.");
  }
  function stop() {
    performance.stop();
    recordEvent("performance-stop", performance.snapshot());
    emit("Motion stopped. You can still move, speak, and edit.");
  }
  function resume() {
    requireEdit();
    if (!canPlay()) throw new Error("Confirm Preview first.");
    performance.resume();
    recordEvent("performance-resume", performance.snapshot());
    emit("Playing · Left grip to pause");
  }
  function toggleTransport() {
    const s = performance.snapshot(), done = pathCompleted(s) ?? performance.completed(assets);
    if (s.mode === "running" && !done) {
      stop();
      return;
    }
    if (placing) throw new Error(authoring ? "Press A to place the actor or B to cancel placement" : "Place with the right trigger, or press A to cancel");
    if (s.mode === "paused" && !done) resume();
    else start();
  }
  function edit() {
    performance.edit();
    recordEvent("performance-edit", performance.snapshot());
    emit("Back to T-Pose layout. Assigned motions are kept and restart on the next playback.");
  }
  async function change(changes, id = selected) {
    const actor = getState().scene.actors?.find((a) => a.id === id);
    if (!actor) throw new Error("Select an actor first");
    await persist({ type: "update", id: actor.id, changes });
  }
  async function assignMotion(motionId, id = selected) {
    const actor = getState().scene.actors?.find((a) => a.id === id);
    if (!actor) throw new Error("Select an actor first");
    const asset = motionId && assets.get(motionId);
    if (motionId && !asset) throw new Error("This motion has not been imported");
    if (asset?.bodyOnly) throw new Error("This is the default character asset. Describe a basic motion to the Agent.");
    await change({ motionId }, id);
    const nextRun = performance.snapshot().mode !== "editing";
    emit((asset ? `Assigned “${asset.name}” to ${actor.name}.` : `Cleared the motion for ${actor.name}.`) + (nextRun ? "Takes effect on the next playback. Current timing is unchanged." : asset ? "Holding T-Pose. Use the left grip to play." : "Holding T-Pose."));
    return message;
  }
  function assignPreferredMotion(id = selected) {
    const motions = [...assets.values()].filter((a) => !a.bodyOnly), preferred = motions.find((a) => a.preferred) || motions[0];
    if (!preferred) throw new Error("No motion assets imported");
    return assignMotion(preferred.id, id);
  }
  function nextMotion(id = selected) {
    const actor = getState().scene.actors?.find((a) => a.id === id);
    if (!actor) throw new Error("Select an actor first");
    const style = actorMotionPresets(assets).find((p) => p.id === actorMotionId(actor))?.style || getState().scene.actorStyle || "zombie", presets = actorMotionPresets(assets, style);
    if (!presets.length) return assignPreferredMotion(id);
    const index = presets.findIndex((p) => p.id === actorMotionId(actor));
    return assignMotion(presets[(index + 1) % presets.length].id, id);
  }
  async function setStyle(style, { playback = "play", context = {} } = {}) {
    requireEdit();
    if (playback === "play" && !canPlay()) throw new Error("Confirm Preview or prepare the motions again.");
    const initial = getState(), space = spatialKey();
    if (context.revision !== void 0 && context.revision !== initial.revision || context.spatialContext?.spatialKey && context.spatialContext.spatialKey !== space) throw new Error("Scene or alignment changed since you spoke. Submit the style request again.");
    changeCastStyle(initial.scene, style, [...assets.keys()]);
    const previous = performance.snapshot(), offsets = {};
    for (const actor of initial.scene.actors) {
      const view = layer.views.get(actor.id);
      if (view?.visible && previous.mode !== "editing") {
        const root = view.worldToLocal(view.bones[0].getWorldPosition(new THREE.Vector3()));
        offsets[actor.id] = [root.x, 0, root.z];
      }
    }
    performance.stop();
    pending = true;
    try {
      const next = await api("/api/actor-style", { revision: initial.revision, style });
      acceptState(next);
      performance.sync(next.scene.actors);
      placing = false;
      cursor.visible = false;
      if (spatialKey() !== space || getPhase() !== "explore") {
        performance.edit();
        emit("Motion style saved. Alignment changed; return to creating before playing.");
        return message;
      }
      if (previous.mode === "running") performance.resume();
      performance.switchMotions(offsets, playback);
      recordEvent("actor-style-switch", { style, playback, offsets, ...performance.snapshot(), actors: next.scene.actors.map((a) => ({ id: a.id, slot: a.castSlot, motionId: actorMotionId(a) })) });
      emit(`Changed ${next.scene.actors.length} actors to ${STYLE_LABELS[style]} motions. ${playback === "assign" ? "Takes effect on the next playback." : playback === "preserve" && previous.mode !== "running" ? "Paused / layout state retained. Left grip to play." : "Playing from the start. Left grip to pause."}`);
      return message;
    } catch (error) {
      if (previous.mode === "running" && getPhase() === "explore" && spatialKey() === space) performance.resume();
      throw error;
    } finally {
      pending = false;
    }
  }
  async function command(text, context = {}) {
    const intent = parseDirectorCommand(text);
    if (!intent) return null;
    if (intent.type === "style") return setStyle(intent.style, { context });
    if (intent.type === "create") return authoring ? beginPlacement(intent.delay) : create(context.actorTarget, intent.delay);
    if (intent.type === "start") {
      start();
      return message;
    }
    if (intent.type === "stop") {
      stop();
      return message;
    }
    if (intent.type === "resume") {
      resume();
      return message;
    }
    if (intent.type === "edit") {
      edit();
      return message;
    }
    if (intent.type === "unavailable") return "Choose an available motion from the asset list. Additional imported motions are required for unsupported actions.";
    if (intent.type === "motion") {
      if (!context.actorId) throw new Error("Select an actor first");
      if (intent.number) {
        const preset = actorMotionPresets(assets, getState().scene.actorStyle || "zombie").find((p) => p.number === intent.number);
        if (!preset) throw new Error(`Motion ${intent.number} has not loaded`);
        return assignMotion(preset.id, context.actorId);
      }
      return assignPreferredMotion(context.actorId);
    }
    if (intent.type === "clearMotion") return assignMotion(null, context.actorId);
    if (intent.type === "save") {
      await api("/api/save-scene", { revision: getState().revision }).then(acceptState);
      emit("Scene, actor positions, and entry timing saved.");
      return message;
    }
    if (intent.type === "delay") {
      await change({ delay: intent.delay }, context.actorId);
      emit(`Will appear ${intent.delay} seconds after the next playback starts.`);
      return message;
    }
    if (intent.type === "move") {
      await change({ position: [...validTarget(context.actorTarget).position] }, context.actorId);
      emit("Actor moved to the selected point. Motion timing is unchanged.");
      return message;
    }
    if (intent.type === "face") {
      const actor = getState().scene.actors?.find((a) => a.id === context.actorId);
      if (!actor) throw new Error("Select an actor first");
      const p = context.actorViewer || viewPosition().toArray();
      await change({ yaw: Math.atan2(p[0] - actor.position[0], p[2] - actor.position[2]) }, actor.id);
      emit("Actor now faces your current position.");
      return message;
    }
    if (intent.type === "remove") {
      if (!context.actorId) throw new Error("Select an actor first");
      const name = getState().scene.actors?.find((a) => a.id === context.actorId)?.name || "Actor";
      await persist({ type: "remove", id: context.actorId });
      selected = null;
      emit(`${name} removed and saved · Left stick click to undo`);
      return message;
    }
    return null;
  }
  return {
    lockPlacement(anchor) {
      validTarget(anchor);
      lockedTarget = structuredClone(anchor);
    },
    unlockPlacement() {
      lockedTarget = null;
      cursor.visible = facingArrow.visible = false;
    },
    command,
    setStyle,
    start,
    arm,
    stop,
    resume,
    toggleTransport,
    edit,
    select,
    change,
    assignMotion,
    assignPreferredMotion,
    nextMotion,
    updateRay,
    interceptRay,
    beginPlacement,
    confirmPlacement,
    cancelPlacement() {
      placing = false;
      target = null;
      cursor.visible = facingArrow.visible = false;
    },
    togglePlacement() {
      if (placing) {
        placing = false;
        target = null;
        cursor.visible = facingArrow.visible = false;
        emit("Placement closed. Click the right stick to toggle editing.");
      } else beginPlacement();
    },
    clearTarget() {
      target = null;
      cursor.visible = facingArrow.visible = false;
    },
    captureContext() {
      return { actorTarget: target ? structuredClone(target) : null, actorViewer: viewPosition().toArray(), actorId: selected };
    },
    previewGenerated(id) {
      performance.start([id]);
    },
    freeze(ids) {
      performance.arm(ids);
    },
    sync(scene) {
      performance.sync(scene.actors || []);
      if (selected && !scene.actors?.some((a) => a.id === selected)) selected = null;
    },
    frame(dt, opacity, { showSelection = true, selectedIds = null, overrides = [] } = {}) {
      performance.advance(dt);
      const changes = new Map(overrides.map((o) => [o.id, o]));
      frames = mapFrames(performance.frames(assets), performance.snapshot()).map((f) => changes.has(f.id) ? { ...f, ...changes.get(f.id) } : f);
      layer.apply(frames, { opacity, selected: showSelection ? selectedIds || selected : null });
      return frames;
    },
    snapshot() {
      return { placementPreview: { visible: cursor.visible, arrowVisible: facingArrow.visible, locked: !!lockedTarget, target: target ? structuredClone(target) : null }, style: getState()?.scene.actorStyle || "zombie", ...performance.snapshot(), completed: pathCompleted(performance.snapshot()) ?? performance.completed(assets), selected, placing, pending, message, actors: frames.map((f) => ({ id: f.id, assetId: f.assetId, motionId: f.motionId, pose: f.pose, castSlot: f.castSlot, motionOffset: f.motionOffset, position: f.position, yaw: f.yaw, delay: f.delay, clipTime: f.clipTime, visible: f.visible, preview: f.preview })), assetCount: assets.size };
    },
    frames: () => frames,
    layer
  };
}
export {
  createDirector
};
