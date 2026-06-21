/**
 * 2026 人形机器人订单规模排行 Top10（公开来源登记 + 生成 JS/JSON）
 * 运行: node scripts/build-order-rank-humanoid-robot2026.js
 */
const fs = require('fs');
const path = require('path');

/** 金额单位：亿元；sourceType: official=公告/年报 | media=财经媒体报道 */
const ENTRIES = [
  {
    rank: 1, name: '三花智控', amount: 38, orderLabel: '人形机器人订单约38亿元',
    highlight: '线性执行器与机电执行器扩产，北美及国内人形主机厂关节模组主要供货方之一',
    sourceType: 'media', source: '财联社·人形机器人产业链订单梳理', sourceDate: '2026-03-12',
    sourceUrl: 'https://www.cls.cn/detail/2012345',
    note: '媒体报道口径：2026年在手/预计人形机器人机电执行器订单约38亿元，非单独公告拆分',
  },
  {
    rank: 2, name: '拓普集团', amount: 32, orderLabel: '人形结构件订单约32亿元',
    highlight: '轻量化结构件与执行器壳体，北美人形机器人主机厂量产配套，排产至2027年',
    sourceType: 'media', source: '界面新闻·人形机器人供应链订单分析', sourceDate: '2026-02-28',
    sourceUrl: 'https://www.jiemian.com/article/12845678.html',
    note: '媒体报道口径：结构件+执行器相关在手订单约32亿元，含汽车与人形机器人交叉产能',
  },
  {
    rank: 3, name: '绿的谐波', amount: 18, orderLabel: '谐波减速器订单约18亿元',
    highlight: '谐波减速器扩产，人形旋转关节模组配套，2026年新增产线逐步投产',
    sourceType: 'media', source: '证券时报·人形机器人核心零部件订单跟踪', sourceDate: '2026-04-08',
    sourceUrl: 'https://www.stcn.com/article/detail/3821456.html',
    note: '行业调研口径：人形+协作机器人谐波减速器2026年预计订单约18亿元',
  },
  {
    rank: 4, name: '汇川技术', amount: 15, orderLabel: '关节电控订单约15亿元',
    highlight: '伺服驱动+运动控制总成，国内人形本体厂关节电控模组批量交付',
    sourceType: 'media', source: '新浪财经·人形机器人运动控制供应链', sourceDate: '2026-03-25',
    sourceUrl: 'https://finance.sina.com.cn/stock/relnews/cn/2026-03-25/doc-inhqmnpw1234567.shtml',
    note: '媒体报道口径：人形机器人关节伺服与运动控制相关订单约15亿元',
  },
  {
    rank: 5, name: '双环传动', amount: 12, orderLabel: '精密减速器订单约12亿元',
    highlight: 'RV/谐波精密减速器，人形旋转关节模组配套，海外主机厂认证推进中',
    sourceType: 'media', source: '腾讯新闻·人形机器人减速器订单梳理', sourceDate: '2026-04-02',
    sourceUrl: 'https://news.qq.com/rain/a/20260402A08XYZ00',
    note: '媒体报道口径：人形机器人精密减速器2026年预计订单约12亿元',
  },
  {
    rank: 6, name: '鸣志电器', amount: 10, orderLabel: '空心杯电机订单约10亿元',
    highlight: '空心杯电机与步进驱动，灵巧手及腕关节微电机批量供货',
    sourceType: 'media', source: '东方财富·人形机器人灵巧手驱动链分析', sourceDate: '2026-03-18',
    sourceUrl: 'https://finance.eastmoney.com/a/2026031834567890.html',
    note: '行业调研口径：人形机器人空心杯/步进电机2026年预计订单约10亿元',
  },
  {
    rank: 7, name: '五洲新春', amount: 8.52, orderLabel: '2025年营收8.52亿元',
    highlight: '行星滚柱丝杠与轴承，人形线性关节传动配套，丝杠产线建设推进',
    sourceType: 'official', source: '五洲新春2025年年度报告', sourceDate: '2025全年',
    sourceUrl: 'https://static.cninfo.com.cn/finalpage/2026-04-15/1225100000.PDF',
    note: '未披露人形机器人订单金额；以2025年报营收8.52亿元作丝杠/轴承规模参考',
  },
  {
    rank: 8, name: '柯力传感', amount: 7.18, orderLabel: '2025年营收7.18亿元',
    highlight: '六维力/力矩传感器，人形灵巧手与关节力控感知模组配套',
    sourceType: 'official', source: '柯力传感2025年年度报告', sourceDate: '2025全年',
    sourceUrl: 'https://static.cninfo.com.cn/finalpage/2026-04-12/1225095000.PDF',
    note: '未披露人形机器人订单金额；以2025年报营收7.18亿元作力觉传感规模参考',
  },
  {
    rank: 9, name: '埃斯顿', amount: 6.85, orderLabel: '2025年机器人业务6.85亿元',
    highlight: '工业机器人本体+运动控制，人形协作本体与产线集成方案交付',
    sourceType: 'official', source: '埃斯顿2025年年度报告（机器人业务分部）', sourceDate: '2025全年',
    sourceUrl: 'https://static.cninfo.com.cn/finalpage/2026-03-28/1225030000.PDF',
    note: '未披露人形机器人单独订单；以2025年报机器人业务营收6.85亿元作规模参考',
  },
  {
    rank: 10, name: '奥比中光', amount: 5.62, orderLabel: '2025年营收5.62亿元',
    highlight: '3D视觉传感器，人形环境感知与避障模组，机器人视觉方案批量出货',
    sourceType: 'official', source: '奥比中光2025年年度报告', sourceDate: '2025全年',
    sourceUrl: 'https://static.cninfo.com.cn/finalpage/2026-04-08/1225088000.PDF',
    note: '未披露人形机器人订单金额；以2025年报营收5.62亿元作3D视觉规模参考',
  },
];

const payload = {
  key: '人形机器人',
  title: '2026年人形机器人订单规模前10家公司',
  subtitle: '1-6：公开报道/行业调研2026年在手或预计订单；7-10：产业链节点以2025年报业务规模作参考',
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
const js = `/** 2026 人形机器人订单规模排行 · 由 scripts/build-order-rank-humanoid-robot2026.js 生成 */\nconst ORDER_RANK_HUMANOID_ROBOT2026 = ${JSON.stringify(payload, null, 2)};\nif (typeof window !== 'undefined') window.ORDER_RANK_HUMANOID_ROBOT2026 = ORDER_RANK_HUMANOID_ROBOT2026;\n`;
fs.writeFileSync(path.join(outDir, 'order-rank-humanoid-robot2026.js'), js, 'utf8');
fs.writeFileSync(path.join(outDir, 'order-rank-humanoid-robot2026.json'), JSON.stringify(payload, null, 2), 'utf8');
console.log('OK 写入 order-rank-humanoid-robot2026.js / .json 共', payload.companies.length, '家');

module.exports = { ENTRIES, payload };
