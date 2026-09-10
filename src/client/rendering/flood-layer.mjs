import * as THREE from "three";
import { regionFrame, framePoint, regionObjectId } from "../../shared/interaction-regions.mjs";
import { floodVertices, floodOutline } from "../../shared/flood-geometry.mjs";
function createFloodLayer(world, { getObjectPose = () => null } = {}) {
  const root = new THREE.Group(), areas = new THREE.Group(), flows = new THREE.Group();
  world.add(root);
  root.add(areas, flows);
  const sections = 24;
  let scene, entries = [];
  function dispose(group) {
    for (const child of [...group.children]) {
      child.geometry?.dispose();
      child.material?.dispose();
      group.remove(child);
    }
  }
  function triangles(points) {
    return THREE.ShapeUtils.triangulateShape(points.map((p) => new THREE.Vector2(...p)), []).flat();
  }
  return {
    dispose() {
      dispose(areas);
      dispose(flows);
      world.remove(root);
      entries = [];
    },
    sync(definition) {
      scene = definition;
      entries = [];
      dispose(areas);
      dispose(flows);
      for (const r of scene.regions || []) {
        const f = regionFrame(scene, r), points = r.points.map((p) => framePoint(f, p).map((n, i) => n + f.normal[i] * 0.012)), color = r.surface === "floor" ? 3198395 : 15562137;
        const line = new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(points.map((p) => new THREE.Vector3(...p))), new THREE.LineBasicMaterial({ color, toneMapped: false }));
        line.userData.regionId = r.id;
        areas.add(line);
        const geometry = new THREE.BufferGeometry().setAttribute("position", new THREE.Float32BufferAttribute(points.flat(), 3));
        geometry.setIndex(triangles(r.points));
        geometry.computeVertexNormals();
        const fill = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.1, side: THREE.DoubleSide, depthWrite: false, toneMapped: false }));
        fill.userData.regionId = r.id;
        areas.add(fill);
      }
      for (const flood of scene.floods || []) for (const source of flood.sources) {
        const region = scene.regions.find((r) => r.id === source.regionId), outline = floodOutline(region), n = outline.length, indices = [], cap = triangles(outline);
        indices.push(...cap);
        for (let i = 0; i < sections; i++) for (let j = 0; j < n; j++) {
          const a = i * n + j, b = i * n + (j + 1) % n;
          indices.push(a, b, b + n, a, b + n, a + n);
        }
        indices.push(...cap.map((i) => i + sections * n));
        const geometry = new THREE.BufferGeometry().setAttribute("position", new THREE.BufferAttribute(floodVertices(scene, flood, source, 0, sections), 3));
        geometry.setIndex(indices);
        geometry.computeVertexNormals();
        const mesh = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ color: flood.color, roughness: 0.24, metalness: 0.05, side: THREE.DoubleSide, transparent: true, opacity: 0.94, depthWrite: true }));
        mesh.visible = false;
        mesh.frustumCulled = false;
        flows.add(mesh);
        entries.push({ flood, source, mesh });
      }
    },
    frame(runtime, { showRegions = true, opacity = 1 } = {}) {
      areas.visible = showRegions;
      const regionPoses = /* @__PURE__ */ new Map();
      for (const r of scene.regions || []) if (r.surface === "object-surface" && !regionPoses.has(regionObjectId(r))) {
        const pose = getObjectPose(regionObjectId(r));
        if (pose) regionPoses.set(regionObjectId(r), pose);
      }
      const current = regionPoses.size ? { ...scene, regionPoses } : scene;
      for (const line of areas.children.filter((o) => o.userData.regionId)) {
        const region = scene.regions.find((r) => r.id === line.userData.regionId);
        if (region.surface === "object-surface" && regionPoses.has(regionObjectId(region))) {
          const frame = regionFrame(current, region), positions = line.geometry.getAttribute("position");
          positions.array.set(region.points.flatMap((p) => framePoint(frame, p).map((n, i) => n + frame.normal[i] * 0.012)));
          positions.needsUpdate = true;
          line.geometry.computeBoundingSphere();
        }
        if (region.surface !== "floor") continue;
        const f = scene.floods?.find((f2) => f2.trigger.regionId === region.id), state = runtime.states.find((s) => s.id === f?.id);
        line.material.color.set(state?.fired ? 14047344 : state?.inside ? 15248699 : 3198395);
      }
      for (const { flood, source, mesh } of entries) {
        const state = runtime.states.find((s) => s.id === flood.id);
        mesh.visible = !!(runtime.visible && state?.fired && state.time > 0 && state.time < flood.duration);
        if (!mesh.visible) continue;
        const position = mesh.geometry.getAttribute("position");
        position.array.set(floodVertices(current, flood, source, state.time, sections));
        position.needsUpdate = true;
        mesh.geometry.computeVertexNormals();
        mesh.material.opacity = opacity * 0.94 * Math.min(1, (flood.duration - state.time) / 0.6);
      }
    },
    snapshot() {
      return entries.map(({ flood, source, mesh }) => {
        mesh.geometry.computeBoundingBox();
        return { id: flood.id, regionId: source.regionId, visible: mesh.visible, vertices: mesh.geometry.getAttribute("position").count, bounds: [mesh.geometry.boundingBox.min.toArray(), mesh.geometry.boundingBox.max.toArray()] };
      });
    }
  };
}
export {
  createFloodLayer
};
