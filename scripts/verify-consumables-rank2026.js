/**
 * 2026 热门产业链耗材排行榜复验（12 个赛道）
 * 运行: node scripts/verify-consumables-rank2026.js
 */
const fs = require('fs');
const vm = require('vm');
const path = require('path');
const { RANKINGS } = require('./build-consumables-rank2026');
const { isStarBoard } = require('./star-board-names');
const { INVESTMENT_FORBIDDEN_RE } = require('./capacity-rank-compliance');

const root = path.join(__dirname, '..');
const chainCode = fs.readFileSync(path.join(root, 'data.js'), 'utf8')
  .replace(/\bconst INDUSTRY_DATA\b/, 'var INDUSTRY_DATA');
const rankCode = fs.readFileSync(path.join(root, 'data', 'consumables-rank2026.js'), 'utf8');
const sandbox = {};
vm.runInNewContext(
  rankCode + '\n' + chainCode + '\nexports={INDUSTRY_DATA,CONSUMABLES_RANK_REGISTRY2026};',
  sandbox
);

const INDUSTRY_DATA = sandbox.exports.INDUSTRY_DATA;
const REGISTRY = sandbox.exports.CONSUMABLES_RANK_REGISTRY2026;

const STRONG_BY_KEY = {
  光刻胶: /光刻|光刻胶|树脂|显影|KrF|ArF|i线/i,
  电子特气: /特气|气体|前驱体|氟|刻蚀|CVD/i,
  溅射靶材: /靶材|溅射|PVD|薄膜沉积|钽|铝靶/i,
  CMP抛光液: /CMP|抛光|清洗|湿电子|显影|平坦化/i,
  电子浆料: /浆料|电极|MLCC|导电|被动元件/i,
  偏光片: /偏光|光学膜|显示|背光|面板/i,
  电解液: /电解液|锂盐|LiFSI|六氟|溶剂|碳酸酯/i,
  锂电隔膜: /隔膜|涂覆|湿法|干法/i,
  正极材料: /正极|前驱体|LFP|NCM|磷酸铁锂|三元/i,
  导热界面材料: /导热|散热|界面|垫片|均热|热管理/i,
  浸没冷却液: /冷却|液冷|浸没|氟化|工质|制冷/i,
  火工品: /火工|起爆|点火|推进|民爆|固体火箭/i,
};

function chainNamesForKeys(keys) {
  const names = new Set();
  keys.forEach((key) => {
    const chain = INDUSTRY_DATA[key];
    if (!chain) return;
    ['upstream', 'midstream', 'downstream'].forEach((t) => {
      (chain[t] || []).forEach((seg) => (seg.companies || []).forEach((c) => names.add(c.name)));
    });
  });
  return names;
}

