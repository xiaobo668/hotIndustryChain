/**
 * 产业链海报绘制模块 (industry/poster.js)
 * - PAGE_W: 海报宽度常量
 * - flattenIndustrySegments(data): 扁平化产业链细分赛道
 * - estimateBlueprintPosterHeight(companies): 估算海报高度
 * - renderPoster(data): 海报入口
 * - drawBlueprintPoster(ctx, data, W, H): 核心绘制逻辑（浅蓝白信息图风格）
 * - drawCoverIllustration(ctx, industryName, W, H): 行业封面插图（保留完整代码）
 * - drawGear(ctx, cx, cy, r): 齿轮绘制
 * - downloadPoster(): 下载海报
 * - copyPoster(): 复制海报到剪贴板
 *
 * 依赖（已在其他模块中定义的全局函数）：
 *   fitOneLineWidth, roundRect, drawWrappedText（utils/canvas.js）
 *   currentIndustry（全局变量）
 */

// ===========================
// 海报生成（Canvas）— 单页浅蓝白模板，扁平细分赛道，无上中下游
// ===========================
const PAGE_W = 430;

function flattenIndustrySegments(data) {
  const barColors = ['#1e40af', '#2563eb', '#1d4ed8', '#0369a1', '#0c4a6e', '#075985'];
  const list = [];
  let i = 0;
  for (const tier of [data.upstream, data.midstream, data.downstream]) {
    for (const seg of tier) {
      list.push({ name: seg.name, companies: seg.companies, barColor: barColors[i % barColors.length] });
      i++;
    }
  }
  return list;
}

/** 海报排版参数（posterFontScale=2 时字号与行距同步放大） */
function getPosterLayout(data) {
  const s =
    data.posterFontScale ||
    (data.posterNameOnly && data.themeGroups && data.themeGroups.length ? 2 : 1);
  return {
    s,
    PAD: Math.round(12 * s),
    FOOTER_H: Math.round(24 * s),
    TOP_BODY: Math.round(8 * s),
    TITLE_H: data.posterTitle ? Math.round(52 * s) : 0,
    TITLE_INNER_H: data.posterTitle ? Math.round(44 * s) : 0,
    FONT_TITLE: Math.round(16 * s),
    FONT_SUB: Math.round(11 * s),
    FONT_FOOTER: Math.round(9 * s),
    COMPACT_ROW_H: Math.round(17 * s),
    THEME_HEAD_H: Math.round(20 * s),
    THEME_CARD_PAD: Math.round(8 * s),
    LINE_GAP: Math.max(1, Math.round(1 * s)),
    THEME_GAP: Math.round(8 * s),
    FONT_THEME: Math.round(13 * s),
    FONT_LABEL: Math.round(11 * s),
    FONT_NAMES: Math.round(11 * s),
    innerPadX: Math.round(10 * s),
    CARD_RADIUS: Math.round(10 * s),
  };
}

function getPosterThemePages(data) {
  const groups = data.themeGroups;
  if (!groups || !groups.length) return [null];
  const split = data.posterSplitPages > 1 && data.posterThemesPerPage > 0;
  if (!split) return [groups];
  const pages = [];
  const chunk = data.posterThemesPerPage;
  for (let i = 0; i < groups.length; i += chunk) {
    pages.push(groups.slice(i, i + chunk));
  }
  return pages;
}

function estimateBlueprintPosterHeight(data) {
  const L = getPosterLayout(data);
  const FOOTER_H = L.FOOTER_H;
  const TOP_BODY = L.TOP_BODY;
  const TITLE_H = L.TITLE_H;
  const BLUE_BAR_H = 22;
  const THEME_BAR_H = 26;
  const CARD_PAD_Y = 3;
  const ROW_H = 20;
  const CARD_GAP = 4;
  const THEME_GAP = L.THEME_GAP;
  let body = TOP_BODY + TITLE_H;
  const themeGroups = data.themeGroups;
  if (data.posterNameOnly && themeGroups && themeGroups.length) {
    themeGroups.forEach((theme, ti) => {
      const n = theme.segments.length;
      body +=
        L.THEME_CARD_PAD * 2 +
        L.THEME_HEAD_H +
        n * L.COMPACT_ROW_H +
        Math.max(0, n - 1) * L.LINE_GAP;
      if (ti < themeGroups.length - 1) body += THEME_GAP;
    });
    return body + FOOTER_H;
  }
  const segRows = (seg) => (data.posterNameOnly ? 1 : seg.companies.length);
  if (themeGroups && themeGroups.length) {
    themeGroups.forEach((theme, ti) => {
      body += THEME_BAR_H + THEME_GAP;
      theme.segments.forEach((seg, si) => {
        body += BLUE_BAR_H + CARD_PAD_Y + segRows(seg) * ROW_H + CARD_PAD_Y;
        if (si < theme.segments.length - 1) body += CARD_GAP;
      });
      if (ti < themeGroups.length - 1) body += THEME_GAP;
    });
    return body + FOOTER_H;
  }
  const segs = flattenIndustrySegments(data);
  segs.forEach((seg, si) => {
    body += BLUE_BAR_H + CARD_PAD_Y + seg.companies.length * ROW_H + CARD_PAD_Y;
    if (si < segs.length - 1) body += CARD_GAP;
  });
  return body + FOOTER_H;
}

