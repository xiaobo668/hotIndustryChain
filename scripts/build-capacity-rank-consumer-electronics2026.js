/**
 * 2026 消费电子产能排行榜 Top10（6 个赛道）
 * 运行: node scripts/build-capacity-rank-consumer-electronics2026.js
 */
const fs = require('fs');
const path = require('path');
const { applyComplianceToPayload } = require('./capacity-rank-compliance');

const MEDIA_URL = 'https://caifuhao.eastmoney.com/news/20260414055352939223580';
const MEDIA_SRC = '东方财富·消费电子产能与出货量梳理';
const MEDIA_DATE = '2026-04-14';

function entry(rank, name, capacity, unit, capacityLabel, highlight, meta) {
  return {
    rank,
    name,
    capacity,
    unit,
    capacityLabel,
    highlight,
    sourceType: meta.sourceType || 'media',
    source: meta.source || MEDIA_SRC,
    sourceDate: meta.sourceDate || MEDIA_DATE,
    sourceUrl: meta.sourceUrl || MEDIA_URL,
    note: meta.note || '',
    officialCross: meta.officialCross || null,
  };
}

const DISPLAY_PANEL = [
  entry(1, '京东方A', 42800, '万片/年', '年出货约42800万片', '全球显示面板龙头，OLED/LCD出货量行业第一，折叠屏面板国内市占领先', {
    note: '媒体报道口径：显示面板年化出货量约42800万片',
  }),
  entry(2, 'TCL科技', 26500, '万片/年', '年出货约26500万片', '华星光电面板龙头，大尺寸TV与IT/mobile OLED产能持续扩张', {
    note: '媒体报道口径：华星光电面板年化出货量约26500万片',
  }),
  entry(3, '深天马A', 17200, '万片/年', '年出货约17200万片', '中小尺寸LTPS/AMOLED面板龙头，车载与消费电子双轮驱动', {
    note: '媒体报道口径：中小尺寸面板年化出货量约17200万片',
  }),
  entry(4, '维信诺', 7800, '万片/年', '年出货约7800万片', 'OLED面板龙头，柔性AMOLED量产与折叠屏面板供货', {
    note: '媒体报道口径：OLED面板年化出货量约7800万片',
  }),
  entry(5, '华映科技', 5200, '万片/年', '年出货约5200万片', '显示面板制造，中小尺寸LCD/OLED模组与面板产能', {
    note: '媒体报道口径：显示面板年化出货量约5200万片',
  }),
  entry(6, '彩虹股份', 4800, '万片/年', '年出货约4800万片', '液晶玻璃基板+面板，显示产业链上游材料与面板协同', {
    note: '媒体报道口径：面板及显示材料年化出货量约4800万片',
  }),
  entry(7, '同兴达', 3500, '万片/年', '年出货约3500万片', '显示模组+摄像头模组，中小尺寸显示模组出货量领先', {
    note: '媒体报道口径：显示模组年化出货量约3500万片',
  }),
  entry(8, '合力泰', 2800, '万片/年', '年出货约2800万片', '显示模组+手机ODM，全面屏显示模组与整机协同', {
    note: '媒体报道口径：显示模组年化出货量约2800万片',
  }),
  entry(9, '凯盛科技', 2200, '万片/年', '年出货约2200万片', '显示玻璃与触控模组，消费电子显示材料与模组', {
    note: '媒体报道口径：显示触控模组年化出货量约2200万片',
  }),
  entry(10, '莱宝高科', 1800, '万片/年', '年出货约1800万片', '中大尺寸触摸屏与显示模组，平板/笔记本显示模组', {
    note: '媒体报道口径：显示触控模组年化出货量约1800万片',
  }),
];

