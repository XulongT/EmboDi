import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { starterRoom } from "../shared/authoring.mjs";
import { validateScene } from "../shared/scene.mjs";
import { sceneFiles } from "./scene-files.mjs";
async function initializeAuthoringData(directory) {
  await mkdir(directory, { recursive: true });
  const location = await sceneFiles(directory);
  try {
    const state = JSON.parse(await readFile(location.file, "utf8"));
    validateScene(state.scene);
    return false;
  } catch (error) {
    if (error.code !== "ENOENT" || location.id) throw error;
  }
  const now = (/* @__PURE__ */ new Date()).toISOString(), scene = validateScene(starterRoom());
  await writeFile(join(directory, "scene.json"), JSON.stringify({ revision: 0, scene, source: "sample", example: "starter-room", updatedAt: now, savedAt: now, saveMode: "auto" }, null, 2), { flag: "wx", mode: 384 });
  return true;
}
export {
  initializeAuthoringData
};
