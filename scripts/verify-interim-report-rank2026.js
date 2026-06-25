/**
 * 中报分析榜复验（10 个赛道）
 * 运行: node scripts/verify-interim-report-rank2026.js
 */
const fs = require('fs');
const vm = require('vm');
const path = require('path');
const { RANKINGS } = require('./build-interim-report-rank2026');
const { INVESTMENT_FORBIDDEN_RE } = require('./interim-report-compliance');

const root = path.join(__dirname, '..');
const rankCode = fs.readFileSync(path.join(root, 'data', 'interim-report-rank2026.js'), 'utf8');
const sandbox = {};
vm.runInNewContext(rankCode + '\nexports={INTERIM_REPORT_REGISTRY2026};', sandbox);
const REGISTRY = sandbox.exports.INTERIM_REPORT_REGISTRY2026;

const errors = [];
const warnings = [];

if (!REGISTRY || Object.keys(REGISTRY).length !== 10) {
  errors.push('INTERIM_REPORT_REGISTRY2026 应为 10 个赛道');
}

RANKINGS.forEach((meta) => {
  const data = REGISTRY[meta.key];
  if (!data) {
    errors.push(`缺少赛道: ${meta.key}`);
    return;
  }
  if (data.companies.length !== 10) errors.push(`${meta.key}: 公司数量应为10`);
  if (!data.subtitle || !data.subtitle.includes('半年度报告')) {
    errors.push(`${meta.key}: subtitle 应说明半年报口径`);
  }
  if (data.subtitle && INVESTMENT_FORBIDDEN_RE.test(data.subtitle)) {
    errors.push(`${meta.key}: subtitle 含投资暗示词汇`);
  }

  const byRank = [...data.companies].sort((a, b) => a.rank - b.rank);
  for (let i = 0; i < byRank.length - 1; i++) {
    if (byRank[i].verify.revenueYoY < byRank[i + 1].verify.revenueYoY) {
      errors.push(
        `${meta.key} 排序错误: ${byRank[i].name}(${byRank[i].verify.revenueYoY}%) < ${byRank[i + 1].name}`
      );
    }
  }

  meta.ENTRIES.forEach((src) => {
    const row = data.companies.find((c) => c.rank === src.rank);
    if (!row) errors.push(`${meta.key} 缺少 rank=${src.rank}`);
    else if (row.name !== src.name) errors.push(`${meta.key} rank${src.rank} 名称应为 ${src.name}`);
    else if (row.verify.revenueYoY !== src.revenueYoY) {
      errors.push(`${meta.key} ${src.name} 同比增速应为 ${src.revenueYoY}%`);
    }
  });

  byRank.forEach((co) => {
    if (!co.metricLabel || !co.highlight) errors.push(`${meta.key}: ${co.name} 缺少展示字段`);
    if (co.verify.sourceType !== 'filing') {
      errors.push(`${meta.key}/${co.name}: sourceType 应为 filing`);
    }
    if (!co.verify.source || !co.verify.source.includes('半年度报告')) {
      errors.push(`${meta.key}/${co.name}: source 应引用半年度报告`);
    }
    if (INVESTMENT_FORBIDDEN_RE.test(co.highlight || '')) {
      errors.push(`${meta.key}/${co.name}: highlight 含投资暗示词汇`);
    }
    if ((co.metricLabel || '').includes('预计') || (co.metricLabel || '').includes('预测')) {
      errors.push(`${meta.key}/${co.name}: metricLabel 不应含预测性表述`);
    }
  });
});

console.log('=== 2026 热门赛道中报分析榜复验 ===');
if (warnings.length) {
  console.log('\nWARN:');
  warnings.forEach((w) => console.log(' -', w));
}
if (errors.length) {
  console.log('\nFAIL:');
  errors.forEach((e) => console.log(' -', e));
  process.exit(1);
}
console.log('\n全部 10 榜 PASS');
