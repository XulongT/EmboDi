import { findExecutable } from "./executables.mjs";
import { mkdir, readFile, rename, rm, open, stat, statfs } from "node:fs/promises";
import { join } from "node:path";
import { createHash, randomUUID } from "node:crypto";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { TAKE_LIMITS as L, validTakeId } from "../shared/take-limits.mjs";
import { validateScene } from "../shared/scene.mjs";
import { validateTakeTimeline } from "./recordings.mjs";
const run = promisify(execFile);
const hash = (bytes) => createHash("sha256").update(bytes).digest("hex");
async function atomic(path, bytes) {
  const tmp = path + "." + randomUUID() + ".tmp", file = await open(tmp, "wx", 384);
  try {
    await file.writeFile(bytes);
    await file.sync();
  } finally {
    await file.close();
  }
  await rename(tmp, path);
}
function unpack(bytes) {
  if (bytes.length < 4) throw Error("Invalid recording chunk");
  const size = bytes.readUInt32BE(0);
  if (size > L.headerBytes || size + 4 > bytes.length) throw Error("Invalid recording chunk header");
  const segment = JSON.parse(bytes.subarray(4, 4 + size).toString("utf8"));
  if (!Number.isFinite(segment.time) || segment.time < 0 || segment.time > L.seconds + 0.5 || !Array.isArray(segment.samples) || !Array.isArray(segment.events) || segment.samples.length > L.samples || segment.events.length > L.events) throw Error("Invalid recording chunk time");
  return { segment, video: bytes.subarray(4 + size) };
}
function createTakeStore(folder, { ffmpeg = process.env.VRBUILD_FFMPEG || (findExecutable("ffmpeg") || "ffmpeg"), ffprobe = process.env.VRBUILD_FFPROBE || (findExecutable("ffprobe") || "ffprobe") } = {}) {
  const root = join(folder, "takes"), locks = /* @__PURE__ */ new Map();
  const path = (id) => {
    if (!validTakeId(id)) throw Error("Invalid take ID");
    return join(root, id);
  };
  const read = (id) => readFile(join(path(id), "manifest.json"), "utf8").then(JSON.parse);
  async function locked(id, fn) {
    path(id);
    const prior = locks.get(id) || Promise.resolve(), task = prior.catch(() => {
    }).then(fn);
    locks.set(id, task);
    try {
      return await task;
    } finally {
      if (locks.get(id) === task) locks.delete(id);
    }
  }
  const save = (m) => atomic(join(path(m.id), "manifest.json"), JSON.stringify(m));
  const status = (m) => ({ id: m.id, status: m.status, nextSeq: m.chunks.length, bytes: m.bytes, lastTime: m.chunks.at(-1)?.time || 0, result: m.result || null });
  return {
    async create({ id, mime, initial }) {
      return locked(id, async () => {
        if (!["video/webm", "video/mp4"].includes(mime) || initial?.schema !== "vrbuild-take/1") throw Error("Invalid take configuration");
        validateScene(initial.initialScene);
        const source = JSON.stringify({ mime, initial }), fingerprint = hash(source);
        if (Buffer.byteLength(source) > L.headerBytes) throw Error("Initial take scene is too large");
        try {
          const existing = await read(id);
          if (existing.fingerprint !== fingerprint) throw Error("Take ID is already associated with different content");
          return status(existing);
        } catch (e) {
          if (e.code !== "ENOENT") throw e;
        }
        await mkdir(path(id), { recursive: true });
        const capacity = await statfs(root);
        if (capacity.bavail * capacity.bsize < L.totalBytes * 2) throw Error("Not enough disk space to start a three-minute recording");
        const m = { id, mime, initial, fingerprint, createdAt: (/* @__PURE__ */ new Date()).toISOString(), status: "recording", chunks: [], bytes: 0, videoBytes: 0, samples: 0, events: 0 };
        await save(m);
        return status(m);
      });
    },
    status: async (id) => status(await read(id)),
    async put(id, seq, req) {
      if (!Number.isSafeInteger(seq) || seq < 0 || seq >= L.chunks) throw Error("Invalid chunk sequence number");
      let size = 0;
      const buffers = [];
      for await (const b of req) {
        size += b.length;
        if (size > L.packetBytes) throw Error("Recording chunk is too large");
        buffers.push(b);
      }
      const bytes = Buffer.concat(buffers), sha256 = hash(bytes), { segment, video } = unpack(bytes);
      return locked(id, async () => {
        const m = await read(id), previous = m.chunks[seq];
        if (previous) {
          if (previous.sha256 !== sha256) throw Error("Conflicting content for the same chunk number");
          return { ...status(m), seq, sha256 };
        }
        if (m.status !== "recording" || seq !== m.chunks.length) throw Error("Chunk sequence is incomplete or the take has ended");
        if (segment.time < (m.chunks.at(-1)?.time || 0)) throw Error("Chunk timestamps are out of order");
        if (m.bytes + size > L.totalBytes || m.videoBytes + video.length > L.videoBytes || m.samples + segment.samples.length > L.samples || m.events + segment.events.length > L.events) throw Error("Recording exceeds the three-minute capacity limit");
        await atomic(join(path(id), `${seq}.part`), bytes);
        m.chunks.push({ seq, sha256, bytes: size, time: segment.time });
        m.bytes += size;
        m.videoBytes += video.length;
        m.samples += segment.samples.length;
        m.events += segment.events.length;
        await save(m);
        return { ...status(m), seq, sha256 };
      });
    },
    async finalize(id, input) {
      return locked(id, async () => {
        const m = await read(id), signature = hash(JSON.stringify(input));
        if (m.status === "saved") {
          if (signature !== m.finalSignature) throw Error("Take was already saved with different final parameters");
          return m.result;
        }
        const { lastSeq, duration, frames, reason = "user" } = input;
        if (!Number.isSafeInteger(lastSeq) || lastSeq < 0 || lastSeq !== m.chunks.length - 1 || !Number.isFinite(duration) || duration <= 0 || duration > L.seconds || !Number.isSafeInteger(frames) || frames < 1 || frames > L.samples || !["user", "limit", "interrupted", "storage-error"].includes(reason)) throw Error("Invalid take final parameters or chunk sequence");
        const dir = path(id), raw = join(dir, "input." + (m.mime === "video/mp4" ? "mp4" : "webm")), encoded = join(dir, "output.mp4");
        const timeline = { ...m.initial, samples: [], events: [], stopReason: reason }, file = await open(raw, "w", 384);
        try {
          for (const part of m.chunks) {
            const bytes = await readFile(join(dir, `${part.seq}.part`));
            if (hash(bytes) !== part.sha256) throw Error("Recording chunk integrity check failed");
            const { segment, video } = unpack(bytes);
            await file.writeFile(video);
            timeline.samples.push(...segment.samples);
            timeline.events.push(...segment.events);
          }
        } finally {
          await file.close();
        }
        validateTakeTimeline(timeline, duration);
        if (frames !== timeline.samples.length) throw Error("Recording frame count does not match the timeline");
        try {
          await rm(encoded, { force: true });
          await run(ffmpeg, ["-v", "error", "-nostdin", "-i", raw, "-an", "-vf", "setpts=PTS-STARTPTS,fps=30", "-t", String(L.seconds), "-c:v", "libx264", "-preset", "veryfast", "-crf", "20", "-pix_fmt", "yuv420p", "-movflags", "+faststart", encoded], { timeout: 18e4, maxBuffer: 1024 * 1024 });
          const inspect = async () => JSON.parse((await run(ffprobe, ["-v", "error", "-show_entries", "format=duration:stream=codec_type,width,height", "-of", "json", encoded], { timeout: 15e3 })).stdout);
          let probe = await inspect(), actual = Number(probe.format.duration);
          const video = probe.streams.find((s) => s.codec_type === "video"), sourceDuration = actual;
          if (video?.width !== L.width || video?.height !== L.height || !Number.isFinite(actual) || actual <= 0 || actual > L.seconds + 0.05 || Math.abs(actual - duration) > 2) throw Error("Video duration or dimensions do not match the recording data");
          const tailPaddingSeconds = Math.max(0, duration - actual);
          if (tailPaddingSeconds > 0) {
            await rm(encoded, { force: true });
            await run(ffmpeg, ["-v", "error", "-nostdin", "-i", raw, "-an", "-vf", "setpts=PTS-STARTPTS,fps=30,tpad=stop_mode=clone:stop_duration=2", "-t", String(duration), "-c:v", "libx264", "-preset", "veryfast", "-crf", "20", "-pix_fmt", "yuv420p", "-movflags", "+faststart", encoded], { timeout: 18e4, maxBuffer: 1024 * 1024 });
            probe = await inspect();
            actual = Number(probe.format.duration);
            if (!Number.isFinite(actual) || Math.abs(actual - duration) > 1 / L.fps + 0.01) throw Error("Invalid recording finalization duration");
          }
          validateTakeTimeline(timeline, actual);
          const result = { id, takeId: id, url: `/recordings/${id}.mp4`, timelineUrl: `/api/recordings/${id}/timeline`, createdAt: m.createdAt, mime: "video/mp4", bytes: (await stat(encoded)).size, width: L.width, height: L.height, duration: actual, frames, content: "virtual-only", normalizedFps: 30, stopReason: reason, captureDuration: duration, sourceDuration, tailPaddingSeconds };
          await atomic(join(folder, `${id}.timeline.json`), JSON.stringify({ ...timeline, recordingId: id, duration: actual, width: L.width, height: L.height, normalizedFps: 30 }));
          await rename(encoded, join(folder, `${id}.mp4`));
          await atomic(join(folder, `${id}.json`), JSON.stringify(result));
          m.status = "saved";
          m.result = result;
          m.finalSignature = signature;
          await save(m);
          await Promise.allSettled([rm(raw, { force: true }), ...m.chunks.map((part) => rm(join(dir, `${part.seq}.part`), { force: true }))]);
          return result;
        } catch (error) {
          throw Error("Take finalization failed. Chunks are retained for retry: " + (error.code || error.message));
        }
      });
    }
  };
}
export {
  createTakeStore
};
