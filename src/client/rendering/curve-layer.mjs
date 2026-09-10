import * as THREE from "three";
function createCurveLayer(world) {
  const group = new THREE.Group();
  world.add(group);
  let key = "";
  return { sync(curves = [], selected = null) {
    const next = JSON.stringify([curves, selected]);
    if (key === next) return;
    key = next;
    for (const child of [...group.children]) {
      child.geometry.dispose();
      child.material.dispose();
      group.remove(child);
    }
    for (const curve of curves) {
      const points = curve.points.map((p) => new THREE.Vector3(p[0], p[1] + (curve.mode === "floor2d" ? 0.025 : 0), p[2])), path = new THREE.CurvePath();
      for (let i = 1; i < points.length; i++) path.add(new THREE.LineCurve3(points[i - 1], points[i]));
      const color = curve.id === selected ? "#ffd166" : curve.mode === "space3d" ? "#b89bff" : "#51dac0";
      const mesh = new THREE.Mesh(new THREE.TubeGeometry(path, Math.max(8, points.length * 2), 0.012, 6, false), new THREE.MeshBasicMaterial({ color, toneMapped: false }));
      group.add(mesh);
      const start = new THREE.Mesh(new THREE.SphereGeometry(0.055, 10, 8), new THREE.MeshBasicMaterial({ color, toneMapped: false }));
      start.position.copy(points[0]);
      group.add(start);
    }
  } };
}
export {
  createCurveLayer
};
