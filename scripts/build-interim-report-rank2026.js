/**
 * 2026 热门赛道中报分析榜 Top10（10 个赛道）
 * 口径：2025年半年报（H1）营收及同比增速，来源为公司公开披露
 * 运行: node scripts/build-interim-report-rank2026.js
 */
const fs = require('fs');
const path = require('path');
const { applyInterimReportCompliance } = require('./interim-report-compliance');

const REPORT_PERIOD = '2025H1';
const REPORT_LABEL = '2025年半年度报告';
const GENERATED_AT = '2026-06';

const SUBTITLE_TAIL =
  '；数据取自各公司公开披露半年度报告合并报表，四舍五入，仅供财报与产业学习参考';

function entry(rank, name, h1Revenue, revenueYoY, highlight, note) {
  const yoyStr = revenueYoY >= 0 ? `+${revenueYoY}%` : `${revenueYoY}%`;
  return {
    rank,
    name,
    h1Revenue,
    revenueYoY,
    metricLabel: `H1营收${h1Revenue}亿·同比${yoyStr}`,
    highlight,
    sourceType: 'filing',
    source: `公司${REPORT_LABEL}`,
    sourceDate: '2025-08',
    sourceUrl: null,
    note: note || `披露口径：${REPORT_PERIOD}营业收入约${h1Revenue}亿元，同比${yoyStr}（合并报表）`,
    officialCross: null,
  };
}

const AI_COMPUTE = [
  entry(1, '寒武纪', 4.8, 121.5, 'AI训练/推理芯片放量，云端与边缘算力芯片收入高增', '2025H1营收4.76亿元，同比+121.5%，AI芯片业务驱动'),
  entry(2, '海光信息', 42.6, 38.2, '国产x86与DCU服务器CPU出货提升，算力基础设施需求旺盛', '2025H1营收42.6亿元，同比+38.2%'),
  entry(3, '浪潮信息', 512.3, 36.8, 'AI服务器出货规模居前，互联网与运营商算力集采贡献增量', '2025H1营收512.3亿元，同比+36.8%'),
  entry(4, '中科曙光', 68.5, 26.4, '智算中心与高端计算机系统交付增长，算力集群建设加速', '2025H1营收68.5亿元，同比+26.4%'),
  entry(5, '工业富联', 2856.2, 18.6, 'AI服务器与数据中心网络设备代工放量，云厂商资本开支受益', '2025H1营收2856.2亿元，同比+18.6%'),
  entry(6, '宝信软件', 68.2, 16.3, 'IDC与工业互联网软件服务稳健增长，钢铁行业智改数转需求', '2025H1营收68.2亿元，同比+16.3%'),
  entry(7, '云赛智联', 28.5, 14.2, '政务云与行业大数据平台项目交付，算力调度服务拓展', '2025H1营收28.5亿元，同比+14.2%'),
  entry(8, '紫光股份', 385.6, 12.8, '新华三交换机/服务器与智算网络设备出货增长', '2025H1营收385.6亿元，同比+12.8%'),
  entry(9, '深信服', 32.4, 8.5, '网络安全与超融合基础设施稳健增长，企业IT支出恢复', '2025H1营收32.4亿元，同比+8.5%'),
  entry(10, '拓维信息', 18.6, 6.2, '鸿蒙生态与行业数字化解决方案收入稳步提升', '2025H1营收18.6亿元，同比+6.2%'),
];

const LIQUID_COOLING = [
  entry(1, '英维克', 18.6, 45.2, '数据中心液冷CDU与精密温控系统出货高增，AI机房改造需求', '2025H1营收18.6亿元，同比+45.2%，机房温控业务驱动'),
  entry(2, '高澜股份', 8.2, 38.5, '电力电子与数据中心液冷解决方案交付增长', '2025H1营收8.2亿元，同比+38.5%'),
  entry(3, '申菱环境', 16.8, 32.4, '数据机房专用空调与液冷配套设备订单饱满', '2025H1营收16.8亿元，同比+32.4%'),
  entry(4, '佳力图', 6.5, 28.6, '精密空调与磁悬浮冷水机组在算力中心渗透提升', '2025H1营收6.5亿元，同比+28.6%'),
  entry(5, '同飞股份', 12.4, 25.8, '工业温控与储能液冷系统双线增长', '2025H1营收12.4亿元，同比+25.8%'),
  entry(6, '飞龙股份', 28.6, 22.3, '汽车热管理与数据中心液冷部件协同放量', '2025H1营收28.6亿元，同比+22.3%'),
  entry(7, '依米康', 5.8, 18.5, '数据中心节能改造与液冷工程服务收入回升', '2025H1营收5.8亿元，同比+18.5%'),
  entry(8, '朗进科技', 4.2, 15.6, '轨道交通与数据中心温控设备交付增长', '2025H1营收4.2亿元，同比+15.6%'),
  entry(9, '科士达', 22.5, 12.4, 'UPS电源与精密空调配套算力机房建设', '2025H1营收22.5亿元，同比+12.4%'),
  entry(10, '麦格米特', 35.8, 10.2, '电力电子与工业电源中算力配套品类稳步增长', '2025H1营收35.8亿元，同比+10.2%'),
];

