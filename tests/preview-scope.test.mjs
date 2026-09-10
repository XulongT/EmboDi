import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {previewScope,isolatePreviewActors} from "../src/shared/preview-scope.mjs";
import {applyCinema} from "../src/shared/cinema.mjs";
import {starterRoom} from "../src/shared/authoring.mjs";
import {createProductionStudio} from "../src/client/rendering/production-studio.mjs";
import {createCinemaLayer} from "../src/client/rendering/cinema-layer.mjs";
import {createVirtualScene,createVirtualRecorder} from "../src/client/rendering/virtual-video.mjs";
import {createFloodRuntime} from "../src/shared/flood.mjs";
import {authoringMenu} from "../src/shared/authoring-ui.mjs";
import {questButtonAction} from "../src/shared/quest-input.mjs";
import {compileCameraCommand} from "../src/agents/rig-runner.mjs";

function fixture(){
  let scene={...starterRoom(),curves:[{id:'curve',mode:'space3d',points:[[0,1,0],[2,3,-2],[4,1,-4]]}]};
  for(const [id,kind] of [['cube','box'],['other','box'],['camera','camera'],['light','spot']]){
    scene=applyCinema(scene,{op:'create',id,kind,position:[5,1,2]});
    scene=applyCinema(scene,{op:'update',id,values:{curveId:'curve',duration:4,...(id==='light'?{fadeOut:2}:{})}});
  }
  scene.actors=[{id:'actor',name:"Actor",assetId:'body',motionId:null,motionPlan:{duration:4},position:[0,0,5],yaw:0},{id:'idle',name:"Observer actor",assetId:'body',motionId:null,motionPlan:{duration:4},position:[2,0,5],yaw:0}];
  return scene;
}

test('preview has no all-scene fallback; shared curve and look-at target are not participants',()=>{
  const scene=fixture();scene.objects.find(o=>o.id==='camera').track.targetId='actor';
  assert.equal(previewScope(scene,[]).playable,false);
  assert.deepEqual(previewScope(scene,['cube']).targetIds,['cube']);
  assert.deepEqual(previewScope(scene,['camera']).actorIds,[]);
  assert.deepEqual(previewScope(scene,['missing']).missingIds,['missing']);
  const scope=previewScope(scene,['cube','actor']);assert.deepEqual(scope.actorIds,['actor']);assert.deepEqual(scope.objectIds,['cube']);
  scene.doorPerformance={enabled:true,doorId:'cube',actorIds:['actor']};
  assert.deepEqual(previewScope(scene,['cube']).targetIds,['cube','actor']);
  assert.deepEqual(previewScope(scene,['other']).targetIds,['other']);
  assert.deepEqual(previewScope(scene,['actor']).targetIds,['actor'],'an actor does not implicitly run the entire door cast');
});

