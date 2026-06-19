/**
 * 订单排行榜文案合规扫描（与产能榜 capacity-rank-compliance.js 规则对齐）
 * 运行: node scripts/scan-order-rank-compliance.js
 */
const fs = require('fs');
const path = require('path');
const { INVESTMENT_FORBIDDEN_RE } = require('./capacity-rank-compliance');

const EXTRA_RULES = [
  { re: /市占第一|产能第一|销量[^，。]{0,8}第一|全球第一|国内第一/, label: '绝对化排名表述' },
  { re: /锁定.*业绩|高股息|超级周期/, label: '投资暗示/炒作词汇' },
  { re: /暴涨|必涨|涨停|跌停|推荐买入|抄底|加仓|目标价|投资价值|牛股|妖股/, label: '荐股/行情暗示' },
  { re: /最(好|强|大|优|佳)/, label: '广告法绝对化用语' },
];

const FIELD_RES = [
  { name: 'title', re: /["']?title["']?\s*:\s*['"]([^'"]+)['"]/ },
  { name: 'subtitle', re: /["']?subtitle["']?\s*:\s*['"]([^'"]+)['"]/ },
  { name: 'highlight', re: /["']?highlight["']?\s*:\s*['"]([^'"]+)['"]/g, multi: true },
  { name: 'verify.source', re: /"source":\s*"([^"]+)"/g, multi: true },
];

function scanFile(filePath) {
  const text = fs.readFileSync(filePath, 'utf8');
  const key = (text.match(/key:\s*['"]([^'"]+)['"]/) || [])[1] || path.basename(filePath);
  const hits = [];

  for (const field of FIELD_RES) {
    if (field.multi) {
      let m;
      let i = 0;
      while ((m = field.re.exec(text)) !== null) {
        i += 1;
        check(field.name + '#' + i, m[1], hits);
      }
    } else {
      const m = text.match(field.re);
      if (m) check(field.name, m[1], hits);
    }
  }

  return { key, file: path.basename(filePath), hits };
}

function check(field, val, hits) {
  if (!val) return;
  const base = val.match(INVESTMENT_FORBIDDEN_RE);
  if (base) {
    hits.push({ field, text: val, rule: '投资暗示词（龙头/核心供应商/第一/选股等）', match: base[0] });
  }
  for (const rule of EXTRA_RULES) {
    const m = val.match(rule.re);
    if (m) hits.push({ field, text: val, rule: rule.label, match: m[0] });
  }
}

const dataDir = path.join(__dirname, '..', 'data');
const files = fs.readdirSync(dataDir).filter((f) => /^order-rank-.*2026\.js$/.test(f)).sort();

let total = 0;
const report = [];

for (const f of files) {
  const r = scanFile(path.join(dataDir, f));
  if (r.hits.length) {
    total += r.hits.length;
    report.push(r);
  }
}

console.log('=== 订单排行榜合规扫描 ===');
console.log(`扫描文件: ${files.length} 个`);
console.log(`命中条目: ${total} 处`);
console.log('');

if (!report.length) {
  console.log('PASS — 未发现违规表述');
  process.exit(0);
}

for (const r of report) {
  console.log(`\n【${r.key}】 ${r.file}`);
  for (const h of r.hits) {
    console.log(`  - [${h.rule}] ${h.field} → 「${h.match}」`);
    console.log(`    ${h.text}`);
  }
}

process.exit(1);
