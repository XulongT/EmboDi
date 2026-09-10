import {languagePattern} from "../shared/language.mjs";
import { createDrawingActions } from "./tools/drawing-actions.mjs";
import { createRoomAlignment } from "./xr/room-alignment.mjs";
import { createScenePresentation } from "./ui/scene-presentation.mjs";
import { installUITheme, UI_THEME as T } from "../shared/ui-theme.mjs";
import { entityLabel } from "../shared/entity-label.mjs";
import { createMenuNavigation, suggestionScope } from "../shared/authoring-ui.mjs";
import { createSessionMedia } from "../shared/session-media.mjs";
import { uiText } from "../shared/ui-text.mjs";
import { BUILD, PHASES, authoringSceneActions, mainActions, selectedActorActions, roomSessionPhase } from "../shared/workflow.mjs";
import { createDemoEntry } from "../shared/demo-entry.mjs";
import * as THREE from "three";
import { createUIFoveation } from "./ui/ui-resolution.mjs";
import { createXRViewerPose } from "./xr/xr-viewer-pose.mjs";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { handMetadataForSize } from "../shared/hand-frame.mjs";
import { createHandInput } from "./hand-input.mjs";
import { createHandLayer } from "./hand-view.mjs";
import { createPathGuide } from "./tools/path-guide.mjs";
import { createDoorGrab } from "../shared/door-grab.mjs";
import { createScriptAudio } from "./scripted-audio.mjs";
import { createRoomTracking } from "./xr/room-tracking.mjs";
import { createRoomOcclusion } from "./xr/room-occlusion.mjs";
import { opacityForTransparency, readTransparency } from "../shared/scene-appearance.mjs";
import { createRoomPlacementStore } from "../shared/room-placement.mjs";
import { createQuestButtons, questButtonAction } from "../shared/quest-input.mjs";
import { STORY_ACTS, storyboardEntry } from "../shared/storyboard.mjs";
import { createDoorPlayer, isDoor, doorMenuEntry } from "../shared/doors.mjs";
import { createDoorPerformanceCue } from "../shared/door-performance.mjs";
import { createNavigationGate, createTransformTool } from "./transform-tool.mjs";
import { createInteractionSession, objectActions } from "../shared/interaction-session.mjs";
import { createInteractionDraftTool as createDraftTool } from "./tools/interaction-draft.mjs";
import { createFloodRuntime } from "../shared/flood.mjs";
import { createFloodLayer } from "./rendering/flood-layer.mjs";
import { createVolumeSelection } from "./tools/volume-selection.mjs";
import { expandSelection, allEntities, isTransformRequest, applyTransform } from "../shared/transforms.mjs";
import { createRayFeedback } from "./ray-feedback.mjs";
import { createApi } from "./api.mjs";
import { referenceFloor, isRawScanScene, isScanScene } from "../shared/scene-space.mjs";
import { createCurveLayer } from "./rendering/curve-layer.mjs";
import { isFloor, entryIsClear, findEntryCandidates } from "../shared/entry-points.mjs";
import { actorMotionId } from "../shared/actors.mjs";
import { CAST_SIZE as AUTHORING_ACTOR_LIMIT } from "../shared/actor-slots.mjs";
import { CAST_SIZE as MAX_ACTORS } from "../shared/actor-slots.mjs";
import { actorMotionPresets } from "../shared/actor-presets.mjs";
import { parseDirectorCommand } from "../shared/actors.mjs";
import { isRegionObject, regionObjectId } from "../shared/interaction-regions.mjs";
import { presetActions, presetInterrupt, createPresetSequence } from "../shared/preset-sequence.mjs";
import { captureActions, captureStatus, recordLabel, captureQuestion } from "../shared/capture-ui.mjs";
import { captureCreationPose, restoreCreationPose, scanPresentationBounds, createCreationLayout } from "./ui/creation-layout.mjs";
import { objectGeometry, createVirtualRecorder } from "./rendering/virtual-video.mjs";
import { blockoutColor, isCeiling, CATEGORIES } from "../shared/categories.mjs";
import { roomDimensions, ROOM_INTENT } from "../shared/room.mjs";
import { roomXRFeatures, chooseRoomReferenceSpace, compensatedReferenceSpace } from "../shared/xr-reference-space.mjs";
import { SCAN_REBUILD_INTENT } from "../shared/scan-reconstruction.mjs";
import { applyAgentResult } from "../shared/agent-result.mjs";
import { applyActorMotion } from "../shared/authoring-motion.mjs";
import { applyPatch } from "../shared/scene.mjs";
import { createDirector } from "./rendering/director.mjs";
import { pathFrames } from "../shared/group-path.mjs";
import { createStudio } from "./rendering/studio.mjs";
import { createDemonstration } from "./demonstration.mjs";
import { createAuthoringDesktop } from "./ui/authoring-desktop.mjs";
import { createXRStudio } from "./xr/xr-studio.mjs";
import { createTakeUpload } from "./take-store.mjs";
import { createShowcaseContent } from "./showcase/content.mjs";
import { createRoomCamera } from "./xr/room-camera.mjs";
import { createStartupAccess } from "./ui/startup-access.mjs";
import { loadActorAssets } from "./rendering/actor-view.mjs";
import { createMRPerformance } from "./showcase/mr-performance.mjs";
import { createProductionStudio } from "./rendering/production-studio.mjs";
const clientContext = {
  get $() {
    return $;
  },
  get acceptState() {
    return acceptState;
  },
  get action() {
    return action;
  },
  get actorViewPosition() {
    return actorViewPosition;
  },
  get alignedMode() {
    return alignedMode;
  },
  set alignedMode(value) {
    alignedMode = value;
  },
  get alignment() {
    return alignment;
  },
  set alignment(value) {
    alignment = value;
  },
  get alignmentReturn() {
    return alignmentReturn;
  },
  set alignmentReturn(value) {
    alignmentReturn = value;
  },
  get alignmentStickReady() {
    return alignmentStickReady;
  },
  set alignmentStickReady(value) {
    alignmentStickReady = value;
  },
  get alignmentVertical() {
    return alignmentVertical;
  },
  set alignmentVertical(value) {
    alignmentVertical = value;
  },
  get api() {
    return api;
  },
  get busy() {
    return busy;
  },
  get calibrationCursor() {
    return calibrationCursor;
  },
  get calibrationHint() {
    return calibrationHint;
  },
  get calibrationMarkers() {
    return calibrationMarkers;
  },
  get camera() {
    return camera;
  },
  get cancelTransform() {
    return cancelTransform;
  },
  get cancelVolume() {
    return cancelVolume;
  },
  get captureUI() {
    return captureUI;
  },
  get closeObjectInteraction() {
    return closeObjectInteraction;
  },
  get controllers() {
    return controllers;
  },
  get controls() {
    return controls;
  },
  get creationPose() {
    return creationPose;
  },
  set creationPose(value) {
    creationPose = value;
  },
  get creationReady() {
    return creationReady;
  },
  get currentJob() {
    return currentJob;
  },
  set currentJob(value) {
    currentJob = value;
  },
  get currentView() {
    return currentView;
  },
  get curveLayer() {
    return curveLayer;
  },
  get desktopUI() {
    return desktopUI;
  },
  set desktopUI(value) {
    desktopUI = value;
  },
  get director() {
    return director;
  },
  set director(value) {
    director = value;
  },
  get doorGrab() {
    return doorGrab;
  },
  get draftInputBlocked() {
    return draftInputBlocked;
  },
  set draftInputBlocked(value) {
    draftInputBlocked = value;
  },
  get draftTool() {
    return draftTool;
  },
  get editing() {
    return editing;
  },
  set editing(value) {
    editing = value;
  },
  get finishing() {
    return finishing;
  },
  set finishing(value) {
    finishing = value;
  },
  get floodRuntime() {
    return floodRuntime;
  },
  get flowAction() {
    return flowAction;
  },
  get hadXRFrame() {
    return hadXRFrame;
  },
  set hadXRFrame(value) {
    hadXRFrame = value;
  },
  get hoverIds() {
    return hoverIds;
  },
  set hoverIds(value) {
    hoverIds = value;
  },
  get immersiveShowcase() {
    return immersiveShowcase;
  },
  get invalidateCreation() {
    return invalidateCreation;
  },
  get isMiniature() {
    return isMiniature;
  },
  get keys() {
    return keys;
  },
  get labelKey() {
    return labelKey;
  },
  set labelKey(value) {
    labelKey = value;
  },
  get labelSprite() {
    return labelSprite;
  },
  set labelSprite(value) {
    labelSprite = value;
  },
  get measurePoints() {
    return measurePoints;
  },
  set measurePoints(value) {
    measurePoints = value;
  },
  get meshes() {
    return meshes;
  },
  set meshes(value) {
    meshes = value;
  },
  get miniatureYaw() {
    return miniatureYaw;
  },
  set miniatureYaw(value) {
    miniatureYaw = value;
  },
  get mode() {
    return mode;
  },
  set mode(value) {
    mode = value;
  },
  get mrShowcase() {
    return mrShowcase;
  },
  set mrShowcase(value) {
    mrShowcase = value;
  },
  get navigationGate() {
    return navigationGate;
  },
  get objectInteraction() {
    return objectInteraction;
  },
  get openObjectInteraction() {
    return openObjectInteraction;
  },
  get openSourceMode() {
    return openSourceMode;
  },
  get overview() {
    return overview;
  },
  get panelPlacement() {
    return panelPlacement;
  },
  set panelPlacement(value) {
    panelPlacement = value;
  },
  get pausePerformance() {
    return pausePerformance;
  },
  get pendingAlignment() {
    return pendingAlignment;
  },
  set pendingAlignment(value) {
    pendingAlignment = value;
  },
  get phase() {
    return phase;
  },
  set phase(value) {
    phase = value;
  },
  get placeXRPanel() {
    return placeXRPanel;
  },
  get pointer() {
    return pointer;
  },
  get pointerInside() {
    return pointerInside;
  },
  set pointerInside(value) {
    pointerInside = value;
  },
  get pointerStart() {
    return pointerStart;
  },
  set pointerStart(value) {
    pointerStart = value;
  },
  get presentationVisible() {
    return presentationVisible;
  },
  set presentationVisible(value) {
    presentationVisible = value;
  },
  get presetSequence() {
    return presetSequence;
  },
  set presetSequence(value) {
    presetSequence = value;
  },
  get previewScene() {
    return previewScene;
  },
  set previewScene(value) {
    previewScene = value;
  },
  get production() {
    return production;
  },
  set production(value) {
    production = value;
  },
  get raycaster() {
    return raycaster;
  },
  get rememberCreation() {
    return rememberCreation;
  },
  get renderer() {
    return renderer;
  },
  get requireSpatialIdle() {
    return requireSpatialIdle;
  },
  get restoreAlignmentOnReady() {
    return restoreAlignmentOnReady;
  },
  set restoreAlignmentOnReady(value) {
    restoreAlignmentOnReady = value;
  },
  get resumeWorld() {
    return resumeWorld;
  },
  get rig() {
    return rig;
  },
  get roomCamera() {
    return roomCamera;
  },
  set roomCamera(value) {
    roomCamera = value;
  },
  get roomCeilingVisibility() {
    return roomCeilingVisibility;
  },
  get roomMode() {
    return roomMode;
  },
  get roomOpacity() {
    return roomOpacity;
  },
  set roomOpacity(value) {
    roomOpacity = value;
  },
  get roomPlacementStore() {
    return roomPlacementStore;
  },
  get roomTracking() {
    return roomTracking;
  },
  get saving() {
    return saving;
  },
  set saving(value) {
    saving = value;
  },
  get scene() {
    return scene;
  },
  get sceneDisplayStorage() {
    return sceneDisplayStorage;
  },
  set sceneDisplayStorage(value) {
    sceneDisplayStorage = value;
  },
  get scriptDemo() {
    return scriptDemo;
  },
  set scriptDemo(value) {
    scriptDemo = value;
  },
  get selectedCurveId() {
    return selectedCurveId;
  },
  set selectedCurveId(value) {
    selectedCurveId = value;
  },
  get selection() {
    return selection;
  },
  set selection(value) {
    selection = value;
  },
  get setEditing() {
    return setEditing;
  },
  get setHover() {
    return setHover;
  },
  get setPhase() {
    return setPhase;
  },
  get spatialEpoch() {
    return spatialEpoch;
  },
  set spatialEpoch(value) {
    spatialEpoch = value;
  },
  get spatialKey() {
    return spatialKey;
  },
  get startObjectPreview() {
    return startObjectPreview;
  },
  get state() {
    return state;
  },
  set state(value) {
    state = value;
  },
  get studio() {
    return studio;
  },
  set studio(value) {
    studio = value;
  },
  get submitting() {
    return submitting;
  },
  set submitting(value) {
    submitting = value;
  },
  get syncFlow() {
    return syncFlow;
  },
  get toast() {
    return toast;
  },
  get transformPending() {
    return transformPending;
  },
  set transformPending(value) {
    transformPending = value;
  },
  get transformTool() {
    return transformTool;
  },
  get triggerHeld() {
    return triggerHeld;
  },
  get uiName() {
    return uiName;
  },
  get updateHint() {
    return updateHint;
  },
  get updatePresentationVisibility() {
    return updatePresentationVisibility;
  },
  get updateSelection() {
    return updateSelection;
  },
  get videoStartPending() {
    return videoStartPending;
  },
  set videoStartPending(value) {
    videoStartPending = value;
  },
  get virtualRecorder() {
    return virtualRecorder;
  },
  set virtualRecorder(value) {
    virtualRecorder = value;
  },
  get volume() {
    return volume;
  },
  get world() {
    return world;
  },
  get xrMode() {
    return xrMode;
  },
  set xrMode(value) {
    xrMode = value;
  },
  get xrPanel() {
    return xrPanel;
  },
  set xrPanel(value) {
    xrPanel = value;
  },
  get xrUI() {
    return xrUI;
  },
  set xrUI(value) {
    xrUI = value;
  },
  get xrViewer() {
    return xrViewer;
  }
};
const { beginCurve, saveCurve, beginRegionDraft, previewFlood, nextCurve, removeCurve, beginObjectDraft, paintObjectInteraction, updateDraftDrawing, canRecordDraft } = createDrawingActions(clientContext);
const { clearCalibrationMarkers, beginAlignmentCheck, previewAlignment, updateAlignmentPreview, saveRoomCorrection, offsetAlignment, cancelAlignment, beginCalibration, addCalibrationPoint, updateCalibrationCursor, enterAlignedRoom, applyRoomAlignment, rotateRoom, applyRoomSize, requestRoomScan } = createRoomAlignment(clientContext);
const { setSceneTransparency, changeOpacity, setRoomDisplay, updateRoomAppearance, roomCeilingVisibility, updateObjectLabel, isMiniature, updatePresentationVisibility, placeXRPanel, sceneMenuOpen, toggleMenu, setXRStatus } = createScenePresentation(clientContext);
installUITheme(document);
function uiName(entity) {
  return openSourceMode ? entityLabel(entity) : entity?.name || "";
}
let sceneDisplayStorage;
try {
  sceneDisplayStorage = globalThis.localStorage;
} catch {
}
let production = null;
const $ = (id) => document.getElementById(id);
const canvas = $("world");
const params = new URLSearchParams(location.search);
const roomMode = true;
const openSourceMode = true;
let desktopUI = null;
let agentSuggestions = null;
const menuNavigation = createMenuNavigation();
const showcaseMode = false;
const quietShowcase = showcaseMode && params.get("ui") !== "developer";
let mrShowcase = null;
let showcaseEntryPending = false;
const immersiveShowcase = () => quietShowcase && renderer.xr.isPresenting;
document.body.classList.toggle("showcase-clean", quietShowcase);
const scriptedMode = false;
const captureUI = showcaseMode || params.get("ui") === "capture" || scriptedMode && params.get("ui") !== "developer";
const startupRequired = roomMode && (/Quest|OculusBrowser/i.test(navigator.userAgent) || params.get("setup") === "1");
let xrReference = { requested: "local-floor", active: null, fallbackReason: null };
const sessionMedia = startupRequired ? createSessionMedia() : null;
let startupAccess = null;
document.body.classList.toggle("capture-ui", captureUI);
document.body.classList.toggle("open-source", openSourceMode);
if (openSourceMode) {
  document.title = "EmboDi · Open Source";
  document.body.append($("agent-conversation"));
  $("scene-tools-toggle").hidden = false;
  $("scene-tools-toggle").onclick = () => {
    const collapsed = document.body.classList.toggle("tools-collapsed");
    $("scene-tools-toggle").textContent = uiText(collapsed ? "Scene tools" : "Hide tools");
    $("scene-tools-toggle").setAttribute("aria-expanded", String(!collapsed));
  };
  document.querySelector(".version").textContent = "EmboDi · OPEN SOURCE · " + BUILD;
  $("actor-tools").lastElementChild.textContent = "Select an actor and describe a basic motion to the Agent (e.g. raise the right hand). Draw and save 2D floor or 3D air curves, then ask the actor to follow the highlighted curve. Imported motions are optional. Generated motions are procedural, without foot IK or collision avoidance. X speaks, Y opens the menu, Ctrl/Cmd+Z undoes.";
  $("more-options").querySelector("p").textContent = uiText("Quest: A Confirm, B Cancel / Back, X Voice, Y Menu. Right stick selects menu options. In Transform: left stick moves, left grip + stick adjusts height, right stick rotates, right grip grabs. Left grip rehearses outside Transform. Desktop: V Edit, X Voice, Y Tools, WASD Move, Shift + W/S Height, arrows Rotate, Enter Confirm, Esc Cancel, Space Rehearse, Ctrl/Cmd+Z Undo. Recording is available after setup.");
  $("door-tools").lastElementChild.textContent = uiText("Select a door → Interaction → Draw regions: mark door sources and a floor trigger, then describe the flow and dwell condition by voice. Door hinge and opening direction are editable.");
}
const demoMode = !openSourceMode && !roomMode && params.get("demo") === "1";
const demoEntry = createDemoEntry();
$("demo-mode-link").hidden = roomMode;
$("demo-mode-link").href = demoMode ? "/?legacy=1" : "/?legacy=1&demo=1";
$("demo-mode-link").textContent = uiText(demoMode ? "Legacy standard mode" : "Legacy recording demo");
document.body.classList.toggle("room-mode", roomMode);
$("new-world").textContent = uiText(roomMode ? "Back to room capture" : "Build a world from images");
$("reset").hidden = roomMode;
$("restore-checkpoint").hidden = roomMode;
$("demo-mode-label").hidden = !demoMode;
$("blueprint-options").hidden = demoMode;
if (demoMode) $("new-world").textContent = uiText("Replay demo");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
renderer.setSize(innerWidth, innerHeight);
renderer.xr.enabled = true;
renderer.xr.setReferenceSpaceType("local-floor");
const updateUIFoveation = createUIFoveation(renderer.xr);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.25;
const scene = new THREE.Scene();
scene.background = new THREE.Color(T.background);
const camera = new THREE.PerspectiveCamera(48, innerWidth / innerHeight, 0.02, 300);
const rig = new THREE.Group();
rig.add(camera);
scene.add(rig);
const xrViewer = createXRViewerPose(rig);
const currentView = () => renderer.xr.isPresenting ? xrViewer.view : camera;
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.minDistance = 0.8;
controls.maxDistance = 10;
controls.maxPolarAngle = Math.PI * 0.48;
const world = new THREE.Group();
scene.add(world);
let handSize = 1;
let armSize = 1;
let gripTilt = 45;
try {
  const saved = JSON.parse(localStorage.getItem("vrbuild-body-size-v1"));
  if (saved && Number.isFinite(saved.handSize) && Number.isFinite(saved.armSize)) {
    handMetadataForSize(saved.handSize, saved.armSize, saved.gripTilt ?? 45);
    handSize = saved.handSize;
    armSize = saved.armSize;
    gripTilt = saved.gripTilt ?? 45;
  }
} catch {
}
let handMetadata = handMetadataForSize(handSize, armSize, gripTilt, 1.1);
let handInput = createHandInput(handMetadata);
let handLayer = createHandLayer(world, handMetadata);
let handSample = handInput.snapshot();
let videoStartPending = null;
function resetHands() {
  doorGrab?.release();
  handSample = handInput.reset();
  handLayer.apply(handSample);
  videoStartPending = null;
}
function resizeHands(handDelta = 0, armDelta = 0, reset = false, tiltDelta = 0) {
  if (videoStartPending || ["recording", "saving"].includes(virtualRecorder.snapshot().status)) throw new Error("Save the recording before adjusting hand or arm size");
  handSize = reset ? 1 : THREE.MathUtils.clamp(Math.round((handSize + handDelta) * 100) / 100, 0.7, 1.3);
  armSize = reset ? 1 : THREE.MathUtils.clamp(Math.round((armSize + armDelta) * 100) / 100, 0.8, 1.2);
  gripTilt = reset ? 45 : THREE.MathUtils.clamp(gripTilt + tiltDelta, 0, 90);
  handMetadata = handMetadataForSize(handSize, armSize, gripTilt, 1.1);
  handLayer.dispose();
  handInput = createHandInput(handMetadata);
  handLayer = createHandLayer(world, handMetadata);
  handSample = handInput.snapshot();
  try {
    localStorage.setItem("vrbuild-body-size-v1", JSON.stringify({ handSize, armSize, gripTilt }));
  } catch {
  }
  $("hand-size-value").textContent = uiText(`Hands ${Math.round(handSize * 100)}% · Arms ${Math.round(armSize * 100)}% · Grip tilt ${gripTilt}°`);
  syncFlow();
}
scene.add(new THREE.HemisphereLight(roomMode ? "#ffffff" : "#dde8ff", roomMode ? "#dce2ef" : "#586d55", roomMode ? 2 : 2.8));
const sunlight = new THREE.DirectionalLight(roomMode ? "#ffffff" : "#ffe4b5", roomMode ? 0.9 : 3.3);
sunlight.position.set(-10, 20, 12);
scene.add(sunlight);
const rim = new THREE.DirectionalLight(roomMode ? "#ffffff" : "#83b3e4", roomMode ? 0.4 : 1.6);
rim.position.set(15, 8, -15);
scene.add(rim);
const marker = new THREE.Group();
world.add(marker);
const entryMarkers = new THREE.Group();
world.add(entryMarkers);
const ring = new THREE.Mesh(new THREE.RingGeometry(0.6, 0.85, 40), new THREE.MeshBasicMaterial({ toneMapped: false, color: T.accent, side: THREE.DoubleSide, depthTest: false, transparent: true, opacity: 0.9 }));
ring.rotation.x = -Math.PI / 2;
ring.renderOrder = 10;
marker.add(ring);
const arrow = new THREE.ArrowHelper(new THREE.Vector3(0, 0, -1), new THREE.Vector3(0, 0.03, 0), 2, T.accent, 0.45, 0.3);
arrow.line.material.toneMapped = arrow.cone.material.toneMapped = false;
marker.add(arrow);
let meshes = /* @__PURE__ */ new Map();
let outlines = [];
let state = null;
let renderedDefinition = null;
let selection = [];
let mode = "overview";
let tool = "object";
let anchor = new THREE.Vector3(0, 0, 8);
let heading = 0;
let currentJob = null;
let previewScene = null;
let uploadedImage = null;
let referenceId = null;
let xrMode = null;
let toastTimer;
let desktopYaw = 0;
let desktopPitch = 0;
let submitting = false;
let saving = false;
let presetSequence;
let presetPermit = false;
let scriptDemo = null;
let scriptPermit = false;
let scriptLoadError = "";
let demonstrationControlPending = false;
let demonstrationCancelled = false;
let photoReview = -1;
let describing = false;
let descriptionText = "";
let demonstration = null;
let pathKey = "";
let bindingKey = "";
let localPreparation = null;
let photoUploads = /* @__PURE__ */ new Map();
const pathGuide = createPathGuide(world);
const doorGrab = createDoorGrab({ openingMode: showcaseMode ? "hold-to-open" : "follow-hand", onEvent: (type, detail) => {
  virtualRecorder?.event(type, type === "previewReset" ? { ...detail, pathId: state?.scene.behaviors?.path?.id } : detail);
  if (!showcaseMode && type === "doorTrigger" && state?.scene.behaviors?.path) presetOperation(() => director.start({ actorIds: state.scene.behaviors.path.actorIds }));
} });
const scriptAudio = createScriptAudio();
let captureDialogue = { userText: "", agentText: "" };
let studio;
let xrUI;
let xrPanel;
let panelPlacement;
let director;
let editing = false;
let hoverIds = [];
let hoverOutlines = [];
let volumeController = null;
const actorAssets = /* @__PURE__ */ new Map();
let actorOptionsKey = "";
let actorMotionOptionsKey = "";
let actorMotionValueKey = "";
let spatialEpoch = 0;
const inputTrace = [];
function traceInput(type, detail = {}) {
  inputTrace.push({ time: performance.now(), type, ...detail });
  if (inputTrace.length > 30) inputTrace.shift();
}
let roomCamera;
let photoSignature = "";
let enteringXR = false;
const roomTracking = createRoomTracking();
const roomOcclusion = createRoomOcclusion();
const calibrationMarkers = new THREE.Group();
scene.add(calibrationMarkers);
let alignment = null;
let alignedMode = false;
let measurePoints = [];
let pendingAlignment = null;
let roomOpacity = opacityForTransparency(readTransparency(sceneDisplayStorage));
let virtualRecorder;
let labelSprite;
let labelKey = "";
let videoSignature = "";
const roomPlacementStore = createRoomPlacementStore((() => {
  try {
    return globalThis.localStorage;
  } catch {
    return null;
  }
})());
let restoreAlignmentOnReady = false;
let alignmentStickReady = false;
let alignmentVertical = false;
let miniatureYaw = 0;
const calibrationCursor = new THREE.Mesh(new THREE.SphereGeometry(0.045, 12, 8), new THREE.MeshBasicMaterial({ toneMapped: false, color: T.accent, depthTest: false }));
calibrationCursor.visible = false;
scene.add(calibrationCursor);
let phase = roomMode || demoMode ? "reference" : "entry";
let entryCandidates = [];
let chosenEntry = 0;
let flowSignature = "";
let selectedReference = null;
let demoSeconds = 3;
let demoTracking = false;
let frameCount = 0;
let lastTime = 0;
let snapReady = true;
let hadXRFrame = false;
let presentationVisible = true;
let creationPose = null;
let finishing = false;
let previewSummoned = false;
let latestReply = "";
let alignmentReturn = "welcome";
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
const keys = /* @__PURE__ */ new Set();
let pointerInside = false;
const questButtons = createQuestButtons();
let transformOwner = null;
let transformPending = null;
let syncingSelection = false;
let storyboardState = { enabled: false, acts: STORY_ACTS.map((a) => ({ ...a, saved: false })) };
let storyActId = "act-1";
let doorResetPending = false;
const doorPlayer = createDoorPlayer();
const doorPerformance = createDoorPerformanceCue();
const navigationGate = createNavigationGate();
const actorArrows = /* @__PURE__ */ new Map();
const objectInteraction = createInteractionSession();
const draftTool = createDraftTool({ world, pickGround: actorGround, pickObject: (ray, id) => {
  const hit = visibleGeometryHit(ray);
  if (hit?.object.userData.definition?.id !== id) return null;
  const normal = hit.face.normal.clone().applyMatrix3(new THREE.Matrix3().getNormalMatrix(hit.object.matrixWorld)).transformDirection(new THREE.Matrix4().copy(world.matrixWorld).invert());
  return { point: world.worldToLocal(hit.point.clone()).toArray(), normal: normal.toArray() };
}, smoothing: openSourceMode ? "standard" : "off" });
const floodRuntime = createFloodRuntime();
const floodLayer = createFloodLayer(world, { getObjectPose: (id) => {
  const mesh = meshes.get(id);
  return mesh ? { position: mesh.position.toArray(), quaternion: mesh.quaternion.toArray() } : null;
} });
const floodStatus = document.createElement("output");
floodStatus.id = "flood-status";
floodStatus.hidden = true;
floodStatus.style.cssText = "position:fixed;top:84px;left:50%;transform:translateX(-50%);padding:8px 14px;border-radius:12px;background:#f6f3f0df;color:#413647;font-size:14px;pointer-events:none;z-index:10";
document.body.append(floodStatus);
let draftInputBlocked = /* @__PURE__ */ new Set();
const triggerHeld = /* @__PURE__ */ new Set();
const transformTool = createTransformTool({ world, getState: () => state, spatialKey, onEvent: (type, detail) => virtualRecorder?.event(type, detail) });
const volume = createVolumeSelection({ world, getScene: volumeScene, getMeshes: () => [...meshes.values()], getHit: (ray) => {
  const hit = sceneHit(ray);
  return hit?.object?.userData.definition.category === "structure" && hit.object.userData.definition.editable !== true ? null : hit;
}, onCandidates: (ids) => setHover(expandSelection(state.scene, ids)) });
const controllers = [renderer.xr.getController(0), renderer.xr.getController(1)];
const controllerGrips = [renderer.xr.getControllerGrip(0), renderer.xr.getControllerGrip(1)];
controllerGrips.forEach((c) => rig.add(c));
const rayFeedback = controllers.map((c) => createRayFeedback(scene, c));
const pointerFeedback = createRayFeedback(scene);
for (const c of controllers) {
  rig.add(c);
  c.addEventListener("connected", (event) => {
    c.userData.inputSource = event.data;
  });
  c.addEventListener("disconnected", () => {
    resetHands();
    draftTool.suspend("Controller disconnected. Unfinished stroke discarded.");
    draftInputBlocked.delete(c);
    triggerHeld.delete(c);
    if (c.userData.inputSource) questButtons.reset(c.userData.inputSource);
    if (volumeController === c) cancelVolume();
    if (transformOwner === c) cancelTransform("Controller disconnected");
    production?.cancel();
    studio?.cancelVoice();
    delete c.userData.inputSource;
  });
  c.addEventListener("selectstart", () => {
    if (immersiveShowcase()) return;
    if (openSourceMode && triggerHeld.has(c)) return;
    triggerHeld.add(c);
    if (volume.isActive()) return;
    raycaster.setFromXRController(c);
    const hit = xrUI?.hit(raycaster);
    if (hit) {
      traceInput("xr-button", { label: hit.object.userData.label });
      hit.object.userData.action();
      return;
    }
    if (sceneMenuOpen()) return;
    if (xrUI?.blocks(raycaster)) return;
    if (c.userData.inputSource?.handedness !== "right") return;
    if (shortcutBlocked() || demonstrationMode()) return;
    if (draftTool.active()) {
      if (xrPanel.visible) return;
      if (!draftInputBlocked.has(c)) action(() => draftTool.begin(raycaster, c))();
      return;
    }
    if (phase === "calibrate") {
      action(() => addCalibrationPoint(c))();
      return;
    }
    if (roomMode && phase === "reference") {
      action(takeRoomPhoto)();
      return;
    }
    action(() => pressSelection(c))();
  });
  c.addEventListener("selectend", () => {
    triggerHeld.delete(c);
    draftInputBlocked.delete(c);
    if (draftTool.active()) {
      draftTool.release(c);
      syncFlow();
      return;
    }
    if (transformOwner === c) action(finishTransform)();
  });
}
function toast(message) {
  $("toast").textContent = uiText(message);
  $("toast").dataset.tone = /failed|failure|error|invalid|not saved|not enough disk/i.test(uiText(message)) ? "error" : "normal";
  $("toast").classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => $("toast").classList.remove("visible"), 4500);
  if (captureUI) xrUI?.setStatus(message);
  else setXRStatus(message);
}
const api = createApi();
function action(fn) {
  return async () => {
    try {
      await fn();
    } catch (error) {
      traceInput("action-error", { message: error.message });
      toast(error.message);
    }
  };
}
function videoBusy() {
  return ["recording", "saving"].includes(virtualRecorder?.snapshot().status);
}
function shortcutBlocked() {
  return !!localPreparation || demonstrationControlPending || ["recording", "saving"].includes(demonstration?.snapshot().state) || !!scriptDemo?.snapshot().busy || !!presetSequence?.busy() || !!videoStartPending || !!transformPending || demoEntry.active || !!currentJob || submitting || saving || finishing || director?.snapshot().pending || roomCamera?.snapshot().reading || ["starting", "saving"].includes(virtualRecorder?.snapshot().status) || studio?.getRecordingState() !== "idle";
}
function busy() {
  return !!production?.busy() || demonstrationControlPending || !!localPreparation || !!demonstration && ["recording", "saving"].includes(demonstration.snapshot().state) || !scriptPermit && !!scriptDemo?.snapshot().busy || !!presetSequence?.busy() || draftTool.active() || !!videoStartPending || transformTool.active() || !!transformPending || demoEntry.active || !!currentJob || submitting || saving || finishing || director?.snapshot().pending || volume.isActive() || roomCamera?.snapshot().reading || ["starting", "saving"].includes(virtualRecorder?.snapshot().status) || studio && studio.getRecordingState() !== "idle";
}
function requireSpatialIdle() {
  if (["starting", "saving"].includes(virtualRecorder?.snapshot().status)) throw new Error("Wait for recording storage to finish preparing or saving");
  if (busy()) throw new Error("Finish the current request or preview first");
}
function spatialKey() {
  world.updateMatrixWorld(true);
  const floor = referenceFloor(previewScene || state?.scene);
  return `${spatialEpoch}:${world.matrixWorld.elements.map((n) => n.toFixed(6)).join(",")}:${JSON.stringify(floor && [floor.position, floor.size, floor.rotation])}`;
}
function actorViewPosition() {
  return world.worldToLocal(currentView().getWorldPosition(new THREE.Vector3()));
}
function visibleGeometryHit(ray) {
  return ray.intersectObjects([...meshes.values()].filter((m) => m.visible), false)[0];
}
function sceneHit(ray) {
  world.updateMatrixWorld(true);
  const geometry2 = visibleGeometryHit(ray), actor = director?.layer.pick(ray, { maxDistance: geometry2?.distance ?? Infinity });
  return actor && actor.distance < (geometry2?.distance ?? Infinity) ? { ...actor, kind: "actor" } : geometry2 ? { ...geometry2, kind: "object" } : null;
}
let selectedCurveId = null;
const curveLayer = createCurveLayer(world);
function actorGround(ray) {
  world.updateMatrixWorld(true);
  const hit = visibleGeometryHit(ray);
  return isFloor(hit?.object.userData.definition) && hit.face?.normal.y > 0.5 ? world.worldToLocal(hit.point.clone()) : null;
}
function openObjectInteraction() {
  if (openSourceMode && !editing) throw Error("Enter edit mode first.");
  if (phase !== "explore" || busy() || director.snapshot().placing) throw new Error("Finish the current action before setting up an interaction");
  const ids = selection.filter((id) => allEntities(state.scene).some((o) => o.id === id));
  objectInteraction.open({ ids, revision: state.revision, spatialKey: spatialKey() });
  pausePerformance();
  syncFlow();
}
function closeObjectInteraction(message) {
  const active = objectInteraction.active();
  objectInteraction.close();
  draftTool.close();
  draftInputBlocked.clear();
  if (active) {
    navigationGate.block();
    keys.clear();
    pointerStart = null;
    flowSignature = "";
    updateHint();
    updateSelection();
    syncFlow();
    if (typeof message === "string") toast(message);
  }
}
function beginObjectTransform() {
  if (openSourceMode) return production.startPoses();
  if (busy() || !selection.length) throw new Error("Select an object and finish the current action first");
  closeObjectInteraction();
  pausePerformance();
  setEditing(true);
  if (renderer.xr.isPresenting) {
    xrPanel.visible = false;
    updatePresentationVisibility();
  }
  toast("Transform: hold the right trigger to drag · Right stick to turn or raise");
}
function beginObjectVoice() {
  if (!objectInteraction.active()) throw new Error("Select an object first");
  closeObjectInteraction();
  toast("Hold X to describe the interaction. Release to submit.");
  return;
}
function pausePerformance() {
  production?.stopClock();
  floodRuntime.stop();
  mrShowcase?.pause();
  if (director?.snapshot().mode === "running") director.stop();
}
function updateActorTarget() {
  const clear = () => {
    director?.clearTarget();
    production?.updatePlacement(null);
  };
  if (phase !== "explore" || !world.visible || !(editing || director?.snapshot().placing || storyboardState.enabled && !state.scene.actors?.length)) {
    clear();
    return;
  }
  if (renderer.xr.isPresenting) {
    const right = controllers.find((c) => c.userData.inputSource?.handedness === "right");
    if (!right?.visible || !xrViewer.valid || renderer.xr.getSession()?.visibilityState !== "visible") {
      clear();
      return;
    }
    raycaster.setFromXRController(right);
    if (xrUI?.hit(raycaster)) {
      clear();
      return;
    }
  } else {
    if (!pointerInside || document.hidden) {
      clear();
      return;
    }
    raycaster.setFromCamera(pointer, camera);
  }
  director?.updateRay(raycaster);
  production?.updatePlacement(raycaster);
}
function dialogueContext() {
  updateActorTarget();
  const forward = currentView().getWorldDirection(new THREE.Vector3());
  world.updateMatrixWorld(true);
  forward.transformDirection(world.matrixWorld.clone().invert());
  forward.y = 0;
  forward.normalize();
  const target = director.captureContext(), point = target.actorTarget?.position || null;
  return { targetLabel: selection.map((id) => uiName([...state.scene.objects, ...state.scene.actors || []].find((o) => o.id === id)) || id).join(", ") || "Current scene", productionEpoch: production?.state().epoch, productionMode: editing ? "edit" : "explore", curveId: selectedCurveId, draftContext: draftTool.active() ? draftTool.snapshot() : null, presetActorIds: (state.scene.actors || []).map((a) => a.id), presetRequestId: presetSequence?.snapshot()?.id, phase, ids: selection.filter((id) => meshes.has(id)), targetIds: [...selection], spatialContext: { viewer: actorViewPosition().toArray(), forward: forward.toArray(), point, pivot: selectionPivot(), spatialKey: spatialKey() }, anchor: anchor.toArray(), revision: state.revision, busy: busy(), voiceBusy: !!production?.state().transitioning || !!production?.state().saving || !!production?.state().requesting || phase !== "explore" || submitting || saving || volume.isActive() || transformTool.active() || !!transformPending || virtualRecorder?.snapshot().status === "saving", ...target };
}
function actorCenter(id) {
  const view = director?.layer.views.get(id);
  return view?.visible ? world.worldToLocal(view.bones[0].getWorldPosition(new THREE.Vector3())) : null;
}
function volumeScene() {
  return { ...state.scene, objects: [...state.scene.objects, ...(state.scene.actors || []).flatMap((a) => {
    const p = actorCenter(a.id);
    return p ? [{ ...a, position: p.toArray() }] : [];
  })] };
}
function selectionPivot() {
  const bounds = new THREE.Box3(), p = new THREE.Vector3();
  world.updateMatrixWorld(true);
  for (const id of selection) {
    const a = state?.scene.actors?.find((a2) => a2.id === id);
    if (a) {
      p.copy(actorCenter(id) || new THREE.Vector3().fromArray(a.position));
      p.y = a.position[1];
      bounds.expandByPoint(p);
    } else {
      const mesh = meshes.get(id);
      if (mesh) {
        const size = mesh.scale;
        for (const x of [-0.5, 0.5]) for (const z of [-0.5, 0.5]) {
          p.set(x * size.x, -size.y / 2, z * size.z).applyEuler(mesh.rotation).add(mesh.position);
          bounds.expandByPoint(p);
        }
      }
    }
  }
  if (bounds.isEmpty()) return [0, 0, 0];
  bounds.getCenter(p);
  p.y = bounds.min.y;
  return p.toArray();
}
function requirePausedTargets(ids = selection) {
  if (ids.some((id) => state.scene.actors?.some((a) => a.id === id)) && director.snapshot().mode === "running" && !director.snapshot().completed) throw new Error("Pause with the left grip before moving or turning actors");
}
function pressSelection(owner) {
  if (openSourceMode) {
    if (sceneMenuOpen() || !editing || production?.busy() || studio.getRecordingState() !== "idle") return;
    selectFromRay();
    return;
  }
  if (draftTool.active()) return;
  if (phase === "explore" && editing && !director.snapshot().placing && !busy()) {
    const hit = sceneHit(raycaster), id = hit?.kind === "actor" ? hit.id : hit?.object?.userData.definition.id;
    if (id && selection.includes(id)) {
      requirePausedTargets();
      transformTool.begin(selection, selectionPivot(), raycaster);
      transformOwner = owner;
      navigationGate.block();
      controls.enabled = false;
      setHover([]);
      toast("Drag to move · Right stick to turn or raise · Release trigger to save · Left stick click to cancel");
      return;
    }
  }
  selectFromRay();
}
function cancelTransform(reason = "Adjustment cancelled") {
  if (!transformTool.active()) return;
  transformTool.cancel(reason);
  transformOwner = null;
  navigationGate.block();
  applyLiveTransforms([]);
  toast(reason);
}
async function finishTransform() {
  if (!transformTool.active()) return;
  const updates = transformTool.updates(), result = transformTool.finish();
  transformOwner = null;
  navigationGate.block();
  if (!result.changed) {
    applyLiveTransforms([]);
    virtualRecorder?.event("transform-cancel", { reason: "Position and orientation unchanged" });
    return;
  }
  transformPending = { ...result, updates };
  syncFlow();
  try {
    const next = await api("/api/transform", result);
    acceptState(next);
    virtualRecorder?.event("transform-commit", { ...result, revision: next.revision });
    toast("Position and orientation saved · Left stick click to undo");
  } catch (error) {
    virtualRecorder?.event("transform-cancel", { reason: error.message });
    toast(`Save feedback error: ${error.message}`);
  } finally {
    transformPending = null;
    applyLiveTransforms([]);
    syncFlow();
  }
}
function liveTransforms() {
  return transformTool.active() ? transformTool.updates() : transformPending?.updates || [];
}
function applyLiveTransforms(updates) {
  const changes = new Map(updates.map((o) => [o.id, o]));
  for (const [id, mesh] of meshes) {
    const o = changes.get(id) || mesh.userData.definition;
    mesh.position.fromArray(o.position);
    if (o.quaternion) mesh.quaternion.fromArray(o.quaternion);
    else mesh.rotation.set(0, o.rotation, 0);
  }
  for (const outline of [...outlines, ...hoverOutlines]) {
    const mesh = meshes.get(outline.userData.id);
    if (mesh) {
      outline.position.copy(mesh.position);
      outline.rotation.copy(mesh.rotation);
    }
  }
}
function updateActorArrows() {
  const selected = new Set(editing && !draftTool.active() ? selection : []);
  for (const [id, arrow2] of actorArrows) if (!director.layer.views.has(id)) {
    world.remove(arrow2);
    arrow2.dispose();
    actorArrows.delete(id);
  }
  for (const [id, view] of director.layer.views) {
    let arrow2 = actorArrows.get(id);
    if (!arrow2 && selected.has(id)) {
      arrow2 = new THREE.ArrowHelper(new THREE.Vector3(0, 0, 1), new THREE.Vector3(), 0.65, T.accent, 0.18, 0.12);
      arrow2.line.material.depthTest = false;
      arrow2.cone.material.depthTest = false;
      arrow2.line.material.toneMapped = arrow2.cone.material.toneMapped = false;
      arrow2.renderOrder = 12;
      world.add(arrow2);
      actorArrows.set(id, arrow2);
    }
    if (!arrow2) continue;
    arrow2.visible = selected.has(id) && view.visible && !director.snapshot().placing;
    if (arrow2.visible) {
      arrow2.position.copy(actorCenter(id));
      arrow2.position.y = view.position.y + 0.03;
      arrow2.setDirection(new THREE.Vector3(Math.sin(view.rotation.y), 0, Math.cos(view.rotation.y)));
    }
  }
}
function paintActorControls() {
  const d = director?.snapshot(), actors = state?.scene.actors || [], key = JSON.stringify(actors), assigned = actors.filter((a) => a.motionPlan || actorMotionId(a)).length;
  $("actor-status").textContent = uiText(d ? `${{ editing: openSourceMode ? "Actor pose preview" : "T-Pose layout", running: d.completed ? "Performance finished" : "Playing", paused: "Motion paused" }[d.mode]} · Actor ${actors.length}/${openSourceMode ? AUTHORING_ACTOR_LIMIT : MAX_ACTORS} · ${assigned} with motions${openSourceMode ? "" : ` · ${state?.scene.actorStyle === "cute" ? "Cute" : "Zombie"}`}
${d.message}` : "Loading actor mesh…");
  if (key !== actorOptionsKey) {
    actorOptionsKey = key;
    const select = $("actor-select");
    select.replaceChildren();
    const empty = document.createElement("option");
    empty.value = "";
    empty.textContent = uiText("Select an actor");
    select.append(empty);
    for (const a of actors) {
      const option = document.createElement("option");
      option.value = a.id;
      option.textContent = uiName(a);
      select.append(option);
    }
  }
  if (openSourceMode) {
    $("actor-transport").hidden = true;
    $("actor-edit").hidden = true;
    $("actor-place").hidden = true;
  }
  $("actor-select").disabled = draftTool.active();
  $("actor-select").value = d?.selected || "";
  $("actor-place").textContent = uiText(d?.placing ? "Cancel placement · P" : "Place T-Pose actor · P");
  $("actor-transport").textContent = uiText(d?.completed ? "Replay · Space" : d?.mode === "running" ? "Pause · Space" : d?.mode === "paused" ? "Resume · Space" : "Play · Space");
  const selected = actors.find((a) => a.id === d?.selected);
  if (document.activeElement !== $("actor-delay")) $("actor-delay").value = String(selected?.delay ?? 0);
  const preferred = [...actorAssets.values()].find((a) => a.preferred), presets = actorMotionPresets(actorAssets), motions = !openSourceMode && presets.length ? presets : [...actorAssets.values()].filter((a) => !a.bodyOnly && (!preferred || a.kind === preferred.kind)), motionOptionsKey = motions.map((a) => a.id).join("|");
  if (actorMotionOptionsKey !== motionOptionsKey) {
    actorMotionOptionsKey = motionOptionsKey;
    const select = $("actor-motion");
    select.replaceChildren();
    const empty = document.createElement("option");
    empty.value = "";
    empty.textContent = uiText("No motion · T-Pose");
    select.append(empty);
    for (const a of motions) {
      const option = document.createElement("option");
      option.value = a.id;
      option.textContent = uiText(`${a.name} · ${a.duration} s`);
      select.append(option);
    }
  }
  const motionValueKey = JSON.stringify([selected?.id, selected && actorMotionId(selected)]);
  if (motionValueKey !== actorMotionValueKey) {
    actorMotionValueKey = motionValueKey;
    $("actor-motion").value = selected && actorMotionId(selected) || "";
  }
  if (openSourceMode && $("actor-motion").options[0]) $("actor-motion").options[0].textContent = uiText(selected?.motionPlan ? "Agent · " + selected.motionPlan.name : "Default actor · No motion assigned");
  $("actor-focus").hidden = !openSourceMode || renderer.xr.isPresenting;
  $("actor-focus").disabled = !selected || !!busy();
  $("actor-place").disabled = phase !== "explore" || !actorAssets.size || !!busy() || !d?.placing && actors.length >= (openSourceMode ? AUTHORING_ACTOR_LIMIT : MAX_ACTORS);
  $("actor-start").disabled = !(openSourceMode ? selected : actors.length) || !!busy();
  $("actor-transport").disabled = !actors.length || draftTool.active();
  $("actor-motion").disabled = !selected || !!busy();
  $("actor-motion-save").disabled = !selected || !!busy();
  for (const style of ["cute", "zombie"]) $("actor-style-" + style).disabled = phase !== "explore" || !actors.length || actors.length > MAX_ACTORS || !!busy() || !!d?.pending;
  $("actor-edit").disabled = !actors.length || !!busy();
  $("actor-delay-save").disabled = !selected || !!busy();
  $("actor-remove").disabled = !selected || !!busy();
}
function focusSelectedActor() {
  requireSpatialIdle();
  if (renderer.xr.isPresenting) return;
  const actor = state.scene.actors?.find((a) => a.id === director.snapshot().selected);
  if (!actor) return;
  const target = actor.motionPlan?.trajectory && director.layer.views.get(actor.id) ? director.layer.views.get(actor.id).position.clone() : new THREE.Vector3(...actor.position), candidates = [];
  for (const radius of [1.8, 1.2, 2.4]) for (const offset of [0, 0.6, -0.6, 1.2, -1.2, Math.PI]) {
    const yaw = actor.yaw + offset, p = [target.x + Math.sin(yaw) * radius, target.y + 0.01, target.z + Math.cos(yaw) * radius];
    if (entryIsClear(state.scene, p, { radius: 0.2, height: 1.7 })) candidates.push(p);
  }
  if (!candidates.length) throw new Error("No clear viewpoint near this actor. Move closer using W/A/S/D.");
  controls.enabled = false;
  world.updateWorldMatrix(true, false);
  rig.updateWorldMatrix(true, false);
  const position = world.localToWorld(new THREE.Vector3(...candidates[0]).add(new THREE.Vector3(0, 1.45, 0)));
  camera.position.copy(rig.worldToLocal(position));
  camera.lookAt(world.localToWorld(target.add(new THREE.Vector3(0, 1, 0))));
  desktopYaw = camera.rotation.y;
  desktopPitch = camera.rotation.x;
  rememberCreation();
}
function presetContext(captured) {
  return { phase: captured?.phase ?? phase, revision: captured?.revision ?? state?.revision, space: captured?.spatialContext?.spatialKey ?? spatialKey(), ids: captured?.presetActorIds ?? (state?.scene.actors || []).map((a) => a.id), selection: captured?.targetIds ?? [...selection], requestId: captured ? captured.presetRequestId : presetSequence?.snapshot()?.id };
}
function presetOperation(fn) {
  presetPermit = true;
  try {
    return fn();
  } finally {
    presetPermit = false;
  }
}
async function presetText(text, context, publish) {
  return null;
}
async function directorText(text, context, { publish = () => {
} } = {}) {
  if (openSourceMode && languagePattern("authoring.hideReply").test(text)) {
    xrUI?.dismissDialogue();
    return "Dialogue hidden. Use Y to view it again.";
  }
  if (openSourceMode && production) {
    if (context.productionEpoch && context.productionEpoch !== production.state().epoch) throw Error("Mode changed. Please repeat your request.");
    if (production.state().dirty && languagePattern("authoring.confirmChanges").test(text)) {
      await production.save();
      return "Edits saved.";
    }
    if (production.state().dirty && languagePattern("authoring.cancelChanges").test(text)) {
      production.cancel();
      return "Edits reverted.";
    }
    const answer = await production.handleText(text, context);
    if (answer !== null) return answer;
  }
  if (openSourceMode) {
    const words2 = text.trim().replace(languagePattern("punctuation.app.1"), "");
    if (currentJob?.status === "ready" && languagePattern("authoring.applyPreview").test(words2)) {
      await applyJob();
      return "Changes applied.";
    }
    if (currentJob?.status === "ready" && languagePattern("authoring.discardPreview").test(words2)) {
      discardJob();
      return "Preview discarded.";
    }
    if (languagePattern("authoring.stopOperation").test(words2)) {
      if (currentJob?.status === "running") await cancelJob();
      pausePerformance();
      return "Stopped.";
    }
    if (languagePattern("authoring.rehearseEffect").test(words2)) {
      previewFlood();
      return "Rehearsal started. Enter the floor region and dwell to trigger it.";
    }
    if (currentJob) throw Error("Apply or discard the current result first.");
    if (draftTool.active() && draftTool.snapshot().kind === "regions") {
      if (languagePattern("authoring.clearRegions").test(words2)) {
        draftTool.clear();
        syncFlow();
        return "Draft cleared. Draw the regions again.";
      }
      if (languagePattern("authoring.undoRegion").test(words2)) {
        draftTool.undo();
        syncFlow();
        return "Last region removed.";
      }
      if (languagePattern("authoring.cancelSketch").test(words2)) {
        closeObjectInteraction();
        return "Drawing cancelled.";
      }
      if (context.revision !== state.revision || context.spatialContext?.spatialKey !== spatialKey()) throw Error("Scene changed after speaking. Please request again.");
      if (JSON.stringify(draftTool.snapshot().regions) !== JSON.stringify(context.draftContext?.regions)) throw Error("Sketch changed after speaking. Please describe again.");
      await saveCurve();
      context = { ...context, revision: state.revision, draftContext: null };
      if (languagePattern("authoring.saveSketch").test(words2)) return "Regions saved. Describe the flow and dwell trigger.";
    }
    if (draftTool.active()) throw Error("Save the current curve, then describe the motion.");
    if (languagePattern("door.openSuffix").test(words2) || languagePattern("door.openPrefix").test(words2)) return doorCommand("open", context.ids, context);
    if (languagePattern("door.closeSuffix").test(words2) || languagePattern("door.closePrefix").test(words2)) return doorCommand("close", context.ids, context);
    const command = parseDirectorCommand(text);
    if (command && !["unavailable", "create"].includes(command.type) && !isTransformRequest(text)) {
      const local = await director.command(text, context);
      if (local !== null) return local;
    }
    if (command?.type === "create" && !languagePattern("authoring.motionRequest").test(text)) {
      if (!editing) throw Error("Enter edit mode to create objects.");
      const reply2 = await director.command(text, context);
      xrPanel.visible = false;
      desktopUI?.collapse();
      updatePresentationVisibility();
      syncFlow();
      return reply2;
    }
    if (isTransformRequest(text) && context.targetIds?.length) requirePausedTargets(context.targetIds);
    pausePerformance();
    studio.setDraft("");
    await startJob("agent", text, studio.conversationId, context);
    return;
  }
  const presetReply = await presetText(text, context, publish);
  if (presetReply !== null) return presetReply;
  if (draftTool.active()) throw new Error("The draft has not been applied. Review it or exit Draft before continuing.");
  const words = text.trim().replace(languagePattern("punctuation.app.2"), "");
  if (languagePattern("legacy.prepareDoorCast").test(words)) return doorPerformanceCommand("configure");
  if (languagePattern("legacy.resetDoorPerformance").test(words)) return doorPerformanceCommand("reset");
  if (state.scene.doorPerformance && languagePattern("legacy.openDoor").test(words)) return doorCommand("open", [state.scene.doorPerformance.doorId]);
  if (languagePattern("door.openSuffix").test(words) || languagePattern("door.openPrefix").test(words)) return doorCommand("open", context.ids, context);
  if (languagePattern("door.closeSuffix").test(words) || languagePattern("door.closePrefix").test(words)) return doorCommand("close", context.ids, context);
  if (languagePattern("legacy.stopPerformance").test(words)) doorPlayer.pause();
  if (languagePattern("legacy.resumePerformance").test(words)) doorPlayer.resume();
  if (currentJob?.status === "ready" && languagePattern("legacy.confirmPreview").test(text.trim())) {
    await applyJob();
    return "Changes applied.";
  }
  if (currentJob?.status === "ready" && languagePattern("legacy.discardPreview").test(text.trim())) {
    discardJob();
    return "Preview discarded.";
  }
  if (isTransformRequest(text) && context.targetIds?.length) {
    requirePausedTargets(context.targetIds);
    return null;
  }
  const reply = await director.command(text, context);
  if (reply === null && context.actorId && languagePattern("legacy.actorRequest").test(text)) return "Actor commands include \"move here\", \"face me\", \"appear after two seconds\", and \"use the second motion\". A style request changes the whole cast. Other motions require an imported clip.";
  return reply;
}
async function initializeScript() {
  return null;
}
async function persistPhoto(photo) {
  if (photo.reference) return photo.reference;
  if (photoUploads.has(photo.id)) return photoUploads.get(photo.id);
  const pending = api("/api/capture/photos", { image: photo.image, capturedAt: photo.capturedAt }).then((ref) => {
    roomCamera.markSaved(photo.id, ref);
    return ref;
  }).finally(() => photoUploads.delete(photo.id));
  photoUploads.set(photo.id, pending);
  return pending;
}
async function persistPhotos() {
  for (const p of roomCamera.getPhotos()) await persistPhoto(p);
}
async function scriptedRebuild() {
  return null;
}
function describeInteraction() {
  if (busy()) throw Error("Finish the current action first");
  describing = true;
  descriptionText = "";
  $("capture-description").value = "";
  syncFlow();
  if (renderer.xr.isPresenting) placeXRPanel();
  else $("capture-description").focus();
}
async function submitDescription() {
  const text = descriptionText.trim();
  if (!text) throw Error("Enter a description first");
  const context = dialogueContext();
  describing = false;
  syncFlow();
  const reply = await presetText(text, context, () => {
  });
  const message = reply ?? "This preset does not support that request. Available tools include door demonstrations, actor motions, formation paths and door bindings.";
  toast(message);
  virtualRecorder.event("dialogue", { inputOrigin: "text", userText: text, agentText: message });
}
function openDemonstration() {
  return null;
}
function demonstrationMode() {
  return false;
}
async function toggleDemonstration() {
  return null;
}
async function startDemonstration(inputOrigin = "click") {
  return null;
}
async function stopDemonstration() {
  return null;
}
async function retryDemonstration() {
  return null;
}
async function installDemonstratedDoor() {
  return null;
}
async function preparePath(context, publish, options = {}) {
  return null;
}
async function prepareBinding(context, publish, options = {}) {
  return null;
}
function resetPath() {
  return null;
}
async function confirmCurrentPreview() {
  return null;
}
async function startObjectPreview(options = {}) {
  if (phase !== "explore" || production.busy() || currentJob || submitting || saving || director.snapshot().placing || draftTool.active() || volume.isActive()) throw Error("Save or cancel the current edit before rehearsing.");
  if (!options.ids && !production.state().canPreview) throw Error(production.state().previewIds.length ? "This object has no saved motion or interaction." : "Enter edit mode and select an object to rehearse.");
  if (editing) {
    closeObjectInteraction();
    setEditing(false);
    if (editing) throw Error("Finish the current operation before rehearsing.");
  }
  await production.ready();
  return production.play(options);
}
async function togglePreview() {
  if (currentJob?.status === "ready") return;
  if (busy() || demonstrationMode() || director.snapshot().placing) return;
  if (openSourceMode && production) return production.state().playing ? production.pause() : startObjectPreview();
  const d = director.snapshot(), preset = presetSequence.snapshot();
  if (d.mode === "running" && !d.completed) {
    presetSequence.pause();
    pausePerformance();
    syncFlow();
    return;
  }
  if (["ready", "paused"].includes(preset?.status) || state.scene.behaviors?.path) return confirmCurrentPreview();
  return director.toggleTransport();
}
async function cancelCurrentOperation() {
  if (openSourceMode && studio.getRecordingState() !== "idle") {
    studio.cancelVoice();
    return;
  }
  if (openSourceMode && production) {
    const p = production.state();
    if (p.monitor) {
      production.closeMonitor();
      return;
    }
    if (p.dirty || p.requesting) {
      production.cancel();
      studio.cancelVoice();
      return;
    }
  }
  if (currentJob?.applying) return;
  if (demoEntry.active) {
    cancelDemo();
    return;
  }
  if (doorGrab.snapshot().grabbed) {
    doorGrab.release();
    return;
  }
  if (demonstrationMode()) {
    demonstrationCancelled = true;
    localPreparation?.abort();
    closeObjectInteraction();
    if (demonstration.snapshot().state === "recording") await demonstration.stop();
    syncFlow();
    return;
  }
  if (transformTool.active()) {
    cancelTransform();
    return;
  }
  if (volume.isActive()) {
    cancelVolume();
    return;
  }
  if (director.snapshot().placing) {
    director.cancelPlacement();
    syncFlow();
    return;
  }
  if (localPreparation || scriptDemo?.snapshot().busy || presetSequence?.busy()) {
    localPreparation?.abort();
    scriptDemo?.cancel();
    presetSequence?.cancel();
    studio.cancelVoice();
    pausePerformance();
    syncFlow();
    return;
  }
  if (studio.getRecordingState() !== "idle") {
    studio.cancelVoice();
    return;
  }
  if (currentJob) {
    if (currentJob.status === "running") return cancelJob();
    return discardJob();
  }
  if (describing) {
    describing = false;
    syncFlow();
    return;
  }
  if (objectInteraction.active()) {
    if (openSourceMode && !draftTool.active() && sceneMenuOpen()) {
      const ui = renderer.xr.isPresenting ? xrUI : desktopUI;
      if (!["main", "global", "interaction"].includes(ui.snapshot().page) && ui.back()) return;
    }
    closeObjectInteraction();
    if (openSourceMode) {
      if (renderer.xr.isPresenting) xrUI.openSelection();
      else desktopUI?.openSelection();
    }
    return;
  }
  if (photoReview >= 0) {
    reviewPhoto(-1);
    return;
  }
  if (transformPending || saving || finishing || director.snapshot().pending) return;
  if (["ready", "paused", "previewing"].includes(presetSequence.snapshot()?.status)) {
    presetSequence.cancel();
    pausePerformance();
    syncFlow();
    return;
  }
  if (["align", "calibrate"].includes(phase)) {
    cancelAlignment();
    return;
  }
  if (openSourceMode && phase === "explore") {
    if (sceneMenuOpen()) {
      if (renderer.xr.isPresenting) {
        if (!xrUI.back()) xrPanel.visible = false;
        xrUI.dismissDialogue();
        updatePresentationVisibility();
      } else desktopUI.back();
      pointerStart = null;
      setHover([]);
      navigationGate.block();
      return;
    }
    if (xrUI?.dismissDialogue()) return;
    if (editing) toggleMenu();
    return;
  }
  if (openSourceMode && !renderer.xr.isPresenting && desktopUI?.back()) return;
  if (xrPanel.visible && xrUI?.back?.()) return;
  if (openSourceMode && xrUI?.dismissDialogue()) return;
  if (openSourceMode && agentSuggestions) {
    agentSuggestions = null;
    syncFlow();
    return;
  }
  if (xrPanel.visible) {
    toggleMenu();
    return;
  }
  if (selection.length) {
    selection = [];
    updateSelection();
    syncFlow();
    return;
  }
  if (editing) setEditing(false);
}
function calibrationHint() {
  return pendingAlignment ? "Alignment ready. After applying it, physical movement drives the virtual camera at 1:1 scale." : ["Use the Quest scan, or point at floor corner A with the right trigger.", "Choose floor corner B along the same wall.", "From B, choose corner C along the adjacent wall.", "Point at the ceiling edge above wall A–B and press the right trigger to measure height."][measurePoints.length];
}
function formatMetrics(m) {
  return m ? `${m.width.toFixed(2)} × ${m.depth.toFixed(2)} × ${m.height.toFixed(2)} m` : "Room dimensions unavailable";
}
async function changeActorDelay(delta) {
  const actor = state.scene.actors?.find((a) => a.id === director.snapshot().selected);
  if (!actor) throw new Error("Select an actor first");
  await director.change({ delay: THREE.MathUtils.clamp((actor.delay || 0) + delta, 0, 60) });
  syncFlow();
}
function selectedDoorContext() {
  const selected = selection.length === 1 && state?.scene.objects.find((o2) => o2.id === selection[0]), o = isDoor(selected) ? selected : state?.scene.objects.find((o2) => o2.id === state.scene.doorPerformance?.doorId);
  return isDoor(o) ? { id: o.id, name: uiName(o), effect: state.scene.doorEffects?.find((d) => d.objectId === o.id) || null, cast: state.scene.doorPerformance?.doorId === o.id ? state.scene.doorPerformance : null } : null;
}
function flowContext() {
  const capture = roomCamera?.snapshot(), scan = roomTracking.snapshot(), video = virtualRecorder?.snapshot(), selectedObject = selection.length === 1 ? state?.scene.objects.find((o) => o.id === selection[0]) : null;
  return { regionTarget: isRegionObject(selectedObject), selectedLightType: selectedObject?.light?.type, selectedCameraId: selectedObject?.kind === "camera" ? selectedObject.id : null, voiceDraft: studio?.getVoiceDraft(), autoVoice: studio?.getSpeechState().automatic, production: production ? { ...production.state(), time: void 0, triggers: void 0, monitorPose: void 0, placement: production.state().placement ? { kind: production.state().placement.kind, visible: production.state().placement.visible } : null } : void 0, productionReady: !!state?.scene.productionReady, revision: state?.revision, applying: !!currentJob?.applying, suggestions: agentSuggestions?.options || [], floodPreview: currentJob?.result?.type === "flood" && currentJob?.status === "ready", floodAvailable: !!(previewScene || state?.scene)?.floods?.some((f) => regionObjectId(f) === selection[0]), authoring: openSourceMode, generatedPreview: (currentJob?.kind === "actor" || currentJob?.result?.type === "motion") && currentJob?.status === "ready", agentStage: currentJob?.stage, agentTrace: currentJob?.agentTrace || [], curveCount: state?.scene.curves?.length || 0, curveName: state?.scene.curves?.find((c) => c.id === selectedCurveId) ? `${state.scene.curves.findIndex((c) => c.id === selectedCurveId) + 1} · ${state.scene.curves.find((c) => c.id === selectedCurveId).mode}` : "None", suppressUI: immersiveShowcase(), rehearsal: params.get("script") === "rehearsal", photoReview, describing, targetName: selection.length === 1 ? uiName(state?.scene.objects?.find((o) => o.id === selection[0]) || state?.scene.actors?.find((a) => a.id === selection[0])) : null, captureUI, scriptedMode, script: mrShowcase ? { status: "ready", userText: "Part 2", agentText: mrShowcase.hint() } : scriptDemo?.snapshot() || { ...captureDialogue, status: scriptedMode ? "unconfigured" : "off", error: scriptLoadError }, preset: presetSequence?.snapshot(), objectSelection: [...selection], objectInteraction: objectInteraction.snapshot(), draft: draftTool.summary(), demonstration: demonstration?.snapshot(), localPreparing: !!localPreparation, path: state?.scene.behaviors?.path, doorGrab: doorGrab.snapshot(), phase, handSize, armSize, gripTilt, storyboard: storyboardState, storyActId, door: selectedDoorContext(), hasScene: (openSourceMode ? !!state?.scene : ["room-photos", "room-rebuilt"].includes(state?.source)) && !isRawScanScene(state?.scene), scanBased: isScanScene(state?.scene), finishing, editingBusy: busy(), roomOpacity, latestReply, actorStyle: state?.scene.actorStyle || "zombie", actorName: uiName(state?.scene.actors?.find((a) => a.id === director?.snapshot().selected)), actorDelay: state?.scene.actors?.find((a) => a.id === director?.snapshot().selected)?.delay, reference: roomMode ? !!capture?.count : !!(referenceId || uploadedImage), job: submitting ? "running" : currentJob?.status, entryCount: entryCandidates.length, editing, recording: studio?.getRecordingState() || "idle", saving, savedAt: state?.savedAt, saveMode: state?.saveMode, preview: !!previewScene, demoMode, demoSeconds, demoTracking, roomMode, captureState: capture?.state || "idle", photoCount: capture?.count || 0, photoReading: !!capture?.reading, cameraMessage: capture?.message, captureTip: capture?.tip, cameraDevices: capture?.devices.length || 0, xr: renderer.xr.isPresenting, xrMode, roomAlignmentAvailable: roomMode && ["room-photos", "room-scan", "room-rebuilt"].includes(state?.source), alignedMode, calibrationReady: !!pendingAlignment, calibrationHint: calibrationHint(), calibrationMetrics: formatMetrics(pendingAlignment?.metrics), scanReady: scan.ready, planeCount: scan.count, planeInfo: scan.ready ? formatMetrics(scan.metrics) : "Waiting for floor and ceiling data", videoState: video?.status || "idle", videoRetry: !!video?.canRetry, videoMessage: video?.message, videoSeconds: video?.seconds || 0, roomInfo: state?.scene.room ? formatMetrics(state.scene.room) : "", objectInfo: labelKey, actorCount: state?.scene.actors?.length || 0, actorMotionCount: state?.scene.actors?.filter((a) => a.motionPlan || actorMotionId(a)).length || 0, actorReady: actorAssets.size > 0 && ((state?.scene.actors?.length || 0) < (openSourceMode ? AUTHORING_ACTOR_LIMIT : MAX_ACTORS) || director?.snapshot().placing), performanceMode: director?.snapshot().mode, performanceCompleted: director?.snapshot().completed, actorPlacing: director?.snapshot().placing, actorSelected: director?.snapshot().selected, actorMessage: director?.snapshot().message };
}
function syncFlow() {
  if ($("mr-showcase-controls")) $("mr-showcase-controls").hidden = renderer.xr.isPresenting || phase !== "explore";
  if (agentSuggestions && agentSuggestions.scope !== suggestionScope({ revision: state?.revision, spatialKey: spatialKey(), targetIds: selection, curveId: selectedCurveId })) agentSuggestions = null;
  const context = flowContext(), signature = JSON.stringify(context);
  if (signature === flowSignature) return;
  flowSignature = signature;
  if (openSourceMode) {
    if (document.body.dataset.phase !== phase) {
      document.body.classList.toggle("tools-collapsed", phase === "explore");
      $("scene-tools-toggle").textContent = uiText(phase === "explore" ? "Scene tools" : "Hide tools");
      $("scene-tools-toggle").setAttribute("aria-expanded", String(phase !== "explore"));
    }
    const names = { director: "Director Agent", interaction: "Interaction Agent", motion: "Motion Agent", sketch: "Sketch Agent", recommendation: "Recommendation Agent", "scene-construction": "Scene Agent" };
    $("agent-stage").textContent = uiText(currentJob?.status === "running" ? `${names[currentJob.stage] || "Director Agent"} · Processing` : currentJob?.status === "ready" ? "Preview ready · A Apply · B Discard" : context.targetName ? `Selection: ${context.targetName}` : "Select an object or describe your idea");
  }
  const saveLabel = previewScene ? "Preview not saved" : state?.savedAt ? `${state.saveMode === "manual" ? "Saved" : "Autosaved"} · ${new Date(state.savedAt).toLocaleTimeString("zh-CN", { hour12: false })}` : "Not saved";
  $("save-status").textContent = uiText(saveLabel);
  $("save-scene").disabled = !!busy();
  $("enter-xr").disabled = !state || demoEntry.active || finishing;
  $("demo-countdown").textContent = uiText(demoTracking ? "…" : String(demoSeconds));
  document.body.dataset.phase = phase;
  updatePresentationVisibility();
  entryMarkers.visible = phase === "entry";
  $("workflow-title").textContent = uiText(demoMode && phase === "explore" ? "03 / Explore and create" : PHASES[phase]);
  $("workflow-help").textContent = uiText({ reference: demoMode ? "Choose an image and build. Enter the prepared world after a 3-second countdown." : "Choose a reference image, then start building.", building: "Building a rough scene from the image.", preview: "Review the layout, then apply it to create entry points.", entering: demoTracking ? "Waiting for headset tracking. The countdown will restart when tracking returns." : "Entry point ready. Entering shortly.", entry: entryCandidates.length ? `Saved world loaded. ${entryCandidates.length} entry points available.` : "No suitable entry point found. Rebuild or adjust the floor.", explore: "Explore and create. Select an object to describe a change." }[phase]);
  if (phase === "reference") {
    $("scene-title").textContent = uiText("Step into a world from an image.");
    $("provenance").textContent = uiText("Build a rough scene, choose an entry point, then keep creating inside.");
    $("object-count").textContent = uiText("");
  } else if (phase === "building") {
    $("scene-title").textContent = uiText("Building your world…");
    $("provenance").textContent = uiText(selectedReference?.title ? "Reference: " + selectedReference.title : "Build from the selected image");
    $("object-count").textContent = uiText("");
  } else if (state) {
    $("scene-title").textContent = uiText((previewScene || state.scene).title);
    $("provenance").textContent = uiText(previewScene ? "Scene preview · Apply to create entry points" : state.source === "sample" ? "Saved procedural example" : "Generated from a reference · Unseen areas are inferred");
    $("object-count").textContent = uiText((previewScene || state.scene).objects.length + " OBJECTS");
  }
  if (demoMode && phase === "reference") $("provenance").textContent = uiText("Recording demo · The image introduces the workflow; the saved world is loaded.");
  if (phase === "entering") {
    $("scene-title").textContent = uiText(demoTracking ? "Waiting for headset tracking…" : `Entering the world in ${demoSeconds} seconds.`);
    $("provenance").textContent = uiText("Prepared scene demo · Automatic entry");
  }
  for (const section of document.querySelectorAll("[data-phase]")) if (section !== document.body) section.hidden = section.dataset.phase !== phase;
  $("capture-section").hidden = !roomMode || phase !== "reference";
  $("reference-section").hidden = roomMode || phase !== "reference";
  if (roomMode) {
    if (phase === "reference") {
      $("workflow-title").textContent = uiText("01 / Capture the room");
      $("workflow-help").textContent = uiText("Move between shots and hold still at capture. Photos guide reconstruction.");
      $("scene-title").textContent = uiText(state?.source === "room-draft" ? state.scene.title : "Start with the room\naround you.");
      $("provenance").textContent = uiText(state?.capturePlan?.closeUnscanned ? "Independent scene · Scan-constrained layout · Unscanned ends are closed with virtual walls" : "Capture a real room · Build a blockout · Edit from inside");
      $("save-status").textContent = uiText(context.hasScene ? "Continue your saved world from More" : "New scene ready · Waiting for photos");
    }
    if (phase === "reference" && context.scanBased) {
      $("workflow-title").textContent = uiText("01 / Scan to editable blockout");
      $("workflow-help").textContent = uiText("Rebuild separate objects from the scan, resolving overlaps and connections.");
      $("scene-title").textContent = uiText("Build an editable scene from the scan.");
      $("provenance").textContent = uiText("Scan-constrained layout and scale · Photos guide object classification");
      $("save-status").textContent = uiText("Review the new build before replacing the current scene");
    }
    if (phase === "building") {
      $("workflow-title").textContent = uiText("02 / Build the room");
      $("workflow-help").textContent = uiText("Combining views to build room structure and large furniture.");
      $("provenance").textContent = uiText(`${context.photoCount} room photos · Small tabletop details excluded`);
    }
    if (phase === "building" && context.scanBased) {
      $("workflow-help").textContent = uiText("Resolving scan contours and connections into editable objects.");
      $("provenance").textContent = uiText(context.photoCount ? `${context.photoCount} reference photos · Furniture classification only` : "Build scene objects from the scan");
    }
    if (phase === "entry") $("workflow-help").textContent = uiText(entryCandidates.length ? "Choose an open spot to enter the room." : "No clear entry point found. Return to capture and rebuild.");
    if (phase === "entry" && renderer.xr.isPresenting) $("workflow-help").textContent = uiText("Align with the real room to film through physical movement, or inspect the estimated scene first.");
    if (phase === "calibrate") {
      $("workflow-help").textContent = uiText(calibrationHint());
      $("calibration-guide").textContent = uiText(calibrationHint());
      $("calibration-measurement").textContent = uiText(pendingAlignment ? formatMetrics(pendingAlignment.metrics) : `${measurePoints.length} floor corners marked`);
    }
    if (!["reference", "building", "preview"].includes(phase) && state?.source === "room-photos") $("provenance").textContent = uiText("Generated from room photos · Dimensions and unseen geometry are estimates");
    if (state?.scene.room && phase !== "reference") $("provenance").textContent = uiText(`${state.scene.room.source === "estimated" ? "Estimated dimensions" : "Room dimensions calibrated"} · Check furniture placement against the room${alignedMode ? " · Physical movement 1:1" : ""}`);
  }
  if (roomMode) {
    if ((previewScene || state?.scene)?.scanReconstruction && phase !== "reference") $("provenance").textContent = uiText("Editable scan blockout · Separate objects · Door locations preserved");
    else if ((previewScene || state?.scene)?.scanStructure && phase !== "reference") $("provenance").textContent = uiText("Quest scan surfaces · Doors are static snapshots · Check cross-area connections");
    const hints = { welcome: context.hasScene ? "Continue your saved layout and confirm real-room alignment when needed." : "Start with room photos and build a blockout you can enter.", overview: "Inspect the whole layout. Your position and alignment are kept when you return.", align: pendingAlignment ? "Left stick: offset · Left grip + stick: height · Rotate 90° to match walls · A saves alignment." : "Reading the Quest scan. If unavailable, use Adjust alignment to mark corners manually.", preview: "Review the layout, then apply it to enter. The current scene remains until you apply.", explore: context.actorPlacing ? "Point at the floor and press the right trigger to place an actor · A to cancel" : "Right stick click: edit · X: speak · B: record · Y: menu" };
    if (hints[phase]) $("workflow-help").textContent = uiText(draftTool.active() ? "Draft · Draw a path, then review, redraw, or undo." : hints[phase]);
    if (phase === "welcome") {
      $("scene-title").textContent = uiText("Continue creating.");
      $("provenance").textContent = uiText(context.hasScene ? state.scene.title : "Start with a real space");
    }
    if (phase === "preview") $("provenance").textContent = uiText(previewScene?.scanReconstruction ? "Editable blockout · Apply, then click the right stick to edit" : previewScene?.scanFurnishing ? "Scan-based furnishing · Existing walls and doors preserved" : previewScene?.scanStructure ? "Quest scan surfaces · Check cross-area connections" : "Scene preview · Apply to enter");
    $("entry-section").hidden = true;
    $("more-options").hidden = ["welcome", "reference", "building", "preview"].includes(phase);
    $("actor-tools").hidden = openSourceMode ? phase !== "explore" : !context.actorSelected && !context.actorPlacing;
    $("selection-tools").hidden = !editing;
  }
  if (openSourceMode && state?.example && !["reference", "building", "preview"].includes(phase)) $("provenance").textContent = "Local workspace · Agent motion · 2D floor / 3D air curves";
  if (openSourceMode && phase === "explore" && !renderer.xr.isPresenting) $("workflow-help").textContent = uiText(selectedDoorContext() ? "Door interaction: draw sources and a floor region, then describe the flow and trigger. WASD Move; right mouse drag Turn." : "Select actors for motion or doors for region interactions. WASD Move; right mouse drag Turn.");
  $("room-tools").hidden = !roomMode || ["welcome", "reference", "building", "preview"].includes(phase);
  const scan = roomTracking.snapshot();
  $("room-metrics").textContent = uiText(state?.scene.room ? `${formatMetrics(state.scene.room)} · ${state.scene.room.source === "estimated" ? "Not calibrated" : "Room dimensions recorded"}` : "");
  $("plane-status").textContent = uiText(renderer.xr.isPresenting ? `Quest planes: ${scan.count} · ${context.planeInfo}` : "Room scans are available in Quest immersive mode.");
  $("record-video").disabled = ["starting", "saving"].includes(context.videoState) || busy() && !canRecordDraft() && context.videoState !== "recording" && !context.videoRetry;
  $("record-video").textContent = uiText(openSourceMode ? context.videoState === "recording" ? "Stop and save recording" : "Record virtual view" : context.videoState === "recording" ? "Stop and save · B" : "Record virtual view · B");
  $("video-status").textContent = uiText(`${context.videoMessage || "Enter the room to record"}${context.videoState === "recording" ? ` · ${context.videoSeconds} s` : ""}`);
  for (const id of ["align-room", "rotate-room", "apply-room-size", "show-room-overview"]) $(id).disabled = !!busy();
  $("rotate-room").disabled = !isMiniature() && !alignedMode && !(phase === "align" && pendingAlignment) || !!busy() && !(isMiniature() && currentJob?.status === "ready" && currentJob?.kind === "generate") || saving || submitting || videoBusy();
  $("room-scan").disabled = !renderer.xr.isPresenting || !!busy() || videoBusy();
  if (presetActions(context).length) $("workflow-help").textContent = uiText(context.preset.message);
  $("authoring-scene-tools").hidden = !openSourceMode || phase !== "explore";
  if (openSourceMode && phase === "explore") {
    $("authoring-scene-actions").replaceChildren();
    for (const item of authoringSceneActions(context)) {
      const b = document.createElement("button");
      b.textContent = item.label;
      b.disabled = !!item.disabled || !!busy();
      b.onclick = action(() => flowAction(item.id));
      $("authoring-scene-actions").append(b);
    }
    if (context.actorSelected && !context.job) {
      $("workflow-title").textContent = "ACTOR / " + context.actorName;
      $("workflow-help").textContent = uiText("Selected actor · Agent motion · Curve " + context.curveName);
    }
  }
  $("workflow-actions").replaceChildren();
  for (const item of (captureUI ? captureActions(context) : draftTool.active() ? [] : presetActions(context).length ? [...presetActions(context), ...objectActions(context)] : [...mainActions(context), ...objectActions(context), ...storyboardEntry(context), ...selectedActorActions(context), ...doorMenuEntry(context)]).flatMap((item2) => item2.id === "more" ? roomMode && context.hasScene ? [{ id: "resume", label: "Back to creating" }] : [] : [item2])) {
    const button = document.createElement("button");
    button.textContent = uiText(item.label);
    button.dataset.action = item.id;
    button.disabled = !!item.disabled;
    button.onclick = action(() => flowAction(item.id));
    $("workflow-actions").append(button);
  }
  paintObjectInteraction(context);
  $("latest-reply").textContent = uiText(latestReply || "Hold X to speak, release to review.");
  if (captureUI) {
    $("capture-dialogue").hidden = false;
    $("capture-user").textContent = uiText(context.script.userText ? "You: " + context.script.userText : "");
    $("capture-agent").textContent = uiText(context.script.agentText ? "Agent: " + context.script.agentText : "");
    $("capture-state").textContent = uiText(captureStatus(context));
    $("capture-rec").textContent = uiText(recordLabel(context).replace(/^●\s*/, ""));
    $("capture-rec").dataset.recording = String(context.videoState === "recording");
    $("capture-rec").dataset.tone = context.videoState === "error" ? "error" : "normal";
    $("capture-state").dataset.tone = context.script.error || context.videoState === "error" || context.captureState === "error" ? "error" : "normal";
    $("capture-rec").hidden = !recordLabel(context);
    $("capture-stop").hidden = !context.script.busy && context.performanceMode !== "running";
    $("capture-stop").textContent = uiText(context.script.busy ? "Cancel" : "Stop");
    $("capture-target").textContent = uiText(captureQuestion(context));
    $("capture-description").hidden = !describing;
  }
  paintActorControls();
  paintStoryControls(context);
  if (openSourceMode) desktopUI?.update(context);
  xrUI?.setContext({ ...context, saveLabel });
  placeMarker();
}
function setPhase(next) {
  if (next !== phase) {
    describing = false;
    photoReview = -1;
  }
  if (next !== phase && objectInteraction.active()) closeObjectInteraction("Stage changed. Draft closed.");
  if (roomMode && next !== phase) {
    $("display-settings").hidden = true;
    $("display-settings").open = false;
  }
  if (roomMode && next !== "reference" && params.has("capture")) {
    params.delete("capture");
    const url = new URL(location.href);
    url.searchParams.delete("capture");
    history.replaceState(history.state, "", url);
  }
  if (next !== phase) {
    traceInput("phase", { from: phase, to: next, revision: state?.revision });
    virtualRecorder?.event("phase", { from: phase, to: next, revision: state?.revision });
  }
  phase = next;
  if (next !== "explore") resetHands();
  flowSignature = "";
  syncFlow();
  updateHint();
}
async function chooseSuggestion(index) {
  const entry = agentSuggestions;
  if (!entry || !Number.isInteger(index) || !entry.options[index]) throw Error("Suggestions expired. Request new suggestions.");
  if (entry.scope !== suggestionScope(dialogueContext())) {
    agentSuggestions = null;
    syncFlow();
    throw Error("Target or scene changed. Request new suggestions.");
  }
  if (busy()) throw Error("Finish the current operation first.");
  const prompt = entry.options[index].prompt;
  agentSuggestions = null;
  return startJob("agent", prompt, studio.conversationId, entry.context);
}
async function confirmAuthoring(controller = null) {
  if (openSourceMode && studio.getVoiceDraft()) return studio.confirmVoice();
  if (studio.getRecordingState() !== "idle" || saving || finishing) return;
  if (openSourceMode && production?.state().dirty) {
    if (production.state().placing) updateActorTarget();
    return production.save();
  }
  if (currentJob?.status === "ready") return applyJob();
  if (draftTool.active()) {
    if (!draftTool.snapshot().stroke) return saveCurve();
    return;
  }
  if (renderer.xr.isPresenting && xrPanel.visible && !director.snapshot().placing) return xrUI.confirmFocused();
  if (busy()) return;
  if (director.snapshot().placing) {
    if (renderer.xr.isPresenting) {
      const right = controller || controllers.find((c) => c.userData.inputSource?.handedness === "right");
      if (!xrViewer.valid || !right?.visible || renderer.xr.getSession()?.visibilityState !== "visible") {
        director.clearTarget();
        return;
      }
      raycaster.setFromXRController(right);
    } else {
      if (!pointerInside) return;
      raycaster.setFromCamera(pointer, camera);
    }
    return director.confirmPlacement(raycaster);
  }
  if (openSourceMode && production?.state().monitor && !sceneMenuOpen()) return production.recenterMonitor();
  if (renderer.xr.isPresenting) return toggleMenu();
  if (agentSuggestions?.options.length) {
    $("agent-suggestions").querySelector("button")?.focus();
    return;
  }
  desktopUI?.collapse(false);
}
async function cinemaAction(id) {
  if (id === "cinemaTransform") return production.startPoses();
  if (id === "cinemaOther") {
    if (!editing) throw Error("Enter edit mode first.");
    closeObjectInteraction();
    xrPanel.visible = false;
    desktopUI?.collapse();
    return studio.startVoice({ auto: true });
  }
  if (id === "cinemaSave") return confirmAuthoring();
  if (id === "cinemaCancel") return production.cancel();
  if (id === "cinemaPreview") return production.openMonitor();
  if (id === "cinemaAdjustCamera") return production.adjustCamera();
  if (id === "cinemaLightPoint" || id === "cinemaLightSpot") {
    if (selection.length !== 1) throw Error("Select a light first.");
    return production.preview({ op: "update", id: selection[0], values: { lightType: id === "cinemaLightPoint" ? "point" : "spot" } });
  }
  if (id === "cinemaCreateOther") {
    if (!editing) throw Error("Enter edit mode first.");
    closeObjectInteraction();
    confirmSelection([]);
    xrPanel.visible = false;
    desktopUI?.collapse();
    return studio.startVoice({ auto: true });
  }
  if (id === "cinemaNext") return production.cameraStep(1);
  if (id === "cinemaClose") return production.closeMonitor();
  if (id === "cinemaPlay") return startObjectPreview();
  if (id === "cinemaPause") return production.pause();
  if (id === "cinemaComplete") {
    await production.complete();
    setEditing(false);
    return;
  }
  if (id === "cinemaCurveEdit") return production.editCurve(selectedCurveId);
  if (id === "cinemaStraight" || id === "cinemaSmooth") return production.preview({ op: "curve", id: selectedCurveId, straight: id === "cinemaStraight", smooth: true });
  if (id === "cinemaBind") {
    if (selection.length !== 1 || !selectedCurveId) throw Error("Select an object and a saved curve first.");
    return production.preview({ op: "update", id: selection[0], values: { curveId: selectedCurveId } });
  }
  if (id === "cinemaRemove") {
    if (selection.length !== 1) throw Error("Select an object first.");
    return production.preview({ op: "remove", id: selection[0] });
  }
  const kind = { cinemaCamera: "camera", cinemaSpot: "spot", cinemaPoint: "point", cinemaBox: "box" }[id];
  if (kind) return production.create(kind);
}
function flowAction(id) {
  if (openSourceMode && id.startsWith("cinema")) return cinemaAction(id);
  if (openSourceMode && id.startsWith("suggestion:")) return chooseSuggestion(Number(id.slice(11)));
  if (openSourceMode && desktopUI?.navigate(id)) return;
  if (id === "storyboard") {
    $("storyboard-panel").hidden = false;
    action(refreshStoryboard)();
    $("storyboard-panel").scrollIntoView({ block: "nearest" });
    return;
  }
  if (id === "doors") {
    $("door-tools").hidden = false;
    $("door-tools").open = true;
    $("door-tools").scrollIntoView({ block: "nearest" });
    return;
  }
  if (id === "display" || id === "alignmentOptions") {
    $("display-settings").hidden = false;
    $("display-settings").open = true;
    $("display-settings").scrollIntoView({ block: "nearest" });
    return;
  }
  if (id === "sceneTools") {
    $("authoring-scene-tools").open = true;
    $("authoring-scene-tools").scrollIntoView({ block: "nearest" });
    return;
  }
  if (id === "actors") {
    $("actor-tools").open = true;
    $("actor-tools").scrollIntoView({ block: "nearest" });
    return;
  }
  if (id === "library") {
    $("reference-section").scrollIntoView({ block: "nearest" });
    return;
  }
  if (id === "more") {
    $("more-options").hidden = false;
    $("more-options").open = !$("more-options").open;
    return;
  }
  return flowActions[id]?.();
}
function chooseEntry(index) {
  const entry = entryCandidates[index];
  if (!entry) return;
  chosenEntry = index;
  anchor.fromArray(entry.position);
  heading = entry.heading;
  $("heading").value = String(Math.round(heading * 180 / Math.PI));
  $("heading-value").textContent = uiText(`${Math.round(heading * 180 / Math.PI)}°`);
  placeMarker();
  for (const child of entryMarkers.children) child.material.color.set(child.userData.entryIndex === index ? T.accent : T.selected);
  for (const [i, b] of [...$("entry-list").children].entries()) b.classList.toggle("active", i === index);
  setXRStatus(`Entry ${index + 1} selected · Select Enter world`);
}
function renderEntries() {
  for (const mesh of [...entryMarkers.children]) {
    entryMarkers.remove(mesh);
    mesh.geometry.dispose();
    mesh.material.dispose();
  }
  $("entry-list").replaceChildren();
  entryCandidates.forEach((entry, i) => {
    const portal = new THREE.Mesh(new THREE.TorusGeometry(0.8, 0.09, 6, 32), new THREE.MeshBasicMaterial({ toneMapped: false, color: T.selected, depthTest: false }));
    portal.position.fromArray(entry.position);
    portal.position.y += 0.08;
    portal.rotation.x = -Math.PI / 2;
    portal.renderOrder = 10;
    portal.userData.entryIndex = i;
    entryMarkers.add(portal);
    const button = document.createElement("button");
    button.textContent = uiText(`Entry ${i + 1}${i === 0 ? " · Recommended" : ""}`);
    button.onclick = () => chooseEntry(i);
    $("entry-list").append(button);
  });
}
function prepareEntries() {
  entryCandidates = findEntryCandidates(state.scene);
  renderEntries();
  setPhase("entry");
  tool = "anchor";
  setEditing(false);
  if (entryCandidates.length) chooseEntry(0);
  updateHint();
}
function rememberCreation() {
  if (phase === "explore" && mode === "inhabit") creationPose = captureCreationPose(world, rig, camera, alignedMode);
}
function invalidateCreation() {
  alignment = null;
  creationPose = null;
  pendingAlignment = null;
  spatialEpoch++;
}
function creationReady() {
  setPhase("explore");
  virtualRecorder?.event("enterWorld", { revision: state?.revision });
  tool = "object";
  setEditing(false);
  if (state.scene.floods?.length) floodRuntime.start();
  roomCeilingVisibility();
  placeMarker();
  if (renderer.xr.isPresenting) {
    if (xrViewer.valid) hadXRFrame = true;
    xrUI.hideKeyboard();
    xrPanel.visible = false;
  }
  toast(openSourceMode ? "A Confirm · B Cancel / Back · X Voice · Y Menu · Left grip Play / Pause" : "Right stick: edit · A: cancel/back · Left grip: preview/pause · X: speak · B: record · Y: menu");
}
function resumeWorld() {
  if (roomMode && isRawScanScene(state.scene)) throw new Error("The scan is a reference. Build an editable blockout first.");
  requireSpatialIdle();
  roomCamera?.stop();
  selection = [];
  renderScene(state.scene);
  $("more-options").open = false;
  if (roomMode) {
    if (renderer.xr.isPresenting && !xrViewer.valid) throw new Error("Wait for headset tracking before continuing");
    if (creationPose) {
      restoreCreationPose(creationPose, world, rig, camera, { xr: renderer.xr.isPresenting });
      alignedMode = creationPose.alignedMode;
      mode = "inhabit";
      controls.enabled = false;
      if (!renderer.xr.isPresenting) {
        desktopYaw = camera.rotation.y;
        desktopPitch = camera.rotation.x;
      }
      spatialEpoch++;
      scene.background = renderer.xr.isPresenting && xrMode === "immersive-ar" ? null : new THREE.Color(T.background);
      creationReady();
      return;
    }
    if (renderer.xr.isPresenting && xrMode === "immersive-ar") {
      if (alignment) enterAlignedRoom();
      else beginAlignmentCheck({ restore: true });
      return;
    }
    prepareEntries();
    enterWorld({ allowEstimated: true });
    return;
  }
  overview();
  prepareEntries();
}
function newWorld() {
  requireSpatialIdle();
  rememberCreation();
  studio.cancelVoice();
  roomCamera?.stop();
  selection = [];
  setEditing(false);
  overview();
  setPhase("reference");
  placeXRPanel();
  $("more-options").open = false;
}
function showOverview() {
  requireSpatialIdle();
  rememberCreation();
  setEditing(false);
  overview();
  if (roomMode) {
    setPhase("overview");
    placeXRPanel();
  } else prepareEntries();
}
async function finishCreation() {
  if (finishing) return;
  if (previewScene) {
    placeXRPanel();
    throw new Error("Apply or discard the preview before finishing");
  }
  if (busy()) throw new Error("Finish the current action before saving and exiting");
  finishing = true;
  syncFlow();
  try {
    const saved = await api("/api/save-scene", { revision: state.revision });
    acceptState(saved);
    rememberCreation();
    pausePerformance();
    roomCamera?.stop();
    setEditing(false);
    overview();
    setPhase("welcome");
    placeXRPanel();
    toast("Scene saved. You can resume your work later.");
  } finally {
    finishing = false;
    syncFlow();
  }
}
function beginDemo() {
  if (busy()) throw new Error("Finish the current action first");
  entryCandidates = demoEntry.start({ scene: state?.scene, revision: state?.revision, reference: !!(referenceId || uploadedImage), now: performance.now() });
  selection = [];
  overview();
  setEditing(false);
  renderEntries();
  chooseEntry(0);
  demoSeconds = 3;
  demoTracking = false;
  setPhase("entering");
  placeXRPanel();
}
function cancelDemo(message = "Entry cancelled. You can start again.") {
  if (!demoEntry.active) return;
  demoEntry.cancel();
  demoTracking = false;
  setPhase("reference");
  toast(message);
}
function updateDemo(now) {
  const next = demoEntry.tick({ now, revision: state?.revision, tracked: renderer.xr.isPresenting ? xrViewer.valid : !document.hidden });
  if (next.status === "idle") return;
  if (next.status === "changed") {
    demoTracking = false;
    setPhase("reference");
    toast("Scene updated. Select Build again.");
    return;
  }
  if (next.status === "ready") {
    demoTracking = false;
    setPhase("entry");
    enterWorld();
    return;
  }
  demoSeconds = next.seconds;
  demoTracking = next.status === "tracking";
  syncFlow();
}
const geometry = objectGeometry;
function renderScene(definition) {
  if (roomMode && isRawScanScene(definition)) definition = { ...definition, objects: [], actors: [] };
  renderedDefinition = definition;
  if (!definition.curves?.some((c) => c.id === selectedCurveId)) selectedCurveId = definition.curves?.at(-1)?.id || null;
  curveLayer.sync(definition.curves, selectedCurveId);
  floodRuntime.sync(definition);
  floodLayer.sync(definition);
  director?.sync(definition);
  doorGrab.sync(definition, { reset: doorResetPending });
  pathGuide.sync(definition.behaviors?.path);
  const nextPath = JSON.stringify(definition.behaviors?.path), nextBinding = JSON.stringify(definition.behaviors?.binding);
  if ((nextPath !== pathKey || nextBinding !== bindingKey || doorResetPending) && definition.behaviors?.path) director.freeze(definition.behaviors.path.actorIds);
  pathKey = nextPath;
  bindingKey = nextBinding;
  doorPlayer.sync(definition, { reset: doorResetPending });
  doorPerformance.sync(definition, { reset: doorResetPending });
  doorResetPending = false;
  director?.sync(definition);
  world.updateMatrixWorld(true);
  virtualRecorder?.syncDefinition(definition, world.matrixWorld);
  const ids = new Set(definition.objects.map((o) => o.id));
  for (const [id, mesh] of meshes) if (!ids.has(id)) {
    mesh.geometry.dispose();
    mesh.material.dispose();
    world.remove(mesh);
    meshes.delete(id);
  }
  for (const o of definition.objects) {
    let mesh = meshes.get(o.id);
    if (!mesh) {
      mesh = new THREE.Mesh(geometry(o), new THREE.MeshStandardMaterial());
      meshes.set(o.id, mesh);
      world.add(mesh);
    } else if (mesh.userData.definition?.shape !== o.shape || mesh.userData.definition?.kind !== o.kind) {
      mesh.geometry.dispose();
      mesh.geometry = geometry(o);
    }
    mesh.userData.definition = o;
    mesh.position.fromArray(o.position);
    mesh.scale.fromArray(o.size);
    if (o.quaternion) mesh.quaternion.fromArray(o.quaternion);
    else mesh.rotation.set(0, o.rotation, 0);
    if (mesh.material.vertexColors !== (o.kind === "camera")) {
      mesh.material.vertexColors = o.kind === "camera";
      mesh.material.needsUpdate = true;
    }
    mesh.material.color.set(blockoutColor(o, definition));
    mesh.material.roughness = o.roughness;
    mesh.material.metalness = o.metalness;
    mesh.material.emissive.set(o.id === "moon" || o.id.startsWith("star-") ? o.color : "#000000");
    mesh.material.emissiveIntensity = 0.35;
    mesh.visible = !(roomMode && mode === "overview" && isCeiling(o));
  }
  updateRoomAppearance();
  if (roomMode && definition.objects.some((o) => o.id === "ground")) {
    const dimensions = roomDimensions(definition);
    for (const key of ["width", "depth", "height"]) if (document.activeElement !== $("room-" + key)) $("room-" + key).value = dimensions[key].toFixed(2);
  }
  selection = selection.filter((id) => ids.has(id) || definition.actors?.some((a) => a.id === id));
  updateSelection();
  $("scene-title").textContent = uiText(definition.title);
  $("object-count").textContent = uiText(`${definition.objects.length} OBJECTS`);
  $("provenance").textContent = uiText(previewScene ? "Build preview · Not applied" : state?.source === "sample" ? "Procedural example · Not a photo reconstruction" : "Generated blockout · Includes inferred geometry");
  setHover([]);
  placeMarker();
  flowSignature = "";
  syncFlow();
}
function updateSelection() {
  for (const outline of outlines) {
    world.remove(outline);
    outline.geometry.dispose();
    outline.material.dispose();
  }
  outlines = [];
  world.updateMatrixWorld(true);
  for (const id of editing ? selection : []) {
    const mesh = meshes.get(id);
    if (!mesh) continue;
    const outline = new THREE.LineSegments(new THREE.EdgesGeometry(mesh.geometry), new THREE.LineBasicMaterial({ toneMapped: false, color: T.accent, depthTest: false }));
    outline.userData.id = id;
    outline.position.copy(mesh.position);
    outline.rotation.copy(mesh.rotation);
    outline.scale.copy(mesh.scale).multiplyScalar(1.01);
    outline.renderOrder = 9;
    world.add(outline);
    outlines.push(outline);
  }
  $("selection-count").textContent = uiText(`${selection.length} selected`);
  $("selection-label").textContent = uiText(selection.length ? selection.slice(0, 3).map((id) => uiName(allEntities(state.scene).find((o) => o.id === id)) || id).join(" / ") + (selection.length > 3 ? ` … ${selection.length} items total` : "") + (draftTool.active() ? " · Draft targets locked" : " · Hold trigger again to adjust") : "Enter edit mode, then point at an object to inspect and select it.");
}
function setHover(ids) {
  if (ids.join("|") === hoverIds.join("|")) return;
  hoverIds = [...ids];
  for (const outline of hoverOutlines) {
    world.remove(outline);
    outline.geometry.dispose();
    outline.material.dispose();
  }
  hoverOutlines = [];
  for (const id of ids) {
    const mesh = meshes.get(id);
    if (!mesh) continue;
    const outline = new THREE.LineSegments(new THREE.EdgesGeometry(mesh.geometry), new THREE.LineBasicMaterial({ toneMapped: false, color: T.selected, depthTest: false }));
    outline.userData.id = id;
    outline.position.copy(mesh.position);
    outline.rotation.copy(mesh.rotation);
    outline.scale.copy(mesh.scale).multiplyScalar(1.018);
    outline.renderOrder = 11;
    world.add(outline);
    hoverOutlines.push(outline);
  }
  $("selection-count").textContent = uiText(volume.isActive() ? `${ids.length} objects in selection box` : `${selection.length} selected`);
}
function entityIds(hit = sceneHit(raycaster)) {
  if (hit?.kind === "actor") return [hit.id];
  const o = hit?.object?.userData.definition;
  if (!o || o.id === "ground" && o.editable !== true) return [];
  return expandSelection(state.scene, tool === "group" ? state.scene.objects.filter((item) => item.group === o.group && (item.id !== "ground" || item.editable === true)).map((item) => item.id) : [o.id]);
}
function confirmSelection(ids) {
  if (draftTool.active() || openSourceMode && (!editing || production?.busy())) return;
  if (objectInteraction.active()) closeObjectInteraction();
  selection = expandSelection(state.scene, ids);
  syncingSelection = true;
  director?.select(selection.find((id) => state.scene.actors?.some((a) => a.id === id)) || null);
  syncingSelection = false;
  setHover([]);
  updateSelection();
  if (ids.some((id) => meshes.has(id))) action(() => studio.confirmedSelection())();
  else if (!ids.length) toast("No objects selected");
  syncFlow();
  if (selection.length) {
    if (renderer.xr.isPresenting) {
      if (openSourceMode) xrUI.openSelection();
      placeXRPanel();
    } else if (openSourceMode) desktopUI?.openSelection();
  }
}
function beginControllerVolume(controller) {
  if (volume.isActive()) return;
  if (phase !== "explore") {
    toast("Enter the world before using box selection");
    return;
  }
  if (busy()) {
    toast("Finish voice input or the current request / preview first");
    return;
  }
  if (director?.snapshot().placing) {
    toast(openSourceMode ? "Point at ground · A Place · B Cancel" : "Place actor: right trigger to confirm · A to cancel");
    return;
  }
  if (!editing) {
    toast("Click the right stick to edit, then hold the right grip for box selection");
    return;
  }
  tool = "object";
  raycaster.setFromXRController(controller);
  volumeController = controller;
  volume.begin(raycaster);
  toast("Point at the opposite corner · Right stick adjusts depth · Release grip to confirm");
}
function cancelVolume() {
  if (volume.isActive()) navigationGate.block();
  volume.cancel();
  volumeController = null;
  setHover([]);
  updateSelection();
  controls.enabled = mode === "overview" && !renderer.xr.isPresenting;
}
function finishVolume() {
  const ids = volume.finish();
  volumeController = null;
  navigationGate.block();
  controls.enabled = mode === "overview" && !renderer.xr.isPresenting;
  if (ids) {
    tool = "object";
    document.querySelectorAll("[data-tool]").forEach((b) => b.classList.toggle("active", b.dataset.tool === tool));
    confirmSelection(ids);
    updateHint();
  } else {
    setHover([]);
    updateSelection();
    toast("Selection box too small. Previous selection kept.");
  }
}
function setEditing(value) {
  if (openSourceMode && production) {
    if (value && (virtualRecorder?.snapshot().status === "recording" || production.state().monitor && production.busy())) {
      toast("Stop recording first.");
      return;
    }
    if (studio.getRecordingState() !== "idle" || draftTool.active() || director.snapshot().placing || volume.isActive() || currentJob || submitting) {
      toast("Finish or cancel the current voice, sketch or Agent operation.");
      return;
    }
    if (!production.setEditing(!!value && phase === "explore", phase === "explore" ? value ? "edit" : "explore" : "edit")) return;
    studio.cancelVoice();
    selection = [];
    agentSuggestions = null;
  }
  if (value) floodRuntime.stop();
  doorGrab.release();
  if (draftTool.active()) closeObjectInteraction();
  if (!value) cancelTransform();
  director?.cancelPlacement();
  editing = !!value && phase === "explore";
  cancelVolume();
  pointerFeedback.hide();
  rayFeedback.forEach((f) => f.hide());
  $("edit-toggle").textContent = uiText(editing ? "Exit edit mode" : "Enter edit mode");
  $("edit-toggle").classList.toggle("active", editing);
  updateObjectLabel();
  updateHint();
  setXRStatus(editing ? "Edit: Right trigger Select → Transform → Stick / Grip controls · A Save · B Revert" : "Explore · Click the right stick to edit");
  syncFlow();
}
function toggleEditing() {
  if (phase !== "explore") throw new Error("Enter the world first");
  if (director.snapshot().placing) throw new Error(openSourceMode ? "A Place actor or B Cancel first." : "Place the actor with the right trigger, or press A to cancel");
  if (!editing && busy()) throw new Error("Finish the current action first");
  if (tool === "anchor") tool = "object";
  setEditing(!editing);
  toast(editing ? "Edit mode: select with right trigger → Transform / Interaction / Other" : "Explore mode: interactions enabled · X Voice to summon Camera Agent");
}
function placeMarker() {
  marker.position.copy(anchor);
  marker.position.y = anchor.y + 0.1;
  marker.rotation.y = heading;
  marker.visible = phase === "entry";
}
function setTool(next) {
  if (phase !== "explore" && next !== "anchor") {
    toast("Enter the world before editing");
    return;
  }
  tool = next;
  cancelVolume();
  if (next !== "anchor") setEditing(true);
  document.querySelectorAll("[data-tool]").forEach((b) => b.classList.toggle("active", b.dataset.tool === tool));
  updateHint();
  placeMarker();
  setXRStatus(next === "region" ? "Hold right grip to select a box · Release to confirm · Right stick adjusts depth" : next === "anchor" ? "Point at an open area and press the trigger to choose an entry point" : `Selection mode: ${next === "group" ? "Group" : "Object"}`);
}
function updateHint() {
  if (openSourceMode && phase === "explore") {
    $("tool-hint").textContent = uiText(renderer.xr.isPresenting ? "Right trigger Select / Draw · A Confirm · B Cancel · X Voice · Y Menu" : "V Edit · X Voice · Y Tools · Enter Confirm · Esc Cancel");
    return;
  }
  if (draftTool.active()) {
    $("tool-hint").textContent = uiText(renderer.xr.isPresenting ? "Draft · Right trigger: draw · Left stick click: undo · A: cancel · B: record · Y: menu" : "Draft · Drag with left mouse: draw · Ctrl / ⌘ Z: undo · Esc: cancel · R: record");
    return;
  }
  $("tool-hint").textContent = uiText(phase === "reference" ? "Choose image → Build scene → Choose entry → Enter world" : phase === "entry" ? "Select an entry ring, or point at an open area" : editing && tool === "region" ? "Drag with the left mouse to box-select object centers" : mode === "overview" ? "Drag to orbit · Scroll to zoom" : "WASD: move · Q/E: vertical · Right mouse: look · V: edit");
  if (demoMode && ["reference", "entering"].includes(phase)) $("tool-hint").textContent = uiText("Choose image → Build scene → Enter after 3 seconds");
  if (roomMode && phase === "reference") $("tool-hint").textContent = uiText("Aim with the headset · Right trigger: photo · Menu: undo photo · Y: menu");
  if (roomMode && phase === "explore") $("tool-hint").textContent = uiText(`${editing ? "Edit · Hold trigger: adjust · Stick: turn / raise · Left stick click: undo · Right grip: box-select" : "Explore mode"} · Right stick / V: toggle · ${alignedMode ? "Physical movement 1:1" : "WASD / stick to move"} · B: record`);
  if (roomMode && phase === "welcome") $("tool-hint").textContent = uiText("Resume your work or capture a new room");
  if (roomMode && phase === "overview") $("tool-hint").textContent = uiText("Overview · Position preserved · Y: hide / show");
  if (phase === "calibrate") $("tool-hint").textContent = uiText("Use the Quest scan, or mark three corners and ceiling height with the right trigger");
}
function groundPoint() {
  world.updateMatrixWorld(true);
  const localRay = raycaster.ray.clone().applyMatrix4(world.matrixWorld.clone().invert());
  const ground = referenceFloor(state.scene);
  if (!ground) return null;
  return localRay.intersectPlane(new THREE.Plane(new THREE.Vector3(0, 1, 0), -(ground.position[1] + ground.size[1] / 2 + 0.01)), new THREE.Vector3());
}
function entryClear(point) {
  return entryIsClear(previewScene || state.scene, point.toArray());
}
function selectFromRay() {
  if (sceneMenuOpen()) return;
  if (phase === "explore" && !editing && !director?.snapshot().placing) return;
  if (busy()) {
    toast("Finish the current request or preview first");
    return;
  }
  if (!world.visible) {
    toast("Choose a reference and build first");
    return;
  }
  if (phase === "entry") {
    const portal = raycaster.intersectObjects(entryMarkers.children, false)[0];
    if (portal) {
      chooseEntry(portal.object.userData.entryIndex);
      return;
    }
    const point = groundPoint();
    if (!point || !entryClear(point)) {
      toast("Point at a clearer area of the floor");
      return;
    }
    entryCandidates = [{ position: point.toArray(), heading }, ...entryCandidates.slice(0, 2)];
    renderEntries();
    chooseEntry(0);
    flowSignature = "";
    syncFlow();
    toast("Entry point set");
    return;
  }
  if (director?.snapshot().placing) {
    director.interceptRay(raycaster);
    return;
  }
  if (phase === "explore" && editing) confirmSelection(entityIds());
}
function miniatureScale() {
  const definition = previewScene || state?.scene;
  if (isScanScene(definition)) return Math.min(0.28, 1.7 / scanPresentationBounds(definition).extent);
  const floor = definition?.objects.find((o) => o.id === "ground");
  return roomMode && floor ? Math.min(0.28, 1.7 / Math.max(floor.size[0], floor.size[2])) : 0.055;
}
function overview() {
  pausePerformance();
  director?.cancelPlacement();
  director?.clearTarget();
  spatialEpoch++;
  mode = "overview";
  alignedMode = false;
  cancelVolume();
  rig.position.set(0, 0, 0);
  rig.rotation.set(0, 0, 0);
  world.scale.setScalar(miniatureScale());
  roomCeilingVisibility();
  if (labelSprite) labelSprite.visible = false;
  if (renderer.xr.isPresenting) {
    scene.background = xrMode === "immersive-ar" ? null : new THREE.Color(T.background);
  } else {
    world.rotation.set(0, miniatureYaw, 0);
    const center = new THREE.Vector3(...scanPresentationBounds(previewScene || state?.scene).center);
    world.position.copy(center.multiply(world.scale).applyQuaternion(world.quaternion).negate());
    camera.position.set(0, 1.65, 3.5);
    camera.rotation.set(0, 0, 0);
    controls.target.set(0, 0.24, 0);
    controls.enabled = true;
    controls.update();
  }
  scene.fog = null;
  placeMarker();
  $("mode-badge").textContent = uiText("World overview");
  updateHint();
  placeXRPanel();
}
function enterWorld({ allowEstimated = false } = {}) {
  if (renderer.xr.isPresenting && !xrViewer.valid) {
    toast("Wait for headset tracking before entering");
    return;
  }
  if (busy()) {
    toast("Finish the current request or preview first");
    return;
  }
  if (roomMode && ["room-photos", "room-scan", "room-rebuilt"].includes(state?.source) && renderer.xr.isPresenting && !allowEstimated) {
    beginAlignmentCheck();
    return;
  }
  if (phase !== "entry" || !entryCandidates.length) {
    toast("Build a scene and choose an entry point first");
    return;
  }
  cancelVolume();
  if (!entryClear(anchor)) {
    toast("Entry point is obstructed. Choose an open area.");
    return;
  }
  mode = "inhabit";
  alignedMode = false;
  controls.enabled = false;
  world.position.set(0, 0, 0);
  world.rotation.set(0, 0, 0);
  world.scale.setScalar(1);
  roomCeilingVisibility();
  scene.background = roomMode && xrMode === "immersive-ar" ? null : new THREE.Color(T.background);
  scene.fog = roomMode ? null : new THREE.Fog(T.background, 35, 100);
  if (renderer.xr.isPresenting) {
    const view = currentView(), p = new THREE.Vector3(), q = new THREE.Quaternion();
    view.getWorldPosition(p);
    view.getWorldQuaternion(q);
    const direction = new THREE.Vector3(0, 0, -1).applyQuaternion(q);
    const currentYaw = Math.atan2(-direction.x, -direction.z), delta = heading - currentYaw;
    const offset = p.clone().sub(rig.position).applyAxisAngle(new THREE.Vector3(0, 1, 0), delta);
    rig.rotation.y += delta;
    rig.position.x = anchor.x - offset.x;
    rig.position.z = anchor.z - offset.z;
    rig.position.y = anchor.y;
  } else {
    rig.position.set(0, 0, 0);
    rig.rotation.set(0, 0, 0);
    camera.position.set(anchor.x, anchor.y + 1.65, anchor.z);
    desktopYaw = heading;
    desktopPitch = 0;
    camera.rotation.set(0, desktopYaw, 0, "YXZ");
  }
  setPhase("explore");
  tool = "object";
  setEditing(false);
  if (state.scene.floods?.length) floodRuntime.start();
  document.querySelectorAll("[data-tool]").forEach((b) => b.classList.toggle("active", b.dataset.tool === tool));
  placeMarker();
  $("mode-badge").textContent = uiText("Inside the world");
  updateHint();
  if (roomMode) creationReady();
  else placeXRPanel();
  toast("Explore mode · Right stick click: edit · Y: show / hide menu");
}
async function toggleVideo() {
  if (openSourceMode && virtualRecorder.snapshot().status !== "recording" && (editing || !state.scene.productionReady)) throw Error("Choose Finish setup in Edit mode before recording.");
  if (virtualRecorder.snapshot().canRetry && virtualRecorder.snapshot().status === "error") {
    await virtualRecorder.retry();
    return;
  }
  if (virtualRecorder.snapshot().status === "recording") {
    await virtualRecorder.stop();
    return;
  }
  if (busy() && !canRecordDraft()) throw new Error("Finish the current action before starting a recording");
  if (renderer.xr.isPresenting && !xrViewer.valid) throw new Error("Waiting for headset tracking");
  if (renderer.xr.isPresenting) {
    videoStartPending = { session: renderer.xr.getSession(), epoch: spatialEpoch };
    syncFlow();
    return;
  }
  resetHands();
  director.frame(0, 1, { showSelection: editing && !director.snapshot().placing });
  await beginVirtualRecording(director.frames(), doorPlayer.frame(0), handSample);
}
async function beginVirtualRecording(actorFrames, objectTransforms, hands) {
  if (mrShowcase) actorFrames = mrShowcase.frames();
  world.updateMatrixWorld(true);
  await virtualRecorder.start(state.scene, world.matrixWorld.clone(), production?.cameraView() || currentView(), actorFrames, objectTransforms, hands, handMetadata, { visible: mrShowcase ? world.visible : !["reference", "building", "welcome"].includes(phase), showcase: mrShowcase?.state() });
  setHover([]);
  if (labelSprite) labelSprite.visible = false;
  syncFlow();
}
async function refreshVideos() {
  const videos = await api("/api/recordings");
  $("video-list").replaceChildren();
  for (const video of videos.slice(0, 5)) {
    const a = document.createElement("a");
    a.href = video.url;
    a.download = `EmboDi-${video.id}.${video.mime === "video/mp4" ? "mp4" : "webm"}`;
    a.textContent = uiText(`Download reference video · ${Math.round(video.duration)} s`);
    a.className = "video-download";
    $("video-list").append(a);
    if (video.timelineUrl) {
      const link = document.createElement("a");
      link.href = video.timelineUrl;
      link.download = `EmboDi-${video.id}.timeline.json`;
      link.textContent = uiText("Download camera and event data");
      link.className = "video-download";
      $("video-list").append(link);
    }
  }
}
async function startXR(preparedMode = null) {
  if (startupRequired && !startupAccess?.ready()) {
    startupAccess?.show();
    return false;
  }
  cancelDemo("Select Build again in immersive mode");
  if (!navigator.xr) {
    toast("WebXR is unavailable. Open this page in Quest Browser.");
    return;
  }
  enteringXR = true;
  try {
    xrMode = preparedMode || (await navigator.xr.isSessionSupported("immersive-ar") ? "immersive-ar" : "immersive-vr");
    const preferUnbounded = roomMode && xrMode === "immersive-ar" && params.get("space") !== "local-floor";
    const session = await navigator.xr.requestSession(xrMode, roomXRFeatures({ ar: xrMode === "immersive-ar", planeRequired: startupRequired, preferUnbounded }));
    let chosen;
    try {
      chosen = await chooseRoomReferenceSpace(session, { preferUnbounded });
    } catch (error) {
      await session.end();
      throw error;
    }
    xrReference = { requested: preferUnbounded ? "unbounded" : "local-floor", active: chosen.type, fallbackReason: chosen.fallbackReason, compensatedResets: 0 };
    renderer.xr.setReferenceSpaceType(chosen.type);
    resetHands();
    controls.enabled = false;
    rig.position.set(0, 0, 0);
    rig.rotation.set(0, 0, 0);
    camera.position.set(0, 0, 0);
    camera.rotation.set(0, 0, 0);
    await renderer.xr.setSession(session);
    renderer.xr.setReferenceSpace(chosen.space);
    if (chosen.fallbackReason) toast("Unbounded unavailable · using local-floor");
    hadXRFrame = false;
    panelPlacement.reset();
    xrViewer.reset();
    roomTracking.reset();
    invalidateCreation();
    alignedMode = false;
    clearCalibrationMarkers();
    mode = "overview";
    world.scale.setScalar(miniatureScale());
    renderScene(previewScene || state.scene);
    roomCeilingVisibility();
    if (demoMode) setPhase("reference");
    else if (roomMode) {
      const next = roomSessionPhase({ phase, job: !!currentJob, ar: xrMode === "immersive-ar" });
      alignmentReturn = "overview";
      if (next === "entry") prepareEntries();
      else {
        setPhase(next);
        if (next === "align") {
          restoreAlignmentOnReady = true;
          alignmentStickReady = false;
        }
      }
    } else if (["explore", "calibrate"].includes(phase)) prepareEntries();
    scene.background = xrMode === "immersive-ar" ? null : new THREE.Color(T.background);
    scene.fog = null;
    xrPanel.visible = false;
    presentationVisible = false;
    document.body.classList.add("in-xr");
    showcaseEntryPending = quietShowcase;
    const bindReferenceReset = (reference) => {
      const onReset = (event) => {
        if (xrReference.active === "unbounded" && alignedMode) {
          const replacement = compensatedReferenceSpace(event);
          if (replacement) {
            reference.removeEventListener("reset", onReset);
            renderer.xr.setReferenceSpace(replacement);
            bindReferenceReset(replacement);
            xrReference.compensatedResets++;
            resetHands();
            xrViewer.reset();
            roomTracking.reset();
            lastTime = 0;
            virtualRecorder.event("reference-space-rebased", { type: "unbounded", transform: Array.from(event.transform.matrix) });
            return;
          }
        }
        production?.cancel();
        production?.closeMonitor();
        production?.pause();
        resetHands();
        cancelTransform("Tracking origin changed");
        pausePerformance();
        virtualRecorder.event("interruption", { reason: "XR-or-page-tracking" });
        virtualRecorder.stop("interrupted").catch(() => {
        });
        invalidateCreation();
        roomTracking.reset();
        clearCalibrationMarkers();
        xrViewer.reset();
        hadXRFrame = false;
        panelPlacement.reset();
        xrPanel.visible = false;
        const next = roomMode ? roomSessionPhase({ phase, event: "reset", job: !!currentJob }) : null;
        overview();
        if (roomMode) setPhase(next);
        else prepareEntries();
        showcaseEntryPending = quietShowcase;
        toast("Tracking origin changed. Confirm alignment before continuing.");
      };
      reference.addEventListener("reset", onReset);
    };
    bindReferenceReset(renderer.xr.getReferenceSpace());
    session.addEventListener("visibilitychange", () => {
      if (session.visibilityState === "hidden") {
        production?.cancel();
        production?.closeMonitor();
        production?.pause();
        studio.cancelVoice();
        resetHands();
        cancelTransform("Immersive session paused");
        pausePerformance();
        cancelDemo("Immersive session paused. Start entry again.");
        roomCamera?.stop("Immersive session paused. Camera closed; photos retained.");
        virtualRecorder.stop("interrupted").catch(() => {
        });
      }
    });
    session.addEventListener("end", () => {
      xrReference.active = null;
      demonstration?.stop()?.catch(() => {
      });
      production?.cancel();
      production?.closeMonitor();
      production?.pause();
      resetHands();
      cancelTransform("Immersive session ended");
      pausePerformance();
      cancelDemo();
      virtualRecorder.stop("interrupted").catch(() => {
      });
      roomCamera?.stop();
      studio.cancelVoice();
      cancelVolume();
      clearCalibrationMarkers();
      invalidateCreation();
      roomTracking.reset();
      xrUI.hideKeyboard();
      xrPanel.visible = false;
      document.body.classList.remove("in-xr");
      xrMode = null;
      xrViewer.reset();
      startupAccess?.reset();
      const next = roomMode ? roomSessionPhase({ phase, event: "end", job: !!currentJob }) : null;
      overview();
      if (demoMode) setPhase("reference");
      else if (roomMode) setPhase(next);
      else if (["explore", "calibrate"].includes(phase)) prepareEntries();
    });
    return true;
  } catch (error) {
    xrReference.active = null;
    toast(`Could not enter XR: ${error.message}`);
    return false;
  } finally {
    enteringXR = false;
  }
}
async function changeColor(color) {
  if (busy()) throw new Error("Finish the current request or preview first");
  if (!selection.length) throw new Error("Select objects before changing their color");
  acceptState(await api("/api/color", { revision: state.revision, ids: selection, color }));
  toast("Color updated");
}
async function undo() {
  if (draftTool.active()) {
    draftTool.undo();
    syncFlow();
    return;
  }
  if (transformTool.active()) {
    cancelTransform();
    return;
  }
  if (busy()) throw new Error("Finish the current request or preview first");
  acceptState(await api("/api/undo", { revision: state.revision }));
  virtualRecorder.event("undo", { revision: state.revision });
  toast("Last change undone");
}
async function saveScene() {
  if (saving) return;
  if (previewScene) throw new Error("Apply or discard the preview before saving");
  if (busy()) throw new Error("Finish the current action before saving");
  saving = true;
  syncFlow();
  try {
    const saved = await api("/api/save-scene", { revision: state.revision });
    acceptState(saved);
    virtualRecorder.event("sceneSaved", { revision: saved.revision });
    toast(`Saved ${saved.scene.objects.length} objects. This world will reopen next time.`);
  } finally {
    saving = false;
    syncFlow();
  }
}
async function refreshStoryboard() {
  return null;
}
function chooseStoryAct(id) {
  return null;
}
function paintStoryControls(context) {
  return null;
}
async function saveStoryAct() {
  return null;
}
async function loadStoryAct() {
  return null;
}
async function doorCommand(type, ids = selection, context) {
  if (phase !== "explore") throw new Error("Enter creation mode first");
  if (draftTool.active() || currentJob || submitting || saving || finishing || transformTool.active() || transformPending || volume.isActive() || virtualRecorder.snapshot().status === "saving") throw new Error("Finish the current action first");
  if (context && (context.revision !== state.revision || context.spatialContext?.spatialKey !== spatialKey())) throw new Error("Scene or alignment changed. Select the door again.");
  const object = ids.length === 1 && state.scene.objects.find((o) => o.id === ids[0]);
  if (!isDoor(object)) throw new Error("Select a blockout door first");
  saving = true;
  syncFlow();
  try {
    const command = { objectId: object.id, type };
    const next = await api("/api/doors", { revision: state.revision, command });
    doorPlayer.resume();
    acceptState(next);
    virtualRecorder.event("door-command", { ...command, revision: next.revision });
    const reply = type === "open" ? `Opening ${object.name}.` : type === "close" ? `Closing ${object.name}.` : "Opening direction changed. Try the door again.";
    toast(reply);
    return reply;
  } finally {
    saving = false;
    syncFlow();
  }
}
async function doorPerformanceCommand(type) {
  return null;
}
function updateDoorPerformance() {
  return null;
}
function acceptState(next) {
  if (state && next.revision !== state.revision && objectInteraction.active()) closeObjectInteraction("Scene changed. Draft closed.");
  if (state && next.revision === state.revision) {
    state = next;
    syncFlow();
    return;
  }
  if (transformTool.active()) cancelTransform("Scene version changed. Drag cancelled.");
  const previousFloor = referenceFloor(state?.scene), nextFloor = referenceFloor(next.scene);
  const changedSpace = !!previousFloor && JSON.stringify([previousFloor.position, previousFloor.size, previousFloor.rotation]) !== JSON.stringify([nextFloor?.position, nextFloor?.size, nextFloor?.rotation]);
  const needsRealign = changedSpace && alignedMode;
  if (changedSpace) invalidateCreation();
  const restored = !!state && next.storyRestore?.token !== state.storyRestore?.token;
  state = next;
  cancelVolume();
  if (restored) {
    presetSequence?.reset();
    director?.edit();
    director?.select(null);
    director?.cancelPlacement();
    selection = [];
    doorResetPending = true;
  }
  if (currentJob && !currentJob.applying && currentJob.revision !== state.revision && currentJob.kind !== "image") {
    const generated = currentJob.kind === "generate";
    if (currentJob.status === "running") api("/api/cancel-job", { id: currentJob.id }).catch(() => {
    });
    previewScene = null;
    currentJob = null;
    if (generated) setPhase("reference");
    $("job-panel").hidden = true;
    toast("Scene version changed. Start a new request.");
  }
  renderScene(state.scene);
  if (needsRealign) {
    pausePerformance();
    overview();
    setPhase("welcome");
    placeXRPanel();
    toast("Room structure changed. Confirm alignment before continuing.");
  } else if (phase === "entry" && !entryClear(anchor)) prepareEntries();
}
function jobControls(disabled) {
  for (const id of ["ask-codex", "generate", "generate-image"]) $(id).disabled = disabled;
}
async function startJob(kind, preset, conversationId = studio.conversationId, capturedContext = null) {
  if (openSourceMode && kind === "chat") kind = "agent";
  if (kind === "generate" && roomMode) {
    if (roomCamera.getPhotos().length < 4) throw new Error("Capture or upload at least four photos");
    await persistPhotos();
    if (scriptedMode) return scriptedRebuild();
  }
  const scanRebuild = kind === "generate" && roomMode && isScanScene(state?.scene);
  if (busy()) throw new Error("Finish the current request or preview first");
  if (openSourceMode && phase === "explore" && !editing && ["chat", "edit", "actor", "agent"].includes(kind)) throw Error("Switch to Edit mode to make changes.");
  if (["chat", "edit", "actor", "agent"].includes(kind) && phase !== "explore") throw new Error("Enter the world before editing with the agent");
  const prompt = (preset ?? (kind === "generate" ? roomMode ? (scanRebuild ? SCAN_REBUILD_INTENT : ROOM_INTENT) + (openSourceMode ? "\nUser follow-up: " + $("blueprint-prompt").value : "") : $("blueprint-prompt").value : $("edit-prompt").value)).trim();
  if (!prompt) throw new Error("Enter a description first");
  if (kind === "generate" && !scanRebuild && (roomMode ? !roomCamera.getPhotos().length : !referenceId && !uploadedImage)) throw new Error(roomMode ? "Capture room photos first" : "Choose a reference image first");
  const references = scanRebuild ? { sceneKind: "scan-rebuild", photoIds: roomCamera.getPhotos().map((p) => p.reference.id) } : kind === "generate" ? roomMode ? { sceneKind: "room", photoIds: roomCamera.getPhotos().map((p) => p.reference.id), ...roomTracking.candidate() ? { roomMetrics: roomTracking.candidate().metrics } : {} } : uploadedImage ? { image: uploadedImage } : { referenceId } : {};
  if (kind === "generate") {
    roomCamera?.stop("Camera closed. Building the room.");
    overview();
    setEditing(false);
    setPhase("building");
  }
  const context = capturedContext || dialogueContext();
  if (["chat", "edit", "actor", "agent"].includes(kind) && (context.revision !== state.revision || context.spatialContext?.spatialKey !== spatialKey())) throw new Error("Scene or alignment changed since you spoke. Submit again.");
  if (openSourceMode) {
    agentSuggestions = null;
    desktopUI?.collapse();
  }
  const jobSelection = context.ids, revision = context.revision, startedAt = Date.now();
  submitting = true;
  jobControls(true);
  syncFlow();
  try {
    const result = await api("/api/jobs", { kind, prompt, conversationId, actorId: context.actorId, curveId: context.curveId, ids: jobSelection, targetIds: context.targetIds, spatialContext: context.spatialContext, anchor: context.anchor, revision, ...references });
    currentJob = { ...result, kind, revision, sceneKind: references.sceneKind };
    submitting = false;
    setHover([]);
    cancelVolume();
    $("job-panel").hidden = false;
    $("job-message").textContent = uiText(kind === "generate" ? scanRebuild ? "Building an editable blockout from the scan…" : "Building a rough scene from references…" : "The agent is processing your request. You can keep looking around.");
    $("apply-job").hidden = true;
    $("discard-job").hidden = true;
    setXRStatus("Processing your request…");
    while (currentJob?.id === result.id) {
      if (Date.now() - startedAt > 66e4 * Math.max(1, Math.ceil((references.photoIds?.length || 0) / 6))) throw new Error("Generation timed out. Your saved scene is unchanged; retry or return to it.");
      await new Promise((resolve) => setTimeout(resolve, 1e3));
      const job = await api(`/api/jobs/${result.id}`);
      if (currentJob?.id !== result.id) break;
      if (job.status === "error") throw new Error(job.error);
      if (job.status === "cancelled") {
        currentJob = null;
        $("job-panel").hidden = true;
        if (kind === "generate") setPhase("reference");
        syncFlow();
        toast("Request stopped");
        break;
      }
      if (job.status === "running") {
        currentJob = { ...currentJob, ...job };
        syncFlow();
        const agentLabels = { flood: "Flood Agent · Reading regions and triggers", director: "Director Agent · Routing task", interaction: "Interaction Agent · Planning motion", motion: "Motion Agent · Generating motion", sketch: "Sketch Agent · Interpreting curve", recommendation: "Recommendation Agent · Preparing suggestions", "scene-construction": "Scene Agent · Preparing edits" };
        const label = agentLabels[job.stage] || (job.stage === "scan-reconstruction" ? "Building editable objects from scan contours" : job.stage === "scan-content" ? "Building from the scan with photo-based classification" : job.stage === "analysis" ? "Interpreting your request" : kind === "image" ? "Generating a reference image" : kind === "generate" ? "Building the blockout" : "Preparing changes");
        const progress = `${uiText(label)}${job.photoProgress ? " · Photo batch " + job.photoProgress.batch + "/" + job.photoProgress.batches + " · " + job.photoProgress.total + " photos" : ""} · ${Math.floor((Date.now() - startedAt) / 1e3)} s`;
        $("job-message").textContent = uiText(progress);
        setXRStatus(progress);
        continue;
      }
      if (job.result?.conversation) {
        studio.renderConversation(job.result.conversation);
        studio.say(job.result.reply);
      }
      if (job.status === "complete") {
        if (openSourceMode && job.result?.options?.length) agentSuggestions = { options: job.result.options, context: structuredClone(context), scope: suggestionScope(context) };
        currentJob = null;
        $("job-panel").hidden = true;
        if (kind === "image") {
          await studio.refreshLibrary();
          studio.chooseReference(job.result.image.id);
        } else toast("Agent replied");
        syncFlow();
        break;
      }
      if (job.status === "ready") {
        if (job.revision !== state.revision) throw new Error("Scene changed. Submit again.");
        if (job.spatialKey && job.spatialKey !== spatialKey()) throw new Error("Room alignment changed. Submit again.");
        currentJob = job;
        if (kind === "generate") setPhase("preview");
        const patch = ["chat", "agent"].includes(kind) ? job.result.patch : job.result;
        previewScene = kind === "agent" ? applyAgentResult(state.scene, job.result, job.ids) : kind === "actor" ? applyActorMotion(state.scene, job.result) : kind === "generate" ? job.result : job.result.transform ? applyTransform(state.scene, job.result.transform) : applyPatch(state.scene, patch, job.ids);
        renderScene(previewScene);
        if (kind === "generate") overview();
        else if (!openSourceMode && renderer.xr.isPresenting && !xrPanel.visible) {
          previewSummoned = true;
          placeXRPanel();
        }
        if (kind === "actor" || job.result.type === "motion") director.previewGenerated(job.result.actorId);
        if (job.result.type === "flood") previewFlood();
        if (job.result.transform) virtualRecorder.event("transform-preview", { operation: job.result.transform, revision: job.revision });
        $("job-message").textContent = "Preview: " + (kind === "generate" ? job.result.description : job.result.reply || patch?.explanation || "");
        $("apply-job").hidden = false;
        $("discard-job").hidden = false;
        toast("Preview ready · A Apply · B Discard");
        break;
      }
    }
  } catch (error) {
    const failed = currentJob;
    if (kind === "actor") director.edit();
    currentJob = null;
    if (failed?.status === "running") api("/api/cancel-job", { id: failed.id }).catch(() => {
    });
    previewScene = null;
    if (kind === "generate") setPhase("reference");
    renderScene(state.scene);
    $("job-panel").hidden = false;
    $("job-message").textContent = uiText(error.message);
    $("apply-job").hidden = true;
    $("discard-job").hidden = false;
    toast(error.message);
    throw error;
  } finally {
    submitting = false;
    jobControls(false);
    syncFlow();
  }
}
async function applyJob() {
  if (!currentJob || currentJob.status !== "ready") throw new Error("No result is ready to apply");
  if (currentJob.applying) return;
  const motionActor = currentJob.kind === "actor" || currentJob.result?.type === "motion" ? currentJob.result.actorId : null;
  const id = currentJob.id, generated = currentJob.kind === "generate", preserveSpace = ["scan-fill", "scan-rebuild"].includes(currentJob.sceneKind);
  currentJob.applying = true;
  syncFlow();
  try {
    const next = await api("/api/apply-job", { id, spatialKey: spatialKey() });
    virtualRecorder.event("agent-apply", { id, revision: next.revision });
    currentJob = null;
    previewScene = null;
    $("job-panel").hidden = true;
    acceptState(next);
    if (generated) {
      selection = [];
      if (!preserveSpace) invalidateCreation();
      overview();
      if (roomMode) resumeWorld();
      else prepareEntries();
    }
    renderScene(state.scene);
    if (motionActor) director.previewGenerated(motionActor);
    syncFlow();
    if (previewSummoned) {
      xrPanel.visible = false;
      previewSummoned = false;
    }
    toast(generated ? "Blockout applied. Continue creating." : "Changes applied");
  } catch (error) {
    if (currentJob) currentJob.applying = false;
    throw error;
  }
}
function discardJob() {
  if (currentJob?.status === "running" || submitting) {
    toast("Request is still running. Use Stop request.");
    return;
  }
  const actorPreview = currentJob?.kind === "actor" || currentJob?.result?.type === "motion", generated = currentJob?.kind === "generate";
  currentJob = null;
  previewScene = null;
  if (actorPreview) director.edit();
  if (generated) setPhase("reference");
  $("job-panel").hidden = true;
  if (state) renderScene(state.scene);
  syncFlow();
  if (previewSummoned) {
    xrPanel.visible = false;
    previewSummoned = false;
  }
}
async function cancelJob() {
  if (localPreparation) {
    localPreparation.abort();
    return;
  }
  if (demoEntry.active) {
    cancelDemo();
    return;
  }
  studio.cancelVoice();
  if (submitting) throw new Error("Request is submitting. Wait before stopping.");
  if (currentJob?.status === "running") {
    await api("/api/cancel-job", { id: currentJob.id });
    toast("Stopping request…");
  } else if (previewScene) discardJob();
  else toast("No request is running");
  syncFlow();
}
let pointerStart = null;
let lastPointer = null;
function pointerRay(event) {
  pointerInside = true;
  const rect = canvas.getBoundingClientRect();
  pointer.set((event.clientX - rect.left) / rect.width * 2 - 1, -(event.clientY - rect.top) / rect.height * 2 + 1);
  raycaster.setFromCamera(pointer, camera);
}
canvas.addEventListener("wheel", (event) => {
  if (draftTool.active() && draftTool.summary().mode === "space3d") {
    event.preventDefault();
    draftTool.depth(Math.sign(event.deltaY) * 0.05);
    syncFlow();
  }
}, { passive: false });
canvas.addEventListener("pointerdown", (event) => {
  pointerStart = { x: event.clientX, y: event.clientY, button: event.button };
  lastPointer = { x: event.clientX, y: event.clientY };
  if (sceneMenuOpen()) {
    pointerStart.handled = true;
    return;
  }
  if (draftTool.active()) {
    pointerStart.handled = true;
    if (event.button === 0) {
      pointerRay(event);
      canvas.setPointerCapture(event.pointerId);
      action(() => draftTool.begin(raycaster, "mouse"))();
    }
    return;
  }
  if (event.button === 0 && !director?.snapshot().placing && editing && tool === "region" && !busy() && !renderer.xr.isPresenting) {
    controls.enabled = false;
    pointerRay(event);
    volume.begin(raycaster);
    canvas.setPointerCapture(event.pointerId);
  } else if (event.button === 0 && !renderer.xr.isPresenting) {
    pointerRay(event);
    if (phase === "explore" && editing && !director.snapshot().placing) {
      pointerStart.handled = true;
      canvas.setPointerCapture(event.pointerId);
      action(() => pressSelection("mouse"))();
    }
  }
});
canvas.addEventListener("pointermove", (event) => {
  if (renderer.xr.isPresenting) return;
  pointerRay(event);
  if (sceneMenuOpen()) {
    lastPointer = { x: event.clientX, y: event.clientY };
    return;
  }
  if (draftTool.active()) {
    draftTool.update(raycaster, "mouse");
    return;
  }
  if (volume.isActive()) {
    pointerRay(event);
    volume.update(raycaster);
  } else if (mode === "inhabit" && event.buttons === 2 && lastPointer) {
    desktopYaw -= (event.clientX - lastPointer.x) * 4e-3;
    desktopPitch = THREE.MathUtils.clamp(desktopPitch - (event.clientY - lastPointer.y) * 4e-3, -1.4, 1.4);
    camera.rotation.set(desktopPitch, desktopYaw, 0, "YXZ");
  }
  lastPointer = { x: event.clientX, y: event.clientY };
});
canvas.addEventListener("pointerup", (event) => {
  if (sceneMenuOpen()) {
    pointerStart = null;
    return;
  }
  if (draftTool.active()) {
    if (event.button === 0) draftTool.release("mouse");
    pointerStart = null;
    syncFlow();
    return;
  }
  if (transformOwner === "mouse") {
    action(finishTransform)();
    pointerStart = null;
    return;
  }
  if (volume.isActive() && !volumeController) {
    finishVolume();
    pointerStart = null;
    return;
  }
  if (!pointerStart || pointerStart.button !== 0) return;
  if (!pointerStart.handled && Math.hypot(event.clientX - pointerStart.x, event.clientY - pointerStart.y) < 6) {
    pointerRay(event);
    selectFromRay();
  }
  pointerStart = null;
});
canvas.addEventListener("pointercancel", () => {
  draftTool.suspend("Pointer interrupted. Unfinished stroke discarded.");
  pointerStart = null;
  pointerInside = false;
  cancelVolume();
  cancelTransform();
});
canvas.addEventListener("pointerleave", () => {
  draftTool.suspend("Pointer left the canvas. Unfinished stroke discarded.");
  pointerInside = false;
  pointerFeedback.hide();
  if (!volume.isActive()) setHover([]);
});
canvas.addEventListener("pointerenter", (event) => {
  if (!renderer.xr.isPresenting) pointerRay(event);
});
canvas.addEventListener("contextmenu", (event) => event.preventDefault());
addEventListener("keydown", (event) => {
  if ($("startup-access").open) return;
  if (mrShowcase && event.code === "KeyX" && !["INPUT", "TEXTAREA", "SELECT"].includes(event.target.tagName)) {
    event.preventDefault();
    return;
  }
  if (event.code === "KeyX" && demonstrationMode() && !["INPUT", "TEXTAREA", "SELECT"].includes(event.target.tagName) && !$("settings-dialog").open) {
    event.preventDefault();
    if (!event.repeat) action(toggleDemonstration)();
    return;
  }
  if ((scriptedMode || openSourceMode) && event.code === "KeyX" && !["INPUT", "TEXTAREA", "SELECT"].includes(event.target.tagName) && !$("settings-dialog").open) {
    event.preventDefault();
    if (!event.repeat) studio.startVoice();
    return;
  }
  if (["INPUT", "TEXTAREA", "SELECT"].includes(event.target.tagName) || $("settings-dialog").open) return;
  if (openSourceMode && !event.repeat) {
    if (studio.getVoiceDraft() && ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.code)) {
      event.preventDefault();
      studio.pageVoice(["ArrowUp", "ArrowLeft"].includes(event.code) ? -1 : 1);
      return;
    }
    if (event.code === "KeyY") {
      event.preventDefault();
      toggleMenu();
      return;
    }
    if (event.code === "Enter" && !["BUTTON", "A", "SUMMARY"].includes(event.target.tagName)) {
      event.preventDefault();
      action(confirmAuthoring)();
      return;
    }
  }
  if (draftTool.active()) {
    if (event.repeat) return;
    if (event.code === "Escape" || event.code === "KeyP") {
      event.preventDefault();
      closeObjectInteraction();
    } else if ((event.ctrlKey || event.metaKey) && event.code === "KeyZ") {
      event.preventDefault();
      draftTool.undo();
      syncFlow();
    } else if (event.code === "KeyR") action(toggleVideo)();
    return;
  }
  keys.add(event.code);
  if ((transformTool.active() || production?.manipulating()) && event.code.startsWith("Arrow")) event.preventDefault();
  if ((event.ctrlKey || event.metaKey) && event.code === "KeyZ" && editing) {
    event.preventDefault();
    if (!event.repeat) action(undo)();
    return;
  }
  if (!event.repeat && event.code === "KeyR") action(toggleVideo)();
  if (!event.repeat && phase === "explore") {
    if (event.code === "Space") {
      event.preventDefault();
      action(togglePreview)();
    }
    if (event.code === "KeyP") action(toggleActorPlacement)();
    if (event.code === "KeyV") action(toggleEditing)();
  }
  if (event.code === "Escape" && !event.repeat) action(cancelCurrentOperation)();
});
document.addEventListener("visibilitychange", () => {
  if (document.hidden && (scriptedMode || openSourceMode)) studio.cancelVoice();
  if (document.hidden) {
    production?.cancel();
    production?.closeMonitor();
  }
  if (document.hidden && !renderer.xr.isPresenting && !enteringXR && !startupAccess?.snapshot().preparing) {
    cancelTransform("Page paused");
    pausePerformance();
    cancelDemo("Page paused. Start entry again.");
    roomCamera?.stop("Page paused. Camera closed; photos retained.");
    virtualRecorder?.stop("interrupted").catch(() => {
    });
  }
});
addEventListener("pagehide", () => {
  demonstration?.stop()?.catch(() => {
  });
  studio?.cancelVoice();
  roomCamera?.stop();
  startupAccess?.dispose();
});
addEventListener("pageshow", (event) => {
  if (event.persisted) startupAccess?.reset();
});
addEventListener("keyup", (event) => {
  keys.delete(event.code);
  if (mrShowcase && event.code === "KeyX") {
    action(() => showcaseCue())();
    return;
  }
  if ((scriptedMode || openSourceMode) && event.code === "KeyX" && !demonstrationMode()) studio.stopVoice();
});
addEventListener("blur", () => {
  if (scriptedMode || openSourceMode) studio.cancelVoice();
  keys.clear();
  draftTool.suspend("Window lost focus. Unfinished stroke discarded.");
  if (!renderer.xr.isPresenting) {
    cancelVolume();
    cancelTransform("Window lost focus");
  }
});
addEventListener("resize", () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});
document.querySelectorAll("[data-tool]").forEach((button) => button.addEventListener("click", () => setTool(button.dataset.tool)));
document.querySelectorAll("[data-color]").forEach((button) => button.addEventListener("click", action(() => {
  $("color").value = button.dataset.color;
  return changeColor(button.dataset.color);
})));
$("anchor-tool").onclick = () => setTool("anchor");
$("enter-world").onclick = enterWorld;
$("overview").onclick = action(showOverview);
$("enter-xr").onclick = () => startupRequired ? startupAccess?.show() : startXR();
$("edit-toggle").onclick = action(toggleEditing);
$("heading").oninput = () => {
  heading = Number($("heading").value) * Math.PI / 180;
  $("heading-value").textContent = uiText(`${$("heading").value}°`);
  placeMarker();
};
function setDepth(value) {
  const depth = volume.setDepth(value);
  $("volume-depth").value = String(depth);
  $("depth-value").textContent = uiText(depth.toFixed(1) + " m");
  if (volume.isActive()) setXRStatus(`${hoverIds.length} items · Depth ${depth.toFixed(1)} m · Release grip to confirm`);
}
$("volume-depth").oninput = () => setDepth(Number($("volume-depth").value));
$("apply-color").onclick = action(() => changeColor($("color").value));
$("undo").onclick = action(undo);
$("generate").onclick = action(() => startJob("generate"));
$("apply-job").onclick = action(applyJob);
$("discard-job").onclick = discardJob;
$("cancel-job").onclick = action(cancelJob);
async function restore(path) {
  requireSpatialIdle();
  acceptState(await api(path, { revision: state.revision }));
  anchor.set(0, 0, 8);
  heading = 0;
  $("heading").value = "0";
  $("heading-value").textContent = uiText("0°");
  selection = [];
  updateSelection();
  overview();
  prepareEntries();
  toast("Scene loaded. Undo can restore the previous scene.");
}
$("resume-world").onclick = action(resumeWorld);
$("new-world").onclick = action(newWorld);
$("save-scene").onclick = action(saveScene);
$("reset").onclick = action(() => restore("/api/reset"));
$("restore-checkpoint").onclick = action(() => restore("/api/restore-checkpoint"));
$("image-input").onchange = action(async () => {
  const file = $("image-input").files[0];
  if (!file) return;
  if (file.size > 6 * 1024 * 1024) throw new Error("Choose an image smaller than 6 MB");
  uploadedImage = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
  referenceId = null;
  selectedReference = { title: file.name, url: uploadedImage };
  xrUI.setReference(selectedReference);
  syncFlow();
  document.querySelectorAll(".image-card").forEach((card) => card.classList.remove("selected"));
  $("image-preview").src = uploadedImage;
  $("image-preview").hidden = false;
  $("image-name").textContent = uiText(file.name);
  if (!$("blueprint-prompt").value) $("blueprint-prompt").value = "Create an inhabitable blockout from this image, preserving spatial relationships and colors.";
});
function toggleActorPlacement() {
  if (phase !== "explore") throw new Error("Enter the room first");
  if (volume.isActive()) throw new Error("Release the right grip to finish box selection");
  if (busy() && !director.snapshot().placing) throw new Error("Finish the current action first");
  if (openSourceMode && !editing) throw Error("Click the right stick to enter Edit mode.");
  director.togglePlacement();
  if (openSourceMode && director.snapshot().placing) {
    xrPanel.visible = false;
    xrUI?.dismissDialogue();
    desktopUI?.collapse();
    updatePresentationVisibility();
  }
  setHover([]);
  syncFlow();
}
function handleQuestAction(name, controller) {
  if (openSourceMode && name === "productionGrab") {
    raycaster.setFromXRController(controller);
    production?.grab(controllerGrips[controllers.indexOf(controller)], raycaster);
    return;
  }
  if (openSourceMode && name === "productionRelease") {
    production?.release();
    return;
  }
  if (immersiveShowcase()) {
    if (name === "showcaseAdvance") {
      action(() => showcaseCue())();
      return;
    }
    if (!["record", "doorGrab", "doorRelease"].includes(name)) return;
  }
  if (mrShowcase && phase === "explore") {
    if (name === "voicePress") return;
    if (name === "voiceRelease") {
      action(() => showcaseCue())();
      return;
    }
    if (name === "transport") {
      toast(mrShowcase.transport());
      return;
    }
    if (name === "cancel" && !xrPanel.visible) {
      mrShowcase.pause();
      doorPlayer.pause();
      return;
    }
  }
  if (name === "draftCancel") {
    closeObjectInteraction();
    return;
  }
  if (name === "draftUndo") {
    draftTool.undo();
    syncFlow();
    return;
  }
  if (name === "draftBusy") {
    toast("Draft: right trigger to draw · Left stick click to undo · A to cancel");
    return;
  }
  const actions = {
    confirm: () => confirmAuthoring(controller),
    menuConfirm: () => xrUI.confirmFocused(),
    draftConfirm: () => saveCurve(),
    cancel: cancelCurrentOperation,
    demonstrationToggle: toggleDemonstration,
    doorGrab: () => {
      const hand = handSample.hands.find((h) => h.side === "right" && h.tracked);
      if (phase === "explore" && !editing && !xrPanel.visible && !busy()) doorGrab.grab(hand?.pose.positionMeters);
    },
    doorRelease: () => doorGrab.release(),
    menu: toggleMenu,
    edit: toggleEditing,
    undo,
    voicePress: () => studio.startVoice(),
    voiceRelease: () => studio.stopVoice(),
    transport: togglePreview,
    record: toggleVideo,
    actorPlace: toggleActorPlacement,
    volumeBegin: () => {
      if (controller) beginControllerVolume(controller);
    },
    volumeEnd: () => {
      if (volumeController === controller) finishVolume();
    },
    editRequired: () => toast("Click the right stick to edit, then hold the right grip for box selection"),
    placementBusy: () => toast("Place actor: right trigger to confirm · A to cancel"),
    gestureBusy: () => toast("Release the trigger or grip to finish the adjustment or selection")
  };
  action(actions[name])();
}
function move(dt) {
  if (renderer.xr.isPresenting) {
    if (!hadXRFrame && panelPlacement.ready(currentView(), performance.now(), xrViewer.valid)) {
      hadXRFrame = true;
      placeXRPanel();
      placeMarker();
    }
    const sources = [...renderer.xr.getSession().inputSources].filter((s) => s.gamepad);
    for (const source of sources) {
      const controller = controllers.find((c) => c.userData.inputSource === source || c.userData.inputSource?.handedness === source.handedness);
      const menuStep = menuNavigation.sample(source, openSourceMode && (xrPanel.visible || !!studio.getVoiceDraft()));
      if (menuStep) {
        if (studio.getVoiceDraft()) studio.pageVoice(menuStep);
        else xrUI.moveFocus(menuStep);
      }
      for (const event of questButtons.sample(source)) {
        const name = questButtonAction(event, { showcase: immersiveShowcase(), authoring: openSourceMode, phase, editing, demonstrating: demonstrationMode(), voiceState: openSourceMode ? studio.getRecordingState() : "idle", blocked: shortcutBlocked(), scripted: scriptedMode, drafting: draftTool.active(), menuOpen: xrPanel.visible, confirmReady: openSourceMode && currentJob?.status === "ready" && !currentJob?.applying && studio.getRecordingState() === "idle", draftReady: openSourceMode && draftTool.active() && !draftTool.summary().drawing, grabbing: !!doorGrab.snapshot().grabbed, placing: director.snapshot().placing || !!production?.state().placing, selectingVolume: volume.isActive(), transforming: transformTool.active() || !!transformPending || !!production?.manipulating() });
        traceInput("xr-button-edge", { ...event, action: name });
        if (name) handleQuestAction(name, controller);
      }
    }
    if (!xrViewer.valid) return;
    if (openSourceMode && studio.getRecordingState() !== "idle") {
      navigationGate.block();
      return;
    }
    if (phase === "align") {
      offsetAlignment(sources, dt);
      return;
    }
    if (openSourceMode && production?.manipulating()) {
      if (!xrPanel.visible) production.input(sources, dt);
      return;
    }
    if (openSourceMode && xrPanel.visible) {
      navigationGate.block();
      return;
    }
    if (shortcutBlocked() || demonstrationMode() || director.snapshot().placing || production?.state().placing) return;
    if (draftTool.active()) return;
    if (transformTool.active()) {
      const pad = transformOwner?.userData?.inputSource?.gamepad;
      if (!transformOwner?.visible || !pad) cancelTransform("Controller tracking interrupted");
      else {
        raycaster.setFromXRController(transformOwner);
        transformTool.update(raycaster, dt, pad.axes[2] ?? 0, pad.axes[3] ?? 0);
      }
      return;
    }
    const mayNavigate = navigationGate.sample(sources.flatMap((s) => [s.gamepad.axes[2] ?? 0, s.gamepad.axes[3] ?? 0]));
    let turn = 0;
    for (const source of sources) {
      const pad = source.gamepad, x = pad.axes[2] ?? 0, y = pad.axes[3] ?? 0, dead = (v) => Math.abs(v) > 0.17 ? v : 0;
      if (volume.isActive()) {
        if (source.handedness === "right" && dead(y)) setDepth(volume.getDepth() - dead(y) * dt * 7);
        continue;
      }
      if (transformPending || !mayNavigate || phase !== "explore" || mode !== "inhabit" || alignedMode) continue;
      if (source.handedness === "left") {
        const q = new THREE.Quaternion();
        currentView().getWorldQuaternion(q);
        const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(q);
        forward.y = 0;
        forward.normalize();
        const right = new THREE.Vector3(-forward.z, 0, forward.x);
        rig.position.add(forward.multiplyScalar(-dead(y)).addScaledVector(right, dead(x)).multiplyScalar(dt * 3));
      } else if (source.handedness === "right") {
        rig.position.y = THREE.MathUtils.clamp(rig.position.y - dead(y) * dt * 2, -0.8, 35);
        turn = x;
      }
    }
    if (volumeController && volume.isActive()) {
      raycaster.setFromXRController(volumeController);
      volume.update(raycaster);
    }
    if (transformPending || !mayNavigate || phase !== "explore" || mode !== "inhabit" || volume.isActive() || alignedMode) return;
    if (Math.abs(turn) < 0.3) snapReady = true;
    if (Math.abs(turn) > 0.75 && snapReady) {
      const p = new THREE.Vector3();
      currentView().getWorldPosition(p);
      const angle = -Math.sign(turn) * Math.PI / 6;
      rig.position.sub(p).applyAxisAngle(new THREE.Vector3(0, 1, 0), angle).add(p);
      rig.rotation.y += angle;
      snapReady = false;
    }
    rig.position.x = THREE.MathUtils.clamp(rig.position.x, -80, 80);
    rig.position.z = THREE.MathUtils.clamp(rig.position.z, -80, 80);
  } else {
    if (openSourceMode && studio.getRecordingState() !== "idle") return;
    if (openSourceMode && production?.state().placing) return;
    if (openSourceMode && production?.manipulating()) {
      production.input([{ handedness: "left", gamepad: { buttons: [{}, { pressed: keys.has("ShiftLeft") || keys.has("ShiftRight") }], axes: [0, 0, (keys.has("KeyD") ? 1 : 0) - (keys.has("KeyA") ? 1 : 0), (keys.has("KeyS") ? 1 : 0) - (keys.has("KeyW") ? 1 : 0)] } }, { handedness: "right", gamepad: { axes: [0, 0, (keys.has("ArrowRight") ? 1 : 0) - (keys.has("ArrowLeft") ? 1 : 0), (keys.has("ArrowDown") ? 1 : 0) - (keys.has("ArrowUp") ? 1 : 0)] } }], dt);
      return;
    }
    if (draftTool.active()) return;
    if (transformTool.active()) {
      raycaster.setFromCamera(pointer, camera);
      transformTool.update(raycaster, dt, (keys.has("ArrowRight") ? 1 : 0) - (keys.has("ArrowLeft") ? 1 : 0), (keys.has("ArrowDown") ? 1 : 0) - (keys.has("ArrowUp") ? 1 : 0));
      return;
    }
    const navigating = ["KeyW", "KeyA", "KeyS", "KeyD", "KeyQ", "KeyE", "ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"].some((k) => keys.has(k));
    if (transformPending || !navigationGate.sample([navigating ? 1 : 0])) return;
    if (mode === "inhabit" && !volume.isActive() && !["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement?.tagName) && !$("settings-dialog").open) {
      const forward = new THREE.Vector3(-Math.sin(desktopYaw), 0, -Math.cos(desktopYaw)), right = new THREE.Vector3(Math.cos(desktopYaw), 0, -Math.sin(desktopYaw));
      const speed = dt * (keys.has("ShiftLeft") ? 7 : 3);
      camera.position.addScaledVector(forward, ((keys.has("KeyW") ? 1 : 0) - (keys.has("KeyS") ? 1 : 0)) * speed);
      camera.position.addScaledVector(right, ((keys.has("KeyD") ? 1 : 0) - (keys.has("KeyA") ? 1 : 0)) * speed);
      camera.position.y = THREE.MathUtils.clamp(camera.position.y + ((keys.has("KeyE") ? 1 : 0) - (keys.has("KeyQ") ? 1 : 0)) * speed, 0.35, 40);
    }
  }
}
function updateInteractionFeedback() {
  if (immersiveShowcase()) {
    pointerFeedback.hide();
    rayFeedback.forEach((f) => f.hide());
    outlines.forEach((o) => o.visible = false);
    actorArrows.forEach((o) => o.visible = false);
    entryMarkers.visible = marker.visible = calibrationMarkers.visible = calibrationCursor.visible = false;
    if (labelSprite) labelSprite.visible = false;
    xrUI.setHovered([]);
    setHover([]);
    return;
  }
  calibrationMarkers.visible = true;
  const placing = director.snapshot().placing || !!production?.state().placing, decorations = phase === "explore" && editing && !placing && !draftTool.active();
  for (const outline of outlines) outline.visible = decorations;
  const canHover = decorations && !sceneMenuOpen() && !busy() && tool !== "anchor", canPoint = !sceneMenuOpen() && world.visible && !draftTool.active() && (phase === "explore" && (canHover || placing) || phase === "entry");
  let hovered = [];
  const menuHover = [];
  scene.updateMatrixWorld(true);
  const viewerPosition = currentView().getWorldPosition(new THREE.Vector3());
  function feedback(view, ray, { right = true, menuHit = null } = {}) {
    let hit = menuHit;
    if (menuHit) menuHover.push(menuHit.object);
    if (!hit && right && canPoint) hit = sceneHit(ray);
    if (!menuHit && canHover && right) hovered = entityIds(hit);
    const selected = hit?.kind === "actor" ? director.snapshot().selected === hit.id : selection.includes(hit?.object?.userData.definition?.id);
    view.update(ray, { enabled: !!menuHit || renderer.xr.isPresenting && xrPanel.visible || right && (canPoint || phase === "calibrate" || volume.isActive() || transformTool.active()), hit: hit || null, color: menuHit || hit ? T.accent : T.selected, viewerPosition });
  }
  if (renderer.xr.isPresenting) {
    pointerFeedback.hide();
    controllers.forEach((controller, index) => {
      if (!xrViewer.valid || !controller.userData.inputSource || !controller.visible) {
        rayFeedback[index].hide();
        return;
      }
      raycaster.setFromXRController(controller);
      feedback(rayFeedback[index], raycaster, { right: controller.userData.inputSource.handedness === "right", menuHit: volume.isActive() ? null : xrUI.hit(raycaster) });
    });
  } else {
    rayFeedback.forEach((f) => f.hide());
    if (pointerInside) {
      raycaster.setFromCamera(pointer, camera);
      feedback(pointerFeedback, raycaster);
    } else pointerFeedback.hide();
  }
  xrUI.setHovered(menuHover);
  if (!volume.isActive()) setHover(hovered);
}
function requireCapture() {
  if (phase !== "reference" || !roomMode) throw new Error("Return to room capture first");
  if (busy()) throw new Error("Finish the current action first");
}
async function toggleRoomCamera() {
  requireCapture();
  if (["active", "starting"].includes(roomCamera.snapshot().state)) roomCamera.stop();
  else await roomCamera.start($("room-camera-device").value);
}
async function takeRoomPhoto() {
  requireCapture();
  const photo = roomCamera.capture();
  await persistPhoto(photo);
  virtualRecorder.event("photoCaptured", { id: photo.id, capturedAt: photo.capturedAt, index: roomCamera.snapshot().count });
  toast(`Photo ${roomCamera.snapshot().count} captured`);
}
function removeRoomPhoto() {
  requireCapture();
  roomCamera.removeLast();
}
async function switchRoomCamera() {
  requireCapture();
  const capture = roomCamera.snapshot(), index = capture.devices.findIndex((d) => d.deviceId === capture.deviceId), next = capture.devices[(index + 1) % capture.devices.length];
  if (next) {
    $("room-camera-device").value = next.deviceId;
    await roomCamera.start(next.deviceId);
  } else await roomCamera.start();
}
function paintCapture(capture) {
  $("room-video").hidden = capture.state !== "active";
  $("camera-placeholder").hidden = capture.state === "active";
  $("camera-message").textContent = uiText(capture.message);
  $("capture-tip").textContent = uiText(capture.tip);
  $("photo-count").textContent = uiText(`${capture.count} photos · Minimum 4`);
  $("remove-room-photo").disabled = !capture.count || capture.reading || !!currentJob;
  $("room-files").disabled = capture.reading || !!currentJob;
  const select = $("room-camera-device"), key = JSON.stringify(capture.devices);
  if (select.dataset.devices !== key) {
    select.dataset.devices = key;
    select.replaceChildren();
    const automatic = document.createElement("option");
    automatic.value = "";
    automatic.textContent = uiText("Auto-select environment camera");
    select.append(automatic);
    for (const device of capture.devices) {
      const option = document.createElement("option");
      option.value = device.deviceId;
      option.textContent = uiText(device.label);
      select.append(option);
    }
  }
  if (capture.deviceId) select.value = capture.deviceId;
  const photos = roomCamera?.getPhotos() || [], signature = photos.map((p) => p.id + ":" + (p.reference?.id || "")).join("|");
  if (signature !== photoSignature) {
    photoSignature = signature;
    $("room-photos").replaceChildren();
    for (const [index, photo] of photos.entries()) {
      const figure = document.createElement("figure"), image = document.createElement("img"), caption = document.createElement("figcaption");
      image.src = photo.image;
      image.alt = uiText(`Room reference photo ${index + 1}`);
      caption.textContent = uiText(`${index + 1} · ${photo.label}`);
      const remove = document.createElement("button");
      remove.textContent = uiText("Remove / retake");
      remove.onclick = () => roomCamera.remove(photo.id);
      figure.append(image, caption, remove);
      $("room-photos").append(figure);
    }
  }
  if (photoReview >= photos.length) photoReview = photos.length - 1;
  xrUI?.setRoomCamera($("room-video"), capture.state === "active" && photoReview < 0, photoReview >= 0 ? photos[photoReview] : photos.at(-1));
  syncFlow();
}
$("capture-stop").onclick = () => flowActions[scriptDemo?.snapshot().busy ? "scriptCancel" : "scriptStop"]();
$("capture-rec").onclick = action(toggleVideo);
function reviewPhoto(index) {
  photoReview = index;
  paintCapture(roomCamera.snapshot());
}
const flowActions = { voiceConfirm: () => studio.confirmVoice(), voiceRetry: () => studio.startVoice({ auto: true }), voiceCancel: () => studio.cancelVoice(), voicePrevious: () => studio.pageVoice(-1), voiceNext: () => studio.pageVoice(1), motionReplay: () => {
  if ((currentJob?.kind === "actor" || currentJob?.result?.type === "motion") && currentJob.status === "ready") director.previewGenerated(currentJob.result.actorId);
}, drawFloor: () => beginCurve("floor2d"), drawSpace: () => beginCurve("space3d"), brushNear: () => {
  draftTool.depth(-0.2);
  syncFlow();
}, brushFar: () => {
  draftTool.depth(0.2);
  syncFlow();
}, curveNext: nextCurve, curveRemove: removeCurve, actorPreview: () => openSourceMode ? startObjectPreview({ ids: [director.snapshot().selected] }) : director.start({ actorIds: [director.snapshot().selected] }), actorAgent: () => studio.getRecordingState() === "recording" ? studio.stopVoice() : studio.startVoice(), photoReview: () => reviewPhoto(0), photoPrevious: () => reviewPhoto(Math.max(0, photoReview - 1)), photoNext: () => reviewPhoto(Math.min(roomCamera.getPhotos().length - 1, photoReview + 1)), photoDelete: () => {
  const p = roomCamera.getPhotos()[photoReview];
  if (p) roomCamera.remove(p.id);
}, photoReviewClose: () => reviewPhoto(-1), descriptionSubmit: submitDescription, descriptionCancel: () => {
  describing = false;
  syncFlow();
}, demonstrationApply: installDemonstratedDoor, demonstrationStart: startDemonstration, demonstrationStop: stopDemonstration, demonstrationRetry: retryDemonstration, interactionDemonstration: openDemonstration, interactionDescribe: describeInteraction, draftApply: () => openSourceMode ? saveCurve() : preparePath(dialogueContext(), () => {
}), draftClear: () => {
  draftTool.clear();
  syncFlow();
}, pathReset: resetPath, bindDoor: () => prepareBinding(dialogueContext(), () => {
}), sourceImages: () => {
  newWorld();
  $("room-files").click();
}, sourcePhotos: async () => {
  newWorld();
  await toggleRoomCamera();
}, scriptCancel: () => {
  localPreparation?.abort();
  scriptDemo?.cancel();
  presetSequence?.cancel();
  pausePerformance();
  syncFlow();
}, scriptStop: () => {
  scriptDemo?.cancel();
  presetSequence?.pause();
  pausePerformance();
  syncFlow();
}, presetConfirm: confirmCurrentPreview, presetCancel: () => {
  presetSequence.cancel();
  pausePerformance();
}, objectInteraction: openObjectInteraction, objectTransform: beginObjectTransform, interactionDraft: beginObjectDraft, interactionVoice: beginObjectVoice, interactionClose: closeObjectInteraction, draftCancel: closeObjectInteraction, draftUndo: () => {
  draftTool.undo();
  syncFlow();
}, gripTiltDown: () => resizeHands(0, 0, false, -10), gripTiltUp: () => resizeHands(0, 0, false, 10), handSmaller: () => resizeHands(-0.05), handLarger: () => resizeHands(0.05), armShorter: () => resizeHands(0, -0.05), armLonger: () => resizeHands(0, 0.05), bodyReset: () => resizeHands(0, 0, true), storySave: saveStoryAct, storyLoad: loadStoryAct, storyAct1: () => chooseStoryAct("act-1"), storyAct2: () => chooseStoryAct("act-2"), storyAct3: () => chooseStoryAct("act-3"), storyAct4: () => chooseStoryAct("act-4"), storyRefresh: refreshStoryboard, doorCastConfigure: () => doorPerformanceCommand("configure"), doorCastReset: () => doorPerformanceCommand("reset"), doorToggle: () => doorCommand(selectedDoorContext()?.effect?.open ? "close" : "open", [selectedDoorContext()?.id]), doorHinge: () => doorCommand("hinge", [selectedDoorContext()?.id]), doorDirection: () => doorCommand("direction", [selectedDoorContext()?.id]), overlayRoom: () => setRoomDisplay(0.5), solidRoom: () => setRoomDisplay(1), cuteStyle: () => director.setStyle("cute"), zombieStyle: () => director.setStyle("zombie"), actorRemove: () => director.command("Remove this actor", director.captureContext()), finish: finishCreation, confirmAlignment: () => applyRoomAlignment(pendingAlignment), cancelAlignment, refreshAlignment: beginAlignmentCheck, manualAlignment: beginCalibration, opacityDown: () => changeOpacity(-0.1), opacityUp: () => changeOpacity(0.1), actorDelayDown: () => changeActorDelay(-0.5), actorDelayUp: () => changeActorDelay(0.5), actorAssign: () => director.nextMotion(), actorClearMotion: () => director.assignMotion(null), actorPlace: toggleActorPlacement, actorTransport: togglePreview, actorStart: () => openSourceMode ? startObjectPreview() : director.start(), actorStop: () => director.stop(), actorEdit: () => director.edit(), camera: toggleRoomCamera, capture: takeRoomPhoto, removePhoto: removeRoomPhoto, switchCamera: switchRoomCamera, generate: () => startJob("generate"), demoBuild: beginDemo, enter: enterWorld, visit: () => enterWorld({ allowEstimated: true }), align: beginAlignmentCheck, useScan: () => previewAlignment(roomTracking.candidate()), applyCalibration: () => {
  previewAlignment(pendingAlignment);
  placeXRPanel();
}, restartCalibration: beginCalibration, cancelCalibration: beginAlignmentCheck, rotateRoom, roomScan: requestRoomScan, record: toggleVideo, nextEntry: () => chooseEntry((chosenEntry + 1) % entryCandidates.length), overview: showOverview, edit: toggleEditing, voice: () => studio.getRecordingState() === "recording" ? studio.stopVoice() : studio.startVoice(), send: () => openSourceMode ? studio.confirmVoice() : studio.sendText(), apply: applyJob, discard: discardJob, save: saveScene, undo, cancel: cancelJob, cancelOperation: cancelCurrentOperation, newWorld, resume: resumeWorld, end: () => renderer.xr.getSession()?.end() };
flowActions.videoFiles = () => toast("Recordings are saved locally. Download from Scene tools → Recording and export on desktop.");
flowActions.dismissSuggestions = () => {
  agentSuggestions = null;
  syncFlow();
};
flowActions.suggestion = chooseSuggestion;
for (const percent of [30, 50, 70]) flowActions["transparency" + percent] = () => setSceneTransparency(percent);
flowActions.regionDraft = beginRegionDraft;
flowActions.regionSurface = () => {
  draftTool.toggleSurface();
  xrPanel.visible = false;
  desktopUI?.collapse();
  syncFlow();
};
flowActions.floodPreview = previewFlood;
flowActions.draftSmooth = () => {
  draftTool.cycleSmoothing();
  syncFlow();
};
director = createDirector({ world, assets: actorAssets, authoring: openSourceMode, deferNewMotion: () => openSourceMode || storyboardState.enabled, getState: () => state, getPhase: () => phase, spatialKey, viewPosition: actorViewPosition, pickGround: actorGround, occlusionDistance: (r) => visibleGeometryHit(r)?.distance ?? Infinity, api, acceptState, notify: (message, meta) => {
  if (!captureUI || !meta?.status) toast(message);
}, canPlay: () => scriptPermit || presetPermit || !busy() && !demonstrationMode() && !presetSequence?.blocksPlayback(), canEdit: () => !production?.busy() && (scriptPermit || presetPermit || !scriptDemo?.snapshot().busy) && (presetPermit || !presetSequence?.busy()) && !demonstrationMode() && !localPreparation && !draftTool.active() && !transformTool.active() && !transformPending && !currentJob && !submitting && !saving && virtualRecorder?.snapshot().status !== "saving", onSelect: (id) => {
  if (!syncingSelection && !draftTool.active()) {
    selection = id ? [id] : [];
    setHover([]);
    updateSelection();
  }
}, mapFrames: (frames, clock) => {
  const mapped = state?.scene.behaviors?.path ? pathFrames(state.scene.behaviors.path, frames, clock.time, actorAssets).map((f, i) => frames[i].motionPlan ? frames[i] : f) : frames;
  return production ? production.isolateActors(mapped) : mapped;
}, pathCompleted: (clock) => !state?.scene.actors?.some((a) => a.motionPlan) && state?.scene.behaviors?.path ? clock.time >= state.scene.behaviors.path.length / state.scene.behaviors.path.speed : null, recordEvent: (type, detail) => {
  traceInput(type);
  virtualRecorder?.event(type, detail);
  const alias = { "performance-start": "previewStarted", "performance-stop": "previewPaused", "performance-armed": "motionPrepared" }[type];
  if (alias) virtualRecorder?.event(alias, detail);
} });
studio = createStudio({ mediaDevices: sessionMedia?.mediaDevices || navigator.mediaDevices, scriptedMode, voiceOnly: openSourceMode, getScripted: () => scriptDemo, api, getContext: dialogueContext, handleText: directorText, canInterrupt: presetInterrupt, onVoiceCapture: (context) => {
  if (openSourceMode) {
    production?.release();
    doorGrab.release();
    keys.clear();
    navigationGate.block();
    xrUI?.showDialogue();
    agentSuggestions = null;
    desktopUI?.collapse();
    xrPanel.visible = false;
    setHover([]);
  }
  if (storyboardState.enabled && !state.scene.actors?.length && context.actorTarget) director.lockPlacement(context.actorTarget);
}, onVoiceFinish: () => {
  if (!presetSequence?.busy()) director.unlockPlacement();
}, requestJob: startJob, onReference: (item) => {
  referenceId = item.id;
  uploadedImage = null;
  selectedReference = item;
  xrUI?.setReference(item);
  $("blueprint-prompt").value = "Create an inhabitable blockout from this reference. Preserve its layout and colors; infer unseen areas.";
  syncFlow();
}, onLibrary: (items) => xrUI?.setLibrary(items), onReadout: (update) => {
  if (update.dialogue) captureDialogue = update.dialogue;
  else if (update.message !== void 0) {
    if (update.role === "user") captureDialogue = { userText: update.message, agentText: "" };
    else captureDialogue = { ...captureDialogue, agentText: update.message };
  }
  if (openSourceMode && update.recording === "recording" && xrPanel) xrPanel.visible = false;
  if (update.message !== void 0) latestReply = (update.role === "user" ? "You: " : "Agent: ") + update.message;
  xrUI?.readout(update);
  syncFlow();
}, notify: toast });
demonstration = createDemonstration({ onChange: () => syncFlow() });
if (openSourceMode) desktopUI = createAuthoringDesktop({ run: (id) => action(() => flowAction(id))(), onToggle: toggleMenu });
xrUI = createXRStudio({ getDraft: () => describing ? descriptionText : studio.getDraft(), setDraft: (value) => {
  if (describing) {
    descriptionText = value;
    $("capture-description").value = value;
    syncFlow();
  } else studio.setDraft(value);
}, actions: { cinema: (id) => action(() => cinemaAction(id))(), ...Object.fromEntries(Object.entries(flowActions).map(([id, fn]) => [id, action(fn)])), suggestion: (index) => action(() => chooseSuggestion(index))(), reference: (id) => studio.chooseReference(id) } });
xrPanel = xrUI.group;
scene.add(xrPanel);
xrViewer.view.add(xrUI.notice, xrUI.dialogue);
panelPlacement = createCreationLayout(xrPanel, world);
overview();
syncFlow();
if (openSourceMode) desktopUI.update(flowContext());
const uploadedVideos = /* @__PURE__ */ new WeakMap();
const takeUpload = createTakeUpload({ onChange: () => {
  if (virtualRecorder) syncFlow();
} });
virtualRecorder = createVirtualRecorder({ sink: takeUpload, assets: actorAssets, includeActorPreviews: () => openSourceMode || showcaseMode || storyboardState.enabled, contentFactory: (w, v) => mrShowcase ? createShowcaseContent(w, v, mrShowcase.preset) : null, onChange: (status) => {
  syncFlow();
  if (status.result && status.result.id !== videoSignature) {
    videoSignature = status.result.id;
    action(refreshVideos)();
    toast("Reference video saved. Download it from the desktop page.");
  }
}, upload: async (blob, metadata, timeline) => {
  let entry = uploadedVideos.get(blob);
  if (!entry) {
    entry = await api(`/api/recordings?${new URLSearchParams(metadata)}`, void 0, { method: "POST", headers: { "Content-Type": blob.type }, body: blob, timeoutMs: 9e4 });
    uploadedVideos.set(blob, entry);
  }
  return api(`/api/recordings/${entry.id}/timeline`, timeline);
} });
presetSequence = createPresetSequence({ delayMs: openSourceMode ? 0 : 2e3, getContext: () => presetContext(), onChange: (request) => {
  if (["cancelled", "error"].includes(request?.status)) {
    pausePerformance();
    latestReply = "Agent: " + request.message;
  }
  flowSignature = "";
  syncFlow();
  if (request?.status === "ready") placeXRPanel();
} });
roomCamera = createRoomCamera({ mediaDevices: sessionMedia?.mediaDevices || navigator.mediaDevices, video: $("room-video"), onChange: paintCapture });
paintCapture(roomCamera.snapshot());
if (startupRequired) startupAccess = createStartupAccess({ dialog: $("startup-access"), media: sessionMedia, camera: roomCamera, scriptedMode, onEnter: startXR });
$("capture-description").oninput = () => {
  descriptionText = $("capture-description").value;
};
$("category-legend").replaceChildren();
for (const item of Object.values(CATEGORIES)) {
  const span = document.createElement("span"), dot = document.createElement("i");
  dot.style.background = item.color;
  span.append(dot, document.createTextNode(uiText(item.label)));
  $("category-legend").append(span);
}
$("manual-alignment").onclick = action(beginCalibration);
$("align-room").onclick = action(beginAlignmentCheck);
$("rotate-room").onclick = action(rotateRoom);
$("show-room-overview").onclick = action(showOverview);
$("room-scan").onclick = action(requestRoomScan);
$("apply-room-size").onclick = action(applyRoomSize);
$("record-video").onclick = action(toggleVideo);
$("hand-size-value").textContent = uiText(`Hands ${Math.round(handSize * 100)}% · Arms ${Math.round(armSize * 100)}% · Grip tilt ${gripTilt}°`);
for (const id of ["handSmaller", "handLarger", "armShorter", "armLonger", "gripTiltDown", "gripTiltUp", "bodyReset"]) $(id).onclick = action(flowActions[id]);
$("room-opacity").onchange = () => setSceneTransparency(Number($("room-opacity").value));
for (const button of document.querySelectorAll("[data-transparency]")) button.onclick = () => setSceneTransparency(Number(button.dataset.transparency));
$("actor-place").onclick = action(toggleActorPlacement);
$("actor-start").onclick = action(() => openSourceMode ? startObjectPreview() : director.start());
$("actor-transport").onclick = action(togglePreview);
$("actor-edit").onclick = () => director.edit();
$("actor-focus").onclick = action(focusSelectedActor);
$("actor-motion-save").onclick = action(() => director.assignMotion($("actor-motion").value || null));
for (const style of ["cute", "zombie"]) $("actor-style-" + style).onclick = action(() => director.setStyle(style));
$("story-act").onchange = () => chooseStoryAct($("story-act").value);
$("story-close").onclick = () => {
  $("storyboard-panel").hidden = true;
};
for (const [id, command] of [["door-toggle", "doorToggle"], ["door-hinge", "doorHinge"], ["door-direction", "doorDirection"], ["door-cast-configure", "doorCastConfigure"], ["door-cast-reset", "doorCastReset"]]) $(id).onclick = action(flowActions[command]);
$("actor-select").onchange = () => {
  if (!draftTool.active()) director.select($("actor-select").value || null);
};
$("actor-delay-save").onclick = action(async () => {
  await director.change({ delay: Number($("actor-delay").value) });
  toast("Entry timing saved for the next playback");
});
$("actor-remove").onclick = action(() => director.command("Remove this actor", director.captureContext()));
$("remove-room-photo").onclick = action(removeRoomPhoto);
$("room-files").onchange = action(async () => {
  requireCapture();
  try {
    await roomCamera.addFiles([...$("room-files").files]);
    await persistPhotos();
  } finally {
    $("room-files").value = "";
  }
});
$("room-camera-device").onchange = action(async () => {
  requireCapture();
  await roomCamera.start($("room-camera-device").value);
});
try {
  await virtualRecorder.recover();
} catch (error) {
  toast("Could not read local recording: " + error.message);
}
try {
  const loaded = await loadActorAssets();
  for (const [id, asset] of loaded) actorAssets.set(id, asset);
} catch (error) {
  toast(error.message);
}
if (scriptedMode) await initializeScript();
try {
  acceptState(await api("/api/state"));
  overview();
  if (demoMode || roomMode && (params.get("capture") === "1" || state.source === "room-draft" || isRawScanScene(state.scene))) setPhase("reference");
  else if (roomMode) setPhase(openSourceMode ? "overview" : "welcome");
  else prepareEntries();
  await studio.initialize({ loadLibrary: !roomMode });
  if (roomMode) {
    await refreshVideos();
    await refreshStoryboard();
  }
  const health = await api("/api/health");
  $("connection").textContent = uiText(health.codexAvailable ? "Local server · Codex available" : "Local server · Codex unavailable");
  $("connection-dot").classList.add("ready");
} catch (error) {
  toast(error.message);
}
const showcaseSphere = new THREE.Mesh(new THREE.SphereGeometry(0.12, 24, 16), new THREE.MeshBasicMaterial({ color: 16777215, toneMapped: false }));
showcaseSphere.visible = false;
scene.add(showcaseSphere);
if (showcaseMode && state?.scene.showcase) {
  mrShowcase = createMRPerformance({ world, views: director.layer.views, assets: actorAssets, config: state.scene.showcase, applyActors: (frames) => director.layer.apply(frames, { opacity: 1 }), onEvent: (type, detail) => virtualRecorder.event(type, detail) });
  const panel = document.createElement("div");
  panel.id = "mr-showcase-controls";
  panel.hidden = true;
  panel.style.cssText = "position:fixed;top:20px;right:20px;z-index:80;gap:12px";
  for (const [label, fn] of [["Next cue · X", () => showcaseCue()], ["Reset performance", () => resetShowcase()]]) {
    const b = document.createElement("button");
    b.textContent = label;
    b.onclick = action(fn);
    panel.append(b);
  }
  document.body.append(panel);
  renderer.xr.addEventListener("sessionstart", () => panel.hidden = true);
  renderer.xr.addEventListener("sessionend", () => panel.hidden = false);
  document.title = "EmboDi · Lab Showcase";
}
if (startupRequired) startupAccess.show();
const stream = new EventSource("/api/events");
stream.onmessage = (event) => acceptState(JSON.parse(event.data));
stream.onerror = () => {
  $("connection").textContent = uiText("Connection lost. Reconnecting…");
  $("connection-dot").classList.remove("ready");
};
stream.onopen = () => {
  $("connection").textContent = uiText("Local server connected");
  $("connection-dot").classList.add("ready");
};
if (openSourceMode) {
  production = createProductionStudio({ world, scene, renderer, api, getState: () => state, getSelection: () => selection, getView: currentView, getSpatialKey: spatialKey, getMeshes: () => meshes, pickGround: actorGround, canCreate: () => !busy() && !director.snapshot().placing, canMonitor: () => !currentJob && !submitting && !saving && !finishing && !director.snapshot().placing && !draftTool.active() && !transformTool.active() && !volume.isActive() && !doorGrab.snapshot().grabbed, assets: actorAssets, onState: acceptState, onSelect: (id) => confirmSelection([id]), onPlay: startObjectPreview, onPreview: (next) => {
    previewScene = next;
    renderScene(next || state.scene);
  }, onChange: () => {
    flowSignature = "";
    syncFlow();
  }, notice: toast, hideMenu: () => {
    xrPanel.visible = false;
    xrUI?.dismissDialogue();
    desktopUI?.collapse();
    updatePresentationVisibility();
  }, pauseScene: () => {
    pausePerformance();
    director.edit();
  }, transport: (action2, scope) => {
    if (action2 === "pause") {
      floodRuntime.pause();
      if (director.snapshot().mode === "running") director.stop();
      return;
    }
    if (action2 === "resume") {
      floodRuntime.resume();
      const cast = state.scene.doorPerformance, waitingForDoor = cast?.enabled && scope.ownerIds.includes(cast.doorId) && !doorPerformance.snapshot().triggered;
      if (!waitingForDoor && scope.actorIds.length && director.snapshot().mode === "paused") presetOperation(() => director.resume());
      return;
    }
    director.edit();
    floodRuntime.start(scope.floodIds);
    if (scope.actorIds.length) presetOperation(() => {
      const cast = state.scene.doorPerformance;
      if (cast?.enabled && scope.ownerIds.includes(cast.doorId)) director.arm(scope.actorIds);
      else director.start({ actorIds: scope.actorIds });
    });
  } });
  await production.initialize();
}
renderer.setAnimationLoop((time, frame) => {
  if (renderer.xr.isPresenting) {
    xrViewer.update(frame, renderer.xr.getReferenceSpace());
    const floor = referenceFloor(state?.scene);
    roomTracking.update(frame, renderer.xr.getReferenceSpace(), time, floor ? floor.size[0] / floor.size[2] : 1);
    if (!xrViewer.valid) {
      scriptDemo?.cancel("Waiting for headset tracking. Submit this line again.");
      if (!hadXRFrame) panelPlacement.ready(currentView(), time, false);
      cancelTransform("Waiting for headset tracking");
      pausePerformance();
      if (virtualRecorder.snapshot().status === "recording") virtualRecorder.stop("interrupted").catch(() => {
      });
    }
  }
  const elapsed = lastTime ? Math.max(0, (time - lastTime) / 1e3) : 0;
  lastTime = time;
  move(Math.min(elapsed, 0.05));
  if (showcaseEntryPending && mrShowcase && renderer.xr.isPresenting && xrViewer.valid) {
    showcaseEntryPending = false;
    action(resumeWorld)();
  }
  updateAlignmentPreview();
  if (quietShowcase && phase === "align" && pendingAlignment && xrViewer.valid) applyRoomAlignment(pendingAlignment);
  updateDemo(performance.now());
  if (controls.enabled) controls.update();
  updateActorTarget();
  updateCalibrationCursor();
  updateDraftDrawing();
  presetSequence?.validate();
  scriptDemo?.validate();
  rig.updateWorldMatrix(true, true);
  world.updateWorldMatrix(true, false);
  currentView().updateWorldMatrix(true, false);
  handSample = handInput.sample({ frame, time, session: renderer.xr.getSession(), referenceSpace: renderer.xr.getReferenceSpace(), rigMatrix: rig.matrixWorld, worldMatrix: world.matrixWorld, headWorldMatrix: currentView().matrixWorld, enabled: renderer.xr.isPresenting && xrViewer.valid && phase === "explore" && mode === "inhabit" && world.visible });
  handLayer.apply(handSample);
  pathGuide.show(!immersiveShowcase() && phase === "explore" && !draftTool.active() && (editing || director.snapshot().mode === "paused"));
  const rightHand = handSample.hands.find((h) => h.side === "right" && h.tracked), rightSource = Array.from(renderer.xr.getSession()?.inputSources || []).find((s) => s.handedness === "right"), gripHeld = !!rightSource?.gamepad?.buttons[1]?.pressed;
  const grabFrames = doorGrab.frame(elapsed, rightHand?.pose.positionMeters, { held: gripHeld, active: phase === "explore" && !editing && !xrPanel.visible && !busy() && xrViewer.valid }), grabIds = new Set(grabFrames.map((d) => d.id));
  const objectTransforms = [...doorPlayer.frame(elapsed).filter((d) => !grabIds.has(d.id)), ...grabFrames, ...liveTransforms().filter((o) => "rotation" in o)];
  applyLiveTransforms(objectTransforms);
  const cueChanged = updateDoorPerformance();
  let actorFrames = director.frame(cueChanged ? 0 : elapsed, openSourceMode || roomMode && renderer.xr.isPresenting && xrMode === "immersive-ar" ? roomOpacity : 1, { showSelection: phase === "explore" && editing && !draftTool.active() && !director.snapshot().placing, selectedIds: [...selection, ...volume.isActive() ? hoverIds : []], overrides: [...liveTransforms().filter((o) => "yaw" in o), ...(production?.livePoses() || []).filter((p) => state.scene.actors?.some((a) => a.id === p.id))] });
  updateActorArrows();
  if (mrShowcase) {
    const active = phase === "explore" && mode === "inhabit" && (!renderer.xr.isPresenting || xrViewer.valid && alignedMode);
    actorFrames = mrShowcase.evaluate(elapsed, active, 1);
    const opacity = mrShowcase.state().roomOpacity;
    if (roomOpacity !== opacity) {
      roomOpacity = opacity;
      updateRoomAppearance();
    }
    updatePresentationVisibility();
    const ending = active && mrShowcase.state().sphereVisible;
    if (ending && !showcaseSphere.visible) {
      const view = currentView();
      view.getWorldPosition(showcaseSphere.position);
      showcaseSphere.position.add(new THREE.Vector3(0, -0.1, -1).applyQuaternion(view.getWorldQuaternion(new THREE.Quaternion())));
    }
    showcaseSphere.visible = ending;
  }
  if (videoStartPending) {
    const pending = videoStartPending;
    videoStartPending = null;
    if (pending.session === renderer.xr.getSession() && pending.epoch === spatialEpoch && xrViewer.valid) {
      beginVirtualRecording(actorFrames, objectTransforms, handSample).catch((error) => toast(error.message));
    }
  }
  const flowPreviewReady = !!previewScene && currentJob?.status === "ready" && currentJob.result?.type === "flood";
  const floodState = floodRuntime.tick({ now: time / 1e3, position: actorViewPosition().toArray(), active: phase === "explore" && (!editing || flowPreviewReady) && !draftTool.active() && !transformTool.active() && !volume.isActive() && !submitting && (!currentJob || currentJob.status === "ready") && !document.hidden, tracked: !renderer.xr.isPresenting || xrViewer.valid && renderer.xr.getSession()?.visibilityState === "visible" });
  const activeFlood = floodState.states.find((s) => s.inside && !s.fired) || floodState.states.find((s) => floodState.activeIds?.includes(s.id)), floodPlan = renderedDefinition?.floods?.find((f) => f.id === activeFlood?.id);
  floodStatus.hidden = renderer.xr.isPresenting || !floodState.armed || phase !== "explore" || !floodPlan;
  if (floodPlan) floodStatus.textContent = uiText(activeFlood.fired ? "Triggered · Say “replay interaction” to restart" : activeFlood.inside ? `Dwell: ${activeFlood.dwell.toFixed(1)} / ${floodPlan.trigger.seconds} s` : `Enter the floor region and dwell for more than ${floodPlan.trigger.seconds} s`);
  updateInteractionFeedback();
  updateObjectLabel();
  xrUI.updateNotice(renderer.xr.isPresenting);
  if (renderer.xr.isPresenting) updateUIFoveation(xrPanel.visible || xrUI.dialogue.visible || xrUI.notice.visible);
  const cinemaFrames = production?.frame(elapsed, actorFrames, objectTransforms, floodState, { now: time / 1e3, position: actorViewPosition().toArray(), active: phase === "explore" && !editing && !document.hidden, tracked: !renderer.xr.isPresenting || xrViewer.valid && renderer.xr.getSession()?.visibilityState === "visible" }) || [];
  floodLayer.frame(floodState, { showRegions: phase === "explore" && !draftTool.active(), opacity: openSourceMode ? roomOpacity : 1 });
  for (const outline of [...outlines, ...hoverOutlines]) {
    const mesh = meshes.get(outline.userData.id);
    if (mesh) {
      outline.position.copy(mesh.position);
      outline.quaternion.copy(mesh.quaternion);
    }
  }
  if (openSourceMode) for (const light of scene.children.filter((o) => o.isLight)) {
    light.userData.baseIntensity ??= light.intensity;
    light.intensity = light.userData.baseIntensity * ((previewScene || state.scene).objects.some((o) => o.kind === "light") ? 0.18 : 1);
  }
  const overlay = roomMode && renderer.xr.isPresenting && xrMode === "immersive-ar" && roomOpacity < 1 && world.visible;
  roomOcclusion.render(renderer, scene, camera, overlay ? [...meshes.values(), ...[...director.layer.views.values()].map((v) => v.mesh), ...handLayer.meshes] : [], { enabled: overlay });
  virtualRecorder.frame(time, production?.cameraView() || currentView(), actorFrames, [...new Map([...objectTransforms, ...cinemaFrames.filter((p) => state.scene.objects.find((o) => o.id === p.id)?.track)].map((p) => [p.id, p])).values()], handSample, { productionTime: production?.state().time || 0, ...production ? { previewObjectIds: production.state().previewObjectIds, triggerClocks: production.state().triggers.clocks } : {}, cameraId: production?.state().selectedCamera, floodState, matrix: world.matrixWorld, visible: mrShowcase ? world.visible : !["reference", "building", "welcome"].includes(phase), phase, showcase: mrShowcase?.state() });
  frameCount++;
  syncFlow();
});
function showcaseCue() {
  return null;
}
async function resetShowcase() {
  return null;
}
