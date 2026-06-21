/**
 * 健康饮食海报 Canvas 绘制
 */
const SHILIAO_POSTER_W = 430;

function getShiliaoPosterLayout() {
  return {
    PAD: 10,
    FOOTER: 18,
    TOP: 30,
    HEADER_PAD: 10,
    HEADER_TITLE_GAP: 6,
    HEADER_AFTER: 4,
    FONT_TITLE: 21,
    FONT_SUB: 13,
    SEC_GAP: 4,
    SEC_BAR: 18,
    SEC_BODY_PAD: 5,
    FONT_SEC: 14,
    FONT_BODY: 14,
    EFFECT_ROW: 18,
    COL_GAP: 10,
    CLASSIC_BOOK: 13,
    CLASSIC_BOOK_ROW: 18,
    CLASSIC_QUOTE_GAP: 3,
    FONT_QUOTE: 12,
    QUOTE_LH: 17,
    QUOTE_MAX_LINES: 3,
    CLASSIC_GAP: 6,
    DESC_MAX: 3,
    DESC_LH: 15,
    NAME_GAP: 4,
    DISH_GAP: 5,
    SUB_MAX: 3,
    SUB_LH: 15,
    FONT_DISH: 14,
    FONT_DISH_SUB: 12,
    FONT_FOOTER: 11,
    INNER_X: 6,
  };
}

/** 在 topY 行盒内按 alphabetic 基线绘制单行，返回下一行 topY */
function drawTextInRow(ctx, text, x, topY, fontSize, rowH) {
  ctx.fillText(text, x, topY + fontSize);
  return topY + rowH;
}

/** 双列列表总高度（固定行高） */
function measureTwoColRows(count, rowH, gap) {
  if (!count) return 0;
  const rows = Math.ceil(count / 2);
  return rows * rowH + Math.max(0, rows - 1) * gap;
}

/** 说明文字最多行数 */
function clampWrapLines(ctx, text, maxW, maxLines) {
  if (!text) return 0;
  return Math.min(maxLines || 3, countWrapLines(ctx, text, maxW));
}

function measureWrappedBlockH(lines, lineH) {
  return lines > 0 ? lines * lineH : 0;
}

/** 食材名后接说明的行数（首行扣除名称宽度） */
function countInlineNameEffectLines(ctx, name, effect, maxW, L) {
  if (!effect) return 0;
  ctx.font = `bold ${L.FONT_NAME}px "PingFang SC", sans-serif`;
  const nameW = ctx.measureText(name).width;
  const gap = L.NAME_EFFECT_GAP || 6;
  ctx.font = `${L.FONT_EFFECT}px "PingFang SC", sans-serif`;
  let line = '';
  let lineW = Math.max(20, maxW - nameW - gap);
  let lines = 1;
  for (const ch of effect) {
    const test = line + ch;
    if (ctx.measureText(test).width > lineW && line) {
      if (lines >= L.DESC_MAX) return lines;
      lines++;
      line = ch;
      lineW = maxW;
    } else {
      line = test;
    }
  }
  return lines;
}

/** 食材名 + 同行说明 的高度 */
function measureInlineNameEffectH(ctx, name, effect, maxW, L) {
  if (!effect) return L.FONT_NAME;
  const lines = countInlineNameEffectLines(ctx, name, effect, maxW, L);
  return lines <= 1
    ? Math.max(L.FONT_NAME, L.FONT_EFFECT)
    : L.FONT_NAME + (lines - 1) * L.DESC_LH;
}

