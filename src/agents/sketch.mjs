import { buildAgentPrompt } from "./prompt.mjs";
const definition = Object.freeze({ name: "Sketch Agent", provider: "analysis", children: [], description: "Interprets spatial sketches as guidance for scene authoring and interactions.", instructions: "Interpret the supplied saved curve together with the user request. Return meaning=path only when it expresses a movement path for the selected actor; preserve the exact curve geometry. Return meaning=clarify for ambiguous meaning, region/shape construction, absent curves or unsupported sketch semantics. Do not invent IDs, geometry or actions. The instruction must preserve all requested basic motion. Do not generate keyframes." });
const createPrompt = (context) => buildAgentPrompt("sketch", definition, context);
export {
  createPrompt,
  definition
};
