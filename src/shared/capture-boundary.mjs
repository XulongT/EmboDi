import {languagePattern} from "./language.mjs";
import { validateScene } from "./scene.mjs";
import { validateRoomMetrics } from "./room-spatial.mjs";
function validateCapturePlan(plan) {
  if (!plan || plan.closeUnscanned !== true) throw new Error("Invalid capture bounds");
  return { ...plan, metrics: validateRoomMetrics(plan.metrics) };
}
function roomDraft(title, metrics) {
  metrics = validateRoomMetrics(metrics);
  return validateScene({ title, description: "New scene awaiting photo-based construction. The floor stores scan dimensions only; no photo reconstruction or actors have been added.", room: metrics, actors: [], objects: [{
    id: "ground",
    name: "Scan boundary placeholder floor",
    group: "floor",
    category: "structure",
    shape: "box",
    position: [0, -0.06, 0],
    size: [metrics.width, 0.12, metrics.depth],
    rotation: 0,
    color: "#ccd2dc",
    roughness: 0.95,
    metalness: 0
  }] });
}
function closeCaptureBoundary(scene) {
  validateScene(scene);
  const floor = scene.objects.find((o) => o.id === "ground"), ceiling = scene.objects.find((o) => o.id === "ceiling");
  if (!floor || floor.shape !== "box" || !ceiling) throw new Error("Enclosed capture bounds require a floor and ceiling");
  const floorY = floor.position[1] + floor.size[1] / 2, height = ceiling.position[1] - ceiling.size[1] / 2 - floorY;
  if (height < 1.8 || height > 8) throw new Error("Invalid enclosure wall height");
  const c = Math.cos(floor.rotation), s = Math.sin(floor.rotation), walls = scene.objects.filter((o) => o.shape === "box" && languagePattern("scene.boundaryWall").test(`${o.group} ${o.name}`));
  const local = ([x, z]) => {
    x -= floor.position[0];
    z -= floor.position[2];
    return [c * x - s * z, s * x + c * z];
  };
  const world = ([x, z]) => [floor.position[0] + c * x + s * z, floorY + height / 2, floor.position[2] - s * x + c * z];
  const coverage = walls.filter((o) => Math.abs(Math.sin(2 * (o.rotation - floor.rotation))) < 0.02 && o.position[1] - o.size[1] / 2 <= floorY + 0.15 && o.position[1] + o.size[1] / 2 >= floorY + height - 0.15).map((o) => {
    const a = Math.cos(o.rotation), b = Math.sin(o.rotation), p = [];
    for (const x of [-o.size[0] / 2, o.size[0] / 2]) for (const z of [-o.size[2] / 2, o.size[2] / 2]) p.push(local([o.position[0] + a * x + b * z, o.position[2] - b * x + a * z]));
    return { min: [Math.min(...p.map((v) => v[0])), Math.min(...p.map((v) => v[1]))], max: [Math.max(...p.map((v) => v[0])), Math.max(...p.map((v) => v[1]))] };
  });
  const next = structuredClone(scene), ids = new Set(scene.objects.map((o) => o.id)), thickness = 0.15;
  const edges = [{ axis: 0, at: floor.size[2] / 2, sign: 1 }, { axis: 0, at: -floor.size[2] / 2, sign: -1 }, { axis: 1, at: floor.size[0] / 2, sign: 1 }, { axis: 1, at: -floor.size[0] / 2, sign: -1 }];
  for (const [edgeIndex, edge] of edges.entries()) {
    const axis = edge.axis, normal = 1 - axis, half = floor.size[axis === 0 ? 0 : 2] / 2;
    const spans = coverage.filter((p) => p.min[normal] <= edge.at + 0.08 && p.max[normal] >= edge.at - 0.08).map((p) => [Math.max(-half, p.min[axis]), Math.min(half, p.max[axis])]).filter(([a, b]) => b > a).sort((a, b) => a[0] - b[0]);
    let cursor = -half;
    const gaps = [];
    for (const [a, b] of spans) {
      if (a - cursor > 0.04) gaps.push([cursor, a]);
      cursor = Math.max(cursor, b);
    }
    if (half - cursor > 0.04) gaps.push([cursor, half]);
    for (const [index, [a, b]] of gaps.entries()) {
      let id = `capture-cap-${edgeIndex + 1}-${index + 1}`;
      while (ids.has(id)) id += "x";
      ids.add(id);
      const p = [];
      p[axis] = (a + b) / 2;
      p[normal] = edge.at + edge.sign * thickness / 2;
      next.objects.push({ id, name: `Boundary wall for unscanned area · ${edgeIndex + 1}-${index + 1}`, group: "capture-boundary", category: "structure", shape: "box", position: world(p), size: axis === 0 ? [b - a, height, thickness] : [thickness, height, b - a], rotation: floor.rotation, color: "#b3c3d3", roughness: 0.95, metalness: 0 });
    }
  }
  if (next.objects.length > scene.objects.length) next.description = `${scene.description.slice(0, 1750)} Unscanned areas are enclosed by editable virtual walls at the selected floor boundary. These added walls are inferred, not measured.`;
  return validateScene(next);
}
export {
  closeCaptureBoundary,
  roomDraft,
  validateCapturePlan
};
