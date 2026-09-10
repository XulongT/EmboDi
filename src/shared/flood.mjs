import { validateRegions, polygonContains, regionObjectId, isRegionObject, isSourceRegion } from "./interaction-regions.mjs";
import { isDoor } from "./doors.mjs";
const number = { type: "number" };
const string = { type: "string" };
const object = (properties) => ({ type: "object", additionalProperties: false, properties, required: Object.keys(properties) });
const floodSchema = object({ reply: string, plan: { anyOf: [object({ triggerRegionId: string, dwellSeconds: number, sources: { type: "array", items: object({ regionId: string, speed: number, amount: number, reach: number, angle: number }) }, duration: number, color: string }), { type: "null" }] } });
const bounded = (n, min, max) => Number.isFinite(n) && n >= min && n <= max;
function validateFloods(scene) {
  if (scene.regions !== void 0) validateRegions(scene.regions, scene);
  if (scene.floods === void 0) return scene;
  if (!Array.isArray(scene.floods) || scene.floods.length > 8) throw Error("At most 8 flow interactions are supported");
  const ids = /* @__PURE__ */ new Set(), objects = /* @__PURE__ */ new Set();
  for (const f of scene.floods) {
    const ownerId = regionObjectId(f), owner = scene.objects.find((o) => o.id === ownerId);
    if (!f || f.schema !== "vrbuild-flood/1" || typeof f.id !== "string" || !/^[\w-]{1,80}$/.test(f.id) || ids.has(f.id) || objects.has(ownerId) || !(isRegionObject(owner) || isDoor(owner)) || f.objectId && f.doorId && f.objectId !== f.doorId) throw Error("Invalid flow ID or object target.");
    ids.add(f.id);
    objects.add(ownerId);
    const zone = scene.regions?.find((r) => r.id === f.trigger?.regionId);
    if (f.trigger?.type !== "region-dwell" || f.trigger.subject !== "user" || f.trigger.repeat !== "once-per-preview" || !zone || zone.surface !== "floor" || regionObjectId(zone) !== ownerId || !bounded(f.trigger.seconds, 0.1, 60)) throw Error("Flow needs this object's floor region and a 0.1–60 second viewer-dwell condition.");
    if (!bounded(f.duration, 0.5, 30) || typeof f.color !== "string" || !/^#[\da-f]{6}$/i.test(f.color)) throw Error("Invalid flow duration or color");
    if (!Array.isArray(f.sources) || !f.sources.length || f.sources.length > 6) throw Error("Select 1–6 surface source regions.");
    const sources = /* @__PURE__ */ new Set();
    for (const source of f.sources) {
      const region = scene.regions?.find((r) => r.id === source.regionId);
      if (!region || !isSourceRegion(region) || regionObjectId(region) !== ownerId || sources.has(source.regionId)) throw Error("Flow sources must belong to the selected object.");
      sources.add(source.regionId);
      if (!bounded(source.speed, 0.1, 3) || !bounded(source.amount, 0.1, 3) || !bounded(source.reach, 0.2, 6) || !bounded(source.angle, -150, 150)) throw Error("Flow speed, amount, reach or direction is outside the supported range");
    }
  }
  return scene;
}
function compileFlood(result, scene, objectId) {
  if (typeof result?.reply !== "string" || !result.reply.trim() || result.reply.length > 3e3) throw Error("Invalid Flood Agent reply");
  if (result.plan === null) return null;
  const owner = scene.objects.find((o) => o.id === objectId);
  if (!(isRegionObject(owner) || isDoor(owner))) throw Error("Select one editable object to author a flow effect.");
  const previous = scene.floods?.find((f) => regionObjectId(f) === objectId), p = result.plan;
  if (!p || !Array.isArray(p.sources)) throw Error("Invalid flow plan");
  const plan = { schema: "vrbuild-flood/1", id: previous?.id || "flood-" + objectId, objectId, ...isDoor(owner) ? { doorId: objectId } : {}, trigger: { type: "region-dwell", regionId: p.triggerRegionId, subject: "user", seconds: p.dwellSeconds, repeat: "once-per-preview" }, sources: p.sources.map((s) => ({ regionId: s.regionId, speed: s.speed, amount: s.amount, reach: s.reach, angle: s.angle })), duration: p.duration, color: p.color };
  if (previous && (previous.trigger.regionId !== plan.trigger.regionId || JSON.stringify(previous.sources.map((s) => s.regionId).sort()) !== JSON.stringify(plan.sources.map((s) => s.regionId).sort()))) throw Error("Preserve region bindings when adjusting an existing effect. Redraw the sketch to change its regions.");
  validateFloods({ ...scene, floods: [...(scene.floods || []).filter((f) => regionObjectId(f) !== objectId), plan] });
  return plan;
}
function applyFlood(scene, result, ids) {
  if (!Array.isArray(ids) || ids.length !== 1 || ids[0] !== regionObjectId(result.plan)) throw Error("Flow must modify only the selected object.");
  const next = structuredClone(scene);
  next.floods = [...(next.floods || []).filter((f) => regionObjectId(f) !== regionObjectId(result.plan)), structuredClone(result.plan)];
  return validateFloods(next);
}
function createFloodRuntime() {
  let scene = null, states = [], armed = false, last = null, enabledIds = null, paused = false;
  const reset = () => {
    states = (scene?.floods || []).map((f) => ({ id: f.id, dwell: 0, inside: false, fired: false, time: 0, events: 0 }));
    last = null;
  };
  return {
    sync(next) {
      scene = next;
      armed = false;
      paused = false;
      enabledIds = null;
      reset();
    },
    start(ids = null) {
      enabledIds = ids === null ? null : new Set(ids);
      armed = ids === null || ids.length > 0;
      paused = false;
      reset();
    },
    stop() {
      armed = false;
      paused = false;
      reset();
    },
    pause() {
      paused = true;
      last = null;
    },
    resume() {
      paused = false;
      last = null;
    },
    tick({ now, position, active = true, tracked = true }) {
      const valid = armed && active && tracked && Array.isArray(position) && position.length === 3 && position.every(Number.isFinite) && Number.isFinite(now);
      if (paused) {
        last = null;
        if (!valid) for (const s of states) {
          s.dwell = 0;
          s.inside = false;
        }
        return this.snapshot(valid);
      }
      const dt = last === null ? 0 : now - last;
      last = valid ? now : null;
      const interrupted = !valid || dt < 0 || dt > 0.25;
      for (const state of states) {
        if (enabledIds && !enabledIds.has(state.id)) continue;
        const f = scene.floods.find((f2) => f2.id === state.id), zone = scene.regions.find((r) => r.id === f.trigger.regionId);
        if (interrupted) {
          state.dwell = 0;
          state.inside = false;
          continue;
        }
        if (state.fired) {
          state.time = Math.min(f.duration, state.time + dt);
          continue;
        }
        const height = position[1] - zone.floorY;
        const inside = height >= 0.15 && height <= 3 && polygonContains(zone.points, [position[0], position[2]], state.inside ? 0.03 : 0);
        if (!inside) {
          state.dwell = 0;
          state.inside = false;
          continue;
        }
        if (state.inside) state.dwell += dt;
        else state.dwell = 0;
        state.inside = true;
        if (state.dwell > f.trigger.seconds) {
          state.fired = true;
          state.time = 0;
          state.events++;
        }
      }
      return this.snapshot(valid && !interrupted);
    },
    snapshot(visible = armed) {
      return { armed, paused, visible, activeIds: enabledIds ? [...enabledIds] : (scene?.floods || []).map((f) => f.id), states: states.map((s) => ({ ...s })) };
    }
  };
}
export {
  applyFlood,
  compileFlood,
  createFloodRuntime,
  floodSchema,
  validateFloods
};
