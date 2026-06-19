/**
 * 职场模块 UI
 */
function initZhichangUI() {
  const input = document.getElementById('zhichang-poster-text');
  if (input && !input.value.trim()) {
    input.value = ZHICHANG_POSTER_TEMPLATE.sampleText;
  }
  renderZhichangWelcomeSamples();
  renderZhichangTemplatePreview(input ? input.value : ZHICHANG_POSTER_TEMPLATE.sampleText);
  bindZhichangEditor();
}

function bindZhichangEditor() {
  const input = document.getElementById('zhichang-poster-text');
  if (!input || input.dataset.bound === '1') return;
  input.dataset.bound = '1';

  let timer = null;
  input.addEventListener('input', () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      renderZhichangTemplatePreview(input.value);
    }, 280);
  });
}

function renderZhichangWelcomeSamples() {
  const grid = document.getElementById('zhichang-sample-grid');
  if (!grid || typeof ZHICHANG_SAMPLES === 'undefined') return;

  grid.innerHTML = ZHICHANG_SAMPLES.map(
    (item) => `
    <div class="welcome-card zhichang-welcome-card" onclick="applyZhichangSampleById('${item.id}')">
      <div class="welcome-card-icon">💼</div>
      <div class="welcome-card-name">${item.title}</div>
      <div class="zhichang-card-preview">${item.text.replace(/\n/g, ' · ')}</div>
    </div>`
  ).join('');
}

function applyZhichangSampleById(id) {
  const item = ZHICHANG_SAMPLES.find((s) => s.id === id);
  if (item) applyZhichangSample(item.text);
}

function refreshZhichangTemplatePreview() {
  const input = document.getElementById('zhichang-poster-text');
  renderZhichangTemplatePreview(input ? input.value : ZHICHANG_POSTER_TEMPLATE.sampleText);
}
