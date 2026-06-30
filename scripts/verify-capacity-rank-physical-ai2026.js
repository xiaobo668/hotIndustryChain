/**
 * 物理AI细分领域产能榜复验 + 合规
 * 运行: node scripts/verify-capacity-rank-physical-ai2026.js
 */
const fs = require('fs');
const vm = require('vm');
const path = require('path');
const { assertComplianceText, INVESTMENT_FORBIDDEN_RE } = require('./capacity-rank-compliance');
const { RANKINGS } = require('./build-capacity-rank-physical-ai2026');

const root = path.join(__dirname, '..');
const chainCode = fs.readFileSync(path.join(root, 'data.js'), 'utf8')
  .replace(/\bconst INDUSTRY_DATA\b/, 'var INDUSTRY_DATA');
const rankCode = fs.readFileSync(path.join(root, 'data', 'capacity-rank-physical-ai2026.js'), 'utf8');
const sandbox = {};
vm.runInNewContext(
  rankCode + '\n' + chainCode + '\nexports={CAPACITY_RANK_REGISTRY_PHYSICAL_AI2026,INDUSTRY_DATA};',
  sandbox
);

const registry = sandbox.exports.CAPACITY_RANK_REGISTRY_PHYSICAL_AI2026;
const chain = sandbox.exports.INDUSTRY_DATA['物理AI'];
const chainNames = new Set();
['upstream', 'midstream', 'downstream'].forEach((t) => {
  (chain[t] || []).forEach((seg) => (seg.companies || []).forEach((c) => chainNames.add(c.name)));
});

const errors = [];
const warnings = [];

function checkRank(data, label) {
  if (!data || data.companies.length !== 10) errors.push(`${label}: 公司数量应为10`);
  const byRank = [...(data?.companies || [])].sort((a, b) => a.rank - b.rank);
  for (let i = 1; i <= 10; i++) {
    if (!byRank.find((c) => c.rank === i)) errors.push(`${label}: 缺少排名 ${i}`);
  }
  for (let i = 0; i < byRank.length - 1; i++) {
    const a = byRank[i].verify?.capacity;
    const b = byRank[i + 1].verify?.capacity;
    if (a < b) errors.push(`${label}: 产能排序错误 ${byRank[i].name} < ${byRank[i + 1].name}`);
  }
  byRank.forEach((co) => {
    if (!co.capacityLabel || !co.highlight) errors.push(`${label}: ${co.name} 缺少展示字段`);
    errors.push(...assertComplianceText(co.highlight, `${label}/${co.name}`));
    if (!chainNames.has(co.name)) warnings.push(`${label}: ${co.name} 不在物理AI产业链节点`);
  });
  errors.push(...assertComplianceText(data.title, `${label}/title`));
  errors.push(...assertComplianceText(data.subtitle, `${label}/subtitle`));
  if (!/仅.*学习参考|不构成/.test(data.subtitle || '')) {
    warnings.push(`${label}: subtitle 建议含「仅产业学习参考」`);
  }
}

RANKINGS.forEach((cfg) => {
  const data = registry[cfg.key];
  if (!data) errors.push(`缺少榜单: ${cfg.key}`);
  else checkRank(data, cfg.key);
});

console.log('=== 物理AI产能榜复验 ===\n');
if (errors.length) errors.forEach((e) => console.log('❌', e));
else console.log('✅ 数据结构与合规校验通过');
if (warnings.length) warnings.forEach((w) => console.log('⚠️', w));

process.exit(errors.length ? 1 : 0);
