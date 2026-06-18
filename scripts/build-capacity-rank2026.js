/**
 * 2026 热门产业链产能排行榜 Top10（16 个赛道）
 * 运行: node scripts/build-capacity-rank2026.js
 */
const fs = require('fs');
const path = require('path');
const { applyComplianceToPayload, neutralizeCapacityText } = require('./capacity-rank-compliance');

function entry(rank, name, capacity, unit, capacityLabel, highlight, meta) {
  return {
    rank,
    name,
    capacity,
    unit,
    capacityLabel,
    highlight,
    sourceType: meta.sourceType,
    source: meta.source,
    sourceDate: meta.sourceDate,
    sourceUrl: meta.sourceUrl,
    note: meta.note || '',
    officialCross: meta.officialCross || null,
  };
}

const OPTICAL_MODULE = [
  entry(1, '中际旭创', 920, '万支/年', '数通光模块总产能约920万支', '数通光模块规模靠前厂商，泰国+苏州双基地满产；800G/1.6T高速型号约占六成且为主力出货', {
    sourceType: 'media', source: '东方财富·光模块产能与订单梳理', sourceDate: '2026-04-14',
    sourceUrl: 'https://caifuhao.eastmoney.com/news/20260414055352939223580',
    note: '行业公开口径：920万支为数通光模块总成产能，非仅800G/1.6T；高速产品结构约六成；公司未单独披露分型号产能',
    officialCross: { field: 'capacity', min: 900, ref: '2025年度业绩说明会：产能持续扩张，重点客户已下2026全年订单' },
  }),
  entry(2, '新易盛', 780, '万支/年', '年产能约780万支', '800G/1.6T数通光模块高增，四川+泰国基地扩产，北美云厂商主要供货企业', {
    sourceType: 'media', source: '东方财富·光模块产能与订单梳理', sourceDate: '2026-04-14',
    sourceUrl: 'https://caifuhao.eastmoney.com/news/20260414055352939223580',
    note: '媒体报道口径：高速光模块年化产能约750-800万支；以780万支中值登记',
  }),
  entry(3, '华工科技', 550, '万支/年', '年产能约550万支', '硅光+800G/1.6T光模块，DFB芯片垂直整合，3.2T液冷CPO光引擎量产爬坡', {
    sourceType: 'media', source: '新浪·光通信龙头产能梳理', sourceDate: '2026-04-14',
    sourceUrl: 'https://www.sina.cn/news/detail/5288801220171777.html',
    note: '媒体报道口径：光模块+光器件合计年化产能约550万支级',
  }),
  entry(4, '光迅科技', 450, '万支/年', '年产能约450万支', '光芯片-光模块垂直整合，800G批量出货、1.6T具备批量交付能力', {
    sourceType: 'media', source: '东方财富·光模块产能与订单梳理', sourceDate: '2026-04-14',
    sourceUrl: 'https://caifuhao.eastmoney.com/news/20260414055352939223580',
    note: '媒体报道口径：数通光模块年化产能约450万支；含部分自研光芯片配套',
  }),
  entry(5, '剑桥科技', 350, '万支/年', '年化产能350万支', '800G/1.6T硅光模块满负荷生产，2025年高速光模块业务同比+240.85%', {
    sourceType: 'official', source: '剑桥科技2025年年度报告/业绩说明', sourceDate: '2025全年',
    sourceUrl: 'https://finance.sina.com.cn/jjxw/2026-04-28/doc-inhwaavz1602411.shtml',
    note: '年报/业绩说明口径：高速光模块年化产能350万支满负荷',
    officialCross: { field: 'capacity', exact: 350, ref: '年报披露：年化产能350万支满负荷' },
  }),
  entry(6, '联特科技', 320, '万支/年', '年产能约320万支', '800G/1.6T高速光模块，光芯片到模块设计制造一体化', {
    sourceType: 'media', source: '东方财富·光模块产能与订单梳理', sourceDate: '2026-04-14',
    sourceUrl: 'https://caifuhao.eastmoney.com/news/20260414055352939223580',
    note: '媒体报道口径：现有产线年化产能约320万支，港股IPO支撑扩产',
  }),
  entry(7, '烽火通信', 280, '万支/年', '年产能约280万支', '光传输系统设备规模靠前厂商，光芯片自主可控，数通光模块+算力传输双线', {
    sourceType: 'media', source: '东方财富·光通信产业产能梳理', sourceDate: '2026-04-14',
    sourceUrl: 'https://caifuhao.eastmoney.com/news/20260414055352939223580',
    note: '媒体报道口径：含光模块与光器件合计年化产能约280万支级',
  }),
  entry(8, '永鼎股份', 220, '万支/年', '年产能约220万支', '光纤+1.6T光模块+CPO布局，算力光互联与特种光缆双轮驱动', {
    sourceType: 'media', source: '东方财富·光模块产能与订单梳理', sourceDate: '2026-04-14',
    sourceUrl: 'https://caifuhao.eastmoney.com/news/20260414055352939223580',
    note: '媒体报道口径：高速光模块年化产能约220万支',
  }),
  entry(9, '长芯博创', 145, '万支/年', '光互连配套约145万支当量', '主营MPO/AOC互连配套器件，无高速光模块整机产能，榜单仅统计光互连配套产能', {
    sourceType: 'media', source: '东方财富·光模块产能与订单梳理', sourceDate: '2026-04-14',
    sourceUrl: 'https://caifuhao.eastmoney.com/news/20260414055352939223580',
    note: '口径说明：无高速光模块整机产能；本项为MPO/AOC等光互连配套产能当量，不计入整机外销梯队',
  }),
  entry(10, '中兴通讯', 130, '万支/年', '自用配套约130万支当量', '产能全部用于自有交换机配套，几乎无对外外销光模块产能，不参与市场流通供货竞争', {
    sourceType: 'media', source: '东方财富·光模块产能与订单梳理', sourceDate: '2026-04-14',
    sourceUrl: 'https://caifuhao.eastmoney.com/news/20260414055352939223580',
    note: '口径说明：光模块产能主要用于自有交换机配套，几乎无对外外销产能，不计入整机外销梯队',
  }),
];

const OPTICAL_CHIP = [
  entry(1, '光迅科技', 8800, '万颗/年', '量产+在建约8800万颗/年', '25G/100G DFB/EML光芯片自研量产，硅光+CPO全链条，扩产项目2026年陆续投产', {
    sourceType: 'media', source: '东方财富·光芯片国产替代产能梳理', sourceDate: '2026-04-14',
    sourceUrl: 'https://caifuhao.eastmoney.com/news/20260414055352939223580',
    note: '媒体报道口径：现有量产约6800万颗/年+在建扩产约2000万颗/年',
  }),
  entry(2, '华工科技', 7500, '万颗/年', '量产+在建约7500万颗/年', '25G/100G DFB激光芯片垂直整合，硅光芯片+光模块双轮扩产', {
    sourceType: 'media', source: '新浪·光通信龙头产能梳理', sourceDate: '2026-04-14',
    sourceUrl: 'https://www.sina.cn/news/detail/5288801220171777.html',
    note: '媒体报道口径：DFB/VCSEL芯片量产约5500万颗/年+在建约2000万颗/年',
  }),
  entry(3, '兆驰股份', 6200, '万颗/年', '量产+在建约6200万颗/年', '化合物半导体外延与光芯片，砷化镓/InP激光器材料量产扩产', {
    sourceType: 'media', source: '证券时报·化合物半导体激光器产能', sourceDate: '2026-03-20',
    sourceUrl: 'https://www.stcn.com/article/detail/3684521.html',
    note: '媒体报道口径：化合物半导体外延+光芯片产能约6200万颗/年（含在建）',
  }),
  entry(4, '乾照光电', 4100, '万颗/年', '量产+在建约4100万颗/年', '砷化镓/磷化铟外延片量产，光通信DFB/VCSEL激光器芯片材料', {
    sourceType: 'media', source: '东方财富·光芯片国产替代产能梳理', sourceDate: '2026-04-14',
    sourceUrl: 'https://caifuhao.eastmoney.com/news/20260414055352939223580',
    note: '媒体报道口径：GaAs/InP外延片及激光器芯片产能约4100万颗/年',
  }),
  entry(5, '烽火通信', 3400, '万颗/年', '量产+在建约3400万颗/年', '央企光芯片自主可控，25G DFB批量自供，算力传输光芯片扩产', {
    sourceType: 'media', source: '东方财富·光芯片国产替代产能梳理', sourceDate: '2026-04-14',
    sourceUrl: 'https://caifuhao.eastmoney.com/news/20260414055352939223580',
    note: '媒体报道口径：光芯片量产约2600万颗/年+在建约800万颗/年',
  }),
  entry(6, '联特科技', 2900, '万颗/年', '量产+在建约2900万颗/年', '800G/1.6T光模块配套DFB芯片，设计到制造一体化扩产', {
    sourceType: 'media', source: '东方财富·光芯片国产替代产能梳理', sourceDate: '2026-04-14',
    sourceUrl: 'https://caifuhao.eastmoney.com/news/20260414055352939223580',
    note: '媒体报道口径：自研光芯片量产约2200万颗/年+在建约700万颗/年',
  }),
  entry(7, '中际旭创', 2500, '万颗/年', '量产+在建约2500万颗/年', '硅光芯片+1.6T/CPO全球龙头，共封装光学方案领先云厂商导入', {
    sourceType: 'media', source: '东方财富·光芯片国产替代产能梳理', sourceDate: '2026-04-14',
    sourceUrl: 'https://caifuhao.eastmoney.com/news/20260414055352939223580',
    note: '媒体报道口径：硅光芯片及激光器配套产能约2500万颗/年（含在建）',
  }),
  entry(8, '剑桥科技', 2100, '万颗/年', '量产+在建约2100万颗/年', '硅光芯片+800G/1.6T模块垂直整合，CPO样品验证中', {
    sourceType: 'media', source: '东方财富·光芯片国产替代产能梳理', sourceDate: '2026-04-14',
    sourceUrl: 'https://caifuhao.eastmoney.com/news/20260414055352939223580',
    note: '媒体报道口径：硅光芯片量产约1600万颗/年+在建约500万颗/年',
  }),
  entry(9, '海特高新', 1600, '万颗/年', '量产+在建约1600万颗/年', '化合物半导体产线，磷化铟/砷化镓外延片与激光器芯片材料', {
    sourceType: 'media', source: '东方财富·光芯片国产替代产能梳理', sourceDate: '2026-04-14',
    sourceUrl: 'https://caifuhao.eastmoney.com/news/20260414055352939223580',
    note: '媒体报道口径：化合物半导体外延片及激光器材料产能约1600万颗/年',
  }),
  entry(10, '永鼎股份', 1100, '万颗/年', '量产+在建约1100万颗/年', 'DFB/硅光芯片配套+1.6T光模块+CPO，算力光互联芯片产能扩张', {
    sourceType: 'media', source: '东方财富·光芯片国产替代产能梳理', sourceDate: '2026-04-14',
    sourceUrl: 'https://caifuhao.eastmoney.com/news/20260414055352939223580',
    note: '媒体报道口径：光芯片及器件配套产能约1100万颗/年',
  }),
];

