/**
 * 付费合集会员专区 · 页面渲染
 */
function subMatEsc(s) {
  if (!s) return '';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function subMatCopyHtml(id, text) {
  return (
    '<div class="copy-block" id="' + id + '">' + subMatEsc(text) + '</div>' +
    '<div class="copy-row">' +
    '<button class="btn btn-primary" type="button" onclick="subMatCopy(\'' + id + '\')">📋 复制</button>' +
    '<span class="copy-status" id="' + id + '-status"></span></div>'
  );
}

function subMatCopy(elementId) {
  const el = document.getElementById(elementId);
  if (!el) return;
  const text = el.textContent || '';
  const statusEl = document.getElementById(elementId + '-status');
  function done() {
    if (statusEl) {
      statusEl.textContent = '已复制';
      setTimeout(function () { statusEl.textContent = ''; }, 2000);
    }
  }
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(done).catch(function () {
      alert(text);
    });
  } else {
    alert(text);
  }
}

function initSubscriptionStats() {
  const el = document.getElementById('sub-stats-row');
  const m = typeof SUBSCRIPTION_MATERIALS2026 !== 'undefined' ? SUBSCRIPTION_MATERIALS2026 : null;
  if (!el || !m) return;
  el.innerHTML = [
    { n: m.stats.rankTotal, label: '细分榜单' },
    { n: m.stats.capacityTracks, label: '产能赛道' },
    { n: m.stats.orderTracks, label: '订单赛道' },
    { n: m.stats.interimTracks, label: '中报赛道' },
    { n: m.stats.mindMaps, label: '产业脑图' },
  ]
    .map(function (x) {
      return (
        '<div class="stat-pill"><span class="stat-num">' + x.n + '</span><span class="stat-label">' + x.label + '</span></div>'
      );
    })
    .join('');
}

function initSubscriptionCatalog() {
  const el = document.getElementById('sub-catalog-root');
  const m = typeof SUBSCRIPTION_MATERIALS2026 !== 'undefined' ? SUBSCRIPTION_MATERIALS2026 : null;
  if (!el || !m) return;

  el.innerHTML = m.catalogModules
    .map(function (mod) {
      let body = '<p class="mod-desc">' + subMatEsc(mod.desc) + '</p>';
      if (mod.groups) {
        body +=
          '<div class="track-grid">' +
          mod.groups
            .map(function (g) {
              return (
                '<a class="track-link" href="' +
                subMatEsc(g.url) +
                '" target="_blank" rel="noopener">' +
                subMatEsc(g.name) +
                ' <span class="track-count">' +
                g.count +
                ' 赛道</span></a>'
              );
            })
            .join('') +
          '</div>';
      }
      if (mod.tracks) {
        body +=
          '<div class="track-chips">' +
          mod.tracks
            .map(function (t) {
              return '<span class="track-chip">' + subMatEsc(t) + '</span>';
            })
            .join('') +
          '</div>';
      }
      if (mod.items) {
        body += '<ul class="mod-list">' + mod.items.map(function (i) { return '<li>' + subMatEsc(i) + '</li>'; }).join('') + '</ul>';
      }
      if (mod.links) {
        body +=
          '<div class="copy-row">' +
          mod.links
            .map(function (lk) {
              return '<a class="btn" href="' + subMatEsc(lk.url) + '">' + subMatEsc(lk.label) + ' →</a>';
            })
            .join('') +
          '</div>';
      }
      if (mod.hubUrl) {
        body +=
          '<div class="copy-row"><a class="btn btn-primary" href="' +
          subMatEsc(mod.hubUrl) +
          '">打开在线预览 ' +
          subMatEsc(mod.title) +
          '</a></div>';
      }
      const countBadge = mod.count != null ? '<span class="mod-count">' + mod.count + ' 项</span>' : '';
      return (
        '<details class="catalog-mod" open>' +
        '<summary><span class="mod-icon">' +
        mod.icon +
        '</span> 第' +
        mod.layer +
        '层 · ' +
        subMatEsc(mod.title) +
        countBadge +
        '</summary>' +
        '<div class="catalog-body">' +
        body +
        '</div></details>'
      );
    })
    .join('');
}

function initSubscriptionSinglePacks() {
  const el = document.getElementById('sub-single-packs');
  const m = typeof SUBSCRIPTION_MATERIALS2026 !== 'undefined' ? SUBSCRIPTION_MATERIALS2026 : null;
  if (!el || !m) return;

  el.innerHTML = m.singlePackGroups
    .map(function (g) {
      const parts = [];
      if (g.tracks.capacity && g.tracks.capacity.length) {
        parts.push('<strong>产能</strong> ' + g.tracks.capacity.length + ' 赛道');
      }
      if (g.tracks.order && g.tracks.order.length) {
        parts.push('<strong>订单</strong> ' + g.tracks.order.length + ' 赛道');
      }
      if (g.tracks.consumables && g.tracks.consumables.length) {
        parts.push('<strong>耗材</strong> ' + g.tracks.consumables.length + ' 赛道');
      }
      if (g.tracks.interim && g.tracks.interim.length) {
        parts.push('<strong>中报</strong> ' + g.tracks.interim.length + ' 赛道');
      }
      return (
        '<div class="single-pack-card">' +
        '<div class="sp-icon">' +
        g.icon +
        '</div>' +
        '<h4>' +
        subMatEsc(g.name) +
        '</h4>' +
        '<div class="sp-price">' +
        subMatEsc(g.price) +
        '</div>' +
        '<p class="sp-meta">' +
        parts.join(' · ') +
        '</p>' +
        '</div>'
      );
    })
    .join('');
}

