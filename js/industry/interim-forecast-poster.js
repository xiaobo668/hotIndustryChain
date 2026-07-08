/**
 * 2026H1 中报业绩预告海报（琥珀金主题）
 */
const INTERIM_FORECAST_PAGE_W = 430;

const INTERIM_FORECAST_THEME = {
  border: '#e8a838',
  barStart: '#e8870a',
  barEnd: '#c46f08',
  rank: '#a16207',
  profit: '#78350f',
  growth: '#b45309',
  growthPos: '#dc2626',
  growthNeg: '#b91c1c',
  typeRed: '#dc2626',
  statBg: '#fff8e8',
  statBorder: '#fde68a',
  highlightBg: '#fffdf5',
  highlightBorder: '#fcd34d',
  bgStops: ['#fff9ee', '#fff3d6', '#fffcf5'],
  gridStroke: 'rgba(196, 111, 8, 0.05)',
  divider: '#fde68a',
  title: '#1c1917',
  subtitle: '#57534e',
};

const INTERIM_FORECAST_FOOTER_LINES = [
  '数据来自上市公司公开披露的2026H1业绩预告（东方财富数据中心），仅用于财报学习参考，',
  '不构成证券投资建议；预告为区间估计，请以交易所法定披露文件为准。',
];

const INTERIM_FORECAST_LAYOUT = {
  PAD: 14,
  TOP: 16,
  TITLE_FONT: 'bold 18px "PingFang SC", sans-serif',
  TITLE_H: 22,
  SUB_FONT: '9px "PingFang SC", sans-serif',
  SUB_LINE_H: 13,
  SUB_LINES: 2,
  GAP: 12,
  CARD_HEAD: 36,
  ROW_H: 34,
  COL_HEAD_H: 22,
  FOOTER_LINES: 2,
  FOOTER_LINE_H: 12,
  FOOTER_FONT: 'bold 8px "PingFang SC", sans-serif',
  NAME_FONT: 'bold 12px "PingFang SC", sans-serif',
  METRIC_FONT: 'bold 10px "PingFang SC", sans-serif',
};

