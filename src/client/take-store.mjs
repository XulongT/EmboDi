import { TAKE_LIMITS as L, takePacket } from "../shared/take-limits.mjs";
function createIndexedTakeStore(indexed = globalThis.indexedDB) {
  let opening;
  function database() {
    return opening ??= new Promise((resolve, reject) => {
      if (!indexed) {
        reject(Error("Persistent recording storage is unavailable"));
        return;
      }
      const r = indexed.open("vrbuild-takes-v1", 1);
      r.onupgradeneeded = () => {
        r.result.createObjectStore("takes", { keyPath: "id" });
        r.result.createObjectStore("chunks", { keyPath: "key" });
      };
      r.onsuccess = () => resolve(r.result);
      r.onerror = () => reject(r.error);
    });
  }
  async function read(store, key, all = false) {
    const db = await database();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(store), r = all ? tx.objectStore(store).getAll() : tx.objectStore(store).get(key);
      r.onsuccess = () => resolve(r.result);
      r.onerror = () => reject(r.error);
    });
  }
  return {
    get: (id) => read("takes", id),
    list: () => read("takes", null, true),
    packet: (id, seq) => read("chunks", `${id}:${seq}`),
    async change(id, fn) {
      const db = await database();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(["takes", "chunks"], "readwrite"), takes = tx.objectStore("takes"), chunks = tx.objectStore("chunks"), r = takes.get(id);
        let result, error;
        r.onsuccess = () => {
          try {
            result = fn(r.result);
            if (result.remove) takes.delete(id);
            else takes.put(result.manifest);
            if (result.put) chunks.put({ ...result.put, key: `${id}:${result.put.seq}` });
            if (result.deleteSeq !== void 0) chunks.delete(`${id}:${result.deleteSeq}`);
          } catch (e) {
            error = e;
            tx.abort();
          }
        };
        tx.oncomplete = () => resolve(result?.manifest);
        tx.onabort = tx.onerror = () => reject(error || tx.error || Error("Local recording save failed"));
      });
    }
  };
}
function createTakeUpload({ store = createIndexedTakeStore(), fetcher = fetch, onChange = () => {
} } = {}) {
  let stage = "idle", id = null, persist = Promise.resolve(), network = null, lastError = null, result = null, pendingBytes = 0, writingBytes = 0;
  const snapshot = () => ({ takeId: id, lastError, pendingBytes, stage });
  const emit = () => onChange(snapshot());
  async function request(url, body, method = "POST", timeout = 2e4) {
    const response = await fetcher(url, { method, headers: { "Content-Type": body instanceof Blob ? "application/octet-stream" : "application/json" }, body: body instanceof Blob ? body : JSON.stringify(body), signal: AbortSignal.timeout(timeout) });
    const data = await response.json();
    if (!response.ok) throw Error(data.error || "Recording upload failed");
    return data;
  }
  function flush() {
    if (network) return network;
    stage = "uploading";
    network = (async () => {
      await persist;
      if (!id) return;
      let m = await store.get(id);
      if (!m) return;
      if (!m.created) {
        await request("/api/takes", { id, mime: m.mime, initial: m.initial });
        await store.change(id, (current) => ({ manifest: { ...current, created: true } }));
      }
      for (; ; ) {
        m = await store.get(id);
        if (m.ackSeq + 1 >= m.nextSeq) break;
        const seq = m.ackSeq + 1, packet = await store.packet(id, seq);
        if (!packet) throw Error("A local recording chunk is missing");
        const digest = Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256", await packet.blob.arrayBuffer())), (n) => n.toString(16).padStart(2, "0")).join("");
        const ack = await request(`/api/takes/${id}/chunks/${seq}`, packet.blob, "PUT");
        if (ack.seq !== seq || ack.nextSeq <= seq || ack.sha256 !== digest) throw Error("Recording server did not acknowledge a chunk");
        await store.change(id, (current) => ({ manifest: { ...current, ackSeq: seq }, deleteSeq: seq }));
        pendingBytes = Math.max(0, pendingBytes - packet.blob.size);
        emit();
      }
      lastError = null;
      emit();
    })().catch((error) => {
      lastError = error.message;
      emit();
      throw error;
    }).finally(() => {
      network = null;
    });
    return network;
  }
  const kick = () => {
    flush().catch(() => {
    });
  };
  async function recover() {
    const unfinished = (await store.list()).filter((m) => m.status !== "saved").sort((a, b) => a.createdAt.localeCompare(b.createdAt));
    for (const m of unfinished) {
      if (!m.nextSeq) {
        await store.change(m.id, () => ({ remove: true }));
        continue;
      }
      id = m.id;
      pendingBytes = 0;
      lastError = "An unfinished recording is available. Retry saving the recorded portion.";
      emit();
      return true;
    }
    return false;
  }
  async function begin(initial, mime) {
    if (id) throw Error("The previous recording is not saved. Retry it first.");
    if ((await store.list()).some((m) => m.status !== "saved" && m.nextSeq)) throw Error("An unsaved recording is stored in this browser. Recover it first.");
    const nextId = crypto.randomUUID();
    await store.change(nextId, () => ({ manifest: { id: nextId, mime, initial, createdAt: (/* @__PURE__ */ new Date()).toISOString(), created: false, nextSeq: 0, ackSeq: -1, bytes: 0, videoBytes: 0, frames: 0, lastTime: 0, status: "recording" } }));
    id = nextId;
    persist = Promise.resolve();
    lastError = null;
    result = null;
    pendingBytes = 0;
    kick();
    return id;
  }
  function append(blob, segment) {
    const packet = takePacket(blob, segment);
    if (writingBytes + packet.size > L.packetBytes * 2) throw Error("Local storage is too slow. Recording stopped.");
    pendingBytes += packet.size;
    writingBytes += packet.size;
    const operation = persist.then(() => store.change(id, (m) => {
      if (!m || m.status !== "recording") throw Error("Take ended");
      if (m.nextSeq >= L.chunks || m.bytes + packet.size > L.totalBytes || m.videoBytes + blob.size > L.videoBytes) throw Error("Local recording storage limit reached");
      return { manifest: { ...m, nextSeq: m.nextSeq + 1, bytes: m.bytes + packet.size, videoBytes: m.videoBytes + blob.size, frames: m.frames + segment.samples.length, lastTime: segment.time }, put: { seq: m.nextSeq, blob: packet } };
    }));
    persist = operation;
    operation.then(() => {
      writingBytes -= packet.size;
      kick();
    }, () => {
      writingBytes -= packet.size;
    });
    return operation;
  }
  async function finalize() {
    await persist;
    for (; ; ) {
      await flush();
      const m2 = await store.get(id);
      if (m2.ackSeq === m2.nextSeq - 1) break;
    }
    const m = await store.get(id);
    if (!m.end) throw Error("Take is still running");
    stage = "finalizing";
    emit();
    result = await request(`/api/takes/${id}/finalize`, m.end, "POST", 2e5);
    await store.change(id, (current) => ({ manifest: { ...current, status: "saved", result, initial: null } }));
    id = null;
    lastError = null;
    stage = "saved";
    emit();
    return result;
  }
  async function finish(metadata) {
    await persist;
    await store.change(id, (m) => ({ manifest: { ...m, status: "ended", end: { ...metadata, lastSeq: m.nextSeq - 1 } } }));
    return finalize();
  }
  async function retry() {
    if (!id && !await recover()) return result;
    const m = await store.get(id);
    if (!m.end) {
      if (!m.frames || !m.lastTime) throw Error("No recoverable frames in the recorded portion");
      persist = Promise.resolve();
      await store.change(id, (current) => ({ manifest: { ...current, status: "ended", end: { lastSeq: current.nextSeq - 1, duration: Math.min(L.seconds, current.lastTime), frames: current.frames, reason: "interrupted" } } }));
    }
    return finalize();
  }
  async function discardEmpty() {
    if (!id) return;
    await network?.catch(() => {
    });
    const m = await store.get(id);
    if (!m || m.frames) return;
    for (let seq = m.ackSeq + 1; seq < m.nextSeq; seq++) await store.change(id, (current) => ({ manifest: current, deleteSeq: seq }));
    await store.change(id, () => ({ remove: true }));
    id = null;
    persist = Promise.resolve();
  }
  return { begin, append, finish, retry, recover, flush, snapshot, discardEmpty };
}
export {
  createIndexedTakeStore,
  createTakeUpload
};
