import { entityLabel } from "./entity-label.mjs";
import { actorMotionId } from "./actors.mjs";
function previewScope(scene, ids = []) {
  const entities = [...scene.objects || [], ...scene.actors || []], byId = new Map(entities.map((o) => [o.id, o]));
  const owners = [...new Set(ids)], missingIds = owners.filter((id) => !byId.has(id)), targets = new Set(owners.filter((id) => byId.has(id)));
  const cast = scene.doorPerformance, path = scene.behaviors?.path, binding = scene.behaviors?.binding;
  if (cast?.enabled && targets.has(cast.doorId)) {
    for (const id of cast.actorIds) if (byId.has(id)) targets.add(id);
  }
  if (binding && path?.id === binding.pathId && targets.has(binding.doorId)) {
    for (const id of path.actorIds) if (byId.has(id)) targets.add(id);
  }
  const targetIds = [...targets], objectIds = (scene.objects || []).filter((o) => targets.has(o.id)).map((o) => o.id);
  const actorIds = (scene.actors || []).filter((a) => targets.has(a.id) && (a.motionPlan || actorMotionId(a))).map((a) => a.id);
  const floodIds = (scene.floods || []).filter((f) => targets.has(f.objectId || f.doorId)).map((f) => f.id);
  const playable = !missingIds.length && (actorIds.length > 0 || floodIds.length > 0 || (scene.objects || []).some((o) => targets.has(o.id) && o.track));
  return { ownerIds: owners, targetIds, objectIds, actorIds, floodIds, missingIds, playable, label: targetIds.map((id) => entityLabel(byId.get(id)) || id).join(", ") };
}
function isolatePreviewActors(scene, frames, scope) {
  if (!scope) return frames;
  const active = new Set(scope.actorIds), saved = new Map((scene.actors || []).map((a) => [a.id, a]));
  return frames.map((f) => {
    const a = saved.get(f.id);
    if (active.has(f.id) || !a) return f;
    return { ...f, ...a, position: [...a.position], assetId: a.assetId, motionId: null, motionPlan: null, motionOffset: [0, 0, 0], pose: "rest", clipTime: 0, preview: false, visible: true };
  });
}
export {
  isolatePreviewActors,
  previewScope
};
