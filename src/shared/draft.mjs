import { smoothCurve, smoothingProfile, stabilizedPoint } from "./curve-smoothing.mjs";
const pointOK = (p) => Array.isArray(p) && p.length === 3 && p.every((n) => Number.isFinite(n) && Math.abs(n) <= 100);
const distance = (a, b) => Math.hypot(...a.map((v, i) => v - b[i]));
const DRAFT_LIMITS = Object.freeze({ spacing: 0.025, minLength: 0.15, maxLength: 30, maxPoints: 512, maxGap: 0.75, maxStep: 0.15 });
function pathLength(points) {
  return points.slice(1).reduce((sum, p, i) => sum + distance(p, points[i]), 0);
}
function createDraft({ mode = "floor2d", smoothing = "off", validatePath = () => true } = {}) {
  smoothingProfile(smoothing);
  let points = [], rawPoints = [], stroke = null, rawStroke = null, rawLength = 0, history = [], version = 0, smoothingFallback = false, message = "Hold the right trigger to draw on the floor. Release to finish.";
  const changed = () => version++;
  function interrupt(reason = "Stroke cancelled. Previous path retained.") {
    if (stroke) {
      stroke = rawStroke = null;
      message = reason;
      changed();
    }
  }
  function processed(raw) {
    const candidate = smoothCurve(raw, smoothing);
    const fallback = smoothing !== "off" && candidate.length > 1 && !validatePath(candidate);
    return { points: fallback ? structuredClone(raw) : candidate, fallback };
  }
  function restore(raw) {
    const result = processed(raw);
    rawPoints = raw;
    const tooShort = raw.length > 1 && pathLength(result.points) < DRAFT_LIMITS.minLength;
    points = tooShort ? structuredClone(raw) : result.points;
    smoothingFallback = result.fallback || tooShort;
    message = smoothingFallback ? "Smoothing did not fit this path. Original stroke retained." : "Draft retained for this edit · Redraw or undo";
  }
  return {
    setMode(next) {
      if (!["floor2d", "space3d"].includes(next)) throw Error("Invalid brush mode");
      mode = next;
    },
    setSmoothing(next) {
      smoothingProfile(next);
      if (stroke) throw Error("Release the trigger before adjusting smoothing");
      smoothing = next;
      restore(rawPoints);
      changed();
    },
    begin(point) {
      if (!pointOK(point)) throw new Error("Point at a visible floor");
      if (stroke) throw new Error("Release the trigger first");
      stroke = [[...point]];
      rawStroke = [[...point]];
      rawLength = 0;
      message = "Drawing · Release to finish · A to cancel";
      changed();
    },
    sample(point) {
      if (!stroke) return false;
      if (!pointOK(point)) {
        interrupt("Left the visible floor. Stroke discarded; release and try again.");
        return false;
      }
      const last = rawStroke.at(-1), step = distance(point, last);
      if (step > DRAFT_LIMITS.maxGap || mode === "floor2d" && Math.abs(point[1] - last[1]) > DRAFT_LIMITS.maxStep) {
        interrupt("Stroke contains a large jump. Release and redraw continuously along the floor.");
        return false;
      }
      if (step < DRAFT_LIMITS.spacing) return true;
      if (rawStroke.length >= DRAFT_LIMITS.maxPoints || rawLength + step > DRAFT_LIMITS.maxLength) {
        interrupt("Stroke too long. Release and draw a shorter path.");
        return false;
      }
      rawStroke.push([...point]);
      rawLength += step;
      const tip = stabilizedPoint(stroke.at(-1), point, smoothing);
      if (distance(tip, stroke.at(-1)) > 1e-6) stroke.push(tip);
      changed();
      return true;
    },
    finish() {
      if (!stroke) return false;
      const result = processed(rawStroke);
      if (pathLength(result.points) < DRAFT_LIMITS.minLength) {
        interrupt("Stroke too short. Draw a forward path again.");
        return false;
      }
      history.push(rawPoints);
      if (history.length > 20) history.shift();
      rawPoints = rawStroke;
      points = result.points;
      smoothingFallback = result.fallback;
      stroke = rawStroke = null;
      message = result.fallback ? "Smoothed curve crossed the floor edge. Original stroke retained." : "Draft retained for this edit · Redraw or undo";
      changed();
      return true;
    },
    interrupt,
    undo() {
      if (stroke) {
        interrupt();
        return;
      }
      if (history.length) {
        restore(history.pop());
        if (!smoothingFallback) message = "Last stroke undone";
        changed();
      }
    },
    load(saved) {
      points = structuredClone(saved || []);
      rawPoints = structuredClone(points);
      stroke = rawStroke = null;
      history = [];
      smoothingFallback = false;
      changed();
    },
    reset() {
      points = [];
      rawPoints = [];
      stroke = rawStroke = null;
      history = [];
      smoothingFallback = false;
      message = "Hold the right trigger to draw on the floor. Release to finish.";
      changed();
    },
    lastPoint: () => rawStroke?.length ? [...rawStroke.at(-1)] : null,
    summary: () => ({ mode, smoothing, smoothingLabel: smoothingProfile(smoothing).label, smoothingFallback, version, drawing: !!stroke, pointCount: (stroke || points).length, length: pathLength(stroke || points), canUndo: !!stroke || history.length > 0, message }),
    snapshot: () => ({ schema: "vrbuild-draft/1", mode, smoothing, points: structuredClone(points), rawPoints: structuredClone(rawPoints), stroke: stroke ? structuredClone(stroke) : null })
  };
}
export {
  DRAFT_LIMITS,
  createDraft,
  pathLength
};
