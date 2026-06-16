/**
 * 2026 电子布（电子级玻璃纤维布）订单规模排行 Top10
 * 运行: node scripts/build-order-rank-e-glass-fabric2026.js
 */
const fs = require('fs');
const path = require('path');

/** 金额单位：亿元；sourceType: official=公告/年报 | media=财经媒体报道 */
const ENTRIES = [
  {
    rank: 1, name: '中国巨石', amount: 65, orderLabel: '2026年电子布预计订单约65亿元',
    highlight: '全球电子布产能第一，2025年销量10.62亿米；AI服务器PCB拉动薄布/超薄布涨价满产',
    sourceType: 'media', source: '证券时报·中国巨石电子布销量与扩产报道', sourceDate: '2026-03',
    sourceUrl: 'https://egs.stcn.com/news/detail/2254556.html',
    note: '媒体报道口径：基于2025年10.62亿米销量及2026年电子布涨价、扩产满产估算，非单独披露在手订单',
    officialCross: { field: 'volume', ref: '2025年报：电子布销量10.62亿米，玻纤及制品营收183.45亿元' },
  },
  {
    rank: 2, name: '宏和科技', amount: 38, orderLabel: '2026年在手/预计订单约38亿元',
    highlight: '大陆唯一量产4μm/9μm极薄T布，Low-Dk/Low-CTE特种布批量供货，订单能见度至2027',
    sourceType: 'media', source: '证券时报·宏和科技AI电子布与T布龙头分析', sourceDate: '2026-02',
    sourceUrl: 'https://stcn.com/article/detail/3616987.html',
    note: '媒体报道口径：高端电子布零库存、交付周期9-12个月；金额按2026满产与涨价估算',
  },
  {
    rank: 3, name: '中材科技', amount: 32, orderLabel: '2026年特种纤维布预计订单约32亿元',
    highlight: '泰山玻纤旗下，低介电/低膨胀特种纤维布1917万米批量供货，AI电子布全面突破',
    sourceType: 'media', source: '证券时报·中材科技2025年报AI材料分析', sourceDate: '2026-04',
    sourceUrl: 'https://www.stcn.com/article/detail/3687431.html',
    note: '媒体报道口径：特种纤维布为高毛利增量，定增5900万米产能陆续投产',
    officialCross: { field: 'volume', ref: '2025年报：特种纤维布销量1917万米' },
  },
  {
    rank: 4, name: '国际复材', amount: 26, orderLabel: '2026年电子布预计订单约26亿元',
    highlight: 'Low-Dk二代布国内龙头，电子纱名义产能16万吨，2026年有望释放10万吨+',
    sourceType: 'media', source: '长江证券·国际复材公司调研（慧博）', sourceDate: '2026-05',
    sourceUrl: 'http://www.hibor.com.cn/data/d21beecaff40d713afb88c005f61f434.html',
    note: '研报口径：电子布涨价周期中2026-2027年业绩弹性大；非单独披露在手订单',
  },
  {
    rank: 5, name: '山东玻纤', amount: 14, orderLabel: '2026年电子纱/电子布预计订单约14亿元',
    highlight: '玻纤纱线主业，电子纱转产电子布供给紧张，受益CCL/PCB上游涨价周期',
    sourceType: 'media', source: '东方财富·电子布和Q布的投资再分析', sourceDate: '2026-02',
    sourceUrl: 'https://caifuhao.eastmoney.com/news/20260225060715014398830',
    note: '行业梳理口径：电子纱/电子布景气上行，按2026预计订单与产能利用率估算',
  },
  {
    rank: 6, name: '长海股份', amount: 12, orderLabel: '2026年电子布预计订单约12亿元',
    highlight: '玻纤制品+复合材料，电子布与特种玻纤布受益AI算力PCB需求',
    sourceType: 'media', source: '东方财富·电子布和Q布的投资再分析', sourceDate: '2026-02',
    sourceUrl: 'https://caifuhao.eastmoney.com/news/20260225060715014398830',
    note: '行业梳理口径：电子布细分订单随覆铜板涨价预期上修，非单独公告在手订单',
  },
  {
    rank: 7, name: '华正新材', amount: 38.5, orderLabel: '2025年营收38.50亿元',
    highlight: '覆铜板/CCL制造，电子布为核心原材料，受益电子布涨价与AI服务器需求',
    sourceType: 'official', source: '华正新材2025年年度报告', sourceDate: '2025全年',
    sourceUrl: 'https://money.finance.sina.com.cn/corp/view/vCB_AllBulletinDetail.php?stockid=603186',
    note: '覆铜板厂商非电子布制造；以2025年报营收作产业链下游规模参考',
    officialCross: { field: 'revenue', exact: 38.5, ref: '2025年报：营业总收入约38.50亿元' },
  },
  {
    rank: 8, name: '菲利华', amount: 19.5, orderLabel: '2025年营收19.50亿元',
    highlight: '石英纤维/石英布龙头，高端绝缘基材与电子布同属PCB上游增强材料',
    sourceType: 'official', source: '菲利华2025年年度报告', sourceDate: '2025全年',
    sourceUrl: 'https://money.finance.sina.com.cn/corp/view/vCB_AllBulletinDetail.php?stockid=300395',
    note: '主营石英纤维非电子玻璃纤维布；以2025年报营收作规模参考，关联度偏弱',
    officialCross: { field: 'revenue', exact: 19.5, ref: '2025年报：营业总收入约19.50亿元' },
  },
  {
    rank: 9, name: '再升科技', amount: 15.8, orderLabel: '2025年营收15.80亿元',
    highlight: '玻纤微纤维滤材龙头，与电子布同属玻纤材料产业链（非电子布制造主业）',
    sourceType: 'official', source: '再升科技2025年年度报告', sourceDate: '2025全年',
    sourceUrl: 'https://money.finance.sina.com.cn/corp/view/vCB_AllBulletinDetail.php?stockid=603601',
    note: '未披露电子布订单；以2025年报营收作玻纤材料规模参考，关联度偏弱',
    officialCross: { field: 'revenue', exact: 15.8, ref: '2025年报：营业总收入约15.80亿元' },
  },
  {
    rank: 10, name: '正威新材', amount: 11.2, orderLabel: '2025年营收11.20亿元',
    highlight: '玻纤增强复合材料，2025年营收随玻纤行业景气修复',
    sourceType: 'official', source: '正威新材2025年年度报告', sourceDate: '2025全年',
    sourceUrl: 'https://money.finance.sina.com.cn/corp/view/vCB_AllBulletinDetail.php?stockid=002201',
    note: '未披露电子布在手订单；以2025年报营收作玻纤制品规模参考排序末位',
    officialCross: { field: 'revenue', exact: 11.2, ref: '2025年报：营业总收入约11.20亿元' },
  },
];

const payload = {
  key: '电子布',
  title: '2026年电子布订单规模前10家公司',
  subtitle: '1-6：公开报道2026年电子布/电子纱/特种纤维布在手或预计订单；7-10：产业链节点以2025年报营收作规模参考（未披露电子布在手订单）',
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
const js = `/** 2026 电子布订单规模排行 · 由 scripts/build-order-rank-e-glass-fabric2026.js 生成 */\nvar ORDER_RANK_E_GLASS_FABRIC2026 = ${JSON.stringify(payload, null, 2)};\nif (typeof window !== 'undefined') window.ORDER_RANK_E_GLASS_FABRIC2026 = ORDER_RANK_E_GLASS_FABRIC2026;\n`;
fs.writeFileSync(path.join(outDir, 'order-rank-e-glass-fabric2026.js'), js, 'utf8');
fs.writeFileSync(path.join(outDir, 'order-rank-e-glass-fabric2026.json'), JSON.stringify(payload, null, 2), 'utf8');
console.log('OK 写入 order-rank-e-glass-fabric2026.js / .json 共', payload.companies.length, '家');

module.exports = { ENTRIES, payload };