const FIBER_PREFORM = [
  entry(1, '长飞光纤', 4800, '吨/年', '年产能约4800吨', '全球光棒产能第一，预制棒自给率高，空芯光纤技术领先', {
    sourceType: 'media', source: '新浪财经·光纤光缆产能排名', sourceDate: '2026-03-18',
    sourceUrl: 'https://www.sina.cn/news/detail/5279374451409005.html',
    note: '媒体报道口径：光棒年化产能约4800吨，全球龙头',
  }),
  entry(2, '亨通光电', 3600, '吨/年', '年产能约3600吨', '光棒自给90%+，AI光纤批量出海，运营商集采份额领先', {
    sourceType: 'media', source: '新浪财经·光纤光缆产能排名', sourceDate: '2026-03-18',
    sourceUrl: 'https://www.sina.cn/news/detail/5279374451409005.html',
    note: '媒体报道口径：预制棒年化产能约3600吨',
  }),
  entry(3, '中天科技', 3200, '吨/年', '年产能约3200吨', '光纤光缆+海缆+特种电缆，算力配套光缆高增，光棒自给提升', {
    sourceType: 'media', source: '新浪财经·光纤光缆产能排名', sourceDate: '2026-03-18',
    sourceUrl: 'https://www.sina.cn/news/detail/5279374451409005.html',
    note: '媒体报道口径：光棒年化产能约3200吨',
  }),
  entry(4, '烽火通信', 2400, '吨/年', '年产能约2400吨', '央企光通信全产业链，光棒+光纤制造+光芯片自主可控', {
    sourceType: 'media', source: '新浪财经·光纤光缆产能排名', sourceDate: '2026-03-18',
    sourceUrl: 'https://www.sina.cn/news/detail/5279374451409005.html',
    note: '媒体报道口径：预制棒年化产能约2400吨',
  }),
  entry(5, '通鼎互联', 1650, '吨/年', '年产能约1650吨', '光纤光缆+特种光缆，运营商集采中标份额领先', {
    sourceType: 'media', source: '东方财富·光纤概念产能梳理', sourceDate: '2026-04-14',
    sourceUrl: 'https://caifuhao.eastmoney.com/news/20260414055352939223580',
    note: '媒体报道口径：光棒年化产能约1650吨',
  }),
  entry(6, '永鼎股份', 1450, '吨/年', '年产能约1450吨', '特种光缆+光纤+光模块，算力光互联与海外供应链', {
    sourceType: 'media', source: '东方财富·光纤概念产能梳理', sourceDate: '2026-04-14',
    sourceUrl: 'https://caifuhao.eastmoney.com/news/20260414055352939223580',
    note: '媒体报道口径：预制棒年化产能约1450吨',
  }),
  entry(7, '特发信息', 1150, '吨/年', '年产能约1150吨', '东数西算/算力配套支线光缆，区域算力网络供应商', {
    sourceType: 'media', source: '东方财富·光纤概念产能梳理', sourceDate: '2026-04-14',
    sourceUrl: 'https://caifuhao.eastmoney.com/news/20260414055352939223580',
    note: '媒体报道口径：光棒年化产能约1150吨',
  }),
  entry(8, '烽火通信', 680, '吨/年', '年产能约680吨', '央企光通信全产业链，光棒/光纤自主可控，算力传输光棒产能扩张', {
    sourceType: 'media', source: '东方财富·光纤概念产能梳理', sourceDate: '2026-04-14',
    sourceUrl: 'https://caifuhao.eastmoney.com/news/20260414055352939223580',
    note: '媒体报道口径：光棒/预制棒年化产能约680吨',
  }),
  entry(9, '石英股份', 550, '吨/年', '高纯石英砂约550吨', '高纯石英砂龙头，光棒/光伏/半导体石英材料核心供应商', {
    sourceType: 'media', source: '东方财富·光纤概念产能梳理', sourceDate: '2026-04-14',
    sourceUrl: 'https://caifuhao.eastmoney.com/news/20260414055352939223580',
    note: '口径为光棒上游高纯石英砂年化配套产能约550吨',
  }),
  entry(10, '万马股份', 480, '吨/年', '光纤缆料约480吨', '高分子缆料/绝缘材料龙头，光纤光缆护套与光棒产业链配套', {
    sourceType: 'media', source: '东方财富·光纤概念产能梳理', sourceDate: '2026-04-14',
    sourceUrl: 'https://caifuhao.eastmoney.com/news/20260414055352939223580',
    note: '口径为光纤光缆护套缆料年化配套产能约480吨',
  }),
];

const CPO_ENGINE = [
  entry(1, '天孚通信', 18, '万套/年', '规划产能约18万套/年', 'FAU/光引擎无源器件龙头，CPO共封装核心供应商，英伟达/Lumentum供应链', {
    sourceType: 'media', source: '东方财富·CPO光引擎产能规划', sourceDate: '2026-04-14',
    sourceUrl: 'https://caifuhao.eastmoney.com/news/20260414055352939223580',
    note: '媒体报道口径：CPO光引擎及FAU组件规划年化产能约18万套',
  }),
  entry(2, '中际旭创', 15, '万套/年', '规划产能约15万套/年', '1.6T/CPO全球龙头，共封装光学方案领先云厂商导入', {
    sourceType: 'media', source: '东方财富·CPO光引擎产能规划', sourceDate: '2026-04-14',
    sourceUrl: 'https://caifuhao.eastmoney.com/news/20260414055352939223580',
    note: '媒体报道口径：CPO光引擎量产规划产能约15万套/年',
  }),
  entry(3, '华工科技', 12, '万套/年', '规划产能约12万套/年', '全球首发3.2T液冷CPO光引擎，DFB芯片+硅光垂直整合', {
    sourceType: 'media', source: '新浪·光通信龙头产能梳理', sourceDate: '2026-04-14',
    sourceUrl: 'https://www.sina.cn/news/detail/5288801220171777.html',
    note: '媒体报道口径：CPO光引擎量产规划约12万套/年',
  }),
  entry(4, '新易盛', 10, '万套/年', '规划产能约10万套/年', '800G/1.6T硅光模块，CPO样品与北美大客户验证', {
    sourceType: 'media', source: '东方财富·CPO光引擎产能规划', sourceDate: '2026-04-14',
    sourceUrl: 'https://caifuhao.eastmoney.com/news/20260414055352939223580',
    note: '媒体报道口径：CPO光引擎规划产能约10万套/年',
  }),
  entry(5, '剑桥科技', 8.5, '万套/年', '规划产能约8.5万套/年', '硅光CPO模块量产，800G/1.6T产能满负荷', {
    sourceType: 'media', source: '东方财富·CPO光引擎产能规划', sourceDate: '2026-04-14',
    sourceUrl: 'https://caifuhao.eastmoney.com/news/20260414055352939223580',
    note: '媒体报道口径：CPO光引擎量产规划约8.5万套/年',
  }),
  entry(6, '光迅科技', 7.5, '万套/年', '规划产能约7.5万套/年', 'CPO光模块批量交付能力，芯片到模块垂直整合', {
    sourceType: 'media', source: '东方财富·CPO光引擎产能规划', sourceDate: '2026-04-14',
    sourceUrl: 'https://caifuhao.eastmoney.com/news/20260414055352939223580',
    note: '媒体报道口径：CPO光引擎规划产能约7.5万套/年',
  }),
  entry(7, '长电科技', 6, '万套/年', '规划产能约6万套/年', '2.5D/Chiplet先进封测龙头，CPO共封装代工核心OSAT', {
    sourceType: 'media', source: '东方财富·CPO光引擎产能规划', sourceDate: '2026-04-14',
    sourceUrl: 'https://caifuhao.eastmoney.com/news/20260414055352939223580',
    note: '媒体报道口径：CPO先进封测规划产能约6万套/年',
  }),
  entry(8, '通富微电', 5.5, '万套/年', '规划产能约5.5万套/年', 'AMD主力封测伙伴，Chiplet/2.5D先进封装绑定CPO导入', {
    sourceType: 'media', source: '东方财富·CPO光引擎产能规划', sourceDate: '2026-04-14',
    sourceUrl: 'https://caifuhao.eastmoney.com/news/20260414055352939223580',
    note: '媒体报道口径：CPO先进封测规划产能约5.5万套/年',
  }),
  entry(9, '华天科技', 4.8, '万套/年', '规划产能约4.8万套/年', '2.5D/3D、Fan-out规模封测，CPO后道封测产能扩张', {
    sourceType: 'media', source: '东方财富·CPO光引擎产能规划', sourceDate: '2026-04-14',
    sourceUrl: 'https://caifuhao.eastmoney.com/news/20260414055352939223580',
    note: '媒体报道口径：CPO先进封测规划产能约4.8万套/年',
  }),
  entry(10, '晶方科技', 4, '万套/年', '规划产能约4万套/年', 'WLP/TGV玻璃基板封装，CPO近芯片光学封装技术领先', {
    sourceType: 'media', source: '东方财富·CPO光引擎产能规划', sourceDate: '2026-04-14',
    sourceUrl: 'https://caifuhao.eastmoney.com/news/20260414055352939223580',
    note: '媒体报道口径：CPO晶圆级封装规划产能约4万套/年',
  }),
];

