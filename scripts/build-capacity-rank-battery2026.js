/**
 * 2026 锂电池板块产能排行榜 Top10（10 个赛道）
 * 运行: node scripts/build-capacity-rank-battery2026.js
 */
const fs = require('fs');
const path = require('path');
const { applyComplianceToPayload } = require('./capacity-rank-compliance');

const MEDIA_URL = 'https://caifuhao.eastmoney.com/news/20260414055352939223580';
const MEDIA_SRC = '东方财富·锂电池产业链产能梳理';
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

const POWER_BATTERY = [
  entry(1, '宁德时代', 385, 'GWh/年', '产能约385GWh', '动力电池装机规模居前，麒麟/神行超充电池产线满产，大圆柱与储能电芯协同扩产', {
    note: '媒体报道口径：动力电池年化产能约385GWh',
  }),
  entry(2, '比亚迪', 320, 'GWh/年', '产能约320GWh', '刀片电池自供+外供双线，磷酸铁锂动力电池产线持续爬坡', {
    note: '媒体报道口径：动力电池年化产能约320GWh',
  }),
  entry(3, '亿纬锂能', 185, 'GWh/年', '产能约185GWh', '大圆柱+软包动力电池产线，动力与储能电芯双线满产', {
    note: '媒体报道口径：动力电池年化产能约185GWh',
  }),
  entry(4, '国轩高科', 142, 'GWh/年', '产能约142GWh', '磷酸铁锂动力电池产能扩张，大众合资产线与海外基地同步放量', {
    note: '媒体报道口径：动力电池年化产能约142GWh',
  }),
  entry(5, '欣旺达', 98, 'GWh/年', '产能约98GWh', '动力电池PACK+电芯一体化，混动与纯电客户订单饱满', {
    note: '媒体报道口径：动力电池年化产能约98GWh',
  }),
  entry(6, '中创新航', 85, 'GWh/年', '产能约85GWh', '三元+磷酸铁锂动力电池产线，乘用车与储能客户双线供货', {
    note: '媒体报道口径：动力电池年化产能约85GWh',
  }),
  entry(7, '鹏辉能源', 72, 'GWh/年', '产能约72GWh', '动力+储能电芯制造，大储与轻型动力电池产线扩产', {
    note: '媒体报道口径：动力电池年化产能约72GWh',
  }),
  entry(8, '多氟多', 58, 'GWh/年', '产能约58GWh', '大圆柱动力电池+储能电芯，氟化工锂盐与电芯垂直一体化', {
    note: '媒体报道口径：动力电池年化产能约58GWh',
  }),
  entry(9, '雄韬股份', 42, 'GWh/年', '产能约42GWh', '铅酸+锂电双主业，氢燃料电池与动力电池产线协同', {
    note: '媒体报道口径：动力电池年化产能约42GWh',
  }),
  entry(10, '蔚蓝锂芯', 35, 'GWh/年', '产能约35GWh', '小型动力+工具电池电芯，高倍率锂电池产线满产', {
    note: '媒体报道口径：动力电池年化产能约35GWh',
  }),
];

