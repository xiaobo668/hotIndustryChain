/**
 * 产业链数据库
 * 包含：半导体、AI算力、算力租赁、新能源汽车、光伏、人工智能、锂电池、消费电子、机器人、液冷、通讯设备、IT服务、元件、AI应用
 */
const INDUSTRY_DATA = {
  // ========== 半导体 ==========
  "半导体": {
    name: "半导体",
    color: "#1a73e8",
    gradient: ["#1a73e8", "#0d47a1"],
    description: "半导体产业是现代电子信息产业的基础，涵盖集成电路设计、制造、封测及设备材料等全产业链。",
    upstream: [
      {
        name: "硅片/材料",
        companies: [
          { /* code: "300703" */ name: "鼎龙股份", highlight: "CMP抛光垫国内市占率第一，半导体IC封装用干膜持续放量" },
          { /* code: "300502" */ name: "新易盛", highlight: "光电子材料+半导体光学器件，下游覆盖主流晶圆厂" },
          { /* code: "002985" */ name: "北摩高科", highlight: "电子特气关键原材料，CVD/ALD工艺用高纯气体国产化" },
          { /* code: "600183" */ name: "生益科技", highlight: "覆铜板龙头，半导体封装基板核心材料，国内市占率第一" }
        ]
      },
      {
        name: "半导体设备",
        companies: [
          { /* code: "002371" */ name: "北方华创", highlight: "刻蚀机+CVD设备龙头，国内半导体设备市占率第一，先进制程攻关领先" },
          { /* code: "300782" */ name: "卓胜微", highlight: "射频前端芯片，5G手机滤波器+LNA国产替代领军" },
          { /* code: "300124" */ name: "汇川技术", highlight: "运动控制设备，半导体设备核心驱控零部件供应商" },
          { /* code: "300236" */ name: "拓尔思", highlight: "刻蚀机配套零部件，半导体设备国产化受益标的" }
        ]
      }
    ],
    midstream: [
      {
        name: "芯片设计（Fabless）",
        companies: [
          { /* code: "002049" */ name: "紫光国微", highlight: "安全芯片+FPGA龙头，国密芯片市场份额第一，军工信创双赛道" },
          { /* code: "300782" */ name: "卓胜微", highlight: "射频芯片龙头，5G手机渗透率快速提升，海外出货量高增" },
          { /* code: "002916" */ name: "深南电路", highlight: "高密度封装基板，芯片设计配套先进封装基板龙头" },
          { /* code: "600460" */ name: "士兰微", highlight: "IDM模式功率+射频+MEMS，碳化硅器件加速放量，车规认证完成" }
        ]
      },
      {
        name: "晶圆制造（IDM/Foundry）",
        companies: [
          { /* code: "600460" */ name: "士兰微", highlight: "IDM模式，功率+射频+MEMS多元布局，车规级产品放量" },
          { /* code: "000725" */ name: "京东方A", highlight: "半导体显示晶圆级制造，OLED+Mini LED产能全球第一" },
          { /* code: "002156" */ name: "通富微电", highlight: "Chiplet先进封装，承接AMD/英特尔晶圆级封装订单" }
        ]
      }
    ],
    downstream: [
      {
        name: "封装测试",
        companies: [
          { /* code: "002156" */ name: "通富微电", highlight: "Chiplet先进封装，AMD重要合作伙伴，营收超百亿" },
          { /* code: "002185" */ name: "华天科技", highlight: "传统封测+先进封装，车规级封测需求旺盛" },
          { /* code: "600171" */ name: "上海贝岭", highlight: "模拟芯片+混合信号IC，工控与汽车电子双轮驱动" }
        ]
      },
      {
        name: "终端应用",
        companies: [
          { /* code: "000725" */ name: "京东方A", highlight: "面板龙头，半导体显示+传感器全面布局" },
          { /* code: "002049" */ name: "紫光国微", highlight: "安全芯片+FPGA，国密芯片市场份额领先，军工信创双赛道" },
          { /* code: "002415" */ name: "海康威视", highlight: "AI推理芯片应用龙头，云端+边缘端AI视觉芯片大规模部署" }
        ]
      }
    ]
  },

  // ========== AI算力 ==========
  "AI算力": {
    name: "AI算力",
    color: "#7c3aed",
    gradient: ["#7c3aed", "#4c1d95"],
    description: "AI算力产业链涵盖芯片设计、服务器制造、数据中心基础设施到云计算平台的完整生态，是大模型时代的核心基础设施。",
    upstream: [
      {
        name: "AI芯片",
        companies: [
          { /* code: "002049" */ name: "紫光国微", highlight: "国产FPGA+AI加速芯片，可编程算力芯片国产替代领军" },
          { /* code: "300782" */ name: "卓胜微", highlight: "高速射频芯片，AI服务器前端信号处理核心器件" },
          { /* code: "600536" */ name: "中国软件", highlight: "国产操作系统麒麟/统信生态核心，AI算力国产化软件栈" },
          { /* code: "002600" */ name: "领益智造", highlight: "英伟达AI服务器散热组件核心供应商，液冷+风冷双方案覆盖" }
        ]
      },
      {
        name: "高速互联/存储",
        companies: [
          { /* code: "300308" */ name: "中际旭创", highlight: "800G光模块全球龙头，AI数据中心光互联核心，1.6T产品已送样" },
          { /* code: "002138" */ name: "顺络电子", highlight: "高频电感磁性元件龙头，AI服务器磁性器件需求激增" },
          { /* code: "002641" */ name: "辰奕智能", highlight: "高速连接器+背板互联，AI服务器机柜级互联核心供应商" }
        ]
      }
    ],
    midstream: [
      {
        name: "服务器/整机",
        companies: [
          { /* code: "000977" */ name: "浪潮信息", highlight: "AI服务器出货量全球前三，英伟达H100/H800主要ODM合作方" },
          { /* code: "002642" */ name: "荣联科技", highlight: "AI整机柜交付能力，国内头部云厂商核心供应商" },
          { /* code: "000400" */ name: "许继电气", highlight: "数据中心配电方案，大功率AI机柜供电及液冷配电整合" }
        ]
      },
      {
        name: "光模块/网络",
        companies: [
          { /* code: "300308" */ name: "中际旭创", highlight: "800G光模块出货量全球第一，已送样1.6T产品" },
          { /* code: "301281" */ name: "华工科技", highlight: "光芯片+光器件垂直整合，25G/100G DFB激光芯片国产替代" },
          { /* code: "002177" */ name: "御风科技", highlight: "光收发模块，100G/400G数通模块批量供货云计算客户" }
        ]
      }
    ],
    downstream: [
      {
        name: "数据中心/IDC",
        companies: [
          { /* code: "300383" */ name: "光环新网", highlight: "北京核心数据中心运营商，AI算力租赁业务快速扩张" },
          { /* code: "002236" */ name: "大华股份", highlight: "AIoT端侧算力，智慧城市+AI视频分析" },
          { /* code: "600595" */ name: "中孚实业", highlight: "绿电+IDC战略布局，算力租赁切入AI基础设施赛道" }
        ]
      },
      {
        name: "大模型/AI应用",
        companies: [
          { /* code: "600745" */ name: "闻泰科技", highlight: "AI手机ODM龙头，端侧AI推理芯片集成方案" },
          { /* code: "002230" */ name: "科大讯飞", highlight: "星火大模型，教育+医疗+办公AI应用商业化落地" },
          { /* code: "300271" */ name: "华宇软件", highlight: "AI大模型行业落地，司法+政务AI辅助系统商业化领先" }
        ]
      }
    ]
  },

  // ========== 新能源汽车 ==========
  "新能源汽车": {
    name: "新能源汽车",
    color: "#059669",
    gradient: ["#059669", "#064e3b"],
    description: "新能源汽车产业链从电池材料到整车制造，是当前全球最重要的产业变革之一，中国在全球产业中占据主导地位。",
    upstream: [
      {
        name: "锂矿/电池材料",
        companies: [
          { /* code: "002466" */ name: "天齐锂业", highlight: "全球最大锂矿开采商之一，参股SQM锂矿资产，碳酸锂弹性极大" },
          { /* code: "002460" */ name: "赣锋锂业", highlight: "锂资源+固态锂电池双主业，固态电池全球量产进程最快" },
          { /* code: "300073" */ name: "当升科技", highlight: "高镍三元正极材料龙头，欧洲大客户开拓顺利，出货量高增" },
          { /* code: "002812" */ name: "恩捷股份", highlight: "锂电隔膜全球市占率超30%，湿法隔膜绝对龙头，盈利稳居第一" }
        ]
      },
      {
        name: "电芯/动力电池",
        companies: [
          { /* code: "300750" */ name: "宁德时代", highlight: "全球动力电池装机量第一，麒麟电池+钠离子电池技术引领" },
          { /* code: "000100" */ name: "TCL中环", highlight: "光伏硅片+车规级功率器件，新能源双赛道布局" },
          { /* code: "300014" */ name: "亿纬锂能", highlight: "大圆柱+软包电池海外订单充沛，储能市场快速增长" }
        ]
      }
    ],
    midstream: [
      {
        name: "核心零部件",
        companies: [
          { /* code: "300124" */ name: "汇川技术", highlight: "新能源汽车电机驱动+电控龙头，市占率国内第一" },
          { /* code: "002690" */ name: "美亚光电", highlight: "锂电分选+色选机，电芯品质检测设备领先" },
          { /* code: "600741" */ name: "华域汽车", highlight: "汽车零部件龙头，电动化+智能化转型加速" },
          { /* code: "002594" */ name: "比亚迪", highlight: "整车+电池+芯片一体化，全球新能源汽车销量冠军" }
        ]
      },
      {
        name: "智能驾驶/座舱",
        companies: [
          { /* code: "002920" */ name: "德赛西威", highlight: "智能座舱域控制器龙头，舱驾一体化方案规模量产" },
          { /* code: "300296" */ name: "豪迈科技", highlight: "车载传感器精密制造，自动驾驶感知系统配套能力强" },
          { /* code: "300502" */ name: "新易盛", highlight: "激光雷达用光模块及组件，自动驾驶光学方案供应商" }
        ]
      }
    ],
    downstream: [
      {
        name: "整车制造",
        companies: [
          { /* code: "002594" */ name: "比亚迪", highlight: "月销超40万辆，海外出口持续增长，垂直整合优势突出" },
          { /* code: "600104" */ name: "上汽集团", highlight: "传统整车龙头转型新能源，MG品牌海外热销" },
          { /* code: "601127" */ name: "赛力斯", highlight: "问界M9销量爆发，与华为深度合作的智选车标杆" }
        ]
      },
      {
        name: "充电桩/服务",
        companies: [
          { /* code: "300046" */ name: "台基股份", highlight: "大功率充电桩模块，液冷超充技术领先，高压快充核心器件" },
          { /* code: "300014" */ name: "亿纬锂能", highlight: "动力+储能双轮驱动，大圆柱电池海外出货放量" },
          { /* code: "300750" */ name: "宁德时代", highlight: "换电服务+大储系统，新能源出行配套完整生态" }
        ]
      }
    ]
  },

  // ========== 光伏 ==========
  "光伏": {
    name: "光伏",
    color: "#d97706",
    gradient: ["#d97706", "#92400e"],
    description: "光伏产业链从多晶硅原料到电池组件再到电站运营，是全球清洁能源转型的核心驱动力，中国企业在全球各环节占据绝对主导地位。",
    upstream: [
      {
        name: "多晶硅/硅料",
        companies: [
          { /* code: "601012" */ name: "隆基绿能", highlight: "全球最大单晶硅片+电池组件厂商，BC电池引领下一代技术" },
          { /* code: "000100" */ name: "TCL中环", highlight: "N型硅片出货量快速提升，单晶炉设备持续扩产" },
          { /* code: "600438" */ name: "通威股份", highlight: "多晶硅产能全球第一，兼具电池片龙头地位，一体化优势显著" }
        ]
      },
      {
        name: "辅材/设备",
        companies: [
          { /* code: "300207" */ name: "欣旺达", highlight: "储能电池+光伏配储，光储一体化解决方案" },
          { /* code: "300724" */ name: "捷佳伟创", highlight: "TOPCon/HJT电池设备龙头，N型电池设备市占率居前" },
          { /* code: "002129" */ name: "TCL中环", highlight: "大尺寸单晶硅片，光伏电池效率持续提升的核心原材料" }
        ]
      }
    ],
    midstream: [
      {
        name: "电池片/组件",
        companies: [
          { /* code: "002459" */ name: "晶澳科技", highlight: "TOPCon电池全球出货量前三，海外市场持续开拓" },
          { /* code: "002382" */ name: "天合光能", highlight: "组件出货量全球前三，分布式光伏+储能系统加速布局" },
          { /* code: "002129" */ name: "TCL中环", highlight: "N型大尺寸硅片龙头，单晶硅片全球市占率前二" }
        ]
      },
      {
        name: "逆变器",
        companies: [
          { /* code: "300274" */ name: "阳光电源", highlight: "全球逆变器出货量第一，储能系统快速增长超预期" },
          { /* code: "601877" */ name: "正泰电器", highlight: "逆变器+开关元件+光伏全产业链，国内渠道为王" },
          { /* code: "300274" */ name: "固德威", highlight: "家用储能逆变器出货量快速增长，欧洲市场持续扩大" }
        ]
      }
    ],
    downstream: [
      {
        name: "光伏电站/EPC",
        companies: [
          { /* code: "601016" */ name: "节能风电", highlight: "风光储一体电站运营商，清洁能源资产持续扩张" },
          { /* code: "000591" */ name: "太阳能", highlight: "集中式光伏电站运营龙头，装机量持续创新高" },
          { /* code: "601163" */ name: "三峡能源", highlight: "海上风电+光伏电站，清洁能源央企龙头" }
        ]
      },
      {
        name: "储能/配套",
        companies: [
          { /* code: "300750" */ name: "宁德时代", highlight: "大储系统全球市占率第一，天合储能+天弈储能双品牌" },
          { /* code: "300207" */ name: "欣旺达", highlight: "储能电芯+PACK，工商业储能快速放量" },
          { /* code: "002129" */ name: "协鑫科技", highlight: "颗粒硅低成本优势突出，光伏电站配套储能布局加速" }
        ]
      }
    ]
  },

  // ========== 人工智能 ==========
  "人工智能": {
    name: "人工智能",
    color: "#dc2626",
    gradient: ["#dc2626", "#7f1d1d"],
    description: "人工智能产业链从基础层算力、框架，到技术层模型训练，再到应用层的多场景落地，正在重塑各行各业的商业形态。",
    upstream: [
      {
        name: "算力基础设施",
        companies: [
          { /* code: "002371" */ name: "北方华创", highlight: "国内半导体设备龙头，AI算力芯片制造关键设备供应商" },
          { /* code: "000977" */ name: "浪潮信息", highlight: "全球AI服务器出货量前三，英伟达最大ODM合作伙伴" },
          { /* code: "300308" */ name: "中际旭创", highlight: "800G光模块龙头，AI数据中心光互联核心基础设施" }
        ]
      },
      {
        name: "AI框架/工具链",
        companies: [
          { /* code: "002405" */ name: "四维图新", highlight: "高精地图+车路协同数据，L4自动驾驶AI训练数据底座" },
          { /* code: "600588" */ name: "用友网络", highlight: "企业AI大模型BIP平台，数字化转型深度受益" },
          { /* code: "300124" */ name: "汇川技术", highlight: "工业AI+运动控制，机器人+工控场景AI渗透率快速提升" }
        ]
      }
    ],
    midstream: [
      {
        name: "大模型/基础模型",
        companies: [
          { /* code: "002230" */ name: "科大讯飞", highlight: "星火大模型V4.0，语音识别准确率全球领先，垂直落地最快" },
          { /* code: "603139" */ name: "海量数据", highlight: "AI训练数据标注与清洗，大模型数据供应商营收持续高增" },
          { /* code: "300418" */ name: "昆仑万维", highlight: "天工大模型+海外AGI布局，AI应用矩阵变现能力强" }
        ]
      },
      {
        name: "AI平台/中台",
        companies: [
          { /* code: "300033" */ name: "同花顺", highlight: "金融AI大模型，iFinD数据平台月活用户持续增长" },
          { /* code: "002502" */ name: "软通动力", highlight: "AI+数字化服务，大模型落地大型企业客户能力强" },
          { /* code: "002065" */ name: "东华软件", highlight: "医疗+政务AI平台，行业大模型落地医院场景覆盖广" }
        ]
      }
    ],
    downstream: [
      {
        name: "AI应用（各垂直行业）",
        companies: [
          { /* code: "002236" */ name: "大华股份", highlight: "AIoT视频智能，AI视频分析订单大幅增长" },
          { /* code: "300271" */ name: "华宇软件", highlight: "法院+检察院AI大模型应用，司法AI落地深度行业第一" },
          { /* code: "002415" */ name: "海康威视", highlight: "AI+物联网行业龙头，大模型赋能安防+工业检测，营收规模行业第一" }
        ]
      },
      {
        name: "AIGC/生成式AI",
        companies: [
          { /* code: "300418" */ name: "昆仑万维", highlight: "天工AI搜索日活突破百万，AIGC商业化路径最清晰" },
          { /* code: "300738" */ name: "奥飞数据", highlight: "IDC算力+AIGC内容基础设施，AI内容消费基础设施运营商" },
          { /* code: "300484" */ name: "蓝色光标", highlight: "全面拥抱AI营销，AIGC内容生产成本降低60%，营销自动化快速增长" }
        ]
      }
    ]
  },

  // ========== 锂电池 ==========
  "锂电池": {
    name: "锂电池",
    color: "#0891b2",
    gradient: ["#0891b2", "#164e63"],
    description: "锂电池产业链从锂矿、正负极材料、隔膜、电解液到电芯制造再到BMS管理系统，支撑新能源汽车和储能两大核心应用。",
    upstream: [
      {
        name: "锂/钴/镍资源",
        companies: [
          { /* code: "002466" */ name: "天齐锂业", highlight: "锂矿资产全球顶级，参股SQM，碳酸锂价格回升弹性极大" },
          { /* code: "002460" */ name: "赣锋锂业", highlight: "固态锂电池全球量产进程最快，海外矿山资产丰富" },
          { /* code: "600111" */ name: "北方稀土", highlight: "稀土永磁材料龙头，钕铁硼永磁体新能源汽车电机核心供应商" }
        ]
      },
      {
        name: "正负极/隔膜/电解液",
        companies: [
          { /* code: "300073" */ name: "当升科技", highlight: "高镍NCM正极材料龙头，欧洲客户开拓顺利，出货量高增" },
          { /* code: "002812" */ name: "恩捷股份", highlight: "湿法隔膜全球市占率超35%，盈利能力稳居行业第一" },
          { /* code: "300438" */ name: "天赐材料", highlight: "电解液龙头，LiFSI添加剂技术领先，配套宁德时代为主" }
        ]
      }
    ],
    midstream: [
      {
        name: "电芯制造",
        companies: [
          { /* code: "300750" */ name: "宁德时代", highlight: "全球动力电池装机量第一，麒麟电池能量密度突破255Wh/kg" },
          { /* code: "300014" */ name: "亿纬锂能", highlight: "大圆柱+软包电池海外订单充沛，储能市场快速增长" },
          { /* code: "002074" */ name: "国轩高科", highlight: "磷酸铁锂电池，大众持股加持，出口欧洲战略推进" }
        ]
      },
      {
        name: "BMS/热管理",
        companies: [
          { /* code: "002371" */ name: "北方华创", highlight: "真空镀膜设备+刻蚀机，电池极片制造核心装备" },
          { /* code: "300568" */ name: "星源材质", highlight: "锂电池隔膜+铜箔，干法隔膜技术全球领先，盈利稳健" },
          { /* code: "002475" */ name: "立讯精密", highlight: "精密连接器+热管理部件，新能源汽车电池包配套能力强" }
        ]
      }
    ],
    downstream: [
      {
        name: "动力电池应用",
        companies: [
          { /* code: "002594" */ name: "比亚迪", highlight: "刀片电池自供+外销，安全性领先，乘用车市占持续扩大" },
          { /* code: "601127" */ name: "赛力斯", highlight: "问界系列装机宁德麒麟电池，单车带电量行业前列" },
          { /* code: "600104" */ name: "上汽集团", highlight: "智己+飞凡装机动力电池，海外出口电动化加速" }
        ]
      },
      {
        name: "储能应用",
        companies: [
          { /* code: "300750" */ name: "宁德时代", highlight: "天合储能+天弈储能，全球大储系统市占率第一" },
          { /* code: "300207" */ name: "欣旺达", highlight: "工商业储能PACK+BMS，装机量快速提升" },
          { /* code: "002594" */ name: "比亚迪", highlight: "储能系统BYD-ESS，光储一体方案全球销售" }
        ]
      }
    ]
  },

  // ========== 消费电子 ==========
  "消费电子": {
    name: "消费电子",
    color: "#7c3aed",
    gradient: ["#be185d", "#7c3aed"],
    description: "消费电子产业链从芯片元器件到整机制造再到零售渠道，以智能手机、PC、可穿戴设备为核心，AI化与折叠屏为新增量方向。",
    upstream: [
      {
        name: "芯片/核心部件",
        companies: [
          { /* code: "002049" */ name: "紫光国微", highlight: "安全芯片+FPGA，手机SIM卡芯片国内市占超60%" },
          { /* code: "300433" */ name: "蓝思科技", highlight: "玻璃+金属盖板，苹果+华为双核心供应链" },
          { /* code: "002241" */ name: "歌尔股份", highlight: "TWS耳机+VR头显，苹果Vision Pro核心声学供应商" }
        ]
      },
      {
        name: "显示/摄像",
        companies: [
          { /* code: "000725" */ name: "京东方A", highlight: "全球OLED面板出货量前三，折叠屏面板国内市占第一" },
          { /* code: "002475" */ name: "立讯精密", highlight: "摄像头精密结构件+模组组装，苹果摄像头核心供应商" },
          { /* code: "300433" */ name: "蓝思科技", highlight: "摄像头玻璃盖板+镜片，苹果高端摄像头保护玻璃独家供应" }
        ]
      }
    ],
    midstream: [
      {
        name: "ODM/代工制造",
        companies: [
          { /* code: "600745" */ name: "闻泰科技", highlight: "手机ODM龙头+功率半导体，AI手机整合解决方案" },
          { /* code: "002241" */ name: "歌尔股份", highlight: "苹果核心供应商，AirPods出货量全球第一供应商" },
          { /* code: "300433" */ name: "蓝思科技", highlight: "苹果+华为+小米全覆盖，折叠屏铰链量产能力行业第一" }
        ]
      },
      {
        name: "结构件/精密制造",
        companies: [
          { /* code: "601882" */ name: "海天精工", highlight: "精密机床，消费电子外壳CNC加工核心装备" },
          { /* code: "002475" */ name: "立讯精密", highlight: "连接器+声学+无线，苹果核心供应商，AirPods/Watch核心制造" },
          { /* code: "002241" */ name: "歌尔股份", highlight: "精密声学+VR光学结构件，苹果/Meta核心供应链" }
        ]
      }
    ],
    downstream: [
      {
        name: "整机品牌",
        companies: [
          { /* code: "002415" */ name: "海康威视", highlight: "安防摄像头+智能门锁，消费级AIoT硬件市占领先" },
          { /* code: "002602" */ name: "世纪华通", highlight: "游戏+智能手机应用生态，消费电子软硬联动" },
          { /* code: "600660" */ name: "福耀玻璃", highlight: "AR眼镜光学镜片+车载HUD，新形态消费电子光学布局" }
        ]
      },
      {
        name: "零售渠道/电商",
        companies: [
          { /* code: "600415" */ name: "小商品城", highlight: "跨境电商平台+消费电子出口，义乌消费电子外贸枢纽" },
          { /* code: "300251" */ name: "光线传媒", highlight: "消费电子内容营销+IP联名，品牌推广核心渠道" },
          { /* code: "300613" */ name: "富瀚微", highlight: "视频安防SoC芯片龙头，智能摄像头AI芯片领域第一" }
        ]
      }
    ]
  },

  // ========== 机器人 ==========
  "机器人": {
    name: "机器人",
    color: "#0f766e",
    gradient: ["#0f766e", "#134e4a"],
    description: "人形机器人产业链以人工智能为核心驱动，从减速器、伺服电机等核心零部件到控制系统、再到整机集成与应用，是AI与制造业深度融合的未来产业。",
    upstream: [
      {
        name: "核心零部件",
        companies: [
          { /* code: "300124" */ name: "汇川技术", highlight: "伺服驱动+运动控制龙头，人形机器人关节电机核心供应商" },
          { /* code: "002747" */ name: "埃斯顿", highlight: "减速器+伺服系统，国内工业机器人核心零部件龙头" },
          { /* code: "300817" */ name: "双环传动", highlight: "精密减速器，特斯拉人形机器人供应商认证" }
        ]
      },
      {
        name: "传感器/感知",
        companies: [
          { /* code: "002475" */ name: "立讯精密", highlight: "力觉+触觉传感器精密组件，机器人感知系统关键配套" },
          { /* code: "002547" */ name: "春兴精工", highlight: "精密结构件+MEMS传感器封装，机器人末端执行器配套" },
          { /* code: "002217" */ name: "合力科技", highlight: "工业视觉检测系统，机器人3D视觉引导定位方案" }
        ]
      }
    ],
    midstream: [
      {
        name: "控制系统/算法",
        companies: [
          { /* code: "300124" */ name: "汇川技术", highlight: "PLC+运动控制，机器人大脑核心，AI化运动规划领先" },
          { /* code: "300496" */ name: "中科曙光", highlight: "机器人操作系统+高性能计算，工业AI一体化算法平台" },
          { /* code: "002747" */ name: "埃斯顿", highlight: "自主运动控制算法，焊接+搬运+装配机器人全场景覆盖" }
        ]
      },
      {
        name: "本体制造/集成",
        companies: [
          { /* code: "300024" */ name: "机器人（新松）", highlight: "国内工业机器人整机龙头，特种+服务机器人全赛道布局" },
          { /* code: "002747" */ name: "埃斯顿", highlight: "国产工业机器人出货量前三，汽车+3C行业应用居前" },
          { /* code: "300993" */ name: "玉禾田", highlight: "环卫机器人+服务机器人，室外场景自主作业商业化落地" }
        ]
      }
    ],
    downstream: [
      {
        name: "工业应用",
        companies: [
          { /* code: "002015" */ name: "协鑫集成", highlight: "光伏电池智能制造，机器人应用深度场景实践" },
          { /* code: "600031" */ name: "三一重工", highlight: "工程机械+挖掘机器人，建筑+矿山自动化深度布局" },
          { /* code: "601012" */ name: "隆基绿能", highlight: "光伏灯塔工厂，工业机器人应用量全国前列" }
        ]
      },
      {
        name: "服务/人形机器人",
        companies: [
          { /* code: "300024" */ name: "机器人（新松）", highlight: "服务机器人+AGV，医院+酒店场景商业化落地" },
          { /* code: "300748" */ name: "金力永磁", highlight: "高性能钕铁硼永磁体，人形机器人电机磁材核心供应商" },
          { /* code: "002097" */ name: "山河智能", highlight: "特种机器人+工程机械，应急救援+非开挖机器人" }
        ]
      }
    ]
  },

  // ========== 液冷 ==========
  "液冷": {
    name: "液冷",
    color: "#0ea5e9",
    gradient: ["#0ea5e9", "#0c4a6e"],
    description: "液冷产业链以数据中心热管理为核心，涵盖冷却液、散热器件、冷板/浸没式方案到系统集成，是AI算力时代数据中心降温的关键基础设施，市场需求随GPU算力密度提升而爆发式增长。",
    upstream: [
      {
        name: "冷却液/导热材料",
        companies: [
          { /* code: "605060" */ name: "巨化股份", highlight: "氟化工龙头，氟化液和氟化冷却介质生产，浸没液冷冷却剂核心供应商" },
          { /* code: "002038" */ name: "双良节能", highlight: "工业换热器龙头，数据中心液冷CDU换热核心设备供应商" },
          { /* code: "300344" */ name: "立昂技术", highlight: "导热硅脂+导热界面材料，GPU封装热管理关键辅材" },
          { /* code: "603659" */ name: "璞泰来", highlight: "导热石墨膜，高功率芯片散热界面材料国产化领先" }
        ]
      },
      {
        name: "泵/阀/管路",
        companies: [
          { /* code: "002645" */ name: "华东重机", highlight: "精密微型泵，液冷循环系统动力核心部件" },
          { /* code: "002534" */ name: "西部建设", highlight: "高精密铜铝管路，液冷管路配套加工能力" },
          { /* code: "002347" */ name: "泰尔股份", highlight: "工业级耐腐蚀阀门，数据中心液冷管路控制部件" }
        ]
      }
    ],
    midstream: [
      {
        name: "冷板/散热模组",
        companies: [
          { /* code: "002484" */ name: "华中数控", highlight: "精密CNC加工设备，AI服务器液冷冷板加工核心装备" },
          { /* code: "300593" */ name: "新雷能", highlight: "高效电源模块+热管理方案，AI服务器配套电源散热一体化" },
          { /* code: "300628" */ name: "亿田智能", highlight: "精密铜铝热管理器件，液冷冷板冲压成形核心供应商" },
          { /* code: "002756" */ name: "永福股份", highlight: "铜铝精密管道+冷板加工，液冷散热组件批量供货云厂商" }
        ]
      },
      {
        name: "浸没式/CDU系统",
        companies: [
          { /* code: "300448" */ name: "浩云科技", highlight: "机柜级浸没液冷整体方案，交付能力行业领先" },
          { /* code: "000400" */ name: "许继电气", highlight: "液冷供配电一体化方案，CDU+PDU整合交付大功率机柜" },
          { /* code: "002202" */ name: "金风科技", highlight: "大型冷却系统集成，工业级液冷系统技术积累深厚" }
        ]
      }
    ],
    downstream: [
      {
        name: "液冷服务器/整机",
        companies: [
          { /* code: "000977" */ name: "浪潮信息", highlight: "液冷AI服务器G7系列，支持H100/H800满负荷液冷散热，头部客户大批量发货" },
          { /* code: "002936" */ name: "郑煤机", highlight: "液冷机柜+高密度算力方案，矿用与数据中心双赛道布局" },
          { /* code: "300308" */ name: "中际旭创", highlight: "液冷光模块方案，800G高速光模块散热性能达行业最优" }
        ]
      },
      {
        name: "数据中心/IDC运营",
        companies: [
          { /* code: "300383" */ name: "光环新网", highlight: "液冷数据中心改造，PUE降至1.15以下，节能效益显著" },
          { /* code: "600595" */ name: "中孚实业", highlight: "绿电+液冷IDC，算力租赁业务切入AI基础设施赛道" },
          { /* code: "002212" */ name: "天融信", highlight: "数据中心安全运维+液冷环境监控，IDC全栈管理服务商" }
        ]
      }
    ]
  },

  // ========== 通讯设备 ==========
  "通讯设备": {
    name: "通讯设备",
    color: "#2563eb",
    gradient: ["#2563eb", "#1e3a8a"],
    description: "通讯设备产业链涵盖核心芯片、光器件、基站/传输设备制造到运营商网络部署，5G-A与星地融合通信驱动新一轮建设周期，AI与通信融合催生智慧网络新需求。",
    upstream: [
      {
        name: "通信芯片",
        companies: [
          { /* code: "300782" */ name: "卓胜微", highlight: "5G射频前端芯片龙头，滤波器+PA国产替代持续突破" },
          { /* code: "002745" */ name: "木瓜移动", highlight: "通信SoC芯片+IoT模组，NB-IoT/Cat.1出货量行业领先" },
          { /* code: "300458" */ name: "全志科技", highlight: "IoT处理芯片，无线通信终端SoC出货量行业领先" },
          { /* code: "600183" */ name: "生益科技", highlight: "高频高速覆铜板，5G基站天线及毫米波天线核心材料" }
        ]
      },
      {
        name: "光器件/射频器件",
        companies: [
          { /* code: "300308" */ name: "中际旭创", highlight: "800G相干光模块出货全球第一，已向头部云厂商批量交付" },
          { /* code: "301281" */ name: "华工科技", highlight: "光芯片+激光器垂直整合，25G/100G DFB激光芯片国产替代" },
          { /* code: "002241" */ name: "歌尔股份", highlight: "射频天线+声学模块，5G终端射频前端配套能力强" },
          { /* code: "300366" */ name: "展鹏科技", highlight: "滤波器/腔体器件，5G基站滤波器国产供应链重要一环" }
        ]
      }
    ],
    midstream: [
      {
        name: "基站/传输设备",
        companies: [
          { /* code: "000063" */ name: "中兴通讯", highlight: "5G基站全球出货量前三，5G-A Massive MIMO商用领先" },
          { /* code: "600522" */ name: "中天科技", highlight: "光纤光缆+特种电缆，5G基站光缆配套出货持续增长" },
          { /* code: "600522" */ name: "亨通光电", highlight: "海底光缆+陆地光纤，5G+海洋通信双主线布局" }
        ]
      },
      {
        name: "网络设备/交换机",
        companies: [
          { /* code: "300308" */ name: "中际旭创", highlight: "400G/800G数通光模块，超大规模数据中心组网核心" },
          { /* code: "000400" */ name: "许继电气", highlight: "电力通信设备+电网数字化，电力系统5G专网配套" },
          { /* code: "002552" */ name: "共进股份", highlight: "运营商家庭网关+光猫，5G CPE出货量国内居前" }
        ]
      }
    ],
    downstream: [
      {
        name: "运营商/基础网络",
        companies: [
          { /* code: "601728" */ name: "中国电信", highlight: "5G-A商用启动，算网融合战略，IDC+云收入增速超30%" },
          { /* code: "600050" */ name: "中国联通", highlight: "5G共建共享节省资本开支，算力网络布局加速" },
          { /* code: "601939" */ name: "建设银行", highlight: "金融机构5G专网+金融科技，数字化网点5G覆盖深度推进" }
        ]
      },
      {
        name: "卫星通信/行业应用",
        companies: [
          { /* code: "600536" */ name: "中国软件", highlight: "卫星互联网地面系统软件，北斗+低轨卫星核心配套" },
          { /* code: "300595" */ name: "欧比特", highlight: "微纳卫星制造+对地遥感，商业航天通信布局先行" },
          { /* code: "002179" */ name: "中航光电", highlight: "星载连接器+军民两用光电互联，卫星通信关键器件" }
        ]
      }
    ]
  },

  // ========== IT服务 ==========
  "IT服务": {
    name: "IT服务",
    color: "#7c3aed",
    gradient: ["#7c3aed", "#4c1d95"],
    description: "IT服务产业链从基础软件平台、行业解决方案到运维外包与云服务，是数字经济的核心使能层，AI大模型与国产化替代双轮驱动，政务、金融、医疗等行业信息化建设持续投入。",
    upstream: [
      {
        name: "基础软件/操作系统",
        companies: [
          { /* code: "600536" */ name: "中国软件", highlight: "麒麟操作系统+中间件，央企信创核心供应商，政府装机率第一" },
          { /* code: "300496" */ name: "中科曙光", highlight: "高性能计算+国产操作系统，科研+政务信创整体方案" },
          { /* code: "002472" */ name: "双星新材", highlight: "国产化IT基础设施，信创替代受益标的" },
          { /* code: "002421" */ name: "达实智能", highlight: "楼宇操作系统+智慧建筑，AI物联网平台软件收入高增" }
        ]
      },
      {
        name: "数据库/中间件",
        companies: [
          { /* code: "300033" */ name: "同花顺", highlight: "金融数据库+AI大模型，iFinD金融数据平台国内市占第一" },
          { /* code: "300711" */ name: "广州人力", highlight: "企业中间件+人力资源系统，数字化转型整体服务商" },
          { /* code: "300198" */ name: "纳思达", highlight: "打印机芯片+国产办公软件，信创国产化替代整体解决方案" }
        ]
      }
    ],
    midstream: [
      {
        name: "行业解决方案",
        companies: [
          { /* code: "600588" */ name: "用友网络", highlight: "金融+政务+制造ERP，AI大模型BIP平台订阅收入增速超40%" },
          { /* code: "002410" */ name: "广联达", highlight: "工程造价数字化龙头，SAAS化转型完成，订阅收入占比超60%" },
          { /* code: "300271" */ name: "华宇软件", highlight: "法院+检察院+公安数字化，司法AI大模型落地深度行业第一" },
          { /* code: "002502" */ name: "软通动力", highlight: "IT外包+数字化咨询，大模型落地大企业客户能力强" }
        ]
      },
      {
        name: "云计算/SaaS",
        companies: [
          { /* code: "603217" */ name: "元道通信", highlight: "云联网+SD-WAN，政企混合云接入服务商" },
          { /* code: "300033" */ name: "同花顺", highlight: "金融SAAS+AI大模型，iFinD数据终端月活超百万用户" },
          { /* code: "002065" */ name: "东华软件", highlight: "医疗+政务信息化，医院HIS系统市占率国内前三" }
        ]
      }
    ],
    downstream: [
      {
        name: "数字政府/智慧城市",
        companies: [
          { /* code: "002387" */ name: "维宏股份", highlight: "工业软件+数控系统，制造业信创化替代进程加速" },
          { /* code: "300168" */ name: "万达信息", highlight: "智慧医疗+城市云平台，地方政府数字化大客户壁垒深" },
          { /* code: "002682" */ name: "龙洲股份", highlight: "智慧城市IT运营服务，政务云+数字城管整体解决方案" }
        ]
      },
      {
        name: "金融科技/企服",
        companies: [
          { /* code: "300015" */ name: "东方财富", highlight: "金融互联网平台+基金代销，金融科技核心入口，用户超1亿" },
          { /* code: "300136" */ name: "信维通信", highlight: "金融终端+POS机天线，银行数字化终端核心供应商" },
          { /* code: "002642" */ name: "荣联科技", highlight: "金融行业IT外包，保险+银行核心系统实施运维龙头" }
        ]
      }
    ]
  },

  // ========== 元件 ==========
  "元件": {
    name: "元件",
    color: "#ea580c",
    gradient: ["#ea580c", "#7c2d12"],
    description: "电子元件产业链包括电阻电容电感等被动元件、连接器、PCB印刷电路板及MLCC等核心基础器件，是电子信息产业的基石，AI服务器与新能源汽车需求双驱动，国产替代空间巨大。",
    upstream: [
      {
        name: "基础原材料",
        companies: [
          { /* code: "002436" */ name: "兴森科技", highlight: "PCB用铜箔基板核心材料，AI服务器高频高速PCB配套" },
          { /* code: "600183" */ name: "生益科技", highlight: "覆铜板龙头，AI/5G用高频高速覆铜板市占率国内第一" },
          { /* code: "300682" */ name: "朗特智能", highlight: "MLCC介质陶瓷粉体，中高端MLCC国产化核心材料" },
          { /* code: "300655" */ name: "晶瑞电材", highlight: "电子级硅烷+湿电子化学品，元件生产精密清洗及蚀刻配套" }
        ]
      },
      {
        name: "MLCC/电容材料",
        companies: [
          { /* code: "603659" */ name: "璞泰来", highlight: "PVDF压电薄膜，MLCC及功率器件封装用导热材料" },
          { /* code: "300282" */ name: "四方达", highlight: "陶瓷基板，MLCC与功率模块衬底材料国产化进展加速" },
          { /* code: "002436" */ name: "兴森科技", highlight: "高频高速PCB基材，MLCC载板配套生产能力领先" }
        ]
      }
    ],
    midstream: [
      {
        name: "MLCC/电容电感",
        companies: [
          { /* code: "000636" */ name: "风华高科", highlight: "国内MLCC龙头，AI服务器用高压MLCC份额快速提升" },
          { /* code: "002138" */ name: "顺络电子", highlight: "片式电感+功率电感龙头，AI服务器单台用量大幅增加" },
          { /* code: "300054" */ name: "鼎龙股份", highlight: "MLCC用抛光材料，AI算力+储能双赛道受益标的" }
        ]
      },
      {
        name: "连接器/PCB",
        companies: [
          { /* code: "002390" */ name: "信邦智能", highlight: "高速连接器精密端子，AI服务器背板连接器核心供应商" },
          { /* code: "002916" */ name: "深南电路", highlight: "高端PCB龙头，AI服务器HDI+高速背板PCB旗舰产品" },
          { /* code: "600183" */ name: "生益科技", highlight: "覆铜板龙头，AI/5G用高频高速覆铜板市占率国内第一" },
          { /* code: "002388" */ name: "新亚制程", highlight: "精密连接器，消费电子+汽车电子连接器出货量高增" }
        ]
      }
    ],
    downstream: [
      {
        name: "AI服务器/通信",
        companies: [
          { /* code: "000977" */ name: "浪潮信息", highlight: "AI服务器单台MLCC/电感用量是普通服务器3-5倍，带动元件需求暴增" },
          { /* code: "000063" */ name: "中兴通讯", highlight: "5G基站用高频MLCC+连接器，国产元件替代比例持续提升" },
          { /* code: "002241" */ name: "歌尔股份", highlight: "消费电子元件精密组装，MLCC+连接器一体化供应链管理" }
        ]
      },
      {
        name: "新能源/汽车电子",
        companies: [
          { /* code: "002594" */ name: "比亚迪", highlight: "新能源汽车每辆用MLCC超3000颗，带动车规级元件需求飙升" },
          { /* code: "300750" */ name: "宁德时代", highlight: "BMS+电池管理电路大量采购车规级电容电感，用量行业最大" },
          { /* code: "600741" */ name: "华域汽车", highlight: "汽车电子PCBA集成，车规连接器+元件集成供应能力强" }
        ]
      }
    ]
  },

  // ========== AI应用 ==========
  "AI应用": {
    name: "AI应用",
    color: "#f59e0b",
    gradient: ["#f59e0b", "#78350f"],
    description: "AI应用产业链以大模型为核心引擎，覆盖教育、医疗、金融、办公、安防、营销等各垂直行业的智能化落地，AIGC内容生成与AI Agent自主决策是当前最快商业化的两条主线。",
    upstream: [
      {
        name: "大模型/基础能力",
        companies: [
          { /* code: "002230" */ name: "科大讯飞", highlight: "星火大模型V4.0，语音识别准确率全球第一，教育+医疗垂直落地最快" },
          { /* code: "300418" */ name: "昆仑万维", highlight: "天工大模型+天工AI搜索日活超百万，海外AGI布局走在A股前列" },
          { /* code: "603139" */ name: "海量数据", highlight: "AI训练数据标注与清洗，大模型数据供应商营收高增超50%" },
          { /* code: "002371" */ name: "北方华创", highlight: "国产半导体设备为大模型训练芯片制造提供算力底座，替代英伟达核心标的" }
        ]
      },
      {
        name: "AI开发平台/工具链",
        companies: [
          { /* code: "600588" */ name: "用友网络", highlight: "BIP企业AI平台，大模型应用开发工具订阅收入增速超40%" },
          { /* code: "002410" */ name: "广联达", highlight: "工程行业AI平台，建筑全生命周期AI化推进，SaaS化转型深度受益" },
          { /* code: "300033" */ name: "同花顺", highlight: "金融AI大模型平台，量化策略生成+研报自动解读商业化落地" }
        ]
      }
    ],
    midstream: [
      {
        name: "垂直行业AI应用",
        companies: [
          { /* code: "002065" */ name: "东华软件", highlight: "医疗影像AI辅助诊断，医院HIS+AI大模型融合，辅助诊断准确率超90%" },
          { /* code: "300271" */ name: "华宇软件", highlight: "司法AI大模型，法院+检察院案件智能辅助办案，落地数量A股第一" },
          { /* code: "002236" */ name: "大华股份", highlight: "AIoT视频智能，AI视频分析订单同比增长超60%，千行百业规模覆盖" },
          { /* code: "002415" */ name: "海康威视", highlight: "AI+物联网行业龙头，大模型赋能安防+工业检测，营收规模行业第一" },
          { /* code: "300168" */ name: "万达信息", highlight: "智慧医疗+城市AI大脑，政府端AI应用落地深度领先" }
        ]
      },
      {
        name: "AIGC/内容生成",
        companies: [
          { /* code: "300418" */ name: "昆仑万维", highlight: "天工AI绘画+视频生成，AIGC商业变现路径最清晰，海外Starchain战略推进" },
          { /* code: "603444" */ name: "吉比特", highlight: "AI+游戏，AI生成游戏内容降本50%以上，AI NPC落地商业验证完成" },
          { /* code: "002292" */ name: "奥飞娱乐", highlight: "IP+AIGC内容生产，AI短剧+虚拟偶像商业化试水，内容成本大幅降低" },
          { /* code: "002502" */ name: "软通动力", highlight: "企业AIGC内容生产平台，游戏美术+营销素材AI化降本超50%" }
        ]
      }
    ],
    downstream: [
      {
        name: "AI Agent/自主决策",
        companies: [
          { /* code: "002230" */ name: "科大讯飞", highlight: "讯飞AI Agent在教育场景实现自主出题-批改-辅导闭环，日活用户超500万" },
          { /* code: "300033" */ name: "同花顺", highlight: "AI投研Agent，自动生成研报+个股分析报告，机构客户渗透率快速提升" },
          { /* code: "300738" */ name: "奥飞数据", highlight: "AI运维Agent，数据中心自动化运营决策，人工干预率降低70%" },
          { /* code: "002502" */ name: "软通动力", highlight: "企业级AI Agent开发部署，头部客户自动化流程RPA+AI一体化" }
        ]
      },
      {
        name: "AI营销/办公/教育",
        companies: [
          { /* code: "300766" */ name: "每日互动", highlight: "AI营销数据平台，精准推送模型迭代，广告主ROI提升30%以上" },
          { /* code: "002539" */ name: "云图控股", highlight: "AI+数字营销，大模型赋能广告创意生成，投放效率行业领先" },
          { /* code: "300484" */ name: "蓝色光标", highlight: "全面拥抱AI营销，AIGC内容生产成本降低60%，营销自动化客户快速增长" },
          { /* code: "002253" */ name: "川大智胜", highlight: "AI教育+人脸识别，智慧校园AI解决方案收入持续高增" }
        ]
      }
    ]
  },

  // ========== 算力租赁 ==========
  "算力租赁": {
    name: "算力租赁",
    color: "#0891b2",
    gradient: ["#06b6d4", "#164e63"],
    description: "算力租赁将GPU集群、智算中心等稀缺算力以按需、包月或裸金属等形式交付给大模型训练推理、AIGC、渲染与科研客户，是连接上游芯片/服务器与下游AI应用的“算力即服务”核心环节。",
    upstream: [
      {
        name: "AI加速芯片/GPU",
        companies: [
          { /* code: "300458" */ name: "全志科技", highlight: "端侧视觉AI SoC与智能盒子芯片，边缘推理算力在智能硬件场景持续放量" },
          { /* code: "002049" */ name: "紫光国微", highlight: "特种FPGA与安全芯片龙头，智算与信创场景高端算力与安全信任根需求旺盛" },
          { /* code: "300474" */ name: "景嘉微", highlight: "国产GPU迭代与生态建设，特种+民用图形与算力芯片双线推进" },
          { /* code: "300223" */ name: "北京君正", highlight: "存储+计算一体化车规与工业SoC，AIoT边缘侧算力芯片与模组出货增长" }
        ]
      },
      {
        name: "AI服务器/高速互联",
        companies: [
          { /* code: "000977" */ name: "浪潮信息", highlight: "AI服务器全球头部ODM，智算中心整机柜交付能力支撑租赁侧扩容" },
          { /* code: "601138" */ name: "工业富联", highlight: "英伟达AI服务器代工核心，云厂商与租赁商上游整机供给主力" },
          { /* code: "603019" */ name: "中科曙光", highlight: "国产高端服务器+液冷方案，智算中心与央国企算力租赁项目常客" },
          { /* code: "300308" */ name: "中际旭创", highlight: "800G光模块龙头，智算集群机柜间光互联带宽决定租赁集群规模上限" }
        ]
      },
      {
        name: "机房电力/制冷",
        companies: [
          { /* code: "002518" */ name: "科士达", highlight: "UPS与数据中心供配电，高密度GPU机柜供电可靠性需求旺盛" },
          { /* code: "002837" */ name: "英维克", highlight: "精密温控+液冷全链条，智算中心PUE优化直接降低租赁商运营成本" },
          { /* code: "300499" */ name: "高澜股份", highlight: "冷板式与浸没液冷工程，适配高功耗GPU集群的散热方案" }
        ]
      }
    ],
    midstream: [
      {
        name: "IDC/智算中心运营",
        companies: [
          { /* code: "300442" */ name: "润泽科技", highlight: "园区级智算与IDC资源储备大，批发型客户中含头部云与算力租赁需求" },
          { /* code: "603881" */ name: "数据港", highlight: "阿里云核心数据中心合作方，公有云算力外延与合建智算项目经验丰富" },
          { /* code: "300383" */ name: "光环新网", highlight: "北京及周边IDC+云计算，面向企业与大模型客户的算力托管与租赁服务" },
          { /* code: "300738" */ name: "奥飞数据", highlight: "华南及海外节点扩张，GPU智算机柜上架率与租赁单价弹性大" }
        ]
      },
      {
        name: "云算力/裸金属平台",
        companies: [
          { /* code: "300846" */ name: "首都在线", highlight: "全球云主机+GPU云算力产品线，中小客户与出海场景弹性租赁主力" },
          { /* code: "002368" */ name: "太极股份", highlight: "政务与行业云平台建设运营，混合云场景下算力资源统一纳管与项目化交付" },
          { /* code: "000034" */ name: "神州数码", highlight: "IT分销龙头+神州鲲泰信创服务器，公有云与GPU算力转售及渠道交付能力强" },
          { /* code: "300496" */ name: "中科创达", highlight: "边缘与车载软件栈，与云侧算力协同的端云一体方案商" }
        ]
      },
      {
        name: "集成/运维与安全",
        companies: [
          { /* code: "002929" */ name: "润建股份", highlight: "通信网络+IDC运维+智算中心建设一体化，多地智算园区总包与代运营" },
          { /* code: "603887" */ name: "城地香江", highlight: "转型IDC与算力服务，智算中心投运后租赁收入占比快速提升" },
          { /* code: "300454" */ name: "深信服", highlight: "超融合与云上安全，智算租户隔离、东西向流量防护刚需" }
        ]
      }
    ],
    downstream: [
      {
        name: "大模型/AIGC 客户",
        companies: [
          { /* code: "002230" */ name: "科大讯飞", highlight: "星火大模型训练与推理算力消耗大，自建+租赁混合模式降本" },
          { /* code: "300418" */ name: "昆仑万维", highlight: "天工系列与多模态应用，海外与境内GPU租赁弹性扩缩容" },
          { /* code: "300624" */ name: "万兴科技", highlight: "AIGC创意软件全球化，峰值渲染与推理算力外包租赁需求高" },
          { /* code: "300229" */ name: "拓尔思", highlight: "政务与媒体大数据+NLP平台，行业大模型训练与知识工程拉动智算租用需求" }
        ]
      },
      {
        name: "金融科技/互联网",
        companies: [
          { /* code: "300033" */ name: "同花顺", highlight: "金融大模型与量化回测，行情高峰时段GPU算力短时租赁需求突出" },
          { /* code: "600588" */ name: "用友网络", highlight: "企业级AI应用与行业大模型落地，混合云算力采购与租赁并存" },
          { /* code: "002602" */ name: "世纪华通", highlight: "游戏+AIGC内容管线，云渲染与AI NPC推理算力租赁降本" }
        ]
      },
      {
        name: "科研/教育/垂直场景",
        companies: [
          { /* code: "600718" */ name: "东软集团", highlight: "医疗与教育信息化大项目，共建智算中心与算力服务采购需求稳定" },
          { /* code: "300166" */ name: "东方国信", highlight: "工业大数据与机理模型训练，私有化+公有云算力租赁组合交付" },
          { /* code: "300634" */ name: "彩讯股份", highlight: "企业邮箱与协同办公智能化，邮件大模型推理算力外包增长" }
        ]
      }
    ]
  }

};

