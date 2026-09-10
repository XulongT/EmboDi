import { seedScene, validateScene } from "../shared/scene.mjs";
import { readFile, writeFile, rename } from "node:fs/promises";
import { validateCapturePlan } from "../shared/capture-boundary.mjs";
import { withKnownAssemblies } from "../shared/transforms.mjs";
import { reconcileBehaviors } from "../shared/behaviors.mjs";
async function createSceneStore(appRuntime) {
  let state = { revision: 0, scene: seedScene(), source: "sample", updatedAt: (/* @__PURE__ */ new Date()).toISOString(), savedAt: null, saveMode: null };
  try {
    const saved = JSON.parse(await readFile(appRuntime.sceneLocation.file, "utf8"));
    validateScene(saved.scene);
    if (saved.capturePlan) validateCapturePlan(saved.capturePlan);
    state = { ...saved, savedAt: saved.savedAt || saved.updatedAt, saveMode: saved.saveMode || "auto" };
  } catch (error) {
    if (appRuntime.sceneLocation.id) throw error;
    if (error.code !== "ENOENT") console.warn("Saved scene invalid; using sample:", error.message);
  }
  const history = [];
  const clients = /* @__PURE__ */ new Set();
  const assembled = withKnownAssemblies(state.scene);
  if (JSON.stringify(assembled) !== JSON.stringify(state.scene)) {
    state = { ...state, scene: assembled, revision: state.revision + 1 };
    await persistScene(state);
  }
  let mutationBusy = false;
  const broadcast = () => {
    for (const res of clients) res.write(`data: ${JSON.stringify(state)}

`);
  };
  async function persistScene(next) {
    await writeFile(appRuntime.sceneLocation.temporary, JSON.stringify(next, null, 2));
    await rename(appRuntime.sceneLocation.temporary, appRuntime.sceneLocation.file);
  }
  async function commit(scene, source, recordHistory = true, metadata = state, beforePersist, productionReady = false) {
    if (mutationBusy) throw new Error("Scene is saving. Try again shortly.");
    mutationBusy = true;
    try {
      scene = reconcileBehaviors(scene);
      if ("productionReady" in scene) scene = { ...scene, productionReady };
      validateScene(scene);
      const now = (/* @__PURE__ */ new Date()).toISOString(), next = { ...metadata, revision: state.revision + 1, scene, source, updatedAt: now, savedAt: now, saveMode: "auto" };
      if (beforePersist) await beforePersist();
      await persistScene(next);
      if (recordHistory) {
        history.push(structuredClone(state));
        if (history.length > 30) history.shift();
      }
      state = next;
      broadcast();
      return state;
    } finally {
      mutationBusy = false;
    }
  }
  async function saveCurrentScene(revision) {
    revisionCheck(revision);
    if (mutationBusy) throw new Error("Scene is saving. Try again shortly.");
    mutationBusy = true;
    try {
      const next = { ...state, savedAt: (/* @__PURE__ */ new Date()).toISOString(), saveMode: "manual" };
      await persistScene(next);
      state = next;
      broadcast();
      return state;
    } finally {
      mutationBusy = false;
    }
  }
  function revisionCheck(revision) {
    if (revision !== state.revision) throw new Error("Scene changed. Retry using the current version.");
  }
  function selectionCheck(ids) {
    if (!Array.isArray(ids) || ids.length > 180 || ids.some((id) => typeof id !== "string" || !state.scene.objects.some((o) => o.id === id))) throw new Error("Selection contains an invalid object");
  }
  return { get state() {
    return state;
  }, get mutationBusy() {
    return mutationBusy;
  }, history, clients, broadcast, commit, saveCurrentScene, revisionCheck, selectionCheck };
}
export {
  createSceneStore
};
