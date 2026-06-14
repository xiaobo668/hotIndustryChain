/**
 * 共封装光学（CPO）— 产业链复验
 * 运行: node scripts/verify-cpo2026.js
 */
const fs = require('fs');
const vm = require('vm');
const path = require('path');
const { CHAIN, payload } = require('./build-cpo2026');
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
  '硅光芯片/激光器源': /硅光|激光|DFB|EML|光芯片|III-V|化合物|AWG|分路器/i,
  '光无源器件/FAU': /FAU|无源|MPO|光引擎|光路|连接器|PLC|耦合/i,
  'CPO封装/先进封测': /封测|封装|OSAT|2\.5D|Chiplet|WLP|TGV|共封装/i,
  'CPO光模块/光引擎': /CPO|光模块|1\.6T|800G|硅光|光引擎|共封装/i,
  '封装设备/基板': /设备|耦合|基板|载板|IC载板|ficonTEC|封装设备/i,
  '交换机/算力应用': /交换机|服务器|智算|ODM|组网|算力|光互连/i,
};

const WEAK_NAMES = ['亨通光电', '中天科技', '源杰科技', '仕佳光子', '长光华芯'];

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
      if (WEAK_NAMES.includes(co.name)) {
        errors.push(`错配/科创标的: ${co.name}`);
      }
    });
  });
});

if (segments.length !== 6) errors.push(`产业链节点应为6个，实际${segments.length}`);

payload.issuesFixed.forEach((fix) => {
  const hit = [...chainNames].some((n) => fix.replace && n === fix.replace);
  if (!hit) warnings.push(`修正项未落地: ${fix.bad} -> ${fix.replace}`);
});

[...sec.vanguard.companies, ...sec.center.companies].forEach((co) => {
  if (!chainNames.has(co.name)) errors.push(`龙头不在产业链: ${co.name}`);
  if (isStarBoard(co.name)) errors.push(`龙头为科创板: ${co.name}`);
});

['CPO', 'cpo', '共封装光学', '共封装', '公共光学封装'].forEach((q) => {
  const r = sandbox.exports.searchIndustry(q);
  if (!r || r.name !== CHAIN.name) errors.push(`searchIndustry(${q}) 应指向 ${CHAIN.name}`);
});

console.log('=== 共封装光学（CPO）复验 ===');
console.log('节点:', segments.join(' | '));
console.log('公司数:', chainNames.size);
if (payload.issuesFixed.length) {
  console.log('原图修正:', payload.issuesFixed.length, '处');
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
