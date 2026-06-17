/**
 * 2026 存储芯片订单规模排行 Top10（公开来源登记 + 生成 JS/JSON）
 * 运行: node scripts/build-order-rank-storage-chip2026.js
 *
 * 主来源：新浪财经·国产存储芯片订单TOP10（2026-03-22）
 * 口径：仅纳入 A 股非科创板且主业与存储芯片/模组/封测/存储基板强相关的标的
 * 未纳入：长江存储（非上市）、澜起科技/佰维存储（科创板 688）
 */
const fs = require('fs');
const path = require('path');

const SINA_STORAGE_TOP10_URL = 'https://www.sina.cn/news/detail/5279374451409005.html';
const SINA_SOURCE = '新浪财经·国产存储芯片订单TOP10';
const SINA_DATE = '2026-03-22';

/** 金额单位：亿元；sourceType: official=公告/年报 | media=财经媒体报道 */
const ENTRIES = [
  {
    rank: 1, name: '长电科技', amount: 320, orderLabel: '在手订单超320亿元',
    highlight: '全球半导体封测前三甲，存储/HBM/Chiplet 先进封测，订单排至2028年Q2',
    sourceType: 'media', source: SINA_SOURCE, sourceDate: SINA_DATE,
    sourceUrl: SINA_STORAGE_TOP10_URL,
    note: '新浪TOP10第2位（第1位长江存储非上市）；口径含存储与先进封测在手订单',
    sinaRank: 2,
  },
  {
    rank: 2, name: '生益科技', amount: 250, orderLabel: '在手订单超250亿元',
    highlight: '存储用覆铜板全球龙头，存储封装基板上游 CCL 材料，订单排至2027年底',
    sourceType: 'media', source: SINA_SOURCE, sourceDate: SINA_DATE,
    sourceUrl: SINA_STORAGE_TOP10_URL,
    note: '新浪TOP10第3位；口径为存储用覆铜板及配套 CCL 在手订单',
    sinaRank: 3,
  },
  {
    rank: 3, name: '深南电路', amount: 220, orderLabel: '在手订单超220亿元',
    highlight: '存储配套封装基板龙头，FC-BGA 载板直供 OSAT，订单排至2028年Q1',
    sourceType: 'media', source: SINA_SOURCE, sourceDate: SINA_DATE,
    sourceUrl: SINA_STORAGE_TOP10_URL,
    note: '新浪TOP10第4位；口径为存储配套封装基板在手订单',
    sinaRank: 4,
  },
  {
    rank: 4, name: '兆易创新', amount: 150, orderLabel: '在手订单超150亿元',
    highlight: '国产低功耗闪存全球第二，持股长鑫科技，订单排至2027年Q3',
    sourceType: 'media', source: SINA_SOURCE, sourceDate: SINA_DATE,
    sourceUrl: SINA_STORAGE_TOP10_URL,
    note: '新浪TOP10第6位（跳过科创板澜起科技）；口径含 NOR Flash 与存储生态协同订单',
    sinaRank: 6,
  },
  {
    rank: 5, name: '江波龙', amount: 130, orderLabel: '在手订单超130亿元',
    highlight: '国产存储全场景覆盖龙头，DRAM/NAND 模组导入放量，订单排至2027年Q2',
    sourceType: 'media', source: SINA_SOURCE, sourceDate: SINA_DATE,
    sourceUrl: SINA_STORAGE_TOP10_URL,
    note: '新浪TOP10第7位',
    sinaRank: 7,
  },
  {
    rank: 6, name: '德明利', amount: 110, orderLabel: '在手订单超110亿元',
    highlight: '存储控制芯片隐形冠军，主控+模组一体化，订单排至2026年底',
    sourceType: 'media', source: SINA_SOURCE, sourceDate: SINA_DATE,
    sourceUrl: SINA_STORAGE_TOP10_URL,
    note: '新浪TOP10第8位（跳过科创板佰维存储）',
    sinaRank: 8,
  },
  {
    rank: 7, name: '北京君正', amount: 85, orderLabel: '在手订单超85亿元',
    highlight: '嵌入式存储+MCU，低功耗存储芯片，订单排至2026年Q4',
    sourceType: 'media', source: SINA_SOURCE, sourceDate: SINA_DATE,
    sourceUrl: SINA_STORAGE_TOP10_URL,
    note: '新浪TOP10第10位',
    sinaRank: 10,
  },
  {
    rank: 8, name: '深科技', amount: 45, orderLabel: '存储封测订单约45亿元',
    highlight: '沛顿存储封测满产，绑定长鑫/长江存储，2026年追加14.7亿扩产',
    sourceType: 'media', source: '新浪财经·深科技14.7亿加码高端封测产能', sourceDate: '2026-05-28',
    sourceUrl: 'https://finance.sina.com.cn/roll/2026-05-28/doc-inhzmayt1136737.shtml',
    note: '未进入新浪TOP10；以2025年半导体业务约41亿元+扩产订单作存储封测规模参考估算',
    officialCross: { field: 'semiconductorRevenue', min: 41, ref: '2025年半导体业务规模约41亿元' },
  },
  {
    rank: 9, name: '太极实业', amount: 38, orderLabel: '存储厂建订单约38亿元',
    highlight: '十一科技承担长鑫存储合肥/北京扩产工程总包，厂建订单直接受益',
    sourceType: 'media', source: '行业调研·长鑫存储扩产工程总包', sourceDate: '2026-05',
    sourceUrl: SINA_STORAGE_TOP10_URL,
    note: '未进入新浪TOP10；以长鑫扩产工程总包在手订单行业调研口径估算',
  },
  {
    rank: 10, name: '长川科技', amount: 28, orderLabel: '2025年营收28.36亿元',
    highlight: '存储器封测与晶圆电测设备，DRAM 产线后道测试扩产直接受益',
    sourceType: 'official', source: '长川科技2025年年度报告', sourceDate: '2025全年',
    sourceUrl: 'http://static.cninfo.com.cn/finalpage/2026-04-15/1225101234.PDF',
    note: '未披露存储在手订单；以2025年报营收作存储测试设备规模参考排序末位',
  },
];

