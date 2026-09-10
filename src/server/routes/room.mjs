import { send } from "../http.mjs";
import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { validateRoomMetrics } from "../../shared/room-spatial.mjs";
import { prepareRoomScene } from "../../shared/room.mjs";
async function handleRoomRequest(appRuntime, req, res, url, input, authoringScope) {
  if (url.pathname === "/api/capture/photos") return send(res, 201, await appRuntime.captureMedia.photo(input));
  if (url.pathname === "/api/demo-rebuild") {
    appRuntime.revisionCheck(input.revision);
    if (appRuntime.activeJob) throw Error("Finish the current request first");
    const refs = await appRuntime.captureMedia.photos(input.photoIds), entry = await appRuntime.storyboard.read("act-1");
    appRuntime.revisionCheck(input.revision);
    const result = structuredClone(entry.state.scene), job = { id: randomUUID(), kind: "generate", sceneKind: "scripted-rebuild", status: "ready", revision: appRuntime.state.revision, ids: [], result, capture: { inputOrigin: input.inputOrigin || "click", photoIds: refs.map((r) => r.id), outputSource: "predefined-act-1" } };
    await mkdir(join(appRuntime.data, "jobs", job.id), { recursive: true });
    await writeFile(join(appRuntime.data, "jobs", job.id, "capture.json"), JSON.stringify(job));
    appRuntime.jobs.set(job.id, job);
    while (appRuntime.jobs.size > 30) appRuntime.jobs.delete(appRuntime.jobs.keys().next().value);
    return send(res, 201, job);
  }
  if (url.pathname === "/api/room/prepare") {
    appRuntime.revisionCheck(input.revision);
    if (appRuntime.activeJob) throw new Error("Finish the current model request first");
    if (appRuntime.state.source !== "room-photos") throw new Error("Load a generated room first");
    const metrics = input.metrics ? validateRoomMetrics(input.metrics) : void 0;
    return send(res, 200, await appRuntime.commit(prepareRoomScene(appRuntime.state.scene, metrics), appRuntime.state.source));
  }
}
export {
  handleRoomRequest
};
