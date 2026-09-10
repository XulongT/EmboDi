import { send } from "../http.mjs";
import { updateDoor } from "../../shared/doors.mjs";
import { replaceObjectRegions } from "../../shared/interaction-regions.mjs";
import { updateActors } from "../../shared/actors.mjs";
import { applyTransform } from "../../shared/transforms.mjs";
import { applyPatch, colorPatch, seedScene } from "../../shared/scene.mjs";
import { validateCurves } from "../../shared/authoring-motion.mjs";
async function handleSceneRequest(appRuntime, req, res, url, input, authoringScope) {
  if (url.pathname === "/api/save-scene") return send(res, 200, await appRuntime.saveCurrentScene(input.revision));
  if (url.pathname === "/api/doors") {
    appRuntime.revisionCheck(input.revision);
    if (appRuntime.activeJob) throw new Error("Finish the current model request first");
    return send(res, 200, await appRuntime.commit(updateDoor(appRuntime.state.scene, input.command), appRuntime.state.source));
  }
  if (url.pathname === "/api/interaction-sketch") {
    if (input.objectId && input.doorId && input.objectId !== input.doorId) throw Error("Region targets do not match.");
    const objectId = input.objectId || input.doorId;
    appRuntime.revisionCheck(input.revision);
    appRuntime.selectionCheck([objectId]);
    if (appRuntime.activeJob) throw Error("Finish the current model request first");
    return send(res, 200, await appRuntime.commit(replaceObjectRegions(appRuntime.state.scene, objectId, input.regions), appRuntime.state.source));
  }
  if (url.pathname === "/api/actors") {
    appRuntime.revisionCheck(input.revision);
    if (appRuntime.activeJob) throw new Error("Finish or cancel the current model request first");
    return send(res, 200, await appRuntime.commit(updateActors(appRuntime.state.scene, input.command, appRuntime.actorCatalog.list().map((a) => a.id)), appRuntime.state.source));
  }
  if (url.pathname === "/api/transform") {
    appRuntime.revisionCheck(input.revision);
    if (appRuntime.activeJob) throw new Error("Finish or cancel the current model request first");
    return send(res, 200, await appRuntime.commit(applyTransform(appRuntime.state.scene, input.operation), appRuntime.state.source));
  }
  if (url.pathname === "/api/color") {
    appRuntime.revisionCheck(input.revision);
    appRuntime.selectionCheck(input.ids);
    return send(res, 200, await appRuntime.commit(applyPatch(appRuntime.state.scene, colorPatch(appRuntime.state.scene, input.ids, input.color), input.ids), appRuntime.state.source));
  }
  if (url.pathname === "/api/undo") {
    appRuntime.revisionCheck(input.revision);
    const last = appRuntime.history.at(-1);
    if (!last) throw new Error("No changes to undo");
    const result = await appRuntime.commit(last.scene, last.source, false, last);
    appRuntime.history.pop();
    return send(res, 200, result);
  }
  if (url.pathname === "/api/reset") {
    appRuntime.revisionCheck(input.revision);
    return send(res, 200, await appRuntime.commit(seedScene(), "sample"));
  }
  if (url.pathname === "/api/curves") {
    appRuntime.revisionCheck(input.revision);
    const curves = structuredClone(appRuntime.state.scene.curves || []);
    if (input.type === "add") {
      validateCurves([input.curve]);
      curves.push(input.curve);
    } else if (input.type === "remove") {
      const index = curves.findIndex((c) => c.id === input.id);
      if (index < 0) throw Error("Curve not found");
      curves.splice(index, 1);
    } else throw Error("Invalid curve operation");
    validateCurves(curves);
    return send(res, 200, await appRuntime.commit({ ...appRuntime.state.scene, curves }, appRuntime.state.source));
  }
}
export {
  handleSceneRequest
};
