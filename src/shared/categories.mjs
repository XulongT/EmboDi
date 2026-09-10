import {languagePattern} from "./language.mjs";
const ROOM_PALETTE = Object.freeze({ wall: "#DFE4EA", floor: "#A4B0BE", ceiling: "#F1F2F6", door: "#FFA502" });
const CATEGORIES = {
  structure: { label: "Structure", color: ROOM_PALETTE.wall },
  table: { label: "Tables", color: "#70A1FF" },
  seating: { label: "Seating", color: "#ECCC68" },
  storage: { label: "Storage", color: "#FF6B81" },
  equipment: { label: "Equipment", color: "#7BED9F" },
  other: { label: "Other", color: "#A4B0BE" }
};
const CATEGORY_IDS = Object.keys(CATEGORIES);
function categoryOf(object) {
  if (CATEGORY_IDS.includes(object.category)) return object.category;
  const group = object.group || "";
  const match = (text) => languagePattern("category.seating").test(text) ? "seating" : languagePattern("category.table").test(text) ? "table" : languagePattern("category.equipment").test(text) && !languagePattern("category.cabinet").test(text) ? "equipment" : languagePattern("category.storage").test(text) ? "storage" : languagePattern("category.structure").test(text) ? "structure" : languagePattern("category.workstation").test(text) ? "table" : null;
  return match(object.id) || match(object.name) || match(group) || "other";
}
function categoryInfo(object) {
  return CATEGORIES[categoryOf(object)];
}
function isCeiling(object) {
  return object.id === "ceiling" || object.group === "ceiling" || languagePattern("category.ceiling").test(object.name);
}
function roomSurfaceColor(object) {
  if (ROOM_PALETTE[object.role]) return ROOM_PALETTE[object.role];
  if (categoryOf(object) !== "structure") return null;
  if (isCeiling(object)) return ROOM_PALETTE.ceiling;
  if (object.id === "ground" || languagePattern("category.floor").test(`${object.id} ${object.name}`)) return ROOM_PALETTE.floor;
  if (object.group === "walls" || languagePattern("category.wall").test(`${object.id} ${object.name}`)) return ROOM_PALETTE.wall;
  return null;
}
const legacy = Object.freeze({ wall: "#8d939a", floor: "#5b626b", ceiling: "#a7adb3", door: "#dfad78", window: "#79b9ce", table: "#72abd5", seating: "#e8ad67", storage: "#ac93cd", equipment: "#78b5a0", other: "#c6bcac" });
function blockoutColor(object, scene) {
  if (object.colorSource === "custom" || object.texture || object.material || !scene?.scanReconstruction || object.editable !== true || object.roughness !== 0.95 || object.metalness !== 0) return object.color;
  const color = object.color?.toLowerCase();
  const generatedSurface = object.category === "structure" && (["ground", "ceiling"].includes(object.id) || /^rebuilt-(floor|ceiling|wall|door|window)-\d+$/.test(object.id));
  if (generatedSurface && legacy[object.role] === color) return ROOM_PALETTE[object.role] || CATEGORIES.structure.color;
  const generatedFurniture = object.role === "furniture" && object.scanAnchorId && object.id.startsWith("rebuilt-content-" + object.scanAnchorId + "-");
  if (generatedFurniture && legacy[object.category] === color) return CATEGORIES[object.category].color;
  if (object.role === "window" && object.category === "structure" && object.scanAnchorId && object.id === "rebuilt-content-" + object.scanAnchorId + "-surface" && color === legacy.window) return CATEGORIES.structure.color;
  return object.color;
}
export {
  CATEGORIES,
  CATEGORY_IDS,
  ROOM_PALETTE,
  blockoutColor,
  categoryInfo,
  categoryOf,
  isCeiling,
  roomSurfaceColor
};
