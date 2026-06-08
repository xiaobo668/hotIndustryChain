/**
 * 对症食疗 / 器官食补海报 Canvas 绘制（紧凑双列排版）
 */
function getShiliaoDiseasePosterLayout() {
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
    PRINCIPLE_LH: 18,
    PRINCIPLE_MAX: 3,
    DESC_MAX: 3,
    DESC_LH: 15,
    NAME_GAP: 4,
    ING_GAP: 4,
    COL_GAP: 10,
    DISH_GAP: 5,
    SUB_MAX: 3,
    SUB_LH: 15,
    FONT_ING: 14,
    FONT_ING_ROLE: 12,
    FONT_DISH: 14,
    FONT_DISH_SUB: 12,
    FONT_FOOTER: 11,
    INNER_X: 6,
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

  const colW = (innerW - L.COL_GAP) / 2;
  const ingredientsH = measureTwoColVariable(
    ctx,
    data.ingredients || [],
    colW,
    L.ING_GAP,
    measureIngItemH,
    L,
    null
  );
  const dishesH = measureTwoColVariable(
    ctx,
    data.dishes || [],
    colW,
    L.DISH_GAP,
    measureDishCompactH,
    L,
    'therapy'
  );

  return { principleH, ingredientsH, dishesH };
}

function estimateShiliaoDiseasePosterHeight(data) {
  const L = getShiliaoDiseasePosterLayout();
  const innerW = SHILIAO_POSTER_W - L.PAD * 2 - L.INNER_X * 2;
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const { principleH, ingredientsH, dishesH } = measureDiseasePosterSections(ctx, data, innerW);

  const sectionH = (bodyH) =>
    bodyH > 0 ? L.SEC_BAR + L.SEC_BODY_PAD * 2 + bodyH : 0;

  const cardW = SHILIAO_POSTER_W - L.PAD * 2;
  const { advance: headerH } = measureShiliaoPosterHeaderH(ctx, data.summary || '', cardW - 20, L);
  let h = L.TOP + headerH;
  if (principleH) h += L.SEC_GAP + sectionH(principleH);
  if (ingredientsH) h += L.SEC_GAP + sectionH(ingredientsH);
  if (dishesH) h += L.SEC_GAP + sectionH(dishesH);
  return h + 6 + L.FOOTER;
}

function renderShiliaoDiseasePoster(data) {
  renderShiliaoTherapyPoster(data, 'disease');
}

function renderShiliaoTherapyPoster(data, kind) {
  const container = document.getElementById('shiliao-poster-pages');
  if (!container || !data) return;
  container.innerHTML = '';

  const dpr = window.devicePixelRatio || 1;
  const W = SHILIAO_POSTER_W;
  const H = estimateShiliaoDiseasePosterHeight(data);

  const label = document.createElement('div');
  label.className = 'poster-page-label';
  label.textContent =
    kind === 'organ' ? `${data.name} · 器官食补海报` : `${data.name} · 对症食疗海报`;
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
  drawShiliaoTherapyPoster(ctx, data, W, H, kind);
}

function drawShiliaoTherapyPoster(ctx, data, W, H, kind) {
  const L = getShiliaoDiseasePosterLayout();
  const accent = data.color || '#65a30d';
  const cardW = W - L.PAD * 2;
  const innerW = cardW - L.INNER_X * 2;
  const { principleH, ingredientsH, dishesH } = measureDiseasePosterSections(ctx, data, innerW);
  const isOrgan = kind === 'organ';

  const bg = ctx.createLinearGradient(0, 0, 0, H);
  if (isOrgan) {
    bg.addColorStop(0, '#fdf4ff');
    bg.addColorStop(0.45, '#f0fdf4');
    bg.addColorStop(1, '#eff6ff');
  } else {
    bg.addColorStop(0, '#eff6ff');
    bg.addColorStop(0.45, '#f0fdf4');
    bg.addColorStop(1, '#fefce8');
  }
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  let y = L.TOP;
  const headTitle = isOrgan
    ? `${data.icon || ''} ${data.name} · 器官食补`
    : `${data.icon || ''} ${data.name} · 对症食疗`;
  y = drawShiliaoPosterHeader(ctx, y, headTitle, data.summary, W, cardW, L.PAD, L, accent, 8, cardW - 20);

  const secOpts = { L, accent, cardW, pad: L.PAD, innerW };
  const principleTitle = isOrgan ? '调养要点' : '调理原则';
  const ingTitle = isOrgan ? '偏爱食材' : '推荐食材';
  const dishTitle = isOrgan ? '推荐菜品' : '食疗菜品';

  y = drawShiliaoPosterSection(ctx, y, principleTitle, principleH, (w) => {
    if (!data.principle) return;
    ctx.font = `${L.FONT_ING}px "PingFang SC", sans-serif`;
    ctx.fillStyle = '#334155';
    drawWrappedText(ctx, data.principle, 0, L.FONT_ING, w, L.PRINCIPLE_LH, L.PRINCIPLE_MAX);
  }, secOpts);

  y = drawShiliaoPosterSection(ctx, y, ingTitle, ingredientsH, (w) => {
    drawTwoColIngs(ctx, data.ingredients || [], w, L, accent);
  }, secOpts);

  y = drawShiliaoPosterSection(ctx, y, dishTitle, dishesH, (w) => {
    drawTwoColDishes(ctx, data.dishes || [], w, L, 'therapy');
  }, secOpts);

  ctx.fillStyle = '#94a3b8';
  ctx.font = `${L.FONT_FOOTER}px "PingFang SC", sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const td = new Date();
  const footer = isOrgan
    ? `器官食补 · ${td.getFullYear()}年${td.getMonth() + 1}月${td.getDate()}日 · 仅供参考，请及时就医`
    : `对症食疗 · ${td.getFullYear()}年${td.getMonth() + 1}月${td.getDate()}日 · 仅供参考，请及时就医`;
  ctx.fillText(footer, W / 2, H - L.FOOTER / 2);
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
}
