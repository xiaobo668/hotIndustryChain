/**
 * 产能榜分行业独立页面配置与动态渲染
 */
const CAPACITY_COMPLIANCE_TAIL =
  '无证券投资分析、无个股价值研判，不构成任何股票买卖操作建议。本人无证券投资咨询执业资质，不提供任何行情、选股相关指导。';

const CAPACITY_COMPLIANCE_BY_GROUP = {
  'optical-electronics':
    '本合集仅整理高速光模块、光芯片、电子布/覆铜板、MLCC、先进封装、存储封测等赛道企业公开产能、扩产、产线工艺数据，属于光互联与电子材料产业资料工具书，',
  'consumer-electronics':
    '本合集仅整理显示面板、TWS耳机音箱、智能手机ODM、可穿戴设备、充电设备、摄像头模组等赛道企业公开产能、出货量与制造规模数据，属于消费电子产业资料工具书，',
  compute:
    '本合集仅整理算力芯片、AI服务器、算力租赁、液冷技术、云计算、边缘计算等赛道企业公开产能、算力规模与产线工艺数据，属于AI算力产业资料工具书，',
  semiconductor:
    '本合集仅整理晶圆代工、半导体设备、封装测试、半导体材料、CPU/GPU/模拟/功率芯片等赛道企业公开产能、扩产与制造规模数据，属于半导体产业资料工具书，',
  battery:
    '本合集仅整理动力电池、正负极材料、电解液、隔膜、铜箔、储能电池、电池回收等赛道企业公开产能、扩产与产线工艺数据，属于锂电池新能源产业资料工具书，',
  aerospace:
    '本合集仅整理火箭发动机、卫星制造、星座运营、航天材料、测控系统等赛道企业公开产能、在轨规模与制造交付数据，属于商业航天产业资料工具书，',
};

const CAPACITY_COMPLIANCE_HUB_INTRO =
  '本合集按六大产业板块（光互联与电子材料、消费电子、算力、半导体、锂电池、商业航天）整理各细分赛道企业公开产能、扩产、产线工艺数据，属于产业链产业资料工具书，';

function getCapacityComplianceHtml(groupId) {
  const intro = groupId
    ? (CAPACITY_COMPLIANCE_BY_GROUP[groupId] || CAPACITY_COMPLIANCE_HUB_INTRO)
    : CAPACITY_COMPLIANCE_HUB_INTRO;
  return '<strong>付费合集合规提示（必读）</strong><br/>' + intro + CAPACITY_COMPLIANCE_TAIL;
}

/** @deprecated 请使用 getCapacityComplianceHtml(groupId) */
const CAPACITY_COMPLIANCE_HTML = getCapacityComplianceHtml();

const CAPACITY_RANK_PAGE_GROUPS = {
  'optical-electronics': {
    id: 'optical-electronics',
    title: '光互联与电子材料产能榜',
    subtitle: '高速光模块 · 光芯片 · 液冷 · 算力服务器 · 电子布/覆铜板 · MLCC · 先进封装 · 存储封测等 16 个赛道',
    icon: '🔗',
    path: 'capacity/optical-electronics.html',
    keys: [
      '高速光模块', '光芯片', '光纤预制棒', 'CPO光引擎', '液冷设备', '算力服务器',
      '高端电子布', '低介电子纱', '覆铜板', 'ABF载板', '玻纤粗纱', '风电纱',
      'MLCC车规算力', '磷化铟砷化镓衬底', '先进封装2.5D', '存储封测',
    ],
  },
  'consumer-electronics': {
    id: 'consumer-electronics',
    title: '消费电子产能榜',
    subtitle: '显示面板 · TWS耳机音箱 · 智能手机ODM · 可穿戴设备 · 充电设备 · 摄像头模组',
    icon: '📱',
    path: 'capacity/consumer-electronics.html',
    keys: [
      '显示面板', 'TWS耳机音箱', '智能手机ODM', '可穿戴设备', '充电设备', '摄像头模组',
    ],
  },
  compute: {
    id: 'compute',
    title: '算力板块产能榜',
    subtitle: '算力芯片 · AI服务器 · 量子计算 · 算力租赁 · 大数据 · 液冷技术 · 云计算 · 边缘计算 · 算力算法 · PCB算力板',
    icon: '🚀',
    path: 'capacity/compute.html',
    keys: [
      '算力芯片', 'AI服务器', '量子计算', '算力租赁', '大数据', '液冷技术',
      '云计算', '边缘计算', '算力算法', 'PCB算力板',
    ],
  },
  semiconductor: {
    id: 'semiconductor',
    title: '半导体产能榜',
    subtitle: '晶圆代工 · 半导体设备 · 封装测试 · 半导体材料 · CPU/GPU/模拟/功率芯片 · EDA工具 · 传感器芯片',
    icon: '💎',
    path: 'capacity/semiconductor.html',
    keys: [
      '晶圆代工', '半导体设备', '封装测试', '半导体材料', 'CPU芯片', 'GPU芯片',
      '模拟芯片', '功率半导体', 'EDA工具', '传感器芯片',
    ],
  },
  battery: {
    id: 'battery',
    title: '锂电池产能榜',
    subtitle: '动力电池 · 正极/负极材料 · 电解液 · 隔膜 · 铜箔 · 固态电池 · 电池设备 · 储能电池 · 电池回收',
    icon: '🔋',
    path: 'capacity/battery.html',
    keys: [
      '动力电池', '正极材料', '负极材料', '电解液', '隔膜', '铜箔',
      '固态电池', '电池设备', '储能电池', '电池回收',
    ],
  },
  aerospace: {
    id: 'aerospace',
    title: '商业航天产能榜',
    subtitle: '火箭发动机 · 箭体结构 · 卫星/火箭制造 · 卫星通信 · 姿态控制 · 星座运营 · 太空算力 · 航天材料 · 测控',
    icon: '🛰️',
    path: 'capacity/aerospace.html',
    keys: [
      '火箭发动机', '箭体结构', '卫星制造', '火箭制造', '卫星通信', '卫星姿态控制',
      '星座运营', '太空算力', '航天材料', '航天测控',
    ],
  },
};

