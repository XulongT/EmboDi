import {languagePattern, numberWords} from "./language.mjs";
import { Quaternion, Vector3 } from "three";
import { validateScene } from "./scene.mjs";
const vector = (v) => Array.isArray(v) && v.length === 3 && v.every((n) => Number.isFinite(n) && Math.abs(n) <= 200);
const wrapYaw = (a) => Math.atan2(Math.sin(a), Math.cos(a));
const allEntities = (scene) => [...scene.objects, ...scene.actors || []];
function expandSelection(scene, ids) {
  const chosen = new Set(ids), assemblies = new Set(scene.objects.filter((o) => chosen.has(o.id) && o.assemblyId).map((o) => o.assemblyId));
  return allEntities(scene).filter((o) => chosen.has(o.id) || o.assemblyId && assemblies.has(o.assemblyId)).map((o) => o.id);
}
function transformTargets(scene, ids) {
  if (!Array.isArray(ids) || !ids.length || ids.length > 187 || new Set(ids).size !== ids.length || ids.some((id) => !allEntities(scene).some((o) => o.id === id))) throw new Error("Select a valid actor or object first");
  const expanded = expandSelection(scene, ids), targets = allEntities(scene).filter((o) => expanded.includes(o.id));
  if (targets.some((o) => o.editable !== true && (o.id === "ground" || o.category === "structure" || /^(wall|ceiling)(_|-|$)/.test(o.id)))) throw new Error("Scan reference is locked. Build an editable scene from the scan first.");
  return targets;
}
function validateTransform(scene, op) {
  const targets = transformTargets(scene, op?.ids);
  if (!vector(op.pivot) || !vector(op.translation) || !Number.isFinite(op.yaw) || Math.abs(op.yaw) > Math.PI * 2) throw new Error("Invalid transform parameters");
  return { ...op, ids: targets.map((o) => o.id) };
}
function transformUpdates(targets, op) {
  const c = Math.cos(op.yaw), s = Math.sin(op.yaw), [px, , pz] = op.pivot, [dx, dy, dz] = op.translation;
  return targets.map((o) => {
    const [x, y, z] = o.position;
    return { id: o.id, position: [px + c * (x - px) + s * (z - pz) + dx, y + dy, pz - s * (x - px) + c * (z - pz) + dz], ...o.assetId ? { yaw: wrapYaw(o.yaw + op.yaw) } : { rotation: wrapYaw(o.rotation + op.yaw), ...o.quaternion ? { quaternion: new Quaternion().setFromAxisAngle(new Vector3(0, 1, 0), op.yaw).multiply(new Quaternion(...o.quaternion)).normalize().toArray() } : {} } };
  });
}
function applyTransform(scene, input) {
  const op = validateTransform(scene, input), updates = new Map(transformUpdates(transformTargets(scene, op.ids), op).map((o) => [o.id, o]));
  const next = structuredClone(scene);
  for (const o of allEntities(next)) if (updates.has(o.id)) Object.assign(o, updates.get(o.id));
  return validateScene(next);
}
function validateSpatialContext(value) {
  if (!value || !vector(value.viewer) || !vector(value.forward) || !vector(value.pivot) || value.point !== null && !vector(value.point) || typeof value.spatialKey !== "string" || value.spatialKey.length > 2e3) throw new Error("Spatial context is invalid. Point at the target again.");
  if (Math.hypot(value.forward[0], value.forward[2]) < 0.5) throw new Error("Invalid viewer orientation");
  return value;
}
function withKnownAssemblies(scene) {
  const next = structuredClone(scene);
  const sets = { studio_table: ["table-top", "table-base"], central_table: ["central_table_top", "central_table_support_left", "central_table_support_right"], rear_table: ["rear_table_top", "rear_table_support_left", "rear_table_support_right"] };
  for (const [assemblyId, ids] of Object.entries(sets)) if (ids.every((id) => next.objects.some((o) => o.id === id))) {
    for (const o of next.objects) if (ids.includes(o.id) && !o.assemblyId) o.assemblyId = assemblyId;
  }
  return next;
}
const transformPlanSchema = { type: "object", additionalProperties: false, properties: { type: { type: "string", enum: ["translate", "rotate", "place", "face"] }, frame: { type: "string", enum: ["viewer", "object", "scene"] }, offset: { type: "array", items: { type: "number" }, minItems: 3, maxItems: 3 }, degrees: { type: "number" }, target: { type: "string", enum: ["viewer", "point", "entity"] }, targetId: { type: "string" } }, required: ["type", "frame", "offset", "degrees", "target", "targetId"] };
function resolveTransformPlan(scene, ids, context, plan) {
  const targets = transformTargets(scene, ids), ctx = validateSpatialContext(context);
  if (!plan || !["translate", "rotate", "place", "face"].includes(plan.type) || !["viewer", "object", "scene"].includes(plan.frame) || !vector(plan.offset) || !Number.isFinite(plan.degrees) || Math.abs(plan.degrees) > 360) throw new Error("Invalid transform instruction from the agent");
  const op = { ids: targets.map((o) => o.id), pivot: [...ctx.pivot], translation: [0, 0, 0], yaw: 0 };
  if (plan.type === "translate") {
    let forward = plan.frame === "viewer" ? ctx.forward : plan.frame === "object" ? [Math.sin(targets[0].yaw ?? targets[0].rotation), 0, Math.cos(targets[0].yaw ?? targets[0].rotation)] : [0, 0, 1];
    if (plan.frame === "object" && targets.length > 1 && new Set(targets.map((o) => o.assemblyId || o.id)).size > 1) throw new Error("Selected objects face different directions. Specify movement relative to you or the room.");
    const norm = Math.hypot(forward[0], forward[2]), fx = forward[0] / norm, fz = forward[2] / norm, [x, y, z] = plan.offset;
    op.translation = plan.frame === "scene" ? [x, y, z] : [-fz * x + fx * z, y, fx * x + fz * z];
  } else if (plan.type === "rotate") op.yaw = plan.degrees * Math.PI / 180;
  else {
    const target = plan.target === "viewer" ? ctx.viewer : plan.target === "point" ? ctx.point : plan.target === "entity" ? allEntities(scene).find((o) => o.id === plan.targetId)?.position : null;
    if (!target) throw new Error("Point at a destination or specify an object to face");
    if (plan.type === "place") op.translation = target.map((v, i) => v - ctx.pivot[i]);
    else {
      if (targets.length > 1 && new Set(targets.map((o) => o.assemblyId || o.id)).size > 1) throw new Error("Set actors' facing direction individually, or rotate the selected group together");
      if (Math.hypot(target[0] - ctx.pivot[0], target[2] - ctx.pivot[2]) < 0.05) throw new Error("Facing target is too close. Choose another target.");
      op.yaw = wrapYaw(Math.atan2(target[0] - ctx.pivot[0], target[2] - ctx.pivot[2]) - (targets[0].yaw ?? targets[0].rotation));
    }
  }
  applyTransform(scene, op);
  return op;
}
const isTransformRequest = (text) => languagePattern("transform.request").test(text);
function parseTransformText(text) {
  const t = text.trim(), plan = { type: "translate", frame: "viewer", offset: [0, 0, 0], degrees: 0, target: "point", targetId: "" };
  if (languagePattern("transform.ambiguousRequest").test(t)) return null;
  if (languagePattern("transform.placeHere").test(t)) return { ...plan, type: "place" };
  if (languagePattern("transform.faceViewer").test(t)) return { ...plan, type: "face", target: "viewer" };
  const amounts = numberWords.transformAmounts;
  const quantities = [...t.matchAll(languagePattern("transform.quantity"))];
  if (quantities.length !== 1) return null;
  const match = quantities[0];
  const number = amounts[match[1]] ?? Number(match[1]), unit = match[2];
  if (languagePattern("transform.degrees").test(unit) && languagePattern("transform.rotation").test(t) && languagePattern("transform.horizontalDirection").test(t)) return { ...plan, type: "rotate", degrees: languagePattern("transform.right").test(t) ? -number : number };
  if (!languagePattern("transform.distanceUnit").test(unit)) return null;
  const n = languagePattern("transform.centimeterQuantity").test(unit) ? number / 100 : number;
  if (languagePattern("transform.objectFrame").test(t)) plan.frame = "object";
  if (languagePattern("transform.left").test(t)) plan.offset[0] = -n;
  else if (languagePattern("transform.right").test(t)) plan.offset[0] = n;
  else if (languagePattern("transform.up").test(t)) plan.offset[1] = n;
  else if (languagePattern("transform.down").test(t)) plan.offset[1] = -n;
  else if (languagePattern("transform.forward").test(t)) plan.offset[2] = n;
  else if (languagePattern("transform.backward").test(t)) plan.offset[2] = -n;
  else return null;
  return plan;
}
export {
  allEntities,
  applyTransform,
  expandSelection,
  isTransformRequest,
  parseTransformText,
  resolveTransformPlan,
  transformPlanSchema,
  transformTargets,
  transformUpdates,
  validateSpatialContext,
  validateTransform,
  withKnownAssemblies,
  wrapYaw
};
