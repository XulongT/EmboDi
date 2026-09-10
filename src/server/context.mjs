import { resolve, join, dirname } from "node:path";
import { mkdir } from "node:fs/promises";
import { sceneFiles } from "../services/scene-files.mjs";
import { createTakeStore } from "../services/takes.mjs";
import { createStoryboardStore } from "../services/storyboard.mjs";
import { createConfigStore } from "../services/config.mjs";
import { loadActorCatalog } from "../services/actor-assets.mjs";
import { createAuthoringAccess } from "../shared/authoring-access.mjs";
import { randomUUID } from "node:crypto";
import { createCaptureMedia } from "../services/capture-media.mjs";
import { findExecutable } from "../services/executables.mjs";
import { createSceneStore } from "./scene-store.mjs";
import { createConversationStore } from "../services/conversations.mjs";
import { createImageLibrary } from "../services/image-library.mjs";
import { createJobRunner } from "./job-runner.mjs";
async function createContext(root) {
  const data = resolve(process.env.VRBUILD_DATA_DIR || join(root, "data"));
  await mkdir(data, { recursive: true });
  const sceneLocation = await sceneFiles(data);
  const takes = createTakeStore(join(data, "recordings"));
  const storyboard = createStoryboardStore(dirname(sceneLocation.file));
  const configStore = await createConfigStore(data);
  const actorCatalog = await loadActorCatalog(join(process.env.VRBUILD_ACTOR_DATA_DIR || data, "actor-assets"));
  const authoringAccess = createAuthoringAccess(randomUUID);
  const cinemaRequests = /* @__PURE__ */ new Map();
  const editEndpoints = /* @__PURE__ */ new Set(["/api/color", "/api/transform", "/api/actors", "/api/actor-style", "/api/curves", "/api/interaction-sketch", "/api/doors", "/api/door-performance", "/api/behaviors", "/api/jobs", "/api/apply-job", "/api/undo", "/api/reset", "/api/room/prepare", "/api/restore-checkpoint", "/api/storyboard/load", "/api/cinema/commit"]);
  const captureMedia = createCaptureMedia(join(data, "capture-media"));
  const jobs = /* @__PURE__ */ new Map();
  let activeJob = null;
  const codex = process.env.VRBUILD_CODEX || findExecutable("codex") || "codex";
  const sceneStore = await createSceneStore({ sceneLocation });
  const conversationStore = createConversationStore({ data });
  const imageLibrary = await createImageLibrary({ data, root });
  let questLink = null;
  const appRuntime = {
    get activeJob() {
      return activeJob;
    },
    set activeJob(value) {
      activeJob = value;
    },
    actorCatalog,
    authoringAccess,
    captureMedia,
    cinemaRequests,
    get clients() {
      return sceneStore.clients;
    },
    codex,
    get commit() {
      return sceneStore.commit;
    },
    configStore,
    conversation: conversationStore.conversation,
    data,
    editEndpoints,
    generatedLibrary: imageLibrary.generatedLibrary,
    get history() {
      return sceneStore.history;
    },
    jobs,
    library: imageLibrary.library,
    get questLink() {
      return questLink;
    },
    set questLink(value) {
      questLink = value;
    },
    referenceImage: imageLibrary.referenceImage,
    get revisionCheck() {
      return sceneStore.revisionCheck;
    },
    root,
    saveConversation: conversationStore.saveConversation,
    get saveCurrentScene() {
      return sceneStore.saveCurrentScene;
    },
    sceneLocation,
    get selectionCheck() {
      return sceneStore.selectionCheck;
    },
    get state() {
      return sceneStore.state;
    },
    storyboard,
    takes
  };
  appRuntime.runJob = createJobRunner(appRuntime);
  return appRuntime;
}
export {
  createContext
};
