/**
 * 生成创新药业绩榜海报 DOM 与配置片段
 * 运行: node scripts/generate-innovative-drug-poster-assets.js
 */
const fs = require('fs');
const path = require('path');
const {
  INNOVATIVE_DRUG_PERFORMANCE_SEGMENTS,
  INNOVATIVE_DRUG_INDUSTRY_KEYS,
} = require('./innovative-drug-performance-segments');

const keys = INNOVATIVE_DRUG_INDUSTRY_KEYS.map((k) => `'${k}'`).join(', ');

function html(seg) {
  const id = `id-${seg.id}`;
  return `      <div class="poster-wrap" id="performance-rank-${id}-wrap" style="display:none;margin-top:20px">
        <div id="performance-rank-${id}-pages"></div>
        <div class="poster-actions">
          <button class="btn btn-primary" onclick="downloadPerformanceRankPoster('performance-rank-${id}-canvas','${seg.key}业绩榜-2026.png')">⬇️ 下载${seg.key}业绩榜</button>
          <button class="btn btn-secondary" onclick="copyPerformanceRankPoster('performance-rank-${id}-canvas')">📋 复制</button>
        </div>
      </div>`;
}

function config(seg) {
  const id = `id-${seg.id}`;
  return `  { key: '${seg.key}', industryKeys: [${keys}], wrapId: 'performance-rank-${id}-wrap', pagesId: 'performance-rank-${id}-pages', canvasId: 'performance-rank-${id}-canvas' },`;
}

const out = path.join(__dirname, '..', 'data', 'innovative-drug-poster-assets.txt');
fs.writeFileSync(
  out,
  [
    '=== HTML ===',
    INNOVATIVE_DRUG_PERFORMANCE_SEGMENTS.map(html).join('\n'),
    '',
    '=== CONFIG ===',
    INNOVATIVE_DRUG_PERFORMANCE_SEGMENTS.map(config).join('\n'),
  ].join('\n')
);
console.log('Wrote', out);
