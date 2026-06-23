/**
 * 2026 商业航天综合订单规模 TOP10（10 赛道合并，取每家最高市场规模参考）
 * 运行: node scripts/build-order-rank-aerospace-overview2026.js
 */
const fs = require('fs');
const path = require('path');

const CHAIN_SRC = '商业航天产业链节点规模梳理';
const CHAIN_DATE = '2026-06';
const SUBTITLE =
  '综合10条细分赛道，取每家公司在各赛道中最高订单规模参考（亿元）排序；非统一在手订单披露，不可跨公司加总';

function stripNotePrefix(note) {
  return String(note || '')
    .replace(/^产业链口径：/, '')
    .replace(/^媒体报道口径：/, '')
    .replace(/^市场规模参考=[^；]+；/, '');
}

function buildOverviewPayload(orderRankings) {
  const rankings = orderRankings || require('./build-order-rank-aerospace2026').ORDER_RANKINGS;
  const bestByName = new Map();
  rankings.forEach(({ key, ENTRIES }) => {
    ENTRIES.forEach((e) => {
      const prev = bestByName.get(e.name);
      if (!prev || e.amount > prev.amount) {
        bestByName.set(e.name, { ...e, segment: key });
      }
    });
  });

  const top10 = [...bestByName.values()]
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 10);

  const companies = top10.map((e, i) => ({
    rank: i + 1,
    name: e.name,
    orderLabel: `订单规模参考约${e.amount}亿元`,
    highlight: `${e.segment}赛道 · ${e.highlight}`,
    verify: {
      amount: e.amount,
      segment: e.segment,
      sourceType: 'derived',
      source: CHAIN_SRC,
      sourceDate: CHAIN_DATE,
      sourceUrl: null,
      note: `综合榜取10赛道最高值；本条来自${e.segment}赛道。${stripNotePrefix(e.note)}`,
      officialCross: null,
    },
  }));

  return {
    key: '商业航天综合',
    industryKeys: ['商业航天'],
    title: '2026商业航天综合订单规模TOP10',
    subtitle: SUBTITLE,
    generatedAt: '2026-06',
    companies,
  };
}

function writeOverviewFiles(payload) {
  const outDir = path.join(__dirname, '..', 'data');
  const js = [
    '/** 2026 商业航天综合订单规模 TOP10 · 由 scripts/build-order-rank-aerospace-overview2026.js 生成 */',
    `var ORDER_RANK_AEROSPACE_OVERVIEW2026 = ${JSON.stringify(payload, null, 2)};`,
    "if (typeof window !== 'undefined') window.ORDER_RANK_AEROSPACE_OVERVIEW2026 = ORDER_RANK_AEROSPACE_OVERVIEW2026;",
    '',
  ].join('\n');
  fs.writeFileSync(path.join(outDir, 'order-rank-aerospace-overview2026.js'), js, 'utf8');
  fs.writeFileSync(
    path.join(outDir, 'order-rank-aerospace-overview2026.json'),
    JSON.stringify(payload, null, 2),
    'utf8'
  );
  console.log('OK 写入 order-rank-aerospace-overview2026.js');
  console.log(' Top10:', payload.companies.map((c) => `${c.rank}.${c.name} ${c.verify.amount}亿`).join(' | '));
  return payload;
}

if (require.main === module) {
  const { ORDER_RANKINGS } = require('./build-order-rank-aerospace2026');
  writeOverviewFiles(buildOverviewPayload(ORDER_RANKINGS));
}

module.exports = { buildOverviewPayload, writeOverviewFiles };
