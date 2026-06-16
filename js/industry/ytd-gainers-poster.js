/**
 * 2026 年初至今涨幅 Top15 海报
 * 数据：YTD_GAINERS2026（data/ytd-gainers2026.js）
 */
const YTD_PAGE_W = 430;

const RISE_TYPE_STYLE = {
  业绩: { bg: '#dcfce7', fg: '#166534', label: '业绩' },
  情绪: { bg: '#dbeafe', fg: '#1e40af', label: '情绪' },
  炒作: { bg: '#ffedd5', fg: '#c2410c', label: '炒作' },
};

function estimateYtdGainersHeight(data) {
  const TITLE_H = 78;
  const SUB_H = 40;
  const CARD_HEAD = 34;
  const ROW_H = 46;
  const FOOTER_H = 30;
  const n = (data.companies || []).length;
  return TITLE_H + SUB_H + CARD_HEAD + n * ROW_H + 10 + FOOTER_H;
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
  const PAD = 12;
  const TITLE_H = 78;
  const SUB_H = 40;
  const CARD_HEAD = 34;
  const ROW_H = 46;
  const FOOTER_H = 30;
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

  let y = 14;
  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 15px "PingFang SC", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(data.title, W / 2, y + 16);
  ctx.font = '8.5px "PingFang SC", sans-serif';
  ctx.fillStyle = '#475569';
  const sub = (data.period || '') + ' · 沪深主板/创业板';
  ctx.fillText(sub, W / 2, y + 34);
  ctx.textAlign = 'left';
  y = TITLE_H + 4;

  const cardW = W - PAD * 2;
  const cardX = PAD;
  const cardH = CARD_HEAD + data.companies.length * ROW_H + 8;

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
  ctx.fillText('公司 · 涨幅 · 涨跌归因', cardX + cardW / 2, y + CARD_HEAD / 2);
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

  ctx.fillStyle = '#64748b';
  ctx.font = '8.5px "PingFang SC", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(
    `产业链分析工具 · ${data.generatedAt || ''} · 行情来源东方财富 · 涨跌归因仅供参考`,
    W / 2,
    H - FOOTER_H / 2 + 2
  );
  ctx.textAlign = 'left';
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
    <p class="ytd-gainers-note">${data.subtitle || ''}</p>
  `;
}
