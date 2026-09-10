import { send, body } from "./http.mjs";
import { serveStatic } from "./static.mjs";
import { handleReadRequest } from "./routes/read.mjs";
import { handleMediaRequest } from "./routes/media.mjs";
import { handleSessionRequest } from "./routes/session.mjs";
import { handleCinemaRequest } from "./routes/cinema.mjs";
import { handleTimelineRequest } from "./routes/timeline.mjs";
import { handleSettingsRequest } from "./routes/settings.mjs";
import { handleSceneRequest } from "./routes/scene.mjs";
import { handleRoomRequest } from "./routes/room.mjs";
import { handleDialogueRequest } from "./routes/dialogue.mjs";
import { handleJobsRequest } from "./routes/jobs.mjs";
const readHandlers = [handleReadRequest, handleMediaRequest];
const editHandlers = [handleCinemaRequest, handleTimelineRequest, handleSettingsRequest, handleSceneRequest, handleRoomRequest, handleDialogueRequest, handleJobsRequest];
function createHandler(appRuntime) {
  return async (req, res) => {
    try {
      const host = req.headers.host || "";
      if (!/^(localhost|127\.0\.0\.1|\[::1\])(?::\d+)?$/.test(host)) return send(res, 403, { error: "Only loopback access is accepted; connect Quest through adb reverse" });
      const url = new URL(req.url, `http://${host}`);
      if (req.headers.origin && req.headers.origin !== url.origin) return send(res, 403, { error: "Cross-origin requests are not allowed" });
      for (const handle of readHandlers) {
        await handle(appRuntime, req, res, url);
        if (res.headersSent) return;
      }
      if (req.method === "POST" && url.pathname.startsWith("/api/")) {
        const input = await body(req);
        await handleSessionRequest(appRuntime, req, res, url, input);
        if (res.headersSent) return;
        const authoringScope = appRuntime.authoringAccess.check(input, appRuntime.editEndpoints.has(url.pathname));
        for (const handle of editHandlers) {
          await handle(appRuntime, req, res, url, input, authoringScope);
          if (res.headersSent) return;
        }
        return send(res, 404, { error: "Endpoint not found" });
      }
      await serveStatic(appRuntime, req, res, url);
    } catch (error) {
      send(res, error.code === "ENOENT" ? 404 : 400, { error: error.message });
    }
  };
}
export {
  createHandler
};
