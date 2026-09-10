const presetIntent = () => null;
const presetInterrupt = () => null;
const presetActions = () => [];
const createPresetSequence = () => ({ snapshot: () => null, cancel() {
}, pause: () => false, reset() {
}, ownsPerformance: () => false, active: () => false, busy: () => false, blocksPlayback: () => false, validate: () => true, confirm: () => null });
export {
  createPresetSequence,
  presetActions,
  presetIntent,
  presetInterrupt
};