const CATHODE_MATERIAL = [
  entry(1, '湖南裕能', 85, '万吨/年', '产能约85万吨', '磷酸铁锂正极材料出货量规模居前，磷酸铁锂产线满产满销', {
    note: '媒体报道口径：磷酸铁锂正极年化产能约85万吨',
  }),
  entry(2, '当升科技', 42, '万吨/年', '产能约42万吨', '高镍NCM正极材料规模靠前，海外动力电池客户订单饱满', {
    note: '媒体报道口径：三元正极年化产能约42万吨',
  }),
  entry(3, '中伟新材', 38, '万吨/年', '产能约38万吨', '三元前驱体+正极材料一体化，前驱体产线规模国内领先', {
    note: '媒体报道口径：正极前驱体年化产能约38万吨',
  }),
  entry(4, '德方纳米', 32, '万吨/年', '产能约32万吨', '纳米磷酸铁锂正极材料，磷酸铁锂产线持续扩产', {
    note: '媒体报道口径：磷酸铁锂正极年化产能约32万吨',
  }),
  entry(5, '丰元股份', 28, '万吨/年', '产能约28万吨', '磷酸铁锂+草酸锂盐，正极材料与锂盐原料协同布局', {
    note: '媒体报道口径：正极材料年化产能约28万吨',
  }),
  entry(6, '龙蟠科技', 22, '万吨/年', '产能约22万吨', '磷酸铁锂正极材料扩产，车用润滑油与锂电材料双主业', {
    note: '媒体报道口径：正极材料年化产能约22万吨',
  }),
  entry(7, '盟固利', 18, '万吨/年', '产能约18万吨', '钴酸锂+三元正极材料，消费电子与动力电池正极双线', {
    note: '媒体报道口径：正极材料年化产能约18万吨',
  }),
  entry(8, '华友钴业', 15, '万吨/年', '产能约15万吨', '钴镍锂资源+三元前驱体，正极前驱体产线一体化', {
    note: '媒体报道口径：正极前驱体年化产能约15万吨',
  }),
  entry(9, '杉杉股份', 12, '万吨/年', '产能约12万吨', '人造石墨负极+正极材料，锂电材料双产品线协同', {
    note: '媒体报道口径：正极材料年化产能约12万吨',
  }),
  entry(10, '科恒股份', 8, '万吨/年', '产能约8万吨', '稀土发光材料+锂电正极，钴酸锂与三元正极产线', {
    note: '媒体报道口径：正极材料年化产能约8万吨',
  }),
];

const ANODE_MATERIAL = [
  entry(1, '贝特瑞', 28, '万吨/年', '产能约28万吨', '人造石墨负极材料出货量规模居前，硅基负极产线持续导入', {
    note: '媒体报道口径：负极材料年化产能约28万吨',
  }),
  entry(2, '璞泰来', 22, '万吨/年', '产能约22万吨', '人造石墨负极+涂覆隔膜，负极材料产线满产', {
    note: '媒体报道口径：负极材料年化产能约22万吨',
  }),
  entry(3, '杉杉股份', 18, '万吨/年', '产能约18万吨', '人造石墨负极材料规模靠前，负极产线与正极材料协同', {
    note: '媒体报道口径：负极材料年化产能约18万吨',
  }),
  entry(4, '尚太科技', 15, '万吨/年', '产能约15万吨', '人造石墨负极材料，一体化石墨化产线成本优势突出', {
    note: '媒体报道口径：负极材料年化产能约15万吨',
  }),
  entry(5, '中科电气', 12, '万吨/年', '产能约12万吨', '电磁冶金设备+负极材料，石墨化与负极产线垂直整合', {
    note: '媒体报道口径：负极材料年化产能约12万吨',
  }),
  entry(6, '翔丰华', 10, '万吨/年', '产能约10万吨', '人造石墨负极材料，快充负极产线扩产', {
    note: '媒体报道口径：负极材料年化产能约10万吨',
  }),
  entry(7, '方大炭素', 8, '万吨/年', '产能约8万吨', '石墨电极+锂电负极石墨化，负极石墨化代工产能扩张', {
    note: '媒体报道口径：负极石墨化年化产能约8万吨',
  }),
  entry(8, '道氏技术', 6, '万吨/年', '产能约6万吨', '陶瓷釉面+锂电正极/负极材料，三元前驱体与负极协同', {
    note: '媒体报道口径：负极材料年化产能约6万吨',
  }),
  entry(9, '百川股份', 5, '万吨/年', '产能约5万吨', '精细化工+锂电负极石墨化，负极材料产线配套', {
    note: '媒体报道口径：负极材料年化产能约5万吨',
  }),
  entry(10, '永东股份', 4, '万吨/年', '产能约4万吨', '炭黑+针状焦原料，负极材料上游原料与石墨化配套', {
    note: '媒体报道口径：负极原料配套年化产能约4万吨',
  }),
];

