/**
 * 食疗汇总海报 Canvas 绘制
 */
function getShiliaoSummaryPosterLayout() {
  return {
    PAD: 12,
    FOOTER: 22,
    TOP: 10,
    HEADER_H: 56,
    HEADER_INNER: 48,
    FONT_TITLE: 18,
    FONT_SUB: 11,
    SEC_GAP: 5,
    SEC_BAR: 20,
    SEC_BODY_PAD: 6,
    FONT_SEC: 14,
    PRINCIPLE_LH: 15,
    PRINCIPLE_MAX: 2,
    ITEM_HEAD_ROW: 18,
    BOOK_ROW: 14,
    QUOTE_LH: 12,
    QUOTE_MAX: 2,
    ITEM_GAP: 7,
    FONT_NAME: 15,
    FONT_EFFECT: 11,
    FONT_ITEM: 12,
    FONT_BOOK: 11,
    FONT_QUOTE: 10,
    FONT_FOOTER: 10,
    INNER_X: 8,
  };
}

function measureSummaryItemHeight(ctx, item, innerW, L) {
  ctx.font = `${L.FONT_QUOTE}px "PingFang SC", sans-serif`;
  const lines = Math.min(L.QUOTE_MAX, countWrapLines(ctx, '「' + item.quote + '」', innerW));
  return L.ITEM_HEAD_ROW + L.BOOK_ROW + L.FONT_QUOTE + lines * L.QUOTE_LH;
}

function measureSummaryPosterSections(ctx, data, innerW) {
  const L = getShiliaoSummaryPosterLayout();
  let principleH = 0;
  if (data.principle) {
    ctx.font = `${L.FONT_ITEM}px "PingFang SC", sans-serif`;
    principleH = Math.min(L.PRINCIPLE_MAX, countWrapLines(ctx, data.principle, innerW)) * L.PRINCIPLE_LH;
  }
  let listH = 0;
  (data.items || []).forEach((item, i) => {
    listH += measureSummaryItemHeight(ctx, item, innerW, L);
    if (i < data.items.length - 1) listH += L.ITEM_GAP;
  });
  return { principleH, listH };
}

function estimateShiliaoSummaryPosterHeight(data) {
  const L = getShiliaoSummaryPosterLayout();
  const innerW = SHILIAO_POSTER_W - L.PAD * 2 - L.INNER_X * 2;
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const { principleH, listH } = measureSummaryPosterSections(ctx, data, innerW);
  const sectionH = (bodyH) =>
    bodyH > 0 ? L.SEC_BAR + L.SEC_BODY_PAD + bodyH + L.SEC_BODY_PAD : 0;
  let h = L.TOP + L.HEADER_H;
  if (principleH) h += L.SEC_GAP + sectionH(principleH);
  if (listH) h += L.SEC_GAP + sectionH(listH);
  return h + 10 + L.FOOTER;
}

function renderShiliaoSummaryPoster(data) {
  const container = document.getElementById('shiliao-poster-pages');
  if (!container || !data) return;
  container.innerHTML = '';

  const dpr = window.devicePixelRatio || 1;
  const W = SHILIAO_POSTER_W;
  const H = estimateShiliaoSummaryPosterHeight(data);

  const label = document.createElement('div');
  label.className = 'poster-page-label';
  label.textContent = `${data.listTitle || data.name} · 汇总海报`;
  container.appendChild(label);

  const canvas = document.createElement('canvas');
  canvas.className = 'poster-canvas-item';
  canvas.id = 'shiliao-poster-canvas';
  canvas.width = W * dpr;
  canvas.height = H * dpr;
  canvas.style.width = W + 'px';
  canvas.style.height = H + 'px';
  container.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  drawShiliaoSummaryPoster(ctx, data, W, H);
}

