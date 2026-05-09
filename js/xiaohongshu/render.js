/**
 * 小红书渲染模块 (xiaohongshu/render.js)
 * - renderXHSResult(data, category, topicInfo, source): 结果总入口
 * - renderXHSPreview(data, category): FAQ 预览区（文字版）
 * - renderXHSPoster(data, category): 小红书风格海报（Canvas）
 *
 * 海报风格（参考小红书截图）：
 *   1. FAQ长图 (faq-list) - Q&A 列表式
 *   2. 健康自查表 (health-check) - 图标+状态表格
 *   3. 新老手对比 (comparison) - 左右两栏对比
 *   4. 方法卡片网格 (tips-grid) - 多卡片布局
 *   5. 产品种草卡 (product-review) - 产品详情展示
 */

// ==================== 颜色主题 ====================
const XHS_PALETTE = {
  'pet-cat': {
    bg: '#FFF5F5', headerBg: '#FF6B6B', headerText: '#FFFFFF',
    cardBg: '#FFFFFF', accent: '#FF6B6B', accent2: '#FF8E8E',
    text: '#2D2D2D', textLight: '#888888', border: '#FFE0E0',
    tagBg: '#FFF0F0', tagText: '#FF6B6B',
  },
  'pet-dog': {
    bg: '#F0FFFF', headerBg: '#4ECDC4', headerText: '#FFFFFF',
    cardBg: '#FFFFFF', accent: '#4ECDC4', accent2: '#7EDDD6',
    text: '#2D2D2D', textLight: '#888888', border: '#D0F0ED',
    tagBg: '#E8FAF8', tagText: '#2BA89E',
  },
  'digital': {
    bg: '#F5F3FF', headerBg: '#6C63FF', headerText: '#FFFFFF',
    cardBg: '#FFFFFF', accent: '#6C63FF', accent2: '#9D93FF',
    text: '#2D2D2D', textLight: '#888888', border: '#E0DBFE',
    tagBg: '#EFECFF', tagText: '#6C63FF',
  },
  'cooking': {
    bg: '#FFFBEB', headerBg: '#F59E0B', headerText: '#FFFFFF',
    cardBg: '#FFFFFF', accent: '#F59E0B', accent2: '#FBBF24',
    text: '#2D2D2D', textLight: '#888888', border: '#FEF3C7',
    tagBg: '#FEF9E0', tagText: '#D97706',
  },
  'fitness': {
    bg: '#ECFDF5', headerBg: '#10B981', headerText: '#FFFFFF',
    cardBg: '#FFFFFF', accent: '#10B981', accent2: '#34D399',
    text: '#2D2D2D', textLight: '#888888', border: '#D1FAE5',
    tagBg: '#E8FDF0', tagText: '#059669',
  },
  'baby': {
    bg: '#FDF2F8', headerBg: '#EC4899', headerText: '#FFFFFF',
    cardBg: '#FFFFFF', accent: '#EC4899', accent2: '#F472B6',
    text: '#2D2D2D', textLight: '#888888', border: '#FCE7F3',
    tagBg: '#FDF0F7', tagText: '#DB2777',
  },
  'finance': {
    bg: '#F0F9FF', headerBg: '#0EA5E9', headerText: '#FFFFFF',
    cardBg: '#FFFFFF', accent: '#0EA5E9', accent2: '#38BDF8',
    text: '#2D2D2D', textLight: '#888888', border: '#BAE6FD',
    tagBg: '#E0F5FF', tagText: '#0284C7',
  },
};

// ==================== 渲染结果总入口 ====================