function verifyRanking(meta) {
  const errors = [];
  const data = REGISTRY[meta.key];
  const chainNames = chainNamesForKeys(meta.industryKeys);
  const STRONG = STRONG_BY_KEY[meta.key];

  if (!data) {
    errors.push(`缺少榜单数据: ${meta.key}`);
    return { errors };
  }
  if (data.companies.length !== 10) errors.push(`${meta.key}: 公司数量应为10`);
  if (!STRONG) errors.push(`${meta.key}: 缺少 STRONG 规则`);

  const byRank = [...data.companies].sort((a, b) => a.rank - b.rank);
  for (let i = 1; i <= 10; i++) {
    if (!byRank.find((c) => c.rank === i)) errors.push(`${meta.key}: 缺少排名 ${i}`);
  }
  for (let i = 0; i < byRank.length - 1; i++) {
    if (byRank[i].verify.capacity < byRank[i + 1].verify.capacity) {
      errors.push(`${meta.key} 排序错误: ${byRank[i].name} 应高于 ${byRank[i + 1].name}`);
    }
  }

  meta.ENTRIES.forEach((src) => {
    const row = data.companies.find((c) => c.rank === src.rank);
    if (!row) return errors.push(`${meta.key}: 缺少条目 rank=${src.rank}`);
    if (row.name !== src.name) errors.push(`${meta.key}: rank${src.rank} 名称应为 ${src.name}`);
    if (row.verify.capacity !== src.capacity) errors.push(`${meta.key}: ${src.name} 出货量不匹配`);
  });

  byRank.forEach((co) => {
    if (isStarBoard(co.name)) errors.push(`${meta.key}: 含科创板标的 ${co.name}`);
    if (!chainNames.has(co.name)) {
      errors.push(`${meta.key}: 不在产业链节点 ${co.name} (keys: ${meta.industryKeys.join('/')})`);
    }
    if (STRONG && !STRONG.test(co.highlight)) {
      errors.push(`${meta.key}: ${co.name} highlight 缺少强相关表述`);
    }
    if (INVESTMENT_FORBIDDEN_RE.test(co.highlight || '')) {
      errors.push(`${meta.key}: ${co.name} highlight 含投资暗示词汇`);
    }
  });

  if (data.subtitle && INVESTMENT_FORBIDDEN_RE.test(data.subtitle)) {
    errors.push(`${meta.key}: subtitle 含投资暗示词汇`);
  }

  return { errors, byRank };
}

/** 与锂电池产能榜交叉核对（同公司同赛道数值应一致） */
const CAPACITY_CROSS_KEYS = [
  ['正极材料', '正极材料', 'data/capacity-rank-battery2026.js', 'CAPACITY_RANK_REGISTRY_BATTERY2026'],
  ['电解液', '电解液', 'data/capacity-rank-battery2026.js', 'CAPACITY_RANK_REGISTRY_BATTERY2026'],
  ['锂电隔膜', '隔膜', 'data/capacity-rank-battery2026.js', 'CAPACITY_RANK_REGISTRY_BATTERY2026'],
];

function loadCapacityRegistry(file, varName) {
  const code = fs.readFileSync(path.join(root, file), 'utf8');
  const sb = {};
  vm.runInNewContext(code + `\nvar exports={};exports.R=${varName};`, sb);
  return sb.exports.R || {};
}

function verifyCapacityCrossCheck() {
  const errors = [];
  CAPACITY_CROSS_KEYS.forEach(([consKey, capKey, file, varName]) => {
    const cons = REGISTRY[consKey];
    const capReg = loadCapacityRegistry(file, varName);
    const cap = capReg[capKey];
    if (!cons || !cap) return;
    cons.companies.forEach((co) => {
      const capCo = cap.companies.find((c) => c.name === co.name);
      if (!capCo) return;
      if (capCo.verify.capacity !== co.verify.capacity) {
        errors.push(`${consKey}: ${co.name} 出货量 ${co.verify.capacity} 与产能榜 ${capCo.verify.capacity} 不一致`);
      }
    });
  });
  return errors;
}

console.log('=== 2026 热门产业链耗材排行榜复验 ===\n');
let totalErrors = 0;

RANKINGS.forEach((meta) => {
  const { errors, byRank } = verifyRanking(meta);
  console.log(`【${meta.title}】`);
  if (byRank) {
    console.log(' Top3:', byRank.slice(0, 3).map((c) => `${c.name} ${c.capacityLabel}`).join(' | '));
  }
  if (errors.length) {
    errors.forEach((e) => console.log('  FAIL:', e));
    totalErrors += errors.length;
  } else {
    console.log('  PASS');
  }
  console.log('');
});

const crossErrors = verifyCapacityCrossCheck();
if (crossErrors.length) {
  console.log('【与锂电池产能榜交叉核对】');
  crossErrors.forEach((e) => {
    console.log('  FAIL:', e);
    totalErrors += 1;
  });
  console.log('');
}

if (totalErrors) {
  console.log(`合计 ${totalErrors} 项失败`);
  process.exit(1);
}
console.log('全部 12 榜复验通过');