function renderPoster(data) {
  const container = document.getElementById('poster-pages');
  container.innerHTML = '';
  const dpr = window.devicePixelRatio || 1;
  const W = PAGE_W;
  const themePages = getPosterThemePages(data);
  const multi = themePages.length > 1;

  themePages.forEach((pageThemes, idx) => {
    const pageData = pageThemes
      ? {
          ...data,
          themeGroups: pageThemes,
          posterPageIndex: idx + 1,
          posterPageTotal: themePages.length,
          posterPageSubtitle: pageThemes
            .map((t) => t.title.replace(/^[一二三四五六]、/, ''))
            .join(' · '),
        }
      : data;

    const H = estimateBlueprintPosterHeight(pageData);

    const block = document.createElement('div');
    block.className = 'poster-page-block';

    const label = document.createElement('div');
    label.className = 'poster-page-label';
    if (multi) {
      label.textContent = `第 ${idx + 1}/${themePages.length} 张 · ${pageData.posterPageSubtitle}`;
    } else {
      label.textContent = data.posterLabel || '行业龙头企业图谱';
    }
    block.appendChild(label);

    const canvas = document.createElement('canvas');
    canvas.className = 'poster-canvas-item';
    canvas.id = multi ? `poster-canvas-${idx}` : 'poster-canvas-main';
    canvas.dataset.pageIndex = String(idx + 1);
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    block.appendChild(canvas);

    const row = document.createElement('div');
    row.className = 'poster-page-actions';
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'btn btn-primary poster-page-dl-btn';
    btn.textContent = multi
      ? `⬇️ 下载第 ${idx + 1} 张`
      : '⬇️ 下载当前图';
    btn.onclick = () => downloadPosterPage(idx);
    row.appendChild(btn);
    block.appendChild(row);

    container.appendChild(block);

    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    drawBlueprintPoster(ctx, pageData, W, H);
  });

  const dlBtn = document.getElementById('poster-download-btn');
  if (dlBtn) {
    dlBtn.textContent = multi
      ? `⬇️ 下载全部（${themePages.length}张）`
      : '⬇️ 下载产业链海报';
  }
  let hint = document.getElementById('poster-multi-dl-hint');
  if (multi) {
    if (!hint) {
      hint = document.createElement('p');
      hint.id = 'poster-multi-dl-hint';
      hint.className = 'poster-multi-dl-hint';
      const actions = document.querySelector('#view-poster .poster-actions');
      if (actions) actions.insertBefore(hint, actions.firstChild);
    }
    hint.style.display = 'block';
    hint.textContent =
      '提示：若「下载全部」只保存一张，请点每张海报下方的「下载本张」。';
  } else if (hint) {
    hint.style.display = 'none';
  }
}

// fitOneLineWidth 已在 js/utils/canvas.js 中定义

