/**
 * 产业链数据库
 * 包含：半导体、AI算力、算力租赁、预制算力中心底座、新能源汽车、光伏、电力、人工智能、锂电池、消费电子、机器人、液冷、通讯设备、IT服务、元件、MLCC、半导体稀缺材料、多氟多、AI应用、无人驾驶、特斯拉FSD入华、长鑫存储、先进封装、光互联、光纤概念、CPO、物理AI、2022世界杯、2026世界杯 等（产业链见 INDUSTRY_DATA；板块龙头见 sector-data.js 的 SECTOR_DATA）
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
          { name: "沪硅产业", highlight: "300mm大硅片国产化龙头，12英寸硅片量产并导入主流晶圆厂" },
          { name: "立昂微", highlight: "6-8英寸硅片+功率器件外延，半导体硅材料国内领先" },
          { name: "雅克科技", highlight: "电子特气+前驱体，CVD/ALD工艺用高纯材料国产替代核心" },
          { name: "神工股份", highlight: "半导体级硅材料，大硅片用硅部件与刻蚀耗材" }
        ]
      },
      {
        name: "半导体设备",
        companies: [
          { name: "北方华创", highlight: "刻蚀机+CVD设备龙头，国内半导体设备市占率第一，先进制程攻关领先" },
          { name: "中微公司", highlight: "等离子刻蚀机龙头，CCP介质刻蚀设备进入主流晶圆产线" },
          { name: "盛美上海", highlight: "单片清洗设备龙头，电镀/湿法工艺设备国产替代领先" },
          { name: "拓荆科技", highlight: "PECVD/ALD薄膜沉积设备，先进制程关键设备国产供应商" }
        ]
      }
    ],
    midstream: [
      {
        name: "芯片设计（Fabless）",
        companies: [
          { name: "紫光国微", highlight: "安全芯片+FPGA龙头，国密芯片市场份额第一，军工信创双赛道" },
          { name: "卓胜微", highlight: "射频芯片龙头，5G手机渗透率快速提升，海外出货量高增" },
          { name: "韦尔股份", highlight: "CIS图像传感器龙头，手机/车载摄像头芯片国产替代领军" },
          { name: "兆易创新", highlight: "Nor Flash+MCU龙头，存储与控制芯片设计国内市占领先" }
        ]
      },
      {
        name: "晶圆制造（IDM/Foundry）",
        companies: [
          { name: "中芯国际", highlight: "国内晶圆代工龙头，14nm制程商用量产，国产先进制程核心平台" },
          { name: "华虹公司", highlight: "特色工艺晶圆代工龙头，功率器件+模拟芯片代工领先" },
          { name: "士兰微", highlight: "IDM模式，功率+射频+MEMS多元布局，车规级产品放量" }
        ]
      }
    ],
    downstream: [
      {
        name: "封装测试",
        companies: [
          { name: "长电科技", highlight: "全球第三大封测厂，Chiplet/2.5D先进封装技术领先" },
          { name: "通富微电", highlight: "Chiplet先进封装，AMD重要合作伙伴，营收超百亿" },
          { name: "华天科技", highlight: "传统封测+先进封装，车规级封测需求旺盛" }
        ]
      },
      {
        name: "终端应用",
        companies: [
          { name: "京东方A", highlight: "面板龙头，半导体显示+传感器全面布局" },
          { name: "兆威机电", highlight: "微型传动与模组，智能终端与汽车电子应用端配套" },
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
          { name: "寒武纪", highlight: "云端AI训练/推理芯片龙头，思元系列大模型算力芯片量产出货" },
          { name: "海光信息", highlight: "国产x86+DCU协处理器，深算系列GPU适配国产智算生态" },
          { name: "景嘉微", highlight: "国产GPU芯片，JM系列图形/通用计算芯片信创与AI场景拓展" },
          { name: "芯原股份", highlight: "芯片IP与定制服务，AI SoC与算力芯片设计平台" }
        ]
      },
      {
        name: "高速互联/存储",
        companies: [
          { name: "中际旭创", highlight: "800G光模块全球龙头，AI数据中心光互联核心，1.6T产品已送样" },
          { name: "顺络电子", highlight: "高频电感磁性元件龙头，AI服务器磁性器件需求激增" },
          { name: "华丰科技", highlight: "高速背板连接器，AI服务器与交换机组网互连核心器件" }
        ]
      }
    ],
    midstream: [
      {
        name: "服务器/整机",
        companies: [
          { name: "浪潮信息", highlight: "AI服务器出货量全球前三，英伟达H100/H800主要ODM合作方" },
          { name: "工业富联", highlight: "AI服务器代工龙头，云厂商与租赁商整机柜采购核心供应商" },
          { name: "中科曙光", highlight: "国产高端服务器+液冷整机，政务与行业智算项目常见底座" }
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
          { name: "润泽科技", highlight: "超大规模智算园区运营，批发型云客户上架率与算力租赁景气绑定" },
          { name: "光环新网", highlight: "北京核心数据中心运营商，AI算力租赁业务快速扩张" },
          { name: "数据港", highlight: "阿里云核心数据中心合作方，上架率与云侧算力扩张同步" }
        ]
      },
      {
        name: "大模型/AI应用",
        companies: [
          { name: "三六零", highlight: "360智脑大模型，安全与搜索场景AI应用落地" },
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
          { name: "国轩高科", highlight: "磷酸铁锂电芯，大众持股加持，动力电池装机量居前" },
          { name: "亿纬锂能", highlight: "大圆柱+软包电池海外订单充沛，储能市场快速增长" }
        ]
      }
    ],
    midstream: [
      {
        name: "核心零部件",
        companies: [
          { name: "汇川技术", highlight: "新能源汽车电机驱动+电控龙头，市占率国内第一" },
          { name: "拓普集团", highlight: "底盘+热管理+轻量化，特斯拉与新势力核心零部件供应商" },
          { name: "华域汽车", highlight: "汽车零部件龙头，电动化+智能化转型加速" },
          { name: "三花智控", highlight: "热管理阀件龙头，新能源车热管理系统核心供应商" }
        ]
      },
      {
        name: "智能驾驶/座舱",
        companies: [
          { name: "德赛西威", highlight: "智能座舱域控制器龙头，舱驾一体化方案规模量产" },
          { name: "华阳集团", highlight: "智能座舱+HUD龙头，主流车企座舱方案核心供应商" },
          { name: "万集科技", highlight: "激光雷达+ETC，车载与路侧激光雷达量产装车" }
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
          { name: "特锐德", highlight: "充电桩运营龙头，特来电公共桩保有量国内第一" },
          { name: "万马股份", highlight: "充电设备+电缆龙头，小区与公共场站充电网络覆盖广" },
          { name: "盛弘股份", highlight: "大功率充电模块龙头，液冷超充模块批量供货主流桩企" }
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
          { name: "通威股份", highlight: "多晶硅产能全球第一，硅料+电池片一体化成本优势显著" },
          { name: "大全能源", highlight: "高纯多晶硅龙头，N型硅料产能扩张，成本控制能力领先" },
          { name: "特变电工", highlight: "多晶硅+特高压设备龙头，硅料与新能源电站一体化布局" }
        ]
      },
      {
        name: "辅材/设备",
        companies: [
          { name: "福斯特", highlight: "光伏胶膜全球龙头，EVA/POE胶膜市占率国内第一" },
          { name: "捷佳伟创", highlight: "TOPCon/HJT电池设备龙头，N型电池设备市占率居前" },
          { name: "奥特维", highlight: "串焊机+叠焊设备龙头，组件端自动化设备市占领先" }
        ]
      }
    ],
    midstream: [
      {
        name: "电池片/组件",
        companies: [
          { name: "晶澳科技", highlight: "TOPCon电池全球出货量前三，海外市场持续开拓" },
          { name: "天合光能", highlight: "组件出货量全球前三，分布式光伏+储能系统加速布局" },
          { name: "隆基绿能", highlight: "单晶组件龙头，BC电池技术产业化推进" }
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
          { name: "晶科能源", highlight: "光伏组件与电站开发，全球光伏电站EPC与运营" },
          { name: "太阳能", highlight: "集中式光伏电站运营龙头，装机量持续创新高" },
          { name: "三峡能源", highlight: "海上风电+光伏电站，清洁能源央企龙头" }
        ]
      },
      {
        name: "储能/配套",
        companies: [
          { name: "宁德时代", highlight: "储能电池系统全球领先，大储与工商业储能装机居前" },
          { name: "欣旺达", highlight: "储能电芯+PACK，工商业储能快速放量" },
          { name: "协鑫集成", highlight: "光伏组件+电站开发，光储一体化系统集成与运营" }
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
          { name: "中科创达", highlight: "AI操作系统+边缘计算框架，端侧大模型部署工具链领先" },
          { name: "拓尔思", highlight: "NLP与知识图谱平台，政务/media大模型训练工具链" },
          { name: "金山办公", highlight: "WPS AI办公助手，文档生成与协作AI工具链商业化领先" }
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
          { name: "万兴科技", highlight: "AIGC数字创意软件龙头，视频/文档AI生成工具全球化" },
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
          { name: "华友钴业", highlight: "钴镍锂资源与三元前驱体，新能源金属一体化布局" }
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
          { name: "均胜电子", highlight: "汽车电子+BMS，动力电池管理系统与智能座舱配套" },
          { name: "欣旺达", highlight: "BMS+PACK系统集成，储能与小动力BMS出货量快速增长" },
          { name: "银轮股份", highlight: "新能源车热管理龙头，电池液冷板+热泵系统核心供应商" }
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
          { name: "宁德时代", highlight: "储能电芯与系统全球装机领先，大储与工商业场景覆盖广" },
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
          { name: "卓胜微", highlight: "射频前端芯片龙头，5G手机滤波器+LNA核心供应商" },
          { name: "圣邦股份", highlight: "模拟芯片龙头，消费电子电源管理与信号链芯片" }
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
          { name: "华勤技术", highlight: "手机ODM龙头，AI手机与智能硬件整机设计制造出货量行业前三" },
          { name: "歌尔股份", highlight: "苹果核心供应商，AirPods出货量全球第一供应商" },
          { name: "龙旗科技", highlight: "智能手机ODM，小米/荣耀等品牌整机设计制造" }
        ]
      },
      {
        name: "结构件/精密制造",
        companies: [
          { name: "长盈精密", highlight: "消费电子精密结构件，金属/CNC件核心供应商" },
          { name: "立讯精密", highlight: "连接器+声学+无线，苹果核心供应商，AirPods/Watch核心制造" },
          { name: "歌尔股份", highlight: "精密声学+VR光学结构件，苹果/Meta核心供应链" }
        ]
      }
    ],
    downstream: [
      {
        name: "整机品牌",
        companies: [
          { name: "传音控股", highlight: "非洲及新兴市场手机龙头，多品牌矩阵出货量全球前列" },
          { name: "TCL科技", highlight: "显示面板+智能终端品牌，电视与商显全球出货量前列" },
          { name: "漫步者", highlight: "音频设备品牌龙头，TWS耳机与智能音箱消费级市占领先" }
        ]
      },
      {
        name: "零售渠道/电商",
        companies: [
          { name: "王府井", highlight: "百货与免税渠道，高端消费品线下零售网络" },
          { name: "神州数码", highlight: "IT分销与数码零售渠道，消费电子供应链与门店网络覆盖广" },
          { name: "南极电商", highlight: "品牌电商运营，消费电子品类线上渠道与品牌授权" }
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
          { name: "绿的谐波", highlight: "谐波减速器龙头，工业机器人关节核心零部件" },
          { name: "双环传动", highlight: "精密减速器，特斯拉人形机器人供应商认证" }
        ]
      },
      {
        name: "传感器/感知",
        companies: [
          { name: "敏芯股份", highlight: "MEMS传感器，压力/惯性传感器机器人感知配套" },
          { name: "奥比中光", highlight: "3D视觉传感器龙头，机器人与环境感知核心器件" },
          { name: "汉威科技", highlight: "气体/压力传感器，工业机器人安全与环境感知" }
        ]
      }
    ],
    midstream: [
      {
        name: "控制系统/算法",
        companies: [
          { name: "汇川技术", highlight: "PLC+运动控制，机器人大脑核心，AI化运动规划领先" },
          { name: "柏楚电子", highlight: "运动控制系统，激光切割与工业机器人控制算法" },
          { name: "埃斯顿", highlight: "自主运动控制算法，焊接+搬运+装配机器人全场景覆盖" }
        ]
      },
      {
        name: "本体制造/集成",
        companies: [
          { name: "机器人", highlight: "国内工业机器人整机龙头，特种+服务机器人全赛道布局" },
          { name: "埃斯顿", highlight: "国产工业机器人出货量前三，汽车+3C行业应用居前" },
          { name: "拓斯达", highlight: "工业机器人+注塑辅机，3C与新能源产线集成方案" }
        ]
      }
    ],
    downstream: [
      {
        name: "工业应用",
        companies: [
          { name: "埃斯顿", highlight: "工业机器人本体+系统集成，汽车与3C产线应用居前" },
          { name: "三一重工", highlight: "工程机械+挖掘机器人，建筑+矿山自动化深度布局" },
          { name: "汇川技术", highlight: "工业机器人+伺服系统，产线自动化解决方案龙头" }
        ]
      },
      {
        name: "服务/人形机器人",
        companies: [
          { name: "机器人", highlight: "服务机器人+AGV，医院+酒店场景商业化落地" },
          { name: "埃夫特", highlight: "工业机器人本体，焊接与装配场景国产化领先" },
          { name: "鸣志电器", highlight: "空心杯电机+步进电机，人形机器人关节驱动核心供应商" }
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
          { name: "三美股份", highlight: "电子级氟化液供应商，数据中心浸没与两相液冷介质" },
          { name: "飞荣达", highlight: "导热界面材料+石墨散热，AI服务器芯片热管理核心辅材" },
          { name: "中石科技", highlight: "导热垫片+均热板，GPU/CPU高功率散热界面材料龙头" }
        ]
      },
      {
        name: "泵/阀/管路",
        companies: [
          { name: "大元泵业", highlight: "屏蔽泵/循环泵龙头，液冷CDU循环泵核心供应商" },
          { name: "川环科技", highlight: "汽车与工业橡胶管路，液冷软管与密封系统配套" },
          { name: "银轮股份", highlight: "液冷板+换热系统，数据中心液冷管路换热组件" }
        ]
      }
    ],
    midstream: [
      {
        name: "冷板/散热模组",
        companies: [
          { name: "英维克", highlight: "液冷冷板+温控模组，AI服务器机柜级散热方案龙头" },
          { name: "高澜股份", highlight: "液冷设备+冷板系统，数据中心液冷换热解决方案" },
          { name: "申菱环境", highlight: "精密空调+液冷CDU，高密度机柜散热系统核心供应商" },
          { name: "佳力图", highlight: "机房精密空调+液冷配套，运营商与IDC温控设备" }
        ]
      },
      {
        name: "浸没式/CDU系统",
        companies: [
          { name: "曙光数创", highlight: "浸没液冷整体方案龙头，相变浸没技术批量交付智算中心" },
          { name: "英维克", highlight: "CDU+液冷机柜系统，GPU集群液冷交付能力行业领先" },
          { name: "依米康", highlight: "数据中心温控+液冷工程，浸没与冷板式方案EPC能力" }
        ]
      }
    ],
    downstream: [
      {
        name: "液冷服务器/整机",
        companies: [
          { name: "浪潮信息", highlight: "液冷AI服务器G7系列，支持H100/H800满负荷液冷散热，头部客户大批量发货" },
          { name: "中科曙光", highlight: "液冷整机柜+国产算力服务器，政务智算液冷方案批量交付" },
          { name: "工业富联", highlight: "液冷AI服务器代工，云厂商液冷机柜整机供应核心" }
        ]
      },
      {
        name: "数据中心/IDC运营",
        companies: [
          { name: "润泽科技", highlight: "液冷智算园区运营，高密度GPU机柜上架与PUE优化领先" },
          { name: "光环新网", highlight: "液冷数据中心改造，PUE降至1.15以下，节能效益显著" },
          { name: "奥飞数据", highlight: "华南智算节点扩张，液冷机柜与带宽资源弹性供给" }
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
          { name: "翱捷科技", highlight: "蜂窝基带芯片，5G/物联网通信芯片国产替代" },
          { name: "全志科技", highlight: "IoT处理芯片，无线通信终端SoC出货量行业领先" },
          { name: "唯捷创芯", highlight: "射频前端芯片，5G PA与射频模组核心供应商" }
        ]
      },
      {
        name: "光器件/射频器件",
        companies: [
          { name: "中际旭创", highlight: "800G相干光模块出货全球第一，已向头部云厂商批量交付" },
          { name: "华工科技", highlight: "光芯片+激光器垂直整合，25G/100G DFB激光芯片国产替代" },
          { name: "天孚通信", highlight: "光器件封装龙头，光模块上游无源器件核心供应商" },
          { name: "武汉凡谷", highlight: "射频滤波器龙头，5G基站介质滤波器核心供应商" }
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
          { name: "紫光股份", highlight: "新华三交换机与网络设备，数据中心组网核心供应商" },
          { name: "锐捷网络", highlight: "数据中心交换机，企业网与运营商数通设备" },
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
          { name: "中国移动", highlight: "5G基站规模最大，算力网络与云网一体战略核心运营商" }
        ]
      },
      {
        name: "卫星通信/行业应用",
        companies: [
          { name: "海格通信", highlight: "卫星通信终端与北斗导航，低轨卫星地面应用配套" },
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
          { name: "诚迈科技", highlight: "操作系统与移动软件，鸿蒙/安卓底层软件与信创适配" },
          { name: "麒麟信安", highlight: "国产操作系统与安全软件，政务与关键行业信创装机" }
        ]
      },
      {
        name: "数据库/中间件",
        companies: [
          { name: "东方通", highlight: "应用服务器与中间件龙头，政务与金融信创核心" },
          { name: "达梦数据", highlight: "国产数据库龙头，政务与金融核心系统数据库" },
          { name: "普元信息", highlight: "企业级中间件与低代码，分布式架构基础软件" }
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
          { name: "用友网络", highlight: "企业云与SaaS，BIP平台订阅与行业云化" },
          { name: "同花顺", highlight: "金融SAAS+AI大模型，iFinD数据终端月活超百万用户" },
          { name: "东华软件", highlight: "医疗+政务信息化，医院HIS系统市占率国内前三" }
        ]
      }
    ],
    downstream: [
      {
        name: "数字政府/智慧城市",
        companies: [
          { name: "万达信息", highlight: "智慧医疗+城市云平台，地方政府数字化大客户壁垒深" },
          { name: "数字政通", highlight: "城市管理+政务信息化，数字城管与一网通办核心供应商" },
          { name: "太极股份", highlight: "政务云+数字政府，央企政务信息化与信创集成龙头" }
        ]
      },
      {
        name: "金融科技/企服",
        companies: [
          { name: "恒生电子", highlight: "金融核心系统龙头，证券基金银行IT解决方案市占领先" },
          { name: "宇信科技", highlight: "银行IT解决方案，信贷/核心/渠道系统大行客户覆盖广" },
          { name: "长亮科技", highlight: "银行核心系统+数字人民币，商业银行系统市占率居前" }
        ]
      }
    ]
  },

  // ========== 元件 ==========
  "元件": {
    name: "元件",
    color: "#ea580c",
    gradient: ["#ea580c", "#7c2d12"],
    description: "电子元件按功能与形态分为三大类：①无源元件（电阻、电容、电感、变压器、晶振、连接器/开关/保险丝等被动件）；②有源元件（二极管、三极管、MOS管、晶闸管、模拟/数字IC、传感器等）；③其他分立/机电元件（电位器、蜂鸣器/喇叭/电机、光耦、排针/线束等）。以下为各细分品类核心A股制造企业。",
    upstream: [
      {
        name: "电阻/电位器",
        companies: [
          { name: "振华科技", highlight: "片式电阻器+瓷介电容龙头，高可靠被动元件核心供应商" },
          { name: "三环集团", highlight: "陶瓷电阻/电容一体化，消费电子与车规被动元件" }
        ]
      },
      {
        name: "电容",
        companies: [
          { name: "风华高科", highlight: "MLCC国内龙头，储能滤波隔直耦合，AI/车规高压电容放量" },
          { name: "江海股份", highlight: "铝电解电容龙头，工控/新能源储能滤波电容" },
          { name: "艾华集团", highlight: "铝电解电容，消费电子与照明电源滤波" },
          { name: "火炬电子", highlight: "特种陶瓷电容器，军工高可靠电容滤波耦合" }
        ]
      },
      {
        name: "电感",
        companies: [
          { name: "顺络电子", highlight: "片式电感龙头，储能滤波、阻交流通直流，AI服务器用量倍增" },
          { name: "麦捷科技", highlight: "片式电感+MLCC，消费电子与汽车电子被动元件" }
        ]
      },
      {
        name: "变压器",
        companies: [
          { name: "可立克", highlight: "磁性元件与变压器，开关电源变压、隔离与阻抗匹配" },
          { name: "伊戈尔", highlight: "电力/照明变压器，新能源与工控电源变压隔离" }
        ]
      },
      {
        name: "晶振/谐振器",
        companies: [
          { name: "泰晶科技", highlight: "石英晶振龙头，产生固定频率时钟，5G/汽车电子需求高增" },
          { name: "惠伦晶体", highlight: "MHz/TCXO晶振，通信与IoT时钟谐振器" }
        ]
      },
      {
        name: "连接器/开关/保险丝",
        companies: [
          { name: "中航光电", highlight: "连接器龙头，接线互连+军工高可靠开关连接器" },
          { name: "电连技术", highlight: "射频/高速连接器，消费电子与汽车接线通断" },
          { name: "中熔电气", highlight: "电力熔断器/保险丝龙头，过流保护核心元件" }
        ]
      }
    ],
    midstream: [
      {
        name: "二极管/整流/LED",
        companies: [
          { name: "扬杰科技", highlight: "二极管+MOS分立器件，整流稳压与功率开关" },
          { name: "苏州固锝", highlight: "二极管/整流桥龙头，光伏与电源单向导电器件" }
        ]
      },
      {
        name: "三极管（晶体管）",
        companies: [
          { name: "华微电子", highlight: "功率三极管与BJT，放大信号与开关控制" }
        ]
      },
      {
        name: "场效应管/MOS管",
        companies: [
          { name: "新洁能", highlight: "MOSFET分立器件龙头，大功率开关与放大" },
          { name: "士兰微", highlight: "IDM模式MOS/IGBT，功率开关与驱动芯片" }
        ]
      },
      {
        name: "晶闸管/可控硅",
        companies: [
          { name: "捷捷微电", highlight: "晶闸管+防护器件，大功率开关与调压" },
          { name: "台基股份", highlight: "大功率晶闸管模块，工业调压与软启动" }
        ]
      },
      {
        name: "模拟IC（运放/电源）",
        companies: [
          { name: "圣邦股份", highlight: "模拟IC龙头，运放/电源管理芯片" },
          { name: "芯朋微", highlight: "AC-DC电源芯片，家电与工控二次电源" }
        ]
      },
      {
        name: "数字IC（MCU/存储/逻辑）",
        companies: [
          { name: "兆易创新", highlight: "NOR Flash+MCU，存储芯片与单片机" },
          { name: "北京君正", highlight: "MCU与存储控制器，智能硬件主控芯片" }
        ]
      },
      {
        name: "传感器",
        companies: [
          { name: "汉威科技", highlight: "气体/压力/温湿度传感器，多物理量感知" },
          { name: "森霸传感", highlight: "PIR红外/光敏传感器，安防与照明感知" }
        ]
      }
    ],
    downstream: [
      {
        name: "蜂鸣器/喇叭/电机",
        companies: [
          { name: "国光电器", highlight: "喇叭/声学器件，电声换能与扬声器" },
          { name: "鸣志电器", highlight: "步进/空心杯电机，机电执行与驱动元件" }
        ]
      },
      {
        name: "光电耦合器（光耦）",
        companies: [
          { name: "旭光电子", highlight: "光耦+晶闸管，信号隔离与功率控制" },
          { name: "士兰微", highlight: "光耦与功率器件，电气隔离与驱动" }
        ]
      },
      {
        name: "排针/排母/线束",
        companies: [
          { name: "得润电子", highlight: "连接器+线束，排针排母与汽车线束" },
          { name: "意华股份", highlight: "通信/光伏连接器，排针排母与接线端子" }
        ]
      }
    ]
  },

  // ========== MLCC ==========
  // 口径：MLCC介质粉/镍粉/离型膜载带、瓷介电容制造主业；下游仅保留 MLCC 用量机制明确的 AI 服务器与汽车电子映射
  "MLCC": {
    name: "MLCC",
    color: "#c2410c",
    gradient: ["#ea580c", "#9a3412"],
    description: "MLCC（片式多层陶瓷电容）是被动元件核心品类，上游为陶瓷介质粉、镍粉/内电极材料与封装离型膜载带，中游为瓷介电容制造与扩产。AI 服务器与新能源车单车 MLCC 用量数倍增长，驱动国产替代。口径：主业或核心收入与 MLCC 材料/制造强相关；不含 PCB、连接器、纯电感及泛泛整车标的。",
    upstream: [
      {
        name: "介质粉与电极材料",
        companies: [
          { name: "国瓷材料", highlight: "MLCC介质陶瓷粉体龙头，中高端粉体国产替代直供风华、三环等MLCC厂" },
          { name: "博迁新材", highlight: "MLCC内电极超细镍粉龙头，全球被动元件巨头镍粉核心供应商" },
          { name: "三环集团", highlight: "MLCC陶瓷基体与电子浆料自供，粉体到器件垂直一体化" }
        ]
      },
      {
        name: "MLCC封装辅材",
        companies: [
          { name: "洁美科技", highlight: "MLCC生产用离型膜与纸质载带龙头，被动元件扩产直接拉动订单" },
          { name: "福莱新材", highlight: "功能性涂布薄膜，MLCC离型膜与电子胶粘保护膜配套供应" }
        ]
      }
    ],
    midstream: [
      {
        name: "MLCC制造龙头",
        companies: [
          { name: "风华高科", highlight: "国内MLCC出货龙头，车规与AI用高压高容MLCC国产替代主力" },
          { name: "三环集团", highlight: "MLCC+陶瓷封装一体化，高端消费电子与车规MLCC份额持续提升" },
          { name: "火炬电子", highlight: "特种陶瓷电容器+MLCC，军工宇航与高可靠MLCC核心供应商" },
          { name: "鸿远电子", highlight: "军用高可靠MLCC龙头，宇航级瓷介电容市占率行业前列" }
        ]
      },
      {
        name: "瓷介电容/配套",
        companies: [
          { name: "宏达电子", highlight: "钽电容+瓷介电容，MLCC与特种被动元件配套军民用电子设备" },
          { name: "振华科技", highlight: "高新电子+瓷介电容器，MLCC与特种被动元件国产化核心企业" },
          { name: "麦捷科技", highlight: "片式MLCC与电感量产，被动元件一体化供应消费电子与汽车电子" }
        ]
      }
    ],
    downstream: [
      {
        name: "AI服务器（MLCC用量）",
        companies: [
          { name: "工业富联", highlight: "AI服务器代工龙头，单机MLCC用量较通用服务器数倍，拉动国产MLCC备货" },
          { name: "浪潮信息", highlight: "AI服务器出货龙头，算力硬件MLCC采购向国产龙头集中" }
        ]
      },
      {
        name: "汽车电子（车规MLCC）",
        companies: [
          { name: "均胜电子", highlight: "汽车安全与电子总成，车规MLCC与被动元件采购规模大、国产替代空间大" },
          { name: "华阳集团", highlight: "汽车电子与智能座舱，单车MLCC用量随电气化快速提升" }
        ]
      }
    ]
  },

  // ========== 多氟多 ==========
  // 口径：氟化工→氢氟酸/电子级氢氟酸→六氟磷酸锂/LiFSI→电解液→动力电池/储能；以多氟多氟基一体化产业链为主线
  "多氟多": {
    name: "多氟多",
    color: "#059669",
    gradient: ["#10b981", "#047857"],
    description: "以氟化工为根基的六氟磷酸锂/电解液/新能源电池一体化产业链。多氟多形成「氟资源→氢氟酸→氟化锂→六氟磷酸锂→电解液→锂电池」完整布局，储能需求拉动六氟磷酸锂供需紧平衡，2026年龙头满产满销。口径：主业与六氟磷酸锂、电解液、氟化工锂盐强相关；不含泛泛整车及非氟系锂电材料标的。",
    upstream: [
      {
        name: "氟化工原料/中间体",
        companies: [
          { name: "巨化股份", highlight: "氟化工龙头，无水氟化氢原料供应，电解液产业链氟资源底座" },
          { name: "三美股份", highlight: "萤石-无水氟化氢一体化，氟化工原料成本优势明显" },
          { name: "永太科技", highlight: "氟化物中间体与LiFSI原料，六氟磷酸锂产业链氟化学配套" }
        ]
      },
      {
        name: "电解液溶剂/添加剂",
        companies: [
          { name: "石大胜华", highlight: "碳酸二甲酯DMC等电解液溶剂龙头，溶剂价格联动电解液景气" },
          { name: "华盛锂电", highlight: "电解液添加剂VC/FEC龙头，六氟涨价周期添加剂需求受益" },
          { name: "江苏国泰", highlight: "电解液溶剂+瑞泰新材母公司，锂电材料一体化配套" }
        ]
      }
    ],
    midstream: [
      {
        name: "六氟磷酸锂/LiFSI",
        companies: [
          { name: "多氟多", highlight: "六氟磷酸锂销量国内第一，产能6.5万吨满产满销，2026年出货6-7万吨" },
          { name: "天赐材料", highlight: "电解液一体化龙头，六氟自供率超95%，长协锁定下游龙头电池厂" },
          { name: "天际股份", highlight: "六氟磷酸锂主业纯度最高，2026年有效产能提升至5.2万吨" }
        ]
      },
      {
        name: "电解液",
        companies: [
          { name: "天赐材料", highlight: "全球电解液出货量第一，国轩/中创新航2026-2028年长协合计近160万吨" },
          { name: "新宙邦", highlight: "电解液龙头，海外客户与国内动力电池厂订单饱满" },
          { name: "瑞泰新材", highlight: "江苏国泰旗下电解液子公司，宁德时代等企业核心供应商" }
        ]
      }
    ],
    downstream: [
      {
        name: "动力电池/储能电池",
        companies: [
          { name: "多氟多", highlight: "大圆柱电池储能订单激增，2026年出货量目标30GWh，产能扩至30GWh+" },
          { name: "国轩高科", highlight: "与九江天赐签订2026-2028年87万吨电解液采购长协，六氟需求锚定" },
          { name: "亿纬锂能", highlight: "储能+动力双线扩产，电解液与六氟磷酸锂采购规模大" }
        ]
      },
      {
        name: "储能/轻型车应用",
        companies: [
          { name: "宁德时代", highlight: "全球最大动力电池厂，电解液与六氟磷酸锂采购向龙头集中" },
          { name: "中创新航", highlight: "与天赐材料签订72.5万吨电解液三年长协，扩产拉动上游材料" },
          { name: "欣旺达", highlight: "储能PACK扩产，锂电材料备货周期拉长直接拉动电解液订单" }
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
          { name: "云从科技", highlight: "计算机视觉大模型，人机协同操作系统与行业大模型" }
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
          { name: "汉得信息", highlight: "企业数字化+AI Agent，ERP与供应链智能决策落地" },
          { name: "软通动力", highlight: "企业级AI Agent开发部署，头部客户自动化流程RPA+AI一体化" }
        ]
      },
      {
        name: "AI营销/办公/教育",
        companies: [
          { name: "每日互动", highlight: "AI营销数据平台，精准推送模型迭代，广告主ROI提升30%以上" },
          { name: "引力传媒", highlight: "AI+数字营销，大模型赋能广告创意与投放优化" },
          { name: "蓝色光标", highlight: "全面拥抱AI营销，AIGC内容生产成本降低60%，营销自动化客户快速增长" },
          { name: "佳发教育", highlight: "智慧教育信息化龙头，考试阅卷与校园AI解决方案" }
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
          { name: "卧龙电驱", highlight: "驱动电机与电控龙头，新能源汽车与工业驱动主业扎实，低空电机延伸布局" },
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
          { name: "宗申动力", highlight: "航空发动机与通航动力，eVTOL与无人机动力系统配套" },
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
          { name: "瑞泰新材", highlight: "锂电材料与电解质，固态电池用电解质材料研发推进" }
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
          { name: "国轩高科", highlight: "磷酸铁锂与半固态电池研发，大众集团战略合作" },
          { name: "孚能科技", highlight: "半固态电池能量密度330Wh/kg，广汽/吉利装车验证，海外订单突破" }
        ]
      }
    ],
    downstream: [
      {
        name: "新能源汽车应用",
        companies: [
          { name: "赛力斯", highlight: "问界系列车型，与赣锋等固态电池装车验证合作推进" },
          { name: "东风汽车", highlight: "赣锋固态电池装车验证，E70等车型固态电芯示范应用" },
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
          { name: "海光信息", highlight: "国产x86与DCU，昇腾生态协同的国产化算力底座" },
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
          { name: "神州数码", highlight: "华为全线产品总代，昇腾服务器分销与神州鲲泰信创交付" },
          { name: "华丰科技", highlight: "华为高速连接器核心供应商，昇腾910C集群互联关键器件" }
        ]
      },
      {
        name: "华为汽车/智选车",
        companies: [
          { name: "赛力斯", highlight: "问界M9/M8爆款车型，2026年销量目标60万辆，华为智选车标杆" },
          { name: "江淮汽车", highlight: "尊界MAEXTRO华为合作，江淮制造与供应链配套" },
          { name: "北汽蓝谷", highlight: "极狐品牌华为智能化合作，纯电与增程车型布局" }
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
          { name: "工业富联", highlight: "AI服务器代工规模领先，云厂商ODM订单饱满" },
          { name: "浪潮信息", highlight: "国内AI服务器头部厂商，液冷G7系列支持高密度GPU集群" },
          { name: "中科曙光", highlight: "国产AI服务器龙头，海光芯片+液冷方案，政务智算项目供货居前" }
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
          { name: "润泽科技", highlight: "超大规模智算园区运营，批发型云客户上架率与液冷PUE优化领先" },
          { name: "数据港", highlight: "阿里云核心数据中心合作方，上架率与云侧算力扩张同步" },
          { name: "光环新网", highlight: "京津冀IDC+云服务龙头，企业与大模型客户托管需求稳定，AIDC改造项目推进中" }
        ]
      },
      {
        name: "GPU云/弹性算力",
        companies: [
          { name: "首都在线", highlight: "公有云GPU与裸金属实例产品线明确，中小客户与出海弹性算力代表" },
          { name: "拓维信息", highlight: "昇腾生态伙伴，国产智算建设与行业算力服务" },
          { name: "网宿科技", highlight: "边缘计算与算力调度，近端算力与CDN协同" }
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

  // ========== 预制算力中心底座 ==========
  // 口径：模块化/集装箱式智算机房 + 供配电液冷等底座 + 整机组网交付 + 运营上架；区别于纯算力租赁与上游芯片
  "预制算力中心底座": {
    name: "预制算力中心底座",
    color: "#0891b2",
    gradient: ["#0891b2", "#0e7490"],
    description: "预制算力中心底座聚焦智算中心「快速建设、模块化交付」环节：上游预制机房与供配电，中游液冷散热与AI服务器/网络底座，下游智算园区运营与算力集成服务，是大模型算力基建扩产的核心配套。",
    upstream: [
      {
        name: "预制机房/EPC与土建配套",
        companies: [
          { name: "中国能建", highlight: "算力中心EPC+绿电园区工程，预制化智算土建与机电总包能力突出" },
          { name: "依米康", highlight: "集装箱/模块化智算机房方案，预制交付缩短智算中心建设周期" },
          { name: "城地香江", highlight: "IDC机柜与算力基建转型，预制化机柜资源投放与上架率改善" }
        ]
      },
      {
        name: "供配电与能源底座",
        companies: [
          { name: "科士达", highlight: "UPS+配电系统龙头，预制算力机柜连续供电与底座能源保障核心" },
          { name: "科华数据", highlight: "智算供配电+IDC运营，预制智算中心电力底座一体化交付" },
          { name: "麦格米特", highlight: "服务器电源模块+配电部件，AI机柜高密度供配电底座供应商" }
        ]
      }
    ],
    midstream: [
      {
        name: "液冷/散热预制模块",
        companies: [
          { name: "英维克", highlight: "预制液冷CDU+机柜温控，高密度GPU智算中心PUE优化底座龙头" },
          { name: "申菱环境", highlight: "精密空调+液冷一体化模块，大型预制智算中心温控方案核心" },
          { name: "高澜股份", highlight: "液冷散热系统与CDU，预制算力集群热管理底座配套" }
        ]
      },
      {
        name: "算力整机与网络底座",
        companies: [
          { name: "浪潮信息", highlight: "AI服务器整机龙头，预制算力集群标准机柜与液冷交付能力强" },
          { name: "工业富联", highlight: "云厂商AI服务器ODM，预制智算中心整机批量上架底座" },
          { name: "中兴通讯", highlight: "智算中心交换机与组网方案，预制集群东西向网络底座供应商" }
        ]
      }
    ],
    downstream: [
      {
        name: "预制智算交付与运营",
        companies: [
          { name: "润泽科技", highlight: "模块化智算园区快速交付，批发型云客户上架率与预制扩容领先" },
          { name: "数据港", highlight: "阿里云核心IDC合作方，预制化改造与云侧算力上架同步" },
          { name: "光环新网", highlight: "京津冀IDC+云，企业智算托管与预制机房改造需求稳定" }
        ]
      },
      {
        name: "算力集成与建设服务",
        companies: [
          { name: "中贝通信", highlight: "国内+海外算力中心投资建设，预制智算资源投放与交付进度受关注" },
          { name: "拓维信息", highlight: "昇腾生态智算集成伙伴，预制算力中心行业方案与交付绑定深" },
          { name: "首都在线", highlight: "GPU云与裸金属算力交付，预制智算上架后弹性算力服务运营" }
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
          { name: "太极股份", highlight: "政务大数据+数据交易所建设，北京等地数据交易平台技术提供方" },
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
          { name: "中粮糖业", highlight: "酿酒原料与辅料供应，食用酒精及淀粉糖产业链配套" },
          { name: "裕同科技", highlight: "高端白酒包装龙头，酒类礼盒+防伪包装全国市占率第一" },
          { name: "劲嘉股份", highlight: "烟酒包装印刷龙头，高端白酒纸质包装全国市占率最高" }
        ]
      },
      {
        name: "酿造设备",
        companies: [
          { name: "乐惠国际", highlight: "啤酒/白酒酿造装备龙头，发酵罐与灌装线设备出口领先" },
          { name: "科远智慧", highlight: "酿造自动化控制系统，白酒智能生产线核心设备供应商" },
          { name: "永创智能", highlight: "酒类灌装与包装设备，白酒生产线自动化装备" }
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
          { name: "古井贡酒", highlight: "浓香型区域龙头，年份原浆系列全国化扩张" }
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
          { name: "今世缘", highlight: "浓香型白酒龙头，江苏市场宴席与礼品消费强势" },
          { name: "酒鬼酒", highlight: "馥郁香型白酒，内参系列高端化与全国化扩张" }
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
          { name: "正海生物", highlight: "生物再生材料，口腔膜与软组织修复材料龙头" },
          { name: "奥精医疗", highlight: "人工骨修复材料，生物陶瓷骨缺损修复产品" },
          { name: "佰仁医疗", highlight: "动物源性植介入材料，心脏瓣膜与补片材料" }
        ]
      },
      {
        name: "芯片/传感器",
        companies: [
          { name: "理邦仪器", highlight: "医疗监护与心电设备，多参数监护传感器与模块" },
          { name: "奕瑞科技", highlight: "医学影像探测器，DR/CT核心X光传感器龙头" },
          { name: "中航光电", highlight: "医疗连接器/传感器，手术机器人和微创器械关键部件" }
        ]
      }
    ],
    midstream: [
      {
        name: "医学影像设备",
        companies: [
          { name: "联影医疗", highlight: "国产医学影像设备龙头，CT/MRI/PET-CT市占率国内前三，AI影像诊断领先" },
          { name: "万东医疗", highlight: "医用X射线设备龙头，DR/DSA国产替代核心厂商" },
          { name: "迈瑞医疗", highlight: "医疗器械平台龙头，超声与监护影像设备全球领先" }
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
          { name: "国药一致", highlight: "医药流通龙头，医院器械与药品集中采购渠道" },
          { name: "山东药玻", highlight: "药用玻璃包装龙头，注射剂瓶与预灌封封装" }
        ]
      },
      {
        name: "康复/家用",
        companies: [
          { name: "可孚健康", highlight: "康复护理器械龙头，家用医疗+养老康复设备线上市占率领先" },
          { name: "三诺生物", highlight: "血糖监测龙头，家用慢病管理设备与耗材" },
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
          { name: "盐湖股份", highlight: "钾肥龙头，农用氯化钾国内供给核心，化肥产业链上游" }
        ]
      },
      {
        name: "农机设备",
        companies: [
          { name: "一拖股份", highlight: "农业装备龙头，大中马力拖拉机市占率全国第一" },
          { name: "吉峰科技", highlight: "农机流通与服务，拖拉机与收获机械销售渠道覆盖广" },
          { name: "大禹节水", highlight: "节水灌溉装备，农田水利与滴灌系统龙头" }
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
          { name: "河钢资源", highlight: "铁矿采选龙头，南非PMC铁矿资源储量丰富，海外铁矿开发领先" },
          { name: "金岭矿业", highlight: "铁矿石开采，山东地区铁矿资源主力供应商" },
          { name: "大中矿业", highlight: "铁矿采选+钢铁，国内铁矿资源储备与采选一体化" }
        ]
      },
      {
        name: "冶炼辅材",
        companies: [
          { name: "洛阳钼业", highlight: "钼铁合金原料，高端特种钢添加剂" },
          { name: "驰宏锌锗", highlight: "铅锌冶炼，钢铁脱硫和合金化关键原料" },
          { name: "方大炭素", highlight: "石墨电极龙头，电弧炉炼钢核心耗材" }
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

  // ========== 电力 ==========
  // 口径：发电（水火核）、电力装备、特高压输变电、电网运营与配售电；风光储制造见「新能源」
  "电力": {
    name: "电力",
    color: "#eab308",
    gradient: ["#ca8a04", "#854d0e"],
    description: "电力产业链涵盖一次能源、发电装备、水火核发电、特高压输变电与电网调度，到配售电与综合能源服务。新型电力系统建设带动特高压、灵活性改造与数字化投资。口径：主业为发电、电网、电力设备或售电运营；纯光伏组件/动力电池制造见「新能源」板块。",
    upstream: [
      {
        name: "一次能源/燃料",
        companies: [
          { name: "中国神华", highlight: "煤电一体化龙头，自有煤矿+坑口电厂，动力煤与火电协同成本优势" },
          { name: "陕西煤业", highlight: "优质动力煤龙头，长协+现货供应华东煤电基地" },
          { name: "中煤能源", highlight: "煤炭开采+煤电联营，央企能源保供与化工用煤一体化" }
        ]
      },
      {
        name: "发电装备",
        companies: [
          { name: "东方电气", highlight: "水火核风光发电装备龙头，百万千瓦汽轮发电机组国内市占领先" },
          { name: "上海电气", highlight: "火电+核电装备+风电整机，综合电力装备央企上市平台" },
          { name: "浙能电力", highlight: "华东火电+核电参股，沿海煤电基地与区域电力供应龙头" }
        ]
      }
    ],
    midstream: [
      {
        name: "水电/核电运营",
        companies: [
          { name: "长江电力", highlight: "全球水电运营龙头，三峡+乌白梯级电站，稳定现金流与高股息" },
          { name: "华能水电", highlight: "澜沧江流域水电龙头，低成本清洁电力，西电东送外送受益" },
          { name: "中国核电", highlight: "核电运营双寡头之一，在建机组储备充足，基荷电源属性强" },
          { name: "中国广核", highlight: "核电运营+工程建设，在运与核准装机规模国内领先" }
        ]
      },
      {
        name: "火电/综合发电",
        companies: [
          { name: "华能国际", highlight: "火电装机龙头央企，煤电灵活性改造+新能源装机快速提升" },
          { name: "国电电力", highlight: "国家能源集团火电上市平台，大渡河水电+煤电一体化" },
          { name: "大唐发电", highlight: "五大发电集团上市平台之一，火电+水电+风电多元电源" },
          { name: "国投电力", highlight: "水电+火电均衡布局，雅砻江流域水电核心资产" }
        ]
      }
    ],
    downstream: [
      {
        name: "特高压/输变电设备",
        companies: [
          { name: "国电南瑞", highlight: "电网自动化+继电保护龙头，调度与变电站二次设备核心平台" },
          { name: "许继电气", highlight: "特高压直流换流阀+智能电表，国网南网核心供应商" },
          { name: "平高电气", highlight: "特高压GIS组合电器龙头，国网招标份额稳定" },
          { name: "特变电工", highlight: "特高压变压器+电线电缆龙头，变压器出海与新能源协同" },
          { name: "中国西电", highlight: "输配电一次设备央企，变压器、开关、避雷器全链条" }
        ]
      },
      {
        name: "电网运营/配售电",
        companies: [
          { name: "南网储能", highlight: "抽水蓄能运营龙头，电网侧调峰调频核心资产" },
          { name: "明星电力", highlight: "地方电网+水电，遂宁地方供电与涪江流域水资源" },
          { name: "涪陵电力", highlight: "国网节能服务上市平台，配电网节能与综合能源运营" },
          { name: "南网能源", highlight: "工商业节能+分布式光伏，南方电网综合能源服务龙头" },
          { name: "西昌电力", highlight: "地方电网+水电，凉山州地方供电与清洁能源消纳" }
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
          { name: "南大光电", highlight: "ArF光刻胶龙头，先进制程光刻胶国产突破核心" },
          { name: "晶瑞电材", highlight: "湿电子化学品+光刻胶，晶圆制造关键材料国产替代" }
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
          { name: "澜起科技", highlight: "内存接口芯片龙头，DDR5 RCD/DB芯片全球市占领先" },
          { name: "瑞芯微", highlight: "SOC芯片龙头，平板和安卓电视芯片市占率全球前三" },
          { name: "紫光国微", highlight: "安全芯片+FPGA龙头，移动通信+安全芯片双赛道国产替代" }
        ]
      },
      {
        name: "晶圆制造",
        companies: [
          { name: "中芯国际", highlight: "国内晶圆代工龙头，14nm量产和28nm稳定供应" },
          { name: "华虹公司", highlight: "特色工艺代工A股龙头，模拟芯片和功率芯片全球竞争力" },
          { name: "华润微", highlight: "IDM功率半导体代工，8英寸晶圆产线成熟" }
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
          { name: "传音控股", highlight: "智能手机出海龙头，主控与影像芯片采购量大" },
          { name: "工业富联", highlight: "AI服务器与智能终端代工，芯片封装与应用端放量" },
          { name: "海信视像", highlight: "显示终端龙头，SoC与面板驱动芯片需求旺盛" }
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
          { name: "信隆健康", highlight: "自行车零配件龙头，两轮出行零部件与运动器材配套" },
        ]
      },
      {
        name: "物流配送",
        companies: [
          { name: "顺丰控股", highlight: "快递A股龙头，新能源末端配送车大规模采购，绿色物流领先" },
          { name: "德邦股份", highlight: "大件快递+快运，新能源物流车队替换加速" },
          { name: "韵达股份", highlight: "快递网络龙头，末端配送电动两轮与四轮车采购" }
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
           { name: "广汇能源", highlight: "油气勘探开发+LNG，页岩油与天然气产销规模领先" },
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
          { name: "中航西飞", highlight: "运输机与轰炸机等整机总装，运-20等型号核心平台" }
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
          { name: "四创电子", highlight: "雷达与空管系统，军用气象与低空监视装备核心配套" },
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
          { name: "国博电子", highlight: "有源相控阵T/R组件，星载微波射频前端核心供应商" },
          { name: "雷电微力", highlight: "毫米波微系统，卫星通信相控阵芯片与组件" },
        ]
      }
    ],
    midstream: [
      {
        name: "火箭制造/发射",
        companies: [
          { name: "航天动力", highlight: "液体火箭发动机核心供应商，航天推进系统技术积累深厚" },
          { name: "中天火箭", highlight: "固体火箭+小型运载火箭，商业航天发射服务" },
          { name: "斯瑞新材", highlight: "火箭发动机铜合金推力室，民营火箭核心配套" }
        ]
      },
      {
        name: "卫星制造/组网",
        companies: [
          { name: "中国卫星", highlight: "小卫星总装龙头，低轨卫星星座组网核心制造平台" },
          { name: "四维图新", highlight: "高精地图+遥感数据，卫星应用与车联网数据服务" },
          { name: "上海瀚讯", highlight: "宽带通信设备，卫星互联网地面站与特种通信" },
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
          { name: "四维图新", highlight: "遥感数据处理+高精地图，应急/气象/农业行业应用" },
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
          { name: "光库科技", highlight: "量子通信光学器件，光纤偏振/调制器件核心供应商" },
          { name: "华工科技", highlight: "量子通信激光器与光器件，QKD系统光模块配套" }
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
          { name: "科大国创", highlight: "量子计算软件+算法，光量子计算软件平台研发领先" },
          { name: "神州信息", highlight: "量子通信与金融IT，量子加密与行业应用集成" }
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
          { name: "格尔软件", highlight: "密码与PKI安全，量子加密与金融政务安全配套" },
          { name: "吉大正元", highlight: "商用密码产品，量子保密通信安全网关与认证" }
        ]
      },
      {
        name: "量子测量/传感",
        companies: [
          { name: "航天电子", highlight: "惯性导航与测控，量子精密测量器件配套探索" },
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
          { name: "翔宇医疗", highlight: "康复脑电采集设备，非侵入式脑电信号监测" },
          { name: "冠昊生物", highlight: "神经修复生物材料，植入式电极生物相容性材料" }
        ]
      },
      {
        name: "芯片/信号处理",
        companies: [
          { name: "汉威科技", highlight: "生物传感器+信号处理，脑电与环境多模态信号采集" },
          { name: "狄耐克", highlight: "医疗信息化+脑电监测，神经康复场景信号处理" },
          { name: "赛微电子", highlight: "MEMS工艺代工，脑机接口微电极MEMS加工能力" },
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
          { name: "中国稀土", highlight: "中重稀土分离与加工，央企稀土平台" },
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
          { name: "绿的谐波", highlight: "谐波减速器龙头，人形机器人关节减速器核心供应商" },
          { name: "中大力德", highlight: "精密减速器+电机，机器人关节驱动配套" },
          { name: "鸣志电器", highlight: "空心杯电机，人形机器人灵巧手与关节驱动" }
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
          { name: "信达生物", highlight: "GLP-1/GCG双靶点减重药，玛仕度肽临床数据优异" },
          { name: "恒瑞医药", highlight: "GLP-1+胰岛素双布局，HRS9531减重临床数据优异" },
          { name: "华东医药", highlight: "利拉鲁肽+司美格鲁肽类似药，减肥药商业化领先" }
        ]
      },
      {
        name: "创新药销售/渠道",
        companies: [
          { name: "恒瑞医药", highlight: "国内处方药销售团队最大，创新药收入占比超50%" },
          { name: "上海医药", highlight: "医药商业龙头，创新药分销与医院渠道覆盖最广" },
          { name: "华东医药", highlight: "创新药+医美龙头，GLP-1类似药商业化领先" }
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
  },

  // ========== 无人驾驶 ==========
  // 口径：感知-决策-车路协同-落地全链；排除座舱/HUD、通用零部件、仅新能源车概念等非智驾主业标的
  "无人驾驶": {
    name: "无人驾驶",
    color: "#7c3aed",
    gradient: ["#7c3aed", "#5b21b6"],
    description: "无人驾驶产业链覆盖车载感知（激光雷达/摄像头/定位）、域控制器与高精地图、车路协同V2X，以及高阶智驾车型与无人巴士等落地场景。本表仅收录智驾收入或订单占比较高、业务绑定明确的A股公司。",
    upstream: [
      {
        name: "激光雷达/光学",
        companies: [
          { name: "万集科技", highlight: "车载+路侧激光雷达量产，车路协同感知核心标的，智驾业务占比高" },
          { name: "永新光学", highlight: "激光雷达光学模组/镜头，供应禾赛、速腾等主流雷达厂，智驾光学环节刚需" },
          { name: "炬光科技", highlight: "激光雷达发射端元器件，车载固态/混合固态雷达供应链核心环节" }
        ]
      },
      {
        name: "摄像头/超声感知",
        companies: [
          { name: "韦尔股份", highlight: "车载CIS图像传感器全球领先，ADAS/环视摄像头芯片主力供应商" },
          { name: "豪恩汽电", highlight: "汽车电子传感器专精，摄像头/超声波/APA自动泊车系统批量配套主机厂" }
        ]
      },
      {
        name: "高精定位/智驾测试",
        companies: [
          { name: "华测导航", highlight: "高精度GNSS+组合导航，自动驾驶定位与农机/测绘车规级方案放量" },
          { name: "华依科技", highlight: "动力总成与ADAS测试台架，智驾域控/传感器下线检测装备核心供应商" }
        ]
      }
    ],
    midstream: [
      {
        name: "域控制器/汽车电子",
        companies: [
          { name: "德赛西威", highlight: "智能驾驶域控龙头，英伟达Orin/高通平台方案在理想等车企大规模量产" },
          { name: "经纬恒润", highlight: "ADAS与智能驾驶电子+软件，域控、雷达控制器及仿真测试全栈布局" },
          { name: "科博达", highlight: "车身域控与智能驾驶域控，比亚迪/理想等车企智驾控制器核心供应商" }
        ]
      },
      {
        name: "高精地图/智驾软件",
        companies: [
          { name: "四维图新", highlight: "国内高精地图龙头，L2+及以上智驾合规地图与数据闭环核心厂商" },
          { name: "中科创达", highlight: "Snapdragon Ride等智驾OS与中间件，舱驾一体软件栈头部厂商" },
          { name: "光庭信息", highlight: "汽车电子软件工程服务，ADAS/智驾算法集成与测试验证订单集中" }
        ]
      },
      {
        name: "车路协同（V2X）",
        companies: [
          { name: "千方科技", highlight: "智慧交通与车路协同龙头，路侧感知+云控平台支撑高等级自动驾驶" },
          { name: "金溢科技", highlight: "V2X车载OBU/路侧RSU龙头，智能网联与无人化路口协同核心标的" }
        ]
      }
    ],
    downstream: [
      {
        name: "高阶智驾乘用车",
        companies: [
          { name: "赛力斯", highlight: "问界全系搭载华为乾崑ADS高阶智驾，城市NOA落地车型销量领先" },
          { name: "北汽蓝谷", highlight: "极狐与百度Apollo深度合作，Robotaxi与L4示范运营核心整车平台" }
        ]
      },
      {
        name: "无人巴士/商用智驾",
        companies: [
          { name: "金龙汽车", highlight: "自动驾驶巴士在多地示范运营，商用车L4场景落地国内领先" }
        ]
      }
    ]
  },

  // ========== 特斯拉FSD入华 ==========
  // 口径：FSD 在华落地需地图合规、车端算力/域控、视觉感知与线控执行；仅收录智驾主业或特斯拉中国供应链中明确绑定环节，排除仅新能源车/特斯拉概念标的
  "特斯拉FSD入华": {
    name: "特斯拉FSD入华",
    color: "#dc2626",
    gradient: ["#dc2626", "#991b1b"],
    description: "特斯拉 FSD（完全自动驾驶能力）入华将催化高阶智驾竞争与监管合规落地。A股主线：车载视觉/激光雷达感知、智驾域控与高精地图、车路协同，以及特斯拉中国区 Tier1 与线控执行层供应商。本表仅收录与 FSD 功能落地、数据合规或特斯拉在华智驾放量有直接业务绑定的公司。",
    upstream: [
      {
        name: "视觉感知（摄像头/CIS）",
        companies: [
          { name: "韦尔股份", highlight: "车载 CIS 龙头，纯视觉智驾路线与特斯拉 FSD 同源，摄像头芯片放量直接受益" },
          { name: "联创电子", highlight: "车载光学镜头量产，ADAS/环视摄像头模组配套主机厂对标 FSD 视觉方案" },
          { name: "豪恩汽电", highlight: "车载摄像头+超声波+APA 传感器，智驾感知套件批量供货新势力与合资厂" }
        ]
      },
      {
        name: "激光雷达/光学",
        companies: [
          { name: "永新光学", highlight: "激光雷达光学模组龙头，国内 L2+/城市 NOA 感知放量，与 FSD 入华带来的智驾渗透率提升共振（非特斯拉标配）" },
          { name: "万集科技", highlight: "车载激光雷达+路侧感知，车路协同与高阶智驾示范区建设核心标的" }
        ]
      },
      {
        name: "高精定位",
        companies: [
          { name: "华测导航", highlight: "高精度 GNSS+组合导航，城市 NOA/FSD 级定位与数据闭环刚需环节" }
        ]
      }
    ],
    midstream: [
      {
        name: "智驾域控/执行",
        companies: [
          { name: "德赛西威", highlight: "英伟达 Orin 等平台智驾域控龙头，FSD 入华倒逼主机厂高阶智驾订单加速" },
          { name: "伯特利", highlight: "线控制动/电控转向龙头，高阶智驾执行层国产替代，主机厂对标 FSD 加速线控定点（非特斯拉直供）" },
          { name: "科博达", highlight: "车身域控与智驾控制器，理想/比亚迪等车企域控放量，主机厂对标特斯拉 FSD 架构（非特斯拉直供）" }
        ]
      },
      {
        name: "高精地图/智驾软件",
        companies: [
          { name: "四维图新", highlight: "高精地图与数据合规资质龙头，外资 FSD 在华运营地图与审图关键环节" },
          { name: "中科创达", highlight: "智驾 OS/中间件与舱驾一体软件栈，FSD 方案本地化与国内主机厂对标开发" },
          { name: "光庭信息", highlight: "ADAS/智驾软件集成与测试验证，主机厂追赶特斯拉 FSD 的工程服务订单集中" }
        ]
      },
      {
        name: "车路协同（V2X）",
        companies: [
          { name: "千方科技", highlight: "智慧交通+车路协同云控，FSD 在华落地带动高等级智驾法规与示范区路侧建设（间接受益）" },
          { name: "金溢科技", highlight: "V2X OBU/RSU 龙头，智能网联路口协同支撑国内高阶智驾运营（间接受益，非特斯拉直供）" }
        ]
      }
    ],
    downstream: [
      {
        name: "特斯拉供应链（在华放量）",
        companies: [
          { name: "拓普集团", highlight: "特斯拉中国区核心 Tier1，底盘+热管理+轻量化，FSD 入华带动在华产销与结构件放量" },
          { name: "旭升集团", highlight: "特斯拉一级供应商，一体化压铸结构件核心厂商，上海工厂新车周期直接受益" },
          { name: "银轮股份", highlight: "特斯拉热管理系统核心供应商，FSD 入华推升在华特斯拉产销，液冷/换热件需求受益" }
        ]
      }
    ]
  },

  // ========== 长鑫存储 ==========
  // 口径：长鑫科技（母公司）/长鑫存储（DRAM IDM）扩产、IPO与国产替代；标的需与合肥厂建设、设备材料、封测或模组放量有明确绑定
  "长鑫存储": {
    name: "长鑫存储",
    color: "#0e7490",
    gradient: ["#0e7490", "#164e63"],
    description: "长鑫存储为国内唯一实现通用型DRAM大规模量产的IDM，覆盖DDR4/DDR5、LPDDR4/5，母公司长鑫科技科创板IPO推进中，二期扩产与HBM攻关同步。A股主线：参股与研发协同、合肥/北京/上海厂设备材料与工程总包、DRAM封测，以及模组与服务器端国产颗粒放量。",
    upstream: [
      {
        name: "晶圆制造设备",
        companies: [
          { name: "北方华创", highlight: "刻蚀/沉积/CVD等设备龙头，DRAM产线扩产与技改核心国产设备商" },
          { name: "长川科技", highlight: "存储器封测与晶圆电测设备，DRAM 产线后道测试扩产直接受益" },
          { name: "至纯科技", highlight: "高纯工艺系统与湿法设备，存储产线洁净与清洗环节扩产配套" }
        ]
      },
      {
        name: "材料/特气/厂建",
        companies: [
          { name: "雅克科技", highlight: "电子特气与前驱体，DRAM产线CVD/刻蚀用高纯材料配套" },
          { name: "太极实业", highlight: "子公司十一科技承担长鑫存储合肥及北京扩产工程总包，厂建订单直接受益" },
          { name: "晶瑞电材", highlight: "湿电子化学品与光刻胶，存储产线清洗/蚀刻配套，创业板材料供应商" },
          { name: "立昂微", highlight: "12英寸硅片与外延片，存储晶圆厂硅材扩产关键供应商" }
        ]
      }
    ],
    midstream: [
      {
        name: "股权协同/研发合作",
        companies: [
          { name: "兆易创新", highlight: "直接持股长鑫科技，董事长朱一明兼任长鑫科技董事长，DRAM研发与代工销售深度协同" },
          { name: "朗迪集团", highlight: "通过产业基金间接参股长鑫科技，国产存储资本化预期映射标的" }
        ]
      },
      {
        name: "DRAM封测",
        companies: [
          { name: "深科技", highlight: "存储封测与模组制造龙头，沛顿科技等子公司与长鑫等国内存储厂配套紧密" },
          { name: "通富微电", highlight: "DRAM/NAND封测布局完善，与主流存储合作伙伴深化协同" }
        ]
      }
    ],
    downstream: [
      {
        name: "存储模组/渠道",
        companies: [
          { name: "江波龙", highlight: "存储模组龙头，国产DRAM颗粒导入与渠道放量，长鑫产能扩张直接受益" },
          { name: "深科技", highlight: "沛顿存储模组与封测制造，国产 DRAM 颗粒配套出货直接受益" }
        ]
      },
      {
        name: "接口芯片/服务器",
        companies: [
          { name: "兆易创新", highlight: "持股长鑫科技并协同研发，国产 DRAM 生态放量带动配套需求" },
          { name: "浪潮信息", highlight: "服务器龙头，国产内存供给改善有利于整机成本与供应链安全" }
        ]
      }
    ]
  },

  // ========== 先进封装 ==========
  // 口径：Fan-out、2.5D/3D、Chiplet、HBM堆叠、凸块/WLP 或封装基板/封测设备材料主业；不含泛芯片设计、晶圆制造、面板等非封装环节
  "先进封装": {
    name: "先进封装",
    color: "#7c3aed",
    gradient: ["#7c3aed", "#5b21b6"],
    description: "先进封装是后摩尔时代延续算力密度的核心环节，涵盖 Fan-out、2.5D/3D、Chiplet、HBM 堆叠与晶圆级封装（WLP）。A股主线：封装基板与塑封/电镀材料、固晶与直写光刻等封测设备，以及 OSAT 龙头与 AI/HBM 放量带来的封测产能紧缺映射。",
    upstream: [
      {
        name: "封装材料",
        companies: [
          { name: "飞凯材料", highlight: "封装用光刻胶与湿制程材料，凸块与 RDL 工艺化学品配套封测产线" },
          { name: "联瑞新材", highlight: "球形硅微粉填料龙头，EMC 与先进封装封装料关键填料供应商" },
          { name: "洁美科技", highlight: "电子封装离型膜与载带，MLCC/封测封装辅材龙头，创业板" },
          { name: "三环集团", highlight: "陶瓷封装外壳与电子浆料，先进封装被动件与封装外壳配套" }
        ]
      },
      {
        name: "封装基板/载板",
        companies: [
          { name: "深南电路", highlight: "ABF 封装基板龙头，FC-BGA 载板直供 OSAT 与 AI 芯片先进封装" },
          { name: "兴森科技", highlight: "IC 载板与封装基板量产，Chiplet/2.5D 互连载板产能扩张" },
          { name: "沪电股份", highlight: "算力板+封装基板双线，高端载板配套国内先进封装扩产" }
        ]
      },
      {
        name: "封测设备",
        companies: [
          { name: "长川科技", highlight: "封测分选测试机龙头，先进封装后道电性测试与产能扩张直接受益" },
          { name: "大族数控", highlight: "PCB/载板钻孔与成型设备，封装基板与载板扩产配套" },
          { name: "劲拓股份", highlight: "半导体封装回流焊/贴合设备，OSAT 产线扩产受益" }
        ]
      }
    ],
    midstream: [
      {
        name: "先进封装 OSAT 龙头",
        companies: [
          { name: "长电科技", highlight: "全球第三大 OSAT，XDFOI 2.5D/3D 与 Chiplet 先进封装技术国内领先" },
          { name: "通富微电", highlight: "AMD 主力封测伙伴，Chiplet/2.5D 先进封装产能与海外大客户深度绑定" },
          { name: "华天科技", highlight: "2.5D/3D、Fan-out 规模封测，车规与 AI 芯片先进封装订单放量" }
        ]
      },
      {
        name: "特色先进封装",
        companies: [
          { name: "晶方科技", highlight: "CIS 晶圆级封装（WLCSP）龙头，图像传感器 WLP 与 TSV 技术领先" },
          { name: "通富微电", highlight: "Fan-out/2.5D 规模封测，AMD 等大客户先进封装产能持续扩张" },
          { name: "华天科技", highlight: "车规与消费电子 WLP/3D 封装，先进封装订单放量" }
        ]
      }
    ],
    downstream: [
      {
        name: "封测产能映射",
        companies: [
          { name: "深科技", highlight: "沛顿存储封测与模组制造，DRAM/HBM 堆叠封装与国内存储厂配套" },
          { name: "江波龙", highlight: "存储模组龙头，先进封装产能释放带动国产颗粒导入与出货" }
        ]
      },
      {
        name: "封装基板需求",
        companies: [
          { name: "工业富联", highlight: "AI 服务器代工龙头，高端封装基板与整机柜需求拉动载板/OSAT" },
          { name: "浪潮信息", highlight: "AI 服务器出货龙头，算力芯片先进封装与基板订单间接受益" }
        ]
      }
    ]
  },

  // ========== 光互联（光学链接 / CPO / 800G·1.6T）==========
  "光互联": {
    name: "光互联",
    color: "#0891b2",
    gradient: ["#0891b2", "#0e7490"],
    description: "光互联是 AI 智算集群东西向带宽的核心，涵盖 800G/1.6T 光模块、硅光/CPO 光引擎、MPO/AOC 与光芯片。A股主线：数通光模块龙头、光器件封装、光芯片国产替代及光纤光缆+设备一体化标的。",
    upstream: [
      {
        name: "光芯片/激光器",
        companies: [
          { name: "源杰科技", highlight: "EML/CW 激光器芯片，100G EML 量产，绑定中际旭创等模块龙头" },
          { name: "华工科技", highlight: "25G/100G DFB 激光芯片垂直整合，硅光+光模块双轮" },
          { name: "光迅科技", highlight: "光芯片-器件-模块全产业链，25G DFB 批量自供" }
        ]
      },
      {
        name: "光器件/CPO 组件",
        companies: [
          { name: "天孚通信", highlight: "光引擎/FAU/MPO 无源器件龙头，CPO 先进封装核心供应商" },
          { name: "长芯博创", highlight: "MPO/AOC/硅光互连器件，海外云厂商长期合作" },
          { name: "太辰光", highlight: "MPO 连接器与柔性光路，数据中心高密度互连" }
        ]
      }
    ],
    midstream: [
      {
        name: "数通光模块",
        companies: [
          { name: "中际旭创", highlight: "800G/1.6T 光模块全球龙头，AI 数据中心光互联市占率第一" },
          { name: "新易盛", highlight: "800G/1.6T 高增，北美云厂商核心供应商" },
          { name: "光迅科技", highlight: "800G 批量出货，1.6T 具备批量交付能力" },
          { name: "华工科技", highlight: "800G/1.6T 硅光模块，3.2T 液冷 CPO 光引擎" },
          { name: "剑桥科技", highlight: "800G/1.6T 硅光模块，350 万支年化产能满负荷" },
          { name: "联特科技", highlight: "800G/1.6T 高速光模块，光芯片到模块设计制造" }
        ]
      },
      {
        name: "光传输/网络设备",
        companies: [
          { name: "烽火通信", highlight: "光传输系统设备龙头，光芯片自主可控，算力传输+运营商集采" },
          { name: "中兴通讯", highlight: "智算中心交换机+光网络方案，大集群组网核心供应商" }
        ]
      }
    ],
    downstream: [
      {
        name: "光纤光缆+一体化",
        companies: [
          { name: "永鼎股份", highlight: "光纤+1.6T 光模块+CPO，算力光互联与特种光缆" },
          { name: "亨通光电", highlight: "特种光纤+海底光缆，AI 光纤出海与算力传输" },
          { name: "中天科技", highlight: "光纤光缆+算力光缆，海缆与特种光纤双主线" }
        ]
      },
      {
        name: "智算/云侧需求",
        companies: [
          { name: "工业富联", highlight: "AI 服务器 ODM，整机柜光互联需求间接受益" },
          { name: "浪潮信息", highlight: "AI 服务器出货龙头，高密度 GPU 集群光模块配套" }
        ]
      }
    ]
  },

  // ========== 光纤概念（AI算力光纤光缆 / 2026）==========
  "光纤概念": {
    name: "光纤概念",
    color: "#0891b2",
    gradient: ["#06b6d4", "#0e7490"],
    description: "光纤概念覆盖 AI 算力拉动的光纤光缆全产业链：光棒/石英材料 → 缆料辅材 → 光纤光缆制造 → 特种/算力光缆 → 运营商集采出海 → 海缆/算力场景落地。2026年行业特征：AI光纤需求高增、头部产线满产、空芯光纤商用加速。口径：剔除科创板(688/689)；仅供产业链学习，不构成投资建议。",
    upstream: [
      {
        name: "光棒/石英材料",
        companies: [
          { name: "长飞光纤", highlight: "全球光棒产能第一，预制棒自给率高，空芯光纤技术领先" },
          { name: "亨通光电", highlight: "光棒自给90%+，AI光纤批量出海，运营商集采份额领先" },
          { name: "菲利华", highlight: "石英材料/石英棒，光棒上游高纯石英玻璃与半导体配套" },
          { name: "石英股份", highlight: "高纯石英砂龙头，光棒/光伏/半导体石英材料核心供应商" }
        ]
      },
      {
        name: "光纤辅材/缆料",
        companies: [
          { name: "万马股份", highlight: "高分子缆料/绝缘材料，光纤光缆护套与电力缆料配套" },
          { name: "金发科技", highlight: "改性塑料龙头，光缆护套/通信材料供应" },
          { name: "道恩股份", highlight: "热塑性弹性体与改性材料，光缆护套辅材" }
        ]
      }
    ],
    midstream: [
      {
        name: "光纤光缆制造",
        companies: [
          { name: "长飞光纤", highlight: "全球光纤光缆龙头，AI高端光纤占比提升，海外订单超40%" },
          { name: "亨通光电", highlight: "光纤+海缆双龙头，AI光纤出海与运营商集采核心" },
          { name: "中天科技", highlight: "光纤光缆+海缆+特种电缆，算力配套光缆高增" },
          { name: "烽火通信", highlight: "央企光通信全产业链，光纤制造+设备+光芯片" },
          { name: "通鼎互联", highlight: "光纤光缆+特种光缆，运营商集采中标份额领先" }
        ]
      },
      {
        name: "特种/算力光缆",
        companies: [
          { name: "永鼎股份", highlight: "特种光缆+光纤+光模块，算力光互联与海外供应链" },
          { name: "通光线缆", highlight: "电力特种光缆/OPGW龙头，算电协同与特高压配套" },
          { name: "特发信息", highlight: "东数西算/算力配套支线光缆，区域算力网络供应商" },
          { name: "汇源通信", highlight: "光缆制造+通信工程，光纤概念链工程配套" },
          { name: "华脉科技", highlight: "通信网络物理连接，光缆/配线/机柜算力机房配套" }
        ]
      }
    ],
    downstream: [
      {
        name: "运营商集采/海外出海",
        companies: [
          { name: "长飞光纤", highlight: "移动/电信/联通集采核心中标，海外国家级项目落地" },
          { name: "亨通光电", highlight: "海外算力网订单放量，AI光纤批量出口欧美/东南亚" },
          { name: "中天科技", highlight: "海外订单占比45%+，海缆+光缆出海双轮" },
          { name: "烽火通信", highlight: "运营商集采+东数西算传输设备，央企出海通道" }
        ]
      },
      {
        name: "海缆/算力场景落地",
        companies: [
          { name: "中天科技", highlight: "海洋系列在手订单约121亿元，海缆交付高峰2026" },
          { name: "亨通光电", highlight: "海底光缆+能源互联，海缆订单约75亿元量级" },
          { name: "永鼎股份", highlight: "算力光缆+1.6T光模块，数据中心互联落地" },
          { name: "特发信息", highlight: "智慧城市/算力网络工程，光缆项目落地能力突出" }
        ]
      }
    ]
  },

  // ========== 共封装光学（CPO / Co-Packaged Optics）==========
  "CPO": {
    name: "共封装光学",
    color: "#7c3aed",
    gradient: ["#8b5cf6", "#6d28d9"],
    description: "共封装光学（Co-Packaged Optics/CPO）将交换芯片与光引擎在基板级或封装级共集成，缩短电互连、降低功耗，是 AI 智算 1.6T/3.2T 时代的关键互连方案。产业链主线：硅光芯片与激光器 → FAU/MPO 无源器件 → CPO 先进封测 → CPO 光模块/光引擎 → 封装设备与基板 → 交换机/算力落地。口径：剔除科创板(688/689)；仅供产业链学习，不构成投资建议。",
    upstream: [
      {
        name: "硅光芯片/激光器源",
        companies: [
          { name: "光迅科技", highlight: "25G/100G DFB/EML 光芯片自研，硅光+CPO 全链条布局" },
          { name: "华工科技", highlight: "DFB 激光芯片+硅光垂直整合，CPO 光引擎核心能力" },
          { name: "三安光电", highlight: "III-V 化合物激光器外延，硅光/CPO 上游光源材料" },
          { name: "博创科技", highlight: "硅光分路器/AWG 与 CPO 无源集成器件，数据中心互连" }
        ]
      },
      {
        name: "光无源器件/FAU",
        companies: [
          { name: "天孚通信", highlight: "FAU/光引擎无源器件龙头，CPO 共封装核心供应商" },
          { name: "太辰光", highlight: "MPO 连接器与柔性光路，CPO 交换机高密度光互连" },
          { name: "博创科技", highlight: "PLC 分路器与硅光无源器件，CPO 光路集成配套" }
        ]
      }
    ],
    midstream: [
      {
        name: "CPO封装/先进封测",
        companies: [
          { name: "长电科技", highlight: "2.5D/Chiplet 先进封测龙头，CPO 共封装代工核心 OSAT" },
          { name: "通富微电", highlight: "AMD 等大客户封测伙伴，先进封装产能绑定 CPO 导入" },
          { name: "晶方科技", highlight: "WLP/TGV 玻璃基板封装，CPO 近芯片光学封装技术" },
          { name: "华天科技", highlight: "先进封测扩产，Chiplet/CPO 后道封测能力" }
        ]
      },
      {
        name: "CPO光模块/光引擎",
        companies: [
          { name: "中际旭创", highlight: "1.6T/CPO 全球龙头，共封装光学方案领先云厂商导入" },
          { name: "新易盛", highlight: "800G/1.6T 硅光模块，CPO 样品与北美大客户验证" },
          { name: "剑桥科技", highlight: "硅光 CPO 模块量产，800G/1.6T 产能满负荷" },
          { name: "光迅科技", highlight: "CPO 光模块批量交付能力，芯片到模块垂直整合" }
        ]
      }
    ],
    downstream: [
      {
        name: "封装设备/基板",
        companies: [
          { name: "罗博特科", highlight: "收购 ficonTEC，CPO 光纤耦合与自动化封装设备龙头" },
          { name: "深南电路", highlight: "封装基板/类载板，CPO 交换机与 ASIC 基板核心" },
          { name: "兴森科技", highlight: "IC 载板扩产，CPO 共封装基板与测试板配套" }
        ]
      },
      {
        name: "交换机/算力应用",
        companies: [
          { name: "中兴通讯", highlight: "智算中心交换机+CPO 组网方案，大集群光互连核心" },
          { name: "烽火通信", highlight: "光传输与交换设备，CPO 交换机系统级落地" },
          { name: "工业富联", highlight: "AI 服务器/交换机 ODM，CPO 整机代工间接受益" },
          { name: "浪潮信息", highlight: "AI 服务器出货龙头，高密度 GPU 集群 CPO 光互连需求" }
        ]
      }
    ]
  },

  // ========== 物理AI（具身智能 / Physical AI）==========
  "物理AI": {
    name: "物理AI",
    color: "#6366f1",
    gradient: ["#6366f1", "#4338ca"],
    description: "物理AI（Physical AI/具身智能）指在真实物理世界中感知、推理并执行动作的 AI 系统，架构为「具身大脑（多模态模型+仿真）— 具身小脑（运动控制）— 本体（传感+执行器）」。A股主线：力觉/视觉感知、数字孪生仿真、关节执行器、运动控制与机器人本体落地。",
    upstream: [
      {
        name: "力觉/触觉/多模态感知",
        companies: [
          { name: "柯力传感", highlight: "六维力/力矩传感器，人形机器人灵巧手与关节力控，Physical AI 闭环感知核心" },
          { name: "汉威科技", highlight: "柔性压力/触觉传感，具身机器人抓取与环境交互感知" },
          { name: "凌云光", highlight: "机器视觉+具身数据采集，物理AI训练与真机验证数据闭环" }
        ]
      },
      {
        name: "仿真/数字孪生/世界模型",
        companies: [
          { name: "能科科技", highlight: "工业数字孪生与仿真平台，具身策略训练与物理场景验证" },
          { name: "中科创达", highlight: "端侧AI OS与具身智能机器人软件栈，边缘部署多模态模型" },
          { name: "瑞芯微", highlight: "端侧AI芯片，机器人视觉与控制在设备侧低时延推理" }
        ]
      }
    ],
    midstream: [
      {
        name: "关节执行器（减速器/电机）",
        companies: [
          { name: "绿的谐波", highlight: "谐波减速器龙头，具身机器人旋转关节核心执行器" },
          { name: "双环传动", highlight: "精密减速器，人形机器人关节模组供应链" },
          { name: "鸣志电器", highlight: "空心杯电机+步进电机，灵巧手与关节驱动执行末端" },
          { name: "中大力德", highlight: "微型精密减速器，小型具身机器人关节模组" }
        ]
      },
      {
        name: "运动控制/具身小脑",
        companies: [
          { name: "汇川技术", highlight: "伺服驱动+运动控制，具身机器人实时力控与轨迹规划" },
          { name: "埃斯顿", highlight: "自主运动控制+机器人本体，具身小脑与执行一体化" },
          { name: "雷赛智能", highlight: "伺服/步进+运动控制卡，具身设备运动控制与驱动" }
        ]
      }
    ],
    downstream: [
      {
        name: "具身机器人本体/集成",
        companies: [
          { name: "机器人", highlight: "工业机器人+服务机器人本体，Physical AI 产线落地国家队" },
          { name: "拓斯达", highlight: "工业机器人系统集成，具身机器人产线物理自动化落地" },
          { name: "东方精工", highlight: "智能包装装备+机器人产线，乐聚人形机器人组装线合资落地" }
        ]
      },
      {
        name: "Physical AI 场景落地",
        companies: [
          { name: "三丰智能", highlight: "AGV/物流机器人，仓储与工厂物理世界智能搬运" },
          { name: "今天国际", highlight: "智慧物流+AMR/AGV，物理空间物料自动配送" },
          { name: "亿嘉和", highlight: "特种具身机器人，电力巡检与安防物理世界作业自动化" }
        ]
      }
    ]
  },

  // ========== 2022卡塔尔世界杯 ==========
  // 口径：2022年11-12月卡塔尔世界杯期间A股反复活跃的赞助、营销、啤酒、彩票、游戏版权等主题
  "2022世界杯": {
    name: "2022世界杯",
    color: "#16a34a",
    gradient: ["#16a34a", "#15803d"],
    description: "2022年卡塔尔世界杯是疫情后首届全球顶级足球赛事，A股主线集中在官方及中国品牌赞助、体育营销、啤酒消费、体彩销售与FIFA授权游戏等，赛事期间相关标的成交与主题热度显著抬升。",
    upstream: [
      {
        name: "赛事赞助/官方合作",
        companies: [
          { name: "海信视像", highlight: "FIFA世界杯全球官方赞助商，卡塔尔世界杯赛场广告与显示设备核心品牌" },
          { name: "伊利股份", highlight: "乳制品龙头，世界杯期间体育营销与品牌曝光密集投放" },
          { name: "中国平安", highlight: "中国足协合作伙伴，世界杯中国队相关保险与品牌联合营销" }
        ]
      },
      {
        name: "营销与传播服务",
        companies: [
          { name: "浙文互联", highlight: "数字营销龙头，世界杯期间品牌投放与体育内容营销订单集中" },
          { name: "蓝色光标", highlight: "整合营销龙头，啤酒/快消品牌世界杯campaign执行方" },
          { name: "电声股份", highlight: "体验营销与场景活动，世界杯线下观赛与品牌路演核心服务商" }
        ]
      }
    ],
    midstream: [
      {
        name: "转播与观赛渠道",
        companies: [
          { name: "芒果超媒", highlight: "新媒体平台，体育赛事内容运营与世界杯相关点播/综艺联动" },
          { name: "分众传媒", highlight: "电梯媒体龙头，世界杯期间啤酒/快消广告刊例价与上刊率提升" },
          { name: "顺网科技", highlight: "网吧与电竞场景平台，世界杯夜间观赛流量与增值服务受益" }
        ]
      },
      {
        name: "体育运营/彩票",
        companies: [
          { name: "中体产业", highlight: "体育彩票与赛事运营国家队，世界杯周期竞猜与销售热度驱动" },
          { name: "东港股份", highlight: "彩票印制与财税票据，世界杯周期体彩销量旺季配套" },
          { name: "星辉娱乐", highlight: "获FIFA授权足球手游，世界杯期间用户活跃与流水季节性高增" }
        ]
      }
    ],
    downstream: [
      {
        name: "啤酒消费",
        companies: [
          { name: "青岛啤酒", highlight: "啤酒龙头，世界杯+夏季消费旺季，餐饮与家庭场景销量弹性大" },
          { name: "燕京啤酒", highlight: "啤酒第二梯队龙头，华北渠道世界杯营销拉动明显" },
          { name: "重庆啤酒", highlight: "嘉士伯体系高端啤酒，现饮渠道世界杯夜间消费受益" }
        ]
      },
      {
        name: "休闲食品/餐饮",
        companies: [
          { name: "绝味食品", highlight: "卤味龙头，世界杯夜宵与聚会场景门店客流提升" },
          { name: "双汇发展", highlight: "肉制品龙头，家庭观赛零食与速食消费增加" },
          { name: "广州酒家", highlight: "餐饮+食品，华南地区观赛聚餐与预制菜礼盒需求" }
        ]
      }
    ]
  },

  // ========== 2026美加墨世界杯 ==========
  // 口径：精简实战版，按确定性从高到低分三档；不含利亚德等非官宣标的，伊利等非官方乳制品不纳入
  "2026世界杯": {
    name: "2026世界杯",
    color: "#2563eb",
    gradient: ["#2563eb", "#1e40af"],
    description: "2026年美加墨世界杯（48队、赛程拉长、北美主办）。A股主线按确定性分为三档：一档为FIFA/央视/官方IP实锤合作；二档为场馆LED已官宣供货；三档为体彩与啤酒等强场景受益（无官方赞助但业绩弹性明确）。",
    upstream: [
      {
        name: "一档·官方实锤（直接合作）",
        companies: [
          { name: "海信视像", highlight: "FIFA全球官方赞助商+世界杯VAR显示设备供应商，三届连续合作，赛事曝光与硬件订单兑现" },
          { name: "奥瑞金", highlight: "金属包装龙头，蒙牛（2026世界杯官方唯一乳制品伙伴）等乳饮罐体核心供应商，放量配套" },
          { name: "中视传媒", highlight: "央视嫡系，承接世界杯广告代理、赛事信号制作与衍生内容商业化，赛事期广告收入增厚确定性强" },
          { name: "元隆雅图", highlight: "手握2026世界杯官方IP特许授权，纪念品/文创/周边销售增量明确" }
        ]
      }
    ],
    midstream: [
      {
        name: "二档·场馆设备（官宣供货）",
        companies: [
          { name: "艾比森", highlight: "世界杯场馆LED大屏中标供货，历届世界杯老牌供应商，海外订单+品牌出海催化" },
          { name: "洲明科技", highlight: "部分主办城市场馆显示设备配套，有预期但兑现节奏通常慢于艾比森" }
        ]
      }
    ],
    downstream: [
      {
        name: "三档·强场景受益（逻辑硬核）",
        companies: [
          { name: "中体产业", highlight: "体育总局旗下唯一上市平台，体彩+赛事运营双主线，世界杯周期竞彩销量抬升历史规律强" },
          { name: "青岛啤酒", highlight: "已推世界杯限定款、渠道提前备货，观赛刚需+时差友好+赛程拉长，啤酒旺季加成" }
        ]
      }
    ]
  },

  // ========== 半导体12大稀缺材料 ==========
  // 口径：12类关键半导体材料节点；剔除688；原同花顺图错配已替换（见 verify-semiconductor-scarce-materials2026.js）
  "半导体稀缺材料": {
    name: "半导体稀缺材料",
    color: "#6366f1",
    gradient: ["#6366f1", "#4338ca"],
    description: "梳理光刻机产业链之外的12类高壁垒半导体关键材料：磷化铟、光刻胶、碳化硅、ABF载板、钽电容、高端PCB、电子级硫酸、MLCC、铜箔、电子布、钽靶材、高纯氦气。口径：主业或核心收入与对应材料强相关；剔除科创板(688/689)；涨价/缺口描述来自自媒体梳理，仅供产业链学习，不构成投资建议。",
    upstream: [
      {
        name: "磷化铟衬底",
        companies: [
          { name: "云南锗业", highlight: "锗/砷化镓/磷化铟衬底，光通信与毫米波雷达用InP外延片国产主力" },
          { name: "有研新材", highlight: "化合物半导体材料与靶材，磷化铟等高端衬底材料布局" },
          { name: "三安光电", highlight: "III-V族化合物外延，磷化铟相关光芯片材料能力" },
          { name: "海特高新", highlight: "化合物半导体产线，磷化铟外延片小批量供货（航空+半导体双主业）" },
          { name: "株冶集团", highlight: "锌冶炼副产精铟，为InP产业链提供铟原料（替换原图锡业股份）" }
        ]
      },
      {
        name: "光刻胶",
        companies: [
          { name: "南大光电", highlight: "ArF/KrF光刻胶国产突破，晶圆厂验证与导入加速" },
          { name: "彤程新材", highlight: "参股北京科华，G线/I线及KrF光刻胶树脂与成品布局" },
          { name: "上海新阳", highlight: "KrF/ArF光刻胶与电镀液，晶圆制造材料平台型公司" },
          { name: "晶瑞电材", highlight: "i线光刻胶+湿电子化学品，半导体材料双轮（300655）" },
          { name: "鼎龙股份", highlight: "CMP垫+光刻胶树脂/PI浆料，半导体材料国产替代" }
        ]
      },
      {
        name: "碳化硅",
        companies: [
          { name: "三安光电", highlight: "6英寸SiC衬底+外延+器件IDM，800V快充与电驱核心材料" },
          { name: "晶盛机电", highlight: "SiC长晶炉与衬底设备，碳化硅扩产直接受益" },
          { name: "斯达半导", highlight: "SiC功率模块龙头，衬底紧缺下模块环节高景气" },
          { name: "东尼电子", highlight: "SiC切割线/耗材与器件配套（替换原图天岳先进688）" },
          { name: "露笑科技", highlight: "SiC衬底产线建设，弹性标的但量产兑现需跟踪" }
        ]
      },
      {
        name: "ABF载板/上游",
        companies: [
          { name: "深南电路", highlight: "ABF载板国内龙头，CPU/GPU封装基板核心供应商" },
          { name: "兴森科技", highlight: "IC载板+ABF布局，AI算力封装基板扩产" },
          { name: "鹏鼎控股", highlight: "全球PCB龙头，高端HDI/类载板能力向ABF延伸" },
          { name: "生益科技", highlight: "覆铜板/CCL龙头，ABF载板上游关键基材（替换崇达技术）" },
          { name: "东材科技", highlight: "高速树脂与膜材料，ABF上游国产替代（替换东山精密）" }
        ]
      }
    ],
    midstream: [
      {
        name: "钽电容",
        companies: [
          { name: "宏达电子", highlight: "钽电容军工+民用龙头，AI服务器高可靠电容供应商" },
          { name: "振华科技", highlight: "钽电容与混合集成电路，特种被动元件核心央企平台" },
          { name: "东方钽业", highlight: "钽粉-钽丝-钽电容产业链一体化，上游资源可控" },
          { name: "火炬电子", highlight: "钽电容+陶瓷电容，特种被动元件双主线" },
          { name: "鸿远电子", highlight: "高可靠瓷介/钽相关特种电容（替换原图风华高科）" }
        ]
      },
      {
        name: "高端PCB载板",
        companies: [
          { name: "沪电股份", highlight: "AI服务器/交换机高端PCB龙头，算力硬件核心供应商" },
          { name: "胜宏科技", highlight: "GPU/AI服务器PCB，高层数HDI与高速板放量" },
          { name: "深南电路", highlight: "高端PCB+IC载板双龙头，算力与通信双线" },
          { name: "景旺电子", highlight: "汽车+服务器PCB，高端多层板国产替代" },
          { name: "广合科技", highlight: "AI服务器PCB新锐，算力板订单放量（替换生益科技/生益电子688）" }
        ]
      },
      {
        name: "电子级硫酸",
        companies: [
          { name: "晶瑞电材", highlight: "电子级硫酸/双氧水等湿法清洗液，晶圆厂认证供应商" },
          { name: "江化微", highlight: "湿电子化学品，蚀刻/清洗用电子级酸液" },
          { name: "格林达", highlight: "TMAH显影液等湿电子化学品（替换原图兴福电子未上市）" },
          { name: "巨化股份", highlight: "电子级氢氟酸/氟化工（替换原图中巨芯688）" },
          { name: "多氟多", highlight: "电子级氢氟酸与氟化盐，半导体湿法清洗材料配套" }
        ]
      },
      {
        name: "MLCC电容",
        companies: [
          { name: "风华高科", highlight: "国内MLCC出货龙头，AI/车规高容MLCC紧缺受益" },
          { name: "三环集团", highlight: "MLCC+粉体垂直一体化，高端被动元件国产替代" },
          { name: "火炬电子", highlight: "特种MLCC+瓷介电容，高可靠场景份额高" },
          { name: "鸿远电子", highlight: "军用高可靠MLCC，宇航级瓷介电容龙头" },
          { name: "国瓷材料", highlight: "MLCC介质陶瓷粉龙头，粉体涨价周期核心受益" }
        ]
      }
    ],
    downstream: [
      {
        name: "铜箔",
        companies: [
          { name: "铜冠铜箔", highlight: "锂电铜箔+电子电路铜箔，AI服务器PCB与电池双需求" },
          { name: "逸豪新材", highlight: "电子电路/锂电铜箔（替换原图嘉元科技688）" },
          { name: "德福科技", highlight: "锂电铜箔快速扩产，电子电路铜箔第二曲线" },
          { name: "诺德股份", highlight: "铜箔老牌企业，锂电+电子铜箔双线" },
          { name: "中一科技", highlight: "铜箔新贵，高端锂电与标准铜箔同步扩产" }
        ]
      },
      {
        name: "电子布",
        companies: [
          { name: "中国巨石", highlight: "电子纱/电子布龙头，高端Low-DK电子布供给紧张" },
          { name: "宏和科技", highlight: "超薄电子布与特种玻璃纤维布，高端CCL reinforcing材料" },
          { name: "中材科技", highlight: "玻纤+隔膜双主业，电子布/特种纤维材料" },
          { name: "长海股份", highlight: "玻纤制品，电子布与复合材料配套" },
          { name: "山东玻纤", highlight: "玻纤纱线，电子布上游原纱弹性标的" }
        ]
      },
      {
        name: "半导体钽靶材",
        companies: [
          { name: "江丰电子", highlight: "高纯溅射靶材龙头，钽/钛/铝靶核心供应商（替换金钼股份）" },
          { name: "阿石创", highlight: "PVD靶材，钽/铝/铜等薄膜沉积材料（替换洛阳钼业）" },
          { name: "有研新材", highlight: "稀有金属靶材与半导体材料，钽靶布局" },
          { name: "隆华科技", highlight: "钼/钨/钽等难熔金属靶材与材料" },
          { name: "东方钽业", highlight: "钽粉到靶材一体化，钽靶上游资源+材料" }
        ]
      },
      {
        name: "高纯氦气",
        companies: [
          { name: "凯美特气", highlight: "工业气体+稀有气体，半导体刻蚀/清洗用氦气布局" },
          { name: "杭氧股份", highlight: "空分与特种气体龙头，高纯气体供应能力" },
          { name: "和远气体", highlight: "华中气体供应商，电子特气与氦气储运" },
          { name: "雅克科技", highlight: "LNG/湿法特气与半导体材料（替换华特气体/金宏气体688）" },
          { name: "侨源股份", highlight: "高纯工业气体，半导体厂务气体配套（替换正帆科技688）" }
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
  "无源元件": "元件",
  "有源元件": "元件",
  "被动元件": "元件",
  "主动元件": "元件",
  "电阻": "元件",
  "电位器": "元件",
  "电感": "元件",
  "变压器": "元件",
  "晶振": "元件",
  "谐振器": "元件",
  "保险丝": "元件",
  "熔断器": "元件",
  "二极管": "元件",
  "三极管": "元件",
  "MOS管": "元件",
  "MOS": "元件",
  "晶闸管": "元件",
  "可控硅": "元件",
  "模拟IC": "元件",
  "数字IC": "元件",
  "MCU": "元件",
  "传感器": "元件",
  "光耦": "元件",
  "线束": "元件",
  "MLCC": "MLCC",
  "mlcc": "MLCC",
  "片式电容": "MLCC",
  "陶瓷电容": "MLCC",
  "半导体稀缺材料": "半导体稀缺材料",
  "半导体12大稀缺材料": "半导体稀缺材料",
  "稀缺材料": "半导体稀缺材料",
  "磷化铟": "半导体稀缺材料",
  "光刻胶": "半导体稀缺材料",
  "碳化硅": "半导体稀缺材料",
  "ABF载板": "半导体稀缺材料",
  "ABF": "半导体稀缺材料",
  "钽电容": "半导体稀缺材料",
  "电子级硫酸": "半导体稀缺材料",
  "湿电子化学品": "半导体稀缺材料",
  "铜箔": "半导体稀缺材料",
  "电子布": "半导体稀缺材料",
  "钽靶材": "半导体稀缺材料",
  "高纯氦气": "半导体稀缺材料",
  "电子特气": "半导体稀缺材料",
  "瓷介电容": "MLCC",
  "多层陶瓷电容": "MLCC",
  // ---- 多氟多 ----
  "多氟多": "多氟多",
  "六氟磷酸锂": "多氟多",
  "6F": "多氟多",
  "LiPF6": "多氟多",
  "LiFSI": "多氟多",
  "氟化工锂盐": "多氟多",
  "电容": "元件",
  "连接器": "元件",
  "PCB": "PCB",
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
  // ---- 预制算力中心底座（关键词勿含「算力中心」子串，避免覆盖 AIDC 映射）----
  "预制化算力": "预制算力中心底座",
  "预制智算底座": "预制算力中心底座",
  "模块化智算机房": "预制算力中心底座",
  "集装箱智算中心": "预制算力中心底座",
  "预制模块化数据中心": "预制算力中心底座",
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
   // ---- 电力 ----
   "电力": "电力",
   "电网": "电力",
   "发电": "电力",
   "火电": "电力",
   "水电": "电力",
   "核电": "电力",
   "特高压": "电力",
   "输变电": "电力",
   "智能电网": "电力",
   "电力设备": "电力",
   "配售电": "电力",
   "绿电": "电力",
   "电力改革": "电力",
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
   "mBridge": "数字货币",
   // ---- 无人驾驶 ----
   "无人驾驶": "无人驾驶",
   "自动驾驶": "无人驾驶",
   "智驾": "无人驾驶",
   "高阶智驾": "无人驾驶",
   "车路协同": "无人驾驶",
   "V2X": "无人驾驶",
   "激光雷达": "无人驾驶",
   "高精地图": "无人驾驶",
   "域控制器": "无人驾驶",
   "NOA": "无人驾驶",
   "Robotaxi": "无人驾驶",
   "无人巴士": "无人驾驶",
   // ---- 先进封装 ----
   "先进封装": "先进封装",
   "先进封测": "先进封装",
   "Chiplet": "先进封装",
   "chiplet": "先进封装",
   "2.5D": "先进封装",
   "3D封装": "先进封装",
   "Fan-out": "先进封装",
   "晶圆级封装": "先进封装",
   "WLP": "先进封装",
   "WLCSP": "先进封装",
   "封装基板": "先进封装",
   "OSAT": "先进封装",
   "凸块": "先进封装",
   "XDFOI": "先进封装",

   // ---- 光互联 ----
   "光互联": "光互联",
   "光学链接": "光互联",
   "光链接": "光互联",
   "800G": "光互联",
   "1.6T": "光互联",
   "硅光": "光互联",

   // ---- 光纤概念 ----
   "光纤概念": "光纤概念",
   "光线概念": "光纤概念",
   "光纤": "光纤概念",
   "光纤光缆": "光纤概念",
   "光缆": "光纤概念",
   "空芯光纤": "光纤概念",
   "AI光纤": "光纤概念",

   // ---- 共封装光学（CPO）----
   "CPO": "CPO",
   "cpo": "CPO",
   "共封装光学": "CPO",
   "共封装": "CPO",
   "公共光学封装": "CPO",
   "Co-Packaged Optics": "CPO",
   "co-packaged optics": "CPO",

   // ---- 物理AI ----
   "物理AI": "物理AI",
   "Physical AI": "物理AI",
   "physical ai": "物理AI",
   "PhysicalAI": "物理AI",
   "具身智能": "物理AI",
   "具身": "物理AI",
   "embodied": "物理AI",
   "Embodied AI": "物理AI",
   "世界模型": "物理AI",
   "具身大脑": "物理AI",
   "具身小脑": "物理AI",

   // ---- 特斯拉FSD入华 ----
   "特斯拉FSD入华": "特斯拉FSD入华",
   "特斯拉FSD": "特斯拉FSD入华",
   "FSD入华": "特斯拉FSD入华",
   "Tesla FSD": "特斯拉FSD入华",
   "FSD": "特斯拉FSD入华",
   "特斯拉智驾": "特斯拉FSD入华",
   "完全自动驾驶": "特斯拉FSD入华",
   // ---- 长鑫存储 ----
   "长鑫存储": "长鑫存储",
   "长鑫": "长鑫存储",
   "长鑫科技": "长鑫存储",
   "CXMT": "长鑫存储",
   "国产DRAM": "长鑫存储",
   "DRAM": "长鑫存储",
   "存储器": "长鑫存储",
   "LPDDR5": "长鑫存储",
   "DDR5": "长鑫存储",
   "HBM": "长鑫存储",
   // ---- 世界杯 ----
   "世界杯": "2026世界杯",
   "2026世界杯": "2026世界杯",
   "2026": "2026世界杯",
   "美加墨世界杯": "2026世界杯",
   "卡塔尔世界杯": "2022世界杯",
   "2022世界杯": "2022世界杯",
   "2022": "2022世界杯",
   "足球": "2026世界杯",
   "体彩": "2022世界杯",
   "竞彩": "2022世界杯"
  };

// 搜索行业数据
function searchIndustry(query) {
  const trimmed = query.trim();
  // 精确匹配
  if (INDUSTRY_DATA[trimmed]) return INDUSTRY_DATA[trimmed];
  if (KEYWORD_MAP[trimmed]) return INDUSTRY_DATA[KEYWORD_MAP[trimmed]];
  // 关键词映射（最长关键词优先，避免「Physical AI」被「AI」截胡）
  const entries = Object.entries(KEYWORD_MAP).sort((a, b) => b[0].length - a[0].length);
  for (const [keyword, industryKey] of entries) {
    if (trimmed.includes(keyword) || keyword.includes(trimmed)) {
      return INDUSTRY_DATA[industryKey];
    }
  }
  return null;
}