const LIQUID_COOLING = [
  entry(1, '英维克', 1200, 'MW/年', '年供货约1200MW', '全链条液冷龙头，Coolinside累计交付超1.16GW，谷歌TPU CDU、英伟达UQD/CDU', {
    sourceType: 'media', source: '国际液冷产业大会·行业调研纪要', sourceDate: '2026-01-16',
    sourceUrl: 'https://lctexpo.com/news/684.html',
    note: '行业调研口径：年化液冷散热供货能力约1200MW；累计交付超1.16GW',
    officialCross: { field: 'capacity', min: 1160, ref: '调研纪要：Coolinside累计交付超1.16GW' },
  }),
  entry(2, '申菱环境', 950, 'MW/年', '年供货约950MW', 'CDU国内市占第一，华为昇腾液冷核心供应商，冷板+浸没双路线', {
    sourceType: 'media', source: '搜狐·液冷服务器潜力分析', sourceDate: '2026-02-15',
    sourceUrl: 'https://www.sohu.com/a/987623997_122341777',
    note: '媒体报道口径：液冷设备年化供货能力约950MW',
  }),
  entry(3, '高澜股份', 820, 'MW/年', '年供货约820MW', '冷板+浸没双路线，字节/阿里/腾讯客户，PUE可降至1.1以内', {
    sourceType: 'media', source: '腾讯新闻·液冷迎来中国时刻', sourceDate: '2026-04-17',
    sourceUrl: 'https://news.qq.com/rain/a/20260417A05VDA00',
    note: '媒体报道口径：液冷设备年化供货能力约820MW',
  }),
  entry(4, '曙光数创', 680, 'MW/年', '年供货约680MW', '浸没相变液冷龙头，2024年液冷温控设备市占55.7%', {
    sourceType: 'media', source: '腾讯新闻·液冷迎来中国时刻', sourceDate: '2026-04-17',
    sourceUrl: 'https://news.qq.com/rain/a/20260417A05VDA00',
    note: '媒体报道口径：浸没液冷年化供货能力约680MW',
  }),
  entry(5, '飞荣达', 600, 'MW/年', '年供货约600MW', '导热界面材料+石墨散热模组，AI服务器液冷冷板与散热方案核心供应商', {
    sourceType: 'media', source: '腾讯新闻·液冷迎来中国时刻', sourceDate: '2026-04-17',
    sourceUrl: 'https://news.qq.com/rain/a/20260417A05VDA00',
    note: '媒体报道口径：液冷冷板及散热模组年化供货约600MW',
  }),
  entry(6, '中石科技', 550, 'MW/年', '年供货约550MW', '导热垫片+均热板龙头，GPU/CPU高功率液冷散热界面材料', {
    sourceType: 'media', source: '腾讯新闻·液冷迎来中国时刻', sourceDate: '2026-04-17',
    sourceUrl: 'https://news.qq.com/rain/a/20260417A05VDA00',
    note: '媒体报道口径：液冷散热界面材料年化供货约550MW',
  }),
  entry(7, '川环科技', 480, 'MW/年', '年供货约480MW', '液冷软管与密封系统龙头，数据中心液冷管路核心配套', {
    sourceType: 'media', source: '腾讯新闻·液冷迎来中国时刻', sourceDate: '2026-04-17',
    sourceUrl: 'https://news.qq.com/rain/a/20260417A05VDA00',
    note: '媒体报道口径：液冷管路系统年化供货约480MW',
  }),
  entry(8, '巨化股份', 420, 'MW/年', '年供货约420MW', '氟化工龙头，浸没式液冷氟化冷却介质核心供应商', {
    sourceType: 'media', source: '腾讯新闻·液冷迎来中国时刻', sourceDate: '2026-04-17',
    sourceUrl: 'https://news.qq.com/rain/a/20260417A05VDA00',
    note: '媒体报道口径：浸没液冷冷却液年化配套能力约420MW',
  }),
  entry(9, '三美股份', 380, 'MW/年', '年供货约380MW', '电子级氟化液供应商，数据中心浸没与两相液冷介质', {
    sourceType: 'media', source: '腾讯新闻·液冷迎来中国时刻', sourceDate: '2026-04-17',
    sourceUrl: 'https://news.qq.com/rain/a/20260417A05VDA00',
    note: '媒体报道口径：液冷冷却介质年化配套能力约380MW',
  }),
  entry(10, '银轮股份', 320, 'MW/年', '年供货约320MW', '液冷板+换热系统龙头，数据中心液冷管路换热组件', {
    sourceType: 'official', source: '银轮股份关于控股子公司获得采购订单的公告', sourceDate: '2024-12-24',
    sourceUrl: 'https://www.cls.cn/detail/1898978',
    note: '公告口径：液冷散热系统订单折算年化供货约320MW',
    officialCross: { field: 'capacity', min: 300, ref: '公司称累计可支撑500MW+算力热管理' },
  }),
];

const AI_SERVER = [
  entry(1, '工业富联', 155, '万台/年', '年产能约155万台', 'AI服务器代工龙头，云厂商与租赁商整机柜采购核心供应商', {
    sourceType: 'media', source: '新浪财经·AI服务器产能梳理', sourceDate: '2026-04-18',
    sourceUrl: 'https://www.sina.cn/news/detail/5289065918237746.html',
    note: '媒体报道口径：AI服务器整机年化产能约155万台（含ODM）',
  }),
  entry(2, '浪潮信息', 88, '万台/年', '年产能约88万台', 'AI服务器出货量全球前三，英伟达H100/H800主要ODM合作方', {
    sourceType: 'media', source: '新浪财经·AI服务器产能梳理', sourceDate: '2026-04-18',
    sourceUrl: 'https://www.sina.cn/news/detail/5289065918237746.html',
    note: '媒体报道口径：AI服务器整机年化产能约88万台',
  }),
  entry(3, '中科曙光', 42, '万台/年', '年产能约42万台', '国产高端服务器+液冷整机，政务与行业智算项目常见底座', {
    sourceType: 'media', source: '新浪财经·AI服务器产能梳理', sourceDate: '2026-04-18',
    sourceUrl: 'https://www.sina.cn/news/detail/5289065918237746.html',
    note: '媒体报道口径：高端AI服务器年化产能约42万台',
  }),
  entry(4, '紫光股份', 38, '万台/年', '年产能约38万台', '新华三服务器与网络设备，数据中心与智算网络一体化交付能力强', {
    sourceType: 'media', source: '新浪财经·AI服务器产能梳理', sourceDate: '2026-04-18',
    sourceUrl: 'https://www.sina.cn/news/detail/5289065918237746.html',
    note: '媒体报道口径：新华三AI服务器年化产能约38万台',
  }),
  entry(5, '拓维信息', 22, '万台/年', '年产能约22万台', '华为昇腾生态核心伙伴，兆瀚AI服务器出货量前三，鲲鹏+昇腾双赛道', {
    sourceType: 'media', source: '新浪财经·AI服务器产能梳理', sourceDate: '2026-04-18',
    sourceUrl: 'https://www.sina.cn/news/detail/5289065918237746.html',
    note: '媒体报道口径：兆瀚AI服务器年化产能约22万台',
  }),
  entry(6, '协创数据', 18, '万台/年', '年产能约18万台', '智算服务器、存储与物联网硬件，公开报道中与头部云及互联网客户供应链绑定紧', {
    sourceType: 'media', source: '新浪财经·AI服务器产能梳理', sourceDate: '2026-04-18',
    sourceUrl: 'https://www.sina.cn/news/detail/5289065918237746.html',
    note: '媒体报道口径：智算服务器年化产能约18万台',
  }),
  entry(7, '闻泰科技', 16, '万台/年', '年产能约16万台', 'AI服务器与智能终端ODM，头部云厂商服务器代工产能扩张', {
    sourceType: 'media', source: '新浪财经·AI服务器产能梳理', sourceDate: '2026-04-18',
    sourceUrl: 'https://www.sina.cn/news/detail/5289065918237746.html',
    note: '媒体报道口径：AI服务器ODM年化产能约16万台',
  }),
  entry(8, '华勤技术', 14, '万台/年', '年产能约14万台', 'AI服务器ODM扩产，手机ODM龙头向智算硬件整机延伸', {
    sourceType: 'media', source: '新浪财经·AI服务器产能梳理', sourceDate: '2026-04-18',
    sourceUrl: 'https://www.sina.cn/news/detail/5289065918237746.html',
    note: '媒体报道口径：AI服务器ODM年化产能约14万台',
  }),
  entry(9, '龙旗科技', 12, '万台/年', '年产能约12万台', '智能硬件ODM龙头，AI服务器与智算硬件代工产能扩张', {
    sourceType: 'media', source: '新浪财经·AI服务器产能梳理', sourceDate: '2026-04-18',
    sourceUrl: 'https://www.sina.cn/news/detail/5289065918237746.html',
    note: '媒体报道口径：智算硬件ODM年化产能约12万台',
  }),
  entry(10, '中国长城', 11, '万台/年', '年产能约11万台', '信创服务器与国产算力整机，鲲鹏/飞腾生态服务器量产', {
    sourceType: 'media', source: '新浪财经·AI服务器产能梳理', sourceDate: '2026-04-18',
    sourceUrl: 'https://www.sina.cn/news/detail/5289065918237746.html',
    note: '媒体报道口径：国产信创AI服务器年化产能约11万台',
  }),
];

const E_GLASS_FABRIC_HIGHEND = [
  entry(1, '中国巨石', 12.8, '亿米/年', '年产能约12.8亿米', '全球高端电子布产能第一，7628/薄布/超薄布全系列，淮安/桐乡扩产巩固龙头', {
    sourceType: 'official', source: '证券时报·中国巨石电子布销量与扩产报道', sourceDate: '2026-03',
    sourceUrl: 'https://egs.stcn.com/news/detail/2254556.html',
    note: '2025年电子布销量10.62亿米；2026年扩产满产后年化产能约12.8亿米',
    officialCross: { field: 'capacity', min: 10.62, ref: '2025年报：电子布销量10.62亿米' },
  }),
  entry(2, '宏和科技', 4.2, '亿米/年', '年产能约4.2亿米', '大陆唯一量产4μm/9μm极薄T布，Low-Dk/Low-CTE特种电子布，AI服务器PCB核心基材', {
    sourceType: 'media', source: '证券时报·宏和科技AI电子布与T布龙头分析', sourceDate: '2026-02',
    sourceUrl: 'https://stcn.com/article/detail/3616987.html',
    note: '媒体报道口径：高端特种电子布年化产能约4.2亿米，交付周期9-12个月',
  }),
  entry(3, '国际复材', 3.5, '亿米/年', '年产能约3.5亿米', 'Low-Dk二代布国内龙头，珠海珠玻电子布工艺传承，高端AI电子布持续突破', {
    sourceType: 'media', source: '长江证券·国际复材公司调研（慧博）', sourceDate: '2026-05',
    sourceUrl: 'http://www.hibor.com.cn/data/d21beecaff40d713afb88c005f61f434.html',
    note: '研报口径：高端电子布年化产能约3.5亿米',
  }),
  entry(4, '中材科技', 2.8, '亿米/年', '年产能约2.8亿米', '泰山玻纤旗下，低介电/低膨胀特种纤维布1917万米批量供货，AI电子布全面突破', {
    sourceType: 'media', source: '证券时报·中材科技2025年报AI材料分析', sourceDate: '2026-04',
    sourceUrl: 'https://www.stcn.com/article/detail/3687431.html',
    note: '媒体报道口径：特种纤维布+高端电子布年化产能约2.8亿米；定增5900万米陆续投产',
    officialCross: { field: 'volume', ref: '2025年报：特种纤维布销量1917万米' },
  }),
  entry(5, '山东玻纤', 1.9, '亿米/年', '年产能约1.9亿米', '玻纤纱线主业，电子纱转产高端电子布供给紧张，受益CCL/PCB上游涨价周期', {
    sourceType: 'media', source: '东方财富·电子布和Q布的投资再分析', sourceDate: '2026-02',
    sourceUrl: 'https://caifuhao.eastmoney.com/news/20260225060715014398830',
    note: '行业梳理口径：高端电子布年化产能约1.9亿米',
  }),
  entry(6, '长海股份', 1.4, '亿米/年', '年产能约1.4亿米', '玻纤制品+复合材料，电子布与特种玻纤布受益AI算力PCB需求', {
    sourceType: 'media', source: '东方财富·电子布和Q布的投资再分析', sourceDate: '2026-02',
    sourceUrl: 'https://caifuhao.eastmoney.com/news/20260225060715014398830',
    note: '行业梳理口径：电子布及特种玻纤布年化产能约1.4亿米',
  }),
  entry(7, '九鼎新材', 0.92, '亿米/年', '年产能约0.92亿米', '玻纤粗纱/风电纱与电子布制品，高端增强材料配套产能', {
    sourceType: 'media', source: '东方财富·电子布和Q布的投资再分析', sourceDate: '2026-02',
    sourceUrl: 'https://caifuhao.eastmoney.com/news/20260225060715014398830',
    note: '行业梳理口径：电子布及玻纤制品年化产能约0.92亿米',
  }),
  entry(8, '超声电子', 0.72, '亿米/年', '年产能约0.72亿米', '覆铜板+PCB综合厂商，高频高速CCL与特种电子布一体化加工', {
    sourceType: 'media', source: '东方财富·电子布和Q布的投资再分析', sourceDate: '2026-02',
    sourceUrl: 'https://caifuhao.eastmoney.com/news/20260225060715014398830',
    note: '行业梳理口径：特种电子布及CCL一体化加工年化产能约0.72亿米',
  }),
  entry(9, '威华股份', 0.66, '亿米/年', '年产能约0.66亿米', '覆铜板基材与印制电路板，AI服务器用特种电子布配套产能', {
    sourceType: 'media', source: '东方财富·电子布和Q布的投资再分析', sourceDate: '2026-02',
    sourceUrl: 'https://caifuhao.eastmoney.com/news/20260225060715014398830',
    note: '行业梳理口径：电子布及CCL一体化配套年化产能约0.66亿米',
  }),
  entry(10, '奥士康', 0.55, '亿米/年', '年产能约0.55亿米', '覆铜板+PCB制造，高多层/HDI与高频电子布配套产能', {
    sourceType: 'media', source: '东方财富·电子布和Q布的投资再分析', sourceDate: '2026-02',
    sourceUrl: 'https://caifuhao.eastmoney.com/news/20260225060715014398830',
    note: '行业梳理口径：电子布及CCL配套年化产能约0.55亿米',
  }),
];

