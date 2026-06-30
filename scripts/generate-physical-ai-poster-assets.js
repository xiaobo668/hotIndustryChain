/**
 * 生成物理AI海报 DOM 与配置片段
 * 运行: node scripts/generate-physical-ai-poster-assets.js
 */
const fs = require('fs');
const path = require('path');
const { PHYSICAL_AI_SEGMENTS, PHYSICAL_AI_INDUSTRY_KEYS } = require('./physical-ai-segments');

const keys = PHYSICAL_AI_INDUSTRY_KEYS.map((k) => `'${k}'`).join(', ');

function orderHtml(seg) {
  const id = `pa-${seg.id}`;
  return `      <div class="poster-wrap" id="order-rank-${id}-wrap" style="display:none;margin-top:20px">
        <div id="order-rank-${id}-pages"></div>
        <div class="poster-actions">
          <button class="btn btn-primary" onclick="downloadOrderRankPoster('order-rank-${id}-canvas','${seg.key}订单榜-2026.png')">⬇️ 下载${seg.key}订单榜</button>
          <button class="btn btn-secondary" onclick="copyOrderRankPoster('order-rank-${id}-canvas')">📋 复制</button>
        </div>
      </div>`;
}

function capacityHtml(seg) {
  const id = `pa-${seg.id}`;
  return `      <div class="poster-wrap" id="capacity-rank-${id}-wrap" style="display:none;margin-top:20px">
        <div id="capacity-rank-${id}-pages"></div>
        <div class="poster-actions">
          <button class="btn btn-primary" onclick="downloadCapacityRankPoster('capacity-rank-${id}-canvas','${seg.key}产能榜-2026.png')">⬇️ 下载${seg.key}产能榜</button>
          <button class="btn btn-secondary" onclick="copyCapacityRankPoster('capacity-rank-${id}-canvas')">📋 复制</button>
        </div>
      </div>`;
}

function orderConfig(seg) {
  const id = `pa-${seg.id}`;
  return `  { key: '${seg.key}', industryKeys: [${keys}], wrapId: 'order-rank-${id}-wrap', pagesId: 'order-rank-${id}-pages', canvasId: 'order-rank-${id}-canvas' },`;
}

function capacityConfig(seg) {
  const id = `pa-${seg.id}`;
  return `  { key: '${seg.key}', industryKeys: [${keys}], wrapId: 'capacity-rank-${id}-wrap', pagesId: 'capacity-rank-${id}-pages', canvasId: 'capacity-rank-${id}-canvas' },`;
}

const out = path.join(__dirname, '..', 'data', 'physical-ai-poster-assets.txt');
const content = [
  '=== ORDER HTML ===',
  PHYSICAL_AI_SEGMENTS.map(orderHtml).join('\n'),
  '',
  '=== CAPACITY HTML ===',
  PHYSICAL_AI_SEGMENTS.map(capacityHtml).join('\n'),
  '',
  '=== ORDER CONFIG ===',
  PHYSICAL_AI_SEGMENTS.map(orderConfig).join('\n'),
  '',
  '=== CAPACITY CONFIG ===',
  PHYSICAL_AI_SEGMENTS.map(capacityConfig).join('\n'),
].join('\n');

fs.writeFileSync(out, content);
console.log('Wrote', out);
