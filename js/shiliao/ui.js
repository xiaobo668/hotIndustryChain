/**
 * 食疗 UI — 四模式切换、Tab 与欢迎页
 */
window._shiliaoMode = window._shiliaoMode || 'ingredient';
window._shiliaoContentType = 'ingredient';

const SHILIAO_MODES = ['ingredient', 'disease', 'organ', 'summary'];

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

  if (mode === 'disease') {
    if (logoText) logoText.textContent = '对症食疗 · 症状查方';
    if (logoSub) logoSub.textContent = 'Symptom-Based Food Therapy';
    if (input) input.placeholder = '搜索症状/不适，如：失眠、湿气重、气血不足...';
    if (welcomeTitle) welcomeTitle.textContent = '对症食疗 · 39 种常见不适';
    if (welcomeDesc) {
      welcomeDesc.innerHTML =
        '按<strong>症状/疾病</strong>查找推荐食材与<strong>3～5 道食疗菜</strong><br/>' +
        '<span style="color:#65a30d;font-size:13px">✨ 对症海报可下载 · 食材可跳转百科 · 60秒口播可朗读</span>';
    }
    if (hotkeys) {
      hotkeys.innerHTML = `
        <span class="hotkey-label">常见不适：</span>
        <span class="hotkey-tag shiliao-hotkey-tag" onclick="quickShiliaoDiseaseSearch('失眠')">😴 失眠</span>
        <span class="hotkey-tag shiliao-hotkey-tag" onclick="quickShiliaoDiseaseSearch('湿气重')">💦 湿气重</span>
        <span class="hotkey-tag shiliao-hotkey-tag" onclick="quickShiliaoDiseaseSearch('气血不足')">💗 气血不足</span>
        <span class="hotkey-tag shiliao-hotkey-tag" onclick="quickShiliaoDiseaseSearch('咳嗽痰多')">😷 咳嗽</span>
        <span class="hotkey-tag shiliao-hotkey-tag" onclick="quickShiliaoDiseaseSearch('消化不良')">🫃 消化不良</span>
      `;
    }
  } else if (mode === 'summary') {
    if (logoText) logoText.textContent = '食疗汇总 · 典籍清单';
    if (logoSub) logoSub.textContent = 'Classic Food Therapy Lists';
    if (input) input.placeholder = '搜索汇总主题，如：免疫力、延年益寿、40岁养生...';
    if (welcomeTitle) welcomeTitle.textContent = '食疗汇总 · 典籍与营养清单';
    if (welcomeDesc) {
      welcomeDesc.innerHTML =
        '汇总<strong>增强免疫力</strong>、<strong>延年益寿</strong>、<strong>40岁养生</strong>、<strong>维C/蛋白排行</strong>等，附典籍出处<br/>' +
        '<span style="color:#65a30d;font-size:13px">✨ 汇总海报可下载 · 已收录食材可跳转百科 · 60秒口播</span>';
    }
    if (hotkeys) {
      hotkeys.innerHTML = `
        <span class="hotkey-label">汇总主题：</span>
        <span class="hotkey-tag shiliao-hotkey-tag" onclick="quickShiliaoSummarySearch('增强免疫力')">🛡️ 免疫力</span>
        <span class="hotkey-tag shiliao-hotkey-tag" onclick="quickShiliaoSummarySearch('延年益寿')">🌿 延年</span>
        <span class="hotkey-tag shiliao-hotkey-tag" onclick="quickShiliaoSummarySearch('四十养生')">🧓 40岁+</span>
        <span class="hotkey-tag shiliao-hotkey-tag" onclick="quickShiliaoSummarySearch('维C水果')">🍊 维C水果</span>
        <span class="hotkey-tag shiliao-hotkey-tag" onclick="quickShiliaoSummarySearch('高蛋白食材')">🥩 高蛋白</span>
      `;
    }
  } else if (mode === 'organ') {
    if (logoText) logoText.textContent = '器官食补 · 偏爱食材';
    if (logoSub) logoSub.textContent = 'Organ-Friendly Foods';
    if (input) input.placeholder = '搜索器官，如：心脏、肝脏、肺、眼睛...';
    if (welcomeTitle) welcomeTitle.textContent = '器官食补 · 12 个器官偏爱';
    if (welcomeDesc) {
      welcomeDesc.innerHTML =
        '查看<strong>各器官最喜欢的食材</strong>与<strong>推荐菜品</strong>，点击食材跳转百科<br/>' +
        '<span style="color:#65a30d;font-size:13px">✨ 器官海报可下载 · 60秒口播可朗读</span>';
    }
    if (hotkeys) {
      hotkeys.innerHTML = `
        <span class="hotkey-label">常用器官：</span>
        <span class="hotkey-tag shiliao-hotkey-tag" onclick="quickShiliaoOrganSearch('心脏')">❤️ 心脏</span>
        <span class="hotkey-tag shiliao-hotkey-tag" onclick="quickShiliaoOrganSearch('肝脏')">🫀 肝脏</span>
        <span class="hotkey-tag shiliao-hotkey-tag" onclick="quickShiliaoOrganSearch('脾胃')">🍚 脾胃</span>
        <span class="hotkey-tag shiliao-hotkey-tag" onclick="quickShiliaoOrganSearch('肺')">🫁 肺</span>
        <span class="hotkey-tag shiliao-hotkey-tag" onclick="quickShiliaoOrganSearch('肾脏')">🫘 肾脏</span>
      `;
    }
  } else {
    if (logoText) logoText.textContent = '食疗养生 · 食材百科';
    if (logoSub) logoSub.textContent = 'Food Therapy & Ingredient Wellness';
    if (input) input.placeholder = '搜索常用食材，如：生姜、山药、红枣...';
    if (welcomeTitle) welcomeTitle.textContent = '食疗养生 · 食材百科';
    if (welcomeDesc) {
      welcomeDesc.innerHTML =
        '搜索常用食材，查看<strong>养生作用</strong>、<strong>古籍记载</strong>、<strong>对症食疗菜</strong><br/>' +
        '<span style="color:#65a30d;font-size:13px">✨ 食疗海报可下载 · 60秒口播稿可直接朗读</span>';
    }
    if (hotkeys) {
      hotkeys.innerHTML = `
        <span class="hotkey-label">常用食材：</span>
        <span class="hotkey-tag shiliao-hotkey-tag" onclick="quickShiliaoSearch('生姜')">🫚 生姜</span>
        <span class="hotkey-tag shiliao-hotkey-tag" onclick="quickShiliaoSearch('山药')">🍠 山药</span>
        <span class="hotkey-tag shiliao-hotkey-tag" onclick="quickShiliaoSearch('红枣')">🍒 红枣</span>
        <span class="hotkey-tag shiliao-hotkey-tag" onclick="quickShiliaoSearch('薏米')">🌾 薏米</span>
        <span class="hotkey-tag shiliao-hotkey-tag" onclick="quickShiliaoSearch('白萝卜')">🥕 白萝卜</span>
      `;
    }
  }
}

