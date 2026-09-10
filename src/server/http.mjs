function send(res, status, value) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" });
  res.end(JSON.stringify(value));
}
async function body(req) {
  if (!req.headers["content-type"]?.startsWith("application/json")) throw new Error("A JSON request is required");
  let chunks = [], bytes = 0;
  for await (const chunk of req) {
    bytes += chunk.length;
    if (bytes > 12 * 1024 * 1024) throw new Error("Request is too large");
    chunks.push(chunk);
  }
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}
export {
  body,
  send
};
