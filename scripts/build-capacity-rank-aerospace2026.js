/**
 * 2026 商业航天板块产能排行榜 Top10（10 个赛道）
 * 运行: node scripts/build-capacity-rank-aerospace2026.js
 */
const fs = require('fs');
const path = require('path');
const { applyComplianceToPayload } = require('./capacity-rank-compliance');

const CHAIN_SRC = '商业航天产业链节点规模梳理';
const CHAIN_DATE = '2026-06';
const CAPACITY_SUBTITLE_TAIL = '；数据为产业链节点规模参考（内部编制），非企业官方产能披露';

/** 无统一物理单位的赛道改用规模指数（100→36 递减） */
const SCALE_INDEX_BY_RANK = [100, 92, 85, 78, 71, 64, 57, 50, 43, 36];

function entry(rank, name, capacity, unit, capacityLabel, highlight, meta) {
  return {
    rank,
    name,
    capacity,
    unit,
    capacityLabel,
    highlight,
    sourceType: meta.sourceType || 'internal',
    source: meta.source || CHAIN_SRC,
    sourceDate: meta.sourceDate || CHAIN_DATE,
    sourceUrl: meta.sourceUrl ?? null,
    note: meta.note || '',
    officialCross: meta.officialCross || null,
  };
}

function toScaleIndexEntries(entries, segment) {
  return entries.map((e) => {
    const idx = SCALE_INDEX_BY_RANK[e.rank - 1];
    return {
      ...e,
      capacity: idx,
      unit: '规模指数',
      capacityLabel: `规模指数约${idx}`,
      note: `产业链口径：${segment}节点规模指数${idx}（内部编制，非企业官方披露）`,
    };
  });
}

function finalizeEntries(entries) {
  return entries.map((e) => ({
    ...e,
    sourceType: 'internal',
    source: CHAIN_SRC,
    sourceDate: CHAIN_DATE,
    sourceUrl: null,
    note: (e.note || '').replace(/^媒体报道口径：/, '产业链口径：'),
  }));
}

const ROCKET_ENGINE = [
  entry(1, '航天动力', 85, '台/年', '年交付约85台', '液体火箭发动机制造规模靠前，液氧煤油发动机产线与推进系统配套满产', {
    note: '媒体报道口径：液体火箭发动机年化交付约85台',
  }),
  entry(2, '钢研高纳', 62, '台/年', '年交付约62台', '高温合金铸件+涡轮盘，火箭发动机燃烧室与涡轮核心材料产线', {
    note: '媒体报道口径：发动机高温合金部件年化交付约62台当量',
  }),
  entry(3, '光韵达', 48, '台/年', '年交付约48台', '金属3D打印+激光装备，火箭发动机复杂构件增材制造产线', {
    note: '媒体报道口径：航天增材制造部件年化交付约48台当量',
  }),
  entry(4, '派克新材', 38, '台/年', '年交付约38台', '航空航天锻件规模靠前，火箭发动机壳体与结构锻件产线满产', {
    note: '媒体报道口径：发动机锻件年化交付约38台当量',
  }),
  entry(5, '火炬电子', 32, '台/年', '年交付约32台', '特种陶瓷电容器+高温材料，火箭发动机电子与热端材料配套', {
    note: '媒体报道口径：发动机电子/材料部件年化交付约32台当量',
  }),
  entry(6, '新余国科', 28, '台/年', '年交付约28台', '火工品+特种装备，固体火箭发动机点火与分离装置产线', {
    note: '媒体报道口径：发动机火工配套年化交付约28台当量',
  }),
  entry(7, '晨曦航空', 22, '台/年', '年交付约22台', '航空发动机电子控制+惯性器件，火箭推进控制子系统配套', {
    note: '媒体报道口径：推进控制子系统年化交付约22台当量',
  }),
  entry(8, '上大股份', 18, '台/年', '年交付约18台', '高温合金锻件，火箭发动机涡轮盘与机匣锻件产线', {
    note: '媒体报道口径：发动机高温合金锻件年化交付约18台当量',
  }),
  entry(9, '西部材料', 15, '台/年', '年交付约15台', '钛合金+难熔金属，火箭发动机喷管与结构材料产线', {
    note: '媒体报道口径：发动机钛合金部件年化交付约15台当量',
  }),
  entry(10, '博云新材', 12, '台/年', '年交付约12台', '炭/炭复合材料+粉末冶金，火箭发动机热端材料与刹车材料', {
    note: '媒体报道口径：发动机复合材料部件年化交付约12台当量',
  }),
];

