/**
 * 存储芯片产业链强相关复验
 * 运行: node scripts/verify-storage-chip-chain.js
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

const KEY = '存储芯片';
const STRONG = /存储|DRAM|NAND|NOR|闪存|Flash|模组|封测|沛顿|长鑫|颗粒|主控|覆铜板|封装基板|载板|FC-BGA|HBM|嵌入式存储/i;
const WEAK = /啤酒|白酒|仅概念|蹭概念|光伏(?!.*存储)|锂电池(?!.*存储)|面板|显示/i;

const ind = sandbox.exports.INDUSTRY_DATA[KEY];
const sec = sandbox.exports.SECTOR_DATA[KEY];
const errors = [];

if (!ind) errors.push('缺少产业链 INDUSTRY_DATA.存储芯片');
if (!sec) errors.push('缺少板块龙头 SECTOR_DATA.存储芯片（请运行 sector-data 或手动维护）');

const chain = new Set();
if (ind) {
  ['upstream', 'midstream', 'downstream'].forEach((t) => {
    (ind[t] || []).forEach((seg) => {
      (seg.companies || []).forEach((co) => {
        chain.add(co.name);
        if (!STRONG.test(co.highlight)) errors.push(`产业链弱相关: ${co.name} — ${co.highlight}`);
        if (WEAK.test(co.highlight)) errors.push(`产业链蹭概念/偏离: ${co.name} — ${co.highlight}`);
        if (isStarBoard(co.name)) errors.push(`产业链含科创板: ${co.name}`);
      });
    });
  });
}

if (sec) {
  [...sec.vanguard.companies, ...sec.center.companies].forEach((co) => {
    if (!chain.has(co.name)) errors.push(`龙头不在产业链: ${co.name}`);
    if (isStarBoard(co.name)) errors.push(`龙头为科创板: ${co.name}`);
    if (!STRONG.test(co.highlight)) errors.push(`龙头弱相关: ${co.name}`);
  });
}

['存储芯片', 'NAND', '闪存'].forEach((query) => {
  if (sandbox.exports.searchIndustry(query)?.name !== KEY) {
    errors.push(`searchIndustry(${query}) 应指向 存储芯片`);
  }
});

console.log('=== 存储芯片产业链强相关复验 ===');
console.log('产业链公司数:', chain.size);
if (chain.size) console.log('公司列表:', [...chain].join('、'));
if (sec) {
  console.log('情绪龙头:', sec.vanguard.companies.map((c) => c.name).join(', '));
  console.log('趋势中军:', sec.center.companies.map((c) => c.name).join(', '));
}

if (errors.length) {
  console.log('\nFAIL:');
  errors.forEach((e) => console.log(' -', e));
  process.exit(1);
}
console.log('\nPASS');
