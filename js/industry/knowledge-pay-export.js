/**
 * 产业知识付费 · PPTX / PNG 导出
 */
var KP_EXPORT = {
  W: 1280,
  H: 720,
  PAD: 56,
  FOOTER_H: 36,
};

function kpGetFlatSlides(course) {
  var list = [];
  if (!course || !course.chapters) return list;
  course.chapters.forEach(function (ch, ci) {
    (ch.slides || []).forEach(function (sl, si) {
      list.push({
        chapterIndex: ci + 1,
        chapterTitle: ch.title,
        slideIndex: si + 1,
        globalIndex: list.length + 1,
        slide: sl,
      });
    });
  });
  return list;
}

function kpIsBeginnerSlide(sl) {
  var t = sl.title || '';
  return t.indexOf('【零基础】') >= 0 || t.indexOf('【案例】') >= 0 || t.indexOf('【答案') >= 0;
}

function kpWrapCanvasLines(ctx, text, maxW) {
  var lines = [];
  var line = '';
  for (var i = 0; i < text.length; i++) {
    var ch = text.charAt(i);
    var test = line + ch;
    if (ctx.measureText(test).width > maxW && line) {
      lines.push(line);
      line = ch;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines.length ? lines : [''];
}

function kpMeasureSlideContent(ctx, item, maxW, fonts) {
  var sl = item.slide;
  var h = fonts.titleSize + 24;
  ctx.font = 'bold ' + fonts.titleSize + 'px "PingFang SC","Microsoft YaHei",sans-serif';
  kpWrapCanvasLines(ctx, sl.title || '', maxW).forEach(function () {
    h += fonts.titleSize + 4;
  });
  h += 12;

  ctx.font = fonts.bodySize + 'px "PingFang SC","Microsoft YaHei",sans-serif';
  (sl.bullets || []).forEach(function (b) {
    var lines = kpWrapCanvasLines(ctx, b, maxW - 28);
    h += lines.length * (fonts.bodyLine + 6) + 4;
  });

  if (sl.plainExplain) {
    h += 12;
    ctx.font = fonts.noteSize + 'px "PingFang SC","Microsoft YaHei",sans-serif';
    h +=
      kpWrapCanvasLines(ctx, '通俗说：' + sl.plainExplain, maxW - 24).length * (fonts.noteLine + 4) + 20;
  }
  if (sl.dealerTip) {
    h += 12;
    ctx.font = fonts.noteSize + 'px "PingFang SC","Microsoft YaHei",sans-serif';
    h +=
      kpWrapCanvasLines(ctx, '经销要点：' + sl.dealerTip, maxW - 24).length * (fonts.noteLine + 4) + 20;
  }
  return h;
}

function kpPickFonts(ctx, item, maxW) {
  var sets = [
    { titleSize: 32, bodySize: 20, bodyLine: 28, noteSize: 16, noteLine: 24 },
    { titleSize: 28, bodySize: 18, bodyLine: 26, noteSize: 15, noteLine: 22 },
    { titleSize: 24, bodySize: 16, bodyLine: 24, noteSize: 14, noteLine: 20 },
    { titleSize: 22, bodySize: 14, bodyLine: 22, noteSize: 13, noteLine: 18 },
  ];
  var avail = KP_EXPORT.H - KP_EXPORT.PAD * 2 - KP_EXPORT.FOOTER_H;
  for (var i = 0; i < sets.length; i++) {
    if (kpMeasureSlideContent(ctx, item, maxW, sets[i]) <= avail) return sets[i];
  }
  return sets[sets.length - 1];
}

function kpDrawSlideCanvas(ctx, item, courseTitle) {
  var W = KP_EXPORT.W;
  var H = KP_EXPORT.H;
  var PAD = KP_EXPORT.PAD;
  var sl = item.slide;
  var beginner = kpIsBeginnerSlide(sl);

  ctx.fillStyle = beginner ? '#f0f9ff' : '#ffffff';
  ctx.fillRect(0, 0, W, H);

  ctx.fillStyle = beginner ? '#0891b2' : '#1e3a5f';
  ctx.fillRect(0, 0, W, 6);

  var maxW = W - PAD * 2;
  var fonts = kpPickFonts(ctx, item, maxW);
  var y = PAD;

  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.font = 'bold ' + fonts.titleSize + 'px "PingFang SC","Microsoft YaHei",sans-serif';
  ctx.fillStyle = '#1e3a5f';
  kpWrapCanvasLines(ctx, sl.title || '', maxW).forEach(function (line) {
    ctx.fillText(line, PAD, y);
    y += fonts.titleSize + 4;
  });
  y += 16;

  ctx.font = fonts.bodySize + 'px "PingFang SC","Microsoft YaHei",sans-serif';
  ctx.fillStyle = '#334155';
  (sl.bullets || []).forEach(function (b) {
    var lines = kpWrapCanvasLines(ctx, b, maxW - 28);
    lines.forEach(function (line, li) {
      if (li === 0) {
        ctx.fillStyle = '#0891b2';
        ctx.fillText('•', PAD, y + 2);
        ctx.fillStyle = '#334155';
        ctx.fillText(line, PAD + 22, y);
      } else {
        ctx.fillText(line, PAD + 22, y);
      }
      y += fonts.bodyLine + 6;
    });
    y += 4;
  });

  function drawNoteBox(label, text, bg, border, color) {
    if (!text) return;
    y += 8;
    ctx.font = fonts.noteSize + 'px "PingFang SC","Microsoft YaHei",sans-serif';
    var lines = kpWrapCanvasLines(ctx, label + text, maxW - 24);
    var boxH = lines.length * fonts.noteLine + 20;
    ctx.fillStyle = bg;
    ctx.fillRect(PAD, y, maxW, boxH);
    ctx.fillStyle = border;
    ctx.fillRect(PAD, y, 4, boxH);
    ctx.fillStyle = color;
    lines.forEach(function (line, i) {
      ctx.fillText(line, PAD + 14, y + 10 + i * fonts.noteLine);
    });
    y += boxH + 8;
  }

  drawNoteBox('通俗说：', sl.plainExplain, '#e0f2fe', '#0891b2', '#0e7490');
  drawNoteBox('经销要点：', sl.dealerTip, '#fef3c7', '#f59e0b', '#92400e');

  ctx.fillStyle = '#94a3b8';
  ctx.font = '12px "PingFang SC","Microsoft YaHei",sans-serif';
  var footer =
    'P' +
    item.chapterIndex +
    '.' +
    item.slideIndex +
    ' · ' +
    (courseTitle || '') +
    ' · 产业培训资料 · 不构成投资建议';
  ctx.fillText(footer, PAD, H - KP_EXPORT.FOOTER_H);

  ctx.textAlign = 'right';
  ctx.fillText(String(item.globalIndex), W - PAD, H - KP_EXPORT.FOOTER_H);
}

function kpRenderSlideCanvas(item, courseTitle) {
  var canvas = document.createElement('canvas');
  canvas.width = KP_EXPORT.W;
  canvas.height = KP_EXPORT.H;
  var ctx = canvas.getContext('2d');
  kpDrawSlideCanvas(ctx, item, courseTitle);
  return canvas;
}

function kpSetExportStatus(msg, loading) {
  var el = document.getElementById('kp-export-status');
  if (!el) return;
  el.textContent = msg || '';
  el.classList.toggle('kp-export-loading', !!loading);
}

function kpDownloadBlob(blob, filename) {
  var a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  setTimeout(function () {
    URL.revokeObjectURL(a.href);
  }, 500);
}

function kpCanvasToBlob(canvas) {
  return new Promise(function (resolve) {
    canvas.toBlob(function (b) {
      resolve(b);
    }, 'image/png');
  });
}

function kpSafeFilename(name) {
  return String(name || 'course')
    .replace(/[\\/:*?"<>|]/g, '-')
    .replace(/\s+/g, '_')
    .slice(0, 80);
}

async function kpDownloadPngZip() {
  var course = window._kpCurrentCourse;
  if (!course) return;
  if (typeof JSZip === 'undefined') {
    alert('PNG 打包组件未加载，请检查网络后刷新页面');
    return;
  }

  var slides = kpGetFlatSlides(course);
  var zip = new JSZip();
  var folder = zip.folder(kpSafeFilename(course.title));

  kpSetExportStatus('正在生成 PNG 0/' + slides.length + '…', true);
  try {
    for (var i = 0; i < slides.length; i++) {
      kpSetExportStatus('正在生成 PNG ' + (i + 1) + '/' + slides.length + '…', true);
      var canvas = kpRenderSlideCanvas(slides[i], course.title);
      var blob = await kpCanvasToBlob(canvas);
      var num = String(i + 1).padStart(3, '0');
      var fname =
        num +
        '_P' +
        slides[i].chapterIndex +
        '.' +
        slides[i].slideIndex +
        '_' +
        kpSafeFilename(slides[i].slide.title).slice(0, 40) +
        '.png';
      folder.file(fname, blob);
      await new Promise(function (r) {
        setTimeout(r, 0);
      });
    }
    kpSetExportStatus('正在压缩 ZIP…', true);
    var zipBlob = await zip.generateAsync({ type: 'blob' });
    kpDownloadBlob(zipBlob, kpSafeFilename(course.title) + '-slides.zip');
    kpSetExportStatus('✅ 已下载 ' + slides.length + ' 张 PNG（ZIP）', false);
  } catch (e) {
    console.error(e);
    kpSetExportStatus('导出失败：' + (e.message || e), false);
    alert('PNG 导出失败，请重试');
  }
}

async function kpDownloadPptx() {
  var course = window._kpCurrentCourse;
  if (!course) return;
  if (typeof PptxGenJS === 'undefined') {
    alert('PPTX 组件未加载，请检查网络后刷新页面');
    return;
  }

  var slides = kpGetFlatSlides(course);
  var pptx = new PptxGenJS();
  pptx.layout = 'LAYOUT_16x9';
  pptx.author = '产业知识付费';
  pptx.title = course.title;
  pptx.subject = course.subtitle || '';

  kpSetExportStatus('正在生成 PPTX 0/' + slides.length + '…', true);

  try {
    slides.forEach(function (item, idx) {
      if (idx % 10 === 0) {
        kpSetExportStatus('正在生成 PPTX ' + (idx + 1) + '/' + slides.length + '…', true);
      }
      var sl = item.slide;
      var s = pptx.addSlide();
      var beginner = kpIsBeginnerSlide(sl);

      s.background = { color: beginner ? 'F0F9FF' : 'FFFFFF' };

      s.addShape(pptx.ShapeType.rect, {
        x: 0,
        y: 0,
        w: '100%',
        h: 0.08,
        fill: { color: beginner ? '0891B2' : '1E3A5F' },
        line: { color: beginner ? '0891B2' : '1E3A5F' },
      });

      var bulletCount = (sl.bullets || []).length + (sl.plainExplain ? 2 : 0) + (sl.dealerTip ? 2 : 0);
      var bodySize = bulletCount > 6 ? 12 : bulletCount > 4 ? 14 : 16;
      var titleSize = bulletCount > 6 ? 22 : 26;

      s.addText(sl.title || '', {
        x: 0.45,
        y: 0.25,
        w: 9.1,
        h: 0.9,
        fontSize: titleSize,
        bold: true,
        color: '1E3A5F',
        fontFace: 'Microsoft YaHei',
        wrap: true,
      });

      if (sl.bullets && sl.bullets.length) {
        s.addText(sl.bullets.join('\n'), {
          x: 0.55,
          y: 1.15,
          w: 8.9,
          h: 3.6,
          fontSize: bodySize,
          color: '334155',
          fontFace: 'Microsoft YaHei',
          wrap: true,
          bullet: true,
          lineSpacingMultiple: 1.15,
        });
      }

      var noteY = 4.85;
      if (sl.plainExplain) {
        s.addText('通俗说：' + sl.plainExplain, {
          x: 0.45,
          y: noteY,
          w: 9.1,
          h: 0.55,
          fontSize: 11,
          color: '0E7490',
          fontFace: 'Microsoft YaHei',
          fill: { color: 'E0F2FE' },
          wrap: true,
        });
        noteY += 0.62;
      }
      if (sl.dealerTip) {
        s.addText('经销要点：' + sl.dealerTip, {
          x: 0.45,
          y: noteY,
          w: 9.1,
          h: 0.55,
          fontSize: 11,
          color: '92400E',
          fontFace: 'Microsoft YaHei',
          fill: { color: 'FEF3C7' },
          wrap: true,
        });
      }

      s.addText(
        'P' +
          item.chapterIndex +
          '.' +
          item.slideIndex +
          ' · 产业培训资料 · 不构成投资建议',
        {
          x: 0.45,
          y: 5.25,
          w: 8,
          h: 0.3,
          fontSize: 9,
          color: '94A3B8',
          fontFace: 'Microsoft YaHei',
        }
      );
      s.addText(String(item.globalIndex), {
        x: 9.2,
        y: 5.25,
        w: 0.5,
        h: 0.3,
        fontSize: 9,
        color: '94A3B8',
        align: 'right',
        fontFace: 'Microsoft YaHei',
      });
    });

    kpSetExportStatus('正在写入 PPTX 文件…', true);
    await pptx.writeFile({ fileName: kpSafeFilename(course.title) + '.pptx' });
    kpSetExportStatus('✅ 已下载 PPTX（' + slides.length + ' 页）', false);
  } catch (e) {
    console.error(e);
    kpSetExportStatus('导出失败：' + (e.message || e), false);
    alert('PPTX 导出失败，请重试');
  }
}

function kpRenderSlidePreview(limit) {
  var course = window._kpCurrentCourse;
  var wrap = document.getElementById('kp-slide-preview');
  if (!course || !wrap) return;

  var slides = kpGetFlatSlides(course).slice(0, limit || 6);
  wrap.innerHTML =
    '<div class="kp-preview-head"><h3>📷 幻灯片预览（前 ' +
    slides.length +
    ' 页）</h3><p class="kp-muted">16:9 导出效果预览，完整内容请下载 PPTX 或 PNG 包</p></div>' +
    '<div class="kp-preview-grid"></div>';
  var grid = wrap.querySelector('.kp-preview-grid');

  slides.forEach(function (item) {
    var canvas = kpRenderSlideCanvas(item, course.title);
    canvas.className = 'kp-preview-canvas';
    canvas.title = item.slide.title;
    var block = document.createElement('div');
    block.className = 'kp-preview-item';
    var label = document.createElement('div');
    label.className = 'kp-preview-label';
    label.textContent = 'P' + item.chapterIndex + '.' + item.slideIndex + ' ' + item.slide.title;
    block.appendChild(canvas);
    block.appendChild(label);
    grid.appendChild(block);
  });
}
