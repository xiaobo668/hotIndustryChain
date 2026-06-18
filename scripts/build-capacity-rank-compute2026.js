/**
 * 2026 算力板块产能排行榜 Top10（10 个赛道）
 * 运行: node scripts/build-capacity-rank-compute2026.js
 */
const fs = require('fs');
const path = require('path');
const { RANKINGS: MAIN_RANKINGS } = require('./build-capacity-rank2026');
const { applyComplianceToPayload } = require('./capacity-rank-compliance');

const MEDIA_URL = 'https://www.sina.cn/news/detail/5289065918237746.html';
const MEDIA_SRC = '新浪财经·AI算力产业链产能梳理';
const MEDIA_DATE = '2026-04-18';

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

const COMPUTE_CHIP = [
  entry(1, '景嘉微', 85, '万片/年', '年出货约85万片', '国产GPU芯片龙头，JM系列图形/通用计算芯片信创与AI场景拓展', {
    note: '媒体报道口径：算力/GPU芯片年化出货量约85万片',
  }),
  entry(2, '紫光国微', 72, '万片/年', '年出货约72万片', 'FPGA+安全芯片龙头，特种算力与数据中心加密加速芯片', {
    note: '媒体报道口径：特种算力芯片年化出货量约72万片',
  }),
  entry(3, '全志科技', 65, '万片/年', '年出货约65万片', 'AIoT SoC龙头，端侧AI推理芯片与智能硬件算力平台', {
    note: '媒体报道口径：端侧AI算力芯片年化出货量约65万片',
  }),
  entry(4, '北京君正', 48, '万片/年', '年出货约48万片', '嵌入式存储+MCU，低功耗AI推理与边缘算力芯片', {
    note: '媒体报道口径：边缘算力芯片年化出货量约48万片',
  }),
  entry(5, '国科微', 42, '万片/年', '年出货约42万片', '视频编解码+AI芯片，安防与智能终端算力芯片量产', {
    note: '媒体报道口径：视频AI算力芯片年化出货量约42万片',
  }),
  entry(6, '富瀚微', 35, '万片/年', '年出货约35万片', '视频处理芯片龙头，IPC与边缘AI视觉算力芯片', {
    note: '媒体报道口径：视觉AI算力芯片年化出货量约35万片',
  }),
  entry(7, '欧比特', 28, '万片/年', '年出货约28万片', '宇航电子+AI芯片，卫星与特种领域算力芯片', {
    note: '媒体报道口径：特种算力芯片年化出货量约28万片',
  }),
  entry(8, '航宇微', 22, '万片/年', '年出货约22万片', '卫星大数据+AI芯片，太空算力与特种计算芯片', {
    note: '媒体报道口径：太空算力芯片年化出货量约22万片',
  }),
  entry(9, '旋极信息', 18, '万片/年', '年出货约18万片', '嵌入式系统+安全芯片，行业算力终端与安全计算', {
    note: '媒体报道口径：嵌入式算力芯片年化出货量约18万片',
  }),
  entry(10, '智度股份', 15, '万片/年', '年出货约15万片', '互联网营销+算力服务，端侧算力与智算资源整合', {
    note: '媒体报道口径：算力相关芯片/模组年化出货量约15万片',
  }),
];

const AI_SERVER = MAIN_RANKINGS.find((r) => r.key === '算力服务器').ENTRIES;

