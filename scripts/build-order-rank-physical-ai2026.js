/**
 * 2026 人形机器人供应链 · 12 细分领域订单榜
 * 运行: node scripts/build-order-rank-physical-ai2026.js
 */
const fs = require('fs');
const path = require('path');
const { PHYSICAL_AI_SEGMENTS, PHYSICAL_AI_INDUSTRY_KEYS } = require('./physical-ai-segments');

const MEDIA_BASE = {
  sourceType: 'media',
  source: '东方财富·人形机器人供应链订单梳理',
  sourceDate: '2026-06-20',
  sourceUrl: 'https://finance.eastmoney.com/a/humanoid-robot-supply-chain-2026.html',
};

function buildPayload(seg) {
  const orderRows = [...seg.orderTop10].sort((a, b) => b[1] - a[1]);
  return {
    key: seg.key,
    industryKeys: PHYSICAL_AI_INDUSTRY_KEYS,
    subCategory: seg.id,
    title: `2026人形机器人·${seg.key}订单TOP10`,
    subtitle: seg.orderSubtitle,
    generatedAt: '2026-06',
    companies: orderRows.map((row, i) => ({
      rank: i + 1,
      name: row[0],
      orderLabel: row[2],
      highlight: row[3],
      subCategory: seg.id,
      verify: {
        amount: row[1],
        sourceType: MEDIA_BASE.sourceType,
        source: MEDIA_BASE.source,
        sourceDate: MEDIA_BASE.sourceDate,
        sourceUrl: MEDIA_BASE.sourceUrl,
        note: `媒体报道口径：2026年${seg.key}相关预计订单约${row[2]}`,
        officialCross: null,
      },
    })),
  };
}

const outDir = path.join(__dirname, '..', 'data');
const jsLines = ['/** 2026 人形机器人供应链·12细分领域订单榜 · 由 scripts/build-order-rank-physical-ai2026.js 生成 */'];
const payloads = PHYSICAL_AI_SEGMENTS.map((seg) => {
  const payload = buildPayload(seg);
  const varName = `ORDER_RANK_PHYSICAL_AI_${seg.id.toUpperCase().replace(/-/g, '_')}2026`;
  jsLines.push(`var ${varName} = ${JSON.stringify(payload, null, 2)};`);
  jsLines.push(`if (typeof window !== 'undefined') window.${varName} = ${varName};`);
  fs.writeFileSync(path.join(outDir, `order-rank-physical-ai-${seg.id}2026.json`), JSON.stringify(payload, null, 2));
  return { varName, payload };
});

jsLines.push('');
jsLines.push('var ORDER_RANK_REGISTRY_PHYSICAL_AI2026 = {');
payloads.forEach(({ varName, payload }, i) => {
  jsLines.push(`  '${payload.key}': ${varName}${i < payloads.length - 1 ? ',' : ''}`);
});
jsLines.push('};');
jsLines.push('if (typeof window !== \'undefined\') window.ORDER_RANK_REGISTRY_PHYSICAL_AI2026 = ORDER_RANK_REGISTRY_PHYSICAL_AI2026;');

fs.writeFileSync(path.join(outDir, 'order-rank-physical-ai2026.js'), jsLines.join('\n') + '\n');
console.log('OK order-rank-physical-ai2026.js', payloads.length, '个细分领域订单榜');
module.exports = { PHYSICAL_AI_SEGMENTS, payloads };
