/**
 * 产能规模排行海报（翡翠绿主题，与订单榜青色区分）
 */
const CAPACITY_RANK_PAGE_W = 430;

const CAPACITY_POSTER_THEME = {
  border: '#34d399',
  barStart: '#047857',
  barEnd: '#065f46',
  rank: '#047857',
  capacity: '#059669',
  bgStops: ['#d1fae5', '#ecfdf5', '#f7fffb'],
  gridStroke: 'rgba(5, 150, 105, 0.07)',
};

const CAPACITY_POSTER_FOOTER_LINES = [
  '数据口径均来自企业年报、行业公开产业调研报道，',
  '仅用于行业产业学习参考，请勿仅凭本数据开展证券投资；股市存在高风险，自主投资请独立审慎判断。',
];

const CAPACITY_POSTER_LAYOUT = {
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

function splitSubtitleTwoLines(ctx, subtitle, maxWidth) {
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

function estimateCapacityRankPosterHeight(data) {
  const L = CAPACITY_POSTER_LAYOUT;
  const n = (data.companies || []).length;
  const headerH = L.TOP + L.TITLE_H + L.SUB_LINES * L.SUB_LINE_H + L.GAP;
  const cardH = L.CARD_HEAD + n * L.ROW_H + 8;
  return headerH + cardH + L.GAP + L.FOOTER_LINES * L.FOOTER_LINE_H + 10;
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
  const L = CAPACITY_POSTER_LAYOUT;
  const T = CAPACITY_POSTER_THEME;
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

  let y = L.TOP;
  ctx.fillStyle = '#0f172a';
  ctx.font = L.TITLE_FONT;
  ctx.textAlign = 'center';
  ctx.fillText(data.title, W / 2, y + 16);
  y += L.TITLE_H;

  ctx.font = L.SUB_FONT;
  ctx.fillStyle = '#475569';
  const subLines = splitSubtitleTwoLines(ctx, data.subtitle || '', W - L.PAD * 2);
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
  ctx.fillText((data.key || '产能') + ' · 产能排行', cardX + cardW / 2, y + L.CARD_HEAD / 2);
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
  CAPACITY_POSTER_FOOTER_LINES.forEach((line, i) => {
    ctx.fillText(line, W / 2, footerTop + 10 + i * L.FOOTER_LINE_H);
  });
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
  { key: '显示面板', industryKeys: ['消费电子'], wrapId: 'capacity-rank-ce-display-panel-wrap', pagesId: 'capacity-rank-ce-display-panel-pages', canvasId: 'capacity-rank-ce-display-panel-canvas' },
  { key: 'TWS耳机音箱', industryKeys: ['消费电子'], wrapId: 'capacity-rank-ce-tws-audio-wrap', pagesId: 'capacity-rank-ce-tws-audio-pages', canvasId: 'capacity-rank-ce-tws-audio-canvas' },
  { key: '智能手机ODM', industryKeys: ['消费电子'], wrapId: 'capacity-rank-ce-smartphone-odm-wrap', pagesId: 'capacity-rank-ce-smartphone-odm-pages', canvasId: 'capacity-rank-ce-smartphone-odm-canvas' },
  { key: '可穿戴设备', industryKeys: ['消费电子'], wrapId: 'capacity-rank-ce-wearable-wrap', pagesId: 'capacity-rank-ce-wearable-pages', canvasId: 'capacity-rank-ce-wearable-canvas' },
  { key: '充电设备', industryKeys: ['消费电子'], wrapId: 'capacity-rank-ce-charger-wrap', pagesId: 'capacity-rank-ce-charger-pages', canvasId: 'capacity-rank-ce-charger-canvas' },
  { key: '摄像头模组', industryKeys: ['消费电子'], wrapId: 'capacity-rank-ce-camera-module-wrap', pagesId: 'capacity-rank-ce-camera-module-pages', canvasId: 'capacity-rank-ce-camera-module-canvas' },
  { key: '算力芯片', industryKeys: ['AI算力', '半导体'], wrapId: 'capacity-rank-compute-chip-wrap', pagesId: 'capacity-rank-compute-chip-pages', canvasId: 'capacity-rank-compute-chip-canvas' },
  { key: 'AI服务器', industryKeys: ['AI算力', '算力租赁', 'AIDC'], wrapId: 'capacity-rank-compute-ai-server-wrap', pagesId: 'capacity-rank-compute-ai-server-pages', canvasId: 'capacity-rank-compute-ai-server-canvas' },
  { key: '量子计算', industryKeys: ['AI算力', '光互联'], wrapId: 'capacity-rank-compute-quantum-wrap', pagesId: 'capacity-rank-compute-quantum-pages', canvasId: 'capacity-rank-compute-quantum-canvas' },
  { key: '算力租赁', industryKeys: ['算力租赁', 'AI算力', 'AIDC'], wrapId: 'capacity-rank-compute-lease-wrap', pagesId: 'capacity-rank-compute-lease-pages', canvasId: 'capacity-rank-compute-lease-canvas' },
  { key: '大数据', industryKeys: ['AI算力'], wrapId: 'capacity-rank-compute-big-data-wrap', pagesId: 'capacity-rank-compute-big-data-pages', canvasId: 'capacity-rank-compute-big-data-canvas' },
  { key: '液冷技术', industryKeys: ['液冷', 'AI算力', 'AIDC'], wrapId: 'capacity-rank-compute-liquid-cooling-wrap', pagesId: 'capacity-rank-compute-liquid-cooling-pages', canvasId: 'capacity-rank-compute-liquid-cooling-canvas' },
  { key: '云计算', industryKeys: ['AI算力', '算力租赁', 'AIDC'], wrapId: 'capacity-rank-compute-cloud-wrap', pagesId: 'capacity-rank-compute-cloud-pages', canvasId: 'capacity-rank-compute-cloud-canvas' },
  { key: '边缘计算', industryKeys: ['AI算力', '算力租赁'], wrapId: 'capacity-rank-compute-edge-wrap', pagesId: 'capacity-rank-compute-edge-pages', canvasId: 'capacity-rank-compute-edge-canvas' },
  { key: '算力算法', industryKeys: ['AI算力', '人工智能'], wrapId: 'capacity-rank-compute-algorithm-wrap', pagesId: 'capacity-rank-compute-algorithm-pages', canvasId: 'capacity-rank-compute-algorithm-canvas' },
  { key: 'PCB算力板', industryKeys: ['PCB', 'AI算力', '半导体'], wrapId: 'capacity-rank-compute-pcb-wrap', pagesId: 'capacity-rank-compute-pcb-pages', canvasId: 'capacity-rank-compute-pcb-canvas' },
  { key: '晶圆代工', industryKeys: ['半导体'], wrapId: 'capacity-rank-semi-wafer-foundry-wrap', pagesId: 'capacity-rank-semi-wafer-foundry-pages', canvasId: 'capacity-rank-semi-wafer-foundry-canvas' },
  { key: '半导体设备', industryKeys: ['半导体'], wrapId: 'capacity-rank-semi-equipment-wrap', pagesId: 'capacity-rank-semi-equipment-pages', canvasId: 'capacity-rank-semi-equipment-canvas' },
  { key: '封装测试', industryKeys: ['半导体', '先进封装'], wrapId: 'capacity-rank-semi-osat-wrap', pagesId: 'capacity-rank-semi-osat-pages', canvasId: 'capacity-rank-semi-osat-canvas' },
  { key: '半导体材料', industryKeys: ['半导体', '半导体稀缺材料'], wrapId: 'capacity-rank-semi-materials-wrap', pagesId: 'capacity-rank-semi-materials-pages', canvasId: 'capacity-rank-semi-materials-canvas' },
  { key: 'CPU芯片', industryKeys: ['半导体', '芯片'], wrapId: 'capacity-rank-semi-cpu-wrap', pagesId: 'capacity-rank-semi-cpu-pages', canvasId: 'capacity-rank-semi-cpu-canvas' },
  { key: 'GPU芯片', industryKeys: ['半导体', '芯片', 'AI算力'], wrapId: 'capacity-rank-semi-gpu-wrap', pagesId: 'capacity-rank-semi-gpu-pages', canvasId: 'capacity-rank-semi-gpu-canvas' },
  { key: '模拟芯片', industryKeys: ['半导体', '芯片', '元件'], wrapId: 'capacity-rank-semi-analog-wrap', pagesId: 'capacity-rank-semi-analog-pages', canvasId: 'capacity-rank-semi-analog-canvas' },
  { key: '功率半导体', industryKeys: ['半导体', '芯片'], wrapId: 'capacity-rank-semi-power-wrap', pagesId: 'capacity-rank-semi-power-pages', canvasId: 'capacity-rank-semi-power-canvas' },
  { key: 'EDA工具', industryKeys: ['半导体', 'IT服务'], wrapId: 'capacity-rank-semi-eda-wrap', pagesId: 'capacity-rank-semi-eda-pages', canvasId: 'capacity-rank-semi-eda-canvas' },
  { key: '传感器芯片', industryKeys: ['半导体', '芯片', '元件'], wrapId: 'capacity-rank-semi-sensor-wrap', pagesId: 'capacity-rank-semi-sensor-pages', canvasId: 'capacity-rank-semi-sensor-canvas' },
  { key: '动力电池', industryKeys: ['锂电池'], wrapId: 'capacity-rank-battery-power-wrap', pagesId: 'capacity-rank-battery-power-pages', canvasId: 'capacity-rank-battery-power-canvas' },
  { key: '正极材料', industryKeys: ['锂电池', '多氟多'], wrapId: 'capacity-rank-battery-cathode-wrap', pagesId: 'capacity-rank-battery-cathode-pages', canvasId: 'capacity-rank-battery-cathode-canvas' },
  { key: '负极材料', industryKeys: ['锂电池'], wrapId: 'capacity-rank-battery-anode-wrap', pagesId: 'capacity-rank-battery-anode-pages', canvasId: 'capacity-rank-battery-anode-canvas' },
  { key: '电解液', industryKeys: ['锂电池', '多氟多'], wrapId: 'capacity-rank-battery-electrolyte-wrap', pagesId: 'capacity-rank-battery-electrolyte-pages', canvasId: 'capacity-rank-battery-electrolyte-canvas' },
  { key: '隔膜', industryKeys: ['锂电池'], wrapId: 'capacity-rank-battery-separator-wrap', pagesId: 'capacity-rank-battery-separator-pages', canvasId: 'capacity-rank-battery-separator-canvas' },
  { key: '铜箔', industryKeys: ['锂电池'], wrapId: 'capacity-rank-battery-copper-foil-wrap', pagesId: 'capacity-rank-battery-copper-foil-pages', canvasId: 'capacity-rank-battery-copper-foil-canvas' },
  { key: '固态电池', industryKeys: ['锂电池'], wrapId: 'capacity-rank-battery-solid-state-wrap', pagesId: 'capacity-rank-battery-solid-state-pages', canvasId: 'capacity-rank-battery-solid-state-canvas' },
  { key: '电池设备', industryKeys: ['锂电池'], wrapId: 'capacity-rank-battery-equipment-wrap', pagesId: 'capacity-rank-battery-equipment-pages', canvasId: 'capacity-rank-battery-equipment-canvas' },
  { key: '储能电池', industryKeys: ['锂电池'], wrapId: 'capacity-rank-battery-storage-wrap', pagesId: 'capacity-rank-battery-storage-pages', canvasId: 'capacity-rank-battery-storage-canvas' },
  { key: '电池回收', industryKeys: ['锂电池'], wrapId: 'capacity-rank-battery-recycling-wrap', pagesId: 'capacity-rank-battery-recycling-pages', canvasId: 'capacity-rank-battery-recycling-canvas' },
  { key: '火箭发动机', industryKeys: ['商业航天'], wrapId: 'capacity-rank-aerospace-rocket-engine-wrap', pagesId: 'capacity-rank-aerospace-rocket-engine-pages', canvasId: 'capacity-rank-aerospace-rocket-engine-canvas' },
  { key: '箭体结构', industryKeys: ['商业航天'], wrapId: 'capacity-rank-aerospace-rocket-structure-wrap', pagesId: 'capacity-rank-aerospace-rocket-structure-pages', canvasId: 'capacity-rank-aerospace-rocket-structure-canvas' },
  { key: '卫星制造', industryKeys: ['商业航天'], wrapId: 'capacity-rank-aerospace-satellite-mfg-wrap', pagesId: 'capacity-rank-aerospace-satellite-mfg-pages', canvasId: 'capacity-rank-aerospace-satellite-mfg-canvas' },
  { key: '火箭制造', industryKeys: ['商业航天'], wrapId: 'capacity-rank-aerospace-rocket-mfg-wrap', pagesId: 'capacity-rank-aerospace-rocket-mfg-pages', canvasId: 'capacity-rank-aerospace-rocket-mfg-canvas' },
  { key: '卫星通信', industryKeys: ['商业航天'], wrapId: 'capacity-rank-aerospace-satellite-comm-wrap', pagesId: 'capacity-rank-aerospace-satellite-comm-pages', canvasId: 'capacity-rank-aerospace-satellite-comm-canvas' },
  { key: '卫星姿态控制', industryKeys: ['商业航天'], wrapId: 'capacity-rank-aerospace-satellite-attitude-wrap', pagesId: 'capacity-rank-aerospace-satellite-attitude-pages', canvasId: 'capacity-rank-aerospace-satellite-attitude-canvas' },
  { key: '星座运营', industryKeys: ['商业航天'], wrapId: 'capacity-rank-aerospace-constellation-wrap', pagesId: 'capacity-rank-aerospace-constellation-pages', canvasId: 'capacity-rank-aerospace-constellation-canvas' },
  { key: '太空算力', industryKeys: ['商业航天', 'AI算力'], wrapId: 'capacity-rank-aerospace-space-computing-wrap', pagesId: 'capacity-rank-aerospace-space-computing-pages', canvasId: 'capacity-rank-aerospace-space-computing-canvas' },
  { key: '航天材料', industryKeys: ['商业航天'], wrapId: 'capacity-rank-aerospace-materials-wrap', pagesId: 'capacity-rank-aerospace-materials-pages', canvasId: 'capacity-rank-aerospace-materials-canvas' },
  { key: '航天测控', industryKeys: ['商业航天'], wrapId: 'capacity-rank-aerospace-ttc-wrap', pagesId: 'capacity-rank-aerospace-ttc-pages', canvasId: 'capacity-rank-aerospace-ttc-canvas' },
];

function getCapacityRankRegistry() {
  const main = typeof CAPACITY_RANK_REGISTRY2026 !== 'undefined' ? CAPACITY_RANK_REGISTRY2026 : {};
  const ce = typeof CAPACITY_RANK_REGISTRY_CONSUMER_ELECTRONICS2026 !== 'undefined'
    ? CAPACITY_RANK_REGISTRY_CONSUMER_ELECTRONICS2026
    : {};
  const compute = typeof CAPACITY_RANK_REGISTRY_COMPUTE2026 !== 'undefined'
    ? CAPACITY_RANK_REGISTRY_COMPUTE2026
    : {};
  const semi = typeof CAPACITY_RANK_REGISTRY_SEMICONDUCTOR2026 !== 'undefined'
    ? CAPACITY_RANK_REGISTRY_SEMICONDUCTOR2026
    : {};
  const battery = typeof CAPACITY_RANK_REGISTRY_BATTERY2026 !== 'undefined'
    ? CAPACITY_RANK_REGISTRY_BATTERY2026
    : {};
  const aerospace = typeof CAPACITY_RANK_REGISTRY_AEROSPACE2026 !== 'undefined'
    ? CAPACITY_RANK_REGISTRY_AEROSPACE2026
    : {};
  return Object.assign({}, main, ce, compute, semi, battery, aerospace);
}

function getCapacityRankDatasetByKey(key) {
  if (!key) return null;
  return getCapacityRankRegistry()[key] || null;
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

  const pageLink = document.getElementById('capacity-industry-page-link');
  if (pageLink && typeof getCapacityPageUrlForIndustry === 'function') {
    const url = getCapacityPageUrlForIndustry(industryKey);
    if (url) {
      pageLink.style.display = '';
      pageLink.onclick = () => { window.location.href = url; };
      const groupId = typeof INDUSTRY_TO_CAPACITY_PAGE !== 'undefined'
        ? INDUSTRY_TO_CAPACITY_PAGE[industryKey]
        : null;
      const group = groupId && typeof getCapacityPageGroup === 'function'
        ? getCapacityPageGroup(groupId)
        : null;
      const titleEl = pageLink.querySelector('.capacity-industry-page-link-title');
      const descEl = pageLink.querySelector('.capacity-industry-page-link-desc');
      if (titleEl) titleEl.textContent = '📊 查看「' + (group ? group.title : industryKey) + '」全部产能榜';
      if (descEl && group) descEl.textContent = group.subtitle + ' — 共 ' + group.keys.length + ' 个赛道 Top10';
    } else {
      pageLink.style.display = 'none';
    }
  }

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
  if (!Object.keys(getCapacityRankRegistry()).length) return;
  CAPACITY_RANK_POSTER_CONFIG.forEach((cfg) => {
    const data = getCapacityRankDatasetByKey(cfg.key);
    if (data) initCapacityRankPosterPage(data, cfg.pagesId, cfg.canvasId);
  });
}
