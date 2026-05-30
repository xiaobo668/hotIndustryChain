/**
 * 算力租赁订单榜复验
 * 运行: node scripts/verify-order-rank-computing2026.js
 */
const fs = require('fs');
const vm = require('vm');
const path = require('path');

const root = path.join(__dirname, '..');
const dataCode = fs.readFileSync(path.join(root, 'data', 'order-rank-computing2026.js'), 'utf8');
const chainCode = fs.readFileSync(path.join(root, 'data.js'), 'utf8')
  .replace(/\bconst INDUSTRY_DATA\b/, 'var INDUSTRY_DATA');
const sandbox = {};
vm.runInNewContext(dataCode + '\n' + chainCode + '\nexports={ORDER_RANK_COMPUTING2026,INDUSTRY_DATA};', sandbox);

const data = sandbox.exports.ORDER_RANK_COMPUTING2026;
const chain = sandbox.exports.INDUSTRY_DATA['算力租赁'];
const chainNames = new Set();
['upstream', 'midstream', 'downstream'].forEach((t) => {
  (chain[t] || []).forEach((seg) => (seg.companies || []).forEach((c) => chainNames.add(c.name)));
});

const errors = [];
if (!data || data.companies.length !== 15) errors.push('公司数量应为15');
const ranks = new Set(data.companies.map((c) => c.rank));
for (let i = 1; i <= 15; i++) if (!ranks.has(i)) errors.push('缺少排名 ' + i);

const missing = data.companies.filter((c) => !chainNames.has(c.name)).map((c) => c.name);
data.companies.forEach((c) => {
  if (!c.orderLabel) errors.push(`${c.name} 缺少 orderLabel`);
  if (!c.highlight) errors.push(`${c.name} 缺少 highlight`);
});

console.log('=== 算力租赁订单榜复验 ===');
console.log('公司数:', data.companies.length);
if (missing.length) console.log('不在产业链节点（订单榜允许）:', missing.join('、'));

if (errors.length) {
  console.log('\nFAIL:');
  errors.forEach((e) => console.log(' -', e));
  process.exit(1);
}
console.log('\nPASS');
