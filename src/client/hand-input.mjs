import * as THREE from "three";
import { HAND_SIDES, HANDS_METADATA, emptyHands, emptyArms, validHandPose, validateHandsMetadata } from "../shared/hand-frame.mjs";
import { createArmSolver } from "./arm-pose.mjs";
function isRigidHandSpace(matrix) {
  const e = matrix?.elements;
  if (!e || !e.every(Number.isFinite)) return false;
  const a = new THREE.Vector3(e[0], e[1], e[2]), b = new THREE.Vector3(e[4], e[5], e[6]), c = new THREE.Vector3(e[8], e[9], e[10]);
  return [a, b, c].every((v) => Math.abs(v.lengthSq() - 1) < 1e-4) && Math.abs(a.dot(b)) < 1e-4 && Math.abs(a.dot(c)) < 1e-4 && Math.abs(b.dot(c)) < 1e-4 && Math.abs(matrix.determinant() - 1) < 1e-4 && [e[3], e[7], e[11]].every((n) => Math.abs(n) < 1e-6) && Math.abs(e[15] - 1) < 1e-6;
}
function createHandInput(metadata = HANDS_METADATA) {
  validateHandsMetadata(metadata);
  let sequence = 0, current = emptyHands();
  const fingers = /* @__PURE__ */ new Map();
  const arms = metadata.armModel ? createArmSolver(metadata.armModel) : null;
  const offsets = new Map(HAND_SIDES.map((side) => {
    const p = metadata.gripToPalm[side];
    return [side, new THREE.Matrix4().compose(new THREE.Vector3().fromArray(p.positionMeters), new THREE.Quaternion().fromArray(p.quaternionXYZW), new THREE.Vector3(1, 1, 1))];
  }));
  const inverse = new THREE.Matrix4(), grip = new THREE.Matrix4(), palm = new THREE.Matrix4(), head = new THREE.Matrix4(), position = new THREE.Vector3(), rotation = new THREE.Quaternion(), scale = new THREE.Vector3();
  function next(time) {
    current = emptyHands(++sequence, Number.isFinite(time) ? Math.max(time, current.frameTimeMs) : current.frameTimeMs);
    if (arms) current.arms = emptyArms();
    return current;
  }
  function reset(time = current.frameTimeMs) {
    arms?.reset();
    fingers.clear();
    return next(time);
  }
  function sample({ frame, time, session, referenceSpace, rigMatrix, worldMatrix, headWorldMatrix, enabled = false }) {
    next(time);
    if (!enabled || !frame?.getPose || !referenceSpace || !session || session.visibilityState === "hidden" || !isRigidHandSpace(rigMatrix) || !isRigidHandSpace(worldMatrix)) {
      arms?.reset();
      fingers.clear();
      return current;
    }
    inverse.copy(worldMatrix).invert();
    const sources = Array.from(session.inputSources || []).filter((s) => HAND_SIDES.includes(s.handedness) && s.gripSpace && !s.hand && s.targetRayMode === "tracked-pointer");
    for (const hand of current.hands) {
      const matching = sources.filter((s) => s.handedness === hand.side);
      if (matching.length !== 1) continue;
      let pose;
      try {
        pose = frame.getPose(matching[0].gripSpace, referenceSpace);
      } catch {
        continue;
      }
      if (!pose?.transform?.matrix || pose.emulatedPosition === true) continue;
      grip.fromArray(pose.transform.matrix);
      if (!isRigidHandSpace(grip)) continue;
      palm.copy(inverse).multiply(rigMatrix).multiply(grip).multiply(offsets.get(hand.side));
      palm.decompose(position, rotation, scale);
      const local = { positionMeters: position.toArray(), quaternionXYZW: rotation.normalize().toArray() };
      if (!validHandPose(local)) continue;
      hand.tracked = true;
      hand.pose = local;
      if (metadata.modelVersion < 4) {
        hand.grip = metadata.fixedPose.grip;
        hand.trigger = metadata.fixedPose.trigger;
        continue;
      }
      const source = matching[0], target = controllerFingers(source.gamepad), last = fingers.get(hand.side);
      const alpha = last?.source === source ? 1 - Math.exp(-Math.min(0.1, Math.max(0, (current.frameTimeMs - last.time) / 1e3)) / 0.07) : 1;
      for (const key of ["grip", "trigger", "thumb"]) {
        const value = last?.source === source ? last[key] + (target[key] - last[key]) * alpha : target[key];
        hand[key] = Math.abs(value - target[key]) < 1e-3 ? target[key] : value;
      }
      fingers.set(hand.side, { source, time: current.frameTimeMs, grip: hand.grip, trigger: hand.trigger, thumb: hand.thumb });
    }
    for (const hand of current.hands) if (!hand.tracked) fingers.delete(hand.side);
    if (arms) current.arms = arms.solve(current.hands, isRigidHandSpace(headWorldMatrix) ? head.copy(inverse).multiply(headWorldMatrix) : null, current.frameTimeMs);
    return current;
  }
  return { sample, reset, snapshot: () => structuredClone(current) };
}
function controllerFingers(gamepad) {
  if (gamepad?.mapping !== "xr-standard") return { grip: 0, trigger: 0, thumb: 0 };
  const buttons = Array.from(gamepad.buttons || []), value = (b) => b?.pressed ? 1 : Number.isFinite(b?.value) ? THREE.MathUtils.clamp(b.value, 0, 1) : 0;
  const analog = (b) => {
    const n = Number.isFinite(b?.value) ? THREE.MathUtils.clamp(b.value, 0, 1) : value(b);
    return n > 0.03 ? n : b?.pressed ? 1 : 0;
  };
  const thumbPressed = buttons.slice(2, 6).some((b) => typeof b?.pressed === "boolean" ? b.pressed : value(b) > 0.65);
  return { trigger: analog(buttons[0]), grip: analog(buttons[1]), thumb: thumbPressed ? 1 : 0 };
}
export {
  controllerFingers,
  createHandInput,
  isRigidHandSpace
};
