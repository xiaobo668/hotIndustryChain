/**
 * 2026 半导体板块产能排行榜复验（10 个赛道）
 * 运行: node scripts/verify-capacity-rank-semiconductor2026.js
 */
const fs = require('fs');
const vm = require('vm');
const path = require('path');
const { RANKINGS } = require('./build-capacity-rank-semiconductor2026');
const { isStarBoard } = require('./star-board-names');
const { INVESTMENT_FORBIDDEN_RE } = require('./capacity-rank-compliance');

const root = path.join(__dirname, '..');
const chainCode = fs.readFileSync(path.join(root, 'data.js'), 'utf8')
  .replace(/\bconst INDUSTRY_DATA\b/, 'var INDUSTRY_DATA');
const rankCode = fs.readFileSync(
  path.join(root, 'data', 'capacity-rank-semiconductor2026.js'),
  'utf8'
);
const sandbox = {};
vm.runInNewContext(
  rankCode + '\n' + chainCode + '\nexports={INDUSTRY_DATA,CAPACITY_RANK_REGISTRY_SEMICONDUCTOR2026};',
  sandbox
);

const INDUSTRY_DATA = sandbox.exports.INDUSTRY_DATA;
const REGISTRY = sandbox.exports.CAPACITY_RANK_REGISTRY_SEMICONDUCTOR2026;

const STRONG_BY_KEY = {
  晶圆代工: /晶圆|IDM|代工|MEMS|产线|制造/i,
  半导体设备: /设备|刻蚀|CVD|检测|测试|清洗|注入|交付/i,
  封装测试: /封测|封装|OSAT|WLCSP|测试/i,
  半导体材料: /材料|光刻胶|特气|靶材|硅片|化学品|CMP/i,
  CPU芯片: /CPU|MCU|SoC|处理器|存储|嵌入式/i,
  GPU芯片: /GPU|算力|NPU|推理|视觉|FPGA/i,
  模拟芯片: /模拟|电源|信号链|射频|驱动/i,
  功率半导体: /功率|IGBT|MOSFET|模块|SiC/i,
  EDA工具: /EDA|软件|产线|MES|ERP|良率|授权/i,
  传感器芯片: /传感|CIS|MEMS|光学|图像|指纹|触控/i,
};

const WEAK_RELATED = ['王府井', '神州数码', '南极电商'];

const WEAK_BY_KEY = {};

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
  if (data.key !== meta.key) errors.push(`${meta.key}: key 不匹配`);
  if (!STRONG) errors.push(`${meta.key}: 缺少 STRONG 规则`);

  const byRank = [...data.companies].sort((a, b) => a.rank - b.rank);
  for (let i = 1; i <= 10; i++) {
    if (!byRank.find((c) => c.rank === i)) errors.push(`${meta.key}: 缺少排名 ${i}`);
  }

  for (let i = 0; i < byRank.length - 1; i++) {
    const a = byRank[i].verify.capacity;
    const b = byRank[i + 1].verify.capacity;
    if (a < b) {
      errors.push(
        `${meta.key} 排序错误: ${byRank[i].name}(${a}) 应高于 ${byRank[i + 1].name}(${b})`
      );
    }
  }

  meta.ENTRIES.forEach((src) => {
    const row = data.companies.find((c) => c.rank === src.rank);
    if (!row) {
      errors.push(`${meta.key}: 缺少条目 rank=${src.rank}`);
      return;
    }
    if (row.name !== src.name) errors.push(`${meta.key}: rank${src.rank} 名称应为 ${src.name}`);
    if (row.verify.capacity !== src.capacity) {
      errors.push(`${meta.key}: ${src.name} 产能应为 ${src.capacity}`);
    }
    if (row.capacityLabel !== src.capacityLabel) {
      errors.push(`${meta.key}: ${src.name} capacityLabel 不匹配`);
    }
    if (!row.verify.sourceUrl) errors.push(`${meta.key}: ${src.name} 缺少 sourceUrl`);
  });

  byRank.forEach((co) => {
    if (!co.capacityLabel || !co.highlight) errors.push(`${meta.key}: ${co.name} 缺少展示字段`);
    if (isStarBoard(co.name)) errors.push(`${meta.key}: 含科创板标的 ${co.name}`);
    if (!chainNames.has(co.name)) {
      errors.push(`${meta.key}: 不在产业链节点 ${co.name} (keys: ${meta.industryKeys.join('/')})`);
    }
    if (STRONG && !STRONG.test(co.highlight)) {
      errors.push(`${meta.key}: ${co.name} highlight 缺少强相关表述`);
    }
    if (!co.verify.capacityUnit) errors.push(`${meta.key}: ${co.name} 缺少 capacityUnit`);
    if (WEAK_RELATED.includes(co.name) || (WEAK_BY_KEY[meta.key] || []).includes(co.name)) {
      errors.push(`${meta.key}: ${co.name} 为弱关联标的，应替换为强相关公司`);
    }
    if (INVESTMENT_FORBIDDEN_RE.test(co.highlight || '')) {
      errors.push(`${meta.key}: ${co.name} highlight 含投资暗示词汇（龙头/核心供应商等）`);
    }
  });

  if (data.subtitle && INVESTMENT_FORBIDDEN_RE.test(data.subtitle)) {
    errors.push(`${meta.key}: subtitle 含投资暗示词汇`);
  }

  return { errors, byRank };
}

console.log('=== 2026 半导体板块产能排行榜复验 ===\n');
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

if (totalErrors) {
  console.log(`合计 ${totalErrors} 项失败`);
  process.exit(1);
}
console.log('全部 10 榜复验通过');
