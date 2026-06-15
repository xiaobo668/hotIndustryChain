/**
 * 产业链分析过程文档生成器
 * 输出 Markdown + 独立 HTML，供发布后查阅
 */
const fs = require('fs');
const path = require('path');
const { writeWechatArticle } = require('./wechat-article');

const DOCS_DIR = path.join(__dirname, '..', '..', 'docs', 'analysis');

function ensureDocsDir() {
  fs.mkdirSync(DOCS_DIR, { recursive: true });
}

function flattenChainSegments(chain) {
  const tiers = [
    { label: '上游', segments: chain.upstream || [] },
    { label: '中游', segments: chain.midstream || [] },
    { label: '下游', segments: chain.downstream || [] },
  ];
  const rows = [];
  tiers.forEach((tier) => {
    tier.segments.forEach((seg) => {
      (seg.companies || []).forEach((co) => {
        rows.push({ tier: tier.label, segment: seg.name, name: co.name, highlight: co.highlight || '' });
      });
    });
  });
  return rows;
}

function collectIssuesFixed(chain) {
  const list = [];
  ['upstream', 'midstream', 'downstream'].forEach((t) => {
    (chain[t] || []).forEach((seg) => {
      (seg.replaced || []).forEach((r) => {
        list.push({ segment: seg.name, ...r });
      });
    });
  });
  return list;
}

function mdEscape(s) {
  return String(s || '').replace(/\|/g, '\\|').replace(/\n/g, ' ');
}

