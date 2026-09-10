function validateBehaviors(scene) {
  if (scene.behaviors) throw Error("Unsupported scene data");
}
const reconcileBehaviors = (s) => s;
function updateBehaviors() {
  throw Error("This operation is not available in this edition");
}
export {
  reconcileBehaviors,
  updateBehaviors,
  validateBehaviors
};