const ELECTROLYTE = [
  entry(1, '天赐材料', 42, '万吨/年', '产能约42万吨', '电解液出货量规模居前，LiFSI添加剂与六氟磷酸锂自供', {
    note: '媒体报道口径：电解液年化产能约42万吨',
  }),
  entry(2, '新宙邦', 35, '万吨/年', '产能约35万吨', '电解液规模靠前厂商，海外动力电池客户与国内头部电芯厂订单饱满', {
    note: '媒体报道口径：电解液年化产能约35万吨',
  }),
  entry(3, '多氟多', 28, '万吨/年', '产能约28万吨', '六氟磷酸锂+电解液一体化，氟化工锂盐与电解液产线满产', {
    note: '媒体报道口径：电解液年化产能约28万吨',
  }),
  entry(4, '瑞泰新材', 22, '万吨/年', '产能约22万吨', '电解液与锂盐添加剂，动力电池电解液出货量行业前列', {
    note: '媒体报道口径：电解液年化产能约22万吨',
  }),
  entry(5, '天际股份', 18, '万吨/年', '产能约18万吨', '六氟磷酸锂+LiFSI锂盐，电解液上游锂盐产线扩产', {
    note: '媒体报道口径：锂盐年化产能约18万吨',
  }),
  entry(6, '胜华新材', 15, '万吨/年', '产能约15万吨', '碳酸酯溶剂+电解液，溶剂与电解液一体化产线', {
    note: '媒体报道口径：电解液溶剂年化产能约15万吨',
  }),
  entry(7, '江苏国泰', 12, '万吨/年', '产能约12万吨', '外贸+电解液子公司，电解液产能与锂盐配套', {
    note: '媒体报道口径：电解液年化产能约12万吨',
  }),
  entry(8, '永太科技', 10, '万吨/年', '产能约10万吨', '氟化工中间体+电解液锂盐，LiFSI与电解液添加剂产线', {
    note: '媒体报道口径：电解液锂盐年化产能约10万吨',
  }),
  entry(9, '海科新源', 8, '万吨/年', '产能约8万吨', '碳酸酯溶剂规模靠前，电解液溶剂与添加剂产线', {
    note: '媒体报道口径：电解液溶剂年化产能约8万吨',
  }),
  entry(10, '奥克股份', 6, '万吨/年', '产能约6万吨', '环氧乙烷衍生物+电解液溶剂，碳酸酯溶剂产线配套', {
    note: '媒体报道口径：电解液溶剂年化产能约6万吨',
  }),
];

const SEPARATOR = [
  entry(1, '恩捷股份', 120, '亿㎡/年', '产能约120亿㎡', '湿法隔膜出货量规模居前，涂覆隔膜产线满产满销', {
    note: '媒体报道口径：湿法隔膜年化产能约120亿㎡',
  }),
  entry(2, '星源材质', 85, '亿㎡/年', '产能约85亿㎡', '干法+湿法隔膜规模靠前，涂覆隔膜产线持续扩产', {
    note: '媒体报道口径：隔膜年化产能约85亿㎡',
  }),
  entry(3, '中材科技', 72, '亿㎡/年', '产能约72亿㎡', '玻纤+锂电隔膜，湿法隔膜产线与涂覆产能扩张', {
    note: '媒体报道口径：隔膜年化产能约72亿㎡',
  }),
  entry(4, '沧州明珠', 28, '亿㎡/年', '产能约28亿㎡', 'PE隔膜+BOPA薄膜，干法隔膜产线配套动力电池', {
    note: '媒体报道口径：隔膜年化产能约28亿㎡',
  }),
  entry(5, '欧克科技', 18, '亿㎡/年', '产能约18亿㎡', '生活用纸设备+隔膜设备，隔膜产线设备与隔膜制造协同', {
    note: '媒体报道口径：隔膜年化产能约18亿㎡',
  }),
  entry(6, '美联新材', 15, '亿㎡/年', '产能约15亿㎡', '色母粒+隔膜涂覆，涂覆隔膜产线扩产', {
    note: '媒体报道口径：涂覆隔膜年化产能约15亿㎡',
  }),
  entry(7, '佛塑科技', 12, '亿㎡/年', '产能约12亿㎡', '薄膜新材料+锂电隔膜，干法隔膜产线配套', {
    note: '媒体报道口径：隔膜年化产能约12亿㎡',
  }),
  entry(8, '璞泰来', 10, '亿㎡/年', '产能约10亿㎡', '负极材料+涂覆隔膜，涂覆加工产线满产', {
    note: '媒体报道口径：涂覆隔膜年化产能约10亿㎡',
  }),
  entry(9, '东风股份', 8, '亿㎡/年', '产能约8亿㎡', '烟标印刷+锂电隔膜，隔膜基材与涂覆产线', {
    note: '媒体报道口径：隔膜年化产能约8亿㎡',
  }),
  entry(10, '乐凯胶片', 6, '亿㎡/年', '产能约6亿㎡', '感光材料+锂电隔膜涂覆，隔膜涂覆产线配套', {
    note: '媒体报道口径：隔膜涂覆年化产能约6亿㎡',
  }),
];

