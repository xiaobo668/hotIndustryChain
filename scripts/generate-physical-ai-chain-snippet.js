/**
 * 从 physical-ai-segments 生成 data.js 物理AI产业链片段
 */
const { PHYSICAL_AI_SEGMENTS } = require('./physical-ai-segments');

function segNode(seg) {
  return {
    name: seg.chainName,
    companies: seg.chainCompanies,
  };
}

const upstream = PHYSICAL_AI_SEGMENTS.slice(0, 4).map(segNode);
const midstream = PHYSICAL_AI_SEGMENTS.slice(4, 10).map(segNode);
const downstream = PHYSICAL_AI_SEGMENTS.slice(10, 12).map(segNode);

const snippet = `  "物理AI": {
    name: "物理AI",
    color: "#6366f1",
    gradient: ["#6366f1", "#4338ca"],
    description: "中国人形机器人供应链图谱：从AI大脑/算力芯片、视觉与3D感知、力觉触觉传感，到电机执行、减速传动、工控伺服，再到电池磁材与结构模组，覆盖Physical AI具身智能核心硬件环节。",
    upstream: ${JSON.stringify(upstream, null, 6).replace(/"([^"]+)":/g, '$1:').replace(/"/g, '"')},
    midstream: ${JSON.stringify(midstream, null, 6).replace(/"([^"]+)":/g, '$1:').replace(/"/g, '"')},
    downstream: ${JSON.stringify(downstream, null, 6).replace(/"([^"]+)":/g, '$1:').replace(/"/g, '"')}
  },`;

// Fix JSON to JS object literal style
function toJs(obj, indent) {
  const pad = ' '.repeat(indent);
  const inner = ' '.repeat(indent + 2);
  if (Array.isArray(obj)) {
    if (!obj.length) return '[]';
    return '[\n' + obj.map((item) => inner + toJs(item, indent + 2)).join(',\n') + '\n' + pad + ']';
  }
  const entries = Object.entries(obj);
  return '{\n' + entries.map(([k, v]) => {
    if (k === 'companies') {
      const cos = v.map((c) => `${inner}  { name: "${c.name}", highlight: "${c.highlight}" }`).join(',\n');
      return `${inner}name: "${obj.name}",\n${inner}companies: [\n${cos}\n${inner}]`;
    }
    return null;
  }).filter(Boolean).join(',\n') + '\n' + pad + '}';
}

const upstreamJs = '[\n' + upstream.map((s) => `      {\n        name: "${s.name}",\n        companies: [\n${s.companies.map((c) => `          { name: "${c.name}", highlight: "${c.highlight}" }`).join(',\n')}\n        ]\n      }`).join(',\n') + '\n    ]';
const midstreamJs = '[\n' + midstream.map((s) => `      {\n        name: "${s.name}",\n        companies: [\n${s.companies.map((c) => `          { name: "${c.name}", highlight: "${c.highlight}" }`).join(',\n')}\n        ]\n      }`).join(',\n') + '\n    ]';
const downstreamJs = '[\n' + downstream.map((s) => `      {\n        name: "${s.name}",\n        companies: [\n${s.companies.map((c) => `          { name: "${c.name}", highlight: "${c.highlight}" }`).join(',\n')}\n        ]\n      }`).join(',\n') + '\n    ]';

const out = `  "物理AI": {
    name: "物理AI",
    color: "#6366f1",
    gradient: ["#6366f1", "#4338ca"],
    description: "中国人形机器人供应链图谱：从AI大脑/算力芯片、视觉与3D感知、力觉触觉传感，到电机执行、减速传动、工控伺服，再到电池磁材与结构模组，覆盖Physical AI具身智能核心硬件环节。",
    upstream: ${upstreamJs},
    midstream: ${midstreamJs},
    downstream: ${downstreamJs}
  },`;

require('fs').writeFileSync(require('path').join(__dirname, '..', 'data', 'physical-ai-chain-snippet.js.txt'), out);
console.log('Wrote data/physical-ai-chain-snippet.js.txt');
