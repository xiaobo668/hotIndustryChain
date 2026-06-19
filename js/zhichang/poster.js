/**
 * 职场海报 — 模版底图 + 中间文字
 */
let _zhichangTemplateImage = null;
let _zhichangTemplateLoading = null;

function getZhichangPosterSize() {
  const tpl = ZHICHANG_POSTER_TEMPLATE;
  const W = tpl.displayWidth;
  const H = Math.round(W * (tpl.height / tpl.width));
  return { W, H, tpl };
}

function loadZhichangTemplateImage() {
  if (_zhichangTemplateImage) return Promise.resolve(_zhichangTemplateImage);
  if (_zhichangTemplateLoading) return _zhichangTemplateLoading;

  _zhichangTemplateLoading = new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      _zhichangTemplateImage = img;
      resolve(img);
    };
    img.onerror = () => reject(new Error('职场海报模版加载失败'));
    img.src = ZHICHANG_POSTER_TEMPLATE.src;
  });
  return _zhichangTemplateLoading;
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

  const totalH = lines.length * lh;
  return { lines, fontSize, lineHeight: lh, totalH };
}

function drawZhichangPoster(ctx, text, W, H, tpl, img) {
  ctx.drawImage(img, 0, 0, W, H);

  const zone = tpl.textZone;
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

  return loadZhichangTemplateImage().then((img) => {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';

    const ctx = canvas.getContext('2d');
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
    drawZhichangPoster(ctx, text, W, H, tpl, img);
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
