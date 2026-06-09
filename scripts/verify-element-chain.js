/**
 * 元件产业链强相关复验（无源/有源/机电三大类功能分类）
 * 运行: node scripts/verify-element-chain.js
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

const KEY = '元件';
/** 须对应具体元件品类或功能 */
const STRONG = /电阻|电位器|电容|MLCC|铝电解|电感|变压器|磁性元件|晶振|谐振器|时钟|连接器|开关|保险丝|熔断|二极管|整流|三极管|晶体管|MOS|场效应|IGBT|晶闸管|可控硅|模拟IC|运放|电源芯片|MCU|单片机|存储|Flash|传感器|蜂鸣器|喇叭|电机|光耦|光耦|排针|线束|接线|被动|无源|有源|滤波|耦合|隔直|限流|分压|整流|稳压|感知|隔离/i;
const WEAK = /PCB|覆铜板|仅概念|蹭概念|白酒|整车厂|电池包|AI服务器整机|基站设备|代工(?!.*元件)|材料粉体|离型膜|镍粉|介质粉/i;

/** 三大类 + 细分品类应齐全 */
const REQUIRED_SEGMENTS = [
  '电阻/电位器', '电容', '电感', '变压器', '晶振/谐振器', '连接器/开关/保险丝',
  '二极管/整流/LED', '三极管（晶体管）', '场效应管/MOS管', '晶闸管/可控硅',
  '模拟IC（运放/电源）', '数字IC（MCU/存储/逻辑）', '传感器',
  '蜂鸣器/喇叭/电机', '光电耦合器（光耦）', '排针/排母/线束',
];

const ind = sandbox.exports.INDUSTRY_DATA[KEY];
const sec = sandbox.exports.SECTOR_DATA[KEY];
const errors = [];
const warnings = [];

if (!ind) errors.push('缺少产业链 INDUSTRY_DATA.元件');
if (!sec) errors.push('缺少板块龙头 SECTOR_DATA.元件');

const segments = new Set();
const chain = new Set();
['upstream', 'midstream', 'downstream'].forEach((t) => {
  (ind[t] || []).forEach((seg) => {
    segments.add(seg.name);
    if (!seg.companies || seg.companies.length === 0) {
      errors.push(`细分品类无公司: ${seg.name}`);
    }
    (seg.companies || []).forEach((co) => {
      chain.add(co.name);
      if (!STRONG.test(co.highlight)) errors.push(`产业链弱相关: ${co.name} — ${co.highlight}`);
      if (WEAK.test(co.highlight)) errors.push(`产业链偏离元件分类: ${co.name} — ${co.highlight}`);
    });
  });
});

REQUIRED_SEGMENTS.forEach((name) => {
  if (!segments.has(name)) errors.push(`缺少细分品类: ${name}`);
});

[...sec.vanguard.companies, ...sec.center.companies].forEach((co) => {
  if (!chain.has(co.name)) errors.push(`龙头不在产业链: ${co.name}`);
  if (isStarBoard(co.name)) errors.push(`龙头为科创板: ${co.name}`);
  if (!STRONG.test(co.highlight)) errors.push(`龙头弱相关: ${co.name}`);
});

['元件', '电子元件', '无源元件', '有源元件', '被动元件', '电阻', '电容', '电感', '晶振', '连接器', '二极管', 'MOS', '传感器', '光耦'].forEach((query) => {
  if (sandbox.exports.searchIndustry(query)?.name !== KEY) {
    errors.push(`searchIndustry(${query}) 应指向 元件`);
  }
  if (sandbox.exports.searchSector(query)?.name !== KEY) {
    errors.push(`searchSector(${query}) 应指向 元件`);
  }
});

if (sandbox.exports.searchIndustry('PCB')?.name !== 'PCB') {
  errors.push('searchIndustry(PCB) 应指向 PCB 而非 元件');
}

console.log('=== 元件产业链强相关复验 ===');
console.log('分类: 上游无源', (ind.upstream || []).length, '类 | 中游有源', (ind.midstream || []).length, '类 | 下游机电', (ind.downstream || []).length, '类');
console.log('产业链公司数:', chain.size);
console.log('细分品类:', [...segments].join('、'));
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
console.log('\nPASS：三大类细分齐全 + 强相关表述 + 龙头在链 + 关键词映射');