/** 浅蓝白信息图风格：白卡片 + 蓝色条小标题 */
function drawBlueprintPoster(ctx, data, W, H) {
  const L = getPosterLayout(data);
  const PAD = L.PAD;
  const FOOTER_H = L.FOOTER_H;
  const TOP_BODY = L.TOP_BODY;
  const TITLE_H = L.TITLE_H;
  const BLUE_BAR_H = 22;
  const THEME_BAR_H = 26;
  const CARD_PAD_Y = 3;
  const ROW_H = 20;
  const CARD_GAP = 4;
  const THEME_GAP = L.THEME_GAP;
  const CARD_RADIUS = L.CARD_RADIUS;
  const borderBlue = '#4a90c8';
  const innerPadX = L.innerPadX;

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
    const y0 = i * 40;
    ctx.beginPath();
    ctx.moveTo(0, y0);
    ctx.lineTo(W, y0 + 30);
    ctx.stroke();
  }
  ctx.restore();

  let y = TOP_BODY;
  const cardW = W - PAD * 2;
  const cardX = PAD;

  if (data.posterTitle) {
    const barH = L.TITLE_INNER_H;
    const tg = ctx.createLinearGradient(PAD, y, W - PAD, y);
    tg.addColorStop(0, '#1e40af');
    tg.addColorStop(0.5, '#2563eb');
    tg.addColorStop(1, '#3b82f6');
    roundRect(ctx, PAD, y, cardW, barH, CARD_RADIUS);
    ctx.fillStyle = tg;
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = `bold ${L.FONT_TITLE}px "PingFang SC", "苹方-简", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(data.posterTitle, W / 2, y + barH * 0.38);
    ctx.font = `${L.FONT_SUB}px "PingFang SC", "苹方-简", sans-serif`;
    ctx.fillStyle = 'rgba(255,255,255,0.9)';
    const subLine =
      data.posterPageTotal > 1
        ? `第 ${data.posterPageIndex}/${data.posterPageTotal} 张 · ${data.posterPageSubtitle || ''}`
        : '六大科技主线 · 产业链代表公司';
    ctx.fillText(subLine, W / 2, y + barH * 0.72);
    ctx.textBaseline = 'alphabetic';
    ctx.textAlign = 'left';
    y += TITLE_H;
  }

  const drawSegmentCard = (seg, barColor) => {
    const innerW = cardW - innerPadX * 2;
    const nameOnly = !!data.posterNameOnly;
    const bodyRows = nameOnly ? 1 : seg.companies.length;
    const bodyInnerH = CARD_PAD_Y + bodyRows * ROW_H + CARD_PAD_Y;
    const cardH = BLUE_BAR_H + bodyInnerH;

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
    const bgrad = ctx.createLinearGradient(cardX, y, cardX, y + BLUE_BAR_H);
    bgrad.addColorStop(0, barColor || '#2563eb');
    bgrad.addColorStop(1, '#1e3a8a');
    ctx.fillStyle = bgrad;
    ctx.fillRect(cardX, y, cardW, BLUE_BAR_H);
    ctx.restore();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 11px "PingFang SC", "苹方-简", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const barLabel = seg.name.includes('·') ? seg.name.split('·').pop() : seg.name;
    ctx.fillText(barLabel, cardX + cardW / 2, y + BLUE_BAR_H / 2);
    ctx.textBaseline = 'alphabetic';
    ctx.textAlign = 'left';

    let cy = y + BLUE_BAR_H + CARD_PAD_Y;
    const rowMid = (ci) => cy + ci * ROW_H + ROW_H / 2;

    if (nameOnly) {
      const midY = rowMid(0);
      const names = seg.companies.map((c) => c.name);
      const sep = '  ';
      ctx.textBaseline = 'middle';
      ctx.font = 'bold 11px "PingFang SC", "苹方-简", sans-serif';
      ctx.fillStyle = '#0f172a';
      let line = names.join(sep);
      if (ctx.measureText(line).width > innerW) {
        line = names.map((n) => fitOneLineWidth(ctx, n, innerW / names.length - ctx.measureText(sep).width)).join(sep);
      }
      ctx.textAlign = 'center';
      ctx.fillText(line, cardX + cardW / 2, midY);
      ctx.textAlign = 'left';
      ctx.textBaseline = 'alphabetic';
    } else {
      seg.companies.forEach((company, ci) => {
        if (ci > 0) {
          ctx.strokeStyle = '#e8eef5';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(cardX + innerPadX, cy + ci * ROW_H);
          ctx.lineTo(cardX + cardW - innerPadX, cy + ci * ROW_H);
          ctx.stroke();
        }

        const baseX = cardX + innerPadX;
        const rightX = cardX + cardW - innerPadX;
        ctx.textBaseline = 'middle';
        const midY = rowMid(ci);

        let nameStr = company.name;
        ctx.font = 'bold 11px "PingFang SC", "苹方-简", sans-serif';
        ctx.fillStyle = '#0f172a';
        const gap = 5;
        const maxName = innerW * 0.34;
        if (ctx.measureText(nameStr).width > maxName) {
          nameStr = fitOneLineWidth(ctx, nameStr, maxName);
        }
        ctx.fillText(nameStr, baseX, midY);
        const nameW = ctx.measureText(nameStr).width;

        const hl = (company.highlight || '').trim();
        if (hl) {
          const descX = baseX + nameW + gap;
          const maxDescW = Math.max(18, rightX - descX);
          ctx.font = '10px "PingFang SC", "苹方-简", sans-serif';
          ctx.fillStyle = '#64748b';
          const desc = fitOneLineWidth(ctx, hl, maxDescW);
          ctx.fillText(desc, descX, midY);
        }
        ctx.textBaseline = 'alphabetic';
      });
    }

    y += cardH + CARD_GAP;
  };

  if (data.posterNameOnly && data.themeGroups && data.themeGroups.length) {
    const innerW = cardW - innerPadX * 2;

    data.themeGroups.forEach((theme, ti) => {
      const n = theme.segments.length;
      const cardInnerH =
        L.THEME_HEAD_H + n * L.COMPACT_ROW_H + Math.max(0, n - 1) * L.LINE_GAP;
      const cardH = L.THEME_CARD_PAD * 2 + cardInnerH;

      ctx.save();
      ctx.shadowColor = 'rgba(15, 23, 42, 0.05)';
      ctx.shadowBlur = 4;
      ctx.shadowOffsetY = 1;
      roundRect(ctx, cardX, y, cardW, cardH, CARD_RADIUS);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.restore();
      roundRect(ctx, cardX, y, cardW, cardH, CARD_RADIUS);
      ctx.strokeStyle = borderBlue;
      ctx.lineWidth = 1;
      ctx.stroke();

      let cy = y + L.THEME_CARD_PAD;
      ctx.fillStyle = theme.color || '#2563eb';
      ctx.font = `bold ${L.FONT_THEME}px "PingFang SC", "苹方-简", sans-serif`;
      ctx.textBaseline = 'middle';
      ctx.fillText(theme.title, cardX + innerPadX, cy + L.THEME_HEAD_H / 2);
      cy += L.THEME_HEAD_H;

      theme.segments.forEach((seg, si) => {
        const label = seg.name.includes('·') ? seg.name.split('·').pop() : seg.name;
        const names = seg.companies.map((c) => c.name).join('  ');
        const midY = cy + L.COMPACT_ROW_H / 2;
        const baseX = cardX + innerPadX;

        ctx.font = `bold ${L.FONT_LABEL}px "PingFang SC", "苹方-简", sans-serif`;
        ctx.fillStyle = theme.color || '#1e40af';
        const prefix = label + '：';
        ctx.fillText(prefix, baseX, midY);
        const prefixW = ctx.measureText(prefix).width;

        ctx.font = `${L.FONT_NAMES}px "PingFang SC", "苹方-简", sans-serif`;
        ctx.fillStyle = '#0f172a';
        let namesText = names;
        const maxNamesW = innerW - prefixW;
        if (ctx.measureText(namesText).width > maxNamesW) {
          namesText = fitOneLineWidth(ctx, namesText, maxNamesW);
        }
        ctx.fillText(namesText, baseX + prefixW, midY);

        if (si < n - 1) {
          ctx.strokeStyle = '#eef2f7';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(baseX, cy + L.COMPACT_ROW_H);
          ctx.lineTo(cardX + cardW - innerPadX, cy + L.COMPACT_ROW_H);
          ctx.stroke();
        }
        cy += L.COMPACT_ROW_H + (si < n - 1 ? L.LINE_GAP : 0);
      });

      ctx.textBaseline = 'alphabetic';
      y += cardH + (ti < data.themeGroups.length - 1 ? THEME_GAP : 0);
    });
  } else if (data.themeGroups && data.themeGroups.length) {
    data.themeGroups.forEach((theme, ti) => {
      roundRect(ctx, cardX, y, cardW, THEME_BAR_H, 8);
      const tg = ctx.createLinearGradient(cardX, y, cardX + cardW, y);
      tg.addColorStop(0, theme.color || '#2563eb');
      tg.addColorStop(1, '#1e3a8a');
      ctx.fillStyle = tg;
      ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 13px "PingFang SC", "苹方-简", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(theme.title, cardX + cardW / 2, y + THEME_BAR_H / 2 + 1);
      ctx.textAlign = 'left';
      y += THEME_BAR_H + THEME_GAP;

      theme.segments.forEach((seg) => drawSegmentCard(seg, theme.color));
      if (ti < data.themeGroups.length - 1) y += THEME_GAP - CARD_GAP;
    });
  } else {
    const segs = flattenIndustrySegments(data);
    segs.forEach((seg) => drawSegmentCard(seg, seg.barColor));
    if (segs.length) y -= CARD_GAP;
  }

  ctx.fillStyle = '#64748b';
  ctx.font = `${L.FONT_FOOTER}px "PingFang SC", "苹方-简", sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const td = new Date();
  const footerText = `产业链分析工具 · ${td.getFullYear()}年${td.getMonth() + 1}月${td.getDate()}日 · 数据仅供参考，不构成投资建议`;
  if (L.s > 1 && ctx.measureText(footerText).width > W - PAD * 2) {
    ctx.font = `${Math.max(10, L.FONT_FOOTER - 2)}px "PingFang SC", "苹方-简", sans-serif`;
  }
  ctx.fillText(footerText, W / 2, H - FOOTER_H / 2);
  ctx.textBaseline = 'alphabetic';
  ctx.textAlign = 'left';
}

