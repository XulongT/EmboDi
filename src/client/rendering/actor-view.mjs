import { UI_THEME as T } from "../../shared/ui-theme.mjs";
import * as THREE from "three";
import { JOINTS, sampleMotion } from "../../shared/authoring-motion.mjs";
import { MOTION_PRESETS } from "../../shared/actor-presets.mjs";
function numbers(a, length, name) {
  if (!Array.isArray(a) || a.length !== length || a.some((x) => !Number.isFinite(x))) throw new Error(`Invalid actor asset: ${name}`);
}
function validateActorAsset(template, motion) {
  const count = template.format === "vrbuild-wooden-template/1" && motion.format === "vrbuild-hymotion-native/1" ? 52 : template.format === "vrbuild-humanoid24-template/1" && motion.format === "vrbuild-humanoid24/1" ? 24 : 0;
  if (!count || motion.jointCount !== count || template.coordinateSystem !== "right-handed-y-up" || motion.coordinateSystem !== "right-handed-y-up") throw new Error("Unsupported actor skeleton");
  const n = template.vertices?.length / 3;
  if (!Number.isInteger(n) || n < 1 || n > 1e5) throw new Error("Invalid mesh vertex count");
  numbers(template.vertices, n * 3, "vertices");
  numbers(template.joints, count * 3, "joints");
  numbers(template.parents, count, "parents");
  numbers(template.skinIndices, n * 4, "skin indices");
  numbers(template.skinWeights, n * 4, "skin weights");
  if (!Array.isArray(template.faces) || template.faces.length % 3 || template.faces.some((i) => !Number.isInteger(i) || i < 0 || i >= n) || template.parents[0] !== -1 || template.parents.some((p, i) => i && (!Number.isInteger(p) || p < 0 || p >= i)) || template.skinIndices.some((i) => !Number.isInteger(i) || i < 0 || i >= count) || template.skinWeights.some((w) => w < 0)) throw new Error("Invalid mesh topology");
  if (!Number.isInteger(motion.frames) || motion.frames < 1 || motion.frames > 3600 || !Number.isFinite(motion.fps) || motion.fps < 1 || motion.fps > 240) throw new Error("Invalid motion timing");
  numbers(motion.quaternions, motion.frames * count * 4, "quaternions");
  numbers(motion.translations, motion.frames * 3, "translations");
  numbers(motion.normalization?.origin, 3, "normalization");
  if (!Number.isFinite(motion.normalization.yaw)) throw new Error("Invalid normalized actor orientation");
  for (let i = 0; i < motion.quaternions.length; i += 4) {
    if (Math.abs(Math.hypot(...motion.quaternions.slice(i, i + 4)) - 1) > 1e-4) throw new Error("Motion quaternions are not normalized");
  }
  return { template, motion };
}
class SkinnedActorView extends THREE.Group {
  constructor({ template, motion }, { validate = true } = {}) {
    super();
    if (validate) validateActorAsset(template, motion);
    this.motion = motion;
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(template.vertices, 3));
    geometry.setIndex(template.faces);
    geometry.computeVertexNormals();
    geometry.setAttribute("skinIndex", new THREE.Uint16BufferAttribute(template.skinIndices, 4));
    geometry.setAttribute("skinWeight", new THREE.Float32BufferAttribute(template.skinWeights, 4));
    const material = new THREE.MeshStandardMaterial({ color: "#e7e9e5", roughness: 0.85, metalness: 0 });
    this.mesh = new THREE.SkinnedMesh(geometry, material);
    this.mesh.frustumCulled = false;
    this.mesh.boundingSphere = new THREE.Sphere();
    this.worldToMesh = new THREE.Matrix4();
    this.bones = template.parents.map(() => new THREE.Bone());
    this.bones.forEach((bone, i) => {
      bone.name = template.jointNames?.[i] || String(i);
      bone.position.fromArray(template.joints, i * 3);
      const parent = template.parents[i];
      if (parent >= 0) {
        bone.position.sub(new THREE.Vector3().fromArray(template.joints, parent * 3));
        this.bones[parent].add(bone);
      }
    });
    this.mesh.add(this.bones[0]);
    this.skeleton = new THREE.Skeleton(this.bones);
    this.mesh.bind(this.skeleton);
    let floor = Infinity;
    for (let i = 1; i < template.vertices.length; i += 3) floor = Math.min(floor, template.vertices[i]);
    this.restOrigin = new THREE.Vector3(template.joints[0], floor, template.joints[2]);
    this.normalization = new THREE.Group();
    this.normalization.rotation.y = motion.normalization.yaw;
    this.offset = new THREE.Group();
    this.offset.position.fromArray(motion.normalization.origin).negate();
    this.normalization.add(this.offset);
    this.offset.add(this.mesh);
    this.add(this.normalization);
    this.qa = new THREE.Quaternion();
    this.qb = new THREE.Quaternion();
    this.bounds = new THREE.Box3();
    this.helper = new THREE.Box3Helper(this.bounds, T.accent);
    this.helper.material.toneMapped = false;
    this.helper.visible = false;
  }
  seek(seconds, motionOffset = [0, 0, 0], inPlace = false) {
    if (!Number.isFinite(seconds)) throw new Error("Motion time must be finite");
    this.normalization.position.fromArray(motionOffset);
    this.normalization.rotation.y = this.motion.normalization.yaw;
    this.offset.position.fromArray(this.motion.normalization.origin).negate();
    const m = this.motion, t = THREE.MathUtils.clamp(seconds, 0, (m.frames - 1) / m.fps) * m.fps, a = Math.floor(t), b = Math.min(a + 1, m.frames - 1), alpha = t - a;
    for (let i = 0; i < m.jointCount; i++) {
      this.qa.fromArray(m.quaternions, (a * m.jointCount + i) * 4);
      this.qb.fromArray(m.quaternions, (b * m.jointCount + i) * 4);
      this.bones[i].quaternion.slerpQuaternions(this.qa, this.qb, alpha);
    }
    for (let axis = 0; axis < 3; axis++) this.mesh.position.setComponent(axis, THREE.MathUtils.lerp(m.translations[a * 3 + axis], m.translations[b * 3 + axis], alpha));
    if (inPlace) {
      this.mesh.position.x = m.translations[0];
      this.mesh.position.z = m.translations[2];
    }
    this.updateWorldMatrix(true, false);
    this.updateMatrixWorld(true);
    this.skeleton.update();
  }
  restPose() {
    for (const bone of this.bones) bone.quaternion.identity();
    this.mesh.position.set(0, 0, 0);
    this.normalization.position.set(0, 0, 0);
    this.normalization.rotation.y = 0;
    this.offset.position.copy(this.restOrigin).negate();
    this.updateWorldMatrix(true, false);
    this.updateMatrixWorld(true);
    this.skeleton.update();
  }
  apply(frame, { opacity = 1, selected = false } = {}) {
    this.position.fromArray(frame.position);
    this.rotation.y = frame.yaw;
    this.visible = frame.visible;
    if (frame.pose === "generated" && frame.motionPlan) {
      this.restPose();
      const sample = sampleMotion(frame.motionPlan, frame.clipTime), euler = new THREE.Euler();
      for (let i = 0; i < 24 && i < this.bones.length; i++) {
        const a = sample.a.joints.find((j) => j.joint === JOINTS[i])?.rotation || [0, 0, 0], b = sample.b.joints.find((j) => j.joint === JOINTS[i])?.rotation || [0, 0, 0];
        this.qa.setFromEuler(euler.set(...a.map(THREE.MathUtils.degToRad)));
        this.qb.setFromEuler(euler.set(...b.map(THREE.MathUtils.degToRad)));
        this.bones[i].quaternion.slerpQuaternions(this.qa, this.qb, sample.alpha);
      }
      this.mesh.position.fromArray(sample.root);
      if (sample.position) this.position.fromArray(sample.position);
      if (sample.yaw !== null) this.rotation.y = sample.yaw;
      this.updateWorldMatrix(true, false);
      this.updateMatrixWorld(true);
      this.skeleton.update();
    } else if (frame.pose === "rest" || frame.preview) this.restPose();
    else this.seek(frame.clipTime, frame.motionOffset, frame.inPlace);
    const material = this.mesh.material;
    material.color.set(frame.color);
    material.emissive.set("#000000");
    material.emissiveIntensity = 0.25;
    material.opacity = opacity;
    material.transparent = opacity < 1;
    material.depthWrite = opacity >= 1;
    this.bounds.makeEmpty();
    const p = new THREE.Vector3();
    for (const bone of this.bones) this.bounds.expandByPoint(bone.getWorldPosition(p));
    this.bounds.expandByScalar(0.12);
    this.bounds.getBoundingSphere(this.mesh.boundingSphere);
    this.mesh.boundingSphere.applyMatrix4(this.worldToMesh.copy(this.mesh.matrixWorld).invert());
    this.helper.visible = selected && this.visible;
    this.helper.updateMatrixWorld(true);
  }
  dispose() {
    this.helper.removeFromParent();
    this.helper.geometry.dispose();
    this.helper.material.dispose();
    this.mesh.geometry.dispose();
    this.mesh.material.dispose();
    this.skeleton.dispose();
    this.removeFromParent();
  }
}
function createActorLayer(parent, assets) {
  const views = /* @__PURE__ */ new Map();
  let frames = [];
  function apply(next, { opacity = 1, selected = null, clean = false } = {}) {
    frames = next;
    const ids = new Set(next.map((f) => f.id));
    for (const [id, v] of views) if (!ids.has(id)) {
      v.dispose();
      views.delete(id);
    }
    for (const frame of next) {
      const asset = assets.get(frame.assetId);
      if (!asset) continue;
      let view = views.get(frame.id);
      if (view && view.userData.assetId !== frame.assetId) {
        const previous = assets.get(view.userData.assetId);
        if (previous?.template === asset.template || previous?.templateHash && previous.templateHash === asset.templateHash) {
          view.motion = asset.motion;
          view.userData.assetId = frame.assetId;
        } else {
          view.dispose();
          views.delete(frame.id);
          view = null;
        }
      }
      if (!view) {
        view = new SkinnedActorView(asset, { validate: false });
        view.userData.assetId = frame.assetId;
        views.set(frame.id, view);
        parent.add(view);
        parent.parent?.add(view.helper);
      }
      view.apply({ ...frame, visible: frame.visible && !(clean && frame.preview) }, { opacity, selected: Array.isArray(selected) ? selected.includes(frame.id) : selected === frame.id });
    }
  }
  const point = new THREE.Vector3(), nearPoint = new THREE.Vector3();
  function pick(raycaster, { maxDistance = Infinity } = {}) {
    let best = null, limit = Math.min(maxDistance, raycaster.far);
    raycaster.ray.at(raycaster.near, nearPoint);
    for (const [id, view] of views) {
      if (!view.visible) continue;
      if (view.bounds.containsPoint(nearPoint)) point.copy(nearPoint);
      else if (!raycaster.ray.intersectBox(view.bounds, point)) continue;
      const distance = point.distanceTo(raycaster.ray.origin);
      if (distance >= raycaster.near && distance <= limit) {
        limit = distance;
        best = { id, distance, approximate: true };
      }
    }
    return best;
  }
  return { apply, views, pick, dispose() {
    for (const v of views.values()) v.dispose();
    views.clear();
  }, snapshot: () => frames.map((f) => ({ id: f.id, visible: f.visible, preview: f.preview, pose: f.pose, clipTime: f.clipTime, position: [...f.position], yaw: f.yaw })) };
}
async function loadActorAssets(fetcher = fetch) {
  const response = await fetcher("/api/actor-assets");
  if (!response.ok) throw new Error("Actor asset directory is unavailable");
  const catalog = await response.json(), templates = /* @__PURE__ */ new Map();
  const json = async (entry, file) => {
    const r = await fetcher(`/actor-assets/${entry.id}/${file}.json`);
    if (!r.ok) throw new Error(`Could not load motion: ${entry.name}`);
    return r.json();
  };
  const entries = await Promise.all(catalog.map(async (entry) => {
    const key = /^[a-f0-9]{64}$/.test(entry.templateHash) ? entry.templateHash : entry.id;
    if (!templates.has(key)) templates.set(key, json(entry, "template"));
    const [template, motion] = await Promise.all([templates.get(key), json(entry, "motion")]);
    validateActorAsset(template, motion);
    return [entry.id, { ...entry, ...MOTION_PRESETS.find((p) => p.id === entry.id), template, motion }];
  }));
  return new Map(entries);
}
export {
  SkinnedActorView,
  createActorLayer,
  loadActorAssets,
  validateActorAsset
};