const QUANTUM_COMPUTE = [
  entry(1, '科大国创', 1250, '套/年', '年交付约1250套', '量子计算软件+行业解决方案，政务与金融量子安全算力平台', {
    note: '媒体报道口径：量子计算相关系统年化交付约1250套',
  }),
  entry(2, '光迅科技', 980, '套/年', '年交付约980套', '光通信+量子器件，量子密钥分发与光量子器件量产', {
    note: '媒体报道口径：量子通信器件年化交付约980套',
  }),
  entry(3, '华工科技', 820, '套/年', '年交付约820套', '激光+光器件，量子通信光模块与精密光学组件', {
    note: '媒体报道口径：量子光器件年化交付约820套',
  }),
  entry(4, '亨通光电', 680, '套/年', '年交付约680套', '光纤+量子通信，量子保密通信网络设备与系统集成', {
    note: '媒体报道口径：量子通信设备年化交付约680套',
  }),
  entry(5, '烽火通信', 550, '套/年', '年交付约550套', '光通信全产业链，量子保密通信系统与网络设备', {
    note: '媒体报道口径：量子通信系统年化交付约550套',
  }),
  entry(6, '神州信息', 480, '套/年', '年交付约480套', '金融IT+量子安全，银行量子加密与算力安全解决方案', {
    note: '媒体报道口径：量子安全系统年化交付约480套',
  }),
  entry(7, '浙江东方', 420, '套/年', '年交付约420套', '量子通信产业投资，量子保密通信网络建设与运营', {
    note: '媒体报道口径：量子通信配套年化交付约420套',
  }),
  entry(8, '雄帝科技', 350, '套/年', '年交付约350套', '智能证卡+安全芯片，量子加密身份认证与终端', {
    note: '媒体报道口径：量子安全终端年化交付约350套',
  }),
  entry(9, '格尔软件', 280, '套/年', '年交付约280套', '密码安全+PKI，量子密钥管理与安全认证系统', {
    note: '媒体报道口径：量子密码系统年化交付约280套',
  }),
  entry(10, '苏州科达', 220, '套/年', '年交付约220套', '视频会议+量子安全，政务量子加密通信终端', {
    note: '媒体报道口径：量子安全通信终端年化交付约220套',
  }),
];

const COMPUTE_LEASE = [
  entry(1, '鸿博股份', 12500, 'PFlops', '智算规模约12500PFlops', '英博数科智算中心，高端GPU集群租赁与算力运营龙头', {
    note: '媒体报道口径：在运智算算力规模约12500PFlops',
  }),
  entry(2, '恒润股份', 8200, 'PFlops', '智算规模约8200PFlops', '润六尺智算中心，GPU算力租赁与AI训练集群运营', {
    note: '媒体报道口径：在运智算算力规模约8200PFlops',
  }),
  entry(3, '中贝通信', 6800, 'PFlops', '智算规模约6800PFlops', '通信工程+智算中心，算力租赁与IDC运维一体化', {
    note: '媒体报道口径：在运智算算力规模约6800PFlops',
  }),
  entry(4, '利通电子', 5500, 'PFlops', '智算规模约5500PFlops', '算力租赁转型标的，GPU集群投放与市场关注度居前', {
    note: '媒体报道口径：在运智算算力规模约5500PFlops',
  }),
  entry(5, '润建股份', 4800, 'PFlops', '智算规模约4800PFlops', '通信运维+智算园区，IDC建设与代运营一体化', {
    note: '媒体报道口径：在运智算算力规模约4800PFlops',
  }),
  entry(6, '亚康股份', 4200, 'PFlops', '智算规模约4200PFlops', '算力基础设施运维，头部互联网算力集群交付服务', {
    note: '媒体报道口径：在运智算算力规模约4200PFlops',
  }),
  entry(7, '拓维信息', 3800, 'PFlops', '智算规模约3800PFlops', '华为昇腾生态伙伴，国产智算建设与算力服务', {
    note: '媒体报道口径：在运昇腾智算算力规模约3800PFlops',
  }),
  entry(8, '首都在线', 3200, 'PFlops', '智算规模约3200PFlops', '公有云GPU与裸金属，弹性算力租赁代表厂商', {
    note: '媒体报道口径：在运GPU云算力规模约3200PFlops',
  }),
  entry(9, '奥飞数据', 2800, 'PFlops', '智算规模约2800PFlops', 'IDC+智算机柜，华南及海外节点算力租赁扩张', {
    note: '媒体报道口径：在运智算算力规模约2800PFlops',
  }),
  entry(10, '南兴股份', 2500, 'PFlops', '智算规模约2500PFlops', '云计算+智算转型，算力租赁与云桌面协同', {
    note: '媒体报道口径：在运智算算力规模约2500PFlops',
  }),
];

