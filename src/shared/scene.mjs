import { Quaternion, Vector3 } from "three";
import { CATEGORY_IDS } from "./categories.mjs";
import { validateBehaviors } from "./behaviors.mjs";
import { validateRoomMetrics } from "./room-spatial.mjs";
import { validateCurves } from "./authoring-motion.mjs";
import { validateActors } from "./actors.mjs";
import { validateDoorEffects } from "./doors.mjs";
import { validateDoorPerformance } from "./door-performance.mjs";
import { validateFloods } from "./flood.mjs";
import { validateCinema } from "./cinema.mjs";
const SHAPES = ["box", "sphere", "cylinder", "cone"];
const clone = (value) => structuredClone(value);
function validateObject(object) {
  if (!object || typeof object !== "object") throw new Error("Invalid object");
  if (!/^[a-zA-Z0-9_-]{1,64}$/.test(object.id)) throw new Error("Invalid object ID");
  if (typeof object.name !== "string" || object.name.length > 100) throw new Error("Invalid object name");
  if (typeof object.group !== "string" || object.group.length > 100) throw new Error("Invalid group");
  if (object.category !== void 0 && !CATEGORY_IDS.includes(object.category)) throw new Error("Invalid object category");
  if (object.editable !== void 0 && typeof object.editable !== "boolean") throw new Error("Invalid editing property");
  if (object.role !== void 0 && !["floor", "ceiling", "wall", "door", "window", "furniture"].includes(object.role)) throw new Error("Invalid scene part type");
  if (object.assemblyId !== void 0 && object.assemblyId !== null && !/^[a-zA-Z0-9_-]{1,64}$/.test(object.assemblyId)) throw new Error("Invalid furniture entity ID");
  if (!SHAPES.includes(object.shape)) throw new Error("Unsupported geometry type");
  if (!/^#[\da-f]{6}$/i.test(object.color)) throw new Error("Color must be a six-digit hexadecimal value");
  for (const key of ["position", "size"]) {
    if (!Array.isArray(object[key]) || object[key].length !== 3 || !object[key].every(Number.isFinite)) throw new Error(`Invalid ${key}`);
  }
  if (object.position.some((v) => Math.abs(v) > 100)) throw new Error("Object is outside the prototype scene bounds");
  if (object.size.some((v) => v < 0.02 || v > 100)) throw new Error("Object dimensions are outside the supported range");
  if (!Number.isFinite(object.rotation) || Math.abs(object.rotation) > Math.PI * 2) throw new Error("Invalid rotation angle");
  for (const key of ["roughness", "metalness"]) {
    if (!Number.isFinite(object[key]) || object[key] < 0 || object[key] > 1) throw new Error("Invalid material parameters");
  }
  return object;
}
function validateScene(scene) {
  if (!scene || typeof scene.title !== "string" || scene.title.length > 100 || typeof scene.description !== "string" || scene.description.length > 2e3) throw new Error("Invalid scene information");
  if (!Array.isArray(scene.objects) || !scene.objects.length || scene.objects.length > 180) throw new Error("Scene must contain between 1 and 180 objects");
  if (scene.room !== void 0) validateRoomMetrics(scene.room);
  if (scene.referenceFloor !== void 0) {
    validateObject(scene.referenceFloor);
    if (scene.referenceFloor.shape !== "box") throw new Error("The scene reference floor must be rectangular");
  }
  if (scene.actorStyle !== void 0 && !["zombie", "cute"].includes(scene.actorStyle)) throw new Error("Invalid actor style");
  const ids = /* @__PURE__ */ new Set();
  for (const object of scene.objects) {
    validateObject(object);
    if (ids.has(object.id)) throw new Error("Duplicate object ID");
    ids.add(object.id);
  }
  if (scene.actors !== void 0) {
    validateActors(scene.actors);
    for (const actor of scene.actors) if (ids.has(actor.id)) throw new Error("Actor ID conflicts with an object ID");
  }
  if (scene.curves !== void 0) validateCurves(scene.curves);
  validateCinema(scene);
  validateBehaviors(scene);
  validateDoorEffects(scene);
  validateDoorPerformance(scene);
  validateFloods(scene);
  return scene;
}
function applyPatch(scene, patch, allowedIds = scene.objects.map((o) => o.id)) {
  if (!patch || !Array.isArray(patch.updates) || !Array.isArray(patch.creates)) throw new Error("Invalid change format");
  if (patch.updates.length + patch.creates.length === 0) throw new Error("No changes to apply");
  const next = clone(scene), allowed = new Set(allowedIds), updated = /* @__PURE__ */ new Set();
  for (const object of patch.updates) {
    validateObject(object);
    const index = next.objects.findIndex((o) => o.id === object.id);
    if (index < 0 || !allowed.has(object.id)) throw new Error("Changes include an unselected object");
    if (updated.has(object.id)) throw new Error("The same object was edited more than once");
    updated.add(object.id);
    const old = next.objects[index], metadata = Object.fromEntries(["assemblyId", "scanAnchorId", "role", "editable", "sourcePlanes", "kind", "camera", "light", "track", "aimTargetId"].filter((k) => old[k] !== void 0).map((k) => [k, old[k]]));
    next.objects[index] = { ...clone(object), ...object.category === void 0 && old.category ? { category: old.category } : {}, ...metadata, ...old.quaternion ? { quaternion: new Quaternion().setFromAxisAngle(new Vector3(0, 1, 0), object.rotation - old.rotation).multiply(new Quaternion(...old.quaternion)).normalize().toArray() } : {}, ...old.colorSource === "custom" || object.color !== old.color ? { colorSource: "custom" } : {} };
  }
  for (const object of patch.creates) next.objects.push(clone(validateObject(object)));
  return validateScene(next);
}
function colorPatch(scene, ids, color) {
  const chosen = new Set(ids);
  return { updates: scene.objects.filter((o) => chosen.has(o.id)).map((o) => ({ ...clone(o), color, colorSource: "custom" })), creates: [] };
}
function idsInRegion(scene, a, b) {
  return scene.objects.filter((o) => (o.id !== "ground" || o.editable === true) && o.position[0] >= Math.min(a[0], b[0]) && o.position[0] <= Math.max(a[0], b[0]) && o.position[2] >= Math.min(a[2], b[2]) && o.position[2] <= Math.max(a[2], b[2])).map((o) => o.id);
}
function seedScene() {
  const objects = [];
  const add = (id, name, group, shape, position, size, color, extra = {}) => objects.push({ id, name, group, shape, position, size, color, rotation: 0, roughness: 0.85, metalness: 0, ...extra });
  add("ground", "Scene floor", "Terrain", "box", [0, -0.55, 0], [40, 1, 32], "#324657");
  add("plaza", "Entrance plaza", "Plaza", "cylinder", [0, -0.015, 8], [7, 0.08, 7], "#ac9781");
  add("path", "Village main road", "Plaza", "box", [0, 0, 0], [3, 0.12, 24], "#9d8a76");
  add("cross-path", "Cross path", "Plaza", "box", [0, 0.01, 2], [26, 0.1, 2], "#9d8a76");
  let n = 0;
  for (const [x, z, w, h, d] of [[-7, 5, 4, 3, 4], [-7, -2, 4.6, 4, 4], [7, 4, 5, 3.3, 4], [7, -4, 4, 3.8, 4], [-13, -6, 4, 2.8, 4], [13, -8, 4, 3, 4]]) {
    n++;
    const group = `Building ${String(n).padStart(2, "0")}`, id = `house-${n}`;
    const colors = ["#e1c59b", "#adbac5", "#d9a781", "#ddcbb0", "#9aafb3", "#c9ad8d"];
    add(`${id}-body`, `${group} · Exterior wall`, group, "box", [x, h / 2, z], [w, h, d], colors[n - 1]);
    add(`${id}-roof`, `${group} · Roof`, group, "cone", [x, h + 1.1, z], [w * 1.5, 2.3, d * 1.5], "#526c8a", { rotation: Math.PI / 4 });
    add(`${id}-door`, `${group} · Door`, group, "box", [x, 0.9, z + d / 2 + 0.03], [0.9, 1.8, 0.07], "#31424e");
    for (const dx of [-w * 0.28, w * 0.28]) add(`${id}-window-${dx < 0 ? "l" : "r"}`, `${group} · Window`, group, "box", [x + dx, h * 0.66, z + d / 2 + 0.05], [0.55, 0.8, 0.09], "#f4cf76");
  }
  add("studio-floor", "Studio · Floor", "Studio", "box", [0, 0.06, -9], [6, 0.12, 5], "#c3ad8f");
  add("studio-back", "Studio · Back wall", "Studio", "box", [0, 1.8, -11.5], [6, 3.6, 0.2], "#acc3c2");
  add("studio-left", "Studio · Left wall", "Studio", "box", [-3, 1.8, -9], [0.2, 3.6, 5], "#acc3c2");
  add("studio-right", "Studio · Right wall", "Studio", "box", [3, 1.8, -9], [0.2, 3.6, 5], "#acc3c2");
  add("studio-roof", "Studio · Roof", "Studio", "box", [0, 3.7, -9], [6.6, 0.2, 5.6], "#56748a");
  add("table-top", "Studio · Square table top", "Table", "box", [0, 1, -9], [1.8, 0.15, 1.4], "#bd845c");
  add("table-base", "Studio · Table leg", "Table", "cylinder", [0, 0.49, -9], [0.35, 0.98, 0.35], "#586879");
  for (let i = 0; i < 9; i++) {
    const x = -17 + i * 4.2, z = -15.4 - i % 2 * 0.5;
    add(`hill-${i}`, `Distant hill ${i + 1}`, "Distant hills", "sphere", [x, 0.5, z], [7, 5 + i % 3, 5], "#425876");
  }
  for (const [i, x, z] of [[0, -16, 9], [1, -14, 5], [2, 15, 9], [3, 15, -1], [4, -12, -10]]) {
    add(`tree-${i}-trunk`, "Tree trunk", `Tree ${i + 1}`, "cylinder", [x, 1.4, z], [0.45, 2.8, 0.45], "#655c4e");
    add(`tree-${i}-crown`, "Tree crown", `Tree ${i + 1}`, "cone", [x, 3.4, z], [2.2, 5, 2.2], i === 0 ? "#1f424c" : "#447264");
  }
  add("moon", "Moon", "Sky", "sphere", [12, 13, -10], [2.4, 2.4, 1], "#ffdc86");
  for (let i = 0; i < 13; i++) add(`star-${i}`, `Star ${i + 1}`, "Sky", "sphere", [-17 + i * 2.7, 10 + i * 7 % 5, -13], [0.28 + i % 3 * 0.12, 0.28 + i % 3 * 0.12, 0.28], "#f6dbae");
  return validateScene({ title: "Starry village · Sample world", description: "A procedural sample for testing overview, entry and editing. It was not reconstructed from uploaded photos.", objects });
}
const objectSchema = {
  type: "object",
  additionalProperties: false,
  properties: { id: { type: "string" }, name: { type: "string", description: "A concise English object name, regardless of the user language." }, group: { type: "string", description: "An English group name." }, shape: { type: "string", enum: SHAPES }, position: { type: "array", items: { type: "number" }, minItems: 3, maxItems: 3 }, size: { type: "array", items: { type: "number" }, minItems: 3, maxItems: 3 }, color: { type: "string" }, rotation: { type: "number" }, roughness: { type: "number" }, metalness: { type: "number" } },
  required: ["id", "name", "group", "shape", "position", "size", "color", "rotation", "roughness", "metalness"]
};
const sceneSchema = { type: "object", additionalProperties: false, properties: { title: { type: "string" }, description: { type: "string" }, objects: { type: "array", items: objectSchema } }, required: ["title", "description", "objects"] };
objectSchema.properties.assemblyId = { type: ["string", "null"], description: "Same explicit ID for the parts of ONE furniture assembly; null for independent objects. Not a semantic category." };
objectSchema.required.push("assemblyId");
const patchSchema = { type: "object", additionalProperties: false, properties: { explanation: { type: "string" }, updates: { type: "array", items: objectSchema }, creates: { type: "array", items: objectSchema } }, required: ["explanation", "updates", "creates"] };
export {
  SHAPES,
  applyPatch,
  colorPatch,
  idsInRegion,
  objectSchema,
  patchSchema,
  sceneSchema,
  seedScene,
  validateObject,
  validateScene
};
