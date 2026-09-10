import { Vector3, Quaternion, Euler } from "three";
function uprightMonitorPose(position, quaternion, previousYaw = 0) {
  const forward = new Vector3(0, 0, -1).applyQuaternion(new Quaternion(...quaternion));
  const yaw = Math.hypot(forward.x, forward.z) > 1e-4 ? Math.atan2(-forward.x, -forward.z) : previousYaw;
  const q = new Quaternion().setFromEuler(new Euler(0, yaw, 0));
  return { position: new Vector3(...position).add(new Vector3(0, -0.2, -1.45).applyQuaternion(q)).toArray(), quaternion: q.toArray(), yaw };
}
export {
  uprightMonitorPose
};
