/**
 * 产业链科普口播合规复验
 * 运行: node scripts/verify-chain-pop-science.js
 */
const fs = require('fs');
const vm = require('vm');
const path = require('path');
const { INVESTMENT_FORBIDDEN_RE } = require('./interim-report-compliance');

const code = fs.readFileSync(path.join(__dirname, '..', 'data', 'chain-pop-science2026.js'), 'utf8');
const sandbox = {};
vm.runInNewContext(code + '\nexports={CHAIN_POP_SCIENCE_ITEMS,CHAIN_POP_SCIENCE_SPEC};', sandbox);
const items = sandbox.exports.CHAIN_POP_SCIENCE_ITEMS;
const spec = sandbox.exports.CHAIN_POP_SCIENCE_SPEC;

const errors = [];

items.forEach((item) => {
  if (!item.fullScript || item.fullScript.length < 200) {
    errors.push(`${item.name}: fullScript 过短`);
  }
  ['opening', 'upstream', 'midstream', 'downstream'].forEach((key) => {
    const sec = item.sections[key];
    const text = typeof sec === 'string' ? sec : sec && sec.script;
    if (!text) errors.push(`${item.name}: 缺少 ${key}`);
    if (text && !/科普|不涉及个股/.test(item.sections.opening || '')) {
      /* opening checked separately */
    }
  });
  if (!item.sections.opening.includes('不涉及个股投资建议')) {
    errors.push(`${item.name}: 开篇缺少合规声明`);
  }
  if (!item.sections.closing.compliance.includes('不构成任何证券投资')) {
    errors.push(`${item.name}: 收尾缺少合规句`);
  }

  const allText = item.fullScript;
  if (INVESTMENT_FORBIDDEN_RE.test(allText)) {
    errors.push(`${item.name}: 含投资暗示禁词`);
  }
  spec.forbiddenWords = spec.forbiddenWords || [];
});

console.log('=== 产业链科普口播合规复验 ===');
console.log('产业链数:', items.length);
if (errors.length) {
  errors.forEach((e) => console.log(' FAIL:', e));
  process.exit(1);
}
console.log('全部 PASS');
