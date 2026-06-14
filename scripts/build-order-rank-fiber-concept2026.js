/**
 * 2026 光纤概念订单规模排行 Top10（公开来源登记 + 生成 JS/JSON）
 * 运行: node scripts/build-order-rank-fiber-concept2026.js
 *
 * 口径说明：
 * - 1-6：财经媒体/行业梳理的2026年在手或预计订单（光纤光缆为主，部分含海缆/设备）
 * - 7-8：媒体估算订单（特种光缆/电力光缆）
 * - 9-10：2025年报营收作规模参考（未单独披露在手订单）
 */
const fs = require('fs');
const path = require('path');

/** 金额单位：亿元；sourceType: official=公告/年报 | media=财经媒体报道 */
const ENTRIES = [
  {
    rank: 1, name: '中天科技', amount: 130, orderLabel: '在手订单超130亿元',
    highlight: '海缆+算力光缆双主线，海外订单占45%+，2026海缆交付高峰',
    sourceType: 'media', source: '东方财富·2026头部光纤企业已锁定订单梳理', sourceDate: '2026-03-28',
    sourceUrl: 'https://caifuhao.eastmoney.com/news/20260328062919113448760',
    note: '媒体报道口径（光纤+海缆+电力缆）；纯光纤光缆约70–90亿；公司2026年3月末披露在手订单总额308亿元（含电网/海洋等）',
    officialCross: { field: 'totalOrders', min: 308, ref: '新浪财经2026-06-07：截至2026年3月末公司在手订单共308亿元' },
  },
  {
    rank: 2, name: '长飞光纤', amount: 120, orderLabel: '在手订单超120亿元',
    highlight: '全球光棒产能第一，空芯光纤商用领先，AI高端光纤占比约40%',
    sourceType: 'media', source: '东方财富·2026头部光纤企业已锁定订单 + 新浪·光纤光缆订单TOP10', sourceDate: '2026-03-28',
    sourceUrl: 'https://caifuhao.eastmoney.com/news/20260328062919113448760',
    note: '媒体报道口径，纯光纤光缆为主；订单排期国内至2027、海外至2028；2025三季报合同负债约65亿元',
    officialCross: { field: 'contractLiability', exact: 65, ref: '新浪TOP10：2025三季报合同负债约65亿元（口径小于媒体120亿估算）' },
  },
  {
    rank: 3, name: '亨通光电', amount: 100, orderLabel: '光纤光缆订单超100亿元',
    highlight: '光棒自给90%+，AI光纤批量出海，运营商集采份额领先',
    sourceType: 'media', source: '东方财富·2026头部光纤企业已锁定订单', sourceDate: '2026-03-28',
    sourceUrl: 'https://caifuhao.eastmoney.com/news/20260328062919113448760',
    note: '媒体报道口径为光纤+海缆约100亿；同文亦引综合业务近300亿口径，本榜取光纤光缆主线100亿排序',
  },
  {
    rank: 4, name: '烽火通信', amount: 80, orderLabel: '在手订单超80亿元',
    highlight: '央企光通信全产业链，光芯片自主可控，算力传输设备+光缆',
    sourceType: 'media', source: '东方财富·2026头部光纤企业已锁定订单 + 新浪·光纤光缆订单TOP10', sourceDate: '2026-03-28',
    sourceUrl: 'https://caifuhao.eastmoney.com/news/20260328062919113448760',
    note: '媒体报道口径含通信设备/光芯片；纯光纤光缆约50–60亿；2025三季报合同负债约75亿元',
    officialCross: { field: 'contractLiability', exact: 75, ref: '新浪TOP10：2025三季报合同负债约75亿元' },
  },
  {
    rank: 5, name: '通鼎互联', amount: 70, orderLabel: '在手订单超70亿元',
    highlight: '特种光缆集采龙头，运营商中标份额领先，产能充足',
    sourceType: 'media', source: '东方财富·2026头部光纤企业已锁定订单', sourceDate: '2026-03-28',
    sourceUrl: 'https://caifuhao.eastmoney.com/news/20260328062919113448760',
    note: '媒体报道口径，以特种光缆、运营商集采为主；2025三季报合同负债约35亿元',
    officialCross: { field: 'contractLiability', exact: 35, ref: '新浪TOP10：2025三季报合同负债约35亿元' },
  },
  {
    rank: 6, name: '永鼎股份', amount: 60, orderLabel: '在手订单超60亿元',
    highlight: '光纤+1.6T光模块双驱动，算力光缆与海外算力供应链切入',
    sourceType: 'media', source: '东方财富·2026头部光纤企业已锁定订单', sourceDate: '2026-03-28',
    sourceUrl: 'https://caifuhao.eastmoney.com/news/20260328062919113448760',
    note: '媒体报道口径含光纤与光模块；2025三季报合同负债约28亿元',
    officialCross: { field: 'contractLiability', exact: 28, ref: '新浪TOP10：2025三季报合同负债约28亿元' },
  },
  {
    rank: 7, name: '特发信息', amount: 45, orderLabel: '在手订单超45亿元',
    highlight: '东数西算/算力配套支线光缆，区域算力网络核心供应商',
    sourceType: 'media', source: '东方财富·2026头部光纤企业已锁定订单', sourceDate: '2026-03-28',
    sourceUrl: 'https://caifuhao.eastmoney.com/news/20260328062919113448760',
    note: '媒体报道口径；2025三季报合同负债约20亿元',
    officialCross: { field: 'contractLiability', exact: 20, ref: '新浪TOP10：2025三季报合同负债约20亿元' },
  },
  {
    rank: 8, name: '通光线缆', amount: 40, orderLabel: '在手订单超40亿元',
    highlight: '电力特种光缆/OPGW龙头，特高压与算电协同工程深度配套',
    sourceType: 'media', source: '东方财富·2026头部光纤企业已锁定订单', sourceDate: '2026-03-28',
    sourceUrl: 'https://caifuhao.eastmoney.com/news/20260328062919113448760',
    note: '媒体报道口径；2025三季报合同负债约15亿元',
    officialCross: { field: 'contractLiability', exact: 15, ref: '新浪TOP10：2025三季报合同负债约15亿元' },
  },
  {
    rank: 9, name: '华脉科技', amount: 8.16, orderLabel: '2025年营收8.16亿元',
    highlight: '通信网络物理连接设备，光缆/配线/机柜等算力机房配套',
    sourceType: 'official', source: '华脉科技2025年年度报告', sourceDate: '2025全年',
    sourceUrl: 'http://money.finance.sina.com.cn/corp/view/vCB_AllBulletinDetail.php?id=12120332&stockid=603042',
    note: '未披露在手订单金额；以2025年报营收作光纤概念链规模参考',
  },
  {
    rank: 10, name: '汇源通信', amount: 5.13, orderLabel: '2025年营收5.13亿元',
    highlight: '光缆及通信工程施工，光纤概念链中小市值配套标的',
    sourceType: 'official', source: '汇源通信2025年年度报告', sourceDate: '2025全年',
    sourceUrl: 'https://money.finance.sina.com.cn/corp/view/vCB_AllBulletinDetail.php?id=12132149&stockid=000586',
    note: '未披露在手订单金额；以2025年报营收作规模参考排序末位',
  },
];

