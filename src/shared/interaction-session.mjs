function createInteractionSession() {
  let current = null;
  return {
    open({ ids, revision, spatialKey, standalone = false }) {
      if (!Array.isArray(ids) || !ids.length && !standalone || new Set(ids).size !== ids.length || ids.some((id) => typeof id !== "string") || !Number.isInteger(revision) || typeof spatialKey !== "string") throw new Error("Select an object first");
      current = { ids: [...ids], revision, spatialKey, mode: "interaction" };
    },
    draft() {
      if (!current) throw new Error("Select an object first");
      current.mode = "draft";
    },
    demonstration() {
      if (!current) throw Error("Select a door");
      current.mode = "demonstration";
    },
    close() {
      current = null;
    },
    valid({ revision, spatialKey, ids }) {
      return !current || current.revision === revision && current.spatialKey === spatialKey && current.ids.every((id) => ids.includes(id));
    },
    snapshot: () => current ? structuredClone(current) : null,
    active: () => current !== null,
    drawing: () => current?.mode === "draft"
  };
}
function objectActions(context) {
  if (context.authoring && context.actorSelected) return [];
  if (context.phase !== "explore" || !context.objectSelection?.length || context.actorPlacing) return [];
  if (context.objectInteraction?.mode === "draft") return [];
  const disabled = !!context.editingBusy || !!context.job || !!context.saving || !!context.finishing;
  return [{ id: "objectInteraction", label: "Interaction · Set behavior", disabled }, { id: "objectTransform", label: "Transform · Move and turn", disabled }];
}
function interactionActions(context) {
  if (!context.objectInteraction) return [];
  if (context.objectInteraction.mode === "demonstration") return context.demonstration?.state === "recording" ? [{ id: "demonstrationStop", label: "X · Stop and prepare interaction" }] : context.demonstration?.state === "saving" ? [{ id: "demonstrationStop", label: "Saving demonstration...", disabled: true }] : [...context.demonstration?.state === "ready" ? [{ id: "demonstrationApply", label: "Prepare door interaction" }] : [], { id: context.demonstration?.canRetry ? "demonstrationRetry" : "demonstrationStart", label: context.demonstration?.canRetry ? "X · Retry saving" : "X · Start demonstration" }, { id: "interactionClose", label: "Back" }];
  if (context.authoring && context.objectInteraction.mode === "draft" && context.draft?.kind === "regions") return [
    { id: "draftApply", label: "Finish sketch", disabled: !context.draft?.regionCount || context.draft?.drawing },
    { id: "draftUndo", label: "Undo last region", disabled: !context.draft?.canUndo },
    { id: "draftCancel", label: "Cancel drawing" }
  ];
  if (context.authoring && context.objectInteraction.mode === "draft") return [
    { id: "draftApply", label: "Save curve", disabled: !context.draft?.pointCount || context.draft?.drawing },
    { id: "draftSmooth", label: "Smoothing: " + (context.draft?.smoothingLabel || "Standard"), disabled: !!context.draft?.drawing },
    ...context.draft?.mode === "space3d" ? [{ id: "brushNear", label: "Tip nearer", disabled: context.draft.drawing }, { id: "brushFar", label: "Tip farther", disabled: context.draft.drawing }] : [],
    { id: "draftClear", label: "Redraw curve" },
    { id: "draftUndo", label: "Undo stroke", disabled: !context.draft?.canUndo },
    { id: "draftCancel", label: "Cancel drawing" }
  ];
  if (context.objectInteraction.mode === "draft") return [
    ...context.videoState === "recording" ? [{ id: "record", label: "Stop and save recording · B" }] : [],
    { id: "draftApply", label: "Finish and prepare path", disabled: !context.draft?.pointCount || context.draft?.drawing },
    { id: "draftClear", label: "Clear draft" },
    { id: "draftUndo", label: "Undo stroke", disabled: !context.draft?.canUndo },
    { id: "draftCancel", label: "Cancel and exit Draft" }
  ];
  if (context.authoring && context.door && context.objectInteraction.ids.length === 1 && context.objectInteraction.ids[0] === context.door.id) return [
    { id: "regionDraft", label: "Draw regions" },
    ...context.floodAvailable ? [{ id: "floodPreview", label: "Replay interaction" }] : [],
    { id: "interactionVoice", label: "Voice description · Hold X" },
    { id: "interactionClose", label: "Back" }
  ];
  if (context.authoring) return [{ id: "drawFloor", label: "Draw on floor · 2D" }, { id: "drawSpace", label: "Draw in air · 3D" }, { id: "interactionVoice", label: "Describe intent · hold X" }, { id: "interactionClose", label: "Back" }];
  return [
    { id: "interactionDraft", label: "Draft · Ground sketch" },
    { id: "interactionVoice", label: "Voice · Spoken request" },
    { id: "interactionDemonstration", label: "Video demonstration", disabled: !context.door || context.objectInteraction.ids.length !== 1 || context.objectInteraction.ids[0] !== context.door.id },
    { id: "interactionClose", label: "Back to object controls" }
  ];
}
export {
  createInteractionSession,
  interactionActions,
  objectActions
};