const COPPER_FOIL = [
  entry(1, '诺德股份', 18, '万吨/年', '产能约18万吨', '锂电铜箔出货量规模居前，极薄铜箔产线满产', {
    note: '媒体报道口径：锂电铜箔年化产能约18万吨',
  }),
  entry(2, '德福科技', 15, '万吨/年', '产能约15万吨', '极薄锂电铜箔规模靠前，6μm/4.5μm铜箔产线扩产', {
    note: '媒体报道口径：锂电铜箔年化产能约15万吨',
  }),
  entry(3, '铜冠铜箔', 12, '万吨/年', '产能约12万吨', '铜箔制造规模靠前，锂电铜箔与电子电路铜箔双线', {
    note: '媒体报道口径：锂电铜箔年化产能约12万吨',
  }),
  entry(4, '中一科技', 10, '万吨/年', '产能约10万吨', '锂电铜箔+标准铜箔，极薄铜箔产线持续爬坡', {
    note: '媒体报道口径：锂电铜箔年化产能约10万吨',
  }),
  entry(5, '超华科技', 8, '万吨/年', '产能约8万吨', '覆铜板+锂电铜箔，铜箔产线与PCB材料协同', {
    note: '媒体报道口径：锂电铜箔年化产能约8万吨',
  }),
  entry(6, '逸豪新材', 6, '万吨/年', '产能约6万吨', '电子电路铜箔+锂电铜箔，铜箔产线扩产', {
    note: '媒体报道口径：铜箔年化产能约6万吨',
  }),
  entry(7, '楚江新材', 5, '万吨/年', '产能约5万吨', '铜基材料+锂电铜箔，铜加工与铜箔产线协同', {
    note: '媒体报道口径：锂电铜箔年化产能约5万吨',
  }),
  entry(8, '众源新材', 4, '万吨/年', '产能约4万吨', '铜带+锂电铜箔，高精度铜箔产线配套', {
    note: '媒体报道口径：锂电铜箔年化产能约4万吨',
  }),
  entry(9, '华锋股份', 3, '万吨/年', '产能约3万吨', '电极箔+锂电铜箔，铝箔与铜箔材料双线', {
    note: '媒体报道口径：铜箔年化产能约3万吨',
  }),
  entry(10, '金安国纪', 2.5, '万吨/年', '产能约2.5万吨', '覆铜板+铜箔材料，电子铜箔与锂电铜箔配套', {
    note: '媒体报道口径：铜箔年化产能约2.5万吨',
  }),
];

