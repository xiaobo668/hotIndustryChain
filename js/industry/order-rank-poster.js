/**
 * 订单规模排行海报（浅蓝白风格，与 poster.js / theme-poster.js 一致）
 * 数据：ORDER_RANK_COMPUTING2026（data/order-rank-computing2026.js）
 */
const ORDER_RANK_PAGE_W = 430;

function estimateOrderRankPosterHeight(data) {
  const TITLE_H = 72;
  const SUB_H = 28;
  const CARD_HEAD = 32;
  const ROW_H = 34;
  const FOOTER_H = 28;
  const n = (data.companies || []).length;
  return TITLE_H + SUB_H + CARD_HEAD + n * ROW_H + 8 + FOOTER_H;
}

function renderOrderRankPoster(data, containerId, canvasId) {
  const container = document.getElementById(containerId || 'order-rank-poster-pages');
  if (!container || !data) return null;
  container.innerHTML = '';
  const dpr = window.devicePixelRatio || 1;
  const W = ORDER_RANK_PAGE_W;
  const H = estimateOrderRankPosterHeight(data);

  const label = document.createElement('div');
  label.className = 'poster-page-label';
  label.textContent = data.title;
  container.appendChild(label);

  const canvas = document.createElement('canvas');
  canvas.className = 'poster-canvas-item';
  canvas.id = canvasId || 'order-rank-poster-canvas';
  canvas.width = W * dpr;
  canvas.height = H * dpr;
  canvas.style.width = W + 'px';
  canvas.style.height = H + 'px';
  container.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  drawOrderRankPoster(ctx, data, W, H);
  return canvas;
}

function drawOrderRankPoster(ctx, data, W, H) {
  const PAD = 12;
  const TITLE_H = 72;
  const SUB_H = 28;
  const CARD_HEAD = 32;
  const ROW_H = 34;
  const FOOTER_H = 28;
  const CARD_RADIUS = 10;
  const borderBlue = '#4a90c8';
  const barColor = '#1e40af';
  const innerPadX = 10;

  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, '#cfe8fb');
  bg.addColorStop(0.4, '#e3f2fd');
  bg.addColorStop(1, '#f5fbff');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  ctx.save();
  ctx.strokeStyle = 'rgba(37, 99, 235, 0.07)';
  ctx.lineWidth = 1;
  for (let i = 0; i < 22; i++) {
    ctx.beginPath();
    ctx.moveTo(0, i * 40);
    ctx.lineTo(W, i * 40 + 30);
    ctx.stroke();
  }
  ctx.restore();

  let y = 14;
  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 15px "PingFang SC", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(data.title, W / 2, y + 16);
  ctx.font = '9px "PingFang SC", sans-serif';
  ctx.fillStyle = '#475569';
  ctx.fillText(data.subtitle || '', W / 2, y + 34);
  ctx.textAlign = 'left';
  y = TITLE_H + 4;

  const cardW = W - PAD * 2;
  const cardX = PAD;
  const cardH = CARD_HEAD + data.companies.length * ROW_H + 8;

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
  const bgrad = ctx.createLinearGradient(cardX, y, cardX, y + CARD_HEAD);
  bgrad.addColorStop(0, barColor);
  bgrad.addColorStop(1, '#1e3a8a');
  ctx.fillStyle = bgrad;
  ctx.fillRect(cardX, y, cardW, CARD_HEAD);
  ctx.restore();

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 11px "PingFang SC", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText((data.key || '订单') + ' · 订单规模排行', cardX + cardW / 2, y + CARD_HEAD / 2);
  ctx.textBaseline = 'alphabetic';
  ctx.textAlign = 'left';

  let cy = y + CARD_HEAD + 4;
  data.companies.forEach((co, ci) => {
    if (ci > 0) {
      ctx.strokeStyle = '#e8eef5';
      ctx.beginPath();
      ctx.moveTo(cardX + innerPadX, cy + ci * ROW_H);
      ctx.lineTo(cardX + cardW - innerPadX, cy + ci * ROW_H);
      ctx.stroke();
    }

    const rowTop = cy + ci * ROW_H;
    const baseX = cardX + innerPadX;
    const maxLineW = cardW - innerPadX * 2;

    ctx.font = 'bold 10px "PingFang SC", sans-serif';
    ctx.fillStyle = '#1e40af';
    ctx.fillText(String(co.rank) + '.', baseX, rowTop + 12);

    const nameX = baseX + 18;
    const orderStr = co.orderLabel || '';
    const orderGap = 6;

    ctx.font = 'bold 11px "PingFang SC", sans-serif';
    ctx.fillStyle = '#0f172a';
    let nameStr = co.name;
    ctx.font = 'bold 10px "PingFang SC", sans-serif';
    const orderW = ctx.measureText(orderStr).width;
    ctx.font = 'bold 11px "PingFang SC", sans-serif';
    const maxNameW = maxLineW - 18 - orderW - orderGap;
    if (ctx.measureText(nameStr).width > maxNameW) {
      nameStr = fitOneLineWidth(ctx, nameStr, maxNameW);
    }
    ctx.fillText(nameStr, nameX, rowTop + 12);
    const nameW = ctx.measureText(nameStr).width;

    ctx.font = 'bold 10px "PingFang SC", sans-serif';
    ctx.fillStyle = '#1d4ed8';
    ctx.fillText(orderStr, nameX + nameW + orderGap, rowTop + 12);

    ctx.font = '9px "PingFang SC", sans-serif';
    ctx.fillStyle = '#64748b';
    const bullet = '· ' + (co.highlight || '');
    const maxDescW = cardW - innerPadX * 2 - 4;
    ctx.fillText(fitOneLineWidth(ctx, bullet, maxDescW), baseX + 4, rowTop + 26);
  });

  ctx.fillStyle = '#64748b';
  ctx.font = '9px "PingFang SC", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(
    `产业链分析工具 · ${data.generatedAt || ''} · 订单口径来自公开报道 · 仅供参考，不构成投资建议`,
    W / 2,
    H - FOOTER_H / 2 + 2
  );
  ctx.textAlign = 'left';
}