/** 产业链名称 → 产能分行业页 */
const INDUSTRY_TO_CAPACITY_PAGE = {
  半导体: 'semiconductor',
  芯片: 'semiconductor',
  集成电路: 'semiconductor',
  消费电子: 'consumer-electronics',
  手机: 'consumer-electronics',
  智能硬件: 'consumer-electronics',
  AI算力: 'compute',
  算力: 'compute',
  GPU: 'compute',
  算力租赁: 'compute',
  人工智能: 'compute',
  液冷: 'compute',
  AIDC: 'compute',
  光互联: 'optical-electronics',
  光纤概念: 'optical-electronics',
  CPO: 'optical-electronics',
  电子布: 'optical-electronics',
  MLCC: 'optical-electronics',
  半导体稀缺材料: 'optical-electronics',
  先进封装: 'optical-electronics',
  存储芯片: 'optical-electronics',
  长鑫存储: 'optical-electronics',
  PCB: 'optical-electronics',
  锂电池: 'battery',
  动力电池: 'battery',
  储能: 'battery',
  多氟多: 'battery',
  商业航天: 'aerospace',
  卫星互联网: 'aerospace',
  可复用火箭: 'aerospace',
  火箭: 'aerospace',
  卫星: 'aerospace',
  星座: 'aerospace',
  低轨卫星: 'aerospace',
};

