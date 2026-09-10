const CAST_SIZE = 5;
function castSlots(actors) {
  if (actors.length > CAST_SIZE) throw new Error(`This demo uses ${CAST_SIZE} actors. Remove extra actors first; existing actors are not deleted automatically.`);
  const used = /* @__PURE__ */ new Set();
  for (const actor of actors) if (actor.castSlot !== void 0) {
    if (!Number.isInteger(actor.castSlot) || actor.castSlot < 1 || actor.castSlot > CAST_SIZE || used.has(actor.castSlot)) throw new Error("Invalid or duplicate actor motion slot");
    used.add(actor.castSlot);
  }
  return actors.map((actor) => {
    if (actor.castSlot !== void 0) return { ...actor };
    const slot = Array.from({ length: CAST_SIZE }, (_, i) => i + 1).find((i) => !used.has(i));
    used.add(slot);
    return { ...actor, castSlot: slot };
  });
}
function nextCastSlot(actors) {
  const used = new Set(castSlots(actors).map((a) => a.castSlot));
  return Array.from({ length: CAST_SIZE }, (_, i) => i + 1).find((i) => !used.has(i)) ?? null;
}
export {
  CAST_SIZE,
  castSlots,
  nextCastSlot
};
