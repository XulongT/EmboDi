import { isRegionObject, regionObjectId } from "../../shared/interaction-regions.mjs";
import { allEntities } from "../../shared/transforms.mjs";
import { uiText } from "../../shared/ui-text.mjs";
import { interactionActions } from "../../shared/interaction-session.mjs";
function createDrawingActions(appRuntime) {
  function beginCurve(mode2) {
    if (appRuntime.openSourceMode && !appRuntime.editing) throw Error("Enter edit mode before drawing.");
    if (appRuntime.phase !== "explore" || appRuntime.busy()) throw Error("Enter the scene and finish the current operation first.");
    if (!appRuntime.objectInteraction.active()) appRuntime.objectInteraction.open({ ids: [...appRuntime.selection], revision: appRuntime.state.revision, spatialKey: appRuntime.spatialKey(), standalone: true });
    appRuntime.pausePerformance();
    appRuntime.objectInteraction.draft();
    appRuntime.draftTool.open([], { mode: mode2, depth: appRuntime.renderer.xr.isPresenting ? 0.6 : 2 });
    appRuntime.navigationGate.block();
    appRuntime.keys.clear();
    appRuntime.setHover([]);
    appRuntime.controls.enabled = false;
    if (appRuntime.renderer.xr.isPresenting) {
      appRuntime.draftInputBlocked = new Set(appRuntime.triggerHeld);
      appRuntime.xrPanel.visible = false;
      appRuntime.updatePresentationVisibility();
    }
    appRuntime.updateHint();
    appRuntime.updateSelection();
    appRuntime.syncFlow();
    appRuntime.toast(mode2 === "space3d" ? "Spatial brush: hold the right trigger and move your hand. Y opens the save menu." : "Ground brush: point at ground and hold the right trigger. Y opens the save menu.");
  }
  async function saveCurve() {
    const draft = appRuntime.draftTool.snapshot();
    if (draft.stroke) throw Error("Release the trigger first");
    if (draft.kind === "regions") {
      if (!draft.regions.length) throw Error("Draw a region first.");
      const next2 = await appRuntime.api("/api/interaction-sketch", { objectId: draft.objectId || draft.doorId, regions: draft.regions, revision: appRuntime.state.revision });
      appRuntime.closeObjectInteraction();
      appRuntime.acceptState(next2);
      appRuntime.syncFlow();
      appRuntime.toast("Regions saved. Hold X to describe the flow and dwell condition.");
      return;
    }
    const curve = { id: "curve-" + crypto.randomUUID(), mode: draft.mode, points: draft.points, rawPoints: draft.rawPoints, smoothing: draft.smoothing };
    const next = await appRuntime.api("/api/curves", { type: "add", curve, revision: appRuntime.state.revision });
    appRuntime.selectedCurveId = curve.id;
    appRuntime.closeObjectInteraction();
    appRuntime.acceptState(next);
    appRuntime.syncFlow();
    appRuntime.toast("Curve saved. Select an object or actor and request movement along it. A Save; left grip rehearses in Explore.");
  }
  function beginRegionDraft() {
    if (appRuntime.phase !== "explore" || !appRuntime.editing || appRuntime.busy() || appRuntime.selection.length !== 1 || !isRegionObject(appRuntime.state.scene.objects.find((o) => o.id === appRuntime.selection[0]))) throw Error("Select one editable object and finish the current operation first.");
    if (!appRuntime.objectInteraction.active()) appRuntime.openObjectInteraction();
    appRuntime.pausePerformance();
    appRuntime.objectInteraction.draft();
    appRuntime.draftTool.openRegions(appRuntime.state.scene, appRuntime.selection[0], appRuntime.actorViewPosition().toArray());
    appRuntime.navigationGate.block();
    appRuntime.keys.clear();
    appRuntime.setHover([]);
    appRuntime.controls.enabled = false;
    if (appRuntime.renderer.xr.isPresenting) {
      appRuntime.draftInputBlocked = new Set(appRuntime.triggerHeld);
      appRuntime.xrPanel.visible = false;
      appRuntime.updatePresentationVisibility();
    }
    appRuntime.updateHint();
    appRuntime.updateSelection();
    appRuntime.syncFlow();
    appRuntime.toast("Draw sources on this object and a floor dwell region. Close each loop, then save and describe the flow.");
  }
  function previewFlood() {
    if (appRuntime.phase !== "explore" || !(appRuntime.previewScene || appRuntime.state.scene).floods?.length || appRuntime.currentJob && appRuntime.currentJob.status !== "ready") throw Error("Generate or apply a flow interaction first.");
    if (appRuntime.openSourceMode && appRuntime.production && !appRuntime.currentJob) return appRuntime.startObjectPreview({ restart: true });
    const ids = (appRuntime.previewScene || appRuntime.state.scene).floods.filter((f) => appRuntime.selection.includes(regionObjectId(f))).map((f) => f.id);
    if (!ids.length) throw Error("Select the object whose flow effect you want to rehearse.");
    appRuntime.pausePerformance();
    appRuntime.closeObjectInteraction();
    if (!appRuntime.currentJob) appRuntime.setEditing(false);
    appRuntime.floodRuntime.start(ids);
    if (appRuntime.renderer.xr.isPresenting) appRuntime.xrPanel.visible = false;
    appRuntime.syncFlow();
    appRuntime.toast("Rehearsal started. Enter and remain in the floor region. Leaving resets the timer. Say “replay interaction” to restart.");
  }
  function nextCurve() {
    const curves = appRuntime.state.scene.curves || [];
    if (!curves.length) throw Error("Save the curve first.");
    appRuntime.selectedCurveId = curves[(curves.findIndex((c) => c.id === appRuntime.selectedCurveId) + 1) % curves.length].id;
    appRuntime.curveLayer.sync(curves, appRuntime.selectedCurveId);
    appRuntime.syncFlow();
  }
  async function removeCurve() {
    if (!appRuntime.selectedCurveId) throw Error("Select a curve first.");
    const next = await appRuntime.api("/api/curves", { type: "remove", id: appRuntime.selectedCurveId, revision: appRuntime.state.revision });
    appRuntime.selectedCurveId = null;
    appRuntime.acceptState(next);
  }
  function beginObjectDraft() {
    if (appRuntime.openSourceMode) return beginCurve("floor2d");
    if (!appRuntime.objectInteraction.active() || appRuntime.busy()) throw new Error("Select an object and finish the current action first");
    if (appRuntime.presetSequence?.ownsPerformance()) appRuntime.presetSequence.cancel("Draft is open. Confirm Preview again after preparing the path.");
    appRuntime.objectInteraction.draft();
    appRuntime.draftTool.open(appRuntime.state.scene.behaviors?.path?.actorIds.every((id) => appRuntime.selection.includes(id)) ? appRuntime.state.scene.behaviors.path.rawPoints : []);
    appRuntime.navigationGate.block();
    appRuntime.keys.clear();
    appRuntime.setHover([]);
    if (appRuntime.renderer.xr.isPresenting) {
      appRuntime.draftInputBlocked = new Set(appRuntime.triggerHeld);
      appRuntime.xrPanel.visible = false;
      appRuntime.updatePresentationVisibility();
    }
    appRuntime.controls.enabled = false;
    appRuntime.updateHint();
    appRuntime.updateSelection();
    appRuntime.syncFlow();
    appRuntime.toast("Draft: right trigger to draw · Left stick click to undo · A to cancel");
  }
  function paintObjectInteraction(context) {
    const session = context.objectInteraction;
    appRuntime.$("object-interaction-panel").hidden = !session;
    if (!session) return;
    const names = session.ids.map((id) => appRuntime.uiName(allEntities(appRuntime.state.scene).find((o) => o.id === id)) || id);
    appRuntime.$("interaction-targets").textContent = uiText(names.length === 1 ? names[0] : `${names.length} objects locked`);
    appRuntime.$("interaction-status").textContent = uiText(session.mode === "draft" ? context.draft.kind === "regions" ? context.draft.message : `${context.draft.message} · ${context.draft.length.toFixed(2)} m` : "How would you like to describe the interaction?");
    appRuntime.$("interaction-actions").replaceChildren();
    for (const item of interactionActions(context)) {
      const button = document.createElement("button");
      button.textContent = uiText(item.label);
      button.dataset.action = item.id;
      button.disabled = !!item.disabled;
      button.onclick = appRuntime.action(() => appRuntime.flowAction(item.id));
      appRuntime.$("interaction-actions").append(button);
    }
  }
  function updateDraftDrawing() {
    if (!appRuntime.objectInteraction.active()) return;
    if (!appRuntime.objectInteraction.valid({ revision: appRuntime.state.revision, spatialKey: appRuntime.spatialKey(), ids: allEntities(appRuntime.state.scene).map((o) => o.id) })) {
      appRuntime.closeObjectInteraction("Scene or alignment changed. Draft closed.");
      return;
    }
    if (!appRuntime.draftTool.active()) return;
    if (appRuntime.renderer.xr.isPresenting) {
      const controller = appRuntime.controllers.find((c) => c.userData.inputSource?.handedness === "right");
      if (!appRuntime.xrViewer.valid || !controller?.visible || !controller?.userData.inputSource || appRuntime.xrPanel.visible) {
        appRuntime.draftTool.suspend("Hide the menu and restore controller tracking before drawing");
        return;
      }
      appRuntime.raycaster.setFromXRController(controller);
      appRuntime.draftTool.update(appRuntime.raycaster, controller);
    } else if (appRuntime.pointerInside) {
      appRuntime.raycaster.setFromCamera(appRuntime.pointer, appRuntime.camera);
      appRuntime.draftTool.update(appRuntime.raycaster, "mouse");
    }
  }
  function canRecordDraft() {
    return appRuntime.draftTool.active() && !appRuntime.scriptDemo?.snapshot().busy && !appRuntime.videoStartPending && !appRuntime.transformPending && !appRuntime.currentJob && !appRuntime.submitting && !appRuntime.saving && !appRuntime.finishing && !appRuntime.director.snapshot().pending && appRuntime.studio.getRecordingState() === "idle" && appRuntime.virtualRecorder.snapshot().status === "idle";
  }
  return { beginCurve, saveCurve, beginRegionDraft, previewFlood, nextCurve, removeCurve, beginObjectDraft, paintObjectInteraction, updateDraftDrawing, canRecordDraft };
}
export {
  createDrawingActions
};
