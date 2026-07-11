/**
 * 2026H1 中报业绩预告页面
 */
const INTERIM_FORECAST_SECTIONS = [
  {
    id: 'overview',
    getData: () => {
      const d = typeof INTERIM_FORECAST_2026H1 !== 'undefined' ? INTERIM_FORECAST_2026H1 : null;
      if (!d) return null;
      return {
        ...d.overview,
        cardHead: '市场全景 · 归母净利润预告统计',
        companies: [],
      };
    },
    wrapId: 'if-overview-wrap',
    pagesId: 'if-overview-pages',
    canvasId: 'if-overview-canvas',
    fileName: '2026中报预告-市场全景.png',
    hint: '截至2026年7月8日已披露2026H1业绩预告的A股公司全景统计，数据来自东方财富数据中心。',
  },
  {
    id: 'profit',
    getData: () => (typeof INTERIM_FORECAST_2026H1 !== 'undefined' ? INTERIM_FORECAST_2026H1.profitTop15 : null),
    wrapId: 'if-profit-wrap',
    pagesId: 'if-profit-pages',
    canvasId: 'if-profit-canvas',
    fileName: '2026中报预告-净利润规模榜.png',
    hint: '按归母净利润预告上限排序 Top15。国泰海通、招商证券、江波龙、万华化学等居前。',
  },
  {
    id: 'growth',
    getData: () => (typeof INTERIM_FORECAST_2026H1 !== 'undefined' ? INTERIM_FORECAST_2026H1.growthTop15 : null),
    wrapId: 'if-growth-wrap',
    pagesId: 'if-growth-pages',
    canvasId: 'if-growth-canvas',
    fileName: '2026中报预告-净利润增幅榜.png',
    hint: '按归母净利润同比增幅上限排序 Top15（仅预增/略增；扭亏、减亏等因基数不可比，不纳入增幅榜）。',
  },
  {
    id: 'storage-growth',
    getData: () => (typeof INTERIM_FORECAST_2026H1 !== 'undefined' ? INTERIM_FORECAST_2026H1.storageGrowthTop10 : null),
    wrapId: 'if-storage-growth-wrap',
    pagesId: 'if-storage-growth-pages',
    canvasId: 'if-storage-growth-canvas',
    fileName: '2026中报预告-存储芯片增幅榜.png',
    hint: '存储芯片赛道（成分股+预告文本匹配）已披露公司的归母净利润预告增幅 Top10；仅纳入预增/略增。截止日前名单持续更新。',
  },
  {
    id: 'semi-profit',
    getData: () => (typeof INTERIM_FORECAST_2026H1 !== 'undefined' ? INTERIM_FORECAST_2026H1.semiProfitTop15 : null),
    wrapId: 'if-semi-profit-wrap',
    pagesId: 'if-semi-profit-pages',
    canvasId: 'if-semi-profit-canvas',
    fileName: '2026中报预告-半导体净利润榜.png',
    hint: '半导体赛道（存储/设备/先进封装/材料等产业链成分+预告文本匹配）按归母净利润预告上限排序 Top15。',
  },
  {
    id: 'compute-lease-profit',
    getData: () => (typeof INTERIM_FORECAST_2026H1 !== 'undefined' ? INTERIM_FORECAST_2026H1.computeLeaseProfitTop15 : null),
    wrapId: 'if-compute-lease-profit-wrap',
    pagesId: 'if-compute-lease-profit-pages',
    canvasId: 'if-compute-lease-profit-canvas',
    fileName: '2026中报预告-算力租赁净利润榜.png',
    hint: '算力租赁赛道（订单榜/产能榜成分+预告文本匹配）按归母净利润预告上限排序 Top15；含IDC智算、GPU集群租赁等。',
  },
];

function getInterimForecastComplianceHtml() {
  const meta = typeof INTERIM_FORECAST_2026H1 !== 'undefined' ? INTERIM_FORECAST_2026H1.meta : {};
  const total = meta.totalDisclosed || '—';
  const ratio = meta.positiveRatio || '—';
  return (
    '<strong>合规提示（必读）</strong><br/>'
    + '本页整理截至2026年7月8日A股已披露2026年半年度业绩预告（归母净利润）的公开数据，'
    + '共' + total + '家，预喜率约' + ratio + '%。属于财报学习资料，'
    + '无证券投资分析、无个股价值研判，不构成任何股票买卖操作建议。'
    + '本人无证券投资咨询执业资质，不提供任何行情、选股相关指导。'
  );
}

