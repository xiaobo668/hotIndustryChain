/**
 * 半导体12大稀缺材料 · 上/中/下游分页海报
 * 12类材料 × 5家公司，拆为3张可独立下载
 */
const SCARCE_POSTER_W = 430;

const SCARCE_COLLECTION_DISCLAIMER =
  '本合集按12类半导体关键材料整理公开产业信息与企业年报口径，属于产业链产业资料工具书，无证券投资分析、无个股价值研判，不构成任何股票买卖操作建议。本人无证券投资咨询执业资质，不提供任何行情、选股相关指导。';

const SCARCE_POSTER_FOOTER_LINES = [
  '数据口径来自企业年报、行业公开产业调研报道，',
  '仅用于行业产业学习参考，请勿仅凭本数据开展证券投资；股市存在高风险，自主投资请独立审慎判断。',
];

const SCARCE_NEUTRALIZE_RULES = [
  [/全球PCB龙头/g, '全球PCB规模靠前厂商'],
  [/国内MLCC出货龙头/g, '国内MLCC出货规模居前'],
  [/高纯溅射靶材龙头/g, '高纯溅射靶材主要厂商'],
  [/宇航级瓷介电容龙头/g, '宇航级瓷介电容主要厂商'],
  [/MLCC介质陶瓷粉龙头/g, 'MLCC介质陶瓷粉主要厂商'],
  [/电子纱\/电子布龙头/g, '电子纱/电子布主要厂商'],
  [/空分与特种气体龙头/g, '空分与特种气体主要厂商'],
  [/SiC功率模块龙头/g, 'SiC功率模块主要厂商'],
  [/ABF载板国内龙头/g, 'ABF载板国内主要厂商'],
  [/覆铜板\/CCL龙头/g, '覆铜板/CCL主要厂商'],
  [/钽电容军工\+民用龙头/g, '钽电容军工+民用主要厂商'],
  [/高端PCB\+IC载板双龙头/g, '高端PCB+IC载板双主线主要厂商'],
  [/AI服务器\/交换机高端PCB龙头/g, 'AI服务器/交换机高端PCB主要厂商'],
  [/全球龙头/g, '全球规模靠前厂商'],
  [/国内龙头/g, '国内主要厂商'],
  [/双龙头/g, '双主线主要厂商'],
  [/龙头/g, '主要厂商'],
  [/核心供应商/g, '主要供货企业'],
  [/核心央企平台/g, '央企产业平台'],
  [/国产主力/g, '国产主要参与者'],
  [/弹性标的但量产兑现需跟踪/g, '产线建设中，量产进度以公告为准'],
  [/弹性标的/g, '产业配套环节'],
  [/铜箔新贵/g, '铜箔后起厂商'],
  [/直接受益/g, '扩产配套环节'],
  [/紧缺受益/g, '供需偏紧环节'],
  [/供给紧张/g, '供给偏紧'],
  [/衬底紧缺下/g, '衬底供应偏紧下'],
  [/高景气/g, '产能利用率较高'],
  [/涨价周期核心受益/g, '粉体供应环节'],
  [/核心受益/g, '配套环节'],
];

function neutralizeScarceText(text) {
  if (!text) return text;
  let s = text;
  SCARCE_NEUTRALIZE_RULES.forEach(([re, rep]) => {
    s = s.replace(re, rep);
  });
  return s;
}

function applyScarceCompliance(data) {
  if (!data) return data;
  return {
    ...data,
    title: neutralizeScarceText(data.title),
    subtitle: neutralizeScarceText(data.subtitle),
    themeGroups: (data.themeGroups || []).map((theme) => ({
      ...theme,
      title: neutralizeScarceText(theme.title),
      segments: (theme.segments || []).map((seg) => ({
        ...seg,
        name: neutralizeScarceText(seg.name),
        companies: (seg.companies || []).map((co) => ({
          ...co,
          name: co.name,
          highlight: neutralizeScarceText(co.highlight),
        })),
      })),
    })),
  };
}

function getScarceComplianceHtml() {
  return '<strong>付费合集合规提示（必读）</strong><br/>' + SCARCE_COLLECTION_DISCLAIMER;
}

