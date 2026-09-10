import { send } from "../http.mjs";
async function handleSessionRequest(appRuntime, req, res, url, input, authoringScope) {
  if (url.pathname === "/api/authoring/session") {
    const session = appRuntime.authoringAccess.transition(input);
    for (const job of appRuntime.jobs.values()) if (job.authoringSession?.id === session.id && job.authoringSession.epoch !== session.epoch) {
      job.controller?.abort();
      job.status = "cancelled";
    }
    for (const [key, request] of appRuntime.cinemaRequests) if (key === session.id) {
      request.abort();
      appRuntime.cinemaRequests.delete(key);
    }
    return send(res, 200, session);
  }
}
export {
  handleSessionRequest
};
