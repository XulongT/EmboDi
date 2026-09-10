import { applyActorMotion } from "./authoring-motion.mjs";
import { applyPatch } from "./scene.mjs";
import { applyTransform } from "./transforms.mjs";
import { applyFlood } from "./flood.mjs";
function applyAgentResult(scene, result, ids) {
  if (result?.type === "flood") return applyFlood(scene, result, ids);
  if (result?.type === "motion") return applyActorMotion(scene, result);
  if (result?.type === "patch") return applyPatch(scene, result.patch, ids);
  if (result?.type === "transform") return applyTransform(scene, result.transform);
  throw Error("This Agent reply has no applicable scene changes");
}
export {
  applyAgentResult
};
