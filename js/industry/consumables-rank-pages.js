/**
 * 耗材出货量排行榜页面
 */
const CONSUMABLES_COMPLIANCE_TAIL =
  '无证券投资分析、无个股价值研判，不构成任何股票买卖操作建议。本人无证券投资咨询执业资质，不提供任何行情、选股相关指导。';

const CONSUMABLES_COMPLIANCE_INTRO =
  '本合集从六大热门产业链（光互联与电子材料、消费电子、算力、半导体、锂电池、商业航天）梳理可量化出货量的制造耗材赛道，整理光刻胶、电子特气、溅射靶材、CMP抛光液、电子浆料、偏光片、电解液、锂电隔膜、正极材料、导热界面材料、浸没冷却液、航天火工品等企业公开出货量数据，属于产业链产业资料工具书，';

function getConsumablesComplianceHtml() {
  return '<strong>付费合集合规提示（必读）</strong><br/>' + CONSUMABLES_COMPLIANCE_INTRO + CONSUMABLES_COMPLIANCE_TAIL;
}

const CONSUMABLES_RANK_PAGE_KEYS = [
  '光刻胶', '电子特气', '溅射靶材', 'CMP抛光液', '电子浆料', '偏光片',
  '电解液', '锂电隔膜', '正极材料', '导热界面材料', '浸没冷却液', '火工品',
];

const CONSUMABLES_SECTION_HINTS = {
  光刻胶: '半导体/面板用光刻胶年化出货量（吨/年）。',
  电子特气: '晶圆/面板产线电子特气年化出货量（万标方/年）。',
  溅射靶材: '薄膜沉积溅射靶材年化出货量（吨/年）。',
  CMP抛光液: '晶圆CMP抛光液及配套湿化学品年化出货量（吨/年）。',
  电子浆料: 'MLCC/被动元件电极浆料年化出货量（吨/年）。',
  偏光片: '显示面板偏光片年化出货量（万㎡/年）。',
  电解液: '动力电池电解液年化出货量（万吨/年）。',
  锂电隔膜: '动力电池隔膜年化出货量（亿㎡/年）。',
  正极材料: '三元/磷酸铁锂正极材料年化出货量（万吨/年）。',
  导热界面材料: 'AI服务器/芯片导热垫片与界面材料年化出货量（吨/年）。',
  浸没冷却液: '数据中心浸没式液冷工质年化出货量（吨/年）。',
  火工品: '固体火箭发动机火工品与起爆器材年化出货量（吨/年）。',
};

function consumablesSectionAnchor(key) {
  return 'cons-' + String(key).replace(/[^\w\u4e00-\u9fff]+/g, '-');
}

function getConsumablesPosterConfigByKey(key) {
  return CONSUMABLES_RANK_POSTER_CONFIG.find((cfg) => cfg.key === key);
}

function renderConsumablesRankSection(container, cfg, data) {
  const anchor = consumablesSectionAnchor(cfg.key);
  const hint = CONSUMABLES_SECTION_HINTS[cfg.key] || (data && data.subtitle) || '';
  const fileName = (cfg.key + '耗材榜-2026.png').replace(/\//g, '-');

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
    downloadConsumablesRankPoster(this.getAttribute('data-dl'), this.getAttribute('data-fn'));
  });
  section.querySelector('[data-cp]').addEventListener('click', function () {
    copyConsumablesRankPoster(this.getAttribute('data-cp'));
  });

  if (data) initConsumablesRankPosterPage(data, cfg.pagesId, cfg.canvasId);
}

function renderConsumablesRankToc(container, keys) {
  const nav = document.createElement('nav');
  nav.className = 'nav-toc';
  nav.innerHTML = '<div class="nav-toc-title">本页赛道导航</div>';
  keys.forEach((key) => {
    const a = document.createElement('a');
    a.href = '#' + consumablesSectionAnchor(key);
    a.textContent = key;
    nav.appendChild(a);
  });
  container.appendChild(nav);
}

function initConsumablesRankPage() {
  const container = document.getElementById('consumables-rank-sections');
  if (!container) return;

  const compliance = document.getElementById('consumables-compliance-box');
  if (compliance) compliance.innerHTML = getConsumablesComplianceHtml();

  renderConsumablesRankToc(container, CONSUMABLES_RANK_PAGE_KEYS);

  CONSUMABLES_RANK_PAGE_KEYS.forEach((key) => {
    const cfg = getConsumablesPosterConfigByKey(key);
    const data = getConsumablesRankDatasetByKey(key);
    if (cfg) renderConsumablesRankSection(container, cfg, data);
  });
}

function openConsumablesRankPage() {
  window.location.href = 'consumables-poster.html';
}
