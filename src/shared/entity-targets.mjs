function clearEntityTargets(objects, id) {
  return objects.map((object) => {
    if (object.aimTargetId !== id && object.track?.targetId !== id) return object;
    const next = { ...object };
    if (next.aimTargetId === id) delete next.aimTargetId;
    if (next.track?.targetId === id) next.track = { ...next.track, targetId: null, orientation: next.track.orientation === "target" ? "fixed" : next.track.orientation };
    return next;
  });
}
export {
  clearEntityTargets
};