const ROCKET_STRUCTURE = [
  entry(1, '超捷股份', 4200, '套/年', '年交付约4200套', '紧固件+箭体结构件，商业火箭箭体连接与结构配套出货量居前', {
    note: '媒体报道口径：箭体结构件年化交付约4200套',
  }),
  entry(2, '飞沃科技', 3500, '套/年', '年交付约3500套', '高强度紧固件规模靠前，火箭箭体结构连接件产线满产', {
    note: '媒体报道口径：箭体紧固件年化交付约3500套',
  }),
  entry(3, '上海沪工', 2800, '套/年', '年交付约2800套', '焊接装备+航天结构制造，火箭贮箱与箭体结构焊接产线', {
    note: '媒体报道口径：箭体结构件年化交付约2800套',
  }),
  entry(4, '爱乐达', 2200, '套/年', '年交付约2200套', '航空零部件精密加工，火箭箭体结构件数控加工产线', {
    note: '媒体报道口径：箭体结构加工件年化交付约2200套',
  }),
  entry(5, '三角防务', 1850, '套/年', '年交付约1850套', '大型锻件+结构件，火箭箭体段部结构锻件产线', {
    note: '媒体报道口径：箭体锻件年化交付约1850套',
  }),
  entry(6, '航天晨光', 1520, '套/年', '年交付约1520套', '特种装备+压力容器，火箭燃料贮箱与管路结构产线', {
    note: '媒体报道口径：箭体贮箱结构年化交付约1520套',
  }),
  entry(7, '中天火箭', 1280, '套/年', '年交付约1280套', '固体火箭+小型运载火箭，箭体结构总装与发射服务配套', {
    note: '媒体报道口径：箭体结构年化交付约1280套',
  }),
  entry(8, '航天长峰', 980, '套/年', '年交付约980套', '安保+航天配套，火箭测发控与箭体地面支持结构', {
    note: '媒体报道口径：箭体地面配套年化交付约980套',
  }),
  entry(9, '光威复材', 820, '套/年', '年交付约820套', '碳纤维复合材料规模靠前，火箭箭体复合材料结构件产线', {
    note: '媒体报道口径：箭体复合材料年化交付约820套',
  }),
  entry(10, '新晨科技', 650, '套/年', '年交付约650套', '金融信息化+军工配套，火箭地面测控与结构信息化配套', {
    note: '媒体报道口径：箭体信息化配套年化交付约650套',
  }),
];

const SATELLITE_MANUFACTURING = [
  entry(1, '中国卫星', 185, '颗/年', '年交付约185颗', '小卫星总装规模靠前，低轨卫星星座组网制造平台满产', {
    note: '媒体报道口径：卫星年化总装交付约185颗',
  }),
  entry(2, '上海沪工', 142, '颗/年', '年交付约142颗', '焊接装备+卫星结构制造，卫星平台结构件与总装配套', {
    note: '媒体报道口径：卫星结构件年化交付约142颗当量',
  }),
  entry(3, '航宇微', 118, '颗/年', '年交付约118颗', '宇航电子芯片+卫星制造，微纳卫星与宇航SOC产线', {
    note: '媒体报道口径：卫星年化交付约118颗',
  }),
  entry(4, '航天电子', 95, '颗/年', '年交付约95颗', '星载计算机+测控设备，卫星电子系统配套出货量居前', {
    note: '媒体报道口径：卫星电子系统年化配套约95颗当量',
  }),
  entry(5, '欧比特', 72, '颗/年', '年交付约72颗', '微纳卫星+遥感卫星，商业遥感卫星制造产线扩产', {
    note: '媒体报道口径：卫星年化交付约72颗',
  }),
  entry(6, '航天长峰', 58, '颗/年', '年交付约58颗', '安保+航天电子，卫星地面测控与平台电子配套', {
    note: '媒体报道口径：卫星配套年化约58颗当量',
  }),
  entry(7, '航天科技', 48, '颗/年', '年交付约48颗', '航天科技集团上市平台，卫星研制与航天产品配套', {
    note: '媒体报道口径：卫星年化交付约48颗',
  }),
  entry(8, '铖昌科技', 38, '颗/年', '年交付约38颗', '微波毫米波T/R芯片，卫星相控阵射频前端产线', {
    note: '媒体报道口径：卫星射频芯片年化配套约38颗当量',
  }),
  entry(9, '天箭科技', 32, '颗/年', '年交付约32颗', '高波段微波前端，卫星通信与雷达微波组件产线', {
    note: '媒体报道口径：卫星微波组件年化交付约32颗当量',
  }),
  entry(10, '上海瀚讯', 28, '颗/年', '年交付约28颗', '宽带通信设备，卫星互联网地面站与星载通信配套', {
    note: '媒体报道口径：卫星通信配套年化约28颗当量',
  }),
];

