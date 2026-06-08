/**
 * 食疗海报 Canvas 绘制
 */
const SHILIAO_POSTER_W = 430;

function getShiliaoPosterLayout() {
  return {
    PAD: 12,
    FOOTER: 22,
    TOP: 30,
    HEADER_H: 56,
    HEADER_INNER: 48,
    FONT_TITLE: 21,
    FONT_SUB: 13,
    SEC_GAP: 5,
    SEC_BAR: 20,
    SEC_BODY_PAD: 6,
    FONT_SEC: 14,
    FONT_BODY: 13,
    EFFECT_ROW: 18,
    CLASSIC_BOOK: 13,
    CLASSIC_BOOK_ROW: 20,
    CLASSIC_QUOTE_GAP: 4,
    FONT_QUOTE: 12,
    QUOTE_LH: 17,
    QUOTE_MAX_LINES: 3,
    CLASSIC_GAP: 10,
    DISH_NAME_ROW: 20,
    DISH_TEXT_ROW: 17,
    DISH_GAP: 8,
    FONT_DISH: 14,
    FONT_DISH_SUB: 12,
    FONT_FOOTER: 10,
    INNER_X: 8,
  };
}

/** 在 topY 行盒内按 alphabetic 基线绘制单行，返回下一行 topY */
function drawTextInRow(ctx, text, x, topY, fontSize, rowH) {
  ctx.fillText(text, x, topY + fontSize);
  return topY + rowH;
}

/** 引文区高度（与 drawWrappedText 首行基线算法一致） */
function classicQuoteHeight(lines, L) {
  return L.CLASSIC_QUOTE_GAP + L.FONT_QUOTE + lines * L.QUOTE_LH;
}

/** 单条古籍总高度 */
function classicItemHeight(lines, L) {
  return L.CLASSIC_BOOK_ROW + classicQuoteHeight(lines, L);
}

/** 估算换行数（与 drawWrappedText 一致） */
function countWrapLines(ctx, text, maxWidth) {
  if (!text) return 0;
  let line = '';
  let lines = 1;
  for (const ch of text) {
    const test = line + ch;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines++;
      line = ch;
    } else {
      line = test;
    }
  }
  return lines;
}

function measureShiliaoSections(ctx, data, innerW) {
  const L = getShiliaoPosterLayout();
  const effectsH = (data.effects || []).length * L.EFFECT_ROW;

  let classicsH = 0;
  (data.classics || []).forEach((c, i) => {
    ctx.font = `${L.FONT_QUOTE}px "PingFang SC", sans-serif`;
    const lines = Math.min(
      L.QUOTE_MAX_LINES,
      countWrapLines(ctx, '「' + c.quote + '」', innerW)
    );
    classicsH += classicItemHeight(lines, L);
    if (i < (data.classics || []).length - 1) classicsH += L.CLASSIC_GAP;
  });

  let dishesH = 0;
  (data.dishes || []).forEach(() => {
    dishesH += L.DISH_NAME_ROW + L.DISH_TEXT_ROW * 2 + L.DISH_GAP;
  });
  if (dishesH > 0) dishesH -= L.DISH_GAP;

  return { effectsH, classicsH, dishesH };
}

function estimateShiliaoPosterHeight(data) {
  const L = getShiliaoPosterLayout();
  const innerW = SHILIAO_POSTER_W - L.PAD * 2 - L.INNER_X * 2;
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const { effectsH, classicsH, dishesH } = measureShiliaoSections(ctx, data, innerW);

  const sectionH = (bodyH) =>
    bodyH > 0 ? L.SEC_BAR + L.SEC_BODY_PAD + bodyH + L.SEC_BODY_PAD : 0;

  let h = L.TOP + L.HEADER_H;
  if (effectsH) h += L.SEC_GAP + sectionH(effectsH);
  if (classicsH) h += L.SEC_GAP + sectionH(classicsH);
  if (dishesH) h += L.SEC_GAP + sectionH(dishesH);
  return h + 10 + L.FOOTER;
}

function renderShiliaoPoster(data) {
  const container = document.getElementById('shiliao-poster-pages');
  if (!container || !data) return;
  container.innerHTML = '';

  const dpr = window.devicePixelRatio || 1;
  const W = SHILIAO_POSTER_W;
  const H = estimateShiliaoPosterHeight(data);

  const label = document.createElement('div');
  label.className = 'poster-page-label';
  label.textContent = `${data.name} · 食疗养生海报`;
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
  drawShiliaoPoster(ctx, data, W, H);
}