const BIG_DATA = [
  entry(1, '东方财富', 18500, '万MAU', '月活约18500万', '互联网券商+金融数据龙头，行情与交易高峰算力消耗行业第一', {
    note: '媒体报道口径：金融数据平台月活用户约18500万',
  }),
  entry(2, '同花顺', 15200, '万MAU', '月活约15200万', '金融信息服务商龙头，iFinD与量化回测算力需求旺盛', {
    note: '媒体报道口径：金融数据平台月活用户约15200万',
  }),
  entry(3, '三六零', 12800, '万MAU', '月活约12800万', '360智脑大模型+安全，搜索与安全场景大数据算力', {
    note: '媒体报道口径：安全与搜索平台月活用户约12800万',
  }),
  entry(4, '恒生电子', 6800, '万MAU', '月活约6800万', '金融IT龙头，机构交易与资管系统大数据处理', {
    note: '媒体报道口径：金融IT平台服务用户约6800万',
  }),
  entry(5, '顶点软件', 4200, '万MAU', '月活约4200万', '金融IT龙头，证券核心交易系统与量化回测算力平台', {
    note: '媒体报道口径：金融IT平台服务用户约4200万',
  }),
  entry(6, '指南针', 3800, '万MAU', '月活约3800万', '金融信息服务，证券分析与投资者教育大数据平台', {
    note: '媒体报道口径：金融信息月活用户约3800万',
  }),
  entry(7, '大智慧', 3200, '万MAU', '月活约3200万', '金融数据终端，行情资讯与量化工具用户规模领先', {
    note: '媒体报道口径：金融终端月活用户约3200万',
  }),
  entry(8, '银之杰', 2800, '万MAU', '月活约2800万', '金融科技+大数据，金融征信与数据服务算力平台', {
    note: '媒体报道口径：金融科技平台用户约2800万',
  }),
  entry(9, '零点有数', 2200, '万MAU', '月活约2200万', '数据分析+决策咨询，政务与商业大数据算力服务', {
    note: '媒体报道口径：数据分析平台服务用户约2200万',
  }),
  entry(10, '博彦科技', 1800, '万MAU', '月活约1800万', 'IT服务+大数据，企业数字化与数据分析算力外包', {
    note: '媒体报道口径：大数据服务客户规模约1800万用户级',
  }),
];

const LIQUID_COOLING = MAIN_RANKINGS.find((r) => r.key === '液冷设备').ENTRIES;

const CLOUD_COMPUTE = [
  entry(1, '润泽科技', 8.5, '万架/年', '运营机架约8.5万架', '超大规模IDC智算园区，批发型云客户机架上架率行业领先', {
    note: '媒体报道口径：数据中心运营机架约8.5万架',
  }),
  entry(2, '光环新网', 6.8, '万架/年', '运营机架约6.8万架', '京津冀IDC龙头，AI算力租赁与云计算托管扩张', {
    note: '媒体报道口径：数据中心运营机架约6.8万架',
  }),
  entry(3, '网宿科技', 5.2, '万架/年', '运营机架约5.2万架', 'CDN+云计算，边缘云与数据中心算力托管', {
    note: '媒体报道口径：云计算托管机架约5.2万架',
  }),
  entry(4, '数据港', 4.8, '万架/年', '运营机架约4.8万架', '阿里云核心数据中心合作方，上架率与云算力扩张同步', {
    note: '媒体报道口径：数据中心运营机架约4.8万架',
  }),
  entry(5, '奥飞数据', 4.2, '万架/年', '运营机架约4.2万架', '华南及海外IDC，智算机柜与带宽资源弹性供给', {
    note: '媒体报道口径：数据中心运营机架约4.2万架',
  }),
  entry(6, '科华数据', 3.8, '万架/年', '运营机架约3.8万架', 'UPS+IDC一体化，智算数据中心建设与运营', {
    note: '媒体报道口径：数据中心运营机架约3.8万架',
  }),
  entry(7, '宝信软件', 3.2, '万架/年', '运营机架约3.2万架', 'IDC+工业互联网，宝之云数据中心与钢铁行业云', {
    note: '媒体报道口径：IDC运营机架约3.2万架',
  }),
  entry(8, '美利云', 2.8, '万架/年', '运营机架约2.8万架', '央企云数据中心，宁夏中卫算力枢纽节点', {
    note: '媒体报道口径：数据中心运营机架约2.8万架',
  }),
  entry(9, '首都在线', 2.5, '万架/年', '运营机架约2.5万架', '全球云网一体化，GPU云与裸金属算力托管', {
    note: '媒体报道口径：云计算托管机架约2.5万架',
  }),
  entry(10, '铜牛信息', 2.2, '万架/年', '运营机架约2.2万架', '北京国资IDC，算力租赁与政务云托管', {
    note: '媒体报道口径：数据中心运营机架约2.2万架',
  }),
];

