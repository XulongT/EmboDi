function roomXRFeatures({ ar, planeRequired = false, preferUnbounded = true }) {
  return { requiredFeatures: ["local-floor", ...ar && planeRequired ? ["plane-detection"] : []], optionalFeatures: [...ar && preferUnbounded ? ["unbounded"] : [], ...ar && !planeRequired ? ["plane-detection"] : []] };
}
async function chooseRoomReferenceSpace(session, { preferUnbounded = true } = {}) {
  let fallbackReason = null;
  if (preferUnbounded) {
    try {
      return { type: "unbounded", space: await session.requestReferenceSpace("unbounded"), fallbackReason: null };
    } catch (error) {
      if (!["NotSupportedError", "SecurityError"].includes(error.name)) throw error;
      fallbackReason = error.name + ": " + error.message;
    }
  }
  return { type: "local-floor", space: await session.requestReferenceSpace("local-floor"), fallbackReason };
}
function compensatedReferenceSpace(event) {
  const inverse = event?.transform?.inverse;
  if (!inverse?.matrix || inverse.matrix.length !== 16 || !Array.from(inverse.matrix).every(Number.isFinite) || typeof event.referenceSpace?.getOffsetReferenceSpace !== "function") return null;
  return event.referenceSpace.getOffsetReferenceSpace(inverse);
}
export {
  chooseRoomReferenceSpace,
  compensatedReferenceSpace,
  roomXRFeatures
};
