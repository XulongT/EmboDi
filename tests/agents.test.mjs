import zh from "./fixtures/zh.json" with {type: "json"};
import test from 'node:test';
import assert from 'node:assert/strict';
import {runAuthoringAgent,validateRoute} from "../src/agents/run.mjs";
import {applyAgentResult} from "../src/shared/agent-result.mjs";
import {starterRoom} from "../src/shared/authoring.mjs";
import {questButtonAction} from "../src/shared/quest-input.mjs";

const route=(name,extra={})=>({route:name,instruction:zh.walkAndWaveInstruction,reply:zh.previewReply,needsSketch:false,transform:null,...extra});
const motion={reply:zh.walkAndWaveReply,plan:{name:'wave-walk',cycle:1,repeats:2,followCurve:true,speed:.5,keyframes:[{time:0,root:[0,0,0],joints:[]},{time:1,root:[0,0,0],joints:[{joint:'right_shoulder',rotation:[0,0,-80]}]}]}};
function fixture(outputs){
  const scene=starterRoom();scene.actors=[{id:'a',name:'A',assetId:'body',motionId:null,position:[0,0,0],yaw:0,color:'#ffffff',delay:0,trigger:'start'}];scene.curves=[{id:'path-a',mode:'floor2d',points:[[0,0,0],[1,0,1],[2,0,1]]}];
  const controller=new AbortController(),calls=[],trace=[];
  const options={scene,input:{prompt:zh.actorWalkAndWaveRequest,actorId:'a',curveId:'path-a',targetIds:['a'],ids:[],revision:12,anchor:[0,0,0]},messages:[],config:{analysis:{provider:'test'},construction:{provider:'construction-test'}},folder:'/tmp/not-written-agent-test',signal:controller.signal,actorAssets:[{id:'body',kind:'vrbuild-humanoid24'}],trace,requestJson:async(config,args)=>{calls.push({config,...args});assert.ok(outputs.length,'Unexpected extra model call');return structuredClone(outputs.shift());}};
  return {scene,options,calls,trace,controller,run:()=>runAuthoringAgent(options)};
}
test('manager dispatches motion with frozen curve; preview never commits source scene',async()=>{
  const f=fixture([route('motion'),motion]),before=structuredClone(f.scene),result=await f.run();
  assert.equal(result.type,'motion');assert.deepEqual(result.plan.trajectory.points,before.curves[0].points);assert.deepEqual(f.scene,before);
  assert.deepEqual(f.trace.map(s=>s.agentId),['director','interaction','motion']);assert.equal(f.calls.length,2);assert.ok(f.calls[1].prompt.includes("Director task"));assert.ok(f.calls[0].prompt.includes('baseRevision'));
  const applied=applyAgentResult(f.scene,result,[]);assert.equal(applied.actors[0].motionPlan.name,'wave-walk');assert.deepEqual(applied.objects,before.objects);
});
test('ambiguous sketch consults Sketch and stops without generating if clarification is needed',async()=>{
  const f=fixture([route('motion',{needsSketch:true}),{meaning:'clarify',instruction:'',reply:zh.ambiguousSketchReply}]);
  assert.equal((await f.run()).type,'reply');assert.deepEqual(f.trace.map(s=>s.agentId),['director','sketch']);
});
test('interpreted path reaches Motion with original user request and exact geometry',async()=>{
  const f=fixture([route('motion',{needsSketch:true}),{meaning:'path',instruction:zh.interpretedWalkAndWave,reply:zh.pathRecognizedReply},motion]);
  const result=await f.run();assert.equal(result.type,'motion');assert.ok(f.calls.at(-1).prompt.includes(zh.interpretedWalkAndWave));assert.deepEqual(result.plan.trajectory.points,f.scene.curves[0].points);
});
test('recommendation is read-only and cannot be applied as a scene change',async()=>{
  const f=fixture([route('recommendation'),{reply:zh.pathRecommendationReply}]),before=structuredClone(f.scene),result=await f.run();
  assert.equal(result.type,'reply');assert.throws(()=>applyAgentResult(f.scene,result,[]),/no applicable scene changes/i);assert.deepEqual(f.scene,before);assert.deepEqual(f.trace.map(s=>s.agentId),['director','recommendation']);
});
test('scene specialist edits selected object and rejects unselected updates',async()=>{
  const f=fixture([]),target=f.scene.objects.find(o=>o.id!=='ground'),other=f.scene.objects.find(o=>o.id!==target.id),patch={explanation:zh.colorPreviewReply,updates:[{...target,color:'#123456'}],creates:[]};
  const outputs=[route('scene-edit'),patch];f.options.input={...f.options.input,actorId:null,ids:[target.id],targetIds:[target.id]};f.options.requestJson=async config=>{f.calls.push(config);return outputs.shift();};
  const result=await f.run();assert.equal(result.type,'patch');assert.equal(f.calls[1].provider,'construction-test');assert.equal(applyAgentResult(f.scene,result,[target.id]).objects.find(o=>o.id===target.id).color,'#123456');
  assert.throws(()=>applyAgentResult(f.scene,{type:'patch',patch:{...patch,updates:[{...other,color:'#123456'}]}},[target.id]),/select|scope|range/i);
});
test('unsupported actor, multiple selected targets and cancellation never invoke Motion',async()=>{
  for(const change of [f=>{f.options.actorAssets=[];},f=>{f.options.input.targetIds.push('other');}]){const f=fixture([route('motion')]);change(f);assert.equal((await f.run()).type,'reply');assert.equal(f.calls.length,1);}
  const f=fixture([]);f.controller.abort();await assert.rejects(f.run());assert.equal(f.calls.length,0);
  const g=fixture([route('motion')]);g.options.requestJson=async()=>{g.controller.abort();return route('motion');};await assert.rejects(g.run());assert.deepEqual(g.trace.map(s=>s.status),['cancelled']);
});
test('invalid manager plans and invalid joint output fail instead of becoming success replies',async()=>{
  assert.throws(()=>validateRoute(route('shell')),/invalid/i);assert.throws(()=>validateRoute(route('scene-edit',{needsSketch:true})),/supports motion paths only/i);
  const invalid=structuredClone(motion);invalid.plan.keyframes[1].joints[0].rotation=[999,0,0];const f=fixture([route('motion'),invalid]);await assert.rejects(f.run());
});
test('a routing-only reply may be empty; terminal and transform replies cannot',()=>{
  assert.equal(validateRoute(route('flood',{reply:''})).route,'flood');
  assert.equal(validateRoute(route('motion',{reply:''})).route,'motion');
  for(const name of ['reply','clarify','transform'])assert.throws(()=>validateRoute(route(name,{reply:''})),/empty/i);
});
test('manager transform uses the captured frame and does not call a motion generator',async()=>{
  const f=fixture([route('transform',{transform:{type:'translate',frame:'scene',offset:[.2,0,0],degrees:0,target:'point',targetId:''}})]);
  f.options.input.spatialContext={viewer:[0,1.6,3],forward:[0,0,-1],point:null,pivot:[0,0,0],spatialKey:'qa-space'};
  const result=await f.run();assert.equal(result.type,'transform');assert.equal(applyAgentResult(f.scene,result,[]).actors[0].position[0],.2);assert.equal(f.calls.length,1);
});
test('voice remains available while an authoring preview/job blocks scene edits',()=>{
  assert.equal(questButtonAction({hand:'left',index:4,type:'down'},{authoring:true,phase:'explore',blocked:true}),'voicePress');
  assert.equal(questButtonAction({hand:'left',index:4,type:'up'},{authoring:true,phase:'explore',blocked:true}),'voiceRelease');
  assert.equal(questButtonAction({hand:'left',index:4,type:'down'},{authoring:true,phase:'reference'}),'voicePress');
  assert.equal(questButtonAction({hand:'left',index:4,type:'down'},{authoring:true,phase:'explore',transforming:true}),'voicePress');
});
