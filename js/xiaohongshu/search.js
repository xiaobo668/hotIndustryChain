/**
 * 小红书搜索模块 (xiaohongshu/search.js)
 * - doXHSSearch(categoryId, topicId): 主入口，触发 FAQ 内容生成
 * - fetchAIXHS(categoryId, topicId): 调用后端 AI 接口生成小红书内容
 *
 * 流程：
 *   1. 检查 localStorage 缓存
 *   2. 缓存未命中则调用 Kimi API 生成
 *   3. 渲染结果到独立的小红书结果区（#xhs-result）
 */

// 注意：currentXHSData 是全局变量，在 state.js 中定义
// 本地不使用 let/const 声明，直接使用全局变量

/** 小红书缓存前缀 */
const XHS_CACHE_PREFIX = 'xhs_faq_';

/**
 * 小红书搜索主入口
 * @param {string} categoryId - 领域ID (如 'pet-cat')
 * @param {string} topicId - 选题ID (如 'cat-newbie-20')
 */
function doXHSSearch(categoryId, topicId) {
  if (!categoryId || !topicId) return;

  const category = XHS_TOPICS[categoryId];
  if (!category) {
    console.error('[小红书] 未找到领域:', categoryId);
    return;
  }

  // 找到选题信息
  let topicInfo = null;
  for (const t of category.topics) {
    if (t.id === topicId) { topicInfo = t; break; }
  }
  if (!topicInfo) topicInfo = category.topics[0];

  // UI 状态切换 —— 隐藏产业链区域，显示小红书 loading
  document.getElementById('welcome').style.display = 'none';
  document.getElementById('result').classList.remove('show');
  document.getElementById('xhs-result').classList.remove('show');
  document.getElementById('not-found').classList.remove('show');
  document.getElementById('ai-error').classList.remove('show');
  document.getElementById('loading').classList.add('show');

  updateLoading(`📝 正在生成 ${topicInfo.title} 的 FAQ 内容（Kimi）...`);

  currentXHSData = null;

  // 构建缓存 key
  const cacheKey = `${categoryId}::${topicId}`;

  // 检查缓存
  const cached = getXHSCached(cacheKey);
  if (cached) {
    updateLoading('✅ 从本地缓存加载');
    setTimeout(() => {
      currentXHSData = cached;
      renderXHSResult(cached, categoryId, topicInfo, 'cache');
      document.getElementById('loading').classList.remove('show');
      document.getElementById('xhs-result').classList.add('show');
      switchXHSTab('xhs-preview', document.querySelector('#xhs-tabs .xhs-tab-btn[data-tab="xhs-preview"]'));
    }, 300);
    return;
  }

  // 调用 AI 生成
  fetchAIXHS(categoryId, topicId)
    .then(({ data, source }) => {
      if (data) {
        cacheXHSData(cacheKey, data);
        currentXHSData = data;
        renderXHSResult(data, categoryId, topicInfo, source);
        document.getElementById('loading').classList.remove('show');
        document.getElementById('xhs-result').classList.add('show');
        switchXHSTab('xhs-preview', document.querySelector('#xhs-tabs .xhs-tab-btn[data-tab="xhs-preview"]'));
      } else {
        document.getElementById('loading').classList.remove('show');
        showAIError('AI 返回数据为空，请重试');
      }
    })
    .catch(err => {
      console.error('[小红书] AI 生成失败:', err);
      document.getElementById('loading').classList.remove('show');
      showAIError(err.message || 'FAQ 内容生成失败，请重试');
    });
}

// ==================== 缓存操作 ====================

function getXHSCached(key) {
  try {
    const raw = localStorage.getItem(XHS_CACHE_PREFIX + key);
    if (!raw) return null;
    const item = JSON.parse(raw);
    if (Date.now() - item.ts > CACHE_TTL) {
      localStorage.removeItem(XHS_CACHE_PREFIX + key);
      return null;
    }
    return item.data;
  } catch (e) {
    return null;
  }
}

function cacheXHSData(key, data) {
  try {
    localStorage.setItem(XHS_CACHE_PREFIX + key, JSON.stringify({ data, ts: Date.now() }));
  } catch (e) {
    console.warn('[小红书] 缓存写入失败:', e);
  }
}
