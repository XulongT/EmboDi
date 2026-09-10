const CAST_OFFSETS = Object.freeze([[0, 0, 0], [-0.2, 0, -1.1], [0.55, 0, -0.2], [-0.5, 0, -3.1], [0.1, 0, -1.8]].map(Object.freeze));
const rotate = (p, a) => [Math.cos(a) * p[0] + Math.sin(a) * p[2], p[1], -Math.sin(a) * p[0] + Math.cos(a) * p[2]];
const local = (p, o) => rotate(p.map((v, i) => v - o.position[i]), -o.rotation);
function floorAt(scene, p) {
  return scene.objects.filter((o) => (o.role === "floor" || o.id === "ground") && o.shape === "box").filter((o) => {
    const q = local(p, o);
    return Math.abs(q[0]) <= o.size[0] / 2 + 1e-3 && Math.abs(q[2]) <= o.size[2] / 2 + 1e-3;
  }).reduce((n, o) => Math.max(n, o.position[1] + o.size[1] / 2), -Infinity);
}
function fits(scene, p) {
  return Number.isFinite(floorAt(scene, p)) && !scene.objects.some((o) => !["floor", "ceiling", "window"].includes(o.role) && o.id !== "ground" && o.shape === "box" && o.position[1] + o.size[1] / 2 > p[1] + 0.15 && o.position[1] - o.size[1] / 2 < p[1] + 1.7 && (() => {
    const q = local(p, o);
    return Math.abs(q[0]) < o.size[0] / 2 + 0.23 && Math.abs(q[2]) < o.size[2] / 2 + 0.23;
  })());
}
function formationPositions(anchor, heading) {
  return CAST_OFFSETS.map((offset) => rotate(offset, heading).map((v, i) => v + anchor[i]));
}
function facingViewer(position, viewer) {
  if (![position, viewer].every((p) => Array.isArray(p) && p.length === 3 && p.every((n) => Number.isFinite(n) && Math.abs(n) <= 100))) throw new Error("Point at a valid floor");
  const x = viewer[0] - position[0], z = viewer[2] - position[2];
  if (Math.hypot(x, z) < 0.1) throw new Error("That point is too close. Aim at the floor ahead of you.");
  return Math.atan2(x, z);
}
export {
  CAST_OFFSETS,
  facingViewer,
  fits,
  floorAt,
  formationPositions
};