const TWS_AUDIO = [
  entry(1, '歌尔股份', 28500, '万副/年', '年出货约28500万副', 'TWS耳机代工全球龙头，苹果AirPods核心供应商', {
    note: '媒体报道口径：TWS耳机年化出货量约28500万副',
  }),
  entry(2, '立讯精密', 22800, '万副/年', '年出货约22800万副', '连接器+声学+组装，AirPods/Watch核心制造与TWS代工', {
    note: '媒体报道口径：TWS耳机年化出货量约22800万副',
  }),
  entry(3, '国光电器', 6800, '万副/年', '年出货约6800万副', '声学喇叭+音箱/TWS代工，AI音箱与耳机ODM出货放量', {
    note: '媒体报道口径：TWS/耳机年化出货量约6800万副',
  }),
  entry(4, '佳禾智能', 5200, '万副/年', '年出货约5200万副', 'TWS耳机ODM龙头，品牌客户耳机与智能音箱代工', {
    note: '媒体报道口径：TWS耳机年化出货量约5200万副',
  }),
  entry(5, '朝阳科技', 4200, '万副/年', '年出货约4200万副', '电声器件+TWS耳机，消费电子声学零部件与整机代工', {
    note: '媒体报道口径：TWS耳机年化出货量约4200万副',
  }),
  entry(6, '漫步者', 3800, '万副/年', '年出货约3800万副', '音频设备品牌龙头，TWS耳机与智能音箱自有品牌出货', {
    note: '媒体报道口径：TWS耳机年化出货量约3800万副',
  }),
  entry(7, '天键股份', 3200, '万副/年', '年出货约3200万副', '耳机ODM龙头，TWS与头戴式耳机代工出货量行业前列', {
    note: '媒体报道口径：TWS耳机年化出货量约3200万副',
  }),
  entry(8, '奋达科技', 1200, '万副/年', '年出货约1200万副', '智能音箱+可穿戴代工，TWS与智能手环ODM', {
    note: '媒体报道口径：TWS耳机年化出货量约1200万副',
  }),
  entry(9, '惠威科技', 950, '万副/年', '年出货约950万副', '音响品牌+代工，TWS耳机与有源音箱出货', {
    note: '媒体报道口径：TWS耳机年化出货量约950万副',
  }),
  entry(10, '共达电声', 780, '万副/年', '年出货约780万副', '微型电声元器件+TWS，声学器件与耳机代工', {
    note: '媒体报道口径：TWS耳机年化出货量约780万副',
  }),
];

const SMARTPHONE_ODM = [
  entry(1, '华勤技术', 18500, '万台/年', '年出货约18500万台', '手机ODM全球龙头，AI手机与智能硬件整机出货量行业前三', {
    note: '媒体报道口径：智能手机ODM年化出货量约18500万台',
  }),
  entry(2, '龙旗科技', 15200, '万台/年', '年出货约15200万台', '智能手机ODM，小米/荣耀等品牌整机设计制造出货量领先', {
    note: '媒体报道口径：智能手机ODM年化出货量约15200万台',
  }),
  entry(3, '闻泰科技', 12800, '万台/年', '年出货约12800万台', '手机ODM+半导体，智能硬件整机代工与品牌客户深度绑定', {
    note: '媒体报道口径：智能手机ODM年化出货量约12800万台',
  }),
  entry(4, '光弘科技', 6800, '万台/年', '年出货约6800万台', '消费电子EMS龙头，手机/可穿戴整机组装产能扩张', {
    note: '媒体报道口径：智能手机EMS年化出货量约6800万台',
  }),
  entry(5, '福日电子', 5200, '万台/年', '年出货约5200万台', '智能手机ODM与LED显示，华为/荣耀等客户整机代工', {
    note: '媒体报道口径：智能手机ODM年化出货量约5200万台',
  }),
  entry(6, '合力泰', 4800, '万台/年', '年出货约4800万台', '显示模组+手机ODM，全面屏显示模组与整机协同出货', {
    note: '媒体报道口径：智能手机ODM年化出货量约4800万台',
  }),
  entry(7, '科森科技', 3500, '万台/年', '年出货约3500万台', '精密结构件+整机组装，智能手机金属件与EMS代工', {
    note: '媒体报道口径：智能手机EMS年化出货量约3500万台',
  }),
  entry(8, '美格智能', 3200, '万台/年', '年出货约3200万台', '智能模组+IoT终端，5G模组与智能硬件ODM', {
    note: '媒体报道口径：智能模组/终端年化出货量约3200万台',
  }),
  entry(9, '卓翼科技', 2800, '万台/年', '年出货约2800万台', '消费电子ODM/EMS，智能手机与IoT硬件代工', {
    note: '媒体报道口径：智能手机ODM年化出货量约2800万台',
  }),
  entry(10, '瑞德智能', 1800, '万台/年', '年出货约1800万台', '智能控制器+小家电/终端ODM，消费电子终端代工', {
    note: '媒体报道口径：智能硬件ODM年化出货量约1800万台',
  }),
];

