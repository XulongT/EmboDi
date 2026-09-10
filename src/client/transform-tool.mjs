import * as THREE from "three";
import { transformTargets, transformUpdates, wrapYaw } from "../shared/transforms.mjs";
function createTransformTool({ world, getState, spatialKey, onEvent = () => {
} }) {
  let drag = null;
  function intersection(ray, y) {
    world.updateMatrixWorld(true);
    const local = ray.ray.clone().applyMatrix4(world.matrixWorld.clone().invert());
    if (Math.abs(local.direction.y) < 0.06) return null;
    const p = local.intersectPlane(new THREE.Plane(new THREE.Vector3(0, 1, 0), -y), new THREE.Vector3());
    return p && p.distanceTo(local.origin) < 50 ? p : null;
  }
  function begin(ids, pivot, ray) {
    if (drag) return false;
    const targets = structuredClone(transformTargets(getState().scene, ids)), point = intersection(ray, pivot[1]);
    if (!point) throw new Error("Point slightly downward, then hold the trigger to adjust again");
    drag = { revision: getState().revision, key: spatialKey(), targets, point, translation: [0, 0, 0], yaw: 0, pivot: [...pivot], axisHeld: false, changed: false };
    onEvent("transform-begin", { ids: targets.map((o) => o.id), pivot, revision: drag.revision });
    return true;
  }
  function update(ray, dt, x = 0, y = 0) {
    if (!drag) return;
    if (drag.revision !== getState().revision || drag.key !== spatialKey()) {
      cancel("Scene or alignment changed");
      return;
    }
    x = Math.abs(x) > 0.2 ? x : 0;
    y = Math.abs(y) > 0.2 ? y : 0;
    const point = intersection(ray, drag.pivot[1]);
    if (x || y) {
      drag.yaw = wrapYaw(drag.yaw - x * dt * Math.PI / 3);
      drag.translation[1] = THREE.MathUtils.clamp(drag.translation[1] - y * dt * 0.4, -20, 20);
      drag.axisHeld = true;
    } else if (point) {
      if (drag.axisHeld) {
        drag.point.copy(point).sub(new THREE.Vector3(drag.translation[0], 0, drag.translation[2]));
        drag.axisHeld = false;
      } else {
        drag.translation[0] = point.x - drag.point.x;
        drag.translation[2] = point.z - drag.point.z;
      }
    }
    drag.changed = Math.hypot(...drag.translation) > 5e-3 || Math.abs(drag.yaw) > 2e-3;
  }
  const operation = () => drag ? { ids: drag.targets.map((o) => o.id), pivot: [...drag.pivot], translation: [...drag.translation], yaw: drag.yaw } : null;
  function cancel(reason = "Cancelled by user") {
    if (drag) onEvent("transform-cancel", { reason, operation: operation() });
    drag = null;
  }
  return { begin, update, cancel, active: () => !!drag, operation, revision: () => drag?.revision, changed: () => !!drag?.changed, updates: () => drag ? transformUpdates(drag.targets, operation()) : [], finish() {
    const result = drag && { revision: drag.revision, operation: operation(), changed: drag.changed };
    drag = null;
    return result;
  } };
}
function createNavigationGate() {
  let blocked = false;
  return { block() {
    blocked = true;
  }, sample(axes) {
    if (blocked && axes.every((v) => Math.abs(v) < 0.17)) blocked = false;
    return !blocked;
  }, blocked: () => blocked };
}
export {
  createNavigationGate,
  createTransformTool
};
