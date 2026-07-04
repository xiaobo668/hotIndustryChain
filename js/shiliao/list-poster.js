/**
 * 健康饮食 · Top10 榜单海报 Canvas 绘制
 * 列表：左栏序号+食材名（加粗），右栏说明（小一号、不加粗）
 */
function getShiliaoListPosterLayout() {
  return {
    W: SHILIAO_LIST_POSTER_W,
    PAD: 28,
    TOP: 40,
    TITLE_SIZE: 26,
    SUBTITLE_GAP: 4,
    TITLE_BOTTOM: 16,
    ITEM_GAP: 4,
    BODY_SIZE: 16,
    DESC_SIZE: 14,
    BODY_LINE_H: 28,
    DESC_LINE_H: 24,
    COL_GAP: 0,
    BOTTOM_PAD: 50,
    FOOTER_SIZE: 12,
    FOOTER_BOTTOM: 30,
    FOOTER_H: 56,
  };
}


function computeMaxLabelWidth(ctx, items, L) {
  ctx.font = `bold ${L.BODY_SIZE}px "PingFang SC", sans-serif`;
  let maxW = 0;
  (items || []).forEach((raw, i) => {
    const label = `${i + 1}. ${raw.name}：`;
    maxW = Math.max(maxW, ctx.measureText(label).width);
  });
  return Math.ceil(maxW);
}

function getListColumnMetrics(L, ctx, items) {
  const innerW = L.W - L.PAD * 2;
  const labelColW = ctx && items && items.length ? computeMaxLabelWidth(ctx, items, L) : 0;
  const descW = Math.max(120, innerW - labelColW - L.COL_GAP);
  const descX = L.PAD + labelColW + L.COL_GAP;
  return { labelColW, descW, descX };
}