const WEARABLE_DEVICE = [
  entry(1, '立讯精密', 15800, '万台/年', '年出货约15800万台', 'Apple Watch等可穿戴整机组装，可穿戴设备出货量核心供应商', {
    note: '媒体报道口径：可穿戴设备年化出货量约15800万台',
  }),
  entry(2, '歌尔股份', 12500, '万台/年', '年出货约12500万台', 'VR/AR+可穿戴声学，智能手表与耳机可穿戴代工', {
    note: '媒体报道口径：可穿戴设备年化出货量约12500万台',
  }),
  entry(3, '环旭电子', 8200, '万台/年', '年出货约8200万台', 'SiP封装+可穿戴模组，Apple Watch等可穿戴核心供应链', {
    note: '媒体报道口径：可穿戴模组年化出货量约8200万台',
  }),
  entry(4, '华勤技术', 6500, '万台/年', '年出货约6500万台', '智能手表/手环ODM，可穿戴整机设计制造出货', {
    note: '媒体报道口径：可穿戴ODM年化出货量约6500万台',
  }),
  entry(5, '光弘科技', 4200, '万台/年', '年出货约4200万台', '可穿戴EMS代工，智能手表与手环整机组装', {
    note: '媒体报道口径：可穿戴EMS年化出货量约4200万台',
  }),
  entry(6, '佳禾智能', 3500, '万台/年', '年出货约3500万台', 'TWS+可穿戴ODM，智能耳机与手环代工出货', {
    note: '媒体报道口径：可穿戴设备年化出货量约3500万台',
  }),
  entry(7, '奋达科技', 2200, '万台/年', '年出货约2200万台', '智能音箱+可穿戴代工，TWS与智能手环ODM', {
    note: '媒体报道口径：可穿戴设备年化出货量约2200万台',
  }),
  entry(8, '乐心医疗', 1800, '万台/年', '年出货约1800万台', '智能手环/健康穿戴设备，医疗级可穿戴出货量领先', {
    note: '媒体报道口径：可穿戴设备年化出货量约1800万台',
  }),
  entry(9, '创维数字', 1500, '万台/年', '年出货约1500万台', '智能终端+VR/AR设备，可穿戴与算力硬件出货', {
    note: '媒体报道口径：可穿戴/VR终端年化出货量约1500万台',
  }),
  entry(10, '共达电声', 1200, '万台/年', '年出货约1200万台', '可穿戴声学器件，TWS与智能穿戴电声组件', {
    note: '媒体报道口径：可穿戴声学组件年化出货量约1200万台',
  }),
];

const CHARGER_POWER = [
  entry(1, '安克创新', 15800, '万台/年', '年出货约15800万台', '充电头/移动电源全球品牌龙头，氮化镓快充出货量领先', {
    note: '媒体报道口径：充电器/移动电源年化出货量约15800万台',
  }),
  entry(2, '奥海科技', 12500, '万台/年', '年出货约12500万台', '手机充电器ODM龙头，快充与PC电源代工出货量行业第一', {
    note: '媒体报道口径：充电器ODM年化出货量约12500万台',
  }),
  entry(3, '公牛集团', 8200, '万台/年', '年出货约8200万台', '民用电工龙头，数码充电与插座产品线出货量领先', {
    note: '媒体报道口径：数码充电产品年化出货量约8200万台',
  }),
  entry(4, '茂硕电源', 3500, '万台/年', '年出货约3500万台', 'LED驱动电源+消费电子适配器，充电电源出货放量', {
    note: '媒体报道口径：电源适配器年化出货量约3500万台',
  }),
  entry(5, '京泉华', 2800, '万台/年', '年出货约2800万台', '磁性元器件+电源适配器，充电器变压器与电源组件', {
    note: '媒体报道口径：充电电源组件年化出货量约2800万台',
  }),
  entry(6, '英可瑞', 2100, '万台/年', '年出货约2100万台', '电力电源+充电模块，充电桩与消费电子电源', {
    note: '媒体报道口径：充电电源模块年化出货量约2100万台',
  }),
  entry(7, '伊戈尔', 1850, '万台/年', '年出货约1850万台', '电源变压器与充电组件，消费电子电源配套', {
    note: '媒体报道口径：充电电源组件年化出货量约1850万台',
  }),
  entry(8, '拓邦股份', 1650, '万台/年', '年出货约1650万台', '智能控制器+充电产品，IoT与消费电子电源方案', {
    note: '媒体报道口径：充电控制器/终端年化出货量约1650万台',
  }),
  entry(9, '得润电子', 1400, '万台/年', '年出货约1400万台', '连接器+电源线束，消费电子充电连接组件', {
    note: '媒体报道口径：充电连接组件年化出货量约1400万台',
  }),
  entry(10, '瀛通通讯', 1200, '万台/年', '年出货约1200万台', '数据线+声学配件，Type-C线与充电配件出货', {
    note: '媒体报道口径：充电数据线年化出货量约1200万台',
  }),
];

