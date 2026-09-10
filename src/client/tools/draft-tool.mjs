import { UI_THEME as T } from "../../shared/ui-theme.mjs";
import * as THREE from "three";
import { createDraft } from "../../shared/draft.mjs";
function createDraftTool({ world, pickGround, smoothing = "off" }) {
  const model = createDraft({ smoothing, validatePath: supportedPath }), group = new THREE.Group();
  group.visible = false;
  world.add(group);
  const material = new THREE.MeshBasicMaterial({ toneMapped: false, color: T.accent, depthTest: false });
  const line = new THREE.Mesh(new THREE.BufferGeometry(), material);
  line.renderOrder = 14;
  group.add(line);
  const halo = new THREE.Mesh(new THREE.BufferGeometry(), new THREE.MeshBasicMaterial({ toneMapped: false, color: T.panel, depthTest: false }));
  halo.renderOrder = 13;
  group.add(halo);
  const pending = new THREE.Line(new THREE.BufferGeometry(), new THREE.LineDashedMaterial({ toneMapped: false, color: T.panel, dashSize: 0.035, gapSize: 0.09, depthTest: false }));
  pending.renderOrder = 15;
  group.add(pending);
  const dotMaterial = new THREE.MeshBasicMaterial({ toneMapped: false, color: T.accent, depthTest: false });
  const brush = new THREE.Mesh(new THREE.RingGeometry(0.04, 0.065, 20), new THREE.MeshBasicMaterial({ toneMapped: false, color: T.panel, side: THREE.DoubleSide, depthTest: false }));
  brush.rotation.x = -Math.PI / 2;
  brush.renderOrder = 15;
  group.add(brush);
  const start = new THREE.Mesh(new THREE.SphereGeometry(0.065, 10, 8), dotMaterial), end = new THREE.Mesh(start.geometry, dotMaterial);
  start.renderOrder = end.renderOrder = 15;
  group.add(start, end);
  const arrow = new THREE.ArrowHelper(new THREE.Vector3(0, 0, 1), new THREE.Vector3(), 0.3, T.accent, 0.12, 0.09);
  arrow.line.material.toneMapped = arrow.cone.material.toneMapped = false;
  arrow.line.material.depthTest = arrow.cone.material.depthTest = false;
  arrow.line.renderOrder = arrow.cone.renderOrder = 15;
  group.add(arrow);
  let owner = null, version = -1, enabled = false, mode = "floor2d", depth = 0.6;
  const point = (ray) => mode === "space3d" ? world.worldToLocal(ray.ray.at(depth, new THREE.Vector3())).toArray() : pickGround(ray)?.toArray() || null;
  const probe = new THREE.Raycaster();
  function supportedPath(points) {
    if (mode === "space3d") return true;
    world.updateMatrixWorld(true);
    for (let n = 1; n < points.length; n++) {
      const a = new THREE.Vector3().fromArray(points[n - 1]), b = new THREE.Vector3().fromArray(points[n]), steps = Math.max(1, Math.ceil(a.distanceTo(b) / 0.04));
      for (let i = 0; i <= steps; i++) {
        const p = a.clone().lerp(b, i / steps), origin = world.localToWorld(p.clone().add(new THREE.Vector3(0, 0.2, 0)));
        probe.set(origin, new THREE.Vector3(0, -1, 0).transformDirection(world.matrixWorld));
        const ground = pickGround(probe);
        if (!ground || Math.abs(ground.y - p.y) > 0.05) return false;
      }
    }
    return true;
  }
  function continuousSurface(next) {
    if (mode === "space3d") return next;
    const last = model.lastPoint();
    if (!last || !next) return next;
    const a = new THREE.Vector3().fromArray(last), b = new THREE.Vector3().fromArray(next), steps = Math.ceil(a.distanceTo(b) / 0.08);
    for (let i = 1; i < Math.min(steps, 12); i++) {
      const p = a.clone().lerp(b, i / steps), origin = p.clone().add(new THREE.Vector3(0, 0.2, 0));
      world.localToWorld(origin);
      probe.set(origin, new THREE.Vector3(0, -1, 0).transformDirection(world.matrixWorld));
      const ground = pickGround(probe);
      if (!ground || Math.abs(ground.y - p.y) > 0.12) return null;
    }
    return next;
  }
  function paint() {
    const next = model.summary();
    if (next.version === version) return;
    version = next.version;
    const data = model.snapshot(), points = (data.stroke || data.points).map((p) => new THREE.Vector3(p[0], p[1] + (mode === "floor2d" ? 0.025 : 0), p[2]));
    line.geometry.dispose();
    line.visible = points.length > 1;
    const path = new THREE.CurvePath();
    for (let i = 1; i < points.length; i++) path.add(new THREE.LineCurve3(points[i - 1], points[i]));
    line.geometry = points.length > 1 ? new THREE.TubeGeometry(path, Math.max(8, points.length * 2), 0.012, 6, false) : new THREE.BufferGeometry();
    halo.geometry.dispose();
    halo.visible = line.visible;
    halo.geometry = points.length > 1 ? new THREE.TubeGeometry(path, Math.max(8, points.length * 2), 0.022, 6, false) : new THREE.BufferGeometry();
    pending.geometry.dispose();
    pending.geometry = new THREE.BufferGeometry().setFromPoints(points);
    pending.computeLineDistances();
    pending.visible = !!data.stroke && points.length > 1;
    start.visible = end.visible = points.length > 0;
    arrow.visible = points.length > 1;
    if (points.length) {
      start.position.copy(points[0]);
      end.position.copy(points.at(-1));
    }
    if (points.length > 1) {
      const direction = points.at(-1).clone().sub(points.at(-2));
      direction.y = 0;
      if (direction.lengthSq() > 1e-5) {
        arrow.position.copy(points.at(-1));
        arrow.setDirection(direction.normalize());
      } else arrow.visible = false;
    }
  }
  return {
    open(points = [], options = {}) {
      mode = options.mode || "floor2d";
      depth = options.depth || 0.6;
      model.setMode(mode);
      enabled = true;
      group.visible = true;
      owner = null;
      model.load(points);
      paint();
    },
    close() {
      enabled = false;
      group.visible = false;
      owner = null;
      model.reset();
      paint();
    },
    depth(delta) {
      if (owner && owner !== "mouse") return;
      depth = THREE.MathUtils.clamp(depth + delta, 0.2, 5);
    },
    cycleSmoothing() {
      const levels = ["off", "standard", "strong", "extreme"], current = model.summary().smoothing;
      model.setSmoothing(levels[(levels.indexOf(current) + 1) % levels.length]);
      paint();
    },
    active: () => enabled,
    begin(ray, input) {
      if (!enabled || owner) return false;
      model.begin(point(ray));
      owner = input;
      paint();
      return true;
    },
    update(ray, input) {
      if (!enabled) return;
      const p = point(ray);
      brush.visible = !!p;
      if (p) brush.position.set(p[0], p[1] + 0.03, p[2]);
      if (owner === input) model.sample(continuousSurface(p));
      paint();
    },
    release(input) {
      if (owner !== input) return false;
      owner = null;
      const result = model.finish();
      paint();
      return result;
    },
    suspend(reason) {
      owner = null;
      model.interrupt(reason);
      brush.visible = false;
      paint();
    },
    clear() {
      model.reset();
      paint();
    },
    undo() {
      owner = null;
      model.undo();
      paint();
    },
    summary: () => ({ ...model.summary(), depth, message: mode === "space3d" ? model.summary().message.replace("Hold the right trigger to draw on the floor. Release to finish.", "Spatial brush · Hold right trigger and move your hand · Y Save menu") : model.summary().message }),
    snapshot: () => ({ ...model.snapshot(), active: enabled, owner: owner === "mouse" ? "mouse" : owner ? "controller" : null })
  };
}
export {
  createDraftTool
};