const SOLID_STATE_BATTERY = [
  entry(1, '赣锋锂业', 8500, 'MWh/年', '产能约8500MWh', '固态锂电池量产进程领先，氧化物/硫化物固态电芯中试线扩产', {
    note: '媒体报道口径：固态电池年化产能约8500MWh（中试+小批量）',
  }),
  entry(2, '国轩高科', 6200, 'MWh/年', '产能约6200MWh', '半固态/固态电池产线，360Wh/kg高比能电芯中试放量', {
    note: '媒体报道口径：固态电池年化产能约6200MWh',
  }),
  entry(3, '亿纬锂能', 4800, 'MWh/年', '产能约4800MWh', '大圆柱+固态电池研发产线，硫化物固态电解质导入', {
    note: '媒体报道口径：固态电池年化产能约4800MWh',
  }),
  entry(4, '鹏辉能源', 3500, 'MWh/年', '产能约3500MWh', '固态电池中试产线，氧化物固态电芯与储能场景验证', {
    note: '媒体报道口径：固态电池年化产能约3500MWh',
  }),
  entry(5, '传艺科技', 2800, 'MWh/年', '产能约2800MWh', '钠离子+固态电池双线，固态电芯中试产线建设', {
    note: '媒体报道口径：固态电池年化产能约2800MWh',
  }),
  entry(6, '上海洗霸', 2200, 'MWh/年', '产能约2200MWh', '水处理+固态电解质材料，硫化物固态电解质产线', {
    note: '媒体报道口径：固态电解质年化产能约2200MWh当量',
  }),
  entry(7, '德尔股份', 1800, 'MWh/年', '产能约1800MWh', '汽车隔音+固态电池，氧化物固态电芯中试线', {
    note: '媒体报道口径：固态电池年化产能约1800MWh',
  }),
  entry(8, '三祥新材', 1500, 'MWh/年', '产能约1500MWh', '锆系材料+固态电解质，氧化物固态电解质原料产线', {
    note: '媒体报道口径：固态电解质材料年化产能约1500MWh当量',
  }),
  entry(9, '金龙羽', 1200, 'MWh/年', '产能约1200MWh', '电线电缆+固态电池，固态电芯中试产线建设', {
    note: '媒体报道口径：固态电池年化产能约1200MWh',
  }),
  entry(10, '雄韬股份', 950, 'MWh/年', '产能约950MWh', '氢燃料电池+固态电池，固态电芯研发与中试产线', {
    note: '媒体报道口径：固态电池年化产能约950MWh',
  }),
];

const BATTERY_EQUIPMENT = [
  entry(1, '先导智能', 2850, '台/年', '年交付约2850台', '锂电设备规模靠前厂商，涂布/卷绕/叠片整线交付满产', {
    note: '媒体报道口径：锂电设备年化交付约2850台',
  }),
  entry(2, '赢合科技', 2280, '台/年', '年交付约2280台', '涂布+辊压+分切设备，动力电池产线设备出货量居前', {
    note: '媒体报道口径：锂电设备年化交付约2280台',
  }),
  entry(3, '金银河', 1680, '台/年', '年交付约1680台', '有机硅设备+锂电浆料设备，涂布与搅拌设备产线满产', {
    note: '媒体报道口径：锂电设备年化交付约1680台',
  }),
  entry(4, '科恒股份', 1420, '台/年', '年交付约1420台', '正极材料+锂电设备，涂布机与辊压设备交付放量', {
    note: '媒体报道口径：锂电设备年化交付约1420台',
  }),
  entry(5, '星云股份', 980, '台/年', '年交付约980台', '锂电池检测+化成设备，电芯检测与PACK产线设备', {
    note: '媒体报道口径：锂电检测设备年化交付约980台',
  }),
  entry(6, '福能东方', 820, '台/年', '年交付约820台', '包装印刷设备+锂电设备，叠片与焊接设备产线', {
    note: '媒体报道口径：锂电设备年化交付约820台',
  }),
  entry(7, '天永智能', 680, '台/年', '年交付约680台', '汽车装配线+锂电模组产线，模组PACK自动化设备', {
    note: '媒体报道口径：锂电模组设备年化交付约680台',
  }),
  entry(8, '智云股份', 520, '台/年', '年交付约520台', '平板显示设备+锂电设备，叠片与焊接产线设备', {
    note: '媒体报道口径：锂电设备年化交付约520台',
  }),
  entry(9, '大族激光', 450, '台/年', '年交付约450台', '激光焊接+切割设备，动力电池极耳焊接与模组产线', {
    note: '媒体报道口径：锂电激光设备年化交付约450台',
  }),
  entry(10, '华自科技', 380, '台/年', '年交付约380台', '水利水电自动化+储能PACK产线，锂电模组装配设备', {
    note: '媒体报道口径：锂电模组设备年化交付约380台',
  }),
];

