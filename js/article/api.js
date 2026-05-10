
/**
 * 公众号文章 API 调用 (article/api.js)
 * - fetchAIArticle(query, industryData, sectorData): 调用后端生成公众号文章
 *
 * 依赖：API_CONFIG（全局配置）
 */

/** 当前文章数据 */
let currentArticleData = null;

/**
 * 调用后端 AI 接口生成公众号文章
 * @param {string} query - 行业/板块名称
 * @param {object} industryData - 产业链数据（可选）
 * @param {object} sectorData - 板块龙头数据（可选）
 * @returns {Promise<{data: object, source: string}>}
 */
function fetchAIArticle(query, industryData, sectorData) {
  lastAIQuery = query;
  lastAIMode = 'article';

  return new Promise((resolve, reject) => {
    const url = API_CONFIG.baseUrl + '/api/article';
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), API_CONFIG.articleTimeout || 180000);

    if (typeof updateLoading === 'function') {
      updateLoading('✍️ 豆包正在撰写文章（AI推理+写作中，预计1-2分钟）...');
    }

    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: query,
        industryData: industryData || null,
        sectorData: sectorData || null,
      }),
      signal: controller.signal,
    })
    .then(res => res.json())
    .then(json => {
      clearTimeout(timer);
      if (json.success && json.data) {
        const source = json.source || 'ai';
        const label = MODEL_LABELS[source] || source;
        if (typeof updateLoading === 'function') {
          updateLoading(`✨ ${label} 文章生成完成`);
        }
        setTimeout(() => resolve({ data: json.data, source }), 300);
      } else {
        reject(new Error(json.error || 'AI 返回数据为空'));
      }
    })
    .catch(err => {
      clearTimeout(timer);
      if (err.name === 'AbortError') {
        reject(new Error('请求超时，AI 正在写作中，请稍后重试'));
      } else {
        reject(err);
      }
    });
  });
}
