import {languagePattern} from "../../shared/language.mjs";
import { validateVoiceContext, voicePages } from "../../shared/voice-review.mjs";
import { createSpeechEndpoint } from "../../shared/speech-endpoint.mjs";
import { uiText } from "../../shared/ui-text.mjs";
const $ = (id) => document.getElementById(id);
const blobData = (blob) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = () => resolve(reader.result);
  reader.onerror = reject;
  reader.readAsDataURL(blob);
});
function createStudio({ api, getContext, requestJob, handleText = async () => null, canInterrupt = () => false, onVoiceCapture = () => {
}, onVoiceFinish = () => {
}, onReference, onReadout, onLibrary = () => {
}, notify, getScripted = () => null, scriptedMode = false, voiceOnly = false, mediaDevices = globalThis.navigator?.mediaDevices }) {
  const conversationId = sessionStorage.getItem("vrbuild-conversation") || crypto.randomUUID();
  sessionStorage.setItem("vrbuild-conversation", conversationId);
  let config = null, recorder = null, stream = null, recordTimer = null, recordState = "idle", stopRequested = false, audioPlayer = null, voiceGeneration = 0;
  let pendingVoice = null, reviewPage = 0;
  let messages = [], library = [], selectionSerial = 0, recordGeneration = 0, transcriptController = null;
  let sendSerial = 0, activeSend = null, speech = { status: "idle" }, audioUrl = null, pendingSpeechFinish = null;
  const safe = (fn) => async () => {
    try {
      await fn();
    } catch (error) {
      notify(error.message);
    }
  };
  function draft(value) {
    $("edit-prompt").value = value;
    if ($("voice-transcript") && value) $("voice-transcript").textContent = "You: " + value;
    onReadout({ draft: value });
  }
  function renderConversation(entry) {
    messages = entry.messages || [];
    $("chat-messages").replaceChildren();
    for (const message of messages.slice(-12)) {
      const bubble = document.createElement("div");
      bubble.className = "chat-bubble " + message.role;
      const label = document.createElement("small");
      label.textContent = message.role === "user" ? "You" : "Agent";
      const text = document.createElement("div");
      text.textContent = message.content;
      bubble.append(label, text);
      $("chat-messages").append(bubble);
    }
    $("chat-messages").scrollTop = $("chat-messages").scrollHeight;
    $("preferences").textContent = uiText(entry.preferences?.length ? "Saved preferences: " + entry.preferences.join("; ") : "");
    const last = messages.at(-1), userIndex = messages.findLastIndex((m) => m.role === "user"), reply = messages.slice(userIndex + 1).findLast((m) => m.role === "assistant");
    if (last) onReadout({ message: last.content, role: last.role, dialogue: { userText: userIndex >= 0 ? messages[userIndex].content : "", agentText: reply?.content || "" } });
  }
  async function say(text) {
    if (scriptedMode) return;
    cancelSpeech();
    const generation = ++voiceGeneration;
    const report = (status) => {
      if (generation === voiceGeneration) {
        speech = { status, text };
        onReadout({ speech });
      }
    };
    if (!config || config.voice.provider === "off" || recordState !== "idle") {
      report("skipped");
      return;
    }
    report("loading");
    const controller = new AbortController();
    let resolveCompletion, settled = false;
    const completion = new Promise((resolve) => resolveCompletion = resolve);
    const finish = (status) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      if (status !== "completed") controller.abort();
      report(status);
      if (pendingSpeechFinish === finish) pendingSpeechFinish = null;
      resolveCompletion(status);
    };
    const timer = setTimeout(() => {
      finish("failed");
      globalThis.speechSynthesis?.cancel();
      audioPlayer?.pause();
      notify("Speech timed out. The text reply is still available.");
    }, 15e3);
    pendingSpeechFinish = finish;
    try {
      if (config.voice.provider === "browser") {
        if (!globalThis.speechSynthesis) {
          finish("unavailable");
          return completion;
        }
        const utterance = new SpeechSynthesisUtterance(text);
        const language = /\p{Script=Han}/u.test(text) ? "zh" : "en";
        utterance.lang = config.voice.language?.startsWith(language) ? config.voice.language : language === "zh" ? "zh-CN" : "en-US";
        const voice = speechSynthesis.getVoices().find((v) => v.lang.toLowerCase().startsWith(utterance.lang.toLowerCase().split("-")[0]));
        if (voice) utterance.voice = voice;
        utterance.onstart = () => report("speaking");
        utterance.onend = () => finish("completed");
        utterance.onerror = () => finish("failed");
        speechSynthesis.speak(utterance);
      } else {
        const response = await fetch("/api/speech/speak", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text: text.slice(0, 1900) }), signal: controller.signal });
        if (!response.ok) throw new Error((await response.json()).error);
        const blob = await response.blob();
        if (generation !== voiceGeneration || recordState !== "idle") {
          finish("cancelled");
          return completion;
        }
        const url = URL.createObjectURL(blob);
        audioUrl = url;
        audioPlayer = new Audio(url);
        audioPlayer.onended = () => {
          URL.revokeObjectURL(url);
          finish("completed");
        };
        audioPlayer.onerror = () => finish("failed");
        await audioPlayer.play();
        report("speaking");
      }
    } catch (error) {
      if (generation === voiceGeneration && !settled) notify("Text reply retained. Speech did not finish: " + error.message);
      finish("failed");
    }
    return completion;
  }
  function cancelSpeech() {
    pendingSpeechFinish?.("cancelled");
    voiceGeneration++;
    globalThis.speechSynthesis?.cancel();
    audioPlayer?.pause();
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      audioUrl = null;
    }
    if (["loading", "speaking"].includes(speech.status)) {
      speech = { ...speech, status: "cancelled" };
      onReadout({ speech });
    }
  }
  async function confirmedSelection() {
    if (scriptedMode) return;
    const serial = ++selectionSerial, context = getContext();
    if (!context.ids.length) return;
    const entry = await api("/api/conversation/select", { conversationId, ...context });
    if (serial !== selectionSerial) return;
    renderConversation(entry);
  }
  async function sendText(value = $("edit-prompt").value, capturedContext = getContext()) {
    if (scriptedMode) {
      if (languagePattern("studio.cancel").test(value.trim())) {
        getScripted()?.cancel();
        return;
      }
      throw new Error("Hold X to speak, then release");
    }
    if (!value.trim()) throw new Error("Enter or speak your request first");
    if (activeSend !== null && !canInterrupt(value)) throw new Error("Processing the previous request. Please wait or say Stop.");
    selectionSerial++;
    const serial = ++sendSerial;
    activeSend = serial;
    const replies = [];
    let published = false;
    const publish = (reply, { speak = true } = {}) => {
      if (serial !== sendSerial) return;
      if (!/\p{Script=Han}/u.test(value)) reply = uiText(reply);
      if (!published) {
        messages.push({ role: "user", content: value });
        published = true;
      }
      replies.push(reply);
      messages.push({ role: "assistant", content: reply });
      draft("");
      renderConversation({ messages });
      return speak ? say(reply) : void 0;
    };
    if (voiceOnly) onReadout({ message: value, role: "user" });
    try {
      const reply = await handleText(value, capturedContext, { publish });
      if (reply !== null) {
        if (serial !== sendSerial || reply === void 0) return;
        if (typeof reply === "string") publish(reply, { speak: replies.length === 0 });
        if (activeSend === serial) activeSend = null;
        if (replies.length) try {
          const entry = await api("/api/director-dialogue", { conversationId, text: value, reply: replies.join("\n") });
          if (serial === sendSerial) renderConversation(entry);
        } catch {
          notify("Text reply retained. Conversation history could not be saved.");
        }
        return;
      }
      if (getContext().busy) throw new Error("Finish the current request, voice input, or preview first");
      draft("");
      onReadout({ message: value, role: "user" });
      await requestJob("chat", value, conversationId, capturedContext);
    } catch (error) {
      if (serial === sendSerial) draft(value);
      throw error;
    } finally {
      if (activeSend === serial) activeSend = null;
    }
  }
  function voiceDraft() {
    if (recordState !== "reviewing" || !pendingVoice) return null;
    const pages = voicePages(pendingVoice.text);
    return { text: pendingVoice.text, targetLabel: pendingVoice.context.targetLabel || "Current scene", page: reviewPage, pages: pages.length, pageText: pages[reviewPage], targetIds: pendingVoice.context.targetIds || [] };
  }
  function paintRecording() {
    const label = recordState === "recording" ? "■ Stop listening" : recordState === "reviewing" ? "● Speak again" : recordState === "transcribing" ? "Transcribing…" : recordState === "requesting" ? "Waiting for microphone…" : "● Start speaking";
    for (const id of ["voice-input", "voice-talk"]) if ($(id)) {
      $(id).textContent = uiText(label);
      $(id).disabled = ["requesting", "transcribing"].includes(recordState);
    }
    if ($("voice-status")) $("voice-status").textContent = uiText(recordState === "reviewing" ? "Review, then A / Enter Send · X Retry · B / Esc Cancel" : recordState === "idle" ? "Click to speak · Quest: hold X, release to review" : recordState === "recording" ? automatic ? "Listening · Review after speaking · B Cancel" : "Listening · Click to stop or release X" : "Processing voice…");
    onReadout({ recording: recordState, autoVoice: automatic, voiceDraft: voiceDraft() });
  }
  function pageVoice(step) {
    if (!voiceDraft()) return;
    reviewPage = Math.max(0, Math.min(voicePages(pendingVoice.text).length - 1, reviewPage + step));
    paintRecording();
  }
  async function confirmVoice() {
    if (recordState !== "reviewing" || !pendingVoice) return;
    const entry = pendingVoice;
    validateVoiceContext(entry.context, getContext());
    pendingVoice = null;
    recordState = "idle";
    reviewPage = 0;
    paintRecording();
    if (entry.destination === "image") {
      $("image-generation-prompt").value = entry.text;
      return requestJob("image", entry.text, conversationId, entry.context);
    }
    if (entry.destination === "blueprint") {
      $("blueprint-prompt").value = entry.text;
      draft("");
      onReadout({ message: entry.text, role: "user" });
      notify("Requirements saved. Click Build after adding your photos.");
      return;
    }
    return sendText(entry.text, entry.context);
  }
  let autoContext = null, autoTimer = null, automatic = false;
  function stopAuto() {
    clearInterval(autoTimer);
    autoTimer = null;
    autoContext?.close().catch(() => {
    });
    autoContext = null;
  }
  async function startVoice({ destination = "agent", auto = false } = {}) {
    if (scriptedMode) {
      getScripted()?.press();
      return;
    }
    if (!["idle", "reviewing"].includes(recordState)) return;
    const previous = pendingVoice;
    const capturedContext = structuredClone(previous?.context || getContext());
    if (previous) {
      validateVoiceContext(capturedContext, getContext());
      destination = previous.destination;
    }
    if (destination === "agent" && voiceOnly && capturedContext.phase === "reference") destination = "blueprint";
    if (destination === "agent" ? capturedContext.voiceBusy ?? capturedContext.busy : capturedContext.busy) throw new Error("Finish the current request, selection, or preview first");
    if (!mediaDevices?.getUserMedia || !globalThis.MediaRecorder) throw new Error("This browser cannot record audio. Open the local page in a browser with microphone support.");
    automatic = auto;
    onVoiceCapture(capturedContext);
    const generation = ++recordGeneration;
    stopRequested = false;
    recordState = "requesting";
    paintRecording();
    cancelSpeech();
    try {
      config = await api("/api/config");
      if (generation !== recordGeneration) return;
      if (config.speech.provider === "openai" && !config.speech.hasKey) throw new Error("Add your OpenAI API key under Speech transcription in API settings");
      if (!config.speech.model?.trim()) throw new Error("Open API settings and enter a speech transcription model first");
      if (stopRequested) {
        recordState = "idle";
        paintRecording();
        onVoiceFinish();
        return;
      }
      const activeStream = await mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } });
      if (generation !== recordGeneration || stopRequested) {
        activeStream.getTracks().forEach((t) => t.stop());
        if (generation === recordGeneration) {
          recordState = "idle";
          paintRecording();
          onVoiceFinish();
        }
        return;
      }
      stream = activeStream;
      const mime = ["audio/webm;codecs=opus", "audio/webm", "audio/mp4"].find((t) => MediaRecorder.isTypeSupported(t));
      const activeRecorder = new MediaRecorder(activeStream, mime ? { mimeType: mime } : {}), recordChunks = [];
      recorder = activeRecorder;
      activeRecorder.ondataavailable = (event) => {
        if (event.data.size) recordChunks.push(event.data);
      };
      activeRecorder.onerror = () => {
        if (generation === recordGeneration) {
          cancelVoice();
          if (previous && voiceOnly) {
            pendingVoice = previous;
            recordState = "reviewing";
            draft(previous.text);
            paintRecording();
          }
          notify("Audio recording failed. Check microphone permission.");
        }
      };
      activeRecorder.onstop = async () => {
        stopAuto();
        activeStream.getTracks().forEach((t) => t.stop());
        if (generation !== recordGeneration) return;
        clearTimeout(recordTimer);
        stream = null;
        recordState = "transcribing";
        paintRecording();
        const controller = new AbortController();
        transcriptController = controller;
        try {
          const blob = new Blob(recordChunks, { type: activeRecorder.mimeType || "audio/webm" }), data = await blobData(blob);
          const result = await api("/api/speech/transcribe", { audio: data.split(",")[1], mime: blob.type }, { signal: controller.signal });
          if (generation !== recordGeneration) return;
          if (!result.text?.trim()) throw Error("No speech recognized. Please speak again.");
          draft(result.text);
          if (voiceOnly) {
            pendingVoice = { text: result.text, context: capturedContext, destination };
            reviewPage = 0;
            recordState = "reviewing";
            paintRecording();
            notify("Review transcript · A Send · X Retry · B Cancel");
            return;
          }
          recordState = "idle";
          paintRecording();
          if (destination === "image") {
            $("image-generation-prompt").value = result.text;
            await requestJob("image", result.text, conversationId, capturedContext);
          } else if (destination === "blueprint") {
            $("blueprint-prompt").value = result.text;
            onReadout({ message: result.text, role: "user" });
            notify("Requirements saved. Click Build after adding your photos.");
          } else await sendText(result.text, capturedContext);
        } catch (error) {
          if (generation === recordGeneration) notify(error.message);
        } finally {
          if (generation === recordGeneration) {
            onVoiceFinish();
            recordState = pendingVoice ? "reviewing" : "idle";
            paintRecording();
            recorder = null;
            transcriptController = null;
          }
        }
      };
      activeRecorder.start();
      recordState = "recording";
      paintRecording();
      recordTimer = setTimeout(stopVoice, 3e4);
      if (auto) {
        const Audio2 = globalThis.AudioContext || globalThis.webkitAudioContext;
        if (!Audio2) throw Error("Automatic speech detection is unavailable in this browser.");
        autoContext = new Audio2();
        await autoContext.resume();
        if (generation !== recordGeneration) {
          stopAuto();
          return;
        }
        const analyser = autoContext.createAnalyser();
        analyser.fftSize = 1024;
        autoContext.createMediaStreamSource(activeStream).connect(analyser);
        const buffer = new Float32Array(analyser.fftSize), endpoint = createSpeechEndpoint();
        autoTimer = setInterval(() => {
          if (generation !== recordGeneration) return stopAuto();
          analyser.getFloatTimeDomainData(buffer);
          const rms = Math.sqrt(buffer.reduce((sum, v) => sum + v * v, 0) / buffer.length), decision = endpoint.sample(performance.now(), rms);
          if (decision === "send") stopVoice();
          if (decision === "cancel") {
            cancelVoice();
            notify("No speech detected. Choose Other to try again.");
          }
        }, 40);
        notify(voiceOnly ? "Listening · Review after speaking · B Cancel" : "Listening · Sends after speaking · B Cancel");
      }
    } catch (error) {
      if (generation !== recordGeneration) return;
      cancelVoice();
      if (previous && voiceOnly) {
        pendingVoice = previous;
        recordState = "reviewing";
        draft(previous.text);
        paintRecording();
      }
      throw new Error("Voice input unavailable: " + error.message);
    }
  }
  function stopVoice() {
    if (scriptedMode) return getScripted()?.release();
    stopRequested = true;
    if (recorder?.state === "recording") recorder.stop();
  }
  function cancelVoice() {
    stopAuto();
    if (scriptedMode) getScripted()?.cancel();
    onVoiceFinish();
    recordGeneration++;
    stopRequested = true;
    clearTimeout(recordTimer);
    transcriptController?.abort();
    transcriptController = null;
    if (recorder?.state === "recording") recorder.stop();
    recorder = null;
    stream?.getTracks().forEach((t) => t.stop());
    stream = null;
    pendingVoice = null;
    reviewPage = 0;
    recordState = "idle";
    if (voiceOnly) draft("");
    paintRecording();
    cancelSpeech();
  }
  const roleLabels = { speech: "Speech transcription", voice: "Spoken replies", analysis: "Conversation and preferences", construction: "3D scene construction", images: "Image generation" };
  const choices = { speech: [["openai", "OpenAI (default)"], ["openai-compatible", "Other compatible API"]], voice: [["browser", "Browser speech"], ["openai", "OpenAI"], ["openai-compatible", "Other compatible API"], ["off", "Off"]], analysis: [["codex", "Local Codex"], ["openai-compatible", "OpenAI-compatible API"]], construction: [["codex", "Local Codex"], ["openai-compatible", "OpenAI-compatible API"]], images: [["disabled", "Disabled"], ["openai-compatible", "OpenAI Images-compatible API"]] };
  function renderConfig() {
    $("provider-fields").replaceChildren();
    for (const [role, label] of Object.entries(roleLabels)) {
      const fieldset = document.createElement("fieldset");
      fieldset.dataset.role = role;
      const legend = document.createElement("legend");
      legend.textContent = uiText(label);
      fieldset.append(legend);
      const select = document.createElement("select");
      select.name = "provider";
      select.setAttribute("aria-label", uiText(label + " protocol"));
      for (const [value, name] of choices[role]) {
        const option = document.createElement("option");
        option.value = value;
        option.textContent = uiText(name);
        select.append(option);
      }
      select.value = config[role].provider;
      fieldset.append(select);
      for (const [key, placeholder] of [["baseUrl", "API Base URL"], ["model", "Model name"], ...role === "voice" ? [["voice", "Voice ID, e.g. alloy"]] : [], ...["speech", "voice"].includes(role) ? [["language", "Language, e.g. en-US"]] : [], ["apiKey", config[role].hasKey ? "Key saved; leave blank to keep it" : "API Key"]]) {
        const input = document.createElement("input");
        input.name = key;
        input.type = key === "apiKey" ? "password" : "text";
        input.placeholder = uiText(placeholder);
        input.setAttribute("aria-label", uiText(label + " " + key));
        input.autocomplete = "off";
        input.value = key === "apiKey" ? "" : config[role][key] || "";
        fieldset.append(input);
      }
      const clearLabel = document.createElement("label"), clear = document.createElement("input");
      clear.type = "checkbox";
      clear.name = "clearKey";
      clearLabel.append(clear, document.createTextNode(uiText("Clear saved key")));
      fieldset.append(clearLabel);
      $("provider-fields").append(fieldset);
      if (["speech", "voice"].includes(role)) {
        const hint = document.createElement("p");
        hint.className = "muted";
        fieldset.append(hint);
        const input = (name) => fieldset.querySelector(`[name="${name}"]`);
        const updateHint = () => {
          const official = select.value === "openai", remote = official || select.value === "openai-compatible", changed = select.value !== config[role].provider || input("baseUrl").value.trim().replace(/\/+$/, "") !== config[role].baseUrl;
          input("baseUrl").readOnly = official;
          input("baseUrl").placeholder = "API Base URL or full audio endpoint";
          input("language").placeholder = role === "speech" ? "Language: auto, en, zh (blank = auto)" : "Browser language, e.g. en-US";
          input("apiKey").placeholder = changed ? official ? "OpenAI API Key" : "Key for this service (if required)" : config[role].hasKey ? "Key saved; leave blank to keep it" : official ? "OpenAI API Key" : "API Key (if required)";
          hint.textContent = role === "speech" ? official ? "Uses OpenAI audio transcription. Enter your API key and choose a transcription model." : "Uses /audio/transcriptions. Enter your service URL and model ID; a key is optional for services without authentication." : remote ? "AI-generated voice. Uses /audio/speech with your model and voice ID." : "Browser speech needs no API key. Off disables spoken replies.";
          if (changed) hint.textContent += " Changing the service clears its previously saved key.";
          for (const name of ["baseUrl", "model", "voice", "apiKey"]) if (input(name)) input(name).disabled = role === "voice" && !remote;
        };
        select.onchange = () => {
          const custom = select.value === "openai-compatible";
          input("baseUrl").value = custom ? "" : "https://api.openai.com/v1";
          input("model").value = custom ? "" : role === "speech" ? "gpt-4o-mini-transcribe" : "gpt-4o-mini-tts";
          if (role === "voice") input("voice").value = custom ? "" : "alloy";
          input("language").value = role === "speech" ? "auto" : "zh-CN";
          input("apiKey").value = "";
          updateHint();
        };
        input("baseUrl").addEventListener("input", updateHint);
        updateHint();
      }
    }
  }
  async function saveSettings() {
    const update = {};
    for (const fieldset of $("provider-fields").children) {
      const fields = {};
      for (const input of fieldset.querySelectorAll("input,select")) fields[input.name] = input.type === "checkbox" ? input.checked : input.value;
      update[fieldset.dataset.role] = fields;
    }
    config = await api("/api/config", update);
    renderConfig();
    $("settings-dialog").close();
    notify("API settings saved locally");
  }
  async function refreshLibrary() {
    library = await api("/api/library");
    $("image-library").replaceChildren();
    for (const item of library) {
      const card = document.createElement("button");
      card.className = "image-card";
      card.dataset.id = item.id;
      const image = document.createElement("img");
      image.src = item.url;
      image.alt = uiText(item.title);
      const title = document.createElement("span");
      title.textContent = uiText(item.title);
      const tag = document.createElement("small");
      tag.textContent = uiText(item.kind === "preset" ? "Preset reference" : "Generated image");
      card.append(image, title, tag);
      card.onclick = () => chooseReference(item.id);
      $("image-library").append(card);
    }
    onLibrary(library);
    return library;
  }
  function chooseReference(id) {
    const item = library.find((i) => i.id === id);
    if (!item) return;
    onReference(item);
    document.querySelectorAll(".image-card").forEach((card) => card.classList.toggle("selected", card.dataset.id === id));
    $("image-preview").src = item.url;
    $("image-preview").hidden = false;
    $("image-name").textContent = uiText("Selected: " + item.title);
    notify("Reference selected: " + item.title);
  }
  $("settings-open").onclick = safe(async () => {
    config = await api("/api/config");
    renderConfig();
    $("settings-dialog").showModal();
  });
  $("settings-close").onclick = () => $("settings-dialog").close();
  $("settings-save").onclick = safe(saveSettings);
  $("voice-input").onclick = safe(() => recordState === "recording" ? stopVoice() : startVoice());
  $("ask-codex").onclick = safe(() => sendText());
  $("edit-prompt").oninput = () => onReadout({ draft: $("edit-prompt").value });
  if ($("voice-talk")) $("voice-talk").onclick = $("voice-input").onclick;
  if ($("image-voice")) $("image-voice").onclick = safe(() => recordState === "recording" ? stopVoice() : startVoice({ destination: "image" }));
  if ($("conversation-toggle")) $("conversation-toggle").onclick = () => {
    const open = !$("text-input").open;
    $("text-input").open = open;
    $("conversation-toggle").setAttribute("aria-expanded", String(open));
  };
  $("generate-image").onclick = safe(() => requestJob("image", $("image-generation-prompt").value, conversationId));
  addEventListener("pagehide", cancelVoice);
  async function initialize({ loadLibrary = true } = {}) {
    if (scriptedMode) {
      if (loadLibrary) await refreshLibrary();
      return;
    }
    config = await api("/api/config");
    renderConfig();
    if (loadLibrary) await refreshLibrary();
    renderConversation(await api("/api/conversation?id=" + conversationId));
  }
  return { initialize, conversationId, confirmedSelection, renderConversation, refreshLibrary, chooseReference, say, startVoice, stopVoice, cancelVoice, confirmVoice, pageVoice, getVoiceDraft: voiceDraft, getSpeechState: () => ({ ...speech, automatic: automatic && recordState !== "idle" }), getRecordingState: () => recordState, getDraft: () => $("edit-prompt").value, setDraft: draft, sendText };
}
export {
  createStudio
};
