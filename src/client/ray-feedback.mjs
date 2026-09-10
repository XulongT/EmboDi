import { UI_THEME as T } from "../shared/ui-theme.mjs";
import * as THREE from "three";
function createRayFeedback(parent, controller = null) {
  const group = new THREE.Group();
  group.name = "interaction-ray-contact";
  group.visible = false;
  parent.add(group);
  const material = (color) => new THREE.MeshBasicMaterial({ toneMapped: false, color, side: THREE.DoubleSide, depthTest: false, depthWrite: false, transparent: true, opacity: 0.95 });
  const rim = new THREE.Mesh(new THREE.RingGeometry(0.64, 1.14, 32), material(T.panel));
  const ring = new THREE.Mesh(new THREE.RingGeometry(0.76, 1, 32), material(T.selected));
  const dot = new THREE.Mesh(new THREE.CircleGeometry(0.24, 16), material(T.selected));
  for (const [i, mesh] of [rim, ring, dot].entries()) {
    mesh.renderOrder = 80 + i;
    group.add(mesh);
  }
  const laser = controller ? new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3(0, 0, -1)]), new THREE.LineBasicMaterial({ toneMapped: false, color: T.selected, transparent: true, opacity: 0.65, depthWrite: false })) : null;
  if (laser) {
    laser.visible = false;
    controller.add(laser);
  }
  const normal = new THREE.Vector3(), normalMatrix = new THREE.Matrix3(), z = new THREE.Vector3(0, 0, 1);
  let contact = null;
  function hide() {
    group.visible = false;
    if (laser) laser.visible = false;
    contact = null;
  }
  function update(raycaster, { enabled = false, hit = null, color = T.selected, viewerPosition = raycaster.ray.origin } = {}) {
    hide();
    if (!enabled) return;
    if (laser) {
      laser.visible = true;
      laser.scale.z = hit?.distance ?? 3;
      laser.material.color.set(color);
    }
    if (hit) contact = { id: hit.id ?? hit.object?.userData.definition?.id ?? null, approximate: !!hit.approximate };
    if (!hit?.point || hit.approximate) return;
    normal.copy(hit.face?.normal || z);
    if (hit.face && hit.object) normal.applyMatrix3(normalMatrix.getNormalMatrix(hit.object.matrixWorld)).normalize();
    else normal.copy(raycaster.ray.direction).negate();
    if (normal.dot(raycaster.ray.direction) > 0) normal.negate();
    const distance = hit.point.distanceTo(viewerPosition), radius = THREE.MathUtils.clamp(distance * 7e-3, 8e-3, 0.045);
    group.position.copy(hit.point).addScaledVector(normal, 15e-4);
    group.quaternion.setFromUnitVectors(z, normal);
    group.scale.setScalar(radius);
    group.visible = true;
    ring.material.color.set(color);
    dot.material.color.set(color);
    contact = { ...contact, point: hit.point.toArray(), normal: normal.toArray(), distance: hit.distance, radius };
  }
  return { update, hide, group, snapshot: () => ({ visible: group.visible, rayVisible: laser?.visible ?? false, rayLength: laser?.visible ? laser.scale.z : 0, ...contact }), dispose() {
    hide();
    group.removeFromParent();
    for (const mesh of [rim, ring, dot]) {
      mesh.geometry.dispose();
      mesh.material.dispose();
    }
    if (laser) {
      laser.removeFromParent();
      laser.geometry.dispose();
      laser.material.dispose();
    }
  } };
}
export {
  createRayFeedback
};
