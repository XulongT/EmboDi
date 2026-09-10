import { UI_THEME as T } from "../../shared/ui-theme.mjs";
import * as THREE from "three";
import { idsInVolume } from "../../shared/selection.mjs";
function createVolumeSelection({ world, getScene, getMeshes, getHit, onCandidates }) {
  let box = null, helper = null, startMarker = null, depth = 4, ids = [];
  const localRay = (ray) => {
    world.updateMatrixWorld(true);
    return ray.clone().applyMatrix4(world.matrixWorld.clone().invert());
  };
  function clear() {
    if (helper) {
      world.remove(helper);
      helper.traverse((o) => {
        o.geometry?.dispose();
        o.material?.dispose();
      });
      helper = null;
    }
    if (startMarker) {
      world.remove(startMarker);
      startMarker.geometry.dispose();
      startMarker.material.dispose();
      startMarker = null;
    }
    box = null;
  }
  function paint() {
    const { origin, u, v, n, a, b } = box;
    helper.position.copy(origin).addScaledVector(u, (a[0] + b[0]) / 2).addScaledVector(v, (a[1] + b[1]) / 2);
    helper.quaternion.setFromRotationMatrix(new THREE.Matrix4().makeBasis(u, v, n));
    const visibleMinimum = 0.025 / world.scale.x;
    helper.scale.set(Math.max(visibleMinimum, Math.abs(b[0] - a[0])), Math.max(visibleMinimum, Math.abs(b[1] - a[1])), depth);
    ids = idsInVolume(getScene(), { origin: origin.toArray(), u: u.toArray(), v: v.toArray(), n: n.toArray(), a, b, depth });
    onCandidates(ids);
  }
  function begin(raycaster) {
    clear();
    const ray = localRay(raycaster.ray), hit = getHit ? getHit(raycaster) : raycaster.intersectObjects(getMeshes().filter((m) => m.userData.definition.id !== "ground"), false)[0];
    const objects = getScene().objects, hitDefinition = hit?.object?.userData.definition || objects.find((o) => o.id === hit?.id);
    const distances = objects.filter((o) => o.editable === true || o.id !== "ground" && o.category !== "structure").map((o) => new THREE.Vector3().fromArray(o.position).sub(ray.origin).dot(ray.direction)).filter((d) => d > 0).sort((a, b) => a - b);
    const distance = hitDefinition ? new THREE.Vector3().fromArray(hitDefinition.position).sub(ray.origin).dot(ray.direction) : distances[Math.floor(distances.length / 2)] ?? 3 / world.scale.x;
    const origin = ray.at(Math.max(0.1, distance), new THREE.Vector3());
    const n = ray.direction.clone().negate(), up = Math.abs(n.y) > 0.95 ? new THREE.Vector3(0, 0, 1) : new THREE.Vector3(0, 1, 0);
    const u = new THREE.Vector3().crossVectors(up, n).normalize(), v = new THREE.Vector3().crossVectors(n, u).normalize();
    box = { origin, u, v, n, a: [0, 0], b: [0, 0], plane: new THREE.Plane().setFromNormalAndCoplanarPoint(n, origin) };
    helper = new THREE.Group();
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const fill = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ toneMapped: false, color: T.selected, transparent: true, opacity: 0.08, depthWrite: false, side: THREE.DoubleSide }));
    const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geometry), new THREE.LineBasicMaterial({ toneMapped: false, color: T.accent, depthTest: false, transparent: true, opacity: 0.9 }));
    edges.renderOrder = 12;
    helper.add(fill, edges);
    world.add(helper);
    startMarker = new THREE.Mesh(new THREE.SphereGeometry(0.015 / world.scale.x, 10, 6), new THREE.MeshBasicMaterial({ toneMapped: false, color: T.accent, depthTest: false }));
    startMarker.position.copy(origin);
    startMarker.renderOrder = 13;
    world.add(startMarker);
    paint();
  }
  function update(raycaster) {
    if (!box) return;
    const point = localRay(raycaster.ray).intersectPlane(box.plane, new THREE.Vector3());
    if (!point) return;
    const delta = point.sub(box.origin);
    box.b = [delta.dot(box.u), delta.dot(box.v)];
    paint();
  }
  function finish() {
    if (!box) return null;
    const valid = Math.abs(box.b[0] - box.a[0]) > 0.08 && Math.abs(box.b[1] - box.a[1]) > 0.08;
    const result = valid ? [...ids] : null;
    clear();
    return result;
  }
  return { begin, update, finish, cancel: clear, isActive: () => !!box, setDepth(value) {
    depth = THREE.MathUtils.clamp(value, 0.5, 30);
    if (box) paint();
    return depth;
  }, getDepth: () => depth };
}
export {
  createVolumeSelection
};
