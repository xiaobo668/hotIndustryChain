/**
 * 食疗搜索 — 本地食材库
 */
function doShiliaoSearch(query) {
  const q = (query || '').trim();
  if (!q) return;

  const key = resolveShiliaoKey(q);
  if (!key) {
    document.getElementById('welcome').style.display = 'none';
    document.getElementById('shiliao-result').classList.remove('show');
    document.getElementById('result').classList.remove('show');
    document.getElementById('xhs-result').classList.remove('show');
    document.getElementById('loading').classList.remove('show');
    document.getElementById('ai-error').classList.remove('show');
    document.getElementById('not-found').classList.add('show');
    const nf = document.querySelector('#not-found h3');
    const np = document.querySelector('#not-found p');
    if (nf) nf.textContent = '暂未收录该食材';
    if (np) {
      np.innerHTML =
        '当前内置 60 种常用食材，可切换「对症食疗」按症状查找<br/>试试：生姜、山药、红枣、枸杞、薏米';
    }
    return;
  }

  document.getElementById('welcome').style.display = 'none';
  document.getElementById('result').classList.remove('show');
  document.getElementById('xhs-result').classList.remove('show');
  document.getElementById('not-found').classList.remove('show');
  document.getElementById('ai-error').classList.remove('show');
  document.getElementById('loading').classList.remove('show');

  const data = SHILIAO_DATA[key];
  window._shiliaoCurrentData = data;
  window._shiliaoContentType = 'ingredient';
  renderShiliaoResult(data);
  document.getElementById('shiliao-result').classList.add('show');
  updateShiliaoTabsForMode('ingredient');
  switchShiliaoTab(
    'shiliao-detail',
    document.querySelector('#shiliao-tabs .shiliao-tab-btn[data-tab="shiliao-detail"]')
  );
}

function quickShiliaoSearch(name) {
  const input = document.getElementById('shiliao-search-input');
  if (input) input.value = name;
  doShiliaoSearch(name);
}