function renderXHSResult(data, categoryId, topicInfo, source) {
  // 更新头部信息（小红书独立结果区）
  const palette = XHS_PALETTE[categoryId] || XHS_PALETTE['pet-cat'];
  const category = XHS_TOPICS[categoryId];

  // 显示小红书头部
  const xhsHeader = document.getElementById('xhs-header');
  xhsHeader.style.display = '';
  xhsHeader.style.background = `linear-gradient(135deg, rgba(255,107,107,0.12), rgba(255,142,142,0.06))`;
  xhsHeader.style.borderColor = `rgba(255,107,107,0.2)`;

  document.getElementById('xhs-title').textContent = `${category.icon} ${data.title || topicInfo.title}`;
  document.getElementById('xhs-desc').textContent = data.subtitle || topicInfo.subtitle;

  // 统计
  const itemCount = data.items ? data.items.length : 0;
  const sourceLabel = MODEL_LABELS[source] || source;
  const sourceColor = source === 'kimi' ? '#FF6B6B' : '#94a3b8';

  document.getElementById('xhs-stats').innerHTML = `
    <div class="stat-item">
      <div class="xhs-stat-num">${itemCount}</div>
      <div class="xhs-stat-label">FAQ 问题</div>
    </div>
    <div class="stat-item">
      <div class="xhs-stat-num">${category.name}</div>
      <div class="xhs-stat-label">所属领域</div>
    </div>
    <div class="stat-item" style="min-width:100px">
      <div class="xhs-stat-num" style="font-size:12px;color:${sourceColor}">✦ ${sourceLabel}</div>
      <div class="xhs-stat-label" style="font-size:11px">AI 模型</div>
    </div>
  `;

  // 渲染预览
  renderXHSPreview(data, categoryId);

  // 标记当前数据供海报使用
  window._xhsCurrentCategory = categoryId;
  window._xhsCurrentData = data;
}

// ==================== FAQ 文字预览 ====================

function renderXHSPreview(data, categoryId) {
  const container = document.getElementById('xhs-preview-content');
  const palette = XHS_PALETTE[categoryId] || XHS_PALETTE['pet-cat'];

  if (!data.items || data.items.length === 0) {
    container.innerHTML = '<p style="color:#888;text-align:center;padding:40px;">暂无内容</p>';
    return;
  }

  let html = `<div class="xhs-faq-list">`;

  data.items.forEach((item, idx) => {
    const tagHtml = item.tag
      ? `<span class="xhs-tag" style="background:${palette.tagBg};color:${palette.tagText}">${item.tag}</span>`
      : '';

    html += `
      <div class="xhs-faq-item">
        <div class="xhs-faq-q">
          <span class="xhs-q-num">${idx + 1}</span>
          <span class="xhs-q-text">${item.q}</span>
          ${tagHtml}
        </div>
        <div class="xhs-faq-a">${item.a}</div>
      </div>`;
  });

  // 补充提醒
  if (data.tips && data.tips.length > 0) {
    html += `<div class="xhs-tips-section">
      <div class="xhs-tips-title">💡 补充提醒</div>`;
    data.tips.forEach(tip => {
      html += `<div class="xhs-tip-item">• ${tip}</div>`;
    });
    html += `</div>`;
  }

  // 结尾互动
  if (data.footer) {
    html += `<div class="xhs-footer-text">${data.footer}</div>`;
  }

  // 标签
  if (data.hashtags && data.hashtags.length > 0) {
    html += `<div class="xhs-hashtags">${data.hashtags.join(' ')}</div>`;
  }

  html += `</div>`;
  container.innerHTML = html;
}

// ==================== 小红书海报生成（Canvas）====================
// 海报尺寸：1080px 宽（小红书推荐 3:4 比例）

const XHS_POSTER_W = 1080;
const XHS_POSTER_SCALE = 1; // 缩放比例

/**
 * 主海报渲染入口 - 自动选择最佳风格
 */
function renderXHSPoster(data, categoryId) {
  const container = document.getElementById('xhs-poster-pages');
  container.innerHTML = '';

  const palette = XHS_PALETTE[categoryId] || XHS_PALETTE['pet-cat'];
  const category = XHS_TOPICS[categoryId];
  const posterStyle = category?.defaultPosterStyle || 'faq-list';

  // 根据内容数量决定是否分页
  const items = data.items || [];
  const ITEMS_PER_PAGE = 8; // 每页最多显示的Q&A数

  if (items.length <= ITEMS_PER_PAGE) {
    // 单页海报
    const canvas = createXHSPosterPage(data, categoryId, 0, items, palette, posterStyle, true);
    container.appendChild(wrapCanvasElement(canvas, '第 1 页'));
  } else {
    // 多页海报
    let pageNum = 1;
    for (let i = 0; i < items.length; i += ITEMS_PER_PAGE) {
      const pageItems = items.slice(i, i + ITEMS_PER_PAGE);
      const isLast = i + ITEMS_PER_PAGE >= items.length;
      const canvas = createXHSPosterPage(data, categoryId, i, pageItems, palette, posterStyle, isLast);
      container.appendChild(wrapCanvasElement(canvas, `第 ${pageNum} 页`));
      pageNum++;
    }
  }
}

