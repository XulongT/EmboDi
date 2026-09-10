import { send } from "../http.mjs";
import { configuredAgentCatalog } from "../../agents/models.mjs";
import { BUILD } from "../../shared/workflow.mjs";
import { codexAvailable } from "../../services/codex-launch.mjs";
async function handleReadRequest(appRuntime, req, res, url) {
  if (req.method === "GET" && url.pathname === "/api/state") return send(res, 200, appRuntime.state);
  if (req.method === "GET" && url.pathname === "/api/agents") return send(res, 200, configuredAgentCatalog(appRuntime.configStore.get()));
  if (req.method === "GET" && url.pathname === "/api/health") return send(res, 200, { ok: true, edition: process.env.VRBUILD_EDITION || "legacy", version: BUILD, sceneId: appRuntime.sceneLocation.id, codexAvailable: codexAvailable(appRuntime.codex), revision: appRuntime.state.revision, connectedClients: appRuntime.clients.size, activeJob: appRuntime.activeJob || null, questLibrary: appRuntime.questLink?.snapshot() || null });
  if (req.method === "GET" && url.pathname === "/api/config") return send(res, 200, appRuntime.configStore.public());
  if (req.method === "GET" && url.pathname === "/api/library") return send(res, 200, [...appRuntime.library, ...appRuntime.generatedLibrary].map(({ file, ...item }) => item));
  if (req.method === "GET" && url.pathname === "/api/conversation") return send(res, 200, await appRuntime.conversation(url.searchParams.get("id")));
  if (req.method === "GET" && url.pathname === "/api/events") {
    res.writeHead(200, { "Content-Type": "text/event-stream", "Cache-Control": "no-cache", "Connection": "keep-alive" });
    appRuntime.clients.add(res);
    res.write(`data: ${JSON.stringify(appRuntime.state)}

`);
    const interval = setInterval(() => res.write(": keepalive\n\n"), 2e4);
    req.on("close", () => {
      clearInterval(interval);
      appRuntime.clients.delete(res);
    });
    return;
  }
  if (req.method === "GET" && url.pathname.startsWith("/api/jobs/")) {
    const job = appRuntime.jobs.get(url.pathname.split("/").pop());
    if (!job) return send(res, 404, { error: "Job not found" });
    const { baseScene, controller, ...visible } = job;
    return send(res, 200, visible);
  }
}
export {
  handleReadRequest
};