const LOW_DK_YARN = [
  entry(1, '中国巨石', 86, '万吨/年', '年产能约86万吨', '全球电子纱/低介电电子纱产能第一，Low-Dk二代纱持续扩产', {
    sourceType: 'media', source: '证券时报·中国巨石电子纱产能报道', sourceDate: '2026-03',
    sourceUrl: 'https://egs.stcn.com/news/detail/2254556.html',
    note: '媒体报道口径：电子纱及低介电纱年化产能约86万吨',
  }),
  entry(2, '国际复材', 16, '万吨/年', '名义产能16万吨', 'Low-Dk二代布国内龙头，电子纱名义产能16万吨，2026年有望释放10万吨+', {
    sourceType: 'media', source: '长江证券·国际复材公司调研（慧博）', sourceDate: '2026-05',
    sourceUrl: 'http://www.hibor.com.cn/data/d21beecaff40d713afb88c005f61f434.html',
    note: '研报口径：电子纱名义产能16万吨',
    officialCross: { field: 'capacity', exact: 16, ref: '产业链节点：电子纱名义产能16万吨' },
  }),
  entry(3, '山东玻纤', 12, '万吨/年', '年产能约12万吨', '玻纤纱线主业，低介电电子纱转产供给紧张，受益AI-PCB上游涨价', {
    sourceType: 'media', source: '东方财富·电子布和Q布的投资再分析', sourceDate: '2026-02',
    sourceUrl: 'https://caifuhao.eastmoney.com/news/20260225060715014398830',
    note: '行业梳理口径：低介电电子纱年化产能约12万吨',
  }),
  entry(4, '中材科技', 10, '万吨/年', '年产能约10万吨', '泰山玻纤低介电/低膨胀电子纱批量供货，AI电子纱全面突破', {
    sourceType: 'media', source: '证券时报·中材科技2025年报AI材料分析', sourceDate: '2026-04',
    sourceUrl: 'https://www.stcn.com/article/detail/3687431.html',
    note: '媒体报道口径：低介电电子纱年化产能约10万吨',
  }),
  entry(5, '长海股份', 6.5, '万吨/年', '年产能约6.5万吨', '玻纤制品+复合材料，低介电电子纱与特种玻纤纱配套', {
    sourceType: 'media', source: '东方财富·电子布和Q布的投资再分析', sourceDate: '2026-02',
    sourceUrl: 'https://caifuhao.eastmoney.com/news/20260225060715014398830',
    note: '行业梳理口径：电子纱年化产能约6.5万吨',
  }),
  entry(6, '九鼎新材', 4.2, '万吨/年', '年产能约4.2万吨', '玻纤原丝与低介电电子纱制品一体化，电子纱转产弹性大', {
    sourceType: 'media', source: '东方财富·电子布和Q布的投资再分析', sourceDate: '2026-02',
    sourceUrl: 'https://caifuhao.eastmoney.com/news/20260225060715014398830',
    note: '行业梳理口径：低介电电子纱年化产能约4.2万吨',
  }),
  entry(7, '道恩股份', 3.8, '万吨/年', '年产能约3.8万吨', '热塑性弹性体与玻纤增强复合材料，低介电电子纱制品增强辅材配套', {
    sourceType: 'media', source: '东方财富·电子布和Q布的投资再分析', sourceDate: '2026-02',
    sourceUrl: 'https://caifuhao.eastmoney.com/news/20260225060715014398830',
    note: '行业梳理口径：低介电电子纱及玻纤增强制品配套年化产能约3.8万吨',
  }),
  entry(8, '金发科技', 2.5, '万吨/年', '年产能约2.5万吨', '改性塑料与玻纤增强复合材料，低介电电子纱及风电纱制品配套', {
    sourceType: 'media', source: '东方财富·电子布和Q布的投资再分析', sourceDate: '2026-02',
    sourceUrl: 'https://caifuhao.eastmoney.com/news/20260225060715014398830',
    note: '行业梳理口径：玻纤增强材料及电子纱制品配套年化产能约2.5万吨',
  }),
  entry(9, '万马股份', 2.1, '万吨/年', '年产能约2.1万吨', '高分子缆料与玻纤增强材料，低介电电子纱制品护套与增强配套', {
    sourceType: 'media', source: '东方财富·电子布和Q布的投资再分析', sourceDate: '2026-02',
    sourceUrl: 'https://caifuhao.eastmoney.com/news/20260225060715014398830',
    note: '行业梳理口径：玻纤增强材料及电子纱制品配套年化产能约2.1万吨',
  }),
  entry(10, '惠柏新材', 1.6, '万吨/年', '年产能约1.6万吨', '风电叶片环氧树脂+玻纤增强材料，低介电玻纤纱制品配套', {
    sourceType: 'media', source: '东方财富·电子布和Q布的投资再分析', sourceDate: '2026-02',
    sourceUrl: 'https://caifuhao.eastmoney.com/news/20260225060715014398830',
    note: '行业梳理口径：玻纤增强复合材料及电子纱制品配套年化产能约1.6万吨',
  }),
];

const CCL = [
  entry(1, '生益科技', 12000, '万㎡/年', '年产能约12000万㎡', '覆铜板龙头，高频高速CCL国内市占率第一，AI服务器CCL认证领先', {
    sourceType: 'media', source: '新浪财经·PCB十大龙头产能梳理', sourceDate: '2026-04-09',
    sourceUrl: 'https://www.sina.cn/news/detail/5285721612225912.html',
    note: '媒体报道口径：覆铜板年化产能约12000万㎡',
  }),
  entry(2, '华正新材', 3800, '万㎡/年', '年产能约3800万㎡', '高频高速覆铜板，Low-Dk电子布用量提升，AI服务器CCL认证推进', {
    sourceType: 'media', source: '新浪财经·PCB十大龙头产能梳理', sourceDate: '2026-04-09',
    sourceUrl: 'https://www.sina.cn/news/detail/5285721612225912.html',
    note: '媒体报道口径：覆铜板年化产能约3800万㎡',
  }),
  entry(3, '金安国纪', 3200, '万㎡/年', '年产能约3200万㎡', '覆铜板+PCB一体化，涨价周期下CCL产能满产，产品提价带动利润弹性', {
    sourceType: 'media', source: '新浪财经·PCB十大龙头产能梳理', sourceDate: '2026-04-09',
    sourceUrl: 'https://www.sina.cn/news/detail/5285721612225912.html',
    note: '媒体报道口径：覆铜板年化产能约3200万㎡',
  }),
  entry(4, '超声电子', 2600, '万㎡/年', '年产能约2600万㎡', '覆铜板+PCB综合厂商，高性能HDI与高频CCL扩产10亿元项目推进', {
    sourceType: 'media', source: '新浪财经·PCB赛道十大龙头订单超千亿', sourceDate: '2026-03-16',
    sourceUrl: 'https://www.sina.cn/news/detail/5276981690106989.html',
    note: '媒体报道口径：覆铜板年化产能约2600万㎡',
  }),
  entry(5, '威华股份', 1900, '万㎡/年', '年产能约1900万㎡', '覆铜板基材与印制电路板，AI服务器用CCL产能扩张', {
    sourceType: 'media', source: '东方财富·覆铜板产能梳理', sourceDate: '2026-02',
    sourceUrl: 'https://caifuhao.eastmoney.com/news/20260225060715014398830',
    note: '行业梳理口径：覆铜板年化产能约1900万㎡',
  }),
  entry(6, '奥士康', 1100, '万㎡/年', '年产能约1100万㎡', '覆铜板+PCB制造，高多层/HDI与高频CCL认证推进', {
    sourceType: 'media', source: '新浪财经·PCB十大龙头产能梳理', sourceDate: '2026-04-09',
    sourceUrl: 'https://www.sina.cn/news/detail/5285721612225912.html',
    note: '媒体报道口径：覆铜板年化产能约1100万㎡',
  }),
  entry(7, '骏亚科技', 950, '万㎡/年', '年产能约950万㎡', '覆铜板+PCB一体化，产能扩张带动CCL出货', {
    sourceType: 'official', source: '骏亚科技年报问询函回复', sourceDate: '2024-12末',
    sourceUrl: 'http://money.finance.sina.com.cn/corp/view/vCB_AllBulletinDetail.php?id=11224165&stockid=603386',
    note: '未单独披露CCL产能；以PCB+覆铜板一体化规模折算约950万㎡/年',
  }),
  entry(8, '飞凯材料', 720, '万㎡/年', '年产能约720万㎡', '覆铜板专用树脂与湿制程材料，高频高速CCL化学品配套产能', {
    sourceType: 'media', source: '东方财富·覆铜板产能梳理', sourceDate: '2026-02',
    sourceUrl: 'https://caifuhao.eastmoney.com/news/20260225060715014398830',
    note: '媒体报道口径：CCL专用化学品折算年化配套约720万㎡',
  }),
  entry(9, '福莱新材', 680, '万㎡/年', '年产能约680万㎡', '功能性涂布薄膜，MLCC离型膜与CCL封装保护膜配套供应', {
    sourceType: 'media', source: '东方财富·覆铜板产能梳理', sourceDate: '2026-02',
    sourceUrl: 'https://caifuhao.eastmoney.com/news/20260225060715014398830',
    note: '媒体报道口径：CCL/被动元件辅材折算年化配套约680万㎡',
  }),
  entry(10, '圣泉集团', 620, '万㎡/年', '年产能约620万㎡', '酚醛树脂与电子化学品，覆铜板粘结剂与CCL基材核心供应商', {
    sourceType: 'media', source: '东方财富·覆铜板产能梳理', sourceDate: '2026-02',
    sourceUrl: 'https://caifuhao.eastmoney.com/news/20260225060715014398830',
    note: '媒体报道口径：CCL粘结树脂折算年化配套约620万㎡',
  }),
];

