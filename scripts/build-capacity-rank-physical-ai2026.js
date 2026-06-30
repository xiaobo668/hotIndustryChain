/**
 * 2026 人形机器人供应链 · 12 细分领域产能榜
 * 运行: node scripts/build-capacity-rank-physical-ai2026.js
 */
const fs = require('fs');
const path = require('path');
const { applyComplianceToPayload } = require('./capacity-rank-compliance');
const { PHYSICAL_AI_SEGMENTS, PHYSICAL_AI_INDUSTRY_KEYS } = require('./physical-ai-segments');

const MEDIA = {
  sourceType: 'media',
  source: '东方财富·人形机器人供应链产能梳理',
  sourceDate: '2026-06-20',
  sourceUrl: 'https://finance.eastmoney.com/a/humanoid-robot-supply-chain-capacity-2026.html',
};

function buildPayload(seg) {
  const capacityRows = [...seg.capacityTop10].sort((a, b) => b[1] - a[1]);
  const raw = {
    key: seg.key,
    industryKeys: PHYSICAL_AI_INDUSTRY_KEYS,
    subCategory: seg.id,
    title: `2026人形机器人·${seg.key}产能TOP10`,
    subtitle: seg.capacitySubtitle,
    capacityUnit: seg.capacityUnit || '万套/年',
    generatedAt: '2026-06',
    companies: capacityRows.map((row, i) => ({
      rank: i + 1,
      name: row[0],
      capacityLabel: row[2],
      highlight: row[3],
      subCategory: seg.id,
      verify: {
        capacity: row[1],
        capacityUnit: seg.capacityUnit || '万套/年',
        sourceType: MEDIA.sourceType,
        source: MEDIA.source,
        sourceDate: MEDIA.sourceDate,
        sourceUrl: MEDIA.sourceUrl,
        note: `媒体报道口径：${seg.key}年化产能约${row[2]}`,
        officialCross: null,
      },
    })),
  };
  return applyComplianceToPayload(raw);
}

const outDir = path.join(__dirname, '..', 'data');
const jsLines = ['/** 2026 人形机器人供应链·12细分领域产能榜 · 由 scripts/build-capacity-rank-physical-ai2026.js 生成 */'];
const payloads = PHYSICAL_AI_SEGMENTS.map((seg) => {
  const payload = buildPayload(seg);
  const varName = `CAPACITY_RANK_PHYSICAL_AI_${seg.id.toUpperCase().replace(/-/g, '_')}2026`;
  jsLines.push(`var ${varName} = ${JSON.stringify(payload, null, 2)};`);
  jsLines.push(`if (typeof window !== 'undefined') window.${varName} = ${varName};`);
  fs.writeFileSync(path.join(outDir, `capacity-rank-physical-ai-${seg.id}2026.json`), JSON.stringify(payload, null, 2));
  return { varName, payload };
});

jsLines.push('');
jsLines.push('var CAPACITY_RANK_REGISTRY_PHYSICAL_AI2026 = {');
payloads.forEach(({ varName, payload }, i) => {
  jsLines.push(`  '${payload.key}': ${varName}${i < payloads.length - 1 ? ',' : ''}`);
});
jsLines.push('};');
jsLines.push('if (typeof window !== \'undefined\') window.CAPACITY_RANK_REGISTRY_PHYSICAL_AI2026 = CAPACITY_RANK_REGISTRY_PHYSICAL_AI2026;');

fs.writeFileSync(path.join(outDir, 'capacity-rank-physical-ai2026.js'), jsLines.join('\n') + '\n');
console.log('OK capacity-rank-physical-ai2026.js', payloads.length, '个细分领域产能榜');
module.exports = { PHYSICAL_AI_SEGMENTS, payloads };