const payload = {
  key: '光纤概念',
  title: '2026年光纤概念订单规模前10家公司',
  subtitle: '1-6：公开报道2026年光纤/海缆/特种光缆在手或预计订单；7-8：媒体估算订单；9-10：2025年报营收作规模参考',
  generatedAt: '2026-06',
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
    },
  })),
};

const outDir = path.join(__dirname, '..', 'data');
const js = `/** 2026 光纤概念订单规模排行 · 由 scripts/build-order-rank-fiber-concept2026.js 生成 */\nvar ORDER_RANK_FIBER_CONCEPT2026 = ${JSON.stringify(payload, null, 2)};\nif (typeof window !== 'undefined') window.ORDER_RANK_FIBER_CONCEPT2026 = ORDER_RANK_FIBER_CONCEPT2026;\n`;
fs.writeFileSync(path.join(outDir, 'order-rank-fiber-concept2026.js'), js, 'utf8');
fs.writeFileSync(path.join(outDir, 'order-rank-fiber-concept2026.json'), JSON.stringify(payload, null, 2), 'utf8');
console.log('OK 写入 order-rank-fiber-concept2026.js / .json 共', payload.companies.length, '家');
console.log('提示: 运行 node scripts/build-all-analysis-docs.js 生成/更新分析过程文档');

module.exports = { ENTRIES, payload };
