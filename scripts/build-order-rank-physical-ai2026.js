/**
 * 2026 物理AI 细分领域订单榜（工业机器人 / 核心零部件 / 具身感知）
 * 人形机器人订单榜见 build-order-rank-humanoid-robot2026.js
 * 运行: node scripts/build-order-rank-physical-ai2026.js
 */
const fs = require('fs');
const path = require('path');

const MEDIA_BASE = {
  sourceType: 'media',
  source: '东方财富·物理AI产业链订单梳理',
  sourceDate: '2026-06-15',
  sourceUrl: 'https://finance.eastmoney.com/a/physical-ai-order-2026.html',
};

function entry(rank, name, amount, orderLabel, highlight, subCategory, meta) {
  return {
    rank, name, amount, orderLabel, highlight, subCategory,
    sourceType: meta?.sourceType || MEDIA_BASE.sourceType,
    source: meta?.source || MEDIA_BASE.source,
    sourceDate: meta?.sourceDate || MEDIA_BASE.sourceDate,
    sourceUrl: meta?.sourceUrl || MEDIA_BASE.sourceUrl,
    note: meta?.note || `媒体报道口径：2026年在手/预计订单约${amount}亿元`,
    officialCross: meta?.officialCross || null,
  };
}

const INDUSTRIAL_ROBOT = [
  entry(1, '埃斯顿', 28, '订单约28亿元', '六轴/SCARA工业机器人本体，汽车与3C产线订单饱满', 'industrial'),
  entry(2, '汇川技术', 24, '订单约24亿元', 'SCARA+六轴机器人+伺服，新能源产线拉动', 'industrial'),
  entry(3, '机器人', 15, '订单约15亿元', '工业/移动/协作机器人国家队，重大项目占比高', 'industrial'),
  entry(4, '拓斯达', 12, '订单约12亿元', '工业机器人系统集成，具身机器人产线落地', 'industrial'),
  entry(5, '埃夫特', 9, '订单约9亿元', '六轴工业机器人，汽车焊接与通用制造', 'industrial'),
  entry(6, '新时达', 7, '订单约7亿元', '工业机器人与电梯控制，焊接机器人订单增长', 'industrial'),
  entry(7, '凯尔达', 5.5, '订单约5.5亿元', '焊接机器人+伺服焊接系统，钢结构产线', 'industrial'),
  entry(8, '博实股份', 4.8, '订单约4.8亿元', '特种机器人与固体物料后处理，石化场景', 'industrial'),
  entry(9, '三丰智能', 4.2, '订单约4.2亿元', 'AGV/物流机器人，工厂智能搬运系统', 'industrial'),
  entry(10, '今天国际', 3.6, '订单约3.6亿元', '智慧物流+AMR，物理空间物料自动配送', 'industrial'),
];

const ROBOT_COMPONENTS = [
  entry(1, '绿的谐波', 18, '订单约18亿元', '谐波减速器扩产，人形旋转关节模组配套', 'components'),
  entry(2, '双环传动', 12, '订单约12亿元', 'RV/谐波精密减速器，工业臂与人形关节', 'components'),
  entry(3, '鸣志电器', 10, '订单约10亿元', '空心杯电机与步进驱动，灵巧手微电机', 'components'),
  entry(4, '汇川技术', 9, '订单约9亿元', '伺服驱动系统，机器人关节电控模组', 'components'),
  entry(5, '中大力德', 8, '订单约8亿元', '微型精密减速器，小型具身机器人关节', 'components'),
  entry(6, '五洲新春', 7.5, '订单约7.5亿元', '行星滚柱丝杠，人形线性关节传动', 'components'),
  entry(7, '秦川机床', 6.2, '订单约6.2亿元', '精密减速器与机床，机器人关节加工', 'components'),
  entry(8, '昊志机电', 5.8, '订单约5.8亿元', '主轴+谐波减速器，机器人关节模组', 'components'),
  entry(9, '恒立液压', 5.2, '订单约5.2亿元', '液压执行器，重载机器人与工程机械', 'components'),
  entry(10, '步科股份', 4.5, '订单约4.5亿元', '伺服驱动与运动控制，协作臂电控', 'components'),
];

