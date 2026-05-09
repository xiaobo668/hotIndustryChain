/**
 * 产业链搜索模块 (industry/search.js)
 * - doIndustrySearch(query): 产业链搜索主逻辑（缓存检查 → 调用API → 渲染）
 *
 * 依赖（已在其他模块中定义的全局函数）：
 *   getCachedIndustry, fetchAIIndustry, cacheIndustry, renderResult
 *   updateIndustryLoading, showAIError
 *   currentIndustry（全局变量）
 */

function doIndustrySearch(query) {
  // 先尝试 localStorage 缓存
  const cachedData = getCachedIndustry(query);
  if (cachedData) {
    setTimeout(() => {
      document.getElementById('loading').classList.remove('show');
      currentIndustry = cachedData;
      renderResult(cachedData, 'cache');
    }, 400);
    return;
  }

  // 显示加载中（先显示默认文字，等 API 返回后更新模型名称）
  updateIndustryLoading('正在连接 AI 服务（Kimi）...');

  // 缓存也没有 → 调用后端 AI 接口
  fetchAIIndustry(query)
    .then(({ data, source }) => {
      document.getElementById('loading').classList.remove('show');
      if (data) {
        cacheIndustry(query, data);
        currentIndustry = data;
        renderResult(data, source);
      } else {
        document.getElementById('not-found').classList.add('show');
      }
    })
    .catch(err => {
      console.error('AI 产业链生成失败:', err);
      document.getElementById('loading').classList.remove('show');
      showAIError(err.message || 'AI 服务暂时不可用，请稍后再试');
    });
}
