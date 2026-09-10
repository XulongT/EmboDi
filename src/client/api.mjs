let authoringSession = null;
function setApiSession(session) {
  authoringSession = session;
}
function createApi(fetcher = fetch) {
  return async function api(path, body, options = {}) {
    const { timeoutMs = path.startsWith("/api/speech/") ? 9e4 : 2e4, signal, ...requestOptions } = options;
    const controller = new AbortController(), timer = setTimeout(() => controller.abort(new DOMException("Request timed out", "TimeoutError")), timeoutMs);
    const requestSignal = signal ? AbortSignal.any([signal, controller.signal]) : controller.signal;
    try {
      const payload = body && authoringSession && path !== "/api/authoring/session" && path !== "/api/config" ? { ...body, authoringSession: { ...authoringSession } } : body;
      const response = await fetcher(path, { ...body ? { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) } : {}, ...requestOptions, signal: requestSignal });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Request failed");
      return data;
    } catch (error) {
      if (controller.signal.aborted && !signal?.aborted) throw new Error("Local server timed out. Check the USB connection, then refresh to reopen the saved world.");
      throw error;
    } finally {
      clearTimeout(timer);
    }
  };
}
export {
  createApi,
  setApiSession
};
