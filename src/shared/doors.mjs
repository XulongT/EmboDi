const isDoor = (o) => !!o && o.shape === "box" && (o.role === "door" || o.group === "rebuilt-doors" || o.group === "scan-doors");
function validateDoorEffects(scene) {
  if (scene.doorEffects === void 0) return;
  if (!Array.isArray(scene.doorEffects) || scene.doorEffects.length > 30) throw new Error("Invalid door effect");
  const ids = /* @__PURE__ */ new Set();
  for (const d of scene.doorEffects) {
    if (!isDoor(scene.objects.find((o) => o.id === d.objectId)) || ids.has(d.objectId)) throw new Error("A door effect must reference a unique door object");
    ids.add(d.objectId);
    if (!["left", "right"].includes(d.hinge) || ![-1, 1].includes(d.direction) || typeof d.open !== "boolean" || !Number.isFinite(d.duration) || d.duration < 0.2 || d.duration > 10) throw new Error("Invalid door parameters");
  }
}
function updateDoor(scene, { objectId, type }) {
  if (!isDoor(scene.objects.find((o) => o.id === objectId))) throw new Error("Select a blockout door first");
  if (!["open", "close", "hinge", "direction"].includes(type)) throw new Error("Invalid door action");
  const next = structuredClone(scene);
  next.doorEffects ??= [];
  let effect = next.doorEffects.find((d) => d.objectId === objectId);
  if (!effect) {
    effect = { objectId, hinge: "left", direction: 1, duration: 1.2, open: false };
    next.doorEffects.push(effect);
  }
  if (type === "open" || type === "close") effect.open = type === "open";
  else {
    effect[type] = type === "hinge" ? effect.hinge === "left" ? "right" : "left" : -effect.direction;
    effect.open = false;
  }
  const grab = next.behaviors?.doors?.find((d) => d.doorId === objectId);
  if (grab) {
    grab.hinge = effect.hinge;
    grab.direction = effect.direction;
  }
  validateDoorEffects(next);
  return next;
}
function doorTransform(object, effect, progress = effect.open ? 1 : 0) {
  const h = (effect.hinge === "left" ? -1 : 1) * object.size[0] / 2, base = object.rotation, p = object.position;
  const rotation = base + effect.direction * Math.PI / 2 * progress;
  return { id: object.id, position: [p[0] + h * Math.cos(base) - h * Math.cos(rotation), p[1], p[2] - h * Math.sin(base) + h * Math.sin(rotation)], rotation };
}
function createDoorPlayer() {
  let definitions = /* @__PURE__ */ new Map(), entries = /* @__PURE__ */ new Map(), paused = false, initialized = false;
  function sync(scene, { reset = false } = {}) {
    definitions = new Map(scene.objects.map((o) => [o.id, o]));
    const next = /* @__PURE__ */ new Map();
    for (const d of scene.doorEffects || []) {
      const previous = !reset && entries.get(d.objectId), same = previous && previous.effect.hinge === d.hinge && previous.effect.direction === d.direction;
      next.set(d.objectId, { effect: d, progress: reset || !initialized ? d.open ? 1 : 0 : same ? previous.progress : 0 });
    }
    entries = next;
    initialized = true;
    if (reset) paused = false;
  }
  function frame(dt) {
    const result = [];
    for (const [id, item] of entries) {
      const target = item.effect.open ? 1 : 0;
      if (!paused) {
        const step = Math.max(0, Math.min(dt, 0.1)) / item.effect.duration;
        item.progress += Math.sign(target - item.progress) * Math.min(step, Math.abs(target - item.progress));
      }
      const t = item.progress;
      result.push(doorTransform(definitions.get(id), item.effect, t * t * (3 - 2 * t)));
    }
    return result;
  }
  return { sync, frame, pause: () => {
    paused = true;
  }, resume: () => {
    paused = false;
  }, snapshot: () => ({ paused, doors: [...entries].map(([id, v]) => ({ id, progress: v.progress, ...v.effect })) }) };
}
function doorMenuEntry(context) {
  return context.phase === "explore" && context.door && !context.job && !context.saving && !context.finishing && context.recording === "idle" && !context.actorPlacing ? [{ id: "doors", label: `${context.door.name} · Door settings`, disabled: !!context.editingBusy }] : [];
}
export {
  createDoorPlayer,
  doorMenuEntry,
  doorTransform,
  isDoor,
  updateDoor,
  validateDoorEffects
};