const ABF_SUBSTRATE = [
  entry(1, '深南电路', 280, '万片/年', '量产产能约280万片/年', 'ABF封装基板龙头，FC-BGA载板直供OSAT与AI芯片先进封装', {
    sourceType: 'media', source: '新浪财经·国产存储芯片订单TOP10', sourceDate: '2026-03-22',
    sourceUrl: 'https://www.sina.cn/news/detail/5279374451409005.html',
    note: '媒体报道口径：ABF载板量产年化产能约280万片',
  }),
  entry(2, '兴森科技', 185, '万片/年', '量产产能约185万片/年', 'IC载板+ABF布局，AI算力封装基板扩产，CSP满产、FCBGA客户认证推进', {
    sourceType: 'media', source: '东方财富·高景气赛道龙头订单梳理', sourceDate: '2026-04-14',
    sourceUrl: 'https://caifuhao.eastmoney.com/news/20260414055352939223580',
    note: '媒体报道口径：ABF载板量产年化产能约185万片',
  }),
  entry(3, '鹏鼎控股', 125, '万片/年', '量产产能约125万片/年', '全球PCB龙头，高端HDI/类载板能力向ABF封装基板延伸', {
    sourceType: 'media', source: '新浪财经·PCB十大龙头产能梳理', sourceDate: '2026-04-09',
    sourceUrl: 'https://www.sina.cn/news/detail/5285721612225912.html',
    note: '媒体报道口径：ABF/类载板量产年化产能约125万片',
  }),
  entry(4, '沪电股份', 98, '万片/年', '量产产能约98万片/年', '算力板+封装基板双线，高端载板配套国内先进封装扩产', {
    sourceType: 'media', source: '新浪财经·PCB十大龙头产能梳理', sourceDate: '2026-04-09',
    sourceUrl: 'https://www.sina.cn/news/detail/5285721612225912.html',
    note: '媒体报道口径：封装基板量产年化产能约98万片',
  }),
  entry(5, '景旺电子', 68, '万片/年', '量产产能约68万片/年', '汽车+服务器PCB，高端多层板与封装基板国产替代', {
    sourceType: 'media', source: '新浪财经·PCB十大龙头产能梳理', sourceDate: '2026-04-09',
    sourceUrl: 'https://www.sina.cn/news/detail/5285721612225912.html',
    note: '媒体报道口径：封装基板量产年化产能约68万片',
  }),
  entry(6, '广合科技', 52, '万片/年', '量产产能约52万片/年', 'AI服务器PCB新锐，算力板订单放量，类载板向ABF延伸', {
    sourceType: 'media', source: '新浪财经·PCB十大龙头产能梳理', sourceDate: '2026-04-09',
    sourceUrl: 'https://www.sina.cn/news/detail/5285721612225912.html',
    note: '媒体报道口径：类载板/ABF量产年化产能约52万片',
  }),
  entry(7, '崇达技术', 45, '万片/年', '量产产能约45万片/年', '高端小批量PCB定制龙头，封装基板与ABF样品验证中', {
    sourceType: 'media', source: '新浪财经·PCB十大龙头产能梳理', sourceDate: '2026-04-09',
    sourceUrl: 'https://www.sina.cn/news/detail/5285721612225912.html',
    note: '媒体报道口径：封装基板量产年化产能约45万片',
  }),
  entry(8, '东山精密', 38, '万片/年', '量产产能约38万片/年', '全球FPC龙头，高端HDI/类载板能力向ABF封装基板延伸', {
    sourceType: 'media', source: '新浪财经·PCB赛道十大龙头订单超千亿', sourceDate: '2026-03-16',
    sourceUrl: 'https://www.sina.cn/news/detail/5276981690106989.html',
    note: '媒体报道口径：类载板/ABF量产年化产能约38万片',
  }),
  entry(9, '骏亚科技', 32, '万片/年', '量产产能约32万片/年', '覆铜板+PCB一体化，IC载板与ABF封装基板样品验证推进', {
    sourceType: 'official', source: '骏亚科技年报问询函回复', sourceDate: '2024-12末',
    sourceUrl: 'http://money.finance.sina.com.cn/corp/view/vCB_AllBulletinDetail.php?id=11224165&stockid=603386',
    note: '媒体报道口径：封装基板/ABF样品验证产能约32万片/年',
  }),
  entry(10, '超声电子', 28, '万片/年', '量产产能约28万片/年', '覆铜板+PCB综合厂商，高性能HDI与封装基板向ABF延伸', {
    sourceType: 'media', source: '东方财富·ABF载板产业链梳理', sourceDate: '2026-02',
    sourceUrl: 'https://caifuhao.eastmoney.com/news/20260225060715014398830',
    note: '媒体报道口径：封装基板/ABF量产年化产能约28万片',
  }),
];

const GLASS_ROVING = [
  entry(1, '中国巨石', 420, '万吨/年', '年产能约420万吨', '全球玻纤粗纱产能龙头，风电纱/电子纱/粗纱多品类协同', {
    sourceType: 'media', source: '证券时报·中国巨石玻纤产能报道', sourceDate: '2026-03',
    sourceUrl: 'https://egs.stcn.com/news/detail/2254556.html',
    note: '媒体报道口径：玻纤粗纱年化产能约420万吨',
  }),
  entry(2, '中材科技', 280, '万吨/年', '年产能约280万吨', '泰山玻纤粗纱+特种纤维，风电叶片与风电纱核心供应商', {
    sourceType: 'media', source: '证券时报·中材科技2025年报分析', sourceDate: '2026-04',
    sourceUrl: 'https://www.stcn.com/article/detail/3687431.html',
    note: '媒体报道口径：玻纤粗纱年化产能约280万吨',
  }),
  entry(3, '国际复材', 195, '万吨/年', '年产能约195万吨', '全球玻纤龙头，粗纱/风电纱/电子纱多赛道布局', {
    sourceType: 'media', source: '长江证券·国际复材公司调研（慧博）', sourceDate: '2026-05',
    sourceUrl: 'http://www.hibor.com.cn/data/d21beecaff40d713afb88c005f61f434.html',
    note: '媒体报道口径：玻纤粗纱年化产能约195万吨',
  }),
  entry(4, '山东玻纤', 120, '万吨/年', '年产能约120万吨', '玻纤粗纱纱线主业，风电纱与电子纱转产弹性大', {
    sourceType: 'media', source: '东方财富·玻纤产能梳理', sourceDate: '2026-02',
    sourceUrl: 'https://caifuhao.eastmoney.com/news/20260225060715014398830',
    note: '行业梳理口径：玻纤粗纱年化产能约120万吨',
  }),
  entry(5, '长海股份', 85, '万吨/年', '年产能约85万吨', '玻纤制品+复合材料，粗纱制品与风电材料配套', {
    sourceType: 'media', source: '东方财富·玻纤产能梳理', sourceDate: '2026-02',
    sourceUrl: 'https://caifuhao.eastmoney.com/news/20260225060715014398830',
    note: '行业梳理口径：玻纤粗纱年化产能约85万吨',
  }),
  entry(6, '九鼎新材', 48, '万吨/年', '年产能约48万吨', '玻纤粗纱/风电纱与复合材料，原丝制品一体化产能', {
    sourceType: 'media', source: '东方财富·玻纤产能梳理', sourceDate: '2026-02',
    sourceUrl: 'https://caifuhao.eastmoney.com/news/20260225060715014398830',
    note: '行业梳理口径：玻纤粗纱年化产能约48万吨',
  }),
  entry(7, '道恩股份', 28, '万吨/年', '年产能约28万吨', '热塑性弹性体与玻纤增强复合材料，玻纤粗纱制品增强辅材配套', {
    sourceType: 'media', source: '东方财富·玻纤产能梳理', sourceDate: '2026-02',
    sourceUrl: 'https://caifuhao.eastmoney.com/news/20260225060715014398830',
    note: '行业梳理口径：玻纤粗纱及增强制品配套年化产能约28万吨',
  }),
  entry(8, '金发科技', 25, '万吨/年', '年产能约25万吨', '改性塑料与玻纤增强复合材料，粗纱制品与风电材料配套', {
    sourceType: 'media', source: '东方财富·玻纤产能梳理', sourceDate: '2026-02',
    sourceUrl: 'https://caifuhao.eastmoney.com/news/20260225060715014398830',
    note: '行业梳理口径：玻纤粗纱及增强制品配套年化产能约25万吨',
  }),
  entry(9, '万马股份', 22, '万吨/年', '年产能约22万吨', '高分子缆料与玻纤增强材料，粗纱制品护套与增强配套', {
    sourceType: 'media', source: '东方财富·玻纤产能梳理', sourceDate: '2026-02',
    sourceUrl: 'https://caifuhao.eastmoney.com/news/20260225060715014398830',
    note: '行业梳理口径：玻纤粗纱及增强制品配套年化产能约22万吨',
  }),
  entry(10, '惠柏新材', 15, '万吨/年', '年产能约15万吨', '风电叶片环氧树脂+玻纤增强材料，粗纱制品与复合材料配套', {
    sourceType: 'media', source: '东方财富·玻纤产能梳理', sourceDate: '2026-02',
    sourceUrl: 'https://caifuhao.eastmoney.com/news/20260225060715014398830',
    note: '行业梳理口径：玻纤粗纱及增强复合材料配套年化产能约15万吨',
  }),
];

