import { AUTHORING_PAGES, authoringMenu, authoringParent } from "../../shared/authoring-ui.mjs";
import { uiText } from "../../shared/ui-text.mjs";
function createAuthoringDesktop({ run, onToggle }) {
  const $ = (id) => document.getElementById(id);
  let context = null, page = "main", history = [], detail = "", target = "", replyKey = "", replyOpen = false;
  function buttons(element, entries) {
    element.replaceChildren();
    for (const entry of entries) {
      const button = document.createElement("button");
      button.textContent = entry.label;
      button.dataset.action = entry.id;
      button.disabled = !!entry.disabled;
      button.onclick = () => run(entry.id);
      element.append(button);
    }
  }
  function collapse(value = true) {
    document.body.classList.toggle("tools-collapsed", value);
    $("scene-tools-toggle").textContent = value ? "Tools · Y" : "Close · Y";
    $("scene-tools-toggle").setAttribute("aria-expanded", String(!value));
    if (context) paint();
  }
  function navigate(id) {
    if (context?.phase !== "explore") return false;
    if (AUTHORING_PAGES.includes(id)) {
      if (page !== id) history.push(page);
      page = id;
      detail = "";
      collapse(false);
      return true;
    }
    if (id === "authoringBack") {
      if (!detail) page = history.pop() || authoringParent(page);
      detail = "";
      paint();
      return true;
    }
    if (id === "agentReply") {
      collapse();
      replyOpen = true;
      paint();
      return true;
    }
    const details = { actors: "actors", display: "display", alignmentOptions: "display", authoringHelp: "help", selectionSettings: "selection", videoFiles: "recordings" };
    if (details[id]) {
      detail = details[id];
      collapse(false);
      return true;
    }
    return false;
  }
  function back(submenuOnly = false) {
    if (document.body.classList.contains("tools-collapsed")) return false;
    if (submenuOnly && !detail && page === "global") return false;
    if (detail || page !== "global") navigate("authoringBack");
    else collapse();
    return true;
  }
  function openGlobal() {
    page = "global";
    history = [];
    detail = "";
    collapse(false);
  }
  function openSelection() {
    page = "main";
    history = [];
    detail = "";
    collapse(false);
  }
  function toggle() {
    if (context?.phase === "explore" && (document.body.classList.contains("tools-collapsed") || page !== "global" || detail)) openGlobal();
    else collapse(!document.body.classList.contains("tools-collapsed"));
  }
  function paint() {
    const c = context, model = authoringMenu(c, page), collapsed = document.body.classList.contains("tools-collapsed");
    document.body.dataset.authoringDetail = detail;
    if (model) {
      $("workflow-title").textContent = detail ? { actors: "Motion assets and entrance", display: "Display and alignment", help: "Controls", selection: "Selection and materials", recordings: "Saved recordings" }[detail] : model.title;
      $("workflow-help").textContent = c.objectInteraction?.mode === "draft" ? uiText(c.draft?.message || model.hint) : model.hint;
      buttons($("workflow-actions"), detail ? [{ id: "authoringBack", label: "Back" }] : model.entries);
      $("actor-tools").hidden = detail !== "actors";
      $("actor-tools").open = detail === "actors";
      $("display-settings").hidden = detail !== "display";
      $("display-settings").open = detail === "display";
      $("more-options").hidden = detail !== "help";
      $("more-options").open = detail === "help";
      $("selection-tools").hidden = detail !== "selection";
      $("selection-tools").open = detail === "selection";
      $("object-interaction-panel").hidden = true;
      $("authoring-scene-tools").hidden = true;
    }
    const review = c.voiceDraft, reply = c.recording === "idle" ? c.script?.agentText || "" : "", spoken = c.script?.userText || "";
    if (reply !== replyKey) {
      replyKey = reply;
      replyOpen = !!reply;
    }
    $("agent-conversation").classList.toggle("has-reply", replyOpen && !!reply);
    $("agent-conversation").classList.toggle("agent-active", !!c.job || c.recording !== "idle");
    $("latest-reply").textContent = reply;
    $("voice-transcript").textContent = review ? "Not sent: " + review.text : !reply && spoken && c.recording !== "idle" ? "You: " + spoken : "";
    $("reply-toggle").hidden = !reply;
    $("reply-toggle").textContent = replyOpen ? "Hide reply" : "View reply";
    $("reply-toggle").setAttribute("aria-expanded", String(replyOpen));
    $("voice-talk").hidden = !!review;
    const pending = c.job === "ready" && c.recording === "idle";
    $("agent-preview-actions").hidden = !(review || pending && collapsed);
    buttons($("agent-preview-actions"), review ? [{ id: "voiceConfirm", label: "Send · Enter" }, { id: "voiceRetry", label: "Speak again · X" }, { id: "voiceCancel", label: "Cancel · Esc" }] : pending ? [{ id: "apply", label: "Apply · Enter", disabled: c.applying }, { id: "discard", label: "Discard · Esc", disabled: c.applying }] : []);
    $("agent-suggestions").hidden = !c.suggestions?.length || !collapsed || !!c.job || c.recording !== "idle";
    buttons($("agent-suggestions"), (c.suggestions || []).map((s, i) => ({ id: "suggestion:" + i, label: s.label })));
    $("agent-suggestion-hint").hidden = !c.suggestions?.length || !collapsed;
    $("agent-stage").textContent = review ? "Review speech · Target: " + review.targetLabel : c.job === "running" ? "Agent working · " + (c.agentStage || "Routing task") : pending ? "Preview ready · Confirm to apply" : c.actorName || c.targetName ? `Target: ${c.actorName || c.targetName}` : c.objectSelection?.length ? `${c.objectSelection.length} objects selected` : "Select an object or describe your idea";
    $("authoring-task-hint").hidden = !c.objectInteraction && !c.actorPlacing && !c.production?.dirty;
    $("authoring-task-hint").textContent = review ? "Review speech: Enter Send · X Retry · Esc Cancel" : c.production?.placing || c.actorPlacing ? "Point at ground · Enter Create · Esc Cancel" : c.production?.dirty ? c.production.tool === "transform" ? "WASD Move · Shift + W/S Height · Arrows Rotate · Enter Save · Esc Revert" : "Preview changes · Enter Save · Esc Revert" : c.objectInteraction?.mode === "draft" ? uiText(c.draft?.message || "Drawing") + " · Enter Save · Esc Cancel" : "";
  }
  $("scene-tools-toggle").onclick = () => onToggle ? onToggle() : toggle();
  $("reply-toggle").onclick = () => {
    replyOpen = !replyOpen;
    paint();
  };
  return {
    navigate,
    back,
    collapse,
    toggle,
    openGlobal,
    openSelection,
    snapshot: () => ({ page, detail, collapsed: document.body.classList.contains("tools-collapsed") }),
    update(c) {
      const nextTarget = JSON.stringify([c.phase, c.objectSelection, c.job, c.revision]);
      if (target !== nextTarget) {
        target = nextTarget;
        if (c.phase !== context?.phase || !(page === "global" || history.includes("global"))) {
          page = "main";
          history = [];
          detail = "";
        }
      }
      const startedTool = c.actorPlacing && !context?.actorPlacing || c.objectInteraction?.mode === "draft" && context?.objectInteraction?.mode !== "draft";
      context = c;
      if (startedTool) collapse();
      else paint();
    }
  };
}
export {
  createAuthoringDesktop
};
