import { pathLength } from "./draft.mjs";
const JOINTS = ["pelvis", "left_hip", "right_hip", "spine1", "left_knee", "right_knee", "spine2", "left_ankle", "right_ankle", "spine3", "left_foot", "right_foot", "neck", "left_collar", "right_collar", "head", "left_shoulder", "right_shoulder", "left_elbow", "right_elbow", "left_wrist", "right_wrist", "left_hand", "right_hand"];
const number = { type: "number" };
const vector = { type: "array", items: number, minItems: 3, maxItems: 3 };
const object = (properties) => ({ type: "object", additionalProperties: false, properties, required: Object.keys(properties) });
const motionSchema = object({ reply: { type: "string" }, plan: { anyOf: [object({ name: { type: "string" }, cycle: number, repeats: { type: "integer" }, followCurve: { type: "boolean" }, speed: number, keyframes: { type: "array", items: object({ time: number, root: vector, joints: { type: "array", items: object({ joint: { type: "string", enum: JOINTS }, rotation: vector }) } }) } }), { type: "null" }] } });
const vec = (v) => Array.isArray(v) && v.length === 3 && v.every((n) => Number.isFinite(n));
function validateCurves(curves) {
  if (!Array.isArray(curves) || curves.length > 32) throw Error("At most 32 saved curves are supported");
  const ids = /* @__PURE__ */ new Set();
  for (const c of curves) {
    if (!c || typeof c.id !== "string" || !/^[a-zA-Z0-9_-]{1,80}$/.test(c.id) || ids.has(c.id) || !["floor2d", "space3d"].includes(c.mode)) throw Error("Invalid curve identifier");
    ids.add(c.id);
    if (!Array.isArray(c.points) || c.points.length < 2 || c.points.length > 512 || c.points.some((p) => !vec(p) || p.some((n) => Math.abs(n) > 100)) || pathLength(c.points) < 0.15 || pathLength(c.points) > 30.01) throw Error("Curves require a continuous valid stroke between 0.15 and 30 meters");
    if (c.mode === "floor2d" && c.points.some((p) => Math.abs(p[1] - c.points[0][1]) > 0.05)) throw Error("Floor curves must stay on the same plane");
  }
  return curves;
}
function validateMotionPlan(p) {
  if (!p || p.schema !== "vrbuild-motion-plan/1" || typeof p.name !== "string" || p.name.length > 120 || !Number.isFinite(p.cycle) || p.cycle < 0.25 || p.cycle > 12 || !Number.isInteger(p.repeats) || p.repeats < 1 || p.repeats > 120 || !Number.isFinite(p.duration) || p.duration < 0.25 || p.duration > 60) throw Error("Invalid generated motion duration or name");
  if (!Array.isArray(p.keyframes) || p.keyframes.length < 2 || p.keyframes.length > 32) throw Error("Motion requires 2 to 32 keyframes");
  let previous = -1;
  for (const f of p.keyframes) {
    if (!Number.isFinite(f.time) || f.time <= previous || f.time < 0 || f.time > p.cycle || !vec(f.root) || f.root.some((n) => Math.abs(n) > 2) || !Array.isArray(f.joints) || f.joints.length > 24) throw Error("Invalid generated motion keyframe");
    previous = f.time;
    const names = /* @__PURE__ */ new Set();
    for (const j of f.joints) {
      if (!JOINTS.includes(j.joint) || names.has(j.joint) || !vec(j.rotation) || j.rotation.some((n) => Math.abs(n) > 180)) throw Error("Invalid generated joint motion");
      names.add(j.joint);
    }
  }
  if (p.keyframes[0].time !== 0 || Math.abs(p.keyframes.at(-1).time - p.cycle) > 1e-3) throw Error("Keyframes must span the entire motion cycle");
  if (p.trajectory) {
    validateCurves([p.trajectory]);
    if (!Number.isFinite(p.trajectory.speed) || p.trajectory.speed < 0.1 || p.trajectory.speed > 2) throw Error("Curve speed must be between 0.1 and 2 meters per second");
  }
  const expected = p.trajectory ? pathLength(p.trajectory.points) / p.trajectory.speed : p.cycle * p.repeats;
  if (Math.abs(expected - p.duration) > 1e-3) throw Error("Motion duration does not match its trajectory");
  return p;
}
function compileMotion(result, scene, actorId, curveId) {
  if (!result || typeof result.reply !== "string" || result.reply.length > 3e3) throw Error("Invalid Agent reply");
  const actor = scene.actors?.find((a) => a.id === actorId);
  if (!actor) throw Error("Select one actor first");
  if (result.plan === null) return null;
  const raw = result.plan;
  let trajectory = null;
  if (typeof raw.followCurve !== "boolean") throw Error("Invalid motion trajectory instruction");
  if (raw.followCurve) {
    const curve = scene.curves?.find((c) => c.id === curveId);
    if (!curve) throw Error("Draw and save a curve before requesting movement along it");
    trajectory = { ...structuredClone(curve), speed: raw.speed };
  }
  const duration = trajectory ? pathLength(trajectory.points) / trajectory.speed : raw.cycle * raw.repeats;
  const plan = { schema: "vrbuild-motion-plan/1", name: raw.name, cycle: raw.cycle, repeats: raw.repeats, duration, keyframes: structuredClone(raw.keyframes), trajectory };
  return validateMotionPlan(plan);
}
function applyActorMotion(scene, { actorId, plan }) {
  validateMotionPlan(plan);
  if (!scene.actors?.some((a) => a.id === actorId)) throw Error("The actor no longer exists");
  const next = structuredClone(scene);
  next.actors = next.actors.map((a) => a.id === actorId ? { ...a, motionId: null, motionPlan: structuredClone(plan) } : a);
  if (next.behaviors?.path?.actorIds.includes(actorId)) {
    delete next.behaviors.path;
    delete next.behaviors.binding;
  }
  return next;
}
function sampleMotion(plan, seconds) {
  const time = Math.max(0, Math.min(seconds, plan.duration));
  const t = time >= plan.duration ? plan.cycle : time % plan.cycle;
  let b = plan.keyframes.findIndex((f) => f.time >= t);
  if (b < 0) b = plan.keyframes.length - 1;
  const a = Math.max(0, b - 1), fa = plan.keyframes[a], fb = plan.keyframes[b], u = a === b ? 0 : (t - fa.time) / (fb.time - fa.time), alpha = u * u * (3 - 2 * u);
  const root = fa.root.map((v, i) => v + (fb.root[i] - v) * alpha);
  let position = null, yaw = null;
  if (plan.trajectory) {
    const { points, speed } = plan.trajectory;
    let remaining = Math.min(time * speed, pathLength(points));
    for (let i = 1; i < points.length; i++) {
      const p = points[i - 1], q = points[i], length = Math.hypot(...q.map((n, k) => n - p[k]));
      if (remaining <= length || i === points.length - 1) {
        const f = length ? Math.min(1, remaining / length) : 0;
        position = p.map((n, k) => n + (q[k] - n) * f);
        if (Math.hypot(q[0] - p[0], q[2] - p[2]) > 1e-5) yaw = Math.atan2(q[0] - p[0], q[2] - p[2]);
        break;
      }
      remaining -= length;
    }
  }
  return { a: fa, b: fb, alpha, root, position, yaw };
}
export {
  JOINTS,
  applyActorMotion,
  compileMotion,
  motionSchema,
  sampleMotion,
  validateCurves,
  validateMotionPlan
};
