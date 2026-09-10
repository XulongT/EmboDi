import { existsSync } from "node:fs";
import { join, delimiter } from "node:path";
function findExecutable(name) {
  for (const path of (process.env.PATH || "").split(delimiter)) {
    if (!path) continue;
    for (const ext of process.platform === "win32" ? [".exe", ".cmd", ""] : [""]) {
      const candidate = join(path, name + ext);
      if (existsSync(candidate)) return candidate;
    }
  }
  return null;
}
export {
  findExecutable
};
