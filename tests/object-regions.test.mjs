import zh from "./fixtures/zh.json" with {type: "json"};
import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {starterRoom} from "../src/shared/authoring.mjs";
import {surfaceFrame,surfaceLocalPoint} from "../src/shared/region-surfaces.mjs";
import {regionFrame,framePoint,validateRegions,replaceObjectRegions,regionObjectId} from "../src/shared/interaction-regions.mjs";
import {compileFlood,applyFlood} from "../src/shared/flood.mjs";
import {floodVertices} from "../src/shared/flood-geometry.mjs";
import {validateScene,applyPatch} from "../src/shared/scene.mjs";
import {applyCinema} from "../src/shared/cinema.mjs";
import {previewScope} from "../src/shared/preview-scope.mjs";
import {productionSpecialist} from "../src/shared/production-intent.mjs";
import {authoringMenu} from "../src/shared/authoring-ui.mjs";
import {createInteractionDraftTool} from "../src/client/tools/interaction-draft.mjs";
import {objectGeometry} from "../src/shared/object-geometry.mjs";
import {runAuthoringAgent} from "../src/agents/run.mjs";
import {defaults} from "../src/services/config.mjs";

function fixture(shape='box',normal=[0,0,1]){
  const scene=starterRoom();scene.objects=scene.objects.filter(o=>o.role!=='door');
  const object={id:'source-object',name:'Unclassified prop',shape,group:'Props',position:[0,1,0],size:[1,1,1],rotation:0,color:'#9ba8bc',roughness:.8,metalness:0,editable:true};
  scene.objects.push(object);
  const point=shape==='cone'?[0,1,.25]:normal[1]?[0,1+normal[1]*.5,0]:[0,1,.5];
  const frame=surfaceFrame(object,point,normal);
  scene.regions=[{schema:'vrbuild-region/1',id:'source',name:'Source',objectId:object.id,surface:'object-surface',frame,points:[[-.1,-.1],[.1,-.1],[.1,.1],[-.1,.1]]},{schema:'vrbuild-region/1',id:'zone',name:'Dwell',objectId:object.id,surface:'floor',floorY:0,points:[[-.7,1],[.7,1],[.7,2.5],[-.7,2.5]]}];
  return scene;
}
const result=()=>({reply:'Flow ready for preview.',plan:{triggerRegionId:'zone',dwellSeconds:5,sources:[{regionId:'source',speed:1,amount:1,reach:2,angle:0}],duration:8,color:'#880d20'}});
const ready=scene=>applyFlood(scene,{plan:compileFlood(result(),scene,'source-object')},['source-object']);
const near=(a,b)=>a.forEach((v,i)=>assert(Math.abs(v-b[i])<1e-5,`${a} != ${b}`));

