/**
 * 对症食疗海报 Canvas 绘制
 */
function getShiliaoDiseasePosterLayout() {
  return {
    PAD: 12,
    FOOTER: 22,
    TOP: 10,
    HEADER_H: 56,
    HEADER_INNER: 48,
    FONT_TITLE: 20,
    FONT_SUB: 12,
    SEC_GAP: 5,
    SEC_BAR: 20,
    SEC_BODY_PAD: 6,
    FONT_SEC: 14,
    PRINCIPLE_LH: 16,
    PRINCIPLE_MAX: 3,
    ING_NAME_ROW: 18,
    ING_ROLE_ROW: 16,
    ING_GAP: 6,
    DISH_NAME_ROW: 18,
    DISH_LINE_ROW: 15,
    DISH_GAP: 7,
    FONT_ING: 13,
    FONT_ING_ROLE: 11,
    FONT_DISH: 13,
    FONT_DISH_SUB: 11,
    FONT_FOOTER: 10,
    INNER_X: 8,
  };
}

function measureDiseasePosterSections(ctx, data, innerW) {
  const L = getShiliaoDiseasePosterLayout();

  let principleH = 0;
  if (data.principle) {
    ctx.font = `${L.FONT_ING}px "PingFang SC", sans-serif`;
    const lines = Math.min(L.PRINCIPLE_MAX, countWrapLines(ctx, data.principle, innerW));
    principleH = lines * L.PRINCIPLE_LH;
  }

  let ingredientsH = 0;
  (data.ingredients || []).forEach((ing, i) => {
    ingredientsH += L.ING_NAME_ROW + L.ING_ROLE_ROW;
    if (i < data.ingredients.length - 1) ingredientsH += L.ING_GAP;
  });

  let dishesH = 0;
  (data.dishes || []).forEach((d, i) => {
    dishesH += L.DISH_NAME_ROW + L.DISH_LINE_ROW * 2;
    if (i < data.dishes.length - 1) dishesH += L.DISH_GAP;
  });

  return { principleH, ingredientsH, dishesH };
}

function estimateShiliaoDiseasePosterHeight(data) {
  const L = getShiliaoDiseasePosterLayout();
  const innerW = SHILIAO_POSTER_W - L.PAD * 2 - L.INNER_X * 2;
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const { principleH, ingredientsH, dishesH } = measureDiseasePosterSections(ctx, data, innerW);

  const sectionH = (bodyH) =>
    bodyH > 0 ? L.SEC_BAR + L.SEC_BODY_PAD + bodyH + L.SEC_BODY_PAD : 0;

  let h = L.TOP + L.HEADER_H;
  if (principleH) h += L.SEC_GAP + sectionH(principleH);
  if (ingredientsH) h += L.SEC_GAP + sectionH(ingredientsH);
  if (dishesH) h += L.SEC_GAP + sectionH(dishesH);
  return h + 10 + L.FOOTER;
}

function renderShiliaoDiseasePoster(data) {
  const container = document.getElementById('shiliao-poster-pages');
  if (!container || !data) return;
  container.innerHTML = '';

  const dpr = window.devicePixelRatio || 1;
  const W = SHILIAO_POSTER_W;
  const H = estimateShiliaoDiseasePosterHeight(data);

  const label = document.createElement('div');
  label.className = 'poster-page-label';
  label.textContent = `${data.name} · 对症食疗海报`;
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
  drawShiliaoDiseasePoster(ctx, data, W, H);
}

function drawShiliaoDiseasePoster(ctx, data, W, H) {
  const L = getShiliaoDiseasePosterLayout();
  const accent = data.color || '#65a30d';
  const cardW = W - L.PAD * 2;
  const innerW = cardW - L.INNER_X * 2;
  const { principleH, ingredientsH, dishesH } = measureDiseasePosterSections(ctx, data, innerW);

  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, '#eff6ff');
  bg.addColorStop(0.45, '#f0fdf4');
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
  ctx.fillText(`${data.icon || ''} ${data.name} · 对症食疗`, W / 2, y + L.HEADER_INNER * 0.36);
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

  drawSection('调理原则', principleH, (w) => {
    if (!data.principle) return;
    ctx.font = `${L.FONT_ING}px "PingFang SC", sans-serif`;
    ctx.fillStyle = '#334155';
    drawWrappedText(ctx, data.principle, 0, L.FONT_ING, w, L.PRINCIPLE_LH, L.PRINCIPLE_MAX);
  });

  drawSection('推荐食材', ingredientsH, (w) => {
    let cy = 0;
    (data.ingredients || []).forEach((ing, i) => {
      ctx.font = `bold ${L.FONT_ING}px "PingFang SC", sans-serif`;
      ctx.fillStyle = accent;
      cy = drawTextInRow(ctx, ing.name, 0, cy, L.FONT_ING, L.ING_NAME_ROW);
      ctx.font = `${L.FONT_ING_ROLE}px "PingFang SC", sans-serif`;
      ctx.fillStyle = '#64748b';
      cy = drawTextInRow(ctx, fitOneLineWidth(ctx, ing.role, w), 0, cy, L.FONT_ING_ROLE, L.ING_ROLE_ROW);
      if (i < data.ingredients.length - 1) cy += L.ING_GAP;
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
      const ingLine = fitOneLineWidth(ctx, '食材：' + (d.ingredients || ''), w);
      cy = drawTextInRow(ctx, ingLine, 0, cy, L.FONT_DISH_SUB, L.DISH_LINE_ROW);
      cy = drawTextInRow(ctx, fitOneLineWidth(ctx, d.note || '', w), 0, cy, L.FONT_DISH_SUB, L.DISH_LINE_ROW);
      if (i < data.dishes.length - 1) cy += L.DISH_GAP;
    });
  });

  ctx.fillStyle = '#64748b';
  ctx.font = `${L.FONT_FOOTER}px "PingFang SC", sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const td = new Date();
  ctx.fillText(
    `对症食疗 · ${td.getFullYear()}年${td.getMonth() + 1}月${td.getDate()}日 · 仅供参考，请及时就医`,
    W / 2,
    H - L.FOOTER / 2
  );
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
}
