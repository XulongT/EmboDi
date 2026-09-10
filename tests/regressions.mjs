import zh from "./fixtures/zh.json" with {type: "json"};
import assert from 'node:assert/strict';
import http from 'node:http';
import {spawn} from 'node:child_process';
import {once} from 'node:events';
import {mkdtemp,mkdir,writeFile,readFile,rm} from 'node:fs/promises';
import {dirname,join,resolve,relative} from 'node:path';
import {fileURLToPath} from 'node:url';

const root=resolve(dirname(fileURLToPath(import.meta.url)),'..'),scratch=await mkdtemp(join(root,'.embodi-check-')),data=join(scratch,'custom data');
const entry=join(scratch,'node_modules/@openai/codex/bin/codex.js');await mkdir(dirname(entry),{recursive:true});
await writeFile(join(dirname(entry),'package.json'),'{"type":"module"}');
await writeFile(entry,"import fs from 'node:fs';import path from 'node:path';const a=process.argv.slice(2),v=k=>a[a.indexOf(k)+1];if(!['--output-schema','--output-last-message','-C'].map(v).every(path.isAbsolute)||!fs.existsSync(v('--output-schema'))||fs.realpathSync(v('-C'))!==fs.realpathSync(process.cwd()))process.exit(66);fs.writeFileSync(v('--output-last-message'),JSON.stringify({reply:'Local CLI check.',action:'reply',instruction:'',preferences:[]}));process.stdin.resume();");
const wrapper=join(scratch,'codex.cmd');await writeFile(wrapper,'@echo off\r\n');
const env=Object.fromEntries(Object.entries(process.env).filter(([k])=>!k.startsWith('EMBODI_')&&!k.startsWith('VRBUILD_')));
const pending=[],speechCalls=[],wait=ms=>new Promise(r=>setTimeout(r,ms));let child,calls=0,log='';
const mock=http.createServer(async(req,res)=>{
  const chunks=[];for await(const chunk of req)chunks.push(chunk);const bytes=Buffer.concat(chunks);
  if(req.url.startsWith('/v1/')){
    const url=new URL(req.url,'http://localhost'),call={path:url.pathname,auth:req.headers.authorization};
    if(url.pathname==='/v1/audio/transcriptions'){
      const form=await new Request(url,{method:'POST',headers:req.headers,body:bytes}).formData(),file=form.get('file');
      Object.assign(call,{model:form.get('model'),language:form.get('language'),format:form.get('response_format'),filename:file.name,bytes:Buffer.from(await file.arrayBuffer()).length});
      res.setHeader('Content-Type','application/json');res.end(JSON.stringify({text:'Move the camera'}));
    }else{
      assert.equal(url.pathname,'/v1/audio/speech');const request=JSON.parse(bytes);
      Object.assign(call,{model:request.model,voice:request.voice,input:request.input,format:request.response_format});
      res.setHeader('Content-Type','audio/mpeg');res.end('TEST_AUDIO_BYTES');
    }
    speechCalls.push(call);return;
  }
  const request=JSON.parse(bytes);assert.equal(request.model,'local-check');
  const schema=request.response_format?.json_schema?.schema;
  if(schema?.properties?.route||schema?.properties?.plan){
    const context=JSON.parse(request.messages[0].content.split('Task context: ')[1]);
    const result=schema.properties.route?{route:'flood',instruction:'Flow from this object after dwell.',reply:'',needsSketch:false,transform:null}:{reply:'Object flow prepared.',plan:{triggerRegionId:context.regions.find(r=>r.surface==='floor').id,dwellSeconds:1,sources:context.regions.filter(r=>r.surface==='object-surface').map(r=>({regionId:r.id,speed:1,amount:1,reach:1,angle:0})),duration:4,color:'#880d20'}};
    res.setHeader('Content-Type','application/json');res.end(JSON.stringify({choices:[{message:{content:JSON.stringify(result)}}]}));return;
  }
  calls++;pending.push(()=>{res.setHeader('Content-Type','application/json');res.end(JSON.stringify({choices:[{message:{content:JSON.stringify({reply:'Local model check.',action:'reply',instruction:'',preferences:[]})}}]}));});
});
mock.listen(0,'127.0.0.1');await once(mock,'listening');
const reserve=http.createServer();reserve.listen(0,'127.0.0.1');await once(reserve,'listening');const port=reserve.address().port;await new Promise(r=>reserve.close(r));
const base='http://127.0.0.1:'+port;
async function api(path,input,status=200){const res=await fetch(base+path,input?{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(input)}:{}),value=await res.json();assert.equal(res.status,status,JSON.stringify(value));return value;}
async function until(predicate){for(let i=0;i<150;i++){if(await predicate())return;await wait(30);}throw Error('Timed out: '+log);}
async function start(){child=spawn(process.execPath,['server.mjs'],{cwd:root,env:{...env,PORT:String(port),EMBODI_DATA_DIR:relative(root,data),EMBODI_CODEX:process.platform==='win32'?wrapper:entry},stdio:['ignore','pipe','pipe']});child.stdout.on('data',d=>log+=d);child.stderr.on('data',d=>log+=d);await until(async()=>{try{return (await api('/api/health')).ok;}catch{return false;}});}
async function stop(){if(child?.exitCode===null){child.kill();await once(child,'exit');}}
try{
  await start();assert.equal((await api('/api/health')).codexAvailable,true);
  let session=await api('/api/authoring/session',{mode:'edit'}),state=await api('/api/state');
  const config=await api('/api/config',{analysis:{provider:'codex',model:'local-check',apiKey:'DUMMY_TEST_CREDENTIAL'}});assert.equal(config.analysis.hasKey,true);assert(!JSON.stringify(config).includes('DUMMY_TEST_CREDENTIAL'));
  assert.match(await readFile(join(data,'.gitignore'),'utf8'),/\/providers\.json\n\/providers\.json\.\*/);
  const speechUrl='http://127.0.0.1:'+mock.address().port+'/v1',audio={audio:Buffer.alloc(100,1).toString('base64'),mime:'audio/webm;codecs=opus'};
  const initialSpeech=(await api('/api/config')).speech;assert.equal(initialSpeech.provider,'openai');assert.equal(initialSpeech.baseUrl,'https://api.openai.com/v1');assert.equal(initialSpeech.model,'gpt-4o-mini-transcribe');
  await api('/api/speech/transcribe',audio,400);assert.equal(speechCalls.length,0);
  await api('/api/config',{speech:{apiKey:'DUMMY_PREVIOUS_AUDIO_KEY'}});
  const changed=await api('/api/config',{speech:{provider:'openai-compatible',baseUrl:speechUrl,model:'custom-stt',language:'auto',apiKey:''}});assert.equal(changed.speech.hasKey,false);
  assert.equal((await api('/api/speech/transcribe',audio)).text,'Move the camera');
  assert.deepEqual(speechCalls.shift(),{path:'/v1/audio/transcriptions',auth:undefined,model:'custom-stt',language:null,format:'json',filename:'recording.webm',bytes:100});
  const keyed=await api('/api/config',{speech:{baseUrl:speechUrl+'/audio/transcriptions',model:'another-stt',language:'en-US',apiKey:'DUMMY_SPEECH_KEY'}});assert.equal(keyed.speech.hasKey,true);assert(!JSON.stringify(keyed).includes('DUMMY_SPEECH_KEY'));
  await api('/api/speech/transcribe',audio);
  assert.deepEqual(speechCalls.shift(),{path:'/v1/audio/transcriptions',auth:'Bearer DUMMY_SPEECH_KEY',model:'another-stt',language:'en',format:'json',filename:'recording.webm',bytes:100});
  await api('/api/config',{voice:{provider:'openai-compatible',baseUrl:speechUrl,model:'local-tts',voice:'test-voice',apiKey:'DUMMY_VOICE_KEY'}});
  const voiceResponse=await fetch(base+'/api/speech/speak',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({text:'Hello'})});assert.equal(voiceResponse.status,200);assert.equal(await voiceResponse.text(),'TEST_AUDIO_BYTES');
  assert.deepEqual(speechCalls.shift(),{path:'/v1/audio/speech',auth:'Bearer DUMMY_VOICE_KEY',model:'local-tts',voice:'test-voice',input:'Hello',format:'mp3'});
  const jobInput={kind:'chat',prompt:'A local configuration check.',ids:[],anchor:[0,0,0],revision:state.revision,authoringSession:session};
  const probe=await api('/api/jobs',{...jobInput,conversationId:'cli-path-check'},202);
  await until(async()=>!(await api('/api/health')).activeJob);assert.equal((await api('/api/jobs/'+probe.id)).status,'complete');
  await api('/api/config',{analysis:{provider:'openai-compatible',baseUrl:'http://127.0.0.1:'+mock.address().port,model:'local-check'}});
  const input=conversationId=>({method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...jobInput,conversationId})});
  const pair=await Promise.all(['concurrent-one','concurrent-two'].map(id=>fetch(base+'/api/jobs',input(id))));assert.deepEqual(pair.map(r=>r.status).sort(),[202,400]);const accepted=await pair.find(r=>r.status===202).json();
  await until(()=>pending.length===1);assert.equal(calls,1);assert.equal((await api('/api/health')).activeJob,accepted.id);pending.shift()();await until(async()=>!(await api('/api/health')).activeJob);
  await api('/api/jobs',{...jobInput,kind:'generate',sceneKind:'room',photoIds:['missing-photo']},400);assert.equal((await api('/api/health')).activeJob,null);
  state=await api('/api/cinema/commit',{revision:state.revision,authoringSession:session,command:{op:'create',id:'flow-object',kind:'box',position:[0,1,1]}});
  const owner=state.scene.objects.find(o=>o.id==='flow-object'),regionBase={schema:'vrbuild-region/1',objectId:owner.id};
  const regions=[{...regionBase,id:'object-source',name:'Source',surface:'object-surface',frame:{origin:[0,0,owner.size[2]/2],u:[1,0,0],v:[0,1,0],normal:[0,0,1],size:owner.size},points:[[-.06,-.06],[.06,-.06],[.06,.06],[-.06,.06]]},{...regionBase,id:'object-trigger',name:'Trigger',surface:'floor',floorY:0,points:[[-.5,1.5],[.5,1.5],[.5,2.5],[-.5,2.5]]}];
  state=await api('/api/interaction-sketch',{revision:state.revision,authoringSession:session,objectId:owner.id,regions});
  const flowJob=await api('/api/jobs',{kind:'agent',conversationId:'object-flow-check',prompt:'Let fluid flow from this object after I stay in the region.',ids:[owner.id],targetIds:[owner.id],anchor:[0,0,2],revision:state.revision,authoringSession:session},202);
  await until(async()=>(await api('/api/jobs/'+flowJob.id)).status==='ready');
  state=await api('/api/apply-job',{id:flowJob.id,authoringSession:session});
  assert.equal(state.scene.floods[0].objectId,owner.id);assert.equal(state.scene.floods[0].doorId,undefined);
  const flowSaved=structuredClone(state.scene);
  state=await api('/api/cinema/commit',{revision:state.revision,authoringSession:session,command:{op:'remove',id:owner.id}});
  assert.equal(state.scene.regions.length,0);assert.equal(state.scene.floods.length,0);
  state=await api('/api/undo',{revision:state.revision,authoringSession:session});assert.deepEqual(state.scene,flowSaved);
  const actor={id:'check-actor',name:'Mannequin',assetId:'sample-actor',motionId:null,castSlot:1,position:[0,0,0],yaw:0,delay:0,trigger:'start',color:'#dddddd'};
  state=await api('/api/actors',{revision:state.revision,authoringSession:session,command:{type:'create',actor}});
  for(const [id,kind]of [['check-camera','camera'],['check-light','spot']])state=await api('/api/cinema/commit',{revision:state.revision,authoringSession:session,command:{op:'create',id,kind,position:[0,2,3]}});
  state=await api('/api/curves',{revision:state.revision,authoringSession:session,type:'add',curve:{id:'check-path',mode:'space3d',points:[[0,1,0],[2,1,0]]}});
  for(const id of ['check-camera','check-light'])state=await api('/api/cinema/commit',{revision:state.revision,authoringSession:session,command:{op:'update',id,values:{targetId:actor.id,orientation:'target',...(id==='check-light'?{curveId:'check-path'}:{})}}});
  const before=structuredClone(state.scene);
  state=await api('/api/actors',{revision:state.revision,authoringSession:session,command:{type:'remove',id:actor.id}});
  assert(!state.scene.actors.some(a=>a.id===actor.id));assert.equal(state.scene.objects.find(o=>o.id==='check-camera').aimTargetId,undefined);assert.equal(state.scene.objects.find(o=>o.id==='check-light').track.orientation,'fixed');assert.equal(state.scene.objects.find(o=>o.id==='check-light').track.targetId,null);
  state=await api('/api/undo',{revision:state.revision,authoringSession:session});assert.deepEqual(state.scene,before);
  const savedConfig=await api('/api/config');await stop();await start();assert.deepEqual(await api('/api/config'),savedConfig);assert.deepEqual((await api('/api/state')).scene,before);
  await stop();const legacy=JSON.parse(await readFile(join(data,'scene.json'),'utf8'));legacy.scene.objects.find(o=>o.id===owner.id).name=zh.legacyFloorLabel;await writeFile(join(data,'scene.json'),JSON.stringify(legacy));await start();
  const selected=await api('/api/conversation/select',{revision:legacy.revision,ids:[owner.id],conversationId:'english-label-check'});
  assert.match(selected.messages.at(-1).content,/Selected Floor (section|area) 4/);assert(!/\p{Script=Han}/u.test(selected.messages.at(-1).content));
  assert.equal((await api('/api/state')).scene.objects.find(o=>o.id===owner.id).name,zh.legacyFloorLabel);
  await api('/api/config',{analysis:{clearKey:true}});assert.equal((await api('/api/config')).analysis.hasKey,false);
  console.log('PASS: custom data, CLI paths, API configuration, custom speech protocols, object-surface flow, English labels for saved scenes, concurrency, target cleanup, undo and restart. Local stubs only.');
}finally{for(const release of pending)release();await stop();mock.closeAllConnections();await new Promise(r=>mock.close(r));await rm(scratch,{recursive:true,force:true});}