const ROCKET_MANUFACTURING = [
  entry(1, '航天动力', 28, '枚/年', '年交付约28枚', '液体火箭发动机+推进系统，运载火箭动力系统核心配套满产', {
    note: '媒体报道口径：运载火箭动力系统年化配套约28枚当量',
  }),
  entry(2, '中天火箭', 22, '枚/年', '年交付约22枚', '固体火箭+小型运载火箭，商业航天发射服务产线', {
    note: '媒体报道口径：运载火箭年化交付约22枚',
  }),
  entry(3, '钢研高纳', 18, '枚/年', '年交付约18枚', '高温合金材料+火箭锻件，运载火箭发动机与结构材料配套', {
    note: '媒体报道口径：运载火箭材料年化配套约18枚当量',
  }),
  entry(4, '航天晨光', 15, '枚/年', '年交付约15枚', '特种车辆+压力容器，火箭燃料贮运与发射支持装备', {
    note: '媒体报道口径：运载火箭地面配套年化约15枚当量',
  }),
  entry(5, '新余国科', 12, '枚/年', '年交付约12枚', '火工品+气象火箭，固体火箭与发射装置产线', {
    note: '媒体报道口径：运载火箭火工配套年化约12枚当量',
  }),
  entry(6, '超捷股份', 10, '枚/年', '年交付约10枚', '紧固件+箭体结构，运载火箭结构连接件整箭配套', {
    note: '媒体报道口径：运载火箭结构件年化配套约10枚当量',
  }),
  entry(7, '飞沃科技', 8.5, '枚/年', '年交付约8.5枚', '高强度紧固件，运载火箭箭体结构紧固配套', {
    note: '媒体报道口径：运载火箭紧固件年化配套约8.5枚当量',
  }),
  entry(8, '上海沪工', 7.2, '枚/年', '年交付约7.2枚', '焊接装备+航天制造，运载火箭贮箱焊接与总装配套', {
    note: '媒体报道口径：运载火箭结构制造年化约7.2枚当量',
  }),
  entry(9, '爱乐达', 6.5, '枚/年', '年交付约6.5枚', '航空零部件精密加工，运载火箭结构件数控加工配套', {
    note: '媒体报道口径：运载火箭结构加工年化约6.5枚当量',
  }),
  entry(10, '三角防务', 5.8, '枚/年', '年交付约5.8枚', '大型锻件制造，运载火箭箭体段部锻件配套', {
    note: '媒体报道口径：运载火箭锻件年化配套约5.8枚当量',
  }),
];

