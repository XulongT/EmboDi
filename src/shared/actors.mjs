import {languagePattern, numberWords, termWords} from "./language.mjs";
import { validateMotionPlan } from "./authoring-motion.mjs";
import { CAST_SIZE, castSlots } from "./actor-slots.mjs";
import { clearEntityTargets } from "./entity-targets.mjs";
const finite = (x, min, max) => typeof x === "number" && Number.isFinite(x) && x >= min && x <= max;
const idOK = (id) => typeof id === "string" && /^[a-zA-Z0-9_-]{1,80}$/.test(id);
const MAX_ACTORS = 7;
const actorMotionId = (actor) => actor.motionId === void 0 ? actor.assetId : actor.motionId;
function validateActor(actor) {
  if (!actor || !idOK(actor.id) || !idOK(actor.assetId) || typeof actor.name !== "string" || !actor.name.trim() || actor.name.length > 80) throw new Error("Invalid actor identifier");
  if (!Array.isArray(actor.position) || actor.position.length !== 3 || !actor.position.every((x) => finite(x, -100, 100)) || !finite(actor.yaw, -Math.PI * 8, Math.PI * 8)) throw new Error("Invalid actor position or orientation");
  if (!finite(actor.delay, 0, 60) || actor.trigger !== "start" || !/^#[0-9a-fA-F]{6}$/.test(actor.color)) throw new Error("Invalid actor entry settings");
  if (actor.motionId !== void 0 && actor.motionId !== null && !idOK(actor.motionId)) throw new Error("Invalid actor motion identifier");
  if (actor.castSlot !== void 0 && (!Number.isInteger(actor.castSlot) || actor.castSlot < 1 || actor.castSlot > CAST_SIZE)) throw new Error("Invalid actor motion slot");
  if (actor.motionOffset !== void 0 && (!Array.isArray(actor.motionOffset) || actor.motionOffset.length !== 3 || !actor.motionOffset.every((x) => finite(x, -100, 100)))) throw new Error("Invalid motion transition offset");
  if (actor.motionPlan != null) validateMotionPlan(actor.motionPlan);
  return actor;
}
function validateActors(actors) {
  if (!Array.isArray(actors) || actors.length > MAX_ACTORS) throw new Error(`A maximum of ${MAX_ACTORS} actors is supported`);
  const ids = /* @__PURE__ */ new Set(), slots = /* @__PURE__ */ new Set();
  for (const actor of actors) {
    validateActor(actor);
    if (ids.has(actor.id)) throw new Error("Duplicate actor ID");
    ids.add(actor.id);
    if (actor.castSlot !== void 0) {
      if (slots.has(actor.castSlot)) throw new Error("Duplicate actor motion slot");
      slots.add(actor.castSlot);
    }
  }
  return actors;
}
function updateActors(scene, command, assetIds) {
  const previous = structuredClone(scene.actors || []), actors = previous.length <= CAST_SIZE ? castSlots(previous) : previous, allowed = new Set(assetIds);
  if (command.type === "create") {
    if (actors.length >= CAST_SIZE) throw new Error(`This demo supports up to ${CAST_SIZE} actors`);
    validateActor(command.actor);
    if (!allowed.has(command.actor.assetId) || actorMotionId(command.actor) && !allowed.has(actorMotionId(command.actor))) throw new Error("Motion assets are not ready");
    if (actors.some((a) => a.id === command.actor.id) || scene.objects.some((o) => o.id === command.actor.id)) throw new Error("Actor ID already exists");
    actors.push(command.actor);
  } else {
    const index = actors.findIndex((a) => a.id === command.id);
    if (index < 0) throw new Error("Select an actor first");
    if (command.type === "remove") actors.splice(index, 1);
    else if (command.type === "update") {
      const permitted = ["position", "yaw", "delay", "color", "name", "assetId", "motionId", "motionPlan"];
      if (!command.changes || Object.keys(command.changes).some((k) => !permitted.includes(k))) throw new Error("Invalid actor edit field");
      if (command.changes.assetId !== void 0 && !allowed.has(command.changes.assetId)) throw new Error("Motion assets are not ready");
      if (command.changes.motionId != null && !allowed.has(command.changes.motionId)) throw new Error("Motion assets are not ready");
      actors[index] = { ...actors[index], ...command.changes, ...command.changes.motionId !== void 0 && command.changes.motionPlan === void 0 ? { motionPlan: null } : {} };
      validateActor(actors[index]);
    } else throw new Error("Invalid actor action");
  }
  const next = actors.length <= CAST_SIZE ? castSlots(actors) : actors;
  validateActors(next);
  const result = { ...scene, actors: next };
  if (command.type === "remove") result.objects = clearEntityTargets(scene.objects, command.id);
  if (scene.doorPerformance) {
    const ids = scene.doorPerformance.actorIds.filter((id) => next.some((a) => a.id === id));
    if (ids.length) result.doorPerformance = { ...scene.doorPerformance, actorIds: ids, anchorActorId: ids.includes(scene.doorPerformance.anchorActorId) ? scene.doorPerformance.anchorActorId : ids[0] };
    else delete result.doorPerformance;
  }
  return result;
}
function createPerformance() {
  let mode = "editing", time = 0, runId = 0, actors = [], schedule = /* @__PURE__ */ new Map();
  const prepare = (ids, nextMode) => {
    runId++;
    time = 0;
    mode = nextMode;
    const chosen = ids ? new Set(ids) : null;
    schedule = new Map(actors.filter((a) => !chosen || chosen.has(a.id)).map((a) => [a.id, { delay: a.delay, assetId: a.assetId, motionId: actorMotionId(a), motionPlan: a.motionPlan }]));
  };
  return {
    sync(next) {
      actors = structuredClone(next);
    },
    start(ids) {
      prepare(ids, "running");
    },
    arm(ids) {
      prepare(ids, "paused");
    },
    switchMotions(offsets = {}, playback = "play") {
      if (playback === "assign") return;
      const oldMode = mode, oldTime = time, oldSchedule = schedule;
      if (playback === "preserve" && oldMode === "editing") return;
      runId++;
      time = 0;
      mode = playback === "preserve" && oldMode === "paused" ? "paused" : "running";
      schedule = new Map(actors.map((a) => [a.id, { delay: oldMode === "editing" ? a.delay : Math.max(0, (oldSchedule.get(a.id)?.delay ?? a.delay) - oldTime), assetId: a.assetId, motionId: actorMotionId(a), motionOffset: [...offsets[a.id] || [0, 0, 0]] }]));
    },
    stop() {
      if (mode === "running") mode = "paused";
    },
    resume() {
      if (mode === "paused") mode = "running";
    },
    edit() {
      mode = "editing";
      time = 0;
    },
    advance(dt) {
      if (mode === "running" && Number.isFinite(dt) && dt > 0) time += dt;
    },
    snapshot() {
      return { mode, time, runId };
    },
    completed(assets) {
      const active = actors.map((a) => schedule.get(a.id)).filter((c) => c?.motionPlan || c?.motionId);
      return mode !== "editing" && active.length > 0 && active.every((c) => time >= c.delay + (c.motionPlan?.duration ?? assets.get(c.motionId)?.duration ?? Infinity));
    },
    frames(assets) {
      return actors.map((a) => {
        const cue = schedule.get(a.id), preview = mode === "editing" || !cue;
        const visible = preview || !!cue && time >= cue.delay;
        const motionId = preview ? actorMotionId(a) : cue.motionId, assetId = motionId || (preview ? a.assetId : cue.assetId), rest = preview || !motionId;
        const motionPlan = preview ? a.motionPlan : cue.motionPlan;
        if (motionPlan) return { ...a, motionPlan, assetId: preview ? a.assetId : cue.assetId, motionId: null, pose: "generated", preview, visible, runId, clipTime: preview ? motionPlan.duration : Math.min(motionPlan.duration, Math.max(0, time - (cue?.delay || 0))) };
        const duration = assets.get(motionId)?.duration || 0;
        return { ...a, assetId, motionId, motionOffset: preview ? [0, 0, 0] : [...cue?.motionOffset || [0, 0, 0]], pose: rest ? "rest" : "motion", preview, visible, runId, clipTime: rest ? 0 : Math.min(duration, Math.max(0, time - (cue?.delay || 0))) };
      });
    }
  };
}
function delayValue(text) {
  const values = numberWords.actorDelays;
  const match = text.match(languagePattern("actor.delaySeconds"));
  return match ? Number(values[match[1]] ?? match[1]) : null;
}
function parseDirectorCommand(text) {
  const t = text.trim().replace(languagePattern("punctuation.actors.1"), " ").trim();
  const groupStyle = t.match(languagePattern("actor.groupStyle"));
  if (groupStyle && !languagePattern("punctuation.actors.2").test(text)) return { type: "style", style: groupStyle[1] === termWords.cute ? "cute" : "zombie" };
  if (languagePattern("actor.stop").test(t)) return { type: "stop" };
  if (languagePattern("actor.start").test(t)) return { type: "start" };
  if (languagePattern("actor.resume").test(t)) return { type: "resume" };
  if (languagePattern("actor.edit").test(t)) return { type: "edit" };
  if (languagePattern("actor.saveScene").test(t)) return { type: "save" };
  const style = t.match(languagePattern("actor.style"));
  if (style && !languagePattern("punctuation.actors.3").test(text)) return { type: "style", style: [termWords.cute, termWords.birthday].includes(style[1]) ? "cute" : "zombie" };
  const actor = languagePattern("actor.subject").test(t), delay = delayValue(t);
  if (languagePattern("actor.clearMotion").test(t)) return { type: "clearMotion" };
  const numberedMotion = t.match(languagePattern("actor.numberedMotion"));
  if (numberedMotion) return { type: "motion", number: Number(numberWords.actorMotionNumbers[numberedMotion[1]] ?? numberedMotion[1]) };
  if (languagePattern("actor.motionSubject").test(t) && languagePattern("actor.generatedMotion").test(t)) return { type: "unavailable" };
  if (languagePattern("actor.spatialSubject").test(t) && languagePattern("actor.moveVerb").test(t) && languagePattern("actor.here").test(t)) return { type: "move" };
  if (actor && languagePattern("actor.createVerb").test(t)) return { type: "create", delay: delay ?? 0 };
  if (languagePattern("legacy.lungeMotion").test(t) && languagePattern("legacy.motionAssignmentSubject").test(t) || languagePattern("legacy.assignLungeMotion").test(t)) return { type: "motion" };
  if (delay !== null && languagePattern("actor.delayVerb").test(t)) return { type: "delay", delay };
  if (languagePattern("actor.spatialSubject").test(t) && languagePattern("actor.faceViewer").test(t)) return { type: "face" };
  if (languagePattern("actor.spatialSubject").test(t) && languagePattern("actor.removeVerb").test(t)) return { type: "remove" };
  return null;
}
export {
  MAX_ACTORS,
  actorMotionId,
  createPerformance,
  parseDirectorCommand,
  updateActors,
  validateActor,
  validateActors
};
