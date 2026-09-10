import { doorTransform } from "./doors.mjs";
import { distanceToDoor } from "./door-performance.mjs";
const wrap = (x) => Math.atan2(Math.sin(x), Math.cos(x));
function bearing(p, o, d) {
  const h = (d.hinge === "left" ? -1 : 1) * o.size[0] / 2;
  return Math.atan2(-(p[2] - (o.position[2] - h * Math.sin(o.rotation))), p[0] - (o.position[0] + h * Math.cos(o.rotation)));
}
function createDoorGrab({ onEvent = () => {
}, openingMode = "follow-hand" } = {}) {
  let entries = /* @__PURE__ */ new Map(), owner = null, binding = null, identity = "", fired = false, armed = false;
  function release() {
    if (owner) {
      onEvent("doorRelease", { doorId: owner.id });
      owner = null;
    }
  }
  return {
    sync(scene, { reset = false } = {}) {
      const next = /* @__PURE__ */ new Map();
      for (const d of scene.behaviors?.doors || []) {
        const object = scene.objects.find((o) => o.id === d.doorId), old = entries.get(d.doorId);
        const compatible = old && JSON.stringify([old.object, old.config]) === JSON.stringify([object, d]);
        next.set(d.doorId, compatible && !reset ? old : { object, config: d, angle: 0 });
      }
      if (owner && (!next.has(owner.id) || next.get(owner.id) !== entries.get(owner.id))) release();
      entries = next;
      binding = scene.behaviors?.binding || null;
      const key = JSON.stringify(binding);
      if (key !== identity || reset) {
        identity = key;
        fired = false;
        armed = false;
        release();
        for (const e of entries.values()) e.angle = 0;
      }
    },
    grab(p) {
      if (owner || !p) return false;
      const near = [...entries].map(([id, e]) => ({ id, e, d: distanceToDoor(p, { ...e.object, ...doorTransform(e.object, e.config, e.angle / (Math.PI / 2)) }) })).filter((x) => x.d <= x.e.config.reach).sort((a, b) => a.d - b.d)[0];
      if (!near) return false;
      owner = { id: near.id, bearing: bearing(p, near.e.object, near.e.config), angle: near.e.angle };
      onEvent("doorGrab", { doorId: owner.id });
      return true;
    },
    release,
    frame(dt, p, { held = false, active = false } = {}) {
      if (owner && (!held || !active || !p)) release();
      const transforms = [];
      for (const [id, e] of entries) {
        if (owner?.id === id) e.angle = openingMode === "hold-to-open" ? Math.min(e.config.maxAngle, e.angle + Math.max(0, Math.min(dt, 0.1)) * e.config.maxAngle / e.config.duration) : Math.max(0, Math.min(e.config.maxAngle, owner.angle + e.config.direction * wrap(bearing(p, e.object, e.config) - owner.bearing)));
        else e.angle = Math.max(0, e.angle - Math.max(0, Math.min(dt, 0.1)) * e.config.maxAngle / e.config.duration);
        transforms.push(doorTransform(e.object, e.config, e.angle / (Math.PI / 2)));
        if (binding?.doorId === id) {
          if (!armed && !fired && !owner && e.angle < 1e-3) armed = true;
          if (active && armed && !fired && e.angle / e.config.maxAngle >= binding.threshold) {
            fired = true;
            armed = false;
            onEvent("doorTrigger", { doorId: id, pathId: binding.pathId });
          }
        }
      }
      return transforms;
    },
    reset() {
      release();
      for (const e of entries.values()) e.angle = 0;
      fired = false;
      armed = false;
      onEvent("previewReset", {});
    },
    snapshot: () => ({ grabbed: owner?.id || null, armed, fired, doors: [...entries].map(([id, e]) => ({ id, angle: e.angle, closing: owner?.id !== id && e.angle > 0 })) })
  };
}
export {
  createDoorGrab
};
