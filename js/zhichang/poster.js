/**
 * 职场海报 — 纯色底 + 装饰图 + 中间文字
 */
const _zhichangImageCache = {};
const _zhichangImageLoading = {};

function getZhichangPosterSize() {
  const tpl = ZHICHANG_POSTER_TEMPLATE;
  const W = tpl.displayWidth;
  const H = Math.round(W * (tpl.height / tpl.width));
  return { W, H, tpl };
}

function loadZhichangImage(src) {
  if (_zhichangImageCache[src]) return Promise.resolve(_zhichangImageCache[src]);
  if (_zhichangImageLoading[src]) return _zhichangImageLoading[src];

  _zhichangImageLoading[src] = new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      _zhichangImageCache[src] = img;
      resolve(img);
    };
    img.onerror = () => reject(new Error('职场海报资源加载失败: ' + src));
    img.src = src;
  });
  return _zhichangImageLoading[src];
}

function loadZhichangPosterAssets(tpl) {
  const decors = tpl.decorations || [];
  return Promise.all(decors.map((d) => loadZhichangImage(d.src)));
}

function splitZhichangLines(text) {
  return String(text || '')
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);
}

function wrapZhichangLine(ctx, line, maxWidth) {
  if (!line) return [''];
  const chars = line.split('');
  const lines = [];
  let current = '';
  for (let i = 0; i < chars.length; i++) {
    const test = current + chars[i];
    if (ctx.measureText(test).width > maxWidth && current) {
      lines.push(current);
      current = chars[i];
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);
  return lines.length ? lines : [''];
}

function layoutZhichangText(ctx, text, maxWidth, maxHeight, fontSize, lineHeight) {
  const rawLines = splitZhichangLines(text);
  if (!rawLines.length) rawLines.push('在此输入文字');

  if (rawLines.length >= 8) {
    fontSize = Math.min(fontSize, 18);
    lineHeight = 1.4;
  }
  if (rawLines.length >= 12) {
    fontSize = Math.min(fontSize, 15);
  }

  ctx.font = `${ZHICHANG_POSTER_TEMPLATE.font.weight} ${fontSize}px ${ZHICHANG_POSTER_TEMPLATE.font.family}`;
  const lh = fontSize * lineHeight;
  let lines = [];
  rawLines.forEach((raw) => {
    lines = lines.concat(wrapZhichangLine(ctx, raw, maxWidth));
  });

  while (lines.length * lh > maxHeight && fontSize > ZHICHANG_POSTER_TEMPLATE.font.minSize) {
    fontSize -= 1;
    ctx.font = `${ZHICHANG_POSTER_TEMPLATE.font.weight} ${fontSize}px ${ZHICHANG_POSTER_TEMPLATE.font.family}`;
    lines = [];
    rawLines.forEach((raw) => {
      lines = lines.concat(wrapZhichangLine(ctx, raw, maxWidth));
    });
  }

  const totalH = lines.length * (fontSize * lineHeight);
  return { lines, fontSize, lineHeight: fontSize * lineHeight, totalH };
}

function drawZhichangDecorations(ctx, W, H, tpl, decorImages) {
  (tpl.decorations || []).forEach((decor, i) => {
    const img = decorImages[i];
    if (!img) return;
    const dw = W * decor.wRatio;
    const dh = (img.height / img.width) * dw;
    const dx = W * decor.xRatio;
    const dy = H * decor.yRatio;
    ctx.drawImage(img, dx, dy, dw, dh);
  });
}

function drawZhichangPoster(ctx, text, W, H, tpl, decorImages) {
  ctx.fillStyle = tpl.bgColor || '#f4efe6';
  ctx.fillRect(0, 0, W, H);

  drawZhichangDecorations(ctx, W, H, tpl, decorImages);

  const rawLineCount = splitZhichangLines(text).length;
  const zone = { ...tpl.textZone };
  if (rawLineCount >= 8) {
    zone.yRatio = 0.20;
    zone.hRatio = 0.56;
  }

  const x = W * zone.xRatio;
  const y = H * zone.yRatio;
  const maxW = W * zone.wRatio;
  const maxH = H * zone.hRatio;

  const layout = layoutZhichangText(
    ctx,
    text,
    maxW,
    maxH,
    tpl.font.size,
    tpl.font.lineHeight
  );

  ctx.fillStyle = tpl.font.color;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';

  const startY = y + (maxH - layout.totalH) / 2;
  layout.lines.forEach((line, i) => {
    ctx.font = `${tpl.font.weight} ${layout.fontSize}px ${tpl.font.family}`;
    ctx.fillText(line, x + maxW / 2, startY + i * layout.lineHeight);
  });
}

function renderZhichangPosterToCanvas(text, canvasId) {
  const { W, H, tpl } = getZhichangPosterSize();
  const canvas = document.getElementById(canvasId || 'zhichang-poster-canvas');
  if (!canvas) return Promise.reject(new Error('canvas not found'));

  return loadZhichangPosterAssets(tpl).then((decorImages) => {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';

    const ctx = canvas.getContext('2d');
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
    drawZhichangPoster(ctx, text, W, H, tpl, decorImages);
    return canvas;
  });
}

function renderZhichangTemplatePreview(text) {
  const container = document.getElementById('zhichang-template-preview');
  if (!container) return;

  container.innerHTML = '';
  const label = document.createElement('div');
  label.className = 'poster-page-label';
  label.textContent = '职场海报 · 模版预览';
  container.appendChild(label);

  const canvas = document.createElement('canvas');
  canvas.className = 'poster-canvas-item zhichang-poster-canvas';
  canvas.id = 'zhichang-poster-canvas';
  container.appendChild(canvas);

  return renderZhichangPosterToCanvas(
    text || ZHICHANG_POSTER_TEMPLATE.sampleText,
    'zhichang-poster-canvas'
  );
}

function downloadZhichangPoster(filename) {
  const canvas = document.getElementById('zhichang-poster-canvas');
  if (!canvas) return;
  const name = filename || '职场海报.png';
  const link = document.createElement('a');
  link.download = name;
  link.href = canvas.toDataURL('image/png');
  link.click();
}

async function copyZhichangPoster() {
  const canvas = document.getElementById('zhichang-poster-canvas');
  if (!canvas) return;
  try {
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
    await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
    alert('✅ 海报已复制到剪贴板');
  } catch (e) {
    alert('复制失败，请使用下载按钮');
  }
}

function applyZhichangSample(text) {
  const input = document.getElementById('zhichang-poster-text');
  if (input) input.value = text;
  renderZhichangTemplatePreview(text);
}
