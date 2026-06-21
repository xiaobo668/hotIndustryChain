/**
 * 健康饮食 · Top10 榜单海报 Canvas 绘制
 * 列表：左栏序号+食材名（加粗），右栏说明（小一号、不加粗）
 */
function getShiliaoListPosterLayout() {
  return {
    W: SHILIAO_LIST_POSTER_W,
    PAD: 28,
    TOP: 40,
    TITLE_SIZE: 26,
    SUBTITLE_GAP: 4,
    TITLE_BOTTOM: 16,
    ITEM_GAP: 4,
    BODY_SIZE: 16,
    DESC_SIZE: 14,
    BODY_LINE_H: 28,
    DESC_LINE_H: 24,
    COL_GAP: 0,
    BOTTOM_PAD: 50,
    FOOTER_SIZE: 12,
    FOOTER_BOTTOM: 30,
    FOOTER_H: 56,
  };
}


function computeMaxLabelWidth(ctx, items, L) {
  ctx.font = `bold ${L.BODY_SIZE}px "PingFang SC", sans-serif`;
  let maxW = 0;
  (items || []).forEach((raw, i) => {
    const label = `${i + 1}. ${raw.name}：`;
    maxW = Math.max(maxW, ctx.measureText(label).width);
  });
  return Math.ceil(maxW);
}

function getListColumnMetrics(L, ctx, items) {
  const innerW = L.W - L.PAD * 2;
  const labelColW = ctx && items && items.length ? computeMaxLabelWidth(ctx, items, L) : 0;
  const descW = Math.max(120, innerW - labelColW - L.COL_GAP);
  const descX = L.PAD + labelColW + L.COL_GAP;
  return { labelColW, descW, descX };
}

