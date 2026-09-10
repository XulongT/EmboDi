const HAND_SIDES = Object.freeze(["left", "right"]);
const half = Math.SQRT1_2;
const HAND_GRIP_BASIS = Object.freeze({ left: Object.freeze([half, 0, half, 0]), right: Object.freeze([half, 0, -half, 0]) });
const fittedRotation = (side, degrees) => {
  const [x, y, z, w] = HAND_GRIP_BASIS[side], s = Math.sin(degrees * Math.PI / 360), c = Math.cos(degrees * Math.PI / 360);
  return [c * x + s * w, c * y - s * z, c * z + s * y, c * w - s * x];
};
const HANDS_METADATA = Object.freeze({
  version: 1,
  modelId: "whitebox-controller-hands",
  modelVersion: 5,
  space: "content-world",
  units: "meters",
  poseConvention: "palm-after-grip-offset",
  clock: "animation-frame-ms",
  grasp: "controller-fingers",
  calibration: "default-unmeasured",
  appearance: Object.freeze({ color: "#58a6d8" }),
  dimensions: Object.freeze({ palmWidth: 0.078, palmLength: 0.086, palmThickness: 0.03, wristLength: 0.04, fingerRadius: 8e-3 }),
  fixedPose: Object.freeze({ grip: 0.65, trigger: 0.15 }),
  gripToPalm: Object.freeze({
    // WebXR: grip +Y points toward the arm, -Z toward the thumb, and
    // the back of the hand faces -X (left) / +X (right). Model +Y is
    // distal and +Z is palmar. The grip origin is inside the curled fist.
    left: Object.freeze({ positionMeters: Object.freeze([-0.022, 0.012, 0.016]), quaternionXYZW: Object.freeze(fittedRotation("left", 45)) }),
    right: Object.freeze({ positionMeters: Object.freeze([0.022, 0.012, 0.016]), quaternionXYZW: Object.freeze(fittedRotation("right", 45)) })
  }),
  armModel: Object.freeze({
    version: 1,
    solver: "two-bone-pole-1",
    tracking: "head-and-grips-inferred-shoulders-elbows",
    shoulderWidth: 0.38,
    headToShoulderDrop: 0.24,
    headToShoulderBack: 0.07,
    upperArmLength: 0.29,
    forearmLength: 0.26,
    maxShoulderShift: 0.06,
    upperArmRadius: 0.043,
    forearmRadius: 0.033,
    palmToWrist: Object.freeze([0, -0.062, 0]),
    headYawDeadband: 0.96,
    maxTorsoTurnSpeed: 0.65,
    poleSmoothing: 8
  })
});
const vector = (v, n) => Array.isArray(v) && v.length === n && v.every(Number.isFinite);
const keys = (o, allowed) => o && typeof o === "object" && !Array.isArray(o) && Object.keys(o).every((k) => allowed.includes(k));
const unit = (n) => Number.isFinite(n) && n >= 0 && n <= 1;
function validHandPose(p, maxPosition = 100) {
  return keys(p, ["positionMeters", "quaternionXYZW"]) && vector(p.positionMeters, 3) && p.positionMeters.every((n) => Math.abs(n) <= maxPosition) && vector(p.quaternionXYZW, 4) && Math.abs(Math.hypot(...p.quaternionXYZW) - 1) < 1e-3;
}
function emptyHands(sampleId = 0, frameTimeMs = 0) {
  return { sampleId, frameTimeMs, hands: HAND_SIDES.map((side) => ({ side, tracked: false, pose: null, grip: 0, trigger: 0, thumb: 0 })) };
}
function validateHandsSample(sample, metadata) {
  if (!keys(sample, ["sampleId", "frameTimeMs", "hands", "arms"]) || !Number.isSafeInteger(sample.sampleId) || sample.sampleId < 0 || !Number.isFinite(sample.frameTimeMs) || sample.frameTimeMs < 0 || !Array.isArray(sample.hands) || sample.hands.length !== 2) throw new Error("Invalid hand sample");
  for (const [i, hand] of sample.hands.entries()) {
    if (!keys(hand, ["side", "tracked", "pose", "grip", "trigger", "thumb"]) || hand.side !== HAND_SIDES[i] || typeof hand.tracked !== "boolean" || !unit(hand.grip) || !unit(hand.trigger) || (hand.thumb !== void 0 || metadata?.modelVersion >= 4) && !unit(hand.thumb) || (hand.tracked ? !validHandPose(hand.pose) : hand.pose !== null)) throw new Error("Invalid hand pose");
  }
  if (sample.arms !== void 0) validateArmsSample(sample, metadata);
  return sample;
}
function validateHandsMetadata(meta) {
  if (!keys(meta, Object.keys(HANDS_METADATA)) || ![1, 2, 3, 4, 5].includes(meta.modelVersion) || ["version", "modelId", "space", "units", "poseConvention", "clock"].some((k) => meta[k] !== HANDS_METADATA[k]) || meta.grasp !== (meta.modelVersion >= 4 ? "controller-fingers" : "fixed-natural") || !["default-unmeasured", "user-adjusted", "device-calibrated"].includes(meta.calibration)) throw new Error("Invalid hand model version");
  if (meta.appearance !== void 0 || meta.modelVersion >= 4) {
    if (!keys(meta.appearance, ["color"]) || !/^#[\da-f]{6}$/i.test(meta.appearance.color)) throw new Error("Invalid hand model colors");
  }
  if (!keys(meta.dimensions, Object.keys(HANDS_METADATA.dimensions)) || Object.keys(HANDS_METADATA.dimensions).some((k) => !Number.isFinite(meta.dimensions[k]) || meta.dimensions[k] < 3e-3 || meta.dimensions[k] > 0.25) || !keys(meta.fixedPose, ["grip", "trigger"]) || !unit(meta.fixedPose.grip) || !unit(meta.fixedPose.trigger) || !keys(meta.gripToPalm, HAND_SIDES) || HAND_SIDES.some((side) => !validHandPose(meta.gripToPalm[side], 0.25))) throw new Error("Invalid hand model configuration");
  if (meta.armModel !== void 0) {
    const a = meta.armModel, defaults = HANDS_METADATA.armModel;
    if (meta.modelVersion < 2 || !keys(a, Object.keys(defaults)) || ["version", "solver", "tracking"].some((k) => a[k] !== defaults[k]) || !vector(a.palmToWrist, 3) || a.palmToWrist.some((n) => Math.abs(n) > 0.25) || Object.keys(defaults).filter((k) => typeof defaults[k] === "number" && k !== "version").some((k) => !Number.isFinite(a[k]) || a[k] <= 0 || a[k] > (k === "poleSmoothing" ? 30 : k === "headYawDeadband" ? Math.PI : k === "maxTorsoTurnSpeed" ? 3 : 1)) || a.maxShoulderShift > 0.12) throw new Error("Invalid arm model configuration");
  }
  return meta;
}
function emptyArms() {
  return { torsoYawRadians: null, joints: HAND_SIDES.map((side) => ({ side, status: "untracked", shoulder: null, elbow: null, wrist: null, shoulderShiftMeters: 0, reachErrorMeters: 0 })) };
}
function validateArmsSample(sample, metadata) {
  const a = sample.arms, point = (p) => vector(p, 3) && p.every((n) => Math.abs(n) <= 100), distance = (p, q) => Math.hypot(...p.map((n, i) => n - q[i]));
  if (metadata && !metadata.armModel) throw new Error("Arm model configuration is missing");
  if (!keys(a, ["torsoYawRadians", "joints"]) || !(a.torsoYawRadians === null || Number.isFinite(a.torsoYawRadians) && Math.abs(a.torsoYawRadians) <= Math.PI) || !Array.isArray(a.joints) || a.joints.length !== 2) throw new Error("Invalid arm sample");
  for (const [i, j] of a.joints.entries()) {
    if (!keys(j, ["side", "status", "shoulder", "elbow", "wrist", "shoulderShiftMeters", "reachErrorMeters"]) || j.side !== HAND_SIDES[i] || !["untracked", "solved", "shoulder-adjusted", "forearm-only"].includes(j.status) || !Number.isFinite(j.shoulderShiftMeters) || j.shoulderShiftMeters < 0 || j.shoulderShiftMeters > 0.120001 || !Number.isFinite(j.reachErrorMeters) || j.reachErrorMeters < 0 || j.reachErrorMeters > 200) throw new Error("Invalid arm joint");
    if (j.status === "untracked") {
      if (j.shoulder !== null || j.elbow !== null || j.wrist !== null || j.shoulderShiftMeters !== 0 || j.reachErrorMeters !== 0) throw new Error("Untracked arms must be hidden");
      continue;
    }
    if (!sample.hands[i].tracked || a.torsoYawRadians === null || ![j.shoulder, j.elbow, j.wrist].every(point)) throw new Error("Invalid arm tracking");
    if (metadata) {
      const m = metadata.armModel, p = sample.hands[i].pose, [x, y, z, w] = p.quaternionXYZW, [vx, vy, vz] = m.palmToWrist;
      const tx = 2 * (y * vz - z * vy), ty = 2 * (z * vx - x * vz), tz = 2 * (x * vy - y * vx);
      const wrist = [vx + w * tx + y * tz - z * ty, vy + w * ty + z * tx - x * tz, vz + w * tz + x * ty - y * tx].map((n, k) => n + p.positionMeters[k]);
      if (distance(wrist, j.wrist) > 1e-4) throw new Error("Wrist and hand poses do not match");
      if (j.shoulderShiftMeters > m.maxShoulderShift + 1e-5 || Math.abs(distance(j.elbow, j.wrist) - m.forearmLength) > 1e-4 || j.status !== "forearm-only" && (Math.abs(distance(j.shoulder, j.elbow) - m.upperArmLength) > 1e-4 || j.reachErrorMeters > 1e-4)) throw new Error("Invalid arm length");
    }
  }
}
function handMetadataForSize(scale = 1, armScale = 1, gripTilt = 45, presentationScale = 1) {
  if (!Number.isFinite(scale) || scale < 0.7 || scale > 1.3) throw new Error("Hand size must be between 70% and 130%");
  if (!Number.isFinite(armScale) || armScale < 0.8 || armScale > 1.2) throw new Error("Arm length must be between 80% and 120%");
  if (!Number.isFinite(gripTilt) || gripTilt < 0 || gripTilt > 90) throw new Error("Grip tilt must be between 0° and 90°");
  if (!Number.isFinite(presentationScale) || presentationScale < 0.5 || presentationScale > 1.5) throw new Error("Invalid body display scale");
  scale *= presentationScale;
  armScale *= presentationScale;
  const m = structuredClone(HANDS_METADATA);
  for (const k of Object.keys(m.dimensions)) m.dimensions[k] *= scale;
  for (const side of HAND_SIDES) {
    m.gripToPalm[side].positionMeters = m.gripToPalm[side].positionMeters.map((n) => n * scale);
    m.gripToPalm[side].quaternionXYZW = fittedRotation(side, gripTilt);
  }
  m.armModel.palmToWrist = m.armModel.palmToWrist.map((n) => n * scale);
  m.armModel.headToShoulderDrop = 0.21;
  m.armModel.upperArmRadius *= presentationScale;
  m.armModel.forearmRadius *= presentationScale;
  m.armModel.upperArmLength *= armScale;
  m.armModel.forearmLength *= armScale;
  if (scale !== 1 || armScale !== 1 || gripTilt !== 45) m.calibration = "user-adjusted";
  return m;
}
export {
  HANDS_METADATA,
  HAND_GRIP_BASIS,
  HAND_SIDES,
  emptyArms,
  emptyHands,
  handMetadataForSize,
  validHandPose,
  validateArmsSample,
  validateHandsMetadata,
  validateHandsSample
};
