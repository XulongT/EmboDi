import {languagePattern} from "./language.mjs";
function productionSpecialist(text, { scene, ids = [] }) {
  const selected = scene.objects.filter((o) => ids.includes(o.id));
  if (languagePattern("specialist.flow").test(text) || scene.floods?.some((f) => ids.includes(f.objectId || f.doorId)) && languagePattern("specialist.flowAdjustment").test(text)) return null;
  const path = languagePattern("specialist.path").test(text);
  if (languagePattern("specialist.camera").test(text)) return "camera";
  if (selected.some((o) => o.kind === "light") || languagePattern("specialist.lighting").test(text)) return "lighting";
  if (selected.some((o) => o.kind === "camera") || languagePattern("specialist.camera").test(text)) return "camera";
  if (selected.some((o) => o.track) && languagePattern("specialist.trigger").test(text)) return "object-motion";
  if (selected.length && (path || selected.some((o) => o.track) && languagePattern("specialist.motionAdjustment").test(text))) return "object-motion";
  if (languagePattern("specialist.objectEdit").test(text)) return "camera";
  return null;
}
export {
  productionSpecialist
};