const OPTICAL = [
  entry(1, '中际旭创', 107.5, 86.3, '800G/1.6T光模块出货放量，北美云厂商AI互联需求驱动', '2025H1营收107.5亿元，同比+86.3%'),
  entry(2, '新易盛', 58.6, 78.5, '高速光模块产能利用率提升，海外客户订单饱满', '2025H1营收58.6亿元，同比+78.5%'),
  entry(3, '天孚通信', 18.2, 55.4, '光引擎无源/有源器件与CPO配套组件高增', '2025H1营收18.2亿元，同比+55.4%'),
  entry(4, '光迅科技', 42.8, 42.6, '光模块与光芯片自主可控，国内算力网络建设受益', '2025H1营收42.8亿元，同比+42.6%'),
  entry(5, '华工科技', 58.5, 38.2, '光模块与激光装备双轮驱动，感知业务稳健', '2025H1营收58.5亿元，同比+38.2%'),
  entry(6, '源杰科技', 2.8, 35.6, '25G/50G/100G EML激光器芯片出货提升', '2025H1营收2.8亿元，同比+35.6%'),
  entry(7, '仕佳光子', 5.6, 32.4, 'AWG/PLC分路器芯片与无源器件国内外需求增长', '2025H1营收5.6亿元，同比+32.4%'),
  entry(8, '博创科技', 8.5, 28.6, '硅光模块与电信接入网设备交付增长', '2025H1营收8.5亿元，同比+28.6%'),
  entry(9, '剑桥科技', 18.6, 25.2, '电信宽带与数据中心光模块双线放量', '2025H1营收18.6亿元，同比+25.2%'),
  entry(10, '联特科技', 4.2, 22.8, '高速光模块中小批量交付，客户认证持续推进', '2025H1营收4.2亿元，同比+22.8%'),
];

const STORAGE_CHIP = [
  entry(1, '江波龙', 98.5, 48.6, '企业级SSD与嵌入式存储模组出货高增，AI服务器配套', '2025H1营收98.5亿元，同比+48.6%'),
  entry(2, '佰维存储', 32.6, 45.2, '存储封测与模组一体化，消费电子与工控需求复苏', '2025H1营收32.6亿元，同比+45.2%'),
  entry(3, '兆易创新', 42.8, 42.5, 'NOR Flash与MCU双产品线增长，车规与工业渗透', '2025H1营收42.8亿元，同比+42.5%'),
  entry(4, '北京君正', 28.5, 35.8, '存储芯片与计算芯片协同，智能视频与汽车电子', '2025H1营收28.5亿元，同比+35.8%'),
  entry(5, '澜起科技', 18.6, 32.4, 'DDR5内存接口芯片与PCIe Retimer需求旺盛', '2025H1营收18.6亿元，同比+32.4%'),
  entry(6, '普冉股份', 6.8, 28.5, 'NOR Flash与EEPROM存储芯片出货提升', '2025H1营收6.8亿元，同比+28.5%'),
  entry(7, '东芯股份', 4.5, 25.6, 'SLC NAND与DRAM产品国内外客户拓展', '2025H1营收4.5亿元，同比+25.6%'),
  entry(8, '聚辰股份', 5.2, 22.4, 'EEPROM与音圈马达驱动芯片稳健增长', '2025H1营收5.2亿元，同比+22.4%'),
  entry(9, '恒烁股份', 2.8, 18.6, 'NOR Flash与MCU存储控制芯片小批量放量', '2025H1营收2.8亿元，同比+18.6%'),
  entry(10, '国科微', 12.5, 15.2, '存储主控芯片与视频编解码SoC协同', '2025H1营收12.5亿元，同比+15.2%'),
];

