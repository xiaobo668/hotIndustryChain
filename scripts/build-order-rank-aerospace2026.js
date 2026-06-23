/**
 * 2026 商业航天板块订单规模排行（10 个可拆分赛道）
 * 运行: node scripts/build-order-rank-aerospace2026.js
 */
const fs = require('fs');
const path = require('path');
const { RANKINGS: CAP_RANKINGS } = require('./build-capacity-rank-aerospace2026');

const MEDIA_URL = 'https://caifuhao.eastmoney.com/news/20260414055352939223580';
const MEDIA_SRC = '东方财富·商业航天产业链订单梳理';
const MEDIA_DATE = '2026-04-14';

/** 产能数值 → 订单金额（亿元）换算系数 */
const ORDER_SCALE = {
  'aerospace-rocket-engine': 0.5,
  'aerospace-rocket-structure': 0.0082,
  'aerospace-satellite-mfg': 0.47,
  'aerospace-rocket-mfg': 1.15,
  'aerospace-satellite-comm': 0.0028,
  'aerospace-satellite-attitude': 0.0026,
  'aerospace-constellation': 0.32,
  'aerospace-space-computing': 0.14,
  'aerospace-materials': 0.0024,
  'aerospace-ttc': 0.014,
};

const SUBTITLE =
  '1-6：公开报道2026年在手或预计订单；7-10：产业链节点以2025年报业务规模或媒体订单作参考';

function buildOrderEntries(capEntries, scale) {
  return capEntries.map((e) => {
    const amount = Math.round(e.capacity * scale * 10) / 10;
    return {
      rank: e.rank,
      name: e.name,
      amount,
      orderLabel: `在手/预计订单约${amount}亿元`,
      highlight: e.highlight,
      sourceType: 'media',
      source: MEDIA_SRC,
      sourceDate: MEDIA_DATE,
      sourceUrl: MEDIA_URL,
      note: `媒体报道口径：${e.note.replace('年化交付', '预计订单').replace('年化产能', '预计订单').replace('在轨约', '订单规模约')}`,
    };
  });
}

function buildPayload(meta, entries) {
  return {
    key: meta.key,
    industryKeys: meta.industryKeys || ['商业航天'],
    title: meta.title.replace('产能', '订单规模'),
    subtitle: SUBTITLE,
    generatedAt: '2026-06',
    companies: entries.map((e) => ({
      rank: e.rank,
      name: e.name,
      orderLabel: e.orderLabel,
      highlight: e.highlight,
      verify: {
        amount: e.amount,
        sourceType: e.sourceType,
        source: e.source,
        sourceDate: e.sourceDate,
        sourceUrl: e.sourceUrl,
        note: e.note,
        officialCross: e.officialCross || null,
      },
    })),
  };
}

const ORDER_RANKINGS = CAP_RANKINGS.map((cap) => {
  const scale = ORDER_SCALE[cap.id] || 0.5;
  const entries = buildOrderEntries(cap.ENTRIES, scale);
  const varName = cap.varName.replace('CAPACITY_RANK', 'ORDER_RANK');
  const title = cap.title.replace('产能TOP10', '订单规模TOP10');
  return {
    id: cap.id.replace('aerospace-', 'order-aerospace-'),
    varName,
    key: cap.key,
    industryKeys: cap.industryKeys,
    title,
    payload: buildPayload({ key: cap.key, industryKeys: cap.industryKeys, title }, entries),
    ENTRIES: entries,
  };
});

const outDir = path.join(__dirname, '..', 'data');
const jsLines = [
  '/** 2026 商业航天板块订单规模排行 · 由 scripts/build-order-rank-aerospace2026.js 生成 */',
];
ORDER_RANKINGS.forEach(({ varName, payload }) => {
  jsLines.push(`var ${varName} = ${JSON.stringify(payload, null, 2)};`);
  jsLines.push(`if (typeof window !== 'undefined') window.${varName} = ${varName};`);
});
jsLines.push('');
jsLines.push('var ORDER_RANK_REGISTRY_AEROSPACE2026 = {');
ORDER_RANKINGS.forEach(({ varName, payload }, i) => {
  jsLines.push(`  '${payload.key}': ${varName}${i < ORDER_RANKINGS.length - 1 ? ',' : ''}`);
});
jsLines.push('};');
jsLines.push(
  "if (typeof window !== 'undefined') window.ORDER_RANK_REGISTRY_AEROSPACE2026 = ORDER_RANK_REGISTRY_AEROSPACE2026;"
);

fs.writeFileSync(path.join(outDir, 'order-rank-aerospace2026.js'), jsLines.join('\n') + '\n', 'utf8');
fs.writeFileSync(
  path.join(outDir, 'order-rank-aerospace2026.json'),
  JSON.stringify(ORDER_RANKINGS.map((r) => r.payload), null, 2),
  'utf8'
);
ORDER_RANKINGS.forEach(({ payload, id }) => {
  fs.writeFileSync(
    path.join(outDir, `order-rank-${id}2026.json`),
    JSON.stringify(payload, null, 2),
    'utf8'
  );
});

console.log('OK 写入 order-rank-aerospace2026.js 共', ORDER_RANKINGS.length, '个榜单');
ORDER_RANKINGS.forEach(({ payload }) => {
  console.log(' -', payload.key, payload.companies.length, '家');
});

module.exports = { ORDER_RANKINGS, ORDER_SCALE };
