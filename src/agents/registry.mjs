import { definition as objectMotion } from "./object-motion.mjs";
import { definition as camera } from "./camera.mjs";
import { definition as lighting } from "./lighting.mjs";
import { definition as director } from "./director.mjs";
import { definition as sceneConstruction } from "./scene-construction.mjs";
import { definition as interaction } from "./interaction.mjs";
import { definition as motion } from "./motion.mjs";
import { definition as flood } from "./flood.mjs";
import { definition as sketch } from "./sketch.mjs";
import { definition as recommendation } from "./recommendation.mjs";
import { buildAgentPrompt } from "./prompt.mjs";
const AGENTS = Object.freeze({ "object-motion": objectMotion, "camera": camera, "lighting": lighting, "director": director, "scene-construction": sceneConstruction, "interaction": interaction, "motion": motion, "flood": flood, "sketch": sketch, "recommendation": recommendation });
const agentCatalog = () => Object.entries(AGENTS).map(([id, agent]) => ({ id, name: agent.name, description: agent.description, children: agent.children, status: "available" }));
const agentPrompt = (id, context) => buildAgentPrompt(id, AGENTS[id], context);
export {
  AGENTS,
  agentCatalog,
  agentPrompt
};
