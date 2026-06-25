/**
 * 会员专区 · 板块入口与详情页渲染
 */
function mzEsc(s) {
  if (!s) return '';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function initMemberZoneHub() {
  const grid = document.getElementById('mz-module-grid');
  const data = typeof MEMBER_ZONE2026 !== 'undefined' ? MEMBER_ZONE2026 : null;
  if (!grid || !data) return;

  grid.innerHTML = data.modules
    .map(function (mod) {
      const capN =
        (mod.capacityTracks || []).length +
        (mod.relatedCapacityTracks && mod.relatedCapacityTracks.tracks
          ? mod.relatedCapacityTracks.tracks.length
          : 0);
      const ordN = (mod.orderTracks || []).length;
      return (
        '<a class="mz-module-card" href="member-sector.html?id=' +
        encodeURIComponent(mod.id) +
        '">' +
        '<div class="mz-module-icon">' +
        mod.icon +
        '</div>' +
        '<div class="mz-module-name">' +
        mzEsc(mod.name) +
        '</div>' +
        '<div class="mz-module-tagline">' +
        mzEsc(mod.tagline) +
        '</div>' +
        '<div class="mz-module-meta">' +
        '<span class="mz-meta-chip">产能 ' +
        capN +
        ' 赛道</span>' +
        '<span class="mz-meta-chip">订单 ' +
        ordN +
        ' 赛道</span>' +
        '<span class="mz-meta-chip">综合 Top5</span>' +
        '</div>' +
        '<div class="mz-module-arrow">查看全产业链 →</div>' +
        '</a>'
      );
    })
    .join('');
}

function initMemberSectorPage() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const mod = typeof MEMBER_ZONE_REGISTRY !== 'undefined' ? MEMBER_ZONE_REGISTRY[id] : null;
  const root = document.getElementById('mz-sector-root');
  const data = typeof MEMBER_ZONE2026 !== 'undefined' ? MEMBER_ZONE2026 : null;

  if (!root || !mod || !data) {
    if (root) {
      root.innerHTML =
        '<p style="color:#8888aa">未找到该板块，<a href="subscription.html" style="color:#6c63ff">返回会员专区</a></p>';
    }
    return;
  }

  document.title = mod.name + ' · 会员专区';

  function chainNode(type, label, node) {
    return (
      '<div class="mz-chain-node ' +
      type +
      '">' +
      '<div class="mz-chain-label">' +
      label +
      '</div>' +
      '<h3>' +
      mzEsc(node.title) +
      '</h3>' +
      '<div class="mz-chain-tags">' +
      (node.categories || [])
        .map(function (c) {
          return '<span class="mz-chain-tag">' + mzEsc(c) + '</span>';
        })
        .join('') +
      '</div>' +
      '<p class="mz-chain-summary">' +
      mzEsc(node.summary) +
      '</p>' +
      '</div>'
    );
  }

  function trackLinks(tracks, page, useCapAnchor) {
    if (!tracks || !tracks.length) return '<li style="color:#8888aa;font-size:13px;padding:8px">暂无</li>';
    return tracks
      .map(function (t) {
        const key = typeof t === 'string' ? t : t.key;
        const href =
          typeof t === 'object' && t.page
            ? t.page
            : useCapAnchor
              ? memberZoneCapLink(page, key)
              : page;
        return (
          '<li><a href="' +
          mzEsc(href) +
          '"><span class="track-name">' +
          mzEsc(key) +
          '</span><span class="track-go">查看榜单 →</span></a></li>'
        );
      })
      .join('');
  }

  const top5Html = mod.top5
    .map(function (c) {
      return (
        '<div class="mz-top5-item">' +
        '<div class="mz-top5-rank">' +
        c.rank +
        '</div>' +
        '<div class="mz-top5-body">' +
        '<div class="mz-top5-name">' +
        mzEsc(c.name) +
        '</div>' +
        '<div class="mz-top5-metric">' +
        mzEsc(c.metric) +
        '</div>' +
        '<div class="mz-top5-segment">' +
        mzEsc(c.segment) +
        '</div>' +
        '<div class="mz-top5-highlight">' +
        mzEsc(c.highlight) +
        '</div>' +
        '</div></div>'
      );
    })
    .join('');

  function rankPanel(title, icon, sub, listHtml, hubLink) {
    let html =
      '<div class="mz-rank-panel">' +
      '<h3>' +
      icon +
      ' ' +
      title +
      '</h3>' +
      '<p class="panel-sub">' +
      sub +
      '</p>' +
      '<ul class="mz-rank-list">' +
      listHtml +
      '</ul>';
    if (hubLink) {
      html += '<a class="mz-hub-link" href="' + mzEsc(hubLink.url) + '">' + mzEsc(hubLink.label) + ' →</a>';
    }
    html += '</div>';
    return html;
  }

  function extraResourcesHtml(resources) {
    if (!resources || !resources.length) return '';
    return (
      '<section class="mz-section">' +
      '<h2 class="mz-section-title">深度图谱与科普</h2>' +
      '<div class="mz-extra-grid">' +
      resources
        .map(function (r) {
          return (
            '<a class="mz-extra-card" href="' +
            mzEsc(r.url) +
            '">' +
            '<div class="mz-extra-icon">' +
            (r.icon || '📎') +
            '</div>' +
            '<h4>' +
            mzEsc(r.label) +
            '</h4>' +
            '<p>' +
            mzEsc(r.desc) +
            '</p>' +
            '<span class="mz-extra-go">查看 →</span></a>'
          );
        })
        .join('') +
      '</div></section>'
    );
  }

  const chainFlowClass = mod.chain.design ? ' mz-chain-flow-4' : '';
  let chainHtml =
    chainNode('upstream', '上游', mod.chain.upstream) +
    (mod.chain.design ? chainNode('design', '设计', mod.chain.design) : '') +
    chainNode('midstream', '中游', mod.chain.midstream) +
    chainNode('downstream', '下游', mod.chain.downstream);

  const capCount = mod.capacityTracks.length;
  const relatedCap = mod.relatedCapacityTracks;
  let capacityPanelsHtml = rankPanel(
    '产能排行',
    '🏭',
    capCount + ' 个细分赛道 · Top10 年化产能/出货量',
    trackLinks(mod.capacityTracks, mod.capacityPage, true),
    { url: mod.capacityPage, label: '进入半导体产能总览' }
  );
  if (relatedCap && relatedCap.tracks && relatedCap.tracks.length) {
    capacityPanelsHtml += rankPanel(
      relatedCap.label || '关联产能',
      '🔗',
      relatedCap.tracks.length + ' 个赛道 · 封装材料/化合物/封测（光互联页）',
      trackLinks(relatedCap.tracks, relatedCap.page, true),
      { url: relatedCap.page, label: '进入光互联与电子材料产能页' }
    );
  }

  const top5Note = mod.top5Note || data.top5MethodNote;

  root.innerHTML =
    '<div class="mz-sector-head">' +
    '<h1><span>' +
    mod.icon +
    '</span>' +
    mzEsc(mod.name) +
    '产业链</h1>' +
    '<p class="tagline">' +
    mzEsc(mod.tagline) +
    '</p>' +
    '<a class="mz-hub-link" href="' +
    mzEsc(mod.capacityPage) +
    '">打开' +
    mzEsc(mod.name) +
    '产能总览页 →</a>' +
    '</div>' +

    '<section class="mz-section">' +
    '<h2 class="mz-section-title">' +
    (mod.chain.design ? '全产业链 · 材料 → 设计 → 制造 → 应用' : '全产业链 · 上中下游') +
    '</h2>' +
    '<div class="mz-chain-flow' +
    chainFlowClass +
    '">' +
    chainHtml +
    '</div></section>' +

    extraResourcesHtml(mod.extraResources) +

    '<section class="mz-section">' +
    '<h2 class="mz-section-title">细分领域榜单</h2>' +
    '<div class="mz-rank-grid">' +
    capacityPanelsHtml +
    rankPanel(
      '订单排行',
      '📋',
      mod.orderTracks.length + ' 个细分赛道 · 订单/市场规模参考 Top10',
      trackLinks(mod.orderTracks, mod.orderHub, false),
      { url: mod.orderHub, label: '进入订单总览' }
    ) +
    (mod.consumablesTracks && mod.consumablesTracks.length
      ? rankPanel(
          '耗材出货',
          '🧪',
          mod.consumablesTracks.length + ' 个细分赛道 · 年化出货量',
          trackLinks(mod.consumablesTracks, 'consumables-poster.html', false),
          { url: 'consumables-poster.html', label: '进入耗材出货总览' }
        )
      : '') +
    (mod.interimTracks && mod.interimTracks.length
      ? rankPanel(
          '中报分析',
          '📊',
          mod.interimTracks.length + ' 个赛道 · 2025 H1 营收增速',
          trackLinks(mod.interimTracks, 'interim-report.html', false),
          { url: 'interim-report.html', label: '进入中报分析总览' }
        )
      : '') +
    '</div></section>' +

    '<section class="mz-section">' +
    '<h2 class="mz-section-title">' +
    mzEsc(mod.name) +
    ' · 综合排名 Top5</h2>' +
    '<div class="mz-top5-list">' +
    top5Html +
    '</div>' +
    '<p class="mz-top5-note">ℹ️ ' +
    mzEsc(top5Note) +
    '</p></section>';
}

document.addEventListener('DOMContentLoaded', function () {
  if (document.getElementById('mz-module-grid')) initMemberZoneHub();
  if (document.getElementById('mz-sector-root')) initMemberSectorPage();
});
