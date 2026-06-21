/**
 * 健康饮食 UI — 四模式切换、Tab 与欢迎页
 */
window._shiliaoMode = window._shiliaoMode || 'ingredient';
window._shiliaoContentType = 'ingredient';

const SHILIAO_MODES = ['ingredient', 'disease', 'organ', 'summary', 'list'];

function getShiliaoModeList(mode) {
  if (mode === 'list') return getShiliaoListTopics();
  if (mode === 'disease') return getShiliaoDiseaseList();
  if (mode === 'organ') return getShiliaoOrganList();
  if (mode === 'summary') return getShiliaoSummaryList();
  return getShiliaoList();
}

function renderShiliaoEmptyHint(mode) {
  const labels = {
    ingredient: '食材百科',
    disease: '场景饮食',
    organ: '营养侧重',
    summary: '饮食汇总',
    list: '榜单模版',
  };
  return `
    <div style="grid-column:1/-1;text-align:center;padding:48px 20px;color:var(--text-muted)">
      <div style="font-size:48px;margin-bottom:16px">🥗</div>
      <div style="font-size:16px;font-weight:600;color:var(--text);margin-bottom:8px">${labels[mode] || '健康饮食'}暂无内容</div>
      <div style="font-size:14px;line-height:1.7">内容已清空，待录入新数据</div>
    </div>`;
}

function initShiliaoUI() {
  renderShiliaoWelcomeCards();
  updateShiliaoModeUI();
}

function switchShiliaoMode(mode) {
  window._shiliaoMode = SHILIAO_MODES.includes(mode) ? mode : 'ingredient';
  updateShiliaoModeUI();
  renderShiliaoWelcomeCards();
  const input = document.getElementById('shiliao-search-input');
  if (input) input.value = '';
  const listPanel = document.getElementById('shiliao-list-panel');
  if (mode !== 'list') {
    if (listPanel) listPanel.style.display = 'none';
    return;
  }
  if (window._shiliaoListTopicId) {
    if (listPanel) listPanel.style.display = 'block';
    updateShiliaoListThemeUI();
    renderShiliaoListPosterPreview();
    return;
  }
  const topics = getShiliaoListTopics();
  if (topics.length) openShiliaoListTopic(topics[0].id);
}

function updateShiliaoModeUI() {
  const mode = window._shiliaoMode;
  document.querySelectorAll('.shiliao-mode-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.mode === mode);
  });

  const logoText = document.querySelector('#header-shiliao .logo-text');
  const logoSub = document.querySelector('#header-shiliao .logo-sub');
  const input = document.getElementById('shiliao-search-input');
  const hotkeys = document.getElementById('shiliao-hotkeys');
  const welcomeTitle = document.querySelector('#welcome-shiliao h2');
  const welcomeDesc = document.querySelector('#welcome-shiliao > p');
  const count = getShiliaoModeList(mode).length;
  const searchWrap = document.querySelector('#header-shiliao .search-wrap');

  if (mode === 'list') {
    if (logoText) logoText.textContent = '健康饮食 · 榜单海报';
    if (logoSub) logoSub.textContent = 'Healthy Eating List Poster';
    if (input) input.placeholder = '选择下方主题生成榜单海报';
    if (welcomeTitle) welcomeTitle.textContent = `榜单模版 · ${count} 个主题`;
    if (welcomeDesc) {
      welcomeDesc.innerHTML =
        '选择主题与配色，一键生成竖版<strong>食物榜单</strong>海报<br/>' +
        '<span style="color:#65a30d;font-size:13px">笔记白 · 清新绿 · 薄荷紫 · 温柔粉 · 暖杏色 · 下载 / 复制</span>';
    }
    if (searchWrap) searchWrap.style.display = 'none';
  } else if (mode === 'disease') {
    if (logoText) logoText.textContent = '场景饮食 · 日常查食谱';
    if (logoSub) logoSub.textContent = 'Scene-Based Healthy Eating';
    if (input) input.placeholder = count ? '搜索饮食场景…' : '暂无场景饮食数据';
    if (welcomeTitle) welcomeTitle.textContent = `场景饮食${count ? ` · ${count} 个` : ''}`;
    if (welcomeDesc) {
      welcomeDesc.innerHTML = count
        ? '按<strong>日常场景</strong>查找推荐食材与<strong>健康菜品</strong>'
        : '当前暂无场景饮食内容<br/><span style="color:#65a30d;font-size:13px">待录入后可搜索、生成海报与口播</span>';
    }
  } else if (mode === 'summary') {
    if (logoText) logoText.textContent = '饮食汇总 · 清单';
    if (logoSub) logoSub.textContent = 'Healthy Eating Lists';
    if (input) input.placeholder = count ? '搜索汇总主题…' : '暂无饮食汇总数据';
    if (welcomeTitle) welcomeTitle.textContent = `饮食汇总${count ? ` · ${count} 项` : ''}`;
    if (welcomeDesc) {
      welcomeDesc.innerHTML = count
        ? '汇总主题清单，附典籍出处与口播'
        : '当前暂无饮食汇总内容<br/><span style="color:#65a30d;font-size:13px">待录入后可搜索、生成海报与口播</span>';
    }
  } else if (mode === 'organ') {
    if (logoText) logoText.textContent = '营养侧重 · 分区推荐';
    if (logoSub) logoSub.textContent = 'Nutrition Focus';
    if (input) input.placeholder = count ? '搜索营养分区…' : '暂无营养侧重数据';
    if (welcomeTitle) welcomeTitle.textContent = `营养侧重${count ? ` · ${count} 个` : ''}`;
    if (welcomeDesc) {
      welcomeDesc.innerHTML = count
        ? '查看各分区推荐食材与菜品'
        : '当前暂无营养侧重内容<br/><span style="color:#65a30d;font-size:13px">待录入后可搜索、生成海报与口播</span>';
    }
  } else {
    if (logoText) logoText.textContent = '健康饮食 · 食材百科';
    if (logoSub) logoSub.textContent = 'Healthy Eating & Nutrition';
    if (input) input.placeholder = count ? '搜索食材…' : '暂无食材数据';
    if (welcomeTitle) welcomeTitle.textContent = `健康饮食 · 食材百科${count ? `（${count}种）` : ''}`;
    if (welcomeDesc) {
      welcomeDesc.innerHTML = count
        ? '搜索食材，查看<strong>营养特点</strong>、<strong>推荐菜品</strong>与口播'
        : '当前暂无食材内容<br/><span style="color:#65a30d;font-size:13px">待录入后可搜索、生成海报与口播</span>';
    }
  }

  if (mode !== 'list' && searchWrap) searchWrap.style.display = '';

  if (hotkeys) hotkeys.innerHTML = '';
}

