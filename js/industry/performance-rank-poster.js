/**
 * 创新药业绩榜海报（浅红主题）
 */
const PERFORMANCE_RANK_PAGE_W = 430;

const PERFORMANCE_POSTER_THEME = {
  border: '#fca5a5',
  barStart: '#f87171',
  barEnd: '#ef4444',
  rank: '#dc2626',
  metric: '#ef4444',
  name: '#991b1b',
  bgStops: ['#fecaca', '#fee2e2', '#fff5f5'],
  gridStroke: 'rgba(239, 68, 68, 0.08)',
  subtitle: '#7f1d1d',
  footer: '#b91c1c',
};

const PERFORMANCE_POSTER_FOOTER_LINES = [
  '数据取自各公司2024年年度报告等公开披露财务数据（按营收规模排序），仅用于财报与产业学习参考，',
  '请勿仅凭本数据开展证券投资；股市存在高风险，自主投资请独立审慎判断。',
];

const PERFORMANCE_POSTER_LAYOUT = {
  PAD: 12,
  TOP: 14,
  TITLE_FONT: 'bold 17px "PingFang SC", sans-serif',
  TITLE_H: 20,
  SUB_FONT: '9px "PingFang SC", sans-serif',
  SUB_LINE_H: 12,
  SUB_LINES: 2,
  GAP: 10,
  CARD_HEAD: 32,
  ROW_H: 34,
  FOOTER_LINES: 2,
  FOOTER_LINE_H: 12,
  FOOTER_FONT: 'bold 9px "PingFang SC", sans-serif',
  NAME_FONT: 'bold 13px "PingFang SC", sans-serif',
  METRIC_FONT: 'bold 10px "PingFang SC", sans-serif',
};

function splitPerformanceSubtitleTwoLines(ctx, subtitle, maxWidth) {
  if (!subtitle) return ['', ''];
  const parts = subtitle.split('；').filter(Boolean);
  if (parts.length >= 2) {
    const mid = Math.ceil(parts.length / 2);
    const line1 = fitOneLineWidth(ctx, parts.slice(0, mid).join('；'), maxWidth);
    const line2 = fitOneLineWidth(ctx, parts.slice(mid).join('；'), maxWidth);
    return [line1, line2];
  }
  let line1 = '';
  for (let i = 0; i < subtitle.length; i++) {
    const test = line1 + subtitle[i];
    if (ctx.measureText(test).width > maxWidth && line1) {
      return [line1, fitOneLineWidth(ctx, subtitle.slice(i), maxWidth)];
    }
    line1 = test;
  }
  return [line1, ''];
}

function estimatePerformanceRankPosterHeight(data) {
  const L = PERFORMANCE_POSTER_LAYOUT;
  const n = (data.companies || []).length;
  const headerH = L.TOP + L.TITLE_H + L.SUB_LINES * L.SUB_LINE_H + L.GAP;
  const cardH = L.CARD_HEAD + n * L.ROW_H + 8;
  return headerH + cardH + L.GAP + L.FOOTER_LINES * L.FOOTER_LINE_H + 10;
}

function renderPerformanceRankPoster(data, containerId, canvasId) {
  const container = document.getElementById(containerId);
  if (!container || !data) return null;
  container.innerHTML = '';
  const dpr = window.devicePixelRatio || 1;
  const W = PERFORMANCE_RANK_PAGE_W;
  const H = estimatePerformanceRankPosterHeight(data);

  const label = document.createElement('div');
  label.className = 'poster-page-label';
  label.textContent = data.title;
  container.appendChild(label);

  const canvas = document.createElement('canvas');
  canvas.className = 'poster-canvas-item';
  canvas.id = canvasId;
  canvas.width = W * dpr;
  canvas.height = H * dpr;
  canvas.style.width = W + 'px';
  canvas.style.height = H + 'px';
  container.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  drawPerformanceRankPoster(ctx, data, W, H);
  return canvas;
}

