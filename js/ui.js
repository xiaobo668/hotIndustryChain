/**
 * UI 通用逻辑
 * - switchMode(mode, btn): 模式切换（产业链/板块龙头）
 * - doSearch(query): 主搜索入口
 * - quickSearch(keyword): 热门标签快速搜索
 * - updateIndustryLoading(text): 更新产业链加载文字
 * - updateSectorLoading(text): 更新板块龙头加载文字
 */

/** 切换模式 */
function switchMode(mode, btn) {
  if (currentMode === mode) return;
  currentMode = mode;

  // 更新 Tab 状态
  document.querySelectorAll('.mode-tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  const cfg = MODE_CONFIG[mode];

  // 更新 Header
  document.getElementById('mode-logo-icon').textContent = cfg.logoIcon;
  document.getElementById('mode-logo-text').textContent = cfg.logoText;
  document.getElementById('mode-logo-sub').textContent = cfg.logoSub;

  // 更新搜索框
  document.getElementById('search-input').placeholder = cfg.placeholder;
  document.getElementById('search-btn').textContent = cfg.btnText;

  // 更新加载文字
  document.getElementById('loading-text').textContent = cfg.loadingText;

  // 更新欢迎页
  document.getElementById('welcome-icon').textContent = cfg.welcomeIcon;
  document.getElementById('welcome-title').textContent = cfg.welcomeTitle;
  document.getElementById('welcome-desc').innerHTML = cfg.welcomeDesc;

  // 更新热门标签
  const hotkeysEl = document.getElementById('hotkeys');
  let hkHtml = '<span class="hotkey-label">热门：</span>';
  cfg.hotkeys.forEach(k => {
    hkHtml += `<span class="hotkey-tag" onclick="quickSearch('${k}')">${k}</span>`;
  });
  hotkeysEl.innerHTML = hkHtml;

  // 切换视图：隐藏所有结果，显示对应欢迎页
  document.getElementById('result').classList.remove('show');
  document.getElementById('sector-result').classList.remove('show');
  document.getElementById('not-found').classList.remove('show');
  document.getElementById('ai-error').classList.remove('show');
  document.getElementById('welcome').style.display = '';

  // 清空搜索框
  document.getElementById('search-input').value = '';
}

/** 主搜索入口 */
function doSearch(query) {
  if (!query || !query.trim()) return;
  query = query.trim();

  // 隐藏无关 UI
  document.getElementById('welcome').style.display = 'none';
  document.getElementById('result').classList.remove('show');
  document.getElementById('sector-result').classList.remove('show');
  document.getElementById('not-found').classList.remove('show');
  document.getElementById('ai-error').classList.remove('show');
  document.getElementById('loading').classList.add('show');

  if (currentMode === 'industry') {
    doIndustrySearch(query);
  } else {
    doSectorSearch(query);
  }
}

/** 快速搜索（热门标签点击） */
function quickSearch(keyword) {
  const input = document.getElementById('search-input');
  input.value = keyword;
  doSearch(keyword);
}

/** 更新产业链加载中的文字 */
function updateIndustryLoading(text) {
  const el = document.querySelector('#loading .loading-text');
  if (el) el.textContent = text;
}

/** 更新板块龙头加载中的文字 */
function updateSectorLoading(text) {
  const el = document.querySelector('#loading .loading-text');
  if (el) el.textContent = text;
}
