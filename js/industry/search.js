/**
 * 统一搜索模块 (industry/search.js)
 * - doSearch(query): 主入口，同时调用产业链 + 板块龙头 API
 * - doArticleGeneration(query, industryData, sectorData): 产业链+龙头完成后触发文章生成
 *
 * 搜索流程：
 *   1. 本地 data.js / sector-data.js 优先
 *   2. 同时检查两个 localStorage 缓存
 *   3. 缓存未命中的并行调用 Kimi API
 *   4. 两者都完成后隐藏加载
 */

// 注：currentSearchQuery 和 articleGenerating 是全局变量，定义在 state.js 中

/** 主搜索入口：同时触发产业链 + 板块龙头分析 */
function doSearch(query) {
  if (!query || !query.trim()) return;
  query = query.trim();
  currentSearchQuery = query;
  articleGenerating = false;

  // 隐藏无关 UI（同时隐藏小红书结果区）
  document.getElementById('welcome').style.display = 'none';
  document.getElementById('result').classList.remove('show');
  document.getElementById('xhs-result').classList.remove('show');
  document.getElementById('not-found').classList.remove('show');
  document.getElementById('ai-error').classList.remove('show');
  document.getElementById('loading').classList.add('show');

  // 重置状态
  currentIndustry = null;
  currentSector = null;
  document.getElementById('sector-header').style.display = 'none';

  // 重置文章区域
  resetArticleUI();

  // 检查本地数据库（data.js / sector-data.js 中的预定义数据）
  const localIndustry = searchIndustry(query);
  const localSector = typeof searchSector === 'function' ? searchSector(query) : null;

  // 根据是否有本地数据调整加载文本
  if (localIndustry && localSector) {
    updateLoading('📦 正在加载本地产业链与板块龙头...');
  } else if (localIndustry) {
    updateLoading('📦 正在加载本地产业链数据...');
  } else if (localSector) {
    updateLoading('📦 正在加载本地板块龙头数据...');
  } else {
    updateLoading('正在连接 AI 服务（Kimi）...');
  }

  // 检查缓存
  const industryCached = getCachedIndustry(query);
  const sectorCached = getCachedSector(query);

  let industryDone = false;
  let sectorDone = false;

  const checkAllDone = () => {
    if (industryDone && sectorDone) {
      // 延迟一点隐藏 loading，让用户看到"完成"提示
      setTimeout(() => {
        document.getElementById('loading').classList.remove('show');
        if (currentIndustry || currentSector) {
          document.getElementById('result').classList.add('show');
          if (currentIndustry) {
            switchTab('table', document.querySelector('#main-tabs .tab-btn'));
          } else if (currentSector) {
            switchTab('leader', document.querySelectorAll('#main-tabs .tab-btn')[3]);
          }
          // 注：公众号文章不再自动生成，改为点击 Tab 时生成
        } else {
          document.getElementById('not-found').classList.add('show');
        }
      }, 500);
    }
  };

  // ---- 产业链 ----
  // 优先级：本地数据 > 缓存 > API
  if (localIndustry) {
    currentIndustry = localIndustry;
    renderResult(localIndustry, 'local');
    cacheIndustry(query, localIndustry);  // 缓存本地数据
    industryDone = true;
    checkAllDone();
  } else if (industryCached) {
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
  // 优先级：本地数据 > 缓存 > API
  if (localSector) {
    currentSector = localSector;
    renderSectorHeader(localSector, 'local');
    cacheSector(query, localSector);
    sectorDone = true;
    checkAllDone();
  } else if (sectorCached) {
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

/**
 * 触发公众号文章生成（在产业链+龙头完成后自动调用）
 */
function triggerArticleGeneration(query) {
  console.log('[triggerArticleGeneration] 被调用, query=', query, 'articleGenerating=', articleGenerating);
  if (!currentIndustry && !currentSector) {
    console.warn('[文章生成] 跳过：产业链和龙头数据都为空');
    return;
  }

  const articleBtn = document.getElementById('tab-article-btn');

  // 标记正在生成
  articleGenerating = true;

  // 更新 tab 按钮状态：显示 loading
  if (articleBtn) {
    articleBtn.innerHTML = '⏳ 写作中...';
    articleBtn.style.opacity = '0.7';
  }

  // 确保数据是有效的再发送给后端
  const industryData = currentIndustry || null;
  const sectorData = currentSector || null;

  fetchAIArticle(query, industryData, sectorData)
    .then(({ data, source }) => {
      if (data) {
        renderArticle(data, industryData, sectorData);
        showArticleContent();

        // 恢复 tab 按钮
        if (articleBtn) {
          articleBtn.innerHTML = '📝 公众号文章';
          articleBtn.style.opacity = '1';
        }
      } else {
        throw new Error('AI 返回数据为空');
      }
      articleGenerating = false;
    })
    .catch(err => {
      console.error('[公众号文章] AI 生成失败:', err);
      articleGenerating = false;

      // 显示错误状态在文章面板中
      showArticleError(err.message || '文章生成失败，请点击重试');

      // 恢复 tab 按钮（带重试提示）
      if (articleBtn) {
        articleBtn.innerHTML = '📝 公众号文章(点我重试)';
        articleBtn.onclick = function() { retryArticle(); };
      }
    });
}

/** 重试文章生成 */
function retryArticle() {
  if (!currentSearchQuery) return;
  resetArticleUI();
  triggerArticleGeneration(currentSearchQuery);

  // 恢复按钮文字和事件
  const articleBtn = document.getElementById('tab-article-btn');
  if (articleBtn) {
    articleBtn.innerHTML = '📝 公众号文章';
    articleBtn.onclick = function() { switchTab('article', this); };
  }
}

/** 重置文章 UI 状态 */
function resetArticleUI() {
  const contentEl = document.getElementById('article-content');
  const titleEl = document.getElementById('article-title');
  const loadingEl = document.getElementById('article-loading');
  if (contentEl) { contentEl.innerHTML = ''; contentEl.classList.remove('show'); }
  if (titleEl) titleEl.textContent = '';
  if (loadingEl) loadingEl.style.display = 'block';
}

/** 显示文章内容（隐藏 loading） */
function showArticleContent() {
  const loadingEl = document.getElementById('article-loading');
  const contentEl = document.getElementById('article-content');
  if (loadingEl) loadingEl.style.display = 'none';
  if (contentEl) contentEl.classList.add('show');
}

/** 在文章面板中显示错误 */
function showArticleError(msg) {
  const loadingEl = document.getElementById('article-loading');
  const contentEl = document.getElementById('article-content');
  if (loadingEl) loadingEl.style.display = 'none';
  if (contentEl) {
    contentEl.classList.add('show');
    contentEl.innerHTML = `<div style="text-align:center;padding:40px;color:#F59E0B;">
      <p style="font-size:18px;margin-bottom:12px;">⚠️ 文章生成失败</p>
      <p style="color:var(--text-muted);margin-bottom:16px;">${escapeHtml(msg)}</p>
      <button class="btn btn-primary" onclick="retryArticle()">🔄 重新生成</button>
    </div>`;
  }
}

/** 更新加载文字 */
function updateLoading(text) {
  const el = document.querySelector('#loading .loading-text');
  if (el) el.textContent = text;
}