// ===========================
// 行业封面插图绘制
// ===========================
function drawCoverIllustration(ctx, data, x, y, w, h) {
  const cx = x + w / 2, cy = y + h / 2;
  const color = data.color;
  const name = data.name;

  // 通用：圆形渐变底座
  const base = ctx.createRadialGradient(cx, cy, 0, cx, cy, w * 0.48);
  base.addColorStop(0, color + '22');
  base.addColorStop(0.6, color + '0a');
  base.addColorStop(1, 'transparent');
  ctx.fillStyle = base;
  ctx.beginPath(); ctx.arc(cx, cy, w * 0.48, 0, Math.PI * 2); ctx.fill();

  if (name === '半导体') {
    // 晶圆 + 芯片格网
    ctx.save();
    ctx.strokeStyle = color + 'bb'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(cx, cy, w * 0.38, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.arc(cx, cy, w * 0.28, 0, Math.PI * 2); ctx.stroke();
    const grid = 5, gs = w * 0.56 / grid;
    ctx.strokeStyle = color + '55'; ctx.lineWidth = 0.8;
    for (let i = 0; i <= grid; i++) {
      ctx.beginPath(); ctx.moveTo(cx - w*0.28 + i*gs, cy - w*0.28); ctx.lineTo(cx - w*0.28 + i*gs, cy + w*0.28); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx - w*0.28, cy - w*0.28 + i*gs); ctx.lineTo(cx + w*0.28, cy - w*0.28 + i*gs); ctx.stroke();
    }
    roundRect(ctx, cx - gs*1.2, cy - gs*1.2, gs*2.4, gs*2.4, 4);
    ctx.fillStyle = color + '55'; ctx.fill();
    ctx.strokeStyle = color; ctx.lineWidth = 1.5; ctx.stroke();
    const pinLen = gs * 0.5, pins = 4;
    for (let i = 0; i < pins; i++) {
      const px = cx - gs*1.2 + i*(gs*2.4/pins) + gs*0.3;
      ctx.beginPath(); ctx.moveTo(px, cy - gs*1.2); ctx.lineTo(px, cy - gs*1.2 - pinLen); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(px, cy + gs*1.2); ctx.lineTo(px, cy + gs*1.2 + pinLen); ctx.stroke();
    }
    ctx.restore();

  } else if (name === 'AI算力' || name === '算力租赁' || name === '人工智能' || name === 'AI应用') {
    // 神经网络节点图
    ctx.save();
    const layers = [[0], [-0.22, 0, 0.22], [-0.28, -0.1, 0.1, 0.28], [-0.22, 0, 0.22], [0]];
    const layerX = [-0.36, -0.18, 0, 0.18, 0.36];
    const nodes = layers.map((ys, li) => ys.map(yOff => ({ x: cx + layerX[li]*w, y: cy + yOff*h })));
    ctx.strokeStyle = color + '44'; ctx.lineWidth = 0.8;
    for (let li = 0; li < nodes.length - 1; li++) {
      nodes[li].forEach(a => nodes[li+1].forEach(b => {
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      }));
    }
    nodes.forEach((layer, li) => layer.forEach(n => {
      const r = li === 0 || li === 4 ? 5 : li === 2 ? 7 : 6;
      ctx.beginPath(); ctx.arc(n.x, n.y, r, 0, Math.PI*2);
      ctx.fillStyle = li === 2 ? color : color + 'aa'; ctx.fill();
      ctx.strokeStyle = color; ctx.lineWidth = 1; ctx.stroke();
    }));
    const gn = ctx.createRadialGradient(cx, cy, 0, cx, cy, 16);
    gn.addColorStop(0, color + 'ff'); gn.addColorStop(1, color + '00');
    ctx.fillStyle = gn;
    ctx.beginPath(); ctx.arc(cx, cy, 16, 0, Math.PI*2); ctx.fill();
    ctx.restore();

  } else if (name === '新能源汽车') {
    // 汽车剪影 + 闪电
    ctx.save();
    const s = w * 0.0035;
    ctx.translate(cx - w*0.32, cy - h*0.12);
    ctx.scale(s, s);
    ctx.strokeStyle = color; ctx.lineWidth = 4 / s; ctx.fillStyle = color + '33';
    ctx.beginPath();
    ctx.moveTo(10, 60); ctx.lineTo(10, 35);
    ctx.bezierCurveTo(10, 20, 25, 10, 45, 10);
    ctx.lineTo(115, 10);
    ctx.bezierCurveTo(135, 10, 150, 20, 150, 35);
    ctx.lineTo(150, 60); ctx.closePath();
    ctx.fill(); ctx.stroke();
    ctx.fillStyle = color + '66';
    ctx.beginPath(); ctx.moveTo(40, 34); ctx.lineTo(60, 14); ctx.lineTo(100, 14); ctx.lineTo(120, 34); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#1a1a2e'; ctx.strokeStyle = color; ctx.lineWidth = 3 / s;
    [35, 125].forEach(wx => {
      ctx.beginPath(); ctx.arc(wx, 62, 14, 0, Math.PI*2); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.arc(wx, 62, 6, 0, Math.PI*2); ctx.fillStyle = color + '88'; ctx.fill(); ctx.fillStyle = '#1a1a2e';
    });
    ctx.restore();
    ctx.save(); ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(cx + w*0.22, cy - h*0.2); ctx.lineTo(cx + w*0.12, cy); ctx.lineTo(cx + w*0.2, cy); ctx.lineTo(cx + w*0.08, cy + h*0.2);
    ctx.lineTo(cx + w*0.2, cy - h*0.03); ctx.lineTo(cx + w*0.12, cy - h*0.03); ctx.closePath(); ctx.fill();
    ctx.restore();

  } else if (name === '光伏') {
    // 太阳 + 光伏板
    ctx.save();
    ctx.strokeStyle = color; ctx.fillStyle = color + '33'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(cx - w*0.1, cy - h*0.22, w*0.14, 0, Math.PI*2); ctx.fill(); ctx.stroke();
    for (let i = 0; i < 8; i++) {
      const ang = (i / 8) * Math.PI * 2, r1 = w*0.16, r2 = w*0.23;
      ctx.beginPath(); ctx.moveTo(cx - w*0.1 + Math.cos(ang)*r1, cy - h*0.22 + Math.sin(ang)*r1);
      ctx.lineTo(cx - w*0.1 + Math.cos(ang)*r2, cy - h*0.22 + Math.sin(ang)*r2);
      ctx.strokeStyle = color + 'aa'; ctx.lineWidth = 1.5; ctx.stroke();
    }
    ctx.save(); ctx.translate(cx - w*0.1, cy + h*0.05); ctx.rotate(-0.2);
    const pw = w * 0.55, ph = h * 0.3;
    roundRect(ctx, -pw/2, -ph/2, pw, ph, 4);
    ctx.fillStyle = color + '25'; ctx.fill(); ctx.strokeStyle = color + 'bb'; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.strokeStyle = color + '55'; ctx.lineWidth = 0.8;
    for (let ci = 1; ci < 4; ci++) { ctx.beginPath(); ctx.moveTo(-pw/2 + ci*pw/4, -ph/2); ctx.lineTo(-pw/2 + ci*pw/4, ph/2); ctx.stroke(); }
    for (let ri = 1; ri < 3; ri++) { ctx.beginPath(); ctx.moveTo(-pw/2, -ph/2 + ri*ph/3); ctx.lineTo(pw/2, -ph/2 + ri*ph/3); ctx.stroke(); }
    ctx.restore(); ctx.restore();

  } else if (name === '锂电池') {
    // 电池形状 + 电量填充
    ctx.save();
    const bw = w * 0.52, bh = h * 0.62, bx = cx - bw/2, by = cy - bh/2 + h*0.04;
    roundRect(ctx, bx, by, bw, bh, 12);
    ctx.fillStyle = color + '22'; ctx.fill(); ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.stroke();
    roundRect(ctx, cx - bw*0.2, by - 10, bw*0.4, 12, [4,4,0,0]);
    ctx.fillStyle = color + '88'; ctx.fill();
    const fillH = bh * 0.75;
    roundRect(ctx, bx + 6, by + bh - fillH - 6, bw - 12, fillH, [0,0,8,8]);
    const fg = ctx.createLinearGradient(bx, by + bh, bx, by);
    fg.addColorStop(0, color + 'dd'); fg.addColorStop(1, color + '66');
    ctx.fillStyle = fg; ctx.fill();
    ctx.fillStyle = '#fff'; ctx.globalAlpha = 0.9;
    ctx.beginPath();
    ctx.moveTo(cx + 4, cy - h*0.12); ctx.lineTo(cx - 8, cy + 4); ctx.lineTo(cx + 1, cy + 4);
    ctx.lineTo(cx - 4, cy + h*0.15); ctx.lineTo(cx + 10, cy - 4); ctx.lineTo(cx + 2, cy - 4);
    ctx.closePath(); ctx.fill(); ctx.globalAlpha = 1; ctx.restore();

  } else if (name === '消费电子') {
    // 手机 + 平板轮廓
    ctx.save();
    roundRect(ctx, cx - w*0.32, cy - h*0.3, w*0.46, h*0.6, 8);
    ctx.fillStyle = color + '1a'; ctx.fill(); ctx.strokeStyle = color + '66'; ctx.lineWidth = 1.5; ctx.stroke();
    roundRect(ctx, cx + w*0.04, cy - h*0.28, w*0.24, h*0.56, 10);
    ctx.fillStyle = color + '33'; ctx.fill(); ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.stroke();
    roundRect(ctx, cx + w*0.07, cy - h*0.22, w*0.18, h*0.44, 6);
    ctx.fillStyle = color + '22'; ctx.fill(); ctx.strokeStyle = color + '44'; ctx.lineWidth = 0.8; ctx.stroke();
    ctx.beginPath(); ctx.arc(cx + w*0.16, cy + h*0.23, 4, 0, Math.PI*2)
    ctx.fillStyle = color + '88'; ctx.fill(); ctx.restore();

  } else if (name === '机器人') {
    // 人形机器人
    ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = 2;
    roundRect(ctx, cx - 16, cy - h*0.38, 32, 28, 8);
    ctx.fillStyle = color + '33'; ctx.fill(); ctx.stroke();
    ctx.fillStyle = color;
    ctx.beginPath(); ctx.arc(cx - 7, cy - h*0.28, 3.5, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(cx + 7, cy - h*0.28, 3.5, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.moveTo(cx - 5, cy - h*0.1 + 6); ctx.lineTo(cx + 5, cy - h*0.1 + 6);
    ctx.moveTo(cx, cy - h*0.1 + 6); ctx.lineTo(cx, cy - h*0.1 + 14); ctx.stroke();
    roundRect(ctx, cx - 22, cy - h*0.1 + 14, 44, 46, 8);
    ctx.fillStyle = color + '33'; ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.arc(cx, cy + h*0.04, 9, 0, Math.PI*2)
    ctx.fillStyle = color + '66'; ctx.fill();
    ctx.strokeStyle = color + 'bb'; ctx.lineWidth = 7; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(cx - 22, cy - h*0.04); ctx.lineTo(cx - 36, cy + h*0.1); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx + 22, cy - h*0.04); ctx.lineTo(cx + 36, cy + h*0.1); ctx.stroke();
    ctx.lineWidth = 8;
    ctx.beginPath(); ctx.moveTo(cx - 11, cy - h*0.1 + 60); ctx.lineTo(cx - 13, cy + h*0.36); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx + 11, cy - h*0.1 + 60); ctx.lineTo(cx + 13, cy + h*0.36); ctx.stroke();
    ctx.lineCap = 'butt'; ctx.restore();

  } else if (name === '液冷') {
    // 水滴 + 流动曲线 + 服务器机柜
    ctx.save();
    roundRect(ctx, cx - w*0.3, cy - h*0.3, w*0.38, h*0.6, 6);
    ctx.fillStyle = color + '1a'; ctx.fill(); ctx.strokeStyle = color + '66'; ctx.lineWidth = 1.5; ctx.stroke();
    [0.15, 0.02, -0.1].forEach(off => {
      roundRect(ctx, cx - w*0.26, cy + off*h, w*0.3, h*0.09, 3);
      ctx.fillStyle = color + '33'; ctx.fill(); ctx.strokeStyle = color + '88'; ctx.lineWidth = 1; ctx.stroke();
      ctx.fillStyle = color; ctx.beginPath(); ctx.arc(cx - w*0.26 + w*0.26, cy + off*h + h*0.045, 3, 0, Math.PI*2); ctx.fill();
    });
    ctx.save(); ctx.translate(cx + w*0.2, cy - h*0.1);
    ctx.fillStyle = color + 'cc';
    ctx.beginPath(); ctx.moveTo(0, -h*0.25);
    ctx.bezierCurveTo(w*0.12, -h*0.1, w*0.14, h*0.06, 0, h*0.14);
    ctx.bezierCurveTo(-w*0.14, h*0.06, -w*0.12, -h*0.1, 0, -h*0.25); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    ctx.beginPath(); ctx.ellipse(-w*0.03, -h*0.1, w*0.03, h*0.05, -0.3, 0, Math.PI*2); ctx.fill();
    ctx.restore();
    ctx.strokeStyle = color + '66'; ctx.lineWidth = 1.5; ctx.setLineDash([4, 4]);
    ctx.beginPath(); ctx.moveTo(cx + w*0.15, cy - h*0.05);
    ctx.bezierCurveTo(cx + w*0.08, cy + h*0.15, cx - w*0.05, cy + h*0.2, cx - w*0.15, cy + h*0.15); ctx.stroke();
    ctx.setLineDash([]); ctx.restore();

  } else if (name === '通讯设备') {
    // 信号塔 + 无线电波
    ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy - h*0.42); ctx.lineTo(cx - w*0.18, cy + h*0.32);
    ctx.moveTo(cx, cy - h*0.42); ctx.lineTo(cx + w*0.18, cy + h*0.32); ctx.stroke();
    [[-0.2, 0.1], [-0.05, 0.16], [0.1, 0.24]].forEach(([yo, xw]) => {
      ctx.beginPath(); ctx.moveTo(cx - xw*w, cy + yo*h); ctx.lineTo(cx + xw*w, cy + yo*h); ctx.stroke();
    });
    ctx.strokeStyle = color; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(cx, cy - h*0.42); ctx.lineTo(cx, cy - h*0.5); ctx.stroke();
    ctx.beginPath(); ctx.arc(cx, cy - h*0.5, 4, 0, Math.PI*2); ctx.fillStyle = color; ctx.fill();
    [0.12, 0.22, 0.32].forEach((r, i) => {
      ctx.beginPath(); ctx.arc(cx, cy - h*0.05, r*w, -Math.PI*0.6, Math.PI*0.6)
      ctx.strokeStyle = color + (i === 0 ? 'ff' : i === 1 ? 'aa' : '55');
      ctx.lineWidth = 1.5; ctx.stroke();
    }); ctx.restore();

  } else if (name === 'IT服务') {
    // 代码窗口 + 齿轮
    ctx.save();
    roundRect(ctx, cx - w*0.38, cy - h*0.32, w*0.58, h*0.55, 10);
    ctx.fillStyle = color + '18'; ctx.fill(); ctx.strokeStyle = color + '88'; ctx.lineWidth = 1.5; ctx.stroke();
    roundRect(ctx, cx - w*0.38, cy - h*0.32, w*0.58, 18, [10,10,0,0]);
    ctx.fillStyle = color + '44'; ctx.fill();
    [8, 18, 28].forEach((dx, i) => {
      ctx.beginPath(); ctx.arc(cx - w*0.38 + dx, cy - h*0.32 + 9, 3.5, 0, Math.PI*2)
      ctx.fillStyle = [color, color+'aa', color+'55'][i]; ctx.fill();
    });
    [[0.12, 0.25], [0.06, 0.2], [0.09, 0.28], [0.04, 0.16]].forEach(([xo, len], i) => {
      roundRect(ctx, cx - w*0.38 + 12 + xo*w, cy - h*0.32 + 26 + i*13, len*w, 6, 3);
      ctx.fillStyle = i === 0 ? color + 'cc' : i === 2 ? color + '99' : color + '55'; ctx.fill();
    });
    ctx.save(); ctx.translate(cx + w*0.26, cy + h*0.12);
    drawGear(ctx, 0, 0, 22, 8, 6, color); ctx.restore();
    ctx.save(); ctx.translate(cx + w*0.32, cy - h*0.06);
    drawGear(ctx, 0, 0, 12, 6, 5, color + 'aa'); ctx.restore(); ctx.restore();

  } else if (name === '元件') {
    // 电路板 PCB
    ctx.save();
    roundRect(ctx, cx - w*0.38, cy - h*0.35, w*0.76, h*0.7, 8);
    ctx.fillStyle = color + '18'; ctx.fill(); ctx.strokeStyle = color + '66'; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.strokeStyle = color + '77'; ctx.lineWidth = 1.5;
    [[[0.05,0.15],[0.15,0.15],[0.15,0.02],[0.3,0.02]],
     [[-0.1,-0.1],[0,-0.1],[0,0.1],[0.18,0.1]],
     [[-0.28,0.2],[-0.1,0.2],[-0.1,0],[0.05,0]],
     [[0.2,-0.25],[0.2,-0.1],[0.32,-0.1]]
    ].forEach(pts => {
      ctx.beginPath();
      pts.forEach(([px,py],i) => { if (i===0) ctx.moveTo(cx+px*w,cy+py*h); else ctx.lineTo(cx+px*w,cy+py*h); });
      ctx.stroke();
    });
    [[0.05,0.02,0.14,0.1],[-0.12,-0.14,0.22,0.1],[0.2,-0.28,0.1,0.07],[-0.28,0.08,0.12,0.08]].forEach(([ox,oy,cw,ch]) => {
      roundRect(ctx, cx+ox*w, cy+oy*h, cw*w, ch*h, 3);
      ctx.fillStyle = color + '44'; ctx.fill(); ctx.strokeStyle = color; ctx.lineWidth = 1; ctx.stroke();
    });
    [[-0.18,0.16],[0.0,0.24],[0.22,0.12],[0.34,-0.1],[-0.3,-0.08]].forEach(([ox,oy]) => {
      ctx.beginPath(); ctx.arc(cx+ox*w, cy+oy*h, 4, 0, Math.PI*2)
      ctx.fillStyle = color + 'cc'; ctx.fill();
    }); ctx.restore();

  } else {
    // 默认：六边形蜂巢
    ctx.save();
    const hexR = w * 0.12;
    const hexPositions = [[0,0],[-hexR*1.8,-hexR*1.04],[hexR*1.8,-hexR*1.04],[-hexR*1.8,hexR*1.04],[hexR*1.8,hexR*1.04],[0,-hexR*2.08],[0,hexR*2.08]];
    hexPositions.forEach(([hx,hy], i) => {
      ctx.save(); ctx.translate(cx + hx, cy + hy);
      ctx.beginPath();
      for (let s=0; s<6; s++) { const a=(s/6)*Math.PI*2-Math.PI/6,r=hexR*0.85; if(s===0)ctx.moveTo(Math.cos(a)*r,Math.sin(a)*r); else ctx.lineTo(Math.cos(a)*r,Math.sin(a)*r); }
      ctx.closePath();
      ctx.fillStyle = i === 0 ? color + '55' : color + '22'; ctx.fill();
      ctx.strokeStyle = color + '88'; ctx.lineWidth = 1; ctx.stroke(); ctx.restore();
    }); ctx.restore();
  }

  // 右下角行业名称标注
  ctx.save();
  ctx.font = `bold 11px "PingFang SC", "苹方-简", sans-serif`;
  ctx.fillStyle = color + 'aa'; ctx.textAlign = 'right';
  ctx.fillText(name + ' · 产业链', x + w - 8, y + h - 8);
  ctx.textAlign = 'left'; ctx.restore();
}

