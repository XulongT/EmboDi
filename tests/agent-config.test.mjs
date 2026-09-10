import zh from "./fixtures/zh.json" with {type: "json"};
import test from 'node:test';
import assert from 'node:assert/strict';
import {AGENTS, agentCatalog, agentPrompt} from '../src/agents/registry.mjs';
import {agentProvider, configuredAgentCatalog} from '../src/agents/models.mjs';

test('each role retains its own prompt while sharing the configured provider groups', () => {
  const config = {
    analysis: {provider: 'openai-compatible', model: 'user-analysis-model', reasoningEffort: 'low'},
    construction: {provider: 'openai-compatible', model: 'user-scene-model', reasoningEffort: 'medium'}
  };
  for (const {id, name, description} of agentCatalog()) {
    assert(!/\p{Script=Han}/u.test(name + description));
    assert(agentPrompt(id, {request: zh.waveRequest}).includes(AGENTS[id].instructions));
    assert(agentPrompt(id, {request: zh.waveRequest}).includes(zh.waveRequest));
    if (id === 'interaction') {
      assert.throws(() => agentProvider(config, id, {}));
    } else {
      assert.equal(agentProvider(config, id, {}).model, config[AGENTS[id].provider].model);
      assert.equal(agentProvider(config, id, {VRBUILD_MODEL: 'override'}).model, 'override');
    }
  }
  const dispatcher = configuredAgentCatalog(config, {}).find(agent => agent.id === 'interaction');
  assert.equal(dispatcher.implementation, 'code-dispatch');
  assert.equal(dispatcher.model, undefined);
  assert.equal(config.analysis.model, 'user-analysis-model');
  assert.throws(() => agentPrompt('unknown', {}));
});
