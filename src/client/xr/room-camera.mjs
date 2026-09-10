import {languagePattern} from "../../shared/language.mjs";
import { MAX_ROOM_PHOTOS, ROOM_PHOTO_BYTES, captureTip } from "../../shared/room.mjs";
const isAvatar = (label) => languagePattern("camera.selfieDevice").test(label || "");
const isEnvironment = (label) => languagePattern("camera.environmentDevice").test(label || "");
function cameraError(error) {
  if (error.name === "NotAllowedError" || error.name === "SecurityError") return "Camera permission denied. Exit immersive mode, allow camera access, then reopen it.";
  if (error.name === "NotFoundError" || error.name === "OverconstrainedError") return "No environment camera found. Check Quest Browser camera permissions, or upload room photos.";
  if (error.name === "NotReadableError") return "Camera is busy or unavailable. Close other camera apps and retry.";
  return error.message || "Could not open the camera. Try again.";
}
function createRoomCamera({ video, onChange = () => {
}, mediaDevices = globalThis.navigator?.mediaDevices, makeCanvas = () => document.createElement("canvas"), isQuest = /Quest|OculusBrowser/i.test(globalThis.navigator?.userAgent || ""), readyTimeout = 1e4 }) {
  let state = "idle", message = "Take at least four photos of your surroundings.", stream = null, devices = [], photos = [], generation = 0, reading = false;
  const snapshot = () => ({ state, message, count: photos.length, canCapture: state === "active" && !reading && photos.length < MAX_ROOM_PHOTOS, reading, devices: [...devices], deviceId: stream?.getVideoTracks()[0]?.getSettings?.().deviceId || "", label: stream?.getVideoTracks()[0]?.label || "", width: video.videoWidth || 0, height: video.videoHeight || 0, tip: captureTip(photos.length) });
  const emit = () => onChange(snapshot());
  function stop(note = "Camera closed. Photos remain in this session.") {
    generation++;
    const old = stream;
    stream = null;
    old?.getTracks().forEach((t) => t.stop());
    video.pause();
    video.srcObject = null;
    state = "idle";
    message = note;
    emit();
  }
  async function enumerate() {
    try {
      devices = (await mediaDevices.enumerateDevices()).filter((d) => d.kind === "videoinput" && !isAvatar(d.label)).map((d) => ({ deviceId: d.deviceId, label: d.label || "Camera" }));
    } catch {
      devices = [];
    }
  }
  async function start(deviceId = "") {
    if (state === "starting") return;
    stop();
    const token = ++generation;
    state = "starting";
    message = "Waiting for camera permission and video…";
    emit();
    let acquired = null;
    try {
      if (!mediaDevices?.getUserMedia) throw new Error("Camera access is unavailable. Open the localhost page in Quest Browser.");
      const base = { width: { ideal: 1280 }, height: { ideal: 960 }, frameRate: { ideal: 30, max: 30 } };
      try {
        acquired = await mediaDevices.getUserMedia({ audio: false, video: { ...base, ...deviceId ? { deviceId: { exact: deviceId } } : { facingMode: { exact: "environment" } } } });
      } catch (error) {
        if (token !== generation) return;
        if (deviceId || !["OverconstrainedError", "NotFoundError"].includes(error.name)) throw error;
        await enumerate();
        if (token !== generation) return;
        const candidate = devices.find((d) => isEnvironment(d.label));
        acquired = await mediaDevices.getUserMedia({ audio: false, video: { ...base, ...candidate ? { deviceId: { exact: candidate.deviceId } } : {} } });
      }
      if (token !== generation) {
        acquired.getTracks().forEach((t) => t.stop());
        return;
      }
      const track = acquired.getVideoTracks()[0];
      if (!track || isAvatar(track.label) || isQuest && track.getSettings?.().facingMode === "user" && !isEnvironment(track.label)) throw new Error("Only a selfie camera is available. Check headset camera permissions for the room view.");
      stream = acquired;
      video.srcObject = acquired;
      video.muted = true;
      video.playsInline = true;
      await video.play();
      const deadline = Date.now() + readyTimeout;
      while (token === generation && (!video.videoWidth || video.readyState < 2)) {
        if (Date.now() > deadline) throw new Error("Camera connected, but no video is available. Close it and try again.");
        await new Promise((resolve) => setTimeout(resolve, 50));
      }
      if (token !== generation) {
        acquired.getTracks().forEach((t) => t.stop());
        return;
      }
      await enumerate();
      if (token !== generation) {
        acquired.getTracks().forEach((t) => t.stop());
        return;
      }
      track.addEventListener?.("ended", () => {
        if (token === generation) stop("Camera disconnected. Photos retained; you can reopen the camera.");
      }, { once: true });
      state = "active";
      message = "Environment camera ready · Aim with the headset · Right trigger to capture";
      emit();
    } catch (error) {
      acquired?.getTracks().forEach((t) => t.stop());
      if (token !== generation) return;
      stream = null;
      video.pause();
      video.srcObject = null;
      state = "error";
      message = cameraError(error);
      emit();
      throw new Error(message);
    }
  }
  function addFrame(source, width, height, label) {
    if (!width || !height) throw new Error("Video is not ready. Wait before taking a photo.");
    const canvas = makeCanvas(), ratio = Math.min(1, 1280 / Math.max(width, height));
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    const context = canvas.getContext("2d");
    context.drawImage(source, 0, 0, canvas.width, canvas.height);
    const image = canvas.toDataURL("image/jpeg", 0.82);
    if (image.length > Math.ceil(ROOM_PHOTO_BYTES / 3) * 4) throw new Error("Photo too large. Try another shot.");
    const photo = { id: crypto.randomUUID(), image, width: canvas.width, height: canvas.height, capturedAt: (/* @__PURE__ */ new Date()).toISOString(), label };
    photos.push(photo);
    message = `Photo ${photos.length} saved. ${captureTip(photos.length)}`;
    emit();
    return photo;
  }
  function capture() {
    if (state !== "active" || reading) throw new Error("Open the camera and wait for video before capturing");
    return addFrame(video, video.videoWidth, video.videoHeight, "Camera capture");
  }
  async function addFiles(files) {
    if (reading) return;
    reading = true;
    emit();
    try {
      for (const file of files) {
        if (!["image/jpeg", "image/png"].includes(file.type) || file.size > 20 * 1024 * 1024) throw new Error("Choose a JPEG or PNG no larger than 20 MB");
        const bitmap = await createImageBitmap(file);
        try {
          addFrame(bitmap, bitmap.width, bitmap.height, "Uploaded photo");
        } finally {
          bitmap.close();
        }
      }
    } finally {
      reading = false;
      emit();
    }
  }
  function removeLast() {
    if (reading) throw new Error("Loading photos");
    photos.pop();
    message = photos.length ? `${photos.length} photos retained. ${captureTip(photos.length)}` : "Photos cleared. Ready for new shots.";
    emit();
  }
  return { start, stop, capture, addFiles, removeLast, snapshot, stream: () => stream, markSaved(id, ref) {
    const p = photos.find((p2) => p2.id === id);
    if (p) {
      p.reference = ref;
      p.image = ref.url;
      emit();
    }
  }, remove(id) {
    photos = photos.filter((p) => p.id !== id);
    emit();
  }, getPhotos: () => photos.map((p) => ({ ...p })) };
}
export {
  cameraError,
  createRoomCamera
};
