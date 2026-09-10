const bounded = (max) => ({ type: "string", minLength: 1, maxLength: max });
const recommendationSchema = { type: "object", additionalProperties: false, required: ["reply", "options"], properties: {
  reply: bounded(3e3),
  options: { type: "array", maxItems: 3, items: { type: "object", additionalProperties: false, required: ["label", "prompt"], properties: { label: bounded(32), prompt: bounded(600) } } }
} };
function recommendationResult(value) {
  if (typeof value?.reply !== "string" || !value.reply.trim() || value.reply.length > 3e3) throw Error("Invalid recommendation reply");
  const options = value.options ?? [];
  if (!Array.isArray(options) || options.length > 3) throw Error("Invalid recommendation option");
  const labels = /* @__PURE__ */ new Set();
  for (const option of options) {
    if (!option || Object.keys(option).some((k) => !["label", "prompt"].includes(k)) || typeof option.label !== "string" || !option.label.trim() || option.label.length > 32 || typeof option.prompt !== "string" || !option.prompt.trim() || option.prompt.length > 600 || labels.has(option.label.trim())) throw Error("Invalid recommendation option");
    labels.add(option.label.trim());
  }
  return { type: "reply", reply: value.reply, options: options.map(({ label, prompt }) => ({ label: label.trim(), prompt: prompt.trim() })) };
}
export {
  recommendationResult,
  recommendationSchema
};
