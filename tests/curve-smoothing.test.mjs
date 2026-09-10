import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {smoothCurve,stabilizedPoint} from "../src/shared/curve-smoothing.mjs";
import {createDraft,pathLength,DRAFT_LIMITS} from "../src/shared/draft.mjs";
import {createDraftTool} from "../src/client/tools/draft-tool.mjs";
import {interactionActions} from "../src/shared/interaction-session.mjs";
import {validateCurves} from "../src/shared/authoring-motion.mjs";

const distance=(a,b)=>Math.hypot(...a.map((v,i)=>v-b[i]));
const noisyLine=()=>Array.from({length:101},(_,i)=>[i*.03,0,i===100?0:.018*Math.sin(i*2.2)]);
const draw=(draft,points)=>{draft.begin(points[0]);for(const p of points.slice(1))assert(draft.sample(p));return draft.finish();};

test('small line jitter is removed from stored geometry; endpoints and floor height are exact',()=>{
  const raw=noisyLine(),output=smoothCurve(raw,'standard');
  assert(pathLength(raw)>3.3,'The synthetic input must contain measurable jitter');
  assert(pathLength(output)<3.01);assert(output.every(p=>p[1]===0&&Math.abs(p[2])<.002));
  assert.deepEqual(output[0],raw[0]);assert.deepEqual(output.at(-1),raw.at(-1));
  const draft=createDraft({smoothing:'standard'});assert(draw(draft,raw));
  assert.deepEqual(draft.snapshot().points,output);validateCurves([{id:'line',mode:'floor2d',points:output}]);
  draft.setSmoothing('off');assert.deepEqual(draft.snapshot().points,raw);
  draft.setSmoothing('strong');draft.setSmoothing('standard');assert.deepEqual(draft.snapshot().points,output,'Switching must start from raw, not repeatedly smooth');
  const copy=draft.snapshot();copy.rawPoints[1][0]=99;draft.setSmoothing('off');assert.deepEqual(draft.snapshot().points,raw);
});

test('spatial live stabilization suppresses a stationary tip and bounds pointer lag',()=>{
  const start=[0,0,0];
  for(const input of [[.01,0,.01],[-.015,0,0],[0,.01,-.01]])assert.deepEqual(stabilizedPoint(start,input,'standard'),start);
  const input=[1,2,3],tip=stabilizedPoint(start,input,'standard');
  assert(Math.abs(distance(tip,input)-.025)<1e-10);
  assert.deepEqual(stabilizedPoint(start,input,'off'),input);
  const draft=createDraft({smoothing:'standard'});draft.begin(start);draft.sample([.03,0,0]);
  assert(Math.abs(draft.snapshot().stroke.at(-1)[0]-.005)<1e-9);
  assert.deepEqual(draft.lastPoint(),[.03,0,0],'Ground gap checks must use raw samples');
  assert.throws(()=>draft.setSmoothing('off'),/release/i);
  assert.equal(draft.sample([.81,0,0]),false);assert.equal(draft.finish(),false);
});

test('curved intent, a sharp corner, a closed loop and a reversal survive smoothing',()=>{
  const arc=Array.from({length:91},(_,i)=>{const a=i/90*Math.PI/2,r=1.5+(i===0||i===90?0:.012*Math.sin(i*2.1));return [r*Math.cos(a),0,r*Math.sin(a)];});
  for(const level of ['standard','strong']){
    const result=smoothCurve(arc,level);
    assert(result.length>4);assert(result.every(p=>Math.abs(Math.hypot(p[0],p[2])-1.5)<.06));
    assert.deepEqual(result[0],arc[0]);assert.deepEqual(result.at(-1),arc.at(-1));
    const corner=[[0,0,0],[.5,0,0],[1,0,0],[1,0,.5],[1,0,1]];
    assert.deepEqual(smoothCurve(corner,level),[corner[0],corner[2],corner[4]]);
    assert.deepEqual(smoothCurve([[0,0,0],[1,0,0],[.5,0,0]],level),[[0,0,0],[1,0,0],[.5,0,0]]);
    const circle=Array.from({length:121},(_,i)=>[Math.cos(i/120*2*Math.PI),0,Math.sin(i/120*2*Math.PI)]);
    const loop=smoothCurve(circle,level);assert(pathLength(loop)>6);assert(distance(loop[0],loop.at(-1))<1e-10);
  }
});

