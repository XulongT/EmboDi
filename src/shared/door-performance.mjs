function distanceToDoor(p, o) {
  const d = p.map((v, i) => v - o.position[i]), c = Math.cos(o.rotation), s = Math.sin(o.rotation), q = [c * d[0] - s * d[2], d[1], s * d[0] + c * d[2]];
  return Math.hypot(...q.map((v, i) => Math.max(0, Math.abs(v) - o.size[i] / 2)));
}
function validateDoorPerformance(scene) {
  if (scene.doorPerformance) throw Error("Unsupported scene data");
}
const createDoorPerformanceCue = () => ({ sync() {
}, update: () => null, touch: () => null, snapshot: () => ({ enabled: false, actorIds: [] }) });
function updateDoorPerformance() {
  throw Error("This operation is not available in this edition");
}
export {
  createDoorPerformanceCue,
  distanceToDoor,
  updateDoorPerformance,
  validateDoorPerformance
};