function buildMarkdown(config) {
  const {
    slug,
    title,
    generatedAt,
    summary,
    methodology = [],
    chain,
    orderRank,
    sector,
    verifyScripts = [],
    extraWarnings = [],
    issuesFixed = [],
  } = config;

  const lines = [];
  lines.push(`# ${title} · 分析过程文档`);
  lines.push('');
  lines.push(`> 生成时间：${generatedAt || '—'} · 文档 ID：\`${slug}\``);
  lines.push(`> 免责声明：以下内容仅供产业链学习研究，不构成投资建议。`);
  lines.push('');
  lines.push('## 一、分析概述');
  lines.push('');
  lines.push(summary || chain.description || '');
  lines.push('');

  if (methodology.length) {
    lines.push('## 二、分析流程');
    lines.push('');
    methodology.forEach((step, i) => {
      lines.push(`${i + 1}. ${step}`);
    });
    lines.push('');
  }

  lines.push('## 三、产业链梳理');
  lines.push('');
  lines.push('### 3.1 结构说明');
  lines.push('');
  const segCount = (chain.upstream || []).length + (chain.midstream || []).length + (chain.downstream || []).length;
  lines.push(`共 **${segCount}** 个细分节点（上/中/下游），口径：${chain.key || title}相关 A 股标的，剔除科创板 688/689。`);
  lines.push('');
  lines.push('### 3.2 节点与公司');
  lines.push('');
  lines.push('| 层次 | 节点 | 公司 | 核心逻辑 |');
  lines.push('| --- | --- | --- | --- |');
  flattenChainSegments(chain).forEach((r) => {
    lines.push(`| ${r.tier} | ${mdEscape(r.segment)} | ${mdEscape(r.name)} | ${mdEscape(r.highlight)} |`);
  });
  lines.push('');

  const fixes = issuesFixed.length ? issuesFixed : collectIssuesFixed(chain);
  if (fixes.length) {
    lines.push('## 四、原图错配与修正记录');
    lines.push('');
    lines.push('| 节点 | 原标的 | 替换为 | 原因 |');
    lines.push('| --- | --- | --- | --- |');
    fixes.forEach((f) => {
      lines.push(`| ${mdEscape(f.segment)} | ${mdEscape(f.bad)} | ${mdEscape(f.replace)} | ${mdEscape(f.reason)} |`);
    });
    lines.push('');
  }

  if (sector) {
    lines.push(`${fixes.length ? '## 五' : '## 四'}、板块龙头（前锋 / 中军）`);
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

  let sectionNum = sector ? (fixes.length ? 6 : 5) : (fixes.length ? 5 : 4);
  if (orderRank && orderRank.companies?.length) {
    lines.push(`## ${sectionNum === 4 ? '四' : sectionNum === 5 ? '五' : '六'}、订单规模排行与来源核验`);
    lines.push('');
    lines.push(orderRank.subtitle || '');
    lines.push('');
    lines.push('| 排名 | 公司 | 订单/规模 | 来源类型 | 来源 | 备注 |');
    lines.push('| --- | --- | --- | --- | --- | --- |');
    orderRank.companies.forEach((co) => {
      const v = co.verify || {};
      lines.push(
        `| ${co.rank} | ${mdEscape(co.name)} | ${mdEscape(co.orderLabel)} | ${v.sourceType || '—'} | ${mdEscape(v.source)} | ${mdEscape(v.note)} |`
      );
    });
    lines.push('');
    lines.push('### 来源链接');
    lines.push('');
    orderRank.companies.forEach((co) => {
      const url = co.verify?.sourceUrl;
      if (url) lines.push(`- [${co.name}](${url})`);
    });
    lines.push('');
    sectionNum += 1;
  }

  const numChar = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
  const verifyTitle = numChar[sectionNum - 1] || String(sectionNum);
  lines.push(`## ${verifyTitle}、复验脚本`);
  lines.push('');
  if (verifyScripts.length) {
    lines.push('```bash');
    lines.push('cd hotIndustryChain');
    verifyScripts.forEach((s) => lines.push(`node scripts/${s}`));
    lines.push('```');
  } else {
    lines.push('（暂无专用复验脚本）');
  }
  lines.push('');

  lines.push('## 风险提示与数据局限');
  lines.push('');
  lines.push('- 1–6 名订单榜多为**媒体/行业梳理口径**，与公司公告可能存在差异；已尽量登记 `officialCross` 交叉验证项。');
  lines.push('- 7–10 名若无在手订单披露，以 **2025 年报营收**作规模参考，不可与在手订单直接比较。');
  lines.push('- 部分公司为平台型（跨多个节点出现），highlight 已标注主业关联度。');
  extraWarnings.forEach((w) => lines.push(`- ${w}`));
  lines.push('');
  lines.push('---');
  lines.push(`*由 scripts/lib/analysis-report.js 自动生成 · 与 data.js / sector-data.js 同步*`);

  return lines.join('\n');
}

function mdToSimpleHtml(md) {
  const esc = (s) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const lines = md.split('\n');
  let html = '';
  let inTable = false;
  let inCode = false;
  let inUl = false;

  const closeUl = () => {
    if (inUl) {
      html += '</ul>\n';
      inUl = false;
    }
  };

  lines.forEach((line) => {
    if (line.startsWith('```')) {
      if (!inCode) {
        closeUl();
        html += '<pre><code>';
        inCode = true;
      } else {
        html += '</code></pre>\n';
        inCode = false;
      }
      return;
    }
    if (inCode) {
      html += esc(line) + '\n';
      return;
    }

    if (line.startsWith('|')) {
      closeUl();
      const cells = line.split('|').slice(1, -1).map((c) => c.trim());
      if (cells.every((c) => /^[-:\s]+$/.test(c))) return;
      if (!inTable) {
        html += '<table><thead><tr>';
        cells.forEach((c) => {
          html += `<th>${inlineMd(c)}</th>`;
        });
        html += '</tr></thead><tbody>\n';
        inTable = true;
      } else {
        html += '<tr>';
        cells.forEach((c) => {
          html += `<td>${inlineMd(c)}</td>`;
        });
        html += '</tr>\n';
      }
      return;
    } else if (inTable) {
      html += '</tbody></table>\n';
      inTable = false;
    }

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
    } else if (/^\d+\.\s/.test(line)) {
      closeUl();
      html += `<p>${inlineMd(line)}</p>\n`;
    } else if (line.trim() === '') {
      closeUl();
    } else if (line.startsWith('---')) {
      closeUl();
      html += '<hr>\n';
    } else if (line.startsWith('*') && line.endsWith('*')) {
      closeUl();
      html += `<p class="footer-note">${inlineMd(line.replace(/^\*|\*$/g, ''))}</p>\n`;
    } else {
      closeUl();
      html += `<p>${inlineMd(line)}</p>\n`;
    }
  });

  if (inTable) html += '</tbody></table>\n';
  if (inUl) html += '</ul>\n';
  if (inCode) html += '</code></pre>\n';
  return html;
}

