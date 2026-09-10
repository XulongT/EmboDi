import { send } from "../http.mjs";
import { applyCinema } from "../../shared/cinema.mjs";
import { randomUUID } from "node:crypto";
import { runCameraAgent } from "../../agents/rig-runner.mjs";
import { join } from "node:path";
import { requestJson } from "../../services/providers.mjs";
async function handleCinemaRequest(appRuntime, req, res, url, input, authoringScope) {
  if (url.pathname === "/api/cinema/cancel") {
    if (!authoringScope) throw Error("The authoring session has expired");
    appRuntime.cinemaRequests.get(authoringScope.id)?.abort();
    return send(res, 200, { cancelled: true });
  }
  if (url.pathname === "/api/cinema/commit") {
    if (!authoringScope) throw Error("Start an edit session first");
    appRuntime.revisionCheck(input.revision);
    if (appRuntime.activeJob) throw Error("Finish or cancel the current Agent request first");
    return send(res, 200, await appRuntime.commit(applyCinema(appRuntime.state.scene, input.command), appRuntime.state.source, true, appRuntime.state, () => appRuntime.authoringAccess.check(input, true), input.command.op === "complete"));
  }
  if (url.pathname === "/api/cinema/agent") {
    if (!authoringScope) throw Error("Start an authoring session first");
    appRuntime.revisionCheck(input.revision);
    if (typeof input.prompt !== "string" || !input.prompt.trim() || input.prompt.length > 3e3) throw Error("Invalid voice request");
    if (appRuntime.cinemaRequests.size || appRuntime.activeJob) throw Error("Finish or cancel the current Agent request first");
    const controller = new AbortController(), id = randomUUID();
    appRuntime.cinemaRequests.set(authoringScope.id, controller);
    const timer = setTimeout(() => controller.abort(), 12e4);
    try {
      const result = await runCameraAgent({ input, scene: structuredClone(appRuntime.state.scene), mode: authoringScope.mode, config: appRuntime.configStore.get(), folder: join(appRuntime.data, "jobs", "camera-" + id), signal: controller.signal, requestJson, id: "rig-" + id });
      appRuntime.authoringAccess.check(input);
      appRuntime.revisionCheck(input.revision);
      return send(res, 200, result);
    } finally {
      clearTimeout(timer);
      if (appRuntime.cinemaRequests.get(authoringScope.id) === controller) appRuntime.cinemaRequests.delete(authoringScope.id);
    }
  }
}
export {
  handleCinemaRequest
};
