import { readFile } from "node:fs/promises";
import { join } from "node:path";
async function sceneFiles(data) {
  let active;
  try {
    active = JSON.parse(await readFile(join(data, "active-scene.json"), "utf8"));
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
  if (active === void 0) return { id: null, file: join(data, "scene.json"), temporary: join(data, "scene.tmp") };
  if (!active || typeof active.id !== "string" || !/^[a-zA-Z0-9][a-zA-Z0-9_-]{0,79}$/.test(active.id)) throw new Error("Invalid current scene file configuration");
  const directory = join(data, "scenes", active.id);
  return { id: active.id, file: join(directory, "scene.json"), temporary: join(directory, "scene.tmp") };
}
export {
  sceneFiles
};
