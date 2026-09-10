import * as THREE from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
function cameraGeometry() {
  const parts = [];
  function part(geometry, color, position) {
    const g = geometry.toNonIndexed();
    geometry.dispose();
    g.translate(...position);
    const rgb = new THREE.Color(color), colors = [];
    for (let i = 0; i < g.attributes.position.count; i++) colors.push(rgb.r, rgb.g, rgb.b);
    g.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    parts.push(g);
  }
  part(new THREE.BoxGeometry(0.78, 0.62, 0.5), "#ffffff", [0, -0.06, 0.14]);
  part(new THREE.BoxGeometry(0.2, 0.76, 0.48), "#657080", [0.43, -0.1, 0.14]);
  part(new THREE.BoxGeometry(0.28, 0.23, 0.28), "#dce3ec", [0, 0.36, 0.12]);
  part(new THREE.BoxGeometry(0.42, 0.31, 0.025), "#142332", [-0.04, -0.04, 0.405]);
  part(new THREE.CylinderGeometry(0.25, 0.28, 0.44, 24).rotateX(Math.PI / 2), "#26323e", [0, -0.05, -0.32]);
  part(new THREE.CylinderGeometry(0.22, 0.22, 0.035, 24).rotateX(Math.PI / 2), "#7ecae8", [0, -0.05, -0.56]);
  const merged = mergeGeometries(parts, false);
  parts.forEach((g) => g.dispose());
  merged.computeBoundingBox();
  const center = merged.boundingBox.getCenter(new THREE.Vector3()), size = merged.boundingBox.getSize(new THREE.Vector3());
  merged.translate(-center.x, -center.y, -center.z);
  merged.scale(1 / size.x, 1 / size.y, 1 / size.z);
  merged.computeBoundingBox();
  merged.computeBoundingSphere();
  return merged;
}
export {
  cameraGeometry
};
