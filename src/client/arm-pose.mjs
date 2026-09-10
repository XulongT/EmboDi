import * as THREE from "three";
import { emptyArms } from "../shared/hand-frame.mjs";
const wrap = (a) => Math.atan2(Math.sin(a), Math.cos(a));
const v = (a) => new THREE.Vector3().fromArray(a);
function createArmSolver(config) {
  let torsoYaw = null, lastTime = null;
  const poles = [null, null];
  function reset() {
    torsoYaw = null;
    lastTime = null;
    poles.fill(null);
  }
  function solve(hands, headMatrix, time) {
    const output = emptyArms();
    if (!headMatrix) {
      reset();
      return output;
    }
    const head = new THREE.Vector3().setFromMatrixPosition(headMatrix), forward = new THREE.Vector3(0, 0, -1).transformDirection(headMatrix);
    forward.y = 0;
    if (head.toArray().some((n) => !Number.isFinite(n) || Math.abs(n) > 99)) {
      reset();
      return output;
    }
    const dt = lastTime === null ? 0 : THREE.MathUtils.clamp((time - lastTime) / 1e3, 0, 0.05);
    lastTime = time;
    const headYaw = forward.lengthSq() > 0.01 ? Math.atan2(-forward.x, -forward.z) : torsoYaw ?? 0;
    if (torsoYaw === null) torsoYaw = headYaw;
    let target = torsoYaw, delta = wrap(headYaw - torsoYaw);
    if (Math.abs(delta) > config.headYawDeadband) target = wrap(headYaw - Math.sign(delta) * config.headYawDeadband);
    if (hands.every((h) => h.tracked)) {
      const middle = v(hands[0].pose.positionMeters).add(v(hands[1].pose.positionMeters)).multiplyScalar(0.5).sub(head);
      middle.y = 0;
      const handsYaw = Math.atan2(-middle.x, -middle.z);
      if (middle.length() > 0.2 && Math.abs(wrap(headYaw - handsYaw)) < 0.65 && Math.abs(delta) > 0.3) target = handsYaw;
    }
    torsoYaw = wrap(torsoYaw + THREE.MathUtils.clamp(wrap(target - torsoYaw), -config.maxTorsoTurnSpeed * dt, config.maxTorsoTurnSpeed * dt));
    output.torsoYawRadians = torsoYaw;
    const body = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), torsoYaw), right = new THREE.Vector3(1, 0, 0).applyQuaternion(body), back = new THREE.Vector3(0, 0, 1).applyQuaternion(body);
    for (const [i, hand] of hands.entries()) {
      if (!hand.tracked) {
        poles[i] = null;
        continue;
      }
      const side = i === 0 ? -1 : 1, shoulder = head.clone().addScaledVector(right, side * config.shoulderWidth / 2).addScaledVector(back, config.headToShoulderBack);
      shoulder.y -= config.headToShoulderDrop;
      const wrist = v(config.palmToWrist).applyQuaternion(new THREE.Quaternion().fromArray(hand.pose.quaternionXYZW)).add(v(hand.pose.positionMeters));
      const direction = wrist.clone().sub(shoulder);
      let distance = direction.length();
      if (distance < 1e-6) direction.copy(back).negate();
      else direction.divideScalar(distance);
      const upper = config.upperArmLength, lower = config.forearmLength, min = Math.abs(upper - lower) + 5e-3, max = upper + lower - 5e-3;
      const adjustment = distance > max ? Math.min(distance - max, config.maxShoulderShift) : distance < min ? -Math.min(min - distance, config.maxShoulderShift) : 0;
      shoulder.addScaledVector(direction, adjustment);
      distance = wrist.distanceTo(shoulder);
      direction.copy(wrist).sub(shoulder).normalize();
      const unreachable = distance > max + 1e-6 || distance < min - 1e-6;
      let elbow;
      if (unreachable) {
        elbow = wrist.clone().addScaledVector(direction, -lower);
        poles[i] = null;
      } else {
        const crossing = side * wrist.clone().sub(head).dot(right) < 0;
        const desired = right.clone().multiplyScalar(side * 0.7).add(new THREE.Vector3(0, -0.9, 0)).addScaledVector(back, crossing ? -0.8 : 0.2);
        desired.addScaledVector(direction, -desired.dot(direction));
        if (desired.lengthSq() < 1e-6) {
          desired.copy(back);
          desired.addScaledVector(direction, -desired.dot(direction));
        }
        if (desired.lengthSq() < 1e-6) {
          desired.copy(right);
          desired.addScaledVector(direction, -desired.dot(direction));
        }
        desired.normalize();
        const previous = poles[i]?.clone();
        if (previous) {
          previous.addScaledVector(direction, -previous.dot(direction));
          if (previous.lengthSq() > 0.01) {
            previous.normalize();
            desired.copy(previous.lerp(desired, 1 - Math.exp(-config.poleSmoothing * dt)).normalize());
          }
        }
        poles[i] = desired.clone();
        const along = (upper * upper - lower * lower + distance * distance) / (2 * distance), height = Math.sqrt(Math.max(0, upper * upper - along * along));
        elbow = shoulder.clone().addScaledVector(direction, along).addScaledVector(desired, height);
      }
      output.joints[i] = { side: hand.side, status: unreachable ? "forearm-only" : adjustment ? "shoulder-adjusted" : "solved", shoulder: shoulder.toArray(), elbow: elbow.toArray(), wrist: wrist.toArray(), shoulderShiftMeters: Math.abs(adjustment), reachErrorMeters: unreachable ? Math.max(distance - max, min - distance) : 0 };
    }
    return output;
  }
  return { solve, reset };
}
export {
  createArmSolver
};
