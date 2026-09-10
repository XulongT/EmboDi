function applyBrandEnvironment(env = process.env) {
  for (const [name, value] of Object.entries(env)) {
    if (name.startsWith("EMBODI_") && value !== void 0) env["VRBUILD_" + name.slice(7)] = value;
  }
  return env;
}
export {
  applyBrandEnvironment
};
