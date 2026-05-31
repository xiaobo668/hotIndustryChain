/**
 * 2026 PCB 订单规模排行数据（公开来源登记 + 生成 JS/JSON）
 * 运行: node scripts/build-order-rank-pcb2026.js
 */
const fs = require('fs');
const path = require('path');

/** 金额单位：亿元；sourceType: official=公告/问询回复 | media=财经媒体报道 */
const ENTRIES = [
  {
    rank: 1, name: '东山精密', amount: 280, orderLabel: '订单超280亿元',
    highlight: '全球FPC龙头，AI服务器+消费电子+汽车电子多赛道，2026年AI业务或贡献40%营收',
    sourceType: 'media', source: '新浪财经·PCB赛道十大龙头订单超千亿', sourceDate: '2026-03-16',
    sourceUrl: 'https://www.sina.cn/news/detail/5276981690106989.html',
  },
  {
    rank: 2, name: '鹏鼎控股', amount: 135, orderLabel: '订单超135亿元',
    highlight: '全球FPC/HDI龙头，苹果核心供应商，淮安+泰国高阶产能扩张',
    sourceType: 'media', source: '新浪财经·PCB十大龙头订单梳理', sourceDate: '2026-04-09',
    sourceUrl: 'https://www.sina.cn/news/detail/5285721612225912.html',
  },
  {
    rank: 3, name: '生益科技', amount: 130, orderLabel: '订单超130亿元',
    highlight: '全球覆铜板龙头，2026年覆铜板及PCB相关订单景气，M9级材料英伟达认证',
    sourceType: 'media', source: '新浪财经·PCB十大龙头订单梳理', sourceDate: '2026-04-09',
    sourceUrl: 'https://www.sina.cn/news/detail/5285721612225912.html',
    note: '口径含覆铜板及PCB业务订单',
  },
  {
    rank: 4, name: '胜宏科技', amount: 128, orderLabel: '订单超128亿元',
    highlight: 'AI服务器PCB龙头，2026Q1在手订单128亿元同比+85%，排产至2027Q1',
    sourceType: 'media', source: '钛媒体·大摩PCB产业报道（引公司Q1在手订单）', sourceDate: '2026-05',
    sourceUrl: 'https://www.tmtpost.com/8004573.html',
    officialCross: { field: 'amount', min: 128, ref: '2026Q1在手订单128亿元' },
  },
  {
    rank: 5, name: '沪电股份', amount: 120, orderLabel: '订单超120亿元',
    highlight: '高端通信/AI服务器PCB，谷歌TPU算力板核心供应商，泰国基地高利用率',
    sourceType: 'media', source: '新浪财经·PCB十大龙头订单梳理', sourceDate: '2026-04-09',
    sourceUrl: 'https://www.sina.cn/news/detail/5285721612225912.html',
    officialCross: { field: 'amount', min: 120, ref: '2026年4月初高端PCB在手订单超120亿元' },
  },
  {
    rank: 6, name: '深南电路', amount: 110, orderLabel: '订单约110亿元',
    highlight: '内资PCB+封装基板双龙头，广州FC-BGA达产，400G+交换机板占比提升',
    sourceType: 'media', source: '新浪财经·PCB十大龙头订单梳理', sourceDate: '2026-04-09',
    sourceUrl: 'https://www.sina.cn/news/detail/5285721612225912.html',
  },
  {
    rank: 7, name: '景旺电子', amount: 95, orderLabel: '订单约95亿元',
    highlight: '国内汽车PCB龙头，车载高压/高频高速板份额提升，AI服务器板放量',
    sourceType: 'media', source: '新浪财经·PCB十大龙头订单梳理', sourceDate: '2026-04-09',
    sourceUrl: 'https://www.sina.cn/news/detail/5285721612225912.html',
    note: '口径为2026年车载PCB订单金额预计',
  },
  {
    rank: 8, name: '崇达技术', amount: 85, orderLabel: '订单约85亿元',
    highlight: '高端小批量PCB定制龙头，通信/工业/医疗多领域覆盖',
    sourceType: 'media', source: '新浪财经·PCB十大龙头订单梳理', sourceDate: '2026-04-09',
    sourceUrl: 'https://www.sina.cn/news/detail/5285721612225912.html',
  },
  {
    rank: 9, name: '兴森科技', amount: 78, orderLabel: '订单约78亿元',
    highlight: 'PCB样板+IC载板双轮，CSP满产、FCBGA客户认证推进，1.6T光模块板爬坡',
    sourceType: 'media', source: '新浪财经·PCB十大龙头订单梳理', sourceDate: '2026-04-09',
    sourceUrl: 'https://www.sina.cn/news/detail/5285721612225912.html',
    note: '口径为2026年IC载板及高端PCB订单预计',
  },
  {
    rank: 10, name: '超声电子', amount: 65, orderLabel: '订单约65亿元',
    highlight: '覆铜板+PCB综合厂商，高性能HDI扩产10亿元项目推进',
    sourceType: 'media', source: '新浪财经·PCB赛道十大龙头订单超千亿', sourceDate: '2026-03-16',
    sourceUrl: 'https://www.sina.cn/news/detail/5276981690106989.html',
  },
  {
    rank: 11, name: '生益电子', amount: 34.95, orderLabel: '在手订单34.95亿元',
    highlight: 'AI高多层/HDI放量，吉安+东莞算力板项目扩产，泰国基地2026试产',
    sourceType: 'official', source: '生益电子定增审核问询回复', sourceDate: '2026-02末',
    sourceUrl: 'https://www.21jingji.com/article/20260509/herald/99fbeeb4273232a4a847995efd63c08e.html',
    officialCross: { field: 'amount', exact: 34.95, ref: '截至2026年2月末在手订单34.95亿元' },
  },
  {
    rank: 12, name: '奥士康', amount: 8.41, orderLabel: '在手订单8.41亿元',
    highlight: '高多层/HDI扩产84万㎡/年，2025年营收40.32亿元（1-9月）同比+21.89%',
    sourceType: 'official', source: '奥士康可转债审核问询回复', sourceDate: '2025-10末',
    sourceUrl: 'https://vip.stock.finance.sina.com.cn/corp/view/vCB_AllBulletinDetail.php?id=11610628&stockid=002913',
    officialCross: { field: 'amount', exact: 8.41, ref: '截至2025年10月末在手订单8.41亿元' },
  },
  {
    rank: 13, name: '金安国纪', amount: 7, orderLabel: '订单超7亿元',
    highlight: '覆铜板+PCB一体化，产能扩张带动业绩弹性',
    sourceType: 'media', source: '新浪财经·PCB十大龙头订单梳理', sourceDate: '2026-04-09',
    sourceUrl: 'https://www.sina.cn/news/detail/5285721612225912.html',
    note: '媒体估算口径',
  },
  {
    rank: 14, name: '骏亚科技', amount: 2.15, orderLabel: '在手订单约2.15亿元',
    highlight: 'PCB制造为主，2024年末PCB在手订单约2.00亿元，2025Q1营收同比+22%',
    sourceType: 'official', source: '骏亚科技年报问询函回复', sourceDate: '2024-12末',
    sourceUrl: 'http://money.finance.sina.com.cn/corp/view/vCB_AllBulletinDetail.php?id=11224165&stockid=603386',
    note: '全公司在手订单21.54亿元；PCB业务约2.00亿元',
  },
  {
    rank: 15, name: '博敏电子', amount: 1.8, orderLabel: '2025年营收36.12亿元',
    highlight: '400G/800G光模块PCB批量供货，推进1.6T量产，AI算力+汽车电子扭亏',
    sourceType: 'official', source: '博敏电子投资者关系活动记录表', sourceDate: '2025全年',
    sourceUrl: 'https://www.163.com/dy/article/KTI08J5R0539ARRF.html',
    note: '未披露在手订单金额；以2025年营收36.12亿元作规模参考排序末位',
  },
];

const payload = {
  key: 'PCB',
  title: '2026年PCB订单规模前15家公司',
  subtitle: '1-10：公开财经报道2026年订单/预计订单；11+：公司公告在手订单或营收披露（注明日期）',
  generatedAt: '2026-05',
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
const js = `/** 2026 PCB 订单规模排行 · 由 scripts/build-order-rank-pcb2026.js 生成 */\nconst ORDER_RANK_PCB2026 = ${JSON.stringify(payload, null, 2)};\n`;
fs.writeFileSync(path.join(outDir, 'order-rank-pcb2026.js'), js, 'utf8');
fs.writeFileSync(path.join(outDir, 'order-rank-pcb2026.json'), JSON.stringify(payload, null, 2), 'utf8');
console.log('OK 写入 order-rank-pcb2026.js / .json 共', payload.companies.length, '家');

module.exports = { ENTRIES, payload };
