import * as THREE from "three";
function createTriggerRegionLayer(world) {
  const root = new THREE.Group();
  world.add(root);
  let key = "";
  const outlines = /* @__PURE__ */ new Map();
  return {
    frame(scene, { editing = false, states = [] } = {}) {
      const regions = scene.triggerRegions || [], next = JSON.stringify(regions);
      if (next !== key) {
        key = next;
        for (const m of outlines.values()) {
          m.traverse((o) => {
            o.geometry?.dispose();
            o.material?.dispose();
          });
        }
        root.clear();
        outlines.clear();
        for (const r of regions) {
          const m = new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(r.points.map(([x, z]) => new THREE.Vector3(x, r.floorY + 0.018, z))), new THREE.LineBasicMaterial({ color: 10127071, toneMapped: false }));
          const shape = new THREE.Shape(r.points.map(([x, z]) => new THREE.Vector2(x, z))), fill = new THREE.Mesh(new THREE.ShapeGeometry(shape), new THREE.MeshBasicMaterial({ color: 10127071, transparent: true, opacity: 0.12, side: THREE.DoubleSide, depthWrite: false, toneMapped: false }));
          fill.rotation.x = Math.PI / 2;
          fill.position.y = r.floorY + 0.012;
          m.add(fill);
          root.add(m);
          outlines.set(r.id, m);
        }
      }
      for (const [id, m] of outlines) {
        const related = states.filter((s) => s.regionId === id);
        m.visible = editing || related.length > 0;
        m.material.color.set(related.some((s) => s.fired) ? 6473113 : related.some((s) => s.inside) ? 16764784 : 10127071);
        for (const child of m.children) child.material.color.copy(m.material.color);
      }
    }
  };
}
export {
  createTriggerRegionLayer
};
