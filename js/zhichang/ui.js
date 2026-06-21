/**
 * 职场模块 UI
 */
let _zhichangActiveAlbumId = null;

function escapeZhichangHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function initZhichangUI() {
  const input = document.getElementById('zhichang-poster-text');
  if (input && !input.value.trim()) {
    input.value = ZHICHANG_POSTER_TEMPLATE.sampleText;
  }
  renderZhichangAlbums();
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

function getZhichangAlbums() {
  const list = [];
  const wonang =
    typeof ZHICHANG_ALBUM_WONANG !== 'undefined'
      ? ZHICHANG_ALBUM_WONANG
      : typeof window !== 'undefined'
        ? window.ZHICHANG_ALBUM_WONANG
        : null;
  if (wonang) list.push(wonang);
  return list;
}

function renderZhichangAlbums() {
  const wrap = document.getElementById('zhichang-album-list');
  if (!wrap) return;
  const albums = getZhichangAlbums();
  if (!albums.length) {
    wrap.innerHTML = `
      <div class="zhichang-album-load-hint">
        ⚠️ 专辑数据未加载。请<strong>硬刷新</strong>（Cmd+Shift+R）；
        若仍无效，确认 <code>js/zhichang/album-wonang.js</code> 已部署。
      </div>`;
    return;
  }
  wrap.innerHTML = albums
    .map(
      (album) => `
    <div class="zhichang-album-entry" onclick="openZhichangAlbum('${album.id}')" role="button" tabindex="0"
      onkeydown="if(event.key==='Enter'||event.key===' ')openZhichangAlbum('${album.id}')">
      <div class="zhichang-album-entry-icon">${album.emoji || '📁'}</div>
      <div class="zhichang-album-entry-body">
        <div class="zhichang-album-entry-title">${escapeZhichangHtml(album.title)}</div>
        <div class="zhichang-album-entry-desc">${escapeZhichangHtml(album.subtitle || '')} · ${(album.posts || []).length} 条</div>
      </div>
      <div class="zhichang-album-entry-arrow">→</div>
    </div>`
    )
    .join('');
}

function openZhichangAlbum(albumId) {
  if (typeof switchModule === 'function' && typeof currentModule !== 'undefined' && currentModule !== 'zhichang') {
    switchModule('zhichang');
  }

  const album = getZhichangAlbums().find((a) => a.id === albumId);
  if (!album) {
    renderZhichangAlbums();
    alert('专辑未加载，请硬刷新页面（Cmd+Shift+R）后重试');
    return;
  }
  _zhichangActiveAlbumId = albumId;

  const panel = document.getElementById('zhichang-album-panel');
  const listWrap = document.getElementById('zhichang-album-list-wrap');
  const heroLabel = document.querySelector('.zhichang-album-hero .zhichang-album-list-label');
  if (panel) panel.style.display = 'block';
  if (listWrap) listWrap.style.display = 'none';
  if (heroLabel) heroLabel.style.display = 'none';

  const titleEl = document.getElementById('zhichang-album-panel-title');
  const subEl = document.getElementById('zhichang-album-panel-sub');
  const grid = document.getElementById('zhichang-album-post-grid');
  if (titleEl) titleEl.textContent = album.title;
  if (subEl) subEl.textContent = album.subtitle || '';
  if (grid) {
    grid.innerHTML = album.posts
      .map(
        (post, i) => `
      <div class="zhichang-album-post-card" onclick="applyZhichangAlbumPost('${albumId}','${post.id}')">
        <div class="zhichang-album-post-num">${String(i + 1).padStart(2, '0')}</div>
        <div class="zhichang-album-post-title">${escapeZhichangHtml(post.title)}</div>
        <div class="zhichang-album-post-tags">${(post.tags || []).map((t) => `<span>#${escapeZhichangHtml(t)}</span>`).join('')}</div>
        <div class="zhichang-album-post-preview">${escapeZhichangHtml(post.text.split('\n').slice(0, 3).join(' · '))}</div>
      </div>`
      )
      .join('');
  }

  panel?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  if (typeof history !== 'undefined' && history.replaceState) {
    history.replaceState(null, '', '#zhichang/' + albumId);
  } else {
    window.location.hash = 'zhichang/' + albumId;
  }
}

function closeZhichangAlbum() {
  _zhichangActiveAlbumId = null;
  const panel = document.getElementById('zhichang-album-panel');
  const listWrap = document.getElementById('zhichang-album-list-wrap');
  const heroLabel = document.querySelector('.zhichang-album-hero .zhichang-album-list-label');
  if (panel) panel.style.display = 'none';
  if (listWrap) listWrap.style.display = 'block';
  if (heroLabel) heroLabel.style.display = '';
  if (typeof history !== 'undefined' && history.replaceState) {
    history.replaceState(null, '', '#zhichang');
  }
}

function getZhichangAlbumPost(albumId, postId) {
  const album = getZhichangAlbums().find((a) => a.id === albumId);
  if (!album) return null;
  return album.posts.find((p) => p.id === postId) || null;
}

function applyZhichangAlbumPost(albumId, postId) {
  const post = getZhichangAlbumPost(albumId, postId);
  if (!post) return;
  applyZhichangSample(post.text);
  const meta = document.getElementById('zhichang-active-post-meta');
  if (meta) {
    meta.style.display = 'block';
    meta.innerHTML = `当前图文：<strong>${escapeZhichangHtml(post.title)}</strong> · ${post.text.split('\n').filter(Boolean).length} 行
      <button type="button" class="btn btn-secondary zhichang-copy-text-btn" onclick="copyZhichangActivePostText()">📋 复制正文</button>`;
  }
  document.getElementById('zhichang-poster-text')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  window._zhichangActivePost = { albumId, postId };
}

function copyZhichangActivePostText() {
  const active = window._zhichangActivePost;
  if (!active) return;
  const post = getZhichangAlbumPost(active.albumId, active.postId);
  if (!post) return;
  const album = getZhichangAlbums().find((a) => a.id === active.albumId);
  const header = album ? `【${album.title}】${post.title}\n\n` : '';
  navigator.clipboard.writeText(header + post.text).then(
    () => alert('✅ 图文正文已复制，可粘贴到小红书/公众号'),
    () => alert('复制失败，请手动选择文本框内容复制')
  );
}

function renderZhichangWelcomeSamples() {
  const grid = document.getElementById('zhichang-sample-grid');
  if (!grid || typeof ZHICHANG_SAMPLES === 'undefined') return;

  grid.innerHTML = ZHICHANG_SAMPLES.map(
    (item) => `
    <div class="welcome-card zhichang-welcome-card" onclick="applyZhichangSampleById('${item.id}')">
      <div class="welcome-card-icon">💼</div>
      <div class="welcome-card-name">${escapeZhichangHtml(item.title)}</div>
      <div class="zhichang-card-preview">${escapeZhichangHtml(item.text.replace(/\n/g, ' · '))}</div>
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
