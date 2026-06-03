/**
 * 产业链渲染模块 (industry/render.js)
 * - renderResult(data, source): 结果总入口（仅渲染产业链部分）
 * - renderHeader(data, source): 头部信息+统计+AI模型来源
 * - renderTable(data): 表格渲染
 * - switchTab(tab, btn): 统一 5-Tab 切换（表格/思维导图/产业链海报/龙头一览/龙头海报）
 * - renderMindMap(data): ECharts思维导图完整实现
 * - downloadMindMapImage(): 下载思维导图
 * - findCompany(data, name): 查找企业
 *
 * 依赖（已在其他模块中定义的全局函数/变量）：
 *   stripMindTitleParens, mindRichSafe, wrapMindTrackLabel, lightenColor（utils 模块）
 *   MODEL_LABELS（全局常量）
 *   currentIndustry, currentSector, mindChartInstance（全局变量）
 *   renderPoster（poster 模块）
 *   renderSectorPoster, renderLeaderTable（sector 模块）
 */

// ===========================
// 渲染结果（仅产业链部分）
// ===========================
function renderResult(data, source) {
  document.getElementById('result').classList.add('show');
  renderHeader(data, source);
  renderTable(data);
  if (document.getElementById('view-poster')?.classList.contains('active')) {
    requestAnimationFrame(() => {
      renderPoster(data);
      maybeRenderOrderRankPoster(data);
    });
  }
}

function renderHeader(data, source) {
  const header = document.getElementById('industry-header');
  header.style.setProperty('--ind-gradient', `linear-gradient(135deg, ${data.gradient[0]}, ${data.gradient[1]})`);
  header.style.borderLeft = `4px solid ${data.color}`;

  const displayTitle = data.posterTitle || data.name;
  document.getElementById('industry-title').textContent = data.mindLayout === 'sixMainlines'
    ? `📊 ${displayTitle}`
    : `📊 ${data.name} 产业链全景图`;
  document.getElementById('industry-desc').textContent = data.description;

  // 统计
  const totalCompanies = [
    ...data.upstream.flatMap(s => s.companies),
    ...data.midstream.flatMap(s => s.companies),
    ...data.downstream.flatMap(s => s.companies)
  ].length;

  const totalSegments = data.upstream.length + data.midstream.length + data.downstream.length;
  const isSix = data.mindLayout === 'sixMainlines';
  const tierCount = isSix ? (data.themeGroups ? data.themeGroups.length : 6) : 3;
  const tierLabel = isSix ? '科技主线' : '产业层次';

  // 显示 AI 模型来源
  const sourceLabel = MODEL_LABELS[source] || (source ? source.charAt(0).toUpperCase() + source.slice(1) : 'AI');
  const sourceColor = source === 'local' ? '#10b981' : source === 'kimi' ? '#ef4444' : source === 'deepseek' ? '#6c63ff' : source === 'cache' ? '#f59e0b' : '#94a3b8';

  document.getElementById('industry-stats').innerHTML = `
    <div class="stat-item">
      <div class="stat-num">${totalCompanies}</div>
      <div class="stat-label">龙头企业</div>
    </div>
    <div class="stat-item">
      <div class="stat-num">${totalSegments}</div>
      <div class="stat-label">细分赛道</div>
    </div>
    <div class="stat-item">
      <div class="stat-num">${tierCount}</div>
      <div class="stat-label">${tierLabel}</div>
    </div>
    <div class="stat-item" style="min-width:100px">
      <div class="stat-num" style="font-size:12px;color:${sourceColor}">✦ ${sourceLabel}</div>
      <div class="stat-label" style="font-size:11px">AI 模型</div>
    </div>
  `;
}

