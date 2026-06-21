/**
 * 订单规模排行海报（浅蓝白风格，与 poster.js / theme-poster.js 一致）
 * 数据：ORDER_RANK_COMPUTING2026（data/order-rank-computing2026.js）
 */
const ORDER_RANK_PAGE_W = 430;

const ORDER_RANK_POSTER_FOOTER_LINES = [
  '订单规模口径来自公开财经报道与产业链梳理，仅用于行业产业学习参考，',
  '请勿仅凭本数据开展证券投资；股市存在高风险，自主投资请独立审慎判断。',
];

const ORDER_RANK_POSTER_LAYOUT = {
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
  FOOTER_FONT: 'bold 9px "PingFang SC", sans-serif',
  NAME_FONT: 'bold 13px "PingFang SC", sans-serif',
  ORDER_FONT: 'bold 10px "PingFang SC", sans-serif',
};

function splitOrderRankSubtitleTwoLines(ctx, subtitle, maxWidth) {
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

function estimateOrderRankPosterHeight(data) {
  const L = ORDER_RANK_POSTER_LAYOUT;
  const n = (data.companies || []).length;
  const headerH = L.TOP + L.TITLE_H + L.SUB_LINES * L.SUB_LINE_H + L.GAP;
  const cardH = L.CARD_HEAD + n * L.ROW_H + 8;
  return headerH + cardH + L.GAP + L.FOOTER_LINES * L.FOOTER_LINE_H + 10;
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
  const L = ORDER_RANK_POSTER_LAYOUT;
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

  let y = L.TOP;
  ctx.fillStyle = '#0f172a';
  ctx.font = L.TITLE_FONT;
  ctx.textAlign = 'center';
  ctx.fillText(data.title, W / 2, y + 16);
  y += L.TITLE_H;

  ctx.font = L.SUB_FONT;
  ctx.fillStyle = '#475569';
  const subLines = splitOrderRankSubtitleTwoLines(ctx, data.subtitle || '', W - L.PAD * 2);
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
  bgrad.addColorStop(1, '#1e3a8a');
  ctx.fillStyle = bgrad;
  ctx.fillRect(cardX, y, cardW, L.CARD_HEAD);
  ctx.restore();

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 11px "PingFang SC", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText((data.key || '订单') + ' · 订单规模排行', cardX + cardW / 2, y + L.CARD_HEAD / 2);
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
    ctx.fillStyle = '#1e40af';
    ctx.fillText(String(co.rank) + '.', baseX, rowTop + 12);

    const nameX = baseX + 18;
    const orderStr = co.orderLabel || '';
    const orderGap = 6;

    ctx.font = L.ORDER_FONT;
    const orderW = ctx.measureText(orderStr).width;
    ctx.font = L.NAME_FONT;
    ctx.fillStyle = '#0f172a';
    let nameStr = co.name;
    const maxNameW = maxLineW - 18 - orderW - orderGap;
    if (ctx.measureText(nameStr).width > maxNameW) {
      nameStr = fitOneLineWidth(ctx, nameStr, maxNameW);
    }
    ctx.fillText(nameStr, nameX, rowTop + 12);
    const nameW = ctx.measureText(nameStr).width;

    ctx.font = L.ORDER_FONT;
    ctx.fillStyle = '#1d4ed8';
    ctx.fillText(orderStr, nameX + nameW + orderGap, rowTop + 12);

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
  ORDER_RANK_POSTER_FOOTER_LINES.forEach((line, i) => {
    ctx.fillText(line, W / 2, footerTop + 10 + i * L.FOOTER_LINE_H);
  });
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

/** 订单榜底部：可信信息来源（视频号/平台审核补充材料） */
function renderOrderRankSourcesPanel(data, sourcesElId, options) {
  const el = document.getElementById(sourcesElId);
  if (!el || !data || !data.companies?.length) {
    if (el) el.style.display = 'none';
    return;
  }

  const opts = options || {};
  const docHref = opts.analysisDoc || '';
  const uniqueUrls = [];
  const seen = new Set();
  data.companies.forEach((co) => {
    const url = co.verify?.sourceUrl;
    if (url && !seen.has(url)) {
      seen.add(url);
      uniqueUrls.push({ label: co.verify.source || co.name, url });
    }
  });

  const rows = data.companies
    .map((co) => {
      const v = co.verify || {};
      const typeCls = v.sourceType === 'official' ? 'type-official' : 'type-media';
      const typeLabel = v.sourceType === 'official' ? '公告/年报' : '媒体报道';
      const link = v.sourceUrl
        ? `<a href="${v.sourceUrl}" target="_blank" rel="noopener">${v.sourceUrl.replace(/^https?:\/\//, '').slice(0, 48)}…</a>`
        : '—';
      const cross = v.officialCross?.ref ? `<br><span style="color:#94a3b8">${v.officialCross.ref}</span>` : '';
      return `<tr>
        <td>${co.rank}</td>
        <td><strong>${co.name}</strong><br>${co.orderLabel || ''}</td>
        <td class="${typeCls}">${typeLabel}</td>
        <td>${v.source || '—'}<br>${v.sourceDate || ''}${cross}</td>
        <td>${link}</td>
        <td>${v.note || '—'}</td>
      </tr>`;
    })
    .join('');

  el.innerHTML = `
    <h3>📎 可信信息来源 · ${data.key || ''}订单榜</h3>
    <p class="sources-sub">${data.subtitle || ''}。以下内容供视频号/平台「补充可信信息来源」使用；1–6 位为媒体报道口径，已与公告/业绩说明会等交叉登记。</p>
    <table class="order-rank-sources-table">
      <thead><tr>
        <th>#</th><th>公司</th><th>类型</th><th>来源</th><th>链接</th><th>备注</th>
      </tr></thead>
      <tbody>${rows}</tbody>
    </table>
    <div class="order-rank-sources-links"><strong>主要来源链接：</strong><br>
      ${uniqueUrls.map((u) => `· <a href="${u.url}" target="_blank" rel="noopener">${u.label}</a>`).join('<br>')}
    </div>
    ${docHref ? `<a class="doc-link" href="${docHref}" target="_blank" rel="noopener">📋 查看完整分析过程文档 →</a>` : ''}
    <p class="order-rank-sources-footer">免责声明：订单规模为公开报道或年报营收参考，不构成投资建议。内容含 AI 辅助整理，请以公司公告为准。</p>
  `;
  el.style.display = '';
}

function copyOrderRankSourcesText(sourcesElId) {
  const el = document.getElementById(sourcesElId);
  if (!el) return;
  const text = el.innerText || el.textContent;
  navigator.clipboard.writeText(text).then(
    () => alert('✅ 来源说明已复制，可粘贴至视频号补充材料'),
    () => alert('复制失败，请手动选择文本复制')
  );
}

/** 各产业链订单榜配置（key 与 data/*.js 中 payload.key 一致） */
const ORDER_RANK_POSTER_CONFIG = [
  { key: '算力租赁', wrapId: 'order-rank-computing-wrap', pagesId: 'order-rank-computing-pages', canvasId: 'order-rank-computing-canvas' },
  { key: 'PCB', wrapId: 'order-rank-pcb-wrap', pagesId: 'order-rank-pcb-pages', canvasId: 'order-rank-pcb-canvas' },
  { key: '先进封装', wrapId: 'order-rank-advanced-wrap', pagesId: 'order-rank-advanced-pages', canvasId: 'order-rank-advanced-canvas' },
  { key: '液冷', wrapId: 'order-rank-liquid-cooling-wrap', pagesId: 'order-rank-liquid-cooling-pages', canvasId: 'order-rank-liquid-cooling-canvas' },
  { key: '电子布', wrapId: 'order-rank-e-glass-fabric-wrap', pagesId: 'order-rank-e-glass-fabric-pages', canvasId: 'order-rank-e-glass-fabric-canvas' },
  { key: 'MLCC', wrapId: 'order-rank-mlcc-wrap', pagesId: 'order-rank-mlcc-pages', canvasId: 'order-rank-mlcc-canvas' },
  { key: '多氟多', wrapId: 'order-rank-duofuduo-wrap', pagesId: 'order-rank-duofuduo-pages', canvasId: 'order-rank-duofuduo-canvas' },
  { key: '光互联', wrapId: 'order-rank-optical-interconnect-wrap', pagesId: 'order-rank-optical-interconnect-pages', canvasId: 'order-rank-optical-interconnect-canvas', sourcesId: 'order-rank-optical-interconnect-sources', analysisDoc: 'docs/analysis/optical-interconnect2026.html' },
  { key: '光纤概念', wrapId: 'order-rank-fiber-concept-wrap', pagesId: 'order-rank-fiber-concept-pages', canvasId: 'order-rank-fiber-concept-canvas' },
  { key: '电力', wrapId: 'order-rank-power-wrap', pagesId: 'order-rank-power-pages', canvasId: 'order-rank-power-canvas' },
  { key: '存储芯片', wrapId: 'order-rank-storage-chip-wrap', pagesId: 'order-rank-storage-chip-pages', canvasId: 'order-rank-storage-chip-canvas' },
  { key: '电子纸', wrapId: 'order-rank-e-paper-wrap', pagesId: 'order-rank-e-paper-pages', canvasId: 'order-rank-e-paper-canvas' },
  { key: '人形机器人', industryKeys: ['人形机器人', '机器人'], wrapId: 'order-rank-humanoid-robot-wrap', pagesId: 'order-rank-humanoid-robot-pages', canvasId: 'order-rank-humanoid-robot-canvas' },
];

function orderRankConfigMatches(industryKey, cfg) {
  if (!industryKey || !cfg) return false;
  if (industryKey === cfg.key) return true;
  return !!(cfg.industryKeys && cfg.industryKeys.includes(industryKey));
}

function getOrderRankDatasetByKey(key) {
  if (!key) return null;
  if (key === '算力租赁' && typeof ORDER_RANK_COMPUTING2026 !== 'undefined') return ORDER_RANK_COMPUTING2026;
  if (key === 'PCB' && typeof ORDER_RANK_PCB2026 !== 'undefined') return ORDER_RANK_PCB2026;
  if (key === '先进封装' && typeof ORDER_RANK_ADVANCED_PACKAGING2026 !== 'undefined') return ORDER_RANK_ADVANCED_PACKAGING2026;
  if (key === '液冷' && typeof ORDER_RANK_LIQUID_COOLING2026 !== 'undefined') return ORDER_RANK_LIQUID_COOLING2026;
  if (key === '电子布' && typeof ORDER_RANK_E_GLASS_FABRIC2026 !== 'undefined') return ORDER_RANK_E_GLASS_FABRIC2026;
  if (key === 'MLCC' && typeof ORDER_RANK_MLCC2026 !== 'undefined') return ORDER_RANK_MLCC2026;
  if (key === '多氟多' && typeof ORDER_RANK_DUOFUDUO2026 !== 'undefined') return ORDER_RANK_DUOFUDUO2026;
  if (key === '光互联' && typeof ORDER_RANK_OPTICAL_INTERCONNECT2026 !== 'undefined') return ORDER_RANK_OPTICAL_INTERCONNECT2026;
  if (key === '光纤概念' && typeof ORDER_RANK_FIBER_CONCEPT2026 !== 'undefined') return ORDER_RANK_FIBER_CONCEPT2026;
  if (key === '电力' && typeof ORDER_RANK_POWER2026 !== 'undefined') return ORDER_RANK_POWER2026;
  if (key === '存储芯片' && typeof ORDER_RANK_STORAGE_CHIP2026 !== 'undefined') return ORDER_RANK_STORAGE_CHIP2026;
  if (key === '电子纸' && typeof ORDER_RANK_E_PAPER2026 !== 'undefined') return ORDER_RANK_E_PAPER2026;
  if ((key === '人形机器人' || key === '机器人') && typeof ORDER_RANK_HUMANOID_ROBOT2026 !== 'undefined') return ORDER_RANK_HUMANOID_ROBOT2026;
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

  const ytdWrap = document.getElementById('ytd-gainers-wrap');
  if (ytdWrap) {
    const showYtd = industryKey === '2026年初涨幅榜';
    ytdWrap.style.display = showYtd ? '' : 'none';
    if (showYtd && typeof YTD_GAINERS2026 !== 'undefined') {
      matchedConfig = true;
      requestAnimationFrame(() => {
        initYtdGainersPosterPage(YTD_GAINERS2026, 'ytd-gainers-pages', 'ytd-gainers-canvas');
        renderYtdGainersTable(YTD_GAINERS2026, 'ytd-gainers-table');
      });
    }
  }

  ORDER_RANK_POSTER_CONFIG.forEach((cfg) => {
    const wrap = document.getElementById(cfg.wrapId);
    if (!wrap) return;
    const show = orderRankConfigMatches(industryKey, cfg);
    wrap.style.display = show ? '' : 'none';
    if (show) {
      matchedConfig = true;
      const data = getOrderRankDatasetByKey(cfg.key);
      if (data) {
        requestAnimationFrame(() => {
          initOrderRankPosterPage(data, cfg.pagesId, cfg.canvasId);
          if (cfg.sourcesId) {
            renderOrderRankSourcesPanel(data, cfg.sourcesId, { analysisDoc: cfg.analysisDoc });
          }
        });
      }
    } else if (cfg.sourcesId) {
      const srcEl = document.getElementById(cfg.sourcesId);
      if (srcEl) srcEl.style.display = 'none';
    }
  });

  if (legacyWrap && !matchedConfig) {
    const data = getOrderRankDatasetByKey(industryKey);
    legacyWrap.style.display = data ? '' : 'none';
    if (data) requestAnimationFrame(() => renderOrderRankPoster(data));
  }
}
