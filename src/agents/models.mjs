import { AGENTS, agentCatalog } from "./registry.mjs";
function agentProvider(config, id, env = process.env) {
  const a = AGENTS[id];
  if (!a || id === "interaction") throw Error("No model call for this role");
  const p = { ...config[a.provider] };
  if (env.VRBUILD_MODEL) p.model = env.VRBUILD_MODEL;
  return p;
}
const modelMetadata = (p) => ({ provider: p.provider, model: p.model || null, reasoningEffort: p.reasoningEffort || null });
const configuredAgentCatalog = (c, e) => agentCatalog().map((a) => ({ ...a, ...a.id === "interaction" ? { implementation: "code-dispatch" } : { implementation: "model-call", ...modelMetadata(agentProvider(c, a.id, e)) } }));
export {
  agentProvider,
  configuredAgentCatalog,
  modelMetadata
};
