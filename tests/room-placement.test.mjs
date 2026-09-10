import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {roomCorrection,applyRoomCorrection,createRoomPlacementStore} from "../src/shared/room-placement.mjs";
import {createCreationLayout,scanPresentationBounds} from "../src/client/ui/creation-layout.mjs";
import {mainActions} from "../src/shared/workflow.mjs";
const scene={title:'Room',objects:[{id:'ground',shape:'box',name:'Floor',position:[5,-.1,-3],size:[6,.2,4],rotation:.5}]};
const near=(a,b)=>assert(new THREE.Vector3(...a).distanceTo(new THREE.Vector3(...b))<1e-7);
test('saved alignment is a correction relative to fresh tracking, not an old absolute XR origin',()=>{
  const base={origin:[10,0,2],yaw:Math.PI/2},aligned={origin:[11,.2,1],yaw:Math.PI};
  const correction=roomCorrection(base,aligned);const restored=applyRoomCorrection(base,correction);near(restored.origin,aligned.origin);assert(Math.abs(restored.yaw-aligned.yaw)<1e-7);
  const fresh={origin:[30,0,-6],yaw:0},next=applyRoomCorrection(fresh,correction);
  near(next.origin,[31,.2,-5]);assert(Math.abs(next.yaw-Math.PI/2)<1e-7);
  assert.deepEqual(base,{origin:[10,0,2],yaw:Math.PI/2});
});
test('alignment corrections survive browser storage reload and reject changed rooms or corrupt data',()=>{
  const data=new Map(),storage={getItem:k=>data.get(k),setItem:(k,v)=>data.set(k,v)};
  const correction={offset:[.3,.1,-.5],yaw:Math.PI/2};
  assert(createRoomPlacementStore(storage).save(scene,correction));
  assert.deepEqual(createRoomPlacementStore(storage).get(scene),correction);
  const edited=structuredClone(scene);edited.objects[0].size[0]++;
  assert.equal(createRoomPlacementStore(storage).get(edited),null);
  assert.equal(createRoomPlacementStore(storage).save(scene,{offset:[Infinity,0,0],yaw:0}),false);
  data.set('vrbuild-room-placement-v1','bad json');assert.equal(createRoomPlacementStore(storage).get(scene),null);
  const unavailable=createRoomPlacementStore({getItem(){throw Error('denied');},setItem(){throw Error('full');}});
  assert.equal(unavailable.get(scene),null);assert.equal(unavailable.save(scene,correction),false);
});
test('off-centre room stays directly ahead through four quarter turns and head roll does not tilt it',()=>{
  const view=new THREE.PerspectiveCamera(),world=new THREE.Group(),panel=new THREE.Group(),layout=createCreationLayout(panel,world);
  view.position.set(2,1.7,8);view.rotation.set(.25,.7,.4,'YXZ');view.updateMatrixWorld(true);world.scale.setScalar(.15);
  const {center}=scanPresentationBounds(scene),forward=view.getWorldDirection(new THREE.Vector3());forward.y=0;forward.normalize();
  const target=view.position.clone().addScaledVector(forward,1.9).add(new THREE.Vector3(0,-.48,0));
  for(let i=0;i<4;i++){
    layout.place(view,{miniature:true,center,rotationOffset:i*Math.PI/2});
    near(world.localToWorld(new THREE.Vector3(...center)).toArray(),target.toArray());
    near(new THREE.Vector3(0,1,0).applyQuaternion(world.quaternion).toArray(),[0,1,0]);
  }
});
test('quarter-turn is offered during safe miniature previews, not during processing or saving',()=>{
  const action=extra=>mainActions({authoring:true,roomMode:true,phase:'preview',job:'ready',...extra}).find(a=>a.id==='rotateRoom');
  assert.equal(action().label,'Rotate 90°');assert(action({phase:'overview',job:null}));
  assert.equal(action({job:'running'}),undefined);assert.equal(action({saving:true}),undefined);assert.equal(action({phase:'reference',job:null}),undefined);
});
test('saved room entry keeps an explicit alignment preview alongside Continue',()=>{
  const c={authoring:true,roomMode:true,hasScene:true,roomAlignmentAvailable:true,xr:true,xrMode:'immersive-ar',alignedMode:true};
  for(const phase of ['welcome','overview']){
    const actions=mainActions({...c,phase});
    assert.equal(actions[0].id,'resume');
    assert.equal(actions[1].id,'align');assert.equal(actions[1].disabled,false);
  }
  const actions=extra=>mainActions({...c,phase:'overview',...extra});
  assert(actions({xr:false}).find(a=>a.id==='align').disabled);
  assert(actions({xrMode:'immersive-vr'}).find(a=>a.id==='align').disabled);
  for(const change of [{job:'running'},{job:'ready'},{saving:true},{phase:'preview',job:'ready'},{roomAlignmentAvailable:false}])assert(!actions(change).some(a=>a.id==='align'));
  assert(actions({editingBusy:true}).find(a=>a.id==='align').disabled);
});