function drawShiliaoPoster(ctx, data, W, H) {
  const L = getShiliaoPosterLayout();
  const accent = data.color || '#65a30d';
  const cardW = W - L.PAD * 2;
  const innerW = cardW - L.INNER_X * 2;
  const { effectsH, classicsH, dishesH } = measureShiliaoSections(ctx, data, innerW);

  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, '#ecfdf5');
  bg.addColorStop(0.5, '#f0fdf4');
  bg.addColorStop(1, '#fefce8');
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
  ctx.fillText(`${data.icon || ''} ${data.name} · 食疗养生`, W / 2, y + L.HEADER_INNER * 0.38);
  ctx.font = `${L.FONT_SUB}px "PingFang SC", sans-serif`;
  ctx.fillStyle = 'rgba(255,255,255,0.95)';
  const sub = fitOneLineWidth(ctx, data.summary || '', cardW - 24);
  ctx.fillText(sub, W / 2, y + L.HEADER_INNER * 0.72);
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
    ctx.textBaseline = 'alphabetic';
    ctx.fillText(title, L.PAD + L.INNER_X, y + 15);
    ctx.save();
    ctx.translate(L.PAD + L.INNER_X, y + L.SEC_BAR + L.SEC_BODY_PAD);
    drawBody(innerW);
    ctx.restore();
    y += boxH;
  };

  drawSection('养生作用', effectsH, (w) => {
    let cy = 0;
    ctx.font = `${L.FONT_BODY}px "PingFang SC", sans-serif`;
    ctx.fillStyle = '#1e293b';
    ctx.textBaseline = 'alphabetic';
    (data.effects || []).forEach((e) => {
      const t = fitOneLineWidth(ctx, '· ' + e, w);
      ctx.fillText(t, 0, cy + L.FONT_BODY);
      cy += L.EFFECT_ROW;
    });
  });

  drawSection('古籍记载', classicsH, (w) => {
    let cy = 0;
    (data.classics || []).forEach((c, i) => {
      ctx.font = `bold ${L.CLASSIC_BOOK}px "PingFang SC", sans-serif`;
      ctx.fillStyle = accent;
      const bookBottom = drawTextInRow(ctx, c.book, 0, cy, L.CLASSIC_BOOK, L.CLASSIC_BOOK_ROW);
      ctx.font = `${L.FONT_QUOTE}px "PingFang SC", sans-serif`;
      ctx.fillStyle = '#475569';
      cy = drawWrappedText(
        ctx,
        '「' + c.quote + '」',
        0,
        bookBottom + L.CLASSIC_QUOTE_GAP + L.FONT_QUOTE,
        w,
        L.QUOTE_LH,
        L.QUOTE_MAX_LINES
      );
      if (i < data.classics.length - 1) cy += L.CLASSIC_GAP;
    });
  });

  drawSection('食疗菜品', dishesH, (w) => {
    let cy = 0;
    (data.dishes || []).forEach((d, i) => {
      ctx.font = `bold ${L.FONT_DISH}px "PingFang SC", sans-serif`;
      ctx.fillStyle = '#0f172a';
      cy = drawTextInRow(ctx, d.name, 0, cy, L.FONT_DISH, L.DISH_NAME_ROW);
      ctx.font = `${L.FONT_DISH_SUB}px "PingFang SC", sans-serif`;
      ctx.fillStyle = '#64748b';
      cy = drawTextInRow(ctx, '缓解：' + d.symptom, 0, cy, L.FONT_DISH_SUB, L.DISH_TEXT_ROW);
      cy = drawTextInRow(ctx, fitOneLineWidth(ctx, d.note, w), 0, cy, L.FONT_DISH_SUB, L.DISH_TEXT_ROW);
      if (i < data.dishes.length - 1) cy += L.DISH_GAP;
    });
  });

  ctx.fillStyle = '#64748b';
  ctx.font = `${L.FONT_FOOTER}px "PingFang SC", sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const td = new Date();
  ctx.fillText(
    `食疗养生 · ${td.getFullYear()}年${td.getMonth() + 1}月${td.getDate()}日 · 仅供参考，不构成医疗建议`,
    W / 2,
    H - L.FOOTER / 2
  );
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
}

function downloadShiliaoPoster() {
  const canvas = document.getElementById('shiliao-poster-canvas');
  const data = window._shiliaoCurrentData;
  if (!canvas || !data) {
    alert('请先生成食疗内容并切换到海报页');
    return;
  }
  const type = window._shiliaoContentType;
  const tag =
    type === 'disease'
      ? '对症食疗海报'
      : type === 'organ'
        ? '器官食补海报'
        : type === 'summary'
          ? '食疗汇总海报'
          : '食疗海报';
  const a = document.createElement('a');
  a.download = `${data.name}_${tag}_${new Date().toLocaleDateString('zh-CN')}.png`;
  a.href = canvas.toDataURL('image/png');
  a.click();
}

function copyShiliaoPoster() {
  const canvas = document.getElementById('shiliao-poster-canvas');
  if (!canvas) return;
  canvas.toBlob((blob) => {
    if (!blob) return;
    navigator.clipboard
      .write([new ClipboardItem({ 'image/png': blob })])
      .then(() => alert('✅ 海报已复制到剪贴板'))
      .catch(() => alert('复制失败，请使用下载'));
  });
}
