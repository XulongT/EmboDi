import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { scanContentAnchors } from "../shared/scan-structure.mjs";
import { validateContentAnchors } from "../shared/scan-furnishing.mjs";
async function resolveScanBlueprint(scene, sceneFolder) {
  if (scene.scanReconstruction?.blueprint) return structuredClone(scene.scanReconstruction.blueprint);
  let files;
  try {
    files = await readdir(join(sceneFolder, "scan-previews"));
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
    files = [];
  }
  for (const file of files.filter((f) => /^[a-f\d-]+\.json$/i.test(f)).sort()) {
    const saved = JSON.parse(await readFile(join(sceneFolder, "scan-previews", file), "utf8"));
    if (matchesScanGeometry(scene, saved.scene) && saved.survey?.planes && saved.alignment) return { planes: saved.survey.planes, alignment: saved.alignment, referenceFloor: saved.scene.objects.find((o) => o.id === "ground") };
  }
  throw new Error("Original scan for this scene was not found. Preview and apply the scan structure first.");
}
function matchesScanGeometry(scene, saved) {
  if (!saved?.objects?.length) return false;
  const current = new Map(scene.objects.map((o) => [o.id, o]));
  return saved.objects.every((a) => {
    const b = current.get(a.id);
    return b && JSON.stringify([a.shape, a.position, a.size, a.rotation]) === JSON.stringify([b.shape, b.position, b.size, b.rotation]);
  });
}
async function resolveScanContent(scene, sceneFolder) {
  if (!scene.scanStructure) throw new Error("Apply the scan structure before adding scanned objects");
  if (scene.scanStructure.contentAnchors) return validateContentAnchors(scene.scanStructure.contentAnchors);
  let files;
  try {
    files = await readdir(join(sceneFolder, "scan-previews"));
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
    files = [];
  }
  for (const file of files.filter((f) => /^[a-f\d-]+\.json$/i.test(f)).sort()) {
    const saved = JSON.parse(await readFile(join(sceneFolder, "scan-previews", file), "utf8"));
    if (matchesScanGeometry(scene, saved.scene) && saved.survey?.planes && saved.alignment) return validateContentAnchors(scanContentAnchors(saved.survey.planes, saved.alignment, scene));
  }
  throw new Error("Matching original scan was not found. Current scene is preserved. Preview the scan structure again.");
}
export {
  matchesScanGeometry,
  resolveScanBlueprint,
  resolveScanContent
};