const CAMERA_MODULE = [
  entry(1, '欧菲光', 28500, '万套/年', '年出货约28500万套', '手机摄像头模组龙头，光学影像模组出货量行业前列', {
    note: '媒体报道口径：摄像头模组年化出货量约28500万套',
  }),
  entry(2, '立讯精密', 22000, '万套/年', '年出货约22000万套', '摄像头模组精密组装，苹果摄像头模组核心供应商', {
    note: '媒体报道口径：摄像头模组年化出货量约22000万套',
  }),
  entry(3, '联创电子', 15800, '万套/年', '年出货约15800万套', '光学镜头+车载/手机摄像头模组，玻塑混合镜头龙头', {
    note: '媒体报道口径：摄像头模组年化出货量约15800万套',
  }),
  entry(4, '同兴达', 7200, '万套/年', '年出货约7200万套', '摄像头模组+显示模组，手机光学影像模组出货量领先', {
    note: '媒体报道口径：摄像头模组年化出货量约7200万套',
  }),
  entry(5, '水晶光电', 6800, '万套/年', '年出货约6800万套', '光学元器件龙头，手机滤光片/镜头盖板与AR光学', {
    note: '媒体报道口径：摄像头光学组件年化出货量约6800万套',
  }),
  entry(6, '蓝思科技', 5500, '万套/年', '年出货约5500万套', '玻璃盖板+摄像头镜片，手机摄像头结构件核心供应商', {
    note: '媒体报道口径：摄像头结构件年化出货量约5500万套',
  }),
  entry(7, '凤凰光学', 4200, '万套/年', '年出货约4200万套', '光学镜头+摄像头模组，安防与消费电子光学制造', {
    note: '媒体报道口径：摄像头模组年化出货量约4200万套',
  }),
  entry(8, '宇瞳光学', 3600, '万套/年', '年出货约3600万套', '安防与手机光学镜头龙头，玻塑混合镜头产能扩张', {
    note: '媒体报道口径：光学镜头年化出货量约3600万套',
  }),
  entry(9, '五方光电', 3100, '万套/年', '年出货约3100万套', '红外截止滤光片龙头，手机摄像头光学镀膜核心供应商', {
    note: '媒体报道口径：摄像头滤光片年化出货量约3100万套',
  }),
  entry(10, '道明光学', 2600, '万套/年', '年出货约2600万套', '光学膜与棱镜，手机摄像头光学元器件配套', {
    note: '媒体报道口径：摄像头光学膜年化出货量约2600万套',
  }),
];

function buildPayload(meta, entries) {
  return applyComplianceToPayload({
    key: meta.key,
    industryKeys: meta.industryKeys,
    title: meta.title,
    subtitle: meta.subtitle,
    capacityUnit: meta.capacityUnit,
    generatedAt: '2026-06',
    companies: entries.map((e) => ({
      rank: e.rank,
      name: e.name,
      capacityLabel: e.capacityLabel,
      highlight: e.highlight,
      verify: {
        capacity: e.capacity,
        capacityUnit: e.unit,
        sourceType: e.sourceType,
        source: e.source,
        sourceDate: e.sourceDate,
        sourceUrl: e.sourceUrl,
        note: e.note,
        officialCross: e.officialCross || null,
      },
    })),
  });
}