const SCARCE_POSTER_LAYOUT = {
  PAD: 10,
  TOP: 10,
  TITLE_H: 48,
  TITLE_FONT: 16,
  SUB_FONT: 10,
  THEME_BAR_H: 24,
  THEME_GAP: 8,
  SEG_BAR_H: 20,
  ROW_H: 17,
  CARD_PAD: 3,
  CARD_GAP: 3,
  FOOTER_LINES: 2,
  FOOTER_LINE_H: 11,
  FOOTER_H: 30,
  FOOTER_FONT: 8,
  NAME_FONT: 11,
  HL_FONT: 9,
  INNER_X: 8,
  CARD_RADIUS: 8,
};

function estimateScarceMaterialsPosterHeight(data) {
  const L = SCARCE_POSTER_LAYOUT;
  let h = L.TOP + L.TITLE_H + L.THEME_GAP;
  (data.themeGroups || []).forEach((theme, ti) => {
    h += L.THEME_BAR_H + L.THEME_GAP;
    (theme.segments || []).forEach((seg) => {
      const n = (seg.companies || []).length;
      h += L.SEG_BAR_H + L.CARD_PAD + n * L.ROW_H + L.CARD_PAD + L.CARD_GAP;
    });
    if (ti < data.themeGroups.length - 1) h += L.THEME_GAP;
  });
  return h + L.FOOTER_H + 6;
}

function drawScarceMaterialsPoster(ctx, data, W, H) {
  const L = SCARCE_POSTER_LAYOUT;
  const borderBlue = '#6366f1';
  const cardW = W - L.PAD * 2;
  const cardX = L.PAD;

  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, '#eef2ff');
  bg.addColorStop(0.45, '#f5f3ff');
  bg.addColorStop(1, '#faf5ff');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  let y = L.TOP;

  const titleGrad = ctx.createLinearGradient(cardX, y, cardX + cardW, y);
  titleGrad.addColorStop(0, '#4338ca');
  titleGrad.addColorStop(0.5, '#6366f1');
  titleGrad.addColorStop(1, '#7c3aed');
  roundRect(ctx, cardX, y, cardW, L.TITLE_H, L.CARD_RADIUS);
  ctx.fillStyle = titleGrad;
  ctx.fill();
  ctx.fillStyle = '#fff';
  ctx.font = `bold ${L.TITLE_FONT}px "PingFang SC", sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(data.title, W / 2, y + L.TITLE_H * 0.38);
  ctx.font = `${L.SUB_FONT}px "PingFang SC", sans-serif`;
  ctx.fillStyle = 'rgba(255,255,255,0.92)';
  ctx.fillText(data.subtitle || '', W / 2, y + L.TITLE_H * 0.72);
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
  y += L.TITLE_H + L.THEME_GAP;

  (data.themeGroups || []).forEach((theme, ti) => {
    roundRect(ctx, cardX, y, cardW, L.THEME_BAR_H, 6);
    const tg = ctx.createLinearGradient(cardX, y, cardX + cardW, y);
    tg.addColorStop(0, theme.color || '#4338ca');
    tg.addColorStop(1, '#1e3a8a');
    ctx.fillStyle = tg;
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px "PingFang SC", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(theme.title, W / 2, y + L.THEME_BAR_H / 2);
    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';
    y += L.THEME_BAR_H + L.THEME_GAP;

    (theme.segments || []).forEach((seg) => {
      const companies = seg.companies || [];
      const innerW = cardW - L.INNER_X * 2;
      const bodyH = L.CARD_PAD + companies.length * L.ROW_H + L.CARD_PAD;
      const segH = L.SEG_BAR_H + bodyH;

      ctx.save();
      ctx.shadowColor = 'rgba(15,23,42,0.05)';
      ctx.shadowBlur = 4;
      ctx.shadowOffsetY = 1;
      roundRect(ctx, cardX, y, cardW, segH, L.CARD_RADIUS);
      ctx.fillStyle = '#fff';
      ctx.fill();
      ctx.restore();
      roundRect(ctx, cardX, y, cardW, segH, L.CARD_RADIUS);
      ctx.strokeStyle = borderBlue;
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.save();
      roundRect(ctx, cardX, y, cardW, segH, L.CARD_RADIUS);
      ctx.clip();
      const barGrad = ctx.createLinearGradient(cardX, y, cardX, y + L.SEG_BAR_H);
      barGrad.addColorStop(0, theme.color || '#4338ca');
      barGrad.addColorStop(1, '#312e81');
      ctx.fillStyle = barGrad;
      ctx.fillRect(cardX, y, cardW, L.SEG_BAR_H);
      ctx.restore();

      ctx.fillStyle = '#fff';
      ctx.font = 'bold 10px "PingFang SC", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(seg.name, W / 2, y + L.SEG_BAR_H / 2);
      ctx.textAlign = 'left';
      ctx.textBaseline = 'alphabetic';

      let cy = y + L.SEG_BAR_H + L.CARD_PAD;
      const baseX = cardX + L.INNER_X;
      const rightX = cardX + cardW - L.INNER_X;

      companies.forEach((company, ci) => {
        if (ci > 0) {
          ctx.strokeStyle = '#eef2f7';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(baseX, cy + ci * L.ROW_H);
          ctx.lineTo(rightX, cy + ci * L.ROW_H);
          ctx.stroke();
        }
        const midY = cy + ci * L.ROW_H + L.ROW_H / 2;
        let nameStr = company.name;
        ctx.font = `bold ${L.NAME_FONT}px "PingFang SC", sans-serif`;
        ctx.fillStyle = '#0f172a';
        ctx.textBaseline = 'middle';
        const maxName = innerW * 0.28;
        if (ctx.measureText(nameStr).width > maxName) {
          nameStr = fitOneLineWidth(ctx, nameStr, maxName);
        }
        ctx.fillText(nameStr, baseX, midY);
        const nameW = ctx.measureText(nameStr).width;

        const hl = (company.highlight || '').trim();
        if (hl) {
          ctx.font = `${L.HL_FONT}px "PingFang SC", sans-serif`;
          ctx.fillStyle = '#64748b';
          const descX = baseX + nameW + 4;
          const maxDescW = Math.max(16, rightX - descX);
          ctx.fillText(fitOneLineWidth(ctx, hl, maxDescW), descX, midY);
        }
        ctx.textBaseline = 'alphabetic';
      });

      y += segH + L.CARD_GAP;
    });

    if (ti < data.themeGroups.length - 1) y += L.THEME_GAP;
  });

  ctx.fillStyle = '#64748b';
  ctx.font = `bold ${L.FOOTER_FONT}px "PingFang SC", sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const footerY = H - L.FOOTER_H + L.FOOTER_LINE_H / 2;
  SCARCE_POSTER_FOOTER_LINES.forEach((line, i) => {
    ctx.fillText(line, W / 2, footerY + i * L.FOOTER_LINE_H);
  });
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
}

