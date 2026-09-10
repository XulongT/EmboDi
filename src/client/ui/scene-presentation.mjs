import { opacityForTransparency, saveTransparency } from "../../shared/scene-appearance.mjs";
import * as THREE from "three";
import { isCeiling, categoryInfo } from "../../shared/categories.mjs";
import { UI_THEME as T } from "../../shared/ui-theme.mjs";
import { uiText } from "../../shared/ui-text.mjs";
import { createUICanvas, createUITexture } from "./ui-resolution.mjs";
import { referenceFloor } from "../../shared/scene-space.mjs";
import { scanPresentationBounds } from "./creation-layout.mjs";
function createScenePresentation(appRuntime) {
  function setSceneTransparency(percent) {
    appRuntime.roomOpacity = opacityForTransparency(percent);
    saveTransparency(appRuntime.sceneDisplayStorage, percent);
    updateRoomAppearance();
    appRuntime.syncFlow();
    appRuntime.toast(`Scene transparency: ${percent}%`);
  }
  function changeOpacity(delta) {
    appRuntime.roomOpacity = THREE.MathUtils.clamp(Math.round((appRuntime.roomOpacity + delta) * 100) / 100, 0.1, 1);
    appRuntime.$("room-opacity").value = String(appRuntime.roomOpacity * 100);
    updateRoomAppearance();
    appRuntime.syncFlow();
  }
  function setRoomDisplay(opacity) {
    appRuntime.roomOpacity = opacity;
    appRuntime.$("room-opacity").value = String(opacity * 100);
    updateRoomAppearance();
    appRuntime.syncFlow();
    appRuntime.toast(opacity === 1 ? "Solid blockout · Standard occlusion" : "Translucent overlay · Virtual walls still occlude objects behind them");
  }
  function updateRoomAppearance() {
    const transparent = (appRuntime.openSourceMode || !!appRuntime.mrShowcase || appRuntime.roomMode && appRuntime.renderer.xr.isPresenting && appRuntime.xrMode === "immersive-ar") && appRuntime.roomOpacity < 1;
    for (const mesh of appRuntime.meshes.values()) {
      if (mesh.material.transparent !== transparent) mesh.material.needsUpdate = true;
      mesh.material.transparent = transparent;
      mesh.material.opacity = transparent ? appRuntime.roomOpacity : 1;
      mesh.material.depthWrite = !transparent;
    }
    appRuntime.$("room-opacity").value = String(Math.round((1 - appRuntime.roomOpacity) * 100));
    appRuntime.$("room-opacity-value").textContent = `${Math.round((1 - appRuntime.roomOpacity) * 100)}% transparent`;
    document.querySelectorAll("[data-transparency]").forEach((b) => {
      const active = Math.abs(appRuntime.roomOpacity - opacityForTransparency(Number(b.dataset.transparency))) < 1e-6;
      b.disabled = active;
      b.setAttribute("aria-pressed", String(active));
    });
  }
  function roomCeilingVisibility() {
    for (const mesh of appRuntime.meshes.values()) mesh.visible = !(appRuntime.roomMode && appRuntime.mode === "overview" && isCeiling(mesh.userData.definition));
    updateRoomAppearance();
  }
  function updateObjectLabel() {
    if (appRuntime.captureUI || !appRuntime.roomMode || appRuntime.mode !== "inhabit" || !appRuntime.editing || appRuntime.director?.snapshot().placing || appRuntime.draftTool.active()) {
      if (appRuntime.labelSprite) appRuntime.labelSprite.visible = false;
      if (appRuntime.labelKey) {
        appRuntime.labelKey = "";
        appRuntime.syncFlow();
      }
      return;
    }
    const id = appRuntime.hoverIds[0] || appRuntime.selection[0];
    const mesh = appRuntime.meshes.get(id), actor = appRuntime.state.scene.actors?.find((a) => a.id === id);
    if (!mesh && !actor) {
      if (appRuntime.labelSprite) appRuntime.labelSprite.visible = false;
      appRuntime.labelKey = "";
      return;
    }
    const o = mesh?.userData.definition || actor, info = actor ? { label: "Actor", color: T.accent } : categoryInfo(o), text = appRuntime.transformTool.active() ? "Adjusting · Stick: turn / raise · Release to save" : `${uiText(info.label)} · ${appRuntime.uiName(o)}${appRuntime.selection.includes(id) ? appRuntime.openSourceMode ? " · Choose Transform from the menu" : " · Hold again to adjust" : ""}`;
    if (!appRuntime.labelSprite) {
      const c = createUICanvas(1024, 128), texture = createUITexture(c);
      appRuntime.labelSprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, depthTest: false, depthWrite: false }));
      appRuntime.labelSprite.scale.set(0.95, 0.119, 1);
      appRuntime.labelSprite.renderOrder = 50;
      appRuntime.scene.add(appRuntime.labelSprite);
    }
    if (appRuntime.labelKey !== text) {
      appRuntime.labelKey = text;
      const c = appRuntime.labelSprite.material.map.image, ctx = c.getContext("2d");
      ctx.clearRect(0, 0, 1024, 128);
      ctx.fillStyle = T.panel;
      ctx.fillRect(0, 0, 1024, 128);
      ctx.fillStyle = info.color;
      ctx.fillRect(0, 0, 18, 128);
      ctx.fillStyle = T.text;
      ctx.font = "48px sans-serif";
      ctx.textBaseline = "middle";
      ctx.fillText(uiText(text), 40, 64, 940);
      appRuntime.labelSprite.material.map.needsUpdate = true;
    }
    if (actor) {
      const view = appRuntime.director.layer.views.get(id);
      appRuntime.labelSprite.position.copy(view?.bounds.getCenter(new THREE.Vector3()) || appRuntime.world.localToWorld(new THREE.Vector3().fromArray(actor.position)));
      appRuntime.labelSprite.position.y += 1;
    } else {
      mesh.getWorldPosition(appRuntime.labelSprite.position);
      appRuntime.labelSprite.position.y += o.size[1] / 2 + 0.16;
    }
    appRuntime.labelSprite.visible = true;
  }
  function isMiniature() {
    return appRuntime.mode === "overview" && ["overview", "preview", "entry", "entering"].includes(appRuntime.phase);
  }
  function updatePresentationVisibility() {
    appRuntime.world.visible = (!appRuntime.mrShowcase || appRuntime.mrShowcase.state().sceneVisible) && !["welcome", "reference", "building", "calibrate"].includes(appRuntime.phase) && (appRuntime.phase !== "align" || !!appRuntime.pendingAlignment) && (!isMiniature() || appRuntime.presentationVisible);
  }
  function placeXRPanel() {
    if (appRuntime.immersiveShowcase()) {
      appRuntime.presentationVisible = true;
      appRuntime.xrPanel.visible = false;
      updatePresentationVisibility();
      return;
    }
    if (!appRuntime.renderer.xr.isPresenting || !appRuntime.xrViewer.valid || !appRuntime.panelPlacement || !appRuntime.hadXRFrame) return;
    appRuntime.presentationVisible = true;
    const floor = referenceFloor(appRuntime.previewScene || appRuntime.state?.scene);
    const definition = appRuntime.previewScene || appRuntime.state?.scene;
    appRuntime.panelPlacement.place(appRuntime.currentView(), { miniature: isMiniature(), rotationOffset: appRuntime.miniatureYaw, center: scanPresentationBounds(definition).center });
    updatePresentationVisibility();
    if (appRuntime.openSourceMode && appRuntime.phase === "explore") {
      appRuntime.xrPanel.position.add(new THREE.Vector3(-0.78, -0.08, 0).applyQuaternion(appRuntime.xrPanel.quaternion));
      appRuntime.xrPanel.scale.setScalar(0.82);
      appRuntime.xrPanel.updateMatrixWorld(true);
    } else appRuntime.xrPanel.scale.setScalar(1);
  }
  function sceneMenuOpen() {
    return appRuntime.openSourceMode && appRuntime.phase === "explore" && (appRuntime.renderer.xr.isPresenting ? appRuntime.xrPanel.visible : !!appRuntime.desktopUI && !appRuntime.desktopUI.snapshot().collapsed);
  }
  function toggleMenu() {
    if (appRuntime.openSourceMode && appRuntime.studio?.getRecordingState() !== "idle") {
      appRuntime.xrUI?.showDialogue();
      return;
    }
    if (appRuntime.immersiveShowcase()) return;
    if (appRuntime.openSourceMode && appRuntime.phase === "explore") {
      appRuntime.doorGrab.release();
      appRuntime.navigationGate.block();
      appRuntime.keys.clear();
      appRuntime.pointerStart = null;
      appRuntime.setHover([]);
      if (appRuntime.draftTool.active()) appRuntime.draftTool.suspend("Menu opened. Unfinished stroke discarded.");
      else if (appRuntime.objectInteraction.active()) appRuntime.closeObjectInteraction();
      appRuntime.xrUI.dismissDialogue();
      if (!appRuntime.renderer.xr.isPresenting) {
        appRuntime.desktopUI?.toggle();
        return;
      }
      if (appRuntime.xrViewer.valid) {
        if (appRuntime.xrPanel.visible && appRuntime.xrUI.snapshot().page === "global") appRuntime.xrPanel.visible = false;
        else {
          appRuntime.hadXRFrame = true;
          appRuntime.xrUI.openGlobal();
          placeXRPanel();
        }
        updatePresentationVisibility();
      }
      return;
    }
    if (appRuntime.openSourceMode && !appRuntime.renderer.xr.isPresenting) {
      appRuntime.desktopUI?.toggle();
      return;
    }
    appRuntime.doorGrab.release();
    if (appRuntime.draftTool.active()) appRuntime.draftTool.suspend("Menu opened. Unfinished stroke discarded.");
    if (appRuntime.transformTool.active()) appRuntime.cancelTransform();
    if (appRuntime.volume.isActive()) appRuntime.cancelVolume();
    if (appRuntime.renderer.xr.isPresenting && appRuntime.xrViewer.valid) {
      if (appRuntime.xrPanel.visible) {
        appRuntime.xrPanel.visible = false;
        if (appRuntime.openSourceMode) appRuntime.xrUI.dismissDialogue();
        if (isMiniature()) appRuntime.presentationVisible = false;
      } else {
        appRuntime.hadXRFrame = true;
        appRuntime.xrUI.hideKeyboard();
        if (appRuntime.openSourceMode) appRuntime.xrUI.showDialogue();
        placeXRPanel();
        setXRStatus(appRuntime.openSourceMode ? "Tools on the left · Y Hide" : "Menu placed in front of you · Y to hide");
      }
      updatePresentationVisibility();
    }
  }
  function setXRStatus(text) {
    if (!appRuntime.captureUI) appRuntime.xrUI?.setStatus(text);
  }
  return { setSceneTransparency, changeOpacity, setRoomDisplay, updateRoomAppearance, roomCeilingVisibility, updateObjectLabel, isMiniature, updatePresentationVisibility, placeXRPanel, sceneMenuOpen, toggleMenu, setXRStatus };
}
export {
  createScenePresentation
};
