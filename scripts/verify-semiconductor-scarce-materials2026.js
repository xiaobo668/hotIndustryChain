/**
 * 半导体12大稀缺材料 — 产业链复验
 * 运行: node scripts/verify-semiconductor-scarce-materials2026.js
 */
const fs = require('fs');
const vm = require('vm');
const path = require('path');
const { CHAIN, payload } = require('./build-semiconductor-scarce-materials2026');
const { isStarBoard } = require('./star-board-names');

const root = path.join(__dirname, '..');
const code = fs.readFileSync(path.join(root, 'data.js'), 'utf8')
  .replace(/\bconst INDUSTRY_DATA\b/, 'var INDUSTRY_DATA')
  .replace(/\bconst KEYWORD_MAP\b/, 'var KEYWORD_MAP')
  + fs.readFileSync(path.join(root, 'sector-data.js'), 'utf8')
    .replace(/\bconst SECTOR_DATA\b/, 'var SECTOR_DATA');
const sandbox = { exports: {} };
vm.runInNewContext(code + '\nexports={INDUSTRY_DATA,SECTOR_DATA,searchIndustry,searchSector};', sandbox);

const KEY = CHAIN.key;
const errors = [];
const warnings = [];
const ind = sandbox.exports.INDUSTRY_DATA[KEY];
const sec = sandbox.exports.SECTOR_DATA[KEY];

const STRONG = {
  '① 磷化铟衬底': /磷化铟|InP|砷化镓|锗|铟|化合物半导体|光通信.*衬底/i,
  '② 光刻胶': /光刻胶|KrF|ArF|G线|I线|树脂|感光/i,
  '③ 碳化硅': /碳化硅|SiC|衬底|外延|长晶|800V|功率模块/i,
  '④ ABF载板/上游': /ABF|载板|封装基板|IC载板|覆铜板|CCL|高速树脂/i,
  '⑤ 钽电容': /钽电容|钽粉|钽/i,
  '⑥ 高端PCB载板': /PCB|算力|服务器|HDI|高层数|AI.*板/i,
  '⑦ 电子级硫酸': /硫酸|湿电子|清洗|蚀刻|氢氟酸|显影|TMAH/i,
  '⑧ MLCC电容': /MLCC|瓷介电容|介质粉|陶瓷电容|被动元件/i,
  '⑨ 铜箔': /铜箔/i,
  '⑩ 电子布': /电子布|电子纱|玻纤|Low.?DK|玻璃纤维/i,
  '⑪ 半导体钽靶材': /靶材|溅射|钽靶|PVD/i,
  '⑫ 高纯氦气': /氦|特气|电子气|工业气体|空分/i,
};

const BAD_ORIGINAL = [
  '锡业股份', '天岳先进', '金钼股份', '洛阳钼业', '兴福电子', '中巨芯',
  '华特气体', '正帆科技', '嘉元科技', '金宏气体', '生益电子',
];

if (!ind) errors.push(`缺少 INDUSTRY_DATA.${KEY}`);
if (!sec) errors.push(`缺少 SECTOR_DATA.${KEY}`);

const chainNames = new Set();
const segments = [];
['upstream', 'midstream', 'downstream'].forEach((tier) => {
  (ind[tier] || []).forEach((seg) => {
    segments.push(seg.name);
    (seg.companies || []).forEach((co) => {
      chainNames.add(co.name);
      const re = STRONG[seg.name];
      if (re && !re.test(co.highlight)) {
        errors.push(`弱相关: [${seg.name}] ${co.name} — ${co.highlight}`);
      }
      if (isStarBoard(co.name)) errors.push(`含科创板: ${co.name}`);
      if (BAD_ORIGINAL.includes(co.name)) {
        errors.push(`原图错配标的未替换: ${co.name}`);
      }
    });
  });
});

if (segments.length !== 12) errors.push(`产业链节点应为12个，实际${segments.length}`);

payload.issuesFixed.forEach((fix) => {
  const hit = [...chainNames].some((n) => fix.replace && n === fix.replace);
  if (!hit) warnings.push(`修正项未落地: ${fix.bad} -> ${fix.replace}`);
});

[...sec.vanguard.companies, ...sec.center.companies].forEach((co) => {
  if (!chainNames.has(co.name)) errors.push(`龙头不在产业链: ${co.name}`);
  if (isStarBoard(co.name)) errors.push(`龙头为科创板: ${co.name}`);
});

['半导体稀缺材料', '稀缺材料', '磷化铟', '光刻胶', 'ABF载板', '钽靶材', '高纯氦气'].forEach((q) => {
  const r = sandbox.exports.searchIndustry(q);
  if (!r || r.name !== CHAIN.name) errors.push(`searchIndustry(${q}) 应指向 ${CHAIN.name}`);
});

console.log('=== 半导体12大稀缺材料 复验 ===');
console.log('节点:', segments.join(' | '));
console.log('公司数:', chainNames.size);
console.log('原图修正:', payload.issuesFixed.length, '处');
if (payload.issuesFixed.length) {
  console.log('\n已修正:');
  payload.issuesFixed.forEach((f) => console.log(` - [${f.segment}] ${f.bad} → ${f.replace} (${f.reason})`));
}
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
