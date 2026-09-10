import zh from "./fixtures/zh.json" with {type: "json"};
import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {JOINTS,compileMotion,validateMotionPlan,validateCurves,applyActorMotion,sampleMotion} from "../src/shared/authoring-motion.mjs";
import {createPerformance,updateActors} from "../src/shared/actors.mjs";
import {createDraft} from "../src/shared/draft.mjs";
import {createDraftTool} from "../src/client/tools/draft-tool.mjs";
import {SkinnedActorView} from "../src/client/rendering/actor-view.mjs";
import {mainActions,authoringActorActions} from "../src/shared/workflow.mjs";
const actor={id:'actor-a',name:'A',assetId:'body',motionId:null,position:[0,0,0],yaw:0,color:'#ffffff',delay:0,trigger:'start'};
const scene=()=>({actors:[structuredClone(actor),{...structuredClone(actor),id:'actor-b'}],objects:[],curves:[]});
const raw=()=>({reply:zh.lowerArmsRequest,plan:{name:'arms down',cycle:2,repeats:1,followCurve:false,speed:.6,keyframes:[{time:0,root:[0,0,0],joints:[]},{time:2,root:[0,0,0],joints:[{joint:'left_shoulder',rotation:[0,0,-80]},{joint:'right_shoulder',rotation:[0,0,80]}]}]}});
const plan=()=>compileMotion(raw(),scene(),'actor-a');
test('generated motion does not need an imported clip and changes only selected actor',()=>{
  const s=scene(),next=applyActorMotion(s,{actorId:'actor-a',plan:plan()});assert.equal(s.actors[0].motionPlan,undefined);assert.deepEqual(next.actors[1],s.actors[1]);
  const clock=createPerformance();clock.sync(next.actors);clock.start(['actor-a']);clock.advance(1);let frames=clock.frames(new Map());assert.equal(frames[0].pose,'generated');assert.equal(frames[0].clipTime,1);assert.equal(frames[1].preview,true);
  clock.stop();clock.advance(1);assert.equal(clock.frames(new Map())[0].clipTime,1);clock.resume();clock.advance(10);assert.equal(clock.frames(new Map())[0].clipTime,2);assert.equal(clock.completed(new Map()),true);
});
test('clock snapshots generated motion, supports final held pose and imported reassignment',()=>{
  const p=plan(),s=applyActorMotion(scene(),{actorId:'actor-a',plan:p}),clock=createPerformance();clock.sync(s.actors);assert.equal(clock.frames(new Map())[0].clipTime,2);clock.start(['actor-a']);
  const next=updateActors(s,{type:'update',id:'actor-a',changes:{motionId:'clip'}},['body','clip']);assert.equal(next.actors[0].motionPlan,null);clock.sync(next.actors);assert.equal(clock.frames(new Map())[0].motionPlan.name,p.name);clock.start(['actor-a']);assert.equal(clock.frames(new Map([['clip',{duration:3}]]))[0].pose,'motion');
});
test('3D curves preserve vertical distance and floor curves reject height changes',()=>{
  const s=scene();s.curves=[{id:'air',mode:'space3d',points:[[0,0,0],[0,1,0],[1,1,0]]}];const r=raw();r.plan.followCurve=true;r.plan.speed=1;const p=compileMotion(r,s,'actor-a','air');assert.deepEqual(sampleMotion(p,.5).position,[0,.5,0]);assert.deepEqual(sampleMotion(p,2).position,[1,1,0]);assert.equal(p.duration,2);assert.throws(()=>validateCurves([{...s.curves[0],mode:'floor2d'}]));
  assert.throws(()=>compileMotion(r,s,'actor-a','missing'));assert.throws(()=>validateMotionPlan({...p,duration:10}));
});
test('invalid Agent output cannot reach scene: time, joints, rotations and long trajectories',()=>{
  for(const change of [p=>p.keyframes[1].time=0,p=>p.keyframes[1].joints[0].joint='unknown',p=>p.keyframes[1].joints[0].rotation[0]=181,p=>p.repeats=40]){const r=raw();change(r.plan);assert.throws(()=>compileMotion(r,scene(),'actor-a'));}
  assert.equal(compileMotion({reply:zh.curveRequiredReply,plan:null},scene(),'actor-a'),null);
});
test('floor and space brushes sample in scene coordinates with tracking interruption and undo',()=>{
  const d=createDraft({mode:'space3d'});d.begin([0,0,0]);d.sample([0,.4,0]);assert.equal(d.finish(),true);assert.deepEqual(d.snapshot().points,[[0,0,0],[0,.4,0]]);d.begin([0,0,0]);d.sample([0,3,0]);assert.equal(d.finish(),false);assert.equal(d.snapshot().points.length,2);d.undo();assert.equal(d.snapshot().points.length,0);
  const world=new THREE.Group(),tool=createDraftTool({world,pickGround:ray=>ray.ray.intersectPlane(new THREE.Plane(new THREE.Vector3(0,1,0),0),new THREE.Vector3())});tool.open();const ray=new THREE.Raycaster(new THREE.Vector3(0,1,0),new THREE.Vector3(0,-1,0));tool.begin(ray,'mouse');for(let i=1;i<=10;i++){ray.ray.origin.x=i*.04;tool.update(ray,'mouse');}assert.equal(tool.release('mouse'),true);assert.ok(tool.snapshot().points.every(p=>p[1]===0));tool.close();
  world.position.set(2,0,0);world.updateMatrixWorld(true);tool.open([],{mode:'space3d',depth:.6});ray.ray.origin.set(2,1,0);tool.begin(ray,'right');for(let i=1;i<=10;i++){ray.ray.origin.y=1+i*.04;tool.update(ray,'right');}tool.release('right');assert.equal(tool.snapshot().points[0][0],0);assert.ok(tool.snapshot().points.at(-1)[1]>tool.snapshot().points[0][1]);
});
test('actual skeleton rotations lower both wrists and raise only the right wrist',()=>{
  // A small bind skeleton verifies side/axis semantics without private body data.
  const joints=Array(72).fill(0),parents=Array(24).fill(0);parents[0]=-1;
  for(const [i,x,y]of [[16,.2,1.4],[17,-.2,1.4],[18,.5,1.4],[19,-.5,1.4],[20,.8,1.4],[21,-.8,1.4]]){joints[i*3]=x;joints[i*3+1]=y;}
  parents[18]=16;parents[19]=17;parents[20]=18;parents[21]=19;
  const template={parents,joints,jointNames:JOINTS,vertices:[0,0,0,1,0,0,0,1,0],faces:[0,1,2],skinIndices:Array(12).fill(0),skinWeights:[1,0,0,0,1,0,0,0,1,0,0,0]};
  const view=new SkinnedActorView({template,motion:{normalization:{origin:[0,0,0],yaw:0}}},{validate:false});const p=plan(),frame={...actor,assetId:'body',visible:true,preview:false,pose:'generated',motionPlan:p,clipTime:2};view.apply(frame);
  const pos=i=>view.bones[i].getWorldPosition(new THREE.Vector3());assert.ok(pos(20).y<1);assert.ok(pos(21).y<1);
  const raised=structuredClone(p);raised.keyframes.at(-1).joints[1].rotation=[0,0,-85];view.apply({...frame,motionPlan:raised});assert.ok(pos(21).y>1.8);assert.ok(pos(20).y<1);view.dispose();
});
test('selected actor menu excludes global record, group playback and preset switching',()=>{
  const c={authoring:true,phase:'explore',recording:'idle',actorSelected:'actor-a',actorCount:2};const ids=mainActions(c).map(a=>a.id);assert.ok(ids.includes('actorAgent'));assert.ok(ids.includes('actorPreview'));for(const forbidden of ['record','actorStart','actorTransport','actorAssign'])assert.ok(!ids.includes(forbidden));assert.equal(authoringActorActions(c).some(a=>a.id==='drawSpace'),true);
});
