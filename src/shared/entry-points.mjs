import { referenceFloor } from "./scene-space.mjs";
function localXZ(object, point) {
  const x = point[0] - object.position[0], z = point[2] - object.position[2], c = Math.cos(object.rotation), s = Math.sin(object.rotation);
  return [c * x - s * z, s * x + c * z];
}
const isFloor = (object) => object?.role === "floor" || object?.id === "ground" || object?.group === "scan-floors";
function entryIsClear(scene, point, { radius = 0.45, height = 1.8 } = {}) {
  if (!point?.every(Number.isFinite)) return false;
  const floors = scene.objects.filter(isFloor);
  const supported = scene.scanReconstruction ? [point, ...Array.from({ length: 16 }, (_, i) => [point[0] + radius * Math.cos(i * Math.PI / 8), point[1], point[2] + radius * Math.sin(i * Math.PI / 8)])].every((p) => floors.some((f) => {
    const [x, z] = localXZ(f, p);
    return Math.abs(p[1] - f.position[1] - f.size[1] / 2) < 0.15 && Math.abs(x) <= f.size[0] / 2 + 1e-6 && Math.abs(z) <= f.size[2] / 2 + 1e-6;
  })) : floors.some((ground) => {
    if (!["box", "cylinder"].includes(ground.shape)) return false;
    const [x, z] = localXZ(ground, point), rx = ground.size[0] / 2 - radius, rz = ground.size[2] / 2 - radius;
    if (rx <= 0 || rz <= 0 || Math.abs(point[1] - (ground.position[1] + ground.size[1] / 2)) > 0.15) return false;
    return !(ground.shape === "cylinder" ? (x / rx) ** 2 + (z / rz) ** 2 > 1 : Math.abs(x) > rx || Math.abs(z) > rz);
  });
  if (!supported) return false;
  return !scene.objects.some((o) => {
    if (isFloor(o) || o.position[1] + o.size[1] / 2 <= point[1] + 0.18 || o.position[1] - o.size[1] / 2 >= point[1] + height) return false;
    const [ox, oz] = localXZ(o, point);
    return Math.abs(ox) < o.size[0] / 2 + radius && Math.abs(oz) < o.size[2] / 2 + radius;
  });
}
function findEntryCandidates(scene, { count = 3 } = {}) {
  const ground = referenceFloor(scene);
  if (!ground) return [];
  const top = ground.position[1] + ground.size[1] / 2 + 0.01, c = Math.cos(ground.rotation), s = Math.sin(ground.rotation), candidates = [];
  const toWorld = (x, z) => [ground.position[0] + c * x + s * z, top, ground.position[2] - s * x + c * z];
  const preferred = toWorld(0, ground.size[2] * 0.25), tryPoint = (point) => {
    if (entryIsClear(scene, point)) candidates.push({ position: point, score: (point[0] - preferred[0]) ** 2 + (point[2] - preferred[2]) ** 2 });
  };
  tryPoint(preferred);
  for (let x = -8; x <= 8; x++) for (let z = -8; z <= 8; z++) tryPoint(toWorld(x * ground.size[0] / 18, z * ground.size[2] / 18));
  candidates.sort((a, b) => a.score - b.score);
  const chosen = [];
  for (const item of candidates) {
    if (chosen.every((o) => Math.hypot(o.position[0] - item.position[0], o.position[2] - item.position[2]) >= Math.min(3, Math.min(ground.size[0], ground.size[2]) * 0.18))) {
      chosen.push({ position: item.position, heading: Math.atan2(item.position[0] - ground.position[0], item.position[2] - ground.position[2]) });
      if (chosen.length === count) break;
    }
  }
  return chosen;
}
export {
  entryIsClear,
  findEntryCandidates,
  isFloor
};
