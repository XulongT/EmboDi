import { CatmullRomCurve3, Vector3, Quaternion, Euler } from "three";
import { bindTrackTrigger, validateTrackTriggers } from "./track-triggers.mjs";
import { clearEntityTargets } from "./entity-targets.mjs";
const finite = (n, min, max) => Number.isFinite(n) && n >= min && n <= max;
const vector = (p, n = 3) => Array.isArray(p) && p.length === n && p.every((v) => finite(v, -100, 100));
const isCamera = (o) => o?.kind === "camera";
const isLight = (o) => o?.kind === "light";
const isRig = (o) => isCamera(o) || isLight(o);
function objectQuaternion(o) {
  return o.quaternion ? [...o.quaternion] : new Quaternion().setFromEuler(new Euler(0, o.yaw ?? o.rotation ?? 0, 0)).toArray();
}
function validateCinema(scene) {
  if (scene.productionReady !== void 0 && typeof scene.productionReady !== "boolean") throw Error("Invalid setup state");
  for (const o of scene.objects) {
    if (o.aimTargetId && (![...scene.objects, ...scene.actors || []].some((a) => a.id === o.aimTargetId) || o.aimTargetId === o.id)) throw Error("Invalid camera target");
    if (o.quaternion && (!vector(o.quaternion, 4) || Math.abs(Math.hypot(...o.quaternion) - 1) > 0.01)) throw Error("Invalid object pose");
    if (o.kind !== void 0 && !["camera", "light"].includes(o.kind)) throw Error("Invalid tool type");
    if (isCamera(o) && (!o.camera || !finite(o.camera.fov, 15, 110) || !finite(o.camera.aspect, 0.5, 3))) throw Error("Invalid camera settings");
    if (isLight(o) && (!o.light || !["point", "spot"].includes(o.light.type) || !finite(o.light.intensity, 0, 100) || !finite(o.light.range, 0.1, 100) || !finite(o.light.angle, 1, 85) || !/^#[\da-f]{6}$/i.test(o.light.color))) throw Error("Invalid light settings");
    if (o.track) {
      const t = o.track;
      if (!scene.curves?.some((c) => c.id === t.curveId) || !finite(t.duration, 0.25, 120) || !finite(t.delay, 0, 120) || !finite(t.fadeOut, 0, t.duration) || !["fixed", "target", "tangent"].includes(t.orientation)) throw Error("Invalid track or missing curve");
      if (t.targetId && ![...scene.objects, ...scene.actors || []].some((a) => a.id === t.targetId)) throw Error("Camera target no longer exists");
    }
  }
  if (scene.objects.filter(isCamera).length > 8 || scene.objects.filter(isLight).length > 8) throw Error("This edition supports up to 8 cameras and 8 lights");
  return validateTrackTriggers(scene);
}
function curvePoints(controls, smooth = true) {
  if (!Array.isArray(controls) || controls.length < 2 || controls.length > 64 || controls.some((p) => !vector(p))) throw Error("Invalid control points (2–64 required)");
  if (controls.every((p) => new Vector3(...p).distanceTo(new Vector3(...controls[0])) < 1e-3)) throw Error("Curve endpoints are too close. Draw a longer path.");
  if (!smooth || controls.length === 2) return structuredClone(controls);
  return new CatmullRomCurve3(controls.map((p) => new Vector3(...p)), false, "centripetal").getSpacedPoints(Math.min(256, controls.length * 16)).map((p) => p.toArray());
}
function editableControls(curve) {
  if (curve.controls) return structuredClone(curve.controls);
  const p = curve.points;
  if (p.length <= 12) return structuredClone(p);
  return Array.from({ length: 12 }, (_, i) => [...p[Math.round(i * (p.length - 1) / 11)]]);
}
function newRig(kind, id, position) {
  if (!["camera", "spot", "point", "box"].includes(kind) || !vector(position)) throw Error("Invalid creation parameters");
  const o = { id, name: kind === "camera" ? "Camera" : kind === "box" ? "Box" : kind === "spot" ? "Spotlight" : "Point light", group: "Authoring tools", shape: kind === "point" ? "sphere" : "box", position: [...position], size: kind === "box" ? [0.4, 0.4, 0.4] : [0.22, 0.16, 0.28], rotation: 0, roughness: 0.6, metalness: 0, color: kind === "camera" ? "#4098df" : kind === "box" ? "#71b68c" : "#ffd266", editable: true };
  if (kind === "camera") {
    o.kind = "camera";
    o.camera = { fov: 55, aspect: 16 / 9 };
  }
  if (["spot", "point"].includes(kind)) {
    o.kind = "light";
    o.light = { type: kind, intensity: 8, range: 12, angle: 35, color: "#fff2da" };
  }
  return o;
}
function groundCreateCommand(command, point) {
  if (!vector(point)) throw Error("Point at visible ground, then press A to place");
  const { position: ignored, ...values } = command.values || {};
  const position = [...point], body = newRig(command.kind, command.id, position);
  position[1] += body.size[1] / 2;
  if (!vector(position)) throw Error("Placement is outside the scene");
  return { ...command, op: "create", position, values };
}
function applyCinema(scene, command) {
  const next = structuredClone(scene), c = command;
  next.productionReady = false;
  const target = next.objects.find((o) => o.id === c.id);
  if (c.op === "create") {
    if (next.objects.some((o2) => o2.id === c.id) || !/^[-\w]{1,80}$/.test(c.id)) throw Error("Invalid object ID");
    const o = newRig(c.kind, c.id, c.position);
    o.name = c.name?.slice(0, 80) || `${o.name} ${next.objects.filter((a) => a.kind === o.kind).length + 1}`;
    next.objects.push(o);
    if (c.values) return applyCinema(next, { op: "update", id: o.id, values: c.values });
  } else if (c.op === "poses") {
    if (!Array.isArray(c.poses) || !c.poses.length || c.poses.length > 187) throw Error("No pose changes to save");
    for (const p of c.poses) {
      const o = [...next.objects, ...next.actors || []].find((a) => a.id === p.id);
      if (!o || !vector(p.position) || (!vector(p.quaternion, 4) || Math.hypot(...p.quaternion) < 0.01)) throw Error("Invalid pose target");
      if (o.editable !== true && (o.id === "ground" || o.category === "structure" || /^(wall|ceiling)(_|-|$)/.test(o.id))) throw Error("Reference structure is locked.");
      o.position = [...p.position];
      const q = new Quaternion(...p.quaternion).normalize();
      if (o.assetId) o.yaw = new Euler().setFromQuaternion(q, "YXZ").y;
      else {
        o.quaternion = q.toArray();
        o.rotation = new Euler().setFromQuaternion(q, "YXZ").y;
      }
    }
  } else if (c.op === "remove") {
    if (!target || target.editable !== true && (target.id === "ground" || target.category === "structure")) throw Error("Select an editable object to delete");
    next.objects = clearEntityTargets(next.objects.filter((o) => o.id !== c.id), c.id);
    if (next.regions) next.regions = next.regions.filter((r) => (r.objectId || r.doorId) !== c.id);
    if (next.floods) next.floods = next.floods.filter((f) => (f.objectId || f.doorId) !== c.id);
  } else if (c.op === "update") {
    if (!target) throw Error("Select an object, camera or light first");
    const p = c.values || {};
    if (p.position !== void 0) {
      if (!vector(p.position)) throw Error("Invalid position");
      target.position = [...p.position];
    }
    if (p.fov !== void 0) {
      if (!isCamera(target)) throw Error("This object is not a camera");
      target.camera.fov = p.fov;
    }
    if (p.lightType !== void 0) {
      if (!isLight(target)) throw Error("This object is not a light");
      if (!["point", "spot"].includes(p.lightType)) throw Error("Invalid light type");
      target.light.type = p.lightType;
      target.shape = p.lightType === "point" ? "sphere" : "box";
    }
    if (p.color !== void 0) {
      target.color = p.color;
      if (isLight(target)) target.light.color = p.color;
    }
    for (const key of ["intensity", "range", "angle"]) if (p[key] !== void 0) {
      if (!isLight(target)) throw Error("This object is not a light");
      target.light[key] = p[key];
    }
    if (p.curveId !== void 0) {
      if (p.curveId === null) delete target.track;
      else target.track = { duration: 8, delay: 0, fadeOut: 0, orientation: "fixed", targetId: null, ...target.track, curveId: p.curveId };
    }
    for (const key of ["duration", "delay", "fadeOut"]) if (p[key] !== void 0) {
      if (!target.track) throw Error("Bind a saved curve first");
      target.track[key] = p[key];
    }
    if (p.targetId !== void 0) {
      if (target.track) target.track.targetId = p.targetId;
      else target.aimTargetId = p.targetId;
    }
    if (p.orientation !== void 0) {
      if (target.track) target.track.orientation = p.orientation;
      else if (p.orientation === "fixed") delete target.aimTargetId;
      else if (p.orientation !== "target" || !target.aimTargetId) throw Error("Bind a curve before using tangent orientation");
    }
  } else if (c.op === "regionTrigger") {
    bindTrackTrigger(next, c);
    if (c.values) return applyCinema(next, { op: "update", id: c.id, values: c.values });
  } else if (c.op === "clearTrigger") {
    if (!target?.track?.trigger) throw Error("This object has no region trigger");
    delete target.track.trigger;
  } else if (c.op === "curve") {
    const curve = next.curves?.find((p) => p.id === c.id);
    if (!curve) throw Error("Curve no longer exists");
    curve.rawPoints ||= structuredClone(curve.points);
    curve.controls = c.straight ? [[...curve.points[0]], [...curve.points.at(-1)]] : structuredClone(c.controls || editableControls(curve));
    curve.smooth = c.smooth ?? true;
    curve.points = curvePoints(curve.controls, curve.smooth);
    curve.editVersion = (curve.editVersion || 0) + 1;
  } else if (c.op === "complete") {
    next.productionReady = true;
  } else throw Error("Unknown authoring operation");
  if (next.triggerRegions) {
    const used = new Set(next.objects.map((o) => o.track?.trigger?.regionId));
    next.triggerRegions = next.triggerRegions.filter((r) => used.has(r.id));
  }
  return validateCinema(next);
}
function rigFrame(o, curves, time, targets = []) {
  let position = [...o.position], quaternion = objectQuaternion(o), intensity = o.light?.intensity;
  const t = o.track, curve = t && curves.find((c) => c.id === t.curveId);
  if (!curve) {
    const target = targets.find((v) => v.id === o.aimTargetId);
    if (target) quaternion = lookAt(position, target, quaternion);
    return { id: o.id, position, quaternion, rotation: new Euler().setFromQuaternion(new Quaternion(...quaternion), "YXZ").y, intensity };
  }
  const points = curve.points;
  const lengths = [0];
  for (let i2 = 1; i2 < points.length; i2++) lengths.push(lengths[i2 - 1] + new Vector3(...points[i2]).distanceTo(new Vector3(...points[i2 - 1])));
  const progress = Math.max(0, Math.min(1, (time - t.delay) / t.duration)), distance = progress * lengths.at(-1);
  let i = 1;
  while (i < lengths.length - 1 && lengths[i] < distance) i++;
  const ratio = (distance - lengths[i - 1]) / (lengths[i] - lengths[i - 1] || 1), a = new Vector3(...points[i - 1]), b = new Vector3(...points[i]);
  position = a.clone().lerp(b, ratio).toArray();
  let direction = t.orientation === "tangent" ? b.sub(a) : null;
  if (t.orientation === "target") {
    const target = targets.find((v) => v.id === t.targetId);
    if (target) direction = new Vector3(...target.position).add(new Vector3(0, target.assetId ? 1.1 : 0, 0)).sub(new Vector3(...position));
  }
  if (direction?.lengthSq() > 1e-8) {
    direction.normalize();
    const yaw = Math.atan2(-direction.x, -direction.z), pitch = Math.asin(Math.max(-1, Math.min(1, direction.y)));
    quaternion = new Quaternion().setFromEuler(new Euler(pitch, yaw, 0, "YXZ")).toArray();
  }
  if (intensity !== void 0 && t.fadeOut > 0) intensity *= Math.max(0, Math.min(1, (t.delay + t.duration - time) / t.fadeOut));
  return { id: o.id, position, quaternion, rotation: new Euler().setFromQuaternion(new Quaternion(...quaternion), "YXZ").y, intensity };
}
function lookAt(position, target, fallback) {
  const d = new Vector3(...target.position).add(new Vector3(0, target.assetId ? 1.1 : 0, 0)).sub(new Vector3(...position));
  if (d.lengthSq() < 1e-8) return fallback;
  d.normalize();
  return new Quaternion().setFromEuler(new Euler(Math.asin(Math.max(-1, Math.min(1, d.y))), Math.atan2(-d.x, -d.z), 0, "YXZ")).toArray();
}
export {
  applyCinema,
  curvePoints,
  editableControls,
  groundCreateCommand,
  isCamera,
  isLight,
  isRig,
  newRig,
  objectQuaternion,
  rigFrame,
  validateCinema
};
