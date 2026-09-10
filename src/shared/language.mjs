import patterns from './language/intent-patterns.json' with {type: 'json'};
import entityAliases from './language/entity-labels.json' with {type: 'json'};
import legacyMessages from './language/legacy-ui.json' with {type: 'json'};
import numberWords from './language/number-words.json' with {type: 'json'};
import termWords from './language/terms.json' with {type: 'json'};
import replies from './language/replies.json' with {type: 'json'};

function languagePattern(id) {
  const pattern = patterns[id];
  if (!pattern) throw Error(`Unknown language pattern: ${id}`);
  return new RegExp(pattern.source, pattern.flags);
}

function formatText(template, values = []) {
  return template.replace(/\{(\d+)\}/g, (_, index) => String(values[Number(index)] ?? ''));
}

function localizedReply(id, language, values = []) {
  const template = replies[language]?.[id] ?? replies.en[id];
  if (template === undefined) throw Error(`Unknown reply template: ${id}`);
  return formatText(template, values);
}

export {languagePattern, formatText, localizedReply, entityAliases, legacyMessages, numberWords, termWords};
