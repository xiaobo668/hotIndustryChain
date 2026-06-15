/**
 * 光纤概念2026 — 产业链数据源
 * 运行: node scripts/build-fiber-concept2026.js
 */
const fs = require('fs');
const path = require('path');

const CHAIN = {
  key: '光纤概念',
  name: '光纤概念',
  color: '#0891b2',
  gradient: ['#06b6d4', '#0e7490'],
  description:
    '光纤概念覆盖 AI 算力拉动的光纤光缆全产业链：光棒/石英材料 → 缆料辅材 → 光纤光缆制造 → 特种/算力光缆 → 运营商集采出海 → 海缆/算力场景落地。' +
    '2026年行业特征：AI光纤需求高增、头部产线满产、空芯光纤商用加速。口径：剔除科创板(688/689)；仅供产业链学习，不构成投资建议。',
  upstream: [
    {
      segment: 'preform-quartz',
      name: '光棒/石英材料',
      companies: [
        { name: '长飞光纤', highlight: '全球光棒产能第一，预制棒自给率高，空芯光纤技术领先' },
        { name: '亨通光电', highlight: '光棒自给90%+，AI光纤批量出海，运营商集采份额领先' },
        { name: '菲利华', highlight: '石英材料/石英棒，光棒上游高纯石英玻璃与半导体配套' },
        { name: '石英股份', highlight: '高纯石英砂龙头，光棒/光伏/半导体石英材料核心供应商' },
      ],
      replaced: [],
    },
    {
      segment: 'cable-materials',
      name: '光纤辅材/缆料',
      companies: [
        { name: '万马股份', highlight: '高分子缆料/绝缘材料，光纤光缆护套与电力缆料配套' },
        { name: '金发科技', highlight: '改性塑料龙头，光缆护套/通信材料供应' },
        { name: '道恩股份', highlight: '热塑性弹性体与改性材料，光缆护套辅材' },
      ],
      replaced: [],
    },
  ],
  midstream: [
    {
      segment: 'fiber-cable',
      name: '光纤光缆制造',
      companies: [
        { name: '长飞光纤', highlight: '全球光纤光缆龙头，AI高端光纤占比提升，海外订单超40%' },
        { name: '亨通光电', highlight: '光纤+海缆双龙头，AI光纤出海与运营商集采核心' },
        { name: '中天科技', highlight: '光纤光缆+海缆+特种电缆，算力配套光缆高增' },
        { name: '烽火通信', highlight: '央企光通信全产业链，光纤制造+设备+光芯片' },
        { name: '通鼎互联', highlight: '光纤光缆+特种光缆，运营商集采中标份额领先' },
      ],
      replaced: [],
    },
    {
      segment: 'specialty-cable',
      name: '特种/算力光缆',
      companies: [
        { name: '永鼎股份', highlight: '特种光缆+光纤+光模块，算力光互联与海外供应链' },
        { name: '通光线缆', highlight: '电力特种光缆/OPGW龙头，算电协同与特高压配套' },
        { name: '特发信息', highlight: '东数西算/算力配套支线光缆，区域算力网络供应商' },
        { name: '汇源通信', highlight: '光缆制造+通信工程，光纤概念链工程配套' },
        { name: '华脉科技', highlight: '通信网络物理连接，光缆/配线/机柜算力机房配套' },
      ],
      replaced: [],
    },
  ],
  downstream: [
    {
      segment: 'operator-export',
      name: '运营商集采/海外出海',
      companies: [
        { name: '长飞光纤', highlight: '移动/电信/联通集采核心中标，海外国家级项目落地' },
        { name: '亨通光电', highlight: '海外算力网订单放量，AI光纤批量出口欧美/东南亚' },
        { name: '中天科技', highlight: '海外订单占比45%+，海缆+光缆出海双轮' },
        { name: '烽火通信', highlight: '运营商集采+东数西算传输设备，央企出海通道' },
      ],
      replaced: [],
    },
    {
      segment: 'submarine-compute',
      name: '海缆/算力场景落地',
      companies: [
        { name: '中天科技', highlight: '海洋系列在手订单约121亿元，海缆交付高峰2026' },
        { name: '亨通光电', highlight: '海底光缆+能源互联，海缆订单约75亿元量级' },
        { name: '永鼎股份', highlight: '算力光缆+1.6T光模块，数据中心互联落地' },
        { name: '特发信息', highlight: '智慧城市/算力网络工程，光缆项目落地能力突出' },
      ],
      replaced: [],
    },
  ],
};

function toIndustryDataEntry(chain) {
  const mapSeg = (seg) => ({
    name: seg.name,
    companies: seg.companies.map(({ name, highlight }) => ({ name, highlight })),
  });
  return {
    name: chain.name,
    color: chain.color,
    gradient: chain.gradient,
    description: chain.description,
    upstream: chain.upstream.map(mapSeg),
    midstream: chain.midstream.map(mapSeg),
    downstream: chain.downstream.map(mapSeg),
  };
}

const outDir = path.join(__dirname, '..', 'data');
const payload = {
  key: CHAIN.key,
  title: CHAIN.name,
  generatedAt: '2026-06',
  segmentCount: 6,
  issuesFixed: [],
  chain: toIndustryDataEntry(CHAIN),
};

fs.writeFileSync(path.join(outDir, 'fiber-concept2026.json'), JSON.stringify(payload, null, 2), 'utf8');
const js = `/** 光纤概念2026 — 由 scripts/build-fiber-concept2026.js 生成 */\nconst FIBER_CONCEPT2026 = ${JSON.stringify(payload, null, 2)};\n`;
fs.writeFileSync(path.join(outDir, 'fiber-concept2026.js'), js, 'utf8');

console.log('OK -> data/fiber-concept2026.json');
const { writeWechatArticle } = require('./lib/wechat-article');
writeWechatArticle({
  slug: 'fiber-concept2026',
  title: '光纤概念2026',
  generatedAt: '2026-06',
  chain: CHAIN,
  summary: CHAIN.description,
  tags: ['光纤概念', 'AI算力', '光缆'],
});
console.log('OK -> docs/wechat/fiber-concept2026.md（公众号文稿，完整版请运行 build-all-analysis-docs.js）');

module.exports = { CHAIN, toIndustryDataEntry, payload };
