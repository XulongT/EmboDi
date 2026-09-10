function validateVoiceContext(captured, current) {
  const equal = (a, b) => JSON.stringify(a ?? null) === JSON.stringify(b ?? null);
  for (const key of ["revision", "phase", "productionEpoch", "productionMode", "targetIds", "ids", "curveId"]) if (!equal(captured[key], current[key])) throw Error("Scene, mode or target changed. B Cancel this transcript, then X Speak again.");
  if (!equal(captured.spatialContext?.spatialKey, current.spatialContext?.spatialKey)) throw Error("Alignment changed. Cancel this transcript and speak again.");
}
function voicePages(text, size = 100) {
  const chars = Array.from(text);
  return Array.from({ length: Math.max(1, Math.ceil(chars.length / size)) }, (_, i) => chars.slice(i * size, (i + 1) * size).join(""));
}
export {
  validateVoiceContext,
  voicePages
};