function renderShiliaoWelcomeCards() {
  const grid = document.getElementById('shiliao-welcome-grid');
  if (!grid) return;

  const mode = window._shiliaoMode;
  const list = getShiliaoModeList(mode);
  if (!list.length) {
    grid.innerHTML = renderShiliaoEmptyHint(mode);
    return;
  }

  if (mode === 'list') {
    grid.innerHTML = list
      .map(
        (item) => `
    <div class="welcome-card shiliao-welcome-card${window._shiliaoListTopicId === item.id ? ' shiliao-list-card--active' : ''}"
      onclick="openShiliaoListTopic('${item.id}')">
      <div class="welcome-card-icon">${item.icon}</div>
      <div class="welcome-card-name">${item.title}</div>
      <div class="shiliao-card-sub">${item.category || ''} · ${(item.items || []).length}项 · ${getShiliaoListTheme(item.defaultTheme).name}</div>
    </div>`
      )
      .join('');
    return;
  }

  if (mode === 'disease') {
    grid.innerHTML = list
      .map(
        (item) => `
    <div class="welcome-card shiliao-welcome-card" onclick="quickShiliaoDiseaseSearch('${item.name}')">
      <div class="welcome-card-icon">${item.icon}</div>
      <div class="welcome-card-name">${item.name}</div>
      <div class="shiliao-card-sub">${item.category || ''}</div>
    </div>`
      )
      .join('');
  } else if (mode === 'summary') {
    grid.innerHTML = list
      .map(
        (item) => `
    <div class="welcome-card shiliao-welcome-card" onclick="quickShiliaoSummarySearch('${item.name}')">
      <div class="welcome-card-icon">${item.icon}</div>
      <div class="welcome-card-name">${item.name}</div>
      <div class="shiliao-card-sub">${item.listTitle || ''}</div>
    </div>`
      )
      .join('');
  } else if (mode === 'organ') {
    grid.innerHTML = list
      .map(
        (item) => `
    <div class="welcome-card shiliao-welcome-card" onclick="quickShiliaoOrganSearch('${item.name}')">
      <div class="welcome-card-icon">${item.icon}</div>
      <div class="welcome-card-name">${item.name}</div>
      <div class="shiliao-card-sub">${item.category || ''}</div>
    </div>`
      )
      .join('');
  } else {
    grid.innerHTML = list
      .map(
        (item) => `
    <div class="welcome-card shiliao-welcome-card" onclick="quickShiliaoSearch('${item.name}')">
      <div class="welcome-card-icon">${item.icon}</div>
      <div class="welcome-card-name">${item.name}</div>
    </div>`
      )
      .join('');
  }
}

