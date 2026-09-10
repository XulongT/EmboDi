import { send } from "../http.mjs";
import { transcribe, speak } from "../../services/providers.mjs";
import { selectionQuestion } from "../../shared/selection.mjs";
async function handleDialogueRequest(appRuntime, req, res, url, input, authoringScope) {
  if (url.pathname === "/api/director-dialogue") {
    const entry = await appRuntime.conversation(input.conversationId);
    for (const key of ["text", "reply"]) if (typeof input[key] !== "string" || input[key].length > 3e3) throw new Error("Invalid directing request");
    entry.messages.push({ role: "user", content: input.text, source: "director", at: (/* @__PURE__ */ new Date()).toISOString() }, { role: "assistant", content: input.reply, source: "director", at: (/* @__PURE__ */ new Date()).toISOString() });
    await appRuntime.saveConversation(entry);
    return send(res, 200, entry);
  }
  if (url.pathname === "/api/speech/transcribe") return send(res, 200, await transcribe(appRuntime.configStore.get().speech, input));
  if (url.pathname === "/api/speech/speak") {
    const audio = await speak(appRuntime.configStore.get().voice, input.text);
    res.writeHead(200, { "Content-Type": audio.mime, "Cache-Control": "no-store" });
    res.end(audio.bytes);
    return;
  }
  if (url.pathname === "/api/conversation/select") {
    appRuntime.revisionCheck(input.revision);
    appRuntime.selectionCheck(input.ids);
    const entry = await appRuntime.conversation(input.conversationId);
    const content2 = selectionQuestion(appRuntime.state.scene, input.ids);
    if (entry.messages.at(-1)?.content !== content2) {
      entry.messages.push({ role: "assistant", content: content2, source: "selection" });
      await appRuntime.saveConversation(entry);
    }
    return send(res, 200, entry);
  }
}
export {
  handleDialogueRequest
};
