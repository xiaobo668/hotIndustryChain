/**
 * 2026 年初至今涨幅 Top15 海报
 * 版式与订单排行榜海报（order-rank-poster.js）一致
 */
const YTD_PAGE_W = 430;

const YTD_GAINERS_POSTER_FOOTER_LINES = [
  '数据来源于东方财富公开行情（f25 年初至今涨跌幅），涨跌归因为产业信息整理，仅用于行业学习参考，',
  '不构成证券投资建议；不提供任何选股、行情或买卖指导。',
  '行情实时变动，请以交易所披露为准；自主投资请独立审慎判断。',
];

const YTD_GAINERS_POSTER_LAYOUT = {
  PAD: 12,
  TOP: 14,
  TITLE_FONT: 'bold 17px "PingFang SC", sans-serif',
  TITLE_H: 20,
  SUB_FONT: '9px "PingFang SC", sans-serif',
  SUB_LINE_H: 12,
  SUB_LINES: 2,
  GAP: 10,
  CARD_HEAD: 34,
  ROW_H: 46,
  FOOTER_LINES: YTD_GAINERS_POSTER_FOOTER_LINES.length,
  FOOTER_LINE_H: 12,
  FOOTER_FONT: 'bold 9px "PingFang SC", sans-serif',
};

const RISE_TYPE_STYLE = {
  业绩: { bg: '#dcfce7', fg: '#166534', label: '业绩' },
  情绪: { bg: '#dbeafe', fg: '#1e40af', label: '情绪' },
  炒作: { bg: '#ffedd5', fg: '#c2410c', label: '炒作' },
};

function splitYtdSubtitleTwoLines(ctx, subtitle, maxWidth) {
  if (typeof splitOrderRankSubtitleTwoLines === 'function') {
    return splitOrderRankSubtitleTwoLines(ctx, subtitle, maxWidth);
  }
  if (!subtitle) return ['', ''];
  let line1 = '';
  for (const ch of subtitle) {
    const test = line1 + ch;
    if (ctx.measureText(test).width > maxWidth && line1) {
      return [line1, subtitle.slice(line1.length)];
    }
    line1 = test;
  }
  return [line1, ''];
}

function estimateYtdGainersHeight(data) {
  const L = YTD_GAINERS_POSTER_LAYOUT;
  const n = (data.companies || []).length;
  const headerH = L.TOP + L.TITLE_H + L.SUB_LINES * L.SUB_LINE_H + L.GAP;
  const cardH = L.CARD_HEAD + n * L.ROW_H + 8;
  return headerH + cardH + L.GAP + L.FOOTER_LINES * L.FOOTER_LINE_H + 10;
}

function renderYtdGainersPoster(data, containerId, canvasId) {
  const container = document.getElementById(containerId || 'ytd-gainers-pages');
  if (!container || !data) return null;
  container.innerHTML = '';
  const dpr = window.devicePixelRatio || 1;
  const W = YTD_PAGE_W;
  const H = estimateYtdGainersHeight(data);

  const label = document.createElement('div');
  label.className = 'poster-page-label';
  label.textContent = data.title + ' · ' + (data.period || '');
  container.appendChild(label);

  const canvas = document.createElement('canvas');
  canvas.className = 'poster-canvas-item';
  canvas.id = canvasId || 'ytd-gainers-canvas';
  canvas.width = W * dpr;
  canvas.height = H * dpr;
  canvas.style.width = W + 'px';
  canvas.style.height = H + 'px';
  container.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  drawYtdGainersPoster(ctx, data, W, H);
  return canvas;
}

function drawRiseTypeBadge(ctx, type, x, y) {
  const st = RISE_TYPE_STYLE[type] || RISE_TYPE_STYLE['情绪'];
  const w = 30;
  const h = 14;
  roundRect(ctx, x, y, w, h, 4);
  ctx.fillStyle = st.bg;
  ctx.fill();
  ctx.strokeStyle = st.fg;
  ctx.lineWidth = 0.8;
  ctx.stroke();
  ctx.fillStyle = st.fg;
  ctx.font = 'bold 9px "PingFang SC", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(st.label, x + w / 2, y + h / 2 + 0.5);
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
}

