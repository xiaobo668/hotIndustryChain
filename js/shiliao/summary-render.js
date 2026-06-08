/**
 * 食疗汇总内容渲染
 */
function renderShiliaoSummaryResult(data) {
  if (!data) return;

  document.getElementById('shiliao-title').textContent = `${data.icon || '📋'} ${data.listTitle || data.name}`;
  document.getElementById('shiliao-desc').textContent = data.summary || '';
  document.getElementById('shiliao-stats').innerHTML = `
    <div class="shiliao-stat">
      <div class="shiliao-stat-num">${(data.items || []).length}</div>
      <div class="shiliao-stat-label">汇总食材</div>
    </div>
    <div class="shiliao-stat">
      <div class="shiliao-stat-num">${(data.items || []).length}</div>
      <div class="shiliao-stat-label">古籍出处</div>
    </div>
    <div class="shiliao-stat">
      <div class="shiliao-stat-num">60s</div>
      <div class="shiliao-stat-label">口播脚本</div>
    </div>
    <div class="shiliao-stat">
      <div class="shiliao-stat-num" style="font-size:12px;color:#65a30d">汇总</div>
      <div class="shiliao-stat-label">数据来源</div>
    </div>
  `;

  renderShiliaoSummaryDetail(data);
  renderShiliaoSummaryVoiceover(data);

  const posterPages = document.getElementById('shiliao-poster-pages');
  if (posterPages) posterPages.innerHTML = '';
}

function renderShiliaoSummaryDetail(data) {
  const el = document.getElementById('shiliao-detail-content');
  if (!el) return;

  const principle = data.principle
    ? `<section class="shiliao-section">
      <h3 class="shiliao-section-title">📌 选用原则</h3>
      <div class="shiliao-disease-principle">${data.principle}</div>
    </section>`
    : '';

  const items = (data.items || [])
    .map((item) => {
      const inWiki = resolveShiliaoKey(item.name);
      const itemClass = inWiki ? 'shiliao-summary-item shiliao-summary-item--clickable' : 'shiliao-summary-item';
      const clickAttr = inWiki
        ? `onclick="jumpToShiliaoIngredient('${item.name}')" title="点击查看食材百科"`
        : '';
      return `
    <div class="${itemClass}" ${clickAttr}>
      <div class="shiliao-summary-head">
        <span class="shiliao-summary-rank">${item.rank}</span>
        <span class="shiliao-summary-name">${item.name}</span>
        <span class="shiliao-summary-effect">${item.effect}</span>
      </div>
      <div class="shiliao-classic-card shiliao-summary-classic">
        <div class="shiliao-classic-book">${item.book}</div>
        <div class="shiliao-classic-quote">「${item.quote}」</div>
      </div>
    </div>`;
    })
    .join('');

  el.innerHTML = `
    ${principle}
    <section class="shiliao-section">
      <h3 class="shiliao-section-title">📜 ${data.listTitle || data.name} · 古籍出处</h3>
      <div class="shiliao-summary-list">${items}</div>
    </section>
    ${
      data.caution
        ? `<section class="shiliao-section shiliao-caution">
      <h3 class="shiliao-section-title">⚠️ 食用注意</h3>
      <p>${data.caution}</p>
    </section>`
        : ''
    }
    <p class="shiliao-disclaimer">古籍引文整理自中医典籍与食疗文献，仅供参考，不构成医疗建议。</p>
  `;
}

function renderShiliaoSummaryVoiceover(data) {
  const el = document.getElementById('shiliao-voiceover-content');
  if (!el) return;
  const text = data.voiceover || '';
  const len = text.length;
  const estSec = Math.round(len / 4);
  const voiceTitle = data.voiceTitle || `${data.icon || ''} ${data.listTitle || data.name}`;
  const voiceSummary = data.voiceSummary || data.summary || '';
  el.innerHTML = `
    <div class="shiliao-voice-summary">
      <div class="shiliao-voice-summary-title">${voiceTitle}</div>
      <div class="shiliao-voice-summary-body">${voiceSummary}</div>
    </div>
    <div class="shiliao-voice-section-label">🎙️ 60秒口播正文</div>
    <div class="shiliao-voice-meta">
      <span>约 ${len} 字</span>
      <span>朗读约 ${estSec} 秒（正常语速）</span>
      <span>建议 60 秒口播</span>
    </div>
    <div class="shiliao-voice-box" id="shiliao-voice-text">${text}</div>
    <div class="poster-actions" style="margin-top:16px">
      <button class="btn btn-primary shiliao-copy-voice-btn" onclick="copyShiliaoVoiceover()">📋 复制口播稿</button>
    </div>
  `;
}