/**
 * 创建单页海报 Canvas
 */
function createXHSPosterPage(data, categoryId, startIndex, pageItems, palette, posterStyle, isLastPage) {
  const canvas = document.createElement('canvas');
  canvas.width = XHS_POSTER_W;
  // 高度根据内容动态计算
  const ctx = canvas.getContext('2d');
  const scale = XHS_POSTER_SCALE;

  ctx.scale(scale, scale);

  const W = XHS_POSTER_W;
  const padding = 50;
  let y = 0;

  // ====== 1. 背景 ======
  const totalH = calculatePosterHeight(data, pageItems, palette, isLastPage);
  canvas.height = totalH * scale;
  // 重新设置 context（resize 会重置）
  const ctx2 = canvas.getContext('2d');
  ctx2.scale(scale, scale);

  drawPosterBackground(ctx2, W, totalH, palette);

  // ====== 2. 头部区域 ======
  y = drawPosterHeader(ctx2, W, padding, y, data, palette, categoryId);

  // ====== 3. 内容区域 ======
  y = drawPosterContent(ctx2, W, padding, y, pageItems, palette, posterStyle);

  // ====== 4. 底部区域（仅最后一页）======
  if (isLastPage) {
    y = drawPosterFooter(ctx2, W, padding, y, data, palette);
  }

  return canvas;
}

/**
 * 计算海报总高度
 */
function calculatePosterHeight(data, pageItems, palette, isLastPage) {
  const W = XHS_POSTER_W;
  const padding = 50;
  let y = 0;

  // 头部高度约 280
  y = 280 + padding;

  // 每个 item 高度约 140-180
  pageItems.forEach(item => {
    const answerLines = Math.ceil(estimateTextWidth(item.a, 28, W - padding * 2 - 80) / (W - padding * 2 - 80));
    y += 100 + Math.max(answerLines, 2) * 40 + 30;
  });

  // tips 区域
  if (isLastPage && data.tips && data.tips.length > 0) {
    y += 60 + data.tips.length * 45;
  }

  // footer
  if (isLastPage) {
    y += 120;
  }

  return y + padding;
}

/**
 * 绘制背景
 */
function drawPosterBackground(ctx, W, H, palette) {
  // 纯色背景
  ctx.fillStyle = palette.bg;
  ctx.fillRect(0, 0, W, H);

  // 顶部装饰波浪
  ctx.fillStyle = palette.headerBg;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(W, 0);
  ctx.lineTo(W, 200);
  ctx.quadraticCurveTo(W * 0.75, 160, W * 0.5, 180);
  ctx.quadraticCurveTo(W * 0.25, 200, 0, 170);
  ctx.closePath();
  ctx.fill();

  // 底部装饰条
  ctx.fillStyle = palette.accent;
  roundRect(ctx, 0, H - 8, W, 8, [0, 0, 8, 8]);
  ctx.fill();
}

/**
 * 绘制头部区域
 */