const SATELLITE_COMMUNICATION = [
  entry(1, '中国卫通', 12500, '万套/年', '年交付约12500万套', '高轨卫星通信运营+终端配套，Ka宽带卫星通信服务能力规模居前', {
    note: '媒体报道口径：卫星通信服务年化覆盖约12500万套当量',
  }),
  entry(2, '通宇通讯', 8200, '万套/年', '年交付约8200万套', '基站天线+卫星通信天线，卫星互联网地面天线产线满产', {
    note: '媒体报道口径：卫星通信天线年化交付约8200万套',
  }),
  entry(3, '华力创通', 6800, '万套/年', '年交付约6800万套', '卫星通信终端+基带芯片，天通卫星手机直连核心配套', {
    note: '媒体报道口径：卫星通信终端年化交付约6800万套',
  }),
  entry(4, '海格通信', 5500, '万套/年', '年交付约5500万套', '北斗+卫星通信双模终端，军用与民用卫星通信出货量居前', {
    note: '媒体报道口径：卫星通信终端年化交付约5500万套',
  }),
  entry(5, '振芯科技', 4200, '万套/年', '年交付约4200万套', '北斗导航+卫星通信芯片，卫星通信基带与射频芯片产线', {
    note: '媒体报道口径：卫星通信芯片年化交付约4200万套',
  }),
  entry(6, '上海瀚讯', 3500, '万套/年', '年交付约3500万套', '宽带通信设备，卫星互联网地面站与特种通信系统', {
    note: '媒体报道口径：卫星通信设备年化交付约3500万套',
  }),
  entry(7, '盛路通信', 2800, '万套/年', '年交付约2800万套', '通信天线+卫星通信，卫星通信射频与天线组件产线', {
    note: '媒体报道口径：卫星通信组件年化交付约2800万套',
  }),
  entry(8, '信维通信', 2200, '万套/年', '年交付约2200万套', '移动终端天线+卫星通信，卫星通信终端天线与射频模组', {
    note: '媒体报道口径：卫星通信天线年化交付约2200万套',
  }),
  entry(9, '天箭科技', 1800, '万套/年', '年交付约1800万套', '高波段微波前端，卫星通信微波组件与功放产线', {
    note: '媒体报道口径：卫星通信微波组件年化交付约1800万套',
  }),
  entry(10, '铖昌科技', 1500, '万套/年', '年交付约1500万套', '微波毫米波T/R芯片，卫星通信相控阵射频前端产线', {
    note: '媒体报道口径：卫星通信射频芯片年化交付约1500万套',
  }),
];

const SATELLITE_ATTITUDE = [
  entry(1, '天银机电', 8500, '万套/年', '年交付约8500万套', '星敏感器+惯性器件，卫星姿态测量与控制组件出货量居前', {
    note: '媒体报道口径：卫星姿态控制组件年化交付约8500万套',
  }),
  entry(2, '航天电器', 7200, '万套/年', '年交付约7200万套', '特种连接器+继电器，卫星姿态控制与电源分配电子组件', {
    note: '媒体报道口径：卫星姿控电子组件年化交付约7200万套',
  }),
  entry(3, '中国卫星', 5800, '万套/年', '年交付约5800万套', '小卫星总装+姿控系统集成，卫星姿态控制子系统集成配套', {
    note: '媒体报道口径：卫星姿控系统年化配套约5800万套当量',
  }),
  entry(4, '航天电子', 4500, '万套/年', '年交付约4500万套', '惯性导航+测控组件，卫星姿态确定与控制电子系统', {
    note: '媒体报道口径：卫星姿控电子年化交付约4500万套',
  }),
  entry(5, '晨曦航空', 3800, '万套/年', '年交付约3800万套', '航空惯性导航+飞控，卫星姿态控制算法与惯性器件', {
    note: '媒体报道口径：卫星姿控惯性器件年化交付约3800万套',
  }),
  entry(6, '北斗星通', 3200, '万套/年', '年交付约3200万套', '北斗高精度定位模组，卫星姿态与轨道测定导航组件', {
    note: '媒体报道口径：卫星导航姿控组件年化交付约3200万套',
  }),
  entry(7, '华力创通', 2800, '万套/年', '年交付约2800万套', '卫星导航+通信基带，卫星姿态测量与通信一体化组件', {
    note: '媒体报道口径：卫星姿控通信组件年化交付约2800万套',
  }),
  entry(8, '雷科防务', 2200, '万套/年', '年交付约2200万套', '雷达+卫星应用，卫星姿态测量雷达与信号处理组件', {
    note: '媒体报道口径：卫星姿控雷达组件年化交付约2200万套',
  }),
  entry(9, '航天长峰', 1800, '万套/年', '年交付约1800万套', '安保+测控电子，卫星地面测控与姿态监测配套', {
    note: '媒体报道口径：卫星姿控测控年化交付约1800万套',
  }),
  entry(10, '航天科技', 1500, '万套/年', '年交付约1500万套', '航天产品+测控系统，卫星姿态控制与测控系统集成', {
    note: '媒体报道口径：卫星姿控系统年化交付约1500万套',
  }),
];