const CAPACITY_SECTION_HINTS = {
  高速光模块: '对外外销年化量产产能（万支/年）；旭创920万支为全数通光模块总产能，高速型号占六成；第9-10位为配套/自用产能，不计入整机外销梯队。',
  光芯片: 'DFB/VCSEL及硅光激光器芯片量产+在建扩产（万颗/年）。',
  光纤预制棒: '光棒/预制棒年化产能（吨/年）。',
  CPO光引擎: 'CPO光引擎量产规划产能（万套/年），非现有量产。',
  液冷设备: '冷板/浸没式液冷年化散热供货能力（MW/年）。',
  算力服务器: 'AI/智算服务器整机年化产能（万台/年）。',
  高端电子布: '薄布/超薄布/Low-Dk特种电子布年化产能（亿米/年）。',
  低介电子纱: 'Low-Dk/低介电电子纱年化产能（万吨/年）。',
  覆铜板: '覆铜板年化产能（万㎡/年）。',
  ABF载板: 'ABF/FC-BGA封装基板量产年化产能（万片/年）。',
  玻纤粗纱: '玻纤粗纱年化产能（万吨/年）。',
  风电纱: '风电纱年化产能（万吨/年）。',
  MLCC车规算力: 'MLCC总产能中含车规/算力品类（亿颗/年）。',
  磷化铟砷化镓衬底: '磷化铟/砷化镓衬底年量产产能（万片/年）。',
  '先进封装2.5D': '2.5D/3D先进封装年化产能（万片/年）。',
  存储封测: 'DRAM/NAND封测年化产能（亿颗/年）。',
  显示面板: '显示面板年化出货量（万片/年）。',
  TWS耳机音箱: 'TWS耳机年化出货量（万副/年）。',
  智能手机ODM: '智能手机ODM/EMS年化出货量（万台/年）。',
  可穿戴设备: '可穿戴设备年化出货量（万台/年）。',
  充电设备: '充电器/移动电源年化出货量（万台/年）。',
  摄像头模组: '摄像头模组/光学组件年化出货量（万套/年）。',
  算力芯片: '算力/GPU/AI芯片年化出货量（万片/年）。',
  AI服务器: 'AI/智算服务器整机年化产能（万台/年）。',
  量子计算: '量子计算/量子通信系统年化交付（套/年）。',
  算力租赁: '在运智算算力规模（PFlops）。',
  大数据: '金融/安全大数据平台月活用户（万MAU）。',
  液冷技术: '冷板/浸没式液冷年化散热供货能力（MW/年）。',
  云计算: '数据中心运营机架规模（万架/年）。',
  边缘计算: '边缘计算/IoT节点规模（万节点）。',
  算力算法: '大模型/AI算法API年化调用量（亿次/年）。',
  PCB算力板: 'AI服务器/交换机算力PCB年化产能（万㎡/年）。',
  晶圆代工: 'IDM/特色工艺晶圆年化产能（万片/年）。',
  半导体设备: '半导体工艺/检测/封测设备年化交付（台/年）。',
  封装测试: '集成电路封测年化产能（亿颗/年）。',
  半导体材料: '光刻胶/特气/靶材/硅片等年化产能。',
  CPU芯片: 'CPU/MCU/应用处理器年化出货量（万片/年）。',
  GPU芯片: 'GPU/端侧算力芯片年化出货量（万片/年）。',
  模拟芯片: '模拟/电源管理/信号链芯片年化出货量（万片/年）。',
  功率半导体: 'IGBT/MOSFET/功率模块年化出货量（万片/年）。',
  EDA工具: 'EDA软件授权+产线信息化年化交付（套/年）；第1-2位为EDA工具，3-10位为产线配套软件。',
  传感器芯片: 'CIS/MEMS/光学/环境传感芯片年化出货量（万颗/年）。',
  动力电池: '动力电池电芯年化产能（GWh/年）。',
  正极材料: '三元/磷酸铁锂正极及前驱体年化产能（万吨/年）。',
  负极材料: '人造石墨等负极材料年化产能（万吨/年）。',
  电解液: '电解液及锂盐溶剂年化产能（万吨/年）。',
  隔膜: '湿法/干法/涂覆隔膜年化产能（亿㎡/年）。',
  铜箔: '锂电用铜箔年化产能（万吨/年）。',
  固态电池: '固态/半固态电芯及电解质中试与小批量产能（MWh/年）。',
  电池设备: '涂布/卷绕/叠片/检测等锂电设备年化交付（台/年）。',
  储能电池: '储能电芯与系统年化产能（GWh/年）。',
  电池回收: '废旧动力电池回收与资源化年化处理量（万吨/年）。',
  火箭发动机: '液体/固体火箭发动机及核心部件年化交付（台/年）。',
  箭体结构: '火箭箭体结构件/紧固件/贮箱年化交付（套/年）。',
  卫星制造: '商业卫星年化总装交付（颗/年）。',
  火箭制造: '运载火箭整箭及动力系统年化交付（枚/年）。',
  卫星通信: '卫星通信终端/天线/芯片年化交付（万套/年）。',
  卫星姿态控制: '星敏感器/惯性器件/姿控电子年化交付（万套/年）。',
  星座运营: '低轨/高轨星座在轨运营服务能力（颗在轨当量）。',
  太空算力: '卫星在轨/地面遥感云计算算力（PFlops）。',
  航天材料: '钛合金/高温合金/碳纤维等航天材料年化产能（吨/年）。',
  航天测控: '航天测控地面站/终端/雷达年化交付（套/年）。',
};

function capacitySectionAnchor(key) {
  return 'cap-' + String(key).replace(/[^\w\u4e00-\u9fff]+/g, '-');
}

function getCapacityPageGroup(groupId) {
  return CAPACITY_RANK_PAGE_GROUPS[groupId] || null;
}

function getCapacityPageUrlForIndustry(industryName) {
  const groupId = INDUSTRY_TO_CAPACITY_PAGE[industryName];
  if (!groupId) return null;
  const group = CAPACITY_RANK_PAGE_GROUPS[groupId];
  return group ? group.path : null;
}

