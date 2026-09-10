import { send } from "../http.mjs";
async function handleSettingsRequest(appRuntime, req, res, url, input, authoringScope) {
  if (url.pathname === "/api/config") return send(res, 200, await appRuntime.configStore.save(input));
}
export {
  handleSettingsRequest
};
