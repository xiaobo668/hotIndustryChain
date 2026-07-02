/**
 * 创新药业绩榜复验 + 合规
 * 运行: node scripts/verify-performance-rank-innovative-drug2026.js
 */
const fs = require('fs');
const vm = require('vm');
const path = require('path');
const { INVESTMENT_FORBIDDEN_RE } = require('./interim-report-compliance');
const {
  INNOVATIVE_DRUG_PERFORMANCE_SEGMENTS,
  STAR_MARKET_BLOCKLIST,
} = require('./innovative-drug-performance-segments');

const root = path.join(__dirname, '..');
const chainCode = fs.readFileSync(path.join(root, 'data.js'), 'utf8')
  .replace(/\bconst INDUSTRY_DATA\b/, 'var INDUSTRY_DATA');
const rankCode = fs.readFileSync(
  path.join(root, 'data', 'performance-rank-innovative-drug2026.js'),
  'utf8'
);
const sandbox = {};
vm.runInNewContext(
  rankCode + '\n' + chainCode + '\nexports={PERFORMANCE_RANK_REGISTRY_INNOVATIVE_DRUG2026,INDUSTRY_DATA};',
  sandbox
);

const registry = sandbox.exports.PERFORMANCE_RANK_REGISTRY_INNOVATIVE_DRUG2026;
const chain = sandbox.exports.INDUSTRY_DATA['创新药'];
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
    const a = byRank[i].verify?.annualRevenue;
    const b = byRank[i + 1].verify?.annualRevenue;
    if (a < b) {
      errors.push(`${label}: 排序错误 ${byRank[i].name}(${a}亿) < ${byRank[i + 1].name}(${b}亿)`);
    }
  }
  byRank.forEach((co) => {
    if (!co.metricLabel || !co.highlight) errors.push(`${label}: ${co.name} 缺少展示字段`);
    if (STAR_MARKET_BLOCKLIST.has(co.name)) {
      errors.push(`${label}/${co.name}: 科创板(688/689)标的不应出现在业绩榜`);
    }
    if (co.verify?.sourceType !== 'filing') errors.push(`${label}/${co.name}: sourceType 应为 filing`);
    if (!co.verify?.source?.includes('年度报告')) {
      errors.push(`${label}/${co.name}: source 应引用年度报告`);
    }
    if (INVESTMENT_FORBIDDEN_RE.test(JSON.stringify(co))) {
      errors.push(`${label}/${co.name}: 含违规投资建议表述`);
    }
    if (!chainNames.has(co.name)) warnings.push(`${label}: ${co.name} 不在创新药产业链节点`);
  });
  if (!data.title?.includes('2026')) {
    errors.push(`${label}: title 应含 2026`);
  }
  if (!/2024年年度报告|2024年全年/.test(data.subtitle || '')) {
    warnings.push(`${label}: subtitle 建议说明2024年年报口径`);
  }
  if (!data.title?.includes('营收规模')) {
    errors.push(`${label}: title 应为营收规模排行`);
  }
  if (data.reportPeriod !== '2024FY') {
    errors.push(`${label}: reportPeriod 应为 2024FY`);
  }
}

INNOVATIVE_DRUG_PERFORMANCE_SEGMENTS.forEach((seg) => {
  const data = registry[seg.key];
  if (!data) errors.push(`缺少榜单: ${seg.key}`);
  else checkRank(data, seg.key);
});

console.log('=== 创新药业绩榜复验 ===\n');
if (errors.length) errors.forEach((e) => console.log('❌', e));
else console.log('✅ 数据结构与合规校验通过');
if (warnings.length) warnings.forEach((w) => console.log('⚠️', w));

process.exit(errors.length ? 1 : 0);
