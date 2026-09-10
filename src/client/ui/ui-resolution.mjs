import * as THREE from "three";
const UI_TEXTURE_SCALE = 2;
function createUICanvas(width, height) {
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(width * UI_TEXTURE_SCALE);
  canvas.height = Math.round(height * UI_TEXTURE_SCALE);
  canvas.getContext("2d").scale(UI_TEXTURE_SCALE, UI_TEXTURE_SCALE);
  return canvas;
}
function createUITexture(canvas) {
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  return texture;
}
function createUIFoveation(xr) {
  let requested = null;
  return (visible) => {
    const value = visible ? 0 : 1;
    if (requested !== value) {
      xr.setFoveation?.(value);
      requested = value;
    }
    return value;
  };
}
export {
  UI_TEXTURE_SCALE,
  createUICanvas,
  createUIFoveation,
  createUITexture
};