function splitInterimForecastSubtitle(ctx, subtitle, maxWidth) {
  if (!subtitle) return ['', ''];
  const parts = subtitle.split('；').filter(Boolean);
  if (parts.length >= 2) {
    const mid = Math.ceil(parts.length / 2);
    return [
      fitOneLineWidth(ctx, parts.slice(0, mid).join('；'), maxWidth),
      fitOneLineWidth(ctx, parts.slice(mid).join('；'), maxWidth),
    ];
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

function interimForecastStatsHeight(data) {
  if (!data.stats || !data.stats.length) return 0;
  const rows = Math.ceil(data.stats.length / 3);
  return rows * 52 + 10;
}

function interimForecastHighlightsHeight(data) {
  if (!data.highlights || !data.highlights.length) return 0;
  return data.highlights.length * 16 + 28;
}

function estimateInterimForecastPosterHeight(data) {
  const L = INTERIM_FORECAST_LAYOUT;
  const n = (data.companies || []).length;
  const colHead = n > 0 ? L.COL_HEAD_H : 0;
  const headerH = L.TOP + L.TITLE_H + L.SUB_LINES * L.SUB_LINE_H + L.GAP;
  const cardH =
    L.CARD_HEAD
    + colHead
    + n * L.ROW_H
    + 10
    + interimForecastStatsHeight(data)
    + interimForecastHighlightsHeight(data);
  return headerH + cardH + L.GAP + L.FOOTER_LINES * L.FOOTER_LINE_H + 14;
}

function renderInterimForecastPoster(data, containerId, canvasId) {
  const container = document.getElementById(containerId);
  if (!container || !data) return null;
  container.innerHTML = '';
  const dpr = window.devicePixelRatio || 1;
  const W = INTERIM_FORECAST_PAGE_W;
  const H = estimateInterimForecastPosterHeight(data);

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
  drawInterimForecastPoster(ctx, data, W, H);
  return canvas;
}

function drawInterimForecastBg(ctx, W, H) {
  const T = INTERIM_FORECAST_THEME;
  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, T.bgStops[0]);
  bg.addColorStop(0.45, T.bgStops[1]);
  bg.addColorStop(1, T.bgStops[2]);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  ctx.save();
  ctx.strokeStyle = T.gridStroke;
  ctx.lineWidth = 1;
  for (let i = 0; i < 18; i++) {
    ctx.beginPath();
    ctx.moveTo(0, i * 48);
    ctx.lineTo(W, i * 48 + 36);
    ctx.stroke();
  }
  ctx.restore();
}

function drawInterimForecastStats(ctx, data, cardX, cardW, startY) {
  if (!data.stats || !data.stats.length) return startY;
  const T = INTERIM_FORECAST_THEME;
  const cols = 3;
  const gap = 8;
  const cellW = (cardW - gap * (cols - 1) - 20) / cols;
  const cellH = 44;
  const padX = 10;
  let y = startY + 6;

  data.stats.forEach((s, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = cardX + padX + col * (cellW + gap);
    const cy = y + row * (cellH + gap);

    roundRect(ctx, x, cy, cellW, cellH, 8);
    ctx.fillStyle = T.statBg;
    ctx.fill();
    roundRect(ctx, x, cy, cellW, cellH, 8);
    ctx.strokeStyle = T.statBorder;
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.textAlign = 'center';
    ctx.font = 'bold 16px "PingFang SC", sans-serif';
    ctx.fillStyle = T.growth;
    ctx.fillText(s.value, x + cellW / 2, cy + 20);
    ctx.font = '9px "PingFang SC", sans-serif';
    ctx.fillStyle = '#78716c';
    ctx.fillText(s.label, x + cellW / 2, cy + 36);
  });

  ctx.textAlign = 'left';
  const rows = Math.ceil(data.stats.length / cols);
  return y + rows * (cellH + gap) + 4;
}

function drawInterimForecastHighlights(ctx, data, cardX, cardW, startY) {
  if (!data.highlights || !data.highlights.length) return startY;
  const T = INTERIM_FORECAST_THEME;
  const padX = 10;
  const panelX = cardX + padX;
  const panelW = cardW - padX * 2;
  const lineH = 16;
  const panelH = data.highlights.length * lineH + 16;
  let y = startY + 4;

  ctx.strokeStyle = T.divider;
  ctx.beginPath();
  ctx.moveTo(panelX, y);
  ctx.lineTo(panelX + panelW, y);
  ctx.stroke();
  y += 10;

  roundRect(ctx, panelX, y, panelW, panelH, 8);
  ctx.fillStyle = T.highlightBg;
  ctx.fill();
  roundRect(ctx, panelX, y, panelW, panelH, 8);
  ctx.strokeStyle = T.highlightBorder;
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.font = 'bold 9px "PingFang SC", sans-serif';
  ctx.fillStyle = T.profit;
  ctx.fillText('要点速览', panelX + 10, y + 14);

  ctx.font = '9px "PingFang SC", sans-serif';
  ctx.fillStyle = '#44403c';
  data.highlights.forEach((line, i) => {
    const textY = y + 28 + i * lineH;
    ctx.fillStyle = T.growth;
    ctx.fillText('●', panelX + 10, textY);
    ctx.fillStyle = '#44403c';
    ctx.fillText(fitOneLineWidth(ctx, line, panelW - 28), panelX + 22, textY);
  });

  return y + panelH + 6;
}

function drawInterimForecastColHead(ctx, cardX, cardW, y, innerPadX) {
  const T = INTERIM_FORECAST_THEME;
  const baseX = cardX + innerPadX;
  ctx.fillStyle = '#a8a29e';
  ctx.font = 'bold 8px "PingFang SC", sans-serif';
  ctx.fillText('排名', baseX, y + 14);
  ctx.fillText('公司', baseX + 18, y + 14);
  ctx.fillText('预告净利润', baseX + 108, y + 14);
  ctx.textAlign = 'right';
  ctx.fillText('同比增幅', cardX + cardW - innerPadX, y + 14);
  ctx.textAlign = 'left';
  ctx.strokeStyle = T.divider;
  ctx.beginPath();
  ctx.moveTo(baseX, y + 18);
  ctx.lineTo(cardX + cardW - innerPadX, y + 18);
  ctx.stroke();
}

function interimForecastTypeColor(type) {
  const T = INTERIM_FORECAST_THEME;
  if (type === '预增' || type === '略增') return T.typeRed;
  if (type === '扭亏') return '#1e40af';
  if (type === '预减' || type === '略减' || type === '首亏' || type === '增亏') return T.growthNeg;
  return '#78716c';
}

function interimForecastGrowthColor(growthStr, type) {
  const T = INTERIM_FORECAST_THEME;
  if (!growthStr) return T.growth;
  if (type === '预减' || type === '略减' || type === '首亏' || type === '增亏') return T.growthNeg;
  if (String(growthStr).startsWith('+') || type === '预增' || type === '略增') return T.typeRed;
  return T.growth;
}

function drawInterimForecastPoster(ctx, data, W, H) {
  const L = INTERIM_FORECAST_LAYOUT;
  const T = INTERIM_FORECAST_THEME;
  const CARD_RADIUS = 12;
  const innerPadX = 12;
  const companies = data.companies || [];
  const hasRows = companies.length > 0;

  drawInterimForecastBg(ctx, W, H);

  let y = L.TOP;
  ctx.fillStyle = T.title;
  ctx.font = L.TITLE_FONT;
  ctx.textAlign = 'center';
  ctx.fillText(data.title, W / 2, y + 17);
  y += L.TITLE_H;

  const accentW = 48;
  ctx.fillStyle = T.barStart;
  roundRect(ctx, W / 2 - accentW / 2, y - 2, accentW, 3, 2);
  ctx.fill();
  y += 4;

  ctx.font = L.SUB_FONT;
  ctx.fillStyle = T.subtitle;
  const subLines = splitInterimForecastSubtitle(ctx, data.subtitle || '', W - L.PAD * 2);
  subLines.forEach((line, i) => {
    ctx.fillText(line, W / 2, y + 10 + i * L.SUB_LINE_H);
  });
  y += L.SUB_LINES * L.SUB_LINE_H + L.GAP;
  ctx.textAlign = 'left';

  const cardW = W - L.PAD * 2;
  const cardX = L.PAD;
  const colHead = hasRows ? L.COL_HEAD_H : 0;
  const cardH =
    L.CARD_HEAD
    + colHead
    + companies.length * L.ROW_H
    + 10
    + interimForecastStatsHeight(data)
    + interimForecastHighlightsHeight(data);

  roundRect(ctx, cardX, y, cardW, cardH, CARD_RADIUS);
  ctx.fillStyle = '#ffffff';
  ctx.fill();
  roundRect(ctx, cardX, y, cardW, cardH, CARD_RADIUS);
  ctx.strokeStyle = T.border;
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.save();
  roundRect(ctx, cardX, y, cardW, cardH, CARD_RADIUS);
  ctx.clip();
  const bgrad = ctx.createLinearGradient(cardX, y, cardX + cardW, y + L.CARD_HEAD);
  bgrad.addColorStop(0, T.barStart);
  bgrad.addColorStop(1, T.barEnd);
  ctx.fillStyle = bgrad;
  ctx.fillRect(cardX, y, cardW, L.CARD_HEAD);
  ctx.restore();

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 12px "PingFang SC", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const headLabel = data.cardHead || (data.key || '中报预告') + ' · 归母净利润 & 增幅';
  ctx.fillText(headLabel, cardX + cardW / 2, y + L.CARD_HEAD / 2);
  ctx.textBaseline = 'alphabetic';
  ctx.textAlign = 'left';

  let cy = y + L.CARD_HEAD + 6;
  cy = drawInterimForecastStats(ctx, data, cardX, cardW, cy);
  cy = drawInterimForecastHighlights(ctx, data, cardX, cardW, cy);

  if (hasRows) {
    drawInterimForecastColHead(ctx, cardX, cardW, cy, innerPadX);
    cy += L.COL_HEAD_H;
  }

  companies.forEach((co, ci) => {
    if (ci > 0) {
      ctx.strokeStyle = '#f5f5f4';
      ctx.beginPath();
      ctx.moveTo(cardX + innerPadX, cy + ci * L.ROW_H);
      ctx.lineTo(cardX + cardW - innerPadX, cy + ci * L.ROW_H);
      ctx.stroke();
    }

    const rowTop = cy + ci * L.ROW_H;
    const baseX = cardX + innerPadX;
    const profitColX = cardX + innerPadX + 118;

    ctx.font = 'bold 10px "PingFang SC", sans-serif';
    ctx.fillStyle = T.rank;
    ctx.fillText(String(co.rank) + '.', baseX, rowTop + 14);

    const nameX = baseX + 20;
    let typeW = 0;
    if (co.type) {
      ctx.font = '9px "PingFang SC", sans-serif';
      typeW = ctx.measureText(co.type).width + 5;
    }
    ctx.font = L.NAME_FONT;
    ctx.fillStyle = T.title;
    const maxNameW = Math.max(40, profitColX - nameX - typeW);
    const nameStr = fitOneLineWidth(ctx, co.name, maxNameW);
    ctx.fillText(nameStr, nameX, rowTop + 14);
    const nameW = ctx.measureText(nameStr).width;

    if (co.type) {
      ctx.font = '9px "PingFang SC", sans-serif';
      ctx.fillStyle = interimForecastTypeColor(co.type);
      ctx.fillText(co.type, nameX + nameW + 4, rowTop + 14);
    }

    ctx.font = L.METRIC_FONT;
    ctx.fillStyle = T.profit;
    const profitStr = co.profit || '—';
    ctx.fillText(fitOneLineWidth(ctx, profitStr, cardX + cardW - innerPadX - profitColX - 72), profitColX, rowTop + 14);

    const growthStr = co.growth || '—';
    ctx.fillStyle = interimForecastGrowthColor(growthStr, co.type);
    ctx.textAlign = 'right';
    ctx.font = 'bold 10px "PingFang SC", sans-serif';
    ctx.fillText(growthStr, cardX + cardW - innerPadX, rowTop + 14);
    ctx.textAlign = 'left';
  });

  const cardBottom = y + cardH;
  ctx.fillStyle = '#78716c';
  ctx.font = L.FOOTER_FONT;
  ctx.textAlign = 'center';
  const footerTop = cardBottom + L.GAP;
  INTERIM_FORECAST_FOOTER_LINES.forEach((line, i) => {
    ctx.fillText(fitOneLineWidth(ctx, line, W - L.PAD * 2), W / 2, footerTop + 10 + i * L.FOOTER_LINE_H);
  });
  ctx.textAlign = 'left';
}

function downloadInterimForecastPoster(canvasId, filename) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const link = document.createElement('a');
  link.download = filename || '2026中报业绩预告.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
}

async function copyInterimForecastPoster(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  try {
    const blob = await new Promise((res) => canvas.toBlob(res, 'image/png'));
    await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
    alert('✅ 业绩预告海报已复制到剪贴板');
  } catch (e) {
    alert('复制失败，请使用下载按钮');
  }
}