const SCARCE_POSTER_PAGE_META = [
  { slug: '上游', filename: '半导体稀缺材料-上游.png' },
  { slug: '中游', filename: '半导体稀缺材料-中游.png' },
  { slug: '下游', filename: '半导体稀缺材料-下游.png' },
];

function buildScarcePosterPages(data) {
  const safe = applyScarceCompliance(data);
  return (safe.themeGroups || []).map((theme, i) => {
    const meta = SCARCE_POSTER_PAGE_META[i] || { slug: `第${i + 1}部分`, filename: `半导体稀缺材料-${i + 1}.png` };
    const segCount = (theme.segments || []).length;
    return {
      ...safe,
      title: `${safe.title} · ${meta.slug}`,
      subtitle: `${theme.title} · ${segCount}类材料（学习参考）`,
      themeGroups: [theme],
      pageIndex: i + 1,
      pageSlug: meta.slug,
      filename: meta.filename,
      canvasId: `scarce-poster-canvas-${i + 1}`,
    };
  });
}

function renderScarcePosterBlock(pageData, container) {
  const dpr = window.devicePixelRatio || 1;
  const W = SCARCE_POSTER_W;
  const H = estimateScarceMaterialsPosterHeight(pageData);

  const block = document.createElement('div');
  block.className = 'poster-page-block scarce-poster-block';

  const label = document.createElement('div');
  label.className = 'poster-page-label';
  label.textContent = `第 ${pageData.pageIndex}/3 张 · ${pageData.pageSlug}（${(pageData.themeGroups[0].segments || []).length} 类材料）`;
  block.appendChild(label);

  const canvas = document.createElement('canvas');
  canvas.className = 'poster-canvas-item';
  canvas.id = pageData.canvasId;
  canvas.width = W * dpr;
  canvas.height = H * dpr;
  canvas.style.width = W + 'px';
  canvas.style.height = H + 'px';
  block.appendChild(canvas);

  const actions = document.createElement('div');
  actions.className = 'poster-page-actions scarce-poster-actions';
  actions.innerHTML =
    `<button class="btn btn-primary" type="button">⬇️ 下载${pageData.pageSlug}海报</button>`
    + `<button class="btn btn-secondary" type="button">📋 复制</button>`;
  actions.querySelector('.btn-primary').addEventListener('click', () => {
    downloadScarceMaterialsPoster(pageData.canvasId, pageData.filename);
  });
  actions.querySelector('.btn-secondary').addEventListener('click', () => {
    copyScarceMaterialsPoster(pageData.canvasId);
  });
  block.appendChild(actions);
  container.appendChild(block);

  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  drawScarceMaterialsPoster(ctx, pageData, W, H);
  return canvas;
}

