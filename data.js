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
          { name: "鼎龙股份", highlight: "CMP抛光垫国内市占率第一，半导体IC封装用干膜持续放量" },
          { name: "新易盛", highlight: "光电子材料+半导体光学器件，下游覆盖主流晶圆厂" },
          { name: "北摩高科", highlight: "电子特气关键原材料，CVD/ALD工艺用高纯气体国产化" },
          { name: "生益科技", highlight: "覆铜板龙头，半导体封装基板核心材料，国内市占率第一" }
        ]
      },
      {
        name: "半导体设备",
        companies: [
          { name: "北方华创", highlight: "刻蚀机+CVD设备龙头，国内半导体设备市占率第一，先进制程攻关领先" },
          { name: "卓胜微", highlight: "射频前端芯片，5G手机滤波器+LNA国产替代领军" },
          { name: "汇川技术", highlight: "运动控制设备，半导体设备核心驱控零部件供应商" },
          { name: "拓尔思", highlight: "刻蚀机配套零部件，半导体设备国产化受益标的" }
        ]
      }
    ],
    midstream: [
      {
        name: "芯片设计（Fabless）",
        companies: [
          { name: "紫光国微", highlight: "安全芯片+FPGA龙头，国密芯片市场份额第一，军工信创双赛道" },
          { name: "卓胜微", highlight: "射频芯片龙头，5G手机渗透率快速提升，海外出货量高增" },
          { name: "深南电路", highlight: "高密度封装基板，芯片设计配套先进封装基板龙头" },
          { name: "士兰微", highlight: "IDM模式功率+射频+MEMS，碳化硅器件加速放量，车规认证完成" }
        ]
      },
      {
        name: "晶圆制造（IDM/Foundry）",
        companies: [
          { name: "士兰微", highlight: "IDM模式，功率+射频+MEMS多元布局，车规级产品放量" },
          { name: "京东方A", highlight: "半导体显示晶圆级制造，OLED+Mini LED产能全球第一" },
          { name: "通富微电", highlight: "Chiplet先进封装，承接AMD/英特尔晶圆级封装订单" }
        ]
      }
    ],
    downstream: [
      {
        name: "封装测试",
        companies: [
          { name: "通富微电", highlight: "Chiplet先进封装，AMD重要合作伙伴，营收超百亿" },
          { name: "华天科技", highlight: "传统封测+先进封装，车规级封测需求旺盛" },
          { name: "上海贝岭", highlight: "模拟芯片+混合信号IC，工控与汽车电子双轮驱动" }
        ]
      },
      {
        name: "终端应用",
        companies: [
          { name: "京东方A", highlight: "面板龙头，半导体显示+传感器全面布局" },
          { name: "紫光国微", highlight: "安全芯片+FPGA，国密芯片市场份额领先，军工信创双赛道" },
          { name: "海康威视", highlight: "AI推理芯片应用龙头，云端+边缘端AI视觉芯片大规模部署" }
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
          { name: "紫光国微", highlight: "国产FPGA+AI加速芯片，可编程算力芯片国产替代领军" },
          { name: "卓胜微", highlight: "高速射频芯片，AI服务器前端信号处理核心器件" },
          { name: "中国软件", highlight: "国产操作系统麒麟/统信生态核心，AI算力国产化软件栈" },
          { name: "领益智造", highlight: "英伟达AI服务器散热组件核心供应商，液冷+风冷双方案覆盖" }
        ]
      },
      {
        name: "高速互联/存储",
        companies: [
          { name: "中际旭创", highlight: "800G光模块全球龙头，AI数据中心光互联核心，1.6T产品已送样" },
          { name: "顺络电子", highlight: "高频电感磁性元件龙头，AI服务器磁性器件需求激增" },
          { name: "辰奕智能", highlight: "高速连接器+背板互联，AI服务器机柜级互联核心供应商" }
        ]
      }
    ],
    midstream: [
      {
        name: "服务器/整机",
        companies: [
          { name: "浪潮信息", highlight: "AI服务器出货量全球前三，英伟达H100/H800主要ODM合作方" },
          { name: "荣联科技", highlight: "AI整机柜交付能力，国内头部云厂商核心供应商" },
          { name: "许继电气", highlight: "数据中心配电方案，大功率AI机柜供电及液冷配电整合" }
        ]
      },
      {
        name: "光模块/网络",
        companies: [
          { name: "中际旭创", highlight: "800G光模块出货量全球第一，已送样1.6T产品" },
          { name: "华工科技", highlight: "光芯片+光器件垂直整合，25G/100G DFB激光芯片国产替代" },
          { name: "光迅科技", highlight: "光器件+光模块龙头，10G/100G/400G数通模块批量供货云计算客户" }
        ]
      }
    ],
    downstream: [
      {
        name: "数据中心/IDC",
        companies: [
          { name: "光环新网", highlight: "北京核心数据中心运营商，AI算力租赁业务快速扩张" },
          { name: "大华股份", highlight: "AIoT端侧算力，智慧城市+AI视频分析" },
          { name: "中孚实业", highlight: "绿电+IDC战略布局，算力租赁切入AI基础设施赛道" }
        ]
      },
      {
        name: "大模型/AI应用",
        companies: [
          { name: "闻泰科技", highlight: "AI手机ODM龙头，端侧AI推理芯片集成方案" },
          { name: "科大讯飞", highlight: "星火大模型，教育+医疗+办公AI应用商业化落地" },
          { name: "华宇软件", highlight: "AI大模型行业落地，司法+政务AI辅助系统商业化领先" }
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
          { name: "天齐锂业", highlight: "全球最大锂矿开采商之一，参股SQM锂矿资产，碳酸锂弹性极大" },
          { name: "赣锋锂业", highlight: "锂资源+固态锂电池双主业，固态电池全球量产进程最快" },
          { name: "当升科技", highlight: "高镍三元正极材料龙头，欧洲大客户开拓顺利，出货量高增" },
          { name: "恩捷股份", highlight: "锂电隔膜全球市占率超30%，湿法隔膜绝对龙头，盈利稳居第一" }
        ]
      },
      {
        name: "电芯/动力电池",
        companies: [
          { name: "宁德时代", highlight: "全球动力电池装机量第一，麒麟电池+钠离子电池技术引领" },
          { name: "TCL中环", highlight: "光伏硅片+车规级功率器件，新能源双赛道布局" },
          { name: "亿纬锂能", highlight: "大圆柱+软包电池海外订单充沛，储能市场快速增长" }
        ]
      }
    ],
    midstream: [
      {
        name: "核心零部件",
        companies: [
          { name: "汇川技术", highlight: "新能源汽车电机驱动+电控龙头，市占率国内第一" },
          { name: "美亚光电", highlight: "锂电分选+色选机，电芯品质检测设备领先" },
          { name: "华域汽车", highlight: "汽车零部件龙头，电动化+智能化转型加速" },
          { name: "比亚迪", highlight: "整车+电池+芯片一体化，全球新能源汽车销量冠军" }
        ]
      },
      {
        name: "智能驾驶/座舱",
        companies: [
          { name: "德赛西威", highlight: "智能座舱域控制器龙头，舱驾一体化方案规模量产" },
          { name: "豪迈科技", highlight: "车载传感器精密制造，自动驾驶感知系统配套能力强" },
          { name: "新易盛", highlight: "激光雷达用光模块及组件，自动驾驶光学方案供应商" }
        ]
      }
    ],
    downstream: [
      {
        name: "整车制造",
        companies: [
          { name: "比亚迪", highlight: "月销超40万辆，海外出口持续增长，垂直整合优势突出" },
          { name: "上汽集团", highlight: "传统整车龙头转型新能源，MG品牌海外热销" },
          { name: "赛力斯", highlight: "问界M9销量爆发，与华为深度合作的智选车标杆" }
        ]
      },
      {
        name: "充电桩/服务",
        companies: [
          { name: "台基股份", highlight: "大功率充电桩模块，液冷超充技术领先，高压快充核心器件" },
          { name: "亿纬锂能", highlight: "动力+储能双轮驱动，大圆柱电池海外出货放量" },
          { name: "宁德时代", highlight: "换电服务+大储系统，新能源出行配套完整生态" }
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
          { name: "隆基绿能", highlight: "全球最大单晶硅片+电池组件厂商，BC电池引领下一代技术" },
          { name: "TCL中环", highlight: "N型硅片出货量快速提升，单晶炉设备持续扩产" },
          { name: "通威股份", highlight: "多晶硅产能全球第一，兼具电池片龙头地位，一体化优势显著" }
        ]
      },
      {
        name: "辅材/设备",
        companies: [
          { name: "欣旺达", highlight: "储能电池+光伏配储，光储一体化解决方案" },
          { name: "捷佳伟创", highlight: "TOPCon/HJT电池设备龙头，N型电池设备市占率居前" },
          { name: "TCL中环", highlight: "大尺寸单晶硅片，光伏电池效率持续提升的核心原材料" }
        ]
      }
    ],
    midstream: [
      {
        name: "电池片/组件",
        companies: [
          { name: "晶澳科技", highlight: "TOPCon电池全球出货量前三，海外市场持续开拓" },
          { name: "天合光能", highlight: "组件出货量全球前三，分布式光伏+储能系统加速布局" },
          { name: "TCL中环", highlight: "N型大尺寸硅片龙头，单晶硅片全球市占率前二" }
        ]
      },
      {
        name: "逆变器",
        companies: [
          { name: "阳光电源", highlight: "全球逆变器出货量第一，储能系统快速增长超预期" },
          { name: "正泰电器", highlight: "逆变器+开关元件+光伏全产业链，国内渠道为王" },
          { name: "固德威", highlight: "家用储能逆变器出货量快速增长，欧洲市场持续扩大" }
        ]
      }
    ],
    downstream: [
      {
        name: "光伏电站/EPC",
        companies: [
          { name: "节能风电", highlight: "风光储一体电站运营商，清洁能源资产持续扩张" },
          { name: "太阳能", highlight: "集中式光伏电站运营龙头，装机量持续创新高" },
          { name: "三峡能源", highlight: "海上风电+光伏电站，清洁能源央企龙头" }
        ]
      },
      {
        name: "储能/配套",
        companies: [
          { name: "宁德时代", highlight: "大储系统全球市占率第一，天合储能+天弈储能双品牌" },
          { name: "欣旺达", highlight: "储能电芯+PACK，工商业储能快速放量" },
          { name: "协鑫科技", highlight: "颗粒硅低成本优势突出，光伏电站配套储能布局加速" }
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
          { name: "北方华创", highlight: "国内半导体设备龙头，AI算力芯片制造关键设备供应商" },
          { name: "浪潮信息", highlight: "全球AI服务器出货量前三，英伟达最大ODM合作伙伴" },
          { name: "中际旭创", highlight: "800G光模块龙头，AI数据中心光互联核心基础设施" }
        ]
      },
      {
        name: "AI框架/工具链",
        companies: [
          { name: "四维图新", highlight: "高精地图+车路协同数据，L4自动驾驶AI训练数据底座" },
          { name: "用友网络", highlight: "企业AI大模型BIP平台，数字化转型深度受益" },
          { name: "汇川技术", highlight: "工业AI+运动控制，机器人+工控场景AI渗透率快速提升" }
        ]
      }
    ],
    midstream: [
      {
        name: "大模型/基础模型",
        companies: [
          { name: "科大讯飞", highlight: "星火大模型V4.0，语音识别准确率全球领先，垂直落地最快" },
          { name: "海量数据", highlight: "AI训练数据标注与清洗，大模型数据供应商营收持续高增" },
          { name: "昆仑万维", highlight: "天工大模型+海外AGI布局，AI应用矩阵变现能力强" }
        ]
      },
      {
        name: "AI平台/中台",
        companies: [
          { name: "同花顺", highlight: "金融AI大模型，iFinD数据平台月活用户持续增长" },
          { name: "软通动力", highlight: "AI+数字化服务，大模型落地大型企业客户能力强" },
          { name: "东华软件", highlight: "医疗+政务AI平台，行业大模型落地医院场景覆盖广" }
        ]
      }
    ],
    downstream: [
      {
        name: "AI应用（各垂直行业）",
        companies: [
          { name: "大华股份", highlight: "AIoT视频智能，AI视频分析订单大幅增长" },
          { name: "华宇软件", highlight: "法院+检察院AI大模型应用，司法AI落地深度行业第一" },
          { name: "海康威视", highlight: "AI+物联网行业龙头，大模型赋能安防+工业检测，营收规模行业第一" }
        ]
      },
      {
        name: "AIGC/生成式AI",
        companies: [
          { name: "昆仑万维", highlight: "天工AI搜索日活突破百万，AIGC商业化路径最清晰" },
          { name: "奥飞数据", highlight: "IDC算力+AIGC内容基础设施，AI内容消费基础设施运营商" },
          { name: "蓝色光标", highlight: "全面拥抱AI营销，AIGC内容生产成本降低60%，营销自动化快速增长" }
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
          { name: "天齐锂业", highlight: "锂矿资产全球顶级，参股SQM，碳酸锂价格回升弹性极大" },
          { name: "赣锋锂业", highlight: "固态锂电池全球量产进程最快，海外矿山资产丰富" },
          { name: "北方稀土", highlight: "稀土永磁材料龙头，钕铁硼永磁体新能源汽车电机核心供应商" }
        ]
      },
      {
        name: "正负极/隔膜/电解液",
        companies: [
          { name: "当升科技", highlight: "高镍NCM正极材料龙头，欧洲客户开拓顺利，出货量高增" },
          { name: "恩捷股份", highlight: "湿法隔膜全球市占率超35%，盈利能力稳居行业第一" },
          { name: "天赐材料", highlight: "电解液龙头，LiFSI添加剂技术领先，配套宁德时代为主" }
        ]
      }
    ],
    midstream: [
      {
        name: "电芯制造",
        companies: [
          { name: "宁德时代", highlight: "全球动力电池装机量第一，麒麟电池能量密度突破255Wh/kg" },
          { name: "亿纬锂能", highlight: "大圆柱+软包电池海外订单充沛，储能市场快速增长" },
          { name: "国轩高科", highlight: "磷酸铁锂电池，大众持股加持，出口欧洲战略推进" }
        ]
      },
      {
        name: "BMS/热管理",
        companies: [
          { name: "北方华创", highlight: "真空镀膜设备+刻蚀机，电池极片制造核心装备" },
          { name: "星源材质", highlight: "锂电池隔膜+铜箔，干法隔膜技术全球领先，盈利稳健" },
          { name: "立讯精密", highlight: "精密连接器+热管理部件，新能源汽车电池包配套能力强" }
        ]
      }
    ],
    downstream: [
      {
        name: "动力电池应用",
        companies: [
          { name: "比亚迪", highlight: "刀片电池自供+外销，安全性领先，乘用车市占持续扩大" },
          { name: "赛力斯", highlight: "问界系列装机宁德麒麟电池，单车带电量行业前列" },
          { name: "上汽集团", highlight: "智己+飞凡装机动力电池，海外出口电动化加速" }
        ]
      },
      {
        name: "储能应用",
        companies: [
          { name: "宁德时代", highlight: "天合储能+天弈储能，全球大储系统市占率第一" },
          { name: "欣旺达", highlight: "工商业储能PACK+BMS，装机量快速提升" },
          { name: "比亚迪", highlight: "储能系统BYD-ESS，光储一体方案全球销售" }
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
          { name: "紫光国微", highlight: "安全芯片+FPGA，手机SIM卡芯片国内市占超60%" },
          { name: "蓝思科技", highlight: "玻璃+金属盖板，苹果+华为双核心供应链" },
          { name: "歌尔股份", highlight: "TWS耳机+VR头显，苹果Vision Pro核心声学供应商" }
        ]
      },
      {
        name: "显示/摄像",
        companies: [
          { name: "京东方A", highlight: "全球OLED面板出货量前三，折叠屏面板国内市占第一" },
          { name: "立讯精密", highlight: "摄像头精密结构件+模组组装，苹果摄像头核心供应商" },
          { name: "蓝思科技", highlight: "摄像头玻璃盖板+镜片，苹果高端摄像头保护玻璃独家供应" }
        ]
      }
    ],
    midstream: [
      {
        name: "ODM/代工制造",
        companies: [
          { name: "闻泰科技", highlight: "手机ODM龙头+功率半导体，AI手机整合解决方案" },
          { name: "歌尔股份", highlight: "苹果核心供应商，AirPods出货量全球第一供应商" },
          { name: "蓝思科技", highlight: "苹果+华为+小米全覆盖，折叠屏铰链量产能力行业第一" }
        ]
      },
      {
        name: "结构件/精密制造",
        companies: [
          { name: "海天精工", highlight: "精密机床，消费电子外壳CNC加工核心装备" },
          { name: "立讯精密", highlight: "连接器+声学+无线，苹果核心供应商，AirPods/Watch核心制造" },
          { name: "歌尔股份", highlight: "精密声学+VR光学结构件，苹果/Meta核心供应链" }
        ]
      }
    ],
    downstream: [
      {
        name: "整机品牌",
        companies: [
          { name: "海康威视", highlight: "安防摄像头+智能门锁，消费级AIoT硬件市占领先" },
          { name: "世纪华通", highlight: "游戏+智能手机应用生态，消费电子软硬联动" },
          { name: "福耀玻璃", highlight: "AR眼镜光学镜片+车载HUD，新形态消费电子光学布局" }
        ]
      },
      {
        name: "零售渠道/电商",
        companies: [
          { name: "小商品城", highlight: "跨境电商平台+消费电子出口，义乌消费电子外贸枢纽" },
          { name: "光线传媒", highlight: "消费电子内容营销+IP联名，品牌推广核心渠道" },
          { name: "富瀚微", highlight: "视频安防SoC芯片龙头，智能摄像头AI芯片领域第一" }
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
          { name: "汇川技术", highlight: "伺服驱动+运动控制龙头，人形机器人关节电机核心供应商" },
          { name: "埃斯顿", highlight: "减速器+伺服系统，国内工业机器人核心零部件龙头" },
          { name: "双环传动", highlight: "精密减速器，特斯拉人形机器人供应商认证" }
        ]
      },
      {
        name: "传感器/感知",
        companies: [
          { name: "立讯精密", highlight: "力觉+触觉传感器精密组件，机器人感知系统关键配套" },
          { name: "春兴精工", highlight: "精密结构件+MEMS传感器封装，机器人末端执行器配套" },
          { name: "合力科技", highlight: "工业视觉检测系统，机器人3D视觉引导定位方案" }
        ]
      }
    ],
    midstream: [
      {
        name: "控制系统/算法",
        companies: [
          { name: "汇川技术", highlight: "PLC+运动控制，机器人大脑核心，AI化运动规划领先" },
          { name: "中科曙光", highlight: "机器人操作系统+高性能计算，工业AI一体化算法平台" },
          { name: "埃斯顿", highlight: "自主运动控制算法，焊接+搬运+装配机器人全场景覆盖" }
        ]
      },
      {
        name: "本体制造/集成",
        companies: [
          { name: "机器人（新松）", highlight: "国内工业机器人整机龙头，特种+服务机器人全赛道布局" },
          { name: "埃斯顿", highlight: "国产工业机器人出货量前三，汽车+3C行业应用居前" },
          { name: "玉禾田", highlight: "环卫机器人+服务机器人，室外场景自主作业商业化落地" }
        ]
      }
    ],
    downstream: [
      {
        name: "工业应用",
        companies: [
          { name: "协鑫集成", highlight: "光伏电池智能制造，机器人应用深度场景实践" },
          { name: "三一重工", highlight: "工程机械+挖掘机器人，建筑+矿山自动化深度布局" },
          { name: "隆基绿能", highlight: "光伏灯塔工厂，工业机器人应用量全国前列" }
        ]
      },
      {
        name: "服务/人形机器人",
        companies: [
          { name: "机器人（新松）", highlight: "服务机器人+AGV，医院+酒店场景商业化落地" },
          { name: "金力永磁", highlight: "高性能钕铁硼永磁体，人形机器人电机磁材核心供应商" },
          { name: "山河智能", highlight: "特种机器人+工程机械，应急救援+非开挖机器人" }
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
          { name: "巨化股份", highlight: "氟化工龙头，氟化液和氟化冷却介质生产，浸没液冷冷却剂核心供应商" },
          { name: "双良节能", highlight: "工业换热器龙头，数据中心液冷CDU换热核心设备供应商" },
          { name: "立昂技术", highlight: "导热硅脂+导热界面材料，GPU封装热管理关键辅材" },
          { name: "璞泰来", highlight: "导热石墨膜，高功率芯片散热界面材料国产化领先" }
        ]
      },
      {
        name: "泵/阀/管路",
        companies: [
          { name: "华东重机", highlight: "精密微型泵，液冷循环系统动力核心部件" },
          { name: "西部建设", highlight: "高精密铜铝管路，液冷管路配套加工能力" },
          { name: "泰尔股份", highlight: "工业级耐腐蚀阀门，数据中心液冷管路控制部件" }
        ]
      }
    ],
    midstream: [
      {
        name: "冷板/散热模组",
        companies: [
          { name: "华中数控", highlight: "精密CNC加工设备，AI服务器液冷冷板加工核心装备" },
          { name: "新雷能", highlight: "高效电源模块+热管理方案，AI服务器配套电源散热一体化" },
          { name: "亿田智能", highlight: "精密铜铝热管理器件，液冷冷板冲压成形核心供应商" },
          { name: "永福股份", highlight: "铜铝精密管道+冷板加工，液冷散热组件批量供货云厂商" }
        ]
      },
      {
        name: "浸没式/CDU系统",
        companies: [
          { name: "浩云科技", highlight: "机柜级浸没液冷整体方案，交付能力行业领先" },
          { name: "许继电气", highlight: "液冷供配电一体化方案，CDU+PDU整合交付大功率机柜" },
          { name: "金风科技", highlight: "大型冷却系统集成，工业级液冷系统技术积累深厚" }
        ]
      }
    ],
    downstream: [
      {
        name: "液冷服务器/整机",
        companies: [
          { name: "浪潮信息", highlight: "液冷AI服务器G7系列，支持H100/H800满负荷液冷散热，头部客户大批量发货" },
          { name: "郑煤机", highlight: "液冷机柜+高密度算力方案，矿用与数据中心双赛道布局" },
          { name: "中际旭创", highlight: "液冷光模块方案，800G高速光模块散热性能达行业最优" }
        ]
      },
      {
        name: "数据中心/IDC运营",
        companies: [
          { name: "光环新网", highlight: "液冷数据中心改造，PUE降至1.15以下，节能效益显著" },
          { name: "中孚实业", highlight: "绿电+液冷IDC，算力租赁业务切入AI基础设施赛道" },
          { name: "天融信", highlight: "数据中心安全运维+液冷环境监控，IDC全栈管理服务商" }
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
          { name: "卓胜微", highlight: "5G射频前端芯片龙头，滤波器+PA国产替代持续突破" },
          { name: "广和通", highlight: "通信模组龙头，NB-IoT/Cat.1/5G模组出货量行业领先" },
          { name: "全志科技", highlight: "IoT处理芯片，无线通信终端SoC出货量行业领先" },
          { name: "生益科技", highlight: "高频高速覆铜板，5G基站天线及毫米波天线核心材料" }
        ]
      },
      {
        name: "光器件/射频器件",
        companies: [
          { name: "中际旭创", highlight: "800G相干光模块出货全球第一，已向头部云厂商批量交付" },
          { name: "华工科技", highlight: "光芯片+激光器垂直整合，25G/100G DFB激光芯片国产替代" },
          { name: "歌尔股份", highlight: "射频天线+声学模块，5G终端射频前端配套能力强" },
          { name: "展鹏科技", highlight: "滤波器/腔体器件，5G基站滤波器国产供应链重要一环" }
        ]
      }
    ],
    midstream: [
      {
        name: "基站/传输设备",
        companies: [
          { name: "中兴通讯", highlight: "5G基站全球出货量前三，5G-A Massive MIMO商用领先" },
          { name: "中天科技", highlight: "光纤光缆+特种电缆，5G基站光缆配套出货持续增长" },
          { name: "亨通光电", highlight: "海底光缆+陆地光纤，5G+海洋通信双主线布局" }
        ]
      },
      {
        name: "网络设备/交换机",
        companies: [
          { name: "中际旭创", highlight: "400G/800G数通光模块，超大规模数据中心组网核心" },
          { name: "许继电气", highlight: "电力通信设备+电网数字化，电力系统5G专网配套" },
          { name: "共进股份", highlight: "运营商家庭网关+光猫，5G CPE出货量国内居前" }
        ]
      }
    ],
    downstream: [
      {
        name: "运营商/基础网络",
        companies: [
          { name: "中国电信", highlight: "5G-A商用启动，算网融合战略，IDC+云收入增速超30%" },
          { name: "中国联通", highlight: "5G共建共享节省资本开支，算力网络布局加速" },
          { name: "建设银行", highlight: "金融机构5G专网+金融科技，数字化网点5G覆盖深度推进" }
        ]
      },
      {
        name: "卫星通信/行业应用",
        companies: [
          { name: "中国软件", highlight: "卫星互联网地面系统软件，北斗+低轨卫星核心配套" },
          { name: "欧比特", highlight: "微纳卫星制造+对地遥感，商业航天通信布局先行" },
          { name: "中航光电", highlight: "星载连接器+军民两用光电互联，卫星通信关键器件" }
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
          { name: "中国软件", highlight: "麒麟操作系统+中间件，央企信创核心供应商，政府装机率第一" },
          { name: "中科曙光", highlight: "高性能计算+国产操作系统，科研+政务信创整体方案" },
          { name: "双星新材", highlight: "国产化IT基础设施，信创替代受益标的" },
          { name: "达实智能", highlight: "楼宇操作系统+智慧建筑，AI物联网平台软件收入高增" }
        ]
      },
      {
        name: "数据库/中间件",
        companies: [
          { name: "同花顺", highlight: "金融数据库+AI大模型，iFinD金融数据平台国内市占第一" },
          { name: "中科创达", highlight: "智能操作系统+中间件，国产化IT基础设施智能OS核心供应商" },
          { name: "纳思达", highlight: "打印机芯片+国产办公软件，信创国产化替代整体解决方案" }
        ]
      }
    ],
    midstream: [
      {
        name: "行业解决方案",
        companies: [
          { name: "用友网络", highlight: "金融+政务+制造ERP，AI大模型BIP平台订阅收入增速超40%" },
          { name: "广联达", highlight: "工程造价数字化龙头，SAAS化转型完成，订阅收入占比超60%" },
          { name: "华宇软件", highlight: "法院+检察院+公安数字化，司法AI大模型落地深度行业第一" },
          { name: "软通动力", highlight: "IT外包+数字化咨询，大模型落地大企业客户能力强" }
        ]
      },
      {
        name: "云计算/SaaS",
        companies: [
          { name: "元道通信", highlight: "云联网+SD-WAN，政企混合云接入服务商" },
          { name: "同花顺", highlight: "金融SAAS+AI大模型，iFinD数据终端月活超百万用户" },
          { name: "东华软件", highlight: "医疗+政务信息化，医院HIS系统市占率国内前三" }
        ]
      }
    ],
    downstream: [
      {
        name: "数字政府/智慧城市",
        companies: [
          { name: "维宏股份", highlight: "工业软件+数控系统，制造业信创化替代进程加速" },
          { name: "万达信息", highlight: "智慧医疗+城市云平台，地方政府数字化大客户壁垒深" },
          { name: "龙洲股份", highlight: "智慧城市IT运营服务，政务云+数字城管整体解决方案" }
        ]
      },
      {
        name: "金融科技/企服",
        companies: [
          { name: "东方财富", highlight: "金融互联网平台+基金代销，金融科技核心入口，用户超1亿" },
          { name: "信维通信", highlight: "金融终端+POS机天线，银行数字化终端核心供应商" },
          { name: "荣联科技", highlight: "金融行业IT外包，保险+银行核心系统实施运维龙头" }
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
          { name: "兴森科技", highlight: "PCB用铜箔基板核心材料，AI服务器高频高速PCB配套" },
          { name: "生益科技", highlight: "覆铜板龙头，AI/5G用高频高速覆铜板市占率国内第一" },
          { name: "朗特智能", highlight: "MLCC介质陶瓷粉体，中高端MLCC国产化核心材料" },
          { name: "晶瑞电材", highlight: "电子级硅烷+湿电子化学品，元件生产精密清洗及蚀刻配套" }
        ]
      },
      {
        name: "MLCC/电容材料",
        companies: [
          { name: "璞泰来", highlight: "PVDF压电薄膜，MLCC及功率器件封装用导热材料" },
          { name: "四方达", highlight: "陶瓷基板，MLCC与功率模块衬底材料国产化进展加速" },
          { name: "兴森科技", highlight: "高频高速PCB基材，MLCC载板配套生产能力领先" }
        ]
      }
    ],
    midstream: [
      {
        name: "MLCC/电容电感",
        companies: [
          { name: "风华高科", highlight: "国内MLCC龙头，AI服务器用高压MLCC份额快速提升" },
          { name: "顺络电子", highlight: "片式电感+功率电感龙头，AI服务器单台用量大幅增加" },
          { name: "鼎龙股份", highlight: "MLCC用抛光材料，AI算力+储能双赛道受益标的" }
        ]
      },
      {
        name: "连接器/PCB",
        companies: [
          { name: "信邦智能", highlight: "高速连接器精密端子，AI服务器背板连接器核心供应商" },
          { name: "深南电路", highlight: "高端PCB龙头，AI服务器HDI+高速背板PCB旗舰产品" },
          { name: "生益科技", highlight: "覆铜板龙头，AI/5G用高频高速覆铜板市占率国内第一" },
          { name: "新亚制程", highlight: "精密连接器，消费电子+汽车电子连接器出货量高增" }
        ]
      }
    ],
    downstream: [
      {
        name: "AI服务器/通信",
        companies: [
          { name: "浪潮信息", highlight: "AI服务器单台MLCC/电感用量是普通服务器3-5倍，带动元件需求暴增" },
          { name: "中兴通讯", highlight: "5G基站用高频MLCC+连接器，国产元件替代比例持续提升" },
          { name: "歌尔股份", highlight: "消费电子元件精密组装，MLCC+连接器一体化供应链管理" }
        ]
      },
      {
        name: "新能源/汽车电子",
        companies: [
          { name: "比亚迪", highlight: "新能源汽车每辆用MLCC超3000颗，带动车规级元件需求飙升" },
          { name: "宁德时代", highlight: "BMS+电池管理电路大量采购车规级电容电感，用量行业最大" },
          { name: "华域汽车", highlight: "汽车电子PCBA集成，车规连接器+元件集成供应能力强" }
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
          { name: "科大讯飞", highlight: "星火大模型V4.0，语音识别准确率全球第一，教育+医疗垂直落地最快" },
          { name: "昆仑万维", highlight: "天工大模型+天工AI搜索日活超百万，海外AGI布局走在A股前列" },
          { name: "海量数据", highlight: "AI训练数据标注与清洗，大模型数据供应商营收高增超50%" },
          { name: "北方华创", highlight: "国产半导体设备为大模型训练芯片制造提供算力底座，替代英伟达核心标的" }
        ]
      },
      {
        name: "AI开发平台/工具链",
        companies: [
          { name: "用友网络", highlight: "BIP企业AI平台，大模型应用开发工具订阅收入增速超40%" },
          { name: "广联达", highlight: "工程行业AI平台，建筑全生命周期AI化推进，SaaS化转型深度受益" },
          { name: "同花顺", highlight: "金融AI大模型平台，量化策略生成+研报自动解读商业化落地" }
        ]
      }
    ],
    midstream: [
      {
        name: "垂直行业AI应用",
        companies: [
          { name: "东华软件", highlight: "医疗影像AI辅助诊断，医院HIS+AI大模型融合，辅助诊断准确率超90%" },
          { name: "华宇软件", highlight: "司法AI大模型，法院+检察院案件智能辅助办案，落地数量A股第一" },
          { name: "大华股份", highlight: "AIoT视频智能，AI视频分析订单同比增长超60%，千行百业规模覆盖" },
          { name: "海康威视", highlight: "AI+物联网行业龙头，大模型赋能安防+工业检测，营收规模行业第一" },
          { name: "万达信息", highlight: "智慧医疗+城市AI大脑，政府端AI应用落地深度领先" }
        ]
      },
      {
        name: "AIGC/内容生成",
        companies: [
          { name: "昆仑万维", highlight: "天工AI绘画+视频生成，AIGC商业变现路径最清晰，海外Starchain战略推进" },
          { name: "吉比特", highlight: "AI+游戏，AI生成游戏内容降本50%以上，AI NPC落地商业验证完成" },
          { name: "奥飞娱乐", highlight: "IP+AIGC内容生产，AI短剧+虚拟偶像商业化试水，内容成本大幅降低" },
          { name: "软通动力", highlight: "企业AIGC内容生产平台，游戏美术+营销素材AI化降本超50%" }
        ]
      }
    ],
    downstream: [
      {
        name: "AI Agent/自主决策",
        companies: [
          { name: "科大讯飞", highlight: "讯飞AI Agent在教育场景实现自主出题-批改-辅导闭环，日活用户超500万" },
          { name: "同花顺", highlight: "AI投研Agent，自动生成研报+个股分析报告，机构客户渗透率快速提升" },
          { name: "奥飞数据", highlight: "AI运维Agent，数据中心自动化运营决策，人工干预率降低70%" },
          { name: "软通动力", highlight: "企业级AI Agent开发部署，头部客户自动化流程RPA+AI一体化" }
        ]
      },
      {
        name: "AI营销/办公/教育",
        companies: [
          { name: "每日互动", highlight: "AI营销数据平台，精准推送模型迭代，广告主ROI提升30%以上" },
          { name: "云图控股", highlight: "AI+数字营销，大模型赋能广告创意生成，投放效率行业领先" },
          { name: "蓝色光标", highlight: "全面拥抱AI营销，AIGC内容生产成本降低60%，营销自动化客户快速增长" },
          { name: "川大智胜", highlight: "AI教育+人脸识别，智慧校园AI解决方案收入持续高增" }
        ]
      }
    ]
  },

  // ========== 算力租赁 ==========
  // 口径参考：同花顺 iFinD「算力租赁」概念成分及公开财经报道（采购 GPU/智算资源并向客户分时或包段出租）
  "算力租赁": {
    name: "算力租赁",
    color: "#0891b2",
    gradient: ["#06b6d4", "#164e63"],
    description: "算力租赁在同花顺 iFinD 等财经口径下，主要指企业采购 GPU/智算集群与机柜资源，再向大模型、互联网与政企客户以租赁或订阅方式交付；景气度与高端 AI 服务器供给、IDC 上架率及云厂商资本开支高度相关。",
    upstream: [
      {
        name: "AI服务器与算力整机",
        companies: [
          { name: "工业富联", highlight: "AI 服务器代工与整机出货规模领先，同花顺算力租赁主题中市值与营收体量居前" },
          { name: "浪潮信息", highlight: "国内 AI 服务器与整机柜头部供应商，智算中心扩容直接拉动租赁商采购" },
          { name: "中科曙光", highlight: "国产高端服务器与液冷方案，政务与行业智算项目常见算力底座供应商" },
          { name: "紫光股份", highlight: "新华三服务器与网络设备，数据中心与智算网络一体化交付能力强" }
        ]
      },
      {
        name: "光互联与网络设备",
        companies: [
          { name: "中际旭创", highlight: "800G/1.6T 光模块龙头，智算集群东西向与跨机柜带宽决定集群可出租规模" },
          { name: "新易盛", highlight: "数通光模块高增，云与智算数据中心互联需求与租赁上架节奏同步" },
          { name: "中兴通讯", highlight: "数据中心交换机与算力网络，大集群组网与运维为租赁商刚需" }
        ]
      },
      {
        name: "电力工程与机房温控",
        companies: [
          { name: "中国能建", highlight: "能源电力与新型基础设施工程，算力租赁主题中营收体量居前，绿电配套与园区供电相关" },
          { name: "英维克", highlight: "精密温控与液冷，高密度 GPU 机柜 PUE 与可上架功率直接影响租赁经济性" },
          { name: "科士达", highlight: "UPS 与数据中心供配电，保障智算机柜连续供电与租赁 SLA" }
        ]
      }
    ],
    midstream: [
      {
        name: "IDC/智算中心运营（收租核心）",
        companies: [
          { name: "润泽科技", highlight: "超大规模园区级 IDC/智算，批发型客户与云厂商需求绑定深，概念成分中利润体量突出" },
          { name: "数据港", highlight: "阿里云核心数据中心合作方，上架率与云侧算力扩张同步" },
          { name: "光环新网", highlight: "京津冀等地 IDC+云，企业与大模型客户托管及算力服务需求稳定" },
          { name: "奥飞数据", highlight: "华南及海外节点扩张，智算机柜与带宽资源弹性大" }
        ]
      },
      {
        name: "GPU云/弹性算力与国产算力服务",
        companies: [
          { name: "首都在线", highlight: "公有云 GPU 与裸金属实例产品线明确，中小客户与出海弹性算力租赁代表" },
          { name: "网宿科技", highlight: "边缘计算与分发能力叠加，算力租赁主题下近端成交与算力调度关注度较高" },
          { name: "利通电子", highlight: "财经报道中高频出现的算力租赁转型标的，智算资源投放与市场关注度居前" },
          { name: "拓维信息", highlight: "华为昇腾生态核心伙伴之一，国产智算建设与行业算力服务绑定深" }
        ]
      },
      {
        name: "智算建设与运维服务",
        companies: [
          { name: "润建股份", highlight: "通信与 IDC 运维、智算园区建设与代运营一体化" },
          { name: "亚康股份", highlight: "算力基础设施运维与交付，头部互联网及云客户算力集群配套服务" },
          { name: "城地香江", highlight: "由传统工程向 IDC/算力服务转型，机柜与算力收入结构改善受市场跟踪" }
        ]
      }
    ],
    downstream: [
      {
        name: "大模型与多模态应用",
        companies: [
          { name: "科大讯飞", highlight: "星火大模型训练与推理算力消耗大，自建与第三方租赁并行" },
          { name: "昆仑万维", highlight: "天工与多模态应用峰值算力需求高，弹性租用云 GPU 降本" },
          { name: "三六零", highlight: "大模型与安全场景推理部署，对云端与托管算力采购需求持续" },
          { name: "万兴科技", highlight: "AIGC 创意工具全球化，渲染与推理波峰外包算力租赁" }
        ]
      },
      {
        name: "金融与营销科技",
        companies: [
          { name: "同花顺", highlight: "金融大模型与量化回测，行情与研报高峰时段短时算力租用需求" },
          { name: "蓝色光标", highlight: "营销 AIGC 与多模态内容生产，项目制算力租赁与云厂商联动多" },
          { name: "用友网络", highlight: "企业级 AI 与行业大模型落地，混合云下算力外采与租赁并存" }
        ]
      },
      {
        name: "智算服务器与云生态（需求侧硬件）",
        companies: [
          { name: "协创数据", highlight: "智算服务器、存储与物联网硬件，公开报道中与头部云及互联网客户供应链绑定紧" },
          { name: "神州数码", highlight: "IT 分销与神州鲲泰信创服务器，云与行业客户算力硬件渠道与交付" },
          { name: "世纪华通", highlight: "游戏与云游戏、AIGC 管线对渲染与推理算力外包有持续需求" }
        ]
      }
    ]
  },

  // ========== 低空经济 ==========
  "低空经济": {
    name: "低空经济",
    color: "#0ea5e9",
    gradient: ["#0ea5e9", "#0369a1"],
    description: "低空经济是以低空空域（1000米以下）为依托，以无人机、eVTOL（电动垂直起降飞行器）、通用航空为主体的新兴产业，2025-2026年政策密集落地，适航审定加速，从飞行器制造到运营服务的全产业链迎来爆发。",
    upstream: [
      {
        name: "核心零部件/材料",
        companies: [
          { name: "卧龙电驱", highlight: "低空经济电机龙头，eVTOL电驱系统已获多家整机厂定点，适配2-6座机型，2026Q1订单同比+200%" },
          { name: "长源东谷", highlight: "低空飞行器电驱壳体核心供应商，高压铸造+精密加工一体化，已进入亿航/峰飞供应链" },
          { name: "森麒麟", highlight: "航空轮胎国产替代龙头，eVTOL专用轮胎已获适航认证，全球市占快速提升" },
          { name: "光威复材", highlight: "碳纤维复合材料龙头，低空飞行器机身/旋翼碳纤维主材核心供应商" }
        ]
      },
      {
        name: "芯片/感知/导航",
        companies: [
          { name: "紫光国微", highlight: "低空飞行器安全芯片+FPGA，飞控系统核心芯片国产替代领军" },
          { name: "北斗星通", highlight: "北斗高精度定位龙头，eVTOL+无人机导航定位模组市占率行业第一" },
          { name: "振芯科技", highlight: "北斗导航芯片+低空监测终端，低空空域管理感知层核心配套" }
        ]
      }
    ],
    midstream: [
      {
        name: "eVTOL整机制造",
        companies: [
          { name: "万丰奥威", highlight: "万丰飞机eDA40电动通航飞机已获FAA认证，eVTOL机型2026年首飞" },
          { name: "万丰奥威", highlight: "万丰飞机eDA40电动通航飞机已获FAA认证，eVTOL机型2026年首飞" },
          { name: "纵横股份", highlight: "工业无人机龙头，大载重无人机+eVTOL双赛道布局，油气巡检市占率第一" }
        ]
      },
      {
        name: "通航/无人机整机",
        companies: [
          { name: "中无人机", highlight: "翼龙系列无人机，军转民低空应用领先，气象/应急/物流场景批量部署" },
          { name: "航天彩虹", highlight: "彩虹系列无人机龙头，低空物流+巡检场景商业落地加速" },
          { name: "威海广泰", highlight: "通航地面保障设备龙头，eVTOL起降场/充换电站核心配套" }
        ]
      }
    ],
    downstream: [
      {
        name: "低空运营/服务",
        companies: [
          { name: "中信海直", highlight: "低空运营服务龙头，海上油气+低空游览+城市空中出行三赛道布局，运营直升机超80架" },
          { name: "深城交", highlight: "低空交通规划设计龙头，深圳/广州低空航线规划核心服务商" },
          { name: "岭南控股", highlight: "低空文旅运营先驱，广州/深圳低空游览航线商业化落地" }
        ]
      },
      {
        name: "低空基建/空管",
        companies: [
          { name: "四川九洲", highlight: "低空空管系统龙头，空域监视+通信+指挥一体化，军方/民航核心供应商" },
          { name: "莱斯信息", highlight: "民用空管系统领军者，低空空域管理平台覆盖多省" },
          { name: "四创电子", highlight: "低空监视雷达+气象雷达，低空空域感知基础设施核心供应商" }
        ]
      }
    ]
  },

  // ========== 固态电池 ==========
  "固态电池": {
    name: "固态电池",
    color: "#f59e0b",
    gradient: ["#f59e0b", "#b45309"],
    description: "固态电池以固态电解质替代传统液态电解液，能量密度突破500Wh/kg，安全性大幅提升，2025-2026年半固态率先量产装车，全固态电池预计2027年规模商用，是锂电池下一代技术革命的确定性方向。",
    upstream: [
      {
        name: "固态电解质材料",
        companies: [
          { name: "上海洗霸", highlight: "氧化物固态电解质LLZT粉体已吨级出货，宁德时代/卫蓝新能源核心供应商" },
          { name: "三祥新材", highlight: "锆基固态电解质材料龙头，氧化物路线核心原料市占率超60%" },
          { name: "当升科技", highlight: "固态电池正极材料龙头，高镍/富锂锰基正极适配固态体系，2026Q1出货量同比+150%" }
        ]
      },
      {
        name: "锂金属负极/界面材料",
        companies: [
          { name: "天齐锂业", highlight: "锂资源龙头，固态电池锂金属负极原料核心保障，碳酸锂+锂箔双供应能力" },
          { name: "赣锋锂业", highlight: "固态电池全产业链布局，第一代固态电池已装车东风E70，锂金属负极自研自产" },
          { name: "璞泰来", highlight: "负极材料龙头，固态电池用硅碳负极+锂金属负极一体化布局" }
        ]
      }
    ],
    midstream: [
      {
        name: "固态电池电芯制造",
        companies: [
          { name: "宁德时代", highlight: "全固态电池2027年量产目标，硫化物路线领先，凝聚态电池已装车，技术储备行业第一" },
          { name: "赣锋锂业", highlight: "二代固态电池能量密度400Wh/kg+，东风/赛力斯装车验证完成，2026年产能2GWh" },
          { name: "亿纬锂能", highlight: "半固态电池已量产交付，全固态电池研发进展领先，大圆柱+固态双技术路线" }
        ]
      },
      {
        name: "半固态电池（量产先行）",
        companies: [
          { name: "珠海冠宇", highlight: "半固态电池研发领先，消费电池+固态电池双赛道布局，能量密度360Wh/kg" },
          { name: "国轩高科", highlight: "半固态电池已装车蔚来ET7，2026年产能规划10GWh，大众集团深度绑定" },
          { name: "孚能科技", highlight: "半固态电池能量密度330Wh/kg，广汽/吉利装车验证，海外订单突破" }
        ]
      }
    ],
    downstream: [
      {
        name: "新能源汽车应用",
        companies: [
          { name: "赛力斯", highlight: "问界M9固态版2026年上市，赣锋锂业固态电池独家供应，续航突破1200km" },
          { name: "赛力斯", highlight: "问界M9固态版2026年上市，赣锋锂业固态电池独家供应，续航突破1200km" },
          { name: "广汽集团", highlight: "全固态电池2026年装车规划，昊铂SSR固态版率先量产" }
        ]
      },
      {
        name: "储能/eVTOL应用",
        companies: [
          { name: "万丰奥威", highlight: "eVTOL整机制造龙头，半固态电池2026年批量装机，安全性+能量密度双提升" },
          { name: "阳光电源", highlight: "固态储能系统研发领先，大储+工商业储能固态化方案2026年试点" },
          { name: "宁德时代", highlight: "固态电池储能+eVTOL双赛道布局，天行储能固态版2026年交付" }
        ]
      }
    ]
  },

  // ========== 华为概念 ==========
  "华为概念": {
    name: "华为概念",
    color: "#dc2626",
    gradient: ["#dc2626", "#991b1b"],
    description: "华为概念覆盖鸿蒙生态、昇腾算力、华为汽车三大核心赛道，2025-2026年鸿蒙PC版发布、昇腾910C规模出货、问界/智界/享界销量爆发，华为全产业链协同效应持续强化。",
    upstream: [
      {
        name: "芯片/算力底座",
        companies: [
          { name: "中芯国际", highlight: "华为昇腾/麒麟芯片核心代工方，N+2工艺量产，国产先进制程唯一路径" },
          { name: "北方华创", highlight: "半导体设备龙头，华为芯片产线刻蚀/沉积设备核心供应商" },
          { name: "卓胜微", highlight: "华为射频前端核心供应商，5.5G射频芯片批量出货" }
        ]
      },
      {
        name: "鸿蒙生态/软件",
        companies: [
          { name: "软通动力", highlight: "鸿蒙生态最大服务商，鸿蒙原生应用开发订单+300%，华为深度战略伙伴" },
          { name: "润和软件", highlight: "鸿蒙OS开源核心贡献者，OpenHarmony发行版市占率第一" },
          { name: "中国软件", highlight: "麒麟OS+鸿蒙双生态布局，信创+鸿蒙政企市场占有率领先" }
        ]
      }
    ],
    midstream: [
      {
        name: "昇腾算力/AI服务器",
        companies: [
          { name: "拓维信息", highlight: "华为昇腾生态核心伙伴，兆瀚AI服务器出货量前三，鲲鹏+昇腾双赛道" },
          { name: "神州数码", highlight: "华为全线产品总代，昇腾服务器分销+自研方案，2026Q1营收同比+80%" },
          { name: "华丰科技", highlight: "华为高速连接器核心供应商，昇腾910C集群互联关键器件" }
        ]
      },
      {
        name: "华为汽车/智选车",
        companies: [
          { name: "赛力斯", highlight: "问界M9/M8爆款车型，2026年销量目标60万辆，华为智选车标杆" },
          { name: "江淮汽车", highlight: "享界S9华为合作车型，高端MPV+轿车双线布局，2026年产能释放" },
          { name: "北汽蓝谷", highlight: "智界S7华为合作车型，高端纯电+增程双动力，华为智驾方案全面搭载" }
        ]
      }
    ],
    downstream: [
      {
        name: "终端/消费电子",
        companies: [
          { name: "光弘科技", highlight: "华为手机/平板核心代工厂，Mate/P系列+鸿蒙PC整机制造" },
          { name: "欧菲光", highlight: "华为摄像头模组核心供应商，Mate系列主摄+潜望镜头模组" },
          { name: "蓝思科技", highlight: "华为玻璃盖板+钛合金中框核心供应商，三折叠屏盖板量产能力行业第一" }
        ]
      },
      {
        name: "华为数字能源/5.5G",
        companies: [
          { name: "英维克", highlight: "华为数据中心温控核心供应商，液冷方案覆盖昇腾集群" },
          { name: "中际旭创", highlight: "华为5.5G光模块核心供应商，800G/1.6T光模块批量交付" },
          { name: "灿勤科技", highlight: "华为5.5G基站滤波器核心供应商，毫米波器件市占率领先" }
        ]
      }
    ]
  },

  // ========== AIDC（智算中心）==========
  "AIDC": {
    name: "AIDC",
    color: "#7c3aed",
    gradient: ["#7c3aed", "#4c1d95"],
    description: "AIDC（AI Data Center，智算中心）是AI大模型时代的基础设施核心，以GPU集群为算力底座、高速网络为互联骨干、液冷散热为温控标准，2025-2026年智算中心建设投资超万亿，上架率与算力租赁景气度持续高位。",
    upstream: [
      {
        name: "AI服务器与算力整机",
        companies: [
          { name: "工业富联", highlight: "AI服务器代工全球龙头，英伟达H100/H800核心ODM，2026Q1 AI服务器营收同比+180%" },
          { name: "浪潮信息", highlight: "国内AI服务器市占率52.3%，液冷G7系列支持H100满载，在手订单350亿+" },
          { name: "中科曙光", highlight: "国产AI服务器龙头，海光芯片+液冷方案，覆盖80%政务智算中心" }
        ]
      },
      {
        name: "光互联/网络设备",
        companies: [
          { name: "中际旭创", highlight: "800G/1.6T光模块全球龙头，智算集群东西向带宽核心，AI数据中心光互联市占率第一" },
          { name: "新易盛", highlight: "数通光模块高速增长，800G产品批量出货云厂商，1.6T送样测试中" },
          { name: "中兴通讯", highlight: "智算中心交换机+网络方案，大集群组网与运维核心供应商" }
        ]
      }
    ],
    midstream: [
      {
        name: "IDC/智算中心运营",
        companies: [
          { name: "润泽科技", highlight: "AIDC第一股，投产3万P+，7大智算集群，液冷PUE1.15，绑定字节（收入占比60%+），长单排至2028年" },
          { name: "数据港", highlight: "阿里云核心数据中心合作方，上架率与云侧算力扩张同步" },
          { name: "光环新网", highlight: "京津冀IDC+云服务龙头，企业与大模型客户托管需求稳定，AIDC改造项目推进中" }
        ]
      },
      {
        name: "GPU云/弹性算力",
        companies: [
          { name: "首都在线", highlight: "公有云GPU与裸金属实例产品线明确，中小客户与出海弹性算力代表" },
          { name: "利通电子", highlight: "3.3万P高端算力（H100/H800），出租率100%，腾讯50亿长单锁定" },
          { name: "鸿博股份", highlight: "英伟达DGX核心，7000P高端算力，签约23亿+，北京AI创新中心满负荷" }
        ]
      }
    ],
    downstream: [
      {
        name: "大模型/多模态应用",
        companies: [
          { name: "科大讯飞", highlight: "星火大模型训练与推理算力消耗大，自建+第三方智算并行" },
          { name: "昆仑万维", highlight: "天工大模型+多模态应用，峰值算力需求高，弹性租用云GPU降本" },
          { name: "三六零", highlight: "大模型+安全场景推理部署，智算中心算力采购需求持续" }
        ]
      },
      {
        name: "液冷/温控配套",
        companies: [
          { name: "英维克", highlight: "精密温控与液冷龙头，高密度GPU机柜PUE降至1.15，AIDC温控市占率第一" },
          { name: "科士达", highlight: "UPS与数据中心供配电龙头，保障智算机柜连续供电与AIDC运营SLA" },
          { name: "申菱环境", highlight: "AIDC专用精密空调+液冷CDU，大型智算中心温控方案核心供应商" }
        ]
      }
    ]
  },

  // ========== 核聚变 ==========
  "核聚变": {
    name: "核聚变",
    color: "#f97316",
    gradient: ["#f97316", "#c2410c"],
    description: "核聚变被誉为终极清洁能源，2025-2026年ITER关键部件交付加速、国内CFETR预研推进、商业聚变公司融资超百亿，超导磁体+第一壁材料+氚增殖三大核心环节率先受益，产业拐点渐近。",
    upstream: [
      {
        name: "超导材料/磁体",
        companies: [
          { name: "西部超导", highlight: "低温超导线材国内唯一供应商，ITER超导磁体线材核心供应商，NbTi/Nb3Sn线材市占率超90%" },
          { name: "联创光电", highlight: "高温超导带材产业化领先，REBCO带材性能达国际先进水平，聚变磁体应用验证中" },
          { name: "永鼎股份", highlight: "高温超导带材新锐，第二代REBCO带材产能扩张中，聚变磁体/电机场景突破" }
        ]
      },
      {
        name: "第一壁/结构材料",
        companies: [
          { name: "安泰科技", highlight: "聚变第一壁钨铜复合材料核心供应商，ITER/CFETR铍瓦+钨瓦独家供应" },
          { name: "抚顺特钢", highlight: "低活化铁素体钢+高温合金，聚变堆结构材料及特种钢材市占率全国第一" },
          { name: "东方钽业", highlight: "铍材龙头，聚变第一壁铍材核心供应商，国内唯一具备核级铍材生产能力" }
        ]
      }
    ],
    midstream: [
      {
        name: "聚变堆核心装置",
        companies: [
          { name: "上海电气", highlight: "聚变堆真空室+超导磁体支撑核心制造商，ITER/CFETR关键部件交付经验丰富" },
          { name: "东方电气", highlight: "聚变堆主机制造龙头，ITER磁体支撑系统+屏蔽层核心供应商" },
          { name: "国光电气", highlight: "聚变堆微波加热系统+氚增殖模块核心供应商，ITER/CFETR关键部件国产化" }
        ]
      },
      {
        name: "氚增殖/燃料循环",
        companies: [
          { name: "中核科技", highlight: "核级阀门+聚变堆氚系统阀门核心供应商，核聚变燃料循环管路关键器件" },
          { name: "久立特材", highlight: "核级不锈钢/特种合金管材龙头，聚变堆冷却回路管材核心供应" },
          { name: "方大炭素", highlight: "核级石墨+碳碳复合材料，聚变堆第一壁/偏滤器碳基材料供应商" }
        ]
      }
    ],
    downstream: [
      {
        name: "商业聚变/投资运营",
        companies: [
          { name: "中国核电", highlight: "央企核能运营龙头，参股聚变研究+战略布局商业聚变发电" },
          { name: "中广核技", highlight: "核技术+电子加速器，聚变相关材料改性/辐照验证核心配套" },
          { name: "航天晨光", highlight: "聚变实验装置大型真空容器制造，ITER/CFETR真空室核心供应商" }
        ]
      },
      {
        name: "电源/控制系统",
        companies: [
          { name: "许继电气", highlight: "聚变堆脉冲电源系统，超大电流/超快响应电源核心供应商" },
          { name: "国电南瑞", highlight: "聚变堆控制系统+电力电子，等离子体控制与能量管理核心配套" },
          { name: "科新机电", highlight: "核级压力容器+聚变堆辅助系统设备，民用核安全设备制造资质" }
        ]
      }
    ]
  },

  // ========== 数据要素 ==========
  "数据要素": {
    name: "数据要素",
    color: "#0891b2",
    gradient: ["#0891b2", "#155e75"],
    description: "数据要素是国家基础性战略资源，2025-2026年数据资产入表、数据交易所扩容、公共数据授权运营试点推进，从数据采集/治理到确权/交易再到数据资产化的全产业链加速成熟。",
    upstream: [
      {
        name: "数据采集/治理",
        companies: [
          { name: "海天瑞声", highlight: "AI训练数据采集与标注龙头，大模型数据供应商营收高增，数据要素市场核心供给方" },
          { name: "每日互动", highlight: "数据智能服务龙头，日均处理数据超100TB，数据采集/治理/应用全链路能力" },
          { name: "拓尔思", highlight: "非结构化数据处理龙头，大数据治理+语义分析平台覆盖政府/金融/媒体" }
        ]
      },
      {
        name: "数据安全/隐私计算",
        companies: [
          { name: "安恒信息", highlight: "数据安全龙头，数据分类分级/脱敏/加密全栈方案，数据流通安全基础设施核心" },
          { name: "奇安信", highlight: "网络安全+数据安全双赛道，隐私计算平台落地多省数据交易所" },
          { name: "山大地纬", highlight: "隐私计算+区块链龙头，数据确权/可信流通平台落地山东/浙江" }
        ]
      }
    ],
    midstream: [
      {
        name: "数据交易所/平台",
        companies: [
          { name: "易华录", highlight: "数据湖+数据交易所核心建设方，北京/山东数据交易平台技术提供方" },
          { name: "零点有数", highlight: "数据分析+决策智能，数据要素评估/定价方法论领先" },
          { name: "广电运通", highlight: "广州数据交易所参股方，数据交易平台+数据资产管理系统核心建设方" }
        ]
      },
      {
        name: "数据资产/确权服务",
        companies: [
          { name: "人民网", highlight: "数据确权平台龙头，人民数据·国家大数据灾备中心核心运营方" },
          { name: "浙数文化", highlight: "浙江大数据交易中心大股东，数据交易+数字文化双主业" },
          { name: "深桑达A", highlight: "中国电子云+数据要素平台，政务数据授权运营核心服务商" }
        ]
      }
    ],
    downstream: [
      {
        name: "金融/政务数据应用",
        companies: [
          { name: "同花顺", highlight: "金融数据要素应用龙头，iFinD平台数据资产超百万指标，数据产品矩阵商业化领先" },
          { name: "万达信息", highlight: "政务数据应用龙头，智慧城市+医疗数据运营，政府端数据要素落地深度领先" },
          { name: "东方财富", highlight: "金融互联网平台+基金代销，金融数据消费入口，用户超1亿" }
        ]
      },
      {
        name: "AI+数据驱动",
        companies: [
          { name: "科大讯飞", highlight: "AI+数据双轮驱动，教育/医疗数据资产化路径最清晰" },
          { name: "拓维信息", highlight: "华为昇腾+数据要素双赛道，政务/教育数据运营方案领先" },
          { name: "美年健康", highlight: "健康体检数据龙头，亿级体检数据资产，AI+数据驱动健康管理商业化" }
        ]
      }
    ]
  },

  // ========== 白酒 ==========
  "白酒": {
    name: "白酒",
    color: "#dc2626",
    gradient: ["#dc2626", "#991b1b"],
    description: "中国白酒产业链涵盖原料采购、酿造、包装、流通到终端消费的完整产业体系，是传统文化与现代商业的结合。",
    upstream: [
      {
        name: "原料/辅料供应",
        companies: [
          { name: "青岛啤酒", highlight: "高端白酒包装材料供应商，酒用玻璃瓶+铝盖龙头" },
          { name: "裕同科技", highlight: "高端白酒包装龙头，酒类礼盒+防伪包装全国市占率第一" },
          { name: "劲嘉股份", highlight: "烟酒包装印刷龙头，高端白酒纸质包装全国市占率最高" }
        ]
      },
      {
        name: "酿造设备",
        companies: [
          { name: "浪潮信息", highlight: "白酒生产管理系统，产业数字化升级核心IT基础设施" },
          { name: "科远智慧", highlight: "酿造自动化控制系统，白酒智能生产线核心设备供应商" },
          { name: "三环集团", highlight: "白酒窖池陶瓷材料，传统工艺与现代产能融合" }
        ]
      }
    ],
    midstream: [
      {
        name: "酿造/生产",
        companies: [
          { name: "贵州茅台", highlight: "白酒龙头，高端酱香型白酒代表，市值国内消费行业最高" },
          { name: "五粮液", highlight: "浓香型白酒龙头，国家一级酒企，品牌价值超3000亿" },
          { name: "泸州老窖", highlight: "浓香型白酒第二梯队，国窖1573战略品牌高端化突破" }
        ]
      },
      {
        name: "品牌运营",
        companies: [
          { name: "洋河股份", highlight: "梦之蓝高端定位，年轻化消费者拓展成效显著" },
          { name: "山西汾酒", highlight: "清香型白酒龙头，杏花村品牌复兴战略稳步推进" },
          { name: "山西汾酒", highlight: "清香型白酒A股上市主体，杏花村品牌复兴战略稳步推进" }
        ]
      }
    ],
    downstream: [
      {
        name: "流通/渠道",
        companies: [
          { name: "步步高", highlight: "超市龙头，白酒品牌一级代理和终端销售核心渠道" },
          { name: "永辉超市", highlight: "生鲜超市大型连锁，烟酒销售占比超30%，刚需属性强" },
          { name: "家家悦", highlight: "华东地区超市龙头，高端白酒销售占有率全国前列" }
        ]
      },
      {
        name: "消费终端",
        companies: [
          { name: "同庆楼", highlight: "A股餐饮龙头，婚宴+商务宴请白酒消费场景核心渠道" },
          { name: "百润股份", highlight: "预调酒龙头，RIO微醺系列年轻人低度酒消费新场景" },
          { name: "元祖股份", highlight: "高端礼品消费龙头，节庆白酒+月饼礼盒组合销售渠道" }
        ]
      }
    ]
  },

  // ========== 医疗器械 ==========
  "医疗器械": {
    name: "医疗器械",
    color: "#0891b2",
    gradient: ["#0891b2", "#155e75"],
    description: "医疗器械产业涵盖诊断、治疗、监护等全套医疗设备，是健康产业的重要支柱，国产替代空间巨大。",
    upstream: [
      {
        name: "材料/零部件",
        companies: [
          { name: "三环集团", highlight: "生物陶瓷+医疗陶瓷龙头，骨科植入物基体材料国产化" },
          { name: "迪安诊断", highlight: "体外诊断龙头，第三方医学检验服务全国市占率前三" },
          { name: "威孚高科", highlight: "精密铸造件和高端零部件，医疗器械关键部件国产供应商" }
        ]
      },
      {
        name: "芯片/传感器",
        companies: [
          { name: "乐普医疗", highlight: "心血管医疗器械龙头，心脏支架+AI心电诊断芯片国产替代领先" },
          { name: "长川科技", highlight: "芯片测试设备，医疗芯片筛选和认证核心工具" },
          { name: "中航光电", highlight: "医疗连接器/传感器，手术机器人和微创器械关键部件" }
        ]
      }
    ],
    midstream: [
      {
        name: "医学影像设备",
        companies: [
          { name: "联影医疗", highlight: "国产医学影像设备龙头，CT/MRI/PET-CT市占率国内前三，AI影像诊断领先" },
          { name: "心脉医疗", highlight: "血管介入器械龙头，主动脉覆膜支架市场份额第一" },
          { name: "蓝帆医疗", highlight: "一次性医疗用品龙头，手术手套全球产能第一" }
        ]
      },
      {
        name: "手术/微创设备",
        companies: [
          { name: "天智航", highlight: "国产手术机器人龙头，骨科导航手术系统市占率国内第一" },
          { name: "心脉医疗", highlight: "主动脉介入器械龙头，血管支架+球囊导管国产替代领先" },
          { name: "威高骨科", highlight: "骨科植入物龙头，脊柱+创伤+关节植入物市占率国内前三" }
        ]
      }
    ],
    downstream: [
      {
        name: "医院采购",
        companies: [
          { name: "鱼跃医疗", highlight: "家用医疗器械龙头，呼吸机+血压计+血糖仪线上销售市占率第一" },
          { name: "爱尔眼科", highlight: "民营眼科医疗龙头，全国眼科医院超800家，AI辅助诊断率先落地" },
          { name: "金域医学", highlight: "第三方医学检验龙头，检测样本量全国第一，AI辅助病理诊断领先" }
        ]
      },
      {
        name: "康复/家用",
        companies: [
          { name: "可孚健康", highlight: "康复护理器械龙头，家用医疗+养老康复设备线上市占率领先" },
          { name: "卫宁健康", highlight: "医疗信息化龙头，互联网医院+AI辅助诊疗平台覆盖超6000家医院" },
          { name: "九安医疗", highlight: "家用医疗器械龙头，血压计+血氧仪+体温计全球出货量领先" }
        ]
      }
    ]
  },

  // ========== 农业 ==========
  "农业": {
    name: "农业",
    color: "#16a34a",
    gradient: ["#16a34a", "#15803d"],
    description: "现代农业产业链涵盖种植、养殖、农机、农资到食品加工的完整生态，是国家粮食安全的战略基础。",
    upstream: [
      {
        name: "农资/种子",
        companies: [
          { name: "隆平高科", highlight: "水稻+玉米种子龙头，杂交水稻年推广面积超2亿亩" },
          { name: "扬农化工", highlight: "农药龙头，菊酯类杀虫剂全球市占率第一，先正达集团A股核心资产" },
          { name: "金发科技", highlight: "生物肥料和生物农药，绿色农业和有机肥新赛道" }
        ]
      },
      {
        name: "农机设备",
        companies: [
          { name: "一拖股份", highlight: "农业装备龙头，大中马力拖拉机市占率全国第一" },
          { name: "中国一拖", highlight: "农业装备龙头，智能化拖拉机和精准农业解决方案" },
          { name: "隆华节能", highlight: "节水灌溉和精准农业装备，水肥一体化管理系统" }
        ]
      }
    ],
    midstream: [
      {
        name: "种植",
        companies: [
          { name: "北大荒", highlight: "A股种植龙头，耕地面积超千万亩，粮食生产规模全国第一" },
          { name: "苏垦农发", highlight: "现代农业龙头，优质稻麦种植+种子+大米全产业链运营" },
          { name: "辉隆股份", highlight: "农资流通龙头，化肥+农药+种子全国分销网络覆盖最广" }
        ]
      },
      {
        name: "养殖",
        companies: [
          { name: "温氏股份", highlight: "生猪+家禽养殖龙头，规模化养殖产能全国第一" },
          { name: "新希望", highlight: "饲料+养殖一体化龙头，三元育种体系自主可控" },
          { name: "牧原股份", highlight: "生猪养殖龙头，智能化养殖和疾病防控能力领先" }
        ]
      }
    ],
    downstream: [
      {
        name: "食品加工",
        companies: [
          { name: "双汇发展", highlight: "肉制品龙头，生猪屠宰和熟肉制品全产业链一体" },
          { name: "中粮糖业", highlight: "食糖+番茄加工龙头，中粮集团A股核心资产，食糖市占率全国第一" },
          { name: "伊利股份", highlight: "乳制品龙头，奶源基地+生产+销售一体化运营" }
        ]
      },
      {
        name: "流通销售",
        companies: [
          { name: "永辉超市", highlight: "生鲜超市龙头，农产品直采+冷链物流覆盖全国" },
          { name: "供销大集", highlight: "农村电商+农产品流通，全国供销社体系核心上市公司" },
          { name: "全聚德", highlight: "百年餐饮老字号，烤鸭+中式正餐农产品消费大户" }
        ]
      }
    ]
  },

  // ========== 钢铁 ==========
  "钢铁": {
    name: "钢铁",
    color: "#52525b",
    gradient: ["#52525b", "#27272a"],
    description: "钢铁产业是工业基础，涵盖铁矿采选、钢铁冶炼到深加工的完整产业链，在基建和制造业中不可或缺。",
    upstream: [
      {
        name: "铁矿采选",
        companies: [
          { name: "中国铁建", highlight: "铁矿采选龙头之一，国内铁矿资源储量第一档" },
          { name: "紫金矿业", highlight: "有色+铁矿双轮驱动，海外大型铁矿投资运营" },
          { name: "河钢资源", highlight: "铁矿采选龙头，南非PMC铁矿资源储量丰富，海外铁矿开发领先" }
        ]
      },
      {
        name: "冶炼辅材",
        companies: [
          { name: "盛和资源", highlight: "稀土冶炼和稀有金属材料，高端钢铁合金添加剂" },
          { name: "驰宏锌锗", highlight: "铅锌冶炼，钢铁脱硫和合金化关键原料" },
          { name: "驰宏锌锗", highlight: "铅锌冶炼+锗产品龙头，钢铁脱硫和合金化关键原料供应" }
        ]
      }
    ],
    midstream: [
      {
        name: "钢铁冶炼",
        companies: [
          { name: "宝钢股份", highlight: "国内钢铁龙头，高端汽车钢和硅钢产能全球领先" },
          { name: "河钢股份", highlight: "钢铁产能第二梯队，绿色低碳冶炼工艺创新" },
          { name: "鞍钢股份", highlight: "东北地区钢铁龙头，特钢和高端钢材主要生产商" }
        ]
      },
      {
        name: "钢材深加工",
        companies: [
          { name: "南钢股份", highlight: "高端建筑钢材和模具钢龙头，长三角地区市占率最高" },
          { name: "本钢板材", highlight: "冷轧薄板和汽车钢龙头，新能源汽车用钢供应商" },
          { name: "首钢股份", highlight: "京津冀地区钢铁龙头，高端汽车钢和轨道钢" }
        ]
      }
    ],
    downstream: [
      {
        name: "建筑/基建",
        companies: [
          { name: "中国建筑", highlight: "建筑施工龙头，钢铁材料采购量全国第一" },
          { name: "中国铁建", highlight: "基础设施建设龙头，高铁和轨道交通用钢最大消费方" },
          { name: "中国中铁", highlight: "铁路建设和运营龙头，标准钢轨和特种钢需求量巨大" }
        ]
      },
      {
        name: "制造业应用",
        companies: [
          { name: "比亚迪", highlight: "新能源车龙头，高端汽车钢+硅钢用量行业最大，带动特钢需求" },
          { name: "三一重工", highlight: "工程机械龙头，挖掘机+泵车用高强度钢采购量全国前列" },
          { name: "美的集团", highlight: "家电龙头，冷轧板+不锈钢+硅钢采购量全球前列" }
        ]
      }
    ]
  },

  // ========== 新能源 ==========
  "新能源": {
    name: "新能源",
    color: "#ea580c",
    gradient: ["#ea580c", "#9a3412"],
    description: "新能源产业链涵盖风电、光伏、储能等可再生能源的发电、传输到存储的完整产业生态，是能源转型的核心。",
    upstream: [
      {
        name: "光伏组件",
        companies: [
          { name: "隆基绿能", highlight: "光伏组件全球第一，单晶硅电池效率世界纪录保持者" },
          { name: "晶澳科技", highlight: "光伏组件全球第二，异质结电池转换效率创新高" },
          { name: "天合光能", highlight: "光伏组件全球第三，Perovskite电池技术全球领先" }
        ]
      },
      {
        name: "风机设备",
        companies: [
          { name: "金风科技", highlight: "风电整机龙头，海上风电和大功率直驱机组领先" },
          { name: "明阳智能", highlight: "海上风机第二梯队，10MW+超大型风机研发领先" },
          { name: "福能股份", highlight: "风电运营商，风机定制化供应链布局完善" }
        ]
      }
    ],
    midstream: [
      {
        name: "电站运营",
        companies: [
          { name: "吉电股份", highlight: "新能源发电龙头，风光装机持续增长，国家电投A股核心资产" },
          { name: "三峡能源", highlight: "海上风电+光伏电站龙头，清洁能源央企龙头，三峡集团A股核心资产" },
          { name: "华能国际", highlight: "电力运营商，新能源装机占比快速提升" }
        ]
      },
      {
        name: "储能系统",
        companies: [
          { name: "宁德时代", highlight: "储能电池龙头，能源储存解决方案全球第一" },
          { name: "比亚迪", highlight: "刀片电池和储能系统，光储充一体化方案布局" },
          { name: "亿纬锂能", highlight: "储能电池新势力，长寿命三元和磷酸铁锂电池竞争力强" }
        ]
      }
    ],
    downstream: [
      {
        name: "电网传输",
        companies: [
          { name: "国网信通", highlight: "国家电网A股上市平台，智能电网+新能源并网信息化龙头" },
          { name: "南网储能", highlight: "南方电网A股上市平台，抽水蓄能+新型储能装机全国第一" },
          { name: "中国宝安", highlight: "智能电网和微电网解决方案提供商" }
        ]
      },
      {
        name: "应用终端",
        companies: [
          { name: "特锐德", highlight: "充电桩运营龙头，特来电充电桩保有量全国第一" },
          { name: "林洋能源", highlight: "分布式光伏+储能龙头，工商业分布式光伏电站运营规模领先" },
          { name: "正泰电器", highlight: "逆变器+户用光伏龙头，家庭屋顶光伏系统市占率国内第一" }
        ]
      }
    ]
  },

  // ========== 芯片 ==========
  "芯片": {
    name: "芯片",
    color: "#a855f7",
    gradient: ["#a855f7", "#6b21a8"],
    description: "芯片产业是国家战略产业，涵盖设计、制造、封测等环节，是所有电子产品的核心，国产替代空间巨大。",
    upstream: [
      {
        name: "光刻机/材料",
        companies: [
          { name: "张江高科", highlight: "参股上海微电子，国产光刻机核心投资平台，28nm光刻机国产化突破" },
          { name: "中芯国际", highlight: "国内晶圆代工龙头，14nm制程商用量产全国领先" },
          { name: "华虹公司", highlight: "特色工艺晶圆代工龙头，模拟芯片和功率芯片A股唯一标的" }
        ]
      },
      {
        name: "设备/工艺",
        companies: [
          { name: "北方华创", highlight: "半导体设备龙头，刻蚀机和CVD设备国产替代领军" },
          { name: "长川科技", highlight: "芯片测试设备龙头，先进制程芯片测试工具国产化" },
          { name: "拓荆科技", highlight: "PECVD和ALD设备龙头，先进工艺关键设备国产供应商，A股上市" }
        ]
      }
    ],
    midstream: [
      {
        name: "芯片设计",
        companies: [
          { name: "深圳华强", highlight: "海思芯片分销龙头，华为芯片生态核心渠道商" },
          { name: "瑞芯微", highlight: "SOC芯片龙头，平板和安卓电视芯片市占率全球前三" },
          { name: "紫光国微", highlight: "安全芯片+FPGA龙头，移动通信+安全芯片双赛道国产替代" }
        ]
      },
      {
        name: "晶圆制造",
        companies: [
          { name: "中芯国际", highlight: "国内晶圆代工龙头，14nm量产和28nm稳定供应" },
          { name: "华虹公司", highlight: "特色工艺代工A股龙头，模拟芯片和功率芯片全球竞争力" },
          { name: "中芯国际", highlight: "A股晶圆代工龙头，14nm量产和28nm稳定供应，国产替代核心" }
        ]
      }
    ],
    downstream: [
      {
        name: "封装测试",
        companies: [
          { name: "通富微电", highlight: "Chiplet先进封装龙头，AMD超威代工合作伙伴" },
          { name: "华天科技", highlight: "封测龙头，传统封装和先进封装全面覆盖" },
          { name: "长电科技", highlight: "全球第三大封测商，三维封装技术全球领先" }
        ]
      },
      {
        name: "终端应用",
        companies: [
          { name: "华天科技", highlight: "封测龙头，华为海思先进封装核心伙伴，Chiplet封装技术领先" },
          { name: "韦尔股份", highlight: "手机CIS芯片龙头，小米/OPPO/vivo核心摄像头芯片供应商" },
          { name: "国科微", highlight: "车载芯片+存储芯片龙头，自动驾驶+车规级芯片国产替代先锋" }
        ]
      }
    ]
  },

  // ========== 电动车 ==========
  "电动车": {
    name: "电动车",
    color: "#06b6d4",
    gradient: ["#06b6d4", "#0e7490"],
    description: "电动车产业包括电动汽车、电动摩托车、电动两轮车等，是新能源出行的重要方向，市场空间巨大。",
    upstream: [
      {
        name: "电池系统",
        companies: [
          { name: "宁德时代", highlight: "动力电池龙头，新能源汽车和两轮电动车电池市占率第一" },
          { name: "比亚迪", highlight: "磷酸铁锂刀片电池龙头，自主配套率业界最高" },
          { name: "亿纬锂能", highlight: "长寿命电池新势力，圆柱和方形电池全面布局" }
        ]
      },
      {
        name: "充电基础设施",
        companies: [
          { name: "特锐德", highlight: "充电桩运营龙头，特来电充电桩保有量全国第一，母公司A股上市" },
          { name: "国电南瑞", highlight: "电力自动化A股龙头，充电网络+智能电网信息化建设核心供应商" },
          { name: "万马股份", highlight: "充电桩+电缆A股龙头，小区和停车场充电桩覆盖率行业前列" }
        ]
      }
    ],
    midstream: [
      {
        name: "整车制造",
        companies: [
          { name: "比亚迪", highlight: "新能源汽车销量全球第一，纯电动+插混双轮驱动" },
          { name: "拓普集团", highlight: "特斯拉核心供应商，汽车底盘+NVH+智能驾驶零部件A股龙头" },
          { name: "广汽集团", highlight: "新能源整车龙头，埃安+昊铂双品牌，海外出口加速" }
        ]
      },
      {
        name: "两轮电动车",
        companies: [
          { name: "新日股份", highlight: "电动自行车A股龙头，智能锂电车型+新国标换车潮受益" },
          { name: "爱玛科技", highlight: "电动自行车A股龙头，下沉市场渗透率最高，全称爱玛科技" },
          { name: "九号公司", highlight: "智能短交通A股龙头，电动滑板车+平衡车全球市占率第一" }
        ]
      }
    ],
    downstream: [
      {
        name: "出行服务",
        companies: [
          { name: "大众交通", highlight: "出行服务A股龙头，网约车+出租车运营，新能源汽车替换率提升" },
          { name: "永安行", highlight: "共享出行A股龙头，共享单车+氢能自行车双赛道布局" },
          { name: "中路股份", highlight: "共享出行A股标的，自行车制造+共享单车运营" }
        ]
      },
      {
        name: "物流配送",
        companies: [
          { name: "顺丰控股", highlight: "快递A股龙头，新能源末端配送车大规模采购，绿色物流领先" },
          { name: "传化智联", highlight: "智能物流平台A股龙头，公路港+数字化物流网络覆盖全国" },
          { name: "达嘉维康", highlight: "医药配送+社区服务A股龙头，末端配送网络覆盖广泛" }
        ]
      }
    ]
  },

   // ========== 油气开采 ==========
   "油气开采": {
     name: "油气开采",
     color: "#1f2937",
     gradient: ["#1f2937", "#111827"],
     description: "油气开采产业链涵盖勘探、钻井、生产、运输等环节，是全球最重要的能源供应链之一。",
     upstream: [
       {
         name: "油气勘探服务",
         companies: [
           { name: "中国石油", highlight: "国内油气勘探龙头，勘探技术和资源储量全球领先" },
           { name: "中国海油", highlight: "海上油气勘探和开采A股龙头，南海油气资源开发主力" },
           { name: "石化机械", highlight: "油气开采钻机和设备供应商，深井钻机市占率国内第一" }
         ]
       },
       {
         name: "钻井设备",
         companies: [
           { name: "杰瑞股份", highlight: "油气装备龙头，压裂设备和钻完井装备全球竞争力强" },
           { name: "海油工程", highlight: "海洋油气工程A股龙头，深水钻井平台+FPSO建造市占率国内第一" },
           { name: "中信特钢", highlight: "特钢龙头，轴承钢+油气开采用特种钢市占率全球第一" }
         ]
       }
     ],
     midstream: [
       {
         name: "油气生产",
         companies: [
           { name: "中国石油", highlight: "国内原油生产龙头，年原油产量占国内总产量60%+" },
           { name: "中国海油", highlight: "海上油气生产A股龙头，深水油气技术全球领先" },
           { name: "陕建股份", highlight: "陕西能源建设A股龙头，延长石油体系A股上市平台" }
         ]
       },
       {
         name: "油气运输",
         companies: [
           { name: "中国石油", highlight: "输油管道和油轮运输龙头，国内油气运输网络最完善" },
           { name: "中国石化", highlight: "成品油运输和销售龙头，国内加油站数量最多" },
           { name: "中远海能", highlight: "油轮运输A股龙头，国际原油运输市占率全球前三" }
         ]
       }
     ],
     downstream: [
       {
         name: "炼油加工",
         companies: [
           { name: "中国石化", highlight: "国内炼油龙头，汽柴油和化工品产能全球第二" },
           { name: "中国石油", highlight: "炼油一体化运营，国内汽油和柴油生产和销售" },
           { name: "齐翔腾达", highlight: "民营炼化A股龙头，碳四深加工+MTBE产能全国前列" }
         ]
       },
       {
         name: "消费终端",
         companies: [
           { name: "中国石化", highlight: "加油站龙头，全国加油站网络最大" },
           { name: "中国石油", highlight: "加油和便利店一体化，消费者进油站客户体验最优" },
           { name: "泰山石油", highlight: "民营加油站A股龙头，中石化参股，山东民营加油站网络龙头" }
         ]
       }
     ]
   },

  // ========== 军工 ==========
  "军工": {
    name: "军工",
    color: "#374151",
    gradient: ["#374151", "#111827"],
    description: "军工产业是国家战略性支柱产业，涵盖航空发动机、导弹武器、军用电子、舰船制造等核心领域，2025-2026年军工信息化+商业航天+无人装备驱动新一轮高景气周期。",
    upstream: [
      {
        name: "军用材料/元器件",
        companies: [
          { name: "抚顺特钢", highlight: "高温合金龙头，航空发动机+导弹用特种钢材市占率全国第一" },
          { name: "西部超导", highlight: "超导材料+钛合金，军用飞机钛合金棒材核心供应商" },
          { name: "菲利华", highlight: "石英玻璃龙头，导弹红外整流罩+半导体石英材料双赛道" },
          { name: "鸿远电子", highlight: "军用MLCC龙头，宇航级瓷介电容器市占率行业第一" }
        ]
      },
      {
        name: "军用芯片/电子",
        companies: [
          { name: "紫光国微", highlight: "军用安全芯片+FPGA龙头，特种IC国产替代核心标的" },
          { name: "振芯科技", highlight: "北斗导航芯片+军用终端，北斗三号换装需求放量" },
          { name: "复旦微电", highlight: "军用FPGA+存储芯片，高可靠FPGA国产替代领军" }
        ]
      }
    ],
    midstream: [
      {
        name: "航空发动机/飞机",
        companies: [
          { name: "航发动力", highlight: "航空发动机总装龙头，涡扇/涡喷发动机国产化唯一平台" },
          { name: "中航沈飞", highlight: "歼击机总装龙头，歼-15/歼-16主力机型唯一制造商" },
          { name: "中航西飞", highlight: "大飞机+运输机总装，运-20/轰-20核心制造平台" }
        ]
      },
      {
        name: "导弹/无人装备",
        companies: [
          { name: "高德红外", highlight: "红外导引头+导弹核心部件，反坦克/防空导弹红外龙头" },
          { name: "中无人机", highlight: "翼龙系列军用无人机，察打一体无人机出口量全国第一" },
          { name: "航天彩虹", highlight: "彩虹系列无人机，军贸出口+国内列装双增长" }
        ]
      }
    ],
    downstream: [
      {
        name: "军工信息化",
        companies: [
          { name: "中科星图", highlight: "军用数字地球+战场态势感知，GEOVIS平台军方订单高增" },
          { name: "航天宏图", highlight: "遥感卫星数据处理+军事测绘，PIE平台军方市占率第一" },
          { name: "佳缘科技", highlight: "军用网络安全+数据加密，军队信息化安全核心供应商" }
        ]
      },
      {
        name: "舰船/海军装备",
        companies: [
          { name: "中国船舶", highlight: "军用舰船总装龙头，航母+驱逐舰+护卫舰唯一制造平台" },
          { name: "中国海防", highlight: "水声装备+舰船电子，水下探测+声纳系统核心配套" },
          { name: "湘电股份", highlight: "舰船综合电力系统，电磁弹射+综合电力推进龙头" }
        ]
      }
    ]
  },

  // ========== 商业航天 ==========
  "商业航天": {
    name: "商业航天",
    color: "#1d4ed8",
    gradient: ["#1d4ed8", "#1e3a8a"],
    description: "商业航天是以市场化方式开展航天活动的新兴产业，涵盖可复用火箭、卫星互联网星座、太空资源开发等，2025年卫星组网+可复用火箭试飞驱动产业加速落地。",
    upstream: [
      {
        name: "火箭发动机/推进",
        companies: [
          { name: "航天动力", highlight: "液体火箭发动机核心供应商，液氧甲油发动机技术积累深厚" },
          { name: "钢研高纳", highlight: "高温合金铸件，火箭发动机涡轮盘+燃烧室核心材料" },
          { name: "斯瑞新材", highlight: "火箭发动机铜合金推力室，蓝箭/天兵等民营火箭核心配套" }
        ]
      },
      {
        name: "卫星核心部件",
        companies: [
          { name: "航天电子", highlight: "星载计算机+测控设备，卫星电子系统核心配套市占率第一" },
          { name: "臻镭科技", highlight: "星载相控阵TR芯片，低轨卫星通信载荷核心器件" },
          { name: "铖昌科技", highlight: "相控阵芯片，卫星通信波束成形芯片国产替代先锋" }
        ]
      }
    ],
    midstream: [
      {
        name: "火箭制造/发射",
        companies: [
          { name: "中国卫通", highlight: "卫星运营龙头，通信广播卫星在轨运营量全国第一" },
          { name: "航天电子", highlight: "航天电子设备A股龙头，火箭测控+卫星电子核心配套市占率第一" },
          { name: "斯瑞新材", highlight: "火箭发动机铜合金推力室A股龙头，蓝箭/天兵等民营火箭核心配套" }
        ]
      },
      {
        name: "卫星制造/组网",
        companies: [
          { name: "中国卫星", highlight: "小卫星总装龙头，低轨卫星星座组网核心制造平台" },
          { name: "中国卫星", highlight: "小卫星总装A股龙头，低轨卫星星座组网核心制造平台" },
          { name: "奥普特", highlight: "机器视觉+遥感图像处理A股龙头，商业遥感数据应用市占率领先" }
        ]
      }
    ],
    downstream: [
      {
        name: "卫星互联网/通信",
        companies: [
          { name: "中国卫通", highlight: "高轨卫星通信运营，Ka宽带卫星服务覆盖全国" },
          { name: "华力创通", highlight: "卫星通信终端+基带芯片，天通卫星手机直连核心配套" },
          { name: "海格通信", highlight: "北斗+卫星通信双模终端，军用+民用市场双驱动" }
        ]
      },
      {
        name: "遥感/导航应用",
        companies: [
          { name: "中科星图", highlight: "数字地球+遥感数据服务，商业遥感应用市占率第一" },
          { name: "航天宏图", highlight: "遥感数据处理+行业应用，PIE平台覆盖应急/气象/农业" },
          { name: "北斗星通", highlight: "北斗高精度定位，厘米级定位模组市占率行业领先" }
        ]
      }
    ]
  },

  // ========== 量子科技 ==========
  "量子科技": {
    name: "量子科技",
    color: "#7c3aed",
    gradient: ["#7c3aed", "#4c1d95"],
    description: "量子科技包括量子计算、量子通信和量子测量三大方向，是国家战略级前沿技术，2025年量子计算机比特数突破+量子通信网络扩展驱动产业化加速。",
    upstream: [
      {
        name: "量子芯片/核心器件",
        companies: [
          { name: "国盾量子", highlight: "量子通信设备龙头，量子密钥分发设备市占率全国第一" },
          { name: "国盾量子", highlight: "量子计算+量子通信双赛道A股龙头，本源悟空量子计算机合作方" },
          { name: "寒武纪", highlight: "AI芯片+量子计算协处理器，量子-经典混合计算架构研发" }
        ]
      },
      {
        name: "低温/控制设备",
        companies: [
          { name: "中船特气", highlight: "超导用高纯特气，量子计算稀释制冷机核心气源" },
          { name: "东方钽业", highlight: "超导铌材，量子计算超导腔体核心原材料" },
          { name: "必创科技", highlight: "单光子探测器，量子通信+量子测量核心探测器件" }
        ]
      }
    ],
    midstream: [
      {
        name: "量子计算整机",
        companies: [
          { name: "国盾量子", highlight: "量子计算整机+量子计算云平台，国内量子计算商业化领先" },
          { name: "国盾量子", highlight: "量子计算整机+云平台A股龙头，量子操作系统自主可控" },
          { name: "科大国创", highlight: "量子计算软件+算法A股龙头，光量子计算软件平台研发领先" }
        ]
      },
      {
        name: "量子通信网络",
        companies: [
          { name: "国盾量子", highlight: "量子保密通信网络，京沪干线+合肥城域网核心设备商" },
          { name: "亨通光电", highlight: "量子通信光纤+网络，量子保密通信干线光缆核心供应" },
          { name: "迪普科技", highlight: "量子安全网关+加密设备，量子通信网络安全配套" }
        ]
      }
    ],
    downstream: [
      {
        name: "量子通信应用",
        companies: [
          { name: "中国电信", highlight: "量子安全通话+量子密钥分发，天翼量子密话商用推广" },
          { name: "工商银行", highlight: "量子金融加密，银行间量子保密通信试点应用" },
          { name: "国网信通", highlight: "国家电网A股平台，电力量子加密通信+电网调度安全防护" }
        ]
      },
      {
        name: "量子测量/传感",
        companies: [
          { name: "中航沈飞", highlight: "量子陀螺+惯性导航，量子测量军用前景广阔" },
          { name: "科大国创", highlight: "量子精密测量，量子重力仪+量子磁力计应用探索" },
          { name: "飞利信", highlight: "量子随机数发生器，量子加密+安全认证场景落地" }
        ]
      }
    ]
  },

  // ========== 脑机接口 ==========
  "脑机接口": {
    name: "脑机接口",
    color: "#ec4899",
    gradient: ["#ec4899", "#9d174d"],
    description: "脑机接口（BCI）是连接大脑与外部设备的通信技术，涵盖侵入式/非侵入式两种路线，2025年Neuralink临床突破+国内政策支持推动产业从实验室走向临床应用。",
    upstream: [
      {
        name: "电极/传感器",
        companies: [
          { name: "爱朋医疗", highlight: "脑电监测+神经调控，脑机接口核心电极及信号采集" },
          { name: "诺诚健华", highlight: "神经科学药物+脑电信号分析，脑机接口生物信号前端" },
          { name: "微导纳米", highlight: "微纳加工技术，脑机接口微电极阵列制造工艺核心" }
        ]
      },
      {
        name: "芯片/信号处理",
        companies: [
          { name: "汉威科技", highlight: "生物传感+神经信号处理，脑电信号采集芯片" },
          { name: "森霸传感", highlight: "红外传感+生物电信号，非侵入式脑机接口传感器" },
          { name: "赛微电子", highlight: "MEMS工艺代工，脑机接口微电极MEMS加工能力" }
        ]
      }
    ],
    midstream: [
      {
        name: "脑机接口系统",
        companies: [
          { name: "创新医疗", highlight: "脑机接口+康复医疗，非侵入式脑机康复训练系统" },
          { name: "三博脑科", highlight: "神经外科+脑机临床，癫痫脑电监测+脑机接口手术应用" },
          { name: "科大讯飞", highlight: "脑电信号解码+AI语音，脑机接口语音合成技术" }
        ]
      },
      {
        name: "神经调控设备",
        companies: [
          { name: "伟思医疗", highlight: "神经调控+磁刺激，经颅磁刺激设备市占率国内领先" },
          { name: "翔宇医疗", highlight: "康复医疗器械，脑机接口康复训练设备研发中" },
          { name: "迈普医学", highlight: "神经外科植入物，脑机接口植入材料生物兼容性优势" }
        ]
      }
    ],
    downstream: [
      {
        name: "医疗康复",
        companies: [
          { name: "创新医疗", highlight: "脑卒中+脊髓损伤脑机康复，非侵入式BCI临床应用领先" },
          { name: "复星医药", highlight: "神经退行性疾病+脑机药物组合，帕金森/阿尔茨海默" },
          { name: "三博脑科", highlight: "癫痫手术+脑机监测，术中脑电信号精准定位" }
        ]
      },
      {
        name: "消费/其他应用",
        companies: [
          { name: "科大讯飞", highlight: "意念打字+脑控智能家居，消费级脑机接口原型开发" },
          { name: "汤姆猫", highlight: "脑机接口+游戏交互，脑电波控制游戏Demo发布" },
          { name: "南京熊猫", highlight: "脑机接口+工业控制，意念控制机械臂工业应用探索" }
        ]
      }
    ]
  },

  // ========== 稀土永磁 ==========
  "稀土永磁": {
    name: "稀土永磁",
    color: "#dc2626",
    gradient: ["#dc2626", "#991b1b"],
    description: "稀土永磁产业链涵盖稀土开采冶炼、永磁材料制造到电机及终端应用，是新能源汽车、人形机器人、风电等高端制造的核心材料，2025年稀土管制+机器人电机需求爆发驱动景气上行。",
    upstream: [
      {
        name: "稀土开采/冶炼",
        companies: [
          { name: "北方稀土", highlight: "全球最大轻稀土供应商，白云鄂博矿独家开采权，镨钕产量全球第一" },
          { name: "中国稀土", highlight: "中重稀土龙头，南方离子型稀土矿资源储量全国第一" },
          { name: "盛和资源", highlight: "海外稀土布局，美国Mountain Pass矿+缅甸稀土进口加工" }
        ]
      },
      {
        name: "稀土加工/分离",
        companies: [
          { name: "五矿稀土", highlight: "稀土分离提纯技术领先，高纯稀土氧化物产能国内前三" },
          { name: "广晟有色", highlight: "南方中重稀土分离+深加工，铽镝等重稀土产量领先" },
          { name: "厦门钨业", highlight: "稀土+钨双主业，稀土发光材料和催化材料深加工" }
        ]
      }
    ],
    midstream: [
      {
        name: "钕铁硼永磁",
        companies: [
          { name: "金力永磁", highlight: "高性能钕铁硼龙头，新能源车+风电+机器人磁钢出货量行业第一" },
          { name: "正海磁材", highlight: "新能源车驱动电机磁钢，比亚迪+特斯拉核心供应商" },
          { name: "宁波韵升", highlight: "钕铁硼+伺服电机磁钢，工业机器人+家电用磁材市占率领先" }
        ]
      },
      {
        name: "永磁电机",
        companies: [
          { name: "汇川技术", highlight: "伺服电机+永磁同步电机，工业机器人+人形机器人驱动核心" },
          { name: "卧龙电驱", highlight: "新能源车+低空经济电机，永磁同步电机多场景应用" },
          { name: "方正电机", highlight: "新能源车驱动电机，扁线+永磁电机效率全球领先" }
        ]
      }
    ],
    downstream: [
      {
        name: "新能源车/风电",
        companies: [
          { name: "比亚迪", highlight: "全球新能源车销量第一，永磁驱动电机需求最大终端" },
          { name: "金风科技", highlight: "直驱永磁风力发电机，稀土永磁风电应用最大场景" },
          { name: "横店东磁", highlight: "磁性材料A股龙头，新能源车+风电永磁磁瓦出货量行业前三" }
        ]
      },
      {
        name: "机器人/精密设备",
        companies: [
          { name: "绿的谐波", highlight: "谐波减速器+永磁电机，人形机器人关节驱动核心" },
          { name: "绿的谐波", highlight: "谐波减速器+永磁电机A股龙头，人形机器人关节驱动核心" },
          { name: "大族激光", highlight: "精密激光设备+直线电机，稀土永磁直线电机高端应用" }
        ]
      }
    ]
  },

  // ========== 创新药 ==========
  "创新药": {
    name: "创新药",
    color: "#059669",
    gradient: ["#059669", "#065f46"],
    description: "创新药产业链涵盖药物发现、临床开发、CMC生产到商业化销售，是中国医药产业升级的核心方向，2025年创新药出海+GLP-1减肥药+ADC药物驱动行业高景气。",
    upstream: [
      {
        name: "药物发现/CRO",
        companies: [
          { name: "药明康德", highlight: "全球CXO龙头，药物发现+一体化研发服务全球市占率前二" },
          { name: "凯莱英", highlight: "小分子CDMO龙头，连续反应技术全球领先，A股CXO核心标的" },
          { name: "康龙化成", highlight: "药物发现CRO第二梯队，实验室+CMC一站式服务" },
          { name: "泰格医药", highlight: "临床CRO龙头，临床试验服务国内市占率第一" }
        ]
      },
      {
        name: "原料药/中间体",
        companies: [
          { name: "华海药业", highlight: "特色原料药龙头，沙坦类+普利类原料药全球市占率第一" },
          { name: "九洲药业", highlight: "CDMO+原料药，诺华核心供应商，卡马西平原料药龙头" },
          { name: "普洛药业", highlight: "原料药+CDMO双主业，头孢类+降糖类原料药规模领先" }
        ]
      }
    ],
    midstream: [
      {
        name: "创新药研发",
        companies: [
          { name: "恒瑞医药", highlight: "中国创新药一哥，PD-1+ADC+自免管线最丰富，海外临床加速" },
          { name: "百济神州", highlight: "泽布替尼全球销售额破百亿，中国创新药出海标杆" },
          { name: "荣昌生物", highlight: "ADC+自免双核心A股龙头，维迪西妥单抗ADC出海授权创纪录" }
        ]
      },
      {
        name: "生物类似药/CGT",
        companies: [
          { name: "复星医药", highlight: "创新药+生物类似药龙头，汉利康+汉曲优持续放量，A股医药综合平台" },
          { name: "冠昊生物", highlight: "再生医学+细胞治疗，生物型硬脑脊膜补片市占率国内领先" },
          { name: "荣昌生物", highlight: "ADC+自免双核心，维迪西妥单抗ADC出海授权创纪录" }
        ]
      }
    ],
    downstream: [
      {
        name: "GLP-1/代谢药",
        companies: [
          { name: "荣昌生物", highlight: "ADC+GLP-1双赛道A股龙头，泰它西普自免+维迪西妥单抗ADC双核心" },
          { name: "恒瑞医药", highlight: "GLP-1+胰岛素双布局，HRS9531减重临床数据优异" },
          { name: "华东医药", highlight: "利拉鲁肽+司美格鲁肽类似药，减肥药商业化领先" }
        ]
      },
      {
        name: "创新药销售/渠道",
        companies: [
          { name: "恒瑞医药", highlight: "国内处方药销售团队最大，创新药收入占比超50%" },
          { name: "恒瑞医药", highlight: "创新药A股一哥，抗肿瘤+肝病+呼吸全领域，创新药放量加速" },
          { name: "华东医药", highlight: "创新药+医美A股龙头，利拉鲁肽+司美格鲁肽减肥药商业化领先" }
        ]
      }
    ]
  },

  // ========== 有色金属 ==========
  "有色金属": {
    name: "有色金属",
    color: "#ca8a04",
    gradient: ["#ca8a04", "#854d0e"],
    description: "有色金属产业链涵盖铜、铝、锂、钴、镍等金属的采选、冶炼、加工到终端应用，2025年AI数据中心用铜激增+全球供应链重构+新能源金属需求持续增长。",
    upstream: [
      {
        name: "铜矿采选",
        companies: [
          { name: "紫金矿业", highlight: "全球铜矿+金矿龙头，铜矿产量全球前五，海外资源布局最广" },
          { name: "洛阳钼业", highlight: "铜钴双主业，刚果金TFM+KFM铜钴矿产量高增" },
          { name: "西部矿业", highlight: "国内铜矿龙头，玉龙铜矿扩产+铅锌铜多金属协同" }
        ]
      },
      {
        name: "铝/锂/镍",
        companies: [
          { name: "中国铝业", highlight: "全球氧化铝+电解铝龙头，国内铝土矿资源储量第一" },
          { name: "天齐锂业", highlight: "锂资源全球龙头，格林布什锂矿+智利SQM股权双保险" },
          { name: "华友钴业", highlight: "钴镍锂三元前驱体，印尼镍矿+新能源材料一体化" }
        ]
      }
    ],
    midstream: [
      {
        name: "铜铝冶炼加工",
        companies: [
          { name: "江西铜业", highlight: "国内铜冶炼龙头，阴极铜产量全国第一，铜加工材产能领先" },
          { name: "中国铝业", highlight: "国内电解铝龙头，氧化铝+电解铝产能全国第一，铝土矿自给率高" },
          { name: "海亮股份", highlight: "铜管+铜棒加工龙头，空调制冷+建筑用铜管市占率第一" }
        ]
      },
      {
        name: "新能源金属加工",
        companies: [
          { name: "赣锋锂业", highlight: "锂盐加工全球龙头，氢氧化锂+碳酸锂产能全球前三" },
          { name: "寒锐钴业", highlight: "钴粉+钴盐加工，硬质合金+电池材料钴粉市占率国内前二" },
          { name: "盛屯矿业", highlight: "镍钴冶炼+新能源材料，印尼镍铁+高冰镍产能释放" }
        ]
      }
    ],
    downstream: [
      {
        name: "电力/基建用铜铝",
        companies: [
          { name: "国网信通", highlight: "国家电网A股平台，特高压+智能电网信息化建设核心供应商" },
          { name: "中国中车", highlight: "轨道交通+风电用铜铝铸件，高铁+风电装备铜材需求大" },
          { name: "远东股份", highlight: "线缆龙头，特高压+新能源+数据中心用铜缆市占率第一" }
        ]
      },
      {
        name: "AI数据中心/新能源",
        companies: [
          { name: "英维克", highlight: "数据中心液冷散热铜管+连接器，AI服务器铜需求激增" },
          { name: "宁德时代", highlight: "锂电池铜箔+铝箔需求，全球动力电池铜消耗量最大" },
          { name: "比亚迪", highlight: "新能源车用铜量是燃油车4倍，全球最大铜消耗终端之一" }
        ]
      }
    ]
  },

  // ========== PCB ==========
  "PCB": {
    name: "PCB",
    color: "#0284c7",
    gradient: ["#0284c7", "#075985"],
    description: "PCB（印制电路板）是电子产品之母，AI服务器+800G交换机+智能驾驶拉动高多层/高频高速PCB需求爆发，2025年AI算力扩产驱动PCB行业量价齐升。",
    upstream: [
      {
        name: "覆铜板/铜箔",
        companies: [
          { name: "生益科技", highlight: "覆铜板龙头，高频高速CCL国内市占率第一，AI服务器CCL认证领先" },
          { name: "南亚新材", highlight: "高速覆铜板，800G交换机用极低损耗CCL量产突破" },
          { name: "铜冠铜箔", highlight: "电子铜箔+锂电铜箔，高频高速铜箔国产替代核心" }
        ]
      },
      {
        name: "专用材料/设备",
        companies: [
          { name: "生益科技", highlight: "覆铜板+粘结片A股龙头，FR-4覆铜板国内市占率第一" },
          { name: "大族数控", highlight: "PCB钻孔+成型设备，PCB专用设备国产化率提升" },
          { name: "芯碁微装", highlight: "PCB直写光刻设备，LDI曝光机国产替代领先" }
        ]
      }
    ],
    midstream: [
      {
        name: "高多层PCB",
        companies: [
          { name: "沪电股份", highlight: "AI服务器+交换机PCB龙头，800G交换机高多层板全球前三" },
          { name: "深南电路", highlight: "高端PCB+封装基板，AI服务器+数据中心板市占率国内第一" },
          { name: "胜宏科技", highlight: "高阶HDI+多层板，AI算力卡用PCB批量交付能力领先" }
        ]
      },
      {
        name: "柔性/特种PCB",
        companies: [
          { name: "鹏鼎控股", highlight: "全球PCB产值第一，FPC+HDI苹果核心供应商" },
          { name: "东山精密", highlight: "FPC+Mini LED基板，消费电子+汽车FPC双驱动" },
          { name: "景旺电子", highlight: "多层板+FPC+金属基板，汽车PCB市占率国内前三" }
        ]
      }
    ],
    downstream: [
      {
        name: "AI服务器/数据中心",
        companies: [
          { name: "沪电股份", highlight: "英伟达+思科交换机PCB核心供应商，AI算力PCB需求爆发" },
          { name: "胜宏科技", highlight: "GPU加速卡PCB，H100/B200算力板量产交付" },
          { name: "深南电路", highlight: "数据中心交换机+存储PCB，5.0Tbps高速背板批量交付" }
        ]
      },
      {
        name: "汽车/消费电子",
        companies: [
          { name: "景旺电子", highlight: "智能驾驶域控制器PCB，车规级PCB认证最全" },
          { name: "世华科技", highlight: "消费电子PCB+功能材料，苹果产业链核心供应商" },
          { name: "崇达技术", highlight: "汽车+工控PCB，小批量板快速交付能力行业领先" }
        ]
      }
    ]
  },

  // ========== 数字货币 ==========
  "数字货币": {
    name: "数字货币",
    color: "#e11d48",
    gradient: ["#e11d48", "#881337"],
    description: "数字货币产业链涵盖数字人民币发行流通、跨境支付（CIPS/mBridge）、加密数字资产等，2025年去美元化+跨境支付基建+数字人民币扩围驱动板块反复活跃。",
    upstream: [
      {
        name: "安全芯片/加密",
        companies: [
          { name: "紫光国微", highlight: "数字货币安全芯片龙头，数字人民币硬钱包+安全模块核心供应商" },
          { name: "飞天诚信", highlight: "数字货币硬件钱包，数字人民币可视硬钱包率先量产" },
          { name: "数字认证", highlight: "PKI加密+电子签名，数字人民币认证加密核心配套" }
        ]
      },
      {
        name: "支付终端/硬件",
        companies: [
          { name: "楚天龙", highlight: "数字人民币硬钱包+支付终端，数字人民币卡商龙头" },
          { name: "新大陆", highlight: "POS终端+扫码设备，数字人民币受理终端市占率第一" },
          { name: "拉卡拉", highlight: "第三方支付龙头，数字人民币收单业务率先落地" }
        ]
      }
    ],
    midstream: [
      {
        name: "数字人民币系统",
        companies: [
          { name: "长亮科技", highlight: "银行核心系统+数字人民币，商业银行数字人民币系统市占率第一" },
          { name: "科蓝软件", highlight: "数字人民币+银行IT，互联网银行核心系统配套" },
          { name: "宇信科技", highlight: "银行IT+数字人民币运营，国有大行数字人民币系统核心供应商" }
        ]
      },
      {
        name: "跨境支付/CIPS",
        companies: [
          { name: "中油资本", highlight: "跨境人民币结算+石油贸易数字化，CIPS直接参与方" },
          { name: "东方通", highlight: "CIPS报文处理+金融中间件，人民币跨境支付系统核心配套" },
          { name: "京北方", highlight: "银行外包+CIPS运营支持，大行跨境支付IT服务核心" }
        ]
      }
    ],
    downstream: [
      {
        name: "银行/金融机构",
        companies: [
          { name: "工商银行", highlight: "数字人民币运营层核心银行，钱包开户+流通份额最大" },
          { name: "建设银行", highlight: "数字人民币场景应用最广，政务+民生+交通全覆盖" },
          { name: "中国银行", highlight: "跨境数字人民币先行者，冬奥+跨境场景试点领先" }
        ]
      },
      {
        name: "场景应用/区块链",
        companies: [
          { name: "恒生电子", highlight: "金融科技A股龙头，蚂蚁集团参股，数字人民币+区块链核心供应商" },
          { name: "广电运通", highlight: "数字人民币ATM+自助终端，银行智能终端市占率第一" },
          { name: "四方精创", highlight: "mBridge多边央行数字货币桥，跨境CBDC技术方案领先" }
        ]
      }
    ]
  }

};

