import {languagePattern} from "./language.mjs";
const dot = (a, b) => a.reduce((sum, v, i) => sum + v * b[i], 0);
const sub = (a, b) => a.map((v, i) => v - b[i]);
const length = (a) => Math.hypot(...a);
const point = (value) => Array.isArray(value) && value.length === 3 && value.every(Number.isFinite);
function validateRoomMetrics(value) {
  if (!value || typeof value !== "object") throw new Error("Room dimensions are missing");
  for (const key of ["width", "depth"]) if (!Number.isFinite(value[key]) || value[key] < 1 || value[key] > 40) throw new Error("Room width and depth must be between 1 and 40 meters");
  if (!Number.isFinite(value.height) || value.height < 1.8 || value.height > 8) throw new Error("Room height must be between 1.8 and 8 meters");
  if (!["estimated", "manual", "controller", "quest-planes"].includes(value.source)) throw new Error("Invalid room dimension source");
  return { width: value.width, depth: value.depth, height: value.height, source: value.source };
}
function calibrationFromCorners(a, b, c, height) {
  if (![a, b, c].every(point)) throw new Error("Invalid corner coordinates");
  if (Math.max(a[1], b[1], c[1]) - Math.min(a[1], b[1], c[1]) > 0.15) throw new Error("All three corners must be on the same floor");
  const ab = [b[0] - a[0], 0, b[2] - a[2]], width = length(ab), x = ab.map((v) => v / width), z = [-x[2], 0, x[0]], bc = sub(c, b), signedDepth = dot(bc, z), depth = Math.abs(signedDepth);
  if (!Number.isFinite(width) || width < 1) throw new Error("A and B are too close. Select two floor corners on the same wall.");
  if (Math.abs(dot(bc, x)) > Math.max(0.35, depth * 0.15)) throw new Error("C should be the next corner along the wall adjacent to B");
  const metrics = validateRoomMetrics({ width, depth, height, source: "controller" });
  return { metrics, origin: [a[0] + x[0] * width / 2 + z[0] * signedDepth / 2, a[1], a[2] + x[2] * width / 2 + z[2] * signedDepth / 2], yaw: Math.atan2(-x[2], x[0]) };
}
function floorIntersection(origin, direction, floorY = 0) {
  if (!point(origin) || !point(direction) || direction[1] >= -0.015) return null;
  const t = (floorY - origin[1]) / direction[1];
  if (t <= 0 || t > 20) return null;
  return origin.map((v, i) => v + t * direction[i]);
}
function ceilingHeightAtWall(origin, direction, a, b) {
  const ab = sub(b, a), normal = [-ab[2], 0, ab[0]], denom = dot(direction, normal);
  if (Math.abs(denom) < 0.02) throw new Error("From inside the room, aim at the ceiling edge above wall A–B");
  const t = dot(sub(a, origin), normal) / denom;
  if (t <= 0 || t > 25) throw new Error("Aim at wall A–B");
  const hit = origin.map((v, i) => v + t * direction[i]), u = dot(sub(hit, a), ab) / dot(ab, ab);
  if (u < -0.1 || u > 1.1) throw new Error("Aim at the upper edge of the wall between A and B");
  const height = hit[1] - a[1];
  if (height < 1.8 || height > 8) throw new Error("Measured height is outside the valid range. Aim at the wall–ceiling edge.");
  return height;
}
function roomFromPlanes(planes, preferredAspect = 1) {
  const horizontal = planes.filter((p) => p.orientation === "horizontal" && p.points?.length >= 3);
  const area = (p) => Math.abs(p.points.reduce((a, v, i) => {
    const q = p.points[(i + 1) % p.points.length];
    return a + v[0] * q[2] - q[0] * v[2];
  }, 0) / 2);
  const floor = horizontal.filter((p) => languagePattern("scene.floor").test(p.label || "")).sort((a, b) => area(b) - area(a))[0];
  const ceiling = horizontal.filter((p) => languagePattern("scene.ceiling").test(p.label || "")).sort((a, b) => area(b) - area(a))[0];
  if (!floor || !ceiling || area(floor) < 1) return null;
  let edge = [1, 0, 0], longest = 0;
  for (let i = 0; i < floor.points.length; i++) {
    const d = sub(floor.points[(i + 1) % floor.points.length], floor.points[i]);
    d[1] = 0;
    if (length(d) > longest) {
      longest = length(d);
      edge = d;
    }
  }
  if (longest < 1) return null;
  let x = edge.map((v) => v / longest), z = [-x[2], 0, x[0]];
  const bounds = (axis) => {
    const values = floor.points.map((p) => dot(p, axis));
    return [Math.min(...values), Math.max(...values)];
  };
  let bx = bounds(x), bz = bounds(z), width = bx[1] - bx[0], depth = bz[1] - bz[0];
  if (Math.abs(Math.log(depth / width / preferredAspect)) < Math.abs(Math.log(width / depth / preferredAspect))) {
    const old = x;
    x = z;
    z = old.map((v) => -v);
    bx = bounds(x);
    bz = bounds(z);
    width = bx[1] - bx[0];
    depth = bz[1] - bz[0];
  }
  const floorY = floor.points.reduce((v, p) => v + p[1], 0) / floor.points.length, ceilingY = ceiling.points.reduce((v, p) => v + p[1], 0) / ceiling.points.length;
  try {
    const metrics = validateRoomMetrics({ width, depth, height: ceilingY - floorY, source: "quest-planes" });
    return { metrics, origin: [x[0] * (bx[0] + bx[1]) / 2 + z[0] * (bz[0] + bz[1]) / 2, floorY, x[2] * (bx[0] + bx[1]) / 2 + z[2] * (bz[0] + bz[1]) / 2], yaw: Math.atan2(-x[2], x[0]) };
  } catch {
    return null;
  }
}
export {
  calibrationFromCorners,
  ceilingHeightAtWall,
  floorIntersection,
  roomFromPlanes,
  validateRoomMetrics
};
