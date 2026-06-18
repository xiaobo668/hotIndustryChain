/**
 * 2026 产能排行榜复验（16 个赛道）
 * 运行: node scripts/verify-capacity-rank2026.js
 */
const fs = require('fs');
const vm = require('vm');
const path = require('path');
const { RANKINGS } = require('./build-capacity-rank2026');
const { isStarBoard } = require('./star-board-names');

const root = path.join(__dirname, '..');
const chainCode = fs.readFileSync(path.join(root, 'data.js'), 'utf8')
  .replace(/\bconst INDUSTRY_DATA\b/, 'var INDUSTRY_DATA');
const rankCode = fs.readFileSync(path.join(root, 'data', 'capacity-rank2026.js'), 'utf8');
const sandbox = {};
vm.runInNewContext(
  rankCode + '\n' + chainCode + '\nexports={INDUSTRY_DATA,CAPACITY_RANK_REGISTRY2026};',
  sandbox
);

const INDUSTRY_DATA = sandbox.exports.INDUSTRY_DATA;
const REGISTRY = sandbox.exports.CAPACITY_RANK_REGISTRY2026;

const STRONG_BY_KEY = {
  高速光模块: /800G|1\.6T|光模块|硅光|数通|CPO/i,
  光芯片: /DFB|VCSEL|EML|激光|光芯片|硅光|激光器/i,
  光纤预制棒: /光棒|预制棒|光纤|特种光纤|算力/i,
  CPO光引擎: /CPO|光引擎|共封装|硅光|FAU|MPO/i,
  液冷设备: /液冷|冷板|浸没|CDU|散热|温控/i,
  算力服务器: /AI服务器|算力服务器|智算|整机|昇腾|兆瀚|鲲泰|ODM|液冷服务器/i,
  高端电子布: /电子布|Low-Dk|Low-DK|特种.*布|薄布|超薄|T布|玻璃纤维布/i,
  低介电子纱: /电子纱|Low-Dk|低介电|玻纤纱|原丝/i,
  覆铜板: /覆铜板|CCL|高频高速/i,
  ABF载板: /ABF|载板|封装基板|FC-BGA|类载板/i,
  玻纤粗纱: /粗纱|玻纤|原丝|玻璃纤维/i,
  风电纱: /风电纱|风电|叶片|玻纤纱/i,
  MLCC车规算力: /MLCC|车规|算力|高容|瓷介电容/i,
  磷化铟砷化镓衬底: /磷化铟|砷化镓|InP|GaAs|化合物半导体|衬底|外延/i,
  '先进封装2.5D': /2\.5D|3D|Chiplet|先进封装|Fan-out|XDFOI|WLCSP|TSV|FC-BGA|载板/i,
  存储封测: /DRAM|NAND|存储|封测|HBM|沛顿|模组/i,
};

const EXCLUDED_STAR = ['源杰科技', '仕佳光子', '长光华芯', '南亚新材', '佰维存储'];
const WEAK_RELATED = ['菲利华', '再升科技', '正威新材', '国瓷材料', '博迁新材', '洁美科技', '株冶集团', '深南电路', '兴森科技', '晶方科技', '德明利', '北京君正'];
const WEAK_BY_KEY = {
  高速光模块: ['长芯博创', '中兴通讯'],
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
  const warnings = [];
  const data = REGISTRY[meta.key];
  const chainNames = chainNamesForKeys(meta.industryKeys);
  const STRONG = STRONG_BY_KEY[meta.key];

  if (!data) {
    errors.push(`缺少榜单数据: ${meta.key}`);
    return { errors, warnings };
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
    if (EXCLUDED_STAR.includes(co.name)) errors.push(`${meta.key}: 不应纳入 ${co.name}`);
    if (!chainNames.has(co.name)) {
      errors.push(`${meta.key}: 不在产业链节点 ${co.name} (keys: ${meta.industryKeys.join('/')})`);
    }
    if (STRONG && !STRONG.test(co.highlight)) {
      errors.push(`${meta.key}: ${co.name} highlight 缺少强相关表述`);
    }
    if (!co.verify.capacityUnit) errors.push(`${meta.key}: ${co.name} 缺少 capacityUnit`);
    if (WEAK_RELATED.includes(co.name) || (WEAK_BY_KEY[meta.key] || []).includes(co.name)) {
      warnings.push(`${meta.key}: ${co.name} 关联度偏弱或上游配套口径`);
    }
  });

  if (meta.key === '高速光模块') {
    const zjxc = byRank.find((c) => c.name === '中际旭创');
    if (!zjxc || !/总产能|数通光模块/.test(`${zjxc.capacityLabel}${zjxc.highlight}${zjxc.verify.note}`)) {
      errors.push('中际旭创应区分数通光模块总产能与高速型号占比');
    }
    if (zjxc && !/六成|60%|6成/.test(`${zjxc.highlight}${zjxc.verify.note}`)) {
      errors.push('中际旭创应标注800G/1.6T约占六成');
    }
    const cxbc = byRank.find((c) => c.name === '长芯博创');
    if (!cxbc || !/MPO|互连|配套|非.*整机/.test(`${cxbc.highlight}${cxbc.verify.note}`)) {
      errors.push('长芯博创应备注光互连配套器件、非整机光模块产能');
    }
    const zte = byRank.find((c) => c.name === '中兴通讯');
    if (!zte || !/自用|外销/.test(`${zte.highlight}${zte.verify.note}`)) {
      errors.push('中兴通讯应区分自用配套与外销产能');
    }
    const cam = byRank.find((c) => c.name === '剑桥科技');
    if (!cam || cam.verify.capacity !== 350) {
      errors.push('剑桥科技产能应为年报口径350万支/年');
    }
    if (cam && cam.verify.sourceType !== 'official') {
      errors.push('剑桥科技应为 official 口径');
    }
  }

  if (meta.key === '低介电子纱') {
    const cp = byRank.find((c) => c.name === '国际复材');
    if (!cp || cp.verify.capacity !== 16) {
      errors.push('国际复材低介电子纱名义产能应为16万吨/年');
    }
  }

  if (meta.key === '高端电子布') {
    const giant = byRank.find((c) => c.name === '中国巨石');
    if (!giant || giant.verify.capacity < 10.62) {
      errors.push('中国巨石高端电子布产能应不低于2025年销量10.62亿米');
    }
  }

  return { errors, warnings, data, byRank };
}

console.log('=== 2026 产能排行榜复验 ===\n');
let totalErrors = 0;

RANKINGS.forEach((meta) => {
  const { errors, warnings, byRank } = verifyRanking(meta);
  console.log(`【${meta.title}】`);
  if (byRank) {
    console.log(' Top3:', byRank.slice(0, 3).map((c) => `${c.name} ${c.capacityLabel}`).join(' | '));
  }
  if (warnings.length) warnings.forEach((w) => console.log('  WARN:', w));
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
console.log('全部 PASS');
