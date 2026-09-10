import {localizedReply} from "../shared/language.mjs";
import { agentPrompt } from "./registry.mjs";
import { agentProvider, modelMetadata } from "./models.mjs";
import { applyCinema } from "../shared/cinema.mjs";
import { floorTriggerRegion } from "../shared/track-triggers.mjs";
const nullable = (type) => ({ type: [type, "null"] });
const number = nullable("number");
const string = nullable("string");
const properties = { action: { type: "string", enum: ["none", "preview", "next", "previous", "close", "play", "pause", "create", "update", "remove", "straight", "smooth", "editCurve", "detach", "regionTrigger", "clearTrigger"] }, reply: { type: "string" }, targetId: string, kind: { type: ["string", "null"], enum: ["camera", "spot", "point", "box", null] }, name: string, position: { anyOf: [{ type: "array", items: { type: "number" }, minItems: 3, maxItems: 3 }, { type: "null" }] }, fov: number, lightType: { type: ["string", "null"], enum: ["point", "spot", null] }, intensity: number, range: number, angle: number, color: string, curveId: string, duration: number, delay: number, fadeOut: number, orientation: { type: ["string", "null"], enum: ["fixed", "target", "tangent", null] }, targetAimId: string, regionCurveId: string, regionId: string, dwellSeconds: number };
const cameraCommandSchema = { type: "object", additionalProperties: false, properties, required: Object.keys(properties) };
const readActions = /* @__PURE__ */ new Set(["none", "preview", "next", "previous", "close", "play", "pause"]);
function compileCameraCommand(result, { scene, mode, ids = [], curveId, spawn, id }) {
  const chinese = /\p{Script=Han}/u.test(result?.reply || "");
  if (!result || !properties.action.enum.includes(result.action) || typeof result.reply !== "string" || result.reply.length > 2e3) throw Error("Invalid Camera Agent response");
  if (mode === "explore" && !readActions.has(result.action)) return { reply: chinese ? localizedReply("editRequired", "zh", []) : "Enter Edit mode before changing cameras or lights.", action: "none" };
  const target = result.targetId || ids[0];
  if (readActions.has(result.action)) return { reply: result.reply, action: result.action, id: result.targetId || (result.action === "preview" ? scene.objects.find((o) => o.kind === "camera" && ids.includes(o.id))?.id : null) || null };
  if (result.action === "editCurve") return { reply: result.reply, action: "editCurve", id: result.curveId || curveId };
  const values = {};
  for (const key of ["position", "fov", "lightType", "intensity", "range", "angle", "color", "curveId", "duration", "delay", "fadeOut", "orientation"]) if (result[key] !== null && result[key] !== void 0) values[key] = result[key];
  if (result.targetAimId) {
    values.targetId = result.targetAimId;
    values.orientation = "target";
  }
  let command;
  if (result.action === "regionTrigger") command = { op: "regionTrigger", id: target, regionCurveId: result.regionCurveId || (!result.regionId ? curveId : null), regionId: result.regionId, seconds: result.dwellSeconds ?? 5, trackCurveId: result.curveId, values: Object.fromEntries(Object.entries(values).filter(([k]) => k !== "curveId")) };
  else if (result.action === "clearTrigger") command = { op: "clearTrigger", id: target };
  else if (result.action === "create") command = { op: "create", id, kind: result.kind, position: result.position || spawn || [0, 0, 0], name: result.name, values };
  else if (["straight", "smooth"].includes(result.action)) command = { op: "curve", id: result.curveId || curveId, straight: result.action === "straight", smooth: true };
  else if (result.action === "remove") command = { op: "remove", id: target };
  else {
    if (result.action === "detach") values.curveId = null;
    if (!Object.keys(values).length) return { reply: result.reply || "Describe what you would like to adjust.", action: "none" };
    command = { op: "update", id: target, values };
  }
  const preview = applyCinema(scene, command);
  const repaired = preview.triggerRegions?.find((r) => r.id === preview.objects.find((o) => o.id === target)?.track?.trigger?.regionId)?.closureRepair;
  const reply = command.op === "regionTrigger" ? chinese ? localizedReply("dwellTrackPreview", "zh", [preview.objects.find((o) => o.id === target).name, command.seconds, repaired ? localizedReply("closureRepaired", "zh", []) : ""]) : `${preview.objects.find((o) => o.id === target).name}: enter the floor region and dwell for ${command.seconds} seconds to follow the saved path. Leaving resets the timer; once per rehearsal. ${repaired ? "The closing overshoot was repaired; review the highlighted region. " : ""}A Save, B Discard.` : result.reply;
  return { reply, action: "edit", command };
}
async function runCameraAgent({ input, scene, mode, config, folder, signal, requestJson, id }) {
  const role = ["lighting", "object-motion"].includes(input.specialist) ? input.specialist : "camera", provider = agentProvider(config, role);
  const context = { request: input.prompt, mode, selectedIds: input.ids || [], selectedCurveId: input.curveId || null, triggerRegions: scene.triggerRegions || [], spawn: input.spawn, objects: scene.objects.map((o) => ({ id: o.id, name: o.name, kind: o.kind || "object", position: o.position, camera: o.camera, light: o.light, track: o.track, aimTargetId: o.aimTargetId })), actors: (scene.actors || []).map((a) => ({ id: a.id, name: a.name, position: a.position })), curves: (scene.curves || []).map((c, i) => ({ id: c.id, name: `Curve ${i + 1}`, mode: c.mode, points: c.points.length })) };
  context.curves = context.curves.map((c) => {
    const p = scene.curves.find((v) => v.id === c.id).points;
    let region = null, regionError = null;
    if (c.mode === "floor2d") try {
      region = floorTriggerRegion(scene.curves.find((v) => v.id === c.id));
    } catch (e) {
      regionError = e.message;
    }
    return { ...c, closedFloorRegion: !!region, closureRepair: region?.closureRepair || null, regionError, start: p[0], end: p.at(-1), length: p.slice(1).reduce((sum, v, i) => sum + Math.hypot(...v.map((x, j) => x - p[i][j])), 0) };
  });
  const start = Date.now(), result = await requestJson(provider, { schema: cameraCommandSchema, prompt: agentPrompt(role, context), folder, signal });
  signal.throwIfAborted();
  return { ...compileCameraCommand(result, { scene, mode, ids: input.ids, curveId: input.curveId, spawn: input.spawn, id }), trace: { agentId: role, ...modelMetadata(provider), durationMs: Date.now() - start } };
}
export {
  cameraCommandSchema,
  compileCameraCommand,
  runCameraAgent
};