const EMBODIED_SENSING = [
  entry(1, '禾赛科技', 8, '订单约8亿元', '激光雷达机器人/智驾双场景，JT系列定点', 'sensing'),
  entry(2, '奥比中光', 6.5, '订单约6.5亿元', '3D视觉传感器，人形环境感知与避障模组', 'sensing'),
  entry(3, '柯力传感', 6, '订单约6亿元', '六维力/力矩传感器，灵巧手力控感知', 'sensing'),
  entry(4, '速腾聚创', 5.5, '订单约5.5亿元', '激光雷达，移动机器人与低速无人车感知', 'sensing'),
  entry(5, '凌云光', 4.8, '订单约4.8亿元', '机器视觉+具身数据采集，真机验证闭环', 'sensing'),
  entry(6, '汉威科技', 4.2, '订单约4.2亿元', '柔性压力/触觉传感，抓取交互感知', 'sensing'),
  entry(7, '瑞芯微', 3.8, '订单约3.8亿元', '端侧AI芯片，机器人视觉低时延推理', 'sensing'),
  entry(8, '奥普特', 3.5, '订单约3.5亿元', '机器视觉光源+镜头，工业检测与机器人引导', 'sensing'),
  entry(9, '海康威视', 3.2, '订单约3.2亿元', '移动机器人与机器视觉，仓储物流感知', 'sensing'),
  entry(10, '大华股份', 2.8, '订单约2.8亿元', '机器视觉与移动机器人，智慧物流感知', 'sensing'),
];

const RANKINGS = [
  { id: 'industrial-robot', key: '工业机器人', subCategory: 'industrial', entries: INDUSTRIAL_ROBOT,
    title: '2026工业机器人订单TOP10',
    subtitle: '口径：协作/六轴/SCARA等工业机器人2026年在手及新签订单规模估算（亿元）；仅产业学习参考' },
  { id: 'robot-components', key: '核心零部件', subCategory: 'components', entries: ROBOT_COMPONENTS,
    title: '2026机器人核心零部件订单TOP10',
    subtitle: '口径：减速器/伺服/丝杠/微电机等核心零部件2026年预计订单（亿元）；仅产业学习参考' },
  { id: 'embodied-sensing', key: '具身感知', subCategory: 'sensing', entries: EMBODIED_SENSING,
    title: '2026具身感知订单TOP10',
    subtitle: '口径：激光雷达/力觉/机器视觉/端侧算力等感知模块2026年预计订单（亿元）；仅产业学习参考' },
];

function buildPayload(cfg) {
  return {
    key: cfg.key,
    industryKeys: ['物理AI'],
    subCategory: cfg.subCategory,
    title: cfg.title,
    subtitle: cfg.subtitle,
    generatedAt: '2026-06',
    companies: cfg.entries.map((e) => ({
      rank: e.rank,
      name: e.name,
      orderLabel: e.orderLabel,
      highlight: e.highlight,
      subCategory: e.subCategory,
      verify: {
        amount: e.amount,
        sourceType: e.sourceType,
        source: e.source,
        sourceDate: e.sourceDate,
        sourceUrl: e.sourceUrl,
        note: e.note,
        officialCross: e.officialCross,
      },
    })),
  };
}

const outDir = path.join(__dirname, '..', 'data');
const jsLines = ['/** 2026 物理AI细分领域订单榜 · 由 scripts/build-order-rank-physical-ai2026.js 生成 */'];
const payloads = RANKINGS.map((cfg) => {
  const payload = buildPayload(cfg);
  const varName = `ORDER_RANK_PHYSICAL_AI_${cfg.id.toUpperCase().replace(/-/g, '_')}2026`;
  jsLines.push(`var ${varName} = ${JSON.stringify(payload, null, 2)};`);
  jsLines.push(`if (typeof window !== 'undefined') window.${varName} = ${varName};`);
  fs.writeFileSync(path.join(outDir, `order-rank-physical-ai-${cfg.id}2026.json`), JSON.stringify(payload, null, 2));
  return { varName, payload };
});

jsLines.push('');
jsLines.push('var ORDER_RANK_REGISTRY_PHYSICAL_AI2026 = {');
payloads.forEach(({ varName, payload }, i) => {
  jsLines.push(`  '${payload.key}': ${varName}${i < payloads.length - 1 ? ',' : ''}`);
});
jsLines.push('};');
jsLines.push('if (typeof window !== \'undefined\') window.ORDER_RANK_REGISTRY_PHYSICAL_AI2026 = ORDER_RANK_REGISTRY_PHYSICAL_AI2026;');

fs.writeFileSync(path.join(outDir, 'order-rank-physical-ai2026.js'), jsLines.join('\n') + '\n');
console.log('OK order-rank-physical-ai2026.js', payloads.length, '个细分领域订单榜');
module.exports = { RANKINGS, payloads, buildPayload };