function drawPerformanceRankPoster(ctx, data, W, H) {
  const L = PERFORMANCE_POSTER_LAYOUT;
  const T = PERFORMANCE_POSTER_THEME;
  const CARD_RADIUS = 10;
  const innerPadX = 10;

  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, T.bgStops[0]);
  bg.addColorStop(0.4, T.bgStops[1]);
  bg.addColorStop(1, T.bgStops[2]);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  ctx.save();
  ctx.strokeStyle = T.gridStroke;
  ctx.lineWidth = 1;
  for (let i = 0; i < 22; i++) {
    ctx.beginPath();
    ctx.moveTo(0, i * 40);
    ctx.lineTo(W, i * 40 + 30);
    ctx.stroke();
  }
  ctx.restore();

  let y = L.TOP;
  ctx.fillStyle = '#0f172a';
  ctx.font = L.TITLE_FONT;
  ctx.textAlign = 'center';
  ctx.fillText(data.title, W / 2, y + 16);
  y += L.TITLE_H;

  ctx.font = L.SUB_FONT;
  ctx.fillStyle = T.subtitle || '#475569';
  const subLines = splitPerformanceSubtitleTwoLines(ctx, data.subtitle || '', W - L.PAD * 2);
  subLines.forEach((line, i) => {
    ctx.fillText(line, W / 2, y + 10 + i * L.SUB_LINE_H);
  });
  y += L.SUB_LINES * L.SUB_LINE_H + L.GAP;
  ctx.textAlign = 'left';

  const cardW = W - L.PAD * 2;
  const cardX = L.PAD;
  const cardH = L.CARD_HEAD + data.companies.length * L.ROW_H + 8;

  roundRect(ctx, cardX, y, cardW, cardH, CARD_RADIUS);
  ctx.fillStyle = '#ffffff';
  ctx.fill();
  roundRect(ctx, cardX, y, cardW, cardH, CARD_RADIUS);
  ctx.strokeStyle = T.border;
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.save();
  roundRect(ctx, cardX, y, cardW, cardH, CARD_RADIUS);
  ctx.clip();
  const bgrad = ctx.createLinearGradient(cardX, y, cardX, y + L.CARD_HEAD);
  bgrad.addColorStop(0, T.barStart);
  bgrad.addColorStop(1, T.barEnd);
  ctx.fillStyle = bgrad;
  ctx.fillRect(cardX, y, cardW, L.CARD_HEAD);
  ctx.restore();

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 11px "PingFang SC", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText((data.key || '业绩') + ' · 2026营收增速排行', cardX + cardW / 2, y + L.CARD_HEAD / 2);
  ctx.textBaseline = 'alphabetic';
  ctx.textAlign = 'left';

  let cy = y + L.CARD_HEAD + 4;
  data.companies.forEach((co, ci) => {
    if (ci > 0) {
      ctx.strokeStyle = '#e8eef5';
      ctx.beginPath();
      ctx.moveTo(cardX + innerPadX, cy + ci * L.ROW_H);
      ctx.lineTo(cardX + cardW - innerPadX, cy + ci * L.ROW_H);
      ctx.stroke();
    }

    const rowTop = cy + ci * L.ROW_H;
    const baseX = cardX + innerPadX;
    const maxLineW = cardW - innerPadX * 2;

    ctx.font = 'bold 10px "PingFang SC", sans-serif';
    ctx.fillStyle = T.rank;
    ctx.fillText(String(co.rank) + '.', baseX, rowTop + 12);

    const nameX = baseX + 18;
    const metricStr = co.metricLabel || '';
    const metricGap = 6;

    ctx.font = L.METRIC_FONT;
    const metricW = ctx.measureText(metricStr).width;
    ctx.font = L.NAME_FONT;
    ctx.fillStyle = T.name;
    let nameStr = co.name;
    const maxNameW = maxLineW - 18 - metricW - metricGap;
    if (ctx.measureText(nameStr).width > maxNameW) {
      nameStr = fitOneLineWidth(ctx, nameStr, maxNameW);
    }
    ctx.fillText(nameStr, nameX, rowTop + 12);
    const nameW = ctx.measureText(nameStr).width;

    ctx.font = L.METRIC_FONT;
    ctx.fillStyle = T.metric;
    ctx.fillText(metricStr, nameX + nameW + metricGap, rowTop + 12);

    ctx.font = '9px "PingFang SC", sans-serif';
    ctx.fillStyle = '#64748b';
    const bullet = '· ' + (co.highlight || '');
    ctx.fillText(fitOneLineWidth(ctx, bullet, cardW - innerPadX * 2 - 4), baseX + 4, rowTop + 26);
  });

  const cardBottom = y + cardH;
  ctx.fillStyle = T.footer || '#475569';
  ctx.font = L.FOOTER_FONT;
  ctx.textAlign = 'center';
  const footerTop = cardBottom + L.GAP;
  PERFORMANCE_POSTER_FOOTER_LINES.forEach((line, i) => {
    ctx.fillText(line, W / 2, footerTop + 10 + i * L.FOOTER_LINE_H);
  });
  ctx.textAlign = 'left';
}

