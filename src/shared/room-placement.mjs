import { Vector3 } from "three";
import { referenceFloor } from "./scene-space.mjs";
const up = new Vector3(0, 1, 0);
const angle = (n) => Math.atan2(Math.sin(n), Math.cos(n));
function roomPlacementKey(scene) {
  const f = referenceFloor(scene);
  return f ? JSON.stringify([scene.title, f.position, f.size, f.rotation]) : null;
}
function roomCorrection(base, candidate) {
  return { offset: new Vector3(...candidate.origin).sub(new Vector3(...base.origin)).applyAxisAngle(up, -base.yaw).toArray(), yaw: angle(candidate.yaw - base.yaw) };
}
function applyRoomCorrection(base, correction) {
  if (!correction) return structuredClone(base);
  return { ...structuredClone(base), origin: new Vector3(...correction.offset).applyAxisAngle(up, base.yaw).add(new Vector3(...base.origin)).toArray(), yaw: angle(base.yaw + correction.yaw) };
}
function createRoomPlacementStore(storage) {
  const key = "vrbuild-room-placement-v1";
  const valid = (c) => c && Array.isArray(c.offset) && c.offset.length === 3 && c.offset.every((n) => Number.isFinite(n) && Math.abs(n) <= 40) && Number.isFinite(c.yaw);
  const read = () => {
    try {
      const value = JSON.parse(storage?.getItem(key) || "{}");
      return value && typeof value === "object" && !Array.isArray(value) ? value : {};
    } catch {
      return {};
    }
  };
  return {
    get(scene) {
      const value = read()[roomPlacementKey(scene)];
      return valid(value) ? structuredClone(value) : null;
    },
    save(scene, value) {
      const id = roomPlacementKey(scene);
      if (!id || !valid(value)) return false;
      try {
        const entries = read();
        delete entries[id];
        entries[id] = structuredClone(value);
        storage?.setItem(key, JSON.stringify(Object.fromEntries(Object.entries(entries).slice(-12))));
        return !!storage;
      } catch {
        return false;
      }
    },
    clear(scene) {
      try {
        const entries = read();
        delete entries[roomPlacementKey(scene)];
        storage?.setItem(key, JSON.stringify(entries));
      } catch {
      }
    }
  };
}
export {
  applyRoomCorrection,
  createRoomPlacementStore,
  roomCorrection,
  roomPlacementKey
};
