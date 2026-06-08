/**
 * 预制算力中心底座产业链强相关复验
 * 运行: node scripts/verify-prefab-computing-base-chain.js
 */
const fs = require('fs');
const vm = require('vm');
const { isStarBoard } = require('./star-board-names');

const root = require('path').join(__dirname, '..');
const code = fs.readFileSync(require('path').join(root, 'data.js'), 'utf8')
  .replace(/\bconst INDUSTRY_DATA\b/, 'var INDUSTRY_DATA')
  .replace(/\bconst KEYWORD_MAP\b/, 'var KEYWORD_MAP')
  + fs.readFileSync(require('path').join(root, 'sector-data.js'), 'utf8')
    .replace(/\bconst SECTOR_DATA\b/, 'var SECTOR_DATA');
const sandbox = { exports: {} };
vm.runInNewContext(code + '\nexports={INDUSTRY_DATA,SECTOR_DATA,searchIndustry,searchSector};', sandbox);

const KEY = '预制算力中心底座';
const STRONG = /预制|模块化|集装箱|算力中心|智算中心|底座|供配电|UPS|液冷|上架|机柜|IDC|智算|EPC|机房|温控|上架率|算力集群|智算园区|算力基建|算力交付|算力集成|AI服务器|交换机|配电|CDU|PUE/i;
const WEAK = /仅概念|蹭概念|白酒|啤酒|光伏组件|纯游戏|影视|世界杯|预制菜/i;

const ind = sandbox.exports.INDUSTRY_DATA[KEY];
const sec = sandbox.exports.SECTOR_DATA[KEY];
const errors = [];
const warnings = [];

if (!ind) errors.push('缺少产业链 INDUSTRY_DATA');
if (!sec) errors.push('缺少板块龙头 SECTOR_DATA');

const chain = new Set();
['upstream', 'midstream', 'downstream'].forEach((t) => {
  (ind[t] || []).forEach((seg) => {
    (seg.companies || []).forEach((co) => {
      chain.add(co.name);
      if (!STRONG.test(co.highlight)) errors.push(`产业链弱相关: ${co.name} — ${co.highlight}`);
      if (WEAK.test(co.highlight)) errors.push(`产业链偏离: ${co.name} — ${co.highlight}`);
    });
  });
});

[...sec.vanguard.companies, ...sec.center.companies].forEach((co) => {
  if (!chain.has(co.name)) errors.push(`龙头不在产业链: ${co.name}`);
  if (isStarBoard(co.name)) errors.push(`龙头为科创板: ${co.name}`);
});

[
  '预制算力中心底座',
  '预制化算力',
  '预制智算底座',
  '模块化智算机房',
  '集装箱智算中心',
].forEach((q) => {
  if (sandbox.exports.searchIndustry(q)?.name !== KEY) errors.push(`searchIndustry(${q}) 失败`);
  if (sandbox.exports.searchSector(q)?.name !== KEY) errors.push(`searchSector(${q}) 失败`);
});

// 算力中心单独检索仍应指向 AIDC（与预制底座区分）
if (sandbox.exports.searchIndustry('算力中心')?.name !== 'AIDC') {
  errors.push('searchIndustry(算力中心) 应仍指向 AIDC');
}

['upstream', 'midstream', 'downstream'].forEach((t) => {
  (ind[t] || []).forEach((seg) => {
    (seg.companies || []).forEach((co) => {
      if (isStarBoard(co.name)) warnings.push(`产业链含科创板（仅节点）: ${co.name}`);
    });
  });
});

console.log('=== 预制算力中心底座产业链复验 ===');
console.log('产业链公司数:', chain.size);
console.log('公司列表:', [...chain].join('、'));
console.log('情绪龙头:', sec.vanguard.companies.map((c) => c.name).join(', '));
console.log('趋势龙头:', sec.center.companies.map((c) => c.name).join(', '));

if (warnings.length) {
  console.log('\nWARN:');
  warnings.forEach((w) => console.log(' -', w));
}

if (errors.length) {
  console.log('\nFAIL:');
  errors.forEach((e) => console.log(' -', e));
  process.exit(1);
}
console.log('\nPASS');
