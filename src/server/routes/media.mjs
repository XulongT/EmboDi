import { body, send } from "../http.mjs";
import { listRecordings, readTakeTimeline, saveRecording, recordingFile } from "../../services/recordings.mjs";
import { join } from "node:path";
async function handleMediaRequest(appRuntime, req, res, url) {
  const takeRoute = /^\/api\/takes\/([a-f0-9-]{36})\/(status|finalize|chunks\/(\d+))$/.exec(url.pathname);
  if (req.method === "POST" && url.pathname === "/api/takes") {
    const input = await body(req), scope = appRuntime.authoringAccess.check(input);
    if (scope && (scope.mode !== "explore" || !appRuntime.state.scene.productionReady)) throw Error("Finish scene setup and return to Explore mode before recording");
    return send(res, 201, await appRuntime.takes.create(input));
  }
  if (takeRoute) {
    if (req.method === "GET" && takeRoute[2] === "status") return send(res, 200, await appRuntime.takes.status(takeRoute[1]));
    if (req.method === "PUT" && takeRoute[3] !== void 0) return send(res, 200, await appRuntime.takes.put(takeRoute[1], Number(takeRoute[3]), req));
    if (req.method === "POST" && takeRoute[2] === "finalize") return send(res, 200, await appRuntime.takes.finalize(takeRoute[1], await body(req)));
  }
  if (req.method === "GET" && url.pathname === "/api/recordings") return send(res, 200, await listRecordings(join(appRuntime.data, "recordings")));
  const timelineRoute = /^\/api\/recordings\/([a-f0-9-]{36})\/timeline$/.exec(url.pathname);
  if (req.method === "GET" && timelineRoute) return send(res, 200, await readTakeTimeline(join(appRuntime.data, "recordings"), timelineRoute[1]));
  if (req.method === "POST" && url.pathname === "/api/recordings") return send(res, 201, await saveRecording(join(appRuntime.data, "recordings"), req, url.searchParams));
  if (req.method === "GET" && url.pathname.startsWith("/recordings/")) {
    const { entry, bytes } = await recordingFile(join(appRuntime.data, "recordings"), url.pathname.slice("/recordings/".length));
    const range = req.headers.range;
    if (range) {
      const match = /^bytes=(\d+)-(\d*)$/.exec(range);
      if (!match) {
        res.writeHead(416, { "Content-Range": `bytes */${bytes.length}` });
        return res.end();
      }
      const start = Number(match[1]), end = Math.min(bytes.length - 1, match[2] ? Number(match[2]) : bytes.length - 1);
      if (start > end) {
        res.writeHead(416, { "Content-Range": `bytes */${bytes.length}` });
        return res.end();
      }
      res.writeHead(206, { "Content-Type": entry.mime, "Content-Range": `bytes ${start}-${end}/${bytes.length}`, "Accept-Ranges": "bytes", "Content-Length": end - start + 1 });
      return res.end(bytes.subarray(start, end + 1));
    }
    res.writeHead(200, { "Content-Type": entry.mime, "Content-Length": bytes.length, "Accept-Ranges": "bytes", "Cache-Control": "no-store" });
    return res.end(bytes);
  }
  if (req.method === "GET" && url.pathname === "/api/actor-assets") return send(res, 200, appRuntime.actorCatalog.list());
  if (req.method === "GET" && url.pathname.startsWith("/actor-assets/")) {
    const match = /^\/actor-assets\/([a-zA-Z0-9_-]+)\/(template\.json|motion\.json)$/.exec(url.pathname), bytes = match && appRuntime.actorCatalog.file(match[1], match[2]);
    if (!bytes) return send(res, 404, { error: "Actor asset not found" });
    res.writeHead(200, { "Content-Type": "application/json", "Cache-Control": "no-store" });
    return res.end(bytes);
  }
  if (req.method === "GET" && url.pathname.startsWith("/capture-media/")) {
    const entry = await appRuntime.captureMedia.file(url.pathname.slice("/capture-media/".length));
    res.writeHead(200, { "Content-Type": entry.metadata.mime, "Content-Length": entry.bytes.length, "Cache-Control": "no-store" });
    return res.end(entry.bytes);
  }
}
export {
  handleMediaRequest
};
