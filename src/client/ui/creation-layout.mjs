import * as THREE from "three";
import { isFloor } from "../../shared/entry-points.mjs";
function scanPresentationBounds(definition) {
  const bounds = new THREE.Box3();
  for (const o of (definition?.objects || []).filter(isFloor)) {
    const c = Math.cos(o.rotation), s = Math.sin(o.rotation);
    for (const x of [-o.size[0] / 2, o.size[0] / 2]) for (const z of [-o.size[2] / 2, o.size[2] / 2]) bounds.expandByPoint(new THREE.Vector3(o.position[0] + c * x + s * z, 0, o.position[2] - s * x + c * z));
  }
  return { center: bounds.getCenter(new THREE.Vector3()).toArray(), extent: Math.max(...bounds.getSize(new THREE.Vector3()).toArray()) };
}
function createCreationLayout(panel, world) {
  let yaw = 0, hasYaw = false, stableSince = null, start = null, previous = null;
  const up = new THREE.Vector3(0, 1, 0);
  function sample(view) {
    const position = view.getWorldPosition(new THREE.Vector3()), q = view.getWorldQuaternion(new THREE.Quaternion());
    const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(q);
    forward.y = 0;
    const horizontal = forward.lengthSq() > 0.04;
    if (horizontal) {
      yaw = Math.atan2(-forward.x, -forward.z);
      hasYaw = true;
    }
    return { position, yaw, horizontal };
  }
  return {
    reset() {
      stableSince = start = null;
      previous = null;
      hasYaw = false;
      yaw = 0;
    },
    ready(view, time, valid = true) {
      if (!valid) {
        stableSince = start = null;
        previous = null;
        return false;
      }
      const pose = sample(view);
      start ??= time;
      if (!hasYaw) return false;
      const angle = previous ? Math.atan2(Math.sin(pose.yaw - previous.yaw), Math.cos(pose.yaw - previous.yaw)) : 0;
      if (!previous || Math.abs(angle) > 0.04 || pose.position.distanceTo(previous.position) > 0.04) {
        stableSince = time;
        previous = pose;
      }
      return time - stableSince >= 250 || time - start >= 1500;
    },
    place(view, { miniature = false, center = [0, 0, 0], rotationOffset = 0 } = {}) {
      const { position, yaw: yaw2 } = sample(view), forward = new THREE.Vector3(-Math.sin(yaw2), 0, -Math.cos(yaw2));
      panel.position.copy(position).addScaledVector(forward, miniature ? 1.25 : 1.5);
      panel.position.y -= miniature ? 0.64 : 0.18;
      panel.quaternion.setFromAxisAngle(up, yaw2);
      panel.visible = true;
      panel.updateMatrixWorld(true);
      if (miniature) {
        world.quaternion.setFromAxisAngle(up, yaw2 + rotationOffset);
        const offset = new THREE.Vector3().fromArray(center).multiply(world.scale).applyQuaternion(world.quaternion);
        world.position.copy(position).addScaledVector(forward, 1.9).sub(offset);
        world.position.y -= 0.48;
        world.updateMatrixWorld(true);
      }
    }
  };
}
function alignedRoomPose(candidate, ground) {
  const yaw = candidate.yaw - (ground?.rotation || 0), q = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), yaw);
  const local = new THREE.Vector3(ground?.position[0] || 0, ground ? ground.position[1] + ground.size[1] / 2 : 0, ground?.position[2] || 0).applyQuaternion(q);
  return { position: new THREE.Vector3().fromArray(candidate.origin).sub(local).toArray(), yaw };
}
function captureCreationPose(world, rig, camera, alignedMode) {
  const copy = (o) => ({ position: o.position.toArray(), quaternion: o.quaternion.toArray(), scale: o.scale.toArray() });
  return { world: copy(world), rig: copy(rig), camera: copy(camera), alignedMode };
}
function restoreCreationPose(saved, world, rig, camera, { xr = false } = {}) {
  const restore = (o, p) => {
    o.position.fromArray(p.position);
    o.quaternion.fromArray(p.quaternion);
    o.scale.fromArray(p.scale);
    o.updateMatrixWorld(true);
  };
  restore(world, saved.world);
  restore(rig, saved.rig);
  if (!xr) restore(camera, saved.camera);
}
export {
  alignedRoomPose,
  captureCreationPose,
  createCreationLayout,
  restoreCreationPose,
  scanPresentationBounds
};
