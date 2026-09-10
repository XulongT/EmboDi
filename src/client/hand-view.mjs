import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
import { HAND_SIDES, HANDS_METADATA, validateHandsMetadata, validateHandsSample } from "../shared/hand-frame.mjs";
import { createFingerHand } from "./hand-rig.mjs";
function handGeometry(side, dimensions, version) {
  const d = dimensions, mirror = (side === "left" ? -1 : 1) * (version === 1 ? -1 : 1), pieces = [];
  const add = (geometry2, position = [0, 0, 0]) => {
    geometry2.translate(...position);
    const g = geometry2.index ? geometry2.toNonIndexed() : geometry2;
    pieces.push(g);
    if (g !== geometry2) geometry2.dispose();
  };
  add(new RoundedBoxGeometry(d.palmWidth, d.palmLength, d.palmThickness, 2, d.palmThickness * 0.35));
  add(new RoundedBoxGeometry(d.palmWidth * 0.63, d.wristLength, d.palmThickness * 0.85, 2, d.palmThickness * 0.3), [0, -d.palmLength / 2 - d.wristLength * 0.35, 0]);
  const segment = (a, b, r) => {
    const start = new THREE.Vector3(...a), end = new THREE.Vector3(...b), delta = end.clone().sub(start);
    const geometry2 = new THREE.CapsuleGeometry(r, Math.max(1e-3, delta.length() - r * 1.1), 3, 7);
    geometry2.applyQuaternion(new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), delta.normalize()));
    add(geometry2, start.add(end).multiplyScalar(0.5).toArray());
  };
  for (const [i, length] of [1, 1.08, 1, 0.78].entries()) {
    const x = (1.5 - i) * d.palmWidth * 0.24 * mirror, y = d.palmLength * 0.39 - (i === 3 ? 6e-3 : 0), r = d.fingerRadius * (i === 3 ? 0.85 : 1);
    const points = version < 3 ? [[x, y, 0], [x, y + d.palmLength * 0.3 * length, d.palmThickness * 0.4], [x, y + d.palmLength * 0.35 * length, d.palmThickness * 1.15], [x, y + d.palmLength * 0.17 * length, d.palmThickness * 1.5]] : (
      // Curl around the handle and return toward the palm. The old fingertips
      // all stayed distal to the knuckles, producing an open claw silhouette.
      i === 0 ? [[x, y, 0], [x, y + 0.022 * length, d.palmThickness * 0.8], [x, y + 6e-3 * length, d.palmThickness * 1.65], [x, y - 0.016 * length, d.palmThickness * 1.4]] : [[x, y, 0], [x, y + 0.012 * length, d.palmThickness * 0.93], [x, y - 0.014 * length, d.palmThickness * 1.4], [x, y - 0.038 * length, d.palmThickness]]
    );
    for (let j = 1; j < points.length; j++) segment(points[j - 1], points[j], r);
  }
  const thumb = version < 3 ? [[mirror * d.palmWidth * 0.4, -d.palmLength * 0.18, d.palmThickness * 0.2], [mirror * d.palmWidth * 0.62, d.palmLength * 0.07, d.palmThickness * 0.7], [mirror * d.palmWidth * 0.35, d.palmLength * 0.25, d.palmThickness * 1.35]] : [[mirror * d.palmWidth * 0.43, -d.palmLength * 0.23, d.palmThickness * 0.25], [mirror * d.palmWidth * 0.68, d.palmLength * 0.06, d.palmThickness * 0.8], [mirror * d.palmWidth * 0.72, d.palmLength * 0.28, d.palmThickness * 1.1]];
  segment(thumb[0], thumb[1], d.fingerRadius * 1.18);
  segment(thumb[1], thumb[2], d.fingerRadius * 1.08);
  const geometry = mergeGeometries(pieces);
  for (const piece of pieces) piece.dispose();
  geometry.computeBoundingSphere();
  return geometry;
}
function createHandLayer(parent, metadata = HANDS_METADATA) {
  validateHandsMetadata(metadata);
  const group = new THREE.Group();
  group.name = "controller-hands";
  parent.add(group);
  const rigs = [], color = metadata.modelVersion >= 4 ? metadata.appearance.color : "#f2f1eb";
  const meshes = HAND_SIDES.map((side) => {
    const material = new THREE.MeshStandardMaterial({ color, roughness: 0.92, metalness: 0 }), rig = metadata.modelVersion >= 4 ? createFingerHand(side, metadata.dimensions, material, metadata.modelVersion) : null;
    rigs.push(rig);
    const mesh = rig?.mesh || new THREE.Mesh(handGeometry(side, metadata.dimensions, metadata.modelVersion), material);
    mesh.name = `user-hand-${side}`;
    mesh.visible = false;
    mesh.raycast = () => {
    };
    group.add(mesh);
    return mesh;
  });
  const handMeshes = [...meshes], armMeshes = metadata.armModel ? HAND_SIDES.map((side) => {
    const a = metadata.armModel;
    return ["upper", "forearm", "elbow"].map((part) => {
      const geometry = part === "elbow" ? new THREE.SphereGeometry(a.forearmRadius, 10, 6) : new THREE.CylinderGeometry(part === "upper" ? a.upperArmRadius : a.forearmRadius, part === "upper" ? a.forearmRadius : a.forearmRadius * 0.66, 1, 10, 1);
      const mesh = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ color, roughness: 0.92, metalness: 0 }));
      mesh.name = `user-arm-${side}-${part}`;
      mesh.visible = false;
      mesh.raycast = () => {
      };
      group.add(mesh);
      meshes.push(mesh);
      return mesh;
    });
  }) : [];
  const up = new THREE.Vector3(0, 1, 0), start = new THREE.Vector3(), end = new THREE.Vector3(), direction = new THREE.Vector3();
  function segment(mesh, a, b) {
    start.fromArray(a);
    end.fromArray(b);
    direction.copy(start).sub(end);
    mesh.position.copy(start).add(end).multiplyScalar(0.5);
    mesh.scale.set(1, direction.length(), 1);
    mesh.quaternion.setFromUnitVectors(up, direction.normalize());
  }
  let sampleId = null, disposed = false;
  function apply(sample) {
    if (disposed) return;
    if (sample) validateHandsSample(sample, metadata);
    sampleId = sample?.sampleId ?? null;
    handMeshes.forEach((mesh, i) => {
      const hand = sample?.hands[i];
      mesh.visible = hand?.tracked === true;
      if (mesh.visible) {
        mesh.position.fromArray(hand.pose.positionMeters);
        mesh.quaternion.fromArray(hand.pose.quaternionXYZW);
        rigs[i]?.pose(hand);
      }
    });
    armMeshes.forEach(([upper, forearm, elbow], i) => {
      const arm = sample?.arms?.joints[i], visible = !!arm && arm.status !== "untracked";
      forearm.visible = elbow.visible = visible;
      upper.visible = visible && arm.status !== "forearm-only";
      if (visible) {
        segment(forearm, arm.elbow, arm.wrist);
        elbow.position.fromArray(arm.elbow);
        if (upper.visible) segment(upper, arm.shoulder, arm.elbow);
      }
    });
    group.updateWorldMatrix(true, true);
  }
  const meshSnapshot = (mesh) => ({ visible: mesh.visible && group.visible && parent.visible, worldMatrix: mesh.visible ? mesh.matrixWorld.toArray() : null });
  function snapshot() {
    group.updateWorldMatrix(true, true);
    return { sampleId, hands: handMeshes.map((mesh, i) => ({ side: HAND_SIDES[i], ...meshSnapshot(mesh), ...rigs[i] ? { fingerQuaternions: rigs[i].snapshot() } : {} })), arms: armMeshes.map((list, i) => ({ side: HAND_SIDES[i], segments: list.map(meshSnapshot) })), triangles: meshes.reduce((n, m) => n + (m.geometry.index?.count ?? m.geometry.attributes.position.count) / 3, 0) };
  }
  function dispose() {
    if (disposed) return;
    disposed = true;
    group.removeFromParent();
    for (const mesh of meshes) {
      mesh.geometry.dispose();
      mesh.material.dispose();
      mesh.skeleton?.dispose();
    }
    group.clear();
  }
  return { group, meshes, apply, snapshot, dispose };
}
export {
  createHandLayer
};
