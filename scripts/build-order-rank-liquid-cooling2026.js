/**
 * 2026 液冷订单规模排行 Top10（公开来源登记 + 生成 JS/JSON）
 * 运行: node scripts/build-order-rank-liquid-cooling2026.js
 */
const fs = require('fs');
const path = require('path');

/** 金额单位：亿元；sourceType: official=公告/年报 | media=财经媒体报道 */
const ENTRIES = [
  {
    rank: 1, name: '浪潮信息', amount: 80, orderLabel: 'AI服务器订单约80亿元+',
    highlight: '液冷服务器国内市占60%+，2026年4月斩获字节跳动百亿级AI订单，液冷机型占比高',
    sourceType: 'media', source: '新浪财经·液冷服务器企业分析', sourceDate: '2026-04-18',
    sourceUrl: 'https://www.sina.cn/news/detail/5289065918237746.html',
    note: '媒体披露百亿级AI服务器采购，保守记约80亿+；非公司单独披露的液冷订单金额',
  },
  {
    rank: 2, name: '工业富联', amount: 68, orderLabel: '液冷订单约68亿元',
    highlight: '英伟达GB300/GB200液冷机柜独家代工，谷歌/Meta机柜订单排至2028年',
    sourceType: 'media', source: '腾讯新闻·液冷迎来中国时刻（行业订单梳理）', sourceDate: '2026-04-17',
    sourceUrl: 'https://news.qq.com/rain/a/20260417A05VDA00',
    note: '媒体报道口径：英伟达液冷机柜年单+谷歌/Meta合计约68亿元',
  },
  {
    rank: 3, name: '英维克', amount: 45, orderLabel: '液冷订单约45亿元',
    highlight: '全链条液冷龙头，GB300机柜+谷歌TPU CDU+微软Azure，Coolinside累计交付超1.16GW',
    sourceType: 'media', source: '腾讯新闻·液冷迎来中国时刻（行业订单梳理）', sourceDate: '2026-04-17',
    sourceUrl: 'https://news.qq.com/rain/a/20260417A05VDA00',
    note: '媒体报道口径：GB300机柜1200台+谷歌TPU800套+微软Azure500套合计约45亿元',
  },
  {
    rank: 4, name: '申菱环境', amount: 38, orderLabel: '液冷在手订单38亿元',
    highlight: 'CDU国内市占第一，华为昇腾液冷核心供应商，交付排至2026年Q2',
    sourceType: 'media', source: '搜狐·液冷服务器潜力分析（引2025年9月末订单）', sourceDate: '2026-02-15',
    sourceUrl: 'https://www.sohu.com/a/987623997_122341777',
    note: '截至2025年9月末液冷相关在手订单38亿元（总在手60.3亿）；2026年无更新总额披露',
  },
  {
    rank: 5, name: '领益智造', amount: 25, orderLabel: '冷板订单约25亿元',
    highlight: '微通道冷板龙头（子公司立敏达），英伟达/谷歌一级供应商，2026年迈入百万套级',
    sourceType: 'media', source: '腾讯新闻·液冷迎来中国时刻（行业订单梳理）', sourceDate: '2026-04-17',
    sourceUrl: 'https://news.qq.com/rain/a/20260417A05VDA00',
    note: '媒体报道口径：2025年出货10万套、2026年百万套级，冷板订单总额约25亿元',
  },
  {
    rank: 6, name: '巨化股份', amount: 18, orderLabel: '冷却液订单约18亿元',
    highlight: '浸没式氟化液国产龙头，阿里云/腾讯/英伟达供应链，替代3M份额',
    sourceType: 'media', source: '腾讯新闻·液冷迎来中国时刻（行业订单梳理）', sourceDate: '2026-04-17',
    sourceUrl: 'https://news.qq.com/rain/a/20260417A05VDA00',
    note: '媒体报道口径含阿里云、腾讯、英伟达等冷却液采购',
  },
  {
    rank: 7, name: '润泽科技', amount: 25.1, orderLabel: '2025年AIDC业务25.1亿元',
    highlight: '液冷智算园区运营，累计落地高功率液冷机柜约220MW，上架率超90%',
    sourceType: 'official', source: '润泽科技2025年年度报告', sourceDate: '2025全年',
    sourceUrl: 'https://static.cninfo.com.cn/finalpage/2026-04-10/1225090821.PDF',
    note: '未披露液冷订单金额；以2025年AIDC业务营收25.10亿元作液冷智算规模参考',
  },
  {
    rank: 8, name: '高澜股份', amount: 14.98, orderLabel: '全公司在手订单14.98亿元',
    highlight: '冷板+浸没双路线，字节/阿里/腾讯客户，英伟达GB300液冷模组核心供应商',
    sourceType: 'official', source: '高澜股份投资者关系活动记录表', sourceDate: '2026-03-31',
    sourceUrl: 'https://pdf.dfcfw.com/pdf/H2_AN202604291821780835_1.pdf',
    note: '官方披露全公司在手订单，未拆分液冷/电力电子板块；作规模参考排序',
    officialCross: { field: 'amount', exact: 14.98, ref: '截至2026年3月31日在手订单约14.98亿元' },
  },
  {
    rank: 9, name: '飞龙股份', amount: 9.8, orderLabel: '液冷泵订单约9.8亿元',
    highlight: '英伟达认证液冷泵供应商，排产至2026年底，汽车热管理技术跨界数据中心',
    sourceType: 'media', source: '腾讯新闻·液冷迎来中国时刻（行业订单梳理）', sourceDate: '2026-04-17',
    sourceUrl: 'https://news.qq.com/rain/a/20260417A05VDA00',
    note: '媒体报道口径：液冷泵订单总额约9.8亿元，非公司公告拆分披露',
  },
  {
    rank: 10, name: '曙光数创', amount: 8.82, orderLabel: '2025年营收8.82亿元',
    highlight: '浸没相变液冷龙头，2024年液冷温控设备市占55.7%，Q1合同负债1.08亿',
    sourceType: 'official', source: '曙光数创2025年年度报告（引中科曙光年报）', sourceDate: '2025全年',
    sourceUrl: 'https://www.stcn.com/article/detail/3751799.html',
    note: '未披露在手订单总额；以2025年报营收8.82亿元作浸没液冷规模参考',
  },
];

const payload = {
  key: '液冷',
  title: '2026年液冷订单规模前10家公司',
  subtitle: '1-6：公开报道2026年在手或预计订单；7-10：以2025年报营收、官方在手订单或媒体报道订单作规模参考',
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
const js = `/** 2026 液冷订单规模排行 · 由 scripts/build-order-rank-liquid-cooling2026.js 生成 */\nconst ORDER_RANK_LIQUID_COOLING2026 = ${JSON.stringify(payload, null, 2)};\n`;
fs.writeFileSync(path.join(outDir, 'order-rank-liquid-cooling2026.js'), js, 'utf8');
fs.writeFileSync(path.join(outDir, 'order-rank-liquid-cooling2026.json'), JSON.stringify(payload, null, 2), 'utf8');
console.log('OK 写入 order-rank-liquid-cooling2026.js / .json 共', payload.companies.length, '家');

module.exports = { ENTRIES, payload };
