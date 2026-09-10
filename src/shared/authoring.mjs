function isAuthoringMode(params) {
  return true;
}
function starterRoom() {
  const objects = [];
  const box = (id, name, role, position, size, color, extra = {}) => objects.push({ id, name, role: ["table", "seating", "storage"].includes(role) ? "furniture" : role, category: role === "door" ? "other" : ["table", "seating", "storage"].includes(role) ? role : "structure", group: role === "floor" || role === "wall" || role === "ceiling" ? "Room" : name, shape: "box", position, size, color, colorSource: "custom", rotation: 0, roughness: 0.85, metalness: 0, editable: true, ...extra });
  box("ground", "Floor", "floor", [0, -0.08, 0], [10, 0.16, 8], "#e8ebef");
  box("ceiling", "Ceiling", "ceiling", [0, 3.28, 0], [10, 0.16, 8], "#657080");
  box("wall-back", "Back wall", "wall", [0, 1.6, -4], [10, 3.2, 0.16], "#a3acb8");
  box("wall-left", "Left wall", "wall", [-5, 1.6, 0], [0.16, 3.2, 8], "#a3acb8");
  box("wall-right", "Right wall", "wall", [5, 1.6, 0], [0.16, 3.2, 8], "#a3acb8");
  box("wall-front-left", "Front wall · left", "wall", [-2.8, 1.6, 4], [4.4, 3.2, 0.16], "#a3acb8");
  box("wall-front-right", "Front wall · right", "wall", [2.8, 1.6, 4], [4.4, 3.2, 0.16], "#a3acb8");
  box("door-lintel", "Door lintel", "wall", [0, 2.75, 4], [1.2, 0.9, 0.16], "#a3acb8");
  box("door", "Studio door", "door", [0, 1.15, 4], [1.18, 2.3, 0.1], "#b39da8");
  box("table-top", "Worktable top", "table", [-2, 0.82, -1], [2.2, 0.12, 1.1], "#c9c3d1", { assemblyId: "worktable" });
  for (const [i, x, z] of [[1, -2.9, -1.4], [2, -1.1, -1.4], [3, -2.9, -0.6], [4, -1.1, -0.6]]) box("table-leg-" + i, "Worktable leg " + i, "table", [x, 0.38, z], [0.12, 0.76, 0.12], "#9295a4", { assemblyId: "worktable" });
  box("bench", "Bench", "seating", [2, 0.4, -2], [2, 0.8, 0.7], "#8aa8a1");
  box("cabinet", "Cabinet", "storage", [3.9, 1.1, -2.9], [1.2, 2.2, 0.8], "#bca5bd");
  return { title: "Studio · Sample room", description: "A designed sample room for scene editing, actor placement and camera rehearsal. This sample is not a room reconstruction.", room: { width: 10, depth: 8, height: 3.2, source: "manual" }, objects, actors: [] };
}
function authoringScene(source, assetIds = []) {
  throw Error("This operation is not available in this edition");
}
export {
  authoringScene,
  isAuthoringMode,
  starterRoom
};
