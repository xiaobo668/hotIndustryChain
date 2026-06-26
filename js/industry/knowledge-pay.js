/**
 * 产业知识付费 · 课程大纲浏览与 PPT 导出
 */
function kpEsc(s) {
  if (!s) return '';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function kpCopyText(text, statusId) {
  var statusEl = statusId ? document.getElementById(statusId) : null;
  function done() {
    if (statusEl) {
      statusEl.textContent = '已复制';
      setTimeout(function () { statusEl.textContent = ''; }, 2000);
    }
  }
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(done).catch(function () {
      alert(text.slice(0, 2000) + (text.length > 2000 ? '…' : ''));
    });
  } else {
    alert(text.slice(0, 2000));
  }
}

function initKnowledgePayHub() {
  var grid = document.getElementById('kp-course-grid');
  var data = typeof KNOWLEDGE_PAY2026 !== 'undefined' ? KNOWLEDGE_PAY2026 : null;
  if (!grid || !data) return;

  grid.innerHTML = data.courses
    .map(function (c) {
      return (
        '<a class="kp-course-card" href="knowledge-pay.html?course=' +
        encodeURIComponent(c.id) +
        '">' +
        '<div class="kp-course-icon">' +
        c.icon +
        '</div>' +
        '<div class="kp-course-badge">' +
        kpEsc(c.priceTag || '付费课') +
        '</div>' +
        '<h3>' +
        kpEsc(c.title) +
        '</h3>' +
        '<p class="kp-course-sub">' +
        kpEsc(c.subtitle) +
        '</p>' +
        '<div class="kp-course-meta">' +
        '<span>' +
        (c.slideCount || 0) +
        ' 页 PPT</span>' +
        '<span>' +
        kpEsc(c.price || '') +
        '</span>' +
        '</div>' +
        '<div class="kp-course-audience">' +
        kpEsc(c.audience) +
        '</div>' +
        '<div class="kp-course-cta">查看大纲与内容 →</div>' +
        '</a>'
      );
    })
    .join('');
}

function initKnowledgePayCoursePage() {
  var params = new URLSearchParams(window.location.search);
  var id = params.get('course') || 'semi-materials-dealer';
  var course = typeof getKnowledgePayCourse === 'function' ? getKnowledgePayCourse(id) : null;
  var root = document.getElementById('kp-course-root');
  var data = typeof KNOWLEDGE_PAY2026 !== 'undefined' ? KNOWLEDGE_PAY2026 : null;

  if (!root || !course || !data) {
    if (root) {
      root.innerHTML =
        '<p class="kp-muted">未找到该课程，<a href="knowledge-pay.html">返回课程列表</a></p>';
    }
    return;
  }

  document.title = course.title + ' · 产业知识付费';

  var goalsHtml =
    '<ul class="kp-goals">' +
    (course.learningGoals || [])
      .map(function (g) {
        return '<li>' + kpEsc(g) + '</li>';
      })
      .join('') +
    '</ul>';

  var chaptersHtml = (course.chapters || [])
    .map(function (ch, ci) {
      var slidesHtml = (ch.slides || [])
        .map(function (sl, si) {
          var bullets =
            '<ul>' +
            (sl.bullets || [])
              .map(function (b) {
                return '<li>' + kpEsc(b) + '</li>';
              })
              .join('') +
            '</ul>';
          var tip = sl.dealerTip
            ? '<div class="kp-dealer-tip"><strong>经销要点</strong> ' + kpEsc(sl.dealerTip) + '</div>'
            : '';
          var plain = sl.plainExplain
            ? '<div class="kp-plain-explain"><strong>通俗说</strong> ' + kpEsc(sl.plainExplain) + '</div>'
            : '';
          return (
            '<div class="kp-slide' +
            (sl.title.indexOf('【零基础】') >= 0 || sl.title.indexOf('【案例】') >= 0 ? ' kp-slide-beginner' : '') +
            '" id="slide-' +
            ci +
            '-' +
            si +
            '">' +
            '<div class="kp-slide-head">' +
            '<span class="kp-slide-num">P' +
            (ci + 1) +
            '.' +
            (si + 1) +
            '</span>' +
            '<h4>' +
            kpEsc(sl.title) +
            '</h4>' +
            '</div>' +
            bullets +
            plain +
            tip +
            '</div>'
          );
        })
        .join('');

      return (
        '<details class="kp-chapter" open>' +
        '<summary><span class="kp-ch-icon">📑</span> ' +
        kpEsc(ch.title) +
        ' <span class="kp-ch-count">' +
        (ch.slides || []).length +
        ' 页</span></summary>' +
        '<div class="kp-ch-body">' +
        slidesHtml +
        '<div class="kp-ch-actions">' +
        '<button type="button" class="kp-btn" onclick="kpCopyChapter(' +
        ci +
        ')">📋 复制本章全部</button>' +
        '</div></div></details>'
      );
    })
    .join('');

  var guideHtml = '';
  if (data.pptGuide) {
    guideHtml =
      '<div class="kp-guide card">' +
      '<h3>📥 导入 PowerPoint 建议</h3>' +
      '<p><strong>版式：</strong>' +
      kpEsc(data.pptGuide.format) +
      '</p>' +
      '<ol>' +
      (data.pptGuide.exportSteps || [])
        .map(function (s) {
          return '<li>' + kpEsc(s) + '</li>';
        })
        .join('') +
      '</ol></div>';
  }

  var beginnerNoteHtml = '';
  if (course.beginnerNote) {
    beginnerNoteHtml =
      '<div class="card kp-beginner-note"><h3>🌱 零基础说明</h3><p>' +
      kpEsc(course.beginnerNote) +
      '</p></div>';
  }

  root.innerHTML =
    '<div class="kp-course-hero">' +
    '<div class="kp-hero-badge">' +
    course.icon +
    ' ' +
    kpEsc(course.priceTag || '付费课') +
    ' · ' +
    kpEsc(course.price || '') +
    '</div>' +
    '<h1>' +
    kpEsc(course.title) +
    '</h1>' +
    '<p class="kp-hero-sub">' +
    kpEsc(course.subtitle) +
    '</p>' +
    '<div class="kp-hero-meta">' +
    '<span>📄 ' +
    (course.slideCount || 0) +
    ' 页 PPT 大纲</span>' +
    '<span>⏱ ' +
    kpEsc(course.duration || '') +
    '</span>' +
    '</div>' +
    '<p class="kp-audience"><strong>适合：</strong>' +
    kpEsc(course.audience) +
    '</p>' +
    '</div>' +
    '<div class="kp-toolbar">' +
    '<button type="button" class="kp-btn kp-btn-primary" onclick="kpDownloadPptx()">📊 下载 PPTX</button>' +
    '<button type="button" class="kp-btn kp-btn-primary" onclick="kpDownloadPngZip()">🖼️ 下载 PNG 图包</button>' +
    '<button type="button" class="kp-btn" onclick="kpDownloadOutline()">⬇️ 下载 txt 大纲</button>' +
    '<button type="button" class="kp-btn" onclick="kpCopyFullOutline()">📋 复制全部大纲</button>' +
    '</div>' +
    '<div class="kp-export-status" id="kp-export-status"></div>' +
    '<div class="kp-slide-preview" id="kp-slide-preview"></div>' +
    guideHtml +
    beginnerNoteHtml +
    '<div class="card"><h3>🎯 学习目标</h3>' +
    goalsHtml +
    '</div>' +
    '<div class="kp-chapters">' +
    chaptersHtml +
    '</div>' +
    '<div class="kp-disclaimer">' +
    kpEsc(data.disclaimer) +
    '</div>';

  window._kpCurrentCourse = course;
  if (typeof kpRenderSlidePreview === 'function') {
    requestAnimationFrame(function () {
      kpRenderSlidePreview(6);
    });
  }
}