function renderShiliaoWelcomeCards() {
  const grid = document.getElementById('shiliao-welcome-grid');
  if (!grid) return;

  if (window._shiliaoMode === 'disease') {
    grid.innerHTML = getShiliaoDiseaseList()
      .map(
        (item) => `
    <div class="welcome-card shiliao-welcome-card" onclick="quickShiliaoDiseaseSearch('${item.name}')">
      <div class="welcome-card-icon">${item.icon}</div>
      <div class="welcome-card-name">${item.name}</div>
      <div class="shiliao-card-sub">${item.category || ''}</div>
    </div>`
      )
      .join('');
  } else if (window._shiliaoMode === 'summary') {
    grid.innerHTML = getShiliaoSummaryList()
      .map(
        (item) => `
    <div class="welcome-card shiliao-welcome-card" onclick="quickShiliaoSummarySearch('${item.name}')">
      <div class="welcome-card-icon">${item.icon}</div>
      <div class="welcome-card-name">${item.name}</div>
      <div class="shiliao-card-sub">${item.listTitle || ''}</div>
    </div>`
      )
      .join('');
  } else if (window._shiliaoMode === 'organ') {
    grid.innerHTML = getShiliaoOrganList()
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
    grid.innerHTML = getShiliaoList()
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
    if (type === 'disease') posterBtn.textContent = '🎨 对症海报';
    else if (type === 'organ') posterBtn.textContent = '🎨 器官海报';
    else if (type === 'summary') posterBtn.textContent = '🎨 汇总海报';
    else posterBtn.textContent = '🎨 食疗海报';
  }
  if (detailBtn) {
    if (type === 'disease') detailBtn.textContent = '📋 对症方案';
    else if (type === 'organ') detailBtn.textContent = '📋 器官食补';
    else if (type === 'summary') detailBtn.textContent = '📋 汇总详情';
    else detailBtn.textContent = '📋 食疗详情';
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
  if (window._shiliaoMode === 'disease') doShiliaoDiseaseSearch(q);
  else if (window._shiliaoMode === 'organ') doShiliaoOrganSearch(q);
  else if (window._shiliaoMode === 'summary') doShiliaoSummarySearch(q);
  else doShiliaoSearch(q);
}

/** 返回食疗总览（食材/对症/器官卡片列表） */
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
