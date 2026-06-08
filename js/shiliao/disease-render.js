/**
 * 对症食疗内容渲染
 */
function renderShiliaoDiseaseResult(data) {
  if (!data) return;

  document.getElementById('shiliao-title').textContent = `${data.icon || '🏥'} ${data.name} · 对症食疗`;
  document.getElementById('shiliao-desc').textContent = data.summary || '';
  document.getElementById('shiliao-stats').innerHTML = `
    <div class="shiliao-stat">
      <div class="shiliao-stat-num">${(data.ingredients || []).length}</div>
      <div class="shiliao-stat-label">推荐食材</div>
    </div>
    <div class="shiliao-stat">
      <div class="shiliao-stat-num">${(data.dishes || []).length}</div>
      <div class="shiliao-stat-label">食疗菜品</div>
    </div>
    <div class="shiliao-stat">
      <div class="shiliao-stat-num">60s</div>
      <div class="shiliao-stat-label">口播脚本</div>
    </div>
    <div class="shiliao-stat">
      <div class="shiliao-stat-num" style="font-size:12px;color:#65a30d">${data.category || '对症'}</div>
      <div class="shiliao-stat-label">分类</div>
    </div>
  `;

  renderShiliaoDiseaseDetail(data);
  renderShiliaoDiseaseVoiceover(data);

  const posterPages = document.getElementById('shiliao-poster-pages');
  if (posterPages) posterPages.innerHTML = '';
}

function renderShiliaoDiseaseDetail(data) {
  const el = document.getElementById('shiliao-detail-content');
  if (!el) return;

  const principle = data.principle
    ? `<section class="shiliao-section">
      <h3 class="shiliao-section-title">📌 调理原则</h3>
      <div class="shiliao-disease-principle">${data.principle}</div>
    </section>`
    : '';

  const ingredients = (data.ingredients || [])
    .map(
      (ing) => `
    <div class="shiliao-ingredient-card" onclick="jumpToShiliaoIngredient('${ing.name}')" title="点击查看食材详情">
      <div class="shiliao-ingredient-name">${ing.name}</div>
      <div class="shiliao-ingredient-role">${ing.role}</div>
    </div>`
    )
    .join('');

  const dishes = (data.dishes || [])
    .map(
      (d) => `
    <div class="shiliao-dish-card shiliao-disease-dish-card">
      <div class="shiliao-dish-name">${d.name}</div>
      <div class="shiliao-dish-symptom"><span>食材：</span>${d.ingredients}</div>
      <div class="shiliao-dish-note">${d.note}</div>
    </div>`
    )
    .join('');

  el.innerHTML = `
    ${principle}
    <section class="shiliao-section">
      <h3 class="shiliao-section-title">🥬 推荐食材 <span class="shiliao-section-hint">点击可查看食材百科</span></h3>
      <div class="shiliao-ingredient-list">${ingredients}</div>
    </section>
    <section class="shiliao-section">
      <h3 class="shiliao-section-title">🍲 食疗菜品 · ${(data.dishes || []).length} 道</h3>
      <div class="shiliao-dish-list">${dishes}</div>
    </section>
    ${
      data.caution
        ? `<section class="shiliao-section shiliao-caution">
      <h3 class="shiliao-section-title">⚠️ 调理注意</h3>
      <p>${data.caution}</p>
    </section>`
        : ''
    }
    <p class="shiliao-disclaimer">以上内容整理自中医食疗文献，仅供参考，不构成医疗建议。疾病症状请及时就医。</p>
  `;
}

function renderShiliaoDiseaseVoiceover(data) {
  const el = document.getElementById('shiliao-voiceover-content');
  if (!el) return;
  const text = data.voiceover || '';
  const len = text.length;
  const estSec = Math.round(len / 4);
  const voiceTitle = data.voiceTitle || `${data.icon || ''} ${data.name} · 对症食疗口播`;
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
