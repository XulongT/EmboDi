import { send } from "../http.mjs";
import { randomUUID } from "node:crypto";
import { allEntities, validateSpatialContext, applyTransform } from "../../shared/transforms.mjs";
import { isScanScene, referenceFloor } from "../../shared/scene-space.mjs";
import { validateRoomImages } from "../../shared/room.mjs";
import { validateScanPlanes, scanStructure } from "../../shared/scan-structure.mjs";
import { readFile, mkdir, writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { validateRoomMetrics } from "../../shared/room-spatial.mjs";
import { applyAgentResult } from "../../shared/agent-result.mjs";
import { applyActorMotion } from "../../shared/authoring-motion.mjs";
import { applyPatch } from "../../shared/scene.mjs";
async function handleJobsRequest(appRuntime, req, res, url, input, authoringScope) {
  if (url.pathname === "/api/cancel-job") {
    const job = appRuntime.jobs.get(input.id);
    if (job?.status === "running") {
      job.controller.abort();
      job.status = "cancelled";
    }
    return send(res, 200, { ok: true });
  }
  if (url.pathname === "/api/jobs") {
    if (appRuntime.activeJob || appRuntime.cinemaRequests.size) throw new Error("An Agent request is already running. Please wait or cancel it.");
    const reservedId = randomUUID();
    let launched = false;
    appRuntime.activeJob = reservedId;
    try {
      if (!["edit", "generate", "chat", "image", "actor", "agent"].includes(input.kind)) throw new Error("Invalid task type");
      if (typeof input.prompt !== "string" || !input.prompt.trim() || input.prompt.length > 3e3) throw new Error("Enter a creative request of 1–3000 characters");
      input.ids ??= [];
      appRuntime.revisionCheck(input.revision);
      appRuntime.selectionCheck(input.ids);
      if (input.targetIds !== void 0 && (!Array.isArray(input.targetIds) || input.targetIds.length > 187 || new Set(input.targetIds).size !== input.targetIds.length || input.targetIds.some((id) => !allEntities(appRuntime.state.scene).some((o) => o.id === id)))) throw new Error("Invalid transform target");
      if (input.spatialContext !== void 0) validateSpatialContext(input.spatialContext);
      if (["edit", "chat", "agent"].includes(input.kind) && (!Array.isArray(input.anchor) || input.anchor.length !== 3 || !input.anchor.every(Number.isFinite))) throw new Error("Invalid entry point");
      if (["chat", "actor", "agent"].includes(input.kind)) await appRuntime.conversation(input.conversationId);
      if (input.kind === "agent") {
        if (input.actorId && (!appRuntime.state.scene.actors?.some((a) => a.id === input.actorId) || !input.targetIds?.includes(input.actorId))) throw Error("Actor selection changed. Select the actor again.");
        if (input.curveId && !appRuntime.state.scene.curves?.some((c) => c.id === input.curveId)) throw Error("The curve changed. Select it again.");
      }
      if (input.kind === "actor") {
        const actor = appRuntime.state.scene.actors?.find((a) => a.id === input.actorId);
        if (!actor) throw Error("Select one actor");
        const asset = appRuntime.actorCatalog.list().find((a) => a.id === actor.assetId);
        if (!asset || asset.kind !== "vrbuild-humanoid24") throw Error("Basic motion generation requires a 24-joint mannequin");
        if (input.curveId && !appRuntime.state.scene.curves?.some((c) => c.id === input.curveId)) throw Error("The curve changed. Select it again.");
      }
      if (input.sceneKind !== void 0 && (!["room", "scan", "scan-fill", "scan-rebuild"].includes(input.sceneKind) || input.kind !== "generate")) throw new Error("Invalid scene construction type");
      if (input.photoIds) input.images = await appRuntime.captureMedia.images(input.photoIds);
      if (input.sceneKind === "room" && appRuntime.state.scene.scanStructure) input.sceneKind = "scan-fill";
      if (input.sceneKind === "room" && appRuntime.state.scene.scanReconstruction) input.sceneKind = "scan-rebuild";
      if (input.sceneKind === "scan-rebuild") {
        if (!isScanScene(appRuntime.state.scene)) throw new Error("Apply the scan reference first");
        input.images ??= [];
        if (!Array.isArray(input.images)) throw new Error("Invalid reference photo format");
        if (input.images.length) input.images = validateRoomImages(input.images);
      }
      if (input.sceneKind === "scan-fill") {
        if (!appRuntime.state.scene.scanStructure) throw new Error("Apply the scan structure first");
        input.images ??= [];
        if (!Array.isArray(input.images)) throw new Error("Invalid reference photo format");
        if (input.images.length) input.images = validateRoomImages(input.images);
      }
      if (input.sceneKind === "scan") {
        let survey;
        if (input.planes) survey = { capturedAt: (/* @__PURE__ */ new Date()).toISOString(), coordinateSystem: "session-local-floor, metres", planes: validateScanPlanes(input.planes) };
        else {
          try {
            survey = JSON.parse(await readFile(join(dirname(appRuntime.sceneLocation.file), "scan-snapshot.json"), "utf8"));
          } catch {
            throw new Error("No saved scan. Enter Quest immersive mode and allow spatial data access.");
          }
        }
        const floor = referenceFloor(appRuntime.state.scene), built = scanStructure(survey.planes, { preferredAspect: floor ? floor.size[0] / floor.size[2] : 1 });
        appRuntime.revisionCheck(input.revision);
        appRuntime.authoringAccess.check(input, true);
        const job2 = { id: reservedId, kind: "generate", sceneKind: "scan", status: "ready", revision: appRuntime.state.revision, ids: [], createdAt: (/* @__PURE__ */ new Date()).toISOString(), result: built.scene };
        const folder = join(dirname(appRuntime.sceneLocation.file), "scan-previews");
        await mkdir(folder, { recursive: true });
        await writeFile(join(folder, job2.id + ".json"), JSON.stringify({ survey, ...built, job: job2 }, null, 2));
        appRuntime.revisionCheck(input.revision);
        appRuntime.authoringAccess.check(input, true);
        appRuntime.jobs.set(job2.id, job2);
        while (appRuntime.jobs.size > 30) appRuntime.jobs.delete(appRuntime.jobs.keys().next().value);
        return send(res, 202, { id: job2.id, status: job2.status });
      }
      if (input.sceneKind === "room") {
        input.images = validateRoomImages(input.images);
        if (appRuntime.state.capturePlan?.metrics) input.roomMetrics = validateRoomMetrics(appRuntime.state.capturePlan.metrics);
        else if (input.roomMetrics) input.roomMetrics = validateRoomMetrics(input.roomMetrics);
      }
      appRuntime.revisionCheck(input.revision);
      appRuntime.authoringAccess.check(input, true);
      const job = { id: reservedId, kind: input.kind, sceneKind: input.sceneKind, referenceCount: ["room", "scan-fill", "scan-rebuild"].includes(input.sceneKind) ? input.images.length : void 0, ...appRuntime.state.capturePlan ? { capturePlan: structuredClone(appRuntime.state.capturePlan) } : {}, status: "running", stage: input.kind === "chat" ? "analysis" : "construction", revision: appRuntime.state.revision, ids: [...input.ids || []], baseScene: structuredClone(appRuntime.state.scene), controller: new AbortController(), authoringSession: input.authoringSession, createdAt: (/* @__PURE__ */ new Date()).toISOString() };
      appRuntime.jobs.set(job.id, job);
      launched = true;
      while (appRuntime.jobs.size > 30) {
        const oldest = appRuntime.jobs.keys().next().value;
        appRuntime.jobs.delete(oldest);
      }
      appRuntime.runJob(job, input).catch((error) => {
        job.status = job.controller.signal.aborted ? "cancelled" : "error";
        job.error = job.status === "cancelled" ? "Cancelled" : error.message;
      }).finally(() => {
        if (appRuntime.activeJob === job.id) appRuntime.activeJob = null;
      });
      return send(res, 202, { id: job.id, status: job.status });
    } finally {
      if (!launched && appRuntime.activeJob === reservedId) appRuntime.activeJob = null;
    }
  }
  if (url.pathname === "/api/apply-job") {
    const owner = appRuntime.jobs.get(input.id)?.authoringSession;
    if (owner) appRuntime.authoringAccess.check({ authoringSession: owner }, true);
    const job = appRuntime.jobs.get(input.id);
    if (!job || job.status !== "ready") throw new Error("Generated result is not ready to apply");
    appRuntime.revisionCheck(job.revision);
    if (job.spatialKey && input.spatialKey !== job.spatialKey) throw new Error("Room alignment changed. Submit again.");
    const scene = job.kind === "agent" ? applyAgentResult(appRuntime.state.scene, job.result, job.ids) : job.kind === "actor" ? applyActorMotion(appRuntime.state.scene, job.result) : job.kind === "generate" ? job.result : job.result.transform ? applyTransform(appRuntime.state.scene, job.result.transform) : applyPatch(appRuntime.state.scene, job.kind === "chat" ? job.result.patch : job.result, job.ids);
    const result = await appRuntime.commit(scene, job.kind === "generate" ? ["scan-rebuild", "scripted-rebuild"].includes(job.sceneKind) ? "room-rebuilt" : job.sceneKind === "scan-fill" ? appRuntime.state.source : job.sceneKind === "scan" ? "room-scan" : job.sceneKind === "room" ? "room-photos" : "codex" : appRuntime.state.source);
    job.status = "applied";
    return send(res, 200, result);
  }
}
export {
  handleJobsRequest
};