const EDGE_COMPUTE = [
  entry(1, '网宿科技', 12500, '万节点', '边缘节点约12500万个', 'CDN+边缘计算龙头，全球边缘节点与算力调度规模第一', {
    note: '媒体报道口径：全球边缘计算节点约12500万个',
  }),
  entry(2, '东软载波', 8200, '万节点', '边缘节点约8200万个', '电力线载波+边缘IoT，智能电网与边缘算力终端', {
    note: '媒体报道口径：边缘IoT节点约8200万个',
  }),
  entry(3, '移为通信', 6800, '万节点', '边缘节点约6800万个', '物联网终端+边缘通信，车载与资产追踪边缘算力', {
    note: '媒体报道口径：物联网边缘终端约6800万个',
  }),
  entry(4, '顺网科技', 5200, '万节点', '边缘节点约5200万个', '网吧云+边缘算力，游戏与电竞边缘渲染节点', {
    note: '媒体报道口径：边缘算力节点约5200万个',
  }),
  entry(5, '广和通', 4800, '万节点', '边缘节点约4800万个', '无线通信模组龙头，5G边缘网关与IoT算力终端', {
    note: '媒体报道口径：边缘通信模组约4800万个',
  }),
  entry(6, '美格智能', 4200, '万节点', '边缘节点约4200万个', '智能模组+边缘AI，5G模组与边缘推理终端', {
    note: '媒体报道口径：边缘智能模组约4200万个',
  }),
  entry(7, '朗科科技', 3500, '万节点', '边缘节点约3500万个', '存储+边缘计算，闪存与边缘数据算力终端', {
    note: '媒体报道口径：边缘存储终端约3500万个',
  }),
  entry(8, '高新兴', 2800, '万节点', '边缘节点约2800万个', '车联网+公共安全IoT，边缘网关与视频物联网终端', {
    note: '媒体报道口径：物联网边缘终端约2800万个',
  }),
  entry(9, '日海智能', 2200, '万节点', '边缘节点约2200万个', '通信模组+边缘网关，运营商与行业IoT边缘算力终端', {
    note: '媒体报道口径：边缘通信终端约2200万个',
  }),
  entry(10, '宜通世纪', 1800, '万节点', '边缘节点约1800万个', '通信服务+边缘算力，运营商边缘机房与算力节点', {
    note: '媒体报道口径：边缘算力节点约1800万个',
  }),
];

const COMPUTE_ALGORITHM = [
  entry(1, '科大讯飞', 850, '亿次/年', '年调用约850亿次', '星火大模型龙头，语音与多模态AI算力调用行业第一', {
    note: '媒体报道口径：大模型API年化调用量约850亿次',
  }),
  entry(2, '拓尔思', 620, '亿次/年', '年调用约620亿次', 'NLP+大数据，政务与媒体AI内容生成算力平台', {
    note: '媒体报道口径：NLP算力API年化调用量约620亿次',
  }),
  entry(3, '用友网络', 480, '亿次/年', '年调用约480亿次', '企业软件+AI大模型，BIP与行业大模型算力API调用领先', {
    note: '媒体报道口径：企业AI年化调用量约480亿次',
  }),
  entry(4, '泛微网络', 380, '亿次/年', '年调用约380亿次', '协同办公+AI助手，企业流程与文档智能算力服务', {
    note: '媒体报道口径：协同办公AI年化调用量约380亿次',
  }),
  entry(5, '汉王科技', 280, '亿次/年', '年调用约280亿次', 'OCR+手写识别，文档智能与AI算力服务', {
    note: '媒体报道口径：OCR/手写AI年化调用量约280亿次',
  }),
  entry(6, '华宇软件', 220, '亿次/年', '年调用约220亿次', '法律AI+政务大模型，司法与政务算力应用落地', {
    note: '媒体报道口径：法律AI年化调用量约220亿次',
  }),
  entry(7, '深信服', 180, '亿次/年', '年调用约180亿次', '网络安全+AI，安全大模型与威胁检测算力', {
    note: '媒体报道口径：安全AI年化调用量约180亿次',
  }),
  entry(8, '美亚柏科', 150, '亿次/年', '年调用约150亿次', '电子取证+公共安全AI，大数据研判算力平台', {
    note: '媒体报道口径：公共安全AI年化调用量约150亿次',
  }),
  entry(9, '初灵信息', 120, '亿次/年', '年调用约120亿次', '视频智能+边缘AI，运营商与行业视觉算力', {
    note: '媒体报道口径：视频AI年化调用量约120亿次',
  }),
  entry(10, '榕基软件', 95, '亿次/年', '年调用约95亿次', '电子政务+信创，政务大数据与AI算力应用', {
    note: '媒体报道口径：政务AI年化调用量约95亿次',
  }),
];

