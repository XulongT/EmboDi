import * as THREE from "three";
import { isCamera, isLight, objectQuaternion, rigFrame } from "../../shared/cinema.mjs";
function createCinemaLayer(world) {
  const root = new THREE.Group();
  world.add(root);
  let key = "", definition = { objects: [], curves: [] };
  const cameras = /* @__PURE__ */ new Map(), lights = /* @__PURE__ */ new Map();
  function clear() {
    for (const entry of lights.values()) {
      entry.light.dispose?.();
    }
    root.clear();
    cameras.clear();
    lights.clear();
  }
  return {
    cameras,
    lights,
    root,
    sync(scene) {
      const next = JSON.stringify(scene);
      if (next === key) return;
      key = next;
      definition = scene;
      clear();
      for (const o of scene.objects) {
        if (isCamera(o)) {
          const camera = new THREE.PerspectiveCamera(o.camera.fov, o.camera.aspect, 0.02, 200);
          root.add(camera);
          cameras.set(o.id, camera);
        }
        if (isLight(o)) {
          const p = o.light, light = p.type === "spot" ? new THREE.SpotLight(p.color, p.intensity, p.range, p.angle * Math.PI / 180, 0.35) : new THREE.PointLight(p.color, p.intensity, p.range);
          root.add(light);
          if (light.target) root.add(light.target);
          lights.set(o.id, { light });
        }
      }
    },
    frame(time = 0, targets = [], overrides = [], activeIds = null, triggerClocks = {}) {
      const changes = new Map(overrides.map((p) => [p.id, p])), frames = [], active = activeIds === null ? null : new Set(activeIds);
      for (const o of definition.objects) {
        const localTime = o.track?.trigger ? triggerClocks[o.id] ?? null : time;
        const animate = time !== null && localTime !== null && (!active || active.has(o.id));
        const f = { ...rigFrame(animate ? o : { ...o, track: null }, definition.curves || [], animate ? localTime : 0, animate ? targets : [...definition.objects, ...definition.actors || []]), ...changes.get(o.id) };
        frames.push(f);
        const camera = cameras.get(o.id);
        if (camera) {
          camera.position.fromArray(f.position);
          camera.quaternion.fromArray(f.quaternion || objectQuaternion(o));
          camera.updateMatrixWorld(true);
        }
        const light = lights.get(o.id)?.light;
        if (light) {
          light.position.fromArray(f.position);
          light.intensity = f.intensity ?? o.light.intensity;
          if (light.target) light.target.position.set(0, 0, -1).applyQuaternion(new THREE.Quaternion(...f.quaternion)).add(light.position);
        }
      }
      root.updateMatrixWorld(true);
      return frames;
    },
    dispose() {
      clear();
      world.remove(root);
    }
  };
}
export {
  createCinemaLayer
};