function drawPosterHeader(ctx, W, padding, y, data, palette, categoryId) {
  const category = XHS_TOPICS[categoryId];

  // 标题背景卡片
  const headerH = 200;
  roundRect(ctx, padding, 30, W - padding * 2, headerH, 24);
  ctx.fillStyle = '#FFFFFF';
  ctx.fill();

  // 左侧彩色竖条
  roundRect(ctx, padding, 30, 8, headerH, [24, 0, 0, 24]);
  ctx.fillStyle = palette.headerBg;
  ctx.fill();

  // 图标
  ctx.font = '900 56px "PingFang SC", sans-serif';
  ctx.fillStyle = palette.headerBg;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText(category?.icon || '📝', padding + 35, 55);

  // 标题
  ctx.font = 'bold 42px "PingFang SC", sans-serif';
  ctx.fillStyle = palette.text;
  const title = fitOneLineWidth(ctx, data.title || '', W - padding * 2 - 110);
  ctx.fillText(title, padding + 110, 60);

  // 副标题
  if (data.subtitle) {
    ctx.font = '28px "PingFang SC", sans-serif';
    ctx.fillStyle = palette.textLight;
    const subY = 115;
    drawWrappedText(ctx, data.subtitle, padding + 110, subY, W - padding * 2 - 120, 38, 3);
  }

  // 分隔线
  const lineY = 175;
  ctx.strokeStyle = palette.border;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(padding + 35, lineY);
  ctx.lineTo(W - padding - 35, lineY);
  ctx.stroke();

  // 统计标签
  const itemCount = data.items ? data.items.length : 0;
  ctx.font = '600 24px "PingFang SC", sans-serif';
  ctx.fillStyle = palette.accent;
  ctx.textAlign = 'right';
  ctx.fillText(`共 ${itemCount} 个问题 ✨`, W - padding - 35, 205);

  return 30 + headerH + 25;
}

/**
 * 绘制内容区域（FAQ列表）
 */
function drawPosterContent(ctx, W, padding, y, items, palette, posterStyle) {
  const contentW = W - padding * 2;

  items.forEach((item, idx) => {
    const cardX = padding;
    const cardY = y;
    const cardPadding = 32;

    // 计算答案需要的行数
    const answerMaxW = contentW - cardPadding * 2 - 70; // 减去序号宽度
    const estLines = Math.ceil(estimateTextLength(item.a) / Math.floor(answerMaxW / 28));
    const cardH = Math.max(130, 90 + Math.max(estLines, 2) * 40 + 20);

    // 卡片背景
    roundRect(ctx, cardX, cardY, contentW, cardH, 20);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();

    // 左侧序号圆圈
    const numSize = 52;
    const numX = cardX + cardPadding;
    const numY = cardY + cardPadding - 6;
    ctx.beginPath();
    ctx.arc(numX + numSize / 2, numY + numSize / 2, numSize / 2, 0, Math.PI * 2);
    ctx.fillStyle = palette.headerBg;
    ctx.fill();

    // 序号文字
    ctx.font = 'bold 26px "PingFang SC", sans-serif';
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(String(idx + 1 + (window._xhsStartIndex || 0)), numX + numSize / 2, numY + numSize / 2);

    // 问题
    ctx.font = 'bold 30px "PingFang SC", sans-serif';
    ctx.fillStyle = palette.text;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    const qX = numX + numSize + 18;
    const qY = cardY + cardPadding;
    const qText = fitOneLineWidth(ctx, item.q, contentW - cardPadding * 2 - numSize - 25);
    ctx.fillText(qText, qX, qY);

    // 标签
    if (item.tag) {
      const tagW = ctx.measureText(item.tag).width + 24;
      const tagH = 34;
      const tagX = qX + ctx.measureText(qText).width + 12;
      roundRect(ctx, tagX, qY + 2, tagW, tagH, 17);
      ctx.fillStyle = palette.tagBg;
      ctx.fill();
      ctx.font = '600 20px "PingFang SC", sans-serif';
      ctx.fillStyle = palette.tagText;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(item.tag, tagX + tagW / 2, qY + 2 + tagH / 2);
    }

    // 答案
    ctx.font = '26px "PingFang SC", sans-serif';
    ctx.fillStyle = palette.textLight;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    const aX = numX + numSize + 18;
    const aY = qY + 46;
    drawWrappedText(ctx, item.a, aX, aY, answerMaxW, 40, 6);

    y = cardY + cardH + 16;
  });

  return y;
}

/**
 * 绘制底部区域
 */
