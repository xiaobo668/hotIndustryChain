/**
 * 壳层路由 (js/shell/router.js)
 * - switchModule(module): 主站 Tab 模块切换
 * - initShellFromHash(): 根据 URL hash 初始化模块
 * - open*RankPage(): 排行榜 / 子页导航
 */

/** 当前激活的主站模块 */
let currentModule = 'industry';

function getCurrentModule() {
  return currentModule;
}

function switchModule(module) {
  currentModule = module;

  document.querySelectorAll('#module-tabs .module-tab-btn').forEach(b => b.classList.remove('active'));
  const activeBtn = document.getElementById('tab-' + module);
  if (activeBtn) activeBtn.classList.add('active');

  const headerIndustry = document.getElementById('header-industry');
  const headerXHS = document.getElementById('header-xhs');
  const headerKline = document.getElementById('header-kline');
  const headerShiliao = document.getElementById('header-shiliao');
  const headerZhichang = document.getElementById('header-zhichang');
  const headerKepu = document.getElementById('header-kepu');

  if (headerIndustry) headerIndustry.style.display = module === 'industry' ? 'flex' : 'none';
  if (headerXHS) headerXHS.style.display = module === 'xhs' ? 'flex' : 'none';
  if (headerKline) headerKline.style.display = module === 'kline' ? 'flex' : 'none';
  if (headerShiliao) headerShiliao.style.display = module === 'shiliao' ? 'flex' : 'none';
  if (headerZhichang) headerZhichang.style.display = module === 'zhichang' ? 'flex' : 'none';
  if (headerKepu) headerKepu.style.display = module === 'kepu' ? 'flex' : 'none';

  const welcomeIndustry = document.getElementById('welcome-industry');
  const welcomeXHS = document.getElementById('welcome-xhs');
  const welcomeKline = document.getElementById('welcome-kline');
  const welcomeShiliao = document.getElementById('welcome-shiliao');
  const welcomeZhichang = document.getElementById('welcome-zhichang');
  const welcomeKepu = document.getElementById('welcome-kepu');
  const welcomeContainer = document.getElementById('welcome');

  function hideAllResults() {
    const result = document.getElementById('result');
    if (result) result.classList.remove('show');
    const xhsResult = document.getElementById('xhs-result');
    if (xhsResult) xhsResult.classList.remove('show');
    const klineResult = document.getElementById('kline-result');
    if (klineResult) klineResult.classList.remove('show');
    const shiliaoResult = document.getElementById('shiliao-result');
    if (shiliaoResult) shiliaoResult.classList.remove('show');
    const loading = document.getElementById('loading');
    if (loading) loading.classList.remove('show');
    const notFound = document.getElementById('not-found');
    if (notFound) notFound.classList.remove('show');
    const aiError = document.getElementById('ai-error');
    if (aiError) aiError.classList.remove('show');
  }

  if (module !== 'kline') {
    const spaceWrap = document.getElementById('kline-space-wrap');
    if (spaceWrap) spaceWrap.style.display = 'none';
  }

  if (module === 'industry') {
    if (welcomeIndustry) welcomeIndustry.style.display = '';
    if (welcomeXHS) welcomeXHS.style.display = 'none';
    if (welcomeKline) welcomeKline.style.display = 'none';
    if (welcomeShiliao) welcomeShiliao.style.display = 'none';
    if (welcomeZhichang) welcomeZhichang.style.display = 'none';
    if (welcomeKepu) welcomeKepu.style.display = 'none';
    if (welcomeContainer) welcomeContainer.style.display = '';
    hideAllResults();

  } else if (module === 'xhs') {
    if (welcomeIndustry) welcomeIndustry.style.display = 'none';
    if (welcomeXHS) welcomeXHS.style.display = '';
    if (welcomeKline) welcomeKline.style.display = 'none';
    if (welcomeShiliao) welcomeShiliao.style.display = 'none';
    if (welcomeZhichang) welcomeZhichang.style.display = 'none';
    if (welcomeKepu) welcomeKepu.style.display = 'none';
    if (welcomeContainer) welcomeContainer.style.display = '';
    hideAllResults();
    if (typeof initXHSUI === 'function') initXHSUI();

  } else if (module === 'kline') {
    if (welcomeIndustry) welcomeIndustry.style.display = 'none';
    if (welcomeXHS) welcomeXHS.style.display = 'none';
    if (welcomeKline) welcomeKline.style.display = '';
    if (welcomeShiliao) welcomeShiliao.style.display = 'none';
    if (welcomeZhichang) welcomeZhichang.style.display = 'none';
    if (welcomeKepu) welcomeKepu.style.display = 'none';
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
    if (welcomeKepu) welcomeKepu.style.display = 'none';
    if (welcomeContainer) welcomeContainer.style.display = '';
    hideAllResults();
    if (typeof initShiliaoUI === 'function') initShiliaoUI();

  } else if (module === 'zhichang') {
    if (welcomeIndustry) welcomeIndustry.style.display = 'none';
    if (welcomeXHS) welcomeXHS.style.display = 'none';
    if (welcomeKline) welcomeKline.style.display = 'none';
    if (welcomeShiliao) welcomeShiliao.style.display = 'none';
    if (welcomeZhichang) welcomeZhichang.style.display = 'block';
    if (welcomeKepu) welcomeKepu.style.display = 'none';
    if (welcomeContainer) welcomeContainer.style.display = 'block';
    hideAllResults();
    if (typeof initZhichangUI === 'function') initZhichangUI();
    window.location.hash = 'zhichang';

  } else if (module === 'kepu') {
    if (welcomeIndustry) welcomeIndustry.style.display = 'none';
    if (welcomeXHS) welcomeXHS.style.display = 'none';
    if (welcomeKline) welcomeKline.style.display = 'none';
    if (welcomeShiliao) welcomeShiliao.style.display = 'none';
    if (welcomeZhichang) welcomeZhichang.style.display = 'none';
    if (welcomeKepu) welcomeKepu.style.display = 'block';
    if (welcomeContainer) welcomeContainer.style.display = 'block';
    hideAllResults();
    if (typeof initChainPopScienceWelcome === 'function') initChainPopScienceWelcome();
    window.location.hash = 'kepu';
  }

  window.scrollTo(0, 0);
}

