function createAuthoringAccess(makeId) {
  const sessions = /* @__PURE__ */ new Map();
  function check(input, write = false) {
    const ref = input?.authoringSession;
    if (!ref) return null;
    const session = sessions.get(ref.id);
    if (!session || session.epoch !== ref.epoch) throw Error("Operation expired. Please retry.");
    if (write && session.mode !== "edit") throw Error("Enter Edit mode to change the scene");
    return session;
  }
  return { check, transition(input) {
    if (!["edit", "explore"].includes(input.mode)) throw Error("Invalid mode");
    let session = input.id ? sessions.get(input.id) : null;
    if (input.id && (!session || session.epoch !== input.epoch)) throw Error("Mode changed. Please refresh.");
    session = { id: session?.id || makeId(), mode: input.mode, epoch: (session?.epoch || 0) + 1 };
    sessions.set(session.id, session);
    if (sessions.size > 100) sessions.delete(sessions.keys().next().value);
    return { ...session };
  } };
}
export {
  createAuthoringAccess
};