const ENERGY_STORAGE_BATTERY = [
  entry(1, '宁德时代', 125, 'GWh/年', '产能约125GWh', '储能电芯与系统出货量规模居前，大储与工商业储能产线满产', {
    note: '媒体报道口径：储能电池年化产能约125GWh',
  }),
  entry(2, '亿纬锂能', 85, 'GWh/年', '产能约85GWh', '大圆柱+方形储能电芯，大储与户储产线双线扩产', {
    note: '媒体报道口径：储能电池年化产能约85GWh',
  }),
  entry(3, '比亚迪', 72, 'GWh/年', '产能约72GWh', '储能系统BYD-ESS+电芯自供，光储一体方案全球出货', {
    note: '媒体报道口径：储能电池年化产能约72GWh',
  }),
  entry(4, '阳光电源', 58, 'GWh/年', '产能约58GWh', '逆变器+储能系统，大储与工商业储能电池系统出货量居前', {
    note: '媒体报道口径：储能电池系统年化产能约58GWh',
  }),
  entry(5, '鹏辉能源', 45, 'GWh/年', '产能约45GWh', '储能电芯+系统，大储与通信储能产线满产', {
    note: '媒体报道口径：储能电池年化产能约45GWh',
  }),
  entry(6, '国轩高科', 38, 'GWh/年', '产能约38GWh', '磷酸铁锂储能电芯，大储与工商业储能订单饱满', {
    note: '媒体报道口径：储能电池年化产能约38GWh',
  }),
  entry(7, '南都电源', 32, 'GWh/年', '产能约32GWh', '铅酸+锂电储能，通信储能与大储电芯产线扩产', {
    note: '媒体报道口径：储能电池年化产能约32GWh',
  }),
  entry(8, '科陆电子', 28, 'GWh/年', '产能约28GWh', '储能系统集成+电芯，海外大储项目储能电池出货放量', {
    note: '媒体报道口径：储能电池年化产能约28GWh',
  }),
  entry(9, '上能电气', 22, 'GWh/年', '产能约22GWh', '光伏逆变器+储能系统，大储PCS与储能电池配套出货', {
    note: '媒体报道口径：储能电池系统年化产能约22GWh',
  }),
  entry(10, '欣旺达', 18, 'GWh/年', '产能约18GWh', '储能PACK+电芯，工商业储能电池系统出货量增长', {
    note: '媒体报道口径：储能电池年化产能约18GWh',
  }),
];