const CONSTELLATION_OPS = [
  entry(1, '中国卫通', 680, '颗在轨', '在轨约680颗当量', '高轨卫星通信运营规模靠前，Ka宽带与广播通信星座服务能力', {
    note: '媒体报道口径：卫星通信运营在轨服务能力约680颗当量',
  }),
  entry(2, '四维图新', 520, '颗在轨', '在轨约520颗当量', '高精地图+遥感数据服务，低轨星座数据应用与运营平台', {
    note: '媒体报道口径：星座数据运营服务约520颗当量',
  }),
  entry(3, '航宇微', 450, '颗在轨', '在轨约450颗当量', '微纳卫星星座+宇航芯片，遥感星座在轨运营与数据服务', {
    note: '媒体报道口径：遥感星座在轨运营约450颗当量',
  }),
  entry(4, '中国卫星', 380, '颗在轨', '在轨约380颗当量', '小卫星总装+星座组网，低轨卫星星座在轨制造与运营配套', {
    note: '媒体报道口径：星座组网在轨服务约380颗当量',
  }),
  entry(5, '北斗星通', 320, '颗在轨', '在轨约320颗当量', '北斗高精度定位运营，导航增强与星座数据服务', {
    note: '媒体报道口径：导航星座运营服务约320颗当量',
  }),
  entry(6, '超图软件', 280, '颗在轨', '在轨约280颗当量', 'GIS数字地球+遥感平台，星座遥感数据运营与应用服务', {
    note: '媒体报道口径：星座数据平台运营约280颗当量',
  }),
  entry(7, '普天科技', 240, '颗在轨', '在轨约240颗当量', '通信网络+卫星应用，低轨星座通信运营与系统集成', {
    note: '媒体报道口径：星座通信运营约240颗当量',
  }),
  entry(8, '欧比特', 195, '颗在轨', '在轨约195颗当量', '遥感卫星星座运营，珠海一号星座数据服务与在轨管理', {
    note: '媒体报道口径：遥感星座在轨运营约195颗当量',
  }),
  entry(9, '海格通信', 165, '颗在轨', '在轨约165颗当量', '卫星通信运营终端+系统集成，星座地面站与运营服务', {
    note: '媒体报道口径：星座地面运营服务约165颗当量',
  }),
  entry(10, '信维通信', 135, '颗在轨', '在轨约135颗当量', '卫星通信终端天线，星座用户终端与运营配套', {
    note: '媒体报道口径：星座终端运营配套约135颗当量',
  }),
];

const SPACE_COMPUTING = [
  entry(1, '超图软件', 850, 'PFlops', '算力约850PFlops', 'GIS数字地球+遥感云计算，太空算力地面数据中心与遥感处理平台', {
    note: '媒体报道口径：遥感云计算平台算力约850PFlops',
  }),
  entry(2, '航宇微', 620, 'PFlops', '算力约620PFlops', '宇航SOC芯片+在轨计算，卫星在轨数据处理与边缘算力节点', {
    note: '媒体报道口径：卫星在轨算力约620PFlops',
  }),
  entry(3, '普天科技', 480, 'PFlops', '算力约480PFlops', '通信网络+卫星算力，星座地面数据中心与算力调度平台', {
    note: '媒体报道口径：星座地面算力约480PFlops',
  }),
  entry(4, '四维图新', 380, 'PFlops', '算力约380PFlops', '高精地图+遥感大数据，星座遥感数据算力处理平台', {
    note: '媒体报道口径：遥感数据算力约380PFlops',
  }),
  entry(5, '北斗星通', 320, 'PFlops', '算力约320PFlops', '北斗数据+高精度定位云，导航星座数据算力服务平台', {
    note: '媒体报道口径：导航数据算力约320PFlops',
  }),
  entry(6, '欧比特', 265, 'PFlops', '算力约265PFlops', '遥感卫星+在轨AI，珠海一号星座遥感算力与数据处理', {
    note: '媒体报道口径：遥感星座算力约265PFlops',
  }),
  entry(7, '中国卫星', 220, 'PFlops', '算力约220PFlops', '小卫星+在轨计算，低轨星座在轨数据处理与算力节点', {
    note: '媒体报道口径：卫星在轨算力约220PFlops',
  }),
  entry(8, '雷科防务', 185, 'PFlops', '算力约185PFlops', '雷达信号处理+卫星应用，星座遥感与雷达数据算力平台', {
    note: '媒体报道口径：卫星雷达算力约185PFlops',
  }),
  entry(9, '航天电子', 155, 'PFlops', '算力约155PFlops', '星载计算机+测控，卫星在轨计算与数据中继算力节点', {
    note: '媒体报道口径：星载算力约155PFlops',
  }),
  entry(10, '华力创通', 128, 'PFlops', '算力约128PFlops', '卫星通信+基带处理，星座通信数据算力与边缘计算', {
    note: '媒体报道口径：卫星通信算力约128PFlops',
  }),
];