function wrapListTextLines(ctx, text, maxW) {
  const desc = text || '';
  if (!desc) return [''];
  const safeW = Math.max(60, maxW);
  const lines = [];
  let line = '';
  for (const ch of desc) {
    const test = line + ch;
    if (ctx.measureText(test).width > safeW && line) {
      lines.push(line);
      line = ch;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines.length ? lines : [''];
}

function measureListItemLines(ctx, item, descW, L) {
  ctx.font = `${L.DESC_SIZE}px "PingFang SC", sans-serif`;
  return wrapListTextLines(ctx, item.desc, descW).length;
}

function estimateShiliaoListPosterHeight(topic, theme) {
  const L = getShiliaoListPosterLayout();
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const items = topic.items || [];
  const { descW } = getListColumnMetrics(L, ctx, items);

  let h = L.TOP + L.TITLE_SIZE + L.TITLE_BOTTOM;
  if (topic.subtitle) h += L.SUBTITLE_GAP + L.DESC_SIZE;

  items.forEach((raw, i) => {
    const item = { rank: i + 1, name: raw.name, desc: raw.desc };
    const lines = measureListItemLines(ctx, item, descW, L);
    const rowH = Math.max(L.BODY_SIZE, lines * L.DESC_LINE_H);
    h += rowH + L.ITEM_GAP;
  });

  h += L.BOTTOM_PAD;
  if (theme.bottomDecor && theme.bottomDecor !== 'none') h += L.FOOTER_H;
  return Math.max(h, 560);
}

function drawListPosterLeaves(ctx, W, H) {
  ctx.save();
  ctx.globalAlpha = 0.18;
  ctx.fillStyle = '#6b9b4a';
  for (let i = 0; i < 5; i++) {
    const x = 20 + i * 72;
    const y = H - 40 - (i % 2) * 12;
    ctx.beginPath();
    ctx.ellipse(x, y, 28, 14, -0.3, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawListPosterPlayful(ctx, W, H) {
  ctx.save();
  ctx.globalAlpha = 0.35;
  ctx.fillStyle = '#f9a8d4';
  ctx.beginPath();
  ctx.ellipse(W - 70, H - 55, 42, 42, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#fda4af';
  ctx.beginPath();
  ctx.ellipse(W - 95, H - 55, 42, 42, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#93c5fd';
  [[W - 120, H - 100], [W - 50, H - 110], [W - 85, H - 130]].forEach(([x, y]) => {
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.restore();
}

function drawListPosterQuoteMarks(ctx, W, y, color) {
  ctx.save();
  ctx.fillStyle = color || '#c5ddd0';
  ctx.font = 'bold 56px Georgia, serif';
  ctx.textAlign = 'left';
  ctx.fillText('“', 18, y + 8);
  ctx.textAlign = 'right';
  ctx.fillText('”', W - 18, y + 8);
  ctx.restore();
}

function drawListItem(ctx, item, x, y, metrics, theme, L) {
  const { descW, descX } = metrics;
  const label = `${item.rank}. ${item.name}：`;

  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.font = `bold ${L.BODY_SIZE}px "PingFang SC", sans-serif`;
  ctx.fillStyle = theme.keyword;
  ctx.fillText(label, x, y);

  ctx.font = `${L.DESC_SIZE}px "PingFang SC", sans-serif`;
  ctx.fillStyle = theme.desc || '#333333';
  const lines = wrapListTextLines(ctx, item.desc, descW);

  lines.forEach((line, i) => {
    ctx.fillText(line, descX, y + i * L.DESC_LINE_H);
  });

  const rowH = Math.max(L.BODY_SIZE, lines.length * L.DESC_LINE_H);
  return y + rowH;
}

function drawShiliaoListPoster(ctx, topic, theme, W, H) {
  const L = getShiliaoListPosterLayout();
  const items = topic.items || [];
  const metrics = getListColumnMetrics(L, ctx, items);

  ctx.fillStyle = theme.bg;
  ctx.fillRect(0, 0, W, H);

  if (theme.noteStyle) {
    ctx.strokeStyle = 'rgba(0,0,0,0.06)';
    ctx.lineWidth = 1;
    ctx.strokeRect(12, 12, W - 24, H - 24);
  }

  let y = L.TOP;

  if (theme.quoteMarks) {
    drawListPosterQuoteMarks(ctx, W, y - 6, theme.quoteColor);
  }

  const titleText = topic.title + (theme.titleSparkle ? ' ✨' : '');
  ctx.font = `bold ${L.TITLE_SIZE}px "PingFang SC", sans-serif`;
  ctx.fillStyle = theme.title;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.fillText(titleText, W / 2, y);
  y += L.TITLE_SIZE;

  if (topic.subtitle) {
    y += L.SUBTITLE_GAP;
    ctx.font = `${L.DESC_SIZE}px "PingFang SC", sans-serif`;
    ctx.fillStyle = theme.noteStyle ? '#666666' : theme.desc || '#666666';
    ctx.fillText(`（${topic.subtitle}）`, W / 2, y);
    y += L.DESC_SIZE;
  }

  y += L.TITLE_BOTTOM;

  ctx.textAlign = 'left';
  items.forEach((raw, i) => {
    const item = { rank: i + 1, name: raw.name, desc: raw.desc };
    const nextY = drawListItem(ctx, item, L.PAD, y, metrics, theme, L);
    y = nextY + L.ITEM_GAP;
  });

  if (theme.bottomDecor === 'leaves') drawListPosterLeaves(ctx, W, H);
  if (theme.bottomDecor === 'playful') drawListPosterPlayful(ctx, W, H);

  ctx.font = `${L.FOOTER_SIZE}px "PingFang SC", sans-serif`;
  ctx.fillStyle = 'rgba(80,80,80,0.5)';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'bottom';
  ctx.fillText('健康饮食 · 仅供参考', W / 2, H - L.FOOTER_BOTTOM);
}

function renderShiliaoListPoster(topic, theme, containerId, canvasId) {
  const container = document.getElementById(containerId || 'shiliao-list-poster-pages');
  if (!container || !topic) return;

  const th = theme || getShiliaoListTheme(topic.defaultTheme || 'green');
  const L = getShiliaoListPosterLayout();
  const W = L.W;
  const H = estimateShiliaoListPosterHeight(topic, th);
  const dpr = window.devicePixelRatio || 1;

  container.innerHTML = '';
  const label = document.createElement('div');
  label.className = 'poster-page-label';
  label.textContent = `${topic.title} · ${th.name}模版`;
  container.appendChild(label);

  const canvas = document.createElement('canvas');
  canvas.width = W * dpr;
  canvas.height = H * dpr;
  canvas.id = canvasId || 'shiliao-list-poster-canvas';
  canvas.className = 'poster-canvas-item';
  canvas.style.width = W + 'px';
  canvas.style.height = H + 'px';
  container.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  drawShiliaoListPoster(ctx, topic, th, W, H);
}

function downloadShiliaoListPoster(canvasId, filename) {
  const canvas = document.getElementById(canvasId || 'shiliao-list-poster-canvas');
  if (!canvas) {
    alert('请先生成榜单海报');
    return;
  }
  const a = document.createElement('a');
  a.download = filename || '健康饮食榜单.png';
  a.href = canvas.toDataURL('image/png');
  a.click();
}

function copyShiliaoListPoster(canvasId) {
  const canvas = document.getElementById(canvasId || 'shiliao-list-poster-canvas');
  if (!canvas) return;
  canvas.toBlob((blob) => {
    if (!blob) return;
    navigator.clipboard
      .write([new ClipboardItem({ 'image/png': blob })])
      .then(() => alert('✅ 海报已复制到剪贴板'))
      .catch(() => alert('复制失败，请使用下载'));
  });
}
