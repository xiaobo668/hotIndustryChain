/**
 * 汇总生成所有产业链分析过程文档 + 目录页
 * 运行: node scripts/build-all-analysis-docs.js
 */
const { writeAnalysisReport, writeAnalysisIndex } = require('./lib/analysis-report');

const { CHAIN: FIBER_CHAIN } = require('./build-fiber-concept2026');
const { payload: FIBER_ORDER } = require('./build-order-rank-fiber-concept2026');
const { CHAIN: CPO_CHAIN } = require('./build-cpo2026');
const { CHAIN: SCARCE_CHAIN, payload: SCARCE_PAYLOAD } = require('./build-semiconductor-scarce-materials2026');

const SECTOR = {
  光纤概念: {
    vanguard: {
      companies: [
        { name: '通鼎互联', highlight: '特种光缆集采弹性标的，运营商中标催化时率先反应' },
        { name: '特发信息', highlight: '东数西算/算力支线光缆纯度较高，区域算力项目情绪先锋' },
      ],
    },
    center: {
      companies: [
        { name: '长飞光纤', highlight: '全球光纤光缆龙头，空芯光纤+海外集采，趋势中军' },
        { name: '中天科技', highlight: '海缆+光纤光缆双龙头，在手订单行业领先，机构趋势配置' },
        { name: '亨通光电', highlight: '光纤+海缆双龙头，AI光纤出海，趋势核心' },
      ],
    },
  },
  CPO: {
    vanguard: {
      companies: [
        { name: '罗博特科', highlight: 'CPO 光纤耦合封装设备纯度最高，ficonTEC 收购催化强，情绪先锋' },
        { name: '太辰光', highlight: 'MPO/柔性光路弹性标的，CPO 交换机互连预期博弈时率先反应' },
      ],
    },
    center: {
      companies: [
        { name: '天孚通信', highlight: 'FAU/光引擎无源器件龙头，CPO 共封装核心供应商，趋势中军' },
        { name: '中际旭创', highlight: '1.6T/CPO 全球龙头，云厂商共封装光学导入订单可跟踪' },
        { name: '长电科技', highlight: '先进封测 OSAT 龙头，CPO 共封装代工产能与订单兑现' },
      ],
    },
  },
  半导体稀缺材料: {
    vanguard: {
      companies: [
        { name: '凯美特气', highlight: '氦气/特气弹性标的，材料缺口预期下情绪先锋（非科创）' },
        { name: '露笑科技', highlight: 'SiC衬底建设预期博弈强，碳化硅材料情绪端' },
      ],
    },
    center: {
      companies: [
        { name: '南大光电', highlight: 'ArF/KrF光刻胶国产龙头，晶圆厂导入趋势明确' },
        { name: '深南电路', highlight: 'ABF载板+高端PCB双龙头，算力封装基板趋势中军' },
        { name: '风华高科', highlight: 'MLCC制造龙头，AI/车规被动元件紧缺，机构趋势配置' },
      ],
    },
  },
};

const COMMON_METHODOLOGY = [
  '明确主题边界与 A 股口径（剔除科创板 688/689，非上市标的不入链）。',
  '按上/中/下游拆分节点，每节点选取 3–5 家主业强相关公司，撰写 highlight 说明关联逻辑。',
  '对照同花顺/自媒体原图或公开报道，登记错配标的并替换，写入 issuesFixed。',
  '编写 verify-*.js 复验脚本：节点数、弱相关 regex、龙头是否在链、关键词映射。',
  '订单榜（如有）：登记 sourceUrl / sourceType / officialCross，1–6 为媒体订单口径，7–10 为年报营收参考。',
  '运行 build + verify 脚本，PASS 后写入 data.js / sector-data.js 并生成本分析文档。',
];

const entries = [];

entries.push(
  writeAnalysisReport({
    slug: 'fiber-concept2026',
    title: '光纤概念2026',
    generatedAt: '2026-06',
    summary:
      '基于 AI 算力拉动光纤光缆景气周期，梳理光棒材料→制造→特种光缆→集采出海→海缆落地全链，并编制 2026 订单 Top10。订单数据主要来自东方财富/新浪 2026-03 行业梳理，与 2025 三季报合同负债、2025 年报交叉核验。',
    methodology: COMMON_METHODOLOGY,
    chain: FIBER_CHAIN,
    orderRank: FIBER_ORDER,
    sector: SECTOR['光纤概念'],
    verifyScripts: ['verify-fiber-concept2026.js', 'verify-order-rank-fiber-concept2026.js'],
    extraWarnings: [
      '中天科技：媒体 130 亿为光纤+海缆子集，低于公司披露总在手订单 308 亿（2026-03 末）。',
      '亨通光电：本榜取光纤光缆约 100 亿口径，非含海缆/特高压的综合近 300 亿口径。',
      '关键词「光线概念」映射至「光纤概念」。',
    ],
  }).manifestEntry
);

entries.push(
  writeAnalysisReport({
    slug: 'cpo2026',
    title: '共封装光学（CPO）2026',
    generatedAt: '2026-06',
    summary:
      '共封装光学（Co-Packaged Optics）将交换芯片与光引擎封装级集成，是 1.6T/3.2T 智算互连关键方案。产业链按硅光芯片→FAU 无源器件→先进封测→CPO 模块→设备基板→交换机落地六节点梳理。',
    methodology: COMMON_METHODOLOGY.filter((s) => !s.includes('订单榜')),
    chain: CPO_CHAIN,
    sector: SECTOR.CPO,
    verifyScripts: ['verify-cpo2026.js'],
    extraWarnings: ['CPO 关键词已从「光互联」独立成链，与 800G 光模块订单榜区分。'],
  }).manifestEntry
);

entries.push(
  writeAnalysisReport({
    slug: 'semiconductor-scarce-materials2026',
    title: '半导体12大稀缺材料2026',
    generatedAt: '2026-06',
    summary:
      '梳理光刻机产业链之外 12 类半导体关键材料，对照同花顺原图查错替换 15 处（错配/科创板/未上市/代码错误），共 53 家非科创 A 股标的。',
    methodology: COMMON_METHODOLOGY.filter((s) => !s.includes('订单榜')),
    chain: SCARCE_CHAIN,
    sector: SECTOR['半导体稀缺材料'],
    issuesFixed: SCARCE_PAYLOAD.issuesFixed,
    verifyScripts: ['verify-semiconductor-scarce-materials2026.js'],
    extraWarnings: [
      '涨价/缺口描述来自自媒体梳理，未逐条官方核实。',
      '部分替换标的（如株冶集团、东尼电子）关联度偏弱，highlight 中已说明。',
    ],
  }).manifestEntry
);

const manifestPath = writeAnalysisIndex(entries);

console.log('OK 分析文档目录:', manifestPath);
console.log('OK 入口页: analysis.html');
entries.forEach((e) => console.log('  -', e.title, '->', e.html));
