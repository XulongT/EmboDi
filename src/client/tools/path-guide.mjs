import { UI_THEME as T } from "../../shared/ui-theme.mjs";
import * as THREE from "three";
function createPathGuide(world) {
  const group = new THREE.Group();
  world.add(group);
  let key = "";
  return { sync(path) {
    const next = JSON.stringify(path?.points);
    if (next === key) return;
    key = next;
    for (const o of [...group.children]) {
      group.remove(o);
      o.traverse((c) => {
        c.geometry?.dispose();
        c.material?.dispose();
      });
    }
    if (!path) return;
    const points = path.points.map((p) => new THREE.Vector3(p[0], p[1] + 0.035, p[2])), curve = new THREE.CurvePath();
    for (let i = 1; i < points.length; i++) curve.add(new THREE.LineCurve3(points[i - 1], points[i]));
    const halo = new THREE.Mesh(new THREE.TubeGeometry(curve, Math.max(16, points.length * 2), 0.022, 6, false), new THREE.MeshBasicMaterial({ toneMapped: false, color: T.panel, depthTest: false }));
    halo.renderOrder = 12;
    group.add(halo);
    const line = new THREE.Mesh(new THREE.TubeGeometry(curve, Math.max(16, points.length * 2), 0.012, 6, false), new THREE.MeshBasicMaterial({ toneMapped: false, color: T.accent, depthTest: false }));
    line.renderOrder = 13;
    group.add(line);
    for (const point of [points[0], points.at(-1)]) {
      const node = new THREE.Mesh(new THREE.SphereGeometry(0.04, 10, 8), new THREE.MeshBasicMaterial({ toneMapped: false, color: T.accent, depthTest: false }));
      node.position.copy(point);
      node.renderOrder = 14;
      group.add(node);
    }
    const direction = points.at(-1).clone().sub(points.at(-2)).normalize();
    const arrow = new THREE.ArrowHelper(direction, points.at(-1), 0.35, T.accent, 0.14, 0.09);
    arrow.line.material.toneMapped = arrow.cone.material.toneMapped = false;
    group.add(arrow);
  }, show(value) {
    group.visible = value;
  } };
}
export {
  createPathGuide
};
