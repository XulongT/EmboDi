import {languagePattern} from "./language.mjs";
import { validateScene, sceneSchema, objectSchema } from "./scene.mjs";
import { CATEGORIES, CATEGORY_IDS, categoryOf, isCeiling, ROOM_PALETTE, roomSurfaceColor } from "./categories.mjs";
import { validateRoomMetrics } from "./room-spatial.mjs";
const roomSchema = { ...sceneSchema, properties: { ...sceneSchema.properties, objects: { type: "array", items: { ...objectSchema, properties: { ...objectSchema.properties, category: { type: "string", enum: CATEGORY_IDS } }, required: [...objectSchema.required, "category"] } } } };
const MAX_ROOM_PHOTOS = Infinity;
const MIN_ROOM_PHOTOS = 4;
const ROOM_PHOTO_BYTES = 1024 * 1024;
const ROOM_INTENT = "Build an editable, categorized room blockout from these photos. Preserve floors, walls, ceiling, doors, windows, and large furniture. Omit small tabletop objects and decoration; prioritize spatial relationships.";
const CAPTURE_TIPS = [
  "Shot 1: include corners, floor, and large furniture.",
  "Shot 2: move to another position, keeping some walls or furniture from the first view.",
  "Shot 3: cover another corner, doors, and windows. Include wall–floor boundaries.",
  "Shot 4: cover the remaining side. Hold still and avoid shooting into bright windows.",
  "Ready to build. Add more photos if needed."
];
function captureTip(count) {
  return CAPTURE_TIPS[Math.min(count, CAPTURE_TIPS.length - 1)];
}
function validateRoomImages(images) {
  if (!Array.isArray(images) || images.length < 1) throw new Error("Provide room photos. At least four are required before building.");
  for (const image of images) {
    if (typeof image !== "string" || image.length > Math.ceil(ROOM_PHOTO_BYTES / 3) * 4 + 40) throw new Error("Photo too large. Reduce it to under 1 MB.");
    const match = /^data:image\/(png|jpeg);base64,([A-Za-z0-9+/]+={0,2})$/.exec(image);
    if (!match) throw new Error("Room photos must be PNG or JPEG");
    let bytes;
    try {
      bytes = atob(match[2]);
    } catch {
      throw new Error("Invalid photo data");
    }
    if (bytes.length > ROOM_PHOTO_BYTES) throw new Error("Photo too large. Reduce it to under 1 MB.");
    const png = bytes.startsWith("PNG\r\n\n"), jpeg = bytes.charCodeAt(0) === 255 && bytes.charCodeAt(1) === 216;
    if (match[1] === "png" && !png || match[1] === "jpeg" && !jpeg) throw new Error("Photo content does not match its format");
  }
  return [...images];
}
function roomConstructionPrompt(count, intent, metrics, capturePlan) {
  return `Create ONE simple, editable, graybox indoor room from these ${count} real photographs. All images show different views of the SAME room; reconcile repeated objects rather than duplicating rooms or furniture. Aim for 8–30 objects, never more than 40. Prioritize the room footprint, wall positions, major door/window openings and large furniture silhouettes. Ignore cups, cables, keyboards, books, tabletop clutter, small decor and surface textures. Use boxes for almost everything. Use short English object names.
Floor must be a box with id='ground', top surface at y=0, centred at x=z=0 and yaw=0. Do not make a huge outdoor ground or village. Walls are separate thin boxes with group='walls'. Represent door openings with separate wall segments, not a solid wall across the opening. Keep at least one clear standing area inside the room. Use concise English object names and group labels regardless of the spoken language. A full ceiling is REQUIRED with id='ceiling', group='ceiling', above the walls, bottom surface at room height. Major furniture may use simple separate boxes. No people, plants or invented decorative objects. Every object needs category: structure (floor/walls/ceiling/columns), table, seating, storage, equipment, other. Keep assembly group IDs separate from category; monitors on desks are equipment, not tables. Use roughness=.95, metalness=0.
` + (metrics ? `Measured room envelope in metres: width X=${metrics.width}, depth Z=${metrics.depth}, floor-to-ceiling height=${metrics.height}, source=${metrics.source}. Fit the room and furniture within this envelope. These measurements constrain the envelope, NOT individual furniture positions or sizes.
` : "Room dimensions are estimated from uncalibrated images; do not claim a measured scale.\n") + (capturePlan?.closeUnscanned ? `This is a PARTIALLY surveyed elevator / corridor set, not a complete building. Reconstruct only the photographed part within the selected scan envelope. Preserve turns and internal walls visible in the photos; do not turn an L/T-shaped corridor into an empty rectangle. End unseen corridor continuations with simple editable virtual closure walls at the selected scan limits. Do not extend into unobserved rooms. Name any invented end wall 'Unscanned boundary wall' and use group='capture-boundary'. These are authored set boundaries, not measured real walls. The runtime will also close remaining gaps at the envelope perimeter.
` : "") + `Describe ambiguous or hidden geometry as assumptions in the description, following the language of the user request, not measured facts. Do not claim exact reconstruction. Keep the description short and actionable. Return only the requested scene JSON. User intent: ${intent}`;
}
function roomDimensions(scene) {
  if (scene.scanReconstruction) return validateRoomMetrics(scene.room);
  const floor = scene.objects.find((o) => o.id === "ground");
  if (!floor || floor.shape !== "box") throw new Error("The room has no flat floor");
  const bottom = floor.position[1] + floor.size[1] / 2, ceiling = scene.objects.find(isCeiling), walls = scene.objects.filter((o) => languagePattern("category.wall.caseSensitive").test(`${o.id} ${o.group} ${o.name}`));
  const height = ceiling ? ceiling.position[1] - ceiling.size[1] / 2 - bottom : Math.max(2.4, ...walls.map((o) => o.position[1] + o.size[1] / 2 - bottom));
  return { width: floor.size[0], depth: floor.size[2], height, source: scene.room?.source || "estimated" };
}
function fitRoomScene(scene, metrics) {
  if (scene.scanReconstruction) throw new Error("This scene uses scan coordinates. Edit individual objects or room alignment instead of remapping room dimensions.");
  metrics = validateRoomMetrics(metrics);
  const old = roomDimensions(scene), floor = scene.objects.find((o) => o.id === "ground"), floorY = floor.position[1] + floor.size[1] / 2;
  const sx = metrics.width / old.width, sy = metrics.height / old.height, sz = metrics.depth / old.depth, c = Math.cos(floor.rotation), s = Math.sin(floor.rotation);
  const objects = scene.objects.map((o) => {
    const dx = o.position[0] - floor.position[0], dz = o.position[2] - floor.position[2], theta = o.rotation - floor.rotation, ct = Math.cos(theta), st = Math.sin(theta);
    return { ...o, position: [(c * dx - s * dz) * sx, (o.position[1] - floorY) * sy, (s * dx + c * dz) * sz], size: [o.size[0] * Math.hypot(ct * sx, st * sz), o.size[1] * sy, o.size[2] * Math.hypot(st * sx, ct * sz)], rotation: Math.atan2(st * sz, ct * sx) };
  });
  return validateScene({ ...scene, room: metrics, objects });
}
function prepareRoomScene(scene, metrics) {
  validateScene(scene);
  if (scene.objects.filter((o) => o.group !== "capture-boundary").length > (scene.objects.some(isCeiling) ? 41 : 40)) throw new Error("Too many objects in the blockout. Retry with a simpler build.");
  const ground = scene.objects.find((o) => o.id === "ground");
  if (!ground || ground.shape !== "box") throw new Error("No flat, accessible floor found. Rebuild the room.");
  let next = structuredClone(scene);
  const dimensions = roomDimensions(next);
  if (!next.objects.some(isCeiling)) next.objects.push({ id: "ceiling", name: "Ceiling", group: "ceiling", category: "structure", shape: "box", position: [ground.position[0], ground.position[1] + ground.size[1] / 2 + dimensions.height + 0.06, ground.position[2]], size: [ground.size[0], 0.12, ground.size[2]], rotation: ground.rotation, color: ROOM_PALETTE.ceiling, roughness: 0.95, metalness: 0 });
  next.objects = next.objects.map((o) => {
    const category = categoryOf(o);
    return { ...o, category, color: scene.room && o.category ? o.color : roomSurfaceColor(o) || CATEGORIES[category].color, roughness: 0.95, metalness: 0 };
  });
  next.room = validateRoomMetrics({ ...dimensions, height: Math.min(8, Math.max(1.8, dimensions.height)) });
  if (metrics) next = fitRoomScene(next, metrics);
  return validateScene(next);
}
export {
  CAPTURE_TIPS,
  MAX_ROOM_PHOTOS,
  MIN_ROOM_PHOTOS,
  ROOM_INTENT,
  ROOM_PHOTO_BYTES,
  captureTip,
  fitRoomScene,
  prepareRoomScene,
  roomConstructionPrompt,
  roomDimensions,
  roomSchema,
  validateRoomImages
};