function openCapacityRankGroupPage(groupId) {
  const group = getCapacityPageGroup(groupId);
  if (group) window.location.href = group.path;
}

function openCapacityRankPageForIndustry(industryName) {
  const url = getCapacityPageUrlForIndustry(industryName);
  if (url) window.location.href = url;
  else window.location.href = 'capacity-poster.html';
}

function getPosterConfigByKey(key) {
  return (typeof CAPACITY_RANK_POSTER_CONFIG !== 'undefined' ? CAPACITY_RANK_POSTER_CONFIG : [])
    .find((cfg) => cfg.key === key);
}

function renderCapacityRankSection(container, cfg, data) {
  const anchor = capacitySectionAnchor(cfg.key);
  const hint = CAPACITY_SECTION_HINTS[cfg.key] || (data && data.subtitle) || '';
  const fileName = (cfg.key + '产能榜-2026.png').replace(/\//g, '-');

  const section = document.createElement('section');
  section.id = anchor;
  section.innerHTML =
    '<h2>' + cfg.key + '</h2>'
    + '<p class="sub">' + hint + '</p>'
    + '<div class="poster-wrap" id="' + cfg.wrapId + '">'
    + '<div id="' + cfg.pagesId + '"></div>'
    + '<div class="actions">'
    + '<button class="btn btn-primary" type="button" data-dl="' + cfg.canvasId + '" data-fn="' + fileName + '">⬇️ 下载</button>'
    + '<button class="btn btn-secondary" type="button" data-cp="' + cfg.canvasId + '">📋 复制</button>'
    + '</div></div>';
  container.appendChild(section);

  section.querySelector('[data-dl]').addEventListener('click', function () {
    downloadCapacityRankPoster(this.getAttribute('data-dl'), this.getAttribute('data-fn'));
  });
  section.querySelector('[data-cp]').addEventListener('click', function () {
    copyCapacityRankPoster(this.getAttribute('data-cp'));
  });

  if (data) initCapacityRankPosterPage(data, cfg.pagesId, cfg.canvasId);
}

function renderCapacityRankToc(container, keys) {
  const nav = document.createElement('nav');
  nav.className = 'nav-toc';
  nav.innerHTML = '<div class="nav-toc-title">本页赛道导航</div>';
  keys.forEach((key) => {
    const a = document.createElement('a');
    a.href = '#' + capacitySectionAnchor(key);
    a.textContent = key;
    nav.appendChild(a);
  });
  container.appendChild(nav);
}

function initCapacityRankGroupPage(groupId) {
  const group = getCapacityPageGroup(groupId);
  const container = document.getElementById('capacity-rank-sections');
  if (!group || !container) return;

  const titleEl = document.getElementById('capacity-page-title');
  const subEl = document.getElementById('capacity-page-subtitle');
  if (titleEl) titleEl.textContent = group.title;
  if (subEl) subEl.textContent = group.subtitle;

  document.title = group.title + ' · 2026';

  const compliance = document.getElementById('capacity-compliance-box');
  if (compliance) compliance.innerHTML = getCapacityComplianceHtml(groupId);

  renderCapacityRankToc(container, group.keys);

  group.keys.forEach((key) => {
    const cfg = getPosterConfigByKey(key);
    const data = typeof getCapacityRankDatasetByKey === 'function'
      ? getCapacityRankDatasetByKey(key)
      : null;
    if (cfg) renderCapacityRankSection(container, cfg, data);
  });
}

function renderCapacityRankHub(containerId) {
  const container = document.getElementById(containerId || 'capacity-industry-grid');
  if (!container) return;
  container.innerHTML = '';
  Object.values(CAPACITY_RANK_PAGE_GROUPS).forEach((group) => {
    const a = document.createElement('a');
    a.className = 'industry-card';
    a.href = group.path;
    a.innerHTML =
      '<div class="industry-card-icon">' + group.icon + '</div>'
      + '<div class="industry-card-name">' + group.title + '</div>'
      + '<div class="industry-card-desc">' + group.subtitle + '</div>'
      + '<span class="industry-card-count">' + group.keys.length + ' 个赛道 Top10</span>';
    container.appendChild(a);
  });
}

function initCapacityRankHub() {
  const compliance = document.getElementById('capacity-compliance-box');
  if (compliance) compliance.innerHTML = getCapacityComplianceHtml();
  renderCapacityRankHub('capacity-industry-grid');
}
