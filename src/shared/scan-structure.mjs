import { roomFromPlanes } from "./room-spatial.mjs";
import { validateScene } from "./scene.mjs";
const distance = (a, b) => Math.hypot(a[0] - b[0], a[2] - b[2]);
const angle = (a) => Math.atan2(Math.sin(a), Math.cos(a));
const area = (p) => Math.abs(p.points.reduce((s, v, i) => {
  const q = p.points[(i + 1) % p.points.length];
  return s + v[0] * q[2] - q[0] * v[2];
}, 0) / 2);
function validateScanPlanes(input) {
  if (!Array.isArray(input) || input.length < 3 || input.length > 500) throw new Error("Between 3 and 500 scanned planes are required");
  return input.map((p, index) => {
    if (!p || !["horizontal", "vertical"].includes(p.orientation) || typeof p.label !== "string" || p.label.length > 100 || !Array.isArray(p.points) || p.points.length < 3 || p.points.length > 128 || p.points.some((v) => !Array.isArray(v) || v.length !== 3 || v.some((n) => !Number.isFinite(n) || Math.abs(n) > 100))) throw new Error("Invalid scanned plane data");
    const points = p.points.map((v) => [...v]);
    if (distance(points[0], points.at(-1)) < 1e-5 && Math.abs(points[0][1] - points.at(-1)[1]) < 1e-5) points.pop();
    if (points.length < 3) throw new Error("Scanned plane corners are missing");
    return { index, label: p.label, orientation: p.orientation, points };
  });
}
function planeBox(p) {
  let direction = [1, 0, 0], longest = 0;
  for (let i = 0; i < p.points.length; i++) {
    const a = p.points[i], b = p.points[(i + 1) % p.points.length], d = distance(a, b);
    if (d > longest) {
      longest = d;
      direction = [(b[0] - a[0]) / d, 0, (b[2] - a[2]) / d];
    }
  }
  if (longest < 0.02) return null;
  const x = direction, z = [-x[2], 0, x[0]], bounds = (axis) => {
    const vs = p.points.map((v) => v[0] * axis[0] + v[2] * axis[2]);
    return [Math.min(...vs), Math.max(...vs)];
  };
  const bx = bounds(x), bz = bounds(z), cx = (bx[0] + bx[1]) / 2, cz = (bz[0] + bz[1]) / 2, ys = p.points.map((v) => v[1]);
  return { position: [cx * x[0] + cz * z[0], (Math.min(...ys) + Math.max(...ys)) / 2, cx * x[2] + cz * z[2]], size: [bx[1] - bx[0], Math.max(...ys) - Math.min(...ys), bz[1] - bz[0]], rotation: Math.atan2(-x[2], x[0]) };
}
function scanContentAnchors(input, alignment, scene) {
  const c = Math.cos(alignment.yaw), s = Math.sin(alignment.yaw), floors = scene.objects.filter((o) => o.id === "ground" || o.group === "scan-floors");
  const local = (p) => {
    const x = p[0] - alignment.origin[0], z = p[2] - alignment.origin[2];
    return [c * x - s * z, p[1] - alignment.origin[1], s * x + c * z];
  };
  const anchors = [];
  for (const p of validateScanPlanes(input)) {
    const kind = p.label.toLowerCase();
    if (!["table", "shelf", "couch", "window"].includes(kind)) continue;
    if (kind === "window" ? p.orientation !== "vertical" : p.orientation !== "horizontal") continue;
    const box = planeBox({ ...p, points: p.points.map(local) });
    if (!box) continue;
    if (kind === "window") box.size[2] = 0.12;
    if (box.size[0] < 0.15 || (kind === "window" ? box.size[1] < 0.15 : box.size[2] < 0.15)) continue;
    const below = floors.filter((f) => {
      const dx = box.position[0] - f.position[0], dz = box.position[2] - f.position[2], fc = Math.cos(f.rotation), fs = Math.sin(f.rotation);
      return Math.abs(fc * dx - fs * dz) <= f.size[0] / 2 + 0.05 && Math.abs(fs * dx + fc * dz) <= f.size[2] / 2 + 0.05 && f.position[1] + f.size[1] / 2 < box.position[1] - 0.1;
    }).sort((a, b) => b.position[1] + b.size[1] / 2 - (a.position[1] + a.size[1] / 2));
    if (!below.length) continue;
    const floor = below[0], floorY = floor.position[1] + floor.size[1] / 2;
    if (kind !== "window" && box.position[1] - floorY > 3.5) continue;
    if (anchors.some((a) => a.kind === kind && distance(a.position, box.position) < 0.08 && Math.abs(a.position[1] - box.position[1]) < 0.08 && Math.abs(a.size[0] - box.size[0]) < 0.1 && Math.abs(a.size[2] - box.size[2]) < 0.1)) continue;
    anchors.push({ id: `surface-${p.index}`, kind, position: box.position, size: box.size, rotation: angle(box.rotation), floorId: floor.id, floorY, source: "quest-plane" });
  }
  return anchors;
}
function wallParts(wall, doors) {
  const c = Math.cos(wall.rotation), s = Math.sin(wall.rotation), bottom = wall.position[1] - wall.size[1] / 2, top = bottom + wall.size[1];
  const holes = doors.map((door) => {
    const dx = door.position[0] - wall.position[0], dz = door.position[2] - wall.position[2];
    const x = c * dx - s * dz, z = s * dx + c * dz;
    if (Math.abs(Math.cos(door.rotation - wall.rotation)) < 0.98 || Math.abs(z) > 0.14) return null;
    const lo = Math.max(-wall.size[0] / 2, x - door.size[0] / 2), hi = Math.min(wall.size[0] / 2, x + door.size[0] / 2), y0 = Math.max(bottom, door.position[1] - door.size[1] / 2), y1 = Math.min(top, door.position[1] + door.size[1] / 2);
    return hi - lo > 0.04 && y1 - y0 > 0.3 ? { lo, hi, y0, y1 } : null;
  }).filter(Boolean);
  const xs = [.../* @__PURE__ */ new Set([-wall.size[0] / 2, wall.size[0] / 2, ...holes.flatMap((h) => [h.lo, h.hi])])].sort((a, b) => a - b), parts = [];
  function add(lo, hi, y0, y1) {
    if (hi - lo < 0.02 || y1 - y0 < 0.02) return;
    const x = (lo + hi) / 2;
    parts.push({ ...wall, position: [wall.position[0] + c * x, (y0 + y1) / 2, wall.position[2] - s * x], size: [hi - lo, y1 - y0, 0.1] });
  }
  for (let i = 0; i < xs.length - 1; i++) {
    const lo = xs[i], hi = xs[i + 1], middle = (lo + hi) / 2, intervals = holes.filter((h) => middle > h.lo && middle < h.hi).sort((a, b) => a.y0 - b.y0);
    let y = bottom;
    for (const hole of intervals) {
      add(lo, hi, y, hole.y0);
      y = Math.max(y, hole.y1);
    }
    add(lo, hi, y, top);
  }
  return parts;
}
function scanStructure(input, { preferredAspect = 1, title = "Corridor and lab · Scan structure preview" } = {}) {
  const planes = validateScanPlanes(input), candidate = roomFromPlanes(planes, preferredAspect);
  if (!candidate) throw new Error("A usable floor and ceiling are required. Complete the Quest room scan first.");
  const c = Math.cos(candidate.yaw), s = Math.sin(candidate.yaw);
  const toLocal = (p) => {
    const x = p[0] - candidate.origin[0], z = p[2] - candidate.origin[2];
    return [c * x - s * z, p[1] - candidate.origin[1], s * x + c * z];
  };
  const local = planes.map((p) => ({ ...p, points: p.points.map(toLocal) }));
  const floors = local.filter((p) => p.orientation === "horizontal" && /^floor$/i.test(p.label)).sort((a, b) => area(b) - area(a));
  const ceilings = local.filter((p) => p.orientation === "horizontal" && /^ceiling$/i.test(p.label));
  const doors = [];
  for (const p of local.filter((p2) => p2.orientation === "vertical" && /^door$/i.test(p2.label))) {
    const box = planeBox(p);
    if (!box || box.size[1] < 0.3) continue;
    box.size[2] = 0.05;
    if (doors.some((d) => distance(d.position, box.position) < 0.18 && Math.abs(Math.cos(d.rotation - box.rotation)) > 0.98 && Math.abs(d.size[0] - box.size[0]) < 0.18)) continue;
    doors.push({ ...box, index: p.index });
  }
  const objects = [], add = (id, name, group, box, color = "#ccd2dc") => objects.push({ id, name, group, category: "structure", shape: "box", ...box, rotation: angle(box.rotation), color, roughness: 0.95, metalness: 0 });
  floors.forEach((p, i) => {
    const box = planeBox(p);
    if (!box) return;
    if (i === 0) {
      box.position = [0, -0.04, 0];
      box.size = [candidate.metrics.width, 0.08, candidate.metrics.depth];
      box.rotation = 0;
    } else {
      box.position[1] -= 0.04;
      box.size[1] = 0.08;
    }
    add(i === 0 ? "ground" : `scan-floor-${p.index}`, `Scanned floor ${p.index} · Bounding rectangle`, "scan-floors", box, ["#91b4cd", "#b1a5cf", "#9fc9b7"][i % 3]);
  });
  ceilings.sort((a, b) => area(b) - area(a)).forEach((p, i) => {
    const box = planeBox(p);
    if (!box) return;
    box.position[1] += 0.04;
    box.size[1] = 0.08;
    add(i === 0 ? "ceiling" : `scan-ceiling-${p.index}`, `Scanned ceiling ${p.index}`, "ceiling", box);
  });
  let wallCount = 0;
  for (const p of local.filter((p2) => p2.orientation === "vertical" && /^wall$/i.test(p2.label))) {
    const box = planeBox(p);
    if (!box || box.size[1] < 0.3) continue;
    wallCount++;
    wallParts(box, doors).forEach((part, i) => add(`scan-wall-${p.index}-${i}`, `Scanned wall ${p.index} · ${i + 1}`, "walls", part));
  }
  if (!wallCount) throw new Error("Scan returned no walls. A floor outline alone cannot define the corridor.");
  doors.forEach((d, i) => add(`scan-door-${d.index}`, `Door ${i + 1} · Static scanned surface`, "scan-doors", { position: d.position, size: d.size, rotation: d.rotation }, "#e4ad67"));
  const warnings = ["Floors and ceilings show scanned bounding rectangles, not verified walkable areas.", "Adjacent scans may contain duplicate or truncated walls. Check connections in the room; they are not automatically removed or completed.", "Doors show static scanned positions, not their live open or closed state."];
  const scene = validateScene({ title, description: `Uses ${floors.length} floors, ${ceilings.length} ceilings, ${wallCount} walls and ${doors.length} deduplicated doors returned by Quest, preserving their relative positions in meters. ${warnings.join("")}`, room: candidate.metrics, objects, actors: [], scanStructure: { schema: "vrbuild-scan-structure/1", floorCount: floors.length, wallCount, doorCount: doors.length, referenceFloorIndex: floors[0].index, warnings } });
  scene.scanStructure.contentAnchors = scanContentAnchors(input, candidate, scene);
  return { scene, alignment: candidate, counts: { planes: planes.length, floors: floors.length, ceilings: ceilings.length, walls: wallCount, doors: doors.length } };
}
export {
  planeBox,
  scanContentAnchors,
  scanStructure,
  validateScanPlanes
};
