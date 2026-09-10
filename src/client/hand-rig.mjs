import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
function createFingerHand(side, d, material, version = 5) {
  const mirror = side === "left" ? -1 : 1, scale = d.palmLength / 0.086, pieces = [], bones = [], fingers = [];
  const root = new THREE.Bone();
  root.name = "palm";
  bones.push(root);
  const add = (geometry2, bone, position) => {
    geometry2.translate(...position);
    const g = geometry2.index ? geometry2.toNonIndexed() : geometry2;
    if (g !== geometry2) geometry2.dispose();
    const count = g.attributes.position.count, indices = new Uint16Array(count * 4), weights = new Float32Array(count * 4);
    for (let i = 0; i < count; i++) {
      indices[i * 4] = bone;
      weights[i * 4] = 1;
    }
    g.setAttribute("skinIndex", new THREE.Uint16BufferAttribute(indices, 4));
    g.setAttribute("skinWeight", new THREE.Float32BufferAttribute(weights, 4));
    pieces.push(g);
  };
  add(new RoundedBoxGeometry(d.palmWidth, d.palmLength, d.palmThickness, 2, d.palmThickness * 0.35), 0, [0, 0, 0]);
  add(new RoundedBoxGeometry(d.palmWidth * 0.63, d.wristLength, d.palmThickness * 0.85, 2, d.palmThickness * 0.3), 0, [0, -d.palmLength / 2 - d.wristLength * 0.35, 0]);
  function chain(name, base, lengths, radius) {
    let parent = root, y = base[1];
    const joints = [];
    lengths.forEach((length, j) => {
      const bone = new THREE.Bone();
      bone.name = name + "-" + j;
      bone.position.fromArray(j ? [0, lengths[j - 1], 0] : base);
      parent.add(bone);
      parent = bone;
      const index = bones.length;
      bones.push(bone);
      joints.push(bone);
      add(new THREE.CapsuleGeometry(radius * (j === 2 ? 0.9 : 1), Math.max(1e-3, length - radius * 1.1), 3, 7), index, [base[0], y + length / 2, base[2]]);
      y += length;
    });
    return joints;
  }
  for (const [i, length] of [1, 1.08, 1, 0.78].entries()) fingers.push(chain(["index", "middle", "ring", "little"][i], [(1.5 - i) * d.palmWidth * (version >= 5 ? 0.225 : 0.24) * mirror, d.palmLength * 0.39 - (i === 3 ? 6e-3 * scale : 0), 0], [0.032, 0.024, 0.019].map((n) => n * length * scale), d.fingerRadius * (i === 3 ? 0.85 : 1)));
  const thumb = chain("thumb", [mirror * d.palmWidth * 0.43, -d.palmLength * 0.18, d.palmThickness * 0.2], [0.031 * scale, 0.024 * scale], d.fingerRadius * 1.1);
  root.updateMatrixWorld(true);
  const skeleton = new THREE.Skeleton(bones), geometry = mergeGeometries(pieces);
  pieces.forEach((g) => g.dispose());
  const mesh = new THREE.SkinnedMesh(geometry, material);
  mesh.add(root);
  mesh.bind(skeleton, new THREE.Matrix4());
  mesh.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 0.025 * scale, 0.015 * scale), 0.16 * scale);
  mesh.frustumCulled = false;
  const mix = THREE.MathUtils.lerp;
  const relaxed = [[0.24, 0.28, 0.16], [0.28, 0.32, 0.18], [0.33, 0.37, 0.21], [0.36, 0.42, 0.24]];
  function pose({ trigger = 0, grip = 0, thumb: thumbCurl = 0 } = {}) {
    fingers.forEach((joints, i) => {
      const curl = i === 0 ? trigger : grip, spread = (version >= 5 ? [0.035, 8e-3, -8e-3, -0.04] : [0.095, 0.025, -0.035, -0.12])[i] * mirror;
      joints.forEach((joint, j) => joint.rotation.set(mix((version >= 5 ? relaxed[i] : [0.08, 0.12, 0.09])[j], [i === 0 ? 0.95 : 1.1, 1.35, 0.88][j], curl), 0, j === 0 ? spread * (1 - curl) : 0));
    });
    thumb[0].rotation.set(mix(version >= 5 ? 0.15 : 0.18, version >= 5 ? 0.7 : 0.75, thumbCurl), 0, mirror * mix(version >= 5 ? -0.58 : -0.9, version >= 5 ? 0.15 : 0.25, thumbCurl));
    thumb[1].rotation.set(mix(0.12, version >= 5 ? 0.6 : 0.7, thumbCurl), 0, 0);
  }
  function snapshot() {
    return bones.map((b) => b.quaternion.toArray());
  }
  pose();
  return { mesh, pose, snapshot };
}
export {
  createFingerHand
};
