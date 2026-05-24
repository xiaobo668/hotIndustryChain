/**
 * K线教学 — 大纲与章节渲染、分享卡片
 */

const KLINE_POSTER_W = 1080;

function renderKlineOutline() {
  const container = document.getElementById('kline-chapter-list');
  if (!container || typeof KLINE_OUTLINE === 'undefined') return;

  container.innerHTML = KLINE_OUTLINE.parts.map(part => {
    const chCount = (part.chapters || []).length;
    const secCount = (part.sections || []).length;
    const meta = chCount
      ? `${chCount} 章 · 可分享`
      : `${secCount} 节 · 可分享`;
    return `
    <div class="kline-chapter-card" onclick="openKlineChapter('${part.id}')">
      <div class="kline-chapter-part">${part.partLabel}</div>
      <div class="kline-chapter-icon">${part.icon}</div>
      <div class="kline-chapter-title">${part.title}</div>
      <div class="kline-chapter-sub">${part.subtitle}</div>
      <div class="kline-chapter-meta">${meta}</div>
    </div>`;
  }).join('');
}

function renderKlineChapter(partId, chapterId) {
  const part = getKlinePart(partId);
  if (!part) return;

  const chapters = part.chapters || [];
  if (chapters.length && !chapterId) {
    chapterId = chapters[0].id;
  }

  const chapter = chapterId ? getKlineChapter(partId, chapterId) : null;
  const content = chapter || part;

  window._klineCurrentPartId = partId;
  window._klineCurrentChapterId = chapter ? chapter.id : null;

  const welcome = document.getElementById('welcome');
  const klineResult = document.getElementById('kline-result');
  if (welcome) welcome.style.display = 'none';
  if (klineResult) klineResult.classList.add('show');

  const titleEl = document.getElementById('kline-chapter-title');
  const subEl = document.getElementById('kline-chapter-subtitle');
  const bodyEl = document.getElementById('kline-chapter-body');
  const navEl = document.getElementById('kline-chapter-nav');

  if (titleEl) {
    titleEl.textContent = chapter
      ? `${part.partLabel} · ${chapter.chapterLabel} · ${chapter.title}`
      : `${part.partLabel} · ${part.title}`;
  }
  if (subEl) subEl.textContent = content.subtitle || part.subtitle;

  if (bodyEl) {
    let html = '';
    if (chapters.length > 0) {
      html += renderKlineChapterPicker(partId, chapterId);
    }
    html += renderKlineSectionsHtml(content.sections || []);
    const points = content.sharePoints || part.sharePoints;
    if (points && points.length) {
      html += `<div class="kline-key-points">
          <h3 class="kline-section-heading">本章要点（分享摘要）</h3>
          <ul>${points.map(p => `<li>${p}</li>`).join('')}</ul>
        </div>`;
    }
    bodyEl.innerHTML = html;
  }

  if (navEl) {
    navEl.innerHTML = renderKlineChapterNav(partId, chapterId);
  }

  const posterWrap = document.getElementById('kline-share-poster-pages');
  if (posterWrap) posterWrap.innerHTML = '';

  switchKlineTab('kline-content', document.querySelector('#kline-tabs .kline-tab-btn[data-tab="kline-content"]'));

  requestAnimationFrame(() => {
    if (typeof initKlineCharts === 'function') initKlineCharts();
  });
}

function renderKlineChapterPicker(partId, activeChapterId) {
  const part = getKlinePart(partId);
  if (!part || !(part.chapters || []).length) return '';
  return `
    <div class="kline-chapter-picker">
      ${part.chapters.map(ch => `
        <button type="button"
          class="kline-chapter-picker-btn ${ch.id === activeChapterId ? 'active' : ''}"
          onclick="openKlineChapter('${partId}', '${ch.id}')">
          ${ch.icon || '📄'} ${ch.chapterLabel} ${ch.title}
        </button>
      `).join('')}
    </div>`;
}

function renderKlineChartBlock(sec, index, chartKey, suffix) {
  const key = chartKey || sec.chart;
  if (!key) return '';
  const id = 'kline-chart-' + key + '-' + index + (suffix || '');
  return `
    <div class="kline-chart-wrap">
      <div class="kline-chart-slot" id="${id}" data-chart="${key}" role="img" aria-label="K线与MACD示意图"></div>
      ${!suffix && sec.chartCaption ? `<p class="kline-chart-caption">${sec.chartCaption}</p>` : '<p class="kline-chart-caption"></p>'}
    </div>`;
}