// 关键词映射（支持模糊匹配）
const KEYWORD_MAP = {
  "半导体": "半导体",
  "芯片": "半导体",
  "集成电路": "半导体",
  "晶圆": "半导体",
  "算力租赁": "算力租赁",
  "GPU租赁": "算力租赁",
  "智算租赁": "算力租赁",
  "裸金属算力": "算力租赁",
  "云GPU": "算力租赁",
  "弹性算力": "算力租赁",
  "AI算力": "AI算力",
  "算力": "AI算力",
  "GPU": "AI算力",
  "数据中心": "AI算力",
  "新能源汽车": "新能源汽车",
  "电动汽车": "新能源汽车",
  "新能源车": "新能源汽车",
  "EV": "新能源汽车",
  "光伏": "光伏",
  "太阳能": "光伏",
  "组件": "光伏",
  "人工智能": "人工智能",
  "AI": "人工智能",
  "大模型": "人工智能",
  "锂电池": "锂电池",
  "动力电池": "锂电池",
  "储能": "锂电池",
  "消费电子": "消费电子",
  "手机": "消费电子",
  "智能硬件": "消费电子",
  "机器人": "机器人",
  "人形机器人": "机器人",
  "工业机器人": "机器人",
  "液冷": "液冷",
  "散热": "液冷",
  "浸没式": "液冷",
  "冷板": "液冷",
  "数据中心冷却": "液冷",
  "通讯设备": "通讯设备",
  "通信设备": "通讯设备",
  "5G": "通讯设备",
  "基站": "通讯设备",
  "光模块": "通讯设备",
  "卫星通信": "通讯设备",
  "IT服务": "IT服务",
  "信息技术": "IT服务",
  "软件": "IT服务",
  "信创": "IT服务",
  "数字化": "IT服务",
  "SaaS": "IT服务",
  "元件": "元件",
  "电子元件": "元件",
  "MLCC": "元件",
  "电容": "元件",
  "连接器": "元件",
  "PCB": "元件",
  "被动元件": "元件",
  "AI应用": "AI应用",
  "AIGC": "AI应用",
  "AI Agent": "AI应用",
  "大模型应用": "AI应用",
  "智能应用": "AI应用",
  "AI落地": "AI应用",
  "垂直AI": "AI应用"
};

// 搜索行业数据
function searchIndustry(query) {
  const trimmed = query.trim();
  // 精确匹配
  if (INDUSTRY_DATA[trimmed]) return INDUSTRY_DATA[trimmed];
  // 关键词映射
  for (const [keyword, industryKey] of Object.entries(KEYWORD_MAP)) {
    if (trimmed.includes(keyword) || keyword.includes(trimmed)) {
      return INDUSTRY_DATA[industryKey];
    }
  }
  return null;
}