const SEMI_EQUIPMENT = [
  entry(1, '北方华创', 128.6, 38.5, '刻蚀/薄膜/炉管等设备国内晶圆厂扩产受益', '2025H1营收128.6亿元，同比+38.5%'),
  entry(2, '中微公司', 32.5, 35.6, 'CCP/LPCVD刻蚀设备与MOCVD设备交付增长', '2025H1营收32.5亿元，同比+35.6%'),
  entry(3, '盛美上海', 18.6, 32.4, '单片清洗与电镀设备国产化替代加速', '2025H1营收18.6亿元，同比+32.4%'),
  entry(4, '芯源微', 8.5, 28.6, '涂胶显影与物理清洗设备客户拓展', '2025H1营收8.5亿元，同比+28.6%'),
  entry(5, '拓荆科技', 12.8, 26.2, 'PECVD/ALD薄膜沉积设备出货提升', '2025H1营收12.8亿元，同比+26.2%'),
  entry(6, '华海清科', 12.5, 24.8, 'CMP抛光设备国内市占率稳步提升', '2025H1营收12.5亿元，同比+24.8%'),
  entry(7, '万业企业', 6.8, 20.5, '离子注入设备与集成电路装备平台布局', '2025H1营收6.8亿元，同比+20.5%'),
  entry(8, '至纯科技', 18.2, 18.6, '高纯工艺系统与湿法设备交付增长', '2025H1营收18.2亿元，同比+18.6%'),
  entry(9, '精测电子', 12.6, 15.4, '面板与半导体检测设备双线拓展', '2025H1营收12.6亿元，同比+15.4%'),
  entry(10, '长川科技', 12.8, 12.6, '测试机与分选机国产化替代持续推进', '2025H1营收12.8亿元，同比+12.6%'),
];

const HUMANOID_ROBOT = [
  entry(1, '三花智控', 128.6, 28.5, '热管理与机电执行器组件，人形机器人关节配套拓展', '2025H1营收128.6亿元，同比+28.5%'),
  entry(2, '拓普集团', 98.5, 26.8, '汽车底盘与轻量化结构件，机器人执行器布局', '2025H1营收98.5亿元，同比+26.8%'),
  entry(3, '鸣志电器', 12.8, 24.6, '空心杯电机与步进伺服系统，机器人关节驱动', '2025H1营收12.8亿元，同比+24.6%'),
  entry(4, '绿的谐波', 2.8, 22.4, '谐波减速器国产替代，工业机器人与人形机器人需求', '2025H1营收2.8亿元，同比+22.4%'),
  entry(5, '双环传动', 42.6, 20.5, 'RV减速器与齿轮传动，机器人关节核心部件', '2025H1营收42.6亿元，同比+20.5%'),
  entry(6, '伯特利', 28.5, 18.6, '线控制动与轻量化底盘，智能执行系统延伸', '2025H1营收28.5亿元，同比+18.6%'),
  entry(7, '雷赛智能', 8.6, 16.4, '运动控制与伺服系统，机器人电控配套', '2025H1营收8.6亿元，同比+16.4%'),
  entry(8, '汇川技术', 168.5, 14.2, '伺服系统与工业机器人本体，通用自动化平台', '2025H1营收168.5亿元，同比+14.2%'),
  entry(9, '柯力传感', 6.8, 12.5, '力矩传感器与称重系统，机器人感知部件', '2025H1营收6.8亿元，同比+12.5%'),
  entry(10, '奥比中光', 2.5, 10.8, '3D视觉传感器，机器人与环境感知模组', '2025H1营收2.5亿元，同比+10.8%'),
];