test('unclassified box, sphere, cylinder and cone surfaces compile without a door',()=>{
  for(const shape of ['box','sphere','cylinder','cone']){
    const scene=fixture(shape),prepared=ready(scene);validateScene(JSON.parse(JSON.stringify(prepared)));
    assert.equal(prepared.floods[0].objectId,'source-object');assert.equal(prepared.floods[0].doorId,undefined);
    assert.deepEqual(previewScope(prepared,['source-object']).floodIds,[prepared.floods[0].id]);
    assert.equal(previewScope(prepared,['cabinet']).floodIds.length,0);
    for(const time of [0,.1,2,7.9])assert([...floodVertices(prepared,prepared.floods[0],prepared.floods[0].sources[0],time)].every(Number.isFinite));
  }
});
test('source projection follows full pose and resizing, while its ground trigger stays fixed',()=>{
  const scene=ready(fixture('sphere')),r=scene.regions[0],p=r.points[0],o=scene.objects.at(-1),local=surfaceLocalPoint(o,r.frame,p),zone=structuredClone(scene.regions[1]);
  const quaternion=new THREE.Quaternion().setFromEuler(new THREE.Euler(.5,.9,-.3));
  const moved=applyCinema(scene,{op:'poses',poses:[{id:o.id,position:[2,2,-1],quaternion:quaternion.toArray()}]});
  const target=moved.objects.at(-1);target.size=[1.8,.7,1.2];validateScene(moved);
  near(framePoint(regionFrame(moved,r),p),new THREE.Vector3(...local).multiply(new THREE.Vector3(...target.size)).applyQuaternion(quaternion).add(new THREE.Vector3(...target.position)).toArray());
  assert.deepEqual(moved.regions[1],zone);
  const animated={...moved,regionPoses:new Map([[o.id,{position:[3,2,-1],quaternion:quaternion.toArray()}]])};
  const a=framePoint(regionFrame(moved,r),p),b=framePoint(regionFrame(animated,r),p);near(b,[a[0]+1,a[1],a[2]]);
});
test('top and bottom surfaces emit along their own normal',()=>{
  for(const sign of [-1,1]){
    const scene=ready(fixture('box',[0,sign,0])),f=scene.floods[0],vertices=floodVertices(scene,f,f.sources[0],.08,1),count=vertices.length/6;
    assert(sign*(vertices[count*3+1]-vertices[1])>0);
  }
});
test('invalid frames, off-surface regions and foreign bindings fail without changing the scene',()=>{
  const scene=ready(fixture()),before=JSON.stringify(scene);
  for(const mutate of [r=>r.objectId='cabinet',r=>r.doorId='cabinet',r=>r.frame.normal=[0,0,0],r=>r.frame.size=[0,1,1],r=>r.points=[[0,0],[3,0],[3,3],[0,3]]]){
    const next=structuredClone(scene);mutate(next.regions[0]);assert.throws(()=>validateScene(next));
  }
  assert.throws(()=>applyFlood(scene,{plan:scene.floods[0]},['cabinet']));
  const foreign=structuredClone(scene.regions);foreign[0].objectId='cabinet';assert.throws(()=>replaceObjectRegions(scene,'source-object',foreign));
  assert.equal(JSON.stringify(scene),before);
  const changed=structuredClone(scene.regions);changed[0].points[0][0]-=.01;assert.equal(replaceObjectRegions(scene,'source-object',changed).floods.length,0);
  const removed=applyCinema(scene,{op:'remove',id:'source-object'});validateScene(removed);assert.equal(removed.regions.length,0);assert.equal(removed.floods.length,0);
});
test('all object menus expose surface regions and flow wording reaches the general interaction router',()=>{
  for(const kind of [undefined,'camera','light']){
    const scene=fixture();scene.objects.at(-1).kind=kind;
    for(const text of [zh.boxFlowRequest,'Have this camera spill fluid','Make water flow from this object',zh.lightLeakRequest,zh.reduceBottomFlowRequest])assert.equal(productionSpecialist(text,{scene,ids:['source-object']}),null);
    const menu=authoringMenu({authoring:true,phase:'explore',editing:true,production:{},objectSelection:['source-object'],regionTarget:true},'drawTools');assert(menu.entries.some(e=>e.id==='regionDraft'));
  }
});
test('the specialist receives generic surface outlines and viewer context for spoken creation',async()=>{
  const scene=fixture(),calls=[],trace=[],replies=[{route:'flood',instruction:'spill',reply:'',needsSketch:false,transform:null},result()];
  const input={prompt:zh.objectDwellFlowRequest,ids:['source-object'],targetIds:['source-object'],revision:0};
  const run=async()=>runAuthoringAgent({scene,input,config:defaults,folder:'/tmp/unused-object-regions',signal:new AbortController().signal,trace,requestJson:async(_,args)=>{calls.push(args);return replies.shift();}});
  const output=await run();assert.equal(output.type,'flood');assert.equal(output.plan.objectId,'source-object');assert(calls.at(-1).prompt.includes('object-surface'));
  input.prompt='Create a door two metres in front of me';input.ids=[];input.targetIds=[];input.spatialContext={viewer:[4,1.6,2],forward:[1,0,0],point:null,pivot:[4,0,2],spatialKey:'test'};
  const door={...scene.objects.at(-1),id:'spoken-door',name:'Door',position:[6,1,2],size:[1,2,.1]};
  replies.push({route:'scene-edit',instruction:input.prompt,reply:'',needsSketch:false,transform:null},{explanation:'Door preview.',updates:[],creates:[door]});
  const created=await run();assert.equal(created.type,'patch');assert(calls.at(-1).prompt.includes('"viewer":[4,1.6,2]'));assert(applyPatch(scene,created.patch,[]).objects.some(o=>o.id==='spoken-door'));
});
test('drawing raycasts actual object geometry in an aligned world and retains separate sources and floor regions',()=>{
  const scene=fixture('sphere');scene.regions=[];
  const world=new THREE.Group();world.position.set(2,0,-1);world.rotation.y=.8;world.scale.setScalar(.7);
  const target=scene.objects.at(-1),mesh=new THREE.Mesh(objectGeometry(target),new THREE.MeshBasicMaterial({side:THREE.DoubleSide}));mesh.position.fromArray(target.position);mesh.scale.fromArray(target.size);world.add(mesh);
  const floor=new THREE.Mesh(new THREE.BoxGeometry(10,.1,10),mesh.material);floor.position.y=-.05;world.add(floor);world.updateMatrixWorld(true);
  const nearest=ray=>ray.intersectObjects([mesh,floor],false)[0];
  const draft=createInteractionDraftTool({world,pickGround:ray=>{const hit=nearest(ray);return hit?.object===floor?world.worldToLocal(hit.point.clone()):null;},pickObject:(ray,id)=>{const hit=nearest(ray);if(hit?.object!==mesh||id!==target.id)return null;return {point:world.worldToLocal(hit.point.clone()).toArray(),normal:hit.face.normal.clone().applyMatrix3(new THREE.Matrix3().getNormalMatrix(mesh.matrixWorld)).transformDirection(world.matrixWorld.clone().invert()).toArray()};}});
  draft.openRegions(scene,target.id,[0,1.6,2]);
  function stroke(points,normal){
    const ray=p=>new THREE.Raycaster(world.localToWorld(new THREE.Vector3(...p).addScaledVector(new THREE.Vector3(...normal),.7)),new THREE.Vector3(...normal).negate().transformDirection(world.matrixWorld));
    assert(draft.begin(ray(points[0]),'test'));
    for(let i=1;i<points.length;i++)for(let j=1;j<=12;j++)draft.update(ray(points[i-1].map((n,k)=>n+(points[i][k]-n)*j/12)),'test');
    assert(draft.release('test'),draft.summary().message);
  }
  stroke([[-.1,.9,.55],[.1,.9,.55],[.1,1.1,.55],[-.1,1.1,.55],[-.1,.9,.55]],[0,0,1]);
  stroke([[-.4,0,1],[.4,0,1],[.4,0,2],[-.4,0,2],[-.4,0,1]],[0,1,0]);
  const saved=draft.snapshot();assert.deepEqual(saved.regions.map(r=>r.surface),['object-surface','floor']);assert(saved.regions.every(r=>regionObjectId(r)===target.id));validateRegions(saved.regions,scene);
  draft.toggleSurface();assert.equal(draft.summary().forceFloor,true);draft.undo();assert.equal(draft.snapshot().regions.length,1);draft.close();mesh.geometry.dispose();floor.geometry.dispose();mesh.material.dispose();
});
