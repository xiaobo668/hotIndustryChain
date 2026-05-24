/**
 * K线 Space 界面渲染
 */

function renderKlineSpace() {
  const panel = document.getElementById('kline-space-panel');
  if (!panel || typeof KLINE_SPACE === 'undefined') return;

  const space = KLINE_SPACE;
  const parts = typeof getKlineParts === 'function' ? getKlineParts() : [];

  const filesHtml = space.moduleFiles.map(f => `
    <tr>
      <td><code class="kline-space-code">${f.path}</code></td>
      <td>${f.role}</td>
      <td>${f.required ? '<span class="kline-space-tag required">必需</span>' : '<span class="kline-space-tag">可选</span>'}</td>
      <td class="kline-space-muted">${f.editWhen}</td>
    </tr>
  `).join('');

  const schemaHtml = space.partSchema.map(s => `
    <tr>
      <td><code>${s.field}</code></td>
      <td>${s.type}</td>
      <td>${s.required ? '是' : '否'}</td>
      <td class="kline-space-muted">${s.rule}</td>
    </tr>
  `).join('');

  const registryRows = space.partsRegistry.map(reg => {
    const part = parts.find(p => p.id === reg.partId);
    const prog = getKlinePartProgress(reg.partId);
    const statusLabel = space.statusLabels[reg.status] || reg.status;
    return `
      <tr>
        <td>${part ? part.partLabel : reg.partId}</td>
        <td>${part ? part.title : '—'}</td>
        <td><span class="kline-space-status kline-space-status--${reg.status}">${statusLabel}</span></td>
        <td>${prog.chapters ? prog.chapters + ' 章 · ' : ''}${prog.filled}/${prog.sections} 节 · ${prog.sharePoints} 要点</td>
        <td class="kline-space-muted">${reg.notes || '—'}</td>
        <td>
          <button type="button" class="kline-space-link-btn" onclick="openKlineChapter('${reg.partId}')">编辑章节</button>
        </td>
      </tr>
    `;
  }).join('');

  const changelogHtml = [...space.changelog].reverse().map(c => `
    <li>
      <time>${c.date}</time>
      <span class="kline-space-muted">${c.author ? '@' + c.author : ''}</span>
      ${c.summary}
    </li>
  `).join('');

  const todosHtml = space.todos.map(t => `
    <li class="${t.done ? 'done' : ''}">
      <input type="checkbox" disabled ${t.done ? 'checked' : ''} />
      ${t.text}
    </li>
  `).join('');

  const shareHtml = space.shareConventions.map(s => `<li>${s}</li>`).join('');

  panel.innerHTML = `
    <div class="kline-space-header">
      <div>
        <h2 class="kline-space-title">${space.title}</h2>
        <p class="kline-space-sub">${space.subtitle}</p>
      </div>
      <div class="kline-space-meta">
        <span>v${space.version}</span>
        <span>更新 ${space.updatedAt}</span>
      </div>
    </div>
    <p class="kline-space-purpose">${space.purpose}</p>

    <section class="kline-space-block">
      <h3 class="kline-space-block-title">📋 章节维护清单</h3>
      <div class="kline-space-table-wrap">
        <table class="kline-space-table">
          <thead>
            <tr>
              <th>部分</th><th>标题</th><th>状态</th><th>进度</th><th>备注</th><th></th>
            </tr>
          </thead>
          <tbody>${registryRows}</tbody>
        </table>
      </div>
    </section>

    <section class="kline-space-block">
      <h3 class="kline-space-block-title">📁 模块文件职责</h3>
      <div class="kline-space-table-wrap">
        <table class="kline-space-table">
          <thead><tr><th>路径</th><th>职责</th><th></th><th>何时修改</th></tr></thead>
          <tbody>${filesHtml}</tbody>
        </table>
      </div>
    </section>

    <section class="kline-space-block">
      <h3 class="kline-space-block-title">📐 章节字段规范（outline.js）</h3>
      <div class="kline-space-table-wrap">
        <table class="kline-space-table">
          <thead><tr><th>字段</th><th>类型</th><th>必填</th><th>规则</th></tr></thead>
          <tbody>${schemaHtml}</tbody>
        </table>
      </div>
    </section>

    <section class="kline-space-block kline-space-block--cols">
      <div>
        <h3 class="kline-space-block-title">🔗 分享约定</h3>
        <ul class="kline-space-list">${shareHtml}</ul>
      </div>
      <div>
        <h3 class="kline-space-block-title">✅ 待办</h3>
        <ul class="kline-space-todos">${todosHtml}</ul>
      </div>
    </section>

    <section class="kline-space-block">
      <h3 class="kline-space-block-title">📝 变更记录</h3>
      <ul class="kline-space-changelog">${changelogHtml}</ul>
    </section>

    <p class="kline-space-footer">
      维护说明见 <code>js/kline/space/README.md</code> · 数据登记 <code>js/kline/space/space.js</code>
    </p>
  `;
}

function showKlineSpaceView() {
  if (typeof switchModule === 'function' && typeof currentModule !== 'undefined' && currentModule !== 'kline') {
    switchModule('kline');
  }

  window._klineCurrentPartId = null;
  const welcome = document.getElementById('welcome');
  const welcomeKline = document.getElementById('welcome-kline');
  const klineResult = document.getElementById('kline-result');
  const spaceWrap = document.getElementById('kline-space-wrap');

  if (welcome) welcome.style.display = '';
  if (welcomeKline) welcomeKline.style.display = 'none';
  if (klineResult) klineResult.classList.remove('show');
  if (spaceWrap) spaceWrap.style.display = 'block';

  renderKlineSpace();
  window.location.hash = 'kline/space';
}

function hideKlineSpaceView() {
  const spaceWrap = document.getElementById('kline-space-wrap');
  const welcomeKline = document.getElementById('welcome-kline');
  if (spaceWrap) spaceWrap.style.display = 'none';
  if (welcomeKline) welcomeKline.style.display = '';
  window.location.hash = 'kline';
}
