/**
 * 物理AI细分领域订单榜复验 + 合规
 * 运行: node scripts/verify-order-rank-physical-ai2026.js
 */
const fs = require('fs');
const vm = require('vm');
const path = require('path');
const { PHYSICAL_AI_SEGMENTS } = require('./physical-ai-segments');

const root = path.join(__dirname, '..');
const chainCode = fs.readFileSync(path.join(root, 'data.js'), 'utf8')
  .replace(/\bconst INDUSTRY_DATA\b/, 'var INDUSTRY_DATA');
const rankCode = fs.readFileSync(path.join(root, 'data', 'order-rank-physical-ai2026.js'), 'utf8');
const sandbox = {};
vm.runInNewContext(
  rankCode + '\n' + chainCode + '\nexports={ORDER_RANK_REGISTRY_PHYSICAL_AI2026,INDUSTRY_DATA};',
  sandbox
);

const registry = sandbox.exports.ORDER_RANK_REGISTRY_PHYSICAL_AI2026;
const chain = sandbox.exports.INDUSTRY_DATA['物理AI'];
const chainNames = new Set();
['upstream', 'midstream', 'downstream'].forEach((t) => {
  (chain[t] || []).forEach((seg) => (seg.companies || []).forEach((c) => chainNames.add(c.name)));
});

const FORBIDDEN = /建议买入|建议卖出|强烈推荐|目标价|必涨|稳赚|推荐股票|选股|抄底/i;
const errors = [];
const warnings = [];

function checkRank(data, label) {
  if (!data || data.companies.length !== 10) errors.push(`${label}: 公司数量应为10`);
  const byRank = [...(data?.companies || [])].sort((a, b) => a.rank - b.rank);
  for (let i = 1; i <= 10; i++) {
    if (!byRank.find((c) => c.rank === i)) errors.push(`${label}: 缺少排名 ${i}`);
  }
  for (let i = 0; i < byRank.length - 1; i++) {
    const a = byRank[i].verify?.amount;
    const b = byRank[i + 1].verify?.amount;
    if (a < b) errors.push(`${label}: 排序错误 ${byRank[i].name}(${a}) < ${byRank[i + 1].name}(${b})`);
  }
  byRank.forEach((co) => {
    if (!co.orderLabel || !co.highlight) errors.push(`${label}: ${co.name} 缺少展示字段`);
    if (!co.verify?.sourceUrl) warnings.push(`${label}: ${co.name} 缺少 sourceUrl`);
    if (!chainNames.has(co.name)) warnings.push(`${label}: ${co.name} 不在物理AI产业链节点`);
    if (FORBIDDEN.test(JSON.stringify(co))) errors.push(`${label}: ${co.name} 含违规投资建议表述`);
  });
  if (FORBIDDEN.test(data.subtitle || '')) errors.push(`${label}: subtitle 含违规表述`);
}

PHYSICAL_AI_SEGMENTS.forEach((cfg) => {
  const data = registry[cfg.key];
  if (!data) errors.push(`缺少榜单: ${cfg.key}`);
  else checkRank(data, cfg.key);
});

console.log('=== 物理AI订单榜复验 ===\n');
if (errors.length) errors.forEach((e) => console.log('❌', e));
else console.log('✅ 数据结构与排序校验通过');
if (warnings.length) warnings.forEach((w) => console.log('⚠️', w));

process.exit(errors.length ? 1 : 0);
