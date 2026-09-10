import { roomAlignmentAction } from "./workflow.mjs";
import { transparencyActions } from "./scene-appearance.mjs";
const AUTHORING_PAGES = ["global", "main", "createTools", "createLight", "lightSettings", "drawTools", "curveTools", "actorSettings", "sceneTools", "sceneMore", "roomTools", "sceneTransparency", "doorSettings", "brushSettings", "suggestions", "recordingTools"];
const item = (id, label, disabled = false) => ({ id, label, disabled });
function authoringMenu(c, page = "main") {
  if (!c.authoring || c.phase !== "explore") return null;
  if (!AUTHORING_PAGES.includes(page) && page !== "interaction") return null;
  const back = item("authoringBack", "Back"), voice = item("voice", c.actorSelected ? "Describe a basic motion" : c.targetName ? "Describe an edit" : "Describe your idea");
  const target = c.actorName || c.targetName || (c.objectSelection?.length ? `${c.objectSelection.length} objects selected` : "Current scene");
  const door = c.objectSelection?.length === 1 && c.door?.id === c.objectSelection[0];
  const regionTarget = c.regionTarget ?? (c.objectSelection?.length === 1 && !c.actorSelected);
  const result = (title, entries, hint = "X Voice · Y Menu · A Confirm · B Cancel") => ({ title, entries, hint });
  if (c.voiceDraft) return result("Review speech · Not sent", [item("voiceConfirm", "Send · A"), item("voiceRetry", "Speak again · X"), item("voiceCancel", "Cancel speech · B")], "Right stick: pages · A Send · X Retry · B Cancel");
  if (c.recording && c.recording !== "idle") return result(c.recording === "recording" ? "Listening" : "Processing speech", [item("voice", c.recording === "recording" ? "Stop listening" : "Transcribing…", c.recording !== "recording"), item("voiceCancel", "Cancel speech · B")], "Release X to review · B Cancel");
  const p = c.production;
  if (p?.transitioning || p?.saving) return result("Saving changes", [item("cinemaSave", "Please wait…", true)]);
  if (p?.requesting) return result("Camera / Lighting Agent", [item("cinemaCancel", "Cancel request")], "B Cancel");
  if (p?.placing) return result("Choose a placement point", [item("cinemaCancel", "Cancel placement · B")], p.placement?.visible ? "Place at the ring · A Create · B Cancel" : "Point at visible ground · A Create");
  if (p?.dirty) return result(p.tool === "transform" ? "Transform" : p.tool === "curve" ? "Edit curve" : "Preview changes", [item("cinemaSave", "Save · A"), item("cinemaCancel", "Revert · B")], p.tool === "transform" ? "L stick: Move · L grip + stick: Height\nR stick: Rotate · R grip: Grab" : p.tool === "curve" ? "Right grip: pull control points · Release, then A Save" : "A Save · B Discard");
  if (page === "sceneTransparency") return result(`Scene transparency · ${Math.round((1 - (c.roomOpacity ?? 0.5)) * 100)}%`, [...transparencyActions(c.roomOpacity), back], "70% is the most transparent · Saved in this browser");
  if (page === "roomTools" && c.roomMode && c.hasScene) {
    const align = roomAlignmentAction(c), blocked = !!(c.editingBusy || c.job || c.saving || c.finishing || c.applying || c.actorPlacing || c.draft?.active || p?.monitor || p?.playing) || (c.videoState ?? "idle") !== "idle";
    return result(
      "Room / Alignment",
      [align, item("sceneTransparency", "Scene transparency"), item("overview", "Scene overview", blocked), back],
      blocked ? "Finish the current operation before adjusting the room." : !c.roomAlignmentAvailable ? "Build or load a reconstructed room to align it." : !c.xr || c.xrMode !== "immersive-ar" ? "Enter Quest MR to align the room with your real space." : "Align room opens a preview, even when a saved offset exists. · A Confirm · B Back"
    );
  }
  if (p && !c.editing) {
    if (page === "recordingTools") return result("Recording", [item("record", c.videoState === "recording" ? "Stop and save" : "Start recording", !c.productionReady && c.videoState !== "recording"), item("videoFiles", "View recordings"), back]);
    return result(p.monitor ? `Camera monitor · ${p.cameraName || ""}` : p.previewLabel ? `Rehearse · ${p.previewLabel}` : "Explore mode", [
      item(p.monitor ? "cinemaNext" : "cinemaPreview", p.monitor ? "Next camera" : "Camera Agent · View camera"),
      item(p.playing ? "cinemaPause" : "cinemaPlay", p.playing ? "Pause rehearsal · Left grip" : p.activePreviewIds?.length ? "Resume rehearsal · Left grip" : "Rehearse selection · Left grip", !p.canPreview),
      ...p.monitor ? [item("cinemaClose", "Close monitor")] : [item("recordingTools", "Recording and export", !c.productionReady)],
      ...c.script?.agentText || c.script?.userText ? [item("agentReply", "View Agent reply")] : [],
      ...c.roomMode && c.hasScene ? [item("roomTools", "Room / Alignment")] : [],
      item("edit", "Enter edit mode")
    ], p.previewIds?.length ? "Rehearse selection and linked interactions · Right stick click: edit" : "Right stick click: edit and select a target · X Voice");
  }
  if (c.saving || c.finishing || c.applying) return result("Saving", [item("save", "Saving…", true)]);
  if (c.job === "ready") return result("Preview result", [
    item("apply", "Apply changes"),
    item("discard", "Discard preview"),
    ...c.script?.agentText || c.script?.userText ? [item("agentReply", "View Agent reply")] : [],
    ...c.generatedPreview ? [item("motionReplay", "Replay motion")] : c.floodPreview ? [item("floodPreview", "Replay interaction")] : []
  ], "A Apply · B Discard · X Voice");
  if (c.job === "running") return result("Agent working", [item("cancel", "Stop request"), ...c.script?.agentText || c.script?.userText ? [item("agentReply", "View Agent reply")] : []], "B Stop · X Voice");
  if (c.actorPlacing) return result("Place actor", [item("cancelOperation", "Cancel placement")], "Point at ground · A Place · B Cancel");
  if (c.draft?.active || c.objectInteraction?.mode === "draft") {
    const regions = c.draft?.kind === "regions", drawing = !!c.draft?.drawing;
    if (page === "brushSettings") return result("Brush settings", [
      item("draftSmooth", "Smoothing: " + (c.draft?.smoothingLabel || "Standard"), drawing),
      ...c.draft?.mode === "space3d" ? [item("brushNear", "Bring tip closer", drawing), item("brushFar", "Move tip farther", drawing)] : [],
      item("draftClear", "Clear draft", drawing),
      back
    ]);
    return result(regions ? "Draw interaction regions" : c.draft?.mode === "space3d" ? "Spatial path · 3D" : "Ground path · 2D", [
      item("draftApply", regions ? "Finish regions" : "Save curve", drawing || !(regions ? c.draft?.regionCount : c.draft?.pointCount)),
      item("draftUndo", regions ? "Undo last region" : "Undo stroke", !c.draft?.canUndo || drawing),
      ...regions ? [item("regionSurface", c.draft?.forceFloor ? "Draw object sources" : "Draw floor trigger", drawing)] : [],
      ...!regions ? [item("brushSettings", "Brush settings")] : [],
      item("draftCancel", "Cancel drawing")
    ], "Right trigger: draw · Release, then A Save · B Cancel");
  }
  if (p && (page === "global" || page === "main" && !c.objectSelection?.length)) return result("Edit mode", [
    item("createTools", "Create"),
    item("drawTools", "Sketches and paths"),
    ...c.roomMode && c.hasScene ? [item("roomTools", "Room / Alignment")] : [],
    ...c.script?.agentText || c.script?.userText ? [item("agentReply", "View Agent reply")] : [],
    ...c.suggestions?.length ? [item("suggestions", "Agent suggestions")] : [],
    item("cinemaComplete", "Finish setup and explore"),
    item("edit", "Return to explore")
  ], "Right stick: select · A Confirm · B / Y Hide menu");
  if (p && page === "createTools") return result("Create", [item("createLight", "Light"), item("cinemaCamera", "Camera"), item("cinemaBox", "Object"), item("actorPlace", "Actor", !c.actorReady), item("cinemaCreateOther", "Other")], "Choose a category · B Back · Edit after placement");
  if (p && page === "createLight") return result("Light type", [item("cinemaPoint", "Point · All directions"), item("cinemaSpot", "Spot · Directional"), back], "Choose a type, then a ground point · Type stays editable");
  if (p && page === "lightSettings") return result("Light settings", [item("cinemaLightPoint", "Switch to point", c.selectedLightType === "point"), item("cinemaLightSpot", "Switch to spot", c.selectedLightType === "spot"), item("cinemaOther", "Voice: brightness and color"), back], "Review changes · A Save · B Revert");
  if (p?.monitor && c.editing) return result(`Camera monitor · ${p.cameraName || ""}`, [item("cinemaAdjustCamera", "Adjust this camera"), item("cinemaNext", "Next camera"), item("cinemaClose", "Close monitor")], "B Close · After saving, say “preview camera”");
  if (p && c.objectInteraction && c.selectedLightType && !["drawTools", "curveTools"].includes(page)) return result("Light · Interaction", [item("lightSettings", "Type and light settings"), item("cinemaBind", "Bind selected curve", !c.curveCount), item("cinemaPlay", "Rehearse this light", !p.canPreview), item("interactionClose", "Back")]);
  if (p && c.objectInteraction && c.selectedCameraId && !["drawTools", "curveTools"].includes(page)) return result("Camera · Interaction", [item("cinemaPreview", "View this camera"), item("cinemaBind", "Bind selected curve", !c.curveCount), item("cinemaOther", "Voice: camera and movement"), item("interactionClose", "Back")]);
  if (p && c.objectInteraction && page !== "drawTools" && page !== "curveTools") return result("Interaction", [
    item("voice", "Describe an interaction"),
    item("drawTools", "Draw a path or region"),
    item("cinemaBind", "Bind selected curve", !c.curveCount),
    item("cinemaPlay", "Rehearse selection · Left grip", !p.canPreview),
    item("interactionClose", "Back")
  ]);
  if (p && page === "main" && c.objectSelection?.length) return result(target, [item("cinemaTransform", "Transform"), item("objectInteraction", "Interaction"), item("cinemaOther", "Other")], "Right stick: select · A Confirm · Other starts voice");
  if (page === "suggestions") return result("Agent suggestions", [
    ...(c.suggestions || []).map((s, i) => item("suggestion:" + i, s.label)),
    back
  ], "Right stick: select · A Confirm · B Back");
  if (page === "drawTools") return result("Spatial sketches", [
    item("drawFloor", "Draw ground path · 2D"),
    item("drawSpace", "Draw spatial path · 3D"),
    ...regionTarget ? [item("regionDraft", "Draw surface sources and trigger region")] : [],
    ...c.curveCount ? [item("curveTools", `Saved curves · ${c.curveCount}`)] : [],
    back
  ]);
  if (page === "curveTools") return result("Saved curves", [
    item("curveNext", "Next curve · " + c.curveName, !c.curveCount),
    ...p ? [item("cinemaCurveEdit", "Pull control points", !c.curveCount), item("cinemaStraight", "Extreme · Straight endpoints", !c.curveCount), item("cinemaSmooth", "Smooth control points", !c.curveCount)] : [],
    item("curveRemove", "Delete selected curve", !c.curveCount),
    back
  ]);
  if (page === "recordingTools") return result("Recording and export", [item("record", c.videoState === "recording" ? "Stop and save recording" : c.videoRetry ? "Retry recording save" : "Start recording", ["starting", "saving"].includes(c.videoState)), item("videoFiles", "Saved recordings"), back]);
  if (page === "actorSettings") return result(target, [
    item("objectTransform", "Move and rotate"),
    item("actors", "Motion assets and entrance"),
    item("actorClearMotion", "Clear motion"),
    item("actorRemove", "Delete actor"),
    item("sceneTools", "Scene tools"),
    back
  ]);
  if (page === "doorSettings") return result(target, [
    item("doorToggle", c.door?.effect?.open ? "Close door" : "Open door"),
    item("doorHinge", "Switch hinge side"),
    item("doorDirection", "Change opening direction"),
    item("objectTransform", "Move and rotate"),
    item("sceneTools", "Scene tools"),
    back
  ]);
  if (page === "sceneTools") return result("Scene tools", [
    item("actorPlace", "Add actor", !c.actorReady),
    ...c.actorCount ? [item("actorTransport", p?.playing ? "Pause rehearsal" : "Rehearse selection", p ? !p.canPreview : !c.actorMotionCount)] : [],
    item("save", "Save scene"),
    item("sceneMore", "Recording, display and more"),
    back
  ]);
  if (page === "sceneMore") return result("Scene settings", [
    item("recordingTools", c.videoState === "recording" ? "Recording · Stop and save" : "Recording and export"),
    item("display", "Display and alignment"),
    item("overview", "Scene overview"),
    item("authoringHelp", "Controls"),
    item("selectionSettings", "Selection and materials"),
    back
  ]);
  if (c.suggestions?.length) return result("Agent suggestions", [
    ...c.suggestions.map((s, i) => item("suggestion:" + i, s.label)),
    item("dismissSuggestions", "Dismiss suggestions")
  ], "Choose a suggestion to preview · Right stick: select · A Confirm");
  if (c.actorSelected) return result(target, [item("actorAgent", "Generate a basic motion"), item("drawTools", "Draw a motion path"), item("actorPreview", "Rehearse this actor"), item("actorSettings", "Actor settings")]);
  if (door) return result(target, [item("voice", "Describe an interaction"), item("regionDraft", "Draw surface sources and trigger region"), ...c.floodAvailable ? [item("floodPreview", "Rehearse interaction")] : [], item("doorSettings", "Door settings")]);
  return result(target, [
    voice,
    item("drawTools", "Draw a spatial sketch"),
    ...c.objectSelection?.length ? [item("objectTransform", "Move and rotate")] : [item("edit", c.editing ? "Finish selection" : "Select objects")],
    item("sceneTools", "Scene tools")
  ]);
}
function authoringParent(page) {
  return { global: "global", main: "global", createTools: "global", sceneTools: "global", roomTools: "global", sceneTransparency: "roomTools", suggestions: "global", createLight: "createTools", lightSettings: "interaction", curveTools: "drawTools", sceneMore: "sceneTools", recordingTools: "sceneMore" }[page] || "main";
}
function createMenuNavigation() {
  const states = /* @__PURE__ */ new WeakMap();
  return { sample(source, active) {
    const y = source.gamepad?.axes?.[3] ?? 0, old = states.get(source);
    if (!active || source.handedness !== "right") {
      states.set(source, { active: false, ready: false });
      return 0;
    }
    const neutral = Math.abs(y) < 0.3;
    if (!old?.active) {
      states.set(source, { active: true, ready: neutral });
      return 0;
    }
    if (neutral) {
      old.ready = true;
      return 0;
    }
    if (!old.ready || Math.abs(y) < 0.65) return 0;
    old.ready = false;
    return Math.sign(y);
  } };
}
const suggestionScope = (c) => JSON.stringify([
  c.revision,
  c.spatialContext?.spatialKey || c.spatialKey || "",
  [...c.targetIds || c.objectSelection || []].sort(),
  c.curveId || null
]);
export {
  AUTHORING_PAGES,
  authoringMenu,
  authoringParent,
  createMenuNavigation,
  suggestionScope
};
