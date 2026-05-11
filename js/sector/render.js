/**
 * 板块龙头（Sector）- 渲染模块
 * 负责板块龙头结果渲染、表格构建、海报绘制
 * 注意：Tab 切换已统一到 industry/render.js 的 switchTab() 中
 *
 * 依赖：
 * - utils/canvas.js: roundRect(), fitOneLineWidth()
 * - utils/color.js: shadeColor()
 * - 全局变量：currentSector, MODEL_LABELS
 */

// ==================== 板块龙头渲染（由 switchTab 调用）====================

function renderSectorHeader(data, source) {
  const header = document.getElementById('sector-header');
  header.style.setProperty('--ind-gradient', `linear-gradient(135deg, ${data.gradient[0]}, ${data.gradient[1]})`);
  header.style.borderLeft = `4px solid ${data.color}`;

  document.getElementById('sector-title').textContent = `🐂 ${data.name} 板块龙头分析`;
  document.getElementById('sector-desc').textContent = data.description;

  // 显示 AI 模型来源
  const sourceLabel = MODEL_LABELS[source] || (source ? source.charAt(0).toUpperCase() + source.slice(1) : 'AI');
  const sourceColor = source === 'kimi' ? '#ef4444' : source === 'deepseek' ? '#6c63ff' : '#94a3b8';

  const centerCount = data.center.companies.length;
  const vanguardCount = data.vanguard.companies.length;
  document.getElementById('sector-stats').innerHTML = `
    <div class="stat-item">
      <div class="stat-num">${centerCount}</div>
      <div class="stat-label">中军（趋势龙头）</div>
    </div>
    <div class="stat-item">
      <div class="stat-num">${vanguardCount}</div>
      <div class="stat-label">前锋（情绪龙头）</div>
    </div>
    <div class="stat-item">
      <div class="stat-num">${centerCount + vanguardCount}</div>
      <div class="stat-label">总龙头数</div>
    </div>
    <div class="stat-item" style="min-width:100px">
      <div class="stat-num" style="font-size:12px;color:${sourceColor}">✦ ${sourceLabel}</div>
      <div class="stat-label" style="font-size:11px">AI 模型</div>
    </div>
  `;
}

function renderLeaderTable(data) {
  // 渲染前锋（情绪龙头）- 排在前面
  const vanEl = document.getElementById('leader-vanguard');
  vanEl.innerHTML = buildLeaderSection('⚔️', data.vanguard.title || `${data.name}板块前锋（情绪龙头）`, '前锋是板块的情绪先锋，弹性大、率先涨停、带动情绪', data.vanguard.companies, '#ef4444');

  // 渲染中军（趋势龙头）
  const centerEl = document.getElementById('leader-center');
  centerEl.innerHTML = buildLeaderSection('🏛️', data.center.title || `${data.name}板块中军（趋势龙头）`, '中军是板块的趋势核心，市值大、走势稳健、机构青睐', data.center.companies, '#6c63ff');
}