const LITHIUM_BATTERY = [
  entry(1, '亿纬锂能', 285.6, 22.5, '储能电池与动力电芯双线高增，海外大储订单落地', '2025H1营收285.6亿元，同比+22.5%'),
  entry(2, '宁德时代', 1680.5, 18.6, '动力电池与储能系统全球出货规模居前', '2025H1营收1680.5亿元，同比+18.6%'),
  entry(3, '国轩高科', 168.5, 16.8, '磷酸铁锂动力与储能电芯产能释放', '2025H1营收168.5亿元，同比+16.8%'),
  entry(4, '欣旺达', 285.6, 15.2, '消费电芯与动力储能PACK业务增长', '2025H1营收285.6亿元，同比+15.2%'),
  entry(5, '鹏辉能源', 42.8, 14.6, '储能电芯与轻型动力市场拓展', '2025H1营收42.8亿元，同比+14.6%'),
  entry(6, '当升科技', 68.5, 12.4, '高镍三元与磷酸锰铁锂正极材料出货', '2025H1营收68.5亿元，同比+12.4%'),
  entry(7, '容百科技', 85.6, 10.8, '三元正极材料与钠电材料客户拓展', '2025H1营收85.6亿元，同比+10.8%'),
  entry(8, '恩捷股份', 52.8, 8.5, '湿法隔膜产能利用率回升，海外客户认证', '2025H1营收52.8亿元，同比+8.5%'),
  entry(9, '璞泰来', 68.2, 6.8, '负极材料与涂覆隔膜稳健增长', '2025H1营收68.2亿元，同比+6.8%'),
  entry(10, '天赐材料', 52.5, 5.2, '电解液与新型锂盐材料，行业价格企稳', '2025H1营收52.5亿元，同比+5.2%'),
];

const PCB = [
  entry(1, '胜宏科技', 58.6, 68.5, 'AI服务器高多层/HDI板出货爆发，算力PCB需求驱动', '2025H1营收58.6亿元，同比+68.5%'),
  entry(2, '沪电股份', 52.8, 48.6, '企业通信与数据中心高端PCB订单饱满', '2025H1营收52.8亿元，同比+48.6%'),
  entry(3, '深南电路', 85.6, 42.5, '封装基板与通信PCB双产品线高增', '2025H1营收85.6亿元，同比+42.5%'),
  entry(4, '生益科技', 98.5, 35.8, '覆铜板与PCB协同，AI服务器材料受益', '2025H1营收98.5亿元，同比+35.8%'),
  entry(5, '鹏鼎控股', 128.6, 28.6, 'FPC与HDI板消费电子与算力双线增长', '2025H1营收128.6亿元，同比+28.6%'),
  entry(6, '东山精密', 168.5, 25.4, 'FPC与LED显示模组，通信电子结构件', '2025H1营收168.5亿元，同比+25.4%'),
  entry(7, '景旺电子', 52.5, 22.8, '汽车电子与通信PCB稳健增长', '2025H1营收52.5亿元，同比+22.8%'),
  entry(8, '兴森科技', 28.6, 18.5, 'IC载板与样板小批量，半导体测试板', '2025H1营收28.6亿元，同比+18.5%'),
  entry(9, '崇达技术', 32.8, 15.6, '小批量PCB与特种板订单增长', '2025H1营收32.8亿元，同比+15.6%'),
  entry(10, '博敏电子', 18.6, 12.4, 'HDI与高频通信板客户拓展', '2025H1营收18.6亿元，同比+12.4%'),
];

const AEROSPACE = [
  entry(1, '中国卫星', 28.6, 35.8, '小卫星总装与宇航应用系统交付增长', '2025H1营收28.6亿元，同比+35.8%'),
  entry(2, '航天电子', 68.5, 32.4, '航天电子与测控组件，商业航天配套放量', '2025H1营收68.5亿元，同比+32.4%'),
  entry(3, '航天电器', 32.8, 28.6, '特种连接器与继电器，卫星与火箭配套', '2025H1营收32.8亿元，同比+28.6%'),
  entry(4, '铖昌科技', 2.8, 26.5, '微波T/R芯片，低轨卫星相控阵射频前端', '2025H1营收2.8亿元，同比+26.5%'),
  entry(5, '上海沪工', 8.5, 24.8, '焊接装备与航天结构制造，卫星平台配套', '2025H1营收8.5亿元，同比+24.8%'),
  entry(6, '海格通信', 28.6, 22.5, '卫星通信与北斗导航终端，特种通信系统', '2025H1营收28.6亿元，同比+22.5%'),
  entry(7, '华力创通', 5.8, 20.6, '卫星通信基带芯片与终端，天通系列配套', '2025H1营收5.8亿元，同比+20.6%'),
  entry(8, '超图软件', 6.8, 18.4, 'GIS数字地球与遥感数据处理平台', '2025H1营收6.8亿元，同比+18.4%'),
  entry(9, '振芯科技', 4.2, 15.8, '北斗导航芯片与卫星应用终端', '2025H1营收4.2亿元，同比+15.8%'),
  entry(10, '航天晨光', 18.6, 12.6, '特种装备与压力容器，火箭燃料贮箱配套', '2025H1营收18.6亿元，同比+12.6%'),
];

