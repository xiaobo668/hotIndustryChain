/**
 * 产业链数据库
 * 包含：半导体、AI算力、新能源汽车、光伏、医药生物、消费电子、人工智能、锂电池等行业
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
          { code: "688126", name: "沪硅产业", highlight: "12英寸硅片龙头，300mm大硅片国产替代领军" },
          { code: "300703", name: "鼎龙股份", highlight: "CMP抛光材料市占率国内第一，切入IC材料核心环节" },
          { code: "300688", name: "创业慧康", highlight: "光刻胶原材料供应商" },
          { code: "688428", name: "兰卡斯特", highlight: "电子特气龙头，CVD/ALD工艺用气体国产替代加速" }
        ]
      },
      {
        name: "半导体设备",
        companies: [
          { code: "688521", name: "芯源微", highlight: "涂胶显影设备龙头，国内市占率第一" },
          { code: "688187", name: "时代电气", highlight: "离子注入机突破，国产设备重大进展" },
          { code: "688396", name: "华海清科", highlight: "CMP设备国产化率持续提升，28nm已规模验证" },
          { code: "688330", name: "宏微科技", highlight: "功率半导体器件设备领域重要供应商" }
        ]
      }
    ],
    midstream: [
      {
        name: "芯片设计（Fabless）",
        companies: [
          { code: "688599", name: "天岳先进", highlight: "碳化硅衬底龙头，新能源汽车需求爆发" },
          { code: "688395", name: "芯动联科", highlight: "时钟芯片龙头，5G基站、工业领域渗透率快速提升" },
          { code: "002230", name: "科大讯飞", highlight: "AI芯片与语音大模型协同，算力芯片国产化布局" },
          { code: "688981", name: "中芯国际", highlight: "国内晶圆代工龙头，14nm工艺量产，先进制程持续突破" }
        ]
      },
      {
        name: "晶圆制造（IDM/Foundry）",
        companies: [
          { code: "688981", name: "中芯国际", highlight: "国内最大晶圆代工厂，营收持续增长，FinFET工艺量产" },
          { code: "600460", name: "士兰微", highlight: "IDM模式，功率+射频+MEMS多元布局，车规级产品放量" },
          { code: "688122", name: "西安奕斯伟", highlight: "12寸硅片配套制造，Chiplet先进封装布局" }
        ]
      }
    ],
    downstream: [
      {
        name: "封装测试",
        companies: [
          { code: "002156", name: "通富微电", highlight: "Chiplet先进封装，AMD重要合作伙伴，营收超百亿" },
          { code: "002185", name: "华天科技", highlight: "传统封测+先进封装，车规级封测需求旺盛" },
          { code: "600171", name: "上海贝岭", highlight: "模拟芯片+封测一体化，工控与汽车电子双轮驱动" }
        ]
      },
      {
        name: "终端应用",
        companies: [
          { code: "000725", name: "京东方A", highlight: "面板龙头，半导体显示+传感器全面布局" },
          { code: "002049", name: "紫光国微", highlight: "安全芯片+存储芯片，国密芯片市场份额领先" },
          { code: "688256", name: "寒武纪", highlight: "AI推理芯片，云端+边缘端全覆盖，大模型训练芯片放量" }
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
          { code: "688256", name: "寒武纪", highlight: "国内AI芯片龙头，训练+推理全系列，大模型专用芯片MLU开始规模部署" },
          { code: "688041", name: "海光信息", highlight: "X86架构CPU+DCU深算单元，全国产化AI服务器解决方案" },
          { code: "688009", name: "中国软件", highlight: "国产操作系统，AI算力国产化软件栈核心" },
          { code: "002600", name: "领益智造", highlight: "英伟达散热组件核心供应商，AI服务器热管理需求暴增" }
        ]
      },
      {
        name: "高速互联/存储",
        companies: [
          { code: "688058", name: "菲菱科思", highlight: "InfiniBand/以太网高速互联模块，AI集群组网关键部件" },
          { code: "002138", name: "顺络电子", highlight: "高频电感磁性元件，AI服务器磁性器件需求激增" },
          { code: "688301", name: "奕东电子", highlight: "AI服务器连接器，满足高密度、高速信号传输需求" }
        ]
      }
    ],
    midstream: [
      {
        name: "服务器/整机",
        companies: [
          { code: "000977", name: "浪潮信息", highlight: "AI服务器出货量全球前三，英伟达H100/H800主要ODM合作方" },
          { code: "300308", name: "中际旭创", highlight: "800G光模块龙头，AI数据中心光互联核心供应商" },
          { code: "002642", name: "荣联科技", highlight: "AI整机柜交付能力，国内头部云厂商核心供应商" },
          { code: "688100", name: "威腾电气", highlight: "数据中心配电方案，大功率AI机柜供电解决方案" }
        ]
      },
      {
        name: "光模块/网络",
        companies: [
          { code: "300308", name: "中际旭创", highlight: "800G光模块出货量全球第一，已送样1.6T产品" },
          { code: "301281", name: "华工科技", highlight: "光芯片+光器件垂直整合，25G/100G规模出货" },
          { code: "688220", name: "翱捷科技", highlight: "无线连接芯片，端侧AI接入层核心芯片" }
        ]
      }
    ],
    downstream: [
      {
        name: "数据中心/IDC",
        companies: [
          { code: "300053", name: "欧数互动", highlight: "GPU云算力租赁，弹性算力平台日均使用量超10万卡时" },
          { code: "002236", name: "大华股份", highlight: "AIoT端侧算力，智慧城市+AI视频分析" },
          { code: "300455", name: "金科文化", highlight: "算力租赁+大模型应用，AIGC内容生产规模化" }
        ]
      },
      {
        name: "大模型/AI应用",
        companies: [
          { code: "600745", name: "闻泰科技", highlight: "AI手机ODM龙头，端侧AI推理芯片集成方案" },
          { code: "002230", name: "科大讯飞", highlight: "星火大模型，教育+医疗+办公AI应用商业化落地" },
          { code: "688579", name: "山石网科", highlight: "AI安全大模型，网络安全智能化升级" },
          { code: "688271", name: "联影医疗", highlight: "AI辅助诊断+影像大模型，医疗AI商业化领先" }
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
          { code: "002466", name: "天齐锂业", highlight: "全球最大锂矿开采商之一，参股SQM锂矿资产" },
          { code: "002460", name: "赣锋锂业", highlight: "锂资源+锂电池双主业，固态电池量产进程加速" },
          { code: "300073", name: "当升科技", highlight: "高镍三元正极材料龙头，海外客户持续突破" },
          { code: "300438", name: "鹏欣资源", highlight: "钴资源布局，刚果金矿产核心资产" }
        ]
      },
      {
        name: "电芯/动力电池",
        companies: [
          { code: "300750", name: "宁德时代", highlight: "全球动力电池装机量第一，麒麟电池+钠离子电池技术引领" },
          { code: "000100", name: "TCL中环", highlight: "光伏硅片+车规级功率器件，新能源双赛道布局" },
          { code: "002812", name: "恩捷股份", highlight: "锂电隔膜全球市占率超30%，湿法隔膜绝对龙头" }
        ]
      }
    ],
    midstream: [
      {
        name: "核心零部件",
        companies: [
          { code: "300267", name: "尔康制药", highlight: "电容器+功率器件，新能源车被动元件需求驱动" },
          { code: "002690", name: "美亚光电", highlight: "色选机+锂电分选，电芯品质检测设备领先" },
          { code: "600741", name: "华域汽车", highlight: "汽车零部件龙头，电动化+智能化转型加速" },
          { code: "002594", name: "比亚迪", highlight: "整车+电池+芯片一体化，全球新能源汽车销量冠军" }
        ]
      },
      {
        name: "智能驾驶/座舱",
        companies: [
          { code: "002920", name: "德赛西威", highlight: "智能座舱域控制器龙头，舱驾一体化方案规模量产" },
          { code: "688788", name: "科思股份", highlight: "车载雷达射频前端，自动驾驶感知系统关键器件" },
          { code: "300502", name: "新易盛", highlight: "车载激光雷达光学元件，自动驾驶光学方案供应商" }
        ]
      }
    ],
    downstream: [
      {
        name: "整车制造",
        companies: [
          { code: "002594", name: "比亚迪", highlight: "月销超40万辆，海外出口持续增长，垂直整合优势突出" },
          { code: "600104", name: "上汽集团", highlight: "传统整车龙头转型新能源，MG品牌海外热销" },
          { code: "601127", name: "赛力斯", highlight: "问界M9销量爆发，与华为深度合作的智选车标杆" }
        ]
      },
      {
        name: "充电桩/服务",
        companies: [
          { code: "300766", name: "每日互动", highlight: "充电数据运营，新能源出行数据服务商" },
          { code: "300123", name: "亿纬锂能", highlight: "动力+储能双轮驱动，大圆柱电池海外出货放量" },
          { code: "300046", name: "台基股份", highlight: "大功率充电桩模块，液冷超充技术领先" }
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
          { code: "601012", name: "隆基绿能", highlight: "全球最大单晶硅片+电池组件厂商，BC电池引领下一代技术" },
          { code: "002129", name: "中环股份", highlight: "N型硅片出货量快速提升，单晶炉设备持续扩产" },
          { code: "002160", name: "通威股份", highlight: "多晶硅产能全球第一，兼具电池片双龙头地位" }
        ]
      },
      {
        name: "辅材/设备",
        companies: [
          { code: "688234", name: "天岳先进", highlight: "碳化硅衬底，光伏逆变器功率器件关键原材料" },
          { code: "300207", name: "欣旺达", highlight: "储能电池+光伏配储，光储一体化解决方案" },
          { code: "300724", name: "捷佳伟创", highlight: "TOPCon/HJT电池设备龙头，N型电池设备市占率居前" }
        ]
      }
    ],
    midstream: [
      {
        name: "电池片/组件",
        companies: [
          { code: "002459", name: "晶澳科技", highlight: "TOPCon电池全球出货量前三，海外市场持续开拓" },
          { code: "000591", name: "太阳能", highlight: "光伏电站运营+EPC，集中式电站规模居前" },
          { code: "688599", name: "天岳先进", highlight: "SiC功率器件，光伏逆变器核心芯片" },
          { code: "600438", name: "通威股份", highlight: "多晶硅龙头+电池片龙头，一体化优势显著，利润高于同行" }
        ]
      },
      {
        name: "逆变器",
        companies: [
          { code: "300274", name: "阳光电源", highlight: "全球逆变器出货量第一，储能系统快速增长超预期" },
          { code: "601877", name: "正泰电器", highlight: "逆变器+开关元件+光伏全产业链，国内渠道为王" },
          { code: "300750", name: "固德威", highlight: "家用储能逆变器出货欧洲市场持续扩大" }
        ]
      }
    ],
    downstream: [
      {
        name: "光伏电站/EPC",
        companies: [
          { code: "601016", name: "节能风电", highlight: "风光储一体电站运营商，清洁能源资产持续扩张" },
          { code: "000591", name: "太阳能", highlight: "集中式光伏电站运营龙头，装机量持续创新高" },
          { code: "601163", name: "三峡能源", highlight: "海上风电+光伏电站，清洁能源央企龙头" }
        ]
      },
      {
        name: "储能/配套",
        companies: [
          { code: "300750", name: "宁德时代", highlight: "大储系统天合储能，全球储能市占率第一" },
          { code: "688301", name: "金博股份", highlight: "碳碳复合材料，光伏热场部件核心供应商" },
          { code: "300207", name: "欣旺达", highlight: "储能电芯+PACK，工商业储能快速放量" }
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
          { code: "688256", name: "寒武纪", highlight: "国内AI芯片领军，云端训练芯片MLU系列布局完善" },
          { code: "688041", name: "海光信息", highlight: "DCU深算单元，国产AI算力替代英伟达的核心标的" },
          { code: "000977", name: "浪潮信息", highlight: "全球AI服务器出货量前三，英伟达最大ODM合作伙伴" }
        ]
      },
      {
        name: "AI框架/工具链",
        companies: [
          { code: "002405", name: "四维图新", highlight: "高精地图+车路协同，L4自动驾驶数据底座" },
          { code: "600588", name: "用友网络", highlight: "企业AI大模型BIP平台，数字化转型深度受益" },
          { code: "300124", name: "汇川技术", highlight: "工业AI+运动控制，机器人+工控场景AI渗透" }
        ]
      }
    ],
    midstream: [
      {
        name: "大模型/基础模型",
        companies: [
          { code: "002230", name: "科大讯飞", highlight: "星火大模型V4.0，语音识别准确率全球领先，垂直落地最快" },
          { code: "603139", name: "海量数据", highlight: "AI训练数据标注，数据清洗服务收入持续高增" },
          { code: "300418", name: "昆仑万维", highlight: "天工大模型+海外AGI布局，AI应用矩阵变现能力强" }
        ]
      },
      {
        name: "AI平台/中台",
        companies: [
          { code: "300033", name: "同花顺", highlight: "金融AI大模型，iFinD数据平台月活用户持续增长" },
          { code: "002502", name: "软通动力", highlight: "AI+数字化服务，大模型落地大型企业客户能力强" },
          { code: "300601", name: "康泰生物", highlight: "AI+生物医药，蛋白质预测辅助新药研发" }
        ]
      }
    ],
    downstream: [
      {
        name: "AI应用（各垂直行业）",
        companies: [
          { code: "002236", name: "大华股份", highlight: "AIoT视频智能，AI视频分析订单大幅增长" },
          { code: "300271", name: "华宇软件", highlight: "法院+检察院AI大模型应用，司法AI落地深度" },
          { code: "688271", name: "联影医疗", highlight: "医疗影像AI，每台设备内嵌AI模型，辅助诊断准确率超90%" }
        ]
      },
      {
        name: "AIGC/生成式AI",
        companies: [
          { code: "300418", name: "昆仑万维", highlight: "天工AI搜索日活突破百万，AIGC商业化路径最清晰" },
          { code: "688579", name: "奥飞数据", highlight: "IDC算力+AIGC内容生成，AI内容消费基础设施" },
          { code: "002415", name: "海康威视", highlight: "AIoT+大模型，千行百业AI场景化解决方案" }
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
          { code: "002466", name: "天齐锂业", highlight: "锂矿资产全球顶级，碳酸锂价格回升弹性极大" },
          { code: "002460", name: "赣锋锂业", highlight: "固态锂电池全球量产进程最快，海外矿山资产丰富" },
          { code: "600111", name: "北方稀土", highlight: "稀土永磁+镍基材料，新能源汽车磁性材料核心供应商" }
        ]
      },
      {
        name: "正负极/隔膜/电解液",
        companies: [
          { code: "300073", name: "当升科技", highlight: "高镍NCM正极材料，欧洲客户开拓顺利，出货量高增" },
          { code: "002812", name: "恩捷股份", highlight: "湿法隔膜全球市占率超35%，盈利能力稳居行业第一" },
          { code: "300438", name: "天赐材料", highlight: "电解液龙头，LiFSI添加剂技术领先，配套宁德时代" }
        ]
      }
    ],
    midstream: [
      {
        name: "电芯制造",
        companies: [
          { code: "300750", name: "宁德时代", highlight: "全球动力电池装机量第一，麒麟电池能量密度突破255Wh/kg" },
          { code: "300014", name: "亿纬锂能", highlight: "大圆柱+软包电池海外订单充沛，储能市场快速增长" },
          { code: "300015", name: "国轩高科", highlight: "磷酸铁锂电池，大众持股加持，出口欧洲战略推进" }
        ]
      },
      {
        name: "BMS/热管理",
        companies: [
          { code: "002371", name: "北方华创", highlight: "真空镀膜设备，电池极片制造核心装备" },
          { code: "300563", name: "神宇股份", highlight: "锂电池铜箔龙头，极薄铜箔研发突破6μm" },
          { code: "688678", name: "福立旺", highlight: "精密结构件+锂电热管理，消费电子与新能源双赛道" }
        ]
      }
    ],
    downstream: [
      {
        name: "动力电池应用",
        companies: [
          { code: "002594", name: "比亚迪", highlight: "刀片电池自供+外销，安全性领先，乘用车市占持续扩大" },
          { code: "601127", name: "赛力斯", highlight: "问界系列装机宁德麒麟电池，单车带电量行业前列" },
          { code: "600104", name: "上汽集团", highlight: "智己+飞凡装机动力电池，海外出口电动化加速" }
        ]
      },
      {
        name: "储能应用",
        companies: [
          { code: "300750", name: "宁德时代", highlight: "天合储能+天弈储能，全球大储系统市占率第一" },
          { code: "300207", name: "欣旺达", highlight: "工商业储能PACK+BMS，装机量快速提升" },
          { code: "002594", name: "弘元绿能", highlight: "光储一体解决方案，储能电站EPC业务高增" }
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
          { code: "002049", name: "紫光国微", highlight: "安全芯片+FPGA，手机SIM卡芯片国内市占超60%" },
          { code: "300433", name: "蓝思科技", highlight: "玻璃+金属盖板，苹果+华为双核心供应链" },
          { code: "002241", name: "歌尔股份", highlight: "TWS耳机+VR头显，苹果Vision Pro核心声学供应商" }
        ]
      },
      {
        name: "显示/摄像",
        companies: [
          { code: "000725", name: "京东方A", highlight: "全球OLED面板出货量第三，折叠屏面板国内市占第一" },
          { code: "002920", name: "德赛西威", highlight: "车载显示屏，HUD+中控屏方案整合" },
          { code: "688233", name: "神工股份", highlight: "半导体硅材料，手机摄像头CMOS传感器制造材料" }
        ]
      }
    ],
    midstream: [
      {
        name: "ODM/代工制造",
        companies: [
          { code: "600745", name: "闻泰科技", highlight: "手机ODM龙头+功率半导体，AI手机整合解决方案" },
          { code: "002127", name: "南极电商", highlight: "消费电子配件+直播电商，线上渠道规模居前" },
          { code: "002241", name: "歌尔股份", highlight: "苹果核心供应商，AirPods出货量全球第一供应商" }
        ]
      },
      {
        name: "结构件/精密制造",
        companies: [
          { code: "300433", name: "蓝思科技", highlight: "苹果+华为+小米全覆盖，折叠屏铰链量产能力行业第一" },
          { code: "601882", name: "海天精工", highlight: "精密机床，消费电子外壳CNC加工核心装备" },
          { code: "688330", name: "宏微科技", highlight: "功率半导体器件，消费电子电源管理芯片供应商" }
        ]
      }
    ],
    downstream: [
      {
        name: "整机品牌",
        companies: [
          { code: "000858", name: "五粮液", highlight: "（此处仅举例）消费电子整机品牌依赖链路" },
          { code: "002602", name: "世纪华通", highlight: "游戏+智能手机应用生态，消费电子软硬联动" },
          { code: "600660", name: "福耀玻璃", highlight: "AR眼镜光学镜片+车载HUD，新形态消费电子布局" }
        ]
      },
      {
        name: "零售渠道/电商",
        companies: [
          { code: "002356", name: "人人乐", highlight: "线下电子零售渠道" },
          { code: "600415", name: "小商品城", highlight: "跨境电商平台+消费电子出口，义乌消费电子外贸枢纽" },
          { code: "300251", name: "光线传媒", highlight: "消费电子内容营销+IP联名，品牌推广核心渠道" }
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
          { code: "300124", name: "汇川技术", highlight: "伺服驱动+运动控制龙头，人形机器人关节电机核心供应商" },
          { code: "002747", name: "埃斯顿", highlight: "减速器+伺服系统，国内工业机器人核心零部件龙头" },
          { code: "300817", name: "双环传动", highlight: "精密减速器，特斯拉人形机器人供应商" }
        ]
      },
      {
        name: "传感器/感知",
        companies: [
          { code: "688339", name: "亿道信息", highlight: "工业级触觉传感器，机器人感知系统核心部件" },
          { code: "688519", name: "木华新材", highlight: "力觉传感器，人形机器人手部感知关键部件" },
          { code: "300271", name: "创维数字", highlight: "深度视觉传感器，3D视觉引导机器人定位" }
        ]
      }
    ],
    midstream: [
      {
        name: "控制系统/算法",
        companies: [
          { code: "300124", name: "汇川技术", highlight: "PLC+运动控制，机器人大脑核心，AI化运动规划领先" },
          { code: "002405", name: "四维图新", highlight: "机器人高精度定位地图，室内导航数据服务商" },
          { code: "688021", name: "奥特维", highlight: "焊接机器人+串焊机，光伏制造自动化领域扩张迅速" }
        ]
      },
      {
        name: "本体制造/集成",
        companies: [
          { code: "300024", name: "机器人（沈阳新松）", highlight: "国内工业机器人整机龙头，参与特种+服务机器人研发" },
          { code: "002747", name: "埃斯顿", highlight: "国产工业机器人出货量前三，汽车+3C行业应用居前" },
          { code: "300770", name: "新萌股份", highlight: "协作机器人，轻量化六轴关节力控能力领先" }
        ]
      }
    ],
    downstream: [
      {
        name: "工业应用",
        companies: [
          { code: "002015", name: "协鑫集成", highlight: "光伏电池智能制造，机器人应用深度场景" },
          { code: "600031", name: "三一重工", highlight: "工程机械+机器人，建筑+矿山自动化深度布局" },
          { code: "601012", name: "隆基绿能", highlight: "光伏工厂灯塔工厂，工业机器人应用量全国前列" }
        ]
      },
      {
        name: "服务/人形机器人",
        companies: [
          { code: "300024", name: "机器人（沈阳新松）", highlight: "服务机器人+AGV，医院+酒店场景商业化落地" },
          { code: "688111", name: "金力永磁", highlight: "高性能钕铁硼永磁体，人形机器人电机磁材核心" },
          { code: "002097", name: "山河智能", highlight: "特种机器人+工程机械，应急救援+非开挖机器人" }
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
          { code: "300363", name: "博腾股份", highlight: "氟化液研发突破，浸没式液冷专用冷却介质国产替代核心" },
          { code: "002038", name: "双良节能", highlight: "工业冷却液+换热器，数据中心液冷介质供应量快速增长" },
          { code: "300344", name: "立昂技术", highlight: "导热硅脂+界面材料，GPU封装热管理核心辅材" },
          { code: "603659", name: "璞泰来", highlight: "导热石墨膜，高功率芯片散热界面材料国产化领先" }
        ]
      },
      {
        name: "泵/阀/管路",
        companies: [
          { code: "002285", name: "世联行", highlight: "精密微型泵，液冷循环系统动力核心部件" },
          { code: "603008", name: "喜临门", highlight: "高精密铜管/铝管，液冷管路配套加工能力强" },
          { code: "002347", name: "泰尔股份", highlight: "工业级耐腐蚀阀门，数据中心液冷管路控制部件" }
        ]
      }
    ],
    midstream: [
      {
        name: "冷板/散热模组",
        companies: [
          { code: "002484", name: "华中数控", highlight: "精密加工设备制造冷板，AI服务器冷板加工产能领先" },
          { code: "002156", name: "通富微电", highlight: "先进封装散热方案，Chiplet热管理一体化设计" },
          { code: "002382", name: "蓝盾股份", highlight: "GPU冷板模组，液冷散热组件批量供货头部云厂商" },
          { code: "300628", name: "亿田智能", highlight: "精密铜铝散热器，液冷冷板冲压成形核心供应商" }
        ]
      },
      {
        name: "浸没式/CDU系统",
        companies: [
          { code: "002422", name: "科伦药业", highlight: "氟化工业务延伸，氟化液生产能力支持浸没液冷扩产" },
          { code: "300448", name: "浩云科技", highlight: "机柜级浸没液冷方案，整体交付能力行业领先" },
          { code: "688100", name: "威腾电气", highlight: "液冷供配电一体化方案，CDU+PDU整合交付大功率机柜" }
        ]
      }
    ],
    downstream: [
      {
        name: "液冷服务器/整机",
        companies: [
          { code: "000977", name: "浪潮信息", highlight: "液冷AI服务器G7系列，支持H100/H800满负荷液冷散热，头部客户大批量发货" },
          { code: "002936", name: "郑煤机", highlight: "液冷机柜+高密度算力方案，矿用与数据中心双赛道布局" },
          { code: "300308", name: "中际旭创", highlight: "液冷光模块方案，800G高速光模块散热性能达行业最优" }
        ]
      },
      {
        name: "数据中心/IDC运营",
        companies: [
          { code: "300383", name: "光环新网", highlight: "液冷数据中心改造，PUE降至1.15以下，节能效益显著" },
          { code: "600595", name: "中孚实业", highlight: "绿电+液冷IDC，算力租赁业务切入AI基础设施赛道" },
          { code: "688023", name: "安克创新", highlight: "液冷充电方案，消费级液冷散热产品市场快速放量" }
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
          { code: "688220", name: "翱捷科技", highlight: "5G基带芯片，物联网NB-IoT/Cat.1芯片出货量全球前三" },
          { code: "688536", name: "芯动联科", highlight: "时钟同步芯片，5G基站精密同步模块核心器件" },
          { code: "600426", name: "华鲁恒升", highlight: "PCB基材树脂，高频高速通信板材化学品配套" },
          { code: "300458", name: "全志科技", highlight: "IoT处理芯片，无线通信终端SoC出货量行业领先" }
        ]
      },
      {
        name: "光器件/射频器件",
        companies: [
          { code: "300308", name: "中际旭创", highlight: "800G相干光模块出货全球第一，已向头部云厂商批量交付" },
          { code: "301281", name: "华工科技", highlight: "光芯片+激光器垂直整合，25G/100G DFB激光芯片国产替代" },
          { code: "002241", name: "歌尔股份", highlight: "射频天线+声学模块，5G终端射频前端配套能力强" },
          { code: "300366", name: "展鹏科技", highlight: "滤波器/腔体器件，5G基站滤波器国产供应链重要一环" }
        ]
      }
    ],
    midstream: [
      {
        name: "基站/传输设备",
        companies: [
          { code: "000063", name: "中兴通讯", highlight: "5G基站全球出货量前三，5G-A Massive MIMO商用领先" },
          { code: "600522", name: "中天科技", highlight: "光纤光缆+特种电缆，5G基站光缆配套出货持续增长" },
          { code: "002196", name: "菲菱科思", highlight: "高速互联交换机，城域网+骨干网传输组网关键节点" }
        ]
      },
      {
        name: "网络设备/交换机",
        companies: [
          { code: "300308", name: "中际旭创", highlight: "400G/800G数通光模块，超大规模数据中心组网核心" },
          { code: "002049", name: "紫光股份", highlight: "以太网交换机+路由器，政企网络设备国产化龙头" },
          { code: "002552", name: "共进股份", highlight: "运营商家庭网关+光猫，5G CPE出货量国内居前" }
        ]
      }
    ],
    downstream: [
      {
        name: "运营商/基础网络",
        companies: [
          { code: "601728", name: "中国电信", highlight: "5G-A商用启动，算网融合战略，IDC+云收入增速超30%" },
          { code: "600050", name: "中国联通", highlight: "5G共建共享节省资本开支，算力网络布局加速" },
          { code: "601881", name: "中国银河", highlight: "卫星通信+地面网融合，低轨卫星互联网业务落地" }
        ]
      },
      {
        name: "卫星通信/行业应用",
        companies: [
          { code: "600536", name: "中国软件", highlight: "卫星互联网地面系统软件，北斗+低轨卫星核心配套" },
          { code: "300595", name: "欧比特", highlight: "微纳卫星制造+对地遥感，商业航天通信布局先行" },
          { code: "002179", name: "中航光电", highlight: "星载连接器+军民两用光电互联，卫星通信关键器件" }
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
          { code: "600536", name: "中国软件", highlight: "麒麟操作系统+中间件，央企信创核心供应商，政府装机率第一" },
          { code: "688047", name: "龙芯中科", highlight: "龙架构CPU+操作系统生态，自主可控信创体系构建者" },
          { code: "300496", name: "中科曙光", highlight: "高性能计算+国产操作系统，科研+政务信创整体方案" },
          { code: "002421", name: "达实智能", highlight: "楼宇操作系统+智慧建筑，AI物联网平台软件收入高增" }
        ]
      },
      {
        name: "数据库/中间件",
        companies: [
          { code: "688588", name: "达梦数据", highlight: "国产数据库龙头，金融+政府替换Oracle进程加速，营收高增" },
          { code: "688439", name: "振华风光", highlight: "嵌入式数据库，工控+国防场景实时数据处理" },
          { code: "300198", name: "纳思达", highlight: "打印机芯片+国产办公软件，国产化替代整体解决方案" }
        ]
      }
    ],
    midstream: [
      {
        name: "行业解决方案",
        companies: [
          { code: "600588", name: "用友网络", highlight: "金融+政务+制造ERP，AI大模型BIP平台订阅收入增速超40%" },
          { code: "002410", name: "广联达", highlight: "工程造价数字化龙头，SAAS化转型完成，订阅收入占比超60%" },
          { code: "300271", name: "华宇软件", highlight: "法院+检察院+公安数字化，司法AI大模型落地深度行业第一" },
          { code: "002502", name: "软通动力", highlight: "IT外包+数字化咨询，大模型落地大企业客户能力强" }
        ]
      },
      {
        name: "云计算/SaaS",
        companies: [
          { code: "603217", name: "元道通信", highlight: "云联网+SD-WAN，政企混合云接入服务商" },
          { code: "300033", name: "同花顺", highlight: "金融SAAS+AI大模型，iFinD数据终端月活超百万用户" },
          { code: "002065", name: "东华软件", highlight: "医疗+政务信息化，医院HIS系统市占率国内前三" }
        ]
      }
    ],
    downstream: [
      {
        name: "数字政府/智慧城市",
        companies: [
          { code: "002387", name: "维宏股份", highlight: "智能制造+工业软件，数控系统信创化替代进程加速" },
          { code: "002097", name: "山河智能", highlight: "智慧工地+工程数字化，建筑行业IT服务应用场景丰富" },
          { code: "300168", name: "万达信息", highlight: "智慧医疗+城市云平台，地方政府数字化大客户壁垒深" }
        ]
      },
      {
        name: "金融科技/企服",
        companies: [
          { code: "300015", name: "天源迪科", highlight: "电信IT系统+BSS/OSS，三大运营商核心系统供应商" },
          { code: "300136", name: "信维通信", highlight: "金融科技+区块链应用，银行核心系统国产化替代" },
          { code: "688590", name: "新致软件", highlight: "金融行业IT外包，保险+银行核心系统实施运维龙头" }
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
          { code: "002436", name: "兴森科技", highlight: "PCB用铜箔基板核心材料，AI服务器高频高速PCB配套" },
          { code: "300563", name: "神宇股份", highlight: "锂电铜箔+PCB铜箔，极薄铜箔研发突破6μm行业领先" },
          { code: "002538", name: "司尔特", highlight: "钽粉/钽丝，固态电容核心材料，供应国内外元件厂商" },
          { code: "688508", name: "申菱环境", highlight: "高纯金属靶材，MLCC介质陶瓷粉体生产核心原材料" }
        ]
      },
      {
        name: "MLCC/电容材料",
        companies: [
          { code: "603659", name: "璞泰来", highlight: "PVDF压电薄膜+陶瓷粉，MLCC生产核心配套材料" },
          { code: "300282", name: "四方达", highlight: "陶瓷基板，MLCC与功率模块衬底材料国产化" },
          { code: "300655", name: "晶瑞电材", highlight: "电子级硅烷+湿电子化学品，元件生产精密清洗配套" }
        ]
      }
    ],
    midstream: [
      {
        name: "MLCC/电容电感",
        companies: [
          { code: "000977", name: "风华高科", highlight: "国内MLCC龙头，AI服务器用高压MLCC份额快速提升" },
          { code: "002138", name: "顺络电子", highlight: "片式电感+功率电感龙头，AI服务器单台用量大幅增加" },
          { code: "300054", name: "鼎龙股份", highlight: "超级电容+MLCC材料，储能与AI算力双赛道布局" }
        ]
      },
      {
        name: "连接器/PCB",
        companies: [
          { code: "002823", name: "凤凰光学", highlight: "高速连接器精密端子，AI服务器背板连接器供应商" },
          { code: "002415", name: "深南电路", highlight: "高端PCB龙头，AI服务器HDI+高速背板PCB旗舰产品" },
          { code: "002049", name: "生益科技", highlight: "覆铜板龙头，AI/5G用高频高速覆铜板市占率国内第一" },
          { code: "002388", name: "新亚制程", highlight: "精密连接器，消费电子+汽车电子连接器出货量高增" }
        ]
      }
    ],
    downstream: [
      {
        name: "AI服务器/通信",
        companies: [
          { code: "000977", name: "浪潮信息", highlight: "AI服务器单台MLCC/电感用量是普通服务器3-5倍，带动元件需求暴增" },
          { code: "000063", name: "中兴通讯", highlight: "5G基站用高频MLCC+连接器，国产元件替代比例持续提升" },
          { code: "002241", name: "歌尔股份", highlight: "消费电子元件精密组装，MLCC+连接器一体化供应链管理" }
        ]
      },
      {
        name: "新能源/汽车电子",
        companies: [
          { code: "002594", name: "比亚迪", highlight: "新能源汽车每辆用MLCC超3000颗，带动车规级元件需求飙升" },
          { code: "300750", name: "宁德时代", highlight: "BMS+电池管理电路大量采购车规级电容电感，用量行业最大" },
          { code: "600741", name: "华域汽车", highlight: "汽车电子PCBA集成，车规连接器+元件集成供应能力强" }
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
          { code: "002230", name: "科大讯飞", highlight: "星火大模型V4.0，语音识别准确率全球第一，教育+医疗垂直落地最快" },
          { code: "300418", name: "昆仑万维", highlight: "天工大模型+天工AI搜索日活超百万，海外AGI布局走在A股前列" },
          { code: "603138", name: "海量数据", highlight: "AI训练数据标注与清洗，大模型数据供应商营收高增超50%" },
          { code: "688041", name: "海光信息", highlight: "DCU深算单元为国产大模型训练提供算力底座，替代英伟达核心标的" }
        ]
      },
      {
        name: "AI开发平台/工具链",
        companies: [
          { code: "600588", name: "用友网络", highlight: "BIP企业AI平台，大模型应用开发工具订阅收入增速超40%" },
          { code: "002410", name: "广联达", highlight: "工程行业AI平台，建筑全生命周期AI化推进，SaaS化转型深度受益" },
          { code: "300033", name: "同花顺", highlight: "金融AI大模型平台，量化策略生成+研报自动解读商业化落地" }
        ]
      }
    ],
    midstream: [
      {
        name: "垂直行业AI应用",
        companies: [
          { code: "688271", name: "联影医疗", highlight: "医疗影像AI辅助诊断，每台设备内嵌AI模型，辅助诊断准确率超90%" },
          { code: "300271", name: "华宇软件", highlight: "司法AI大模型，法院+检察院案件智能辅助办案，落地数量A股第一" },
          { code: "002236", name: "大华股份", highlight: "AIoT视频智能，AI视频分析订单同比增长超60%，千行百业规模覆盖" },
          { code: "002415", name: "海康威视", highlight: "AI+物联网行业龙头，大模型赋能安防+工业检测，营收规模行业第一" },
          { code: "300168", name: "万达信息", highlight: "智慧医疗+城市AI大脑，政府端AI应用落地深度领先" }
        ]
      },
      {
        name: "AIGC/内容生成",
        companies: [
          { code: "300418", name: "昆仑万维", highlight: "天工AI绘画+视频生成，AIGC商业变现路径最清晰，海外Starchain战略推进" },
          { code: "603444", name: "吉比特", highlight: "AI+游戏，AI生成游戏内容降本50%以上，AI NPC落地商业验证完成" },
          { code: "002292", name: "奥飞娱乐", highlight: "IP+AIGC内容生产，AI短剧+虚拟偶像商业化试水，内容成本大幅降低" },
          { code: "300052", name: "中青宝", highlight: "AI生成游戏资产，AIGC在游戏美术环节规模化应用" }
        ]
      }
    ],
    downstream: [
      {
        name: "AI Agent/自主决策",
        companies: [
          { code: "002230", name: "科大讯飞", highlight: "讯飞AI Agent在教育场景实现自主出题-批改-辅导闭环，日活用户超500万" },
          { code: "300033", name: "同花顺", highlight: "AI投研Agent，自动生成研报+个股分析报告，机构客户渗透率快速提升" },
          { code: "688579", name: "奥飞数据", highlight: "AI运维Agent，数据中心自动化运营决策，人工干预率降低70%" },
          { code: "002502", name: "软通动力", highlight: "企业级AI Agent开发部署，头部客户自动化流程RPA+AI一体化" }
        ]
      },
      {
        name: "AI营销/办公/教育",
        companies: [
          { code: "300766", name: "每日互动", highlight: "AI营销数据平台，精准推送模型迭代，广告主ROI提升30%以上" },
          { code: "002539", name: "云图控股", highlight: "AI+数字营销，大模型赋能广告创意生成，投放效率行业领先" },
          { code: "300484", name: "蓝色光标", highlight: "全面拥抱AI营销，AIGC内容生产成本降低60%，营销自动化客户快速增长" },
          { code: "002253", name: "川大智胜", highlight: "AI教育+人脸识别，智慧校园AI解决方案收入持续高增" }
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
