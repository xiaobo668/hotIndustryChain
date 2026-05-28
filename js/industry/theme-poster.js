/**
 * 主题涨幅榜海报（浅蓝白风格，与产业链 poster.js 一致）
 * 数据：THEME_POSTER_MAY2026（data/theme-poster-may2026.js）
 */
const THEME_PAGE_W = 430;

function estimateThemePosterHeight(data) {
  const TITLE_H = 72;
  const SUB_H = 36;
  const THEME_GAP = 10;
  const THEME_HEAD = 36;
  const ROW_H = 22;
  const FOOTER_H = 28;
  let h = TITLE_H + SUB_H;
  data.themes.forEach(() => {
    h += THEME_HEAD + 5 * ROW_H + 8 + THEME_GAP;
  });
  return h + FOOTER_H;
}

function renderThemePoster(data) {
  const container = document.getElementById('theme-poster-pages');
  if (!container || !data) return;
  container.innerHTML = '';
  const dpr = window.devicePixelRatio || 1;
  const W = THEME_PAGE_W;
  const H = estimateThemePosterHeight(data);

  const label = document.createElement('div');
  label.className = 'poster-page-label';
  label.textContent = '主题涨幅榜 · ' + data.period;
  container.appendChild(label);

  const canvas = document.createElement('canvas');
  canvas.className = 'poster-canvas-item';
  canvas.id = 'theme-poster-canvas';
  canvas.width = W * dpr;
  canvas.height = H * dpr;
  canvas.style.width = W + 'px';
  canvas.style.height = H + 'px';
  container.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  drawThemePoster(ctx, data, W, H);
}

function drawThemePoster(ctx, data, W, H) {
  const PAD = 12;
  const TITLE_H = 72;
  const SUB_H = 36;
  const THEME_GAP = 10;
  const THEME_HEAD = 36;
  const ROW_H = 22;
  const FOOTER_H = 28;
  const CARD_RADIUS = 10;
  const borderBlue = '#4a90c8';
  const barColors = ['#1e40af', '#2563eb', '#1d4ed8', '#0369a1', '#0c4a6e', '#075985'];

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
  ctx.font = 'bold 16px "PingFang SC", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(data.title, W / 2, y + 18);
  ctx.font = '10px "PingFang SC", sans-serif';
  ctx.fillStyle = '#475569';
  ctx.fillText(data.period + ' · ' + data.periodNote, W / 2, y + 38);
  ctx.textAlign = 'left';
  y = TITLE_H + 4;

  const cardW = W - PAD * 2;
  const innerPadX = 10;

  data.themes.forEach((theme, ti) => {
    const cardH = THEME_HEAD + 5 * ROW_H + 8;
    const cardX = PAD;
    const barColor = barColors[ti % barColors.length];

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
    const bgrad = ctx.createLinearGradient(cardX, y, cardX, y + THEME_HEAD);
    bgrad.addColorStop(0, barColor);
    bgrad.addColorStop(1, '#1e3a8a');
    ctx.fillStyle = bgrad;
    ctx.fillRect(cardX, y, cardW, THEME_HEAD);
    ctx.restore();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 11px "PingFang SC", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(theme.name + ' · ' + theme.coreTech.slice(0, 22) + (theme.coreTech.length > 22 ? '…' : ''), cardX + cardW / 2, y + THEME_HEAD / 2);
    ctx.textBaseline = 'alphabetic';
    ctx.textAlign = 'left';

    let cy = y + THEME_HEAD + 4;
    theme.companies.forEach((co, ci) => {
      if (ci > 0) {
        ctx.strokeStyle = '#e8eef5';
        ctx.beginPath();
        ctx.moveTo(cardX + innerPadX, cy + ci * ROW_H);
        ctx.lineTo(cardX + cardW - innerPadX, cy + ci * ROW_H);
        ctx.stroke();
      }
      const midY = cy + ci * ROW_H + ROW_H / 2;
      const baseX = cardX + innerPadX;
      const rightX = cardX + cardW - innerPadX;

      ctx.textBaseline = 'middle';
      ctx.font = 'bold 10px "PingFang SC", sans-serif';
      ctx.fillStyle = '#64748b';
      ctx.fillText(String(ci + 1) + '.', baseX, midY);

      ctx.font = 'bold 11px "PingFang SC", sans-serif';
      ctx.fillStyle = '#0f172a';
      const nameX = baseX + 16;
      let nameStr = co.name;
      const maxNameW = innerPadX * 3.2;
      if (ctx.measureText(nameStr).width > maxNameW) {
        nameStr = fitOneLineWidth(ctx, nameStr, maxNameW);
      }
      ctx.fillText(nameStr, nameX, midY);
      const nameW = ctx.measureText(nameStr).width;

      const pctStr = co.pctLabel;
      ctx.font = 'bold 11px "PingFang SC", sans-serif';
      ctx.fillStyle = co.pct >= 0 ? '#dc2626' : '#059669';
      const pctW = ctx.measureText(pctStr).width;
      ctx.fillText(pctStr, rightX - pctW, midY);

      const descX = nameX + nameW + 6;
      const maxDescW = rightX - pctW - 8 - descX;
      if (maxDescW > 20) {
        ctx.font = '9px "PingFang SC", sans-serif';
        ctx.fillStyle = '#64748b';
        const desc = fitOneLineWidth(ctx, co.highlight || '', maxDescW);
        ctx.fillText(desc, descX, midY);
      }
      ctx.textBaseline = 'alphabetic';
    });

    y += cardH + THEME_GAP;
  });

  ctx.fillStyle = '#64748b';
  ctx.font = '9px "PingFang SC", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(
    `产业链分析工具 · 行情来源：腾讯前复权日线 · ${data.generatedAt} · 仅供参考，不构成投资建议`,
    W / 2,
    H - FOOTER_H / 2 + 2
  );
  ctx.textAlign = 'left';
}

function downloadThemePoster() {
  const canvas = document.getElementById('theme-poster-canvas');
  if (!canvas) return;
  const link = document.createElement('a');
  link.download = '主题涨幅榜-20260506-20260528.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
}

async function copyThemePoster() {
  const canvas = document.getElementById('theme-poster-canvas');
  if (!canvas) return;
  try {
    const blob = await new Promise((res) => canvas.toBlob(res, 'image/png'));
    await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
    alert('✅ 海报已复制到剪贴板');
  } catch (e) {
    alert('复制失败，请使用下载按钮');
  }
}

function initThemePosterPage() {
  if (typeof THEME_POSTER_MAY2026 !== 'undefined') {
    renderThemePoster(THEME_POSTER_MAY2026);
  }
}