// ===========================
// 表格渲染
// ===========================
function renderTable(data) {
  const tbody = document.getElementById('table-body');
  tbody.innerHTML = '';

  const segShortName = (name) => (name.includes('·') ? name.split('·').pop() : name);

  if (data.mindLayout === 'sixMainlines' && data.themeGroups) {
    data.themeGroups.forEach((theme) => {
      theme.segments.forEach((seg) => {
        const names = seg.companies
          .map((c) => stripStockCode(c.name))
          .filter(Boolean);
        if (!names.length) return;
        const tr = document.createElement('tr');

        const tierCell = document.createElement('td');
        tierCell.innerHTML = `<span class="tier-badge" style="background:${theme.color}22;color:${theme.color}">${theme.title}</span>`;
        tr.appendChild(tierCell);

        const segCell = document.createElement('td');
        segCell.textContent = segShortName(seg.name);
        segCell.style.fontWeight = '600';
        segCell.style.color = '#c4c4e0';
        tr.appendChild(segCell);

        const compCell = document.createElement('td');
        compCell.innerHTML = names
          .map((n) => `<span class="company-pill"><span class="company-name">${n}</span></span>`)
          .join(' ');
        tr.appendChild(compCell);

        const hlCell = document.createElement('td');
        hlCell.innerHTML = '<span class="highlight-text" style="color:#64748b">—</span>';
        tr.appendChild(hlCell);

        tbody.appendChild(tr);
      });
    });
    return;
  }

  const tiers = [
    { key: 'upstream', label: '上游', badgeClass: 'tier-up', segments: data.upstream },
    { key: 'midstream', label: '中游', badgeClass: 'tier-mid', segments: data.midstream },
    { key: 'downstream', label: '下游', badgeClass: 'tier-down', segments: data.downstream },
  ];

  tiers.forEach(tier => {
    tier.segments.forEach((seg, i) => {
      seg.companies.forEach((company, j) => {
        const cleanName = stripStockCode(company.name);
        if (!cleanName) return; // 过滤 ST / 退市公司
        const tr = document.createElement('tr');

        // 环节列（只在首个赛道首行显示，合并行）
        const tierCell = document.createElement('td');
        if (i === 0 && j === 0) {
          tierCell.rowSpan = tier.segments.reduce((a, s) => a + s.companies.length, 0);
          tierCell.innerHTML = `<span class="tier-badge ${tier.badgeClass}">${tier.label}</span>`;
          tr.appendChild(tierCell);
        }

        // 细分赛道列（只在首行显示）
        const segCell = document.createElement('td');
        if (j === 0) {
          segCell.rowSpan = seg.companies.length;
          segCell.textContent = seg.name;
          segCell.style.fontWeight = '600';
          segCell.style.color = '#c4c4e0';
          tr.appendChild(segCell);
        }

        // 企业列
        const compCell = document.createElement('td');
        compCell.innerHTML = `
          <span class="company-pill">
            <span class="company-name">${cleanName}</span>
          </span>
        `;
        tr.appendChild(compCell);

        // 亮点列
        const hlCell = document.createElement('td');
        const hl = (company.highlight || '').trim();
        hlCell.innerHTML = hl
          ? `<div class="highlight-row"><span class="highlight-dot"></span><span class="highlight-text">${hl}</span></div>`
          : '<span class="highlight-text" style="color:#64748b">—</span>';
        tr.appendChild(hlCell);

        tbody.appendChild(tr);
      });
    });
  });
}

