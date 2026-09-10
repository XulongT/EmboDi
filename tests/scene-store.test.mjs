import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp, mkdir, readFile, rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {createSceneStore} from '../src/server/scene-store.mjs';

async function fixture(t) {
  const directory = await mkdtemp(join(tmpdir(), 'embodi-scene-store-'));
  t.after(() => rm(directory, {recursive: true, force: true}));
  const sceneLocation = {file: join(directory, 'scene.json'), temporary: join(directory, 'scene.tmp')};
  const store = await createSceneStore({sceneLocation});
  const events = [];
  store.clients.add({write: event => events.push(event)});
  return {store, sceneLocation, directory, events};
}

test('a pending save locks mutations and publishes its new revision only after persistence', async t => {
  const {store, sceneLocation, events} = await fixture(t);
  const before = structuredClone(store.state);
  const scene = {...before.scene, title: 'Saved room'};
  let release;
  const gate = new Promise(resolve => {release = resolve;});
  const pending = store.commit(scene, 'manual-edit', true, store.state, () => gate);
  assert.equal(store.mutationBusy, true);
  assert.deepEqual(store.state, before);
  assert.equal(events.length, 0);
  await assert.rejects(store.commit(scene, 'second-edit'));
  await assert.rejects(store.saveCurrentScene(before.revision));
  release();
  await pending;
  assert.equal(store.state.revision, before.revision + 1);
  assert.equal(store.mutationBusy, false);
  assert.deepEqual(store.history, [before]);
  assert.deepEqual(JSON.parse(await readFile(sceneLocation.file, 'utf8')), store.state);
  assert.deepEqual(JSON.parse(events[0].slice(6)), store.state);
  assert.throws(() => store.revisionCheck(before.revision));
  const restarted = await createSceneStore({sceneLocation});
  assert.deepEqual(restarted.state, store.state);
});

test('failed disk writes preserve scene and undo history and release the save lock', async t => {
  const {store, sceneLocation, directory, events} = await fixture(t);
  const before = structuredClone(store.state);
  const correctFile = sceneLocation.file;
  sceneLocation.file = join(directory, 'blocked');
  await mkdir(sceneLocation.file);
  await assert.rejects(store.commit({...before.scene, title: 'Must not appear'}, 'failed-save'));
  assert.deepEqual(store.state, before);
  assert.equal(store.history.length, 0);
  assert.equal(events.length, 0);
  assert.equal(store.mutationBusy, false);
  sceneLocation.file = correctFile;
  await store.commit({...before.scene, title: 'Recovered'}, 'successful-save');
  assert.equal(store.state.scene.title, 'Recovered');
  assert.equal(store.history.length, 1);
});

test('revoked authoring access aborts before a preview becomes saved state', async t => {
  const {store, events} = await fixture(t);
  const before = structuredClone(store.state);
  await assert.rejects(store.commit({...before.scene, title: 'Expired preview'}, 'preview', true, store.state, () => {
    throw Error('Session expired');
  }), /Session expired/);
  assert.deepEqual(store.state, before);
  assert.equal(store.history.length, 0);
  assert.equal(events.length, 0);
  assert.equal(store.mutationBusy, false);
});
