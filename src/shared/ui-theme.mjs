const UI_THEME = Object.freeze({
  background: "#C9C3D1",
  panel: "#F1EEF5",
  text: "#302A3B",
  muted: "#70667C",
  control: "#E3DCE9",
  border: "#D3CADF",
  accent: "#76628F",
  onAccent: "#F1EEF5",
  pressed: "#65527D",
  selected: "#D5C8E3",
  error: "#FF4757",
  warning: "#ECCC68"
});
function installUITheme(document) {
  for (const [name, color] of Object.entries(UI_THEME)) document.documentElement.style.setProperty("--ui-" + name, color);
}
export {
  UI_THEME,
  installUITheme
};
