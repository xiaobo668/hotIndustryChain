/**
 * 电力板块订单榜复验
 * 运行: node scripts/verify-order-rank-power2026.js
 */
const fs = require('fs');
const vm = require('vm');
const path = require('path');
const { ENTRIES } = require('./build-order-rank-power2026');

const root = path.join(__dirname, '..');
const chainCode = fs.readFileSync(path.join(root, 'data.js'), 'utf8')
  .replace(/\bconst INDUSTRY_DATA\b/, 'var INDUSTRY_DATA');
const rankCode = fs.readFileSync(
  path.join(root, 'data', 'order-rank-power2026.js'), 'utf8'
);
const sandbox = {};
vm.runInNewContext(
  rankCode + '\n' + chainCode + '\nexports={ORDER_RANK_POWER2026,INDUSTRY_DATA};',
  sandbox
);

const data = sandbox.exports.ORDER_RANK_POWER2026;
const chain = sandbox.exports.INDUSTRY_DATA['电力'];
const chainNames = new Set();
['upstream', 'midstream', 'downstream'].forEach((t) => {
  (chain[t] || []).forEach((seg) => (seg.companies || []).forEach((c) => chainNames.add(c.name)));
});

const errors = [];
const warnings = [];
const ORDER_RANK_MAX = 6;

if (!data || data.companies.length !== 10) errors.push('公司数量应为10');
if (data.key !== '电力') errors.push('key 应为 电力');
if (!chain) errors.push('缺少 INDUSTRY_DATA.电力');

const byRank = [...data.companies].sort((a, b) => a.rank - b.rank);
for (let i = 1; i <= 10; i++) {
  if (!byRank.find((c) => c.rank === i)) errors.push('缺少排名 ' + i);
}

function checkSortSegment(list, label) {
  for (let i = 0; i < list.length - 1; i++) {
    const a = list[i].verify.amount;
    const b = list[i + 1].verify.amount;
    if (a < b) {
      errors.push(`${label}排序错误: ${list[i].name}(${a}亿) 应高于 ${list[i + 1].name}(${b}亿)`);
    }
  }
}
checkSortSegment(byRank.filter((c) => c.rank <= ORDER_RANK_MAX), '订单口径(1-6)');
checkSortSegment(byRank.filter((c) => c.rank > ORDER_RANK_MAX), '规模参考(7-10)');

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
  if (!chainNames.has(co.name)) warnings.push(`不在电力产业链节点: ${co.name}`);
  if (co.rank > ORDER_RANK_MAX && co.verify.note.includes('营收')) {
    warnings.push(`${co.name}: 7-10位以2025年报营收作参考，非统一在手订单口径`);
  }
  if (co.rank <= ORDER_RANK_MAX && co.verify.sourceType === 'media') {
    warnings.push(`${co.name}: 1-6位为媒体报道/招标口径，建议关注公司后续公告验证`);
  }
});

console.log('=== 电力板块订单榜复验 ===');
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
