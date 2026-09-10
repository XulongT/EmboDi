import {build} from 'esbuild';
import {fileURLToPath} from 'node:url';
import {join} from 'node:path';

const root=fileURLToPath(new URL('../',import.meta.url));
await build({
  absWorkingDir:root,
  entryPoints:['src/client/app.mjs'],
  outfile:join(root,'public/app.mjs'),
  bundle:true,
  platform:'browser',
  format:'esm',
  target:'es2022',
  external:['three','three/*'],
  treeShaking:true,
  minifySyntax:true,
  charset:'ascii',
  legalComments:'inline',
  logLevel:'info',
});
