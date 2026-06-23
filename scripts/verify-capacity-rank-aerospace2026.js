/**
 * 2026 商业航天板块产能排行榜复验（10 个赛道）
 * 运行: node scripts/verify-capacity-rank-aerospace2026.js
 */
const fs = require('fs');
const vm = require('vm');
const path = require('path');
const { RANKINGS } = require('./build-capacity-rank-aerospace2026');
const { isStarBoard } = require('./star-board-names');
const { INVESTMENT_FORBIDDEN_RE } = require('./capacity-rank-compliance');

const root = path.join(__dirname, '..');
const chainCode = fs.readFileSync(path.join(root, 'data.js'), 'utf8')
  .replace(/\bconst INDUSTRY_DATA\b/, 'var INDUSTRY_DATA');
const rankCode = fs.readFileSync(
  path.join(root, 'data', 'capacity-rank-aerospace2026.js'),
  'utf8'
);
const sandbox = {};
vm.runInNewContext(
  rankCode + '\n' + chainCode + '\nexports={INDUSTRY_DATA,CAPACITY_RANK_REGISTRY_AEROSPACE2026};',
  sandbox
);

const INDUSTRY_DATA = sandbox.exports.INDUSTRY_DATA;
const REGISTRY = sandbox.exports.CAPACITY_RANK_REGISTRY_AEROSPACE2026;

const STRONG_BY_KEY = {
  火箭发动机: /发动机|推进|火箭|涡轮|燃烧室|推力|增材|高温合金/i,
  箭体结构: /箭体|结构|紧固|贮箱|锻件|复合材料|火箭/i,
  卫星制造: /卫星|星载|总装|组网|遥感|宇航/i,
  火箭制造: /火箭|运载|发射|固体|液体|箭体/i,
  卫星通信: /卫星|通信|天线|终端|基带|射频|宽带/i,
  卫星姿态控制: /姿态|星敏感|惯性|姿控|导航|测控/i,
  星座运营: /星座|在轨|运营|遥感|通信|数据/i,
  太空算力: /算力|在轨|遥感|数据|云计算|PFlops|处理/i,
  航天材料: /钛合金|高温合金|碳纤维|复合材料|航天|材料/i,
  航天测控: /测控|雷达|终端|地面站|遥测|跟踪/i,
};

const WEAK_RELATED = [];

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
    if (!row.verify.sourceUrl && row.verify.sourceType === 'media') {
      errors.push(`${meta.key}: ${src.name} 缺少 sourceUrl`);
    }
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

console.log('=== 2026 商业航天板块产能排行榜复验 ===\n');
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
