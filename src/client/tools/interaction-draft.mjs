import * as THREE from "three";
import { createDraftTool } from "./draft-tool.mjs";
import { REGION_LIMITS, regionFrame, framePoint, frameUV, closeRegionStroke, validateRegions, regionObjectId } from "../../shared/interaction-regions.mjs";
import { surfaceFrame, surfaceUV } from "../../shared/region-surfaces.mjs";
import { isDoor } from "../../shared/doors.mjs";
function createInteractionDraftTool(options) {
  const { world, pickGround, pickObject } = options, path = createDraftTool(options), group = new THREE.Group();
  world.add(group);
  group.visible = false;
  let scene, door, side, regions = [], stroke = null, owner = null, enabled = false, message = "", version = 0, forceFloor = false;
  const colour = (surface) => surface === "floor" ? 3198395 : 15562137;
  function dispose() {
    for (const child of [...group.children]) {
      child.geometry?.dispose();
      child.material?.dispose();
      group.remove(child);
    }
  }
  function outline(points, color, closed = true) {
    if (!points.length) return;
    const vertices = (closed ? [...points, points[0]] : points).map((p) => new THREE.Vector3(...p)), line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(vertices), new THREE.LineBasicMaterial({ color, depthTest: false, toneMapped: false }));
    line.renderOrder = 15;
    group.add(line);
  }
  function paint() {
    version++;
    dispose();
    if (!enabled) return;
    if (isDoor(door)) {
      const frame = regionFrame(scene, { doorId: door.id, surface: "door-frame", side });
      const w = door.size[0] / 2 + 0.6, lo = -door.size[1] / 2 - 0.1, hi = door.size[1] / 2 + 0.3;
      outline([[-w, lo], [w, lo], [w, hi], [-w, hi]].map((p) => framePoint(frame, p)), 7571094);
    }
    for (const r of regions) outline(r.points.map((p) => framePoint(regionFrame(scene, r), p)), colour(r.surface));
    if (stroke) outline(stroke.points.map((p) => framePoint(stroke.frame, p)), colour(stroke.surface), false);
  }
  function hit(ray, locked = stroke) {
    world.updateMatrixWorld(true);
    const ground = pickGround(ray);
    if (locked?.surface === "floor" || !locked && forceFloor) return ground && (!locked || Math.abs(ground.y - locked.floorY) < 0.05) ? { point: [ground.x, ground.z], surface: "floor", floorY: ground.y, frame: regionFrame(scene, { surface: "floor", floorY: ground.y }) } : null;
    const objectHit = pickObject?.(ray, door.id);
    if (objectHit && (!locked || locked.surface === "object-surface")) {
      const frameData = locked?.frameData || surfaceFrame(door, objectHit.point, objectHit.normal);
      const frame2 = regionFrame(scene, { objectId: door.id, surface: "object-surface", frame: frameData });
      if (new THREE.Vector3(...objectHit.normal).dot(new THREE.Vector3(...frame2.normal)) < 0.25) return null;
      return { point: surfaceUV(door, frameData, objectHit.point), surface: "object-surface", frameData, frame: frame2 };
    }
    if (locked?.surface === "object-surface") return null;
    if (!isDoor(door)) return !locked && ground ? { point: [ground.x, ground.z], surface: "floor", floorY: ground.y, frame: regionFrame(scene, { surface: "floor", floorY: ground.y }) } : null;
    const origin = world.worldToLocal(ray.ray.origin.clone()), direction = ray.ray.direction.clone().transformDirection(new THREE.Matrix4().copy(world.matrixWorld).invert()), localRay = new THREE.Ray(origin, direction);
    const frame = locked?.frame || regionFrame(scene, { doorId: door.id, surface: "door-frame", side });
    const plane = new THREE.Plane().setFromNormalAndCoplanarPoint(new THREE.Vector3(...frame.normal), new THREE.Vector3(...frame.origin)), point = localRay.intersectPlane(plane, new THREE.Vector3());
    const uv = point && frameUV(frame, point.toArray());
    const inFrame = uv && Math.abs(uv[0]) <= door.size[0] / 2 + 0.6 && uv[1] >= -door.size[1] / 2 - 0.1 && uv[1] <= door.size[1] / 2 + 0.3;
    const doorHit = inFrame ? { point: uv, surface: "door-frame", side, frame } : null;
    if (locked) return doorHit;
    if (doorHit && (!ground || origin.distanceTo(point) < origin.distanceTo(ground))) return doorHit;
    return ground ? { point: [ground.x, ground.z], surface: "floor", floorY: ground.y, frame: regionFrame(scene, { surface: "floor", floorY: ground.y }) } : null;
  }
  function interrupt(reason) {
    if (stroke) {
      stroke = null;
      owner = null;
      message = reason || "Stroke cancelled. Completed regions are preserved.";
      paint();
    }
  }
  const api = {
    open(points, opts) {
      enabled = false;
      group.visible = false;
      path.open(points, opts);
    },
    openRegions(definition, doorId, viewer) {
      path.close();
      scene = definition;
      door = scene.objects.find((o) => o.id === doorId);
      if (!door) throw Error("Select an object first.");
      const normal = [Math.sin(door.rotation), 0, Math.cos(door.rotation)];
      side = viewer.reduce((s, n, i) => s + (n - door.position[i]) * normal[i], 0) >= 0 ? 1 : -1;
      regions = structuredClone((scene.regions || []).filter((r) => regionObjectId(r) === doorId));
      stroke = null;
      owner = null;
      enabled = true;
      group.visible = true;
      forceFloor = false;
      message = "Draw sources on the selected object and a floor dwell region. Close each loop before releasing.";
      paint();
    },
    active: () => enabled || path.active(),
    close() {
      enabled = false;
      group.visible = false;
      stroke = null;
      owner = null;
      regions = [];
      dispose();
      path.close();
    },
    begin(ray, input) {
      if (!enabled) return path.begin(ray, input);
      if (owner) return false;
      if (regions.length >= REGION_LIMITS.perDoor) {
        message = "Up to 8 regions per object. Undo a region to draw another.";
        return false;
      }
      const h = hit(ray);
      if (!h) {
        message = "Start on the selected object or on the floor.";
        return false;
      }
      stroke = { ...h, points: [h.point] };
      owner = input;
      message = h.surface === "floor" ? "Drawing floor trigger…" : "Drawing object source…";
      paint();
      return true;
    },
    update(ray, input) {
      if (!enabled) return path.update(ray, input);
      if (owner !== input || !stroke) return;
      const h = hit(ray);
      if (!h) {
        interrupt("The stroke left its original surface and was cancelled");
        return;
      }
      const last = stroke.points.at(-1), distance = Math.hypot(h.point[0] - last[0], h.point[1] - last[1]);
      if (distance > REGION_LIMITS.maxGap) {
        interrupt("Tracking jumped; the stroke was cancelled");
        return;
      }
      if (distance < REGION_LIMITS.spacing) return;
      if (stroke.points.length >= 1024) {
        interrupt("The stroke is too long. Draw a smaller region.");
        return;
      }
      stroke.points.push(h.point);
      paint();
    },
    release(input) {
      if (!enabled) return path.release(input);
      if (owner !== input || !stroke) return false;
      const raw = stroke;
      stroke = null;
      owner = null;
      try {
        const region = { schema: "vrbuild-region/1", id: "region-" + crypto.randomUUID(), objectId: door.id, ...raw.surface === "door-frame" ? { doorId: door.id } : {}, name: (raw.surface === "floor" ? "Floor trigger " : "Object source ") + (regions.length + 1), surface: raw.surface, points: closeRegionStroke(raw.points, raw.surface), ...raw.surface === "floor" ? { floorY: raw.floorY } : raw.surface === "object-surface" ? { frame: raw.frameData } : { side: raw.side } };
        validateRegions([...regions, region], scene);
        regions.push(region);
        message = `${regions.length} regions ready. Draw another loop or finish and describe the effect.`;
        paint();
        return true;
      } catch (error) {
        message = error.message;
        paint();
        return false;
      }
    },
    suspend(reason) {
      if (enabled) interrupt(reason);
      else path.suspend(reason);
    },
    undo() {
      if (!enabled) return path.undo();
      if (stroke) interrupt();
      else {
        regions.pop();
        message = "Last region undone";
        paint();
      }
    },
    clear() {
      if (!enabled) return path.clear();
      regions = [];
      stroke = null;
      owner = null;
      message = "Regions cleared. Draw new regions.";
      paint();
    },
    toggleSurface() {
      if (!enabled || stroke) return;
      forceFloor = !forceFloor;
      message = forceFloor ? "Next stroke: floor trigger." : "Next stroke: object source, or a separate floor region.";
      paint();
    },
    depth(delta) {
      if (!enabled) path.depth(delta);
    },
    cycleSmoothing() {
      if (!enabled) path.cycleSmoothing();
    },
    summary: () => enabled ? { kind: "regions", mode: "regions", forceFloor, pointCount: regions.reduce((n, r) => n + r.points.length, 0), regionCount: regions.length, drawing: !!stroke, canUndo: !!stroke || regions.length > 0, length: 0, message, version } : path.summary(),
    snapshot: () => enabled ? { kind: "regions", mode: "regions", regions: structuredClone(regions), objectId: door.id, doorId: isDoor(door) ? door.id : void 0, stroke: stroke ? structuredClone({ ...stroke, frame: void 0 }) : null, active: enabled, owner: owner === "mouse" ? "mouse" : owner ? "controller" : null } : path.snapshot()
  };
  return api;
}
export {
  createInteractionDraftTool
};
