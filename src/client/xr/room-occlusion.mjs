import * as THREE from "three";
function createRoomOcclusion() {
  const depthScene = new THREE.Scene(), proxies = /* @__PURE__ */ new Map(), materials = /* @__PURE__ */ new Map();
  let active = false, visibleCount = 0;
  const visible = (mesh) => {
    for (let node = mesh; node; node = node.parent) if (!node.visible) return false;
    return true;
  };
  function material(side) {
    if (!materials.has(side)) materials.set(side, new THREE.MeshBasicMaterial({ side, colorWrite: false, depthWrite: true, depthTest: true }));
    return materials.get(side);
  }
  function sync(sources) {
    const keep = new Set(sources);
    visibleCount = 0;
    for (const [source, proxy] of proxies) if (!keep.has(source)) {
      proxy.removeFromParent();
      proxies.delete(source);
    }
    for (const source of sources) {
      let proxy = proxies.get(source);
      if (!proxy) {
        const depthMaterial = material(source.material.side);
        proxy = source.isSkinnedMesh ? new THREE.SkinnedMesh(source.geometry, depthMaterial) : new THREE.Mesh(source.geometry, depthMaterial);
        proxy.matrixAutoUpdate = false;
        proxies.set(source, proxy);
        depthScene.add(proxy);
      }
      proxy.visible = visible(source);
      if (!proxy.visible) continue;
      visibleCount++;
      proxy.geometry = source.geometry;
      proxy.material = material(source.material.side);
      proxy.matrix.copy(source.matrixWorld);
      proxy.matrixWorldNeedsUpdate = true;
      proxy.frustumCulled = source.isSkinnedMesh ? false : source.frustumCulled;
      if (source.isSkinnedMesh) {
        proxy.skeleton = source.skeleton;
        proxy.bindMode = source.bindMode;
        proxy.bindMatrix.copy(source.bindMatrix);
        proxy.bindMatrixInverse.copy(source.bindMatrixInverse);
        if (source.boundingSphere) proxy.boundingSphere = source.boundingSphere;
      }
    }
  }
  return {
    render(renderer, scene, camera, sources, { enabled = false } = {}) {
      active = enabled;
      if (!enabled) {
        visibleCount = 0;
        renderer.render(scene, camera);
        return;
      }
      scene.updateMatrixWorld(true);
      sync(sources);
      if (!visibleCount) {
        active = false;
        renderer.render(scene, camera);
        return;
      }
      const autoClear = renderer.autoClear;
      try {
        renderer.autoClear = true;
        renderer.render(depthScene, camera);
        renderer.autoClear = false;
        renderer.render(scene, camera);
      } finally {
        renderer.autoClear = autoClear;
      }
    },
    snapshot: () => ({ active, visibleMeshes: visibleCount }),
    dispose() {
      depthScene.clear();
      proxies.clear();
      for (const m of materials.values()) m.dispose();
      materials.clear();
    }
  };
}
export {
  createRoomOcclusion
};
