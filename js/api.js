/**
 * AI 接口调用（统一封装）
 * - fetchAIData(mode, query): 根据模式调用对应 AI 接口
 * - fetchAIIndustry(query): 产业链分析 AI 接口
 * - fetchAISector(query): 板块龙头 AI 接口
 * - retryAILastQuery(): 重试上次请求
 * - showAIError(msg): 显示错误提示
 */

/** 通用 AI 接口调用 */
function fetchAIData(mode, query) {
  lastAIQuery = query;
  lastAIMode = mode;
  const isSector = mode === 'sector';
  return isSector ? fetchAISector(query) : fetchAIIndustry(query);
}

/**
 * 调用后端 AI 接口生成产业链数据
 * @returns {Promise<{data: object, source: string}>}
 */
function fetchAIIndustry(industryName) {
  lastAIQuery = industryName;
  lastAIMode = 'industry';
  return new Promise((resolve, reject) => {
    const url = API_CONFIG.baseUrl + API_CONFIG.industryEndpoint;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), API_CONFIG.timeout);

    if (typeof updateLoading === 'function') updateLoading('🔗 正在分析产业链（Kimi）...');

    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ industry: industryName }),
      signal: controller.signal,
    })
    .then(res => res.json())
    .then(json => {
      clearTimeout(timer);
      if (json.success && json.data) {
        const source = json.source || 'ai';
        const label = MODEL_LABELS[source] || source;
        if (typeof updateLoading === 'function') updateLoading(`✨ ${label} 产业链完成`);
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

/**
 * 调用后端 AI 接口生成板块龙头数据
 * @returns {Promise<{data: object, source: string}>}
 */
function fetchAISector(sectorName) {
  lastAIQuery = sectorName;
  lastAIMode = 'sector';
  return new Promise((resolve, reject) => {
    const url = API_CONFIG.baseUrl + API_CONFIG.sectorEndpoint;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), API_CONFIG.timeout);

    if (typeof updateLoading === 'function') updateLoading('🐂 正在查询板块龙头（Kimi）...');

    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sector: sectorName }),
      signal: controller.signal,
    })
    .then(res => res.json())
    .then(json => {
      clearTimeout(timer);
      if (json.success && json.data) {
        const source = json.source || 'ai';
        const label = MODEL_LABELS[source] || source;
        if (typeof updateLoading === 'function') updateLoading(`✨ ${label} 龙头完成`);
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

/** 重试上次失败的 AI 请求（重新执行完整搜索） */
function retryAILastQuery() {
  if (!lastAIQuery) return;
  document.getElementById('ai-error').classList.remove('show');
  doSearch(lastAIQuery);
}

/** 显示 AI 错误提示 */
function showAIError(msg) {
  document.getElementById('ai-error-msg').textContent = msg;
  document.getElementById('ai-error').classList.add('show');
}
