const CURVE_SMOOTHING = Object.freeze({
  off: Object.freeze({ label: "Original", radius: 0, tolerance: 0, rounding: 0 }),
  standard: Object.freeze({ label: "Standard", radius: 0.025, tolerance: 0.02, rounding: 0.06 }),
  strong: Object.freeze({ label: "Strong", radius: 0.045, tolerance: 0.04, rounding: 0.1 }),
  extreme: Object.freeze({ label: "Extreme · Straight", radius: 0.045, tolerance: 0, rounding: 0 })
});
const distance = (a, b) => Math.hypot(...a.map((v, i) => v - b[i]));
const mix = (a, b, t) => a.map((v, i) => v + (b[i] - v) * t);
function smoothingProfile(level) {
  const profile = Object.hasOwn(CURVE_SMOOTHING, level) && CURVE_SMOOTHING[level];
  if (!profile) throw Error("Invalid smoothing mode");
  return profile;
}
function stabilizedPoint(previous, input, level) {
  const { radius } = smoothingProfile(level), d = distance(previous, input);
  return d <= radius ? [...previous] : mix(previous, input, (d - radius) / d);
}
function segmentDistance(point, a, b) {
  const delta = b.map((v, i) => v - a[i]), lengthSquared = delta.reduce((s, v) => s + v * v, 0);
  const t = lengthSquared ? Math.max(0, Math.min(1, delta.reduce((s, v, i) => s + v * (point[i] - a[i]), 0) / lengthSquared)) : 0;
  return distance(point, mix(a, b, t));
}
function simplify(points, tolerance) {
  if (points.length < 3) return points.map((p) => [...p]);
  const keep = /* @__PURE__ */ new Set([0, points.length - 1]), pending = [[0, points.length - 1]];
  while (pending.length) {
    const [start, end] = pending.pop();
    let furthest = -1, maximum = tolerance;
    for (let i = start + 1; i < end; i++) {
      const d = segmentDistance(points[i], points[start], points[end]);
      if (d > maximum) {
        maximum = d;
        furthest = i;
      }
    }
    if (furthest >= 0) {
      keep.add(furthest);
      pending.push([start, furthest], [furthest, end]);
    }
  }
  return [...keep].sort((a, b) => a - b).map((i) => [...points[i]]);
}
function smoothCurve(raw, level = "standard", { maxPoints = 512 } = {}) {
  const profile = smoothingProfile(level);
  if (level === "extreme" && raw.length > 1) return [[...raw[0]], [...raw.at(-1)]];
  if (level === "off" || raw.length < 3) return raw.map((p) => [...p]);
  const knots = simplify(raw, profile.tolerance), result = [[...knots[0]]];
  let extraBudget = Math.max(0, maxPoints - knots.length);
  for (let i = 1; i < knots.length - 1; i++) {
    const a = knots[i - 1], b = knots[i], c = knots[i + 1], ab = distance(a, b), bc = distance(b, c);
    const cosine = ab && bc ? b.reduce((sum, v, k) => sum + (v - a[k]) * (c[k] - v), 0) / (ab * bc) : -1;
    if (cosine <= 0.5 || extraBudget < 4 || ab < 0.01 || bc < 0.01) {
      result.push([...b]);
      continue;
    }
    const cut = Math.min(profile.rounding, ab * 0.25, bc * 0.25), entry = mix(b, a, cut / ab), exit = mix(b, c, cut / bc);
    for (const t of [0, 0.25, 0.5, 0.75, 1]) result.push(mix(mix(entry, b, t), mix(b, exit, t), t));
    extraBudget -= 4;
  }
  if (knots.length > 1) result.push([...knots.at(-1)]);
  return result;
}
export {
  CURVE_SMOOTHING,
  smoothCurve,
  smoothingProfile,
  stabilizedPoint
};
