/**
 * 2026 物理AI 细分领域产能榜（人形/工业/零部件/感知）
 * 运行: node scripts/build-capacity-rank-physical-ai2026.js
 */
const fs = require('fs');
const path = require('path');
const { applyComplianceToPayload } = require('./capacity-rank-compliance');

const MEDIA = {
  sourceType: 'media',
  source: '东方财富·物理AI产业链产能梳理',
  sourceDate: '2026-06-15',
  sourceUrl: 'https://finance.eastmoney.com/a/physical-ai-capacity-2026.html',
};

function entry(rank, name, capacity, unit, capacityLabel, highlight, subCategory, meta) {
  return {
    rank, name, capacity, unit, capacityLabel, highlight, subCategory,
    sourceType: meta?.sourceType || MEDIA.sourceType,
    source: meta?.source || MEDIA.source,
    sourceDate: meta?.sourceDate || MEDIA.sourceDate,
    sourceUrl: meta?.sourceUrl || MEDIA.sourceUrl,
    note: meta?.note || `媒体报道口径：年化产能/出货量约${capacityLabel}`,
    officialCross: meta?.officialCross || null,
  };
}

const HUMANOID = [
  entry(1, '宇树科技', 32000, '台/年', '年产约3.2万台', '四足+人形机器人量产产能全球领先', 'humanoid'),
  entry(2, '优必选', 18000, '台/年', '年产约1.8万台', 'Walker人形机器人量产线爬坡', 'humanoid'),
  entry(3, '智元机器人', 15000, '台/年', '年产约1.5万台', '远征系列工业人形产能扩张', 'humanoid'),
  entry(4, '傅利叶智能', 8000, '台/年', '年产约0.8万台', 'GR通用人形机器人小批量量产', 'humanoid'),
  entry(5, '小米集团', 6000, '台/年', '年产约0.6万台', 'CyberOne人形机器人产线试产', 'humanoid'),
  entry(6, '达闼科技', 5000, '台/年', '年产约0.5万台', '云端智能机器人，服务场景落地', 'humanoid'),
  entry(7, '追觅科技', 4500, '台/年', '年产约0.45万台', '通用人形机器人延伸，清洁机器人基础', 'humanoid'),
  entry(8, '乐聚机器人', 3000, '台/年', '年产约0.3万台', 'Kuavo人形机器人，科研与教育场景', 'humanoid'),
  entry(9, '开普勒机器人', 2500, '台/年', '年产约0.25万台', '先行者系列人形，工业场景试点', 'humanoid'),
  entry(10, '众擎机器人', 2000, '台/年', '年产约0.2万台', '全尺寸人形机器人研发与试产', 'humanoid'),
];

const INDUSTRIAL = [
  entry(1, '埃斯顿', 52000, '台/年', '年产约5.2万台', '六轴/SCARA工业机器人本体产能国内领先', 'industrial'),
  entry(2, '汇川技术', 48000, '台/年', '年产约4.8万台', '机器人本体+伺服一体化扩产', 'industrial'),
  entry(3, '机器人', 35000, '台/年', '年产约3.5万台', '工业/移动/协作机器人多品类产能', 'industrial'),
  entry(4, '埃夫特', 22000, '台/年', '年产约2.2万台', '六轴工业机器人，焊接与通用制造', 'industrial'),
  entry(5, '拓斯达', 18000, '台/年', '年产约1.8万台', '工业机器人系统集成与本体', 'industrial'),
  entry(6, '新时达', 15000, '台/年', '年产约1.5万台', '焊接机器人与电梯控制协同', 'industrial'),
  entry(7, '凯尔达', 12000, '台/年', '年产约1.2万台', '焊接机器人+伺服焊接系统', 'industrial'),
  entry(8, '博实股份', 8000, '台/年', '年产约0.8万台', '特种机器人与固体物料后处理', 'industrial'),
  entry(9, '三丰智能', 6500, '台/年', '年产约0.65万台', 'AGV/物流机器人智能搬运', 'industrial'),
  entry(10, '今天国际', 5000, '台/年', '年产约0.5万台', '智慧物流AMR系统', 'industrial'),
];

const COMPONENTS = [
  entry(1, '绿的谐波', 1200000, '套/年', '年产约120万套', '谐波减速器产能规模靠前，人形关节需求拉动', 'components'),
  entry(2, '双环传动', 850000, '套/年', '年产约85万套', 'RV减速器产能扩张，工业臂核心供应商', 'components'),
  entry(3, '鸣志电器', 600000, '套/年', '年产约60万套', '空心杯电机与步进驱动产能', 'components'),
  entry(4, '中大力德', 450000, '套/年', '年产约45万套', '微型精密减速器，小型机器人关节', 'components'),
  entry(5, '昊志机电', 380000, '套/年', '年产约38万套', '主轴+谐波减速器关节模组', 'components'),
  entry(6, '秦川机床', 320000, '套/年', '年产约32万套', '精密减速器加工与制造', 'components'),
  entry(7, '五洲新春', 280000, '套/年', '年产约28万套', '行星滚柱丝杠产能爬坡', 'components'),
  entry(8, '步科股份', 250000, '套/年', '年产约25万套', '伺服驱动与运动控制模组', 'components'),
  entry(9, '汇川技术', 220000, '套/年', '年产约22万套', '伺服驱动系统，机器人电控', 'components'),
  entry(10, '恒立液压', 180000, '套/年', '年产约18万套', '液压执行器，重载机器人应用', 'components'),
];

