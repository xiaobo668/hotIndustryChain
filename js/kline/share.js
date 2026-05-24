/**
 * K线教学 — 分享链接与文案
 */

function getKlineShareBaseUrl() {
  const path = window.location.pathname.replace(/\/[^/]*$/, '/');
  return window.location.origin + path + 'share/kline.html';
}

function getKlineShareUrl(partId, chapterId) {
  const id = chapterId || partId;
  const base = getKlineShareBaseUrl();
  return base + '?chapter=' + encodeURIComponent(id);
}

function getKlineAppDeepLink(partId, chapterId) {
  const url = new URL(window.location.href);
  url.hash = chapterId ? `kline/${partId}/${chapterId}` : 'kline/' + partId;
  return url.toString();
}

function copyKlineShareLink(partId, chapterId) {
  const pid = partId || window._klineCurrentPartId;
  const cid = chapterId || window._klineCurrentChapterId;
  const url = getKlineShareUrl(pid, cid);
  return copyTextToClipboard(url, '✅ 分享链接已复制：\n' + url);
}

function copyKlineAppLink(partId, chapterId) {
  const pid = partId || window._klineCurrentPartId;
  const cid = chapterId || window._klineCurrentChapterId;
  const url = getKlineAppDeepLink(pid, cid);
  return copyTextToClipboard(url, '✅ 本页直达链接已复制');
}

function buildKlineShareText(partId, chapterId) {
  const part = getKlinePart(partId);
  if (!part) return '';
  const chapter = chapterId ? getKlineChapter(partId, chapterId) : null;
  const content = chapter || part;
  const points = (content.sharePoints || []).map((p, i) => `${i + 1}. ${p}`).join('\n');
  const titleLine = chapter
    ? `📊 ${part.partLabel} ${chapter.chapterLabel}：${chapter.title}`
    : `📊 ${part.partLabel}：${part.title}`;
  return [
    titleLine,
    content.subtitle || part.subtitle,
    '',
    points || '（要点待补充）',
    '',
    '🔗 ' + getKlineShareUrl(partId, chapterId),
  ].join('\n');
}

function copyKlineShareText(partId, chapterId) {
  const pid = partId || window._klineCurrentPartId;
  const cid = chapterId || window._klineCurrentChapterId;
  const text = buildKlineShareText(pid, cid);
  return copyTextToClipboard(text, '✅ 分享文案已复制');
}

function copyTextToClipboard(text, successMsg) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text).then(
      () => { alert(successMsg || '✅ 已复制'); },
      () => fallbackCopy(text, successMsg)
    );
  }
  return Promise.resolve(fallbackCopy(text, successMsg));
}

function fallbackCopy(text, successMsg) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.left = '-9999px';
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand('copy');
    alert(successMsg || '✅ 已复制');
  } catch (e) {
    alert('复制失败，请手动复制：\n' + text);
  }
  document.body.removeChild(ta);
}

function openKlineSharePage(partId, chapterId) {
  const pid = partId || window._klineCurrentPartId;
  const cid = chapterId || window._klineCurrentChapterId;
  window.open(getKlineShareUrl(pid, cid), '_blank', 'noopener');
}

function parseKlineRoute() {
  const hash = (window.location.hash || '').replace(/^#/, '');
  if (hash === 'kline/space') return { view: 'space' };
  if (hash === 'kline') return { view: 'outline' };
  const m = hash.match(/^kline\/(part-\d+)(?:\/(part-\d+-ch-\d+))?$/i);
  if (m) return { view: 'chapter', partId: m[1], chapterId: m[2] || null };
  return { view: null };
}

function parseKlineHash() {
  const route = parseKlineRoute();
  return route.view === 'chapter' ? route.partId : null;
}

function parseKlineChapterHash() {
  const route = parseKlineRoute();
  return route.view === 'chapter' ? route.chapterId : null;
}

function isKlineSpaceHash() {
  return parseKlineRoute().view === 'space';
}
