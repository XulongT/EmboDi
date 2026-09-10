import { findExecutable } from "./executables.mjs";
import { TAKE_LIMITS } from "../shared/take-limits.mjs";
import { mkdir, writeFile, readFile, readdir, rm, rename, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { join } from "node:path";
import { randomUUID } from "node:crypto";
import { validateScene } from "../shared/scene.mjs";
import { validateActors } from "../shared/actors.mjs";
import { validateHandsMetadata, validateHandsSample } from "../shared/hand-frame.mjs";
const validId = (id) => /^[a-f0-9-]{36}$/.test(id);
const run = promisify(execFile);
async function saveRecording(folder, req, params) {
  const mime = req.headers["content-type"]?.split(";")[0];
  if (!["video/webm", "video/mp4"].includes(mime)) throw new Error("Only WebM and MP4 videos are accepted");
  const width = Number(params.get("width")), height = Number(params.get("height")), duration = Number(params.get("duration")), frames = Number(params.get("frames"));
  if (width !== 1280 || height !== 720 || !Number.isFinite(duration) || duration <= 0 || duration > TAKE_LIMITS.seconds || !Number.isInteger(frames) || frames < 1 || frames > 1e4) throw new Error("Invalid video parameters");
  const chunks = [];
  let size = 0;
  for await (const chunk of req) {
    size += chunk.length;
    if (size > TAKE_LIMITS.videoBytes) throw new Error("Video exceeds 96 MB");
    chunks.push(chunk);
  }
  const bytes = Buffer.concat(chunks);
  if (mime === "video/webm" ? bytes.length < 4 || bytes.readUInt32BE(0) !== 440786851 : bytes.length < 12 || bytes.toString("ascii", 4, 8) !== "ftyp") throw new Error("Invalid video file format");
  const id = randomUUID(), ext = mime === "video/webm" ? "webm" : "mp4", ffmpeg = process.env.VRBUILD_FFMPEG ?? (findExecutable("ffmpeg") || "ffmpeg"), convert = existsSync(ffmpeg), file = `${id}.${convert ? "mp4" : ext}`, raw = join(folder, `.${id}.input.${ext}`), encoded = join(folder, `.${id}.encoded.mp4`);
  await mkdir(folder, { recursive: true });
  await writeFile(raw, bytes, { mode: 384, flag: "wx" });
  const entry = { id, url: `/recordings/${file}`, createdAt: (/* @__PURE__ */ new Date()).toISOString(), mime: convert ? "video/mp4" : mime, bytes: size, width, height, duration, frames, content: "virtual-only", normalizedFps: convert ? 30 : null };
  try {
    if (convert) {
      try {
        await run(ffmpeg, ["-v", "error", "-nostdin", "-i", raw, "-an", "-vf", "fps=30", "-c:v", "libx264", "-preset", "veryfast", "-crf", "20", "-pix_fmt", "yuv420p", "-movflags", "+faststart", encoded], { timeout: 18e4, maxBuffer: 1024 * 1024 });
      } catch {
        throw new Error("Video processing failed. Retry saving.");
      }
      await rename(encoded, join(folder, file));
      entry.bytes = (await stat(join(folder, file))).size;
    } else await rename(raw, join(folder, file));
    await writeFile(join(folder, `${id}.json`), JSON.stringify(entry, null, 2), { mode: 384, flag: "wx" });
  } catch (error) {
    await rm(join(folder, file), { force: true });
    throw error;
  } finally {
    await rm(raw, { force: true });
    await rm(encoded, { force: true });
  }
  return entry;
}
async function listRecordings(folder) {
  let names;
  try {
    names = await readdir(folder);
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
  const entries = [];
  for (const file of names.filter((f) => f.endsWith(".json") && validId(f.slice(0, -5)))) entries.push(JSON.parse(await readFile(join(folder, file), "utf8")));
  return entries.sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 20);
}
async function recordingFile(folder, name) {
  if (!/^[a-f0-9-]{36}\.(webm|mp4)$/.test(name)) throw new Error("Video not found");
  const id = name.split(".")[0], entry = JSON.parse(await readFile(join(folder, `${id}.json`), "utf8"));
  if (entry.url !== `/recordings/${name}`) throw new Error("Video not found");
  return { entry, bytes: await readFile(join(folder, name)) };
}
async function saveTakeTimeline(folder, id, take) {
  if (!validId(id)) throw new Error("Invalid recording ID");
  const entry = JSON.parse(await readFile(join(folder, `${id}.json`), "utf8"));
  validateTakeTimeline(take, entry.duration);
  const timeline = { ...take, recordingId: id, duration: entry.duration, width: entry.width, height: entry.height, normalizedFps: entry.normalizedFps };
  const tmp = join(folder, `.${id}.${randomUUID()}.tmp`);
  await writeFile(tmp, JSON.stringify(timeline), { mode: 384 });
  await rename(tmp, join(folder, `${id}.timeline.json`));
  const next = { ...entry, timelineUrl: `/api/recordings/${id}/timeline` }, metaTmp = join(folder, `.${id}.${randomUUID()}.tmp`);
  await writeFile(metaTmp, JSON.stringify(next, null, 2), { mode: 384 });
  await rename(metaTmp, join(folder, `${id}.json`));
  return next;
}
function validateTakeTimeline(take, duration) {
  const vector = (v, n) => Array.isArray(v) && v.length === n && v.every(Number.isFinite);
  const validTime = (t) => Number.isFinite(t) && t >= 0 && t <= duration + 0.5;
  if (take?.schema !== "vrbuild-take/1" || !vector(take.sceneMatrix, 16) || !Array.isArray(take.samples) || take.samples.length < 1 || take.samples.length > TAKE_LIMITS.samples || !Array.isArray(take.events) || take.events.length > TAKE_LIMITS.events) throw new Error("Invalid recording timing data");
  validateScene(take.initialScene);
  if (take.handsMetadata !== void 0) validateHandsMetadata(take.handsMetadata);
  if (take.initialHands !== void 0) {
    if (!take.handsMetadata) throw new Error("Hand model configuration is missing");
    validateHandsSample(take.initialHands, take.handsMetadata);
  }
  const objectIds = new Set(take.initialScene.objects.map((o) => o.id));
  for (const event of take.events) {
    if (!validTime(event.time) || typeof event.type !== "string" || event.type.length > 80) throw new Error("Invalid event time");
    if (event.type === "scene-update") {
      validateScene(event.scene);
      for (const o of event.scene.objects) objectIds.add(o.id);
    }
  }
  let previous = -1, previousHand = take.initialHands;
  for (const sample of take.samples) {
    if (sample.sceneMatrix !== void 0 && !vector(sample.sceneMatrix, 16)) throw new Error("Invalid scene transform sample");
    if (!validTime(sample.time) || sample.time < previous || !vector(sample.position, 3) || !vector(sample.quaternion, 4) || !vector(sample.projection, 16)) throw new Error("Invalid camera sample");
    if (sample.objectTransforms !== void 0) {
      const list = sample.objectTransforms;
      if (!Array.isArray(list) || list.length > 180 || new Set(list.map((o) => o.id)).size !== list.length || list.some((o) => !objectIds.has(o.id) || !vector(o.position, 3) || o.position.some((v) => Math.abs(v) > 100) || !Number.isFinite(o.rotation) || Math.abs(o.rotation) > Math.PI * 2 || o.quaternion !== void 0 && (!vector(o.quaternion, 4) || Math.abs(Math.hypot(...o.quaternion) - 1) > 0.01))) throw new Error("Invalid object transform sample");
    }
    if (sample.hands !== void 0) {
      if (!take.handsMetadata) throw new Error("Hand model configuration is missing");
      validateHandsSample(sample.hands, take.handsMetadata);
      if (previousHand && (sample.hands.sampleId < previousHand.sampleId || sample.hands.frameTimeMs < previousHand.frameTimeMs)) throw new Error("Hand sample timestamps are out of order");
      previousHand = sample.hands;
    }
    validateActors(sample.actors);
    for (const a of sample.actors) if (!Number.isFinite(a.clipTime) || a.clipTime < 0 || typeof a.visible !== "boolean") throw new Error("Invalid actor sample");
    previous = sample.time;
  }
  for (const event of take.events) {
    if (!validTime(event.time) || typeof event.type !== "string" || event.type.length > 80) throw new Error("Invalid event time");
    if (event.type === "scene-update") validateScene(event.scene);
  }
  return take;
}
async function readTakeTimeline(folder, id) {
  if (!validId(id)) throw new Error("Invalid recording ID");
  return JSON.parse(await readFile(join(folder, `${id}.timeline.json`), "utf8"));
}
export {
  listRecordings,
  readTakeTimeline,
  recordingFile,
  saveRecording,
  saveTakeTimeline,
  validateTakeTimeline
};
