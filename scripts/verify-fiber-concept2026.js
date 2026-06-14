/**
 * 光纤概念2026 — 产业链复验
 * 运行: node scripts/verify-fiber-concept2026.js
 */
const fs = require('fs');
const vm = require('vm');
const path = require('path');
const { CHAIN } = require('./build-fiber-concept2026');
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
  '光棒/石英材料': /光棒|预制棒|石英|光纤材料|高纯/i,
  '光纤辅材/缆料': /缆料|护套|塑料|材料|改性/i,
  '光纤光缆制造': /光纤|光缆|光棒|海缆|集采/i,
  '特种/算力光缆': /特种光缆|算力|OPGW|东数西算|光缆|工程/i,
  '运营商集采/海外出海': /集采|海外|出海|运营商|出口/i,
  '海缆/算力场景落地': /海缆|算力|数据中心|海洋|工程/i,
};

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
    });
  });
});

if (segments.length !== 6) errors.push(`产业链节点应为6个，实际${segments.length}`);

[...sec.vanguard.companies, ...sec.center.companies].forEach((co) => {
  if (!chainNames.has(co.name)) errors.push(`龙头不在产业链: ${co.name}`);
  if (isStarBoard(co.name)) errors.push(`龙头为科创板: ${co.name}`);
});

['光纤概念', '光线概念', '光纤', '光纤光缆', '空芯光纤', '光缆'].forEach((q) => {
  const r = sandbox.exports.searchIndustry(q);
  if (!r || r.name !== CHAIN.name) errors.push(`searchIndustry(${q}) 应指向 ${CHAIN.name}`);
});

// 订单榜 Top8 应在产业链中
try {
  const rankCode = fs.readFileSync(path.join(root, 'data', 'order-rank-fiber-concept2026.js'), 'utf8');
  const rankBox = {};
  vm.runInNewContext(rankCode + '\nexports={ORDER_RANK_FIBER_CONCEPT2026};', rankBox);
  rankBox.exports.ORDER_RANK_FIBER_CONCEPT2026.companies
    .filter((c) => c.rank <= 8)
    .forEach((c) => {
      if (!chainNames.has(c.name)) warnings.push(`订单榜Top8 ${c.name} 不在产业链节点`);
    });
} catch (e) {
  warnings.push('未读取订单榜交叉校验: ' + e.message);
}

console.log('=== 光纤概念2026 产业链复验 ===');
console.log('节点:', segments.join(' | '));
console.log('公司数:', chainNames.size);
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