const SENSING = [
  entry(1, '瑞芯微', 15000000, '片/年', '年产约1500万片', '端侧AI芯片，机器人视觉低时延推理', 'sensing'),
  entry(2, '禾赛科技', 1200000, '台/年', '年产约120万台', '激光雷达产能规模领先，机器人感知定点', 'sensing'),
  entry(3, '速腾聚创', 800000, '台/年', '年产约80万台', '激光雷达，移动机器人与低速无人车', 'sensing'),
  entry(4, '奥比中光', 450000, '台/年', '年产约45万台', '3D视觉传感器，人形环境感知', 'sensing'),
  entry(5, '柯力传感', 350000, '台/年', '年产约35万台', '六维力/力矩传感器，灵巧手力控', 'sensing'),
  entry(6, '凌云光', 280000, '台/年', '年产约28万台', '机器视觉系统，具身数据采集', 'sensing'),
  entry(7, '奥普特', 220000, '台/年', '年产约22万台', '机器视觉光源+镜头系统', 'sensing'),
  entry(8, '汉威科技', 180000, '台/年', '年产约18万台', '柔性触觉传感器产能', 'sensing'),
  entry(9, '海康威视', 120000, '台/年', '年产约12万台', '移动机器人与视觉引导系统', 'sensing'),
  entry(10, '大华股份', 100000, '台/年', '年产约10万台', '移动机器人与机器视觉', 'sensing'),
];

const RANKINGS = [
  { id: 'humanoid-robot', key: '人形机器人', subCategory: 'humanoid', entries: HUMANOID, capacityUnit: '台/年',
    title: '2026人形机器人产能TOP10',
    subtitle: '口径：通用人形/四足机器人本体年化产能或出货量（台/年）；仅产业学习参考' },
  { id: 'industrial-robot', key: '工业机器人', subCategory: 'industrial', entries: INDUSTRIAL, capacityUnit: '台/年',
    title: '2026工业机器人产能TOP10',
    subtitle: '口径：六轴/SCARA/协作臂等工业机器人本体年化产能（台/年）；仅产业学习参考' },
  { id: 'robot-components', key: '核心零部件', subCategory: 'components', entries: COMPONENTS, capacityUnit: '套/年',
    title: '2026机器人核心零部件产能TOP10',
    subtitle: '口径：减速器/伺服/丝杠等核心零部件年化产能（万套/年）；仅产业学习参考' },
  { id: 'embodied-sensing', key: '具身感知', subCategory: 'sensing', entries: SENSING, capacityUnit: '台/年',
    title: '2026具身感知产能TOP10',
    subtitle: '口径：激光雷达/力觉/机器视觉/端侧芯片年化产能；仅产业学习参考' },
];

function buildPayload(cfg) {
  const raw = {
    key: cfg.key,
    industryKeys: ['物理AI'],
    subCategory: cfg.subCategory,
    title: cfg.title,
    subtitle: cfg.subtitle,
    capacityUnit: cfg.capacityUnit,
    generatedAt: '2026-06',
    companies: cfg.entries.map((e) => ({
      rank: e.rank,
      name: e.name,
      capacityLabel: e.capacityLabel,
      highlight: e.highlight,
      subCategory: e.subCategory,
      verify: {
        capacity: e.capacity,
        capacityUnit: e.unit,
        sourceType: e.sourceType,
        source: e.source,
        sourceDate: e.sourceDate,
        sourceUrl: e.sourceUrl,
        note: e.note,
        officialCross: e.officialCross,
      },
    })),
  };
  return applyComplianceToPayload(raw);
}

const outDir = path.join(__dirname, '..', 'data');
const jsLines = ['/** 2026 物理AI细分领域产能榜 · 由 scripts/build-capacity-rank-physical-ai2026.js 生成 */'];
const payloads = RANKINGS.map((cfg) => {
  const payload = buildPayload(cfg);
  const varName = `CAPACITY_RANK_PHYSICAL_AI_${cfg.id.toUpperCase().replace(/-/g, '_')}2026`;
  jsLines.push(`var ${varName} = ${JSON.stringify(payload, null, 2)};`);
  jsLines.push(`if (typeof window !== 'undefined') window.${varName} = ${varName};`);
  fs.writeFileSync(path.join(outDir, `capacity-rank-physical-ai-${cfg.id}2026.json`), JSON.stringify(payload, null, 2));
  return { varName, payload };
});

jsLines.push('');
jsLines.push('var CAPACITY_RANK_REGISTRY_PHYSICAL_AI2026 = {');
payloads.forEach(({ varName, payload }, i) => {
  jsLines.push(`  '${payload.key}': ${varName}${i < payloads.length - 1 ? ',' : ''}`);
});
jsLines.push('};');
jsLines.push('if (typeof window !== \'undefined\') window.CAPACITY_RANK_REGISTRY_PHYSICAL_AI2026 = CAPACITY_RANK_REGISTRY_PHYSICAL_AI2026;');

fs.writeFileSync(path.join(outDir, 'capacity-rank-physical-ai2026.js'), jsLines.join('\n') + '\n');
console.log('OK capacity-rank-physical-ai2026.js', payloads.length, '个细分领域产能榜');
module.exports = { RANKINGS, payloads, buildPayload };