function drawPosterFooter(ctx, W, padding, y, data, palette) {
  const contentW = W - padding * 2;

  y += 20;

  // Tips 区域
  if (data.tips && data.tips.length > 0) {
    // Tips 标题
    ctx.font = 'bold 30px "PingFang SC", sans-serif';
    ctx.fillStyle = palette.accent;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText('💡 温馨提示', padding, y);
    y += 48;

    data.tips.forEach(tip => {
      // Tip 圆点
      ctx.beginPath();
      ctx.arc(padding + 12, y + 14, 6, 0, Math.PI * 2);
      ctx.fillStyle = palette.accent;
      ctx.fill();

      ctx.font = '26px "PingFang SC", sans-serif';
      ctx.fillStyle = palette.textLight;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      drawWrappedText(ctx, tip, padding + 30, y, contentW - 40, 38, 2);
      y += 38 * Math.min(Math.ceil(estimateTextLength(tip) / ((contentW - 40) / 26)), 2) + 12;
    });

    y += 16;
  }

  // 结尾互动语
  if (data.footer) {
    roundRect(ctx, padding, y, contentW, 70, 16);
    ctx.fillStyle = palette.tagBg;
    ctx.fill();

    ctx.font = '600 26px "PingFang SC", sans-serif';
    ctx.fillStyle = palette.accent;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const footerText = fitOneLineWidth(ctx, data.footer, contentW - 40);
    ctx.fillText(footerText, W / 2, y + 35);
    y += 85;
  }

  // Hashtags
  if (data.hashtags && data.hashtags.length > 0) {
    ctx.font = '600 24px "PingFang SC", sans-serif';
    ctx.fillStyle = palette.textLight;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    const tagsText = data.hashtags.slice(0, 6).join('  ');
    ctx.fillText(tagsText, W / 2, y);
    y += 45;
  }

  // 底部品牌
  y += 15;
  ctx.font = '500 22px "PingFang SC", sans-serif';
  ctx.fillStyle = '#BBBBBB';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.fillText('— 生活百科 · AI 生成 —', W / 2, y);

  return y;
}

// ==================== 工具函数 ====================

/** 包装 canvas 为可下载元素 */
function wrapCanvasElement(canvas, label) {
  const wrapper = document.createElement('div');
  wrapper.className = 'poster-canvas-item-wrapper';

  if (label) {
    const labelEl = document.createElement('div');
    labelEl.className = 'poster-page-label';
    labelEl.textContent = label;
    wrapper.appendChild(labelEl);
  }

  canvas.className = 'poster-canvas-item';
  canvas.style.maxWidth = '100%';
  canvas.style.borderRadius = '16px';
  canvas.style.boxShadow = '0 20px 60px rgba(0,0,0,0.3)';
  canvas.style.cursor = 'pointer';
  wrapper.appendChild(canvas);

  // 点击放大
  canvas.onclick = () => {
    const url = canvas.toDataURL('image/png');
    const win = window.open('');
    win.document.write(`<img src="${url}" style="max-width:100vw">`);
  };

  return wrapper;
}

/** 估算文本字符数 */
function estimateTextLength(text) {
  if (!text) return 0;
  return text.length;
}

/** 估算文本在指定字号和最大宽度下需要的宽度（字符数） */
function estimateTextWidth(text, fontSize, maxWidth) {
  if (!text) return 0;
  // 粗略估算：中文字符约占 fontSize，英文占 fontSize * 0.5
  let w = 0;
  for (const ch of text) {
    w += /[\u4e00-\u9fa5]/.test(ch) ? fontSize : fontSize * 0.55;
  }
  return w;
}

// ==================== 下载功能 ====================

function downloadXHSPoster() {
  if (!currentXHSData) {
    alert('请先生成小红书内容');
    return;
  }
  const canvases = document.querySelectorAll('#xhs-poster-pages .poster-canvas-item');
  if (canvases.length === 0) {
    alert('请先切换到「小红书海报」标签页');
    return;
  }

  canvases.forEach((canvas, idx) => {
    setTimeout(() => {
      const url = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.download = `小红书_${currentXHSData.title || 'FAQ'}_P${idx + 1}.png`;
      a.href = url;
      a.click();
    }, idx * 300);
  });
}

function copyXHSPoster() {
  const canvas = document.querySelector('#xhs-poster-pages .poster-canvas-item');
  if (!canvas) { alert('请先切换到「小红书海报」标签页'); return; }
  canvas.toBlob(blob => {
    navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
      .then(() => alert('已复制到剪贴板，可直接粘贴到小红书发布框！'))
      .catch(() => alert('复制失败，请尝试下载后手动上传'));
  });
}
