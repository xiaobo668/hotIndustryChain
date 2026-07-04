/**
 * 文档索引页 — 从 manifest.json 动态渲染卡片
 */

async function fetchDocsManifest(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to load manifest: ' + url);
  return res.json();
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderAnalysisCards(items, container) {
  container.innerHTML = items.map(function (item) {
    const tags = item.hasOrderRank ? '含订单榜核验' : '产业链梳理';
    const verify = item.verifyScripts && item.verifyScripts.length
      ? '<p class="verify">复验：' + item.verifyScripts.map(function (s) {
        return '<code>' + escapeHtml(s) + '</code>';
      }).join(' · ') + '</p>'
      : '';
    return ''
      + '<article class="card">'
      + '<h2><a href="' + escapeHtml(item.html) + '">' + escapeHtml(item.title) + '</a></h2>'
      + '<p class="meta">' + escapeHtml(item.generatedAt) + ' · ' + tags + ' · 链键：<code>' + escapeHtml(item.chainKey) + '</code></p>'
      + '<div class="links">'
      + '<a href="' + escapeHtml(item.html) + '">📄 在线阅读</a>'
      + '<a href="' + escapeHtml(item.md) + '">📝 Markdown</a>'
      + '<a href="' + escapeHtml(item.wechatHtml) + '">📱 公众号文稿</a>'
      + '</div>'
      + verify
      + '</article>';
  }).join('');
}

function renderWechatCards(items, container) {
  container.innerHTML = items.map(function (item) {
    const title = item.articleTitle || item.title;
    const parts = [item.generatedAt];
    if (item.hasChain) parts.push('产业链');
    if (item.hasOrderRank) parts.push('订单榜');
    parts.push('链键：<code>' + escapeHtml(item.chainKey) + '</code>');
    return ''
      + '<article class="card">'
      + '<h2><a href="' + escapeHtml(item.html) + '">' + escapeHtml(title) + '</a></h2>'
      + '<p class="meta">' + parts.join(' · ') + '</p>'
      + '<div class="links">'
      + '<a href="' + escapeHtml(item.html) + '">📱 预览并复制</a>'
      + '<a href="' + escapeHtml(item.md) + '">📝 Markdown</a>'
      + '</div>'
      + '</article>';
  }).join('');
}

async function initDocsIndexPage(options) {
  const container = document.getElementById(options.containerId);
  if (!container) return;
  try {
    const items = await fetchDocsManifest(options.manifestUrl);
    if (options.mode === 'analysis') {
      renderAnalysisCards(items, container);
    } else if (options.mode === 'wechat') {
      renderWechatCards(items, container);
    }
  } catch (err) {
    container.innerHTML = '<p class="sub" style="color:#f87171">加载文档列表失败，请通过 HTTP 服务器访问（见 LOCAL_DEBUG_GUIDE.md）</p>';
    console.error(err);
  }
}
