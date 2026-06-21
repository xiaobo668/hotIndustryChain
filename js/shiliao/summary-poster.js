/**
 * 饮食汇总海报 Canvas 绘制（紧凑双列）
 */
function getShiliaoSummaryPosterLayout() {
  return {
    PAD: 10,
    FOOTER: 18,
    TOP: 30,
    HEADER_PAD: 10,
    HEADER_TITLE_GAP: 6,
    HEADER_AFTER: 4,
    FONT_TITLE: 20,
    FONT_SUB: 12,
    SEC_GAP: 4,
    SEC_BAR: 18,
    SEC_BODY_PAD: 5,
    FONT_SEC: 14,
    PRINCIPLE_LH: 17,
    PRINCIPLE_MAX: 3,
    DESC_MAX: 3,
    DESC_LH: 16,
    NAME_GAP: 5,
    ITEM_GAP: 10,
    ITEM_BOTTOM_PAD: 4,
    COL_GAP: 10,
    FONT_NAME: 15,
    NAME_COLOR: '#0f172a',
    NAME_EFFECT_GAP: 6,
    FONT_EFFECT: 12,
    FONT_BOOK: 12,
    FONT_ITEM: 13,
    FONT_FOOTER: 11,
    INNER_X: 6,
    RANK_SIZE: 18,
    FONT_RANK: 11,
    SUB_MAX: 3,
    SUB_LH: 15,
  };
}

/** 与 drawSummaryItemCompact 逐行对齐的高度测算，避免双列行距不足导致重叠 */
function measureSummaryItemH(ctx, item, w, L) {
  const tw = w - L.RANK_SIZE - 6;
  let h = measureInlineNameEffectH(ctx, item.name, item.effect, tw, L) + L.NAME_GAP + L.FONT_BOOK;

  if (item.quote) {
    ctx.font = `${L.FONT_BOOK}px "PingFang SC", sans-serif`;
    const quoteLines = clampWrapLines(ctx, '「' + item.quote + '」', tw, L.DESC_MAX);
    if (quoteLines) h += L.NAME_GAP + L.FONT_BOOK + measureWrappedBlockH(quoteLines, L.DESC_LH);
  }

  return h + L.ITEM_BOTTOM_PAD;
}

function measureSummaryPosterSections(ctx, data, innerW) {
  const L = getShiliaoSummaryPosterLayout();
  let principleH = 0;
  if (data.principle) {
    ctx.font = `${L.FONT_ITEM}px "PingFang SC", sans-serif`;
    principleH = Math.min(L.PRINCIPLE_MAX, countWrapLines(ctx, data.principle, innerW)) * L.PRINCIPLE_LH;
  }
  const colW = (innerW - L.COL_GAP) / 2;
  const listH = measureTwoColVariable(ctx, data.items || [], colW, L.ITEM_GAP, measureSummaryItemH, L, null);
  return { principleH, listH };
}

function estimateShiliaoSummaryPosterHeight(data) {
  const L = getShiliaoSummaryPosterLayout();
  const innerW = SHILIAO_POSTER_W - L.PAD * 2 - L.INNER_X * 2;
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const { principleH, listH } = measureSummaryPosterSections(ctx, data, innerW);
  const sectionH = (bodyH) =>
    bodyH > 0 ? L.SEC_BAR + L.SEC_BODY_PAD * 2 + bodyH : 0;
  const cardW = SHILIAO_POSTER_W - L.PAD * 2;
  const { advance: headerH } = measureShiliaoPosterHeaderH(ctx, data.summary || '', cardW - 20, L);
  let h = L.TOP + headerH;
  if (principleH) h += L.SEC_GAP + sectionH(principleH);
  if (listH) h += L.SEC_GAP + sectionH(listH);
  return h + 6 + L.FOOTER;
}

function drawSummaryItemCompact(ctx, item, x, topY, w, L, accent) {
  const itemH = measureSummaryItemH(ctx, item, w, L);
  const r = L.RANK_SIZE;
  const tx = x + r + 6;
  const tw = w - r - 6;

  ctx.fillStyle = 'rgba(255,255,255,0.72)';
  roundRect(ctx, x, topY, w, itemH, 5);
  ctx.fill();
  ctx.strokeStyle = 'rgba(21,128,61,0.12)';
  ctx.lineWidth = 0.5;
  roundRect(ctx, x, topY, w, itemH, 5);
  ctx.stroke();

  ctx.fillStyle = accent;
  roundRect(ctx, x + 4, topY + 4, r, r, 4);
  ctx.fill();
  ctx.fillStyle = '#fff';
  ctx.font = `bold ${L.FONT_RANK}px "PingFang SC", sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(String(item.rank), x + 4 + r / 2, topY + 4 + r / 2);
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';

  let cy = drawInlineNameEffect(ctx, item.name, item.effect, tx, topY, tw, L);
  cy += L.NAME_GAP;
  if (item.book) {
    ctx.font = `bold ${L.FONT_BOOK}px "PingFang SC", sans-serif`;
    ctx.fillStyle = accent;
    ctx.fillText(item.book, tx, cy + L.FONT_BOOK);
  }

  if (item.quote) {
    ctx.font = `${L.FONT_BOOK}px "PingFang SC", sans-serif`;
    ctx.fillStyle = '#475569';
    const quoteY = item.book
      ? cy + L.FONT_BOOK + L.NAME_GAP + L.FONT_BOOK
      : cy + L.FONT_BOOK;
    drawWrappedText(ctx, '「' + item.quote + '」', tx, quoteY, tw, L.DESC_LH, L.DESC_MAX);
  }
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
  const title = data.listTitle || data.name;
  y = drawShiliaoPosterHeader(
    ctx,
    y,
    `${data.icon || ''} ${title}`,
    data.summary,
    W,
    cardW,
    L.PAD,
    L,
    accent,
    8,
    cardW - 20
  );

  const secOpts = { L, accent, cardW, pad: L.PAD, innerW };

  y = drawShiliaoPosterSection(ctx, y, '选用原则', principleH, (w) => {
    if (!data.principle) return;
    ctx.font = `${L.FONT_ITEM}px "PingFang SC", sans-serif`;
    ctx.fillStyle = '#334155';
    drawWrappedText(ctx, data.principle, 0, L.FONT_ITEM, w, L.PRINCIPLE_LH, L.PRINCIPLE_MAX);
  }, secOpts);

  drawShiliaoPosterSection(ctx, y, '食材与古籍', listH, (w) => {
    drawTwoColVariable(
      ctx,
      data.items || [],
      w,
      L,
      drawSummaryItemCompact,
      measureSummaryItemH,
      L.ITEM_GAP,
      accent
    );
  }, secOpts);

  ctx.fillStyle = '#94a3b8';
  ctx.font = `${L.FONT_FOOTER}px "PingFang SC", sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const td = new Date();
  ctx.fillText(
    `饮食汇总 · ${td.getFullYear()}年${td.getMonth() + 1}月${td.getDate()}日 · 仅供参考`,
    W / 2,
    H - L.FOOTER / 2
  );
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
}
