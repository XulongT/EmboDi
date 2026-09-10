import { transparencyActions } from "../../shared/scene-appearance.mjs";
import { createUICanvas, createUITexture } from "../ui/ui-resolution.mjs";
import { UI_THEME as T } from "../../shared/ui-theme.mjs";
import { uiText } from "../../shared/ui-text.mjs";
import { AUTHORING_PAGES, authoringMenu, authoringParent } from "../../shared/authoring-ui.mjs";
import { captureActions, captureStatus, recordLabel, captureQuestion } from "../../shared/capture-ui.mjs";
import { presetActions } from "../../shared/preset-sequence.mjs";
import * as THREE from "three";
import { BUILD, PHASES, START_PHASE, mainActions, selectedActorActions, authoringActorActions, authoringSceneActions } from "../../shared/workflow.mjs";
import { STORY_ACTS, storyboardEntry, storyActions } from "../../shared/storyboard.mjs";
import { doorMenuEntry } from "../../shared/doors.mjs";
import { objectActions, interactionActions } from "../../shared/interaction-session.mjs";
function textPlane(text, width, height, button = false, fontSize, primary = false, disabled = false) {
  const logicalWidth = Math.round(width * 1200), logicalHeight = Math.round(height * 1200);
  const canvas = createUICanvas(logicalWidth, logicalHeight), ctx = canvas.getContext("2d");
  const texture = createUITexture(canvas);
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(width, height), new THREE.MeshBasicMaterial({ toneMapped: false, map: texture, transparent: true, depthTest: false, side: THREE.DoubleSide }));
  mesh.renderOrder = 20;
  mesh.userData.paint = (label) => {
    label = mesh.userData.userContent ? String(label ?? "") : uiText(label);
    const paintKey = label + "|" + (mesh.userData.tone || "normal") + "|" + !!mesh.userData.hovered;
    if (mesh.userData.paintKey === paintKey) return;
    mesh.userData.paintKey = paintKey;
    mesh.userData.label = label;
    let size = fontSize ?? (button ? 34 : 30), lines = [], lineHeight, max;
    const wrap = () => {
      ctx.font = `${button ? "500" : "400"} ${size}px -apple-system, BlinkMacSystemFont, sans-serif`;
      lineHeight = size * 1.18;
      max = Math.max(1, Math.floor((logicalHeight - 16) / lineHeight));
      lines = [];
      for (const paragraph of String(label).split("\n")) {
        let line = "";
        for (const word of paragraph.split(/\s+/)) {
          const next = line ? line + " " + word : word;
          if (line && ctx.measureText(next).width > logicalWidth - 26) {
            lines.push(line);
            line = word;
          } else line = next;
          while (ctx.measureText(line).width > logicalWidth - 26 && line.length > 1) {
            let end = line.length - 1;
            while (end > 1 && ctx.measureText(line.slice(0, end)).width > logicalWidth - 26) end--;
            lines.push(line.slice(0, end));
            line = line.slice(end);
          }
        }
        lines.push(line);
      }
    };
    wrap();
    while (lines.length > max && size > (button ? 22 : 18) && !fontSize) {
      size -= 2;
      wrap();
    }
    ctx.clearRect(0, 0, logicalWidth, logicalHeight);
    ctx.fillStyle = button && !mesh.userData.panel ? disabled ? T.control : primary ? mesh.userData.hovered ? T.pressed : T.accent : mesh.userData.hovered ? T.selected : T.control : T.panel;
    ctx.beginPath();
    ctx.roundRect(0, 0, logicalWidth, logicalHeight, 7);
    ctx.fill();
    if (mesh.userData.focused) {
      ctx.strokeStyle = T.accent;
      ctx.lineWidth = 4;
      ctx.stroke();
    }
    if (mesh.userData.tone === "error") {
      ctx.strokeStyle = T.error;
      ctx.lineWidth = 4;
      ctx.stroke();
    }
    ctx.fillStyle = disabled ? T.muted : primary ? T.onAccent : T.text;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    mesh.userData.truncated = lines.length > max;
    mesh.userData.lines = lines.slice(0, max);
    const visible = lines.slice(0, max);
    if (lines.length > max) visible[max - 1] = visible[max - 1].slice(0, -2) + "…";
    visible.forEach((line, i) => {
      const y = logicalHeight / 2 + (i - (visible.length - 1) / 2) * lineHeight;
      if (line.startsWith("●")) {
        const x = (logicalWidth - ctx.measureText(line).width) / 2;
        ctx.textAlign = "left";
        ctx.fillStyle = T.error;
        ctx.fillText("●", x, y);
        ctx.fillStyle = T.text;
        ctx.fillText(line.slice(1), x + ctx.measureText("●").width, y);
        ctx.textAlign = "center";
      } else ctx.fillText(line, logicalWidth / 2, y);
    });
    texture.needsUpdate = true;
  };
  mesh.userData.setHovered = (value) => {
    if (disabled || mesh.userData.hovered === value) return;
    mesh.userData.hovered = value;
    mesh.userData.paint(mesh.userData.label);
  };
  mesh.userData.paint(text);
  return mesh;
}
function createXRStudio({ actions, getDraft, setDraft }) {
  const group = new THREE.Group(), menu = new THREE.Group(), gallery = new THREE.Group();
  group.visible = false;
  group.add(menu, gallery);
  const blocker = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ toneMapped: false, transparent: true, opacity: 0, depthWrite: false, colorWrite: false, side: THREE.DoubleSide }));
  group.add(blocker);
  let context = { phase: START_PHASE }, page = "main", library = [], reference = null, libraryPage = 0, menuButtons = [], galleryButtons = [], lastContext = "", messageText = "Hold X to speak to the agent.", imageVersion = 0;
  let focusedKey = null, history = [];
  let roomLive = false, roomPhoto = null, liveTexture = null, roomPhotoTexture = null, roomPhotoVersion = 0;
  const addButton = (parent, list, label, x, y, width, fn, disabled = false, primary = false) => {
    const mesh = textPlane(label, width, 0.085, true, void 0, primary, disabled);
    mesh.position.set(x, y, 5e-3);
    mesh.userData.disabled = disabled;
    mesh.userData.action = disabled ? () => {
    } : fn;
    parent.add(mesh);
    list.push(mesh);
    return mesh;
  };
  const header = textPlane("", 0.7, 0.085);
  header.position.y = 0.32;
  group.add(header);
  const message = textPlane(messageText, 0.7, 0.12);
  message.position.y = 0.19;
  group.add(message);
  const draft = textPlane("", 0.7, 0.075);
  draft.position.y = 0.085;
  group.add(draft);
  const photo = new THREE.Mesh(new THREE.PlaneGeometry(0.62, 0.29), new THREE.MeshBasicMaterial({ toneMapped: false, color: "#ffffff", depthTest: false }));
  photo.position.set(0, 0.2, 2e-3);
  photo.renderOrder = 21;
  photo.visible = false;
  group.add(photo);
  const countdown = textPlane("", 0.22, 0.22, false, 150);
  countdown.position.set(0, 0.2, 3e-3);
  countdown.visible = false;
  group.add(countdown);
  const status = textPlane("", 0.7, 0.065, false, 21);
  status.position.y = -0.38;
  group.add(status);
  const disposeChildren = (parent) => {
    for (const child of [...parent.children]) {
      parent.remove(child);
      child.geometry?.dispose();
      child.material?.map?.dispose();
      child.material?.dispose();
    }
  };
  function show(next, { remember = false } = {}) {
    if (context.authoring) {
      if (remember && page !== next) history.push(page);
      else if (!remember) history = [];
    }
    page = next;
    focusedKey = null;
    rebuild();
  }
  function back() {
    if (context.authoring) {
      if (page === "interaction" || page === "global") return false;
      page = history.pop() || authoringParent(page);
      focusedKey = null;
      rebuild();
      return true;
    }
    if (page !== "main") {
      show(page === "storyAct" ? "storyboard" : "main");
      return true;
    }
    return false;
  }
  function command(id) {
    if (id.startsWith("cinema")) {
      actions.cinema?.(id);
      return;
    }
    if (context.authoring) {
      if (AUTHORING_PAGES.includes(id)) {
        show(id, { remember: true });
        return;
      }
      if (id === "authoringBack") {
        back();
        return;
      }
      if (id === "agentReply") {
        group.visible = false;
        showDialogue();
        return;
      }
      if (id.startsWith("suggestion:")) {
        group.visible = false;
        actions.suggestion?.(Number(id.slice(11)));
        return;
      }
      if (id === "authoringHelp") {
        show("help");
        return;
      }
      if (id === "videoFiles") {
        actions.videoFiles?.();
        return;
      }
      if (id === "selectionSettings") {
        actions.edit?.();
        group.visible = false;
        return;
      }
    }
    if (["drawFloor", "drawSpace", "regionDraft"].includes(id)) {
      actions[id]?.();
      show("interaction");
      return;
    }
    if (["actorAgent", "voice"].includes(id)) {
      group.visible = false;
      actions[id]?.();
      return;
    }
    if (id === "objectInteraction") {
      actions[id]?.();
      show("interaction");
      return;
    }
    if (["interactionClose", "draftCancel", "objectTransform", "interactionVoice"].includes(id)) {
      actions[id]?.();
      show("main");
      return;
    }
    if (/^storyAct[1-4]$/.test(id)) {
      actions[id]?.();
      show("storyAct");
      return;
    }
    if (["more", "library", "actors", "display", "bodySize", "alignmentOptions", "help", "actorMore", "advanced", "storyboard", "doors", "sceneTools"].includes(id)) {
      if (id === "storyboard") actions.storyRefresh?.();
      show(id);
      return;
    }
    if (id === "back") {
      show(page === "storyAct" ? "storyboard" : "main");
      return;
    }
    actions[id]?.();
    if (["camera", "switchCamera", "actorPlace", "resume", "overview"].includes(id)) show("main");
  }
  function rebuild() {
    status.userData.tone = context.script?.error || context.videoState === "error" || context.captureState === "error" || context.demonstration?.state === "error" ? "error" : "normal";
    disposeChildren(menu);
    menuButtons = [];
    gallery.visible = page === "library";
    const compact = authoringMenu(context, page);
    if (compact) {
      gallery.visible = photo.visible = countdown.visible = draft.visible = false;
      header.visible = true;
      header.scale.set(0.84, 1, 1);
      header.position.y = 0.17;
      header.userData.paint(compact.title);
      message.visible = false;
      compact.entries.forEach((entry, i) => {
        const b = addButton(menu, menuButtons, entry.label, 0, 0.055 - i * 0.092, 0.58, () => command(entry.id), entry.disabled);
        b.userData.actionId = entry.id;
        if (entry.id.startsWith("suggestion:")) {
          b.userData.userContent = true;
          b.userData.paint(entry.label);
        }
        if (entry.id.startsWith("suggestion:")) {
          b.userData.userContent = true;
          b.userData.paint(entry.label);
        }
      });
      status.visible = true;
      status.scale.set(0.84, 1.3, 1);
      status.position.y = 0.055 - compact.entries.length * 0.092 - 0.03;
      status.userData.paint(page === "main" && !context.job && context.recording === "idle" ? `Right stick: select · A Confirm · B Back
X Voice · Y Global menu` : compact.hint);
      focusButtons();
      return;
    }
    header.scale.set(1, 1, 1);
    status.scale.set(1, 1, 1);
    if (context.captureUI) {
      gallery.visible = false;
      countdown.visible = false;
      draft.visible = !!context.describing;
      draft.userData.paint(getDraft());
      draft.position.y = 0.32;
      const capture2 = context.phase === "reference";
      photo.visible = capture2 && (roomLive || !!roomPhoto) && context.captureState !== "error";
      header.visible = true;
      header.position.y = photo.visible ? 0.405 : 0.2;
      const selected = context.objectSelection?.length || 0;
      header.userData.paint(captureQuestion(context) || PHASES[context.phase]);
      message.visible = false;
      let entries2 = captureActions(context);
      if (page === "alignmentOptions") entries2 = [{ id: "refreshAlignment", label: "Read scan again" }, { id: "manualAlignment", label: "Mark corners manually" }, { id: "rotateRoom", label: "Rotate 90°", disabled: !context.calibrationReady }, { id: "back", label: "Back" }];
      const top2 = photo.visible ? -0.07 : 0.08;
      entries2.forEach((entry, i) => addButton(menu, menuButtons, entry.label, 0, top2 - i * 0.095, 0.62, () => command(entry.id), entry.disabled, i === 0 && !entry.disabled));
      status.visible = true;
      status.position.y = top2 - entries2.length * 0.095 - 0.01;
      status.userData.paint(context.phase === "calibrate" ? context.calibrationHint : captureStatus(context));
      const bottom2 = status.position.y - 0.07;
      blocker.scale.set(0.72, 0.48 - bottom2, 1);
      blocker.position.set(0, (0.48 + bottom2) / 2, -5e-3);
      return;
    }
    const main = page === "main", mini = main && ["overview", "preview", "entry", "entering"].includes(context.phase), capture = main && context.phase === "reference";
    photo.visible = capture && (context.roomMode ? (roomLive || !!roomPhoto) && context.captureState !== "error" : !!reference);
    countdown.visible = main && context.phase === "entering";
    countdown.userData.paint(context.demoTracking ? "…" : String(context.demoSeconds ?? 3));
    header.visible = !mini;
    header.position.y = capture ? 0.405 : 0.32;
    const act = context.storyboard?.acts.find((a) => a.id === context.storyActId);
    header.userData.paint(main ? context.roomMode && capture ? "Capture room" : PHASES[context.phase] : { storyboard: "Part 1 · Four-act archive", storyAct: act?.name || "Act archive", doors: "Blockout door · Opening settings", more: "Capture options", library: "Choose reference", sceneTools: "Scene tools · " + BUILD, actors: "Current actor", actorMore: "Actor options", display: "Display and alignment", bodySize: "Hand and arm size", alignmentOptions: "Adjust alignment", advanced: "Other actions", help: "Controller help" }[page]);
    message.visible = !mini && !photo.visible && !countdown.visible && page !== "library";
    message.position.y = capture ? 0.24 : 0.19;
    draft.visible = capture;
    if (main) {
      const words = { welcome: context.hasScene ? "Continue the saved layout or start with a new room." : "Capture a real space and build an editable blockout.", reference: context.scanBased ? "Build an editable blockout from the scan and reference photos." : context.cameraMessage || "Open the camera and capture at least four views.", building: context.scanBased ? "Resolving overlaps and connections into separate objects…" : `Building a rough scene from ${context.photoCount || 0} photos…`, preview: "Review the layout, then apply it to enter.", align: context.calibrationReady ? "L stick: Offset · L grip + stick: Height\nAdjust alignment → Rotate 90° · A Save" : "Waiting for a room scan. Use manual corner alignment if needed.", calibrate: context.calibrationHint, explore: context.actorPlacing ? "Point at the floor · Right trigger to place · A to cancel" : context.videoState === "recording" ? `Recording · ${context.videoSeconds} s` : context.latestReply || context.objectInfo || messageText };
      message.userData.paint(words[context.phase] || "Enter the world to start creating.");
      draft.userData.paint(capture ? context.roomMode ? context.captureTip : reference?.title || "Choose a reference image" : getDraft());
    } else if (page === "actors") {
      message.userData.paint(`${context.actorName || "Select an actor"} · Appears after ${context.actorDelay || 0} s
${context.actorMessage || ""}`);
    } else if (page === "actorMore") message.userData.paint(`Group style: ${context.actorStyle === "cute" ? "Playful" : "Zombie"}
Changing style restarts playback · Left grip to pause`);
    else if (page === "display") message.userData.paint(`Scene transparency: ${Math.round((1 - (context.roomOpacity ?? 0.5)) * 100)}%
${context.alignedMode ? "Physical movement 1:1" : "Align the room to film through physical movement"}`);
    else if (page === "alignmentOptions") message.userData.paint("L stick: Offset · L grip + stick: Height\nRotate 90° to match the walls · A Save");
    else if (page === "bodySize") message.userData.paint(`Hands ${Math.round((context.handSize || 1) * 100)}% · Arms ${Math.round((context.armSize || 1) * 100)}%
Grip tilt ${context.gripTilt ?? 45}° · Saved in this browser`);
    else if (page === "advanced") message.userData.paint("Voice, controls and exit XR.");
    else if (page === "help") message.userData.paint("A: cancel / back · Left grip: preview / pause\nB: record · Hold X: speak · Y: menu");
    else if (page === "more") message.userData.paint("Photo list lasts for this session. Resume creating to return to your scene.");
    else if (page === "storyboard") message.userData.paint("Act 1 stays locked. Later acts save independently.\nChoose an act to save or load.");
    else if (page === "storyAct") message.userData.paint(`${act?.saved ? `${act.actors} actors · Archive version ${act.versions}` : "This act has not been saved"}
${act?.hint || ""}`);
    else if (page === "doors") message.userData.paint(context.door?.cast ? `${context.door.cast.actorIds.length} actors armed · Door trigger
Exit edit mode, hide the menu with Y, then touch the door.` : `${context.door?.name || "Select a door"} · Use door controls to preview
Configure the five-actor cast from here.`);
    if (page === "interaction") {
      header.userData.paint(context.objectInteraction?.mode === "draft" ? "Draft · Ground sketch" : "Interaction · Set behavior");
      message.userData.paint(context.objectInteraction?.mode === "draft" ? `${context.draft?.message || ""}
${context.objectInteraction.ids.length} targets · ${(context.draft?.length || 0).toFixed(2)} m · Not applied` : "Targets locked\nChoose how to describe the interaction");
    }
    const spatialBusy = context.job || context.saving || context.finishing || ["recording", "saving"].includes(context.videoState);
    let entries = page === "interaction" ? interactionActions(context) : main ? mainActions(context) : page === "storyboard" ? [
      ...STORY_ACTS.map((a, i) => ({ id: `storyAct${i + 1}`, label: a.name + (context.storyboard?.acts.find((x) => x.id === a.id)?.saved ? " · Saved" : " · Not yet created") })),
      { id: "back", label: "Back to creating" }
    ] : page === "storyAct" ? [
      ...storyActions(context),
      { id: "back", label: "Back to acts" }
    ] : page === "doors" ? [
      { id: "doorToggle", label: context.door?.effect?.open ? "Close blockout door" : "Open blockout door", disabled: !context.door || context.editingBusy || context.phase !== "explore" },
      { id: "doorHinge", label: `Hinge: ${context.door?.effect?.hinge === "right" ? "Right" : "Left"}`, disabled: !context.door || context.editingBusy || context.phase !== "explore" },
      { id: "doorDirection", label: "Change opening direction", disabled: !context.door || context.editingBusy || context.phase !== "explore" },
      { id: context.door?.cast ? "doorCastReset" : "doorCastConfigure", label: context.door?.cast ? "Close and reset" : "Set up five-actor performance", disabled: !context.door || !!spatialBusy || context.editingBusy || context.phase !== "explore" },
      { id: "back", label: "Back to creating" }
    ] : page === "display" ? [
      ...transparencyActions(context.roomOpacity),
      { id: "align", label: "Check alignment again", disabled: !!spatialBusy },
      { id: "bodySize", label: "Hand and arm size" },
      { id: "advanced", label: "Other actions" },
      { id: "back", label: "Back" }
    ] : page === "bodySize" ? [
      { id: "handSmaller", label: "Hands −5%", disabled: !!spatialBusy || context.handSize <= 0.7 },
      { id: "handLarger", label: "Hands +5%", disabled: !!spatialBusy || context.handSize >= 1.3 },
      { id: "armShorter", label: "Arms −5%", disabled: !!spatialBusy || context.armSize <= 0.8 },
      { id: "armLonger", label: "Arms +5%", disabled: !!spatialBusy || context.armSize >= 1.2 },
      { id: "gripTiltDown", label: "Grip tilt −10°", disabled: !!spatialBusy || context.gripTilt <= 0 },
      { id: "gripTiltUp", label: "Grip tilt +10°", disabled: !!spatialBusy || context.gripTilt >= 90 },
      { id: "bodyReset", label: "Reset hand fit", disabled: !!spatialBusy },
      { id: "back", label: "Back" }
    ] : page === "alignmentOptions" ? [
      { id: "rotateRoom", label: "Rotate 90°", disabled: !context.calibrationReady },
      { id: "refreshAlignment", label: "Read scan again" },
      { id: "manualAlignment", label: "Mark corners manually" },
      { id: "back", label: "Back to alignment preview" }
    ] : page === "advanced" ? [
      { id: "voice", label: "Voice chat · X", disabled: context.phase !== "explore" },
      { id: "help", label: "Controller help" },
      { id: "roomScan", label: "System room scan", disabled: !!spatialBusy },
      { id: "end", label: "Exit immersive mode", disabled: !!spatialBusy },
      { id: "back", label: "Back" }
    ] : page === "help" ? [
      { id: "voice", label: "Voice chat · X", disabled: context.phase !== "explore" },
      { id: "back", label: "Back" }
    ] : page === "actors" ? [
      { id: "actorAssign", label: "Next motion", disabled: !context.actorSelected || !!context.job },
      { id: "actorDelayDown", label: "0.5 s earlier", disabled: !context.actorSelected || !!context.job },
      { id: "actorDelayUp", label: "0.5 s later", disabled: !context.actorSelected || !!context.job },
      { id: "actorMore", label: "More actor controls" },
      { id: "back", label: "Back" }
    ] : page === "actorMore" ? [
      { id: "cuteStyle", label: "Group → Playful motions", disabled: !context.actorCount || !!context.job },
      { id: "zombieStyle", label: "Group → Zombie motions", disabled: !context.actorCount || !!context.job },
      { id: "actorStart", label: "Replay from start", disabled: !context.actorCount || !!context.job },
      { id: "actorEdit", label: "Reset to T-Pose", disabled: !context.actorCount || !!context.job },
      { id: "actorClearMotion", label: "Clear motion", disabled: !context.actorSelected || !!context.job },
      { id: "back", label: "Back" }
    ] : page === "more" ? [
      { id: "removePhoto", label: "Undo last photo", disabled: !context.photoCount || context.photoReading },
      { id: "switchCamera", label: "Switch environment camera", disabled: context.cameraDevices < 2 || context.captureState === "starting" },
      { id: "resume", label: "Back to saved scene", disabled: !context.hasScene },
      { id: "back", label: "Back to capture" }
    ] : [{ id: "previous", label: "Previous page", disabled: libraryPage === 0 }, { id: "next", label: "Next page", disabled: (libraryPage + 1) * 3 >= library.length }, { id: "back", label: "Back" }];
    if (!context.roomMode && page === "more") entries = [{ id: "save", label: "Save scene" }, { id: "voice", label: "Voice chat · X", disabled: context.phase !== "explore" }, { id: "newWorld", label: context.demoMode ? "Replay demo" : "Build a world from images" }, { id: "resume", label: "Continue saved scene" }, { id: "end", label: "End immersive session" }, { id: "back", label: "Back" }];
    if (main && !context.roomMode && context.phase === "reference") header.userData.paint("Choose reference");
    if (main) {
      const preset = presetActions(context);
      if (preset.length) {
        entries = [...preset, ...objectActions(context)];
        message.userData.paint(context.preset.message);
      } else entries.push(...objectActions(context), ...storyboardEntry(context), ...selectedActorActions(context), ...doorMenuEntry(context));
    }
    if (context.authoring && page === "actors") entries = [{ id: "actorAssign", label: "Next motion asset", disabled: !context.actorSelected }, { id: "actorDelayDown", label: "0.5 s earlier", disabled: !context.actorSelected }, { id: "actorDelayUp", label: "0.5 s later", disabled: !context.actorSelected }, { id: "authoringBack", label: "Back" }];
    if (context.authoring && page === "sceneTools") entries = [...authoringSceneActions(context), { id: "actors", label: context.actorName || "Actor menu", disabled: !context.actorSelected }];
    if (context.authoring && page === "interaction" && context.objectInteraction?.mode === "draft") {
      header.userData.paint(context.draft?.kind === "regions" ? "Door interaction · Closed regions" : context.draft?.mode === "space3d" ? "3D · Spatial curve" : "2D · Ground curve");
      message.userData.paint((context.draft?.kind === "regions" || context.draft?.smoothingFallback ? context.draft.message : context.draft?.mode === "space3d" ? "Tip distance " + context.draft.depth.toFixed(1) + " m · Move your right hand to draw" : "Point at ground to draw") + "\nY Hide menu to draw / Show menu to save");
    }
    if (context.authoring) entries = entries.filter((e) => !["cuteStyle", "zombieStyle", "doorCastConfigure", "doorCastReset"].includes(e.id));
    const single = main && !mini && !capture && entries.length <= 4;
    const top = mini ? 0 : capture ? -0.11 : 0.045;
    entries.forEach((entry, i) => addButton(menu, menuButtons, entry.label, single ? 0 : i % 2 * 0.365 - 0.1825, top - (single ? i : Math.floor(i / 2)) * 0.1, single ? 0.7 : 0.34, () => entry.id === "previous" ? buildGallery(--libraryPage) : entry.id === "next" ? buildGallery(++libraryPage) : command(entry.id), entry.disabled, i === 0 && page === "main" && !entry.disabled));
    status.position.y = top - (single ? entries.length : Math.ceil(entries.length / 2)) * 0.1 - 0.012;
    status.visible = !mini;
    const bottom = Math.min(-0.1, status.position.y - 0.085);
    blocker.scale.set(0.78, 0.45 - bottom, 1);
    blocker.position.set(0, (0.45 + bottom) / 2, -5e-3);
    status.userData.paint(page === "help" ? "Right stick click: edit · Select, then hold trigger to move\nWhile dragging, stick turns / raises · Left stick: undo · Right grip: box-select" : context.videoState === "saving" ? context.videoMessage : capture ? `${context.photoCount || 0} photos · Minimum 4 · Right trigger to capture` : context.authoring ? "X Voice · Y Hide / Show menu" : "Y: hide · Press again to place the menu in front of you");
    if (page === "help") {
      status.scale.y = 2.1;
      status.position.y -= 0.03;
    } else status.scale.y = 1;
    if (context.authoring) {
      if (page === "help") message.userData.paint(`A Confirm · B Cancel / Back
X Voice · Y Menu · Left grip: play / pause`);
      focusButtons();
    }
  }
  function focusButtons() {
    const enabled = menuButtons.filter((b) => !b.userData.disabled), key = (b) => b.userData.actionId || b.userData.label;
    if (!enabled.some((b) => key(b) === focusedKey)) focusedKey = enabled[0] ? key(enabled[0]) : null;
    for (const b of menuButtons) {
      b.userData.focused = key(b) === focusedKey;
      b.userData.paint(b.userData.label);
    }
  }
  function moveFocus(step) {
    if (!group.visible || !context.authoring) return;
    const enabled = menuButtons.filter((b) => !b.userData.disabled), key = (b) => b.userData.actionId || b.userData.label;
    if (!enabled.length) return;
    const index = enabled.findIndex((b) => key(b) === focusedKey);
    focusedKey = key(enabled[(Math.max(0, index) + step + enabled.length) % enabled.length]);
    focusButtons();
  }
  function confirmFocused() {
    if (!group.visible || !context.authoring) return;
    const b = menuButtons.find((b2) => !b2.userData.disabled && (b2.userData.actionId || b2.userData.label) === focusedKey);
    b?.userData.action();
  }
  function setRoomCamera(video, active, lastPhoto) {
    roomLive = active;
    if (active && !liveTexture) {
      liveTexture = new THREE.VideoTexture(video);
      liveTexture.colorSpace = THREE.SRGBColorSpace;
    }
    const changed = roomPhoto?.id !== lastPhoto?.id;
    roomPhoto = lastPhoto || null;
    if (changed) {
      const version = ++roomPhotoVersion;
      roomPhotoTexture?.dispose();
      roomPhotoTexture = null;
      if (lastPhoto) new THREE.TextureLoader().load(lastPhoto.image, (texture) => {
        if (version !== roomPhotoVersion) {
          texture.dispose();
          return;
        }
        texture.colorSpace = THREE.SRGBColorSpace;
        roomPhotoTexture = texture;
        if (!roomLive) {
          photo.material.map = texture;
          photo.material.needsUpdate = true;
        }
      });
    }
    photo.material.map = active ? liveTexture : roomPhotoTexture;
    photo.material.needsUpdate = true;
    const width = active ? video.videoWidth : lastPhoto?.width, height = active ? video.videoHeight : lastPhoto?.height;
    const aspect = width && height ? width / height : 4 / 3, h = Math.min(0.29, 0.62 / aspect);
    photo.scale.set(h * aspect / 0.62, h / 0.29, 1);
    rebuild();
  }
  function buildGallery(index = 0) {
    libraryPage = index;
    disposeChildren(gallery);
    galleryButtons = [];
    for (const [i, item] of library.slice(index * 3, index * 3 + 3).entries()) {
      const x = (i - 1) * 0.23, choose = () => {
        actions.reference(item.id);
        show("main");
      };
      addButton(gallery, galleryButtons, item.title, x, 0.035, 0.215, choose);
      const frame = new THREE.Mesh(new THREE.PlaneGeometry(0.226, 0.171), new THREE.MeshBasicMaterial({ toneMapped: false, color: reference?.id === item.id ? T.accent : T.border, depthTest: false }));
      frame.position.set(x, 0.185, 3e-3);
      frame.renderOrder = 20;
      frame.userData.referenceId = item.id;
      gallery.add(frame);
      const card = new THREE.Mesh(new THREE.PlaneGeometry(0.215, 0.16), new THREE.MeshBasicMaterial({ toneMapped: false, color: T.control, depthTest: false }));
      card.position.set(x, 0.185, 5e-3);
      card.renderOrder = 21;
      card.userData.action = choose;
      gallery.add(card);
      galleryButtons.push(card);
      new THREE.TextureLoader().load(item.url, (texture) => {
        if (!card.parent) {
          texture.dispose();
          return;
        }
        texture.colorSpace = THREE.SRGBColorSpace;
        card.material.map = texture;
        card.material.color.set("#ffffff");
        card.material.needsUpdate = true;
      });
    }
    rebuild();
  }
  const visible = (o) => {
    for (let p = o; p; p = p.parent) if (!p.visible) return false;
    return true;
  };
  const notice = new THREE.Group();
  notice.position.set(0, -0.27, -0.9);
  notice.visible = false;
  const noticeButtons = [];
  const noticeText = addButton(notice, noticeButtons, "", 0, 0, 0.72, () => {
    if (context.videoState === "recording" || context.videoRetry) actions.record?.();
  });
  noticeText.userData.panel = true;
  noticeText.scale.setScalar(0.72);
  let noticeUntil = 0, noticeMessage = "";
  const dialogue = new THREE.Group();
  dialogue.position.set(0, -0.3, -1.15);
  dialogue.visible = false;
  const dialogueText = textPlane("", 0.72, 0.15, false, 25);
  dialogueText.userData.userContent = true;
  dialogue.add(dialogueText);
  const dialogueStatus = textPlane("", 0.72, 0.055, false, 22);
  dialogueStatus.position.y = -0.11;
  dialogue.add(dialogueStatus);
  const dialogueButtons = [];
  const cancelButton = addButton(dialogue, dialogueButtons, "Cancel", 0, -0.19, 0.22, () => context.demonstration?.state === "recording" ? actions.demonstrationStop?.() : context.script?.busy || context.localPreparing ? actions.scriptCancel?.() : actions.scriptStop?.());
  let dialogueDismissed = false, replyUntil = 0, lastSpoken = "", lastReply = "", lastRecording = "idle", lastJob = null, lastRequesting = false;
  function rememberDialogue() {
    lastSpoken = context.script?.userText || "";
    lastReply = context.script?.agentText || "";
    lastRecording = context.recording;
    lastJob = context.job;
    lastRequesting = !!context.production?.requesting;
  }
  function dismissDialogue() {
    if (context.voiceDraft) return false;
    const wasVisible = dialogue.visible;
    dialogueDismissed = true;
    dialogue.visible = false;
    noticeUntil = 0;
    rememberDialogue();
    return wasVisible;
  }
  function showDialogue() {
    dialogueDismissed = false;
    replyUntil = performance.now() + 5e3;
  }
  const applyButton = addButton(dialogue, dialogueButtons, "Apply", -0.24, -0.19, 0.22, () => actions.apply?.());
  const discardButton = addButton(dialogue, dialogueButtons, "Discard", 0, -0.19, 0.22, () => actions.discard?.());
  const hideButton = addButton(dialogue, dialogueButtons, "Hide dialogue", 0.24, -0.19, 0.22, dismissDialogue);
  function updateCapture(xr) {
    if (context.authoring) {
      const reviewing = context.voiceDraft, voiceActive = context.recording && context.recording !== "idle";
      if (voiceActive) {
        dialogue.position.set(0, 0, -1.45);
        dialogue.scale.setScalar(0.78);
        dialogue.visible = !!xr;
        dialogueDismissed = false;
        for (const child of dialogue.children) if (child.material) child.material.opacity = 1;
        dialogueText.visible = true;
        dialogueText.userData.paint(reviewing ? `Not sent · ${(reviewing.targetLabel || "Current scene").slice(0, 16)} · ${reviewing.page + 1}/${reviewing.pages}
${reviewing.pageText}` : context.recording === "recording" ? "Listening…" : "Transcribing…");
        dialogueStatus.userData.paint(reviewing ? "A Send · X Retry · B Cancel" + (reviewing.pages > 1 ? " · Right stick: pages" : "") : context.autoVoice ? "Review after speaking · B Cancel" : "Release X to review · B Cancel");
        cancelButton.visible = false;
        applyButton.visible = discardButton.visible = !!reviewing;
        hideButton.visible = true;
        applyButton.userData.paint("A Send");
        applyButton.userData.action = () => actions.voiceConfirm?.();
        discardButton.userData.paint("X Retry");
        discardButton.userData.action = () => actions.voiceRetry?.();
        hideButton.userData.paint("B Cancel");
        hideButton.userData.action = () => actions.voiceCancel?.();
        rememberDialogue();
        return;
      }
      applyButton.userData.paint("Apply");
      applyButton.userData.action = () => actions.apply?.();
      discardButton.userData.paint("Discard");
      discardButton.userData.action = () => actions.discard?.();
      hideButton.userData.paint("Hide dialogue");
      hideButton.userData.action = dismissDialogue;
      const userText = context.script?.userText || "", reply = context.script?.agentText || "";
      if (userText && userText !== lastSpoken || reply && reply !== lastReply || context.recording === "recording" && lastRecording !== "recording" || context.job === "ready" && lastJob !== "ready" || context.production?.requesting && !lastRequesting) showDialogue();
      rememberDialogue();
      const toolActive = context.actorPlacing || context.draft?.active || context.objectInteraction?.mode === "draft" || context.production?.placing || ["transform", "curve"].includes(context.production?.tool);
      if (toolActive) dialogueDismissed = true;
      const spoken = context.script?.agentText || context.script?.userText && "You: " + context.script.userText || "";
      dialogue.position.set(0, 0, -1.45);
      dialogue.scale.setScalar(0.78);
      const remaining = replyUntil - performance.now();
      dialogue.visible = !!xr && !dialogueDismissed && remaining > 0;
      for (const child of dialogue.children) if (child.material) child.material.opacity = Math.min(1, Math.max(0, remaining / 400));
      dialogueText.visible = true;
      dialogueText.userData.paint(spoken || "Hold X to speak, release to review");
      dialogueStatus.userData.paint(context.recording === "recording" ? context.autoVoice ? "Listening · Review after speaking · B Cancel" : "Listening · Release X to review" : context.recording === "transcribing" ? "Transcribing" : context.recording === "requesting" ? "Waiting for microphone" : context.job === "ready" ? "A Apply · B Discard · X Voice" : context.job === "running" ? "Agent working · " + (context.agentStage || "Routing task") : context.suggestions?.length ? "Y → Agent suggestions" : "X Voice · Y → View Agent reply");
      cancelButton.visible = context.job === "running";
      cancelButton.userData.action = () => actions.cancel?.();
      cancelButton.userData.paint("Stop");
      applyButton.visible = discardButton.visible = context.job === "ready" && !group.visible;
      hideButton.visible = true;
      cancelButton.visible = context.job === "running" && !group.visible;
      return;
    }
    applyButton.visible = discardButton.visible = hideButton.visible = false;
    const active = ["recording", "saving", "error"].includes(context.demonstration?.state) || context.localPreparing || !!context.script?.userText || !!context.script?.error || context.script?.busy || context.script?.status === "unconfigured";
    dialogue.visible = !!xr && !!context.captureUI && active && !group.visible;
    dialogueText.userData.paint([context.script?.userText && "You: " + context.script.userText, context.script?.agentText && "Agent: " + context.script.agentText].filter(Boolean).join("\n"));
    dialogueText.visible = !!context.script?.userText;
    dialogueStatus.userData.tone = status.userData.tone;
    dialogueStatus.userData.paint(captureStatus(context));
    cancelButton.visible = context.demonstration?.state === "recording" || !!context.localPreparing || !!context.script?.busy || context.performanceMode === "running";
    cancelButton.userData.paint(context.demonstration?.state === "recording" ? "Stop demonstration" : context.script?.busy || context.localPreparing ? "Cancel" : "Stop");
    if (context.captureUI && group.visible) {
      message.visible = !!context.script?.userText;
      message.position.set(0, header.position.y + 0.14, 0);
      message.userData.paint([context.script?.userText, context.script?.agentText].filter(Boolean).join("\n"));
    }
  }
  rebuild();
  return { group, notice, dialogue, dismissDialogue, showDialogue, moveFocus, confirmFocused, back, openGlobal() {
    show("global");
  }, openSelection() {
    show("main");
  }, setHovered(objects) {
    const hits = new Set(objects);
    for (const button of [...menuButtons, ...galleryButtons, ...noticeButtons, ...dialogueButtons]) button.userData.setHovered?.(hits.has(button));
  }, blocks: (raycaster) => !context.authoring && !context.suppressUI && visible(blocker) && raycaster.intersectObject(blocker, false).length > 0, snapshot: () => ({ page, focused: focusedKey, buttons: menuButtons.map((b) => b.userData.label), noticeVisible: notice.visible, dialogueVisible: dialogue.visible, dialogueDismissed, voiceReview: context.voiceDraft || null, dialogueTruncated: dialogueText.userData.truncated, dialoguePosition: dialogue.position.toArray(), noticePosition: notice.position.toArray(), captureUI: !!context.captureUI, status: status.userData.label, dialogue: dialogueText.userData.label }), updateNotice(xr) {
    if (context.suppressUI) {
      group.visible = notice.visible = dialogue.visible = false;
      return;
    }
    updateCapture(xr);
    const persistent = ["recording", "saving"].includes(context.videoState) || context.videoRetry;
    notice.visible = !!xr && (persistent || !group.visible && performance.now() < noticeUntil);
    if (context.authoring) notice.position.set(0, dialogue.visible ? -0.25 : 0, -1.45);
    else notice.position.set(0, context.captureUI ? 0.36 : group.visible ? 0.38 : -0.27, -0.9);
    noticeText.userData.tone = context.videoState === "error" ? "error" : "normal";
    if (notice.visible) noticeText.userData.paint(context.captureUI && persistent ? recordLabel(context) : persistent ? context.videoState === "recording" ? context.authoring ? `● ${context.videoSeconds} s · Click to stop recording` : `● ${context.videoSeconds} s · B / click to stop recording` : context.videoState === "saving" ? context.videoMessage || "Saving recording…" : "Video unsaved · B / click to retry" : noticeMessage);
  }, setRoomCamera, hit(raycaster) {
    if (context.suppressUI) return null;
    return raycaster.intersectObjects([...menuButtons, ...galleryButtons, ...noticeButtons.filter(() => context.videoState === "recording" || context.videoRetry), ...dialogueButtons].filter(visible), false)[0];
  }, setStatus: (text) => {
    status.userData.paint(text);
    noticeMessage = text;
    noticeUntil = performance.now() + 4500;
  }, setContext(next) {
    const key = JSON.stringify(next);
    if (key === lastContext) return;
    const old = context;
    lastContext = key;
    context = next;
    if (next.suppressUI) {
      group.visible = notice.visible = dialogue.visible = false;
      return;
    }
    const globalContext = next.authoring && (page === "global" || history.includes("global"));
    if (old.phase !== next.phase || !globalContext && (old.job !== next.job || next.authoring && JSON.stringify(old.objectSelection) !== JSON.stringify(next.objectSelection)) || page === "actors" && !next.actorSelected || page === "interaction" && !next.objectInteraction) {
      page = "main";
      history = [];
    }
    if (next.authoring && !globalContext && next.actorSelected && next.actorSelected !== old.actorSelected && !next.job && !next.objectInteraction) {
      page = "main";
      history = [];
    }
    if (next.authoring && next.objectInteraction?.mode === "draft" && page !== "brushSettings") page = "interaction";
    rebuild();
  }, setLibrary(items) {
    library = items;
    buildGallery();
  }, setReference(item) {
    reference = item;
    for (const child of gallery.children) if (child.userData.referenceId) child.material.color.set(child.userData.referenceId === item?.id ? T.accent : T.border);
    const version = ++imageVersion;
    if (item?.url) new THREE.TextureLoader().load(item.url, (texture) => {
      if (version !== imageVersion) {
        texture.dispose();
        return;
      }
      texture.colorSpace = THREE.SRGBColorSpace;
      photo.material.map?.dispose();
      photo.material.map = texture;
      photo.material.needsUpdate = true;
    });
    rebuild();
  }, openLibrary() {
    buildGallery();
    show("library");
  }, readout(update) {
    if (context.captureUI) return;
    if (update.message !== void 0) {
      messageText = (update.role === "user" ? "You: " : "Agent: ") + update.message;
      if (context.phase === "explore") message.userData.paint(messageText);
    }
    if (update.draft !== void 0 && context.phase !== "reference") draft.userData.paint("Draft: " + update.draft);
    if (update.recording !== void 0) status.userData.paint({ idle: context.editing ? "Edit · Right grip: box-select · Right stick click: exit" : "Explore · Right stick click: edit · Hold X: speak", requesting: "Waiting for microphone…", recording: update.autoVoice ? "Listening · Review after speaking · B Cancel" : "Listening… Release X to review", transcribing: "Transcribing…" }[update.recording]);
  }, hideKeyboard() {
    show(context.objectInteraction ? "interaction" : "main");
  } };
}
export {
  createXRStudio
};
