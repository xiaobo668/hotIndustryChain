/**
 * 产业知识付费 · 2026 课程库
 * 面向经销/贸易从业者的系统培训 PPT 大纲与逐页内容
 */
var KNOWLEDGE_PAY2026 = {
  version: '2026-06',
  categoryTitle: '产业知识付费',
  categoryDesc:
    '面向产业经销、贸易、渠道从业者的系统培训资料，按 PPT 章节组织，可在线查阅大纲、复制逐页内容，导入 PowerPoint / Keynote 制作课件。',
  disclaimer:
    '本课程仅作半导体材料产业知识培训，帮助经销人员理解产品分类、工艺用途与客户沟通要点，不构成任何证券投资建议，不涉及具体企业买卖推荐。',
  pptGuide: {
    format: '16:9 知识型 PPT；基础页 3～5 条要点；【零基础】页含「通俗说」框 + 案例话术，建议用浅蓝底色区分',
    fonts: '标题：微软雅黑 Bold 28pt；正文：微软雅黑 18pt；备注：14pt 灰色',
    colors: '主色 #1e3a5f（深蓝）+ 辅色 #0891b2（青）+ 强调 #f59e0b（橙，用于「经销要点」标签）',
    exportSteps: [
      '打开 knowledge-pay.html?course=semi-materials-dealer',
      '点击「📊 下载 PPTX」直接获得可编辑 PowerPoint（122 页）',
      '或点击「🖼️ 下载 PNG 图包」获得 ZIP 压缩包，内含全部幻灯片图片',
      '亦可用「⬇️ 下载 txt 大纲」导入 PowerPoint 从大纲新建',
    ],
  },
  courses: [
    {
      id: 'semi-materials-dealer',
      icon: '🧪',
      title: '半导体材料经销入门系统课',
      subtitle: '湿化学品 · 光刻胶 · 晶圆 · 特气 · 靶材 · CMP 全品类梳理',
      price: '¥39.9',
      priceTag: '首发课',
      audience: '零基础友好：刚转入半导体材料经销/贸易、代理、渠道销售，无需微电子背景，含通俗解释、案例话术与实务清单',
      duration: '建议 8～10 小时自学 + 2 小时内训分享',
      slideCount: 80,
      beginnerNote: '每章末尾含【零基础】加餐页：通俗说、对照表、客户话术、新人踩坑；带浅蓝标记便于 PPT 分节',
      learningGoals: [
        '看懂芯片制造前道/后道流程，知道每种材料用在哪道工序',
        '掌握硅片、光刻胶、湿化学品、电子特气、靶材、CMP 六大品类的分类与关键规格参数',
        '理解 FAB、OSAT、设备厂、研究院四类客户的采购逻辑与询价习惯',
        '能读懂 COA/MSDS，知道纯度等级、包装、储运、保质期等经销实务',
        '建立国产/进口品牌认知框架，避免把「概念材料」当「可售 SKU」',
        '能使用本课【案例】话术完成首次客户询价，知道新人第一周该做什么',
      ],
      chapters: [
        {
          id: 'ch01',
          title: '第一章  课程导论与经销商角色',
          slides: [
            {
              title: '封面',
              bullets: [
                '半导体材料经销入门系统课',
                '湿化学品 · 光刻胶 · 晶圆 · 特气 · 靶材 · CMP',
                '面向经销/贸易/渠道从业者 · 2026 版',
              ],
              dealerTip: '内训时可替换为公司名称 + 联系人',
            },
            {
              title: '本课解决什么问题',
              bullets: [
                '客户问「你们有 ArF 胶吗？」——你能立刻对应到制程节点与应用',
                '客户问「UPSS 和 UPW 差在哪？」——你能讲清等级而不是背型号',
                '客户问「8 寸和 12 寸硅片能互换吗？」——你知道不能乱报',
                '客户问「为什么同型号特气价格差很多？」——你理解纯度/包装/认证差异',
              ],
              dealerTip: '开场用 4 个真实询价场景引发共鸣',
            },
            {
              title: '【答案】上面 4 个问题的标准答法（新人必背）',
              plainExplain:
                'P1.2 提出的是「学完要能答」的目标；本页给出可直接对客户说的标准答案，建议内训时逐条过关。',
              bullets: [
                '① 有 ArF 胶吗？→ ArF = 193nm 光刻胶，用于 28nm 及以下逻辑/DDR，分干式/浸没式；先追问：浸没还是干式？膜厚？哪条工艺层？是否需配套 BARC/Topcoat？',
                '② UPSS 和 UPW 差在哪？→ 完全不同品类：UPSS = 湿电子化学品等级（SEMI Grade 1，金属离子 ppb 级，用于 HF/IPA 等试剂）；UPW = 超纯水（清洗、稀释用，看电阻率 18.2 MΩ·cm 等）。若客户口误说成 UPW，先确认是指「试剂等级」还是「超纯水」',
                '③ 8 寸和 12 寸硅片能互换吗？→ 不能。直径不同 → 机台/FOUP/工艺平台不兼容；8 寸（200mm）多用于功率/MCU/模拟，12 寸（300mm）用于先进逻辑/存储；报错尺寸会导致客户无法上机',
                '④ 同型号特气为何价差大？→ ①纯度：5N/6N/7N 每多一个 9 成本跳升 ②杂质谱：同纯度 O2/H2O 限值不同 ③包装：小钢瓶 vs T-bundle vs Bulk ④认证：是否通过该 Fab Qual、阀件型号、充装厂资质',
              ],
              dealerTip: '建议把本页做成「口袋卡片」，新人第一周每天默写一遍',
            },
            {
              title: '目标学员与前置知识',
              bullets: [
                '适合：化工/电子材料贸易转半导体、FAB 耗材销售转经销、创业做材料渠道',
                '不需要：微电子学历、看得懂版图、会操作光刻机',
                '需要：愿意记规格参数、愿意跑客户产线、愿意看 MSDS/COA',
              ],
            },
            {
              title: '半导体材料经销商在产业链中的位置',
              bullets: [
                '上游：材料原厂（信越、SUMCO、JSR、TOK、林德等）',
                '中游（你）：经销/代理/贸易——做 SKU 组合、库存、物流、本地服务',
                '下游：晶圆厂 FAB、封测 OSAT、设备厂备件、研究院中试线',
                '价值：缩短交期、小批量试样、本地仓储、资质代办、技术对接',
              ],
              dealerTip: '强调经销商不是「倒货」，是「供应链服务」',
            },
            {
              title: '经销商日常五大工作模块',
              bullets: [
                '① 产品谱系：知道卖什么、不能卖什么（危化品许可）',
                '② 规格翻译：把原厂 Part No. 翻译成客户能懂的工艺语言',
                '③ 报价与交期：MOQ、Lead Time、关税、冷链/危化运输',
                '④ 资质与合规：MSDS、COA、危化品经营许可证、易制毒/易制爆',
                '⑤ 售后与客诉：颗粒度、金属离子超标、效期、包装破损',
              ],
            },
            {
              title: '本课章节路线图',
              bullets: [
                'Ch2 制造全景 → Ch3 硅片 → Ch4 光刻胶 → Ch5 湿化学品',
                'Ch6 电子特气 → Ch7 靶材/CMP/其他 → Ch8 规格储运质保',
                'Ch9 客户沟通 → Ch10 国产替代 → 附录术语 FAQ',
              ],
            },
          ],
        },
        {
          id: 'ch02',
          title: '第二章  半导体制造全景：材料用在哪',
          slides: [
            {
              title: '从沙子到芯片：一句话总览',
              bullets: [
                '高纯多晶硅 → 拉晶/切磨抛 → 硅晶圆',
                '晶圆厂 FAB：光刻→刻蚀→薄膜→离子注入→CMP→…（重复数百层）',
                '封测 OSAT：划片→贴片→键合→塑封→测试',
                '材料贯穿全程：每道工艺都消耗化学品、气体、靶材或辅材',
              ],
              dealerTip: '用「印刷厂」类比：硅片=纸，光刻胶=油墨，刻蚀液=修版液',
            },
            {
              title: '前道 FAB 核心工艺循环',
              bullets: [
                '① 清洗（湿法）→ ② 成膜/生长 → ③ 涂胶 → ④ 曝光 → ⑤ 显影',
                '→ ⑥ 刻蚀 → ⑦ 去胶 → ⑧ CMP 平坦化 → ⑨ 检测 → 循环',
                '光刻胶：③④⑤⑦ ；湿化学品：①⑥⑦ ；特气：②⑥ ；CMP：⑧',
              ],
            },
            {
              title: '制程节点与材料升级关系',
              bullets: [
                '90nm 以上：i-line / KrF 光刻胶、普通湿法化学品',
                '28～7nm：ArF 浸没式、Low-k 介质、铜互连、先进 CMP',
                '7nm 以下 / 3D NAND 层数↑：EUV 胶、更严金属离子控制、更多 CMP 步骤',
                '经销启示：问清客户「多少 nm / 什么工艺平台」再推型号',
              ],
            },
            {
              title: '8 寸 vs 12 寸 vs 6 寸：尺寸生态',
              bullets: [
                '12 寸（300mm）：先进逻辑、DRAM、3D NAND 主流，单盒 25 片',
                '8 寸（200mm）：功率、MCU、模拟、MEMS、部分 CIS',
                '6 寸及以下：化合物、LED、学术中试（材料 SKU 不同）',
                '硅片、光刻胶、清洗液均有「线宽/尺寸」适配，不可混报',
              ],
            },
            {
              title: '后道封测 OSAT 常用材料',
              bullets: [
                '封装基板（ABF/BT）、封装胶、底填胶 Underfill、锡球/焊料',
                '划片液、切割刀、金线/铜线、塑封料 EMC',
                '经销商常交叉销售：湿化学品（清洗）、特气（少量）、粘片材料',
              ],
            },
            {
              title: '四类下游客户采购特征',
              bullets: [
                'FAB 晶圆厂：认证周期长、批量大、规格严、指定原厂',
                'OSAT 封测：品类杂、交期敏感、价格敏感、试样频繁',
                '设备厂：备件与工艺验证材料，量小但规格明确',
                '研究院/中试：小批量、多 SKU、重 COA 与 MSDS',
              ],
              dealerTip: '先判断客户类型，再决定推「认证牌号」还是「性价比牌号」',
            },
            {
              title: '材料消耗与 FAB 稼动率',
              bullets: [
                'FAB 满产 → 湿化学品、特气、CMP、光刻胶消耗线性上升',
                '扩产 → 新产线认证材料（长周期机会）',
                '去库存 → 耗材采购推迟，经销商库存周转变慢',
                '关注客户「产能利用率」比关注股价更适合经销业务',
              ],
            },
            {
              title: '本章小结：经销必记工艺-材料映射表',
              bullets: [
                '清洗/刻蚀/去胶 → 湿化学品',
                '光刻/显影 → 光刻胶 + 配套试剂',
                'CVD/ALD/刻蚀 → 电子特气',
                'PVD/CVD 金属 → 溅射靶材',
                '平坦化 → CMP 抛光液/垫',
                '载体 → 硅晶圆',
              ],
            },
          ],
        },
        {
          id: 'ch03',
          title: '第三章  硅晶圆：产品体系与经销要点',
          slides: [
            {
              title: '硅片在产业链中的角色',
              bullets: [
                '所有硅基芯片的物理载体，占 FAB 材料成本约 5～8%',
                '质量指标：直径、厚度、电阻率、氧/碳含量、平坦度、缺陷密度',
                '行业高度集中：信越、SUMCO、环球晶圆、SK Siltron 等',
              ],
            },
            {
              title: '硅片产品分类树',
              bullets: [
                '按直径：300mm / 200mm / 150mm / 125mm / 100mm',
                '按类型：抛光片 Polished / SOI / 外延片 Epitaxial / 退火片',
                '按掺杂：P 型（硼）/ N 型（磷、砷、锑）',
                '按电阻率：低阻～高阻多档位，与芯片类型匹配',
              ],
            },
            {
              title: '关键规格参数解读',
              bullets: [
                'TTV（总厚度变化）、Warp/Bow（翘曲）、LTV',
                'Particle（颗粒数）、LPD（局部光散射缺陷）',
                '电阻率 Ω·cm：逻辑常用 1～10Ω·cm；功率器件可更低',
                '晶向：〈100〉〈111〉等，与客户 CMOS/BCD 工艺相关',
              ],
              dealerTip: '客户给电阻率 + 直径 + P/N 型，基本可初步报价',
            },
            {
              title: 'SOI 与外延片：高附加值品类',
              bullets: [
                'SOI：绝缘体上硅，RF、低功耗、部分模拟',
                '外延片：在衬底上生长单晶层，用于功率、CIS、部分逻辑',
                '经销注意：SKU 远多于普通抛光片，交期更长',
              ],
            },
            {
              title: '晶圆盒与包装',
              bullets: [
                'FOUP / FOSB / 单片盒，Cleanroom 等级要求',
                '运输：防震、温湿度、洁净、不可侧放',
                '拆包后有效期与二次包装要求（客户 Fab 规范不同）',
              ],
            },
            {
              title: '国产硅片进展（经销认知）',
              bullets: [
                '大陆厂商：沪硅产业、中环、立昂微等，8 寸成熟、12 寸爬坡',
                '经销机会：中试线、特色工艺、国产化验证批次',
                '注意：12 寸先进节点仍以进口为主，勿过度承诺节点',
              ],
            },
            {
              title: '硅片客户常问 FAQ',
              bullets: [
                'Q：8 寸和 12 寸能否互相替代？A：不能，设备与工艺不同',
                'Q：能否提供「测试级」硅片？A：有 Monitor/Dummy 片，规格需确认',
                'Q：电阻率偏差多少可接受？A：看客户工艺窗口，通常 ±10%',
              ],
            },
            {
              title: '本章经销 checklist',
              bullets: [
                '□ 确认直径、厚度、掺杂、电阻率、晶向',
                '□ 确认抛光片 / SOI / 外延',
                '□ 确认片数/盒、FOUP 要求、交期',
                '□ 是否需原厂 COA、是否指定产地',
              ],
            },
          ],
        },
        {
          id: 'ch04',
          title: '第四章  光刻胶：分类、规格与客户选型',
          slides: [
            {
              title: '光刻胶是做什么的',
              bullets: [
                '感光材料：曝光后溶解性改变，把掩模版图形「转印」到晶圆',
                '配合：涂胶机、曝光机、显影液、去胶液、抗反射涂层 BARC',
                '光刻胶是 FAB 耗材中技术门槛最高的品类之一',
              ],
            },
            {
              title: '按光源/波长分类（必背）',
              bullets: [
                'g-line（436nm）：成熟、功率、部分 MEMS',
                'i-line（365nm）：8 寸主流、模拟、部分 CIS',
                'KrF（248nm）：0.25～0.13μm 节点',
                'ArF（193nm）：28～7nm 逻辑/DDR 主力',
                'EUV（13.5nm）：7nm 以下先进逻辑、部分 DRAM',
              ],
              dealerTip: '客户说「193 胶」= ArF；「248 胶」= KrF',
            },
            {
              title: '正胶 vs 负胶',
              bullets: [
                '正胶：曝光区可溶（主流）',
                '负胶：曝光区不可溶（部分 MEMS、PCB 交叉）',
                '半导体 FAB 以正胶为主，问清「Positive / Negative」',
              ],
            },
            {
              title: '关键性能参数',
              bullets: [
                '分辨率 Resolution、景深 DOF、敏感度 Sensitivity',
                '线边缘粗糙度 LER/LWR（先进节点极关键）',
                '金属离子 Na/K/Li、颗粒、涂布均匀性',
                '粘度、固含量、适用膜厚 nm',
              ],
            },
            {
              title: '配套材料 SKU',
              bullets: [
                '显影液 Developer、去胶液 Remover、稀释液 Thinner',
                'BARC 底部抗反射涂层、Topcoat（浸没式）',
                '经销时可做「胶 + 配套试剂」组合包，提高客单价',
              ],
            },
            {
              title: 'ArF 浸没式 vs 干式',
              bullets: [
                '浸没式：镜头与晶圆间用水，NA 更高，28nm 以下主流',
                '需 Topcoat 等额外材料，SKU 与干式不同',
                '问客户：Exposure tool 是否 Immersion',
              ],
            },
            {
              title: 'EUV 光刻胶（了解即可）',
              bullets: [
                '化学放大胶为主，金属含量控制极严',
                '供应高度集中，经销多以原厂授权为主',
                '国内布局中，经销慎接「非认证」货源',
              ],
            },
            {
              title: '存储与效期',
              bullets: [
                '冷藏 2～8℃ 常见，部分 -20℃；避光、密封',
                '保质期通常 6～12 个月，临期产品需折扣或报废',
                '到货需核对 Batch、效期、冷链记录',
              ],
            },
            {
              title: '主要品牌格局（认知框架）',
              bullets: [
                '日系：JSR、TOK、信越化学、富士胶片等',
                '韩系：东进世美肯等',
                '国产：南大光电、晶瑞电材、北京科华等（KrF/ArF 验证中）',
                '经销：先进节点以原厂渠道为主，成熟节点国产替代机会多',
              ],
            },
            {
              title: '光刻胶 FAQ 与报价要素',
              bullets: [
                '报价必问：波长/节点、膜厚、曝光机型号、是否浸没',
                'MOQ：often 1～4L 试样，量产按 FAB 年耗量议价',
                '认证状态：Qualified / In evaluation / Not qualified',
              ],
            },
          ],
        },
        {
          id: 'ch05',
          title: '第五章  湿电子化学品：品类矩阵与等级标准',
          slides: [
            {
              title: '湿电子化学品定义与范围',
              bullets: [
                '超净高纯试剂，用于清洗、刻蚀、显影、剥离、电镀等湿法工艺',
                '包括：酸碱、溶剂、蚀刻液、双氧水体系、缓冲氧化物蚀刻 BOE 等',
                '与通用化工试剂区别：金属离子 ppb 级、颗粒控制、全程洁净包装',
              ],
            },
            {
              title: '国际等级标准（必背）',
              bullets: [
                'SEMI 标准：Grade 1 (UPSS) 最严 → Grade 2 (UPS) → Grade 3 (UP) → Grade 4',
                'UPSS：先进逻辑 28nm 以下、精细刻蚀',
                'UPS：主流 FAB 8/12 寸',
                'UP：一般半导体、部分封测',
                'G1～G4：国内常用说法，对应 SEMI 等级',
              ],
              dealerTip: '客户说「G3」≈ UP；「G4/G5」需确认是国标还是厂标',
            },
            {
              title: '高频 SKU 清单（按用途）',
              bullets: [
                '清洗：SC-1 (NH4OH/H2O2/H2O)、SC-2 (HCl/H2O2/H2O)、稀释 HF',
                '刻蚀：BOE、磷酸、醋酸、硝酸、金属蚀刻液',
                '剥离：光刻胶 Remover、有机溶剂 NMP/DMSO 等',
                'CMP 后清洗：稀 HF、柠檬酸等',
                '电镀：硫酸、双氧水、添加剂（另列）',
              ],
            },
            {
              title: '氢氟酸 HF：最敏感 SKU 之一',
              bullets: [
                '用途：oxide 刻蚀、清洗，Fab 消耗量大',
                '危化品：强腐蚀，需危化品经营许可、专用运输',
                '规格：49% 工业级 vs 半导体级，金属离子差 orders of magnitude',
              ],
            },
            {
              title: '过氧化氢 H₂O₂（双氧水）',
              bullets: [
                'SC-1/SC-2 配方核心组分',
                '半导体级要求稳定剂、金属离子极低',
                '易分解，效期与冷链敏感',
              ],
            },
            {
              title: '异丙醇 IPA',
              bullets: [
                '干燥、清洗、擦片，封测也大量使用',
                '半导体级 vs 电子级 vs 工业级价格差大',
                '进口与国产产能均大，经销竞争激烈',
              ],
            },
            {
              title: '硫酸、磷酸、硝酸、盐酸',
              bullets: [
                '各 Fab 配方不同，常有「原厂指定配方」',
                '金属离子、颗粒、Fe/Cl 残留是核心指标',
                '大包装（槽车/吨桶）vs 小包装（瓶装）物流差异大',
              ],
            },
            {
              title: '包装与输送',
              bullets: [
                'HDPE / PTFE 内衬桶、玻璃瓶、IBC、槽车',
                '洁净灌装、充氮、内袋双层',
                'Fab 常要求 Part No. + Batch + COA 三单一致',
              ],
            },
            {
              title: '国产湿化学品机会',
              bullets: [
                '江化微、晶瑞电材、格林达、新宙邦、中巨芯等',
                '成熟品类（IPA、部分酸碱）国产化率高',
                '先进节点 UPSS 仍多依赖进口，经销需分节点推品',
              ],
            },
            {
              title: '湿化学品经销合规清单',
              bullets: [
                '□ 危化品经营许可证 □ 易制毒/易制爆（如适用）',
                '□ 运输资质 □ 仓储消防与防泄漏设施',
                '□ MSDS 中文版 □ 客户 Fab 准入审查',
              ],
            },
          ],
        },
        {
          id: 'ch06',
          title: '第六章  电子特气：工艺用途与安全配送',
          slides: [
            {
              title: '电子特气是什么',
              bullets: [
                '高纯气体，用于 CVD、ALD、刻蚀、离子注入、掺杂、清洗',
                '纯度 5N～7N 甚至更高，杂质 ppm～ppb 级',
                '钢瓶气、Bulk 大宗气、On-site 制气（Fab 侧）',
              ],
            },
            {
              title: '按工艺分类常用气体',
              bullets: [
                '沉积：SiH4、NH3、N2O、TEOS、WF6、各种 Metal organic',
                '刻蚀：CF4、CHF3、SF6、Cl2、BCl3、HBr',
                '掺杂：AsH3、PH3、B2H6（剧毒，管控极严）',
                '载气/辅助：N2、Ar、He、H2、O2（高纯）',
              ],
            },
            {
              title: '安全与法规（经销生死线）',
              bullets: [
                'AsH3、PH3、SiH4、Cl2 等：剧毒/易燃，需专门资质',
                '钢瓶：DOT/GB 认证、定期检验、阀件专用',
                '仓库：气瓶固定、通风、泄漏报警、防爆',
                '无资质不碰：先办证再接单',
              ],
              dealerTip: '特气事故=刑事风险，培训必须强调安全',
            },
            {
              title: '包装与供应模式',
              bullets: [
                '小瓶：2～50L，研究院、设备厂',
                '大瓶/T Bundle：FAB 批量',
                'Bulk + VMB/VMO 现场分配（大客户直供为主，经销难切入）',
                '回收空瓶与押金管理',
              ],
            },
            {
              title: '关键规格参数',
              bullets: [
                '纯度 99.999% 起，6N/7N 标注',
                '杂质：O2、H2O、CO、CO2、THC、颗粒',
                '同位素、金属羰基（部分气体）',
                'COA 每 Batch 必有',
              ],
            },
            {
              title: '品牌与渠道',
              bullets: [
                '国际：林德、空气化工、液化空气、大阳日酸等',
                '国产：华特气体、金宏气体、中船特气、昊华等',
                '经销：区域代理 + 钢瓶循环体系是核心壁垒',
              ],
            },
            {
              title: '特气 FAQ',
              bullets: [
                'Q：为什么 6N 和 5N 价差大？A：提纯成本与检测成本',
                'Q：能否混充？A：绝对禁止，专用阀件与管路',
                'Q：Fab 指定 Linde 瓶能否换国产气？A：需重新 Qualification',
              ],
            },
            {
              title: '本章小结',
              bullets: [
                '特气 = 工艺知道 + 安全合规 + 物流钢瓶',
                '剧毒气体没有「便宜凑合」',
                '先确认客户 Fab 气体清单（Gas list）再报价',
              ],
            },
          ],
        },
        {
          id: 'ch07',
          title: '第七章  靶材、CMP 与其他关键耗材',
          slides: [
            {
              title: '溅射靶材基础',
              bullets: [
                'PVD 物理气相沉积，把金属/化合物薄膜沉积到晶圆',
                '组成：靶材 + 背板（Bonding）',
                '常用：Al、Cu、Ti、Ta、W、Co、Ni、ITO、钨钛等',
              ],
            },
            {
              title: '靶材分类与工艺对应',
              bullets: [
                '阻挡层：Ta / TaN、Ti / TiN',
                '互连：Cu、Al（成熟节点）',
                '接触：W、Co（先进接触）',
                '透明导电：ITO（显示交叉）',
              ],
            },
            {
              title: '靶材规格要点',
              bullets: [
                '纯度 3N5～4N5 甚至更高',
                '晶粒尺寸、密度、偏析、焊接牢固度',
                '尺寸与机台匹配（Gen 300mm 等）',
                '消耗按「单片溅射量 × 产能」估算',
              ],
            },
            {
              title: 'CMP 化学机械抛光',
              bullets: [
                '使晶圆表面平坦化，多层金属/介质交替必备',
                '组成：抛光液 Slurry + 抛光垫 Pad + 清洗',
                '类型：氧化物、钨 W、铜 Cu、浅槽隔离 STI、层间介质 ILD',
              ],
            },
            {
              title: 'CMP 抛光液要点',
              bullets: [
                '氧化物：SiO2 磨料 + 碱性体系',
                '铜 CMP：氧化剂 + 络合剂 + 磨料，配方高度定制',
                '客户常指定 Cabot、Versum/3M、安集等合格供应商',
              ],
            },
            {
              title: '其他经销常见耗材',
              bullets: [
                '石英制品：扩散管、刻蚀腔体部件',
                'PGMEA 等溶剂、PR 配套',
                '溅射/ CVD 用陶瓷件、石墨件',
                'Wafer 盒、无尘布、手套（洁净室 MRO）',
              ],
            },
            {
              title: '化合物半导体材料（延伸）',
              bullets: [
                'GaAs、InP、SiC、GaN 衬底——化合物 FAB 材料体系不同',
                '磷化铟用于光芯片，碳化硅用于功率',
                '若客户做化合物，需另备产品谱系',
              ],
            },
            {
              title: '第七章 checklist',
              bullets: [
                '□ 靶材：材质、纯度、尺寸、背板、机台',
                '□ CMP：Slurry 类型、节点、是否与 Pad 配套',
                '□ 确认是否客户 Qualified 供应商名单内',
              ],
            },
          ],
        },
        {
          id: 'ch08',
          title: '第八章  规格参数、包装储运与质保',
          slides: [
            {
              title: 'COA 证书解读',
              bullets: [
                'Certificate of Analysis：批号、检测项、结果、标准',
                '重点：金属离子、颗粒、纯度、水分',
                '客户 IQC 不合格 → 经销第一响应',
              ],
            },
            {
              title: 'MSDS 与安全标签',
              bullets: [
                'GHS 象形图、CAS 号、危害说明、应急处理',
                'Fab 入库必查，过期 MSDS 需更新',
                '经销商应备齐中文版 + 原厂英文版',
              ],
            },
            {
              title: '单位与换算（报价必备）',
              bullets: [
                '液体：L、mL、kg（密度换算）',
                '气体：标方 Nm³、钢瓶容积 × 压力',
                '硅片：片、盒（25 片/盒常见）',
                '靶材：块、套（含背板）',
              ],
            },
            {
              title: '仓储环境',
              bullets: [
                '温湿度记录、FIFO 先进先出',
                '危化品分区、酸碱分离、氧化剂远离有机物',
                '冷链 2～8℃ / -20℃ 监控',
                '洁净材料防二次污染',
              ],
            },
            {
              title: '物流与进出口',
              bullets: [
                '危化品运输 UN 编号、DG 证书',
                '进口：HS 编码、两用物项、关税、商检',
                '交期：海运 + 清关 + 内陆，Lead Time 如实告知',
              ],
            },
            {
              title: '客诉处理流程',
              bullets: [
                '① 封存同 Batch 样品 → ② 索取 Fab 检测数据',
                '→ ③ 反馈原厂 → ④ 8D 报告 → ⑤ 退换/索赔',
                '忌：未核实先认责或擅自换货',
              ],
            },
          ],
        },
        {
          id: 'ch09',
          title: '第九章  客户沟通与 FAB 采购逻辑',
          slides: [
            {
              title: 'FAB 材料认证流程（Qualification）',
              bullets: [
                'Lab 评估 → Pilot 试产 → Ramp 小批量 → Production 量产',
                '周期：3～18 个月不等，先进材料更长',
                '经销角色：协调样品、交期、原厂技术支持',
              ],
            },
            {
              title: '询价 RFQ 标准信息表',
              bullets: [
                'Material Name / Spec / Grade / Package size',
                'Annual volume / Delivery site / Required COA items',
                'Incoterms、Payment、是否指定原厂',
              ],
              dealerTip: '做一张 Excel RFQ 模板发给客户，显专业',
            },
            {
              title: '与采购 vs 与工艺师沟通',
              bullets: [
                '采购：价格、交期、账期、合同',
                '工艺/IE：规格、认证、替代、Problem lot',
                '经销商应「工艺认可 + 采购成单」双线跟进',
              ],
            },
            {
              title: '竞品与替代话术（合规）',
              bullets: [
                '只谈「同等规格 / 同等 Grade / 已通过某 Fab 验证」',
                '不谈「一定更好 / 一定更便宜导致选 stock」',
                '用公开认证信息、COA 对比支撑',
              ],
            },
            {
              title: '样品管理',
              bullets: [
                'Sample 免费 vs 收费、Sample 额度',
                '样品 Batch 与量产 Batch 一致性声明',
                '样品损耗：涂胶、刻蚀类材料尤甚',
              ],
            },
            {
              title: '合同与账期风险',
              bullets: [
                'FAB 账期 60～90 天常见，现金流压力',
                '长单 vs  spot 单，价格波动条款',
                '质量索赔条款、最低采购量 MOQ',
              ],
            },
          ],
        },
        {
          id: 'ch10',
          title: '第十章  国产替代格局与经销实务',
          slides: [
            {
              title: '为什么要关注国产替代（经销视角）',
              bullets: [
                'Fab 有国产化 KPI，愿意试国产合格材料',
                '国产往往交期更短、服务响应更快',
                '价格带宽更大，经销毛利结构不同',
              ],
            },
            {
              title: '品类国产化成熟度（2026 认知）',
              bullets: [
                '成熟：湿化学品部分、特气部分、CMP 部分、封测材料',
                '追赶：KrF/ArF 胶、12 寸硅片、先进靶材',
                '早期：EUV 胶、部分 UPSS 超净试剂',
              ],
            },
            {
              title: '经销国产材料的 4 条建议',
              bullets: [
                '① 拿原厂 Qualification 名单，不夸大',
                '② 从 OSAT、中试线切入，再跟 FAB',
                '③ 保留进口备选，做 Dual source 方案',
                '④ 参与 SEMICON、材料展，积累原厂关系',
              ],
            },
            {
              title: '常见踩坑',
              bullets: [
                '把「研发中」材料当「可量产」卖',
                'Grade 降级发货（UP 当 UPS 卖）',
                '忽视效期与冷链导致批量报废',
                '无危化证接 HF/特气单',
              ],
            },
            {
              title: '延伸学习资源',
              bullets: [
                'SEMI 标准、各 Fab 供应商手册（公开摘要）',
                '本站点：耗材出货量榜、稀缺材料海报、产业链科普',
                '行业展：SEMICON China、CSEAC',
              ],
            },
            {
              title: '结业自测 10 题（内训用）',
              bullets: [
                '① ArF 对应什么波长？② UPSS 与 UPS 区别？',
                '③ 正胶曝光区溶还是不溶？④ HF 为何需危化证？',
                '⑤ 12 寸硅片一盒通常几片？⑥ CMP 用于什么目的？',
                '⑦ Qualification 是什么？⑧ COA 是什么？',
                '⑨ 特气 6N 含义？⑩ 经销商核心价值是什么？',
              ],
            },
          ],
        },
        {
          id: 'appendix',
          title: '附录  术语表与速查',
          slides: [
            {
              title: '核心术语 A～M',
              bullets: [
                'FAB：晶圆制造厂 | OSAT：封测代工厂 | COA：分析证书',
                'MSDS：安全数据表 | BARC：抗反射涂层 | CMP：化学机械抛光',
                'CVD/PVD/ALD：薄膜沉积 | BOE：缓冲氧化物蚀刻',
                'MOQ：最小订购量 | RFQ：询价单 | FOUP：前开式晶圆盒',
              ],
            },
            {
              title: '核心术语 N～Z',
              bullets: [
                'Node：制程节点 nm | Immersion：浸没式光刻',
                'Qual / Qualification：材料认证 | Slurry：抛光液',
                'Target：溅射靶材 | UPSS/UPS/UP：湿化学品等级',
                'EUV：极紫外光刻 | KrF/ArF：248/193nm 光刻胶',
              ],
            },
            {
              title: '材料-工艺一页速查（可单独打印）',
              bullets: [
                '光刻 → 光刻胶、显影液、去胶液',
                '刻蚀 → HF、BOE、干法特气',
                '薄膜 → 特气、靶材',
                '平坦化 → CMP Slurry/Pad',
                '清洗 → SC-1/SC-2、IPA、UPSS 试剂',
                '载体 → 硅晶圆',
              ],
            },
            {
              title: '免责声明（每页 PPT 页脚建议）',
              bullets: [
                '本资料仅供半导体材料产业知识培训与内部学习',
                '不构成证券、投资、交易建议',
                '产品规格以原厂最新数据为准，贸易请遵守当地法规',
              ],
            },
          ],
        },
      ],
    },
  ],
};