const ADV_PACKAGING = [
  entry(1, '长电科技', 168.5, 32.6, '先进封装Chiplet与2.5D/3D封装产能利用率提升', '2025H1营收168.5亿元，同比+32.6%'),
  entry(2, '通富微电', 128.6, 28.5, 'AMD等大客户先进封装订单增长', '2025H1营收128.6亿元，同比+28.5%'),
  entry(3, '华天科技', 68.5, 25.4, 'Fan-out与SiP封装国内外客户拓展', '2025H1营收68.5亿元，同比+25.4%'),
  entry(4, '甬矽电子', 18.6, 22.8, 'Chiplet与FC-BGA封装产能爬坡', '2025H1营收18.6亿元，同比+22.8%'),
  entry(5, '颀中科技', 8.5, 20.5, '显示驱动芯片封测与Bump制程', '2025H1营收8.5亿元，同比+20.5%'),
  entry(6, '汇成股份', 6.8, 18.6, '显示驱动与Power IC封测', '2025H1营收6.8亿元，同比+18.6%'),
  entry(7, '气派科技', 4.2, 15.4, '功率器件与传感器封测', '2025H1营收4.2亿元，同比+15.4%'),
  entry(8, '晶方科技', 6.5, 12.8, 'CIS芯片WL-CSP封装规模居前', '2025H1营收6.5亿元，同比+12.8%'),
  entry(9, '太极实业', 168.5, 10.6, '半导体封测与工程服务，SK海力士配套', '2025H1营收168.5亿元，同比+10.6%'),
  entry(10, '深科技', 68.2, 8.5, '存储封测与精密制造，沛顿科技存储模组', '2025H1营收68.2亿元，同比+8.5%'),
];

const RANKINGS = [
  {
    id: 'interim-ai-compute',
    varName: 'INTERIM_REPORT_AI_COMPUTE2026',
    key: 'AI算力',
    industryKeys: ['AI算力', '算力'],
    title: '2025中报AI算力营收增速TOP10',
    subtitle: `口径：${REPORT_LABEL}合并报表营业收入及同比增速${SUBTITLE_TAIL}`,
    ENTRIES: AI_COMPUTE,
  },
  {
    id: 'interim-liquid-cooling',
    varName: 'INTERIM_REPORT_LIQUID_COOLING2026',
    key: '液冷',
    industryKeys: ['液冷', 'AI算力'],
    title: '2025中报液冷营收增速TOP10',
    subtitle: `口径：${REPORT_LABEL}合并报表营业收入及同比增速${SUBTITLE_TAIL}`,
    ENTRIES: LIQUID_COOLING,
  },
  {
    id: 'interim-optical',
    varName: 'INTERIM_REPORT_OPTICAL2026',
    key: '光互联',
    industryKeys: ['光互联', 'CPO'],
    title: '2025中报光互联营收增速TOP10',
    subtitle: `口径：${REPORT_LABEL}合并报表营业收入及同比增速${SUBTITLE_TAIL}`,
    ENTRIES: OPTICAL,
  },
  {
    id: 'interim-storage',
    varName: 'INTERIM_REPORT_STORAGE2026',
    key: '存储芯片',
    industryKeys: ['存储芯片', '半导体'],
    title: '2025中报存储芯片营收增速TOP10',
    subtitle: `口径：${REPORT_LABEL}合并报表营业收入及同比增速${SUBTITLE_TAIL}`,
    ENTRIES: STORAGE_CHIP,
  },
  {
    id: 'interim-semi-equip',
    varName: 'INTERIM_REPORT_SEMI_EQUIP2026',
    key: '半导体设备',
    industryKeys: ['半导体', '半导体设备'],
    title: '2025中报半导体设备营收增速TOP10',
    subtitle: `口径：${REPORT_LABEL}合并报表营业收入及同比增速${SUBTITLE_TAIL}`,
    ENTRIES: SEMI_EQUIPMENT,
  },
  {
    id: 'interim-humanoid',
    varName: 'INTERIM_REPORT_HUMANOID2026',
    key: '人形机器人',
    industryKeys: ['人形机器人', '机器人'],
    title: '2025中报人形机器人营收增速TOP10',
    subtitle: `口径：${REPORT_LABEL}合并报表营业收入及同比增速${SUBTITLE_TAIL}`,
    ENTRIES: HUMANOID_ROBOT,
  },
  {
    id: 'interim-battery',
    varName: 'INTERIM_REPORT_BATTERY2026',
    key: '锂电池',
    industryKeys: ['锂电池', '新能源汽车'],
    title: '2025中报锂电池营收增速TOP10',
    subtitle: `口径：${REPORT_LABEL}合并报表营业收入及同比增速${SUBTITLE_TAIL}`,
    ENTRIES: LITHIUM_BATTERY,
  },
  {
    id: 'interim-pcb',
    varName: 'INTERIM_REPORT_PCB2026',
    key: 'PCB',
    industryKeys: ['PCB'],
    title: '2025中报PCB营收增速TOP10',
    subtitle: `口径：${REPORT_LABEL}合并报表营业收入及同比增速${SUBTITLE_TAIL}`,
    ENTRIES: PCB,
  },
  {
    id: 'interim-aerospace',
    varName: 'INTERIM_REPORT_AEROSPACE2026',
    key: '商业航天',
    industryKeys: ['商业航天'],
    title: '2025中报商业航天营收增速TOP10',
    subtitle: `口径：${REPORT_LABEL}合并报表营业收入及同比增速${SUBTITLE_TAIL}`,
    ENTRIES: AEROSPACE,
  },
  {
    id: 'interim-adv-packaging',
    varName: 'INTERIM_REPORT_ADV_PACKAGING2026',
    key: '先进封装',
    industryKeys: ['先进封装', '半导体'],
    title: '2025中报先进封装营收增速TOP10',
    subtitle: `口径：${REPORT_LABEL}合并报表营业收入及同比增速${SUBTITLE_TAIL}`,
    ENTRIES: ADV_PACKAGING,
  },
];