function initShellFromHash() {
  if (window.location.hash.startsWith('#kline')) {
    switchModule('kline');
  } else if (window.location.hash.startsWith('#zhichang')) {
    switchModule('zhichang');
    const m = window.location.hash.match(/^#zhichang(?:\/([\w-]+))?/);
    if (m && m[1] && typeof openZhichangAlbum === 'function') {
      setTimeout(function () { openZhichangAlbum(m[1]); }, 80);
    }
  } else if (window.location.hash === '#kepu' || window.location.hash.startsWith('#kepu/')) {
    switchModule('kepu');
  }
}

function openOrderRankPage() {
  window.location.href = 'order-poster.html';
}

function openCapacityRankPage() {
  window.location.href = 'capacity-poster.html';
}

function openConsumablesRankPage() {
  window.location.href = 'consumables-poster.html';
}

function openInterimReportPage() {
  window.location.href = 'interim-report.html';
}

function openScarceMaterialsPosterPage() {
  window.location.href = 'scarce-materials-poster.html';
}

function openYtdGainersPage() {
  window.location.href = 'theme-poster.html#ytd-gainers';
}

function openThemePosterPage() {
  window.location.href = 'theme-poster.html';
}

function openOrderTracksPage() {
  window.location.href = 'order-tracks.html';
}

function openHumanoidEightPosterPage() {
  window.location.href = 'humanoid-eight-poster.html';
}

function openNvidiaRelatedPosterPage() {
  window.location.href = 'nvidia-related-poster.html';
}
