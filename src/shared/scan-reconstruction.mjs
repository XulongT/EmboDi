import {languagePattern} from "./language.mjs";
import { validateScanPlanes, planeBox, scanContentAnchors } from "./scan-structure.mjs";
import { validateScene, validateObject } from "./scene.mjs";
import { validateRoomMetrics } from "./room-spatial.mjs";
import { buildScanFurnishing } from "./scan-furnishing.mjs";
import { ROOM_PALETTE } from "./categories.mjs";
const SCAN_REBUILD_INTENT = "Rebuild an editable blockout using the scan for dimensions and door positions. Refine the room outline, merge overlapping floors and duplicate walls, and remove closures at connections. Photos help identify furniture.";
const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
const contains = (poly, p) => {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) if (poly[i][1] > p[1] !== poly[j][1] > p[1] && p[0] < (poly[j][0] - poly[i][0]) * (p[1] - poly[i][1]) / (poly[j][1] - poly[i][1]) + poly[i][0]) inside = !inside;
  return inside;
};
const unique = (values) => [...new Set(values.map((v) => +v.toFixed(6)))].sort((a, b) => a - b);
const span = (w) => [Math.min(...w.points.map((p) => p[w.axis])), Math.max(...w.points.map((p) => p[w.axis]))];
function unionIntervals(intervals) {
  const out = [];
  for (const [a, b] of intervals.sort((a2, b2) => a2[0] - b2[0])) {
    if (out.length && a <= out.at(-1)[1] + 5e-3) out.at(-1)[1] = Math.max(b, out.at(-1)[1]);
    else out.push([a, b]);
  }
  return out;
}
function traceRegion(walls, id) {
  const nodes = [], edges = [];
  const node = (p) => {
    let i = nodes.findIndex((n) => dist(n.point, p) < 0.12);
    if (i < 0) {
      i = nodes.length;
      nodes.push({ point: p, edges: [] });
    }
    return i;
  };
  for (const w of walls) {
    const c = Math.cos(w.rotation), s = Math.sin(w.rotation), axis = Math.abs(c) > Math.abs(s) ? 0 : 1;
    if (Math.min(Math.abs(c), Math.abs(s)) > Math.sin(3 * Math.PI / 180)) throw new Error("This area has a slanted wall and needs manual review. The existing scene is preserved.");
    const a = node([w.position[0] - c * w.size[0] / 2, w.position[2] + s * w.size[0] / 2]), b = node([w.position[0] + c * w.size[0] / 2, w.position[2] - s * w.size[0] / 2]);
    if (a === b) throw new Error("Scanned wall endpoints are too close to connect reliably");
    const e = { id: w.index, zone: id, axis, coord: w.position[axis === 0 ? 2 : 0], nodes: [a, b], bottom: w.position[1] - w.size[1] / 2, top: w.position[1] + w.size[1] / 2 };
    nodes[a].edges.push(edges.length);
    nodes[b].edges.push(edges.length);
    edges.push(e);
  }
  if (nodes.some((n) => n.edges.length !== 2) || edges.length < 4) throw new Error("Scanned walls do not form a closed outline. Check for gaps in the scan.");
  for (const n of nodes) {
    const [a, b] = n.edges.map((i) => edges[i]);
    n.point = a.axis !== b.axis ? [a.axis === 1 ? a.coord : b.coord, a.axis === 0 ? a.coord : b.coord] : a.axis === 0 ? [n.point[0], (a.coord + b.coord) / 2] : [(a.coord + b.coord) / 2, n.point[1]];
  }
  let current = 0, last = -1;
  const order = [];
  do {
    order.push(current);
    const e = nodes[current].edges.find((i) => i !== last);
    last = e;
    current = edges[e].nodes.find((i) => i !== current);
    if (order.length > nodes.length) throw new Error("Invalid scan outline connection");
  } while (current !== 0);
  if (order.length !== nodes.length) throw new Error("This area contains separate outlines. Check the scan again.");
  edges.forEach((e) => e.points = e.nodes.map((i) => nodes[i].point));
  return { nodes, edges, order, polygon: order.map((i) => nodes[i].point) };
}
function groupedWalls(regions, doors) {
  const edges = regions.flatMap((r) => r.edges), groups = [];
  for (const e of edges) {
    const [lo, hi] = span(e);
    let group = groups.find((g) => g.axis === e.axis && g.members.some((m) => m.zone !== e.zone && Math.abs(m.coord - e.coord) < 0.18 && Math.min(span(m)[1], hi) - Math.max(span(m)[0], lo) > 0.1));
    if (!group) {
      group = { axis: e.axis, members: [] };
      groups.push(group);
    }
    group.members.push(e);
  }
  for (const g of groups) {
    const normal = g.axis === 0 ? 2 : 0, parallel = (d) => Math.abs(g.axis === 0 ? Math.cos(d.rotation) : Math.sin(d.rotation)) > 0.98;
    const nearby = doors.filter((d) => parallel(d) && g.members.some((m) => {
      const [lo, hi] = span(m);
      return Math.abs(d.position[normal] - m.coord) < 0.18 && d.position[g.axis === 0 ? 0 : 2] > lo - 0.05 && d.position[g.axis === 0 ? 0 : 2] < hi + 0.05;
    }));
    g.coord = g.members.length === 1 ? g.members[0].coord : nearby.length ? nearby.reduce((s, d) => s + d.position[normal], 0) / nearby.length : g.members.reduce((s, m) => s + m.coord * (span(m)[1] - span(m)[0]), 0) / g.members.reduce((s, m) => s + span(m)[1] - span(m)[0], 0);
    for (const m of g.members) {
      m.coord = g.coord;
      for (const p of m.points) p[1 - g.axis] = g.coord;
    }
  }
  for (const axis of [0, 1]) {
    const values = [...new Set(regions.flatMap((r) => r.polygon.map((p) => p[axis])))].sort((a, b) => a - b), clusters = [];
    for (const v of values) {
      if (clusters.length && v - clusters.at(-1)[0] < 0.015) clusters.at(-1).push(v);
      else clusters.push([v]);
    }
    const snapped = new Map(clusters.flatMap((vs) => vs.map((v) => [v, vs.reduce((a, b) => a + b, 0) / vs.length])));
    for (const r of regions) for (const p of r.polygon) p[axis] = snapped.get(p[axis]);
  }
  for (const g of groups) g.coord = g.members[0].points[0][1 - g.axis];
  const removed = [];
  for (const g of groups) {
    const intervals = unionIntervals(g.members.map(span));
    g.intervals = [];
    for (const [lo, hi] of intervals) {
      const cuts = unique([lo, hi, ...regions.flatMap((r) => r.polygon.map((p) => p[g.axis])).filter((v) => v > lo && v < hi)]);
      for (let i = 1; i < cuts.length; i++) {
        const a = cuts[i - 1], b = cuts[i], p = g.axis === 0 ? [(a + b) / 2, g.coord] : [g.coord, (a + b) / 2], left = [...p], right = [...p];
        left[1 - g.axis] -= 0.08;
        right[1 - g.axis] += 0.08;
        const embedded = regions.some((r) => !g.members.some((m) => m.zone === r.id) && contains(r.polygon, left) && contains(r.polygon, right));
        if (embedded) removed.push({ sourcePlanes: g.members.map((m) => m.id), from: a, to: b });
        else g.intervals.push([a, b]);
      }
    }
    g.intervals = unionIntervals(g.intervals);
  }
  return { groups, removed };
}
function tileFloors(regions) {
  const xs = unique(regions.flatMap((r) => r.polygon.map((p) => p[0]))), zs = unique(regions.flatMap((r) => r.polygon.map((p) => p[1]))), cells = [];
  for (let z = 0; z < zs.length - 1; z++) {
    cells[z] = [];
    for (let x = 0; x < xs.length - 1; x++) cells[z][x] = regions.findIndex((r) => contains(r.polygon, [(xs[x] + xs[x + 1]) / 2, (zs[z] + zs[z + 1]) / 2]));
  }
  function tiles(surface) {
    const used = /* @__PURE__ */ new Set(), out = [];
    const key = (z, x) => {
      const i = cells[z]?.[x];
      return i === void 0 || i < 0 ? null : surface === "floor" ? regions[i].floorY : regions[i].ceilingY;
    };
    for (let z = 0; z < zs.length - 1; z++) for (let x = 0; x < xs.length - 1; x++) {
      const h = key(z, x);
      if (h === null || used.has(`${z}:${x}`)) continue;
      let endX = x + 1, endZ = z + 1;
      while (endX < xs.length - 1 && key(z, endX) === h && !used.has(`${z}:${endX}`)) endX++;
      while (endZ < zs.length - 1 && Array.from({ length: endX - x }, (_, j) => x + j).every((a) => key(endZ, a) === h && !used.has(`${endZ}:${a}`))) endZ++;
      for (let b = z; b < endZ; b++) for (let a = x; a < endX; a++) used.add(`${b}:${a}`);
      const w = xs[endX] - xs[x], d = zs[endZ] - zs[z];
      if (w < 0.02 || d < 0.02) continue;
      out.push({ position: [(xs[x] + xs[endX]) / 2, h + (surface === "floor" ? -0.04 : 0.04), (zs[z] + zs[endZ]) / 2], size: [w, 0.08, d], rotation: 0 });
    }
    return out;
  }
  return { floors: tiles("floor"), ceilings: tiles("ceiling") };
}
function fitFurniture(anchors, regions) {
  const offsets = [];
  for (let x = -30; x <= 30; x++) for (let z = -30; z <= 30; z++) if (Math.hypot(x, z) <= 30) offsets.push([x * 0.02, z * 0.02]);
  offsets.sort((a, b) => a[0] ** 2 + a[1] ** 2 - b[0] ** 2 - b[1] ** 2);
  const adjustments = [];
  const fitted = anchors.map((a) => {
    if (a.kind === "window") return a;
    const c = Math.cos(a.rotation), s = Math.sin(a.rotation), w = a.size[0] / 2 + 0.015, d = a.size[2] / 2 + 0.015;
    for (const [dx, dz] of offsets) {
      const region = regions.find((r) => [-1, 0, 1].every((x) => [-1, 0, 1].every((z) => contains(r.polygon, [a.position[0] + dx + c * x * w + s * z * d, a.position[2] + dz - s * x * w + c * z * d]))));
      if (!region) continue;
      const position = [a.position[0] + dx, a.position[1], a.position[2] + dz];
      if (dx || dz) adjustments.push({ anchorId: a.id, from: a.position, to: position, reason: "fit inside rebuilt room outline" });
      return { ...a, position, floorY: region.floorY, ...dx || dz ? { measuredPosition: a.position, source: "quest-plane, position adjusted to rebuilt outline" } : {} };
    }
    adjustments.push({ anchorId: a.id, from: a.position, to: a.position, reason: "no fit within 0.6 m; retained for manual review" });
    return a;
  });
  return { anchors: fitted, adjustments };
}
function reconstructScan(blueprint, { actors = [], actorStyle = "zombie", annotations = { explanation: "Rebuild independent editable objects from the scanned layout.", annotations: [] }, imageCount = 0 } = {}) {
  const planes = validateScanPlanes(blueprint?.planes), alignment = blueprint?.alignment;
  if (!alignment || !Array.isArray(alignment.origin) || alignment.origin.length !== 3 || alignment.origin.some((v) => !Number.isFinite(v) || Math.abs(v) > 100) || !Number.isFinite(alignment.yaw)) throw new Error("Invalid scan coordinate transform");
  validateRoomMetrics(alignment.metrics);
  validateObject(blueprint.referenceFloor);
  const c = Math.cos(alignment.yaw), s = Math.sin(alignment.yaw), local = planes.map((p) => ({ ...p, points: p.points.map((v) => {
    const x = v[0] - alignment.origin[0], z = v[2] - alignment.origin[2];
    return [c * x - s * z, v[1] - alignment.origin[1], s * x + c * z];
  }) }));
  const boxes = local.map((p) => ({ ...planeBox(p), index: p.index, label: p.label.toLowerCase(), orientation: p.orientation })).filter((p) => p.position);
  const floors = boxes.filter((p) => p.label === "floor" && p.orientation === "horizontal").sort((a, b) => b.size[0] * b.size[2] - a.size[0] * a.size[2]), ceilings = boxes.filter((p) => p.label === "ceiling" && p.orientation === "horizontal");
  if (!floors.length || !ceilings.length) throw new Error("Scan is missing a floor or ceiling");
  const regions = floors.map((f) => {
    const ceiling = ceilings.toSorted((a, b) => Math.hypot(a.position[0] - f.position[0], a.position[2] - f.position[2]) - Math.hypot(b.position[0] - f.position[0], b.position[2] - f.position[2]))[0];
    return { id: f.index, floor: f, measuredFloorY: f.position[1], floorY: Math.abs(f.position[1]) <= 0.08 ? 0 : f.position[1], ceilingY: ceiling.position[1], walls: [] };
  });
  for (const wall of boxes.filter((p) => p.label === "wall" && p.orientation === "vertical")) {
    const bottom = wall.position[1] - wall.size[1] / 2, top = wall.position[1] + wall.size[1] / 2, score = (r2) => Math.abs(bottom - r2.measuredFloorY) + Math.abs(top - r2.ceilingY);
    const r = regions.toSorted((a, b) => score(a) - score(b))[0];
    if (score(r) > 0.4) throw new Error("A wall cannot be matched to the scanned floor. Check the scan.");
    r.walls.push(wall);
  }
  for (const r of regions) Object.assign(r, traceRegion(r.walls, r.id));
  const doors = [];
  for (const d of boxes.filter((p) => p.label === "door" && p.orientation === "vertical")) {
    if (doors.some((o) => Math.hypot(o.position[0] - d.position[0], o.position[2] - d.position[2]) < 0.18 && Math.abs(Math.cos(o.rotation - d.rotation)) > 0.98 && Math.abs(o.size[0] - d.size[0]) < 0.18)) continue;
    doors.push({ ...d, size: [d.size[0], d.size[1], 0.05] });
  }
  const { groups, removed } = groupedWalls(regions, doors), tiles = tileFloors(regions), objects = [];
  const add = (id, name, role, box, extra = {}) => objects.push({ id, name, role, group: role === "floor" ? "rebuilt-floors" : role === "ceiling" ? "ceiling" : role === "wall" ? "walls" : `rebuilt-${role}s`, category: "structure", editable: true, shape: "box", position: box.position, size: box.size, rotation: Math.atan2(Math.sin(box.rotation), Math.cos(box.rotation)), color: ROOM_PALETTE[role] || ROOM_PALETTE.wall, roughness: 0.95, metalness: 0, ...extra });
  tiles.floors.forEach((b, i) => add(i ? "rebuilt-floor-" + i : "ground", `Floor section ${i + 1}`, "floor", b));
  tiles.ceilings.forEach((b, i) => add(i ? "rebuilt-ceiling-" + i : "ceiling", `Ceiling section ${i + 1}`, "ceiling", b));
  let wallIndex = 0;
  for (const g of groups) for (const [lo, hi] of g.intervals) {
    const bottom = Math.min(...g.members.map((m) => Math.abs(m.bottom) <= 0.08 ? 0 : m.bottom)), top = Math.max(...g.members.map((m) => m.top)), holes = doors.filter((d) => Math.abs((g.axis === 0 ? d.position[2] : d.position[0]) - g.coord) < 0.18 && Math.abs(g.axis === 0 ? Math.cos(d.rotation) : Math.sin(d.rotation)) > 0.98).map((d) => {
      const middle = g.axis === 0 ? d.position[0] : d.position[2], half = d.size[0] / 2 + 0.035;
      return { lo: Math.max(lo, middle - half), hi: Math.min(hi, middle + half), bottom: Math.max(bottom, d.position[1] - d.size[1] / 2 - 0.02), top: Math.min(top, d.position[1] + d.size[1] / 2 + 0.02) };
    }).filter((h) => h.hi > h.lo && h.top > h.bottom);
    const xs = unique([lo, hi, ...holes.flatMap((h) => [h.lo, h.hi])]);
    for (let i = 1; i < xs.length; i++) {
      const a = xs[i - 1], b = xs[i], mid = (a + b) / 2, cut = unionIntervals(holes.filter((h) => mid > h.lo && mid < h.hi).map((h) => [h.bottom, h.top]));
      let y = bottom;
      const part = (low, high) => {
        if (b - a < 0.02 || high - low < 0.02) return;
        const id = `rebuilt-wall-${wallIndex++}`;
        add(id, `Wall segment ${wallIndex}`, "wall", { position: g.axis === 0 ? [mid, (low + high) / 2, g.coord] : [g.coord, (low + high) / 2, mid], size: [b - a, high - low, 0.1], rotation: g.axis === 0 ? 0 : Math.PI / 2 }, { sourcePlanes: g.members.map((m) => m.id) });
      };
      for (const [a2, b2] of cut) {
        part(y, a2);
        y = Math.max(y, b2);
      }
      part(y, top);
    }
  }
  doors.forEach((d, i) => add(`rebuilt-door-${d.index}`, `Door ${i + 1}`, "door", d, { sourcePlanes: [d.index] }));
  const anchorScene = { objects: floors.map((f, i) => ({ id: i ? "scan-floor-" + f.index : "ground", group: "scan-floors", position: [f.position[0], f.position[1] - 0.04, f.position[2]], size: [f.size[0], 0.08, f.size[2]], rotation: f.rotation })) };
  const measuredAnchors = scanContentAnchors(planes, alignment, anchorScene).map((a) => ({ ...a, floorY: Math.abs(a.floorY) <= 0.08 ? 0 : a.floorY }));
  const { anchors, adjustments } = fitFurniture(measuredAnchors, regions);
  const base = { title: "Corridor and laboratory · Blockout", description: "An editable blockout reconstructed from the scanned layout.", room: alignment.metrics, objects, actors: structuredClone(actors), actorStyle, scanStructure: { contentAnchors: anchors } };
  const filled = buildScanFurnishing(base, anchors, annotations, { imageCount });
  const content = filled.objects.filter((o) => o.scanAnchorId), rebuiltContent = [];
  for (const o of content) {
    const { scanAnchorId } = o, id = o.id.replace("scan-content", "rebuilt-content"), anchor = anchors.find((a) => a.id === scanAnchorId), common = { ...o, id, editable: true, role: anchor.kind === "window" ? "window" : "furniture", name: o.name.replace(languagePattern("scene.scanNamePrefix"), "").replace(" · ", " "), group: o.group.replace("scan-content", "rebuilt-content"), assemblyId: o.assemblyId.replace("scan-content", "rebuilt-content") };
    if (o.id.endsWith("-support")) {
      const w = Math.max(0.04, anchor.size[0] * 0.08), offset = anchor.size[0] * 0.37;
      for (const side of [-1, 1]) rebuiltContent.push({ ...common, id: id + (side < 0 ? "-left" : "-right"), name: common.name.replace(/ support$/i, " table leg"), position: [o.position[0] + Math.cos(o.rotation) * offset * side, o.position[1], o.position[2] - Math.sin(o.rotation) * offset * side], size: [w, o.size[1], anchor.size[2] * 0.8] });
    } else rebuiltContent.push(common);
  }
  const report = { regions: regions.map((r) => ({ id: r.id, outline: r.polygon, floorY: r.floorY, measuredFloorY: r.measuredFloorY, ceilingY: r.ceilingY })), removedClosureIntervals: removed, mergedWallGroups: groups.filter((g) => g.members.length > 1).map((g) => g.members.map((m) => m.id)), floorTiles: tiles.floors.length, ceilingTiles: tiles.ceilings.length, wallBlocks: wallIndex, doors: doors.length, contentSurfaces: anchors.length, furnitureAdjustments: adjustments };
  return validateScene({ title: base.title, description: `Rebuilt ${regions.length} areas from scanned wall outlines as independently editable objects. Refined floor outlines, merged duplicate walls and removed scan closures at connections. Door positions remain as references; furniture and unmeasured details use coarse geometry. ${imageCount ? `Photos only help identify furniture.` : ""}`, room: alignment.metrics, objects: [...objects, ...rebuiltContent], actors: base.actors, actorStyle, scanReconstruction: { schema: "vrbuild-scan-reconstruction/1", blueprint: structuredClone(blueprint), referenceFloor: structuredClone(blueprint.referenceFloor), contentAnchors: anchors, report, photoAnnotations: annotations } });
}
export {
  SCAN_REBUILD_INTENT,
  reconstructScan
};