test('selection survives mode clearing; targeted play holds unrelated tracks, pause/resume, switch and restart',async()=>{
  const state={revision:1,scene:fixture()},world=new THREE.Group(),scene=new THREE.Scene();scene.add(world);
  let selection=['cube'],fail=false;const events=[],meshes=new Map(state.scene.objects.map(o=>{const m=new THREE.Mesh();m.userData.definition=o;world.add(m);return [o.id,m];}));
  const p=createProductionStudio({world,scene,assets:new Map(),getState:()=>state,getSelection:()=>selection,getView:()=>new THREE.Camera(),getSpatialKey:()=>'',getMeshes:()=>meshes,api:async(_,i)=>({...i,id:'session',epoch:(i.epoch||0)+1}),notice(){},onChange(){},onState(){},onPreview(){},hideMenu(){},pauseScene(){},transport:(action,scope)=>{if(fail)throw Error('asset unavailable');events.push({action,ids:scope?.targetIds});}});
  await p.initialize();p.setEditing(true);await p.ready();p.frame(.1);
  p.setEditing(false);selection=[];await p.ready();p.frame(.1);
  assert.deepEqual(p.state().previewIds,['cube']);assert.deepEqual(meshes.get('cube').position.toArray(),[5,1,2],'entering exploration does not start even the selected track');
  p.play();for(let i=0;i<15;i++)p.frame(.1);assert(meshes.get('cube').position.y>1);assert.deepEqual(meshes.get('other').position.toArray(),[5,1,2]);
  const time=p.state().time,position=meshes.get('cube').position.clone();p.pause();p.frame(.1);assert.equal(p.state().time,time);assert(position.equals(meshes.get('cube').position));p.play();p.frame(.1);assert(p.state().time>time);
  p.play({ids:['actor']});p.frame(.1);assert.deepEqual(p.state().activePreviewIds,['actor']);assert.deepEqual(meshes.get('cube').position.toArray(),[5,1,2]);
  p.play({ids:['cube','actor']});p.frame(.1);assert.deepEqual(events.at(-1),{action:'start',ids:['cube','actor']});
  p.play({restart:true});assert.equal(p.state().time,0);
  p.setEditing(true);await p.ready();p.frame(.1);assert.deepEqual(p.state().activePreviewIds,[]);assert.deepEqual(meshes.get('cube').position.toArray(),[5,1,2]);
  p.setEditing(false);await p.ready();assert.throws(()=>p.play(),/select/i);assert.throws(()=>p.play({ids:['missing']}),/select/i);
  fail=true;assert.throws(()=>p.play({ids:['actor']}),/asset unavailable/);assert.equal(p.state().playing,false);assert.deepEqual(p.state().activePreviewIds,[]);assert.equal(p.state().time,0);
});

test('unrelated generated actors keep saved neutral placement; only explicitly scoped actors animate',()=>{
  const scene=fixture(),frames=scene.actors.map(a=>({...a,position:[9,9,9],pose:'generated',preview:true,clipTime:4,visible:true}));
  const next=isolatePreviewActors(scene,frames,previewScope(scene,['actor']));
  assert.equal(next[0],frames[0]);assert.equal(next[1].pose,'rest');assert.equal(next[1].motionPlan,null);assert.equal(next[1].clipTime,0);assert.equal(next[1].preview,false);assert.deepEqual(next[1].position,scene.actors[1].position);
});

test('monitor and video cinema layers honor scope including inactive camera poses and light intensity',()=>{
  const scene=fixture();scene.objects.find(o=>o.id==='camera').aimTargetId='cube';
  const live=createCinemaLayer(new THREE.Group()),video=createVirtualScene(scene,new THREE.Matrix4());live.sync(scene);
  const light=scene.objects.find(o=>o.id==='light');
  for(const layer of [live,video.userData.cinema]){
    const frames=layer.frame(3.5,scene.objects.map(o=>o.id==='cube'?{...o,position:[20,4,-7]}:o),[],['cube']);assert.notDeepEqual(frames.find(f=>f.id==='cube').position,[5,1,2]);
    assert.deepEqual(layer.cameras.get('camera').position.toArray(),[5,1,2]);assert.deepEqual(layer.cameras.get('camera').quaternion.toArray(),[0,0,0,1]);assert.equal(layer.lights.get('light').light.intensity,light.light.intensity);
    layer.frame(3.5,scene.objects,[],['light']);assert(layer.lights.get('light').light.intensity<light.light.intensity);
    layer.frame(3.5,scene.objects,[],[]);assert.equal(layer.lights.get('light').light.intensity,light.light.intensity);
    layer.dispose();
  }
});