// ========== 关键词映射（支持模糊匹配）==========
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
  "垂直AI": "AI应用",
  // ---- 低空经济 ----
  "低空经济": "低空经济",
  "eVTOL": "低空经济",
  "飞行汽车": "低空经济",
  "无人机": "低空经济",
  "通航": "低空经济",
  "低空": "低空经济",
  // ---- 固态电池 ----
  "固态电池": "固态电池",
  "半固态": "固态电池",
  "全固态": "固态电池",
  // ---- 华为概念 ----
  "华为概念": "华为概念",
  "华为": "华为概念",
  "鸿蒙": "华为概念",
  "昇腾": "华为概念",
  "华为汽车": "华为概念",
  "智选车": "华为概念",
  // ---- AIDC（智算中心）----
  "AIDC": "AIDC",
  "智算中心": "AIDC",
  "IDC": "AIDC",
  "数据中心运营": "AIDC",
  "算力中心": "AIDC",
  // ---- 核聚变 ----
  "核聚变": "核聚变",
  "可控核聚变": "核聚变",
  "聚变能源": "核聚变",
  "ITER": "核聚变",
  "CFETR": "核聚变",
   // ---- 数据要素 ----
   "数据要素": "数据要素",
   "数据资产": "数据要素",
   "数据交易": "数据要素",
   "数据确权": "数据要素",
   "数据安全": "数据要素",
   // ---- 白酒 ----
   "白酒": "白酒",
   "茅台": "白酒",
   "五粮液": "白酒",
   "泸州老窖": "白酒",
   "酱香型": "白酒",
   "浓香型": "白酒",
   // ---- 医疗器械 ----
   "医疗器械": "医疗器械",
   "医疗设备": "医疗器械",
   "医学影像": "医疗器械",
   "手术机器人": "医疗器械",
   "介入器械": "医疗器械",
   // ---- 农业 ----
   "农业": "农业",
   "农机": "农业",
   "种植": "农业",
   "养殖": "农业",
   "农资": "农业",
   "种子": "农业",
   "饲料": "农业",
   // ---- 钢铁 ----
   "钢铁": "钢铁",
   "钢材": "钢铁",
   "铁矿": "钢铁",
   "冶炼": "钢铁",
   "汽车钢": "钢铁",
   "特钢": "钢铁",
   // ---- 新能源 ----
   "新能源": "新能源",
   "光伏": "新能源",
   "风电": "新能源",
   "风力": "新能源",
   "储能": "新能源",
   "电站": "新能源",
   // ---- 消费电子 ----
   "消费电子": "消费电子",
   "手机": "消费电子",
   "电子产品": "消费电子",
   "3C": "消费电子",
   "屏幕": "消费电子",
   "电池": "消费电子",
   // ---- 芯片 ----
   "芯片": "芯片",
   "集成电路": "芯片",
   "晶圆": "芯片",
   "设计": "芯片",
   "制造": "芯片",
   "封测": "芯片",
   // ---- 机器人 ----
   "机器人": "机器人",
   "工业机器人": "机器人",
   "服务机器人": "机器人",
   "人形机器人": "机器人",
   "AGV": "机器人",
   "协作机器人": "机器人",
   // ---- 电动车 ----
   "电动车": "电动车",
   "两轮车": "电动车",
   "充电桩": "电动车",
   "换电": "电动车",
   "新能源汽车": "电动车",
   // ---- 光伏（重复，已覆盖）----
   "光伏组件": "光伏",
   "太阳能": "光伏",
   "光伏电站": "光伏",
   "分布式光伏": "光伏",
   // ---- 军工 ----
   "军工": "军工",
   "国防": "军工",
   "军事": "军工",
   "航空发动机": "军工",
   "导弹": "军工",
   "军用": "军工",
   "舰船": "军工",
   "军工信息化": "军工",
   // ---- 商业航天 ----
   "商业航天": "商业航天",
   "卫星互联网": "商业航天",
   "可复用火箭": "商业航天",
   "火箭": "商业航天",
   "卫星": "商业航天",
   "星座": "商业航天",
   "低轨卫星": "商业航天",
   "星链": "商业航天",
   // ---- 量子科技 ----
   "量子科技": "量子科技",
   "量子计算": "量子科技",
   "量子通信": "量子科技",
   "量子测量": "量子科技",
   "量子密码": "量子科技",
   "量子": "量子科技",
   // ---- 脑机接口 ----
   "脑机接口": "脑机接口",
   "脑机": "脑机接口",
   "BCI": "脑机接口",
   "脑电": "脑机接口",
   "神经调控": "脑机接口",
   "Neuralink": "脑机接口",
   // ---- 稀土永磁 ----
   "稀土永磁": "稀土永磁",
   "稀土": "稀土永磁",
   "钕铁硼": "稀土永磁",
   "永磁": "稀土永磁",
   "永磁电机": "稀土永磁",
   "镨钕": "稀土永磁",
   // ---- 创新药 ----
   "创新药": "创新药",
   "生物医药": "创新药",
   "CXO": "创新药",
   "CRO": "创新药",
   "CDMO": "创新药",
   "GLP-1": "创新药",
   "减肥药": "创新药",
   "ADC": "创新药",
   "PD-1": "创新药",
   // ---- 有色金属 ----
   "有色金属": "有色金属",
   "铜": "有色金属",
   "铝": "有色金属",
   "锂矿": "有色金属",
   "钴": "有色金属",
   "镍": "有色金属",
   "铜矿": "有色金属",
   "电解铝": "有色金属",
   // ---- PCB ----
   "PCB": "PCB",
   "电路板": "PCB",
   "印制电路板": "PCB",
   "覆铜板": "PCB",
   "线路板": "PCB",
   "FPC": "PCB",
   "HDI": "PCB",
   // ---- 数字货币 ----
   "数字货币": "数字货币",
   "数字人民币": "数字货币",
   "DCEP": "数字货币",
   "跨境支付": "数字货币",
   "CIPS": "数字货币",
   "CBDC": "数字货币",
   "区块链": "数字货币",
   "mBridge": "数字货币"
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