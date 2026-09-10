import { entityLabel } from "./entity-label.mjs";
const dot = (a, b) => a.reduce((sum, x, i) => sum + x * b[i], 0);
const sub = (a, b) => a.map((x, i) => x - b[i]);
function idsInVolume(scene, { origin, u, v, n, a, b, depth }) {
  if (!Number.isFinite(depth) || depth <= 0) throw new Error("Invalid selection depth");
  return scene.objects.filter((object) => {
    if (object.id === "ground" && object.editable !== true) return false;
    const p = sub(object.position, origin), x = dot(p, u), y = dot(p, v), z = dot(p, n);
    return x >= Math.min(a[0], b[0]) && x <= Math.max(a[0], b[0]) && y >= Math.min(a[1], b[1]) && y <= Math.max(a[1], b[1]) && Math.abs(z) <= depth / 2;
  }).map((o) => o.id);
}
function selectionQuestion(scene, ids) {
  const names = ids.map((id) => entityLabel([...scene.objects, ...scene.actors || []].find((o) => o.id === id))).filter(Boolean);
  if (!names.length) return "Select an object, or describe what you want to create.";
  return names.length === 1 ? `Selected ${names[0]}. What would you like to change?` : `Selected ${names.length} objects. What would you like to change together?`;
}
export {
  idsInVolume,
  selectionQuestion
};
