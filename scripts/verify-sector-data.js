/**
 * 板块龙头复验：产业链归属 + 情绪/趋势特征 + 全覆盖
 * 运行: node scripts/verify-sector-data.js
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { isStarBoard } = require('./star-board-names');

const root = path.join(__dirname, '..');
const sandbox = { exports: {} };
const code = fs.readFileSync(path.join(root, 'data.js'), 'utf8')
  .replace(/\bconst INDUSTRY_DATA\b/, 'var INDUSTRY_DATA')
  .replace(/\bconst KEYWORD_MAP\b/, 'var KEYWORD_MAP')
  + fs.readFileSync(path.join(root, 'sector-data.js'), 'utf8')
    .replace(/\bconst SECTOR_DATA\b/, 'var SECTOR_DATA');
vm.runInNewContext(code + '\nexports={INDUSTRY_DATA,SECTOR_DATA,searchIndustry,searchSector};', sandbox);

const { INDUSTRY_DATA, SECTOR_DATA, searchIndustry, searchSector } = sandbox.exports;

const EMOTION_KW = /弹性|情绪|辨识度|纯度|先锋|博弈|活跃|拉升|率先|题材|涨停|映射|催化|预期博弈/;
const TREND_KW = /龙头|市占|机构|趋势|中军|业绩|订单|稳健|放量|配置|兑现|重仓|可跟踪/;
const CONCEPT_RED = /仅概念|蹭概念|纯炒作|无实质业务/;

function chainSet(key) {
  const set = new Set();
  ['upstream', 'midstream', 'downstream'].forEach((t) => {
    (INDUSTRY_DATA[key][t] || []).forEach((seg) => {
      (seg.companies || []).forEach((co) => set.add(co.name));
    });
  });
  return set;
}

const errors = [];
const industryKeys = Object.keys(INDUSTRY_DATA);
const sectorKeys = Object.keys(SECTOR_DATA);

if (sectorKeys.length !== industryKeys.length) {
  errors.push(`板块数量不一致: SECTOR=${sectorKeys.length} INDUSTRY=${industryKeys.length}`);
}

industryKeys.forEach((key) => {
  if (!SECTOR_DATA[key]) errors.push(`缺少板块龙头: ${key}`);
});

sectorKeys.forEach((key) => {
  const sec = SECTOR_DATA[key];
  const chain = chainSet(key);
  const ind = INDUSTRY_DATA[key];
  if (!ind) errors.push(`孤立板块: ${key}`);

  (sec.vanguard?.companies || []).forEach((co) => {
    if (isStarBoard(co.name)) errors.push(`[${key}] 情绪 ${co.name} 为科创板`);
    if (!chain.has(co.name)) errors.push(`[${key}] 情绪 ${co.name} 不在产业链`);
    if (!EMOTION_KW.test(co.highlight || '')) errors.push(`[${key}] 情绪 ${co.name} 缺情绪特征`);
    if (TREND_KW.test(co.highlight || '') && !EMOTION_KW.test(co.highlight || '')) {
      errors.push(`[${key}] 情绪 ${co.name} 仅含趋势词、缺情绪特征`);
    }
    if (CONCEPT_RED.test(co.highlight || '')) errors.push(`[${key}] 情绪 ${co.name} 蹭概念描述`);
  });

  (sec.center?.companies || []).forEach((co) => {
    if (isStarBoard(co.name)) errors.push(`[${key}] 趋势 ${co.name} 为科创板`);
    if (!chain.has(co.name)) errors.push(`[${key}] 趋势 ${co.name} 不在产业链`);
    if (!TREND_KW.test(co.highlight || '')) errors.push(`[${key}] 趋势 ${co.name} 缺趋势特征`);
    if (EMOTION_KW.test(co.highlight || '') && !TREND_KW.test(co.highlight || '')) {
      errors.push(`[${key}] 趋势 ${co.name} 仅含情绪词、缺趋势特征`);
    }
    if (CONCEPT_RED.test(co.highlight || '')) errors.push(`[${key}] 趋势 ${co.name} 蹭概念描述`);
  });

  const vNames = (sec.vanguard?.companies || []).map((c) => c.name);
  const cNames = (sec.center?.companies || []).map((c) => c.name);
  const overlap = vNames.filter((n) => cNames.includes(n));
  if (overlap.length) errors.push(`[${key}] 情绪/趋势重复: ${overlap.join(', ')}`);
});

// searchSector 抽样
['先进封装', '半导体', 'Chiplet', '低空经济'].forEach((q) => {
  const s = searchSector(q);
  if (!s || s.name !== searchIndustry(q)?.name) {
    errors.push(`searchSector("${q}") 映射失败`);
  }
});

// 产业链（长鑫存储、先进封装）不得含科创板
['长鑫存储', '先进封装'].forEach((key) => {
  chainSet(key).forEach((name) => {
    if (isStarBoard(name)) errors.push(`[产业链 ${key}] 含科创板: ${name}`);
  });
});

console.log('=== 板块龙头复验 ===');
console.log('板块数:', sectorKeys.length);
let totalV = 0;
let totalC = 0;
sectorKeys.forEach((k) => {
  totalV += SECTOR_DATA[k].vanguard.companies.length;
  totalC += SECTOR_DATA[k].center.companies.length;
});
console.log('情绪龙头:', totalV, '趋势龙头:', totalC);

if (errors.length) {
  console.log('\nFAIL (' + errors.length + '):');
  errors.forEach((e) => console.log(' -', e));
  process.exit(1);
}
console.log('\nPASS 全部校验通过（龙头+长鑫/先进封装产业链均无科创板）');
