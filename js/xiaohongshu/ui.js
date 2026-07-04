/**
 * 小红书 UI 模块 (xiaohongshu/ui.js)
 * - switchXHSTab(tabId, btn): 小红书内部 tab 切换（FAQ预览 / 海报）
 * - initXHSUI(): 初始化小红书欢迎页（领域选择器 + 选题列表）
 * - selectXHSCategory(categoryId): 选择领域
 * - renderXHSTopics(categoryId): 渲染选题卡片
 *
 * 壳层 Tab 切换见 js/shell/router.js → switchModule()
 *
 * 依赖：XHS_TOPICS, getXHSCategories, getXHSTopics（topics.js）
 *       doXHSSearch（search.js）
 */

/** 当前选中的领域 */
let currentXHSCategory = 'pet-cat';

/**
 * 初始化（页面加载后调用）
 */
function initXHSUI() {
  renderXHSCategorySelector();
  renderXHSTopics(currentXHSCategory);
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
