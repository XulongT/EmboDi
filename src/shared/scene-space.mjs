const referenceFloor = (scene) => scene?.scanReconstruction?.referenceFloor || scene?.referenceFloor || scene?.objects.find((o) => o.id === "ground");
const isScanScene = (scene) => !!(scene?.scanStructure || scene?.scanReconstruction);
const isRawScanScene = (scene) => !!scene?.scanStructure && !scene?.scanReconstruction;
export {
  isRawScanScene,
  isScanScene,
  referenceFloor
};
