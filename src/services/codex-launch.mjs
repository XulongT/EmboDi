import { statSync } from "node:fs";
import path from "node:path";
const isFile = (file) => {
  try {
    return statSync(file).isFile();
  } catch {
    return false;
  }
};
function codexLaunch(executable, { platform = process.platform, paths = path, fileExists = isFile, nodePath = process.execPath } = {}) {
  let file = paths.resolve(executable);
  if (platform === "win32" && /\.(cmd|bat)$/i.test(file)) {
    const parent = paths.dirname(file);
    const candidates = [
      paths.join(parent, "codex.exe"),
      paths.join(parent, "node_modules", "@openai", "codex", "bin", "codex.js"),
      paths.join(parent, "..", "@openai", "codex", "bin", "codex.js")
    ];
    file = candidates.find(fileExists);
    if (!file) throw Error("Cannot resolve this Windows Codex wrapper. Set EMBODI_CODEX to codex.exe or the installed @openai/codex/bin/codex.js entry.");
  }
  if (!fileExists(file)) throw Error("Codex executable not found. Install Codex or set EMBODI_CODEX to its executable.");
  return /\.(mjs|cjs|js)$/i.test(file) ? { file: nodePath, args: [file] } : { file, args: [] };
}
function codexAvailable(executable) {
  try {
    codexLaunch(executable);
    return true;
  } catch {
    return false;
  }
}
export {
  codexAvailable,
  codexLaunch
};
