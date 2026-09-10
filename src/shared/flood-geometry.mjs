import { regionFrame, framePoint } from "./interaction-regions.mjs";
function floodOutline(region) {
  const points = region.points, lengths = points.map((p, i) => Math.hypot(...p.map((n, k) => n - points[(i + 1) % points.length][k]))), total = lengths.reduce((s, n) => s + n, 0), budget = 160 - points.length, result = [];
  for (let i = 0; i < points.length; i++) {
    const a = points[i], b = points[(i + 1) % points.length], steps = 1 + Math.min(Math.max(0, Math.ceil(lengths[i] / 0.055) - 1), Math.floor(budget * lengths[i] / total));
    for (let j = 0; j < steps; j++) result.push(a.map((n, k) => n + (b[k] - n) * j / steps));
  }
  return result;
}
function floodVertices(scene, flood, source, time, sections = 24) {
  const region = scene.regions.find((r) => r.id === source.regionId), frame = regionFrame(scene, region), floor = scene.regions.find((r) => r.id === flood.trigger.regionId).floorY;
  const outline = floodOutline(region), minV = Math.min(...outline.map((p) => p[1])), maxV = Math.max(...outline.map((p) => p[1])), centreU = outline.reduce((n, p) => n + p[0], 0) / outline.length;
  const angle = source.angle * Math.PI / 180, c = Math.cos(angle), s = Math.sin(angle), direction = [frame.normal[0] * c + frame.normal[2] * s, frame.normal[1], frame.normal[2] * c - frame.normal[0] * s];
  const inlet = outline.map((p) => framePoint(frame, p));
  const front = Math.min(source.reach, Math.max(0, time) * source.speed * 1.15), positions = new Float32Array((sections + 1) * outline.length * 3);
  for (let i = 0; i <= sections; i++) {
    const t = i / sections, d = t * front, fall = 1.5 * (d / (source.speed + 0.5)) ** 2;
    for (let j = 0; j < outline.length; j++) {
      const p = outline[j], v = (p[1] - minV) / (maxV - minV || 1), point = [...inlet[j]], blend = Math.min(1, d / 0.25);
      const spread = (p[0] - centreU) * (source.amount * 0.2 * d + 0.09 * Math.sin(d * 9 - time * source.speed * 4 + v * 5) * blend), wave = (Math.sin(d * 13 - time * source.speed * 8 + p[0] * 14) * 0.022 + Math.sin(d * 7 + p[0] * 20 - time * 5) * 0.012 + 0.035) * blend * source.amount;
      point[0] += direction[0] * d + frame.u[0] * spread;
      point[2] += direction[2] * d + frame.u[2] * spread;
      point[1] = i === 0 ? point[1] : Math.max(point[1] + direction[1] * d + frame.u[1] * spread - fall, floor + 0.012 + source.amount * (0.025 + 0.075 * v) * blend) + wave;
      positions.set(point, (i * outline.length + j) * 3);
    }
  }
  return positions;
}
export {
  floodOutline,
  floodVertices
};