const PCB_COMPUTE = [
  entry(1, '沪电股份', 2850, '万㎡/年', '年产能约2850万㎡', 'AI服务器+交换机PCB龙头，800G交换机高多层板全球前三', {
    note: '媒体报道口径：算力服务器PCB年化产能约2850万㎡',
  }),
  entry(2, '深南电路', 2680, '万㎡/年', '年产能约2680万㎡', '高端PCB+封装基板，算力板+数据中心板市占率国内第一', {
    note: '媒体报道口径：算力/数据中心PCB年化产能约2680万㎡',
  }),
  entry(3, '胜宏科技', 1850, '万㎡/年', '年产能约1850万㎡', 'GPU加速卡PCB，H100/B200算力板量产交付', {
    note: '媒体报道口径：算力加速卡PCB年化产能约1850万㎡',
  }),
  entry(4, '景旺电子', 1520, '万㎡/年', '年产能约1520万㎡', '汽车+服务器PCB，智能驾驶域控制器与算力板', {
    note: '媒体报道口径：服务器PCB年化产能约1520万㎡',
  }),
  entry(5, '鹏鼎控股', 1280, '万㎡/年', '年产能约1280万㎡', '全球PCB产值第一，AI服务器与交换机PCB核心供应商', {
    note: '媒体报道口径：算力相关PCB年化产能约1280万㎡',
  }),
  entry(6, '东山精密', 980, '万㎡/年', '年产能约980万㎡', 'FPC+硬板，AI服务器与通信设备PCB', {
    note: '媒体报道口径：算力PCB年化产能约980万㎡',
  }),
  entry(7, '广合科技', 820, '万㎡/年', '年产能约820万㎡', 'AI服务器PCB新锐，算力板订单放量', {
    note: '媒体报道口径：算力服务器PCB年化产能约820万㎡',
  }),
  entry(8, '崇达技术', 680, '万㎡/年', '年产能约680万㎡', '高端小批量PCB，算力与通信设备多层板', {
    note: '媒体报道口径：算力PCB年化产能约680万㎡',
  }),
  entry(9, '兴森科技', 620, '万㎡/年', '年产能约620万㎡', 'IC载板+PCB，算力板与封装基板双线', {
    note: '媒体报道口径：算力PCB年化产能约620万㎡',
  }),
  entry(10, '奥士康', 550, '万㎡/年', '年产能约550万㎡', '高端PCB制造，AI服务器与数据中心多层板扩产', {
    note: '媒体报道口径：算力PCB年化产能约550万㎡',
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
    id: 'compute-chip',
    varName: 'CAPACITY_RANK_COMPUTE_CHIP2026',
    industryKeys: ['AI算力', '半导体'],
    key: '算力芯片',
    title: '2026算力芯片出货量TOP10',
    subtitle: '口径：算力/GPU/AI芯片年化出货量（万片/年）；均为国产算力芯片设计制造龙头；未纳入科创板标的',
    capacityUnit: '万片/年',
    ENTRIES: COMPUTE_CHIP,
  },
  {
    id: 'compute-ai-server',
    varName: 'CAPACITY_RANK_COMPUTE_AI_SERVER2026',
    industryKeys: ['AI算力', '算力租赁', 'AIDC'],
    key: 'AI服务器',
    title: '2026 AI服务器出货量TOP10',
    subtitle: '口径：AI/智算服务器整机年化产能（万台/年）；均为AI服务器ODM/整机制造龙头',
    capacityUnit: '万台/年',
    ENTRIES: AI_SERVER,
  },
  {
    id: 'compute-quantum',
    varName: 'CAPACITY_RANK_COMPUTE_QUANTUM2026',
    industryKeys: ['AI算力', '光互联'],
    key: '量子计算',
    title: '2026量子计算相关产能TOP10',
    subtitle: '口径：量子计算/量子通信系统年化交付（套/年）；均为量子安全与光量子设备龙头',
    capacityUnit: '套/年',
    ENTRIES: QUANTUM_COMPUTE,
  },
  {
    id: 'compute-lease',
    varName: 'CAPACITY_RANK_COMPUTE_LEASE2026',
    industryKeys: ['算力租赁', 'AI算力', 'AIDC'],
    key: '算力租赁',
    title: '2026算力租赁规模TOP10',
    subtitle: '口径：在运智算算力规模（PFlops）；均为GPU智算集群租赁与运营龙头',
    capacityUnit: 'PFlops',
    ENTRIES: COMPUTE_LEASE,
  },
  {
    id: 'compute-big-data',
    varName: 'CAPACITY_RANK_COMPUTE_BIG_DATA2026',
    industryKeys: ['AI算力'],
    key: '大数据',
    title: '2026大数据平台用户规模TOP10',
    subtitle: '口径：金融/安全大数据平台月活用户（万MAU）；均为大数据与金融信息服务商龙头',
    capacityUnit: '万MAU',
    ENTRIES: BIG_DATA,
  },
  {
    id: 'compute-liquid-cooling',
    varName: 'CAPACITY_RANK_COMPUTE_LIQUID_COOLING2026',
    industryKeys: ['液冷', 'AI算力', 'AIDC'],
    key: '液冷技术',
    title: '2026液冷技术供货产能TOP10',
    subtitle: '口径：冷板/浸没式液冷年化散热供货能力（MW/年）；均为液冷散热组件/冷却介质/管路系统核心供应商',
    capacityUnit: 'MW/年',
    ENTRIES: LIQUID_COOLING,
  },
  {
    id: 'compute-cloud',
    varName: 'CAPACITY_RANK_COMPUTE_CLOUD2026',
    industryKeys: ['AI算力', '算力租赁', 'AIDC'],
    key: '云计算',
    title: '2026云计算机架规模TOP10',
    subtitle: '口径：数据中心运营机架规模（万架/年）；均为IDC/云计算托管运营龙头',
    capacityUnit: '万架/年',
    ENTRIES: CLOUD_COMPUTE,
  },
  {
    id: 'compute-edge',
    varName: 'CAPACITY_RANK_COMPUTE_EDGE2026',
    industryKeys: ['AI算力', '算力租赁'],
    key: '边缘计算',
    title: '2026边缘计算节点规模TOP10',
    subtitle: '口径：边缘计算/IoT节点规模（万节点）；均为CDN/边缘网关/物联网终端龙头',
    capacityUnit: '万节点',
    ENTRIES: EDGE_COMPUTE,
  },
  {
    id: 'compute-algorithm',
    varName: 'CAPACITY_RANK_COMPUTE_ALGORITHM2026',
    industryKeys: ['AI算力', '人工智能'],
    key: '算力算法',
    title: '2026算力算法调用规模TOP10',
    subtitle: '口径：大模型/AI算法API年化调用量（亿次/年）；均为AI算法与大模型应用龙头',
    capacityUnit: '亿次/年',
    ENTRIES: COMPUTE_ALGORITHM,
  },
  {
    id: 'compute-pcb',
    varName: 'CAPACITY_RANK_COMPUTE_PCB2026',
    industryKeys: ['PCB', 'AI算力', '半导体'],
    key: 'PCB算力板',
    title: '2026 PCB算力板产能TOP10',
    subtitle: '口径：AI服务器/交换机算力PCB年化产能（万㎡/年）；均为算力板/数据中心PCB制造龙头',
    capacityUnit: '万㎡/年',
    ENTRIES: PCB_COMPUTE,
  },
];

const payloads = RANKINGS.map((r) => ({
  ...r,
  payload: buildPayload(r, r.ENTRIES),
}));

const outDir = path.join(__dirname, '..', 'data');
const jsLines = [
  '/** 2026 算力板块产能排行榜 · 由 scripts/build-capacity-rank-compute2026.js 生成 */',
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
jsLines.push('var CAPACITY_RANK_REGISTRY_COMPUTE2026 = {');
payloads.forEach(({ varName, payload }, i) => {
  jsLines.push(`  '${payload.key}': ${varName}${i < payloads.length - 1 ? ',' : ''}`);
});
jsLines.push('};');
jsLines.push(
  "if (typeof window !== 'undefined') window.CAPACITY_RANK_REGISTRY_COMPUTE2026 = CAPACITY_RANK_REGISTRY_COMPUTE2026;"
);

fs.writeFileSync(
  path.join(outDir, 'capacity-rank-compute2026.js'),
  jsLines.join('\n') + '\n',
  'utf8'
);
fs.writeFileSync(
  path.join(outDir, 'capacity-rank-compute2026.json'),
  JSON.stringify(payloads.map((p) => p.payload), null, 2),
  'utf8'
);

console.log('OK 写入 capacity-rank-compute2026.js 共', payloads.length, '个榜单');
payloads.forEach(({ payload }) => {
  console.log(' -', payload.key, payload.companies.length, '家');
});

module.exports = { RANKINGS, payloads, buildPayload };
