function createQuestButtons() {
  const held = /* @__PURE__ */ new WeakMap(), buttons = [1, 3, 4, 5];
  return { reset(source) {
    held.delete(source);
  }, sample(source) {
    const pad = source.gamepad;
    if (!pad) return [];
    const previous = held.get(source), next = /* @__PURE__ */ new Map(), events = [];
    for (const index of buttons) {
      const b = pad.buttons[index], was = previous?.get(index) || false;
      const pressed = !!b && (b.pressed || b.value > (was ? 0.35 : 0.65));
      next.set(index, pressed);
      if (previous && was !== pressed) events.push({ hand: source.handedness, index, type: pressed ? "down" : "up" });
    }
    held.set(source, next);
    return events;
  } };
}
function questButtonAction({ hand, index, type }, { showcase = false, authoring = false, phase, editing = false, placing = false, selectingVolume = false, transforming = false, drafting = false, demonstrating = false, blocked = false, scripted = false, menuOpen = false, grabbing = false, confirmReady = false, draftReady = false, voiceState = "idle" } = {}) {
  if (showcase) {
    if (hand === "left" && index === 4 && type === "up") return blocked ? null : "showcaseAdvance";
    if (phase !== "explore") return null;
    if (hand === "right" && index === 5 && type === "down") return blocked ? null : "record";
    if (hand === "right" && index === 1) return type === "up" ? "doorRelease" : blocked ? null : "doorGrab";
    return null;
  }
  if (authoring && voiceState !== "idle") {
    if (hand === "right" && index === 5 && type === "down") return "cancel";
    if (hand === "right" && index === 4 && type === "down") return voiceState === "reviewing" ? "confirm" : null;
    if (hand === "left" && index === 4) return type === "up" ? "voiceRelease" : voiceState === "reviewing" ? "voicePress" : null;
    if (hand === "right" && index === 1 && type === "up") return "productionRelease";
    return null;
  }
  if (authoring && hand === "right" && type === "down") {
    if (index === 5) return "cancel";
    if (index === 4) {
      if (transforming) return "confirm";
      if (selectingVolume || grabbing || demonstrating || blocked && !confirmReady) return null;
      if (placing) return "confirm";
      if (menuOpen) return "menuConfirm";
      if (confirmReady) return "confirm";
      if (drafting) return draftReady ? "draftConfirm" : null;
      return "confirm";
    }
  }
  if (authoring && hand === "left" && index === 5 && type === "down") return "menu";
  if (authoring && transforming) {
    if (hand === "right" && index === 1) return type === "down" ? "productionGrab" : "productionRelease";
    if (hand === "left" && index === 4) return type === "down" ? "voicePress" : "voiceRelease";
    return null;
  }
  if (!authoring && hand === "right" && index === 5 && type === "down") return "record";
  if (hand === "left" && index === 5 && type === "down") return "menu";
  if (!authoring && hand === "right" && index === 4 && type === "down") return "cancel";
  if (hand === "right" && index === 1 && type === "up") return selectingVolume ? "volumeEnd" : "doorRelease";
  if (hand === "left" && index === 4 && type === "up") return demonstrating ? null : "voiceRelease";
  if (demonstrating) return hand === "left" && index === 4 && type === "down" ? "demonstrationToggle" : null;
  if (transforming) return hand === "left" && index === 3 && type === "down" ? "undo" : null;
  if (selectingVolume || placing || grabbing) return null;
  if (authoring && !drafting && !blocked && phase === "explore" && hand === "left" && index === 1 && type === "down") return "transport";
  if (authoring && hand === "left" && index === 4 && type === "down" && ["reference", "explore"].includes(phase)) return "voicePress";
  if (blocked || authoring && menuOpen) return null;
  if (drafting) {
    if (hand === "left" && index === 3 && type === "down") return "draftUndo";
    if (hand === "left" && index === 4 && type === "down") return "voicePress";
    return null;
  }
  if (hand === "left") {
    if (index === 4 && type === "down") return scripted || phase === "explore" ? "voicePress" : null;
    if (index === 3 && type === "down" && phase === "explore" && editing) return "undo";
    if (index === 1 && type === "down" && phase === "explore") return "transport";
  }
  if (hand === "right" && phase === "explore") {
    if (index === 3 && type === "down") return "edit";
    if (index === 1 && type === "down") return editing && !menuOpen ? authoring ? null : "volumeBegin" : !editing && !menuOpen ? "doorGrab" : null;
  }
  return null;
}
export {
  createQuestButtons,
  questButtonAction
};
