import { mainActions } from "./workflow.mjs";
import { objectActions, interactionActions } from "./interaction-session.mjs";
function captureStatus(c) {
  if (c.demonstration?.state === "recording") return "Recording demonstration · Press X to finish";
  if (c.demonstration?.state === "error") return c.demonstration.message;
  if (c.localPreparing || c.demonstration?.state === "saving") return "Preparing…";
  if (c.script?.error) return c.script.error;
  if (c.videoState === "error") return c.videoMessage || "Recording not saved. Retry.";
  if (c.cameraMessage && c.captureState === "error") return c.cameraMessage;
  if (c.recording === "recording" || c.script?.status === "listening") return "Listening…";
  if (["requesting", "transcribing"].includes(c.recording) || ["preparing", "executing"].includes(c.script?.status)) return "Preparing…";
  if (c.performanceMode === "running") return "Preview";
  if (c.preset?.status === "paused" || c.script?.status === "cancelled") return "Paused";
  if (["waiting", "executing"].includes(c.preset?.status)) return "Preparing…";
  if (c.preset?.status === "error") return c.preset.message;
  if (c.preset?.status === "ready") return "Ready · Select Preview";
  if (c.preset?.status === "completed") return "Ready";
  if (c.script?.status === "unconfigured") return "The agent is unavailable.";
  if (c.script?.status === "complete") return "Complete";
  if (c.phase === "reference") return `${c.photoCount || 0} photos · Right trigger to capture`;
  if (c.phase === "building") return "Preparing…";
  if (c.phase === "align") return c.calibrationReady ? "Confirm scene alignment" : "Waiting for room alignment";
  return c.scriptedMode || c.rehearsal ? "Hold X to speak, then release" : "Ready";
}
function recordLabel(c) {
  const n = Math.max(0, Math.floor(c.videoSeconds || 0)), time = `${String(Math.floor(n / 60)).padStart(2, "0")}:${String(n % 60).padStart(2, "0")}`;
  if (c.videoState === "recording") return `● REC ${time}`;
  if (["starting", "saving", "error"].includes(c.videoState)) return c.videoMessage || "Recording not saved";
  return "";
}
function captureActions(c) {
  if (c.describing) return [{ id: "descriptionSubmit", label: "Submit description" }, { id: "descriptionCancel", label: "Back" }];
  if (c.localPreparing) return [{ id: "scriptCancel", label: "Cancel" }];
  if (["waiting", "executing"].includes(c.preset?.status)) return [{ id: "presetCancel", label: "Cancel" }];
  if (c.script?.busy) return [{ id: "scriptCancel", label: "Cancel" }];
  const stop = c.performanceMode === "running" ? [{ id: "scriptStop", label: "Pause · Left grip" }] : [];
  if (c.phase === "reference" && c.photoReview >= 0) return [{ id: "photoPrevious", label: "Previous photo", disabled: c.photoReview === 0 }, { id: "photoNext", label: "Next photo", disabled: c.photoReview >= c.photoCount - 1 }, { id: "photoDelete", label: "Remove this photo" }, { id: "photoReviewClose", label: "Back to capture" }];
  if (c.phase === "reference") return [{ id: "camera", label: c.captureState === "active" ? "Close camera view" : "Take photos", disabled: c.photoReading }, { id: c.photoCount ? "photoReview" : "sourceImages", label: c.photoCount ? "Review / remove photos" : "Use images", disabled: c.photoReading }, { id: "capture", label: "Take photo", disabled: c.captureState !== "active" || c.photoReading }, { id: "generate", label: "Build", disabled: c.photoCount < 4 || c.photoReading }];
  if (c.objectInteraction) return [...stop, ...interactionActions(c).filter((x) => x.id !== "record").map((x) => ({ ...x, label: { interactionDraft: "Draft", interactionVoice: "Voice", interactionDemonstration: "Multimodal", interactionClose: "Back", draftApply: "Done · Prepare path", draftClear: "Clear", draftUndo: "Undo", draftCancel: "Exit Draft" }[x.id] || x.label }))];
  if (c.phase === "explore" && ["ready", "paused"].includes(c.preset?.status)) return [{ id: "presetConfirm", label: "Preview · Left grip" }, { id: "pathReset", label: "Reset" }, { id: "interactionDescribe", label: "Something else…" }];
  if (c.phase === "explore" && c.door && c.path && c.objectSelection?.length === 1 && c.objectSelection[0] === c.door.id) return [...stop, { id: "bindDoor", label: "Start group when door opens" }, { id: "objectInteraction", label: "Interaction" }, { id: "objectTransform", label: "Transform" }];
  if (c.phase === "explore" && c.objectSelection?.length) return [...stop, ...objectActions(c).map((x) => ({ ...x, label: x.id === "objectInteraction" ? "Interaction" : "Transform" })), { id: "interactionDescribe", label: "Something else…" }];
  if (c.phase === "explore" && c.path) return [...stop, { id: "presetConfirm", label: "Preview · Left grip" }, { id: "pathReset", label: "Reset" }, { id: "save", label: "Save" }];
  return [...stop, ...mainActions(c).filter((x) => !["voice", "send", "more", "display", "record", "actorTransport", "actorStart", "actors"].includes(x.id))];
}
function captureQuestion(c) {
  if (c.describing) return "Describe it · What would you like to change?";
  if (c.phase === "reference") return c.photoReview >= 0 ? `Photo ${c.photoReview + 1} / ${c.photoCount} · Keep this shot?` : "Let’s build your scene";
  if (c.objectInteraction?.mode === "draft") return "Which path should this group follow?";
  if (c.objectInteraction?.mode === "demonstration") return c.demonstration?.state === "recording" ? "Show the interaction. Press X when finished." : "Press X to start, then press X again to finish.";
  if (c.objectInteraction) return "How would you like to describe the interaction?";
  if (c.preset?.status === "ready" || c.preset?.status === "paused") return "Ready. Press the left grip to preview.";
  if (c.phase === "explore" && c.objectSelection?.length) return `What would you like to change about ${c.targetName || "these objects"}?`;
  if (c.phase === "explore" && c.path) return "Preview, reset, or save?";
  return "";
}
export {
  captureActions,
  captureQuestion,
  captureStatus,
  recordLabel
};
