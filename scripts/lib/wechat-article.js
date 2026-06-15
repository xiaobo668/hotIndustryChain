/**
 * 公众号文稿生成器
 * 在生成产业链 / 订单榜时同步输出可发布的 Markdown + HTML
 */
const fs = require('fs');
const path = require('path');

const WECHAT_DIR = path.join(__dirname, '..', '..', 'docs', 'wechat');

function ensureWechatDir() {
  fs.mkdirSync(WECHAT_DIR, { recursive: true });
}

function defaultArticleTitle(config) {
  const name = (config.chain?.name || config.chain?.key || config.title || '').replace(/\s*2026\s*$/, '');
  if (config.chain && config.orderRank?.companies?.length) {
    return `2026${name}产业链全梳理：订单Top10来了`;
  }
  if (config.orderRank?.companies?.length) {
    return `2026年${name}订单规模Top10`;
  }
  return `${name}产业链全梳理（2026）`;
}

function tierSegments(chain, tier) {
  return (chain[tier] || []).map((seg) => ({
    tier,
    name: seg.name,
    companies: seg.companies || [],
  }));
}

function buildWechatMarkdown(config) {
  const {
    articleTitle,
    title,
    generatedAt,
    summary,
    chain,
    orderRank,
    sector,
    extraWarnings = [],
    tags = [],
  } = config;

  const headline = articleTitle || defaultArticleTitle(config);
  const topic = chain?.name || chain?.key || orderRank?.key || title || '';
  const lines = [];

  lines.push(`# ${headline}`);
  lines.push('');
  lines.push(`> ${generatedAt || '2026'} · ${topic} · 产业链学习`);
  lines.push('');
  lines.push('**【导读】**');
  lines.push('');
  lines.push(summary || chain?.description || orderRank?.subtitle || `${topic}最新产业链与订单梳理，一文看懂上中下游与核心标的。`);
  lines.push('');

  if (chain) {
    lines.push('## 一、为什么现在关注这个方向？');
    lines.push('');
    const desc = chain.description || '';
    const firstSentence = desc.split(/[。！？]/)[0];
    lines.push(firstSentence ? `${firstSentence}。` : desc);
    if (desc.length > firstSentence.length + 1) {
      lines.push('');
      lines.push(desc.slice(firstSentence.length + 1).trim());
    }
    lines.push('');

    lines.push('## 二、产业链全景：上中下游怎么分？');
    lines.push('');
    const tiers = [
      { label: '上游', key: 'upstream' },
      { label: '中游', key: 'midstream' },
      { label: '下游', key: 'downstream' },
    ];
    tiers.forEach(({ label, key }) => {
      const segs = tierSegments(chain, key);
      if (!segs.length) return;
      lines.push(`### ${label}`);
      lines.push('');
      segs.forEach((seg) => {
        lines.push(`**${seg.name}**`);
        seg.companies.forEach((co) => {
          lines.push(`- **${co.name}**：${co.highlight || ''}`);
        });
        lines.push('');
      });
    });
  }

  if (sector && (sector.vanguard?.companies?.length || sector.center?.companies?.length)) {
    const secNum = chain ? '三' : '一';
    lines.push(`## ${secNum}、板块龙头：前锋与中军`);
    lines.push('');
    lines.push('### 前锋（情绪龙头）');
    lines.push('');
    (sector.vanguard?.companies || []).forEach((c) => {
      lines.push(`- **${c.name}**：${c.highlight}`);
    });
    lines.push('');
    lines.push('### 中军（趋势龙头）');
    lines.push('');
    (sector.center?.companies || []).forEach((c) => {
      lines.push(`- **${c.name}**：${c.highlight}`);
    });
    lines.push('');
  }

  if (orderRank?.companies?.length) {
    const nums = ['一', '二', '三', '四', '五', '六'];
    let n = 1;
    if (chain) n = sector ? 4 : 3;
    else if (sector) n = 2;
    const secNum = nums[n - 1] || String(n);
    lines.push(`## ${secNum}、2026订单规模 Top10`);
    lines.push('');
    if (orderRank.subtitle) lines.push(orderRank.subtitle);
    lines.push('');
    orderRank.companies.forEach((co) => {
      lines.push(`**${co.rank}. ${co.name}** · ${co.orderLabel || ''}`);
      lines.push(`${co.highlight || ''}`);
      const v = co.verify || {};
      if (v.source) lines.push(`*来源：${v.source}${v.sourceDate ? `（${v.sourceDate}）` : ''}*`);
      lines.push('');
    });
  }

  const warnNum = (() => {
    let n = 1;
    if (chain) n++;
    if (sector) n++;
    if (orderRank?.companies?.length) n++;
    return ['一', '二', '三', '四', '五', '六'][n - 1] || String(n);
  })();

  lines.push(`## ${warnNum}、关注逻辑与风险提示`);
  lines.push('');
  lines.push('- 产业链梳理基于公开信息与行业报道，**仅供学习研究，不构成投资建议**。');
  if (orderRank?.companies?.length) {
    lines.push('- 订单榜 1–6 名多为**媒体/行业梳理口径**，与公司公告可能存在差异；7–10 名部分以年报营收作参考。');
  }
  lines.push('- 标的关联度因公司业务多元化存在差异，请以公司公告与主业结构为准。');
  extraWarnings.forEach((w) => lines.push(`- ${w}`));
  lines.push('');

  if (orderRank?.companies?.length) {
    const urls = [];
    const seen = new Set();
    orderRank.companies.forEach((co) => {
      const url = co.verify?.sourceUrl;
      if (url && !seen.has(url)) {
        seen.add(url);
        urls.push({ name: co.name, url, source: co.verify.source });
      }
    });
    if (urls.length) {
      lines.push('**主要信息来源**');
      lines.push('');
      urls.forEach((u) => lines.push(`- ${u.source || u.name}：${u.url}`));
      lines.push('');
    }
  }

  if (tags.length) {
    lines.push(`**标签**：${tags.map((t) => `#${t}`).join(' ')}`);
    lines.push('');
  }

  lines.push('---');
  lines.push('');
  lines.push('*本文由产业链分析工具辅助整理，含 AI 生成内容；发布时请勾选「含 AI 生成内容」声明。*');

  return lines.join('\n');
}

function esc(s) {
  return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function inlineMd(text) {
  let s = esc(text);
  s = s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/\*(.+?)\*/g, '<em>$1</em>');
  s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
  s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  return s;
}

function mdToWechatHtml(md) {
  const lines = md.split('\n');
  let html = '';
  let inUl = false;

  const closeUl = () => {
    if (inUl) {
      html += '</ul>\n';
      inUl = false;
    }
  };

  lines.forEach((line) => {
    if (line.startsWith('# ')) {
      closeUl();
      html += `<h1>${inlineMd(line.slice(2))}</h1>\n`;
    } else if (line.startsWith('## ')) {
      closeUl();
      html += `<h2>${inlineMd(line.slice(3))}</h2>\n`;
    } else if (line.startsWith('### ')) {
      closeUl();
      html += `<h3>${inlineMd(line.slice(4))}</h3>\n`;
    } else if (line.startsWith('> ')) {
      closeUl();
      html += `<blockquote>${inlineMd(line.slice(2))}</blockquote>\n`;
    } else if (line.startsWith('- ')) {
      if (!inUl) {
        html += '<ul>\n';
        inUl = true;
      }
      html += `<li>${inlineMd(line.slice(2))}</li>\n`;
    } else if (line.trim() === '') {
      closeUl();
    } else if (line.startsWith('---')) {
      closeUl();
      html += '<hr>\n';
    } else if (line.startsWith('*') && line.endsWith('*') && !line.startsWith('**')) {
      closeUl();
      html += `<p class="footer">${inlineMd(line.replace(/^\*|\*$/g, ''))}</p>\n`;
    } else {
      closeUl();
      html += `<p>${inlineMd(line)}</p>\n`;
    }
  });
  if (inUl) html += '</ul>\n';
  return html;
}

function buildWechatHtmlPage(title, bodyHtml, mdRaw) {
  const mdJson = JSON.stringify(mdRaw);
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${esc(title)} · 公众号文稿</title>
  <style>
    :root { --text:#333; --muted:#666; --accent:#07c160; --border:#e7e7e7; }
    * { box-sizing:border-box; }
    body { font-family:-apple-system,"PingFang SC","Helvetica Neue",sans-serif; background:#f5f5f5; color:var(--text); line-height:1.85; margin:0; padding:20px; }
    .wrap { max-width:680px; margin:0 auto; background:#fff; padding:28px 24px 36px; border-radius:8px; box-shadow:0 1px 4px rgba(0,0,0,0.06); }
    .toolbar { display:flex; gap:10px; flex-wrap:wrap; margin-bottom:20px; padding-bottom:16px; border-bottom:1px solid var(--border); }
    .btn { padding:8px 16px; border-radius:6px; border:1px solid var(--border); background:#fff; font-size:14px; cursor:pointer; }
    .btn-primary { background:var(--accent); color:#fff; border-color:var(--accent); }
    .nav { font-size:13px; color:var(--muted); margin-bottom:16px; }
    .nav a { color:var(--accent); text-decoration:none; }
    h1 { font-size:22px; line-height:1.4; margin:0 0 12px; font-weight:700; }
    h2 { font-size:18px; margin:28px 0 12px; font-weight:700; color:#1a1a1a; }
    h3 { font-size:16px; margin:20px 0 8px; font-weight:600; }
    blockquote { margin:12px 0; padding:10px 14px; border-left:3px solid var(--accent); background:#f9f9f9; color:var(--muted); font-size:14px; }
    p { margin:10px 0; font-size:16px; }
    ul { padding-left:22px; margin:10px 0; }
    li { margin:8px 0; font-size:16px; }
    hr { border:none; border-top:1px solid var(--border); margin:24px 0; }
    .footer { color:var(--muted); font-size:13px; }
    .hint { font-size:12px; color:var(--muted); margin-top:8px; }
    #copy-status { font-size:13px; color:var(--accent); margin-left:8px; }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="nav"><a href="../../wechat.html">← 公众号文稿目录</a> · <a href="../../index.html">产业链首页</a></div>
    <div class="toolbar">
      <button class="btn btn-primary" type="button" onclick="copyArticle()">📋 复制全文（粘贴到公众号）</button>
      <button class="btn" type="button" onclick="copyPlain()">📄 复制纯文本</button>
      <span id="copy-status"></span>
    </div>
    <p class="hint">提示：复制后粘贴至公众号编辑器；发布时勾选「含 AI 生成内容」。</p>
    <article id="article-body">
      ${bodyHtml}
    </article>
  </div>
  <script>
    const MD_RAW = ${mdJson};
    function copyArticle() {
      const el = document.getElementById('article-body');
      const html = el.innerHTML;
      const blob = new Blob([html], { type: 'text/html' });
      const plain = el.innerText;
      navigator.clipboard.write([
        new ClipboardItem({
          'text/html': blob,
          'text/plain': new Blob([plain], { type: 'text/plain' })
        })
      ]).then(() => setStatus('✅ 已复制（含格式）'), () => fallbackCopy(plain));
    }
    function copyPlain() {
      const plain = document.getElementById('article-body').innerText;
      navigator.clipboard.writeText(plain).then(() => setStatus('✅ 纯文本已复制'), () => fallbackCopy(plain));
    }
    function fallbackCopy(text) {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setStatus('✅ 已复制');
    }
    function setStatus(msg) {
      document.getElementById('copy-status').textContent = msg;
      setTimeout(() => { document.getElementById('copy-status').textContent = ''; }, 3000);
    }
  </script>
</body>
</html>`;
}

/**
 * @param {object} config — 与 writeAnalysisReport 共用字段
 * @returns {{ slug, mdPath, htmlPath, manifestEntry }}
 */
function writeWechatArticle(config) {
  ensureWechatDir();
  const slug = config.slug;
  if (!slug) throw new Error('writeWechatArticle: slug required');

  const md = buildWechatMarkdown(config);
  const mdPath = path.join(WECHAT_DIR, `${slug}.md`);
  const htmlPath = path.join(WECHAT_DIR, `${slug}.html`);
  const articleTitle = config.articleTitle || defaultArticleTitle(config);

  fs.writeFileSync(mdPath, md, 'utf8');
  fs.writeFileSync(htmlPath, buildWechatHtmlPage(articleTitle, mdToWechatHtml(md), md), 'utf8');

  const manifestEntry = {
    slug,
    title: config.title || articleTitle,
    articleTitle,
    generatedAt: config.generatedAt || '',
    chainKey: config.chain?.key || config.chainKey || '',
    md: `docs/wechat/${slug}.md`,
    html: `docs/wechat/${slug}.html`,
    hasOrderRank: !!(config.orderRank && config.orderRank.companies?.length),
    hasChain: !!config.chain,
  };

  return { slug, mdPath, htmlPath, manifestEntry };
}

function writeWechatManifest(entries) {
  ensureWechatDir();
  const sorted = [...entries].sort((a, b) => (b.generatedAt || '').localeCompare(a.generatedAt || ''));
  const manifestPath = path.join(WECHAT_DIR, 'manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(sorted, null, 2), 'utf8');
  return manifestPath;
}

function buildWechatIndexHtml(entries) {
  const sorted = [...entries].sort((a, b) => (b.generatedAt || '').localeCompare(a.generatedAt || ''));
  const cards = sorted
    .map(
      (e) => `
    <article class="card">
      <h2><a href="docs/wechat/${e.slug}.html">${esc(e.articleTitle || e.title)}</a></h2>
      <p class="meta">${esc(e.generatedAt || '')} · ${e.hasChain ? '产业链' : ''}${e.hasChain && e.hasOrderRank ? ' + ' : ''}${e.hasOrderRank ? '订单榜' : ''} · 链键：<code>${esc(e.chainKey)}</code></p>
      <div class="links">
        <a href="docs/wechat/${e.slug}.html">📱 预览并复制</a>
        <a href="docs/wechat/${e.slug}.md">📝 Markdown</a>
      </div>
    </article>`
    )
    .join('\n');

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>公众号文稿</title>
  <style>
    :root { --bg:#0f0f1a; --text:#e8e8f0; --muted:#8888aa; --accent:#07c160; }
    * { box-sizing:border-box; margin:0; padding:0; }
    body { font-family:"PingFang SC",sans-serif; background:var(--bg); color:var(--text); padding:24px; }
    .wrap { max-width:720px; margin:0 auto; }
    h1 { font-size:22px; margin-bottom:8px; }
    .sub { color:var(--muted); font-size:14px; line-height:1.6; margin-bottom:24px; }
    .card { background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.1); border-radius:12px; padding:16px 18px; margin-bottom:14px; }
    .card h2 { font-size:17px; margin-bottom:6px; }
    .card h2 a { color:#6ee7b7; text-decoration:none; }
    .card h2 a:hover { text-decoration:underline; }
    .meta { font-size:12px; color:var(--muted); margin-top:6px; }
    .links { display:flex; gap:14px; margin-top:10px; font-size:13px; }
    a { color:var(--accent); }
    code { background:rgba(255,255,255,0.08); padding:1px 5px; border-radius:4px; font-size:11px; }
    .back { display:inline-block; margin-bottom:16px; font-size:13px; color:var(--accent); }
  </style>
</head>
<body>
  <div class="wrap">
    <a class="back" href="index.html">← 返回产业链分析首页</a>
    <h1>📱 公众号文稿</h1>
    <p class="sub">生成产业链或订单榜时同步产出，支持一键复制粘贴至微信公众号编辑器。发布时请勾选「含 AI 生成内容」。</p>
    ${cards || '<p class="sub">暂无文稿，运行 <code>node scripts/build-all-analysis-docs.js</code> 生成。</p>'}
  </div>
</body>
</html>`;
}

function writeWechatIndex(entries) {
  const root = path.join(__dirname, '..', '..');
  fs.writeFileSync(path.join(root, 'wechat.html'), buildWechatIndexHtml(entries), 'utf8');
  return writeWechatManifest(entries);
}

module.exports = {
  WECHAT_DIR,
  buildWechatMarkdown,
  writeWechatArticle,
  writeWechatManifest,
  writeWechatIndex,
  buildWechatIndexHtml,
  defaultArticleTitle,
};
