/**
 * MLCC 产业链强相关复验
 * 运行: node scripts/verify-mlcc-chain.js
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

const KEY = 'MLCC';
/** highlight 须体现 MLCC/瓷介电容/介质粉/镍粉/离型膜等强相关表述 */
const STRONG = /MLCC|片式多层陶瓷电容|多层陶瓷电容|瓷介电容|陶瓷电容|介质粉|陶瓷粉|镍粉|内电极|离型膜|载带|被动元件.*电容|电容.*被动|瓷介|陶瓷电容器/i;
const WEAK = /PCB|连接器|覆铜板|硅烷|片式电感|电感龙头|啤酒|白酒|仅概念|蹭概念|光伏|锂电池(?!.*MLCC)/i;

const ind = sandbox.exports.INDUSTRY_DATA[KEY];
const sec = sandbox.exports.SECTOR_DATA[KEY];
const errors = [];

if (!ind) errors.push('缺少产业链 INDUSTRY_DATA.MLCC');
if (!sec) errors.push('缺少板块龙头 SECTOR_DATA.MLCC');

const chain = new Set();
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

[...sec.vanguard.companies, ...sec.center.companies].forEach((co) => {
  if (!chain.has(co.name)) errors.push(`龙头不在产业链: ${co.name}`);
  if (isStarBoard(co.name)) errors.push(`龙头为科创板: ${co.name}`);
  if (!STRONG.test(co.highlight)) errors.push(`龙头弱相关: ${co.name}`);
});

['MLCC', 'mlcc', '陶瓷电容', '片式电容', '多层陶瓷电容'].forEach((query) => {
  if (sandbox.exports.searchIndustry(query)?.name !== KEY) {
    errors.push(`searchIndustry(${query}) 应指向 MLCC`);
  }
  if (sandbox.exports.searchSector(query)?.name !== KEY) {
    errors.push(`searchSector(${query}) 应指向 MLCC`);
  }
});

console.log('=== MLCC 产业链强相关复验 ===');
console.log('产业链公司数:', chain.size);
console.log('公司列表:', [...chain].join('、'));
console.log('情绪龙头:', sec.vanguard.companies.map((c) => c.name).join(', '));
console.log('趋势龙头:', sec.center.companies.map((c) => c.name).join(', '));

if (errors.length) {
  console.log('\nFAIL:');
  errors.forEach((e) => console.log(' -', e));
  process.exit(1);
}
console.log('\nPASS：强相关表述 + 龙头在链 + 非科创 + 关键词映射');