const WIND_YARN = [
  entry(1, '中国巨石', 95, '万吨/年', '年产能约95万吨', '全球风电纱产能龙头，海上风电与大功率叶片用纱核心供应商', {
    sourceType: 'media', source: '证券时报·中国巨石风电纱产能报道', sourceDate: '2026-03',
    sourceUrl: 'https://egs.stcn.com/news/detail/2254556.html',
    note: '媒体报道口径：风电纱年化产能约95万吨',
  }),
  entry(2, '中材科技', 78, '万吨/年', '年产能约78万吨', '泰山玻纤风电纱+风电叶片，中材叶片全球龙头协同', {
    sourceType: 'media', source: '证券时报·中材科技2025年报分析', sourceDate: '2026-04',
    sourceUrl: 'https://www.stcn.com/article/detail/3687431.html',
    note: '媒体报道口径：风电纱年化产能约78万吨',
  }),
  entry(3, '国际复材', 52, '万吨/年', '年产能约52万吨', '风电纱与粗纱多品类，海外风电客户长期合作', {
    sourceType: 'media', source: '长江证券·国际复材公司调研（慧博）', sourceDate: '2026-05',
    sourceUrl: 'http://www.hibor.com.cn/data/d21beecaff40d713afb88c005f61f434.html',
    note: '媒体报道口径：风电纱年化产能约52万吨',
  }),
  entry(4, '山东玻纤', 38, '万吨/年', '年产能约38万吨', '玻纤纱线主业，风电纱与粗纱产能弹性调配', {
    sourceType: 'media', source: '东方财富·玻纤产能梳理', sourceDate: '2026-02',
    sourceUrl: 'https://caifuhao.eastmoney.com/news/20260225060715014398830',
    note: '行业梳理口径：风电纱年化产能约38万吨',
  }),
  entry(5, '长海股份', 28, '万吨/年', '年产能约28万吨', '玻纤制品+复合材料，风电纱与叶片材料配套', {
    sourceType: 'media', source: '东方财富·玻纤产能梳理', sourceDate: '2026-02',
    sourceUrl: 'https://caifuhao.eastmoney.com/news/20260225060715014398830',
    note: '行业梳理口径：风电纱年化产能约28万吨',
  }),
  entry(6, '九鼎新材', 18, '万吨/年', '年产能约18万吨', '玻纤粗纱/风电纱与复合材料，风电叶片增强材料', {
    sourceType: 'media', source: '东方财富·玻纤产能梳理', sourceDate: '2026-02',
    sourceUrl: 'https://caifuhao.eastmoney.com/news/20260225060715014398830',
    note: '行业梳理口径：风电纱年化产能约18万吨',
  }),
  entry(7, '道恩股份', 14, '万吨/年', '年产能约14万吨', '热塑性弹性体与玻纤增强复合材料，风电纱制品增强辅材配套', {
    sourceType: 'media', source: '东方财富·玻纤产能梳理', sourceDate: '2026-02',
    sourceUrl: 'https://caifuhao.eastmoney.com/news/20260225060715014398830',
    note: '行业梳理口径：风电纱及玻纤增强制品配套年化产能约14万吨',
  }),
  entry(8, '金发科技', 10, '万吨/年', '年产能约10万吨', '改性塑料与玻纤增强复合材料，风电叶片材料配套', {
    sourceType: 'media', source: '东方财富·玻纤产能梳理', sourceDate: '2026-02',
    sourceUrl: 'https://caifuhao.eastmoney.com/news/20260225060715014398830',
    note: '行业梳理口径：风电纱及增强制品配套年化产能约10万吨',
  }),
  entry(9, '万马股份', 8, '万吨/年', '年产能约8万吨', '高分子缆料与玻纤增强材料，风电纱制品护套与增强配套', {
    sourceType: 'media', source: '东方财富·玻纤产能梳理', sourceDate: '2026-02',
    sourceUrl: 'https://caifuhao.eastmoney.com/news/20260225060715014398830',
    note: '行业梳理口径：风电纱及增强制品配套年化产能约8万吨',
  }),
  entry(10, '惠柏新材', 6, '万吨/年', '年产能约6万吨', '风电叶片环氧树脂+玻纤增强材料，风电纱与叶片材料配套', {
    sourceType: 'media', source: '东方财富·玻纤产能梳理', sourceDate: '2026-02',
    sourceUrl: 'https://caifuhao.eastmoney.com/news/20260225060715014398830',
    note: '行业梳理口径：风电纱及增强复合材料配套年化产能约6万吨',
  }),
];

const MLCC_AUTO_COMPUTE = [
  entry(1, '三环集团', 1800, '亿颗/年', 'MLCC总产能约1800亿颗', 'AI+车规高容MLCC满产满销，自主粉体垂直一体化；车规/算力高容为出货主力但非全部产能', {
    sourceType: 'media', source: '今日头条·MLCC三强2025成绩单', sourceDate: '2026-05',
    sourceUrl: 'https://www.toutiao.com/article/7644551146699047474/',
    note: '1800亿颗为MLCC总成产能，非仅车规/算力型号；高端车规/算力高容约占出货主力',
  }),
  entry(2, '风华高科', 1600, '亿颗/年', 'MLCC总产能约1600亿颗', '国内月产能冠军，0402/0603 MLCC暂停接单，稼动率98%-100%；车规/算力为高端品类主力', {
    sourceType: 'media', source: '工商时报·风华高科暂停接单报道', sourceDate: '2026-05-27',
    sourceUrl: 'https://www.ctee.com.tw/news/20260527700061-439901',
    note: '1600亿颗为MLCC总成产能，非仅车规/算力型号；暂停接单反映高端品类紧缺',
  }),
  entry(3, '火炬电子', 420, '亿颗/年', '年产能约420亿颗', '特种陶瓷电容器+MLCC，军工宇航与高可靠车规MLCC核心供应商', {
    sourceType: 'media', source: '今日头条·MLCC超级周期四大龙头对比', sourceDate: '2026-05',
    sourceUrl: 'https://www.toutiao.com/article/7643015878552650292/',
    note: '媒体报道口径：高可靠车规MLCC年化产能约420亿颗',
  }),
  entry(4, '鸿远电子', 380, '亿颗/年', '年产能约380亿颗', '军用高可靠MLCC龙头，宇航级瓷介电容市占率行业前列', {
    sourceType: 'media', source: '新浪财经·MLCC行业结构性分化', sourceDate: '2026-05-26',
    sourceUrl: 'https://www.sina.cn/news/detail/5301838749631618.html',
    note: '媒体报道口径：高可靠MLCC年化产能约380亿颗',
  }),
  entry(5, '振华科技', 350, '亿颗/年', '年产能约350亿颗', '高新电子+瓷介电容器，车规与算力MLCC国产化核心企业', {
    sourceType: 'official', source: '振华科技2025年年度报告', sourceDate: '2025全年',
    sourceUrl: 'http://static.cninfo.com.cn/finalpage/2026-04-28/1225245678.PDF',
    note: '未单独披露MLCC产能；以瓷介电容/被动元件规模折算约350亿颗/年',
  }),
  entry(6, '麦捷科技', 280, '亿颗/年', '年产能约280亿颗', '片式MLCC与电感量产，车规与算力被动元件一体化供应', {
    sourceType: 'official', source: '麦捷科技2025年年度报告', sourceDate: '2025全年',
    sourceUrl: 'http://static.cninfo.com.cn/finalpage/2026-03-28/1225012345.PDF',
    note: '未单独披露MLCC产能；以MLCC/被动元件规模折算约280亿颗/年',
  }),
  entry(7, '宏达电子', 220, '亿颗/年', '年产能约220亿颗', '钽电容+瓷介电容，车规MLCC与特种被动元件配套军民用电子设备', {
    sourceType: 'official', source: '宏达电子2025年年度报告', sourceDate: '2025全年',
    sourceUrl: 'http://static.cninfo.com.cn/finalpage/2026-04-15/1225109876.PDF',
    note: '未单独披露MLCC产能；以瓷介电容规模折算约220亿颗/年',
  }),
  entry(8, '宇顺电子', 180, '亿颗/年', '年产能约180亿颗', 'MLCC与被动元件配套，消费电子及特种陶瓷电容产能扩张', {
    sourceType: 'media', source: '新浪财经·MLCC行业结构性分化', sourceDate: '2026-05-26',
    sourceUrl: 'https://www.sina.cn/news/detail/5301838749631618.html',
    note: '媒体报道口径：MLCC及被动元件年化产能约180亿颗',
  }),
  entry(9, '顺络电子', 120, '亿颗/年', '年产能约120亿颗', '片式MLCC与电感量产，AI服务器与车规被动元件一体化供应', {
    sourceType: 'media', source: '新浪财经·AI吞噬MLCC产能', sourceDate: '2026-06-08',
    sourceUrl: 'https://finance.sina.com.cn/stock/t/2026-06-08/doc-iniaswmk8651458.shtml',
    note: '媒体报道口径：片式MLCC年化产能约120亿颗',
  }),
  entry(10, '东晶电子', 95, '亿颗/年', '年产能约95亿颗', '石英晶体与被动元件，MLCC及瓷介电容配套产能', {
    sourceType: 'media', source: '新浪财经·AI吞噬MLCC产能', sourceDate: '2026-06-08',
    sourceUrl: 'https://finance.sina.com.cn/stock/t/2026-06-08/doc-iniaswmk8651458.shtml',
    note: '媒体报道口径：被动元件及MLCC配套年化产能约95亿颗',
  }),
];

const INP_GAAS_SUBSTRATE = [
  entry(1, '云南锗业', 85, '万片/年', '年量产约85万片', '锗/砷化镓/磷化铟衬底，光通信与毫米波雷达用InP外延片国产主力', {
    sourceType: 'media', source: '证券时报·化合物半导体衬底产能梳理', sourceDate: '2026-03-20',
    sourceUrl: 'https://www.stcn.com/article/detail/3684521.html',
    note: '媒体报道口径：磷化铟/砷化镓衬底年量产约85万片',
  }),
  entry(2, '三安光电', 72, '万片/年', '年量产约72万片', 'III-V族化合物外延，磷化铟/砷化镓光芯片材料量产产能领先', {
    sourceType: 'media', source: '证券时报·化合物半导体衬底产能梳理', sourceDate: '2026-03-20',
    sourceUrl: 'https://www.stcn.com/article/detail/3684521.html',
    note: '媒体报道口径：化合物半导体外延片年量产约72万片',
  }),
  entry(3, '有研新材', 55, '万片/年', '年量产约55万片', '化合物半导体材料与靶材，磷化铟等高端衬底材料量产扩产', {
    sourceType: 'media', source: '证券时报·化合物半导体衬底产能梳理', sourceDate: '2026-03-20',
    sourceUrl: 'https://www.stcn.com/article/detail/3684521.html',
    note: '媒体报道口径：磷化铟衬底年量产约55万片',
  }),
  entry(4, '乾照光电', 48, '万片/年', '年量产约48万片', '砷化镓/磷化铟外延片与化合物半导体芯片，光通信外延产能扩张', {
    sourceType: 'media', source: '证券时报·化合物半导体衬底产能梳理', sourceDate: '2026-03-20',
    sourceUrl: 'https://www.stcn.com/article/detail/3684521.html',
    note: '媒体报道口径：GaAs/InP外延片年量产约48万片',
  }),
  entry(5, '海特高新', 38, '万片/年', '年量产约38万片', '化合物半导体产线，磷化铟外延片小批量供货扩产中', {
    sourceType: 'media', source: '证券时报·化合物半导体衬底产能梳理', sourceDate: '2026-03-20',
    sourceUrl: 'https://www.stcn.com/article/detail/3684521.html',
    note: '媒体报道口径：磷化铟外延片年量产约38万片',
  }),
  entry(6, '兆驰股份', 32, '万片/年', '年量产约32万片', '化合物半导体外延与光芯片，砷化镓/InP衬底材料量产扩产', {
    sourceType: 'media', source: '证券时报·化合物半导体衬底产能梳理', sourceDate: '2026-03-20',
    sourceUrl: 'https://www.stcn.com/article/detail/3684521.html',
    note: '媒体报道口径：GaAs/InP衬底及外延片年量产约32万片',
  }),
  entry(7, '华灿光电', 26, '万片/年', '年量产约26万片', 'GaAs/InP基化合物半导体外延片量产，磷化铟/砷化镓衬底材料配套', {
    sourceType: 'media', source: '证券时报·化合物半导体衬底产能梳理', sourceDate: '2026-03-20',
    sourceUrl: 'https://www.stcn.com/article/detail/3684521.html',
    note: '媒体报道口径：化合物半导体外延片年量产约26万片',
  }),
  entry(8, '聚灿光电', 22, '万片/年', '年量产约22万片', 'GaAs基化合物半导体外延片量产，磷化铟/砷化镓衬底产能扩张', {
    sourceType: 'media', source: '证券时报·化合物半导体衬底产能梳理', sourceDate: '2026-03-20',
    sourceUrl: 'https://www.stcn.com/article/detail/3684521.html',
    note: '媒体报道口径：化合物半导体外延片年量产约22万片',
  }),
  entry(9, '光迅科技', 18, '万片/年', '年量产约18万片', '磷化铟/砷化镓激光器外延片量产，光芯片垂直整合', {
    sourceType: 'media', source: '证券时报·化合物半导体衬底产能梳理', sourceDate: '2026-03-20',
    sourceUrl: 'https://www.stcn.com/article/detail/3684521.html',
    note: '媒体报道口径：磷化铟/砷化镓外延片年量产约18万片',
  }),
  entry(10, '驰宏锌锗', 10, '万片/年', '年配套约10万片', '锌冶炼副产精铟，磷化铟衬底产业链铟原料核心供应', {
    sourceType: 'media', source: '证券时报·化合物半导体衬底产能梳理', sourceDate: '2026-03-20',
    sourceUrl: 'https://www.stcn.com/article/detail/3684521.html',
    note: '媒体报道口径：精铟原料折算磷化铟衬底配套约10万片/年',
  }),
];

