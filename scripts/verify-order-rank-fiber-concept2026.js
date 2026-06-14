/**
 * 光纤概念订单榜复验
 * 运行: node scripts/verify-order-rank-fiber-concept2026.js
 */
const fs = require('fs');
const vm = require('vm');
const path = require('path');
const { ENTRIES } = require('./build-order-rank-fiber-concept2026');
const { isStarBoard } = require('./star-board-names');

const root = path.join(__dirname, '..');
const chainCode = fs.readFileSync(path.join(root, 'data.js'), 'utf8')
  .replace(/\bconst INDUSTRY_DATA\b/, 'var INDUSTRY_DATA');
const rankCode = fs.readFileSync(
  path.join(root, 'data', 'order-rank-fiber-concept2026.js'), 'utf8'
);
const sandbox = {};
vm.runInNewContext(
  rankCode + '\n' + chainCode + '\nexports={ORDER_RANK_FIBER_CONCEPT2026,INDUSTRY_DATA};',
  sandbox
);

const data = sandbox.exports.ORDER_RANK_FIBER_CONCEPT2026;
const chain = sandbox.exports.INDUSTRY_DATA['光纤概念'];
const chainNames = new Set();
['upstream', 'midstream', 'downstream'].forEach((t) => {
  (chain[t] || []).forEach((seg) => (seg.companies || []).forEach((c) => chainNames.add(c.name)));
});

const errors = [];
const warnings = [];
const ORDER_RANK_MAX = 6;
const EXCLUDED_NON_FIBER = ['光迅科技', '华工科技', '新易盛', '中际旭创'];

if (!data || data.companies.length !== 10) errors.push('公司数量应为10');
if (data.key !== '光纤概念') errors.push('key 应为 光纤概念');
if (!chain) errors.push('缺少 INDUSTRY_DATA.光纤概念');

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
  if (isStarBoard(co.name)) errors.push(`含科创板: ${co.name}`);
  if (EXCLUDED_NON_FIBER.includes(co.name)) {
    errors.push(`${co.name} 为光模块主线，不应纳入光纤概念订单榜`);
  }
  if (co.verify.sourceType === 'official' && co.rank <= ORDER_RANK_MAX) {
    errors.push(`${co.name}: 1-6位不应使用official口径`);
  }
  if (co.rank > ORDER_RANK_MAX && co.verify.sourceType === 'official') {
    if (co.verify.amount > 20) {
      errors.push(`${co.name}: 9-10位官方营收应小于20亿`);
    }
  }
  if (!chainNames.has(co.name)) warnings.push(`不在光纤概念产业链节点: ${co.name}`);
  if (co.rank <= ORDER_RANK_MAX && co.verify.sourceType === 'media') {
    if (co.verify.officialCross && co.verify.officialCross.field === 'contractLiability') {
      if (co.verify.amount <= co.verify.officialCross.exact) {
        warnings.push(`${co.name}: 媒体订单${co.verify.amount}亿应大于合同负债${co.verify.officialCross.exact}亿（口径差异已登记）`);
      }
    }
    if (!co.verify.officialCross && co.rank <= 3) {
      warnings.push(`${co.name}: Top3媒体口径，建议关注公司公告交叉验证`);
    }
  }
  if (co.name === '亨通光电' && co.verify.note.includes('300')) {
    warnings.push(`${co.name}: 本榜取光纤光缆100亿口径，非综合300亿`);
  }
  if (co.name === '中天科技' && co.verify.officialCross && co.verify.amount < co.verify.officialCross.min) {
    warnings.push(`${co.name}: 媒体130亿为光纤+海缆子集，低于公司披露总在手订单308亿`);
  }
});

console.log('=== 光纤概念订单榜复验 ===');
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
