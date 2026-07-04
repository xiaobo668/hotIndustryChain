/**
 * 会员专区 · 产业板块配置
 * 每个板块：产业链上中下游 + 产能/订单细分榜 + 综合 Top5
 */
var MEMBER_ZONE2026 = {
  disclaimer:
    '本专区仅整理公开产业数据，仅供行业学习参考，不构成证券投资建议。不含个股涨跌、估值、买卖建议。',
  top5MethodNote:
    '综合排名取该板块各细分赛道中最高节点规模/订单参考值排序前5；各赛道统计口径不同，不可跨赛道直接加总对比。',
  modules: [
    {
      id: 'semiconductor',
      name: '半导体',
      icon: '💎',
      tagline: '从材料、设计、制造、封测到终端应用，看懂「现代工业粮食」全链条',
      capacityPage: 'capacity/semiconductor.html',
      orderHub: 'order-tracks.html',
      chain: {
        upstream: {
          title: '上游 · 材料与核心耗材',
          categories: ['高纯硅片', '光刻胶', '电子特气', '溅射靶材', 'CMP抛光液', '碳化硅衬底', '磷化铟衬底'],
          summary:
            '硅片是制造载体，光刻胶/特气/靶材/CMP 用于各道工艺，碳化硅与磷化铟支撑功率与光芯片。上游壁垒最高，国产替代价值最大；详见「12大稀缺材料」图谱。',
        },
        design: {
          title: '设计 · EDA 与芯片定义',
          categories: ['CPU/GPU设计', '模拟/功率IC', '存储控制器', 'EDA工具', 'IP核授权'],
          summary:
            'Fabless 与 IDM 在此定义芯片功能与架构，EDA 工具完成版图与仿真。设计环节决定产品规格，是连接材料与制造的「蓝图层」。',
        },
        midstream: {
          title: '中游 · 制造 · 设备 · 封测',
          categories: ['晶圆代工/IDM', '半导体设备', '封装测试', '先进封装2.5D', 'ABF载板/存储封测'],
          summary:
            '晶圆厂流片、设备厂提供光刻/刻蚀/检测装备，OSAT 完成封装测试与 Chiplet/HBM 先进封装；ABF 载板与存储封测是封测链关键配套。',
        },
        downstream: {
          title: '下游 · 终端应用',
          categories: ['AI算力服务器', '智能手机', '汽车电子', '工业控制', '物联网', '人形机器人传感'],
          summary:
            '智算中心、新能源车智能化、工业自动化拉动 GPU/存储/功率/MCU 等各类芯片需求，终端采购向上传导至封测、制造与材料全链。',
        },
      },
      capacityTracks: [
        '晶圆代工', '半导体设备', '封装测试', '半导体材料', 'CPU芯片', 'GPU芯片',
        '模拟芯片', '功率半导体', 'EDA工具', '传感器芯片',
      ],
      relatedCapacityTracks: {
        label: '封装材料 · 化合物 · 封测配套',
        page: 'capacity/optical-electronics.html',
        tracks: ['ABF载板', '先进封装2.5D', '存储封测', '磷化铟砷化镓衬底', '覆铜板', 'MLCC车规算力'],
      },
      orderTracks: [
        { key: '存储芯片', page: 'order-tracks.html' },
        { key: '先进封装', page: 'order-tracks.html' },
        { key: 'PCB', page: 'order-tracks.html' },
        { key: 'MLCC', page: 'order-tracks.html' },
        { key: '电子布', page: 'order-tracks.html' },
      ],
      consumablesTracks: [
        { key: '光刻胶', page: 'consumables-poster.html' },
        { key: '电子特气', page: 'consumables-poster.html' },
        { key: '溅射靶材', page: 'consumables-poster.html' },
        { key: 'CMP抛光液', page: 'consumables-poster.html' },
        { key: '电子浆料', page: 'consumables-poster.html' },
      ],
      interimTracks: [
        { key: '存储芯片', page: 'interim-report.html#ir-存储芯片' },
        { key: '半导体设备', page: 'interim-report.html#ir-半导体设备' },
        { key: '先进封装', page: 'interim-report.html#ir-先进封装' },
      ],
      extraResources: [
        {
          label: '12 大稀缺材料图谱',
          url: 'scarce-materials-poster.html',
          desc: '磷化铟 · 光刻胶 · 碳化硅 · ABF · MLCC · 电子布等 12 类上/中/下游材料全景',
          icon: '🧪',
        },
        {
          label: '半导体产业链科普口播',
          url: 'chain-pop-science.html',
          desc: '四段式脚本：上中下游拆解 + 国产替代 + 合规口播',
          icon: '🎬',
        },
      ],
      top5Note:
        '综合排名覆盖封测、设备、制造、设计、材料等多条主线，取各赛道代表企业的最高节点规模；各赛道口径（订单/产能/H1营收）不同，不可直接加总对比。',
      top5: [
        { rank: 1, name: '长电科技', metric: '订单规模参考超320亿元', segment: '封测 · 先进封装', highlight: '全球 OSAT 规模前三，XDFOI 2.5D/Chiplet/HBM，存储与先进封测订单排至2028年Q2' },
        { rank: 2, name: '北方华创', metric: 'H1营收128.6亿·同比+38.5%', segment: '半导体设备', highlight: '刻蚀/薄膜/炉管等平台型设备，国内晶圆厂扩产核心受益（2025中报口径）' },
        { rank: 3, name: '士兰微', metric: '晶圆产能约185万片/年', segment: '晶圆制造 · IDM', highlight: '特色工艺 IDM，功率+MCU+MEMS 多产线满产，12 英寸产线持续爬坡' },
        { rank: 4, name: '兆易创新', metric: '订单规模参考超150亿元', segment: '芯片设计 · 存储', highlight: '低功耗闪存主要厂商，存储生态协同订单，订单排至2027年Q3' },
        { rank: 5, name: '生益科技', metric: '订单规模参考超250亿元', segment: '封装材料 · 覆铜板', highlight: '存储用覆铜板主要厂商，封装基板上游 CCL 材料，订单排至2027年底' },
      ],
    },
    {
      id: 'ai-compute',
      name: 'AI算力',
      icon: '🚀',
      tagline: '从AI芯片到服务器、液冷与智算中心，看懂算力基础设施全链条',
      capacityPage: 'capacity/compute.html',
      orderHub: 'order-tracks.html',
      chain: {
        upstream: {
          title: '上游 · 算力芯片与核心材料',
          categories: ['GPU/AI芯片', 'HBM存储', '高端PCB', '散热材料', '液冷工质'],
          summary:
            'AI芯片、HBM、高端PCB和液冷材料决定单机算力上限与散热效率，是算力系统的性能地基。',
        },
        midstream: {
          title: '中游 · 服务器制造与液冷',
          categories: ['AI服务器', '液冷设备', 'IDC机柜', '算力租赁运营'],
          summary:
            '芯片与元器件组装为AI服务器，配套液冷系统部署至数据中心。云厂商与智算中心采购订单主要落在这一层。',
        },
        downstream: {
          title: '下游 · 智算中心与应用',
          categories: ['公有云', '智算中心', '大模型训练', 'AI推理', '边缘计算'],
          summary:
            '下游算力资本开支是核心驱动力。智算中心与AI应用算力需求增加，会向上带动服务器、液冷、芯片全链采购。',
        },
      },
      capacityTracks: [
        '算力芯片', 'AI服务器', '量子计算', '算力租赁', '大数据', '液冷技术',
        '云计算', '边缘计算', '算力算法', 'PCB算力板',
      ],
      orderTracks: [
        { key: '算力租赁', page: 'order-tracks.html' },
        { key: '液冷', page: 'order-tracks.html' },
        { key: 'PCB', page: 'order-tracks.html' },
      ],
      consumablesTracks: [
        { key: '导热界面材料', page: 'consumables-poster.html' },
        { key: '浸没冷却液', page: 'consumables-poster.html' },
      ],
      interimTracks: [
        { key: 'AI算力', page: 'interim-report.html#ir-AI算力' },
        { key: '液冷', page: 'interim-report.html#ir-液冷' },
      ],
      top5: [
        { rank: 1, name: '浪潮信息', metric: '算力租赁订单超350亿元', segment: '算力租赁 · AI服务器', highlight: 'AI服务器市占率超50%，在手订单排产延续至2027Q2' },
        { rank: 2, name: '工业富联', metric: '算力租赁订单超280亿元', segment: '算力租赁 · 代工', highlight: '全球算力硬件代工，AI服务器覆盖主流云厂商，GB300液冷机柜独家代工' },
        { rank: 3, name: '协创数据', metric: '算力租赁订单超120亿元', segment: '算力租赁 · 集群', highlight: '英伟达NCP认证，绑定阿里，算力集群+服务器采购订单高增' },
        { rank: 4, name: '利通电子', metric: '算力租赁订单超70亿元', segment: '算力租赁 · 运营', highlight: '英伟达Preferred伙伴，算力规模约3.3万P，腾讯长单锁定' },
        { rank: 5, name: '润泽科技', metric: '算力租赁订单超60亿元', segment: '算力租赁 · AIDC', highlight: '字节跳动核心绑定，液冷智算中心PUE低至1.08' },
      ],
    },
    {
      id: 'optical',
      name: '光互联',
      icon: '🔗',
      tagline: '从光芯片、光纤到800G/1.6T光模块，看懂AI数据中心「高速公路」',
      capacityPage: 'capacity/optical-electronics.html',
      orderHub: 'order-tracks.html',
      chain: {
        upstream: {
          title: '上游 · 光芯片与光纤材料',
          categories: ['激光器芯片', '探测器芯片', '光纤预制棒', '特种光学材料'],
          summary:
            '光芯片负责电光转换，光纤是传输介质。上游光芯片技术门槛高，高端产品国产化持续推进。',
        },
        midstream: {
          title: '中游 · 光模块与CPO',
          categories: ['高速光模块', 'CPO光引擎', '光无源器件', '硅光集成'],
          summary:
            '把光芯片、电芯片集成为400G/800G/1.6T光模块。AI数据中心建设拉动高速光模块需求，中游是订单最集中环节。',
        },
        downstream: {
          title: '下游 · 数据中心与通信网络',
          categories: ['AI数据中心', '云计算', '5G承载网', '宽带接入'],
          summary:
            '智算集群机柜互联、运营商骨干网升级带动光模块与光纤需求，下游网络投资是光互联需求核心来源。',
        },
      },
      capacityTracks: [
        '高速光模块', '光芯片', '光纤预制棒', 'CPO光引擎', '液冷设备', '算力服务器',
        '高端电子布', '低介电子纱', '覆铜板', 'ABF载板', '玻纤粗纱', '风电纱',
        'MLCC车规算力', '磷化铟砷化镓衬底', '先进封装2.5D', '存储封测',
      ],
      orderTracks: [
        { key: '光互联', page: 'order-tracks.html' },
        { key: '光纤概念', page: 'order-tracks.html' },
        { key: '电子布', page: 'order-tracks.html' },
        { key: 'MLCC', page: 'order-tracks.html' },
        { key: 'PCB', page: 'order-tracks.html' },
      ],
      consumablesTracks: [],
      interimTracks: [
        { key: '光互联', page: 'interim-report.html#ir-光互联' },
        { key: 'PCB', page: 'interim-report.html#ir-PCB' },
      ],
      top5: [
        { rank: 1, name: '新易盛', metric: '在手订单超320亿元', segment: '光互联 · 光模块', highlight: '800G/1.6T数通光模块高增，北美云厂商核心供应商' },
        { rank: 2, name: '中际旭创', metric: '在手订单超300亿元', segment: '光互联 · 光模块', highlight: '800G全球市占领先，1.6T量产爬坡，头部云客户核心供应商' },
        { rank: 3, name: '华工科技', metric: '在手订单超110亿元', segment: '光互联 · 硅光/CPO', highlight: '硅光+800G/1.6T光模块，3.2T液冷CPO光引擎，Meta/微软订单占比高' },
        { rank: 4, name: '烽火通信', metric: '在手订单超80亿元', segment: '光互联 · 光传输', highlight: '光传输系统设备，光芯片自主可控，运营商集采+算力传输双线' },
        { rank: 5, name: '天孚通信', metric: '在手订单超75亿元', segment: '光互联 · 光器件', highlight: '光引擎/FAU/CPO无源器件，英伟达/Lumentum核心供应链' },
      ],
    },
    {
      id: 'battery',
      name: '锂电池',
      icon: '🔋',
      tagline: '从四大材料到电芯制造，看懂新能源「能量仓库」全链条',
      capacityPage: 'capacity/battery.html',
      orderHub: 'order-tracks.html',
      chain: {
        upstream: {
          title: '上游 · 资源与四大材料',
          categories: ['锂/钴/镍资源', '正极材料', '负极材料', '电解液', '隔膜'],
          summary:
            '四大材料决定电芯能量密度、安全性与成本。材料价格与供应稳定性直接影响中游电芯制造。',
        },
        midstream: {
          title: '中游 · 电芯与PACK',
          categories: ['动力电芯', '储能电芯', '电池PACK', 'BMS系统'],
          summary:
            '把材料加工为标准化电芯，再组装成电池包。新能源车厂与储能项目商采购订单主要落在这一层。',
        },
        downstream: {
          title: '下游 · 新能源车与储能',
          categories: ['新能源汽车', '储能电站', '电动两轮', '消费电子'],
          summary:
            '新能源车渗透率与储能装机增长直接拉动电池采购，下游销量是锂电产业链的根本驱动力。',
        },
      },
      capacityTracks: [
        '动力电池', '正极材料', '负极材料', '电解液', '隔膜', '铜箔',
        '固态电池', '电池设备', '储能电池', '电池回收',
      ],
      orderTracks: [
        { key: '多氟多', page: 'order-tracks.html' },
        { key: '电力', page: 'order-tracks.html' },
      ],
      consumablesTracks: [
        { key: '电解液', page: 'consumables-poster.html' },
        { key: '锂电隔膜', page: 'consumables-poster.html' },
        { key: '正极材料', page: 'consumables-poster.html' },
      ],
      interimTracks: [
        { key: '锂电池', page: 'interim-report.html#ir-锂电池' },
      ],
      top5: [
        { rank: 1, name: '宁德时代', metric: '动力电池产能约385GWh/年', segment: '动力电池 · 电芯', highlight: '动力电池装机规模居前，麒麟/神行超充产线满产，大圆柱与储能协同扩产' },
        { rank: 2, name: '比亚迪', metric: '动力电池产能约320GWh/年', segment: '动力电池 · 电芯', highlight: '刀片电池自供+外供双线，磷酸铁锂产线持续爬坡' },
        { rank: 3, name: '亿纬锂能', metric: '动力电池产能约185GWh/年', segment: '动力电池 · 电芯', highlight: '大圆柱+软包产线，动力与储能电芯双线满产' },
        { rank: 4, name: '国轩高科', metric: '动力电池产能约142GWh/年', segment: '动力电池 · 电芯', highlight: '磷酸铁锂产能扩张，大众合资产线与海外基地同步放量' },
        { rank: 5, name: '欣旺达', metric: '动力电池产能约98GWh/年', segment: '动力电池 · PACK', highlight: '动力电池PACK+电芯一体化，混动与纯电客户订单饱满' },
      ],
    },
    {
      id: 'aerospace',
      name: '商业航天',
      icon: '🛰️',
      tagline: '从航天材料到卫星火箭制造、星座运营，看懂太空基础设施',
      capacityPage: 'capacity/aerospace.html',
      orderHub: 'order/aerospace.html',
      chain: {
        upstream: {
          title: '上游 · 航天材料与核心元器件',
          categories: ['钛合金', '高温合金', '碳纤维', '宇航芯片', '火工品'],
          summary:
            '火箭发动机涡轮盘需高温合金，卫星结构需钛合金与碳纤维。上游材料与核心元器件是航天装备性能基础。',
        },
        midstream: {
          title: '中游 · 卫星与火箭制造',
          categories: ['卫星总装', '火箭发动机', '箭体结构', '测控系统'],
          summary:
            '把材料加工为可发射的卫星与运载火箭，完成地面测控配套。低轨星座组网直接体现为卫星批产与发射需求。',
        },
        downstream: {
          title: '下游 · 星座运营与应用',
          categories: ['卫星通信', '遥感数据', '导航增强', '太空算力'],
          summary:
            '星座运营商发射卫星的最终目的是提供通信、遥感或数据服务。下游应用需求决定中游制造与发射节奏。',
        },
      },
      capacityTracks: [
        '火箭发动机', '箭体结构', '卫星制造', '火箭制造', '卫星通信', '卫星姿态控制',
        '星座运营', '太空算力', '航天材料', '航天测控',
      ],
      orderTracks: [
        { key: '商业航天综合', page: 'order/aerospace.html#ord-商业航天综合' },
        { key: '火箭发动机', page: 'order/aerospace.html#ord-火箭发动机' },
        { key: '箭体结构', page: 'order/aerospace.html#ord-箭体结构' },
        { key: '卫星制造', page: 'order/aerospace.html#ord-卫星制造' },
        { key: '火箭制造', page: 'order/aerospace.html#ord-火箭制造' },
        { key: '卫星通信', page: 'order/aerospace.html#ord-卫星通信' },
        { key: '卫星姿态控制', page: 'order/aerospace.html#ord-卫星姿态控制' },
        { key: '星座运营', page: 'order/aerospace.html#ord-星座运营' },
        { key: '太空算力', page: 'order/aerospace.html#ord-太空算力' },
        { key: '航天材料', page: 'order/aerospace.html#ord-航天材料' },
        { key: '航天测控', page: 'order/aerospace.html#ord-航天测控' },
      ],
      consumablesTracks: [
        { key: '火工品', page: 'consumables-poster.html' },
      ],
      interimTracks: [
        { key: '商业航天', page: 'interim-report.html#ir-商业航天' },
      ],
      top5: [
        { rank: 1, name: '中国卫星', metric: '订单规模参考约86.9亿元', segment: '卫星制造', highlight: '小卫星总装规模靠前，低轨星座组网制造平台满产' },
        { rank: 2, name: '上海沪工', metric: '订单规模参考约66.7亿元', segment: '卫星制造', highlight: '焊接装备+卫星结构制造，卫星平台结构件与总装配套' },
        { rank: 3, name: '航宇微', metric: '订单规模参考约55.5亿元', segment: '卫星制造', highlight: '宇航电子芯片+卫星制造，微纳卫星与宇航SOC产线' },
        { rank: 4, name: '中国卫通', metric: '订单规模参考约45亿元', segment: '星座运营', highlight: '高轨卫星通信运营，Ka宽带与广播通信星座服务能力' },
        { rank: 5, name: '航天电子', metric: '订单规模参考约44.7亿元', segment: '卫星制造', highlight: '星载计算机+测控设备，卫星电子系统配套出货量居前' },
      ],
    },
  ],
};

var MEMBER_ZONE_REGISTRY = {};
MEMBER_ZONE2026.modules.forEach(function (m) {
  MEMBER_ZONE_REGISTRY[m.id] = m;
});

function memberZoneCapAnchor(key) {
  return 'cap-' + String(key).replace(/[^\w\u4e00-\u9fff]+/g, '-');
}

function memberZoneCapLink(page, key) {
  return page + '#' + memberZoneCapAnchor(key);
}

if (typeof window !== 'undefined') {
  window.MEMBER_ZONE2026 = MEMBER_ZONE2026;
  window.MEMBER_ZONE_REGISTRY = MEMBER_ZONE_REGISTRY;
  window.memberZoneCapLink = memberZoneCapLink;
}
