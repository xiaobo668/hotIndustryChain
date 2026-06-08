/**
 * 对症食疗搜索
 */
function doShiliaoDiseaseSearch(query) {
  const q = (query || '').trim();
  if (!q) return;

  const key = resolveShiliaoDiseaseKey(q);
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
    if (nf) nf.textContent = '暂未收录该症状/疾病';
    if (np) {
      np.innerHTML =
        '当前内置 39 种常见不适：失眠、便秘、湿气重、风热感冒、痛风等<br/>可在欢迎页切换「对症食疗」浏览全部';
    }
    return;
  }

  document.getElementById('welcome').style.display = 'none';
  document.getElementById('result').classList.remove('show');
  document.getElementById('xhs-result').classList.remove('show');
  document.getElementById('not-found').classList.remove('show');
  document.getElementById('ai-error').classList.remove('show');
  document.getElementById('loading').classList.remove('show');

  const data = SHILIAO_DISEASE_DATA[key];
  window._shiliaoCurrentData = data;
  window._shiliaoContentType = 'disease';
  renderShiliaoDiseaseResult(data);
  document.getElementById('shiliao-result').classList.add('show');
  updateShiliaoTabsForMode('disease');
  switchShiliaoTab(
    'shiliao-detail',
    document.querySelector('#shiliao-tabs .shiliao-tab-btn[data-tab="shiliao-detail"]')
  );
}

function quickShiliaoDiseaseSearch(name) {
  const input = document.getElementById('shiliao-search-input');
  if (input) input.value = name;
  doShiliaoDiseaseSearch(name);
}

/** 从对症页跳转查看食材详情 */
function jumpToShiliaoIngredient(name) {
  if (!name) return;
  const key = resolveShiliaoKey(name);
  if (!key) {
    alert(`「${name}」暂未收录食材百科，用法见上方菜品说明`);
    return;
  }
  switchShiliaoMode('ingredient');
  const input = document.getElementById('shiliao-search-input');
  if (input) input.value = name;
  doShiliaoSearch(name);
}