const BATTERY_RECYCLING = [
  entry(1, '格林美', 28, '万吨/年', '年处理约28万吨', '动力电池回收规模靠前，镍钴锂资源回收与梯次利用产线满产', {
    note: '媒体报道口径：废旧电池回收年化处理约28万吨',
  }),
  entry(2, '天奇股份', 22, '万吨/年', '年处理约22万吨', '汽车装备+电池回收，废旧动力电池拆解与再生产线', {
    note: '媒体报道口径：电池回收年化处理约22万吨',
  }),
  entry(3, '光华科技', 18, '万吨/年', '年处理约18万吨', 'PCB化学品+电池回收，磷酸铁锂与三元电池再生利用', {
    note: '媒体报道口径：电池回收年化处理约18万吨',
  }),
  entry(4, '旺能环境', 15, '万吨/年', '年处理约15万吨', '垃圾焚烧+锂电回收，废旧电池资源化利用产线', {
    note: '媒体报道口径：电池回收年化处理约15万吨',
  }),
  entry(5, '华友钴业', 12, '万吨/年', '年处理约12万吨', '钴镍锂资源+电池回收，再生镍钴锂原料产线', {
    note: '媒体报道口径：电池回收年化处理约12万吨',
  }),
  entry(6, '赣锋锂业', 10, '万吨/年', '年处理约10万吨', '锂资源+电池回收，废旧锂电池锂资源提取产线', {
    note: '媒体报道口径：电池回收年化处理约10万吨',
  }),
  entry(7, '骆驼股份', 8, '万吨/年', '年处理约8万吨', '铅酸电池+锂电回收，废旧电池梯次利用与再生', {
    note: '媒体报道口径：电池回收年化处理约8万吨',
  }),
  entry(8, '超越科技', 6, '万吨/年', '年处理约6万吨', '固废处理+电池回收，废旧动力电池拆解再生产线', {
    note: '媒体报道口径：电池回收年化处理约6万吨',
  }),
  entry(9, '东江环保', 5, '万吨/年', '年处理约5万吨', '危废处理+电池回收，废旧电池无害化处置与资源化', {
    note: '媒体报道口径：电池回收年化处理约5万吨',
  }),
  entry(10, '高能环境', 4, '万吨/年', '年处理约4万吨', '环境修复+危废处理，废旧锂电池回收与资源化产线', {
    note: '媒体报道口径：电池回收年化处理约4万吨',
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
    id: 'battery-power',
    varName: 'CAPACITY_RANK_BATTERY_POWER2026',
    industryKeys: ['锂电池'],
    key: '动力电池',
    title: '2026动力电池产能TOP10',
    subtitle: '口径：动力电池电芯年化产能（GWh/年）；均为动力电池制造规模靠前厂商',
    capacityUnit: 'GWh/年',
    ENTRIES: POWER_BATTERY,
  },
  {
    id: 'battery-cathode',
    varName: 'CAPACITY_RANK_BATTERY_CATHODE2026',
    industryKeys: ['锂电池'],
    key: '正极材料',
    title: '2026正极材料产能TOP10',
    subtitle: '口径：三元/磷酸铁锂正极及前驱体年化产能（万吨/年）；均为正极材料制造规模靠前厂商',
    capacityUnit: '万吨/年',
    ENTRIES: CATHODE_MATERIAL,
  },
  {
    id: 'battery-anode',
    varName: 'CAPACITY_RANK_BATTERY_ANODE2026',
    industryKeys: ['锂电池'],
    key: '负极材料',
    title: '2026负极材料产能TOP10',
    subtitle: '口径：人造石墨等负极材料年化产能（万吨/年）；均为负极材料制造规模靠前厂商',
    capacityUnit: '万吨/年',
    ENTRIES: ANODE_MATERIAL,
  },
  {
    id: 'battery-electrolyte',
    varName: 'CAPACITY_RANK_BATTERY_ELECTROLYTE2026',
    industryKeys: ['锂电池', '多氟多'],
    key: '电解液',
    title: '2026电解液产能TOP10',
    subtitle: '口径：电解液及锂盐溶剂年化产能（万吨/年）；均为电解液制造规模靠前厂商',
    capacityUnit: '万吨/年',
    ENTRIES: ELECTROLYTE,
  },
  {
    id: 'battery-separator',
    varName: 'CAPACITY_RANK_BATTERY_SEPARATOR2026',
    industryKeys: ['锂电池'],
    key: '隔膜',
    title: '2026锂电隔膜产能TOP10',
    subtitle: '口径：湿法/干法/涂覆隔膜年化产能（亿㎡/年）；均为隔膜制造规模靠前厂商',
    capacityUnit: '亿㎡/年',
    ENTRIES: SEPARATOR,
  },
  {
    id: 'battery-copper-foil',
    varName: 'CAPACITY_RANK_BATTERY_COPPER_FOIL2026',
    industryKeys: ['锂电池'],
    key: '铜箔',
    title: '2026锂电铜箔产能TOP10',
    subtitle: '口径：锂电用铜箔年化产能（万吨/年）；均为锂电铜箔制造规模靠前厂商',
    capacityUnit: '万吨/年',
    ENTRIES: COPPER_FOIL,
  },
  {
    id: 'battery-solid-state',
    varName: 'CAPACITY_RANK_BATTERY_SOLID_STATE2026',
    industryKeys: ['锂电池'],
    key: '固态电池',
    title: '2026固态电池产能TOP10',
    subtitle: '口径：固态/半固态电芯及电解质中试与小批量产能（MWh/年）；均为固态电池研发制造规模靠前厂商',
    capacityUnit: 'MWh/年',
    ENTRIES: SOLID_STATE_BATTERY,
  },
  {
    id: 'battery-equipment',
    varName: 'CAPACITY_RANK_BATTERY_EQUIPMENT2026',
    industryKeys: ['锂电池'],
    key: '电池设备',
    title: '2026电池设备年化交付TOP10',
    subtitle: '口径：涂布/卷绕/叠片/检测等锂电设备年化交付（台/年）；均为电池装备制造规模靠前厂商',
    capacityUnit: '台/年',
    ENTRIES: BATTERY_EQUIPMENT,
  },
  {
    id: 'battery-storage',
    varName: 'CAPACITY_RANK_BATTERY_STORAGE2026',
    industryKeys: ['锂电池'],
    key: '储能电池',
    title: '2026储能电池产能TOP10',
    subtitle: '口径：储能电芯与系统年化产能（GWh/年）；均为储能电池制造规模靠前厂商',
    capacityUnit: 'GWh/年',
    ENTRIES: ENERGY_STORAGE_BATTERY,
  },
  {
    id: 'battery-recycling',
    varName: 'CAPACITY_RANK_BATTERY_RECYCLING2026',
    industryKeys: ['锂电池'],
    key: '电池回收',
    title: '2026电池回收处理产能TOP10',
    subtitle: '口径：废旧动力电池回收与资源化年化处理量（万吨/年）；均为电池回收规模靠前厂商',
    capacityUnit: '万吨/年',
    ENTRIES: BATTERY_RECYCLING,
  },
];

const payloads = RANKINGS.map((r) => ({
  ...r,
  payload: buildPayload(r, r.ENTRIES),
}));

const outDir = path.join(__dirname, '..', 'data');
const jsLines = [
  '/** 2026 锂电池板块产能排行榜 · 由 scripts/build-capacity-rank-battery2026.js 生成 */',
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
jsLines.push('var CAPACITY_RANK_REGISTRY_BATTERY2026 = {');
payloads.forEach(({ varName, payload }, i) => {
  jsLines.push(`  '${payload.key}': ${varName}${i < payloads.length - 1 ? ',' : ''}`);
});
jsLines.push('};');
jsLines.push(
  "if (typeof window !== 'undefined') window.CAPACITY_RANK_REGISTRY_BATTERY2026 = CAPACITY_RANK_REGISTRY_BATTERY2026;"
);

fs.writeFileSync(
  path.join(outDir, 'capacity-rank-battery2026.js'),
  jsLines.join('\n') + '\n',
  'utf8'
);
fs.writeFileSync(
  path.join(outDir, 'capacity-rank-battery2026.json'),
  JSON.stringify(payloads.map((p) => p.payload), null, 2),
  'utf8'
);

console.log('OK 写入 capacity-rank-battery2026.js 共', payloads.length, '个榜单');
payloads.forEach(({ payload }) => {
  console.log(' -', payload.key, payload.companies.length, '家');
});

module.exports = { RANKINGS, payloads, buildPayload };