function renderKlineSectionCharts(sec, index) {
  const a = sec.chart ? renderKlineChartBlock(sec, index) : '';
  const b = sec.chart2 ? renderKlineChartBlock(sec, index, sec.chart2, '-b') : '';
  if (a && b) return `<div class="kline-chart-row">${a}${b}</div>`;
  return a + b;
}

function renderKlineSectionsHtml(sections) {
  return (sections || []).map((sec, index) => `
      <div class="kline-section">
        <h3 class="kline-section-heading">${sec.heading}</h3>
        ${renderKlineSectionCharts(sec, index)}
        <div class="kline-section-body">${formatKlineBody(sec.body)}</div>
      </div>
    `).join('');
}

function renderKlineChapterNav(partId, chapterId) {
  const part = getKlinePart(partId);
  const chapters = part?.chapters || [];
  const partIdx = KLINE_OUTLINE.parts.findIndex(p => p.id === partId);
  const prevPart = partIdx > 0 ? KLINE_OUTLINE.parts[partIdx - 1] : null;
  const nextPart = partIdx < KLINE_OUTLINE.parts.length - 1 ? KLINE_OUTLINE.parts[partIdx + 1] : null;

  if (chapters.length && chapterId) {
    const chIdx = chapters.findIndex(c => c.id === chapterId);
    const prevCh = chIdx > 0 ? chapters[chIdx - 1] : null;
    const nextCh = chIdx < chapters.length - 1 ? chapters[chIdx + 1] : null;
    return `
      ${prevCh ? `<button class="btn btn-secondary" onclick="openKlineChapter('${partId}', '${prevCh.id}')">← ${prevCh.chapterLabel}</button>` : '<span></span>'}
      <button class="btn btn-secondary" onclick="backToKlineOutline()">📚 返回大纲</button>
      ${nextCh ? `<button class="btn btn-secondary" onclick="openKlineChapter('${partId}', '${nextCh.id}')">${nextCh.chapterLabel} →</button>` : '<span></span>'}
    `;
  }

  return `
    ${prevPart ? `<button class="btn btn-secondary" onclick="openKlineChapter('${prevPart.id}')">← ${prevPart.partLabel}</button>` : '<span></span>'}
    <button class="btn btn-secondary" onclick="backToKlineOutline()">📚 返回大纲</button>
    ${nextPart ? `<button class="btn btn-secondary" onclick="openKlineChapter('${nextPart.id}')">${nextPart.partLabel} →</button>` : '<span></span>'}
  `;
}

function formatKlineBody(text) {
  if (!text) return '<p class="kline-placeholder">（内容待补充）</p>';
  return String(text)
    .split('\n')
    .filter(Boolean)
    .map(line => `<p>${line}</p>`)
    .join('');
}

function backToKlineOutline() {
  if (typeof disposeKlineCharts === 'function') disposeKlineCharts();
  window._klineCurrentPartId = null;
  window._klineCurrentChapterId = null;
  const welcome = document.getElementById('welcome');
  const klineResult = document.getElementById('kline-result');
  const spaceWrap = document.getElementById('kline-space-wrap');
  if (klineResult) klineResult.classList.remove('show');
  if (spaceWrap) spaceWrap.style.display = 'none';
  if (welcome) welcome.style.display = '';
  const welcomeKline = document.getElementById('welcome-kline');
  if (welcomeKline) welcomeKline.style.display = '';
  window.location.hash = 'kline';
}

