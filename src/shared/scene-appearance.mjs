const TRANSPARENCY_LEVELS = Object.freeze([30, 50, 70]);
const TRANSPARENCY_KEY = "embodi.scene-transparency";
function opacityForTransparency(percent) {
  if (!TRANSPARENCY_LEVELS.includes(percent)) throw Error("Choose 30%, 50% or 70% transparency.");
  return (100 - percent) / 100;
}
function readTransparency(storage) {
  try {
    const value = Number(storage?.getItem(TRANSPARENCY_KEY));
    return TRANSPARENCY_LEVELS.includes(value) ? value : 50;
  } catch {
    return 50;
  }
}
function saveTransparency(storage, percent) {
  opacityForTransparency(percent);
  try {
    storage?.setItem(TRANSPARENCY_KEY, String(percent));
  } catch {
  }
  return percent;
}
function transparencyActions(opacity = 0.5) {
  return TRANSPARENCY_LEVELS.map((percent) => ({ id: "transparency" + percent, label: `${percent}% transparency`, disabled: Math.abs(opacity - opacityForTransparency(percent)) < 1e-6 }));
}
export {
  TRANSPARENCY_KEY,
  TRANSPARENCY_LEVELS,
  opacityForTransparency,
  readTransparency,
  saveTransparency,
  transparencyActions
};
