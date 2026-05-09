/**
 * 统一搜索模块 (industry/search.js)
 * - doSearch(query): 主入口，同时调用产业链 + 板块龙头 API
 *
 * 搜索流程：
 *   1. 同时检查两个 localStorage 缓存
 *   2. 缓存未命中的并行调用 Kimi API（不再降级 DeepSeek）
 *   3. 先返回的先显示，两者都完成后隐藏加载
 */

/** 主搜索入口：同时触发产业链 + 板块龙头分析 */
function doSearch(query) {
  if (!query || !query.trim()) return;
  query = query.trim();

  // 隐藏无关 UI
  document.getElementById('welcome').style.display = 'none';
  document.getElementById('result').classList.remove('show');
  document.getElementById('not-found').classList.remove('show');
  document.getElementById('ai-error').classList.remove('show');
  document.getElementById('loading').classList.add('show');

  // 重置状态
  currentIndustry = null;
  currentSector = null;
  document.getElementById('sector-header').style.display = 'none';

  updateLoading('正在连接 AI 服务（Kimi）...');

  // 检查缓存
  const industryCached = getCachedIndustry(query);
  const sectorCached = getCachedSector(query);

  let industryDone = false;
  let sectorDone = false;

  const checkAllDone = () => {
    if (industryDone && sectorDone) {
      document.getElementById('loading').classList.remove('show');
      if (currentIndustry || currentSector) {
        document.getElementById('result').classList.add('show');
        if (currentIndustry) {
          switchTab('table', document.querySelector('#main-tabs .tab-btn'));
        } else if (currentSector) {
          switchTab('leader', document.querySelectorAll('#main-tabs .tab-btn')[3]);
        }
      } else {
        document.getElementById('not-found').classList.add('show');
      }
    }
  };

  // ---- 产业链 ----
  if (industryCached) {
    currentIndustry = industryCached;
    renderResult(industryCached, 'cache');
    industryDone = true;
    checkAllDone();
  } else {
    fetchAIIndustry(query)
      .then(({ data, source }) => {
        if (data) {
          cacheIndustry(query, data);
          currentIndustry = data;
          renderResult(data, source);
          if (!sectorDone) {
            switchTab('table', document.querySelector('#main-tabs .tab-btn'));
          }
        }
        industryDone = true;
        checkAllDone();
      })
      .catch(err => {
        console.error('[产业链] AI 生成失败:', err);
        industryDone = true;
        checkAllDone();
      });
  }

  // ---- 板块龙头 ----
  if (sectorCached) {
    currentSector = sectorCached;
    renderSectorHeader(sectorCached, 'cache');
    sectorDone = true;
    checkAllDone();
  } else {
    fetchAISector(query)
      .then(({ data, source }) => {
        if (data) {
          cacheSector(query, data);
          currentSector = data;
          renderSectorHeader(data, source);
        }
        sectorDone = true;
        checkAllDone();
      })
      .catch(err => {
        console.error('[板块龙头] AI 生成失败:', err);
        sectorDone = true;
        checkAllDone();
      });
  }
}

/** 更新加载文字 */
function updateLoading(text) {
  const el = document.querySelector('#loading .loading-text');
  if (el) el.textContent = text;
}