function wrapListTextLines(ctx, text, maxW) {
  const desc = text || '';
  if (!desc) return [''];
  const safeW = Math.max(60, maxW);
  const lines = [];
  let line = '';
  for (const ch of desc) {
    const test = line + ch;
    if (ctx.measureText(test).width > safeW && line) {
      lines.push(line);
      line = ch;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines.length ? lines : [''];
}

function measureListItemLines(ctx, item, descW, L) {
  ctx.font = `${L.DESC_SIZE}px "PingFang SC", sans-serif`;
  return wrapListTextLines(ctx, item.desc, descW).length;
}

function getShiliaoListTopicItems(topic) {
  if (!topic) return [];
  if (topic.posterVariants && topic.posterVariants.length) {
    return topic.posterVariants.reduce(function (acc, variant) {
      return acc.concat(variant.items || []);
    }, []);
  }
  if (topic.sections && topic.sections.length) {
    return topic.sections.reduce(function (acc, sec) {
      return acc.concat(sec.items || []);
    }, []);
  }
  return topic.items || [];
}

function buildShiliaoListPosterTopic(baseTopic, variant) {
  if (!variant) return baseTopic;
  return {
    title: baseTopic.title,
    subtitle: variant.subtitle,
    items: variant.items || [],
  };
}

function getShiliaoListPosterPages(topic) {
  if (!topic) return [];
  if (topic.posterVariants && topic.posterVariants.length) {
    return topic.posterVariants.map(function (variant) {
      return {
        key: variant.key || variant.label,
        label: variant.label || variant.subtitle || topic.title,
        topic: buildShiliaoListPosterTopic(topic, variant),
      };
    });
  }
  return [{ key: 'main', label: topic.title, topic: topic }];
}

function getShiliaoListPosterCanvasId(key) {
  return key && key !== 'main' ? 'shiliao-list-poster-canvas-' + key : 'shiliao-list-poster-canvas';
}

function estimateShiliaoListPosterHeight(topic, theme) {
  const L = getShiliaoListPosterLayout();
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const items = getShiliaoListTopicItems(topic);
  const { descW } = getListColumnMetrics(L, ctx, items);

  let h = L.TOP + L.TITLE_SIZE + L.TITLE_BOTTOM;
  if (topic.subtitle) h += L.SUBTITLE_GAP + L.DESC_SIZE;

  const SECTION_HEAD_H = 28;
  const sections = topic.sections && topic.sections.length ? topic.sections : null;

  if (sections) {
    let rank = 0;
    sections.forEach(function (sec) {
      h += SECTION_HEAD_H;
      (sec.items || []).forEach(function (raw) {
        rank += 1;
        const item = { rank: rank, name: raw.name, desc: raw.desc };
        const lines = measureListItemLines(ctx, item, descW, L);
        const rowH = Math.max(L.BODY_SIZE, lines * L.DESC_LINE_H);
        h += rowH + L.ITEM_GAP;
      });
      h += 6;
    });
  } else {
    items.forEach(function (raw, i) {
      const item = { rank: i + 1, name: raw.name, desc: raw.desc };
      const lines = measureListItemLines(ctx, item, descW, L);
      const rowH = Math.max(L.BODY_SIZE, lines * L.DESC_LINE_H);
      h += rowH + L.ITEM_GAP;
    });
  }

  h += L.BOTTOM_PAD;
  if (theme.bottomDecor && theme.bottomDecor !== 'none') h += L.FOOTER_H;
  if (topic.disclaimer) {
    ctx.font = `${L.FOOTER_SIZE}px "PingFang SC", sans-serif`;
    const footerLines = wrapListTextLines(ctx, topic.disclaimer, L.W - L.PAD * 2);
    if (footerLines.length > 1) h += (footerLines.length - 1) * (L.FOOTER_SIZE + 4);
  }
  return Math.max(h, 560);
}

function drawListPosterLeaves(ctx, W, H) {
  ctx.save();
  ctx.globalAlpha = 0.18;
  ctx.fillStyle = '#6b9b4a';
  for (let i = 0; i < 5; i++) {
    const x = 20 + i * 72;
    const y = H - 40 - (i % 2) * 12;
    ctx.beginPath();
    ctx.ellipse(x, y, 28, 14, -0.3, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawListPosterPlayful(ctx, W, H) {
  ctx.save();
  ctx.globalAlpha = 0.35;
  ctx.fillStyle = '#f9a8d4';
  ctx.beginPath();
  ctx.ellipse(W - 70, H - 55, 42, 42, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#fda4af';
  ctx.beginPath();
  ctx.ellipse(W - 95, H - 55, 42, 42, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#93c5fd';
  [[W - 120, H - 100], [W - 50, H - 110], [W - 85, H - 130]].forEach(([x, y]) => {
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.restore();
}

function drawListPosterQuoteMarks(ctx, W, y, color) {
  ctx.save();
  ctx.fillStyle = color || '#c5ddd0';
  ctx.font = 'bold 56px Georgia, serif';
  ctx.textAlign = 'left';
  ctx.fillText('“', 18, y + 8);
  ctx.textAlign = 'right';
  ctx.fillText('”', W - 18, y + 8);
  ctx.restore();
}

function drawListItem(ctx, item, x, y, metrics, theme, L) {
  const { descW, descX } = metrics;
  const label = `${item.rank}. ${item.name}：`;

  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.font = `bold ${L.BODY_SIZE}px "PingFang SC", sans-serif`;
  ctx.fillStyle = theme.keyword;
  ctx.fillText(label, x, y);

  ctx.font = `${L.DESC_SIZE}px "PingFang SC", sans-serif`;
  ctx.fillStyle = theme.desc || '#333333';
  const lines = wrapListTextLines(ctx, item.desc, descW);

  lines.forEach((line, i) => {
    ctx.fillText(line, descX, y + i * L.DESC_LINE_H);
  });

  const rowH = Math.max(L.BODY_SIZE, lines.length * L.DESC_LINE_H);
  return y + rowH;
}

function drawListSectionTitle(ctx, text, y, theme, W) {
  ctx.font = 'bold 15px "PingFang SC", sans-serif';
  ctx.fillStyle = theme.title || '#4a5d23';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.fillText(text, W / 2, y);
  return y + 28;
}

function drawShiliaoListPoster(ctx, topic, theme, W, H) {
  const L = getShiliaoListPosterLayout();
  const allItems = getShiliaoListTopicItems(topic);
  const metrics = getListColumnMetrics(L, ctx, allItems);

  ctx.fillStyle = theme.bg;
  ctx.fillRect(0, 0, W, H);

  if (theme.noteStyle) {
    ctx.strokeStyle = 'rgba(0,0,0,0.06)';
    ctx.lineWidth = 1;
    ctx.strokeRect(12, 12, W - 24, H - 24);
  }

  let y = L.TOP;

  if (theme.quoteMarks) {
    drawListPosterQuoteMarks(ctx, W, y - 6, theme.quoteColor);
  }

  const titleText = topic.title + (theme.titleSparkle ? ' ✨' : '');
  ctx.font = `bold ${L.TITLE_SIZE}px "PingFang SC", sans-serif`;
  ctx.fillStyle = theme.title;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.fillText(titleText, W / 2, y);
  y += L.TITLE_SIZE;

  if (topic.subtitle) {
    y += L.SUBTITLE_GAP;
    ctx.font = `${L.DESC_SIZE}px "PingFang SC", sans-serif`;
    ctx.fillStyle = theme.noteStyle ? '#666666' : theme.desc || '#666666';
    ctx.fillText(`（${topic.subtitle}）`, W / 2, y);
    y += L.DESC_SIZE;
  }

  y += L.TITLE_BOTTOM;

  ctx.textAlign = 'left';
  const sections = topic.sections && topic.sections.length ? topic.sections : null;

  if (sections) {
    let rank = 0;
    sections.forEach(function (sec) {
      y = drawListSectionTitle(ctx, sec.title, y, theme, W);
      (sec.items || []).forEach(function (raw) {
        rank += 1;
        const item = { rank: rank, name: raw.name, desc: raw.desc };
        const nextY = drawListItem(ctx, item, L.PAD, y, metrics, theme, L);
        y = nextY + L.ITEM_GAP;
      });
      y += 6;
    });
  } else {
    (topic.items || []).forEach(function (raw, i) {
      const item = { rank: i + 1, name: raw.name, desc: raw.desc };
      const nextY = drawListItem(ctx, item, L.PAD, y, metrics, theme, L);
      y = nextY + L.ITEM_GAP;
    });
  }

  if (theme.bottomDecor === 'leaves') drawListPosterLeaves(ctx, W, H);
  if (theme.bottomDecor === 'playful') drawListPosterPlayful(ctx, W, H);

  ctx.font = `${L.FOOTER_SIZE}px "PingFang SC", sans-serif`;
  ctx.fillStyle = 'rgba(80,80,80,0.5)';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'bottom';
  const footerText = topic.disclaimer || '健康饮食 · 仅供参考';
  const footerLines = wrapListTextLines(ctx, footerText, W - L.PAD * 2);
  const footerLineH = L.FOOTER_SIZE + 4;
  let footerY = H - L.FOOTER_BOTTOM + (footerLines.length - 1) * footerLineH;
  footerLines.forEach(function (line) {
    ctx.fillText(line, W / 2, footerY);
    footerY -= footerLineH;
  });
}

function renderShiliaoListPoster(topic, theme, containerId, canvasId) {
  const container = document.getElementById(containerId || 'shiliao-list-poster-pages');
  if (!container || !topic) return;

  const th = theme || getShiliaoListTheme(topic.defaultTheme || 'green');
  const L = getShiliaoListPosterLayout();
  const W = L.W;
  const dpr = window.devicePixelRatio || 1;
  const pages = getShiliaoListPosterPages(topic);

  container.innerHTML = '';

  if (pages.length > 1) {
    const hint = document.createElement('p');
    hint.className = 'poster-multi-dl-hint';
    hint.textContent = `共 ${pages.length} 张海报 · 大标题相同 · 可分别下载或一键下载全部`;
    container.appendChild(hint);
  }

  pages.forEach(function (page) {
    const pageTopic = page.topic;
    const H = estimateShiliaoListPosterHeight(pageTopic, th);
    const id = canvasId && pages.length === 1 ? canvasId : getShiliaoListPosterCanvasId(page.key);

    const block = document.createElement('div');
    block.className = 'poster-page-block';

    const label = document.createElement('div');
    label.className = 'poster-page-label';
    label.textContent =
      pages.length > 1
        ? `${topic.title} · ${page.label} · ${th.name}模版`
        : `${topic.title} · ${th.name}模版`;
    block.appendChild(label);

    const canvas = document.createElement('canvas');
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.id = id;
    canvas.className = 'poster-canvas-item';
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    block.appendChild(canvas);

    if (pages.length > 1) {
      const actions = document.createElement('div');
      actions.className = 'poster-actions';
      actions.style.marginTop = '0';
      actions.innerHTML =
        '<button class="btn btn-secondary" type="button" onclick="downloadShiliaoListPoster(\'' +
        id +
        '\', \'' +
        (topic.title + '-' + page.label).replace(/'/g, "\\'") +
        '.png\')">⬇️ 下载本张</button>' +
        '<button class="btn btn-secondary" type="button" onclick="copyShiliaoListPoster(\'' +
        id +
        '\')">📋 复制本张</button>';
      block.appendChild(actions);
    }

    container.appendChild(block);

    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    drawShiliaoListPoster(ctx, pageTopic, th, W, H);
  });
}

function downloadAllShiliaoListPosters(topic, theme) {
  const pages = getShiliaoListPosterPages(topic);
  const thName = theme ? theme.name : '';
  pages.forEach(function (page, i) {
    setTimeout(function () {
      const id = getShiliaoListPosterCanvasId(page.key);
      const filename = `${topic.title}-${page.label}${thName ? '-' + thName : ''}.png`;
      downloadShiliaoListPoster(id, filename);
    }, i * 320);
  });
}

function downloadShiliaoListPoster(canvasId, filename) {
  const canvas = document.getElementById(canvasId || 'shiliao-list-poster-canvas');
  if (!canvas) {
    alert('请先生成榜单海报');
    return;
  }
  const a = document.createElement('a');
  a.download = filename || '健康饮食榜单.png';
  a.href = canvas.toDataURL('image/png');
  a.click();
}

function copyShiliaoListPoster(canvasId) {
  const canvas = document.getElementById(canvasId || 'shiliao-list-poster-canvas');
  if (!canvas) return;
  canvas.toBlob((blob) => {
    if (!blob) return;
    navigator.clipboard
      .write([new ClipboardItem({ 'image/png': blob })])
      .then(() => alert('✅ 海报已复制到剪贴板'))
      .catch(() => alert('复制失败，请使用下载'));
  });
}
