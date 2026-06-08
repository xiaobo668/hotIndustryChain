/**
 * 食疗内容渲染
 */
function renderShiliaoResult(data) {
  if (!data) return;

  document.getElementById('shiliao-title').textContent = `${data.icon || '🥗'} ${data.name} · 食疗养生`;
  document.getElementById('shiliao-desc').textContent = data.summary;
  document.getElementById('shiliao-stats').innerHTML = `
    <div class="shiliao-stat">
      <div class="shiliao-stat-num">${(data.classics || []).length}</div>
      <div class="shiliao-stat-label">古籍记载</div>
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
      <div class="shiliao-stat-num" style="font-size:12px;color:#65a30d">本地</div>
      <div class="shiliao-stat-label">数据来源</div>
    </div>
  `;

  renderShiliaoDetail(data);
  renderShiliaoVoiceover(data);

  const posterPages = document.getElementById('shiliao-poster-pages');
  if (posterPages) posterPages.innerHTML = '';
}

function renderShiliaoDetail(data) {
  const el = document.getElementById('shiliao-detail-content');
  if (!el) return;

  const effects = (data.effects || [])
    .map((e) => `<li class="shiliao-effect-item">${e}</li>`)
    .join('');

  const classics = (data.classics || [])
    .map(
      (c) => `
    <div class="shiliao-classic-card">
      <div class="shiliao-classic-book">${c.book}</div>
      <div class="shiliao-classic-quote">「${c.quote}」</div>
    </div>`
    )
    .join('');

  const dishes = (data.dishes || [])
    .map(
      (d) => `
    <div class="shiliao-dish-card">
      <div class="shiliao-dish-name">${d.name}</div>
      <div class="shiliao-dish-symptom"><span>缓解：</span>${d.symptom}</div>
      <div class="shiliao-dish-note">${d.note}</div>
    </div>`
    )
    .join('');

  el.innerHTML = `
    <section class="shiliao-section">
      <h3 class="shiliao-section-title">🌿 养生医疗作用</h3>
      <ul class="shiliao-effect-list">${effects}</ul>
    </section>
    <section class="shiliao-section">
      <h3 class="shiliao-section-title">📜 古籍记载</h3>
      <div class="shiliao-classic-list">${classics}</div>
    </section>
    <section class="shiliao-section">
      <h3 class="shiliao-section-title">🍲 食疗菜品 · 对症调理</h3>
      <div class="shiliao-dish-list">${dishes}</div>
    </section>
    ${
      data.caution
        ? `<section class="shiliao-section shiliao-caution">
      <h3 class="shiliao-section-title">⚠️ 食用注意</h3>
      <p>${data.caution}</p>
    </section>`
        : ''
    }
    <p class="shiliao-disclaimer">以上内容整理自中医典籍与食疗文献，仅供参考，不构成医疗建议。身体不适请就医。</p>
  `;
}

function renderShiliaoVoiceover(data) {
  const el = document.getElementById('shiliao-voiceover-content');
  if (!el) return;
  const text = data.voiceover || '';
  const len = text.length;
  const estSec = Math.round(len / 4);
  const voiceTitle = data.voiceTitle || `${data.icon || ''} ${data.name} · 食疗口播要点`;
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

function copyShiliaoVoiceover() {
  const data = window._shiliaoCurrentData;
  if (!data || !data.voiceover) {
    alert('暂无口播稿');
    return;
  }
  navigator.clipboard
    .writeText(data.voiceover)
    .then(() => alert('✅ 口播稿已复制到剪贴板'))
    .catch(() => {
      const ta = document.createElement('textarea');
      ta.value = data.voiceover;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
      alert('✅ 口播稿已复制');
    });
}