function renderScarceMaterialsPosterPages(data, containerId) {
  const container = document.getElementById(containerId || 'scarce-materials-poster-pages');
  if (!container || !data) return [];
  container.innerHTML = '';
  return buildScarcePosterPages(data).map((page) => renderScarcePosterBlock(page, container));
}

function renderScarceMaterialsPoster(data, containerId, canvasId) {
  const pages = buildScarcePosterPages(data);
  if (canvasId && pages.length === 1) {
    const container = document.getElementById(containerId || 'scarce-materials-poster-pages');
    if (!container) return null;
    container.innerHTML = '';
    return renderScarcePosterBlock({ ...pages[0], canvasId }, container);
  }
  return renderScarceMaterialsPosterPages(data, containerId);
}

function downloadScarceMaterialsPoster(canvasId, filename) {
  const canvas = document.getElementById(canvasId || 'scarce-materials-poster-canvas');
  if (!canvas) return;
  const link = document.createElement('a');
  link.download = filename || '半导体12大稀缺材料.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
}

async function copyScarceMaterialsPoster(canvasId) {
  const canvas = document.getElementById(canvasId || 'scarce-materials-poster-canvas');
  if (!canvas) return;
  try {
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
    await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
    alert('✅ 海报已复制到剪贴板');
  } catch (e) {
    alert('复制失败，请使用下载按钮');
  }
}

function initScarceMaterialsPosterPage() {
  if (typeof SCARCE_MATERIALS_POSTER2026 === 'undefined') return;
  const box = document.getElementById('scarce-compliance-box');
  if (box && typeof getScarceComplianceHtml === 'function') {
    box.innerHTML = getScarceComplianceHtml();
  }
  renderScarceMaterialsPosterPages(
    SCARCE_MATERIALS_POSTER2026,
    'scarce-materials-poster-pages'
  );
}

function industryToScarcePosterData(data) {
  if (!data) return null;
  if (data.themeGroups && data.themeGroups.length && data.themeGroups[0].segments) {
    return {
      title: data.posterTitle || data.name,
      subtitle: '12类关键材料 · 产业链代表企业产业图谱（学习参考）',
      themeGroups: data.themeGroups,
    };
  }
  return {
    title: data.posterTitle || data.name,
    subtitle: '12类关键材料 · 产业链代表企业产业图谱（学习参考）',
    themeGroups: [
      { title: '一、上游关键材料', color: '#4338ca', segments: data.upstream || [] },
      { title: '二、中游关键材料', color: '#2563eb', segments: data.midstream || [] },
      { title: '三、下游关键材料', color: '#0369a1', segments: data.downstream || [] },
    ],
  };
}

function renderScarceMaterialsPosterForIndustry(data) {
  const posterData = industryToScarcePosterData(data);
  if (!posterData) return null;
  return renderScarceMaterialsPosterPages(posterData, 'poster-pages');
}

function maybeRenderScarceMaterialsPoster(data) {
  if (!data || data.name !== '半导体稀缺材料') return false;
  if (typeof renderScarceMaterialsPosterForIndustry !== 'function') return false;
  renderScarceMaterialsPosterForIndustry(data);

  const dlBtn = document.getElementById('poster-download-btn');
  if (dlBtn) dlBtn.style.display = 'none';

  let hint = document.getElementById('poster-multi-dl-hint');
  if (!hint) {
    hint = document.createElement('p');
    hint.id = 'poster-multi-dl-hint';
    hint.className = 'poster-multi-dl-hint';
    const actions = document.querySelector('#view-poster .poster-actions');
    if (actions) actions.insertBefore(hint, actions.firstChild);
  }
  if (hint) {
    hint.style.display = 'block';
    hint.textContent = '稀缺材料海报已拆为上游/中游/下游 3 张，请使用每张图下方的按钮分别下载。';
  }
  return true;
}
