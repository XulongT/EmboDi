import { Vector3, Quaternion, Mesh, MeshBasicMaterial, DoubleSide, Raycaster } from "three";
import { objectGeometry } from "./object-geometry.mjs";
const meshes = /* @__PURE__ */ new Map();
const projections = /* @__PURE__ */ new WeakMap();
const material = new MeshBasicMaterial({ side: DoubleSide });
const vector = (v) => Array.isArray(v) && v.length === 3 && v.every(Number.isFinite);
const q = (o) => o.quaternion ? new Quaternion(...o.quaternion) : new Quaternion().setFromAxisAngle(new Vector3(0, 1, 0), o.rotation || 0);
const isRegionObject = (o) => !!o && ["box", "sphere", "cylinder", "cone"].includes(o.shape) && o.editable !== false && (o.editable === true || !(o.id === "ground" || o.category === "structure" || /^(wall|ceiling)(_|-|$)/.test(o.id)));
function geometryMesh(o) {
  const key = [o.shape, o.kind || "", o.id.includes("roof")].join(":");
  if (!meshes.has(key)) {
    const mesh = new Mesh(objectGeometry(o), material);
    mesh.updateMatrixWorld();
    meshes.set(key, mesh);
  }
  return meshes.get(key);
}
function surfaceFrame(o, worldPoint, worldNormal) {
  const inverse = q(o).invert(), normal = new Vector3(...worldNormal).applyQuaternion(inverse).normalize();
  const vertical = new Vector3(0, 1, 0).applyQuaternion(inverse);
  let u = new Vector3().crossVectors(vertical, normal);
  if (u.lengthSq() < 0.01) u = new Vector3(1, 0, 0).applyQuaternion(inverse).projectOnPlane(normal);
  u.normalize();
  const v = new Vector3().crossVectors(normal, u).normalize();
  return { origin: new Vector3(...worldPoint).sub(new Vector3(...o.position)).applyQuaternion(inverse).toArray(), u: u.toArray(), v: v.toArray(), normal: normal.toArray(), size: [...o.size] };
}
function validateSurfaceFrame(frame) {
  if (!frame || !["origin", "u", "v", "normal", "size"].every((k) => vector(frame[k])) || frame.size.some((n2) => n2 < 0.02 || n2 > 100)) throw Error("Invalid object surface frame.");
  const [u, v, n] = ["u", "v", "normal"].map((k) => new Vector3(...frame[k]));
  if ([u, v, n].some((a) => Math.abs(a.length() - 1) > 0.01) || Math.abs(u.dot(v)) > 0.01 || new Vector3().crossVectors(u, v).dot(n) < 0.99 || frame.origin.some((x, i) => Math.abs(x) > frame.size[i] * 0.55 + 0.01)) throw Error("Invalid object surface axes.");
  return frame;
}
function surfaceUV(o, frame, worldPoint) {
  const local = new Vector3(...worldPoint).sub(new Vector3(...o.position)).applyQuaternion(q(o).invert()).divide(new Vector3(...o.size)).multiply(new Vector3(...frame.size)).sub(new Vector3(...frame.origin));
  return [local.dot(new Vector3(...frame.u)), local.dot(new Vector3(...frame.v))];
}
function surfaceLocalPoint(o, frame, p) {
  let cache = projections.get(frame);
  if (!cache) {
    cache = /* @__PURE__ */ new Map();
    projections.set(frame, cache);
  }
  const key = [o.shape, o.kind || "", o.id.includes("roof"), ...p].join(":");
  if (cache.has(key)) return cache.get(key);
  const size = new Vector3(...frame.size), base = new Vector3(...frame.origin).addScaledVector(new Vector3(...frame.u), p[0]).addScaledVector(new Vector3(...frame.v), p[1]).divide(size);
  const normal = new Vector3(...frame.normal).divide(size).normalize(), ray = new Raycaster(base.clone().addScaledVector(normal, 3), normal.clone().negate(), 0, 6);
  const hit = ray.intersectObject(geometryMesh(o), false)[0];
  const point = !hit || hit.face.normal.dot(normal) < 0.08 ? null : hit.point.toArray();
  cache.set(key, point);
  return point;
}
function objectRegionFrame(o, frame) {
  const rotation = q(o), size = new Vector3(...o.size), reference = new Vector3(...frame.size);
  const scalePoint = (p) => new Vector3(...p).multiply(size).applyQuaternion(rotation).add(new Vector3(...o.position)).toArray();
  const direction = (a) => new Vector3(...a).divide(reference).multiply(size).applyQuaternion(rotation).toArray();
  return { origin: scalePoint(new Vector3(...frame.origin).divide(reference).toArray()), u: direction(frame.u), v: direction(frame.v), normal: new Vector3(...frame.normal).multiply(reference).divide(size).applyQuaternion(rotation).normalize().toArray(), project(p) {
    const point = surfaceLocalPoint(o, frame, p);
    if (!point) throw Error("Region leaves the object surface. Redraw a smaller closed region.");
    return scalePoint(point);
  } };
}
export {
  isRegionObject,
  objectRegionFrame,
  surfaceFrame,
  surfaceLocalPoint,
  surfaceUV,
  validateSurfaceFrame
};
