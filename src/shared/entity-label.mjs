import {entityAliases} from "./language.mjs";
const words = entityAliases;
const tokens = new RegExp(Object.keys(words).sort((a, b) => b.length - a.length).join("|"), "g");
const han = /\p{Script=Han}/u;
const kinds = { camera: "Camera", light: "Light", floor: "Floor", wall: "Wall", ceiling: "Ceiling", door: "Door", window: "Window", box: "Box", sphere: "Sphere", cylinder: "Cylinder", cone: "Cone" };
function entityLabel(entity) {
  if (!entity) return "";
  const text = String(entity.name || "").trim();
  if (text && !han.test(text)) return text;
  const translated = text.replace(tokens, (word) => " " + words[word] + " ").replace(/\s+/g, " ").trim();
  if (translated && !han.test(translated)) return translated;
  const kind = entity.assetId ? "Actor" : kinds[entity.kind] || kinds[entity.role] || { seating: "Seat", table: "Table", storage: "Storage", equipment: "Equipment" }[entity.category] || kinds[entity.shape] || "Object";
  const suffix = String(entity.id || "").replace(/[^a-zA-Z0-9_-]/g, "").split(/[-_]/).slice(-2).join(" ");
  return suffix ? `${kind} ${suffix}` : kind;
}
export {
  entityLabel
};
