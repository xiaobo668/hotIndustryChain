/**
 * 小红书 UI 模块 (xiaohongshu/ui.js)
 * - switchModule(module): 产业链/小红书模块切换（完全隔离，含 header）
 * - switchXHSTab(tabId, btn): 小红书内部 tab 切换（FAQ预览 / 海报）
 * - initXHSUI(): 初始化小红书欢迎页（领域选择器 + 选题列表）
 * - selectXHSCategory(categoryId): 选择领域
 * - renderXHSTopics(categoryId): 渲染选题卡片
 *
 * 依赖：XHS_TOPICS, getXHSCategories, getXHSTopics（topics.js）
 *       doXHSSearch（search.js）
 */

/** 当前选中的领域 */
let currentXHSCategory = 'pet-cat';

/** 当前激活的模块 */
let currentModule = 'industry';

/**
 * 初始化（页面加载后调用）
 */
function initXHSUI() {
  renderXHSCategorySelector();
  renderXHSTopics(currentXHSCategory);
}

/**
 * 模块切换：产业链分析 ↔ 小红书创作 ↔ K线教学
 */
function switchModule(module) {
  if (currentModule === module) return;
  currentModule = module;

  document.querySelectorAll('#module-tabs .module-tab-btn').forEach(b => b.classList.remove('active'));
  const activeBtn = document.getElementById('tab-' + module);
  if (activeBtn) activeBtn.classList.add('active');

  const headerIndustry = document.getElementById('header-industry');
  const headerXHS = document.getElementById('header-xhs');
  const headerKline = document.getElementById('header-kline');
  const headerShiliao = document.getElementById('header-shiliao');
  const headerZhichang = document.getElementById('header-zhichang');

  if (headerIndustry) headerIndustry.style.display = module === 'industry' ? 'flex' : 'none';
  if (headerXHS) headerXHS.style.display = module === 'xhs' ? 'flex' : 'none';
  if (headerKline) headerKline.style.display = module === 'kline' ? 'flex' : 'none';
  if (headerShiliao) headerShiliao.style.display = module === 'shiliao' ? 'flex' : 'none';
  if (headerZhichang) headerZhichang.style.display = module === 'zhichang' ? 'flex' : 'none';

  const welcomeIndustry = document.getElementById('welcome-industry');
  const welcomeXHS = document.getElementById('welcome-xhs');
  const welcomeKline = document.getElementById('welcome-kline');
  const welcomeShiliao = document.getElementById('welcome-shiliao');
  const welcomeZhichang = document.getElementById('welcome-zhichang');
  const welcomeContainer = document.getElementById('welcome');

  function hideAllResults() {
    document.getElementById('result').classList.remove('show');
    document.getElementById('xhs-result').classList.remove('show');
    const klineResult = document.getElementById('kline-result');
    if (klineResult) klineResult.classList.remove('show');
    const shiliaoResult = document.getElementById('shiliao-result');
    if (shiliaoResult) shiliaoResult.classList.remove('show');
    document.getElementById('loading').classList.remove('show');
    document.getElementById('not-found').classList.remove('show');
    document.getElementById('ai-error').classList.remove('show');
  }

  if (module === 'industry') {
    if (welcomeIndustry) welcomeIndustry.style.display = '';
    if (welcomeXHS) welcomeXHS.style.display = 'none';
    if (welcomeKline) welcomeKline.style.display = 'none';
    if (welcomeShiliao) welcomeShiliao.style.display = 'none';
    if (welcomeZhichang) welcomeZhichang.style.display = 'none';
    if (welcomeContainer) welcomeContainer.style.display = '';
    hideAllResults();

  } else if (module === 'xhs') {
    if (welcomeIndustry) welcomeIndustry.style.display = 'none';
    if (welcomeXHS) welcomeXHS.style.display = '';
    if (welcomeKline) welcomeKline.style.display = 'none';
    if (welcomeShiliao) welcomeShiliao.style.display = 'none';
    if (welcomeZhichang) welcomeZhichang.style.display = 'none';
    if (welcomeContainer) welcomeContainer.style.display = '';
    hideAllResults();
    initXHSUI();

  } else if (module === 'kline') {
    if (welcomeIndustry) welcomeIndustry.style.display = 'none';
    if (welcomeXHS) welcomeXHS.style.display = 'none';
    if (welcomeKline) welcomeKline.style.display = '';
    if (welcomeShiliao) welcomeShiliao.style.display = 'none';
    if (welcomeZhichang) welcomeZhichang.style.display = 'none';
    if (welcomeContainer) welcomeContainer.style.display = '';
    const spaceWrap = document.getElementById('kline-space-wrap');
    if (spaceWrap) spaceWrap.style.display = 'none';
    hideAllResults();
    window._klineCurrentPartId = null;
    if (typeof initKlineUI === 'function') initKlineUI();
    if (typeof isKlineSpaceHash === 'function' && isKlineSpaceHash() && typeof showKlineSpaceView === 'function') {
      showKlineSpaceView();
    } else {
      window.location.hash = 'kline';
    }

  } else if (module === 'shiliao') {
    if (welcomeIndustry) welcomeIndustry.style.display = 'none';
    if (welcomeXHS) welcomeXHS.style.display = 'none';
    if (welcomeKline) welcomeKline.style.display = 'none';
    if (welcomeShiliao) welcomeShiliao.style.display = '';
    if (welcomeZhichang) welcomeZhichang.style.display = 'none';
    if (welcomeContainer) welcomeContainer.style.display = '';
    hideAllResults();
    if (typeof initShiliaoUI === 'function') initShiliaoUI();

  } else if (module === 'zhichang') {
    if (welcomeIndustry) welcomeIndustry.style.display = 'none';
    if (welcomeXHS) welcomeXHS.style.display = 'none';
    if (welcomeKline) welcomeKline.style.display = 'none';
    if (welcomeShiliao) welcomeShiliao.style.display = 'none';
    if (welcomeZhichang) welcomeZhichang.style.display = '';
    if (welcomeContainer) welcomeContainer.style.display = '';
    hideAllResults();
    if (typeof initZhichangUI === 'function') initZhichangUI();
  }
}

