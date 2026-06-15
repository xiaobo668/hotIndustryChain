/**
 * 共封装光学（CPO）— 产业链数据源
 * 运行: node scripts/build-cpo2026.js
 */
const fs = require('fs');
const path = require('path');

const CHAIN = {
  key: 'CPO',
  name: '共封装光学',
  color: '#7c3aed',
  gradient: ['#8b5cf6', '#6d28d9'],
  description:
    '共封装光学（Co-Packaged Optics/CPO）将交换芯片与光引擎在基板级或封装级共集成，缩短电互连、降低功耗，是 AI 智算 1.6T/3.2T 时代的关键互连方案。' +
    '产业链主线：硅光芯片与激光器 → FAU/MPO 无源器件 → CPO 先进封测 → CPO 光模块/光引擎 → 封装设备与基板 → 交换机/算力落地。' +
    '口径：剔除科创板(688/689)；标的与 CPO/硅光/先进光封装强相关，仅供产业链学习，不构成投资建议。',
  upstream: [
    {
      segment: 'silicon-photonics',
      name: '硅光芯片/激光器源',
      companies: [
        { name: '光迅科技', highlight: '25G/100G DFB/EML 光芯片自研，硅光+CPO 全链条布局' },
        { name: '华工科技', highlight: 'DFB 激光芯片+硅光垂直整合，CPO 光引擎核心能力' },
        { name: '三安光电', highlight: 'III-V 化合物激光器外延，硅光/CPO 上游光源材料' },
        { name: '博创科技', highlight: '硅光分路器/AWG 与 CPO 无源集成器件，数据中心互连' },
      ],
      replaced: [],
    },
    {
      segment: 'passive-optics',
      name: '光无源器件/FAU',
      companies: [
        { name: '天孚通信', highlight: 'FAU/光引擎无源器件龙头，CPO 共封装核心供应商' },
        { name: '太辰光', highlight: 'MPO 连接器与柔性光路，CPO 交换机高密度光互连' },
        { name: '博创科技', highlight: 'PLC 分路器与硅光无源器件，CPO 光路集成配套' },
      ],
      replaced: [],
    },
  ],
  midstream: [
    {
      segment: 'cpo-packaging',
      name: 'CPO封装/先进封测',
      companies: [
        { name: '长电科技', highlight: '2.5D/Chiplet 先进封测龙头，CPO 共封装代工核心 OSAT' },
        { name: '通富微电', highlight: 'AMD 等大客户封测伙伴，先进封装产能绑定 CPO 导入' },
        { name: '晶方科技', highlight: 'WLP/TGV 玻璃基板封装，CPO 近芯片光学封装技术' },
        { name: '华天科技', highlight: '先进封测扩产，Chiplet/CPO 后道封测能力' },
      ],
      replaced: [],
    },
    {
      segment: 'cpo-module',
      name: 'CPO光模块/光引擎',
      companies: [
        { name: '中际旭创', highlight: '1.6T/CPO 全球龙头，共封装光学方案领先云厂商导入' },
        { name: '新易盛', highlight: '800G/1.6T 硅光模块，CPO 样品与北美大客户验证' },
        { name: '剑桥科技', highlight: '硅光 CPO 模块量产，800G/1.6T 产能满负荷' },
        { name: '光迅科技', highlight: 'CPO 光模块批量交付能力，芯片到模块垂直整合' },
      ],
      replaced: [],
    },
  ],
  downstream: [
    {
      segment: 'equipment-substrate',
      name: '封装设备/基板',
      companies: [
        { name: '罗博特科', highlight: '收购 ficonTEC，CPO 光纤耦合与自动化封装设备龙头' },
        { name: '深南电路', highlight: '封装基板/类载板，CPO 交换机与 ASIC 基板核心' },
        { name: '兴森科技', highlight: 'IC 载板扩产，CPO 共封装基板与测试板配套' },
      ],
      replaced: [],
    },
    {
      segment: 'switch-compute',
      name: '交换机/算力应用',
      companies: [
        { name: '中兴通讯', highlight: '智算中心交换机+CPO 组网方案，大集群光互连核心' },
        { name: '烽火通信', highlight: '光传输与交换设备，CPO 交换机系统级落地' },
        { name: '工业富联', highlight: 'AI 服务器/交换机 ODM，CPO 整机代工间接受益' },
        { name: '浪潮信息', highlight: 'AI 服务器出货龙头，高密度 GPU 集群 CPO 光互连需求' },
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
  issuesFixed: [...CHAIN.upstream, ...CHAIN.midstream, ...CHAIN.downstream]
    .flatMap((s) => (s.replaced || []).map((r) => ({ segment: s.name, ...r }))),
  chain: toIndustryDataEntry(CHAIN),
};

fs.writeFileSync(path.join(outDir, 'cpo2026.json'), JSON.stringify(payload, null, 2), 'utf8');
const js = `/** 共封装光学（CPO）— 由 scripts/build-cpo2026.js 生成 */\nconst CPO2026 = ${JSON.stringify(payload, null, 2)};\n`;
fs.writeFileSync(path.join(outDir, 'cpo2026.js'), js, 'utf8');

console.log('OK -> data/cpo2026.json');
const { writeWechatArticle } = require('./lib/wechat-article');
writeWechatArticle({
  slug: 'cpo2026',
  title: '共封装光学（CPO）2026',
  generatedAt: '2026-06',
  chain: CHAIN,
  summary: CHAIN.description,
  tags: ['CPO', '共封装光学', '硅光'],
});
console.log('OK -> docs/wechat/cpo2026.md（公众号文稿，完整版请运行 build-all-analysis-docs.js）');
console.log('6 segments, issues fixed:', payload.issuesFixed.length);

module.exports = { CHAIN, toIndustryDataEntry, payload };