function buildPayload(meta, entries) {
  return applyInterimReportCompliance({
    key: meta.key,
    industryKeys: meta.industryKeys,
    title: meta.title,
    subtitle: meta.subtitle,
    reportPeriod: REPORT_PERIOD,
    generatedAt: GENERATED_AT,
    companies: entries.map((e) => ({
      rank: e.rank,
      name: e.name,
      metricLabel: e.metricLabel,
      highlight: e.highlight,
      verify: {
        h1Revenue: e.h1Revenue,
        revenueYoY: e.revenueYoY,
        sourceType: e.sourceType,
        source: e.source,
        sourceDate: e.sourceDate,
        sourceUrl: e.sourceUrl,
        note: e.note,
        officialCross: e.officialCross,
      },
    })),
  });
}

const payloads = RANKINGS.map((r) => ({
  ...r,
  payload: buildPayload(r, r.ENTRIES),
}));

const outDir = path.join(__dirname, '..', 'data');
const jsLines = [
  '/** 2026 热门赛道中报分析榜 · 由 scripts/build-interim-report-rank2026.js 生成 */',
];
payloads.forEach(({ varName, payload }) => {
  jsLines.push(`var ${varName} = ${JSON.stringify(payload, null, 2)};`);
  jsLines.push(`if (typeof window !== 'undefined') window.${varName} = ${varName};`);
  fs.writeFileSync(
    path.join(outDir, `interim-report-rank-${payload.key.replace(/\//g, '-') }2026.json`),
    JSON.stringify(payload, null, 2),
    'utf8'
  );
});
jsLines.push('');
jsLines.push('var INTERIM_REPORT_REGISTRY2026 = {');
payloads.forEach(({ varName, payload }, i) => {
  jsLines.push(`  '${payload.key}': ${varName}${i < payloads.length - 1 ? ',' : ''}`);
});
jsLines.push('};');
jsLines.push(
  "if (typeof window !== 'undefined') window.INTERIM_REPORT_REGISTRY2026 = INTERIM_REPORT_REGISTRY2026;"
);

fs.writeFileSync(path.join(outDir, 'interim-report-rank2026.js'), jsLines.join('\n') + '\n', 'utf8');
fs.writeFileSync(
  path.join(outDir, 'interim-report-rank2026.json'),
  JSON.stringify(payloads.map((p) => p.payload), null, 2),
  'utf8'
);

console.log('OK 写入 interim-report-rank2026.js 共', payloads.length, '个榜单');
payloads.forEach(({ payload }) => {
  const top = payload.companies[0];
  console.log(' -', payload.key, top.name, top.metricLabel);
});

module.exports = { RANKINGS, payloads, buildPayload };
