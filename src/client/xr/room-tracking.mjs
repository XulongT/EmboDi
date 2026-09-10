import * as THREE from "three";
import { roomFromPlanes } from "../../shared/room-spatial.mjs";
function createRoomTracking() {
  let planes = [], candidate = null, lastUpdate = -Infinity, supported = false;
  return {
    reset() {
      planes = [];
      candidate = null;
      lastUpdate = -Infinity;
      supported = false;
    },
    update(frame, referenceSpace, time, aspect = 1) {
      if (!frame || time - lastUpdate < 500) return;
      lastUpdate = time;
      let detected;
      try {
        detected = frame.detectedPlanes;
        supported = detected !== void 0;
      } catch {
        supported = false;
      }
      planes = [];
      if (detected) for (const plane of detected) {
        const pose = frame.getPose(plane.planeSpace, referenceSpace);
        if (!pose) continue;
        const matrix = new THREE.Matrix4().fromArray(pose.transform.matrix);
        planes.push({ label: plane.semanticLabel || "", orientation: plane.orientation, points: Array.from(plane.polygon, (p) => new THREE.Vector3(p.x, p.y, p.z).applyMatrix4(matrix).toArray()) });
      }
      candidate = roomFromPlanes(planes, aspect);
    },
    candidate() {
      return candidate ? structuredClone(candidate) : null;
    },
    planes() {
      return structuredClone(planes);
    },
    snapshot() {
      return { supported, count: planes.length, labels: [...new Set(planes.map((p) => p.label || "Unclassified"))], ready: !!candidate, metrics: candidate?.metrics || null };
    }
  };
}
export {
  createRoomTracking
};
