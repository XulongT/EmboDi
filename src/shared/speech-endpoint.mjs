function createSpeechEndpoint({ silenceMs = 1200, noSpeechMs = 8e3, minSpeechMs = 220, threshold = 0.018 } = {}) {
  let start = null, last = null, voiced = 0, previous = null, done = false;
  return { sample(now, rms) {
    if (done) return null;
    start ??= now;
    const dt = previous === null ? 0 : Math.min(100, Math.max(0, now - previous));
    previous = now;
    if (rms >= threshold) {
      voiced += dt;
      last = now;
    }
    if (voiced >= minSpeechMs && last !== null && now - last >= silenceMs) {
      done = true;
      return "send";
    }
    if (now - start >= noSpeechMs && voiced < minSpeechMs) {
      done = true;
      return "cancel";
    }
    return null;
  } };
}
export {
  createSpeechEndpoint
};