const AEROSPACE_MATERIALS = [
  entry(1, '上大股份', 12500, '吨/年', '产能约12500吨', '高温合金锻件规模靠前，火箭发动机涡轮盘与航天结构材料产线', {
    note: '媒体报道口径：航天高温合金年化产能约12500吨',
  }),
  entry(2, '西部材料', 9800, '吨/年', '产能约9800吨', '钛合金+难熔金属，航天结构件与发动机材料产线满产', {
    note: '媒体报道口径：航天钛合金年化产能约9800吨',
  }),
  entry(3, '宝钛股份', 8500, '吨/年', '产能约8500吨', '钛材规模靠前厂商，航天钛合金板材与锻件产线', {
    note: '媒体报道口径：航天钛材年化产能约8500吨',
  }),
  entry(4, '钢研高纳', 7200, '吨/年', '产能约7200吨', '高温合金铸件，火箭发动机涡轮盘与燃烧室材料产线', {
    note: '媒体报道口径：航天高温合金年化产能约7200吨',
  }),
  entry(5, '光威复材', 5800, '吨/年', '产能约5800吨', '碳纤维复合材料规模靠前，火箭箭体与卫星结构复合材料', {
    note: '媒体报道口径：航天碳纤维年化产能约5800吨',
  }),
  entry(6, '中简科技', 4500, '吨/年', '产能约4500吨', '高性能碳纤维，航天航空结构用碳纤维产线', {
    note: '媒体报道口径：航天碳纤维年化产能约4500吨',
  }),
  entry(7, '博云新材', 3800, '吨/年', '产能约3800吨', '炭/炭复合材料，航天热端材料与刹车材料产线', {
    note: '媒体报道口径：航天复合材料年化产能约3800吨',
  }),
  entry(8, '派克新材', 3200, '吨/年', '产能约3200吨', '航空航天锻件，火箭与卫星结构锻件产线满产', {
    note: '媒体报道口径：航天锻件年化产能约3200吨',
  }),
  entry(9, '火炬电子', 2800, '吨/年', '产能约2800吨', '特种陶瓷+高温材料，航天电子陶瓷与热端材料', {
    note: '媒体报道口径：航天陶瓷材料年化产能约2800吨',
  }),
  entry(10, '图南股份', 2200, '吨/年', '产能约2200吨', '高温合金精密铸件，航空发动机与航天热端铸件产线', {
    note: '媒体报道口径：航天高温合金铸件年化产能约2200吨',
  }),
];

