import { readFile, writeFile, appendFile, mkdir, rename, chmod } from "node:fs/promises";
import { join, resolve } from "node:path";
import { randomUUID } from "node:crypto";
const defaults = {
  speech: { provider: "openai", baseUrl: "https://api.openai.com/v1", model: "gpt-4o-mini-transcribe", language: "auto", apiKey: "" },
  voice: { provider: "browser", baseUrl: "https://api.openai.com/v1", model: "gpt-4o-mini-tts", voice: "alloy", language: "zh-CN", apiKey: "" },
  analysis: { provider: "codex", baseUrl: "https://api.openai.com/v1", model: "", apiKey: "" },
  construction: { provider: "codex", baseUrl: "https://api.openai.com/v1", model: "", apiKey: "" },
  images: { provider: "disabled", baseUrl: "https://api.openai.com/v1", model: "", apiKey: "" }
};
const providers = { speech: ["openai", "openai-compatible"], voice: ["browser", "openai", "openai-compatible", "off"], analysis: ["codex", "openai-compatible"], construction: ["codex", "openai-compatible"], images: ["disabled", "openai-compatible"] };
function validateBaseUrl(value) {
  const url = new URL(value);
  const local = ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname);
  if (url.username || url.password || url.search || url.hash || !["https:", "http:"].includes(url.protocol) || url.protocol === "http:" && !local) throw new Error("API URLs must use HTTPS; localhost may use HTTP");
  return value.replace(/\/+$/, "");
}
function mergeConfig(current, changes) {
  const next = structuredClone(current);
  for (const [role, fields] of Object.entries(changes)) {
    if (!providers[role] || !fields || typeof fields !== "object") throw new Error("Unknown API setting");
    for (const key of ["provider", "baseUrl", "model", "language", ...role === "voice" ? ["voice"] : []]) if (key in fields) {
      if (typeof fields[key] !== "string" || fields[key].length > 500) throw new Error("Invalid API settings format");
      next[role][key] = fields[key].trim();
    }
    if (!providers[role].includes(next[role].provider)) throw new Error("Selected protocol is not supported for this feature");
    next[role].baseUrl = validateBaseUrl(next[role].baseUrl);
    if (next[role].provider === "openai" && next[role].baseUrl !== "https://api.openai.com/v1") throw new Error("Choose Other compatible API to use a custom service URL.");
    if (["speech", "voice"].includes(role) && (next[role].provider !== current[role].provider || next[role].baseUrl !== current[role].baseUrl)) next[role].apiKey = "";
    if (fields.clearKey === true) next[role].apiKey = "";
    if (fields.apiKey) {
      if (typeof fields.apiKey !== "string" || fields.apiKey.length > 4096 || /[\r\n]/.test(fields.apiKey)) throw new Error("Invalid API key format");
      next[role].apiKey = fields.apiKey.trim();
    }
  }
  return next;
}
function publicConfig(config) {
  return Object.fromEntries(Object.entries(config).map(([role, { apiKey, ...fields }]) => [role, { ...fields, hasKey: !!apiKey }]));
}
async function createConfigStore(directory) {
  directory = resolve(directory);
  await mkdir(directory, { recursive: true });
  const path = join(directory, "providers.json");
  let config = structuredClone(defaults), busy = false;
  const ignore = join(directory, ".gitignore"), rules = "# EmboDi local credentials\n/providers.json\n/providers.json.*\n";
  let ignored = "";
  try {
    ignored = await readFile(ignore, "utf8");
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
  if (!ignored.endsWith(rules)) await appendFile(ignore, (ignored.endsWith("\n") || !ignored ? "" : "\n") + rules, { mode: 384 });
  const persist = async (next) => {
    const tmp = path + "." + randomUUID();
    await writeFile(tmp, JSON.stringify(next, null, 2), { mode: 384 });
    await chmod(tmp, 384);
    await rename(tmp, path);
  };
  try {
    const raw = await readFile(path, "utf8"), saved = JSON.parse(raw);
    let migrated = false;
    for (const role of ["speech", "voice"]) if (saved[role]?.provider === "deepgram" || role === "voice" && ["browser", "off"].includes(saved[role]?.provider) && /deepgram\.com/.test(saved[role]?.baseUrl || "")) {
      const provider = role === "voice" && saved[role].provider === "off" ? "off" : defaults[role].provider;
      saved[role] = { ...defaults[role], provider };
      migrated = true;
    }
    config = mergeConfig(config, saved);
    if (migrated) {
      await writeFile(path + ".before-openai-" + randomUUID(), raw, { mode: 384, flag: "wx" });
      await persist(config);
    }
  } catch (error) {
    if (error.code !== "ENOENT") throw new Error("Local API configuration is damaged. Check data/providers.json.");
  }
  return { get: () => structuredClone(config), public: () => publicConfig(config), async save(changes) {
    if (busy) throw new Error("Configuration is saving");
    busy = true;
    try {
      const next = mergeConfig(config, changes);
      await persist(next);
      config = next;
      return publicConfig(config);
    } finally {
      busy = false;
    }
  } };
}
export {
  createConfigStore,
  defaults,
  mergeConfig,
  publicConfig,
  validateBaseUrl
};