function updateShiliaoTabsForMode(type) {
  const posterBtn = document.querySelector('#shiliao-tabs .shiliao-tab-btn[data-tab="shiliao-poster"]');
  const detailBtn = document.querySelector('#shiliao-tabs .shiliao-tab-btn[data-tab="shiliao-detail"]');
  if (posterBtn) {
    posterBtn.style.display = '';
    if (type === 'disease') posterBtn.textContent = '🎨 场景海报';
    else if (type === 'organ') posterBtn.textContent = '🎨 营养海报';
    else if (type === 'summary') posterBtn.textContent = '🎨 汇总海报';
    else posterBtn.textContent = '🎨 饮食海报';
  }
  if (detailBtn) {
    if (type === 'disease') detailBtn.textContent = '📋 场景方案';
    else if (type === 'organ') detailBtn.textContent = '📋 营养侧重';
    else if (type === 'summary') detailBtn.textContent = '📋 汇总详情';
    else detailBtn.textContent = '📋 饮食详情';
  }
}

function switchShiliaoTab(tabId, btn) {
  document.querySelectorAll('#shiliao-tabs .shiliao-tab-btn').forEach((b) => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  document.querySelectorAll('#shiliao-result .view-panel').forEach((p) => p.classList.remove('active'));
  const panel = document.getElementById('view-' + tabId);
  if (panel) panel.classList.add('active');

  if (tabId === 'shiliao-poster' && window._shiliaoCurrentData) {
    const container = document.getElementById('shiliao-poster-pages');
    if (container && !container.querySelector('canvas')) {
      requestAnimationFrame(() => {
        const t = window._shiliaoContentType;
        if (t === 'disease') renderShiliaoDiseasePoster(window._shiliaoCurrentData);
        else if (t === 'organ') renderShiliaoOrganPoster(window._shiliaoCurrentData);
        else if (t === 'summary') renderShiliaoSummaryPoster(window._shiliaoCurrentData);
        else renderShiliaoPoster(window._shiliaoCurrentData);
      });
    }
  }
}

function doShiliaoSearchFromInput() {
  const input = document.getElementById('shiliao-search-input');
  const q = input ? input.value : '';
  if (window._shiliaoMode === 'list') return;
  if (window._shiliaoMode === 'disease') doShiliaoDiseaseSearch(q);
  else if (window._shiliaoMode === 'organ') doShiliaoOrganSearch(q);
  else if (window._shiliaoMode === 'summary') doShiliaoSummarySearch(q);
  else doShiliaoSearch(q);
}

window._shiliaoListTopicId = window._shiliaoListTopicId || null;
window._shiliaoListThemeId = window._shiliaoListThemeId || 'clean';

function openShiliaoListTopic(id) {
  const topic = getShiliaoListTopic(id);
  if (!topic) return;
  window._shiliaoListTopicId = id;
  window._shiliaoListThemeId = topic.defaultTheme || 'green';
  const panel = document.getElementById('shiliao-list-panel');
  if (panel) panel.style.display = 'block';
  const titleEl = document.getElementById('shiliao-list-panel-title');
  if (titleEl) titleEl.textContent = topic.title;
  updateShiliaoListThemeUI();
  renderShiliaoListPosterPreview();
  renderShiliaoWelcomeCards();
  panel?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function switchShiliaoListTheme(themeId) {
  window._shiliaoListThemeId = themeId;
  updateShiliaoListThemeUI();
  renderShiliaoListPosterPreview();
}

function updateShiliaoListThemeUI() {
  document.querySelectorAll('.shiliao-list-theme-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.theme === window._shiliaoListThemeId);
  });
}

function renderShiliaoListPosterPreview() {
  const topic = getShiliaoListTopic(window._shiliaoListTopicId);
  if (!topic) return;
  const theme = getShiliaoListTheme(window._shiliaoListThemeId);
  renderShiliaoListPoster(topic, theme, 'shiliao-list-poster-pages', 'shiliao-list-poster-canvas');
}

function downloadShiliaoListPosterFromUI() {
  const topic = getShiliaoListTopic(window._shiliaoListTopicId);
  const theme = getShiliaoListTheme(window._shiliaoListThemeId);
  const name = topic ? `${topic.title}-${theme.name}.png` : '健康饮食榜单.png';
  downloadShiliaoListPoster('shiliao-list-poster-canvas', name);
}

/** 返回健康饮食总览 */
function backToShiliaoOverview() {
  const shiliaoResult = document.getElementById('shiliao-result');
  const welcome = document.getElementById('welcome');
  const welcomeShiliao = document.getElementById('welcome-shiliao');
  const notFound = document.getElementById('not-found');

  if (shiliaoResult) shiliaoResult.classList.remove('show');
  if (notFound) notFound.classList.remove('show');
  if (welcome) welcome.style.display = '';
  if (welcomeShiliao) welcomeShiliao.style.display = '';

  const input = document.getElementById('shiliao-search-input');
  if (input) input.value = '';

  window._shiliaoCurrentData = null;
}