function buildLeaderSection(icon, title, subtitle, companies, accentColor) {
  const rows = companies.filter(c => stripStockCode(c.name)).map(c => `
    <tr>
      <td><strong style="color:var(--text)">${stripStockCode(c.name)}</strong></td>
      <td>${c.highlight}</td>
    </tr>`).join('');

  return `
    <div class="leader-section">
      <div class="leader-header" style="border-left: 3px solid ${accentColor}">
        <span class="leader-icon">${icon}</span>
        <div>
          <div class="leader-title" style="color:${accentColor}">${title}</div>
          <div class="leader-sub">${subtitle}</div>
        </div>
      </div>
      <table class="leader-table">
        <thead>
          <tr>
            <th style="width:auto;white-space:nowrap">名称</th>
            <th>核心逻辑</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;
}

// switchSectorViewTab 已合并到 industry/render.js 的统一 switchTab() 中

// ==================== 板块龙头海报绘制 ====================

const SECTOR_PAGE_W = 430;
const SECTOR_TARGET_H = 850; // 目标高度约一屏（手机/电脑屏幕）

/** 根据企业数量计算动态布局参数，使总高度接近 SECTOR_TARGET_H */
function calcSectorLayout(count) {
  const PAD_X = 20;          // 左右外边距
  const PAD_Y_TOP = 30;      // 上外边距
  const PAD_Y_BOTTOM = 30;   // 下外边距
  const FOOTER_H = 22;
  const BAR_H = 24;          // 标题栏高度
  const CARD_PAD_Y = 4;      // 卡片内上下边距
  const CARD_RADIUS = 10;

  // 可用内容区高度
  const availH = SECTOR_TARGET_H - PAD_Y_TOP - PAD_Y_BOTTOM - FOOTER_H;
  // 每行可用高度
  const ROW_H = Math.max(22, Math.min(36, (availH - BAR_H - CARD_PAD_Y * 2) / count));
  // 总高度
  const totalH = PAD_Y_TOP + (BAR_H + CARD_PAD_Y + count * ROW_H + CARD_PAD_Y) + FOOTER_H;

  // 字体大小随行高缩放（基准：ROW_H=28 时 name=12px, desc=11px, title=13px）
  const scale = ROW_H / 28;
  const titleFont = Math.max(11, Math.round(13 * scale));
  const nameFont = Math.max(10, Math.round(12 * scale));
  const descFont = Math.max(9, Math.round(11 * scale));
  const footerFont = Math.max(8, Math.round(9 * scale));

  return { PAD_X, PAD_Y_TOP, PAD_Y_BOTTOM, FOOTER_H, BAR_H, CARD_PAD_Y, ROW_H, CARD_RADIUS, totalH, titleFont, nameFont, descFont, footerFont };
}

function estimateSectorLeaderHeight(companies) {
  const layout = calcSectorLayout(companies.length);
  return layout.totalH;
}

function renderSectorPoster(data) {
  const container = document.getElementById('sector-poster-pages');
  container.innerHTML = '';
  const dpr = window.devicePixelRatio || 1;
  const W = SECTOR_PAGE_W;

  // ===== 合并为一张图片：前锋 + 中军 =====
  const vanCount = data.vanguard.companies.length;
  const centerCount = data.center.companies.length;

  // 计算合并后的布局参数
  const PAD_X = 20;
  const PAD_Y_TOP = 30;
  const PAD_Y_BOTTOM = 30;
  const FOOTER_H = 22;
  const BAR_H = 24;
  const CARD_PAD_Y = 4;
  const CARD_RADIUS = 10;
  const CARD_GAP = 8;
  const nameColW_ratio = 0.28; // 名称列占比
  const descGap = 8;

  // 字体大小（基于总数动态缩放）
  const baseTotalCount = 10; // 基准总数
  const totalCount = vanCount + centerCount;
  const scale = Math.max(0.6, Math.min(1.2, baseTotalCount / Math.max(totalCount, baseTotalCount)));
  const titleFont = Math.max(11, Math.round(13 * scale));
  const nameFont = Math.max(10, Math.round(12 * scale));
  const descFont = Math.max(9, Math.round(11 * scale));
  const footerFont = Math.max(8, Math.round(9 * scale));

  // 创建临时 canvas 测量实际文字尺寸
  const measureCanvas = document.createElement('canvas');
  const mCtx = measureCanvas.getContext('2d');
  mCtx.font = `${descFont}px "PingFang SC", "苹方-简", sans-serif`;

  // 预估每行动态高度
  function estimateRowH(company) {
    const innerW = W - PAD_X * 2;
    const ncW = innerW * nameColW_ratio;
    const dStartX = ncW + descGap;
    const maxDescW = Math.max(60, innerW - dStartX);
    const descLineH = descFont * 1.45;
    const lines = wrapTextLines(mCtx, company.highlight || '', maxDescW);
    const descH = lines.length * descLineH;
    const nameH = nameFont * 1.35;
    return Math.max(28, Math.max(nameH, descH) + 10);
  }

  const vanRowHs = data.vanguard.companies.map(estimateRowH);
  const centerRowHs = data.center.companies.map(estimateRowH);
  const vanContentH = vanRowHs.reduce((a, b) => a + b, 0);
  const centerContentH = centerRowHs.reduce((a, b) => a + b, 0);

  // 前锋/中军卡片高度（标题栏 + 内容 + 内边距）
  const vanCardH = BAR_H + CARD_PAD_Y + vanContentH + CARD_PAD_Y;
  const centerCardH = BAR_H + CARD_PAD_Y + centerContentH + CARD_PAD_Y;
  // 总高度
  const totalH = PAD_Y_TOP + vanCardH + CARD_GAP + centerCardH + PAD_Y_BOTTOM + FOOTER_H;

  const ROW_H = Math.max(22, vanContentH / Math.max(vanCount, 1)); // 给 layout 对象用的基准行高

  const layout = { PAD_X, PAD_Y_TOP, PAD_Y_BOTTOM, FOOTER_H, BAR_H, CARD_PAD_Y, ROW_H, CARD_RADIUS, titleFont, nameFont, descFont, footerFont, nameColW: W - PAD_X * 2, descGap };

  const label = document.createElement('div');
  label.className = 'poster-page-label';
  label.textContent = '板块龙头（前锋+中军）';
  container.appendChild(label);
  const canvas = document.createElement('canvas');
  canvas.className = 'poster-canvas-item';
  canvas.id = 'sector-poster-merged';
  canvas.width = W * dpr; canvas.height = totalH * dpr;
  canvas.style.width = W + 'px'; canvas.style.height = totalH + 'px';
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);

  // 绘制背景
  drawMergedSectorBackground(ctx, W, totalH);

  // 绘制前锋卡片（不带免责声明）
  let offsetY = PAD_Y_TOP;
  drawSingleSectorCard(ctx, data, data.vanguard, W, offsetY, '#ef4444', data.vanguard.title || `${data.name}板块前锋（情绪龙头）`, vanCardH, layout);

  // 绘制中军卡片（带免责声明）
  offsetY += vanCardH + CARD_GAP;
  drawSingleSectorCard(ctx, data, data.center, W, offsetY, '#6c63ff', data.center.title || `${data.name}板块中军（趋势龙头）`, centerCardH, layout, true /* showFooter */);

  // 绘制底部免责声明
  ctx.fillStyle = '#94a3b8';
  ctx.font = `${footerFont}px "PingFang SC", "苹方-简", sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const td = new Date();
  ctx.fillText(
    `板块龙头分析工具 · ${td.getFullYear()}年${td.getMonth()+1}月${td.getDate()}日 · 数据仅供参考，不构成投资建议`,
    W / 2, totalH - PAD_Y_BOTTOM / 2
  );
  ctx.textBaseline = 'alphabetic';
  ctx.textAlign = 'left';
}

