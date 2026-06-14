/**
 * 半导体12大稀缺材料 — 产业链数据源（含原图问题修正说明）
 * 运行: node scripts/build-semiconductor-scarce-materials2026.js
 */
const fs = require('fs');
const path = require('path');

/** @type {import('../data.js').INDUSTRY_DATA[string]} */
const CHAIN = {
  key: '半导体稀缺材料',
  name: '半导体稀缺材料',
  color: '#6366f1',
  gradient: ['#6366f1', '#4338ca'],
  description:
    '梳理光刻机产业链之外的12类高壁垒半导体关键材料：磷化铟、光刻胶、碳化硅、ABF载板、钽电容、高端PCB、电子级硫酸、MLCC、铜箔、电子布、钽靶材、高纯氦气。' +
    '口径：主业或核心收入与对应材料强相关；剔除科创板(688/689)；原同花顺图中有错配标的已替换（见 scripts/verify-semiconductor-scarce-materials2026.js）。' +
    '涨价/缺口描述来自自媒体梳理，仅供产业链学习，不构成投资建议。',
  upstream: [
    {
      material: '磷化铟',
      name: '磷化铟衬底',
      companies: [
        { name: '云南锗业', highlight: '锗/砷化镓/磷化铟衬底，光通信与毫米波雷达用InP外延片国产主力' },
        { name: '有研新材', highlight: '化合物半导体材料与靶材，磷化铟等高端衬底材料布局' },
        { name: '三安光电', highlight: 'III-V族化合物外延，磷化铟相关光芯片材料能力' },
        { name: '海特高新', highlight: '化合物半导体产线，磷化铟外延片小批量供货（航空+半导体双主业）' },
        { name: '株冶集团', highlight: '替换原图「锡业股份」：锌冶炼副产精铟，为InP产业链提供铟原料（非衬底龙头）' },
      ],
      replaced: [{ bad: '锡业股份', reason: '主业为锡，与磷化铟衬底关联弱', replace: '株冶集团' }],
    },
    {
      material: '光刻胶',
      name: '光刻胶',
      companies: [
        { name: '南大光电', highlight: 'ArF/KrF光刻胶国产突破，晶圆厂验证与导入加速' },
        { name: '彤程新材', highlight: '参股北京科华，G线/I线及KrF光刻胶树脂与成品布局' },
        { name: '上海新阳', highlight: 'KrF/ArF光刻胶与电镀液，晶圆制造材料平台型公司' },
        { name: '晶瑞电材', highlight: 'i线光刻胶+湿电子化学品，半导体材料双轮（代码300655非300037）' },
        { name: '鼎龙股份', highlight: 'CMP垫+光刻胶树脂/PI浆料，半导体材料国产替代' },
      ],
      replaced: [{ bad: '晶瑞电材代码300037', reason: '300037为新宙邦', replace: '晶瑞电材300655' }],
    },
    {
      material: '碳化硅',
      name: '碳化硅',
      companies: [
        { name: '三安光电', highlight: '6英寸SiC衬底+外延+器件IDM，800V快充与电驱核心材料' },
        { name: '晶盛机电', highlight: 'SiC长晶炉与衬底设备，碳化硅扩产直接受益' },
        { name: '斯达半导', highlight: 'SiC功率模块龙头，衬底紧缺下模块环节高景气' },
        { name: '东尼电子', highlight: '替换原图「天岳先进(688)」：SiC切割线/耗材与器件配套（非衬底龙头）' },
        { name: '露笑科技', highlight: 'SiC衬底产线建设，弹性标的但量产兑现需跟踪' },
      ],
      replaced: [{ bad: '天岳先进', reason: '科创板688，本项目产业链口径排除', replace: '东尼电子' }],
    },
    {
      material: 'ABF',
      name: 'ABF载板/上游',
      companies: [
        { name: '深南电路', highlight: 'ABF载板国内龙头，CPU/GPU封装基板核心供应商' },
        { name: '兴森科技', highlight: 'IC载板+ABF布局，AI算力封装基板扩产' },
        { name: '鹏鼎控股', highlight: '全球PCB龙头，高端HDI/类载板能力向ABF延伸' },
        { name: '生益科技', highlight: '替换原图「崇达技术」：覆铜板/CCL龙头，ABF载板上游关键基材' },
        { name: '东材科技', highlight: '替换原图「东山精密」：高速树脂与膜材料，ABF上游国产替代' },
      ],
      replaced: [
        { bad: '崇达技术', reason: '通用PCB为主，ABF纯度不足', replace: '生益科技' },
        { bad: '东山精密', reason: '组装/通用PCB，ABF载板关联弱', replace: '东材科技' },
      ],
    },
  ],
  midstream: [
    {
      material: '钽电容',
      name: '钽电容',
      companies: [
        { name: '宏达电子', highlight: '钽电容军工+民用龙头，AI服务器高可靠电容供应商' },
        { name: '振华科技', highlight: '钽电容与混合集成电路，特种被动元件核心央企平台' },
        { name: '东方钽业', highlight: '钽粉-钽丝-钽电容产业链一体化，上游资源可控' },
        { name: '火炬电子', highlight: '钽电容+陶瓷电容，特种被动元件双主线' },
        { name: '鸿远电子', highlight: '替换原图「风华高科」：高可靠瓷介/钽相关特种电容（风华主业MLCC）' },
      ],
      replaced: [{ bad: '风华高科', reason: '主业MLCC非钽电容', replace: '鸿远电子' }],
    },
    {
      material: '高端PCB',
      name: '高端PCB载板',
      companies: [
        { name: '沪电股份', highlight: 'AI服务器/交换机高端PCB龙头，算力硬件核心供应商' },
        { name: '胜宏科技', highlight: 'GPU/AI服务器PCB，高层数HDI与高速板放量' },
        { name: '深南电路', highlight: '高端PCB+IC载板双龙头，算力与通信双线' },
        { name: '景旺电子', highlight: '汽车+服务器PCB，高端多层板国产替代' },
        { name: '广合科技', highlight: '替换原图「生益科技/生益电子(688)」：AI服务器PCB新锐，算力板订单放量' },
      ],
      replaced: [{ bad: '生益科技', reason: '覆铜板材料商非PCB制造', replace: '广合科技' }],
    },
    {
      material: '电子级硫酸',
      name: '电子级硫酸',
      companies: [
        { name: '晶瑞电材', highlight: '电子级硫酸/双氧水等湿法清洗液，晶圆厂认证供应商' },
        { name: '江化微', highlight: '湿电子化学品，蚀刻/清洗用电子级酸液' },
        { name: '格林达', highlight: '替换原图「兴福电子(未上市)」：TMAH显影液等湿电子化学品' },
        { name: '巨化股份', highlight: '替换原图「中巨芯(688)」：电子级氢氟酸/氟化工，湿法工艺关键酸液' },
        { name: '多氟多', highlight: '电子级氢氟酸与氟化盐，半导体湿法清洗材料配套' },
      ],
      replaced: [
        { bad: '兴福电子', reason: 'A股未上市，无法作为链上标的', replace: '格林达' },
        { bad: '中巨芯', reason: '科创板688', replace: '巨化股份' },
      ],
    },
    {
      material: 'MLCC',
      name: 'MLCC电容',
      companies: [
        { name: '风华高科', highlight: '国内MLCC出货龙头，AI/车规高容MLCC紧缺受益' },
        { name: '三环集团', highlight: 'MLCC+粉体垂直一体化，高端被动元件国产替代' },
        { name: '火炬电子', highlight: '特种MLCC+瓷介电容，高可靠场景份额高' },
        { name: '鸿远电子', highlight: '军用高可靠MLCC，宇航级瓷介电容龙头' },
        { name: '国瓷材料', highlight: 'MLCC介质陶瓷粉龙头，粉体涨价周期核心受益' },
      ],
      replaced: [],
    },
  ],
  downstream: [
    {
      material: '铜箔',
      name: '铜箔',
      companies: [
        { name: '铜冠铜箔', highlight: '锂电铜箔+电子电路铜箔，AI服务器PCB与电池双需求' },
        { name: '逸豪新材', highlight: '替换原图「嘉元科技(688)」：电子电路/锂电铜箔，高端铜箔扩产' },
        { name: '德福科技', highlight: '锂电铜箔快速扩产，电子电路铜箔第二曲线' },
        { name: '诺德股份', highlight: '铜箔老牌企业，锂电+电子铜箔双线' },
        { name: '中一科技', highlight: '铜箔新贵，高端锂电与标准铜箔同步扩产' },
      ],
      replaced: [{ bad: '嘉元科技', reason: '科创板688', replace: '逸豪新材' }],
    },
    {
      material: '电子布',
      name: '电子布',
      companies: [
        { name: '中国巨石', highlight: '电子纱/电子布龙头，高端Low-DK电子布供给紧张' },
        { name: '宏和科技', highlight: '超薄电子布与特种玻璃纤维布，高端CCL reinforcing材料' },
        { name: '中材科技', highlight: '玻纤+隔膜双主业，电子布/特种纤维材料' },
        { name: '长海股份', highlight: '玻纤制品，电子布与复合材料配套' },
        { name: '山东玻纤', highlight: '玻纤纱线，电子布上游原纱弹性标的' },
      ],
      replaced: [],
    },
    {
      material: '钽靶材',
      name: '半导体钽靶材',
      companies: [
        { name: '江丰电子', highlight: '替换原图「金钼股份」：高纯溅射靶材龙头，钽/钛/铝靶核心供应商' },
        { name: '阿石创', highlight: '替换原图「洛阳钼业」：PVD靶材，钽/铝/铜等薄膜沉积材料' },
        { name: '有研新材', highlight: '稀有金属靶材与半导体材料，钽靶布局' },
        { name: '隆华科技', highlight: '钼/钨/钽等难熔金属靶材与材料' },
        { name: '东方钽业', highlight: '钽粉到靶材一体化，钽靶上游资源+材料' },
      ],
      replaced: [
        { bad: '金钼股份', reason: '主业钼靶/钼化工，非钽靶', replace: '江丰电子' },
        { bad: '洛阳钼业', reason: '矿业公司，非半导体靶材制造商', replace: '阿石创' },
      ],
    },
    {
      material: '高纯氦气',
      name: '高纯氦气',
      companies: [
        { name: '凯美特气', highlight: '工业气体+稀有气体，半导体刻蚀/清洗用氦气布局' },
        { name: '杭氧股份', highlight: '空分与特种气体龙头，高纯气体供应能力' },
        { name: '和远气体', highlight: '华中气体供应商，电子特气与氦气储运' },
        { name: '雅克科技', highlight: '替换原图「华特气体(688)/金宏气体(688)」：LNG/湿法特气与半导体材料平台' },
        { name: '侨源股份', highlight: '替换原图「正帆科技(688)」：高纯工业气体，半导体厂务气体配套' },
      ],
      replaced: [
        { bad: '华特气体', reason: '科创板688', replace: '雅克科技' },
        { bad: '金宏气体', reason: '科创板688', replace: '雅克科技' },
        { bad: '正帆科技', reason: '科创板688', replace: '侨源股份' },
      ],
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
  segmentCount: 12,
  issuesFixed: [...CHAIN.upstream, ...CHAIN.midstream, ...CHAIN.downstream]
    .flatMap((s) => (s.replaced || []).map((r) => ({ segment: s.name, ...r }))),
  chain: toIndustryDataEntry(CHAIN),
};

fs.writeFileSync(
  path.join(outDir, 'semiconductor-scarce-materials2026.json'),
  JSON.stringify(payload, null, 2),
  'utf8'
);

const js = `/** 半导体12大稀缺材料 — 由 scripts/build-semiconductor-scarce-materials2026.js 生成 */\nconst SEMICONDUCTOR_SCARCE_MATERIALS2026 = ${JSON.stringify(payload, null, 2)};\n`;
fs.writeFileSync(path.join(outDir, 'semiconductor-scarce-materials2026.js'), js, 'utf8');

console.log('OK -> data/semiconductor-scarce-materials2026.json');
console.log('提示: 运行 node scripts/build-all-analysis-docs.js 生成/更新分析过程文档');
console.log('12 segments, issues fixed:', payload.issuesFixed.length);

module.exports = { CHAIN, toIndustryDataEntry, payload };
