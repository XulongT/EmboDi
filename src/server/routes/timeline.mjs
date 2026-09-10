import { send } from "../http.mjs";
import { saveTakeTimeline } from "../../services/recordings.mjs";
import { join } from "node:path";
async function handleTimelineRequest(appRuntime, req, res, url, input, authoringScope) {
  const timelineRoute = /^\/api\/recordings\/([a-f0-9-]{36})\/timeline$/.exec(url.pathname);
  if (timelineRoute) return send(res, 200, await saveTakeTimeline(join(appRuntime.data, "recordings"), timelineRoute[1], input));
}
export {
  handleTimelineRequest
};
