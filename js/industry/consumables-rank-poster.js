/**
 * 耗材出货量排行海报（琥珀色主题，与订单青/产能绿区分）
 */
const CONSUMABLES_RANK_PAGE_W = 430;

const CONSUMABLES_POSTER_THEME = {
  border: '#fbbf24',
  barStart: '#d97706',
  barEnd: '#b45309',
  rank: '#b45309',
  capacity: '#d97706',
  bgStops: ['#fef3c7', '#fffbeb', '#fffdf7'],
  gridStroke: 'rgba(217, 119, 6, 0.07)',
};

const CONSUMABLES_POSTER_FOOTER_LINES = [
  '数据口径均来自企业年报、行业公开产业调研报道，',
  '仅用于行业产业学习参考，请勿仅凭本数据开展证券投资；股市存在高风险，自主投资请独立审慎判断。',
];

const CONSUMABLES_POSTER_LAYOUT = {
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
  FOOTER_H: 28,
  FOOTER_FONT: 'bold 9px "PingFang SC", sans-serif',
  NAME_FONT: 'bold 13px "PingFang SC", sans-serif',
  CAP_FONT: 'bold 10px "PingFang SC", sans-serif',
};

function splitConsumablesSubtitleTwoLines(ctx, subtitle, maxWidth) {
  if (!subtitle) return ['', ''];
  const parts = subtitle.split('；').filter(Boolean);
  if (parts.length >= 2) {
    const mid = Math.ceil(parts.length / 2);
    const line1 = fitOneLineWidth(ctx, parts.slice(0, mid).join('；'), maxWidth);
    const line2 = fitOneLineWidth(ctx, parts.slice(mid).join('；'), maxWidth);
    return [line1, line2];
  }
  let line1 = '';
  let line2 = '';
  for (let i = 0; i < subtitle.length; i++) {
    const test = line1 + subtitle[i];
    if (ctx.measureText(test).width > maxWidth && line1) {
      line2 = fitOneLineWidth(ctx, subtitle.slice(i), maxWidth);
      return [line1, line2];
    }
    line1 = test;
  }
  return [line1, ''];
}

function estimateConsumablesRankPosterHeight(data) {
  const L = CONSUMABLES_POSTER_LAYOUT;
  const n = (data.companies || []).length;
  const headerH = L.TOP + L.TITLE_H + L.SUB_LINES * L.SUB_LINE_H + L.GAP;
  const cardH = L.CARD_HEAD + n * L.ROW_H + 8;
  return headerH + cardH + L.GAP + L.FOOTER_LINES * L.FOOTER_LINE_H + 10;
}

function renderConsumablesRankPoster(data, containerId, canvasId) {
  const container = document.getElementById(containerId || 'consumables-rank-poster-pages');
  if (!container || !data) return null;
  container.innerHTML = '';
  const dpr = window.devicePixelRatio || 1;
  const W = CONSUMABLES_RANK_PAGE_W;
  const H = estimateConsumablesRankPosterHeight(data);

  const label = document.createElement('div');
  label.className = 'poster-page-label';
  label.textContent = data.title;
  container.appendChild(label);

  const canvas = document.createElement('canvas');
  canvas.className = 'poster-canvas-item';
  canvas.id = canvasId || 'consumables-rank-poster-canvas';
  canvas.width = W * dpr;
  canvas.height = H * dpr;
  canvas.style.width = W + 'px';
  canvas.style.height = H + 'px';
  container.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  drawConsumablesRankPoster(ctx, data, W, H);
  return canvas;
}

function drawConsumablesRankPoster(ctx, data, W, H) {
  const L = CONSUMABLES_POSTER_LAYOUT;
  const T = CONSUMABLES_POSTER_THEME;
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

  drawWatermark(ctx, W, H, { theme: 'consumables', layer: 'under' });

  let y = L.TOP;
  ctx.fillStyle = '#0f172a';
  ctx.font = L.TITLE_FONT;
  ctx.textAlign = 'center';
  ctx.fillText(data.title, W / 2, y + 16);
  y += L.TITLE_H;

  ctx.font = L.SUB_FONT;
  ctx.fillStyle = '#475569';
  const subLines = splitConsumablesSubtitleTwoLines(ctx, data.subtitle || '', W - L.PAD * 2);
  subLines.forEach((line, i) => {
    ctx.fillText(line, W / 2, y + 10 + i * L.SUB_LINE_H);
  });
  y += L.SUB_LINES * L.SUB_LINE_H + L.GAP;
  ctx.textAlign = 'left';

  const cardW = W - L.PAD * 2;
  const cardX = L.PAD;
  const cardH = L.CARD_HEAD + data.companies.length * L.ROW_H + 8;

  ctx.save();
  ctx.shadowColor = 'rgba(15, 23, 42, 0.06)';
  ctx.shadowBlur = 5;
  ctx.shadowOffsetY = 1;
  roundRect(ctx, cardX, y, cardW, cardH, CARD_RADIUS);
  ctx.fillStyle = '#ffffff';
  ctx.fill();
  ctx.restore();

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
  ctx.fillText((data.key || '耗材') + ' · 出货量排行', cardX + cardW / 2, y + L.CARD_HEAD / 2);
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
    const capStr = co.capacityLabel || '';
    const capGap = 6;

    ctx.font = L.CAP_FONT;
    const capW = ctx.measureText(capStr).width;
    ctx.font = L.NAME_FONT;
    ctx.fillStyle = '#0f172a';
    let nameStr = co.name;
    const maxNameW = maxLineW - 18 - capW - capGap;
    if (ctx.measureText(nameStr).width > maxNameW) {
      nameStr = fitOneLineWidth(ctx, nameStr, maxNameW);
    }
    ctx.fillText(nameStr, nameX, rowTop + 12);
    const nameW = ctx.measureText(nameStr).width;

    ctx.font = L.CAP_FONT;
    ctx.fillStyle = T.capacity;
    ctx.fillText(capStr, nameX + nameW + capGap, rowTop + 12);

    ctx.font = '9px "PingFang SC", sans-serif';
    ctx.fillStyle = '#64748b';
    const bullet = '· ' + (co.highlight || '');
    const maxDescW = cardW - innerPadX * 2 - 4;
    ctx.fillText(fitOneLineWidth(ctx, bullet, maxDescW), baseX + 4, rowTop + 26);
  });

  const cardBottom = y + cardH;
  ctx.fillStyle = '#475569';
  ctx.font = L.FOOTER_FONT;
  ctx.textAlign = 'center';
  const footerTop = cardBottom + L.GAP;
  CONSUMABLES_POSTER_FOOTER_LINES.forEach((line, i) => {
    ctx.fillText(line, W / 2, footerTop + 10 + i * L.FOOTER_LINE_H);
  });
  ctx.textAlign = 'left';

  drawWatermark(ctx, W, H, { theme: 'consumables' });
}