// 辅助：绘制齿轮
function drawGear(ctx, x, y, outerR, innerR, teeth, color) {
  ctx.beginPath();
  for (let i = 0; i < teeth * 2; i++) {
    const ang = (i / (teeth * 2)) * Math.PI * 2;
    const r = i % 2 === 0 ? outerR : innerR;
    if (i === 0) ctx.moveTo(x + Math.cos(ang)*r, y + Math.sin(ang)*r);
    else ctx.lineTo(x + Math.cos(ang)*r, y + Math.sin(ang)*r);
  }
  ctx.closePath();
  ctx.fillStyle = color + '44'; ctx.fill();
  ctx.strokeStyle = color; ctx.lineWidth = 1.5; ctx.stroke();
  ctx.beginPath(); ctx.arc(x, y, innerR * 0.45, 0, Math.PI*2);
  ctx.fillStyle = color + '88'; ctx.fill();
}

// roundRect / fitOneLineWidth / drawWrappedText 已在 js/utils/canvas.js 中定义

// ===========================
// 下载/复制海报
// ===========================
function triggerPosterDownload(canvas, idx, total) {
  const name = currentIndustry?.name || '产业链';
  const date = new Date().toLocaleDateString('zh-CN');
  const suffix = total > 1 ? `_第${idx + 1}张` : '';
  const filename = `${name}_产业链海报${suffix}_${date}.png`;

  canvas.toBlob((blob) => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.download = filename;
    a.href = url;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      URL.revokeObjectURL(url);
      a.remove();
    }, 200);
  }, 'image/png');
}

