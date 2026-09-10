import { readFile, mkdir, writeFile, rename } from "node:fs/promises";
import { join } from "node:path";
import { randomUUID } from "node:crypto";
function createConversationStore(appRuntime) {
  const conversations = /* @__PURE__ */ new Map();
  async function conversation(id) {
    if (typeof id !== "string" || !/^[a-zA-Z0-9_-]{8,80}$/.test(id)) throw new Error("Invalid conversation ID");
    if (conversations.has(id)) return conversations.get(id);
    let entry = { id, messages: [], preferences: [] };
    try {
      entry = JSON.parse(await readFile(join(appRuntime.data, "conversations", id + ".json"), "utf8"));
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
    }
    conversations.set(id, entry);
    return entry;
  }
  async function saveConversation(entry) {
    entry.messages = entry.messages.slice(-40);
    const dir = join(appRuntime.data, "conversations");
    await mkdir(dir, { recursive: true });
    const tmp = join(dir, entry.id + "." + randomUUID() + ".tmp");
    await writeFile(tmp, JSON.stringify(entry, null, 2), { mode: 384 });
    await rename(tmp, join(dir, entry.id + ".json"));
  }
  return { conversation, saveConversation };
}
export {
  createConversationStore
};