/** 食材名（醒目色）+ 说明紧随其后，说明过长自动换行 */
function drawInlineNameEffect(ctx, name, effect, x, topY, maxW, L) {
  const baseY = topY + L.FONT_NAME;
  ctx.font = `bold ${L.FONT_NAME}px "PingFang SC", sans-serif`;
  ctx.fillStyle = L.NAME_COLOR || '#0f172a';
  ctx.fillText(name, x, baseY);
  if (!effect) return topY + L.FONT_NAME;

  const nameW = ctx.measureText(name).width;
  const gap = L.NAME_EFFECT_GAP || 6;
  ctx.font = `${L.FONT_EFFECT}px "PingFang SC", sans-serif`;
  ctx.fillStyle = '#64748b';

  let line = '';
  let cx = x + nameW + gap;
  let lineW = Math.max(20, maxW - nameW - gap);
  let lineCount = 0;
  let currentY = baseY;
  const maxLines = L.DESC_MAX;

  for (const ch of effect) {
    const test = line + ch;
    if (ctx.measureText(test).width > lineW && line) {
      if (lineCount >= maxLines - 1) {
        let t = line;
        while (t.length > 1 && ctx.measureText(t + '...').width > lineW) t = t.slice(0, -1);
        ctx.fillText(t + '...', cx, currentY);
        return topY + L.FONT_NAME + lineCount * L.DESC_LH + L.DESC_LH;
      }
      ctx.fillText(line, cx, currentY);
      line = ch;
      cx = x;
      lineW = maxW;
      currentY += L.DESC_LH;
      lineCount++;
    } else {
      line = test;
    }
  }
  if (line) ctx.fillText(line, cx, currentY);
  const lines = lineCount + 1;
  return lines <= 1
    ? topY + Math.max(L.FONT_NAME, L.FONT_EFFECT)
    : topY + L.FONT_NAME + (lines - 1) * L.DESC_LH;
}

/** 双列可变高度列表 */
function measureTwoColVariable(ctx, items, colW, gap, measureFn, L, extra) {
  let total = 0;
  for (let i = 0; i < items.length; i += 2) {
    let h = measureFn(ctx, items[i], colW, L, extra);
    if (items[i + 1]) h = Math.max(h, measureFn(ctx, items[i + 1], colW, L, extra));
    total += h;
    if (i + 2 < items.length) total += gap;
  }
  return total;
}

function drawTwoColVariable(ctx, items, innerW, L, drawFn, measureFn, gap, extra) {
  const colW = (innerW - L.COL_GAP) / 2;
  let cy = 0;
  for (let i = 0; i < items.length; i += 2) {
    drawFn(ctx, items[i], 0, cy, colW, L, extra);
    if (items[i + 1]) drawFn(ctx, items[i + 1], colW + L.COL_GAP, cy, colW, L, extra);
    let h = measureFn(ctx, items[i], colW, L, extra);
    if (items[i + 1]) h = Math.max(h, measureFn(ctx, items[i + 1], colW, L, extra));
    cy += h;
    if (i + 2 < items.length) cy += gap;
  }
}