// ===========================
// 产业链模块 TAB 切换（仅处理产业链相关视图）
// ===========================
function switchTab(tab, btn) {
  // 更新按钮状态
  document.querySelectorAll('#main-tabs .tab-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  // 切换视图面板
  document.querySelectorAll('#result .view-panel').forEach(p => p.classList.remove('active'));
  const viewEl = document.getElementById(`view-${tab}`);
  if (viewEl) viewEl.classList.add('active');

  // 根据视图类型触发对应渲染
  switch (tab) {
    case 'mindmap':
      if (currentIndustry) {
        requestAnimationFrame(() => renderMindMap(currentIndustry));
      }
      break;
    case 'poster':
      if (currentIndustry) {
        requestAnimationFrame(() => {
          renderPoster(currentIndustry);
          maybeRenderOrderRankPoster(currentIndustry);
        });
      }
      break;
    case 'leader':
      if (currentSector) {
        document.getElementById('sector-header').style.display = '';
        renderLeaderTable(currentSector);
      }
      break;
    case 'sector-poster':
      if (currentSector) {
        document.getElementById('sector-header').style.display = '';
        requestAnimationFrame(() => renderSectorPoster(currentSector));
      }
      break;
    case 'table':
      // 默认显示产业链头部，隐藏板块头部
      document.getElementById('sector-header').style.display = 'none';
      break;
    case 'article':
      // 点击公众号 Tab 时触发文章生成（如果尚未生成）
      console.log('[switchTab article] articleGenerating=', articleGenerating, 'currentSearchQuery=', currentSearchQuery);
      if (!articleGenerating && currentSearchQuery) {
        const hasArticle = document.getElementById('article-content')?.innerHTML?.trim().length > 0;
        console.log('[switchTab article] hasArticle=', hasArticle);
        if (!hasArticle) {
          triggerArticleGeneration(currentSearchQuery);
        }
      }
      break;
  }
}

// ===========================
// 思维导图（ECharts Tree）
// ===========================
// 注：stripMindTitleParens / mindRichSafe / wrapMindTrackLabel 已在 js/utils/text.js 中定义

function renderMindMap(data) {
  const dom = document.getElementById('mind-chart');
  if (!mindChartInstance) {
    mindChartInstance = echarts.init(dom, null, { renderer: 'canvas' });
  } else {
    mindChartInstance.clear();
  }

  const companyLabelRich = {
    name: {
      color: '#14100a',
      fontSize: 12,
      fontWeight: 'bold',
      lineHeight: 18,
      textBorderColor: '#c9a227',
      textBorderWidth: 0.85,
    },
  };

  const trackLabelRich = {
    track: {
      color: '#141414',
      fontWeight: 'bold',
      fontSize: 12,
      lineHeight: 15,
    },
  };

  const buildChildren = (segments, tierColor) => segments.map(seg => {
    const rawName = seg.name.includes('·') ? seg.name.split('·').pop() : seg.name;
    const segTitle = stripMindTitleParens(rawName);
    return {
      name: segTitle,
      itemStyle: { color: tierColor, opacity: 0.8 },
      label: {
        formatter: `{track|${mindRichSafe(wrapMindTrackLabel(segTitle))}}`,
        rich: trackLabelRich,
      },
      children: seg.companies.map(c => ({
        name: c.name,
        value: c.name,
        label: {
          formatter: `{name|${mindRichSafe(stripMindTitleParens(c.name))}}`,
          rich: companyLabelRich,
        },
        itemStyle: { color: lightenColor(tierColor, 40) }
      }))
    };
  });

  const buildThemeBranch = (theme) => ({
    name: theme.title,
    itemStyle: { color: theme.color },
    label: { color: '#141414', fontWeight: 'bold', fontSize: 13 },
    children: buildChildren(theme.segments, theme.color),
  });

  let treeData;
  if (data.mindLayout === 'sixMainlines' && data.themeGroups && data.themeGroups.length) {
    treeData = {
      name: data.posterTitle || '2026年值得关注的六大主线',
      itemStyle: { color: data.color },
      label: { fontSize: 15, fontWeight: 'bold', color: '#141414' },
      children: data.themeGroups.map(buildThemeBranch),
    };
  } else {
    const colors = {
      root: data.color,
      upstream: '#10b981',
      midstream: '#6c63ff',
      downstream: '#ef4444',
    };
    treeData = {
      name: stripMindTitleParens(data.name) + '\n产业链',
      itemStyle: { color: colors.root },
      label: { fontSize: 16, fontWeight: 'bold', color: '#141414' },
      children: [
        {
          name: '⬆ 上游',
          itemStyle: { color: colors.upstream },
          label: { color: '#141414', fontWeight: 'bold', fontSize: 14 },
          children: buildChildren(data.upstream, colors.upstream)
        },
        {
          name: '⬛ 中游',
          itemStyle: { color: colors.midstream },
          label: { color: '#141414', fontWeight: 'bold', fontSize: 14 },
          children: buildChildren(data.midstream, colors.midstream)
        },
        {
          name: '⬇ 下游',
          itemStyle: { color: colors.downstream },
          label: { color: '#141414', fontWeight: 'bold', fontSize: 14 },
          children: buildChildren(data.downstream, colors.downstream)
        }
      ]
    };
  }

  const option = {
    backgroundColor: {
      type: 'linear',
      x: 0, y: 0, x2: 0, y2: 1,
      colorStops: [
        { offset: 0, color: '#f0f9ff' },
        { offset: 0.5, color: '#e8f4fc' },
        { offset: 1, color: '#e0f2fe' },
      ],
    },
    tooltip: {
      trigger: 'item',
      formatter: (p) => {
        const d = p.data;
        const company = findCompany(currentIndustry, d.name);
        if (company) {
          const cleanName = stripStockCode(stripMindTitleParens(company.name));
          if (!cleanName) return '';
          const hl = (company.highlight || '').trim();
          return hl
            ? `<b style="color:#1a1510">${cleanName}</b><br/><span style="color:#475569;font-size:12px">${hl}</span>`
            : `<b style="color:#1a1510">${cleanName}</b>`;
        }
        return typeof d.name === 'string' ? d.name.split('\n').map(stripMindTitleParens).join('\n') : d.name;
      }
    },
    series: [{
      type: 'tree',
      data: [treeData],
      top: '3%', left: '8%', bottom: '3%', right: '20%',
      symbolSize: 10,
      orient: 'LR',
      expandAndCollapse: true,
      initialTreeDepth: data.mindLayout === 'sixMainlines' ? 2 : 3,
      label: {
        position: 'right',
        verticalAlign: 'middle',
        align: 'left',
        fontSize: 12,
        color: '#141414',
      },
      leaves: {
        label: {
          position: 'right',
          verticalAlign: 'middle',
          align: 'left',
        }
      },
      lineStyle: { color: 'rgba(59, 130, 246, 0.22)', width: 1.5, curveness: 0.5 },
      emphasis: {
        focus: 'descendant'
      },
      animationDuration: 550,
      animationDurationUpdate: 750
    }]
  };

  mindChartInstance.setOption(option);
  window.addEventListener('resize', () => mindChartInstance && mindChartInstance.resize());
}

function downloadMindMapImage() {
  if (!currentIndustry) {
    alert('请先完成行业分析');
    return;
  }
  if (!mindChartInstance) {
    alert('请切换到「思维导图」标签并稍等加载完成后再下载');
    return;
  }
  try {
    const url = mindChartInstance.getDataURL({
      type: 'png',
      pixelRatio: 2,
      backgroundColor: '#e8f4fc',
    });
    const a = document.createElement('a');
    a.download = `${currentIndustry.name}_思维导图_${new Date().toLocaleDateString('zh-CN')}.png`;
    a.href = url;
    a.click();
  } catch (e) {
    alert('导出失败，请重试');
  }
}

// lightenColor 已在 js/utils/color.js 中定义

function findCompany(data, name) {
  const all = [
    ...data.upstream.flatMap(s => s.companies),
    ...data.midstream.flatMap(s => s.companies),
    ...data.downstream.flatMap(s => s.companies)
  ];
  return all.find(c => c.name === name);
}
