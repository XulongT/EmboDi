import {legacyMessages as messages, languagePattern} from "./language.mjs";
const han = /\p{Script=Han}/u;
const escape = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const patterns = Object.entries(messages).filter(([key]) => /\{\d+\}/.test(key)).map(([key, value]) => {
  const slots = [];
  const parts = key.split(/(\{\d+\})/g).map((part) => {
    if (/^\{\d+\}$/.test(part)) {
      slots.push(part);
      return "([\\s\\S]*?)";
    }
    return escape(part);
  });
  return { regex: new RegExp("^" + parts.join("") + "$"), slots, value, weight: key.replace(/\{\d+\}/g, "").length };
}).sort((a, b) => b.weight - a.weight);
const cache = /* @__PURE__ */ new Map();
function uiText(value, depth = 0) {
  if (value == null) return "";
  const text = String(value);
  if (!han.test(text)) return text;
  if (Object.hasOwn(messages, text) && !text.includes("{")) return messages[text];
  if (cache.has(text)) return cache.get(text);
  if (depth > 5) return text;
  let result = text;
  for (const { regex, slots, value: english } of patterns) {
    const match = regex.exec(text);
    if (!match) continue;
    result = english.replace(/\{\d+\}/g, (slot) => {
      const i = slots.indexOf(slot);
      return i < 0 ? slot : uiText(match[i + 1], depth + 1);
    });
    break;
  }
  if (result === text) {
    if (/[\n·]/.test(text)) result = text.split(/(\n|\s*·\s*)/).map((part) => part.trim() ? uiText(part, depth + 1) : part).join("");
    if (result === text) result = text.replace(languagePattern("ui.legacyText"), (part) => Object.hasOwn(messages, part) ? messages[part] : part);
  }
  if (cache.size >= 1e3) cache.clear();
  cache.set(text, result);
  return result;
}
export {
  uiText
};