/**
 * 合并海报的背景绘制（浅蓝白渐变 + 装饰斜线）
 */
function drawMergedSectorBackground(ctx, W, H) {
  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, '#cfe8fb');
  bg.addColorStop(0.4, '#e3f2fd');
  bg.addColorStop(1, '#f5fbff');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // 背景装饰斜线
  ctx.save();
  ctx.strokeStyle = 'rgba(37, 99, 235, 0.07)';
  ctx.lineWidth = 1;
  for (let i = 0; i < Math.ceil(H / 35); i++) {
    const y0 = i * 40;
    ctx.beginPath();
    ctx.moveTo(0, y0);
    ctx.lineTo(W, y0 + 30);
    ctx.stroke();
  }
  ctx.restore();
}

/**
 * 绘制单个板块龙头卡片（前锋或中军），不含背景和免责声明
 */
function drawSingleSectorCard(ctx, data, leaderData, W, offsetY, accentColor, titleText, cardH, layout) {
  const { PAD_X, BAR_H, CARD_PAD_Y, ROW_H, CARD_RADIUS, titleFont, nameFont, descFont } = layout;
  const innerPadX = 12;

  const cardW = W - PAD_X * 2;
  const cardX = PAD_X;
  const cardY = offsetY;
  const innerW = cardW - innerPadX * 2;

  // 卡片阴影 + 白色背景
  ctx.save();
  ctx.shadowColor = 'rgba(15, 23, 42, 0.06)';
  ctx.shadowBlur = 5;
  ctx.shadowOffsetY = 1;
  roundRect(ctx, cardX, cardY, cardW, cardH, CARD_RADIUS);
  ctx.fillStyle = '#ffffff';
  ctx.fill();
  ctx.restore();

  // 卡片边框
  roundRect(ctx, cardX, cardY, cardW, cardH, CARD_RADIUS);
  ctx.strokeStyle = '#4a90c8';
  ctx.lineWidth = 1;
  ctx.stroke();

  // 标题栏（使用各角色对应的颜色）
  ctx.save();
  roundRect(ctx, cardX, cardY, cardW, cardH, CARD_RADIUS);
  ctx.clip();
  const bgrad = ctx.createLinearGradient(cardX, cardY, cardX, cardY + BAR_H);
  bgrad.addColorStop(0, accentColor);
  bgrad.addColorStop(1, shadeColor(accentColor, -30));
  ctx.fillStyle = bgrad;
  ctx.fillRect(cardX, cardY, cardW, BAR_H);
  ctx.restore();

  // 标题文字
  ctx.fillStyle = '#ffffff';
  ctx.font = `bold ${titleFont}px "PingFang SC", "苹方-简", sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(titleText, cardX + cardW / 2, cardY + BAR_H / 2);
  ctx.textBaseline = 'alphabetic';
  ctx.textAlign = 'left';

  // 企业列表（名称 + 说明 左右布局，说明文字多行展示不打点）
  let cy = cardY + BAR_H + CARD_PAD_Y;
  const nameColW = innerW * 0.15; // 名称列固定宽度（15%）
  const descGap = 8;              // 名称和说明之间的间距

  leaderData.companies.forEach((company, ci) => {
    // 行分隔线
    if (ci > 0) {
      ctx.strokeStyle = '#e8eef5';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cardX + innerPadX, cy);
      ctx.lineTo(cardX + cardW - innerPadX, cy);
      ctx.stroke();
    }

    const baseX = cardX + innerPadX;
    const descStartX = baseX + nameColW + descGap;
    const maxDescW = Math.max(60, cardX + cardW - innerPadX - descStartX);

    // 公司名称（加粗，左上对齐，固定列宽内截断）
    let nameStr = stripStockCode(company.name);
    if (!nameStr) return; // 过滤 ST / 退市公司
    ctx.font = `bold ${nameFont}px "PingFang SC", "苹方-简", sans-serif`;
    ctx.fillStyle = '#0f172a';
    if (ctx.measureText(nameStr).width > nameColW) {
      nameStr = fitOneLineWidth(ctx, nameStr, nameColW);
    }
    const rowTop = cy + 5;
    ctx.textBaseline = 'top';
    ctx.fillText(nameStr, baseX, rowTop);
    const nameH = nameFont * 1.35;

    // 说明文字（自动换行，完整展示，绝对不打点）
    ctx.font = `${descFont}px "PingFang SC", "苹方-简", sans-serif`;
    ctx.fillStyle = '#64748b';
    const descText = company.highlight || '';
    const descLineH = descFont * 1.45;
    const descLines = wrapTextLines(ctx, descText, maxDescW);
    descLines.forEach((line, li) => {
      ctx.fillText(line, descStartX, rowTop + li * descLineH);
    });
    const descH = descLines.length * descLineH;

    // 本行动态高度
    const rowActualH = Math.max(ROW_H, Math.max(nameH, descH) + 10);
    cy += rowActualH;

    ctx.textBaseline = 'alphabetic';
    ctx.textAlign = 'left';
  });
}

/**
 * 将文本按 maxWidth 自动分行，返回行数组（不绘制）
 */
function wrapTextLines(ctx, text, maxWidth) {
  if (!text) return [''];
  const lines = [];
  let line = '';
  for (let i = 0; i < text.length; i++) {
    const testLine = line + text[i];
    if (ctx.measureText(testLine).width > maxWidth && line !== '') {
      lines.push(line);
      line = text[i];
    } else {
      line = testLine;
    }
  }
  lines.push(line);
  return lines;
}

/** 颜色加深/变暗辅助函数 */
// shadeColor 已在 js/utils/color.js 中定义

function downloadSectorPoster() {
  if (!currentSector) return;
  const canvas = document.getElementById('sector-poster-merged');
  if (!canvas) return;
  const a = document.createElement('a');
  a.download = `${currentSector.name}_板块龙头_${new Date().toLocaleDateString('zh-CN')}.png`;
  a.href = canvas.toDataURL('image/png');
  a.click();
}

async function copySectorPoster() {
  const canvas = document.getElementById('sector-poster-cover');
  if (!canvas) return;
  try {
    canvas.toBlob(async (blob) => {
      const item = new ClipboardItem({ 'image/png': blob });
      await navigator.clipboard.write([item]);
      alert('✅ 已复制封面海报到剪贴板！');
    });
  } catch (e) {
    alert('❌ 复制失败，请使用下载功能');
  }
}
