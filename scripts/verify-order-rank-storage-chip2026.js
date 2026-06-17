/**
 * 存储芯片订单榜复验（严格校验数据与标的）
 * 运行: node scripts/verify-order-rank-storage-chip2026.js
 */
const fs = require('fs');
const vm = require('vm');
const path = require('path');
const { ENTRIES, SINA_STORAGE_TOP10_URL } = require('./build-order-rank-storage-chip2026');
const { isStarBoard } = require('./star-board-names');

const root = path.join(__dirname, '..');
const chainCode = fs.readFileSync(path.join(root, 'data.js'), 'utf8')
  .replace(/\bconst INDUSTRY_DATA\b/, 'var INDUSTRY_DATA');
const rankCode = fs.readFileSync(
  path.join(root, 'data', 'order-rank-storage-chip2026.js'), 'utf8'
);
const sandbox = {};
vm.runInNewContext(
  rankCode + '\n' + chainCode + '\nexports={ORDER_RANK_STORAGE_CHIP2026,INDUSTRY_DATA};',
  sandbox
);

const data = sandbox.exports.ORDER_RANK_STORAGE_CHIP2026;
const chain = sandbox.exports.INDUSTRY_DATA['存储芯片'];
const chainNames = new Set();
['upstream', 'midstream', 'downstream'].forEach((t) => {
  (chain[t] || []).forEach((seg) => (seg.companies || []).forEach((c) => chainNames.add(c.name)));
});

const errors = [];
const warnings = [];
const ORDER_RANK_MAX = 7;
const SINA_TOP7 = [
  { sinaRank: 2, name: '长电科技', amount: 320 },
  { sinaRank: 3, name: '生益科技', amount: 250 },
  { sinaRank: 4, name: '深南电路', amount: 220 },
  { sinaRank: 6, name: '兆易创新', amount: 150 },
  { sinaRank: 7, name: '江波龙', amount: 130 },
  { sinaRank: 8, name: '德明利', amount: 110 },
  { sinaRank: 10, name: '北京君正', amount: 85 },
];
const EXCLUDED_STAR = ['澜起科技', '佰维存储'];
const EXCLUDED_UNLISTED = ['长江存储'];
const STRONG = /存储|DRAM|NAND|NOR|闪存|Flash|模组|封测|沛顿|长鑫|颗粒|主控|覆铜板|封装基板|载板|FC-BGA|HBM|嵌入式存储/i;

if (!data || data.companies.length !== 10) errors.push('公司数量应为10');
if (data.key !== '存储芯片') errors.push('key 应为 存储芯片');
if (!chain) errors.push('缺少 INDUSTRY_DATA.存储芯片');

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
checkSortSegment(byRank.filter((c) => c.rank <= ORDER_RANK_MAX), '新浪口径(1-7)');
checkSortSegment(byRank.filter((c) => c.rank > ORDER_RANK_MAX), '补充参考(8-10)');

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

SINA_TOP7.forEach((ref, idx) => {
  const row = byRank[idx];
  if (!row) {
    errors.push(`新浪TOP7 缺少 rank${idx + 1}`);
    return;
  }
  if (row.name !== ref.name) errors.push(`rank${idx + 1} 应为新浪口径 ${ref.name}，实际 ${row.name}`);
  if (row.verify.amount !== ref.amount) errors.push(`${ref.name} 金额应与新浪TOP10一致为 ${ref.amount}亿`);
  if (row.verify.sinaRank !== ref.sinaRank) errors.push(`${ref.name} sinaRank 应为 ${ref.sinaRank}`);
  if (row.verify.sourceUrl !== SINA_STORAGE_TOP10_URL) {
    errors.push(`${ref.name} 1-7位来源链接应指向新浪TOP10原文`);
  }
});

byRank.forEach((co) => {
  if (!co.orderLabel || !co.highlight) errors.push(`${co.name} 缺少展示字段`);
  if (isStarBoard(co.name)) errors.push(`含科创板标的: ${co.name}`);
  if (EXCLUDED_STAR.includes(co.name)) errors.push(`${co.name} 为科创板，不应纳入本榜`);
  if (EXCLUDED_UNLISTED.includes(co.name)) errors.push(`${co.name} 非上市，不应纳入本榜`);
  if (!chainNames.has(co.name)) errors.push(`不在存储芯片产业链节点: ${co.name}`);
  if (!STRONG.test(co.highlight)) errors.push(`${co.name} highlight 缺少存储强相关表述`);
  if (co.rank <= ORDER_RANK_MAX && co.verify.sourceType !== 'media') {
    errors.push(`${co.name}: 1-7位应为 media 口径（新浪TOP10）`);
  }
  if (co.rank > ORDER_RANK_MAX && co.rank <= 9 && co.verify.sourceType === 'official') {
    errors.push(`${co.name}: 8-9位不应使用 official 口径`);
  }
  if (co.rank === 10 && co.verify.sourceType !== 'official') {
    errors.push(`${co.name}: 第10位应以年报营收作 official 参考`);
  }
  if (co.rank <= ORDER_RANK_MAX && !co.verify.sinaRank) {
    errors.push(`${co.name}: 1-7位应登记 sinaRank`);
  }
  if (co.rank > ORDER_RANK_MAX && co.verify.sinaRank) {
    errors.push(`${co.name}: 8-10位不应有 sinaRank`);
  }
});

['澜起科技', '佰维存储', '长江存储'].forEach((name) => {
  if (byRank.find((c) => c.name === name)) errors.push(`错配纳入: ${name}`);
});

console.log('=== 存储芯片订单榜复验 ===');
console.log('公司数:', data.companies.length);
console.log('Top7(新浪):', byRank.slice(0, 7).map((c) => `${c.name} ${c.orderLabel}`).join(' | '));
console.log('补充8-10:', byRank.slice(7).map((c) => `${c.name} ${c.orderLabel}`).join(' | '));
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
