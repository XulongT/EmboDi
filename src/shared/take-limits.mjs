const TAKE_LIMITS = Object.freeze({ seconds: 180, fps: 30, width: 1280, height: 720, videoBytes: 96 * 1024 * 1024, totalBytes: 192 * 1024 * 1024, packetBytes: 16 * 1024 * 1024, headerBytes: 8 * 1024 * 1024, chunks: 2048, samples: 12e3, events: 12e3 });
const validTakeId = (id) => typeof id === "string" && /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(id);
function takePacket(blob, segment) {
  const json = new TextEncoder().encode(JSON.stringify(segment));
  if (json.length > TAKE_LIMITS.headerBytes) throw new Error("Recording timeline segment is too large");
  const prefix = new Uint8Array(4);
  new DataView(prefix.buffer).setUint32(0, json.length);
  const packet = new Blob([prefix, json, blob], { type: "application/octet-stream" });
  if (packet.size > TAKE_LIMITS.packetBytes) throw new Error("Recording segment is too large. Recording has stopped.");
  return packet;
}
export {
  TAKE_LIMITS,
  takePacket,
  validTakeId
};