function downloadPosterPage(pageIndex) {
  const canvases = document.querySelectorAll('#poster-pages .poster-canvas-item');
  const canvas = canvases[pageIndex];
  if (!canvas) return;
  triggerPosterDownload(canvas, pageIndex, canvases.length);
}

function downloadPoster() {
  const canvases = [...document.querySelectorAll('#poster-pages .poster-canvas-item')];
  if (!canvases.length) return;
  if (canvases.length === 1) {
    triggerPosterDownload(canvases[0], 0, 1);
    return;
  }

  // 多图：同一次点击内同步触发（避免仅下到最后一张）
  const name = currentIndustry?.name || '产业链';
  const date = new Date().toLocaleDateString('zh-CN');
  const links = [];
  canvases.forEach((canvas, idx) => {
    const suffix = `_第${idx + 1}张`;
    const a = document.createElement('a');
    a.style.display = 'none';
    a.download = `${name}_产业链海报${suffix}_${date}.png`;
    a.href = canvas.toDataURL('image/png');
    document.body.appendChild(a);
    links.push(a);
  });
  links.forEach((a) => a.click());
  setTimeout(() => links.forEach((a) => a.remove()), 500);
}

async function copyPoster() {
  const canvases = document.querySelectorAll('#poster-pages .poster-canvas-item');
  if (!canvases.length) return;
  const canvas = canvases[0];
  try {
    canvas.toBlob(async (blob) => {
      const item = new ClipboardItem({ 'image/png': blob });
      await navigator.clipboard.write([item]);
      const tip = canvases.length > 1 ? '（已复制第 1 张，共 ' + canvases.length + ' 张）' : '';
      alert('✅ 已复制海报到剪贴板！' + tip);
    });
  } catch (e) {
    alert('❌ 复制失败，请使用下载功能');
  }
}
