import { uiText } from "../../shared/ui-text.mjs";
function createStartupAccess({ dialog, media, camera, scriptedMode, getXR = () => navigator.xr, onEnter }) {
  const $ = (id) => dialog.querySelector("#" + id);
  let ready = false, busy = false, xrMode = null, epoch = 0;
  const valid = () => ready && media.snapshot().camera && (scriptedMode || media.snapshot().microphone);
  function show() {
    ready = valid();
    $("access-camera").textContent = ready ? "Camera · Ready for photos and demonstrations" : "Camera · Photos and demonstrations";
    if (!scriptedMode) $("access-microphone").textContent = ready ? "Microphone · Ready for voice input" : "Microphone · Voice input";
    $("access-prepare").hidden = ready;
    $("access-enter").hidden = !ready;
    $("access-message").textContent = ready ? "Devices are ready. Enter Quest to allow spatial access before creating." : "Allow device access here before you start creating.";
    if (!dialog.open) dialog.showModal();
  }
  function reset() {
    epoch++;
    ready = false;
    busy = false;
    camera.stop();
    media.release();
    $("access-prepare").disabled = false;
    $("access-enter").disabled = false;
    show();
  }
  async function prepare() {
    if (busy) return;
    busy = true;
    const token = ++epoch;
    ready = false;
    $("access-prepare").disabled = true;
    $("access-message").textContent = "Allow camera access in the browser prompt…";
    media.begin();
    try {
      await camera.start();
      if (token !== epoch) return;
      if (camera.snapshot().state !== "active") throw new Error("Camera setup was interrupted. Please try again.");
      camera.stop();
      $("access-camera").textContent = "Camera · Ready for photos and demonstrations";
      if (!scriptedMode) {
        $("access-message").textContent = "Allow microphone access in the browser prompt…";
        const stream = await media.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } });
        stream.getTracks().forEach((track) => track.stop());
        $("access-microphone").textContent = "Microphone · Ready for voice input";
      }
      const xr = getXR();
      if (!xr) throw new Error("WebXR is unavailable. Open this page in Quest Browser.");
      xrMode = await xr.isSessionSupported("immersive-ar") ? "immersive-ar" : null;
      if (!xrMode) throw new Error("Mixed reality is unavailable. Open this page in Quest Browser with headset tracking enabled.");
      if (token !== epoch) return;
      media.seal();
      ready = true;
      show();
      $("access-enter").focus();
    } catch (error) {
      if (token !== epoch) return;
      camera.stop();
      media.release();
      $("access-camera").textContent = "Camera · Setup required";
      $("access-message").textContent = uiText(error.message);
      $("access-prepare").textContent = "Retry setup";
    } finally {
      if (token === epoch) {
        busy = false;
        $("access-prepare").disabled = false;
      }
    }
  }
  dialog.addEventListener("cancel", (event) => event.preventDefault());
  $("access-microphone").hidden = scriptedMode;
  $("access-microphone").textContent = "Microphone · Voice input";
  $("access-prepare").onclick = prepare;
  $("access-enter").onclick = () => {
    if (busy) return;
    if (!valid()) {
      ready = false;
      show();
      return;
    }
    busy = true;
    $("access-enter").disabled = true;
    $("access-message").textContent = "Allow spatial access in Quest to enter your scene…";
    Promise.resolve(onEnter(xrMode)).then((entered) => {
      if (entered) dialog.close();
      else $("access-message").textContent = "Could not enter Quest. Allow spatial access and try Enter Quest again.";
    }).finally(() => {
      busy = false;
      $("access-enter").disabled = false;
    });
  };
  return { show, reset, ready: valid, snapshot: () => ({ ...media.snapshot(), ready: valid(), open: dialog.open }), dispose() {
    epoch++;
    camera.stop();
    media.release();
  } };
}
export {
  createStartupAccess
};
