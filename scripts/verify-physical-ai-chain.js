/**
 * 物理AI（具身智能 / Physical AI）产业链强相关复验
 * 运行: node scripts/verify-physical-ai-chain.js
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

const KEY = '物理AI';
/** highlight 须体现物理AI/具身/感知-执行闭环等强相关表述 */
const STRONG = /物理AI|Physical\s*AI|具身|人形机器人|四足|运动控制|伺服|谐波|减速器|空心杯|力传感|六维力|触觉|3D视觉|机器视觉|仿真|数字孪生|世界模型|关节|灵巧手|执行器|AMR|AGV|机器人本体|具身大脑|具身小脑|端侧AI|力控|轨迹规划|Physical/i;
const WEAK = /仅概念|蹭概念|白酒|啤酒|光伏|纯游戏|影视|锂电池材料(?!.*机器人)|PCB(?!.*机器人)/i;

const ind = sandbox.exports.INDUSTRY_DATA[KEY];
const sec = sandbox.exports.SECTOR_DATA[KEY];
const errors = [];
const warnings = [];

if (!ind) errors.push('缺少产业链 INDUSTRY_DATA.物理AI');
if (!sec) errors.push('缺少板块龙头 SECTOR_DATA.物理AI');

const chain = new Set();
['upstream', 'midstream', 'downstream'].forEach((t) => {
  (ind[t] || []).forEach((seg) => {
    (seg.companies || []).forEach((co) => {
      chain.add(co.name);
      if (!STRONG.test(co.highlight)) errors.push(`产业链弱相关: ${co.name} — ${co.highlight}`);
      if (WEAK.test(co.highlight)) errors.push(`产业链蹭概念/偏离: ${co.name} — ${co.highlight}`);
    });
  });
});

[...sec.vanguard.companies, ...sec.center.companies].forEach((co) => {
  if (!chain.has(co.name)) errors.push(`龙头不在产业链: ${co.name}`);
  if (isStarBoard(co.name)) errors.push(`龙头为科创板: ${co.name}`);
  if (!STRONG.test(co.highlight)) errors.push(`龙头弱相关: ${co.name} — ${co.highlight}`);
});

['物理AI', 'Physical AI', '具身智能', '具身', 'embodied', '具身小脑', '世界模型'].forEach((query) => {
  if (sandbox.exports.searchIndustry(query)?.name !== KEY) {
    errors.push(`searchIndustry(${query}) 应指向 物理AI`);
  }
  if (sandbox.exports.searchSector(query)?.name !== KEY) {
    errors.push(`searchSector(${query}) 应指向 物理AI`);
  }
});

// 科创板可出现在产业链节点，但需登记
['upstream', 'midstream', 'downstream'].forEach((t) => {
  (ind[t] || []).forEach((seg) => {
    (seg.companies || []).forEach((co) => {
      if (isStarBoard(co.name)) warnings.push(`产业链含科创板（仅节点，非龙头）: ${co.name}`);
    });
  });
});

console.log('=== 物理AI 产业链强相关复验 ===');
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
console.log('\nPASS：强相关表述 + 龙头在链 + 非科创龙头 + 关键词映射');