function downloadOrderRankPoster(canvasId, filename) {
  const canvas = document.getElementById(canvasId || 'order-rank-poster-canvas');
  if (!canvas) return;
  const link = document.createElement('a');
  link.download = filename || '算力租赁订单榜-2026.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
}

async function copyOrderRankPoster(canvasId) {
  const canvas = document.getElementById(canvasId || 'order-rank-poster-canvas');
  if (!canvas) return;
  try {
    const blob = await new Promise((res) => canvas.toBlob(res, 'image/png'));
    await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
    alert('✅ 订单榜海报已复制到剪贴板');
  } catch (e) {
    alert('复制失败，请使用下载按钮');
  }
}

function initOrderRankPosterPage(data, containerId, canvasId) {
  if (data) renderOrderRankPoster(data, containerId, canvasId);
}

/** 各产业链订单榜配置（key 与 data/*.js 中 payload.key 一致） */
const ORDER_RANK_POSTER_CONFIG = [
  { key: '算力租赁', wrapId: 'order-rank-computing-wrap', pagesId: 'order-rank-computing-pages', canvasId: 'order-rank-computing-canvas' },
  { key: 'PCB', wrapId: 'order-rank-pcb-wrap', pagesId: 'order-rank-pcb-pages', canvasId: 'order-rank-pcb-canvas' },
  { key: '先进封装', wrapId: 'order-rank-advanced-wrap', pagesId: 'order-rank-advanced-pages', canvasId: 'order-rank-advanced-canvas' },
  { key: '液冷', wrapId: 'order-rank-liquid-cooling-wrap', pagesId: 'order-rank-liquid-cooling-pages', canvasId: 'order-rank-liquid-cooling-canvas' },
  { key: '光互联', wrapId: 'order-rank-optical-interconnect-wrap', pagesId: 'order-rank-optical-interconnect-pages', canvasId: 'order-rank-optical-interconnect-canvas' },
];

function getOrderRankDatasetByKey(key) {
  if (!key) return null;
  if (key === '算力租赁' && typeof ORDER_RANK_COMPUTING2026 !== 'undefined') return ORDER_RANK_COMPUTING2026;
  if (key === 'PCB' && typeof ORDER_RANK_PCB2026 !== 'undefined') return ORDER_RANK_PCB2026;
  if (key === '先进封装' && typeof ORDER_RANK_ADVANCED_PACKAGING2026 !== 'undefined') return ORDER_RANK_ADVANCED_PACKAGING2026;
  if (key === '液冷' && typeof ORDER_RANK_LIQUID_COOLING2026 !== 'undefined') return ORDER_RANK_LIQUID_COOLING2026;
  if (key === '光互联' && typeof ORDER_RANK_OPTICAL_INTERCONNECT2026 !== 'undefined') return ORDER_RANK_OPTICAL_INTERCONNECT2026;
  return null;
}

/** 解析订单榜产业链 key（支持「光学链接」等别名 → 光互联） */
function resolveOrderRankIndustryKey(industry) {
  let key = industry && industry.name;
  const query = typeof currentSearchQuery !== 'undefined' ? currentSearchQuery : '';
  if (typeof searchIndustry === 'function' && query) {
    const resolved = searchIndustry(query);
    if (resolved && resolved.name) key = resolved.name;
  }
  return key || null;
}

function getOrderRankData(industryName) {
  const key = resolveOrderRankIndustryKey({ name: industryName });
  return getOrderRankDatasetByKey(key);
}

function maybeRenderOrderRankPoster(industry) {
  const industryKey = resolveOrderRankIndustryKey(industry);
  const legacyWrap = document.getElementById('order-rank-poster-wrap');
  let matchedConfig = false;

  ORDER_RANK_POSTER_CONFIG.forEach((cfg) => {
    const wrap = document.getElementById(cfg.wrapId);
    if (!wrap) return;
    const show = industryKey === cfg.key;
    wrap.style.display = show ? '' : 'none';
    if (show) {
      matchedConfig = true;
      const data = getOrderRankDatasetByKey(cfg.key);
      if (data) {
        requestAnimationFrame(() => initOrderRankPosterPage(data, cfg.pagesId, cfg.canvasId));
      }
    }
  });

  if (legacyWrap && !matchedConfig) {
    const data = getOrderRankDatasetByKey(industryKey);
    legacyWrap.style.display = data ? '' : 'none';
    if (data) requestAnimationFrame(() => renderOrderRankPoster(data));
  }
}