function initSubscriptionDelivery() {
  const el = document.getElementById('sub-delivery-root');
  const m = typeof SUBSCRIPTION_MATERIALS2026 !== 'undefined' ? SUBSCRIPTION_MATERIALS2026 : null;
  if (!el || !m) return;
  const o = m.onlineAccess;
  if (!o) return;

  let html =
    '<div class="card"><h3>线上专题页</h3><p>' +
    subMatEsc(o.accessNote) +
    '</p>';
  if (o.hubUrl) {
    html += '<p style="margin-top:8px"><a class="btn btn-primary" href="' + subMatEsc(o.hubUrl) + '" target="_blank" rel="noopener">打开线上专题页 →</a></p>';
  } else {
    html += '<p style="margin-top:8px;font-size:13px;color:var(--muted)">上线后在 <code>onlineAccess.hubUrl</code> 配置公网地址</p>';
  }
  html += '</div>';

  html += '<div class="card"><h3>开通流程</h3><ol class="mod-list" style="padding-left:20px">';
  o.flow.forEach(function (step) {
    html += '<li>' + subMatEsc(step) + '</li>';
  });
  html += '</ol></div>';

  html += '<div class="delivery-tree">';
  o.modules.forEach(function (mod) {
    html +=
      '<a class="delivery-folder online-mod-link" href="' +
      subMatEsc(mod.url) +
      '">' +
      '<div class="df-path">🔗 ' +
      subMatEsc(mod.label) +
      '</div>' +
      '<div class="df-files">' +
      subMatEsc(mod.desc) +
      '</div></a>';
  });
  html += '</div>';

  html += '<div class="card" style="margin-top:14px"><h3>开通指引（私信回复模板）</h3>';
  html += subMatCopyHtml('copy-open-reply', o.openReply);
  html += '</div>';

  html += '<div class="card"><h3>季度更新通知模板</h3>';
  html += subMatCopyHtml('copy-update-notify', o.updateNotify);
  html += '</div>';

  el.innerHTML = html;
}

function initSubscriptionFaq() {
  const el = document.getElementById('sub-faq-root');
  const m = typeof SUBSCRIPTION_MATERIALS2026 !== 'undefined' ? SUBSCRIPTION_MATERIALS2026 : null;
  if (!el || !m) return;

  el.innerHTML = m.faq
    .map(function (item, i) {
      return (
        '<details class="faq-item">' +
        '<summary>Q' +
        (i + 1) +
        '. ' +
        subMatEsc(item.q) +
        '</summary>' +
        '<div class="faq-a">' +
        subMatEsc(item.a) +
        '</div></details>'
      );
    })
    .join('');
}

function initSubscriptionGlossary() {
  const el = document.getElementById('sub-glossary-root');
  const input = document.getElementById('sub-glossary-search');
  const m = typeof SUBSCRIPTION_MATERIALS2026 !== 'undefined' ? SUBSCRIPTION_MATERIALS2026 : null;
  if (!el || !m) return;

  function render(filter) {
    const q = (filter || '').trim().toLowerCase();
    const list = m.glossary.filter(function (g) {
      if (!q) return true;
      return g.term.toLowerCase().indexOf(q) >= 0 || g.def.indexOf(q) >= 0;
    });
    el.innerHTML =
      list.length === 0
        ? '<p class="muted">无匹配术语</p>'
        : list
            .map(function (g) {
              return (
                '<div class="gloss-row"><dt>' +
                subMatEsc(g.term) +
                '</dt><dd>' +
                subMatEsc(g.def) +
                '</dd></div>'
              );
            })
            .join('');
  }

  render('');
  if (input) {
    input.addEventListener('input', function () {
      render(input.value);
    });
  }
}

function initSubscriptionCopy() {
  const el = document.getElementById('sub-copy-root');
  const m = typeof SUBSCRIPTION_MATERIALS2026 !== 'undefined' ? SUBSCRIPTION_MATERIALS2026 : null;
  if (!el || !m) return;
  const c = m.copyScripts;
  let html = '';

  c.videoOutro.forEach(function (item, i) {
    html += '<div class="card"><h3>' + subMatEsc(item.label) + '</h3>';
    html += subMatCopyHtml('copy-outro-' + i, item.text);
    html += '</div>';
  });
  c.commentPin.forEach(function (item, i) {
    html += '<div class="card"><h3>' + subMatEsc(item.label) + '</h3>';
    html += subMatCopyHtml('copy-pin-' + i, item.text);
    html += '</div>';
  });
  html += '<div class="card"><h3>视频号小店 · 商品标题</h3>';
  html += subMatCopyHtml('copy-shop-title', c.shopTitle);
  html += '</div>';
  html += '<div class="card"><h3>视频号小店 · 商品详情</h3>';
  html += subMatCopyHtml('copy-shop-desc', c.shopDesc);
  html += '</div>';
  html += '<div class="card"><h3>私信自动回复</h3>';
  html += subMatCopyHtml('copy-private-reply', c.privateReply);
  html += '</div>';
  html += '<div class="card"><h3>老用户升级话术</h3>';
  html += subMatCopyHtml('copy-upgrade', c.upgradeOffer);
  html += '</div>';

  html +=
    '<div class="card"><h3>违禁词清单（制作与口播必避）</h3><div class="warn-list">' +
    m.forbiddenWords
      .map(function (w) {
        return '<span class="warn-chip">' + subMatEsc(w) + '</span>';
      })
      .join('') +
    '</div></div>';

  el.innerHTML = html;
}

function initSubscriptionMaterials() {
  initSubscriptionStats();
  initSubscriptionCatalog();
  initSubscriptionSinglePacks();
  initSubscriptionDelivery();
  initSubscriptionFaq();
  initSubscriptionGlossary();
  initSubscriptionCopy();
}

function subMatScrollTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

document.addEventListener('DOMContentLoaded', initSubscriptionMaterials);
