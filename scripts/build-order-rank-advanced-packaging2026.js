/**
 * 2026 先进封装订单规模排行 Top10（公开来源登记 + 生成 JS/JSON）
 * 运行: node scripts/build-order-rank-advanced-packaging2026.js
 */
const fs = require('fs');
const path = require('path');

/** 金额单位：亿元；sourceType: official=公告/年报 | media=财经媒体报道 */
const ENTRIES = [
  {
    rank: 1, name: '长电科技', amount: 320, orderLabel: '在手订单超320亿元',
    highlight: '全球OSAT前三，XDFOI 2.5D/Chiplet/HBM，排产至2028年Q2',
    sourceType: 'media', source: '新浪财经·国产存储芯片订单TOP10', sourceDate: '2026-03-22',
    sourceUrl: 'https://www.sina.cn/news/detail/5279374451409005.html',
    officialCross: { field: 'amount', min: 90, max: 160, ref: '东方财富2026-05-21行业测算在手订单90-160亿元' },
    note: '存储/先进封测链报道口径；与行业测算90-160亿存在差异，见 officialCross',
  },
  {
    rank: 2, name: '深南电路', amount: 220, orderLabel: '在手订单超220亿元',
    highlight: '存储配套封装基板龙头，FC-BGA载板直供OSAT，排至2028年Q1',
    sourceType: 'media', source: '新浪财经·国产存储芯片订单TOP10', sourceDate: '2026-03-22',
    sourceUrl: 'https://www.sina.cn/news/detail/5279374451409005.html',
    note: '口径为存储配套封装基板在手订单',
  },
  {
    rank: 3, name: '江波龙', amount: 130, orderLabel: '在手订单超130亿元',
    highlight: '存储模组龙头，先进封装产能释放带动国产颗粒导入，排至2027年Q2',
    sourceType: 'media', source: '新浪财经·国产存储芯片订单TOP10', sourceDate: '2026-03-22',
    sourceUrl: 'https://www.sina.cn/news/detail/5279374451409005.html',
  },
  {
    rank: 4, name: '沪电股份', amount: 120, orderLabel: '订单超120亿元',
    highlight: '算力板+封装基板双线，高端产品订单排至2027年Q1',
    sourceType: 'media', source: '东方财富·高景气赛道龙头订单梳理（PCB/载板）', sourceDate: '2026-04-14',
    sourceUrl: 'https://caifuhao.eastmoney.com/news/20260414055352939223580',
    note: '口径为2026年高端PCB及载板预计订单，含封装基板配套',
    officialCross: { field: 'amount', min: 120, ref: '2026年4月初高端PCB在手订单超120亿元' },
  },
  {
    rank: 5, name: '佰维存储', amount: 90, orderLabel: '在手订单超90亿元',
    highlight: '国产先进封测+存储一体化，16nm闪存良率超96%，排至2027年Q1',
    sourceType: 'media', source: '新浪财经·存储芯片订单排到2028年', sourceDate: '2026-05-04',
    sourceUrl: 'https://www.sina.cn/news/detail/5294860913082613.html',
    note: '科创板标的，先进封测业务明确；不在本项目先进封装产业链节点清单',
  },
  {
    rank: 6, name: '兴森科技', amount: 78, orderLabel: '订单约78亿元',
    highlight: 'IC载板+FCBGA量产爬坡，CSP满产，Chiplet互连载板产能扩张',
    sourceType: 'media', source: '东方财富·高景气赛道龙头订单梳理', sourceDate: '2026-04-14',
    sourceUrl: 'https://caifuhao.eastmoney.com/news/20260414055352939223580',
    note: '口径为2026年IC载板及高端PCB订单预计',
  },
  {
    rank: 7, name: '通富微电', amount: 279.21, orderLabel: '2025年营收279.21亿元',
    highlight: 'AMD主力封测伙伴，Chiplet/2.5D先进封装，2026年营收目标323亿元',
    sourceType: 'official', source: '通富微电2025年年度报告', sourceDate: '2025全年',
    sourceUrl: 'https://static.cninfo.com.cn/finalpage/2026-04-29/1225256789.PDF',
    note: '未披露在手订单；投资者关系活动记录表仅披露2026年营收目标323亿元，此处以2025年报营收作规模参考排序',
  },
  {
    rank: 8, name: '华天科技', amount: 172.14, orderLabel: '2025年营收172.14亿元',
    highlight: '2.5D/3D、Fan-out规模封测，南京存储封测基地扩产，2026年营收目标200亿元',
    sourceType: 'official', source: '华天科技2025年年度报告', sourceDate: '2025全年',
    sourceUrl: 'http://money.finance.sina.com.cn/corp/view/vCB_AllBulletinDetail.php?id=12239945&stockid=002185',
    note: '未披露在手订单；2026年营业收入目标200亿元为经营计划，非在手订单',
  },
  {
    rank: 9, name: '深科技', amount: 41, orderLabel: '半导体业务约41亿元',
    highlight: '沛顿存储封测满产，绑定长鑫/长江存储，2026年追加14.7亿扩产',
    sourceType: 'media', source: '新浪财经·深科技14.7亿加码高端封测产能', sourceDate: '2026-05-28',
    sourceUrl: 'https://finance.sina.com.cn/roll/2026-05-28/doc-inhzmayt1136737.shtml',
    note: '无在手订单金额披露；以2025年半导体业务规模约41亿元作参考',
  },
  {
    rank: 10, name: '晶方科技', amount: 14.74, orderLabel: '2025年营收14.74亿元',
    highlight: 'CIS晶圆级封装WLCSP龙头，车用CIS WLP/TSV订单放量',
    sourceType: 'official', source: '晶方科技2025年年度报告', sourceDate: '2025全年',
    sourceUrl: 'http://static.cninfo.com.cn/finalpage/2026-02-28/1224989090.PDF',
    note: '未披露在手订单；以2025年报营收14.74亿元作规模参考排序末位',
  },
];

const payload = {
  key: '先进封装',
  title: '2026年先进封装订单规模前10家公司',
  subtitle: '1-6：公开报道2026年在手/预计订单（封测+载板）；7-10：产业链OSAT/特色封测，以2025年报营收或业务规模参考（未披露在手订单）',
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
const js = `/** 2026 先进封装订单规模排行 · 由 scripts/build-order-rank-advanced-packaging2026.js 生成 */\nconst ORDER_RANK_ADVANCED_PACKAGING2026 = ${JSON.stringify(payload, null, 2)};\n`;
fs.writeFileSync(path.join(outDir, 'order-rank-advanced-packaging2026.js'), js, 'utf8');
fs.writeFileSync(path.join(outDir, 'order-rank-advanced-packaging2026.json'), JSON.stringify(payload, null, 2), 'utf8');
console.log('OK 写入 order-rank-advanced-packaging2026.js / .json 共', payload.companies.length, '家');

module.exports = { ENTRIES, payload };