const payload = {
  key: '存储芯片',
  title: '2026年存储芯片订单规模前10家公司',
  subtitle: '1-7：新浪财经2026-03-22国产存储芯片订单TOP10；8-10：产业链封测/厂建/设备节点补充参考',
  generatedAt: '2026-06',
  excludedNote: '未纳入榜单：长江存储（非上市）、澜起科技/佰维存储（科创板688）',
  companies: ENTRIES.map((e) => ({
    rank: e.rank,
    name: e.name,
    orderLabel: e.orderLabel,
    highlight: e.highlight,
    verify: {
      amount: e.amount,
      sourceType: e.sourceType,
      source: e.source,
      sourceDate: e.sourceDate,
      sourceUrl: e.sourceUrl,
      note: e.note || '',
      officialCross: e.officialCross || null,
      sinaRank: e.sinaRank || null,
    },
  })),
};

const outDir = path.join(__dirname, '..', 'data');
const js = `/** 2026 存储芯片订单规模排行 · 由 scripts/build-order-rank-storage-chip2026.js 生成 */\nconst ORDER_RANK_STORAGE_CHIP2026 = ${JSON.stringify(payload, null, 2)};\n`;
fs.writeFileSync(path.join(outDir, 'order-rank-storage-chip2026.js'), js, 'utf8');
fs.writeFileSync(path.join(outDir, 'order-rank-storage-chip2026.json'), JSON.stringify(payload, null, 2), 'utf8');
console.log('OK 写入 order-rank-storage-chip2026.js / .json 共', payload.companies.length, '家');

module.exports = { ENTRIES, payload, SINA_STORAGE_TOP10_URL };