function downloadConsumablesRankPoster(canvasId, filename) {
  const canvas = document.getElementById(canvasId || 'consumables-rank-poster-canvas');
  if (!canvas) return;
  const link = document.createElement('a');
  link.download = filename || '耗材排行榜-2026.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
}

async function copyConsumablesRankPoster(canvasId) {
  const canvas = document.getElementById(canvasId || 'consumables-rank-poster-canvas');
  if (!canvas) return;
  try {
    const blob = await new Promise((res) => canvas.toBlob(res, 'image/png'));
    await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
    alert('✅ 耗材榜海报已复制到剪贴板');
  } catch (e) {
    alert('复制失败，请使用下载按钮');
  }
}

function initConsumablesRankPosterPage(data, containerId, canvasId) {
  if (data) renderConsumablesRankPoster(data, containerId, canvasId);
}

const CONSUMABLES_RANK_POSTER_CONFIG = [
  { key: '光刻胶', wrapId: 'cons-rank-photoresist-wrap', pagesId: 'cons-rank-photoresist-pages', canvasId: 'cons-rank-photoresist-canvas' },
  { key: '电子特气', wrapId: 'cons-rank-electronic-gas-wrap', pagesId: 'cons-rank-electronic-gas-pages', canvasId: 'cons-rank-electronic-gas-canvas' },
  { key: '溅射靶材', wrapId: 'cons-rank-sputter-target-wrap', pagesId: 'cons-rank-sputter-target-pages', canvasId: 'cons-rank-sputter-target-canvas' },
  { key: 'CMP抛光液', wrapId: 'cons-rank-cmp-slurry-wrap', pagesId: 'cons-rank-cmp-slurry-pages', canvasId: 'cons-rank-cmp-slurry-canvas' },
  { key: '电子浆料', wrapId: 'cons-rank-electrode-paste-wrap', pagesId: 'cons-rank-electrode-paste-pages', canvasId: 'cons-rank-electrode-paste-canvas' },
  { key: '偏光片', wrapId: 'cons-rank-polarizer-wrap', pagesId: 'cons-rank-polarizer-pages', canvasId: 'cons-rank-polarizer-canvas' },
  { key: '电解液', wrapId: 'cons-rank-electrolyte-wrap', pagesId: 'cons-rank-electrolyte-pages', canvasId: 'cons-rank-electrolyte-canvas' },
  { key: '锂电隔膜', wrapId: 'cons-rank-battery-separator-wrap', pagesId: 'cons-rank-battery-separator-pages', canvasId: 'cons-rank-battery-separator-canvas' },
  { key: '正极材料', wrapId: 'cons-rank-cathode-wrap', pagesId: 'cons-rank-cathode-pages', canvasId: 'cons-rank-cathode-canvas' },
  { key: '导热界面材料', wrapId: 'cons-rank-tim-wrap', pagesId: 'cons-rank-tim-pages', canvasId: 'cons-rank-tim-canvas' },
  { key: '浸没冷却液', wrapId: 'cons-rank-immersion-coolant-wrap', pagesId: 'cons-rank-immersion-coolant-pages', canvasId: 'cons-rank-immersion-coolant-canvas' },
  { key: '火工品', wrapId: 'cons-rank-pyrotechnics-wrap', pagesId: 'cons-rank-pyrotechnics-pages', canvasId: 'cons-rank-pyrotechnics-canvas' },
];

function getConsumablesRankRegistry() {
  return typeof CONSUMABLES_RANK_REGISTRY2026 !== 'undefined' ? CONSUMABLES_RANK_REGISTRY2026 : {};
}

function getConsumablesRankDatasetByKey(key) {
  if (!key) return null;
  return getConsumablesRankRegistry()[key] || null;
}
