/**
 * 商业航天市场规模参考榜复验（10 个拆分赛道）
 * 运行: node scripts/verify-order-rank-aerospace2026.js
 */
const fs = require('fs');
const vm = require('vm');
const path = require('path');
const { ORDER_RANKINGS } = require('./build-order-rank-aerospace2026');

const root = path.join(__dirname, '..');
const chainCode = fs.readFileSync(path.join(root, 'data.js'), 'utf8')
  .replace(/\bconst INDUSTRY_DATA\b/, 'var INDUSTRY_DATA');
const rankCode = fs.readFileSync(path.join(root, 'data', 'order-rank-aerospace2026.js'), 'utf8');
const sandbox = {};
vm.runInNewContext(
  rankCode + '\n' + chainCode + '\nexports={ORDER_RANK_REGISTRY_AEROSPACE2026,INDUSTRY_DATA};',
  sandbox
);

const registry = sandbox.exports.ORDER_RANK_REGISTRY_AEROSPACE2026;
const chain = sandbox.exports.INDUSTRY_DATA['商业航天'];
const chainNames = new Set();
['upstream', 'midstream', 'downstream'].forEach((t) => {
  (chain[t] || []).forEach((seg) => (seg.companies || []).forEach((c) => chainNames.add(c.name)));
});

const errors = [];
const warnings = [];

if (!chain) errors.push('缺少 INDUSTRY_DATA.商业航天');
if (!registry || Object.keys(registry).length !== 10) {
  errors.push('ORDER_RANK_REGISTRY_AEROSPACE2026 应为 10 个赛道');
}

ORDER_RANKINGS.forEach(({ key, ENTRIES, payload }) => {
  const data = registry[key];
  if (!data) {
    errors.push(`注册表缺少赛道: ${key}`);
    return;
  }
  if (data.companies.length !== 10) errors.push(`${key}: 公司数量应为10`);
  if (!data.subtitle || !data.subtitle.includes('非企业统一在手订单')) {
    errors.push(`${key}: subtitle 应说明非统一在手订单口径`);
  }

  const byRank = [...data.companies].sort((a, b) => a.rank - b.rank);
  for (let i = 0; i < byRank.length - 1; i++) {
    if (byRank[i].verify.amount < byRank[i + 1].verify.amount) {
      errors.push(`${key} 排序错误: ${byRank[i].name}(${byRank[i].verify.amount}亿) < ${byRank[i + 1].name}`);
    }
  }

  ENTRIES.forEach((src) => {
    const row = data.companies.find((c) => c.rank === src.rank);
    if (!row) errors.push(`${key} 缺少 rank=${src.rank}`);
    else if (row.name !== src.name) errors.push(`${key} rank${src.rank} 名称应为 ${src.name}`);
    else if (row.verify.amount !== src.amount) errors.push(`${key} ${src.name} 金额应为 ${src.amount}亿`);
  });

  byRank.forEach((co) => {
    if (!chainNames.has(co.name)) warnings.push(`${key}: 不在商业航天产业链节点 ${co.name}`);
    if (co.verify.sourceType !== 'derived') {
      errors.push(`${key}/${co.name}: sourceType 应为 derived`);
    }
    if (co.verify.sourceUrl) {
      errors.push(`${key}/${co.name}: 不应使用外部媒体链接作为订单来源`);
    }
    if ((co.orderLabel || '').includes('在手/预计订单')) {
      errors.push(`${key}/${co.name}: orderLabel 不应使用在手订单表述`);
    }
    if ((co.verify.note || '').includes('媒体报道口径：媒体报道口径')) {
      errors.push(`${key}/${co.name}: note 存在重复前缀`);
    }
  });
});

console.log('=== 商业航天市场规模参考榜复验 ===');
console.log('赛道数:', Object.keys(registry || {}).length);
if (warnings.length) {
  console.log('\nWARN:');
  warnings.slice(0, 10).forEach((w) => console.log(' -', w));
  if (warnings.length > 10) console.log(` - ...共 ${warnings.length} 条`);
}
if (errors.length) {
  console.log('\nFAIL:');
  errors.forEach((e) => console.log(' -', e));
  process.exit(1);
}
console.log('\nPASS');