test('door preview only arms its flood; pause freezes it and restart resets only its trigger',()=>{
  const scene={objects:[{id:'door-a'},{id:'door-b'}],regions:[{id:'zone',floorY:0,points:[[-1,-1],[1,-1],[1,1],[-1,1]]}],floods:['a','b'].map(id=>({id,doorId:'door-'+id,trigger:{regionId:'zone',seconds:.3},duration:10}))};
  const r=createFloodRuntime();r.sync(scene);r.start(previewScope(scene,['door-a']).floodIds);
  for(let now=0;now<1;now+=.1)r.tick({now,position:[0,1.6,0]});let s=r.snapshot();assert.equal(s.states[0].fired,true);assert.equal(s.states[1].fired,false);
  r.pause();const frozen=r.snapshot().states;r.tick({now:2,position:[0,1.6,0]});assert.deepEqual(r.snapshot().states,frozen);
  r.resume();r.tick({now:3,position:[0,1.6,0]});r.tick({now:3.1,position:[0,1.6,0]});assert(r.snapshot().states[0].time>frozen[0].time);
  r.start(['b']);assert(r.snapshot().states.every(s=>!s.fired));for(let now=4;now<5;now+=.1)r.tick({now,position:[0,1.6,0]});assert.equal(r.snapshot().states[0].fired,false);assert.equal(r.snapshot().states[1].fired,true);
  r.start([]);assert.equal(r.snapshot().armed,false);
});

test('virtual recorder retains the scope in capture and saved samples without starting unrelated rigs',async()=>{
  const definition=fixture();definition.actors=[];let clock=0,uploaded;const rendered=[];
  class Renderer{setPixelRatio(){}setSize(){}render(scene){const c=scene.userData.cinema;rendered.push({camera:c.cameras.get('camera').position.toArray(),light:c.lights.get('light').light.intensity});}dispose(){}}
  class Recorder{static isTypeSupported(){return true;}start(){this.state='recording';}stop(){queueMicrotask(()=>{this.ondataavailable({data:new Blob(['video'])});this.onstop();});}}
  const rec=createVirtualRecorder({now:()=>clock,Renderer,Recorder,makeCanvas:()=>({captureStream:()=>({getTracks:()=>[]})}),upload:async(blob,metadata,timeline)=>{uploaded=timeline;return {id:'test'};}}),view=new THREE.Camera();
  rec.start(definition,new THREE.Matrix4(),view);clock=1000;
  rec.frame(clock,view,[],[],null,{productionTime:3.5,previewObjectIds:['cube']});clock=1500;await rec.stop();
  assert.deepEqual(rendered.at(-1).camera,[5,1,2]);assert.equal(rendered.at(-1).light,8);assert.deepEqual(uploaded.samples.at(-1).previewObjectIds,['cube']);
});

test('menu, left grip and camera commands preserve a focused preview without a timeline or global play option',()=>{
  const c={authoring:true,phase:'explore',editing:true,objectSelection:['cube'],production:{previewIds:['cube'],previewLabel:"Box",canPreview:true},objectInteraction:{mode:'menu'}};
  assert(authoringMenu(c,'interaction').entries.some(e=>e.id==='cinemaPlay'&&!e.disabled));
  const explore=authoringMenu({...c,editing:false});assert(explore.title.includes("Box"));assert(!JSON.stringify(explore).match(/all.scene|timeline/i));
  const empty=authoringMenu({...c,editing:false,production:{canPreview:false,previewIds:[]}});assert(empty.entries.find(e=>e.id==='cinemaPlay').disabled);
  assert.equal(questButtonAction({hand:'left',index:1,type:'down'},{...c,menuOpen:true}),'transport');
  assert.equal(questButtonAction({hand:'left',index:1,type:'down'},{...c,blocked:true}),null);
  assert.equal(compileCameraCommand({action:'play',reply:"Rehearse the selected interaction",targetId:null},{scene:fixture(),mode:'explore',ids:['cube','actor']}).id,null,'do not silently drop the second selected participant');
  assert.equal(compileCameraCommand({action:'preview',reply:"Preview the camera",targetId:null},{scene:fixture(),mode:'explore',ids:['cube']}).id,null,'viewing a camera does not reinterpret the cube as a camera');
});