function drawYtdGainersPoster(ctx, data, W, H) {
  const L = YTD_GAINERS_POSTER_LAYOUT;
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
  const subLines = splitYtdSubtitleTwoLines(ctx, data.subtitle || '', W - L.PAD * 2);
  subLines.forEach((line, i) => {
    if (line) ctx.fillText(line, W / 2, y + 10 + i * L.SUB_LINE_H);
  });
  y += L.SUB_LINES * L.SUB_LINE_H + L.GAP;
  ctx.textAlign = 'left';

  const cardW = W - L.PAD * 2;
  const cardX = L.PAD;
  const cardH = L.CARD_HEAD + data.companies.length * L.ROW_H + 8;

  roundRect(ctx, cardX, y, cardW, cardH, CARD_RADIUS);
  ctx.fillStyle = '#ffffff';
  ctx.fill();
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
  ctx.fillText('公司 · 涨幅 · 涨跌归因', cardX + cardW / 2, y + L.CARD_HEAD / 2);
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
    ctx.fillText(String(co.rank) + '.', baseX, rowTop + 14);

    const nameX = baseX + 18;
    ctx.font = 'bold 11px "PingFang SC", sans-serif';
    ctx.fillStyle = '#0f172a';
    let nameStr = co.name;
    const pctStr = co.pctLabel || '';
    const pctW = 52;
    const badgeW = 34;
    const maxNameW = maxLineW - 18 - pctW - badgeW - 8;
    if (ctx.measureText(nameStr).width > maxNameW) {
      nameStr = fitOneLineWidth(ctx, nameStr, maxNameW);
    }
    ctx.fillText(nameStr, nameX, rowTop + 14);

    ctx.font = 'bold 10px "PingFang SC", sans-serif';
    ctx.fillStyle = co.pct >= 0 ? '#dc2626' : '#16a34a';
    ctx.textAlign = 'right';
    ctx.fillText(pctStr, cardX + cardW - innerPadX - badgeW - 4, rowTop + 14);
    ctx.textAlign = 'left';

    drawRiseTypeBadge(ctx, co.riseType, cardX + cardW - innerPadX - badgeW, rowTop + 4);

    ctx.font = '9px "PingFang SC", sans-serif';
    ctx.fillStyle = '#64748b';
    const why = co.whyUp || co.highlight || '';
    ctx.fillText(fitOneLineWidth(ctx, why, maxLineW - 4), baseX + 4, rowTop + 30);
  });

  const cardBottom = y + cardH;
  ctx.fillStyle = '#475569';
  ctx.font = L.FOOTER_FONT;
  ctx.textAlign = 'center';
  const footerTop = cardBottom + L.GAP;
  const footerLines = data.footerLines || YTD_GAINERS_POSTER_FOOTER_LINES;
  footerLines.forEach((line, i) => {
    ctx.fillText(line, W / 2, footerTop + 10 + i * L.FOOTER_LINE_H);
  });
  ctx.textAlign = 'left';
}

function getYtdGainersDisclaimerHtml(data) {
  const text =
    data.disclaimer ||
    '免责声明：涨幅数据来源于东方财富公开行情（f25 年初至今涨跌幅），涨跌归因为产业信息整理，仅用于行业学习参考，不构成证券投资建议；不提供任何选股、行情或买卖指导。行情实时变动，请以交易所披露为准；自主投资请独立审慎判断。';
  return text;
}

function initYtdGainersPosterPage(data, containerId, canvasId) {
  if (data) renderYtdGainersPoster(data, containerId, canvasId);
}

function downloadYtdGainersPoster(canvasId, filename) {
  const canvas = document.getElementById(canvasId || 'ytd-gainers-canvas');
  if (!canvas) return;
  const link = document.createElement('a');
  link.download = filename || '2026年初涨幅Top15.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
}

async function copyYtdGainersPoster(canvasId) {
  const canvas = document.getElementById(canvasId || 'ytd-gainers-canvas');
  if (!canvas) return;
  try {
    const blob = await new Promise((res) => canvas.toBlob(res, 'image/png'));
    await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
    alert('✅ 涨幅榜海报已复制到剪贴板');
  } catch (e) {
    alert('复制失败，请使用下载按钮');
  }
}

function renderYtdGainersTable(data, tableElId) {
  const el = document.getElementById(tableElId);
  if (!el || !data?.companies?.length) return;
  const typeCls = { 业绩: 'type-official', 情绪: 'type-media', 炒作: 'type-hype' };
  el.innerHTML = `
    <table class="ytd-gainers-table">
      <thead><tr><th>#</th><th>公司</th><th>涨幅</th><th>归因</th><th>为什么涨</th></tr></thead>
      <tbody>
        ${data.companies
          .map(
            (co) => `<tr>
          <td>${co.rank}</td>
          <td><strong>${co.name}</strong><br><span class="code">${co.code || ''}</span></td>
          <td class="pct">${co.pctLabel}</td>
          <td><span class="rise-tag ${typeCls[co.riseType] || ''}">${co.riseType}</span></td>
          <td>${co.whyUp}</td>
        </tr>`
          )
          .join('')}
      </tbody>
    </table>
    <p class="ytd-gainers-sub">${data.subtitle || ''}</p>
    <p class="ytd-gainers-footer">${getYtdGainersDisclaimerHtml(data)}</p>
  `;
}
