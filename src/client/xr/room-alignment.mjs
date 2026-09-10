import { alignedRoomPose, scanPresentationBounds } from "../ui/creation-layout.mjs";
import { referenceFloor, isScanScene } from "../../shared/scene-space.mjs";
import { applyRoomCorrection, roomCorrection } from "../../shared/room-placement.mjs";
import * as THREE from "three";
import { floorIntersection, calibrationFromCorners, ceilingHeightAtWall } from "../../shared/room-spatial.mjs";
import { roomDimensions } from "../../shared/room.mjs";
import { UI_THEME as T } from "../../shared/ui-theme.mjs";
import { createUICanvas, createUITexture } from "../ui/ui-resolution.mjs";
import { uiText } from "../../shared/ui-text.mjs";
function createRoomAlignment(appRuntime) {
  function clearCalibrationMarkers() {
    for (const child of [...appRuntime.calibrationMarkers.children]) {
      appRuntime.calibrationMarkers.remove(child);
      child.geometry?.dispose();
      child.material?.map?.dispose();
      child.material?.dispose();
    }
    appRuntime.calibrationCursor.visible = false;
  }
  function beginAlignmentCheck({ restore: restore2 = false } = {}) {
    appRuntime.requireSpatialIdle();
    if (!["room-photos", "room-scan", "room-rebuilt"].includes(appRuntime.state?.source)) throw new Error("Load a built room first");
    if (!appRuntime.renderer.xr.isPresenting || appRuntime.xrMode !== "immersive-ar") throw new Error("Confirm alignment in Quest passthrough mode");
    if (!appRuntime.xrViewer.valid) throw new Error("Waiting for headset tracking");
    if (!["align", "calibrate"].includes(appRuntime.phase)) {
      appRuntime.alignmentReturn = appRuntime.phase;
      appRuntime.rememberCreation();
    }
    appRuntime.pausePerformance();
    appRuntime.roomCamera.stop();
    appRuntime.setEditing(false);
    appRuntime.selection = [];
    appRuntime.pendingAlignment = null;
    appRuntime.measurePoints = [];
    clearCalibrationMarkers();
    appRuntime.restoreAlignmentOnReady = restore2;
    appRuntime.alignmentStickReady = false;
    appRuntime.rig.position.set(0, 0, 0);
    appRuntime.rig.rotation.set(0, 0, 0);
    appRuntime.alignedMode = false;
    appRuntime.mode = "overview";
    appRuntime.controls.enabled = false;
    appRuntime.setPhase("align");
    updateAlignmentPreview();
    appRuntime.placeXRPanel();
  }
  function previewAlignment(candidate) {
    if (!candidate) return;
    const wasReady = !!appRuntime.pendingAlignment;
    appRuntime.pendingAlignment = structuredClone(candidate);
    clearCalibrationMarkers();
    appRuntime.mode = "inhabit";
    const pose = alignedRoomPose(candidate, referenceFloor(appRuntime.state.scene));
    appRuntime.world.position.fromArray(pose.position);
    appRuntime.world.rotation.set(0, pose.yaw, 0);
    appRuntime.world.scale.setScalar(1);
    appRuntime.roomCeilingVisibility();
    if (appRuntime.phase !== "align") appRuntime.setPhase("align");
    else if (!wasReady) appRuntime.syncFlow();
  }
  function updateAlignmentPreview() {
    if (appRuntime.phase === "align" && !appRuntime.pendingAlignment && appRuntime.xrViewer.valid) {
      const base = appRuntime.roomTracking.candidate();
      if (base) {
        const correction = appRuntime.roomPlacementStore.get(appRuntime.state.scene), candidate = applyRoomCorrection(base, correction);
        previewAlignment(candidate);
        if (appRuntime.restoreAlignmentOnReady && correction) {
          appRuntime.restoreAlignmentOnReady = false;
          appRuntime.alignment = structuredClone(candidate);
          appRuntime.pendingAlignment = null;
          enterAlignedRoom();
          appRuntime.toast("Saved room offset restored using current room tracking.");
        }
      }
    }
  }
  function saveRoomCorrection(candidate) {
    const base = appRuntime.roomTracking.candidate();
    return !!base && appRuntime.roomPlacementStore.save(appRuntime.state.scene, roomCorrection(base, candidate));
  }
  function offsetAlignment(sources, dt) {
    if (!appRuntime.pendingAlignment) return;
    const pad = sources.find((s) => s.handedness === "left")?.gamepad, x = pad?.axes?.[2] || 0, y = pad?.axes?.[3] || 0;
    if (!pad) {
      appRuntime.alignmentStickReady = false;
      return;
    }
    const grip = pad.buttons?.[1], vertical = !!(grip && (grip.pressed || grip.value > 0.65));
    if (vertical !== appRuntime.alignmentVertical) {
      appRuntime.alignmentVertical = vertical;
      appRuntime.alignmentStickReady = false;
    }
    if (!appRuntime.alignmentStickReady) {
      appRuntime.alignmentStickReady = Math.abs(x) < 0.18 && Math.abs(y) < 0.18;
      return;
    }
    const dead = (v) => Math.abs(v) > 0.18 ? v : 0;
    if (!dead(x) && !dead(y)) return;
    const forward = appRuntime.currentView().getWorldDirection(new THREE.Vector3());
    forward.y = 0;
    forward.normalize();
    const right = new THREE.Vector3(-forward.z, 0, forward.x);
    const delta = vertical ? new THREE.Vector3(0, -dead(y), 0) : right.multiplyScalar(dead(x)).addScaledVector(forward, -dead(y));
    delta.multiplyScalar(Math.min(dt, 0.05) * 0.35);
    appRuntime.pendingAlignment.origin = new THREE.Vector3(...appRuntime.pendingAlignment.origin).add(delta).toArray();
    previewAlignment(appRuntime.pendingAlignment);
  }
  function cancelAlignment() {
    appRuntime.requireSpatialIdle();
    appRuntime.restoreAlignmentOnReady = false;
    appRuntime.pendingAlignment = null;
    clearCalibrationMarkers();
    if (appRuntime.creationPose && appRuntime.alignmentReturn === "explore") {
      appRuntime.resumeWorld();
      return;
    }
    appRuntime.overview();
    appRuntime.setPhase(appRuntime.alignmentReturn === "overview" ? "overview" : "welcome");
    appRuntime.placeXRPanel();
  }
  function beginCalibration() {
    appRuntime.requireSpatialIdle();
    if (!appRuntime.renderer.xr.isPresenting || !appRuntime.xrViewer.valid) throw new Error("Enter immersive mode and wait for tracking before measuring");
    appRuntime.restoreAlignmentOnReady = false;
    if (!["align", "calibrate"].includes(appRuntime.phase)) {
      appRuntime.alignmentReturn = appRuntime.phase;
      appRuntime.rememberCreation();
    }
    appRuntime.pausePerformance();
    appRuntime.roomCamera.stop();
    appRuntime.setEditing(false);
    appRuntime.selection = [];
    appRuntime.measurePoints = [];
    appRuntime.pendingAlignment = null;
    clearCalibrationMarkers();
    appRuntime.rig.position.set(0, 0, 0);
    appRuntime.rig.rotation.set(0, 0, 0);
    appRuntime.alignedMode = false;
    appRuntime.mode = "overview";
    appRuntime.setPhase("calibrate");
    appRuntime.placeXRPanel();
    appRuntime.toast(appRuntime.calibrationHint());
  }
  function addCalibrationPoint(controller) {
    if (appRuntime.phase !== "calibrate" || appRuntime.pendingAlignment || appRuntime.busy() || controller.userData.inputSource?.handedness !== "right") return;
    if (!appRuntime.xrViewer.valid) throw new Error("Waiting for headset tracking");
    appRuntime.raycaster.setFromXRController(controller);
    const origin = appRuntime.raycaster.ray.origin.toArray(), direction = appRuntime.raycaster.ray.direction.toArray();
    if (appRuntime.measurePoints.length < 3) {
      const p = floorIntersection(origin, direction, appRuntime.roomTracking.candidate()?.origin[1] ?? 0);
      if (!p) throw new Error("Point down at a real floor corner");
      const next = [...appRuntime.measurePoints, p];
      if (next.length === 3) calibrationFromCorners(...next, roomDimensions(appRuntime.state.scene).height);
      appRuntime.measurePoints = next;
      const dot = new THREE.Mesh(new THREE.SphereGeometry(0.07, 12, 8), new THREE.MeshBasicMaterial({ toneMapped: false, color: T.accent, depthTest: false }));
      dot.position.fromArray(p);
      appRuntime.calibrationMarkers.add(dot);
      const badge = createUICanvas(128, 128);
      const ctx = badge.getContext("2d");
      ctx.fillStyle = T.panel;
      ctx.beginPath();
      ctx.arc(64, 64, 58, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = T.accent;
      ctx.font = "bold 80px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(String(next.length), 64, 67);
      const texture = createUITexture(badge);
      const label = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, depthTest: false, toneMapped: false }));
      label.position.fromArray(p);
      label.position.y += 0.19;
      label.scale.setScalar(0.2);
      label.renderOrder = 16;
      appRuntime.calibrationMarkers.add(label);
    } else appRuntime.pendingAlignment = calibrationFromCorners(...appRuntime.measurePoints, ceilingHeightAtWall(origin, direction, appRuntime.measurePoints[0], appRuntime.measurePoints[1]));
    appRuntime.syncFlow();
    appRuntime.toast(appRuntime.calibrationHint());
  }
  function updateCalibrationCursor() {
    appRuntime.calibrationCursor.visible = false;
    if (appRuntime.phase !== "calibrate" || appRuntime.pendingAlignment || appRuntime.measurePoints.length >= 3) return;
    const right = appRuntime.controllers.find((c) => c.userData.inputSource?.handedness === "right");
    if (!right) return;
    appRuntime.raycaster.setFromXRController(right);
    const p = floorIntersection(appRuntime.raycaster.ray.origin.toArray(), appRuntime.raycaster.ray.direction.toArray(), appRuntime.roomTracking.candidate()?.origin[1] ?? 0);
    if (p) {
      appRuntime.calibrationCursor.position.fromArray(p);
      appRuntime.calibrationCursor.visible = true;
    }
  }
  function enterAlignedRoom() {
    if (!appRuntime.alignment || !appRuntime.renderer.xr.isPresenting || !appRuntime.xrViewer.valid) throw new Error("Real-room alignment is required");
    clearCalibrationMarkers();
    appRuntime.rig.position.set(0, 0, 0);
    appRuntime.rig.rotation.set(0, 0, 0);
    const pose = alignedRoomPose(appRuntime.alignment, referenceFloor(appRuntime.state.scene));
    appRuntime.world.position.fromArray(pose.position);
    appRuntime.world.rotation.set(0, pose.yaw, 0);
    appRuntime.world.scale.setScalar(1);
    appRuntime.spatialEpoch++;
    appRuntime.mode = "inhabit";
    appRuntime.alignedMode = true;
    appRuntime.controls.enabled = false;
    appRuntime.scene.background = null;
    appRuntime.scene.fog = null;
    appRuntime.creationPose = null;
    appRuntime.creationReady();
    appRuntime.$("mode-badge").textContent = uiText("Physical movement · 1:1");
  }
  function applyRoomAlignment(candidate) {
    appRuntime.requireSpatialIdle();
    if (!candidate) throw new Error("Floor / ceiling data or corner measurements are incomplete");
    if (!appRuntime.renderer.xr.getSession() || !appRuntime.xrViewer.valid) throw new Error("Wait for headset tracking before applying");
    appRuntime.restoreAlignmentOnReady = false;
    appRuntime.alignment = structuredClone(candidate);
    appRuntime.pendingAlignment = null;
    enterAlignedRoom();
    const saved = saveRoomCorrection(appRuntime.alignment);
    appRuntime.toast(saved ? "Room offset saved. It will be restored when room tracking is available." : "Alignment applied for this session. Room tracking is needed to restore it automatically.");
  }
  function rotateRoom() {
    if (appRuntime.isMiniature() && (!appRuntime.currentJob || appRuntime.currentJob.status === "ready" && appRuntime.currentJob.kind === "generate") && !appRuntime.saving && !appRuntime.submitting) {
      appRuntime.miniatureYaw = (appRuntime.miniatureYaw + Math.PI / 2) % (Math.PI * 2);
      if (appRuntime.renderer.xr.isPresenting) appRuntime.placeXRPanel();
      else {
        const center = new THREE.Vector3(...scanPresentationBounds(appRuntime.previewScene || appRuntime.state?.scene).center), fixed = appRuntime.world.localToWorld(center.clone());
        appRuntime.world.rotation.y = appRuntime.miniatureYaw;
        appRuntime.world.position.copy(fixed.sub(center.multiply(appRuntime.world.scale).applyQuaternion(appRuntime.world.quaternion)));
        appRuntime.world.updateMatrixWorld(true);
      }
      appRuntime.toast("Rotated 90°.");
      return;
    }
    appRuntime.requireSpatialIdle();
    const candidate = appRuntime.phase === "align" ? appRuntime.pendingAlignment : appRuntime.alignment;
    if (!candidate || !appRuntime.alignedMode && appRuntime.phase !== "align") throw new Error("Create an alignment preview first");
    candidate.yaw = (candidate.yaw + Math.PI / 2) % (Math.PI * 2);
    if (appRuntime.phase === "align") previewAlignment(candidate);
    else {
      const pose = alignedRoomPose(candidate, referenceFloor(appRuntime.state.scene));
      appRuntime.world.position.fromArray(pose.position);
      appRuntime.world.rotation.y = pose.yaw;
      appRuntime.spatialEpoch++;
      appRuntime.creationPose = null;
    }
    if (appRuntime.phase !== "align") saveRoomCorrection(candidate);
    appRuntime.toast("Rotated 90°. Check the walls and furniture.");
  }
  async function applyRoomSize() {
    appRuntime.requireSpatialIdle();
    if (isScanScene(appRuntime.state.scene)) throw new Error("Scan dimensions are preserved. Adjust alignment to change position and orientation.");
    appRuntime.saving = true;
    appRuntime.syncFlow();
    try {
      appRuntime.acceptState(await appRuntime.api("/api/room/prepare", { revision: appRuntime.state.revision, metrics: { width: Number(appRuntime.$("room-width").value), depth: Number(appRuntime.$("room-depth").value), height: Number(appRuntime.$("room-height").value), source: "manual" } }));
      appRuntime.invalidateCreation();
      appRuntime.overview();
      appRuntime.setPhase("welcome");
      appRuntime.placeXRPanel();
      appRuntime.toast("Dimensions updated. Align the room again before continuing.");
    } finally {
      appRuntime.saving = false;
      appRuntime.syncFlow();
    }
  }
  async function requestRoomScan() {
    appRuntime.requireSpatialIdle();
    const session = appRuntime.renderer.xr.getSession();
    if (!session?.initiateRoomCapture) throw new Error("Room scanning is unavailable here. Use the Quest system settings.");
    await session.initiateRoomCapture();
    appRuntime.toast("Waiting for scan data. You can apply the Quest scan later.");
  }
  return { clearCalibrationMarkers, beginAlignmentCheck, previewAlignment, updateAlignmentPreview, saveRoomCorrection, offsetAlignment, cancelAlignment, beginCalibration, addCalibrationPoint, updateCalibrationCursor, enterAlignedRoom, applyRoomAlignment, rotateRoom, applyRoomSize, requestRoomScan };
}
export {
  createRoomAlignment
};