function drawShiliaoSummaryPoster(ctx, data, W, H) {
  const L = getShiliaoSummaryPosterLayout();
  const accent = data.color || '#65a30d';
  const cardW = W - L.PAD * 2;
  const innerW = cardW - L.INNER_X * 2;
  const { principleH, listH } = measureSummaryPosterSections(ctx, data, innerW);

  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, '#fffbeb');
  bg.addColorStop(0.5, '#f0fdf4');
  bg.addColorStop(1, '#ecfeff');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  let y = L.TOP;
  const tg = ctx.createLinearGradient(L.PAD, y, W - L.PAD, y);
  tg.addColorStop(0, accent);
  tg.addColorStop(1, '#15803d');
  roundRect(ctx, L.PAD, y, cardW, L.HEADER_INNER, 10);
  ctx.fillStyle = tg;
  ctx.fill();
  ctx.fillStyle = '#fff';
  ctx.font = `bold ${L.FONT_TITLE}px "PingFang SC", sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const title = data.listTitle || data.name;
  ctx.fillText(`${data.icon || ''} ${title}`, W / 2, y + L.HEADER_INNER * 0.38);
  ctx.font = `${L.FONT_SUB}px "PingFang SC", sans-serif`;
  ctx.fillStyle = 'rgba(255,255,255,0.95)';
  ctx.fillText(fitOneLineWidth(ctx, data.summary || '', cardW - 20), W / 2, y + L.HEADER_INNER * 0.72);
  ctx.textBaseline = 'alphabetic';
  ctx.textAlign = 'left';
  y += L.HEADER_H;

  const drawSection = (title, bodyH, drawBody) => {
    if (!bodyH) return;
    y += L.SEC_GAP;
    const boxH = L.SEC_BAR + L.SEC_BODY_PAD + bodyH + L.SEC_BODY_PAD;
    roundRect(ctx, L.PAD, y, cardW, boxH, 8);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.strokeStyle = accent + '55';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fillStyle = accent;
    ctx.font = `bold ${L.FONT_SEC}px "PingFang SC", sans-serif`;
    ctx.fillText(title, L.PAD + L.INNER_X, y + 15);
    ctx.save();
    ctx.translate(L.PAD + L.INNER_X, y + L.SEC_BAR + L.SEC_BODY_PAD);
    drawBody(innerW);
    ctx.restore();
    y += boxH;
  };

  drawSection('选用原则', principleH, (w) => {
    if (!data.principle) return;
    ctx.font = `${L.FONT_ITEM}px "PingFang SC", sans-serif`;
    ctx.fillStyle = '#334155';
    drawWrappedText(ctx, data.principle, 0, L.FONT_ITEM, w, L.PRINCIPLE_LH, L.PRINCIPLE_MAX);
  });

  drawSection('食材与古籍', listH, (w) => {
    let cy = 0;
    (data.items || []).forEach((item, i) => {
      const rowTop = cy;
      const prefix = `${item.rank}. ${item.name} — `;
      ctx.font = `bold ${L.FONT_NAME}px "PingFang SC", sans-serif`;
      ctx.fillStyle = '#15803d';
      const prefixText = fitOneLineWidth(ctx, prefix, w);
      const prefixW = ctx.measureText(prefixText).width;
      ctx.fillText(prefixText, 0, rowTop + L.FONT_NAME);
      ctx.font = `${L.FONT_EFFECT}px "PingFang SC", sans-serif`;
      ctx.fillStyle = '#94a3b8';
      const effectText = fitOneLineWidth(ctx, item.effect, Math.max(0, w - prefixW));
      ctx.fillText(effectText, prefixW, rowTop + L.FONT_NAME);
      cy = rowTop + L.ITEM_HEAD_ROW;
      ctx.font = `bold ${L.FONT_BOOK}px "PingFang SC", sans-serif`;
      ctx.fillStyle = accent;
      cy = drawTextInRow(ctx, item.book, 0, cy, L.FONT_BOOK, L.BOOK_ROW);
      ctx.font = `${L.FONT_QUOTE}px "PingFang SC", sans-serif`;
      ctx.fillStyle = '#64748b';
      const quoteBaseline = cy + L.FONT_QUOTE;
      cy = drawWrappedText(ctx, '「' + item.quote + '」', 0, quoteBaseline, w, L.QUOTE_LH, L.QUOTE_MAX);
      if (i < data.items.length - 1) cy += L.ITEM_GAP;
    });
  });

  ctx.fillStyle = '#64748b';
  ctx.font = `${L.FONT_FOOTER}px "PingFang SC", sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const td = new Date();
  ctx.fillText(
    `食疗汇总 · ${td.getFullYear()}年${td.getMonth() + 1}月${td.getDate()}日 · 仅供参考`,
    W / 2,
    H - L.FOOTER / 2
  );
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
}
