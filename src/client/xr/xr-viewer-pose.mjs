import * as THREE from "three";
function createXRViewerPose(rig) {
  const view = new THREE.Camera();
  view.name = "tracked-xr-viewer";
  rig.add(view);
  let valid = false;
  return {
    view,
    get valid() {
      return valid;
    },
    update(frame, referenceSpace) {
      const pose = frame && referenceSpace ? frame.getViewerPose(referenceSpace) : null;
      valid = !!pose;
      if (!pose) return false;
      view.matrix.fromArray(pose.transform.matrix);
      view.matrix.decompose(view.position, view.quaternion, view.scale);
      view.matrixWorldNeedsUpdate = true;
      return true;
    },
    reset() {
      valid = false;
      view.matrix.identity();
      view.matrix.decompose(view.position, view.quaternion, view.scale);
      view.matrixWorldNeedsUpdate = true;
    }
  };
}
export {
  createXRViewerPose
};
