const BUILD = "0.7.8-basic";
const START_PHASE = "reference";
function roomAlignmentAction(c) {
  return {
    id: "align",
    label: c.xr && c.xrMode === "immersive-ar" ? "Align room" : "Align room · Quest MR",
    disabled: !c.roomAlignmentAvailable || !c.xr || c.xrMode !== "immersive-ar" || !!(c.editingBusy || c.job || c.saving || c.finishing || c.applying || c.actorPlacing || c.draft?.active || c.production?.monitor || c.production?.playing) || (c.recording ?? "idle") !== "idle" || (c.videoState ?? "idle") !== "idle"
  };
}
const PHASES = { welcome: "Start creating", overview: "Scene overview", align: "Confirm room alignment", reference: "Capture a new room", building: "Build scene", preview: "Review blockout", entering: "Entering the world", entry: "Choose entry point", calibrate: "Manual alignment", explore: "Creating" };
function roomSessionPhase({ phase, event = "start", job = false, ar = true }) {
  if (["reference", "building", "preview"].includes(phase)) return phase;
  if (job) return "overview";
  if (event === "reset") return "welcome";
  if (event === "end") return phase === "welcome" ? "welcome" : "overview";
  if (["explore", "align", "calibrate", "entry"].includes(phase)) return ar ? "align" : "entry";
  return phase;
}
function selectedActorActions({ authoring = false, phase, actorSelected, actorName, job, finishing, saving, recording = "idle", videoState = "idle", actorPlacing = false, editingBusy = false }) {
  if (authoring) return [];
  if (phase !== "explore" || !actorSelected || job || finishing || saving || recording !== "idle" || videoState !== "idle" || actorPlacing) return [];
  return [{ id: "actors", label: `${actorName || "Current actor"} · Motion and timing` }, { id: "actorRemove", label: `Remove ${actorName || "Selected actor"}`, disabled: editingBusy }];
}
function stageActions({ authoring = false, actorReady = false, phase, reference, job, entryCount, editing, recording = "idle", saving = false, demoMode = false, roomMode = false, roomOpacity = 0.5, captureState = "idle", photoCount = 0, photoReading = false, xr = false, calibrationReady = false, scanReady = false, videoState = "idle", videoRetry = false, actorCount = 0, actorMotionCount = actorCount, performanceMode = "editing", performanceCompleted = false, actorPlacing = false, hasScene = false, finishing = false, scanBased = false }) {
  if (finishing || saving) return [{ id: "save", label: finishing ? "Saving and exiting…" : "Saving…", disabled: true }];
  if (roomMode) {
    if (videoState === "saving") return [{ id: "record", label: "Saving video…", disabled: true }];
    if (videoState === "error" && videoRetry) return [{ id: "record", label: "Retry video save" }, { id: "finish", label: "Save and finish" }];
    if (job === "ready") return [{ id: "apply", label: ["preview", "building"].includes(phase) ? "Apply and enter" : "Apply changes" }, { id: "discard", label: "Discard preview" }, ...videoState === "recording" ? [{ id: "record", label: "Stop and save recording" }] : []];
    if (job === "running" || phase === "building") return [{ id: "cancel", label: "Stop request" }, ...videoState === "recording" ? [{ id: "record", label: "Stop and save recording" }] : []];
    if (recording !== "idle") return [{ id: "voice", label: recording === "recording" ? "Finish and send" : "Processing voice…", disabled: recording !== "recording" }, { id: "cancel", label: "Cancel voice input" }, ...videoState === "recording" ? [{ id: "record", label: "Stop and save recording" }] : []];
    if (phase === "welcome") return [...hasScene ? [{ id: "resume", label: "Continue last session" }] : [], { id: "newWorld", label: scanBased ? "Rebuild from current scan" : "Capture a new room" }];
    if (phase === "overview") return [{ id: "resume", label: "Back to creating" }, { id: "newWorld", label: scanBased ? "Rebuild from current scan" : "Capture a new room" }, { id: "finish", label: "Finish creating" }];
    if (phase === "align") return [{ id: "confirmAlignment", label: calibrationReady ? "Alignment looks right · Start" : "Waiting for room scan…", disabled: !calibrationReady }, { id: "alignmentOptions", label: "Adjust alignment" }, ...authoring ? [] : [{ id: roomOpacity === 1 ? "overlayRoom" : "solidRoom", label: roomOpacity === 1 ? "Overlay · 50%" : "Solid blockout · 100%" }], { id: "cancelAlignment", label: "Back" }];
    if (phase === "calibrate") return [{ id: "applyCalibration", label: "Review alignment", disabled: !calibrationReady }, { id: "restartCalibration", label: "Mark corners again" }, { id: "cancelCalibration", label: "Back to scan alignment" }];
    if (authoring && phase === "explore") return [
      { id: "edit", label: editing ? "Finish editing" : "Select and edit", disabled: actorPlacing },
      { id: "actorPlace", label: actorPlacing ? "Cancel actor placement" : "Add actor", disabled: !actorReady && !actorPlacing },
      ...actorCount ? [{ id: "actors", label: "Actors and motions" }] : [],
      ...actorMotionCount ? [{ id: "actorTransport", label: performanceCompleted ? "Replay motions" : performanceMode === "running" ? "Pause motions" : performanceMode === "paused" ? "Resume motions" : "Preview motions" }] : [],
      { id: "record", label: videoState === "recording" ? "Stop and save recording" : "Record virtual view" },
      { id: "save", label: "Save scene" },
      { id: "overview", label: "Scene overview" },
      { id: "display", label: "Display and alignment" }
    ];
    if (phase === "explore") return [...videoState === "recording" ? [{ id: "record", label: "Stop and save recording · B" }] : [], { id: "overview", label: "Scene overview" }, { id: "display", label: "Display and alignment" }, { id: "save", label: "Save scene" }];
  }
  const edit = { id: "edit", label: editing ? "Exit edit" : "Edit scene", disabled: actorPlacing || !editing && !!job };
  const transport = { id: "actorTransport", label: performanceCompleted ? "Replay · Left grip" : performanceMode === "running" ? "Pause · Left grip" : performanceMode === "paused" ? "Resume · Left grip" : "Play · Left grip" };
  if (videoState === "recording") return [
    ...job === "ready" ? [{ id: "apply", label: "Apply changes" }, { id: "discard", label: "Discard preview" }] : [recording !== "idle" ? { id: "voice", label: recording === "recording" ? "Finish and send" : "Processing voice…", disabled: recording !== "recording" } : edit, ...actorCount ? [{ ...transport, disabled: !!job && performanceMode !== "running" }] : []],
    { id: "record", label: "Stop recording · B" },
    { id: "more", label: "More" }
  ];
  if (videoState === "saving") return [{ id: "record", label: "Saving video…", disabled: true }];
  if (videoState === "error" && videoRetry) return [{ id: "record", label: "Retry video save" }, { id: "more", label: "More" }];
  if (phase === "calibrate") return [{ id: "useScan", label: "Use Quest scan", disabled: !scanReady }, { id: "applyCalibration", label: "Apply corner alignment", disabled: !calibrationReady }, { id: "restartCalibration", label: "Mark corners again" }, { id: "cancelCalibration", label: "Back to overview" }];
  if (phase === "entering") return [{ id: "cancel", label: "Cancel entry" }];
  if (saving) return [{ id: "save", label: "Saving…", disabled: true }];
  if (job === "ready") return [{ id: "apply", label: ["preview", "building"].includes(phase) ? "Apply and create entry points" : "Apply changes" }, { id: "discard", label: "Discard preview" }];
  if (job === "running" || phase === "building") return [{ id: "cancel", label: "Stop request" }];
  if (recording !== "idle") return [{ id: "voice", label: recording === "recording" ? "Finish and send" : "Processing voice…", disabled: recording !== "recording" }, { id: "cancel", label: "Cancel voice input" }];
  if (phase === "reference" && roomMode) return [
    { id: "camera", label: captureState === "starting" ? "Cancel camera startup" : captureState === "active" ? "Close camera" : "Open camera", disabled: photoReading },
    { id: "capture", label: photoReading ? "Loading photos…" : "Take photo · Right trigger", disabled: captureState !== "active" || photoReading },
    { id: "generate", label: scanBased ? `Build from scan${photoCount ? ` · ${photoCount} references` : ""}` : `Build room${photoCount ? ` · ${photoCount} photos` : ""}`, disabled: photoCount < 4 || photoReading || captureState === "starting" },
    { id: "more", label: "More" }
  ];
  if (phase === "reference" && demoMode) return [{ id: "library", label: reference ? "Change image" : "Choose image" }, { id: "demoBuild", label: "Build scene", disabled: !reference }];
  if (phase === "reference") return [{ id: "library", label: reference ? "Change image" : "Choose image" }, { id: "generate", label: "Start building", disabled: !reference }, { id: "resume", label: "Back to existing world" }, { id: "more", label: "More" }];
  if (phase === "entry" && roomMode && xr) return [{ id: "align", label: "Align real room" }, { id: "visit", label: "Inspect estimated scene", disabled: !entryCount }, { id: "more", label: "More" }];
  if (phase === "entry") return [{ id: "enter", label: "Enter world", disabled: !entryCount }, { id: "nextEntry", label: "Choose another entry", disabled: entryCount < 2 }, { id: "more", label: "More" }];
  if (roomMode && phase === "explore") return [edit, actorPlacing ? { id: "actorPlace", label: "Cancel placement · A" } : actorCount ? actorMotionCount || performanceMode !== "editing" ? transport : { id: "actorAssign", label: "Assign actor motion" } : { id: "actorPlace", label: "Add actor" }, { id: "record", label: "Record camera view · B" }, { id: "more", label: "More" }];
  return [{ id: "voice", label: "Voice chat" }, edit, { id: "overview", label: "Show overview" }, { id: "more", label: "More" }];
}
function authoringActorActions(c) {
  return [
    { id: "actorAgent", label: "Generate motion · Agent", disabled: !c.actorSelected },
    { id: "actorPreview", label: "Preview this actor", disabled: !c.actorSelected },
    { id: "drawFloor", label: "Draw floor curve · 2D" },
    { id: "drawSpace", label: "Draw air curve · 3D" },
    ...c.curveCount ? [{ id: "curveNext", label: "Curve " + c.curveName }, { id: "curveRemove", label: "Remove selected curve" }] : [],
    { id: "objectTransform", label: "Move / turn this actor" },
    { id: "actorClearMotion", label: "Clear this actor motion" },
    { id: "sceneTools", label: "Scene tools" }
  ];
}
function authoringSceneActions(c) {
  return [{ id: "edit", label: c.editing ? "Finish selecting" : "Select actor / object" }, { id: "actorPlace", label: "Add actor", disabled: !c.actorReady }, { id: "drawFloor", label: "Draw floor curve · 2D" }, { id: "drawSpace", label: "Draw air curve · 3D" }, ...c.actorCount ? [{ id: "actorTransport", label: "Play / pause all actors" }] : [], { id: "save", label: "Save scene" }, { id: "record", label: c.videoState === "recording" ? "Stop recording" : "Record virtual view" }, { id: "display", label: "Display and alignment" }];
}
function mainActions(context) {
  if (context.authoring && context.floodPreview) return [{ id: "floodPreview", label: "Replay interaction" }, { id: "apply", label: "Apply interaction" }, { id: "discard", label: "Discard preview" }];
  if (context.authoring && context.generatedPreview) return [{ id: "motionReplay", label: "Replay generated preview" }, { id: "apply", label: "Apply motion" }, { id: "discard", label: "Discard preview" }];
  if (context.authoring && context.phase === "explore" && !context.job && !context.saving && !context.finishing && context.recording === "idle") return context.actorSelected ? authoringActorActions(context) : authoringSceneActions(context);
  const actions = stageActions(context);
  if (context.authoring && context.roomMode && context.hasScene && context.roomAlignmentAvailable && ["welcome", "overview", "entry"].includes(context.phase) && !context.job && !context.saving && !context.finishing && (context.recording ?? "idle") === "idle" && (context.videoState ?? "idle") === "idle" && !actions.some((a) => a.id === "align")) actions.splice(1, 0, roomAlignmentAction(context));
  if (context.authoring && ["overview", "preview"].includes(context.phase) && !context.saving && !context.finishing && (!context.job || context.job === "ready") && (context.recording ?? "idle") === "idle" && (context.videoState ?? "idle") === "idle") actions.push({ id: "rotateRoom", label: "Rotate 90°" });
  if (actions.some((a) => a.id === "record")) return actions;
  if (context.videoState === "recording") return [...actions, { id: "record", label: "Stop and save recording · B" }];
  if (context.videoRetry) return [...actions, { id: "record", label: "Retry recording save" }];
  if (!context.authoring && context.roomMode && !["starting", "saving"].includes(context.videoState) && context.phase !== "explore") return [...actions, { id: "record", label: "Start recording · Up to 3 min", disabled: !!context.editingBusy }];
  return actions;
}
export {
  BUILD,
  PHASES,
  START_PHASE,
  authoringActorActions,
  authoringSceneActions,
  mainActions,
  roomAlignmentAction,
  roomSessionPhase,
  selectedActorActions
};
