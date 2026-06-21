/**
 * 饮食汇总搜索
 */
function doShiliaoSummarySearch(query) {
  const q = (query || '').trim();
  if (!q) return;

  const key = resolveShiliaoSummaryKey(q);
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
    if (nf) nf.textContent = '暂未收录该汇总主题';
    if (np) np.innerHTML = '健康饮食模块暂无饮食汇总数据，待录入后可搜索';
    return;
  }

  document.getElementById('welcome').style.display = 'none';
  document.getElementById('result').classList.remove('show');
  document.getElementById('xhs-result').classList.remove('show');
  document.getElementById('not-found').classList.remove('show');
  document.getElementById('ai-error').classList.remove('show');
  document.getElementById('loading').classList.remove('show');

  const data = SHILIAO_SUMMARY_DATA[key];
  window._shiliaoCurrentData = data;
  window._shiliaoContentType = 'summary';
  renderShiliaoSummaryResult(data);
  document.getElementById('shiliao-result').classList.add('show');
  updateShiliaoTabsForMode('summary');
  switchShiliaoTab(
    'shiliao-detail',
    document.querySelector('#shiliao-tabs .shiliao-tab-btn[data-tab="shiliao-detail"]')
  );
}

function quickShiliaoSummarySearch(name) {
  const input = document.getElementById('shiliao-search-input');
  if (input) input.value = name;
  doShiliaoSummarySearch(name);
}
