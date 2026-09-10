import { findExecutable } from "./executables.mjs";
import { mkdir, readFile, writeFile, rename, statfs } from "node:fs/promises";
import { join } from "node:path";
import { randomUUID } from "node:crypto";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { validateRoomImages } from "../shared/room.mjs";
const exec = promisify(execFile);
const valid = (id) => /^[a-f0-9-]{36}$/.test(id);
function createCaptureMedia(folder, { ffprobe = findExecutable("ffprobe") || "ffprobe" } = {}) {
  async function atomic(file, bytes) {
    const tmp = file + ".tmp-" + randomUUID();
    await writeFile(tmp, bytes, { flag: "wx" });
    await rename(tmp, file);
  }
  async function ready() {
    await mkdir(folder, { recursive: true });
    const s = await statfs(folder);
    if (s.bavail * s.bsize < 128 * 1024 * 1024) throw Error("Not enough disk space. Capture media was not saved.");
  }
  async function metadata(id) {
    if (!valid(id)) throw Error("Invalid media ID");
    return JSON.parse(await readFile(join(folder, id + ".json"), "utf8"));
  }
  return {
    metadata,
    async photo({ image, capturedAt }) {
      validateRoomImages([image]);
      await ready();
      const id = randomUUID(), ext = image.startsWith("data:image/png") ? "png" : "jpg", bytes = Buffer.from(image.split(",")[1], "base64");
      await atomic(join(folder, id + "." + ext), bytes);
      const entry = { id, kind: "photo", file: id + "." + ext, mime: ext === "png" ? "image/png" : "image/jpeg", url: "/capture-media/" + id, capturedAt: typeof capturedAt === "string" ? capturedAt : (/* @__PURE__ */ new Date()).toISOString() };
      await atomic(join(folder, id + ".json"), JSON.stringify(entry));
      return entry;
    },
    async photos(ids) {
      if (!Array.isArray(ids) || ids.length < 4 || new Set(ids).size !== ids.length) throw Error("At least four different photos are required");
      const refs = [];
      for (const id of ids) {
        const m = await metadata(id);
        if (m.kind !== "photo") throw Error("Invalid photo reference");
        refs.push(m);
      }
      return refs;
    },
    async images(ids) {
      const refs = await this.photos(ids), images = [];
      for (const m of refs) images.push(`data:${m.mime};base64,${(await readFile(join(folder, m.file))).toString("base64")}`);
      return images;
    },
    async demonstration(req, { doorId, mime }) {
      if (!/^[\w-]{1,64}$/.test(doorId) || !["video/webm", "video/mp4"].includes(mime?.split(";")[0])) throw Error("Invalid demonstration target or video format");
      await ready();
      let size = 0;
      const chunks = [];
      for await (const chunk of req) {
        size += chunk.length;
        if (size > 32 * 1024 * 1024) throw Error("Demonstration exceeds 32 MB. Record a shorter clip.");
        chunks.push(chunk);
      }
      if (!size) throw Error("No demonstration video was recorded");
      const id = randomUUID(), ext = mime.startsWith("video/mp4") ? "mp4" : "webm", file = id + "." + ext;
      await atomic(join(folder, file), Buffer.concat(chunks));
      const { stdout } = await exec(ffprobe, ["-v", "error", "-show_streams", "-show_format", "-of", "json", join(folder, file)], { timeout: 2e4 });
      const probe = JSON.parse(stdout);
      if (!probe.streams.some((s) => s.codec_type === "video")) throw Error("The demonstration contains no valid video");
      const duration = Number(probe.format?.duration);
      if (Number.isFinite(duration) && duration > 31) throw Error("Demonstration clips must be at most 30 seconds");
      const entry = { id, kind: "demonstration", doorId, file, mime: mime.split(";")[0], url: "/capture-media/" + id, bytes: size, createdAt: (/* @__PURE__ */ new Date()).toISOString(), ...Number.isFinite(duration) ? { duration } : {} };
      await atomic(join(folder, id + ".json"), JSON.stringify(entry));
      return entry;
    },
    async file(id) {
      const m = await metadata(id);
      return { metadata: m, bytes: await readFile(join(folder, m.file)) };
    }
  };
}
export {
  createCaptureMedia
};
