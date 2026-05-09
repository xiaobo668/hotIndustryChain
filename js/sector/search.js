/**
 * 板块龙头（Sector）- 搜索模块
 * 负责板块龙头搜索主逻辑：缓存检查 → 调用API → 渲染
 */

function doSectorSearch(query) {
  // 先尝试 localStorage 缓存
  const cachedData = getCachedSector(query);
  if (cachedData) {
    setTimeout(() => {
      document.getElementById('loading').classList.remove('show');
      currentSector = cachedData;
      renderSectorResult(cachedData);
    }, 400);
    return;
  }

  // 显示加载中（先显示默认文字，等 API 返回后更新模型名称）
  updateSectorLoading('正在查询板块龙头数据...');

  // 调用后端 AI 接口
  fetchAISector(query)
    .then(({ data, source }) => {
      document.getElementById('loading').classList.remove('show');
      if (data) {
        cacheSector(query, data);
        currentSector = data;
        renderSectorResult(data, source);
      } else {
        document.getElementById('not-found').add('show');
      }
    })
    .catch(err => {
      console.error('AI 板块龙头生成失败:', err);
      document.getElementById('loading').classList.remove('show');
      showAIError(err.message || 'AI 服务暂时不可用，请稍后再试');
    });
}
