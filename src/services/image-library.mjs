import { readFile } from "node:fs/promises";
import { join } from "node:path";
async function createImageLibrary(appRuntime) {
  const library = JSON.parse(await readFile(join(appRuntime.root, "public/library/index.json"), "utf8"));
  let generatedLibrary = [];
  try {
    generatedLibrary = JSON.parse(await readFile(join(appRuntime.data, "image-library.json"), "utf8"));
  } catch (error) {
    if (error.code !== "ENOENT") console.warn("Generated image index unavailable");
  }
  async function referenceImage(input) {
    if (input.image) {
      if (typeof input.image !== "string" || input.image.length > 9 * 1024 * 1024 || !/^data:image\/(png|jpeg);base64,[A-Za-z0-9+/=]+$/.test(input.image)) throw new Error("Invalid reference image format");
      return input.image;
    }
    if (!input.referenceId) return void 0;
    const item = [...library, ...generatedLibrary].find((i) => i.id === input.referenceId);
    if (!item) throw new Error("Reference image not found");
    const path = item.kind === "preset" ? join(appRuntime.root, "public", item.url) : join(appRuntime.data, "images", item.file);
    const bytes = await readFile(path);
    if (bytes.length > 8 * 1024 * 1024) throw new Error("Reference image is too large");
    return `data:image/${path.endsWith(".png") ? "png" : "jpeg"};base64,${bytes.toString("base64")}`;
  }
  return { library, generatedLibrary, referenceImage };
}
export {
  createImageLibrary
};
