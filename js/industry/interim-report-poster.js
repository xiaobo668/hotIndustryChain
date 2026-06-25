/**
 * 中报分析榜海报（紫色主题，与订单/产能/耗材区分）
 */
const INTERIM_REPORT_PAGE_W = 430;

const INTERIM_POSTER_THEME = {
  border: '#a78bfa',
  barStart: '#7c3aed',
  barEnd: '#6d28d9',
  rank: '#6d28d9',
  metric: '#7c3aed',
  bgStops: ['#ede9fe', '#f5f3ff', '#faf5ff'],
  gridStroke: 'rgba(124, 58, 237, 0.07)',
};

const INTERIM_POSTER_FOOTER_LINES = [
  '数据均来自上市公司公开披露的中报/半年报，仅用于财报与产业学习参考，',
  '请勿仅凭本数据开展证券投资；股市存在高风险，自主投资请独立审慎判断。',
];

const INTERIM_POSTER_LAYOUT = {
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

function splitInterimSubtitleTwoLines(ctx, subtitle, maxWidth) {
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

function estimateInterimReportPosterHeight(data) {
  const L = INTERIM_POSTER_LAYOUT;
  const n = (data.companies || []).length;
  const headerH = L.TOP + L.TITLE_H + L.SUB_LINES * L.SUB_LINE_H + L.GAP;
  const cardH = L.CARD_HEAD + n * L.ROW_H + 8;
  return headerH + cardH + L.GAP + L.FOOTER_LINES * L.FOOTER_LINE_H + 10;
}

function renderInterimReportPoster(data, containerId, canvasId) {
  const container = document.getElementById(containerId);
  if (!container || !data) return null;
  container.innerHTML = '';
  const dpr = window.devicePixelRatio || 1;
  const W = INTERIM_REPORT_PAGE_W;
  const H = estimateInterimReportPosterHeight(data);

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
  drawInterimReportPoster(ctx, data, W, H);
  return canvas;
}

function drawInterimReportPoster(ctx, data, W, H) {
  const L = INTERIM_POSTER_LAYOUT;
  const T = INTERIM_POSTER_THEME;
  const CARD_RADIUS = 10;
  const borderBlue = T.border;
  const barColor = T.barStart;
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
  ctx.fillStyle = '#475569';
  const subLines = splitInterimSubtitleTwoLines(ctx, data.subtitle || '', W - L.PAD * 2);
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
  ctx.strokeStyle = borderBlue;
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.save();
  roundRect(ctx, cardX, y, cardW, cardH, CARD_RADIUS);
  ctx.clip();
  const bgrad = ctx.createLinearGradient(cardX, y, cardX, y + L.CARD_HEAD);
  bgrad.addColorStop(0, barColor);
  bgrad.addColorStop(1, T.barEnd);
  ctx.fillStyle = bgrad;
  ctx.fillRect(cardX, y, cardW, L.CARD_HEAD);
  ctx.restore();

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 11px "PingFang SC", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText((data.key || '中报') + ' · H1营收增速排行', cardX + cardW / 2, y + L.CARD_HEAD / 2);
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
    ctx.fillStyle = '#0f172a';
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
  ctx.fillStyle = '#475569';
  ctx.font = L.FOOTER_FONT;
  ctx.textAlign = 'center';
  const footerTop = cardBottom + L.GAP;
  INTERIM_POSTER_FOOTER_LINES.forEach((line, i) => {
    ctx.fillText(line, W / 2, footerTop + 10 + i * L.FOOTER_LINE_H);
  });
  ctx.textAlign = 'left';
}

function downloadInterimReportPoster(canvasId, filename) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const link = document.createElement('a');
  link.download = filename || '中报分析榜-2026.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
}

async function copyInterimReportPoster(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  try {
    const blob = await new Promise((res) => canvas.toBlob(res, 'image/png'));
    await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
    alert('✅ 中报分析海报已复制到剪贴板');
  } catch (e) {
    alert('复制失败，请使用下载按钮');
  }
}

function initInterimReportPosterPage(data, containerId, canvasId) {
  if (data) renderInterimReportPoster(data, containerId, canvasId);
}

function renderInterimReportSourcesPanel(data, sourcesElId) {
  const el = document.getElementById(sourcesElId);
  if (!el || !data) return;
  const rows = (data.companies || [])
    .map(
      (co) =>
        `<tr><td>${co.rank}</td><td><strong>${co.name}</strong><br>${co.metricLabel || ''}</td>`
        + `<td>${co.verify && co.verify.source ? co.verify.source : ''}<br>`
        + `<span style="opacity:0.85">${(co.verify && co.verify.note) || ''}</span></td></tr>`
    )
    .join('');
  el.innerHTML = `
    <h3>📎 披露来源 · ${data.key || ''}中报分析</h3>
    <table><thead><tr><th>#</th><th>公司/指标</th><th>来源说明</th></tr></thead><tbody>${rows}</tbody></table>
    <p class="sources-panel-footer">免责声明：以上均为公开披露财务数据整理，不构成投资建议。请以交易所公告及公司法定披露文件为准。</p>
  `;
  el.style.display = '';
}

const INTERIM_REPORT_POSTER_CONFIG = [
  { key: 'AI算力', wrapId: 'interim-ai-compute-wrap', pagesId: 'interim-ai-compute-pages', canvasId: 'interim-ai-compute-canvas', sourcesId: 'interim-ai-compute-sources' },
  { key: '液冷', wrapId: 'interim-liquid-cooling-wrap', pagesId: 'interim-liquid-cooling-pages', canvasId: 'interim-liquid-cooling-canvas', sourcesId: 'interim-liquid-cooling-sources' },
  { key: '光互联', wrapId: 'interim-optical-wrap', pagesId: 'interim-optical-pages', canvasId: 'interim-optical-canvas', sourcesId: 'interim-optical-sources' },
  { key: '存储芯片', wrapId: 'interim-storage-wrap', pagesId: 'interim-storage-pages', canvasId: 'interim-storage-canvas', sourcesId: 'interim-storage-sources' },
  { key: '半导体设备', wrapId: 'interim-semi-equip-wrap', pagesId: 'interim-semi-equip-pages', canvasId: 'interim-semi-equip-canvas', sourcesId: 'interim-semi-equip-sources' },
  { key: '人形机器人', wrapId: 'interim-humanoid-wrap', pagesId: 'interim-humanoid-pages', canvasId: 'interim-humanoid-canvas', sourcesId: 'interim-humanoid-sources' },
  { key: '锂电池', wrapId: 'interim-battery-wrap', pagesId: 'interim-battery-pages', canvasId: 'interim-battery-canvas', sourcesId: 'interim-battery-sources' },
  { key: 'PCB', wrapId: 'interim-pcb-wrap', pagesId: 'interim-pcb-pages', canvasId: 'interim-pcb-canvas', sourcesId: 'interim-pcb-sources' },
  { key: '商业航天', wrapId: 'interim-aerospace-wrap', pagesId: 'interim-aerospace-pages', canvasId: 'interim-aerospace-canvas', sourcesId: 'interim-aerospace-sources' },
  { key: '先进封装', wrapId: 'interim-adv-packaging-wrap', pagesId: 'interim-adv-packaging-pages', canvasId: 'interim-adv-packaging-canvas', sourcesId: 'interim-adv-packaging-sources' },
];

function getInterimReportRegistry() {
  return typeof INTERIM_REPORT_REGISTRY2026 !== 'undefined' ? INTERIM_REPORT_REGISTRY2026 : {};
}

function getInterimReportDatasetByKey(key) {
  if (!key) return null;
  return getInterimReportRegistry()[key] || null;
}

function getInterimReportPosterConfigByKey(key) {
  return INTERIM_REPORT_POSTER_CONFIG.find((cfg) => cfg.key === key);
}

function interimReportConfigMatches(industryKey, cfg) {
  if (!industryKey || !cfg) return false;
  if (industryKey === cfg.key) return true;
  const data = getInterimReportDatasetByKey(cfg.key);
  return !!(data && data.industryKeys && data.industryKeys.includes(industryKey));
}
