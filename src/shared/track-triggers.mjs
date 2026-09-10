import { closeRegionStroke, validatePolygon, polygonContains } from "./interaction-regions.mjs";
function floorTriggerRegion(curve, id = "trigger-" + curve?.id) {
  if (curve?.mode !== "floor2d") throw Error("A trigger needs a saved closed 2D ground curve");
  if (!Array.isArray(curve.points) || curve.points.length < 4) throw Error("Draw a closed region");
  const heights = curve.points.map((p) => p[1]);
  if (Math.max(...heights) - Math.min(...heights) > 0.08) throw Error("The trigger region must be on one ground plane");
  const raw = curve.points.map((p) => [p[0], p[2]]), distance = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
  let points, trimmedSamples = 0;
  try {
    points = closeRegionStroke(raw, "floor");
  } catch (error) {
    if (distance(raw[0], raw.at(-1)) > 0.12) throw error;
    let length = 0;
    for (let end = raw.length - 1; end >= 4; end--) {
      length += distance(raw[end], raw[end - 1]);
      if (length > 0.2 || distance(raw[end], raw[0]) > 0.12 || distance(raw[end - 1], raw[0]) > 0.12) break;
      try {
        points = closeRegionStroke(raw.slice(0, end), "floor");
        trimmedSamples = raw.length - end;
        break;
      } catch {
      }
    }
    if (!points) throw error;
  }
  return { schema: "vrbuild-trigger-region/1", id, name: "Floor trigger region", surface: "floor", sourceCurveId: curve.id, floorY: heights.reduce((a, b) => a + b, 0) / heights.length, points, ...trimmedSamples ? { closureRepair: { trimmedSamples, reason: "small-closure-overshoot" } } : {} };
}
function validateTrackTriggers(scene) {
  const regions = scene.triggerRegions || [], ids = /* @__PURE__ */ new Set();
  if (!Array.isArray(regions) || regions.length > 32) throw Error("Up to 32 floor trigger regions");
  for (const r of regions) {
    if (!r || r.schema !== "vrbuild-trigger-region/1" || typeof r.id !== "string" || !/^[-\w]{1,80}$/.test(r.id) || ids.has(r.id) || r.surface !== "floor" || !Number.isFinite(r.floorY) || Math.abs(r.floorY) > 100) throw Error("Invalid floor trigger region");
    validatePolygon(r.points, "floor");
    ids.add(r.id);
  }
  for (const o of scene.objects) {
    const t = o.track?.trigger;
    if (!t) continue;
    if (t.type !== "region-dwell" || t.subject !== "user" || t.repeat !== "once-per-preview" || !ids.has(t.regionId) || !Number.isFinite(t.seconds) || t.seconds < 0.1 || t.seconds > 60) throw Error("Invalid track trigger: user must dwell continuously for 0.1–60 seconds");
  }
  return scene;
}
function bindTrackTrigger(scene, { id, regionCurveId, regionId, seconds, trackCurveId, values = {} }) {
  const target = scene.objects.find((o) => o.id === id);
  if (!target) throw Error("Select the object to trigger first");
  if (trackCurveId) {
    if (trackCurveId === regionCurveId) throw Error("Specify the trigger region and movement path separately");
    if (!scene.curves?.some((c) => c.id === trackCurveId)) throw Error("Movement path no longer exists");
    target.track = { duration: 8, delay: 0, fadeOut: 0, orientation: "fixed", targetId: null, ...target.track, curveId: trackCurveId };
  }
  if (!target.track) throw Error("Bind a movement path before setting its trigger region");
  if (regionCurveId === target.track.curveId) throw Error("Use separate curves for the trigger region and movement path");
  let region = scene.triggerRegions?.find((r) => r.id === regionId);
  if (regionCurveId) {
    const curve = scene.curves?.find((c) => c.id === regionCurveId);
    region = floorTriggerRegion(curve);
    let hash = 2166136261;
    for (const c of JSON.stringify([region.floorY, region.points])) hash = Math.imul(hash ^ c.charCodeAt(0), 16777619);
    region.id = "trigger-" + curve.id + "-" + (hash >>> 0).toString(36);
    scene.triggerRegions = [...(scene.triggerRegions || []).filter((r) => r.id !== region.id), region];
  }
  if (!region) throw Error("Choose a saved closed ground curve as the trigger region");
  target.track.trigger = { type: "region-dwell", regionId: region.id, subject: "user", seconds, repeat: "once-per-preview" };
  for (const key of ["duration", "delay", "fadeOut", "orientation", "targetId"]) if (values[key] !== void 0) target.track[key] = values[key];
  return validateTrackTriggers(scene);
}
function createTrackTriggerRuntime() {
  let definition = { objects: [] }, states = [], last = null, armed = false, paused = false;
  const resetDwell = (s) => {
    s.inside = false;
    s.dwell = 0;
  };
  return {
    sync(scene) {
      definition = scene;
      states = [];
      last = null;
      armed = false;
      paused = false;
    },
    start(ids) {
      const selected = new Set(ids);
      states = definition.objects.filter((o) => selected.has(o.id) && o.track?.trigger).map((o) => ({ id: o.id, ...o.track.trigger, inside: false, dwell: 0, fired: false, time: 0 }));
      armed = true;
      paused = false;
      last = null;
    },
    stop() {
      armed = false;
      states = [];
      last = null;
    },
    pause() {
      paused = true;
      last = null;
      for (const s of states) if (!s.fired) resetDwell(s);
    },
    resume() {
      paused = false;
      last = null;
    },
    tick({ now, position, active = true, tracked = true }) {
      const valid = armed && !paused && active && tracked && Number.isFinite(now) && Array.isArray(position) && position.length === 3 && position.every(Number.isFinite);
      const gap = last === null ? 0 : now - last, continuous = valid && gap >= 0 && gap <= 0.25, dt = continuous ? gap : 0;
      last = valid ? now : null;
      for (const s of states) {
        if (s.fired) {
          if (continuous) s.time += dt;
          continue;
        }
        if (!continuous) {
          resetDwell(s);
          continue;
        }
        const r = definition.triggerRegions.find((r2) => r2.id === s.regionId), height = position[1] - r.floorY;
        const inside = height >= 0.15 && height <= 3 && polygonContains(r.points, [position[0], position[2]], s.inside ? 0.03 : 0);
        if (!inside) {
          resetDwell(s);
          continue;
        }
        s.dwell += s.inside ? dt : 0;
        s.inside = true;
        if (s.dwell + 1e-8 >= s.seconds) {
          s.fired = true;
          s.time = 0;
          s.dwell = s.seconds;
        }
      }
      return this.snapshot();
    },
    snapshot() {
      return { armed, paused, states: structuredClone(states), clocks: Object.fromEntries(states.map((s) => [s.id, s.fired ? s.time : null])) };
    }
  };
}
export {
  bindTrackTrigger,
  createTrackTriggerRuntime,
  floorTriggerRegion,
  validateTrackTriggers
};
