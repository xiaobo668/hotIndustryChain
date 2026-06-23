/**
 * 2026 商业航天板块市场规模参考排行（10 个可拆分赛道）
 * 由产能/规模节点数据换算，非统一在手订单披露
 * 运行: node scripts/build-order-rank-aerospace2026.js
 */
const fs = require('fs');
const path = require('path');
const { RANKINGS: CAP_RANKINGS } = require('./build-capacity-rank-aerospace2026');

const CHAIN_SRC = '商业航天产业链节点规模梳理';
const CHAIN_DATE = '2026-06';

/** 节点规模数值 → 市场规模参考（亿元）赛道换算系数 */
const ORDER_SCALE = {
  'aerospace-rocket-engine': 0.5,
  'aerospace-rocket-structure': 0.0082,
  'aerospace-satellite-mfg': 0.47,
  'aerospace-rocket-mfg': 1.15,
  'aerospace-satellite-comm': 0.12,
  'aerospace-satellite-attitude': 0.08,
  'aerospace-constellation': 0.45,
  'aerospace-space-computing': 0.25,
  'aerospace-materials': 0.0024,
  'aerospace-ttc': 0.014,
};

const SUBTITLE =
  '市场规模参考按产业链节点交付能力/规模指数换算为亿元区间（内部编制），非企业统一在手订单披露，仅供产业学习参考';

function stripNotePrefix(note) {
  return String(note || '')
    .replace(/^产业链口径：/, '')
    .replace(/^媒体报道口径：/, '');
}

function buildOrderEntries(capEntries, scale, capId) {
  return capEntries.map((e) => {
    const amount = Math.round(e.capacity * scale * 10) / 10;
    const scaleDesc = e.unit === '规模指数' ? `规模指数${e.capacity}` : `${e.capacity}${e.unit}`;
    return {
      rank: e.rank,
      name: e.name,
      amount,
      orderLabel: `市场规模参考约${amount}亿元`,
      highlight: e.highlight,
      sourceType: 'derived',
      source: CHAIN_SRC,
      sourceDate: CHAIN_DATE,
      sourceUrl: null,
      note: `市场规模参考=${scaleDesc}×赛道系数${scale}（${capId}）；${stripNotePrefix(e.note)}`,
    };
  });
}

function buildPayload(meta, entries) {
  return {
    key: meta.key,
    industryKeys: meta.industryKeys || ['商业航天'],
    title: meta.title,
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
  const entries = buildOrderEntries(cap.ENTRIES, scale, cap.id);
  const varName = cap.varName.replace('CAPACITY_RANK', 'ORDER_RANK');
  const title = cap.title.replace('产能TOP10', '市场规模参考TOP10').replace('规模TOP10', '市场规模参考TOP10');
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
  '/** 2026 商业航天板块市场规模参考排行 · 由 scripts/build-order-rank-aerospace2026.js 生成 */',
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

if (process.argv[1] && process.argv[1].endsWith('build-order-rank-aerospace2026.js')) {
  const { writeOverviewFiles, buildOverviewPayload } = require('./build-order-rank-aerospace-overview2026');
  writeOverviewFiles(buildOverviewPayload(ORDER_RANKINGS));
}
