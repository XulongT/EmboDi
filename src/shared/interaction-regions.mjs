import { isDoor } from "./doors.mjs";
import { smoothCurve } from "./curve-smoothing.mjs";
import { isRegionObject, validateSurfaceFrame, objectRegionFrame, surfaceLocalPoint } from "./region-surfaces.mjs";
import { isRegionObject as isRegionObject2 } from "./region-surfaces.mjs";
const regionObjectId = (r) => r?.objectId || r?.doorId;
const isSourceRegion = (r) => r?.surface === "object-surface" || r?.surface === "door-frame";
const REGION_LIMITS = Object.freeze({ points: 128, regions: 32, perDoor: 8, spacing: 0.018, maxGap: 0.6, perimeter: 30 });
const finite = (n) => Number.isFinite(n) && Math.abs(n) <= 100;
const distance = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
const cross = (a, b, c) => (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);
const polygonArea = (points) => Math.abs(points.reduce((s, p, i) => {
  const q = points[(i + 1) % points.length];
  return s + p[0] * q[1] - q[0] * p[1];
}, 0)) / 2;
function edgeDistance(p, a, b) {
  const dx = b[0] - a[0], dy = b[1] - a[1], t = Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / (dx * dx + dy * dy || 1)));
  return distance(p, [a[0] + dx * t, a[1] + dy * t]);
}
function polygonContains(points, p, margin = 0) {
  let inside = false, nearest = Infinity;
  for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
    const a = points[i], b = points[j];
    nearest = Math.min(nearest, edgeDistance(p, a, b));
    if (a[1] > p[1] !== b[1] > p[1] && p[0] < (b[0] - a[0]) * (p[1] - a[1]) / (b[1] - a[1]) + a[0]) inside = !inside;
  }
  return inside || nearest <= margin + 1e-8;
}
function intersects(a, b, c, d) {
  const x = cross(a, b, c), y = cross(a, b, d), z = cross(c, d, a), w = cross(c, d, b);
  return x * y < 0 && z * w < 0 || Math.abs(x) < 1e-9 && edgeDistance(c, a, b) < 1e-8 || Math.abs(y) < 1e-9 && edgeDistance(d, a, b) < 1e-8 || Math.abs(z) < 1e-9 && edgeDistance(a, c, d) < 1e-8 || Math.abs(w) < 1e-9 && edgeDistance(b, c, d) < 1e-8;
}
function validatePolygon(points, surface, maxPoints = REGION_LIMITS.points) {
  if (!Array.isArray(points) || points.length < 3 || points.length > maxPoints || points.some((p) => !Array.isArray(p) || p.length !== 2 || !p.every(finite))) throw Error("Invalid or excessive region points");
  const area = polygonArea(points);
  if (area < (surface === "floor" ? 0.04 : 2e-3) || area > 30) throw Error("Region is too small or too large. Draw it again.");
  let length = 0;
  for (let i = 0; i < points.length; i++) {
    const a = points[i], b = points[(i + 1) % points.length], step = distance(a, b);
    if (step < 1e-5) throw Error("Region has duplicate vertices");
    length += step;
    for (let j = i + 2; j < points.length; j++) {
      if (i === 0 && j === points.length - 1) continue;
      if (intersects(a, b, points[j], points[(j + 1) % points.length])) throw Error("Region boundaries cannot cross. Draw the loop again.");
    }
  }
  if (length > REGION_LIMITS.perimeter) throw Error("Region boundary is too long");
  return points;
}
function closeRegionStroke(raw, surface) {
  if (raw.length < 4) throw Error("Draw a closed region");
  if (distance(raw[0], raw.at(-1)) > 0.18) throw Error("Return near the starting point to close the region");
  const points = raw.filter((p, i) => i === 0 || distance(p, raw[i - 1]) > 1e-5).map((p) => [...p]);
  if (distance(points[0], points.at(-1)) < 0.025) points.pop();
  validatePolygon(points, surface, 1024);
  const closed = [...points, points[0]].map((p) => [p[0], 0, p[1]]), smooth = smoothCurve(closed, "standard", { maxPoints: REGION_LIMITS.points + 1 }).slice(0, -1).map((p) => [p[0], p[2]]);
  const bounded = points.length <= 128 ? points : points.filter((_, i) => Math.floor(i * 128 / points.length) !== Math.floor((i - 1) * 128 / points.length));
  try {
    validatePolygon(smooth, surface);
    return smooth;
  } catch {
    validatePolygon(bounded, surface);
    return bounded;
  }
}
function regionFrame(scene, region) {
  if (region.surface === "floor") return { origin: [0, region.floorY, 0], u: [1, 0, 0], v: [0, 0, 1], normal: [0, 1, 0] };
  if (region.surface === "object-surface") {
    const object = scene.objects.find((o) => o.id === regionObjectId(region));
    if (!object) throw Error("The region object no longer exists.");
    return objectRegionFrame({ ...object, ...scene.regionPoses?.get(object.id) }, region.frame);
  }
  const door = scene.objects.find((o) => o.id === region.doorId);
  if (!door) throw Error("The region's door no longer exists");
  const c = Math.cos(door.rotation), s = Math.sin(door.rotation), side = region.side;
  return { origin: [door.position[0] + s * side * Math.max(door.size[2] / 2 + 0.025, 0.12), door.position[1], door.position[2] + c * side * Math.max(door.size[2] / 2 + 0.025, 0.12)], u: [c * side, 0, -s * side], v: [0, 1, 0], normal: [s * side, 0, c * side] };
}
const framePoint = (frame, p) => frame.project ? frame.project(p) : frame.origin.map((n, i) => n + frame.u[i] * p[0] + frame.v[i] * p[1]);
const frameUV = (frame, p) => [frame.u, frame.v].map((axis) => axis.reduce((sum, n, i) => sum + n * (p[i] - frame.origin[i]), 0));
function validateRegions(regions, scene) {
  if (!Array.isArray(regions) || regions.length > REGION_LIMITS.regions) throw Error("Up to 32 interaction regions");
  const ids = /* @__PURE__ */ new Set(), counts = /* @__PURE__ */ new Map();
  for (const r of regions) {
    const owner = scene.objects.find((o) => o.id === regionObjectId(r));
    if (!r || r.schema !== "vrbuild-region/1" || typeof r.id !== "string" || !/^[\w-]{1,80}$/.test(r.id) || ids.has(r.id) || !(isRegionObject(owner) || isDoor(owner)) || r.objectId && r.doorId && r.objectId !== r.doorId || !["door-frame", "object-surface", "floor"].includes(r.surface) || typeof r.name !== "string" || r.name.length > 80) throw Error("Invalid region ID or object target.");
    if (r.surface === "door-frame" && !isDoor(owner)) throw Error("Legacy door-frame regions require their original door.");
    validatePolygon(r.points, r.surface);
    if (r.surface === "object-surface") {
      validateSurfaceFrame(r.frame);
      if (!Array.isArray(r.points) || r.points.some((p) => !Array.isArray(p) || p.length !== 2 || !p.every(finite))) throw Error("Invalid surface region points.");
      for (let i = 0; i < r.points.length; i++) {
        const a = r.points[i], b = r.points[(i + 1) % r.points.length];
        for (let j = 0; j <= 4; j++) if (!surfaceLocalPoint(owner, r.frame, a.map((n, k) => n + (b[k] - n) * j / 4))) throw Error("Region leaves the object surface. Redraw a smaller closed region.");
      }
    }
    if (r.surface === "door-frame" && ![-1, 1].includes(r.side) || r.surface === "floor" && !finite(r.floorY)) throw Error("Invalid region surface");
    ids.add(r.id);
    counts.set(regionObjectId(r), (counts.get(regionObjectId(r)) || 0) + 1);
    if (counts.get(regionObjectId(r)) > REGION_LIMITS.perDoor) throw Error("Each object supports up to 8 regions.");
    const frame = regionFrame(scene, r);
    if (r.points.some((p) => framePoint(frame, p).some((n) => !finite(n)))) throw Error("Region is outside the scene");
    if (r.surface === "door-frame") {
      const door = scene.objects.find((o) => o.id === r.doorId);
      if (r.points.some((p) => Math.abs(p[0]) > door.size[0] / 2 + 0.6 || p[1] < -door.size[1] / 2 - 0.1 || p[1] > door.size[1] / 2 + 0.3)) throw Error("Source region is outside the door frame. Draw it again.");
    }
  }
  return regions;
}
function replaceObjectRegions(scene, objectId, regions) {
  const owner = scene.objects.find((o) => o.id === objectId);
  if (!(isRegionObject(owner) || isDoor(owner)) || !Array.isArray(regions) || regions.some((r) => regionObjectId(r) !== objectId)) throw Error("The draft must belong to the selected object.");
  const next = structuredClone(scene), previous = (next.regions || []).filter((r) => regionObjectId(r) === objectId);
  next.regions = [...(next.regions || []).filter((r) => regionObjectId(r) !== objectId), ...structuredClone(regions)];
  validateRegions(next.regions, next);
  if (JSON.stringify(previous) !== JSON.stringify(regions) && next.floods) next.floods = next.floods.filter((f) => regionObjectId(f) !== objectId);
  return next;
}
const replaceDoorRegions = replaceObjectRegions;
function regionDescription(scene, r) {
  const frame = regionFrame(scene, r), worldPoints = r.points.map((p) => framePoint(frame, p));
  return { id: r.id, name: r.name, surface: r.surface, objectId: regionObjectId(r), ...r.doorId ? { doorId: r.doorId } : {}, area: polygonArea(r.points), center: worldPoints.reduce((a, p) => a.map((v, i) => v + p[i] / worldPoints.length), [0, 0, 0]), normal: frame.normal, outline: worldPoints };
}
export {
  REGION_LIMITS,
  closeRegionStroke,
  edgeDistance,
  framePoint,
  frameUV,
  isRegionObject2 as isRegionObject,
  isSourceRegion,
  polygonArea,
  polygonContains,
  regionDescription,
  regionFrame,
  regionObjectId,
  replaceDoorRegions,
  replaceObjectRegions,
  validatePolygon,
  validateRegions
};
