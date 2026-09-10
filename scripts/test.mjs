import {readdir} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {join} from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const files = (await readdir(join(root, 'tests')))
  .filter(name => name.endsWith('.test.mjs'))
  .sort().map(name => join(root, 'tests', name));

for (const args of [['--test', ...files], [join(root, 'tests/smoke.mjs')]]) {
  const result = spawnSync(process.execPath, args, {cwd: root, stdio: 'inherit'});
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status || 1);
}
