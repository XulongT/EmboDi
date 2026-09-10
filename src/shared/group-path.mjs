import { actorMotionId } from "./actors.mjs";
import { floorAt } from "./cast-layout.mjs";
import { pathLength } from "./draft.mjs";
const point = (p) => Array.isArray(p) && p.length === 3 && p.every((n) => Number.isFinite(n) && Math.abs(n) <= 100);
const turn = (p, y) => [Math.cos(y) * p[0] + Math.sin(y) * p[2], p[1], -Math.sin(y) * p[0] + Math.cos(y) * p[2]];
const angle = (a) => Math.atan2(Math.sin(a), Math.cos(a));
const actorDesign = (actors) => actors.map((a) => ({ id: a.id, position: [...a.position], yaw: a.yaw, motionId: actorMotionId(a) }));
function makeGroupPath(scene, { actorIds, points, speed = 0.6, id }) {
  if (!Array.isArray(actorIds) || !actorIds.length || new Set(actorIds).size !== actorIds.length) throw Error("Select a group of actors");
  const actors = actorIds.map((id2) => scene.actors?.find((a) => a.id === id2));
  if (actors.some((a) => !a || !actorMotionId(a))) throw Error("Prepare motions for the selected actors first");
  if (!Array.isArray(points) || points.length < 2 || points.length > 512 || !points.every(point)) throw Error("Invalid path point");
  const lead = actors[0], rawPoints = structuredClone(points), clean = [];
  for (const p of points) {
    const y = floorAt(scene, p);
    if (!Number.isFinite(y) || Math.abs(p[1] - y) > 0.2 || Math.abs(y - lead.position[1]) > 0.2) throw Error("The path must stay on valid floor at one level");
    const q = [p[0], lead.position[1], p[2]];
    if (!clean.length || Math.hypot(q[0] - clean.at(-1)[0], q[2] - clean.at(-1)[2]) >= 0.025) clean.push(q);
  }
  if (clean.length < 2 || pathLength(clean) < 0.15 || pathLength(clean) > 30) throw Error("Draw a continuous path between 0.15 and 30 meters");
  if (Math.hypot(clean[0][0] - lead.position[0], clean[0][2] - lead.position[2]) > 0.025) clean.unshift([...lead.position]);
  else clean[0] = [...lead.position];
  if (pathLength(clean) > 35) throw Error("Path starts too far from the group. Start drawing near the actors.");
  const path = { id, groupId: "group-" + lead.id, actorIds: [...actorIds], rawPoints, points: clean, speed, initialYaw: lead.yaw, design: actorDesign(actors), offsets: actors.map((a) => ({ id: a.id, position: turn(a.position.map((v, i) => v - lead.position[i]), -lead.yaw), yaw: angle(a.yaw - lead.yaw) })), length: pathLength(clean) };
  validateGroupPath(path, scene);
  return path;
}
function validateGroupPath(p, scene) {
  if (!p || typeof p.id !== "string" || !/^path-[\w-]{1,90}$/.test(p.id) || typeof p.groupId !== "string" || !Number.isFinite(p.speed) || p.speed < 0.1 || p.speed > 2 || !Number.isFinite(p.initialYaw) || !Array.isArray(p.points) || p.points.length < 2 || p.points.length > 513 || !p.points.every(point) || !Array.isArray(p.rawPoints) || p.rawPoints.length > 512 || !p.rawPoints.every(point) || !Number.isFinite(p.length) || Math.abs(pathLength(p.points) - p.length) > 1e-3 || p.length < 0.15 || p.length > 35) throw Error("Invalid group path configuration");
  if (!Array.isArray(p.actorIds) || p.actorIds.length < 1 || p.actorIds.length > 5 || new Set(p.actorIds).size !== p.actorIds.length || p.actorIds.some((id) => !scene.actors?.some((a) => a.id === id && actorMotionId(a))) || !Array.isArray(p.offsets) || p.offsets.length !== p.actorIds.length || p.offsets.some((o, i) => o.id !== p.actorIds[i] || !point(o.position) || !Number.isFinite(o.yaw))) throw Error("Path references an invalid actor");
  if (!Array.isArray(p.design) || p.design.length !== p.actorIds.length || p.design.some((a, i) => a.id !== p.actorIds[i] || !point(a.position) || !Number.isFinite(a.yaw) || typeof a.motionId !== "string")) throw Error("Invalid initial path position");
}
function at(points, d) {
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1], b = points[i], length = Math.hypot(b[0] - a[0], b[2] - a[2]);
    if (d <= length || i === points.length - 1) {
      const t = Math.min(1, Math.max(0, d / Math.max(length, 1e-5)));
      return a.map((v, j) => v + (b[j] - v) * t);
    }
    d -= length;
  }
  return points[0];
}
function groupPathPose(path, time) {
  const distance = Math.min(path.length, Math.max(0, time) * path.speed), p = at(path.points, distance), a = at(path.points, Math.max(0, distance - 0.25)), b = at(path.points, Math.min(path.length, distance + 0.25));
  const target = Math.atan2(b[0] - a[0], b[2] - a[2]), blend = Math.min(1, distance / 0.5), yaw = path.initialYaw + angle(target - path.initialYaw) * blend;
  return { position: p, yaw, complete: distance >= path.length };
}
function pathFrames(path, frames, time, assets) {
  const pose = groupPathPose(path, time), byId = new Map(path.offsets.map((o) => [o.id, o])), elapsed = Math.min(time, path.length / path.speed);
  return frames.map((f) => {
    const offset = byId.get(f.id);
    if (!offset) return f;
    const duration = assets.get(actorMotionId(f))?.duration || 1;
    return { ...f, position: turn(offset.position, pose.yaw).map((v, i) => v + pose.position[i]), yaw: pose.yaw + offset.yaw, pose: "motion", preview: false, visible: true, clipTime: elapsed % duration, inPlace: true, motionOffset: [0, 0, 0] };
  });
}
export {
  actorDesign,
  groupPathPose,
  makeGroupPath,
  pathFrames,
  validateGroupPath
};
