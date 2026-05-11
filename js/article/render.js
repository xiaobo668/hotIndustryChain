/**
 * 公众号文章渲染 (article/render.js)
 * - renderArticle(data, industryData, sectorData): 渲染公众号文章 + 产业链/龙头数据卡片
 * - copyArticleFull(): 复制文章全文（含格式）到剪贴板
 * - getArticleMarkdown(): 获取 Markdown 格式全文（含数据卡片）
 *
 * 依赖：currentArticleData（全局状态，由 api.js 管理）
 *       currentIndustry / currentSector（全局状态，由 industry/search.js 管理）
 */

/** 存储当前渲染用的产业链和龙头数据 */
let _articleIndustryData = null;
let _articleSectorData = null;

/**
 * 渲染公众号文章（含文末产业链+龙头数据卡片）
 * @param {object} data - AI 返回的文章数据 { title, subtitle, sections, conclusion, risk_warning }
 * @param {object} [industryData] - 产业链数据（可选，用于渲染数据卡片）
 * @param {object} [sectorData] - 板块龙头数据（可选，用于渲染数据卡片）
 */
function renderArticle(data, industryData, sectorData) {
  currentArticleData = data;
  _articleIndustryData = industryData || window.currentIndustry || null;
  _articleSectorData = sectorData || window.currentSector || null;

  const container = document.getElementById('article-content');
  if (!container) return;

  // 构建文章 HTML
  let html = '';

  // 副标题
  if (data.subtitle) {
    html += `<div class="article-subtitle">${escapeHtml(data.subtitle)}</div>`;
  }

  // 各章节
  if (Array.isArray(data.sections)) {
    data.sections.forEach((section) => {
      html += `<div class="article-section">`;
      if (section.heading) {
        html += `<h3 class="article-heading">${escapeHtml(section.heading)}</h3>`;
      }
      if (section.content) {
        const paragraphs = section.content.split('\n\n').filter(p => p.trim());
        paragraphs.forEach(p => {
          html += `<p class="article-paragraph">${formatArticleText(p.trim())}</p>`;
        });
      }
      html += `</div>`;
    });
  }

  // 结论/结尾
  if (data.conclusion) {
    html += `<div class="article-conclusion">`;
    const conclusionParagraphs = data.conclusion.split('\n\n').filter(p => p.trim());
    conclusionParagraphs.forEach(p => {
      html += `<p class="article-paragraph">${formatArticleText(p.trim())}</p>`;
    });
    html += `</div>`;
  }

  // 风险提示
  if (data.risk_warning) {
    html += `<div class="article-risk">⚠️ ${escapeHtml(data.risk_warning)}</div>`;
  }

  // ===== 分隔线 + 数据卡片衔接区 =====
  html += `<div class="article-divider"></div>`;

  // ===== 产业链全景图卡片 =====
  if (_articleIndustryData) {
    html += renderIndustryCard(_articleIndustryData);
  }

  // ===== 板块龙头一览卡片 =====
  if (_articleSectorData) {
    html += renderSectorCard(_articleSectorData);
  }

  // 字数统计
  if (data.word_count) {
    html += `<div class="article-word-count">📊 全文约 ${escapeHtml(data.word_count)} 字 · 文末附产业链图谱 & 龙头名单</div>`;
  }

  container.innerHTML = html;

  // 更新标题区
  const titleEl = document.getElementById('article-title');
  if (titleEl && data.title) {
    titleEl.textContent = data.title;
  }
}

// ==================== 数据卡片渲染 ====================

/**
 * 渲染产业链数据卡片
 */