function getKnowledgePayCourses() {
  return KNOWLEDGE_PAY2026.courses || [];
}

function getKnowledgePayCourse(id) {
  return getKnowledgePayCourses().find(function (c) { return c.id === id; }) || null;
}

function buildKnowledgePayOutlineText(course) {
  if (!course) return '';
  var lines = [];
  lines.push(course.title);
  lines.push(course.subtitle || '');
  lines.push('');
  lines.push('【学习目标】');
  (course.learningGoals || []).forEach(function (g) {
    lines.push('- ' + g);
  });
  lines.push('');
  (course.chapters || []).forEach(function (ch, ci) {
    lines.push('');
    lines.push('==== ' + ch.title + ' ====');
    (ch.slides || []).forEach(function (sl, si) {
      lines.push('');
      lines.push('Slide ' + (ci + 1) + '.' + (si + 1) + '  ' + sl.title);
      (sl.bullets || []).forEach(function (b) {
        lines.push('  • ' + b);
      });
      if (sl.plainExplain) lines.push('  [通俗说] ' + sl.plainExplain);
      if (sl.dealerTip) lines.push('  [经销要点] ' + sl.dealerTip);
    });
  });
  lines.push('');
  lines.push('---');
  lines.push(KNOWLEDGE_PAY2026.disclaimer);
  return lines.join('\n');
}

if (typeof window !== 'undefined') {
  window.KNOWLEDGE_PAY2026 = KNOWLEDGE_PAY2026;
  window.getKnowledgePayCourses = getKnowledgePayCourses;
  window.getKnowledgePayCourse = getKnowledgePayCourse;
  window.buildKnowledgePayOutlineText = buildKnowledgePayOutlineText;
}
