import { findEntryCandidates } from "./entry-points.mjs";
function createDemoEntry({ delayMs = 3e3 } = {}) {
  let pending = null;
  return {
    get active() {
      return pending !== null;
    },
    start({ scene, revision, reference, now }) {
      if (pending) throw new Error("Entering. Please wait.");
      if (!reference) throw new Error("Select an image first");
      if (!scene) throw new Error("Demo world is not loaded. Check the local connection.");
      const entries = findEntryCandidates(scene);
      if (!entries.length) throw new Error("No clear entry point. Adjust the scene in regular mode first.");
      pending = { revision, deadline: now + delayMs };
      return entries;
    },
    tick({ now, revision, tracked = true }) {
      if (!pending) return { status: "idle" };
      if (revision !== pending.revision) {
        pending = null;
        return { status: "changed" };
      }
      if (!tracked) {
        pending.deadline = now + delayMs;
        return { status: "tracking", seconds: Math.ceil(delayMs / 1e3) };
      }
      const remaining = pending.deadline - now;
      if (remaining <= 0) {
        pending = null;
        return { status: "ready" };
      }
      return { status: "countdown", seconds: Math.ceil(remaining / 1e3) };
    },
    cancel() {
      pending = null;
    }
  };
}
export {
  createDemoEntry
};
