/**
 * PCB 订单榜复验
 * 运行: node scripts/verify-order-rank-pcb2026.js
 */
const fs = require('fs');
const vm = require('vm');
const path = require('path');
const { ENTRIES } = require('./build-order-rank-pcb2026');

const root = path.join(__dirname, '..');
const chainCode = fs.readFileSync(path.join(root, 'data.js'), 'utf8')
  .replace(/\bconst INDUSTRY_DATA\b/, 'var INDUSTRY_DATA');
const rankCode = fs.readFileSync(path.join(root, 'data', 'order-rank-pcb2026.js'), 'utf8');
const sandbox = {};
vm.runInNewContext(rankCode + '\n' + chainCode + '\nexports={ORDER_RANK_PCB2026,INDUSTRY_DATA};', sandbox);

const data = sandbox.exports.ORDER_RANK_PCB2026;
const chain = sandbox.exports.INDUSTRY_DATA['PCB'];
const chainNames = new Set();
['upstream', 'midstream', 'downstream'].forEach((t) => {
  (chain[t] || []).forEach((seg) => (seg.companies || []).forEach((c) => chainNames.add(c.name)));
});

const errors = [];
const warnings = [];

if (!data || data.companies.length !== 15) errors.push('公司数量应为15');

const byRank = [...data.companies].sort((a, b) => a.rank - b.rank);
for (let i = 1; i <= 15; i++) {
  if (!byRank.find((c) => c.rank === i)) errors.push('缺少排名 ' + i);
}

for (let i = 0; i < byRank.length - 1; i++) {
  const a = byRank[i].verify.amount;
  const b = byRank[i + 1].verify.amount;
  if (a < b) errors.push(`排序错误: ${byRank[i].name}(${a}亿) 应高于 ${byRank[i + 1].name}(${b}亿)`);
}

ENTRIES.forEach((src) => {
  const row = data.companies.find((c) => c.rank === src.rank);
  if (!row) {
    errors.push(`缺少条目 rank=${src.rank}`);
    return;
  }
  if (row.name !== src.name) errors.push(`rank${src.rank} 名称应为 ${src.name}`);
  if (row.verify.amount !== src.amount) errors.push(`${src.name} 金额应为 ${src.amount}亿`);
  if (row.orderLabel !== src.orderLabel) errors.push(`${src.name} orderLabel 不匹配`);
  if (!row.verify.sourceUrl) errors.push(`${src.name} 缺少 sourceUrl`);
});

byRank.forEach((co) => {
  if (!co.orderLabel || !co.highlight) errors.push(`${co.name} 缺少展示字段`);
  if (co.verify.sourceType === 'official' && co.verify.officialCross) {
    const oc = co.verify.officialCross;
    if (oc.exact != null && co.verify.amount !== oc.exact) {
      errors.push(`${co.name} 官方口径金额应为 ${oc.exact}亿`);
    }
    if (oc.min != null && co.verify.amount < oc.min) {
      errors.push(`${co.name} 低于官方交叉验证下限 ${oc.min}亿`);
    }
  }
  if (!chainNames.has(co.name)) warnings.push(`不在PCB产业链节点: ${co.name}`);
  if (co.verify.note && co.verify.note.includes('营收')) {
    warnings.push(`${co.name}: 末位以营收作规模参考，非在手订单`);
  }
});

console.log('=== PCB 订单榜复验 ===');
console.log('公司数:', data.companies.length);
console.log('Top5:', byRank.slice(0, 5).map((c) => `${c.name} ${c.orderLabel}`).join(' | '));
if (warnings.length) {
  console.log('\nWARN:');
  warnings.forEach((w) => console.log(' -', w));
}

if (errors.length) {
  console.log('\nFAIL:');
  errors.forEach((e) => console.log(' -', e));
  process.exit(1);
}
console.log('\nPASS');
