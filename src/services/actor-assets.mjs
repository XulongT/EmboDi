import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";
import { createHash } from "node:crypto";
async function loadActorCatalog(directory) {
  const entries = /* @__PURE__ */ new Map();
  let names = [];
  try {
    names = await readdir(directory);
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
  for (const id of names) {
    if (!/^[a-zA-Z0-9_-]{1,80}$/.test(id)) continue;
    try {
      const asset = JSON.parse(await readFile(join(directory, id, "asset.json"), "utf8"));
      if (asset.id !== id || !["hymotion-wooden-52", "vrbuild-humanoid24"].includes(asset.kind)) continue;
      const files = {};
      for (const name of ["template.json", "motion.json"]) {
        const bytes = await readFile(join(directory, id, name));
        const expected = asset[name === "template.json" ? "templateHash" : "motionHash"];
        if (createHash("sha256").update(bytes).digest("hex") !== expected) throw new Error("Asset hash mismatch");
        files[name] = bytes;
      }
      entries.set(id, { asset, files });
    } catch (error) {
      console.warn(`Actor asset ${id} unavailable: ${error.message}`);
    }
  }
  return { list: () => [...entries.values()].map((e) => e.asset), file(id, name) {
    return entries.get(id)?.files[name] || null;
  }, has: (id) => entries.has(id) };
}
export {
  loadActorCatalog
};