function renderInterimForecastSection(container, cfg) {
  const data = cfg.getData();
  const section = document.createElement('section');
  section.id = 'if-' + cfg.id;
  section.innerHTML =
    '<h2>' + (data ? data.title : cfg.id) + '</h2>'
    + '<p class="sub">' + cfg.hint + '</p>'
    + '<div class="poster-wrap" id="' + cfg.wrapId + '">'
    + '<div id="' + cfg.pagesId + '"></div>'
    + '<div class="actions">'
    + '<button class="btn btn-primary" type="button" data-dl="' + cfg.canvasId + '" data-fn="' + cfg.fileName + '">⬇️ 下载</button>'
    + '<button class="btn btn-secondary" type="button" data-cp="' + cfg.canvasId + '">📋 复制</button>'
    + '</div>'
    + '</div>';
  container.appendChild(section);

  section.querySelector('[data-dl]').addEventListener('click', function () {
    downloadInterimForecastPoster(this.getAttribute('data-dl'), this.getAttribute('data-fn'));
  });
  section.querySelector('[data-cp]').addEventListener('click', function () {
    copyInterimForecastPoster(this.getAttribute('data-cp'));
  });

  if (data) renderInterimForecastPoster(data, cfg.pagesId, cfg.canvasId);
}

function renderInterimForecastCompanyTable(container) {
  const d = typeof INTERIM_FORECAST_2026H1 !== 'undefined' ? INTERIM_FORECAST_2026H1 : null;
  if (!d || !d.allCompanies) return;

  const section = document.createElement('section');
  section.id = 'if-full-list';
  const rows = d.allCompanies
    .map(
      (co) =>
        '<tr><td>' + co.rank + '</td><td><strong>' + co.name + '</strong></td>'
        + '<td>' + co.profit + '</td><td>' + co.growth + '</td><td>' + co.type + '</td>'
        + '<td style="opacity:0.75">' + (co.noticeDate || '') + '</td></tr>'
    )
    .join('');

  section.innerHTML =
    '<h2>完整披露名单（' + d.allCompanies.length + '家）</h2>'
    + '<p class="sub">按归母净利润预告上限排序；截止2026-07-08。强制披露截止日为7月15日，名单持续更新。</p>'
    + '<div class="sources-panel" style="display:block">'
    + '<table><thead><tr><th>#</th><th>公司</th><th>预告净利润</th><th>同比增幅</th><th>类型</th><th>公告日</th></tr></thead>'
    + '<tbody>' + rows + '</tbody></table>'
    + '<p class="sources-panel-footer">数据来源：' + (d.meta.source || '东方财富') + ' · ' + (d.meta.asOf || '') + '</p>'
    + '</div>';
  container.appendChild(section);
}

function initInterimForecastPage() {
  const container = document.getElementById('interim-forecast-sections');
  if (!container) return;

  const compliance = document.getElementById('interim-forecast-compliance');
  if (compliance) compliance.innerHTML = getInterimForecastComplianceHtml();

  INTERIM_FORECAST_SECTIONS.forEach((cfg) => renderInterimForecastSection(container, cfg));
  renderInterimForecastCompanyTable(container);

  const intro = document.getElementById('interim-forecast-intro');
  const meta = typeof INTERIM_FORECAST_2026H1 !== 'undefined' ? INTERIM_FORECAST_2026H1.meta : null;
  if (intro && meta) {
    const asOf = meta.asOf || '';
    const m = asOf.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    const asOfText = m ? m[1] + '年' + Number(m[2]) + '月' + Number(m[3]) + '日' : asOf;
    intro.innerHTML =
      '截至 <strong>' + asOfText + '</strong>，A股已有 <strong>'
      + meta.totalDisclosed + '家</strong> 披露 <strong>2026H1业绩预告</strong>（归母净利润），预喜率约 <strong>'
      + meta.positiveRatio + '%</strong>。下方含市场全景、规模榜、增幅榜、<strong>存储芯片增幅 Top10</strong>、<strong>半导体净利润 Top15</strong> 与 <strong>算力租赁净利润 Top15</strong>（赛道已披露'
      + (meta.storageDisclosed || '—') + ' / ' + (meta.semiDisclosed || '—') + ' / ' + (meta.computeLeaseDisclosed || '—') + '家），附完整名单。';
  }
}

function openInterimForecastPage() {
  window.location.href = 'interim-forecast.html';
}

function openInterimHubPage() {
  window.location.href = 'interim-hub.html';
}