function inlineMd(text) {
  let s = esc(String(text));
  s = s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
  s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
  return s;
}

function esc(s) {
  return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function buildHtmlPage(title, bodyHtml) {
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${esc(title)} · 分析过程</title>
  <style>
    :root { --bg:#0f0f1a; --text:#e8e8f0; --muted:#8888aa; --accent:#6c63ff; --border:rgba(255,255,255,0.1); }
    * { box-sizing:border-box; }
    body { font-family:"PingFang SC",sans-serif; background:var(--bg); color:var(--text); line-height:1.7; margin:0; padding:24px; }
    .wrap { max-width:920px; margin:0 auto; }
    a { color:var(--accent); }
    h1 { font-size:24px; margin:0 0 16px; }
    h2 { font-size:18px; margin:28px 0 12px; color:#c4b5fd; border-left:3px solid var(--accent); padding-left:10px; }
    h3 { font-size:15px; margin:20px 0 8px; }
    blockquote { margin:12px 0; padding:10px 14px; border-left:3px solid var(--accent); background:rgba(108,99,255,0.08); color:var(--muted); font-size:13px; }
    table { width:100%; border-collapse:collapse; font-size:12px; margin:12px 0; }
    th,td { border:1px solid var(--border); padding:8px 10px; text-align:left; vertical-align:top; }
    th { background:rgba(108,99,255,0.15); }
    tr:nth-child(even) td { background:rgba(255,255,255,0.02); }
    pre { background:#1a1a2e; padding:14px; border-radius:8px; overflow-x:auto; font-size:12px; }
    code { background:rgba(255,255,255,0.08); padding:1px 5px; border-radius:4px; font-size:12px; }
    ul { padding-left:20px; }
    li { margin:6px 0; }
    hr { border:none; border-top:1px solid var(--border); margin:24px 0; }
    .footer-note { color:var(--muted); font-size:12px; }
    .nav { margin-bottom:20px; font-size:13px; }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="nav"><a href="../../analysis.html">← 分析文档目录</a> · <a href="../../index.html">产业链首页</a></div>
    ${bodyHtml}
  </div>
</body>
</html>`;
}

/**
 * @param {object} config
 * @returns {{ slug, mdPath, htmlPath, manifestEntry }}
 */
function writeAnalysisReport(config) {
  ensureDocsDir();
  const slug = config.slug;
  if (!slug) throw new Error('writeAnalysisReport: slug required');

  const md = buildMarkdown(config);
  const mdPath = path.join(DOCS_DIR, `${slug}.md`);
  const htmlPath = path.join(DOCS_DIR, `${slug}.html`);
  fs.writeFileSync(mdPath, md, 'utf8');
  fs.writeFileSync(htmlPath, buildHtmlPage(config.title, mdToSimpleHtml(md)), 'utf8');

  const wechat = writeWechatArticle(config);

  const manifestEntry = {
    slug,
    title: config.title,
    generatedAt: config.generatedAt || '',
    chainKey: config.chain?.key || config.chainKey || '',
    md: `docs/analysis/${slug}.md`,
    html: `docs/analysis/${slug}.html`,
    wechatMd: wechat.manifestEntry.md,
    wechatHtml: wechat.manifestEntry.html,
    hasOrderRank: !!(config.orderRank && config.orderRank.companies?.length),
    verifyScripts: config.verifyScripts || [],
  };

  return { slug, mdPath, htmlPath, manifestEntry, wechatManifestEntry: wechat.manifestEntry };
}

function writeManifest(entries) {
  ensureDocsDir();
  const sorted = [...entries].sort((a, b) => (b.generatedAt || '').localeCompare(a.generatedAt || ''));
  const manifestPath = path.join(DOCS_DIR, 'manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(sorted, null, 2), 'utf8');
  return manifestPath;
}

function buildAnalysisIndexHtml(entries) {
  const sorted = [...entries].sort((a, b) => (b.generatedAt || '').localeCompare(a.generatedAt || ''));
  const cards = sorted
    .map(
      (e) => `
    <article class="card">
      <h2><a href="docs/analysis/${e.slug}.html">${esc(e.title)}</a></h2>
      <p class="meta">${esc(e.generatedAt || '')} · ${e.hasOrderRank ? '含订单榜核验' : '产业链梳理'} · 链键：<code>${esc(e.chainKey)}</code></p>
      <div class="links">
        <a href="docs/analysis/${e.slug}.html">📄 在线阅读</a>
        <a href="docs/analysis/${e.slug}.md">📝 Markdown</a>
        ${e.wechatHtml ? `<a href="${e.wechatHtml}">📱 公众号文稿</a>` : ''}
      </div>
      <p class="verify">复验：<code>${(e.verifyScripts || []).join('</code> · <code>') || '—'}</code></p>
    </article>`
    )
    .join('\n');

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>产业链分析过程文档</title>
  <style>
    :root { --bg:#0f0f1a; --text:#e8e8f0; --muted:#8888aa; --accent:#6c63ff; }
    * { box-sizing:border-box; margin:0; padding:0; }
    body { font-family:"PingFang SC",sans-serif; background:var(--bg); color:var(--text); padding:24px; }
    .wrap { max-width:720px; margin:0 auto; }
    h1 { font-size:22px; margin-bottom:8px; }
    .sub { color:var(--muted); font-size:14px; line-height:1.6; margin-bottom:24px; }
    .card { background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.1); border-radius:12px; padding:16px 18px; margin-bottom:14px; }
    .card h2 { font-size:17px; margin-bottom:6px; }
    .card h2 a { color:#c4b5fd; text-decoration:none; }
    .card h2 a:hover { text-decoration:underline; }
    .meta, .verify { font-size:12px; color:var(--muted); margin-top:6px; }
    .links { display:flex; gap:14px; margin-top:10px; font-size:13px; }
    a { color:var(--accent); }
    code { background:rgba(255,255,255,0.08); padding:1px 5px; border-radius:4px; font-size:11px; }
    .back { display:inline-block; margin-bottom:16px; font-size:13px; }
  </style>
</head>
<body>
  <div class="wrap">
    <a class="back" href="index.html">← 返回产业链分析首页</a>
    <h1>📋 产业链分析过程文档</h1>
    <p class="sub">每次发布新产业链/订单榜后，由构建脚本自动生成分析过程、来源核验与复验说明，便于发布后回溯查阅。</p>
    ${cards || '<p class="sub">暂无文档，运行 <code>node scripts/build-all-analysis-docs.js</code> 生成。</p>'}
  </div>
</body>
</html>`;
}

function writeAnalysisIndex(entries) {
  const root = path.join(__dirname, '..', '..');
  fs.writeFileSync(path.join(root, 'analysis.html'), buildAnalysisIndexHtml(entries), 'utf8');
  return writeManifest(entries);
}

module.exports = {
  DOCS_DIR,
  buildMarkdown,
  writeAnalysisReport,
  writeManifest,
  writeAnalysisIndex,
  buildAnalysisIndexHtml,
};
