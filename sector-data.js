// ========== 板块龙头（本地）==========
const SECTOR_DATA = {
  "半导体": {
    name: "半导体",
    color: "#1a73e8",
    gradient: ["#1a73e8", "#0d47a1"],
    description: "基于半导体产业链梳理：前锋（情绪龙头）与中军（趋势龙头）均选自产业链节点、且为非科创板（688/689）标的。",
    vanguard: {
      title: "半导体板块前锋（情绪龙头）",
      companies: [
        { name: "立昂微", highlight: "硅片+外延纯度标的，弹性大、辨识度高，半导体拉升阶段常率先反应（非科创）" },
        { name: "雅克科技", highlight: "电子特气/前驱体情绪标的，市值适中、资金博弈活跃，适合板块情绪先锋" },
      ]
    },
    center: {
      title: "半导体板块中军（趋势龙头）",
      companies: [
        { name: "北方华创", highlight: "半导体设备绝对龙头，订单与市占稳健，机构长期配置的趋势中军" },
        { name: "士兰微", highlight: "IDM龙头功率+MCU放量，产能利用率与国产替代逻辑清晰，走势偏趋势" },
        { name: "长电科技", highlight: "封测龙头先进封装订单兑现，业绩可见度高，趋势资金持续加仓" },
      ]
    }
  },
  "AI算力": {
    name: "AI算力",
    color: "#7c3aed",
    gradient: ["#7c3aed", "#4c1d95"],
    description: "基于AI算力产业链梳理：前锋（情绪龙头）与中军（趋势龙头）均选自产业链节点、且为非科创板（688/689）标的。",
    vanguard: {
      title: "AI算力板块前锋（情绪龙头）",
      companies: [
        { name: "华工科技", highlight: "光芯片+光器件弹性标的，算力光互联情绪敏感，板块活跃时率先反应（非科创）" },
        { name: "景嘉微", highlight: "国产GPU辨识度标的，创业板市值适中，资金博弈属性强的情绪先锋" },
      ]
    },
    center: {
      title: "AI算力板块中军（趋势龙头）",
      companies: [
        { name: "中际旭创", highlight: "800G光模块全球龙头，AI算力订单持续放量，机构趋势配置核心" },
        { name: "浪潮信息", highlight: "AI服务器出货龙头，业绩与订单可跟踪，板块趋势中军" },
        { name: "工业富联", highlight: "AI服务器代工龙头，大客户订单稳健，走势偏机构趋势" },
      ]
    }
  },
  "新能源汽车": {
    name: "新能源汽车",
    color: "#059669",
    gradient: ["#059669", "#064e3b"],
    description: "基于新能源汽车产业链梳理：前锋（情绪龙头）与中军（趋势龙头）均选自产业链节点、且为非科创板（688/689）标的。",
    vanguard: {
      title: "新能源汽车板块前锋（情绪龙头）",
      companies: [
        { name: "赛力斯", highlight: "华为智选车情绪标杆，销量预期博弈强，新能源车板块活跃时弹性领先" },
        { name: "万集科技", highlight: "车路协同/激光雷达纯度较高，市值适中，智能驾驶情绪先锋" },
      ]
    },
    center: {
      title: "新能源汽车板块中军（趋势龙头）",
      companies: [
        { name: "宁德时代", highlight: "动力电池全球龙头，市占与盈利稳健，新能源车趋势绝对中军" },
        { name: "比亚迪", highlight: "整车+电池垂直一体化龙头，销量与业绩双兑现，机构长期重仓" },
        { name: "汇川技术", highlight: "电驱电控龙头，新能源车渗透率提升直接受益，趋势走势稳健" },
      ]
    }
  },
  "光伏": {
    name: "光伏",
    color: "#d97706",
    gradient: ["#d97706", "#92400e"],
    description: "基于光伏产业链梳理：前锋（情绪龙头）与中军（趋势龙头）均选自产业链节点、且为非科创板（688/689）标的。",
    vanguard: {
      title: "光伏板块前锋（情绪龙头）",
      companies: [
        { name: "捷佳伟创", highlight: "TOPCon设备情绪标的，N型扩产预期博弈强，弹性大于组件龙头" },
        { name: "福斯特", highlight: "光伏胶膜专精，胶膜涨价预期博弈强，适合作光伏情绪先锋（非科创）" },
      ]
    },
    center: {
      title: "光伏板块中军（趋势龙头）",
      companies: [
        { name: "隆基绿能", highlight: "组件龙头BC技术产业化，市占领先，光伏趋势中军" },
        { name: "阳光电源", highlight: "逆变器+储能系统龙头，海外订单稳健，机构配置核心" },
        { name: "通威股份", highlight: "硅料+电池片一体化龙头，成本与产能优势明确，趋势标的" },
      ]
    }
  },
  "人工智能": {
    name: "人工智能",
    color: "#dc2626",
    gradient: ["#dc2626", "#7f1d1d"],
    description: "基于人工智能产业链梳理：前锋（情绪龙头）与中军（趋势龙头）均选自产业链节点、且为非科创板（688/689）标的。",
    vanguard: {
      title: "人工智能板块前锋（情绪龙头）",
      companies: [
        { name: "昆仑万维", highlight: "AIGC应用情绪标杆，题材弹性大，AI应用板块拉升常率先反应" },
        { name: "万兴科技", highlight: "AIGC工具纯度较高，市值适中，资金博弈活跃的情绪先锋" },
      ]
    },
    center: {
      title: "人工智能板块中军（趋势龙头）",
      companies: [
        { name: "科大讯飞", highlight: "AI语音与大模型应用龙头，订单与政企落地可跟踪，趋势中军" },
        { name: "海康威视", highlight: "AI视觉龙头营收规模大，业绩稳健，机构长期配置" },
        { name: "中科创达", highlight: "操作系统+AI边缘软件龙头，订阅与项目商业化清晰，走势偏趋势（非科创）" },
      ]
    }
  },
  "锂电池": {
    name: "锂电池",
    color: "#0891b2",
    gradient: ["#0891b2", "#164e63"],
    description: "基于锂电池产业链梳理：前锋（情绪龙头）与中军（趋势龙头）均选自产业链节点、且为非科创板（688/689）标的。",
    vanguard: {
      title: "锂电池板块前锋（情绪龙头）",
      companies: [
        { name: "恩捷股份", highlight: "隔膜龙头但波动大，锂电材料环节情绪敏感度高的先锋标的" },
        { name: "天赐材料", highlight: "电解液龙头，锂价预期博弈阶段弹性明显，适合情绪端" },
      ]
    },
    center: {
      title: "锂电池板块中军（趋势龙头）",
      companies: [
        { name: "宁德时代", highlight: "动力电池绝对龙头，市占与盈利稳健，锂电趋势中军" },
        { name: "天齐锂业", highlight: "锂资源龙头，产能释放与成本优势，机构配置锂矿趋势核心" },
        { name: "比亚迪", highlight: "整车+电池一体化，锂电下游需求直接兑现，趋势资金重仓" },
      ]
    }
  },
  "消费电子": {
    name: "消费电子",
    color: "#7c3aed",
    gradient: ["#be185d", "#7c3aed"],
    description: "基于消费电子产业链梳理：前锋（情绪龙头）与中军（趋势龙头）均选自产业链节点、且为非科创板（688/689）标的。",
    vanguard: {
      title: "消费电子板块前锋（情绪龙头）",
      companies: [
        { name: "卓胜微", highlight: "射频前端纯度标的，手机复苏预期博弈强，消费电子情绪先锋" },
        { name: "漫步者", highlight: "音频品牌弹性标的，TWS与智能音箱预期博弈，板块活跃时辨识度高（非科创）" },
      ]
    },
    center: {
      title: "消费电子板块中军（趋势龙头）",
      companies: [
        { name: "立讯精密", highlight: "消费电子代工龙头，苹果链订单稳健，机构趋势中军" },
        { name: "京东方A", highlight: "面板龙头规模巨大，显示业务复苏逻辑清晰，走势偏趋势" },
        { name: "歌尔股份", highlight: "声学+XR龙头，大客户订单可跟踪，消费电子核心趋势标的" },
      ]
    }
  },
  "机器人": {
    name: "机器人",
    color: "#0f766e",
    gradient: ["#0f766e", "#134e4a"],
    description: "基于机器人产业链梳理：前锋（情绪龙头）与中军（趋势龙头）均选自产业链节点、且为非科创板（688/689）标的。",
    vanguard: {
      title: "机器人板块前锋（情绪龙头）",
      companies: [
        { name: "双环传动", highlight: "减速器+齿轮箱弹性标的，人形机器人预期博弈强，情绪弹性领先（非科创）" },
        { name: "拓斯达", highlight: "工业机器人系统集成弹性标的，题材活跃时先锋特征明显" },
      ]
    },
    center: {
      title: "机器人板块中军（趋势龙头）",
      companies: [
        { name: "汇川技术", highlight: "伺服+运动控制龙头，机器人零部件订单放量，趋势中军" },
        { name: "埃斯顿", highlight: "工业机器人国产龙头，出货量与整合逻辑清晰，机构趋势配置" },
        { name: "机器人", highlight: "机器人整机国家队，产业链布局完整，趋势走势相对稳健" },
      ]
    }
  },
  "液冷": {
    name: "液冷",
    color: "#0ea5e9",
    gradient: ["#0ea5e9", "#0c4a6e"],
    description: "基于液冷产业链梳理：前锋（情绪龙头）与中军（趋势龙头）均选自产业链节点、且为非科创板（688/689）标的。",
    vanguard: {
      title: "液冷板块前锋（情绪龙头）",
      companies: [
        { name: "曙光数创", highlight: "浸没液冷方案辨识度最高，智算液冷预期博弈强，情绪先锋" },
        { name: "高澜股份", highlight: "液冷设备弹性标的，AI散热主题活跃时率先反应" },
      ]
    },
    center: {
      title: "液冷板块中军（趋势龙头）",
      companies: [
        { name: "英维克", highlight: "温控+液冷龙头，AI服务器订单放量，液冷趋势中军" },
        { name: "浪潮信息", highlight: "液冷服务器整机龙头，算力基建订单可跟踪，机构重仓趋势标的" },
        { name: "中科曙光", highlight: "国产液冷整机+智算，政企订单稳健，液冷板块趋势核心" },
      ]
    }
  },
  "通讯设备": {
    name: "通讯设备",
    color: "#2563eb",
    gradient: ["#2563eb", "#1e3a8a"],
    description: "基于通讯设备产业链梳理：前锋（情绪龙头）与中军（趋势龙头）均选自产业链节点、且为非科创板（688/689）标的。",
    vanguard: {
      title: "通讯设备板块前锋（情绪龙头）",
      companies: [
        { name: "武汉凡谷", highlight: "射频器件弹性标的，5G/滤波器题材博弈强，情绪先锋特征明显" },
        { name: "华工科技", highlight: "光芯片+光器件弹性，通讯设备板块活跃时辨识度高（非科创）" },
      ]
    },
    center: {
      title: "通讯设备板块中军（趋势龙头）",
      companies: [
        { name: "中际旭创", highlight: "光模块龙头，数通建设订单稳健，通讯链趋势中军" },
        { name: "中兴通讯", highlight: "通信设备龙头，5G+算力网络订单可跟踪，机构长期配置" },
        { name: "亨通光电", highlight: "光纤光缆龙头，海缆+通信布局，趋势走势稳健" },
      ]
    }
  },
  "IT服务": {
    name: "IT服务",
    color: "#7c3aed",
    gradient: ["#7c3aed", "#4c1d95"],
    description: "基于IT服务产业链梳理：前锋（情绪龙头）与中军（趋势龙头）均选自产业链节点、且为非科创板（688/689）标的。",
    vanguard: {
      title: "IT服务板块前锋（情绪龙头）",
      companies: [
        { name: "东方通", highlight: "中间件+信创纯度标的，信创情绪博弈强，弹性大于综合软件龙头（非科创）" },
        { name: "诚迈科技", highlight: "操作系统适配弹性标的，市值适中，信创活跃时情绪先锋" },
      ]
    },
    center: {
      title: "IT服务板块中军（趋势龙头）",
      companies: [
        { name: "用友网络", highlight: "企业软件龙头，数字化订单稳健，IT服务趋势中军" },
        { name: "恒生电子", highlight: "金融IT龙头，资本市场景气直接受益，机构配置核心" },
        { name: "软通动力", highlight: "华为+行业IT服务龙头，大单交付可跟踪，趋势标的" },
      ]
    }
  },
  "元件": {
    name: "元件",
    color: "#ea580c",
    gradient: ["#ea580c", "#7c2d12"],
    description: "基于元件产业链梳理：前锋（情绪龙头）与中军（趋势龙头）均选自产业链节点、且为非科创板（688/689）标的。",
    vanguard: {
      title: "元件板块前锋（情绪龙头）",
      companies: [
        { name: "火炬电子", highlight: "特种被动元件弹性标的，军工+电子双题材，情绪敏感度高" },
        { name: "洁美科技", highlight: "封装离型膜纯度较高，MLCC扩产预期博弈，适合情绪端" },
      ]
    },
    center: {
      title: "元件板块中军（趋势龙头）",
      companies: [
        { name: "三环集团", highlight: "MLCC+陶瓷封装龙头，车规与高端消费电子订单放量，趋势中军" },
        { name: "深南电路", highlight: "高端PCB+载板龙头，AI服务器拉动明确，机构趋势配置" },
        { name: "顺络电子", highlight: "电感龙头，AI/汽车电子需求稳健，元件板块趋势核心" },
      ]
    }
  },
  "MLCC": {
    name: "MLCC",
    color: "#c2410c",
    gradient: ["#ea580c", "#9a3412"],
    description: "基于MLCC产业链梳理：前锋（情绪龙头）与中军（趋势龙头）均选自产业链节点、且为非科创板（688/689）标的。",
    vanguard: {
      title: "MLCC板块前锋（情绪龙头）",
      companies: [
        { name: "洁美科技", highlight: "MLCC离型膜/载带纯度较高，扩产预期博弈强，被动元件情绪先锋（非科创）" },
        { name: "博迁新材", highlight: "MLCC镍粉弹性标的，粉体涨价与扩产预期敏感，适合情绪端" },
      ]
    },
    center: {
      title: "MLCC板块中军（趋势龙头）",
      companies: [
        { name: "风华高科", highlight: "国内MLCC制造龙头，车规+AI高压MLCC订单放量，趋势中军" },
        { name: "三环集团", highlight: "MLCC+陶瓷材料垂直一体化，高端消费电子与车规份额提升，机构趋势配置" },
        { name: "国瓷材料", highlight: "MLCC介质粉龙头，粉体国产替代逻辑清晰，走势偏趋势（非科创）" },
      ]
    }
  },
  "AI应用": {
    name: "AI应用",
    color: "#f59e0b",
    gradient: ["#f59e0b", "#78350f"],
    description: "基于AI应用产业链梳理：前锋（情绪龙头）与中军（趋势龙头）均选自产业链节点、且为非科创板（688/689）标的。",
    vanguard: {
      title: "AI应用板块前锋（情绪龙头）",
      companies: [
        { name: "昆仑万维", highlight: "AIGC应用情绪标杆，弹性大，AI应用板块拉升常率先涨停" },
        { name: "引力传媒", highlight: "AI营销纯度标的，市值小、博弈活跃，典型情绪先锋" },
      ]
    },
    center: {
      title: "AI应用板块中军（趋势龙头）",
      companies: [
        { name: "科大讯飞", highlight: "大模型应用龙头，政企订单可跟踪，AI应用趋势中军" },
        { name: "海康威视", highlight: "AI视觉落地龙头，业绩规模大且稳健，机构长期重仓" },
        { name: "同花顺", highlight: "金融AI应用龙头，活跃用户与付费转化清晰，趋势走势稳健" },
      ]
    }
  },
  "算力租赁": {
    name: "算力租赁",
    color: "#0891b2",
    gradient: ["#06b6d4", "#164e63"],
    description: "基于算力租赁产业链梳理：前锋（情绪龙头）与中军（趋势龙头）均选自产业链节点、且为非科创板（688/689）标的。",
    vanguard: {
      title: "算力租赁板块前锋（情绪龙头）",
      companies: [
        { name: "利通电子", highlight: "算力租赁纯度较高，转型预期博弈强，弹性大于IDC运营龙头" },
        { name: "亚康股份", highlight: "算力运营+交付弹性标的，题材活跃时辨识度高，情绪先锋" },
      ]
    },
    center: {
      title: "算力租赁板块中军（趋势龙头）",
      companies: [
        { name: "润泽科技", highlight: "智算园区运营龙头，上架率与租赁景气直接兑现，趋势中军" },
        { name: "光环新网", highlight: "北京IDC龙头，算力租赁业务扩张，机构配置稳健" },
        { name: "工业富联", highlight: "算力整机+租赁产业链上游，大客户订单稳健，趋势核心" },
      ]
    }
  },
  "低空经济": {
    name: "低空经济",
    color: "#0ea5e9",
    gradient: ["#0ea5e9", "#0369a1"],
    description: "基于低空经济产业链梳理：前锋（情绪龙头）与中军（趋势龙头）均选自产业链节点、且为非科创板（688/689）标的。",
    vanguard: {
      title: "低空经济板块前锋（情绪龙头）",
      companies: [
        { name: "万丰奥威", highlight: "低空经济情绪标杆，eVTOL预期博弈最强，弹性领先" },
        { name: "宗申动力", highlight: "通航动力纯度较高，低空政策催化时率先反应" },
      ]
    },
    center: {
      title: "低空经济板块中军（趋势龙头）",
      companies: [
        { name: "卧龙电驱", highlight: "航空电机+新能源车双主线，低空零部件订单可跟踪，趋势中军" },
        { name: "中信海直", highlight: "通航运营龙头，低空开放直接受益，走势偏趋势" },
        { name: "四川九洲", highlight: "空管+军工电子龙头，低空基建订单稳健，机构趋势配置（非科创）" },
      ]
    }
  },
  "固态电池": {
    name: "固态电池",
    color: "#f59e0b",
    gradient: ["#f59e0b", "#b45309"],
    description: "基于固态电池产业链梳理：前锋（情绪龙头）与中军（趋势龙头）均选自产业链节点、且为非科创板（688/689）标的。",
    vanguard: {
      title: "固态电池板块前锋（情绪龙头）",
      companies: [
        { name: "三祥新材", highlight: "固态电解质材料纯度标的，技术路线博弈强，情绪弹性大" },
        { name: "上海洗霸", highlight: "固态电池材料新锐，市值适中，固态板块活跃时先锋" },
      ]
    },
    center: {
      title: "固态电池板块中军（趋势龙头）",
      companies: [
        { name: "宁德时代", highlight: "电池龙头固态布局领先，研发与产能投入可跟踪，趋势中军" },
        { name: "赣锋锂业", highlight: "锂资源+固态电池一体化，产业化进度清晰，机构趋势标的" },
        { name: "亿纬锂能", highlight: "储能+动力双线，固态方案推进，订单与业绩稳健" },
      ]
    }
  },
  "华为概念": {
    name: "华为概念",
    color: "#dc2626",
    gradient: ["#dc2626", "#991b1b"],
    description: "基于华为概念产业链梳理：前锋（情绪龙头）与中军（趋势龙头）均选自产业链节点、且为非科创板（688/689）标的。",
    vanguard: {
      title: "华为概念板块前锋（情绪龙头）",
      companies: [
        { name: "润和软件", highlight: "鸿蒙生态纯度标的，华为主题活跃时弹性大，情绪先锋" },
        { name: "光弘科技", highlight: "华为EMS+汽车电子组装，市值适中，辨识度高的博弈标的（非科创）" },
      ]
    },
    center: {
      title: "华为概念板块中军（趋势龙头）",
      companies: [
        { name: "赛力斯", highlight: "华为智选车销量龙头，订单与交付可跟踪，华为汽车趋势中军" },
        { name: "软通动力", highlight: "华为IT服务核心伙伴，大单稳健，机构长期配置" },
        { name: "神州数码", highlight: "华为分销+信创，渠道与政企订单放量，趋势标的" },
      ]
    }
  },
  "AIDC": {
    name: "AIDC",
    color: "#7c3aed",
    gradient: ["#7c3aed", "#4c1d95"],
    description: "基于AIDC产业链梳理：前锋（情绪龙头）与中军（趋势龙头）均选自产业链节点、且为非科创板（688/689）标的。",
    vanguard: {
      title: "AIDC板块前锋（情绪龙头）",
      companies: [
        { name: "首都在线", highlight: "IDC+算力弹性标的，智算中心预期博弈强，情绪先锋" },
        { name: "网宿科技", highlight: "CDN+边缘算力弹性标的，AIDC主题活跃时率先反应，情绪辨识度高" },
      ]
    },
    center: {
      title: "AIDC板块中军（趋势龙头）",
      companies: [
        { name: "润泽科技", highlight: "超大规模智算园区龙头，上架率直接兑现，AIDC趋势中军" },
        { name: "数据港", highlight: "阿里云核心IDC伙伴，订单稳健，机构配置核心" },
        { name: "浪潮信息", highlight: "智算整机龙头，AIDC建设直接受益，趋势走势稳健" },
      ]
    }
  },
  "核聚变": {
    name: "核聚变",
    color: "#f97316",
    gradient: ["#f97316", "#c2410c"],
    description: "基于核聚变产业链梳理：前锋（情绪龙头）与中军（趋势龙头）均选自产业链节点、且为非科创板（688/689）标的。",
    vanguard: {
      title: "核聚变板块前锋（情绪龙头）",
      companies: [
        { name: "永鼎股份", highlight: "超导带材+聚变预期博弈，弹性大，核聚变情绪先锋" },
        { name: "安泰科技", highlight: "特种材料+聚变零部件，题材活跃时辨识度高（非科创）" },
      ]
    },
    center: {
      title: "核聚变板块中军（趋势龙头）",
      companies: [
        { name: "抚顺特钢", highlight: "特种冶金材料龙头，聚变+军工配套，机构趋势配置" },
        { name: "上海电气", highlight: "核电+聚变装备平台，订单规模大，核聚变趋势中军" },
        { name: "国电南瑞", highlight: "电网自动化龙头，聚变配套电力系统稳健标的" },
      ]
    }
  },
  "数据要素": {
    name: "数据要素",
    color: "#0891b2",
    gradient: ["#0891b2", "#155e75"],
    description: "基于数据要素产业链梳理：前锋（情绪龙头）与中军（趋势龙头）均选自产业链节点、且为非科创板（688/689）标的。",
    vanguard: {
      title: "数据要素板块前锋（情绪龙头）",
      companies: [
        { name: "每日互动", highlight: "数据要素纯度标的，市值小、博弈活跃，情绪弹性领先" },
        { name: "零点有数", highlight: "数据服务新锐，数据确权主题活跃时先锋特征明显" },
      ]
    },
    center: {
      title: "数据要素板块中军（趋势龙头）",
      companies: [
        { name: "人民网", highlight: "数据确权+传媒龙头，数据要素政策直接受益，趋势中军" },
        { name: "太极股份", highlight: "政务数据平台龙头，订单可跟踪，机构配置核心" },
        { name: "科大讯飞", highlight: "AI+数据应用龙头，政企数据项目稳健，趋势标的" },
      ]
    }
  },
  "白酒": {
    name: "白酒",
    color: "#dc2626",
    gradient: ["#dc2626", "#991b1b"],
    description: "基于白酒产业链梳理：前锋（情绪龙头）与中军（趋势龙头）均选自产业链节点、且为非科创板（688/689）标的。",
    vanguard: {
      title: "白酒板块前锋（情绪龙头）",
      companies: [
        { name: "酒鬼酒", highlight: "次高端弹性标的，白酒板块活跃时涨幅领先，情绪先锋" },
        { name: "今世缘", highlight: "区域龙头增长快，市值适中，资金博弈属性较强" },
      ]
    },
    center: {
      title: "白酒板块中军（趋势龙头）",
      companies: [
        { name: "贵州茅台", highlight: "白酒绝对龙头，业绩与批价稳健，机构长期重仓趋势中军" },
        { name: "五粮液", highlight: "浓香龙头，动销与渠道稳健，白酒趋势核心" },
        { name: "泸州老窖", highlight: "高端浓香龙头，国窖放量清晰，走势偏机构趋势" },
      ]
    }
  },
  "医疗器械": {
    name: "医疗器械",
    color: "#0891b2",
    gradient: ["#0891b2", "#155e75"],
    description: "基于医疗器械产业链梳理：前锋（情绪龙头）与中军（趋势龙头）均选自产业链节点、且为非科创板（688/689）标的。",
    vanguard: {
      title: "医疗器械板块前锋（情绪龙头）",
      companies: [
        { name: "理邦仪器", highlight: "监护+POCT弹性标的，创新器械情绪博弈强，弹性大（非科创）" },
        { name: "九安医疗", highlight: "家用医疗器械，新冠后出海预期博弈，情绪先锋特征明显" },
      ]
    },
    center: {
      title: "医疗器械板块中军（趋势龙头）",
      companies: [
        { name: "迈瑞医疗", highlight: "医疗器械绝对龙头，海内外业绩稳健，趋势中军" },
        { name: "万东医疗", highlight: "医学影像国产替代，订单放量可跟踪，机构趋势配置" },
        { name: "鱼跃医疗", highlight: "家用器械龙头，渠道与品牌稳健，走势偏趋势" },
      ]
    }
  },
  "农业": {
    name: "农业",
    color: "#16a34a",
    gradient: ["#16a34a", "#15803d"],
    description: "基于农业产业链梳理：前锋（情绪龙头）与中军（趋势龙头）均选自产业链节点、且为非科创板（688/689）标的。",
    vanguard: {
      title: "农业板块前锋（情绪龙头）",
      companies: [
        { name: "吉峰科技", highlight: "农机流通弹性标的，农资主题活跃时率先反应，情绪先锋" },
        { name: "大禹节水", highlight: "节水灌溉纯度较高，农业政策催化时辨识度高" },
      ]
    },
    center: {
      title: "农业板块中军（趋势龙头）",
      companies: [
        { name: "牧原股份", highlight: "生猪养殖龙头，成本与出栏可跟踪，农业趋势中军" },
        { name: "隆平高科", highlight: "种业龙头，转基因商业化直接受益，机构配置核心" },
        { name: "温氏股份", highlight: "养殖龙头规模巨大，业绩周期清晰，趋势标的" },
      ]
    }
  },
  "钢铁": {
    name: "钢铁",
    color: "#52525b",
    gradient: ["#52525b", "#27272a"],
    description: "基于钢铁产业链梳理：前锋（情绪龙头）与中军（趋势龙头）均选自产业链节点、且为非科创板（688/689）标的。",
    vanguard: {
      title: "钢铁板块前锋（情绪龙头）",
      companies: [
        { name: "大中矿业", highlight: "铁矿资源弹性标的，钢铁板块活跃时涨幅领先，情绪先锋" },
        { name: "金岭矿业", highlight: "铁矿纯度较高，市值适中，资源端博弈活跃" },
      ]
    },
    center: {
      title: "钢铁板块中军（趋势龙头）",
      companies: [
        { name: "宝钢股份", highlight: "钢铁绝对龙头，产品结构升级，趋势中军" },
        { name: "鞍钢股份", highlight: "央企钢铁龙头，整合预期与订单稳健，机构配置" },
        { name: "河钢股份", highlight: "华北钢铁龙头，汽车钢放量，走势偏趋势" },
      ]
    }
  },
  "新能源": {
    name: "新能源",
    color: "#ea580c",
    gradient: ["#ea580c", "#9a3412"],
    description: "基于新能源产业链梳理：前锋（情绪龙头）与中军（趋势龙头）均选自产业链节点、且为非科创板（688/689）标的。",
    vanguard: {
      title: "新能源板块前锋（情绪龙头）",
      companies: [
        { name: "明阳智能", highlight: "风电整机弹性标的，新能源活跃时率先反应，情绪先锋" },
        { name: "吉电股份", highlight: "电力运营扩张快，新能源装机预期博弈强" },
      ]
    },
    center: {
      title: "新能源板块中军（趋势龙头）",
      companies: [
        { name: "宁德时代", highlight: "储能与动力龙头，新能源趋势绝对中军" },
        { name: "隆基绿能", highlight: "光伏龙头，清洁能源装机直接受益，机构重仓" },
        { name: "三峡能源", highlight: "绿电运营龙头，装机规模稳健，走势偏趋势" },
      ]
    }
  },
  "电力": {
    name: "电力",
    color: "#eab308",
    gradient: ["#ca8a04", "#854d0e"],
    description: "基于电力产业链梳理：前锋（情绪龙头）与中军（趋势龙头）均选自产业链节点、且为非科创板（688/689）标的。",
    vanguard: {
      title: "电力板块前锋（情绪龙头）",
      companies: [
        { name: "明星电力", highlight: "地方电网+水电，市值适中，电力改革与区域供电题材弹性大，情绪先锋" },
        { name: "西昌电力", highlight: "凉山地方电网，小市值，电力板块活跃时辨识度高（非科创）" },
      ]
    },
    center: {
      title: "电力板块中军（趋势龙头）",
      companies: [
        { name: "长江电力", highlight: "水电运营绝对龙头，高股息稳定现金流，电力板块趋势中军" },
        { name: "国电南瑞", highlight: "电网自动化+特高压数字化龙头，订单稳健，机构长期重仓" },
        { name: "中国核电", highlight: "核电运营龙头，基荷电源装机扩张，趋势配置核心" },
      ]
    }
  },
  "芯片": {
    name: "芯片",
    color: "#a855f7",
    gradient: ["#a855f7", "#6b21a8"],
    description: "基于芯片产业链梳理：前锋（情绪龙头）与中军（趋势龙头）均选自产业链节点、且为非科创板（688/689）标的。",
    vanguard: {
      title: "芯片板块前锋（情绪龙头）",
      companies: [
        { name: "南大光电", highlight: "光刻胶纯度标的，国产替代情绪博弈强，芯片材料先锋" },
        { name: "长川科技", highlight: "封测设备弹性标的，芯片产业链活跃时辨识度高" },
      ]
    },
    center: {
      title: "芯片板块中军（趋势龙头）",
      companies: [
        { name: "北方华创", highlight: "半导体设备龙头，订单稳健，芯片产业链趋势中军" },
        { name: "紫光国微", highlight: "安全芯片+特种集成电路，国产替代逻辑清晰，机构趋势配置" },
        { name: "通富微电", highlight: "先进封测龙头，大客户订单可跟踪，趋势标的" },
      ]
    }
  },
  "电动车": {
    name: "电动车",
    color: "#06b6d4",
    gradient: ["#06b6d4", "#0e7490"],
    description: "基于电动车产业链梳理：前锋（情绪龙头）与中军（趋势龙头）均选自产业链节点、且为非科创板（688/689）标的。",
    vanguard: {
      title: "电动车板块前锋（情绪龙头）",
      companies: [
        { name: "新日股份", highlight: "电动自行车弹性标的，出海与销量预期博弈强，情绪领先（非科创）" },
        { name: "爱玛科技", highlight: "电动自行车龙头，销量弹性大，电动车板块情绪先锋" },
      ]
    },
    center: {
      title: "电动车板块中军（趋势龙头）",
      companies: [
        { name: "宁德时代", highlight: "动力电池龙头，两轮与四轮共用供应链，趋势中军" },
        { name: "比亚迪", highlight: "新能源车龙头，品牌与销量稳健，机构长期重仓" },
        { name: "特锐德", highlight: "充电运营龙头，网络规模与利用率提升，趋势标的" },
      ]
    }
  },
  "油气开采": {
    name: "油气开采",
    color: "#1f2937",
    gradient: ["#1f2937", "#111827"],
    description: "基于油气开采产业链梳理：前锋（情绪龙头）与中军（趋势龙头）均选自产业链节点、且为非科创板（688/689）标的。",
    vanguard: {
      title: "油气开采板块前锋（情绪龙头）",
      companies: [
        { name: "杰瑞股份", highlight: "油服设备弹性标的，油价预期博弈强，油气情绪先锋" },
        { name: "石化机械", highlight: "油气装备纯度较高，板块活跃时率先反应" },
      ]
    },
    center: {
      title: "油气开采板块中军（趋势龙头）",
      companies: [
        { name: "中国海油", highlight: "海上油气龙头，产量与油价双驱动，油气趋势中军" },
        { name: "中国石油", highlight: "油气一体化央企，资源储量巨大，机构配置核心" },
        { name: "海油工程", highlight: "海洋工程龙头，资本开支周期直接受益，趋势稳健" },
      ]
    }
  },
  "军工": {
    name: "军工",
    color: "#374151",
    gradient: ["#374151", "#111827"],
    description: "基于军工产业链梳理：前锋（情绪龙头）与中军（趋势龙头）均选自产业链节点、且为非科创板（688/689）标的。",
    vanguard: {
      title: "军工板块前锋（情绪龙头）",
      companies: [
        { name: "航天彩虹", highlight: "无人机整机弹性标的，军贸预期博弈强，军工情绪先锋（非科创）" },
        { name: "四创电子", highlight: "雷达+空管电子，市值适中，板块活跃时弹性大" },
      ]
    },
    center: {
      title: "军工板块中军（趋势龙头）",
      companies: [
        { name: "中航沈飞", highlight: "战斗机主机龙头，订单稳健，军工趋势中军" },
        { name: "航发动力", highlight: "航空发动机龙头，国产替代核心，机构长期配置" },
        { name: "中国船舶", highlight: "造船龙头，海军装备放量，趋势标的" },
      ]
    }
  },
  "商业航天": {
    name: "商业航天",
    color: "#1d4ed8",
    gradient: ["#1d4ed8", "#1e3a8a"],
    description: "基于商业航天产业链梳理：前锋（情绪龙头）与中军（趋势龙头）均选自产业链节点、且为非科创板（688/689）标的。",
    vanguard: {
      title: "商业航天板块前锋（情绪龙头）",
      companies: [
        { name: "中天火箭", highlight: "固体火箭纯度标的，商业航天情绪博弈强，弹性领先" },
        { name: "钢研高纳", highlight: "高温合金火箭材料，市值适中，发射预期催化时先锋（非科创）" },
      ]
    },
    center: {
      title: "商业航天板块中军（趋势龙头）",
      companies: [
        { name: "中国卫星", highlight: "卫星制造龙头，星座建设直接受益，商业航天趋势中军" },
        { name: "航天电子", highlight: "航天电子龙头，配套订单稳健，机构配置核心" },
        { name: "海格通信", highlight: "卫星通信+北斗终端，政企订单可跟踪，趋势标的（非科创）" },
      ]
    }
  },
  "量子科技": {
    name: "量子科技",
    color: "#7c3aed",
    gradient: ["#7c3aed", "#4c1d95"],
    description: "基于量子科技产业链梳理：前锋（情绪龙头）与中军（趋势龙头）均选自产业链节点、且为非科创板（688/689）标的。",
    vanguard: {
      title: "量子科技板块前锋（情绪龙头）",
      companies: [
        { name: "光库科技", highlight: "量子通信器件弹性标的，题材纯度较高，情绪先锋" },
        { name: "科大国创", highlight: "量子计算应用新锐，板块活跃时辨识度高" },
      ]
    },
    center: {
      title: "量子科技板块中军（趋势龙头）",
      companies: [
        { name: "亨通光电", highlight: "量子通信网络+光纤龙头，订单稳健，量子科技趋势中军" },
        { name: "华工科技", highlight: "激光+量子器件，产业链布局完整，机构趋势配置" },
        { name: "迪普科技", highlight: "网络安全+量子加密应用，政企订单可跟踪，趋势标的" },
      ]
    }
  },
  "脑机接口": {
    name: "脑机接口",
    color: "#ec4899",
    gradient: ["#ec4899", "#9d174d"],
    description: "基于脑机接口产业链梳理：前锋（情绪龙头）与中军（趋势龙头）均选自产业链节点、且为非科创板（688/689）标的。",
    vanguard: {
      title: "脑机接口板块前锋（情绪龙头）",
      companies: [
        { name: "创新医疗", highlight: "脑机接口临床预期博弈强，纯度较高，情绪弹性领先" },
        { name: "爱朋医疗", highlight: "麻醉+脑机监测，市值适中，BCI主题活跃时先锋" },
      ]
    },
    center: {
      title: "脑机接口板块中军（趋势龙头）",
      companies: [
        { name: "三博脑科", highlight: "脑科医疗龙头，神经外科与脑机落地场景清晰，趋势中军" },
        { name: "科大讯飞", highlight: "脑机+AI语音龙头，研发与政企项目可跟踪，机构配置" },
        { name: "迈普医学", highlight: "神经外科植入物龙头，脑机植入材料场景清晰，走势偏趋势" },
      ]
    }
  },
  "稀土永磁": {
    name: "稀土永磁",
    color: "#dc2626",
    gradient: ["#dc2626", "#991b1b"],
    description: "基于稀土永磁产业链梳理：前锋（情绪龙头）与中军（趋势龙头）均选自产业链节点、且为非科创板（688/689）标的。",
    vanguard: {
      title: "稀土永磁板块前锋（情绪龙头）",
      companies: [
        { name: "宁波韵升", highlight: "稀土永磁弹性标的，磁材价格预期博弈强，情绪先锋" },
        { name: "正海磁材", highlight: "高性能磁材专精，新能源车预期催化时率先反应" },
      ]
    },
    center: {
      title: "稀土永磁板块中军（趋势龙头）",
      companies: [
        { name: "北方稀土", highlight: "稀土开采绝对龙头，配额与价格主导，趋势中军" },
        { name: "金力永磁", highlight: "永磁龙头绑定新能源车，订单放量清晰，机构重仓" },
        { name: "中国稀土", highlight: "稀土央企整合平台，资源管控力强，趋势标的" },
      ]
    }
  },
  "创新药": {
    name: "创新药",
    color: "#059669",
    gradient: ["#059669", "#065f46"],
    description: "基于创新药产业链梳理：前锋（情绪龙头）与中军（趋势龙头）均选自产业链节点、且为非科创板（688/689）标的。",
    vanguard: {
      title: "创新药板块前锋（情绪龙头）",
      companies: [
        { name: "冠昊生物", highlight: "再生医学+创新器械弹性，管线预期博弈强，情绪先锋（非科创）" },
        { name: "华海药业", highlight: "原料药+制剂一体化，创新药情绪活跃时弹性大" },
      ]
    },
    center: {
      title: "创新药板块中军（趋势龙头）",
      companies: [
        { name: "恒瑞医药", highlight: "创新药转型龙头，管线与业绩双跟踪，趋势中军" },
        { name: "药明康德", highlight: "CXO全球龙头，订单景气直接兑现，机构配置核心" },
        { name: "泰格医药", highlight: "临床CRO龙头，创新药投融资周期受益，趋势稳健" },
      ]
    }
  },
  "有色金属": {
    name: "有色金属",
    color: "#ca8a04",
    gradient: ["#ca8a04", "#854d0e"],
    description: "基于有色金属产业链梳理：前锋（情绪龙头）与中军（趋势龙头）均选自产业链节点、且为非科创板（688/689）标的。",
    vanguard: {
      title: "有色金属板块前锋（情绪龙头）",
      companies: [
        { name: "寒锐钴业", highlight: "钴资源弹性标的，有色活跃时涨幅领先，情绪先锋" },
        { name: "盛屯矿业", highlight: "镍钴资源扩张，市值适中，新能源金属博弈强" },
      ]
    },
    center: {
      title: "有色金属板块中军（趋势龙头）",
      companies: [
        { name: "紫金矿业", highlight: "有色矿业绝对龙头，资源储量与产量全球领先，趋势中军" },
        { name: "洛阳钼业", highlight: "铜钴钼多金属龙头，业绩规模大，机构长期重仓" },
        { name: "江西铜业", highlight: "铜冶炼龙头，工业金属需求直接受益，趋势标的" },
      ]
    }
  },
  "PCB": {
    name: "PCB",
    color: "#0284c7",
    gradient: ["#0284c7", "#075985"],
    description: "基于PCB产业链梳理：前锋（情绪龙头）与中军（趋势龙头）均选自产业链节点、且为非科创板（688/689）标的。",
    vanguard: {
      title: "PCB板块前锋（情绪龙头）",
      companies: [
        { name: "大族数控", highlight: "PCB钻孔设备纯度标的，AI PCB扩产预期博弈强，情绪先锋（非科创）" },
        { name: "胜宏科技", highlight: "AI PCB弹性标的，算力板订单催化时率先反应" },
      ]
    },
    center: {
      title: "PCB板块中军（趋势龙头）",
      companies: [
        { name: "沪电股份", highlight: "AI服务器PCB龙头，订单与业绩可跟踪，PCB趋势中军" },
        { name: "深南电路", highlight: "高端PCB+载板龙头，算力与通信双驱动，机构配置核心" },
        { name: "鹏鼎控股", highlight: "FPC全球龙头，消费电子+AI双线稳健，趋势标的" },
      ]
    }
  },
  "数字货币": {
    name: "数字货币",
    color: "#e11d48",
    gradient: ["#e11d48", "#881337"],
    description: "基于数字货币产业链梳理：前锋（情绪龙头）与中军（趋势龙头）均选自产业链节点、且为非科创板（688/689）标的。",
    vanguard: {
      title: "数字货币板块前锋（情绪龙头）",
      companies: [
        { name: "楚天龙", highlight: "数字人民币硬件纯度标的，政策催化时弹性大，情绪先锋" },
        { name: "拉卡拉", highlight: "支付终端+数字货币场景，市值适中，题材博弈活跃" },
      ]
    },
    center: {
      title: "数字货币板块中军（趋势龙头）",
      companies: [
        { name: "广电运通", highlight: "央行机具+金融科技龙头，数字人民币落地直接受益，趋势中军" },
        { name: "恒生电子", highlight: "金融IT龙头，银行数字货币系统订单稳健，机构配置" },
        { name: "新大陆", highlight: "支付+识读设备龙头，商户端场景清晰，趋势标的" },
      ]
    }
  },
  "无人驾驶": {
    name: "无人驾驶",
    color: "#7c3aed",
    gradient: ["#7c3aed", "#5b21b6"],
    description: "基于无人驾驶产业链梳理：前锋（情绪龙头）与中军（趋势龙头）均选自产业链节点、且为非科创板（688/689）标的。",
    vanguard: {
      title: "无人驾驶板块前锋（情绪龙头）",
      companies: [
        { name: "万集科技", highlight: "激光雷达+车路协同纯度标的，智驾情绪博弈强，先锋" },
        { name: "金溢科技", highlight: "ETC+V2X弹性标的，车路协同催化时率先反应" },
      ]
    },
    center: {
      title: "无人驾驶板块中军（趋势龙头）",
      companies: [
        { name: "德赛西威", highlight: "智能座舱+域控龙头，车企定点放量，智驾趋势中军" },
        { name: "赛力斯", highlight: "高阶智驾整车标杆，销量与智驾版本可跟踪，机构趋势配置" },
        { name: "四维图新", highlight: "高精地图龙头，智驾数据合规核心，趋势标的" },
      ]
    }
  },
  "特斯拉FSD入华": {
    name: "特斯拉FSD入华",
    color: "#dc2626",
    gradient: ["#dc2626", "#991b1b"],
    description: "基于特斯拉FSD入华产业链梳理：前锋（情绪龙头）与中军（趋势龙头）均选自产业链节点、且为非科创板（688/689）标的。",
    vanguard: {
      title: "特斯拉FSD入华板块前锋（情绪龙头）",
      companies: [
        { name: "联创电子", highlight: "车载光学镜头纯度标的，FSD 视觉路线催化，板块活跃时弹性与辨识度高" },
        { name: "豪恩汽电", highlight: "车载摄像头+APA 传感器专精，智驾感知套件情绪博弈强，先锋特征明显" },
      ]
    },
    center: {
      title: "特斯拉FSD入华板块中军（趋势龙头）",
      companies: [
        { name: "德赛西威", highlight: "智驾域控龙头，FSD 入华倒逼主机厂高阶智驾订单，机构趋势配置核心" },
        { name: "四维图新", highlight: "高精地图与数据合规龙头，外资 FSD 在华运营关键环节，趋势中军" },
        { name: "拓普集团", highlight: "特斯拉中国区核心 Tier1，FSD 主题与在华放量双逻辑，业绩可跟踪" },
      ]
    }
  },
  "长鑫存储": {
    name: "长鑫存储",
    color: "#0e7490",
    gradient: ["#0e7490", "#164e63"],
    description: "基于长鑫存储产业链梳理：前锋（情绪龙头）与中军（趋势龙头）均选自产业链节点、且为非科创板（688/689）标的。",
    vanguard: {
      title: "长鑫存储板块前锋（情绪龙头）",
      companies: [
        { name: "雅克科技", highlight: "电子特气与前驱体直接配套长鑫 DRAM 产线，扩产预期博弈强，情绪弹性大" },
        { name: "朗迪集团", highlight: "间接参股长鑫，资本化预期博弈强，典型情绪映射标的" },
      ]
    },
    center: {
      title: "长鑫存储板块中军（趋势龙头）",
      companies: [
        { name: "兆易创新", highlight: "持股长鑫科技+研发协同，存储产业链趋势中军" },
        { name: "北方华创", highlight: "存储产线设备龙头，长鑫扩产订单可跟踪，机构配置核心" },
        { name: "江波龙", highlight: "存储模组龙头，国产DRAM颗粒导入放量，趋势标的" },
      ]
    }
  },
  "先进封装": {
    name: "先进封装",
    color: "#7c3aed",
    gradient: ["#7c3aed", "#5b21b6"],
    description: "基于先进封装产业链梳理：前锋（情绪龙头）与中军（趋势龙头）均选自产业链节点、且为非科创板（688/689）标的。",
    vanguard: {
      title: "先进封装板块前锋（情绪龙头）",
      companies: [
        { name: "晶方科技", highlight: "CIS 晶圆级封装 WLP 龙头，先进封装辨识度最高，情绪弹性领先" },
        { name: "飞凯材料", highlight: "封装光刻胶与电镀化学品，封测材料端纯度标的，创业板情绪先锋" },
      ]
    },
    center: {
      title: "先进封装板块中军（趋势龙头）",
      companies: [
        { name: "长电科技", highlight: "全球OSAT龙头，2.5D/Chiplet订单兑现，先进封装趋势中军" },
        { name: "通富微电", highlight: "AMD封测伙伴，先进封装产能绑定大客户，机构重仓" },
        { name: "深南电路", highlight: "ABF载板龙头，算力芯片封装基板直接受益，趋势核心" },
      ]
    }
  },
  "2022世界杯": {
    name: "2022世界杯",
    color: "#16a34a",
    gradient: ["#16a34a", "#15803d"],
    description: "基于2022世界杯产业链梳理：前锋（情绪龙头）与中军（趋势龙头）均选自产业链节点、且为非科创板（688/689）标的。",
    vanguard: {
      title: "2022世界杯板块前锋（情绪龙头）",
      companies: [
        { name: "星辉娱乐", highlight: "FIFA授权游戏纯度最高，世界杯期间流水预期博弈强，情绪先锋" },
        { name: "浙文互联", highlight: "体育营销弹性标的，赛事广告投放催化时率先反应" },
      ]
    },
    center: {
      title: "2022世界杯板块中军（趋势龙头）",
      companies: [
        { name: "青岛啤酒", highlight: "啤酒消费龙头，世界杯旺季销量弹性可跟踪，趋势中军" },
        { name: "海信视像", highlight: "官方赞助商曝光+显示设备，品牌与订单双兑现，机构趋势标的" },
        { name: "中体产业", highlight: "体彩+赛事运营龙头，竞彩销量周期规律强，走势偏趋势" },
      ]
    }
  },
  "2026世界杯": {
    name: "2026世界杯",
    color: "#2563eb",
    gradient: ["#2563eb", "#1e40af"],
    description: "基于2026世界杯产业链梳理：前锋（情绪龙头）与中军（趋势龙头）均选自产业链节点、且为非科创板（688/689）标的。",
    vanguard: {
      title: "2026世界杯板块前锋（情绪龙头）",
      companies: [
        { name: "元隆雅图", highlight: "官方IP特许授权纯度最高，纪念品销售预期博弈强，情绪先锋" },
        { name: "艾比森", highlight: "场馆LED中标实锤，海外订单催化时弹性领先" },
      ]
    },
    center: {
      title: "2026世界杯板块中军（趋势龙头）",
      companies: [
        { name: "海信视像", highlight: "FIFA全球赞助商三届连续，曝光与硬件订单稳健，趋势中军" },
        { name: "中体产业", highlight: "体彩运营龙头，赛程拉长竞彩销量抬升，机构趋势配置" },
        { name: "青岛啤酒", highlight: "限定款+渠道备货，观赛消费旺季，业绩弹性可跟踪" },
      ]
    }
  },
};

function searchSector(query) {
  const trimmed = query.trim();
  if (SECTOR_DATA[trimmed]) return SECTOR_DATA[trimmed];
  const industry = searchIndustry(query);
  if (industry && SECTOR_DATA[industry.name]) return SECTOR_DATA[industry.name];
  for (const [keyword, industryKey] of Object.entries(KEYWORD_MAP)) {
    if (trimmed.includes(keyword) || keyword.includes(trimmed)) {
      if (SECTOR_DATA[industryKey]) return SECTOR_DATA[industryKey];
    }
  }
  return null;
}