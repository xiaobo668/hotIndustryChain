/**
 * 2026 创新药业绩榜（综合+6细分领域）· 按2024年报营收规模排序
 * 运行: node scripts/build-performance-rank-innovative-drug2026.js
 */
const fs = require('fs');
const path = require('path');
const { applyInterimReportCompliance } = require('./interim-report-compliance');
const {
  INNOVATIVE_DRUG_PERFORMANCE_SEGMENTS,
  INNOVATIVE_DRUG_INDUSTRY_KEYS,
  STAR_MARKET_BLOCKLIST,
} = require('./innovative-drug-performance-segments');

const REPORT_PERIOD = '2024FY';
const REPORT_LABEL = '2024年年度报告';
const GENERATED_AT = '2026-06';

function buildPayload(seg) {
  const rows = [...seg.top10]
    .filter((row) => !STAR_MARKET_BLOCKLIST.has(row[0]))
    .sort((a, b) => b[1] - a[1]);
  if (rows.length !== 10) {
    throw new Error(`${seg.key}: 过滤科创板后不足10家（当前${rows.length}家）`);
  }
  const raw = {
    key: seg.key,
    industryKeys: INNOVATIVE_DRUG_INDUSTRY_KEYS,
    subCategory: seg.id,
    title: `2026创新药·${seg.key}营收规模TOP10`,
    subtitle: seg.subtitle,
    reportPeriod: REPORT_PERIOD,
    generatedAt: GENERATED_AT,
    companies: rows.map((row, i) => ({
      rank: i + 1,
      name: row[0],
      metricLabel: `2024营收${row[1]}亿元`,
      highlight: row[2],
      subCategory: seg.id,
      verify: {
        annualRevenue: row[1],
        sourceType: 'filing',
        source: `公司${REPORT_LABEL}`,
        sourceDate: '2025-04',
        sourceUrl: null,
        note: `披露口径：2024年全年营业收入约${row[1]}亿元（合并报表，2025年披露）`,
        officialCross: null,
      },
    })),
  };
  return applyInterimReportCompliance(raw);
}

const outDir = path.join(__dirname, '..', 'data');
const jsLines = ['/** 2026 创新药业绩榜 · 由 scripts/build-performance-rank-innovative-drug2026.js 生成 */'];
const payloads = INNOVATIVE_DRUG_PERFORMANCE_SEGMENTS.map((seg) => {
  const payload = buildPayload(seg);
  const varName = `PERFORMANCE_RANK_INNOVATIVE_DRUG_${seg.id.toUpperCase().replace(/-/g, '_')}2026`;
  jsLines.push(`var ${varName} = ${JSON.stringify(payload, null, 2)};`);
  jsLines.push(`if (typeof window !== 'undefined') window.${varName} = ${varName};`);
  fs.writeFileSync(
    path.join(outDir, `performance-rank-innovative-drug-${seg.id}2026.json`),
    JSON.stringify(payload, null, 2)
  );
  return { varName, payload, seg };
});

jsLines.push('');
jsLines.push('var PERFORMANCE_RANK_REGISTRY_INNOVATIVE_DRUG2026 = {');
payloads.forEach(({ varName, payload }, i) => {
  jsLines.push(`  '${payload.key}': ${varName}${i < payloads.length - 1 ? ',' : ''}`);
});
jsLines.push('};');
jsLines.push(
  "if (typeof window !== 'undefined') window.PERFORMANCE_RANK_REGISTRY_INNOVATIVE_DRUG2026 = PERFORMANCE_RANK_REGISTRY_INNOVATIVE_DRUG2026;"
);

fs.writeFileSync(path.join(outDir, 'performance-rank-innovative-drug2026.js'), jsLines.join('\n') + '\n');
console.log('OK performance-rank-innovative-drug2026.js', payloads.length, '个业绩榜');
module.exports = { INNOVATIVE_DRUG_PERFORMANCE_SEGMENTS, payloads };