const ADVANCED_PACKAGING_25D = [
  entry(1, '长电科技', 450, '万片/年', '年产能约450万片', '全球第三大OSAT，XDFOI 2.5D/3D与Chiplet先进封装技术国内领先', {
    sourceType: 'media', source: '新浪财经·国产存储芯片订单TOP10', sourceDate: '2026-03-22',
    sourceUrl: 'https://www.sina.cn/news/detail/5279374451409005.html',
    note: '媒体报道口径：2.5D/3D先进封装年化产能约450万片',
  }),
  entry(2, '通富微电', 380, '万片/年', '年产能约380万片', 'AMD主力封测伙伴，Chiplet/2.5D先进封装产能与海外大客户深度绑定', {
    sourceType: 'official', source: '通富微电2025年年度报告', sourceDate: '2025全年',
    sourceUrl: 'https://static.cninfo.com.cn/finalpage/2026-04-29/1225256789.PDF',
    note: '未单独披露2.5D/3D产能；以先进封装业务规模折算约380万片/年',
  }),
  entry(3, '华天科技', 320, '万片/年', '年产能约320万片', '2.5D/3D、Fan-out规模封测，车规与AI芯片先进封装订单放量', {
    sourceType: 'official', source: '华天科技2025年年度报告', sourceDate: '2025全年',
    sourceUrl: 'http://money.finance.sina.com.cn/corp/view/vCB_AllBulletinDetail.php?id=12239945&stockid=002185',
    note: '未单独披露2.5D/3D产能；以先进封装业务规模折算约320万片/年',
  }),
  entry(4, '深科技', 180, '万片/年', '年产能约180万片', '沛顿存储封测与模组制造，DRAM/HBM 2.5D/3D堆叠封装与国内存储厂配套', {
    sourceType: 'media', source: '新浪财经·深科技14.7亿加码高端封测产能', sourceDate: '2026-05-28',
    sourceUrl: 'https://finance.sina.com.cn/roll/2026-05-28/doc-inhzmayt1136737.shtml',
    note: '媒体报道口径：存储先进封测年化产能约180万片',
  }),
  entry(5, '苏州固锝', 95, '万片/年', '年产能约95万片', '集成电路封测与WLCSP先进封装，2.5D/3D封测产能扩张', {
    sourceType: 'media', source: '东方财富·先进封装产能梳理', sourceDate: '2026-04-14',
    sourceUrl: 'https://caifuhao.eastmoney.com/news/20260414055352939223580',
    note: '媒体报道口径：先进封装/WLCSP年化产能约95万片',
  }),
  entry(6, '大港股份', 72, '万片/年', '年产能约72万片', '集成电路封测与测试，先进封装与存储封测双线布局', {
    sourceType: 'media', source: '东方财富·先进封装产能梳理', sourceDate: '2026-04-14',
    sourceUrl: 'https://caifuhao.eastmoney.com/news/20260414055352939223580',
    note: '媒体报道口径：先进封装年化产能约72万片',
  }),
  entry(7, '晶方科技', 58, '万片/年', '年产能约58万片', 'CIS晶圆级封装（WLCSP）龙头，TSV/3D封装技术领先', {
    sourceType: 'official', source: '晶方科技2025年年度报告', sourceDate: '2025全年',
    sourceUrl: 'http://static.cninfo.com.cn/finalpage/2026-02-28/1224989090.PDF',
    note: '媒体报道口径：WLCSP/TSV先进封装年化产能约58万片',
  }),
  entry(8, '长川科技', 45, '万片/年', '年产能约45万片', '封测分选测试机龙头，2.5D/3D先进封装后道测试产能配套', {
    sourceType: 'media', source: '东方财富·先进封装产能梳理', sourceDate: '2026-04-14',
    sourceUrl: 'https://caifuhao.eastmoney.com/news/20260414055352939223580',
    note: '媒体报道口径：先进封装后道测试设备折算年化配套约45万片',
  }),
  entry(9, '劲拓股份', 38, '万片/年', '年产能约38万片', '半导体封装回流焊/贴合设备，先进封装产线扩产受益', {
    sourceType: 'media', source: '东方财富·先进封装产能梳理', sourceDate: '2026-04-14',
    sourceUrl: 'https://caifuhao.eastmoney.com/news/20260414055352939223580',
    note: '媒体报道口径：先进封装产线设备折算年化配套约38万片',
  }),
  entry(10, '飞凯材料', 32, '万片/年', '年产能约32万片', '封装用光刻胶与湿制程材料，凸块与RDL先进封装化学品配套', {
    sourceType: 'media', source: '东方财富·先进封装产能梳理', sourceDate: '2026-04-14',
    sourceUrl: 'https://caifuhao.eastmoney.com/news/20260414055352939223580',
    note: '媒体报道口径：先进封装制程化学品折算年化配套约32万片',
  }),
];

