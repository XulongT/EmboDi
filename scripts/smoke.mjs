import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {once} from 'node:events';
import {mkdtemp,readFile,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join,resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import http from 'node:http';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..'),data=await mkdtemp(join(tmpdir(),'embodi-'));
const reserve=http.createServer();reserve.listen(0,'127.0.0.1');await once(reserve,'listening');const port=reserve.address().port;await new Promise(r=>reserve.close(r));
const child=spawn(process.execPath,['server.mjs'],{cwd:root,env:{...process.env,PORT:String(port),EMBODI_DATA_DIR:data},stdio:['ignore','pipe','pipe']});let log='';child.stdout.on('data',d=>log+=d);child.stderr.on('data',d=>log+=d);
const url=`http://127.0.0.1:${port}`,api=async(path,input)=>{const r=await fetch(url+path,input?{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(input)}:{});const d=await r.json();assert(r.ok,JSON.stringify(d));return d;};
try{
  for(let i=0;i<150;i++){try{if((await fetch(url+'/api/health')).ok)break;}catch{}if(child.exitCode!==null||i===149)throw Error('Startup failed: '+log);await new Promise(r=>setTimeout(r,40));}
  const health=await api('/api/health');assert.equal(health.version,'0.7.8-basic');
  let state=await api('/api/state');assert(state.scene.objects.length>=10);
  const assets=await api('/api/actor-assets');assert.equal(assets.length,1);assert.equal(assets[0].id,'sample-actor');
  const template=await api('/actor-assets/sample-actor/template.json');assert.equal(template.parents.length,24);assert(template.vertices.length>0);
  assert(template.joints[16*3]>template.joints[17*3]);
  for(const file of ['/','/app.mjs','/style.css','/vendor/three/build/three.module.js'])assert((await fetch(url+file)).ok,file);
  const session=await api('/api/authoring/session',{mode:'edit'});
  state=await api('/api/cinema/commit',{revision:state.revision,authoringSession:session,command:{op:'create',id:'sample-box',kind:'box',position:[0,.3,0]}});assert(state.scene.objects.some(o=>o.id==='sample-box'));
  const saved=await api('/api/state');assert.equal(saved.revision,state.revision);
  assert(JSON.parse(await readFile(join(data,'scene.json'),'utf8')).scene.objects.some(o=>o.id==='sample-box'));
  const config=await api('/api/config');assert.equal(config.analysis.hasKey,false);assert.equal(config.speech.hasKey,false);
  console.log('PASS: fresh startup, sample room/actor, assets, editing, persistence and empty credentials.');
}finally{if(child.exitCode===null){child.kill();await once(child,'exit');}await rm(data,{recursive:true,force:true});}
await import('./regressions.mjs');
