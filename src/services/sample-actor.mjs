import * as THREE from "three";
import { createHash } from "node:crypto";
import { mkdir, writeFile, access } from "node:fs/promises";
import { join } from "node:path";
async function installSampleActor(directory) {
  const folder = join(directory, "actor-assets", "sample-actor");
  try {
    await access(join(folder, "asset.json"));
    return;
  } catch {
  }
  const joints = [[0, 0.94, 0], [-0.11, 0.91, 0], [0.11, 0.91, 0], [0, 1.06, 0], [-0.11, 0.53, 0], [0.11, 0.53, 0], [0, 1.2, 0], [-0.11, 0.13, 0], [0.11, 0.13, 0], [0, 1.34, 0], [-0.11, 0.07, 0.13], [0.11, 0.07, 0.13], [0, 1.51, 0], [-0.09, 1.4, 0], [0.09, 1.4, 0], [0, 1.66, 0], [-0.21, 1.4, 0], [0.21, 1.4, 0], [-0.49, 1.4, 0], [0.49, 1.4, 0], [-0.72, 1.4, 0], [0.72, 1.4, 0], [-0.8, 1.4, 0], [0.8, 1.4, 0]].map(([x, y, z]) => [-x, y, z]);
  const parents = [-1, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 9, 9, 12, 13, 14, 16, 17, 18, 19, 20, 21];
  const names = ["pelvis", "left_hip", "right_hip", "spine1", "left_knee", "right_knee", "spine2", "left_ankle", "right_ankle", "spine3", "left_foot", "right_foot", "neck", "left_collar", "right_collar", "head", "left_shoulder", "right_shoulder", "left_elbow", "right_elbow", "left_wrist", "right_wrist", "left_hand", "right_hand"];
  const vertices = [], faces = [], skinIndices = [], skinWeights = [];
  function add(geometry, bone, position, quaternion = new THREE.Quaternion()) {
    const g = geometry.toNonIndexed(), p = g.getAttribute("position"), v = new THREE.Vector3(), offset = vertices.length / 3;
    for (let i = 0; i < p.count; i++) {
      v.fromBufferAttribute(p, i).applyQuaternion(quaternion).add(position);
      vertices.push(...v.toArray());
      skinIndices.push(bone, 0, 0, 0);
      skinWeights.push(1, 0, 0, 0);
      faces.push(offset + i);
    }
    g.dispose();
    geometry.dispose();
  }
  const point = (i) => new THREE.Vector3(...joints[i]);
  const limb = (a, b, width) => {
    const p = point(a), q = point(b), d = q.clone().sub(p);
    add(new THREE.BoxGeometry(width, d.length(), width), a, p.clone().add(q).multiplyScalar(0.5), new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.normalize()));
  };
  add(new THREE.BoxGeometry(0.29, 0.19, 0.19), 0, point(0));
  for (const [a, b, w] of [[1, 4, 0.13], [2, 5, 0.13], [4, 7, 0.105], [5, 8, 0.105], [3, 6, 0.24], [6, 9, 0.27], [9, 12, 0.3], [12, 15, 0.09], [13, 16, 0.09], [14, 17, 0.09], [16, 18, 0.09], [17, 19, 0.09], [18, 20, 0.075], [19, 21, 0.075]]) limb(a, b, w);
  for (const i of [10, 11]) add(new THREE.BoxGeometry(0.13, 0.14, 0.26), i, point(i));
  for (const i of [22, 23]) add(new THREE.BoxGeometry(0.13, 0.075, 0.1), i, point(i));
  add(new THREE.SphereGeometry(0.14, 10, 8), 15, point(15));
  const template = { format: "vrbuild-humanoid24-template/1", coordinateSystem: "right-handed-y-up", vertices, faces, joints: joints.flat(), parents, jointNames: names, skinIndices, skinWeights };
  const motion = { format: "vrbuild-humanoid24/1", coordinateSystem: "right-handed-y-up", jointCount: 24, frames: 1, fps: 30, quaternions: Array.from({ length: 24 }, () => [0, 0, 0, 1]).flat(), translations: [0, 0, 0], normalization: { origin: [0, 0, 0], yaw: 0 } };
  const t = Buffer.from(JSON.stringify(template)), m = Buffer.from(JSON.stringify(motion)), hash = (b) => createHash("sha256").update(b).digest("hex");
  const asset = { id: "sample-actor", name: "Mannequin", kind: "vrbuild-humanoid24", displayModel: "Procedural mannequin", defaultActor: true, preferred: true, bodyOnly: true, frames: 1, fps: 30, duration: 0, lastSample: 0, templateHash: hash(t), motionHash: hash(m), sourceFormat: "Original primitive geometry" };
  await mkdir(folder, { recursive: true });
  await writeFile(join(folder, "template.json"), t);
  await writeFile(join(folder, "motion.json"), m);
  await writeFile(join(folder, "asset.json"), JSON.stringify(asset));
}
export {
  installSampleActor
};
