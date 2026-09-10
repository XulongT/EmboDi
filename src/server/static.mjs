import { send } from "./http.mjs";
import { join, resolve, sep, extname } from "node:path";
import { readFile } from "node:fs/promises";
async function serveStatic(appRuntime, req, res, url) {
  const types = { ".wav": "audio/wav", ".html": "text/html", ".js": "text/javascript", ".mjs": "text/javascript", ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg" };
  if (req.method !== "GET") return send(res, 405, { error: "Method not allowed" });
  let base = join(appRuntime.root, "public"), relative = url.pathname === "/" ? "index.html" : decodeURIComponent(url.pathname).slice(1);
  if (url.pathname.startsWith("/vendor/three/")) {
    base = join(appRuntime.root, "node_modules/three");
    relative = decodeURIComponent(url.pathname.slice("/vendor/three/".length));
  } else if (url.pathname.startsWith("/core/")) {
    base = join(appRuntime.root, "src/shared");
    relative = decodeURIComponent(url.pathname.slice("/core/".length));
  } else if (url.pathname.startsWith("/generated-images/")) {
    base = join(appRuntime.data, "images");
    relative = decodeURIComponent(url.pathname.slice("/generated-images/".length));
    if (!appRuntime.generatedLibrary.some((item) => item.file === relative)) return send(res, 404, { error: "Image not found" });
  }
  const path = resolve(base, relative);
  if (!path.startsWith(resolve(base) + sep)) return send(res, 403, { error: "Path not allowed" });
  const content = await readFile(path);
  res.writeHead(200, { "Content-Type": `${types[extname(path)] || "application/octet-stream"}; charset=utf-8`, "Cache-Control": "no-store" });
  res.end(content);
}
export {
  serveStatic
};
