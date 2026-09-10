import { buildAgentPrompt } from "./prompt.mjs";
const definition = Object.freeze({ name: "Interaction Agent", provider: "analysis", children: ["motion", "object-motion", "flood"], description: "Coordinates object and character behaviors and their trigger conditions.", instructions: "Plan only supported basic interactions. Use a transform for translation/yaw/face/place; use motion for joint animation with an optional saved curve. Do not claim multi-person contact, video understanding, physics or collision avoidance. For a motion request pass the user intent and frozen actor/curve context to Motion. Dispatch rigid object curve tracks to Object Motion, actor motion to Motion, object-surface flow and dwell-trigger configuration to Flood. Dispatch is code, without an extra planning-model call." });
const createPrompt = (context) => buildAgentPrompt("interaction", definition, context);
export {
  createPrompt,
  definition
};
