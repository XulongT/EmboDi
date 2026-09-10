import {fileURLToPath} from 'node:url';
import {join,resolve} from 'node:path';
import {applyBrandEnvironment} from './src/services/brand-env.mjs';
import {initializeAuthoringData} from './src/services/authoring-data.mjs';
import {installSampleActor} from './src/services/sample-actor.mjs';

const root=fileURLToPath(new URL('.',import.meta.url));
applyBrandEnvironment();
if(Number(process.versions.node.split('.')[0])<22)throw Error('Node.js 22+ required');
process.env.PORT||='8080';
process.env.VRBUILD_DATA_DIR=resolve(process.env.VRBUILD_DATA_DIR||join(root,'data'));
process.env.VRBUILD_EDITION='open-source';
await initializeAuthoringData(process.env.VRBUILD_DATA_DIR);
await installSampleActor(process.env.VRBUILD_DATA_DIR);
await import('./src/server/app.mjs');
