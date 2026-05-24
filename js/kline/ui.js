/**
 * K线教学 UI
 * - initKlineUI(): 渲染大纲
 * - openKlineChapter(partId, chapterId?): 打开部分/章
 * - handleKlineDeepLink(): URL hash 直达
 */

function initKlineUI() {
  if (typeof mergeKlinePartContent === 'function') mergeKlinePartContent();
  renderKlineOutline();
  handleKlineDeepLink();
}

function openKlineChapter(partId, chapterId) {
  if (typeof switchModule === 'function' && typeof currentModule !== 'undefined' && currentModule !== 'kline') {
    switchModule('kline');
  }
  const spaceWrap = document.getElementById('kline-space-wrap');
  if (spaceWrap) spaceWrap.style.display = 'none';
  const welcomeKline = document.getElementById('welcome-kline');
  if (welcomeKline) welcomeKline.style.display = 'none';
  renderKlineChapter(partId, chapterId);
  const hash = chapterId ? `kline/${partId}/${chapterId}` : 'kline/' + partId;
  window.location.hash = hash;
}

function handleKlineDeepLink() {
  const route = typeof parseKlineRoute === 'function' ? parseKlineRoute() : null;
  if (!route || !route.view) return;

  if (route.view === 'space') {
    setTimeout(() => showKlineSpaceView(), 50);
    return;
  }
  if (route.view === 'chapter' && route.partId && getKlinePart(route.partId)) {
    setTimeout(() => openKlineChapter(route.partId, route.chapterId), 50);
  }
}

window.addEventListener('hashchange', handleKlineDeepLink);
