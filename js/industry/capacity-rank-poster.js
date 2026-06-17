/**
 * 产能规模排行海报（样式与 order-rank-poster.js 一致）
 */
const CAPACITY_RANK_PAGE_W = 430;

function estimateCapacityRankPosterHeight(data) {
  const TITLE_H = 72;
  const SUB_H = 28;
  const CARD_HEAD = 32;
  const ROW_H = 34;
  const FOOTER_H = 28;
  const n = (data.companies || []).length;
  return TITLE_H + SUB_H + CARD_HEAD + n * ROW_H + 8 + FOOTER_H;
}

function renderCapacityRankPoster(data, containerId, canvasId) {
  const container = document.getElementById(containerId || 'capacity-rank-poster-pages');
  if (!container || !data) return null;
  container.innerHTML = '';
  const dpr = window.devicePixelRatio || 1;
  const W = CAPACITY_RANK_PAGE_W;
  const H = estimateCapacityRankPosterHeight(data);

  const label = document.createElement('div');
  label.className = 'poster-page-label';
  label.textContent = data.title;
  container.appendChild(label);

  const canvas = document.createElement('canvas');
  canvas.className = 'poster-canvas-item';
  canvas.id = canvasId || 'capacity-rank-poster-canvas';
  canvas.width = W * dpr;
  canvas.height = H * dpr;
  canvas.style.width = W + 'px';
  canvas.style.height = H + 'px';
  container.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  drawCapacityRankPoster(ctx, data, W, H);
  return canvas;
}

function drawCapacityRankPoster(ctx, data, W, H) {
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
  ctx.fillText((data.key || '产能') + ' · 产能排行', cardX + cardW / 2, y + CARD_HEAD / 2);
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
    const capStr = co.capacityLabel || '';
    const capGap = 6;

    ctx.font = 'bold 11px "PingFang SC", sans-serif';
    ctx.fillStyle = '#0f172a';
    let nameStr = co.name;
    ctx.font = 'bold 10px "PingFang SC", sans-serif';
    const capW = ctx.measureText(capStr).width;
    ctx.font = 'bold 11px "PingFang SC", sans-serif';
    const maxNameW = maxLineW - 18 - capW - capGap;
    if (ctx.measureText(nameStr).width > maxNameW) {
      nameStr = fitOneLineWidth(ctx, nameStr, maxNameW);
    }
    ctx.fillText(nameStr, nameX, rowTop + 12);
    const nameW = ctx.measureText(nameStr).width;

    ctx.font = 'bold 10px "PingFang SC", sans-serif';
    ctx.fillStyle = '#1d4ed8';
    ctx.fillText(capStr, nameX + nameW + capGap, rowTop + 12);

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
    `产业链分析工具 · ${data.generatedAt || ''} · 产能口径来自公开报道 · 仅供参考，不构成投资建议`,
    W / 2,
    H - FOOTER_H / 2 + 2
  );
  ctx.textAlign = 'left';
}

function downloadCapacityRankPoster(canvasId, filename) {
  const canvas = document.getElementById(canvasId || 'capacity-rank-poster-canvas');
  if (!canvas) return;
  const link = document.createElement('a');
  link.download = filename || '产能排行榜-2026.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
}

async function copyCapacityRankPoster(canvasId) {
  const canvas = document.getElementById(canvasId || 'capacity-rank-poster-canvas');
  if (!canvas) return;
  try {
    const blob = await new Promise((res) => canvas.toBlob(res, 'image/png'));
    await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
    alert('✅ 产能榜海报已复制到剪贴板');
  } catch (e) {
    alert('复制失败，请使用下载按钮');
  }
}

function initCapacityRankPosterPage(data, containerId, canvasId) {
  if (data) renderCapacityRankPoster(data, containerId, canvasId);
}

