/**
 * 特斯拉FSD入华 强相关复验
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

const KEY = '特斯拉FSD入华';
const STRONG = /FSD|特斯拉|智驾|域控|地图|感知|激光雷达|摄像头|视觉|V2X|NOA|线控|审图|Orin|Tier1|ADAS|APA|定位|合规/;
const WEAK = /仅概念|蹭概念|白酒|光伏|锂电池材料(?!.*智驾)/;

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
      if (WEAK.test(co.highlight)) errors.push(`产业链蹭概念: ${co.name}`);
      if (isStarBoard(co.name)) errors.push(`产业链含科创板: ${co.name}`);
    });
  });
});

[...sec.vanguard.companies, ...sec.center.companies].forEach((co) => {
  if (!chain.has(co.name)) errors.push(`龙头不在产业链: ${co.name}`);
  if (isStarBoard(co.name)) errors.push(`龙头为科创板: ${co.name}`);
});

const q = ['特斯拉FSD入华', 'FSD入华', '特斯拉FSD'];
q.forEach((query) => {
  if (sandbox.exports.searchIndustry(query)?.name !== KEY) errors.push(`searchIndustry(${query}) 失败`);
  if (sandbox.exports.searchSector(query)?.name !== KEY) errors.push(`searchSector(${query}) 失败`);
});

console.log('=== 特斯拉FSD入华 复验 ===');
console.log('产业链公司:', chain.size);
console.log('情绪龙头:', sec.vanguard.companies.map((c) => c.name).join(', '));
console.log('趋势龙头:', sec.center.companies.map((c) => c.name).join(', '));

if (errors.length) {
  console.log('\nFAIL:');
  errors.forEach((e) => console.log(' -', e));
  process.exit(1);
}
console.log('\nPASS 强相关 + 非科创龙头 + 关键词映射');
