/**
 * 产业链科普 · 四段式口播模板 UI
 */
function copyChainPopText(text, statusEl) {
  if (!text) return;
  navigator.clipboard.writeText(text).then(
    () => {
      if (statusEl) {
        statusEl.textContent = '✅ 已复制';
        setTimeout(() => { statusEl.textContent = ''; }, 2000);
      } else {
        alert('✅ 已复制到剪贴板');
      }
    },
    () => alert('复制失败，请手动选择文本')
  );
}

function renderChainPopIndustrySelector(containerId, onSelect) {
  const container = document.getElementById(containerId);
  if (!container || typeof CHAIN_POP_SCIENCE_ITEMS === 'undefined') return;
  container.innerHTML = CHAIN_POP_SCIENCE_ITEMS.map(
    (item) =>
      '<button type="button" class="kepu-ind-btn" data-id="' + item.id + '">'
      + item.icon + ' ' + item.name + '</button>'
  ).join('');
  container.querySelectorAll('.kepu-ind-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      container.querySelectorAll('.kepu-ind-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const item = CHAIN_POP_SCIENCE_REGISTRY[btn.getAttribute('data-id')];
      if (item && onSelect) onSelect(item);
    });
  });
  const first = container.querySelector('.kepu-ind-btn');
  if (first) first.click();
}

function renderChainPopDetail(item, containerId) {
  const el = document.getElementById(containerId);
  if (!el || !item) return;

  const rankBlock = (key, label) => {
    const link = item.rankLinks && item.rankLinks[key];
    if (!link) return '';
    return (
      '<div class="kepu-rank-link">'
      + '<span class="kepu-rank-label">' + label + '</span>'
      + '<a href="' + link.page + '" target="_blank" rel="noopener">' + link.label + '</a>'
      + '<span class="kepu-rank-tracks">' + (link.tracks || []).join(' · ') + '</span>'
      + '</div>'
    );
  };

  const sectionCard = (num, sec, rankKey, rankLabel) => {
    if (!sec) return '';
    return (
      '<div class="kepu-sec-card">'
      + '<div class="kepu-sec-head"><span class="kepu-sec-num">' + num + '</span><h3>' + sec.title + '</h3></div>'
      + '<ul class="kepu-tags">' + (sec.categories || []).map((c) => '<li>' + c + '</li>').join('') + '</ul>'
      + '<p class="kepu-meta"><strong>举例：</strong>' + sec.example + '</p>'
      + '<p class="kepu-meta"><strong>类比：</strong>' + sec.analogy + '</p>'
      + '<p class="kepu-meta"><strong>重点：</strong>' + sec.highlight + '</p>'
      + rankBlock(rankKey, rankLabel)
      + '<div class="copy-block" id="kepu-script-' + item.id + '-' + num + '">' + sec.script + '</div>'
      + '<div class="copy-row">'
      + '<button type="button" class="btn btn-primary" data-copy="kepu-script-' + item.id + '-' + num + '">📋 复制本段口播</button>'
      + '</div></div>'
    );
  };

  el.innerHTML =
    '<div class="kepu-detail-head">'
    + '<h2>' + item.icon + ' ' + item.name + '产业链科普</h2>'
    + '<p class="kepu-tagline">' + item.tagline + '</p></div>'
    + '<div class="kepu-sec-card kepu-opening">'
    + '<div class="kepu-sec-head"><span class="kepu-sec-num">0</span><h3>开篇定调</h3></div>'
    + '<div class="copy-block" id="kepu-script-' + item.id + '-0">' + item.sections.opening + '</div>'
    + '<div class="copy-row"><button type="button" class="btn btn-primary" data-copy="kepu-script-' + item.id + '-0">📋 复制开篇</button></div>'
    + '</div>'
    + sectionCard(1, item.sections.upstream, 'upstream', '📊 建议配图·上游榜单')
    + sectionCard(2, item.sections.midstream, 'midstream', '📊 建议配图·中游榜单')
    + sectionCard(3, item.sections.downstream, 'downstream', '📊 建议配图·下游榜单')
    + '<div class="kepu-sec-card kepu-closing">'
    + '<div class="kepu-sec-head"><span class="kepu-sec-num">4</span><h3>收尾升华</h3></div>'
    + '<div class="copy-block" id="kepu-script-' + item.id + '-4">'
    + item.sections.closing.demandChain + '\n\n'
    + item.sections.closing.domesticReplace + '\n\n'
    + item.sections.closing.compliance
    + '</div>'
    + '<div class="copy-row"><button type="button" class="btn btn-primary" data-copy="kepu-script-' + item.id + '-4">📋 复制收尾</button></div>'
    + '</div>'
    + '<div class="kepu-full-wrap">'
    + '<h3>📜 完整口播稿（五段合并）</h3>'
    + '<div class="copy-block" id="kepu-full-' + item.id + '">' + item.fullScript + '</div>'
    + '<div class="copy-row">'
    + '<button type="button" class="btn btn-primary" data-copy="kepu-full-' + item.id + '">📋 复制完整口播稿</button>'
    + '<span class="copy-status" id="kepu-full-status-' + item.id + '"></span>'
    + '</div></div>';

  el.querySelectorAll('[data-copy]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = document.getElementById(btn.getAttribute('data-copy'));
      const status = btn.getAttribute('data-copy').startsWith('kepu-full-')
        ? document.getElementById('kepu-full-status-' + item.id)
        : null;
      copyChainPopText(target ? target.textContent : '', status);
    });
  });
}

function initChainPopSciencePage() {
  renderChainPopIndustrySelector('kepu-industry-selector', (item) => {
    renderChainPopDetail(item, 'kepu-detail-panel');
  });
}

function initChainPopScienceWelcome() {
  const selector = document.getElementById('kepu-welcome-selector');
  const panel = document.getElementById('kepu-welcome-panel');
  if (!selector || !panel) return;
  renderChainPopIndustrySelector('kepu-welcome-selector', (item) => {
    renderChainPopDetail(item, 'kepu-welcome-panel');
  });
}

function openChainPopSciencePage() {
  window.location.href = 'chain-pop-science.html';
}

function openChainPopSpec() {
  window.open('docs/chain-popular-science/SPEC.md', '_blank');
}