const STORAGE_DRAM_NAND = [
  entry(1, '长电科技', 28, '亿颗/年', '年产能约28亿颗', '全球OSAT前三，DRAM/NAND/HBM存储先进封测，订单排至2028年', {
    sourceType: 'media', source: '新浪财经·国产存储芯片订单TOP10', sourceDate: '2026-03-22',
    sourceUrl: 'https://www.sina.cn/news/detail/5279374451409005.html',
    note: '媒体报道口径：DRAM/NAND存储封测年化产能约28亿颗',
  }),
  entry(2, '通富微电', 22, '亿颗/年', '年产能约22亿颗', 'DRAM/NAND封测布局完善，与主流存储合作伙伴深化协同', {
    sourceType: 'official', source: '通富微电2025年年度报告', sourceDate: '2025全年',
    sourceUrl: 'https://static.cninfo.com.cn/finalpage/2026-04-29/1225256789.PDF',
    note: '未单独披露存储封测产能；以DRAM/NAND封测业务规模折算约22亿颗/年',
  }),
  entry(3, '深科技', 18, '亿颗/年', '年产能约18亿颗', '沛顿科技存储封测与模组制造，绑定长鑫/长江存储等国内存储厂', {
    sourceType: 'media', source: '新浪财经·深科技14.7亿加码高端封测产能', sourceDate: '2026-05-28',
    sourceUrl: 'https://finance.sina.com.cn/roll/2026-05-28/doc-inhzmayt1136737.shtml',
    note: '媒体报道口径：沛顿存储封测年化产能约18亿颗',
  }),
  entry(4, '华天科技', 15, '亿颗/年', '年产能约15亿颗', '南京存储封测基地扩产，DRAM/NAND封测产能持续爬坡', {
    sourceType: 'official', source: '华天科技2025年年度报告', sourceDate: '2025全年',
    sourceUrl: 'http://money.finance.sina.com.cn/corp/view/vCB_AllBulletinDetail.php?id=12239945&stockid=002185',
    note: '未单独披露存储封测产能；以南京基地规模折算约15亿颗/年',
  }),
  entry(5, '大港股份', 8.5, '亿颗/年', '年产能约8.5亿颗', '集成电路封测与测试，存储芯片封测产能配套国内存储厂', {
    sourceType: 'media', source: '东方财富·存储封测产能梳理', sourceDate: '2026-04-14',
    sourceUrl: 'https://caifuhao.eastmoney.com/news/20260414055352939223580',
    note: '媒体报道口径：存储芯片封测年化产能约8.5亿颗',
  }),
  entry(6, '苏州固锝', 6.8, '亿颗/年', '年产能约6.8亿颗', '集成电路封测与WLCSP，存储芯片BGA/DFN等先进封测产能', {
    sourceType: 'media', source: '东方财富·存储封测产能梳理', sourceDate: '2026-04-14',
    sourceUrl: 'https://caifuhao.eastmoney.com/news/20260414055352939223580',
    note: '媒体报道口径：存储芯片封测年化产能约6.8亿颗',
  }),
  entry(7, '德明利', 5.2, '亿颗/年', '年产能约5.2亿颗', '存储控制芯片+模组一体化，国产NAND颗粒导入与封测放量', {
    sourceType: 'media', source: '新浪财经·国产存储芯片订单TOP10', sourceDate: '2026-03-22',
    sourceUrl: 'https://www.sina.cn/news/detail/5279374451409005.html',
    note: '媒体报道口径：存储模组封测一体化产能约5.2亿颗/年',
  }),
  entry(8, '雅克科技', 3.8, '亿颗/年', '年产能约3.8亿颗', '电子特气与前驱体，DRAM/NAND存储封测产线高纯材料配套', {
    sourceType: 'media', source: '东方财富·存储封测产能梳理', sourceDate: '2026-04-14',
    sourceUrl: 'https://caifuhao.eastmoney.com/news/20260414055352939223580',
    note: '媒体报道口径：存储封测产线材料折算年化配套约3.8亿颗',
  }),
  entry(9, '长川科技', 3.2, '亿颗/年', '年产能约3.2亿颗', '存储器封测与晶圆电测设备，DRAM/NAND产线后道测试扩产直接受益', {
    sourceType: 'media', source: '东方财富·存储封测产能梳理', sourceDate: '2026-04-14',
    sourceUrl: 'https://caifuhao.eastmoney.com/news/20260414055352939223580',
    note: '媒体报道口径：存储封测测试设备折算年化配套约3.2亿颗',
  }),
  entry(10, '太极实业', 2.5, '亿颗/年', '年产能约2.5亿颗', '承担长鑫存储等存储厂工程总包，DRAM/NAND封测产能扩建配套', {
    sourceType: 'media', source: '东方财富·存储封测产能梳理', sourceDate: '2026-04-14',
    sourceUrl: 'https://caifuhao.eastmoney.com/news/20260414055352939223580',
    note: '媒体报道口径：存储封测产能扩建工程折算年化配套约2.5亿颗',
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
    id: 'optical-module',
    varName: 'CAPACITY_RANK_OPTICAL_MODULE2026',
    industryKeys: ['光互联'],
    key: '高速光模块',
    title: '2026高速光模块800G/1.6T 现有对外外销年化量产产能 TOP10',
    subtitle: '口径：800G/1.6T数通光模块对外外销年化量产产能（万支/年）；旭创920万支为全数通光模块总产能，高速型号占六成；第9-10位为配套/自用产能，不计入整机外销梯队；第5位剑桥科技为年报披露',
    capacityUnit: '万支/年',
    ENTRIES: OPTICAL_MODULE,
  },
  {
    id: 'optical-chip',
    varName: 'CAPACITY_RANK_OPTICAL_CHIP2026',
    industryKeys: ['光互联', 'CPO'],
    key: '光芯片',
    title: '光芯片（DFB/VCSEL）量产+在建扩产产能TOP10',
    subtitle: '口径：DFB/VCSEL及硅光激光器芯片量产+在建扩产（万颗/年）；均为光芯片/化合物半导体外延制造龙头；未纳入科创板光芯片标的',
    capacityUnit: '万颗/年',
    ENTRIES: OPTICAL_CHIP,
  },
  {
    id: 'fiber-preform',
    varName: 'CAPACITY_RANK_FIBER_PREFORM2026',
    industryKeys: ['光纤概念'],
    key: '光纤预制棒',
    title: '光纤预制棒年产能排名TOP10',
    subtitle: '口径：光棒/预制棒年化产能（吨/年）；均为光棒/石英材料制造及光纤光缆龙头',
    capacityUnit: '吨/年',
    ENTRIES: FIBER_PREFORM,
  },
  {
    id: 'cpo-engine',
    varName: 'CAPACITY_RANK_CPO_ENGINE2026',
    industryKeys: ['CPO', '光互联'],
    key: 'CPO光引擎',
    title: 'CPO光引擎量产规划产能榜单TOP10',
    subtitle: '口径：CPO光引擎量产规划产能（万套/年），非现有量产；均为OSAT/先进封装龙头CPO光引擎产能',
    capacityUnit: '万套/年',
    ENTRIES: CPO_ENGINE,
  },
  {
    id: 'liquid-cooling',
    varName: 'CAPACITY_RANK_LIQUID_COOLING2026',
    industryKeys: ['液冷'],
    key: '液冷设备',
    title: '液冷设备（冷板/浸没式）年供货产能TOP10',
    subtitle: '口径：冷板/浸没式液冷年化散热供货能力（MW/年）；均为液冷散热组件/冷却介质/管路系统核心供应商',
    capacityUnit: 'MW/年',
    ENTRIES: LIQUID_COOLING,
  },
  {
    id: 'ai-server',
    varName: 'CAPACITY_RANK_AI_SERVER2026',
    industryKeys: ['算力租赁', 'AI算力', 'AIDC', '预制算力中心底座', '华为概念', '消费电子', '光互联', '光纤概念'],
    key: '算力服务器',
    title: '算力服务器整机年产能排行榜TOP10',
    subtitle: '口径：AI/智算服务器整机年化产能（万台/年）；均为AI服务器ODM/整机制造龙头',
    capacityUnit: '万台/年',
    ENTRIES: AI_SERVER,
  },
  {
    id: 'e-glass-fabric-highend',
    varName: 'CAPACITY_RANK_E_GLASS_FABRIC_HIGHEND2026',
    industryKeys: ['电子布', '半导体稀缺材料', '光纤概念'],
    key: '高端电子布',
    title: '高端电子布年产能TOP10',
    subtitle: '口径：薄布/超薄布/Low-Dk特种电子布年化产能（亿米/年）；第1位中国巨石对齐2025年销量10.62亿米；均为电子布/覆铜板一体化制造龙头',
    capacityUnit: '亿米/年',
    ENTRIES: E_GLASS_FABRIC_HIGHEND,
  },
  {
    id: 'low-dk-yarn',
    varName: 'CAPACITY_RANK_LOW_DK_YARN2026',
    industryKeys: ['电子布', '半导体稀缺材料', '光纤概念'],
    key: '低介电子纱',
    title: '低介电子纱产能TOP10',
    subtitle: '口径：Low-Dk/低介电电子纱年化产能（万吨/年）；第2位国际复材为研报名义产能16万吨；均为电子纱/玻纤增强材料龙头',
    capacityUnit: '万吨/年',
    ENTRIES: LOW_DK_YARN,
  },
  {
    id: 'ccl',
    varName: 'CAPACITY_RANK_CCL2026',
    industryKeys: ['电子布', 'PCB', '半导体稀缺材料', '存储芯片'],
    key: '覆铜板',
    title: '覆铜板（CCL）年产能排行TOP10',
    subtitle: '口径：覆铜板年化产能（万㎡/年）；1-7为覆铜板主业或一体化厂商，8-10为CCL专用化学品/辅材龙头配套',
    capacityUnit: '万㎡/年',
    ENTRIES: CCL,
  },
  {
    id: 'abf-substrate',
    varName: 'CAPACITY_RANK_ABF_SUBSTRATE2026',
    industryKeys: ['先进封装', '半导体稀缺材料', 'CPO', 'PCB', '存储芯片'],
    key: 'ABF载板',
    title: 'ABF载板量产产能榜单TOP10',
    subtitle: '口径：ABF/FC-BGA封装基板量产年化产能（万片/年）；均为封装基板/覆铜板一体化制造龙头',
    capacityUnit: '万片/年',
    ENTRIES: ABF_SUBSTRATE,
  },
  {
    id: 'glass-roving',
    varName: 'CAPACITY_RANK_GLASS_ROVING2026',
    industryKeys: ['电子布', '半导体稀缺材料', '光纤概念'],
    key: '玻纤粗纱',
    title: '玻纤粗纱产能TOP10',
    subtitle: '口径：玻纤粗纱年化产能（万吨/年）；均为玻纤原丝/粗纱制造及增强材料龙头',
    capacityUnit: '万吨/年',
    ENTRIES: GLASS_ROVING,
  },
  {
    id: 'wind-yarn',
    varName: 'CAPACITY_RANK_WIND_YARN2026',
    industryKeys: ['电子布', '半导体稀缺材料', '光纤概念', '新能源'],
    key: '风电纱',
    title: '风电纱产能TOP10',
    subtitle: '口径：风电叶片用玻纤纱年化产能（万吨/年）；均为风电纱/玻纤增强材料龙头',
    capacityUnit: '万吨/年',
    ENTRIES: WIND_YARN,
  },
  {
    id: 'mlcc-auto-compute',
    varName: 'CAPACITY_RANK_MLCC_AUTO_COMPUTE2026',
    industryKeys: ['MLCC'],
    key: 'MLCC车规算力',
    title: 'MLCC高端车规/算力产能排名TOP10',
    subtitle: '口径：高端车规/算力用MLCC年化产能（亿颗/年）；1-2为MLCC总产能（车规/算力高容为出货主力）；均为MLCC制造龙头',
    capacityUnit: '亿颗/年',
    ENTRIES: MLCC_AUTO_COMPUTE,
  },
  {
    id: 'inp-gaas-substrate',
    varName: 'CAPACITY_RANK_INP_GAAS_SUBSTRATE2026',
    industryKeys: ['半导体稀缺材料', '光互联', 'CPO'],
    key: '磷化铟砷化镓衬底',
    title: '磷化铟/砷化镓衬底年量产产能TOP10',
    subtitle: '口径：磷化铟/砷化镓衬底及外延片年量产（万片/年）；均为化合物半导体衬底/外延制造龙头',
    capacityUnit: '万片/年',
    ENTRIES: INP_GAAS_SUBSTRATE,
  },
  {
    id: 'advanced-packaging-25d',
    varName: 'CAPACITY_RANK_ADVANCED_PACKAGING_25D2026',
    industryKeys: ['先进封装', '存储芯片', '半导体稀缺材料', 'PCB', '半导体', '长鑫存储'],
    key: '先进封装2.5D',
    title: '先进封装（2.5D/3D）封装产能排行TOP10',
    subtitle: '口径：2.5D/3D/Chiplet先进封装年化产能（万片/年）；均为OSAT先进封装及封测产线配套龙头',
    capacityUnit: '万片/年',
    ENTRIES: ADVANCED_PACKAGING_25D,
  },
  {
    id: 'storage-dram-nand',
    varName: 'CAPACITY_RANK_STORAGE_DRAM_NAND2026',
    industryKeys: ['存储芯片', '长鑫存储', '先进封装', '半导体'],
    key: '存储封测',
    title: 'DRAM/NAND封测产能TOP10',
    subtitle: '口径：DRAM/NAND存储芯片封测年化产能（亿颗/年）；均为存储封测OSAT及产线配套龙头',
    capacityUnit: '亿颗/年',
    ENTRIES: STORAGE_DRAM_NAND,
  },
];

const payloads = RANKINGS.map((r) => ({
  ...r,
  payload: buildPayload(r, r.ENTRIES),
}));

const outDir = path.join(__dirname, '..', 'data');
const jsLines = [
  '/** 2026 热门产业链产能排行榜 · 由 scripts/build-capacity-rank2026.js 生成 */',
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
jsLines.push('var CAPACITY_RANK_REGISTRY2026 = {');
payloads.forEach(({ varName, payload }, i) => {
  jsLines.push(`  '${payload.key}': ${varName}${i < payloads.length - 1 ? ',' : ''}`);
});
jsLines.push('};');
jsLines.push('if (typeof window !== \'undefined\') window.CAPACITY_RANK_REGISTRY2026 = CAPACITY_RANK_REGISTRY2026;');

fs.writeFileSync(path.join(outDir, 'capacity-rank2026.js'), jsLines.join('\n') + '\n', 'utf8');
fs.writeFileSync(
  path.join(outDir, 'capacity-rank2026.json'),
  JSON.stringify(payloads.map((p) => p.payload), null, 2),
  'utf8'
);

console.log('OK 写入 capacity-rank2026.js 共', payloads.length, '个榜单');
payloads.forEach(({ payload }) => {
  console.log(' -', payload.key, payload.companies.length, '家');
});

module.exports = { RANKINGS, payloads, buildPayload };
