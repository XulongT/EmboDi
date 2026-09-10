import test from 'node:test';
import assert from 'node:assert/strict';
import {readdir, readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {join, relative} from 'node:path';
import zh from './fixtures/zh.json' with {type: 'json'};
import {parseTransformText} from '../src/shared/transforms.mjs';
import {parseDirectorCommand} from '../src/shared/actors.mjs';
import {cameraViewIntent} from '../src/shared/camera-view-intent.mjs';
import {productionSpecialist} from '../src/shared/production-intent.mjs';
import {entityLabel} from '../src/shared/entity-label.mjs';
import {uiText} from '../src/shared/ui-text.mjs';
import {languagePattern, localizedReply} from '../src/shared/language.mjs';
import {compileCameraCommand} from '../src/agents/rig-runner.mjs';
import {AGENTS, agentPrompt} from '../src/agents/registry.mjs';
import {scanAnnotationPrompt} from '../src/shared/scan-furnishing.mjs';
import {scanStructure} from '../src/shared/scan-structure.mjs';
import {reconstructScan} from '../src/shared/scan-reconstruction.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const localizedCharacters = /[\p{Script=Han}\u3000-\u303f\uff01-\uff65]/u;

async function filesUnder(directory) {
  const files = [];
  for (const entry of await readdir(directory, {withFileTypes: true})) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await filesUnder(path));
    else if (/\.(mjs|json|html|css|md)$/.test(entry.name)) files.push(path);
  }
  return files;
}

test('public source is English with multilingual data serialized separately', async () => {
  const files = [join(root, 'README.md'), join(root, 'server.mjs')];
  for (const folder of ['src', 'public', 'scripts', 'tests']) files.push(...await filesUnder(join(root, folder)));
  for (const path of files) {
    assert(!localizedCharacters.test(relative(root, path)), `Localized filename: ${path}`);
    assert(!localizedCharacters.test(await readFile(path, 'utf8')), `Localized source text: ${path}`);
  }
});

test('English and Chinese transforms retain distances, angles and Chinese numerals', () => {
  for (const {input, english, type, offset, degrees} of zh.transformCases) {
    const plan = parseTransformText(input);
    assert.deepEqual(plan, parseTransformText(english));
    assert.equal(plan.type, type);
    if (offset) assert.deepEqual(plan.offset, offset);
    if (degrees !== undefined) assert.equal(plan.degrees, degrees);
  }
  assert.deepEqual(parseDirectorCommand(zh.delayRequest), {type: 'delay', delay: 5});
  assert.deepEqual(parseDirectorCommand(zh.motionNumberRequest), {type: 'motion', number: 3});
});

test('bilingual specialist routing and camera commands survive language extraction', () => {
  const scene = {objects: [{id: 'box', kind: 'box'}], floods: []};
  for (const {input, english, route} of zh.specialistCases) {
    const options = {scene, ids: ['box']};
    assert.equal(productionSpecialist(input, options), route);
    assert.equal(productionSpecialist(english, options), route);
  }
  assert.equal(cameraViewIntent('call camera agent'), 'preview');
  for (const {input, action} of zh.cameraCases) assert.equal(cameraViewIntent(input), action);
});

test('legacy saved labels translate for display without rewriting user data', () => {
  const entity = {id: 'floor-4', name: zh.legacyFloorLabel, shape: 'box'};
  const original = structuredClone(entity);
  assert.match(entityLabel(entity), /^Floor (section|area) 4$/);
  assert.deepEqual(entity, original);
  assert.equal(uiText(zh.legacyGroundHint), 'Hold the right trigger to draw on the floor. Release to finish.');
  assert.equal(uiText('Camera 2'), 'Camera 2');
  assert(languagePattern('scene.scanTitleSuffix').test(zh.legacyScanTitle));
  assert(languagePattern('scene.scanTitleSuffix').test('Room · Scan structure preview'));
});

test('language rules do not share mutable regular-expression state', () => {
  const first = languagePattern('transform.quantity');
  first.exec('2 meters');
  assert(first.lastIndex > 0);
  const second = languagePattern('transform.quantity');
  assert.equal(second.lastIndex, 0);
  assert(second.test('2 meters'));
  assert.throws(() => languagePattern('missing.rule'), /Unknown language pattern/);
});

test('English role prompts preserve original user language and localized Agent replies', () => {
  for (const [id, role] of Object.entries(AGENTS)) {
    assert(!localizedCharacters.test(role.name + role.description + role.instructions));
    assert(agentPrompt(id, {request: zh.waveRequest}).includes(zh.waveRequest));
  }
  const prompt = scanAnnotationPrompt({objects: []}, [], 4, 'Label the measured furniture');
  assert(prompt.includes('Use short English names'));
  assert(!prompt.includes('Chinese names'));
  const result = compileCameraCommand({action: 'create', reply: zh.previewReply}, {mode: 'explore', scene: {objects: []}});
  assert.equal(result.action, 'none');
  assert.equal(result.reply, localizedReply('editRequired', 'zh'));
  assert(/\p{Script=Han}/u.test(result.reply));
  assert.equal(localizedReply('closureRepaired', 'unknown'), localizedReply('closureRepaired', 'en'));
});

test('scan reconstruction retains window roles and table legs after renaming in English', () => {
  const horizontal = (label, y, x = 2, z = 2) => ({label, orientation: 'horizontal', points: [[-x,y,-z],[x,y,-z],[x,y,z],[-x,y,z]]});
  const wall = (a, b) => ({label: 'wall', orientation: 'vertical', points: [[a[0],0,a[1]],[b[0],0,b[1]],[b[0],3,b[1]],[a[0],3,a[1]]]});
  const planes = [horizontal('floor', 0), horizontal('ceiling', 3),
    wall([-2,-2], [2,-2]), wall([2,-2], [2,2]), wall([2,2], [-2,2]), wall([-2,2], [-2,-2]),
    horizontal('table', 0.8, 0.6, 0.4),
    {label: 'window', orientation: 'vertical', points: [[-0.5,1,-2],[0.5,1,-2],[0.5,2,-2],[-0.5,2,-2]]}];
  const scanned = scanStructure(planes);
  const blueprint = {planes, alignment: scanned.alignment, referenceFloor: scanned.scene.objects.find(o => o.id === 'ground')};
  const rebuilt = reconstructScan(blueprint);
  const window = rebuilt.objects.find(o => o.scanAnchorId === 'surface-7');
  assert.equal(window.role, 'window');
  const legs = rebuilt.objects.filter(o => /-support-(left|right)$/.test(o.id));
  assert.equal(legs.length, 2);
  assert(legs.every(o => o.name.endsWith('table leg')));
  assert(rebuilt.objects.every(o => !localizedCharacters.test(o.name)));
});
