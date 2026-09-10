import { findExecutable } from "./executables.mjs";
import { spawn } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { codexLaunch } from "./codex-launch.mjs";
const MAX_REFERENCE_IMAGES = 6;
async function providerResponse(response, label) {
  if (!response.ok) throw new Error(`${label} request failed (HTTP ${response.status}). Check the key, model, quota, and URL.`);
  return response;
}
async function requestJson(config, { schema, prompt, folder, image, images, signal }, fetcher = fetch) {
  if (image && images) throw new Error("Provide one set of reference images");
  const references = images ?? (image ? [image] : []);
  if (!Array.isArray(references) || references.length > MAX_REFERENCE_IMAGES) throw new Error("A model request accepts up to 6 reference images. Room uploads must use the photo batching service.");
  if (config.provider === "codex") {
    folder = resolve(folder);
    await mkdir(folder, { recursive: true });
    const schemaPath = join(folder, "schema.json"), output = join(folder, "result.json");
    await writeFile(schemaPath, JSON.stringify(schema));
    const args = ["exec", "--ignore-user-config", "--skip-git-repo-check", "--ephemeral", "--sandbox", "read-only", "--color", "never", "--output-schema", schemaPath, "--output-last-message", output, "-C", folder];
    const model = config.model || process.env.VRBUILD_MODEL;
    if (model) args.push("--model", model);
    if (config.reasoningEffort) args.push("-c", `model_reasoning_effort="${config.reasoningEffort}"`);
    for (const [index, reference] of references.entries()) {
      const match = /^data:image\/(png|jpeg);base64,([A-Za-z0-9+/=]+)$/.exec(reference);
      if (!match) throw new Error("Invalid reference image");
      const p = join(folder, `reference-${index + 1}.${match[1] === "png" ? "png" : "jpg"}`);
      await writeFile(p, Buffer.from(match[2], "base64"), { mode: 384 });
      args.push("--image", p);
    }
    args.push("-");
    await new Promise((accept, reject) => {
      const launch = codexLaunch(process.env.VRBUILD_CODEX || findExecutable("codex") || "codex");
      const child = spawn(launch.file, [...launch.args, ...args], { cwd: folder, stdio: ["pipe", "ignore", "ignore"], signal, shell: false, windowsHide: true });
      const timer = setTimeout(() => {
        child.kill("SIGTERM");
        reject(new Error("Codex request exceeded five minutes"));
      }, 3e5);
      child.on("error", (e) => {
        clearTimeout(timer);
        reject(e);
      });
      child.on("exit", (code) => {
        clearTimeout(timer);
        code === 0 ? accept() : reject(new Error(`Codex did not complete (${code}). Check local sign-in and model availability.`));
      });
      child.stdin.on("error", () => {
      });
      child.stdin.end(prompt);
    });
    return JSON.parse(await readFile(output, "utf8"));
  }
  if (config.provider !== "openai-compatible" || !config.model || !config.apiKey) throw new Error("Configure this feature's API URL, model, and key first");
  const content = references.length ? [{ type: "text", text: prompt }, ...references.map((url) => ({ type: "image_url", image_url: { url } }))] : prompt;
  const response = await fetcher(`${config.baseUrl}/chat/completions`, { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${config.apiKey}` }, body: JSON.stringify({ model: config.model, ...config.reasoningEffort ? { reasoning_effort: config.reasoningEffort } : {}, messages: [{ role: "user", content }], response_format: { type: "json_schema", json_schema: { name: "vrbuild_result", strict: true, schema } } }), signal: signal ? AbortSignal.any([signal, AbortSignal.timeout(18e4)]) : AbortSignal.timeout(18e4), redirect: "error" });
  const result = await (await providerResponse(response, "Model API")).json();
  const text = result.choices?.[0]?.message?.content;
  if (typeof text !== "string") throw new Error("Model returned no JSON text. The endpoint must support Chat Completions and JSON Schema.");
  return JSON.parse(text);
}
async function transcribe(config, { audio, mime }, fetcher = fetch) {
  if (!["openai", "openai-compatible"].includes(config.provider)) throw new Error("Unsupported speech transcription protocol. Check API settings.");
  if (config.provider === "openai" && !config.apiKey) throw new Error("Add your OpenAI API key under Speech transcription in API settings.");
  if (!config.model?.trim()) throw new Error("Set a speech transcription model in API settings.");
  if (!/^audio\/(webm|ogg|mp4|wav|mpeg)(;.*)?$/.test(mime) || typeof audio !== "string" || !/^[A-Za-z0-9+/=]+$/.test(audio)) throw new Error("Invalid audio recording format");
  const bytes = Buffer.from(audio, "base64");
  if (bytes.length < 80 || bytes.length > 8 * 1024 * 1024) throw new Error("Audio recording is too short or too large");
  const suffix = "/audio/transcriptions", base = config.baseUrl.replace(/\/+$/, "");
  const url = new URL(base.endsWith(suffix) ? base : base + suffix);
  const options = { method: "POST", signal: AbortSignal.timeout(6e4), redirect: "error" };
  const body = new FormData(), type = mime.split(";")[0], extension = type === "audio/mpeg" ? "mp3" : type.slice(6);
  body.set("file", new Blob([bytes], { type: mime }), `recording.${extension}`);
  body.set("model", config.model);
  body.set("response_format", "json");
  const language = (config.language || "").trim().toLowerCase();
  if (language && language !== "auto") {
    if (config.model === "gpt-transcribe") body.append("languages[]", language);
    else body.set("language", language.split(/[-_]/)[0]);
  }
  options.headers = config.apiKey ? { Authorization: `Bearer ${config.apiKey}` } : {};
  options.body = body;
  const response = await providerResponse(await fetcher(url, options), "Speech transcription API");
  let result;
  try {
    result = await response.json();
  } catch {
    throw new Error("Speech transcription API must return JSON with the transcript.");
  }
  const text = result?.text;
  if (typeof text !== "string" || !text.trim()) throw new Error("No speech recognized. Try again.");
  return { text: text.trim() };
}
async function speak(config, text, fetcher = fetch) {
  if (!["openai", "openai-compatible"].includes(config.provider)) throw new Error("Choose an API service under Spoken replies to generate audio.");
  if (config.provider === "openai" && !config.apiKey) throw new Error("Add your OpenAI API key under Spoken replies in API settings.");
  if (!config.model?.trim() || !config.voice?.trim()) throw new Error("Set a speech model and voice ID under Spoken replies.");
  if (typeof text !== "string" || !text.trim() || text.length > 2e3) throw new Error("Spoken reply text is too long");
  const base = config.baseUrl.replace(/\/+$/, ""), url = base.endsWith("/audio/speech") ? base : base + "/audio/speech";
  const response = await fetcher(url, { method: "POST", headers: { "Content-Type": "application/json", ...config.apiKey ? { Authorization: `Bearer ${config.apiKey}` } : {} }, body: JSON.stringify({ model: config.model, input: text, voice: config.voice, response_format: "mp3" }), signal: AbortSignal.timeout(6e4), redirect: "error" });
  await providerResponse(response, "Speech output API");
  return { bytes: Buffer.from(await response.arrayBuffer()), mime: response.headers.get("content-type") || "audio/mpeg" };
}
async function generateImage(config, prompt, fetcher = fetch, signal) {
  if (config.provider === "disabled" || !config.apiKey || !config.model) throw new Error("Configure the image API, model, and key first");
  const response = await fetcher(`${config.baseUrl}/images/generations`, { method: "POST", headers: { Authorization: `Bearer ${config.apiKey}`, "Content-Type": "application/json" }, body: JSON.stringify({ model: config.model, prompt, size: "1024x1024", n: 1 }), signal: signal ? AbortSignal.any([signal, AbortSignal.timeout(18e4)]) : AbortSignal.timeout(18e4), redirect: "error" });
  const result = await (await providerResponse(response, "Image generation")).json();
  const base64 = result.data?.[0]?.b64_json;
  if (typeof base64 !== "string" || base64.length > 28 * 1024 * 1024 || !/^[A-Za-z0-9+/=]+$/.test(base64)) throw new Error("Image endpoint must return data[0].b64_json (PNG/JPEG). URL-only output is not supported.");
  const bytes = Buffer.from(base64, "base64"), png = bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])), jpeg = bytes[0] === 255 && bytes[1] === 216;
  if (!png && !jpeg) throw new Error("Image API returned no valid PNG/JPEG");
  return { bytes, ext: png ? "png" : "jpg", mime: png ? "image/png" : "image/jpeg" };
}
export {
  MAX_REFERENCE_IMAGES,
  generateImage,
  requestJson,
  speak,
  transcribe
};