const CAPACITY_RANK_POSTER_CONFIG = [
  { key: '高速光模块', industryKeys: ['光互联'], wrapId: 'capacity-rank-optical-module-wrap', pagesId: 'capacity-rank-optical-module-pages', canvasId: 'capacity-rank-optical-module-canvas' },
  { key: '光芯片', industryKeys: ['光互联', 'CPO'], wrapId: 'capacity-rank-optical-chip-wrap', pagesId: 'capacity-rank-optical-chip-pages', canvasId: 'capacity-rank-optical-chip-canvas' },
  { key: '光纤预制棒', industryKeys: ['光纤概念'], wrapId: 'capacity-rank-fiber-preform-wrap', pagesId: 'capacity-rank-fiber-preform-pages', canvasId: 'capacity-rank-fiber-preform-canvas' },
  { key: 'CPO光引擎', industryKeys: ['CPO', '光互联'], wrapId: 'capacity-rank-cpo-engine-wrap', pagesId: 'capacity-rank-cpo-engine-pages', canvasId: 'capacity-rank-cpo-engine-canvas' },
  { key: '液冷设备', industryKeys: ['液冷'], wrapId: 'capacity-rank-liquid-cooling-wrap', pagesId: 'capacity-rank-liquid-cooling-pages', canvasId: 'capacity-rank-liquid-cooling-canvas' },
  { key: '算力服务器', industryKeys: ['算力租赁', 'AI算力', 'AIDC', '预制算力中心底座', '华为概念', '消费电子', '光互联', '光纤概念'], wrapId: 'capacity-rank-ai-server-wrap', pagesId: 'capacity-rank-ai-server-pages', canvasId: 'capacity-rank-ai-server-canvas' },
  { key: '高端电子布', industryKeys: ['电子布', '半导体稀缺材料', '光纤概念'], wrapId: 'capacity-rank-e-glass-fabric-highend-wrap', pagesId: 'capacity-rank-e-glass-fabric-highend-pages', canvasId: 'capacity-rank-e-glass-fabric-highend-canvas' },
  { key: '低介电子纱', industryKeys: ['电子布', '半导体稀缺材料', '光纤概念'], wrapId: 'capacity-rank-low-dk-yarn-wrap', pagesId: 'capacity-rank-low-dk-yarn-pages', canvasId: 'capacity-rank-low-dk-yarn-canvas' },
  { key: '覆铜板', industryKeys: ['电子布', 'PCB', '半导体稀缺材料', '存储芯片'], wrapId: 'capacity-rank-ccl-wrap', pagesId: 'capacity-rank-ccl-pages', canvasId: 'capacity-rank-ccl-canvas' },
  { key: 'ABF载板', industryKeys: ['先进封装', '半导体稀缺材料', 'CPO', 'PCB', '存储芯片'], wrapId: 'capacity-rank-abf-substrate-wrap', pagesId: 'capacity-rank-abf-substrate-pages', canvasId: 'capacity-rank-abf-substrate-canvas' },
  { key: '玻纤粗纱', industryKeys: ['电子布', '半导体稀缺材料', '光纤概念'], wrapId: 'capacity-rank-glass-roving-wrap', pagesId: 'capacity-rank-glass-roving-pages', canvasId: 'capacity-rank-glass-roving-canvas' },
  { key: '风电纱', industryKeys: ['电子布', '半导体稀缺材料', '光纤概念', '新能源'], wrapId: 'capacity-rank-wind-yarn-wrap', pagesId: 'capacity-rank-wind-yarn-pages', canvasId: 'capacity-rank-wind-yarn-canvas' },
  { key: 'MLCC车规算力', industryKeys: ['MLCC'], wrapId: 'capacity-rank-mlcc-auto-compute-wrap', pagesId: 'capacity-rank-mlcc-auto-compute-pages', canvasId: 'capacity-rank-mlcc-auto-compute-canvas' },
  { key: '磷化铟砷化镓衬底', industryKeys: ['半导体稀缺材料', '光互联', 'CPO'], wrapId: 'capacity-rank-inp-gaas-substrate-wrap', pagesId: 'capacity-rank-inp-gaas-substrate-pages', canvasId: 'capacity-rank-inp-gaas-substrate-canvas' },
  { key: '先进封装2.5D', industryKeys: ['先进封装', '存储芯片', '半导体稀缺材料', 'PCB', '半导体', '长鑫存储'], wrapId: 'capacity-rank-advanced-packaging-25d-wrap', pagesId: 'capacity-rank-advanced-packaging-25d-pages', canvasId: 'capacity-rank-advanced-packaging-25d-canvas' },
  { key: '存储封测', industryKeys: ['存储芯片', '长鑫存储', '先进封装', '半导体'], wrapId: 'capacity-rank-storage-dram-nand-wrap', pagesId: 'capacity-rank-storage-dram-nand-pages', canvasId: 'capacity-rank-storage-dram-nand-canvas' },
];

function getCapacityRankDatasetByKey(key) {
  if (!key || typeof CAPACITY_RANK_REGISTRY2026 === 'undefined') return null;
  return CAPACITY_RANK_REGISTRY2026[key] || null;
}

function resolveCapacityRankIndustryKey(industry) {
  let key = industry && industry.name;
  const query = typeof currentSearchQuery !== 'undefined' ? currentSearchQuery : '';
  if (typeof searchIndustry === 'function' && query) {
    const resolved = searchIndustry(query);
    if (resolved && resolved.name) key = resolved.name;
  }
  return key || null;
}

function getCapacityRankKeysForIndustry(industryName) {
  const name = resolveCapacityRankIndustryKey({ name: industryName });
  if (!name) return [];
  return CAPACITY_RANK_POSTER_CONFIG
    .filter((cfg) => cfg.industryKeys.includes(name))
    .map((cfg) => cfg.key);
}

function maybeRenderCapacityRankPoster(industry) {
  const industryKey = resolveCapacityRankIndustryKey(industry);
  let matched = false;

  CAPACITY_RANK_POSTER_CONFIG.forEach((cfg) => {
    const wrap = document.getElementById(cfg.wrapId);
    if (!wrap) return;
    const show = cfg.industryKeys.includes(industryKey);
    wrap.style.display = show ? '' : 'none';
    if (show) {
      matched = true;
      const data = getCapacityRankDatasetByKey(cfg.key);
      if (data) {
        requestAnimationFrame(() => {
          initCapacityRankPosterPage(data, cfg.pagesId, cfg.canvasId);
        });
      }
    }
  });

  const legacyWrap = document.getElementById('capacity-rank-poster-wrap');
  if (legacyWrap && !matched) {
    const keys = getCapacityRankKeysForIndustry(industryKey);
    const data = keys.length ? getCapacityRankDatasetByKey(keys[0]) : null;
    legacyWrap.style.display = data ? '' : 'none';
    if (data) requestAnimationFrame(() => renderCapacityRankPoster(data));
  }
}

function initAllCapacityRankPosters() {
  if (typeof CAPACITY_RANK_REGISTRY2026 === 'undefined') return;
  CAPACITY_RANK_POSTER_CONFIG.forEach((cfg) => {
    const data = getCapacityRankDatasetByKey(cfg.key);
    if (data) initCapacityRankPosterPage(data, cfg.pagesId, cfg.canvasId);
  });
}