function downloadPerformanceRankPoster(canvasId, filename) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const link = document.createElement('a');
  link.download = filename || '业绩榜-2026.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
}

async function copyPerformanceRankPoster(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  try {
    const blob = await new Promise((res) => canvas.toBlob(res, 'image/png'));
    await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
    alert('✅ 业绩榜海报已复制到剪贴板');
  } catch (e) {
    alert('复制失败，请使用下载按钮');
  }
}

function initPerformanceRankPosterPage(data, containerId, canvasId) {
  if (data) renderPerformanceRankPoster(data, containerId, canvasId);
}

const PERFORMANCE_RANK_POSTER_CONFIG = [
  { key: '创新药综合', industryKeys: ['创新药', '生物医药', 'CXO', 'CRO', 'CDMO'], wrapId: 'performance-rank-id-overview-wrap', pagesId: 'performance-rank-id-overview-pages', canvasId: 'performance-rank-id-overview-canvas' },
  { key: '药物发现CRO', industryKeys: ['创新药', '生物医药', 'CXO', 'CRO', 'CDMO'], wrapId: 'performance-rank-id-cro-wrap', pagesId: 'performance-rank-id-cro-pages', canvasId: 'performance-rank-id-cro-canvas' },
  { key: '原料药中间体', industryKeys: ['创新药', '生物医药', 'CXO', 'CRO', 'CDMO'], wrapId: 'performance-rank-id-api-wrap', pagesId: 'performance-rank-id-api-pages', canvasId: 'performance-rank-id-api-canvas' },
  { key: '创新药研发', industryKeys: ['创新药', '生物医药', 'CXO', 'CRO', 'CDMO'], wrapId: 'performance-rank-id-rd-wrap', pagesId: 'performance-rank-id-rd-pages', canvasId: 'performance-rank-id-rd-canvas' },
  { key: '生物类似药CGT', industryKeys: ['创新药', '生物医药', 'CXO', 'CRO', 'CDMO'], wrapId: 'performance-rank-id-biosimilar-cgt-wrap', pagesId: 'performance-rank-id-biosimilar-cgt-pages', canvasId: 'performance-rank-id-biosimilar-cgt-canvas' },
  { key: 'GLP1代谢药', industryKeys: ['创新药', '生物医药', 'CXO', 'CRO', 'CDMO'], wrapId: 'performance-rank-id-glp1-wrap', pagesId: 'performance-rank-id-glp1-pages', canvasId: 'performance-rank-id-glp1-canvas' },
  { key: '创新药商业化', industryKeys: ['创新药', '生物医药', 'CXO', 'CRO', 'CDMO'], wrapId: 'performance-rank-id-commercial-wrap', pagesId: 'performance-rank-id-commercial-pages', canvasId: 'performance-rank-id-commercial-canvas' },
];

function getPerformanceRankRegistry() {
  return typeof PERFORMANCE_RANK_REGISTRY_INNOVATIVE_DRUG2026 !== 'undefined'
    ? PERFORMANCE_RANK_REGISTRY_INNOVATIVE_DRUG2026
    : {};
}

function getPerformanceRankDatasetByKey(key) {
  if (!key) return null;
  return getPerformanceRankRegistry()[key] || null;
}

function performanceRankConfigMatches(industryKey, cfg) {
  if (!industryKey || !cfg) return false;
  return cfg.industryKeys.includes(industryKey);
}

function resolvePerformanceRankIndustryKey(industry) {
  let key = industry && industry.name;
  const query = typeof currentSearchQuery !== 'undefined' ? currentSearchQuery : '';
  if (typeof searchIndustry === 'function' && query) {
    const resolved = searchIndustry(query);
    if (resolved && resolved.name) key = resolved.name;
  }
  if (key && typeof KEYWORD_MAP !== 'undefined' && KEYWORD_MAP[key]) {
    key = KEYWORD_MAP[key];
  }
  return key || null;
}

function maybeRenderPerformanceRankPoster(industry) {
  const industryKey = resolvePerformanceRankIndustryKey(industry);
  PERFORMANCE_RANK_POSTER_CONFIG.forEach((cfg) => {
    const wrap = document.getElementById(cfg.wrapId);
    if (!wrap) return;
    const show = performanceRankConfigMatches(industryKey, cfg);
    wrap.style.display = show ? '' : 'none';
    if (show) {
      const data = getPerformanceRankDatasetByKey(cfg.key);
      if (data) {
        requestAnimationFrame(() => {
          initPerformanceRankPosterPage(data, cfg.pagesId, cfg.canvasId);
        });
      }
    }
  });
}
