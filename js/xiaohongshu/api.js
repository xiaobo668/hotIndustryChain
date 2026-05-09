/**
 * 小红书 API 调用 (xiaohongshu/api.js)
 * - fetchAIXHS(categoryId, topicId): 调用后端 AI 接口生成小红书 FAQ 内容
 *
 * 依赖：API_CONFIG（全局配置）、buildXHSPrompt（topics.js）
 */

/**
 * 调用后端 AI 接口生成小红书 FAQ 内容
 * @param {string} categoryId - 领域ID
 * @param {string} topicId - 选题ID
 * @returns {Promise<{data: object, source: string}>}
 */
function fetchAIXHS(categoryId, topicId) {
  lastAIQuery = `${categoryId}::${topicId}`;
  lastAIMode = 'xhs';

  return new Promise((resolve, reject) => {
    const url = API_CONFIG.baseUrl + '/api/xhs';
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), API_CONFIG.timeout);

    if (typeof updateLoading === 'function') {
      updateLoading('📝 正在生成 FAQ 内容（Kimi）...');
    }

    // 构建 prompt
    const prompt = buildXHSPrompt(categoryId, topicId);

    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        category: categoryId,
        topic: topicId,
        prompt: prompt,
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
          updateLoading(`✨ ${label} FAQ 内容生成完成`);
        }
        setTimeout(() => resolve({ data: json.data, source }), 300);
      } else {
        reject(new Error(json.error || 'AI 返回数据为空'));
      }
    })
    .catch(err => {
      clearTimeout(timer);
      if (err.name === 'AbortError') {
        reject(new Error('请求超时，AI 正在思考中，请稍后重试'));
      } else {
        reject(err);
      }
    });
  });
}