function renderIndustryCard(data) {
  const name = escapeHtml(data.name || '行业');
  let html = '';

  html += `<div class="data-card" id="article-industry-card">
    <div class="data-card-header">
      <span class="data-card-icon">🔗</span>
      <h3 class="data-card-title">${name} — 产业链全景</h3>
    </div>
    <div class="data-card-body">`;

  // 上游
  if (Array.isArray(data.upstream) && data.upstream.length > 0) {
    html += `<div class="chain-stage"><div class="chain-stage-label">📍 上游</div><div class="chain-stage-list">`;
    data.upstream.forEach(seg => {
      html += `<div class="chain-segment">
        <div class="segment-name">${escapeHtml(seg.name)}</div>`;
      if (Array.isArray(seg.companies)) {
        seg.companies.forEach(co => {
          if (!stripStockCode(co.name)) return; // 过滤 ST / 退市公司
          html += `<div class="company-item">
            <span class="company-name">${escapeHtml(stripStockCode(co.name))}</span>${co.code ? `<span class="company-code">${escapeHtml(co.code)}</span>` : ''}
            ${co.highlight ? `<span class="company-hl">${escapeHtml(co.highlight)}</span>` : ''}
          </div>`;
        });
      }
      html += `</div>`;
    });
    html += `</div></div>`;
  }

  // 中游
  if (Array.isArray(data.midstream) && data.midstream.length > 0) {
    html += `<div class="chain-stage"><div class="chain-stage-label">🏭 中游</div><div class="chain-stage-list">`;
    data.midstream.forEach(seg => {
      html += `<div class="chain-segment">
        <div class="segment-name">${escapeHtml(seg.name)}</div>`;
      if (Array.isArray(seg.companies)) {
        seg.companies.forEach(co => {
          if (!stripStockCode(co.name)) return; // 过滤 ST / 退市公司
          html += `<div class="company-item">
            <span class="company-name">${escapeHtml(stripStockCode(co.name))}</span>${co.code ? `<span class="company-code">${escapeHtml(co.code)}</span>` : ''}
            ${co.highlight ? `<span class="company-hl">${escapeHtml(co.highlight)}</span>` : ''}
          </div>`;
        });
      }
      html += `</div>`;
    });
    html += `</div></div>`;
  }

  // 下游
  if (Array.isArray(data.downstream) && data.downstream.length > 0) {
    html += `<div class="chain-stage"><div class="chain-stage-label">📱 下游</div><div class="chain-stage-list">`;
    data.downstream.forEach(seg => {
      html += `<div class="chain-segment">
        <div class="segment-name">${escapeHtml(seg.name)}</div>`;
      if (Array.isArray(seg.companies)) {
        seg.companies.forEach(co => {
          if (!stripStockCode(co.name)) return; // 过滤 ST / 退市公司
          html += `<div class="company-item">
            <span class="company-name">${escapeHtml(stripStockCode(co.name))}</span>${co.code ? `<span class="company-code">${escapeHtml(co.code)}</span>` : ''}
            ${co.highlight ? `<span class="company-hl">${escapeHtml(co.highlight)}</span>` : ''}
          </div>`;
        });
      }
      html += `</div>`;
    });
    html += `</div></div>`;
  }

  html += `</div></div>`;
  return html;
}

/**
 * 渲染板块龙头数据卡片
 */
function renderSectorCard(data) {
  let html = '';
  html += `<div class="data-card" id="article-sector-card">
    <div class="data-card-header">
      <span class="data-card-icon">⚔️</span>
      <h3 class="data-card-title">板块龙头一览</h3>
    </div>
    <div class="data-card-body">`;

  // 中军（趋势龙头）
  if (data.center) {
    const centerName = data.center.name || '中军';
    html += `<div class="leader-group">
      <div class="leader-label">🛡️ ${escapeHtml(centerName)}（趋势龙头）</div>
      <div class="leader-list">`;
    if (Array.isArray(data.center.companies)) {
      data.center.companies.forEach((co, i) => {
        html += `<div class="leader-rank-item">
          <span class="rank-num">${i + 1}</span>
          <span class="rank-name">${escapeHtml(co.name)}</span>${co.code ? `<span class="rank-code">${escapeHtml(co.code)}</span>` : ''}
          ${co.reason ? `<span class="rank-reason">${escapeHtml(co.reason)}</span>` : ''}
        </div>`;
      });
    }
    html += `</div></div>`;
  }

  // 前锋（情绪龙头）
  if (data.vanguard) {
    const vanName = data.vanguard.name || '前锋';
    html += `<div class="leader-group">
      <div class="leader-label">🗡️ ${escapeHtml(vanName)}（情绪龙头）</div>
      <div class="leader-list">`;
    if (Array.isArray(data.vanguard.companies)) {
      data.vanguard.companies.forEach((co, i) => {
        html += `<div class="leader-rank-item">
          <span class="rank-num">${i + 1}</span>
          <span class="rank-name">${escapeHtml(co.name)}</span>${co.code ? `<span class="rank-code">${escapeHtml(co.code)}</span>` : ''}
          ${co.reason ? `<span class="rank-reason">${escapeHtml(co.reason)}</span>` : ''}
        </div>`;
      });
    }
    html += `</div></div>`;
  }

  html += `</div></div>`;
  return html;
}

