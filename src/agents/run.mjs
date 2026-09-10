import { motionPrompt } from "./motion.mjs";
import { join } from "node:path";
import { AGENTS, agentCatalog, agentPrompt } from "./registry.mjs";
import { agentProvider, modelMetadata } from "./models.mjs";
import { motionSchema, compileMotion } from "../shared/authoring-motion.mjs";
import { patchSchema, applyPatch } from "../shared/scene.mjs";
import { transformPlanSchema, resolveTransformPlan } from "../shared/transforms.mjs";
import { floodSchema, compileFlood } from "../shared/flood.mjs";
import { regionDescription, regionObjectId, isRegionObject, isSourceRegion } from "../shared/interaction-regions.mjs";
import { isDoor } from "../shared/doors.mjs";
import { recommendationSchema, recommendationResult } from "../shared/agent-suggestions.mjs";
const string = { type: "string" };
const object = (properties) => ({ type: "object", additionalProperties: false, properties, required: Object.keys(properties) });
const directorSchema = object({ route: { type: "string", enum: ["motion", "flood", "transform", "scene-edit", "recommendation", "reply", "clarify"] }, instruction: string, reply: string, needsSketch: { type: "boolean" }, transform: { anyOf: [transformPlanSchema, { type: "null" }] } });
const sketchSchema = object({ meaning: { type: "string", enum: ["path", "clarify"] }, instruction: string, reply: string });
function text(value, label, max = 4e3) {
  if (typeof value !== "string" || value.length > max) throw Error(`Invalid ${label}`);
  return value;
}
function reply(result) {
  if (!text(result?.reply, "Agent reply", 3e3).trim()) throw Error("Agent reply is empty");
  return result.reply;
}
function validateRoute(result) {
  if (!result || !directorSchema.properties.route.enum.includes(result.route) || typeof result.needsSketch !== "boolean") throw Error("Invalid Director Agent routing response");
  text(result.reply, "Director Agent reply", 3e3);
  text(result.instruction, "Subtask");
  if (["reply", "clarify", "transform"].includes(result.route)) reply(result);
  if (!["reply", "clarify"].includes(result.route) && !result.instruction.trim()) throw Error("Subtask instruction is empty");
  if (result.needsSketch && result.route !== "motion") throw Error("Sketch interpretation currently supports motion paths only");
  if (result.route !== "transform" && result.transform !== null) throw Error("Only transform requests may contain a transform");
  return result;
}
async function runAuthoringAgent({ input, scene, messages = [], config, folder, signal, requestJson, actorAssets = [], onStage = () => {
}, trace = [] }) {
  const actor = scene.actors?.find((a) => a.id === input.actorId), curve = scene.curves?.find((c) => c.id === input.curveId);
  const targets = input.targetIds || input.ids || [];
  const context = { request: input.prompt, baseRevision: input.revision, targetIds: targets, selectedObjectIds: input.ids, actor: actor ? { id: actor.id, name: actor.name } : null, curve: curve ? { id: curve.id, mode: curve.mode, start: curve.points[0], end: curve.points.at(-1), pointCount: curve.points.length } : null, spatialContext: input.spatialContext, recentConversation: messages.slice(-6), scene: { title: scene.title, objects: scene.objects.map((o) => ({ id: o.id, name: o.name, shape: o.shape, position: o.position, size: o.size })), actors: (scene.actors || []).map((a) => ({ id: a.id, name: a.name, position: a.position })) } };
  context.regions = (scene.regions || []).filter((r) => targets.includes(regionObjectId(r))).map((r) => regionDescription(scene, r));
  context.currentFlood = (scene.floods || []).filter((f) => targets.includes(regionObjectId(f)));
  const call = async (id, schema, prompt) => {
    signal.throwIfAborted();
    const provider = agentProvider(config, id), step = { agentId: id, name: AGENTS[id].name, ...modelMetadata(provider), status: "running", startedAt: (/* @__PURE__ */ new Date()).toISOString() }, start = Date.now();
    trace.push(step);
    onStage(id, trace);
    try {
      const result2 = await requestJson(provider, { schema, prompt, folder: join(folder, id), signal });
      signal.throwIfAborted();
      step.status = "complete";
      return result2;
    } catch (error) {
      step.status = signal.aborted ? "cancelled" : "error";
      throw error;
    } finally {
      step.durationMs = Date.now() - start;
    }
  };
  const route = validateRoute(await call("director", directorSchema, agentPrompt("director", { ...context, catalog: agentCatalog() })));
  const respond = (message) => ({ type: "reply", reply: message });
  if (["reply", "clarify"].includes(route.route)) return respond(route.reply);
  if (route.route === "recommendation") return recommendationResult(await call("recommendation", recommendationSchema, agentPrompt("recommendation", { ...context, instruction: route.instruction })));
  if (route.route === "scene-edit") {
    if (targets.some((id) => scene.actors?.some((a) => a.id === id))) return respond("Actor appearance and scene geometry are edited separately. Select only the scene objects to edit.");
    const patch = await call("scene-construction", patchSchema, agentPrompt("scene-construction", { request: input.prompt, instruction: route.instruction, allowedIds: input.ids, anchor: input.anchor, spatialContext: input.spatialContext, scene }));
    applyPatch(scene, patch, input.ids);
    return { type: "patch", patch, reply: patch.explanation || "Scene changes are ready. Review the preview before applying them." };
  }
  let instruction = route.instruction;
  if (route.route === "flood") {
    const owner = scene.objects.find((o) => o.id === targets[0]);
    if (targets.length !== 1 || !(isRegionObject(owner) || isDoor(owner))) return respond("Select one editable object, then draw its flow regions.");
    if (!context.regions.some((r) => r.surface === "floor") || !context.regions.some(isSourceRegion)) return respond("Use Interaction → Draw a path or region → Draw surface sources and trigger region. Save an object source and a separate floor dwell region first.");
    trace.push({ agentId: "interaction", name: AGENTS.interaction.name, status: "complete", implementation: "code-dispatch", operation: "flood", durationMs: 0 });
    onStage("interaction", trace);
    const result2 = await call("flood", floodSchema, agentPrompt("flood", { ...context, instruction }));
    const plan2 = compileFlood(result2, scene, targets[0]);
    return plan2 ? { type: "flood", plan: plan2, reply: result2.reply } : respond(result2.reply);
  }
  if (route.needsSketch) {
    if (!curve) return respond("Draw and save a curve, then select the curve to use.");
    const meaning = await call("sketch", sketchSchema, agentPrompt("sketch", { ...context, instruction }));
    reply(meaning);
    text(meaning.instruction, "Sketch interpretation");
    if (!["path", "clarify"].includes(meaning.meaning)) throw Error("Invalid Sketch Agent interpretation");
    if (meaning.meaning === "clarify") return respond(meaning.reply);
    if (!meaning.instruction.trim()) throw Error("Sketch Agent returned no path instruction");
    instruction = meaning.instruction;
  }
  trace.push({ agentId: "interaction", name: AGENTS.interaction.name, status: "complete", implementation: "code-dispatch", operation: route.route, durationMs: 0 });
  onStage("interaction", trace);
  if (route.route === "transform") {
    if (!targets.length) return respond("Select the objects to move or rotate first.");
    if (!input.spatialContext) throw Error("Spatial context is missing");
    return { type: "transform", transform: resolveTransformPlan(scene, targets, input.spatialContext, route.transform), reply: route.reply };
  }
  if (!actor || !targets.includes(actor.id)) return respond("Select one actor before describing a basic motion.");
  if (targets.some((id) => id !== actor.id)) return respond("Basic motion generation supports one selected actor at a time.");
  if (!actorAssets.some((a) => a.id === actor.assetId && a.kind === "vrbuild-humanoid24")) return respond("This actor has an unsupported skeleton. Select a loaded 24-joint mannequin.");
  const result = await call("motion", motionSchema, motionPrompt({ prompt: `${input.prompt}
Director task: ${instruction}`, actor, curve, messages }));
  reply(result);
  const plan = compileMotion(result, scene, actor.id, curve?.id);
  return plan ? { type: "motion", actorId: actor.id, plan, reply: result.reply, explanation: result.reply } : respond(result.reply);
}
export {
  directorSchema,
  runAuthoringAgent,
  validateRoute
};