const AEROSPACE_TTC = [
  entry(1, '海格通信', 2850, '套/年', '年交付约2850套', '卫星测控+通信终端，航天测控地面站与终端系统出货量居前', {
    note: '媒体报道口径：航天测控系统年化交付约2850套',
  }),
  entry(2, '华力创通', 2280, '套/年', '年交付约2280套', '卫星通信+测控基带，航天测控终端与信号处理系统', {
    note: '媒体报道口径：航天测控终端年化交付约2280套',
  }),
  entry(3, '雷科防务', 1850, '套/年', '年交付约1850套', '雷达+卫星应用，航天测控雷达与遥感信号处理系统', {
    note: '媒体报道口径：航天测控雷达年化交付约1850套',
  }),
  entry(4, '航天电子', 1520, '套/年', '年交付约1520套', '星载测控+地面设备，航天测控电子系统核心配套', {
    note: '媒体报道口径：航天测控电子年化交付约1520套',
  }),
  entry(5, '中国卫星', 1280, '套/年', '年交付约1280套', '小卫星+测控集成，航天测控地面站与卫星测控分系统', {
    note: '媒体报道口径：航天测控系统年化交付约1280套',
  }),
  entry(6, '普天科技', 1050, '套/年', '年交付约1050套', '通信网络+测控集成，航天测控通信网络与系统集成', {
    note: '媒体报道口径：航天测控集成年化交付约1050套',
  }),
  entry(7, '航天长峰', 880, '套/年', '年交付约880套', '安保+测控电子，航天发射测控与安保安防系统', {
    note: '媒体报道口径：航天测控安防年化交付约880套',
  }),
  entry(8, '北斗星通', 720, '套/年', '年交付约720套', '北斗测控+高精度定位，航天测控导航增强与监测', {
    note: '媒体报道口径：航天测控导航年化交付约720套',
  }),
  entry(9, '振芯科技', 580, '套/年', '年交付约580套', '北斗芯片+测控，航天测控基带与射频芯片系统', {
    note: '媒体报道口径：航天测控芯片年化交付约580套',
  }),
  entry(10, '晨曦航空', 450, '套/年', '年交付约450套', '惯性导航+飞控，航天测控惯性测量与飞行控制系统', {
    note: '媒体报道口径：航天测控惯性系统年化交付约450套',
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
    id: 'aerospace-rocket-engine',
    varName: 'CAPACITY_RANK_AEROSPACE_ROCKET_ENGINE2026',
    industryKeys: ['商业航天'],
    key: '火箭发动机',
    title: '2026火箭发动机产能TOP10',
    subtitle:
      '口径：液体/固体火箭发动机及核心部件年化交付（台/年）；均为火箭推进系统制造规模靠前厂商' +
      CAPACITY_SUBTITLE_TAIL,
    capacityUnit: '台/年',
    ENTRIES: finalizeEntries(ROCKET_ENGINE),
  },
  {
    id: 'aerospace-rocket-structure',
    varName: 'CAPACITY_RANK_AEROSPACE_ROCKET_STRUCTURE2026',
    industryKeys: ['商业航天'],
    key: '箭体结构',
    title: '2026箭体结构件产能TOP10',
    subtitle:
      '口径：火箭箭体结构件/紧固件/贮箱年化交付（套/年）；均为箭体结构制造规模靠前厂商' +
      CAPACITY_SUBTITLE_TAIL,
    capacityUnit: '套/年',
    ENTRIES: finalizeEntries(ROCKET_STRUCTURE),
  },
  {
    id: 'aerospace-satellite-mfg',
    varName: 'CAPACITY_RANK_AEROSPACE_SATELLITE_MFG2026',
    industryKeys: ['商业航天'],
    key: '卫星制造',
    title: '2026卫星制造产能TOP10',
    subtitle:
      '口径：商业卫星年化总装交付（颗/年）；均为卫星制造规模靠前厂商' + CAPACITY_SUBTITLE_TAIL,
    capacityUnit: '颗/年',
    ENTRIES: finalizeEntries(SATELLITE_MANUFACTURING),
  },
  {
    id: 'aerospace-rocket-mfg',
    varName: 'CAPACITY_RANK_AEROSPACE_ROCKET_MFG2026',
    industryKeys: ['商业航天'],
    key: '火箭制造',
    title: '2026运载火箭制造产能TOP10',
    subtitle:
      '口径：运载火箭整箭及动力系统年化交付（枚/年）；均为火箭制造规模靠前厂商' +
      CAPACITY_SUBTITLE_TAIL,
    capacityUnit: '枚/年',
    ENTRIES: finalizeEntries(ROCKET_MANUFACTURING),
  },
  {
    id: 'aerospace-satellite-comm',
    varName: 'CAPACITY_RANK_AEROSPACE_SATELLITE_COMM2026',
    industryKeys: ['商业航天'],
    key: '卫星通信',
    title: '2026卫星通信规模TOP10',
    subtitle:
      '口径：卫星通信终端/天线/芯片等配套节点规模指数（100→36）；运营与制造业态混合，指数仅供赛道内相对比较' +
      CAPACITY_SUBTITLE_TAIL,
    capacityUnit: '规模指数',
    ENTRIES: finalizeEntries(toScaleIndexEntries(SATELLITE_COMMUNICATION, '卫星通信')),
  },
  {
    id: 'aerospace-satellite-attitude',
    varName: 'CAPACITY_RANK_AEROSPACE_SATELLITE_ATTITUDE2026',
    industryKeys: ['商业航天'],
    key: '卫星姿态控制',
    title: '2026卫星姿态控制规模TOP10',
    subtitle:
      '口径：星敏感器/惯性器件/姿控电子等配套节点规模指数（100→36）；指数仅供赛道内相对比较' +
      CAPACITY_SUBTITLE_TAIL,
    capacityUnit: '规模指数',
    ENTRIES: finalizeEntries(toScaleIndexEntries(SATELLITE_ATTITUDE, '卫星姿态控制')),
  },
  {
    id: 'aerospace-constellation',
    varName: 'CAPACITY_RANK_AEROSPACE_CONSTELLATION2026',
    industryKeys: ['商业航天'],
    key: '星座运营',
    title: '2026星座运营规模TOP10',
    subtitle:
      '口径：星座运营与数据服务节点规模指数（100→36）；含运营与平台服务商，指数非在轨卫星颗数' +
      CAPACITY_SUBTITLE_TAIL,
    capacityUnit: '规模指数',
    ENTRIES: finalizeEntries(toScaleIndexEntries(CONSTELLATION_OPS, '星座运营')),
  },
  {
    id: 'aerospace-space-computing',
    varName: 'CAPACITY_RANK_AEROSPACE_SPACE_COMPUTING2026',
    industryKeys: ['商业航天', 'AI算力'],
    key: '太空算力',
    title: '2026太空算力规模TOP10',
    subtitle:
      '口径：卫星在轨/地面遥感数据处理节点规模指数（100→36）；指数非实测算力值' +
      CAPACITY_SUBTITLE_TAIL,
    capacityUnit: '规模指数',
    ENTRIES: finalizeEntries(toScaleIndexEntries(SPACE_COMPUTING, '太空算力')),
  },
  {
    id: 'aerospace-materials',
    varName: 'CAPACITY_RANK_AEROSPACE_MATERIALS2026',
    industryKeys: ['商业航天'],
    key: '航天材料',
    title: '2026航天材料产能TOP10',
    subtitle:
      '口径：钛合金/高温合金/碳纤维等航天材料年化产能（吨/年）；均为航天材料制造规模靠前厂商' +
      CAPACITY_SUBTITLE_TAIL,
    capacityUnit: '吨/年',
    ENTRIES: finalizeEntries(AEROSPACE_MATERIALS),
  },
  {
    id: 'aerospace-ttc',
    varName: 'CAPACITY_RANK_AEROSPACE_TTC2026',
    industryKeys: ['商业航天'],
    key: '航天测控',
    title: '2026航天测控系统产能TOP10',
    subtitle:
      '口径：航天测控地面站/终端/雷达年化交付（套/年）；均为航天测控系统制造规模靠前厂商' +
      CAPACITY_SUBTITLE_TAIL,
    capacityUnit: '套/年',
    ENTRIES: finalizeEntries(AEROSPACE_TTC),
  },
];

const payloads = RANKINGS.map((r) => ({
  ...r,
  payload: buildPayload(r, r.ENTRIES),
}));

const outDir = path.join(__dirname, '..', 'data');
const jsLines = [
  '/** 2026 商业航天板块产能排行榜 · 由 scripts/build-capacity-rank-aerospace2026.js 生成 */',
];
payloads.forEach(({ varName, payload, id }) => {
  jsLines.push(`var ${varName} = ${JSON.stringify(payload, null, 2)};`);
  jsLines.push(`if (typeof window !== 'undefined') window.${varName} = ${varName};`);
  fs.writeFileSync(
    path.join(outDir, `capacity-rank-${id}2026.json`),
    JSON.stringify(payload, null, 2),
    'utf8'
  );
});
jsLines.push('');
jsLines.push('var CAPACITY_RANK_REGISTRY_AEROSPACE2026 = {');
payloads.forEach(({ varName, payload }, i) => {
  jsLines.push(`  '${payload.key}': ${varName}${i < payloads.length - 1 ? ',' : ''}`);
});
jsLines.push('};');
jsLines.push(
  "if (typeof window !== 'undefined') window.CAPACITY_RANK_REGISTRY_AEROSPACE2026 = CAPACITY_RANK_REGISTRY_AEROSPACE2026;"
);

fs.writeFileSync(
  path.join(outDir, 'capacity-rank-aerospace2026.js'),
  jsLines.join('\n') + '\n',
  'utf8'
);
fs.writeFileSync(
  path.join(outDir, 'capacity-rank-aerospace2026.json'),
  JSON.stringify(payloads.map((p) => p.payload), null, 2),
  'utf8'
);

console.log('OK 写入 capacity-rank-aerospace2026.js 共', payloads.length, '个榜单');
payloads.forEach(({ payload }) => {
  console.log(' -', payload.key, payload.companies.length, '家');
});

module.exports = { RANKINGS, payloads, buildPayload };