function kpCopyChapter(chIndex) {
  var course = window._kpCurrentCourse;
  if (!course || !course.chapters || !course.chapters[chIndex]) return;
  var ch = course.chapters[chIndex];
  var lines = [ch.title, ''];
  (ch.slides || []).forEach(function (sl, si) {
    lines.push('Slide ' + (chIndex + 1) + '.' + (si + 1) + '  ' + sl.title);
    (sl.bullets || []).forEach(function (b) {
      lines.push('  • ' + b);
    });
    if (sl.plainExplain) lines.push('  [通俗说] ' + sl.plainExplain);
    if (sl.dealerTip) lines.push('  [经销要点] ' + sl.dealerTip);
    lines.push('');
  });
  kpCopyText(lines.join('\n'), 'kp-export-status');
}

function kpCopyFullOutline() {
  var course = window._kpCurrentCourse;
  if (!course || typeof buildKnowledgePayOutlineText !== 'function') return;
  kpCopyText(buildKnowledgePayOutlineText(course), 'kp-export-status');
}

function kpDownloadOutline() {
  var course = window._kpCurrentCourse;
  if (!course || typeof buildKnowledgePayOutlineText !== 'function') return;
  var text = buildKnowledgePayOutlineText(course);
  var blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  var a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = course.title + '-PPT大纲.txt';
  a.click();
  URL.revokeObjectURL(a.href);
}

document.addEventListener('DOMContentLoaded', function () {
  var params = new URLSearchParams(window.location.search);
  var courseId = params.get('course');
  var hubView = document.getElementById('kp-hub-view');
  var hubDisclaimer = document.getElementById('kp-hub-disclaimer');
  var courseRoot = document.getElementById('kp-course-root');
  var backLink = document.getElementById('kp-back-link');

  if (courseId && courseRoot) {
    if (hubView) hubView.style.display = 'none';
    if (hubDisclaimer) hubDisclaimer.style.display = 'none';
    courseRoot.style.display = 'block';
    if (backLink) {
      backLink.href = 'knowledge-pay.html';
      backLink.textContent = '← 返回课程列表';
    }
    initKnowledgePayCoursePage();
  } else if (document.getElementById('kp-course-grid')) {
    initKnowledgePayHub();
  }
});