function switchKlineTab(tabId, btn) {
  document.querySelectorAll('#kline-tabs .kline-tab-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  document.querySelectorAll('#kline-result .view-panel').forEach(p => p.classList.remove('active'));
  const panel = document.getElementById('view-' + tabId);
  if (panel) panel.classList.add('active');

  if (tabId === 'kline-share' && window._klineCurrentPartId) {
    const container = document.getElementById('kline-share-poster-pages');
    if (container && container.children.length === 0) {
      requestAnimationFrame(() => renderKlineSharePoster(
        window._klineCurrentPartId,
        window._klineCurrentChapterId
      ));
    }
  }
}

function renderKlineSharePoster(partId, chapterId) {
  const part = getKlinePart(partId);
  const chapter = chapterId ? getKlineChapter(partId, chapterId) : null;
  const content = chapter || part;
  const container = document.getElementById('kline-share-poster-pages');
  if (!content || !container) return;

  container.innerHTML = '';
  const canvas = createKlineShareCanvas(part, chapter);
  const wrapper = document.createElement('div');
  wrapper.className = 'poster-canvas-item-wrapper';
  const label = document.createElement('div');
  label.className = 'poster-page-label';
  label.textContent = '分享卡片预览';
  wrapper.appendChild(label);
  canvas.className = 'poster-canvas-item';
  canvas.id = 'kline-share-canvas';
  wrapper.appendChild(canvas);
  container.appendChild(wrapper);
}

function createKlineShareCanvas(part, chapter) {
  const padding = 72;
  const W = KLINE_POSTER_W;
  const lineH = 52;
  const points = (chapter && chapter.sharePoints) || part.sharePoints || [];
  const H = 420 + points.length * lineH;

  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');

  const grad = ctx.createLinearGradient(0, 0, W, H);
  grad.addColorStop(0, '#0f172a');
  grad.addColorStop(0.5, '#1e293b');
  grad.addColorStop(1, '#0f172a');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  ctx.strokeStyle = 'rgba(245, 158, 11, 0.35)';
  ctx.lineWidth = 3;
  ctx.strokeRect(24, 24, W - 48, H - 48);

  let y = padding + 20;
  ctx.fillStyle = '#f59e0b';
  ctx.font = '600 36px "PingFang SC", sans-serif';
  ctx.fillText(chapter ? `${part.partLabel} · ${chapter.chapterLabel}` : part.partLabel, padding, y);
  y += 56;

  ctx.fillStyle = '#f8fafc';
  ctx.font = 'bold 52px "PingFang SC", sans-serif';
  wrapCanvasText(ctx, chapter ? chapter.title : part.title, padding, y, W - padding * 2, 58);
  y += 72;

  ctx.fillStyle = '#94a3b8';
  ctx.font = '32px "PingFang SC", sans-serif';
  wrapCanvasText(ctx, (chapter && chapter.subtitle) || part.subtitle, padding, y, W - padding * 2, 40);
  y += 64;

  ctx.fillStyle = '#10b981';
  ctx.font = '600 28px "PingFang SC", sans-serif';
  ctx.fillText('本章要点', padding, y);
  y += 44;

  ctx.fillStyle = '#e2e8f0';
  ctx.font = '28px "PingFang SC", sans-serif';
  points.forEach((p, i) => {
    wrapCanvasText(ctx, `${i + 1}. ${p}`, padding + 8, y, W - padding * 2 - 16, 36);
    y += lineH;
  });

  y += 24;
  ctx.fillStyle = 'rgba(148, 163, 184, 0.8)';
  ctx.font = '24px "PingFang SC", sans-serif';
  ctx.fillText('K线教学 · 产业链分析工具', padding, H - padding);

  return canvas;
}

function wrapCanvasText(ctx, text, x, y, maxWidth, lineHeight) {
  const chars = String(text).split('');
  let line = '';
  let cy = y;
  for (let i = 0; i < chars.length; i++) {
    const test = line + chars[i];
    if (ctx.measureText(test).width > maxWidth && line) {
      ctx.fillText(line, x, cy);
      line = chars[i];
      cy += lineHeight;
    } else {
      line = test;
    }
  }
  if (line) ctx.fillText(line, x, cy);
}

function downloadKlineSharePoster() {
  const canvas = document.getElementById('kline-share-canvas');
  if (!canvas) {
    alert('请先在「分享卡片」标签页生成预览');
    return;
  }
  const part = getKlinePart(window._klineCurrentPartId);
  const name = part ? `K线教学-${part.id}.png` : 'kline-share.png';
  const link = document.createElement('a');
  link.download = name;
  link.href = canvas.toDataURL('image/png');
  link.click();
}

async function copyKlineSharePoster() {
  const canvas = document.getElementById('kline-share-canvas');
  if (!canvas) {
    alert('请先在「分享卡片」标签页生成预览');
    return;
  }
  try {
    const blob = await new Promise(res => canvas.toBlob(res, 'image/png'));
    await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
    alert('✅ 分享卡片已复制到剪贴板');
  } catch (e) {
    alert('复制图片失败，请使用下载按钮');
  }
}

function generateKlineShareModule(partId, chapterId) {
  const pid = partId || window._klineCurrentPartId;
  const cid = chapterId || window._klineCurrentChapterId;
  if (!pid) {
    alert('请先选择章节');
    return;
  }
  openKlineChapter(pid, cid);
  switchKlineTab('kline-share', document.querySelector('#kline-tabs .kline-tab-btn[data-tab="kline-share"]'));
  requestAnimationFrame(() => renderKlineSharePoster(pid, cid));
}