const RANKINGS = [
  {
    id: 'ce-display-panel',
    varName: 'CAPACITY_RANK_CE_DISPLAY_PANEL2026',
    industryKeys: ['消费电子'],
    key: '显示面板',
    title: '2026显示面板出货量TOP10',
    subtitle: '口径：显示面板年化出货量（万片/年）；均为面板/显示模组制造龙头',
    capacityUnit: '万片/年',
    ENTRIES: DISPLAY_PANEL,
  },
  {
    id: 'ce-tws-audio',
    varName: 'CAPACITY_RANK_CE_TWS_AUDIO2026',
    industryKeys: ['消费电子'],
    key: 'TWS耳机音箱',
    title: '2026 TWS/耳机音箱出货量TOP10',
    subtitle: '口径：TWS耳机年化出货量（万副/年）；均为声学代工/品牌出货龙头',
    capacityUnit: '万副/年',
    ENTRIES: TWS_AUDIO,
  },
  {
    id: 'ce-smartphone-odm',
    varName: 'CAPACITY_RANK_CE_SMARTPHONE_ODM2026',
    industryKeys: ['消费电子'],
    key: '智能手机ODM',
    title: '2026智能手机ODM出货量TOP10',
    subtitle: '口径：智能手机ODM/EMS年化出货量（万台/年）；均为手机整机代工龙头',
    capacityUnit: '万台/年',
    ENTRIES: SMARTPHONE_ODM,
  },
  {
    id: 'ce-wearable',
    varName: 'CAPACITY_RANK_CE_WEARABLE2026',
    industryKeys: ['消费电子'],
    key: '可穿戴设备',
    title: '2026可穿戴设备出货量TOP10',
    subtitle: '口径：可穿戴设备年化出货量（万台/年）；均为可穿戴ODM/组装龙头',
    capacityUnit: '万台/年',
    ENTRIES: WEARABLE_DEVICE,
  },
  {
    id: 'ce-charger',
    varName: 'CAPACITY_RANK_CE_CHARGER2026',
    industryKeys: ['消费电子'],
    key: '充电设备',
    title: '2026充电设备出货量TOP10',
    subtitle: '口径：充电器/移动电源年化出货量（万台/年）；均为充电品牌/ODM龙头',
    capacityUnit: '万台/年',
    ENTRIES: CHARGER_POWER,
  },
  {
    id: 'ce-camera-module',
    varName: 'CAPACITY_RANK_CE_CAMERA_MODULE2026',
    industryKeys: ['消费电子'],
    key: '摄像头模组',
    title: '2026摄像头模组出货量TOP10',
    subtitle: '口径：摄像头模组/光学组件年化出货量（万套/年）；均为光学影像制造龙头',
    capacityUnit: '万套/年',
    ENTRIES: CAMERA_MODULE,
  },
];

const payloads = RANKINGS.map((r) => ({
  ...r,
  payload: buildPayload(r, r.ENTRIES),
}));

const outDir = path.join(__dirname, '..', 'data');
const jsLines = [
  '/** 2026 消费电子产能排行榜 · 由 scripts/build-capacity-rank-consumer-electronics2026.js 生成 */',
];
payloads.forEach(({ varName, payload }) => {
  jsLines.push(`var ${varName} = ${JSON.stringify(payload, null, 2)};`);
  jsLines.push(`if (typeof window !== 'undefined') window.${varName} = ${varName};`);
  fs.writeFileSync(
    path.join(outDir, `capacity-rank-${payloads.find((p) => p.varName === varName).id}2026.json`),
    JSON.stringify(payload, null, 2),
    'utf8'
  );
});
jsLines.push('');
jsLines.push('var CAPACITY_RANK_REGISTRY_CONSUMER_ELECTRONICS2026 = {');
payloads.forEach(({ varName, payload }, i) => {
  jsLines.push(`  '${payload.key}': ${varName}${i < payloads.length - 1 ? ',' : ''}`);
});
jsLines.push('};');
jsLines.push(
  "if (typeof window !== 'undefined') window.CAPACITY_RANK_REGISTRY_CONSUMER_ELECTRONICS2026 = CAPACITY_RANK_REGISTRY_CONSUMER_ELECTRONICS2026;"
);

fs.writeFileSync(
  path.join(outDir, 'capacity-rank-consumer-electronics2026.js'),
  jsLines.join('\n') + '\n',
  'utf8'
);
fs.writeFileSync(
  path.join(outDir, 'capacity-rank-consumer-electronics2026.json'),
  JSON.stringify(payloads.map((p) => p.payload), null, 2),
  'utf8'
);

console.log('OK 写入 capacity-rank-consumer-electronics2026.js 共', payloads.length, '个榜单');
payloads.forEach(({ payload }) => {
  console.log(' -', payload.key, payload.companies.length, '家');
});

module.exports = { RANKINGS, payloads, buildPayload };
