import {languagePattern} from "./language.mjs";
function cameraViewIntent(text) {
  const words = String(text).trim().replace(languagePattern("punctuation.camera-view-intent.1"), "").toLowerCase();
  if (languagePattern("camera.summon").test(words)) return "preview";
  const command = words.replace(languagePattern("camera.summonPrefix"), "").replace(languagePattern("camera.politePrefix"), "");
  if (languagePattern("camera.recenter").test(command)) return "recenter";
  if (languagePattern("camera.preview").test(command) || languagePattern("camera.framingQuestion").test(command)) return "preview";
  if (languagePattern("camera.next").test(command)) return "next";
  if (languagePattern("camera.previous").test(command)) return "previous";
  if (languagePattern("camera.close").test(command)) return "close";
  return null;
}
export {
  cameraViewIntent
};