/** 居中多行说明文字 */
function drawCenteredWrap(ctx, text, cx, topY, maxW, fontSize, lineH, maxLines) {
  if (!text) return topY;
  const lines = [];
  let line = '';
  for (const ch of text) {
    const test = line + ch;
    if (ctx.measureText(test).width > maxW && line) {
      lines.push(line);
      line = ch;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  const shown = lines.slice(0, maxLines);
  if (lines.length > maxLines) {
    let t = shown[maxLines - 1];
    while (t.length > 1 && ctx.measureText(t + '...').width > maxW) t = t.slice(0, -1);
    shown[maxLines - 1] = t + '...';
  }
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  let y = topY + fontSize;
  shown.forEach((ln) => {
    ctx.fillText(ln, cx, y);
    y += lineH;
  });
  ctx.textAlign = 'left';
  return y;
}

function measureCenteredWrapH(ctx, text, maxW, fontSize, lineH, maxLines) {
  if (!text) return 0;
  const n = clampWrapLines(ctx, text, maxW, maxLines);
  return n > 0 ? fontSize + (n - 1) * lineH : 0;
}

/** 头部渐变区高度（含上下内边距） */
function measureShiliaoPosterHeaderH(ctx, summary, contentW, L) {
  const pad = L.HEADER_PAD;
  const titleGap = L.HEADER_TITLE_GAP;
  ctx.font = `${L.FONT_SUB}px "PingFang SC", sans-serif`;
  const subH = summary
    ? measureCenteredWrapH(ctx, summary, contentW, L.FONT_SUB, L.SUB_LH, L.SUB_MAX)
    : 0;
  const inner = pad * 2 + L.FONT_TITLE + (subH ? titleGap + subH : 0);
  return { inner, advance: inner + L.HEADER_AFTER };
}

/** 绘制头部渐变标题区，返回下一区块起始 y */
function drawShiliaoPosterHeader(ctx, y, title, summary, W, cardW, padX, L, accent, radius, contentW) {
  const { inner } = measureShiliaoPosterHeaderH(ctx, summary, contentW, L);
  const tg = ctx.createLinearGradient(padX, y, padX + cardW, y);
  tg.addColorStop(0, accent);
  tg.addColorStop(1, '#15803d');
  roundRect(ctx, padX, y, cardW, inner, radius);
  ctx.fillStyle = tg;
  ctx.fill();

  ctx.fillStyle = '#fff';
  ctx.font = `bold ${L.FONT_TITLE}px "PingFang SC", sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(title, W / 2, y + L.HEADER_PAD + L.FONT_TITLE / 2);

  ctx.font = `${L.FONT_SUB}px "PingFang SC", sans-serif`;
  ctx.fillStyle = 'rgba(255,255,255,0.95)';
  const subTop = y + L.HEADER_PAD + L.FONT_TITLE + L.HEADER_TITLE_GAP;
  drawCenteredWrap(ctx, summary || '', W / 2, subTop, contentW, L.FONT_SUB, L.SUB_LH, L.SUB_MAX);
  ctx.textBaseline = 'alphabetic';
  ctx.textAlign = 'left';

  return y + inner + L.HEADER_AFTER;
}

function dishSubText(d, mode) {
  return mode === 'ingredient'
    ? '适合：' + (d.symptom || '') + (d.note ? ' · ' + d.note : '')
    : (d.ingredients ? d.ingredients + ' · ' : '') + (d.note || '');
}

/** 健康饮食海报统一区块：左色条 + 紧凑标题 */
function drawShiliaoPosterSection(ctx, y, title, bodyH, drawBody, opts) {
  const { L, accent, cardW, pad, innerW } = opts;
  if (!bodyH) return y;
  y += L.SEC_GAP;
  const boxH = L.SEC_BAR + L.SEC_BODY_PAD * 2 + bodyH;
  roundRect(ctx, pad, y, cardW, boxH, 6);
  ctx.fillStyle = '#ffffff';
  ctx.fill();
  ctx.strokeStyle = accent + '35';
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.fillStyle = accent;
  roundRect(ctx, pad, y + 6, 3, boxH - 12, 2);
  ctx.fill();
  ctx.font = `bold ${L.FONT_SEC}px "PingFang SC", sans-serif`;
  const tw = ctx.measureText(title).width;
  ctx.fillStyle = accent + '14';
  roundRect(ctx, pad + L.INNER_X, y + 3, tw + 10, L.SEC_BAR - 2, 4);
  ctx.fill();
  ctx.fillStyle = accent;
  ctx.textBaseline = 'alphabetic';
  ctx.fillText(title, pad + L.INNER_X + 5, y + L.SEC_BAR - 1);
  ctx.save();
  ctx.translate(pad + L.INNER_X, y + L.SEC_BAR + L.SEC_BODY_PAD);
  drawBody(innerW);
  ctx.restore();
  return y + boxH;
}

function measureIngItemH(ctx, ing, w, L) {
  let h = L.FONT_ING;
  ctx.font = `${L.FONT_ING_ROLE}px "PingFang SC", sans-serif`;
  const lines = clampWrapLines(ctx, ing.role || '', w, L.DESC_MAX);
  if (lines) h += L.NAME_GAP + measureWrappedBlockH(lines, L.DESC_LH);
  return h;
}

/** 食材：名称 + 说明换行（最多3行） */
function drawIngInline(ctx, ing, x, topY, w, L, accent) {
  ctx.textBaseline = 'alphabetic';
  ctx.font = `bold ${L.FONT_ING}px "PingFang SC", sans-serif`;
  ctx.fillStyle = accent;
  ctx.fillText(ing.name, x, topY + L.FONT_ING);
  if (ing.role) {
    ctx.font = `${L.FONT_ING_ROLE}px "PingFang SC", sans-serif`;
    ctx.fillStyle = '#64748b';
    drawWrappedText(
      ctx,
      ing.role,
      x,
      topY + L.FONT_ING + L.NAME_GAP + L.FONT_ING_ROLE,
      w,
      L.DESC_LH,
      L.DESC_MAX
    );
  }
}

function drawTwoColIngs(ctx, items, innerW, L, accent) {
  drawTwoColVariable(ctx, items, innerW, L, drawIngInline, measureIngItemH, L.ING_GAP, accent);
}

function measureDishCompactH(ctx, d, w, L, mode) {
  let h = L.FONT_DISH;
  ctx.font = `${L.FONT_DISH_SUB}px "PingFang SC", sans-serif`;
  const lines = clampWrapLines(ctx, dishSubText(d, mode), w, L.DESC_MAX);
  if (lines) h += L.NAME_GAP + measureWrappedBlockH(lines, L.DESC_LH);
  return h;
}

/** 菜品：名 + 说明换行（最多3行） */
function drawDishCompact(ctx, d, x, topY, w, L, mode) {
  ctx.textBaseline = 'alphabetic';
  ctx.font = `bold ${L.FONT_DISH}px "PingFang SC", sans-serif`;
  ctx.fillStyle = '#0f172a';
  ctx.fillText(d.name, x, topY + L.FONT_DISH);
  const sub = dishSubText(d, mode);
  if (sub) {
    ctx.font = `${L.FONT_DISH_SUB}px "PingFang SC", sans-serif`;
    ctx.fillStyle = '#64748b';
    drawWrappedText(
      ctx,
      sub,
      x,
      topY + L.FONT_DISH + L.NAME_GAP + L.FONT_DISH_SUB,
      w,
      L.DESC_LH,
      L.DESC_MAX
    );
  }
}

function drawTwoColDishes(ctx, items, innerW, L, mode) {
  drawTwoColVariable(ctx, items, innerW, L, drawDishCompact, measureDishCompactH, L.DISH_GAP, mode);
}

function measureEffectItemH(ctx, e, colW, L) {
  ctx.font = `${L.FONT_BODY}px "PingFang SC", sans-serif`;
  const lines = clampWrapLines(ctx, '· ' + e, colW, L.DESC_MAX);
  return Math.max(L.FONT_BODY, measureWrappedBlockH(lines, L.DESC_LH));
}

function drawEffectItem(ctx, e, x, topY, w, L) {
  ctx.font = `${L.FONT_BODY}px "PingFang SC", sans-serif`;
  ctx.fillStyle = '#334155';
  ctx.textBaseline = 'alphabetic';
  drawWrappedText(ctx, '· ' + e, x, topY + L.FONT_BODY, w, L.DESC_LH, L.DESC_MAX);
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
  const colW = (innerW - L.COL_GAP) / 2;
  const effectsH = measureTwoColVariable(ctx, data.effects || [], colW, 3, measureEffectItemH, L);

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

  const dishesH = measureTwoColVariable(
    ctx,
    data.dishes || [],
    colW,
    L.DISH_GAP,
    measureDishCompactH,
    L,
    'ingredient'
  );

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

  const cardW = SHILIAO_POSTER_W - L.PAD * 2;
  const { advance: headerH } = measureShiliaoPosterHeaderH(ctx, data.summary || '', cardW - 24, L);
  let h = L.TOP + headerH;
  if (effectsH) h += L.SEC_GAP + sectionH(effectsH);
  if (classicsH) h += L.SEC_GAP + sectionH(classicsH);
  if (dishesH) h += L.SEC_GAP + sectionH(dishesH);
  return h + 6 + L.FOOTER;
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
  label.textContent = `${data.name} · 健康饮食海报`;
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
  y = drawShiliaoPosterHeader(
    ctx,
    y,
    `${data.icon || ''} ${data.name} · 健康饮食`,
    data.summary,
    W,
    cardW,
    L.PAD,
    L,
    accent,
    10,
    cardW - 24
  );

  const secOpts = { L, accent, cardW, pad: L.PAD, innerW };

  y = drawShiliaoPosterSection(ctx, y, '养生作用', effectsH, (w) => {
    drawTwoColVariable(ctx, data.effects || [], w, L, drawEffectItem, measureEffectItemH, 3, null);
  }, secOpts);

  y = drawShiliaoPosterSection(ctx, y, '古籍记载', classicsH, (w) => {
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
  }, secOpts);

  drawShiliaoPosterSection(ctx, y, '推荐菜品', dishesH, (w) => {
    drawTwoColDishes(ctx, data.dishes || [], w, L, 'ingredient');
  }, secOpts);

  ctx.fillStyle = '#64748b';
  ctx.font = `${L.FONT_FOOTER}px "PingFang SC", sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const td = new Date();
  ctx.fillText(
    `健康饮食 · ${td.getFullYear()}年${td.getMonth() + 1}月${td.getDate()}日 · 仅供参考`,
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
    alert('请先生成饮食内容并切换到海报页');
    return;
  }
  const type = window._shiliaoContentType;
  const tag =
    type === 'disease'
      ? '场景饮食海报'
      : type === 'organ'
        ? '营养侧重海报'
        : type === 'summary'
          ? '饮食汇总海报'
          : '饮食海报';
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
