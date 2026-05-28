/**
 * 电力产业链强相关复验
 * 运行: node scripts/verify-power-chain.js
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

const KEY = '电力';
const STRONG = /电力|发电|电网|火电|水电|核电|特高压|输变电|配电|售电|煤电|燃煤|汽轮|变压器|GIS|换流|继电|调度|抽水蓄能|坑口|基荷|外送/i;
const WEAK = /仅概念|蹭概念|白酒|光伏组件|动力电池|锂电池(?!.*储能)/i;

const ind = sandbox.exports.INDUSTRY_DATA[KEY];
const sec = sandbox.exports.SECTOR_DATA[KEY];
const errors = [];

if (!ind) errors.push('缺少产业链');
if (!sec) errors.push('缺少板块龙头');

const chain = new Set();
['upstream', 'midstream', 'downstream'].forEach((t) => {
  (ind[t] || []).forEach((seg) => {
    (seg.companies || []).forEach((co) => {
      chain.add(co.name);
      if (!STRONG.test(co.highlight)) errors.push(`产业链弱相关: ${co.name}`);
      if (WEAK.test(co.highlight)) errors.push(`产业链偏离: ${co.name}`);
      if (isStarBoard(co.name)) errors.push(`产业链含科创板: ${co.name}`);
    });
  });
});

[...sec.vanguard.companies, ...sec.center.companies].forEach((co) => {
  if (!chain.has(co.name)) errors.push(`龙头不在产业链: ${co.name}`);
  if (isStarBoard(co.name)) errors.push(`龙头为科创板: ${co.name}`);
});

['电力', '电网', '特高压', '火电', '水电'].forEach((q) => {
  if (sandbox.exports.searchIndustry(q)?.name !== KEY) errors.push(`searchIndustry(${q}) 失败`);
  if (sandbox.exports.searchSector(q)?.name !== KEY) errors.push(`searchSector(${q}) 失败`);
});

console.log('=== 电力产业链复验 ===');
console.log('公司数:', chain.size);
console.log('情绪龙头:', sec.vanguard.companies.map((c) => c.name).join(', '));
console.log('趋势龙头:', sec.center.companies.map((c) => c.name).join(', '));

if (errors.length) {
  console.log('\nFAIL:');
  errors.forEach((e) => console.log(' -', e));
  process.exit(1);
}
console.log('\nPASS');