/**
 * 小红书内部 Tab 切换（FAQ预览 ↔ 海报）
 * 完全独立于产业链模块，自主管理头部显示状态
 */
function switchXHSTab(tabId, btn) {
  // 更新按钮状态
  document.querySelectorAll('#xhs-tabs .xhs-tab-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  // 切换 view panel
  document.querySelectorAll('#xhs-result .view-panel').forEach(p => p.classList.remove('active'));
  const targetPanel = document.getElementById('view-' + tabId);
  if (targetPanel) targetPanel.classList.add('active');

  // 控制小红书头部显示（独立管理，不依赖产业链模块）
  const xhsHeader = document.getElementById('xhs-header');
  if (xhsHeader) xhsHeader.style.display = '';

  // 如果切到海报 tab 且还没渲染过海报，则自动渲染
  if (tabId === 'xhs-poster' && window._xhsCurrentData) {
    const posterContainer = document.getElementById('xhs-poster-pages');
    if (posterContainer && posterContainer.children.length === 0) {
      requestAnimationFrame(() => renderXHSPoster(window._xhsCurrentData, window._xhsCurrentCategory || 'pet-cat'));
    }
  }
}

/**
 * 渲染领域选择按钮组
 */
function renderXHSCategorySelector() {
  const container = document.getElementById('xhs-category-selector');
  if (!container) return;

  const categories = getXHSCategories();
  container.innerHTML = categories.map(cat => `
    <button class="xhs-cat-btn ${cat.id === currentXHSCategory ? 'active' : ''}"
      onclick="selectXHSCategory('${cat.id}')"
      style="${cat.id === currentXHSCategory ? '' : ''}">
      ${cat.icon} ${cat.name.replace(/\s/g, '')}
    </button>
  `).join('');
}

/**
 * 选择领域
 */
function selectXHSCategory(categoryId) {
  currentXHSCategory = categoryId;

  // 更新按钮状态
  document.querySelectorAll('.xhs-cat-btn').forEach(btn => {
    btn.classList.toggle('active', btn.textContent.includes(XHS_TOPICS[categoryId]?.name?.replace(/\s/g, '') || ''));
  });

  // 更新选题列表
  renderXHSTopics(categoryId);
}

/**
 * 渲染某领域的选题卡片
 */
function renderXHSTopics(categoryId) {
  const container = document.getElementById('xhs-topic-list');
  if (!container) return;

  const topics = getXHSTopics(categoryId);

  container.innerHTML = topics.map(topic => `
    <div class="xhs-topic-card" onclick="doXHSSearch('${categoryId}', '${topic.id}')">
      <div class="xhs-topic-card-title">${topic.title}</div>
      <div class="xhs-topic-card-sub">${topic.subtitle}</div>
    </div>
  `).join('');
}
