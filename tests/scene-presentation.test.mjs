import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {createScenePresentation} from '../src/client/ui/scene-presentation.mjs';

test('selection labels update their canvas and scene state independently', () => {
  const text = [];
  const drawing = {clearRect() {}, fillRect() {}, fillText: value => text.push(value)};
  const texture = new THREE.Texture({getContext: () => drawing});
  const labelSprite = new THREE.Sprite(new THREE.SpriteMaterial({map: texture}));
  const mesh = new THREE.Object3D();
  mesh.position.set(1, 2, 3);
  mesh.userData.definition = {id: 'box', name: 'Test Box', shape: 'box', group: 'Props', size: [1, 1, 1]};
  const runtime = {
    captureUI: false, roomMode: true, mode: 'inhabit', editing: true,
    director: {snapshot: () => ({placing: false})}, draftTool: {active: () => false},
    hoverIds: [], selection: ['box'], state: {scene: {actors: []}}, meshes: new Map([['box', mesh]]),
    transformTool: {active: () => false}, uiName: object => object.name, openSourceMode: true,
    labelSprite, labelKey: '', renderer: {xr: {isPresenting: false}}
  };
  const view = createScenePresentation(runtime);
  view.updateObjectLabel();
  assert.match(runtime.labelKey, /Test Box/);
  assert.equal(text[0], runtime.labelKey);
  assert.deepEqual(labelSprite.position.toArray(), [1, 2.66, 3]);
  assert.equal(labelSprite.visible, true);
  assert.equal(texture.version, 1);
  mesh.userData.definition.name = 'Renamed Box';
  view.updateObjectLabel();
  assert.match(text[1], /Renamed Box/);
  assert.equal(texture.version, 2);
});