test('3D strokes retain height, stay bounded, and respect the existing curve schema',()=>{
  const raw=Array.from({length:201},(_,i)=>{const a=i/200*2*Math.PI;return [Math.cos(a),i*.006+.01*Math.sin(i*2),Math.sin(a)];});
  const draft=createDraft({mode:'space3d',smoothing:'standard'});assert(draw(draft,raw));
  const output=draft.snapshot().points;assert(output.at(-1)[1]-output[0][1]>1);assert.deepEqual(output[0],raw[0]);assert.deepEqual(output.at(-1),raw.at(-1));
  validateCurves([{id:'helix',mode:'space3d',points:output}]);
  const dense=Array.from({length:512},(_,i)=>[i*.025,Math.sin(i*.7)*.1,Math.cos(i*.7)*.1]);
  assert(smoothCurve(dense,'standard').length<=512);
  for(const level of ['off','standard','strong'])assert.deepEqual(smoothCurve([[0,0,0],[0,0,0],[0,0,0]],level)[0],[0,0,0]);
});

test('undo, interruption, short strokes and resource guards retain their semantics with smoothing',()=>{
  const draft=createDraft({smoothing:'standard'}),first=noisyLine();assert(draw(draft,first));const saved=draft.snapshot().points;
  assert(draw(draft,first.map(p=>[p[0],p[1],p[2]+1])));draft.undo();assert.deepEqual(draft.snapshot().points,saved);
  draft.begin([0,0,0]);draft.sample([.3,0,0]);draft.sample(null);assert.equal(draft.finish(),false);assert.deepEqual(draft.snapshot().points,saved);
  draft.begin([0,0,0]);draft.sample([.01,0,0]);assert.equal(draft.finish(),false);
  draft.begin([0,0,0]);for(let i=1;i<=DRAFT_LIMITS.maxPoints;i++)draft.sample([i*.03,0,0]);assert.equal(draft.finish(),false);assert.deepEqual(draft.snapshot().points,saved);
  draft.begin([0,0,0]);for(let i=1;i<=65;i++)draft.sample([i*.5,0,0]);assert.equal(draft.finish(),false);
});

test('floor smoothing cannot cut across an unsupported surface; air strokes do not require ground',()=>{
  const world=new THREE.Group();world.position.set(3,0,-2);world.rotation.y=.4;world.updateMatrixWorld(true);
  const pickGround=ray=>{
    const local=ray.ray.clone().applyMatrix4(world.matrixWorld.clone().invert());
    const p=local.intersectPlane(new THREE.Plane(new THREE.Vector3(0,1,0),0),new THREE.Vector3());
    // A narrow floor follows an intentional 3 cm bow. Simplifying to a chord
    // would leave it even though every original segment has supporting floor.
    return p&&Math.abs(p.z-.03*Math.sin(p.x*Math.PI))<.009?p:null;
  };
  const tool=createDraftTool({world,pickGround,smoothing:'strong'}),ray=p=>new THREE.Raycaster(world.localToWorld(new THREE.Vector3(p[0],1,p[2])),new THREE.Vector3(0,-1,0));
  const raw=Array.from({length:21},(_,i)=>[i*.05,0,.03*Math.sin(i*.05*Math.PI)]);
  tool.open();tool.begin(ray(raw[0]),'mouse');for(const p of raw.slice(1))tool.update(ray(p),'mouse');assert(tool.release('mouse'));
  assert.equal(tool.summary().smoothingFallback,true);assert.equal(tool.snapshot().points.length,raw.length);
  tool.cycleSmoothing();assert.equal(tool.summary().smoothing,'extreme');assert.equal(tool.summary().smoothingFallback,true);
  tool.cycleSmoothing();assert.equal(tool.summary().smoothing,'off');
  tool.cycleSmoothing();assert.equal(tool.summary().smoothing,'standard');
  const air=createDraftTool({world,pickGround:()=>null,smoothing:'standard'});
  air.open([],{mode:'space3d'});
  const airRay=y=>new THREE.Raycaster(new THREE.Vector3(0,y,0),new THREE.Vector3(0,0,-1));
  air.begin(airRay(1),'mouse');air.update(airRay(1.4),'mouse');assert(air.release('mouse'));assert.equal(air.summary().smoothingFallback,false);
});

test('only the authoring drawing menu exposes smoothing and disables it during a stroke',()=>{
  const context={authoring:true,objectInteraction:{mode:'draft'},draft:{smoothingLabel:"Strong",drawing:false}};
  assert.equal(interactionActions(context).find(a=>a.id==='draftSmooth').label,"Smoothing: Strong");
  assert.equal(interactionActions({...context,draft:{drawing:true}}).find(a=>a.id==='draftSmooth').disabled,true);
  assert.equal(interactionActions({...context,authoring:false}).some(a=>a.id==='draftSmooth'),false);
});
