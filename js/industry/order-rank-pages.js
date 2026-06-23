/**
 * 订单榜分行业页面配置与动态渲染
 */
const ORDER_RANK_PAGE_GROUPS = {
  aerospace: {
    id: 'aerospace',
    title: '商业航天订单榜',
    subtitle: '火箭发动机 · 箭体结构 · 卫星/火箭制造 · 卫星通信 · 姿态控制 · 星座运营 · 太空算力 · 航天材料 · 测控',
    icon: '🛰️',
    path: 'order/aerospace.html',
    keys: [
      '火箭发动机', '箭体结构', '卫星制造', '火箭制造', '卫星通信', '卫星姿态控制',
      '星座运营', '太空算力', '航天材料', '航天测控',
    ],
  },
};

const INDUSTRY_TO_ORDER_PAGE = {
  商业航天: 'aerospace',
  卫星互联网: 'aerospace',
  可复用火箭: 'aerospace',
  火箭: 'aerospace',
  卫星: 'aerospace',
  星座: 'aerospace',
  低轨卫星: 'aerospace',
  星链: 'aerospace',
  军工: 'aerospace',
};

const ORDER_SECTION_HINTS = {
  火箭发动机: '液体/固体火箭发动机及核心部件在手或预计订单（亿元）。',
  箭体结构: '火箭箭体结构件、紧固件、贮箱等配套订单（亿元）。',
  卫星制造: '商业卫星总装与平台制造在手或预计订单（亿元）。',
  火箭制造: '运载火箭整箭及动力系统配套订单（亿元）。',
  卫星通信: '卫星通信终端、天线、芯片等配套订单（亿元）。',
  卫星姿态控制: '星敏感器、惯性器件、姿控电子配套订单（亿元）。',
  星座运营: '低轨/高轨星座组网与运营服务订单（亿元）。',
  太空算力: '卫星在轨/地面遥感云计算与数据处理订单（亿元）。',
  航天材料: '钛合金、高温合金、碳纤维等航天材料订单（亿元）。',
  航天测控: '航天测控地面站、终端、雷达系统订单（亿元）。',
};

function orderSectionAnchor(key) {
  return 'ord-' + String(key).replace(/[^\w\u4e00-\u9fff]+/g, '-');
}

function getOrderPageGroup(groupId) {
  return ORDER_RANK_PAGE_GROUPS[groupId] || null;
}

function getOrderPageUrlForIndustry(industryName) {
  const groupId = INDUSTRY_TO_ORDER_PAGE[industryName];
  if (!groupId) return null;
  const group = ORDER_RANK_PAGE_GROUPS[groupId];
  return group ? group.path : null;
}

function openOrderRankGroupPage(groupId) {
  const group = getOrderPageGroup(groupId);
  if (group) window.location.href = group.path;
}

function openOrderRankPageForIndustry(industryName) {
  const url = getOrderPageUrlForIndustry(industryName);
  if (url) window.location.href = url;
  else window.location.href = 'theme-poster.html#order-ranks';
}

function getOrderRankPosterConfigByKey(key) {
  return (typeof ORDER_RANK_POSTER_CONFIG !== 'undefined' ? ORDER_RANK_POSTER_CONFIG : [])
    .find((cfg) => cfg.key === key);
}

function renderOrderRankSection(container, cfg, data) {
  const anchor = orderSectionAnchor(cfg.key);
  const hint = ORDER_SECTION_HINTS[cfg.key] || (data && data.subtitle) || '';
  const fileName = (cfg.key + '订单榜-2026.png').replace(/\//g, '-');

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
    downloadOrderRankPoster(this.getAttribute('data-dl'), this.getAttribute('data-fn'));
  });
  section.querySelector('[data-cp]').addEventListener('click', function () {
    copyOrderRankPoster(this.getAttribute('data-cp'));
  });

  if (data) initOrderRankPosterPage(data, cfg.pagesId, cfg.canvasId);
}

function renderOrderRankToc(container, keys) {
  const nav = document.createElement('nav');
  nav.className = 'nav-toc';
  nav.innerHTML = '<div class="nav-toc-title">本页赛道导航</div>';
  keys.forEach((key) => {
    const a = document.createElement('a');
    a.href = '#' + orderSectionAnchor(key);
    a.textContent = key;
    nav.appendChild(a);
  });
  container.appendChild(nav);
}

function initOrderRankGroupPage(groupId) {
  const group = getOrderPageGroup(groupId);
  const container = document.getElementById('order-rank-sections');
  if (!group || !container) return;

  const titleEl = document.getElementById('order-page-title');
  const subEl = document.getElementById('order-page-subtitle');
  if (titleEl) titleEl.textContent = group.title;
  if (subEl) subEl.textContent = group.subtitle;
  document.title = group.title + ' · 2026';

  renderOrderRankToc(container, group.keys);

  group.keys.forEach((key) => {
    const cfg = getOrderRankPosterConfigByKey(key);
    const data = typeof getOrderRankDatasetByKey === 'function'
      ? getOrderRankDatasetByKey(key)
      : null;
    if (cfg) renderOrderRankSection(container, cfg, data);
  });
}

function renderOrderRankHub(containerId) {
  const container = document.getElementById(containerId || 'order-industry-grid');
  if (!container) return;
  container.innerHTML = '';

  const legacy = document.createElement('a');
  legacy.className = 'industry-card';
  legacy.href = 'theme-poster.html#order-ranks';
  legacy.innerHTML =
    '<div class="industry-card-icon">🏆</div>'
    + '<div class="industry-card-name">综合订单排行榜</div>'
    + '<div class="industry-card-desc">算力租赁 · PCB · 先进封装 · 液冷 · 光互联 · 电力 · 存储芯片 · 人形机器人等</div>'
    + '<span class="industry-card-count">13 个赛道</span>';
  container.appendChild(legacy);

  Object.values(ORDER_RANK_PAGE_GROUPS).forEach((group) => {
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

function initOrderRankHub() {
  renderOrderRankHub('order-industry-grid');
}
