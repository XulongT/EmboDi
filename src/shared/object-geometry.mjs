import { BoxGeometry, SphereGeometry, CylinderGeometry, ConeGeometry } from "three";
import { cameraGeometry } from "./camera-geometry.mjs";
function objectGeometry(o) {
  if (o.kind === "camera") return cameraGeometry();
  if (o.shape === "box") return new BoxGeometry(1, 1, 1);
  if (o.shape === "sphere") return new SphereGeometry(0.5, 16, 10);
  if (o.shape === "cylinder") return new CylinderGeometry(0.5, 0.5, 1, 24);
  return new ConeGeometry(0.5, 1, o.id.includes("roof") ? 4 : 16);
}
export {
  objectGeometry
};
