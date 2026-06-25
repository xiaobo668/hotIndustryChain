/**
 * 中报分析榜页面
 */
const INTERIM_REPORT_PAGE_KEYS = [
  'AI算力', '液冷', '光互联', '存储芯片', '半导体设备',
  '人形机器人', '锂电池', 'PCB', '商业航天', '先进封装',
];

const INTERIM_SECTION_HINTS = {
  AI算力: '按2025年半年度报告H1营收同比增速排序；含AI服务器、算力芯片与智算基础设施。',
  液冷: '按2025年半年度报告H1营收同比增速排序；含数据中心液冷温控与精密空调。',
  光互联: '按2025年半年度报告H1营收同比增速排序；含高速光模块、光芯片与CPO配套。',
  存储芯片: '按2025年半年度报告H1营收同比增速排序；含NOR/DRAM/NAND及存储模组。',
  半导体设备: '按2025年半年度报告H1营收同比增速排序；含刻蚀、薄膜、清洗等前道设备。',
  人形机器人: '按2025年半年度报告H1营收同比增速排序；含执行器、减速器、伺服与传感配套。',
  锂电池: '按2025年半年度报告H1营收同比增速排序；含动力/储能电芯与材料。',
  PCB: '按2025年半年度报告H1营收同比增速排序；含AI服务器与通信高端PCB。',
  商业航天: '按2025年半年度报告H1营收同比增速排序；含卫星制造、航天电子与测控。',
  先进封装: '按2025年半年度报告H1营收同比增速排序；含Chiplet、2.5D/3D与Fan-out封测。',
};

function getInterimComplianceHtml() {
  const intro =
    '本合集整理AI算力、液冷、光互联、存储芯片、半导体设备、人形机器人、锂电池、PCB、商业航天、先进封装等热门赛道上市公司2025年半年度报告公开财务数据，属于产业链财报学习资料工具书，';
  const tail =
    '无证券投资分析、无个股价值研判，不构成任何股票买卖操作建议。本人无证券投资咨询执业资质，不提供任何行情、选股相关指导。';
  return '<strong>合规提示（必读）</strong><br/>' + intro + tail;
}

function interimSectionAnchor(key) {
  return 'ir-' + String(key).replace(/[^\w\u4e00-\u9fff]+/g, '-');
}

function renderInterimReportSection(container, cfg, data) {
  const anchor = interimSectionAnchor(cfg.key);
  const hint = INTERIM_SECTION_HINTS[cfg.key] || (data && data.subtitle) || '';
  const fileName = (cfg.key + '中报分析-2026.png').replace(/\//g, '-');

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
    + '</div>'
    + (cfg.sourcesId ? '<div class="sources-panel" id="' + cfg.sourcesId + '" style="display:none"></div>' : '')
    + '</div>';
  container.appendChild(section);

  section.querySelector('[data-dl]').addEventListener('click', function () {
    downloadInterimReportPoster(this.getAttribute('data-dl'), this.getAttribute('data-fn'));
  });
  section.querySelector('[data-cp]').addEventListener('click', function () {
    copyInterimReportPoster(this.getAttribute('data-cp'));
  });

  if (data) {
    initInterimReportPosterPage(data, cfg.pagesId, cfg.canvasId);
    if (cfg.sourcesId) renderInterimReportSourcesPanel(data, cfg.sourcesId);
  }
}

function renderInterimReportToc(container, keys) {
  const nav = document.createElement('nav');
  nav.className = 'nav-toc';
  nav.innerHTML = '<div class="nav-toc-title">十大赛道导航</div>';
  keys.forEach((key) => {
    const a = document.createElement('a');
    a.href = '#' + interimSectionAnchor(key);
    a.textContent = key;
    nav.appendChild(a);
  });
  container.appendChild(nav);
}

function initInterimReportPage() {
  const container = document.getElementById('interim-report-sections');
  if (!container) return;

  const compliance = document.getElementById('interim-compliance-box');
  if (compliance) compliance.innerHTML = getInterimComplianceHtml();

  renderInterimReportToc(container, INTERIM_REPORT_PAGE_KEYS);

  INTERIM_REPORT_PAGE_KEYS.forEach((key) => {
    const cfg = getInterimReportPosterConfigByKey(key);
    const data = getInterimReportDatasetByKey(key);
    if (cfg) renderInterimReportSection(container, cfg, data);
  });
}

function openInterimReportPage() {
  window.location.href = 'interim-report.html';
}
