function createSessionMedia({ mediaDevices = globalThis.navigator?.mediaDevices, Stream = globalThis.MediaStream } = {}) {
  let generation = 0, preparing = false;
  const sources = /* @__PURE__ */ new Map(), consumers = /* @__PURE__ */ new Set();
  const live = (kind) => sources.get(kind)?.readyState === "live";
  function release() {
    generation++;
    preparing = false;
    for (const track of [...sources.values(), ...consumers]) track.stop();
    sources.clear();
    consumers.clear();
  }
  function begin() {
    release();
    preparing = true;
  }
  async function getUserMedia(constraints) {
    const kinds = ["video", "audio"].filter((kind) => constraints[kind]);
    const missing = kinds.filter((kind) => !live(kind) || constraints[kind]?.deviceId?.exact && sources.get(kind).getSettings().deviceId !== constraints[kind].deviceId.exact);
    if (missing.length) {
      if (!preparing) throw new Error("Device access is not ready. Exit XR and use Prepare access before continuing.");
      if (!mediaDevices?.getUserMedia) throw new Error("Device access is unavailable. Open this page in Quest Browser using localhost or HTTPS.");
      const token = generation;
      const stream = await mediaDevices.getUserMedia(Object.fromEntries(["video", "audio"].map((kind) => [kind, missing.includes(kind) ? constraints[kind] : false])));
      if (token !== generation || !preparing) {
        stream.getTracks().forEach((track) => track.stop());
        throw new Error("Startup setup was cancelled. Please try again.");
      }
      if (missing.some((kind) => !stream.getTracks().some((track) => track.kind === kind && track.readyState === "live"))) {
        stream.getTracks().forEach((track) => track.stop());
        throw new Error("The requested device did not provide a usable stream.");
      }
      for (const track of stream.getTracks()) {
        if (!missing.includes(track.kind)) {
          track.stop();
          continue;
        }
        sources.get(track.kind)?.stop();
        track.enabled = false;
        sources.set(track.kind, track);
      }
    }
    for (const track of consumers) if (track.readyState === "ended") consumers.delete(track);
    return new Stream(kinds.map((kind) => {
      const track = sources.get(kind).clone();
      track.enabled = true;
      consumers.add(track);
      return track;
    }));
  }
  return {
    begin,
    release,
    seal() {
      preparing = false;
    },
    snapshot: () => ({ camera: live("video"), microphone: live("audio"), preparing }),
    mediaDevices: { getUserMedia, enumerateDevices: () => mediaDevices?.enumerateDevices?.() || Promise.resolve([]) }
  };
}
export {
  createSessionMedia
};