// ==================== 文本工具函数 ====================

/** 将文章中的简单文本格式化为富文本 */
function formatArticleText(text) {
  return escapeHtml(text)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br>');
}

/** HTML 转义 */
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// ==================== 复制功能 ====================

/**
 * 复制文章全文到剪贴板（Markdown 格式，含产业链+龙头数据）
 */
async function copyArticleFull() {
  if (!currentArticleData) {
    alert('暂无文章内容');
    return;
  }

  const text = getArticleMarkdown();
  try {
    await navigator.clipboard.writeText(text);
    const btn = document.getElementById('btn-copy-article');
    if (btn) {
      const origText = btn.textContent;
      btn.textContent = '✅ 已复制';
      setTimeout(() => btn.textContent = origText, 2000);
    }
  } catch (e) {
    // fallback: textarea 方式
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      const btn = document.getElementById('btn-copy-article');
      if (btn) {
        const origText = btn.textContent;
        btn.textContent = '✅ 已复制';
        setTimeout(() => btn.textContent = origText, 2000);
      }
    } catch (e2) {
      alert('复制失败，请手动选择文本复制');
    }
    document.body.removeChild(ta);
  }
}

/**
 * 获取 Markdown 格式的文章全文（包含产业链+龙头数据卡片）
 */
function getArticleMarkdown() {
  const d = currentArticleData;
  if (!d) return '';

  let md = `# ${d.title}\n\n`;
  if (d.subtitle) md += `> ${d.subtitle}\n\n`;

  if (Array.isArray(d.sections)) {
    d.sections.forEach(s => {
      if (s.heading) md += `## ${s.heading}\n\n`;
      if (s.content) md += `${s.content}\n\n`;
    });
  }

  if (d.conclusion) md += `### 结语\n\n${d.conclusion}\n\n`;
  if (d.risk_warning) md += `> ⚠️ ${d.risk_warning}\n\n`;

  // 追加产业链数据
  if (_articleIndustryData) {
    md += `---\n## 🔗 ${_articleIndustryData.name || ''} — 产业链全景\n\n`;
    ['upstream', 'midstream', 'downstream'].forEach((stage, si) => {
      const labels = ['📍 上游', '🏭 中游', '📱 下游'];
      const stageData = _articleIndustryData[stage];
      if (Array.isArray(stageData) && stageData.length > 0) {
        md += `**${labels[si]}**\n\n`;
        stageData.forEach(seg => {
          md += `- **${seg.name}**\n`;
          if (Array.isArray(seg.companies)) {
            seg.companies.forEach(co => {
              md += `  - ${co.name}${co.code ? ` (${co.code})` : ''}${co.highlight ? ` — ${co.highlight}` : ''}\n`;
            });
          }
        });
        md += '\n';
      }
    });
  }

  // 追加龙头数据
  if (_articleSectorData) {
    md += `---\n## ⚔️ 板块龙头一览\n\n`;
    if (_articleSectorData.center) {
      md += `**🛡️ ${_articleSectorData.center.name || '中军'}（趋势龙头）**\n\n`;
      if (Array.isArray(_articleSectorData.center.companies)) {
        _articleSectorData.center.companies.forEach((co, i) => {
          md += `${i + 1}. ${co.name}${co.code ? ` (${co.code})` : ''}${co.reason ? ` — ${co.reason}` : ''}\n`;
        });
      }
      md += '\n';
    }
    if (_articleSectorData.vanguard) {
      md += `**🗡️ ${_articleSectorData.vanguard.name || '前锋'}（情绪龙头）**\n\n`;
      if (Array.isArray(_articleSectorData.vanguard.companies)) {
        _articleSectorData.vanguard.companies.forEach((co, i) => {
          md += `${i + 1}. ${co.name}${co.code ? ` (${co.code})` : ''}${co.reason ? ` — ${co.reason}` : ''}\n`;
        });
      }
    }
  }

  return md;
}
