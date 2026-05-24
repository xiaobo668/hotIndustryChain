/**
 * K线教学 Space — 规范与内容登记
 * 后续增删课程素材时，优先更新本文件登记信息，再改 outline.js
 */
const KLINE_SPACE = {
  id: 'kline-space',
  title: 'K线 Space',
  subtitle: '内容规范 · 维护清单 · 变更记录',
  version: '1.0.0',
  updatedAt: '2026-05-24',

  purpose:
    '统一记录 K 线教学模块的文件职责、字段格式、章节进度与变更历史，避免内容与分享配置不一致。',

  moduleFiles: [
    {
      path: 'js/kline/outline.js',
      role: '课程大纲与部分结构',
      required: true,
      editWhen: '调整 part 标题、chapters 挂载',
    },
    {
      path: 'js/kline/content/part-1-ch-1.js',
      role: '第一部分第一章正文（MACD）',
      required: true,
      editWhen: '修改 MACD 章节 sections、sharePoints',
    },
    {
      path: 'js/kline/space/space.js',
      role: 'Space 规范与进度登记',
      required: true,
      editWhen: '更新维护状态、变更记录、规范说明',
    },
    {
      path: 'js/kline/share.js',
      role: '分享链接与文案生成',
      required: false,
      editWhen: '调整分享 URL 规则或文案模板',
    },
    {
      path: 'js/kline/render.js',
      role: '章节与分享卡片渲染',
      required: false,
      editWhen: '调整正文排版或卡片样式',
    },
    {
      path: 'share/kline.html',
      role: '独立分享落地页',
      required: false,
      editWhen: '分享页布局或 SEO 标题',
    },
  ],

  /** 章节对象字段规范（对应 outline.js parts[]） */
  partSchema: [
    { field: 'id', type: 'string', required: true, rule: 'part-1 … part-6，创建后勿改' },
    { field: 'partLabel', type: 'string', required: true, rule: '如「第一部分」' },
    { field: 'title', type: 'string', required: true, rule: '章标题，建议 ≤ 20 字' },
    { field: 'subtitle', type: 'string', required: true, rule: '副标题/一句话说明' },
    { field: 'icon', type: 'string', required: false, rule: '单字符 emoji' },
    {
      field: 'sections',
      type: 'array',
      required: true,
      rule: '每项 { heading, body, chart?, chart2?, image? }；chart 为 charts.js 场景名',
    },
    {
      field: 'sharePoints',
      type: 'string[]',
      required: true,
      rule: '3～5 条要点，用于分享卡片与文案',
    },
  ],

  sectionSchema: [
    { field: 'heading', type: 'string', required: true, rule: '小节标题' },
    { field: 'body', type: 'string', required: true, rule: '正文；占位可用「（内容待补充）」前缀' },
  ],

  shareConventions: [
    '分享链接：share/kline.html?chapter={partId}',
    '应用内链：index.html#kline/{partId}',
    'sharePoints 条数建议 3～5 条，单条 ≤ 30 字',
    '正文更新后需重新生成分享卡片预览',
  ],

  statusLabels: {
    empty: '未开始',
    draft: '草稿',
    review: '待校对',
    ready: '可发布',
  },

  /**
   * 章节维护登记（与 outline parts 一一对应）
   * status: empty | draft | review | ready
   */
  partsRegistry: [
    {
      partId: 'part-1',
      status: 'review',
      owner: '',
      notes: '第一章 MACD 正文已录入（part-1-ch-1.js）；后续章待补充',
      assets: [],
      lastEdit: '2026-05-24',
    },
    {
      partId: 'part-2',
      status: 'draft',
      owner: '',
      notes: '单 K 形态图解待补充',
      assets: [],
      lastEdit: null,
    },
    {
      partId: 'part-3',
      status: 'draft',
      owner: '',
      notes: '组合形态案例待补充',
      assets: [],
      lastEdit: null,
    },
    {
      partId: 'part-4',
      status: 'draft',
      owner: '',
      notes: '量价章节待补充',
      assets: [],
      lastEdit: null,
    },
    {
      partId: 'part-5',
      status: 'draft',
      owner: '',
      notes: '均线/画线示意待补充',
      assets: [],
      lastEdit: null,
    },
    {
      partId: 'part-6',
      status: 'draft',
      owner: '',
      notes: '实战复盘模板待补充',
      assets: [],
      lastEdit: null,
    },
  ],

  changelog: [
    {
      date: '2026-05-24',
      author: 'content',
      summary: '第一章配图：各节增加 ECharts K 线 + MACD 副图（charts.js 场景）',
    },
    {
      date: '2026-05-24',
      author: 'content',
      summary: '第一部分第一章：MACD 指标全文（四大元素、金叉死叉、三板斧、背离）',
    },
    {
      date: '2026-05-24',
      author: 'system',
      summary: '初始化 K线 Space：规范字段、六章登记、变更记录',
    },
    {
      date: '2026-05-24',
      author: 'system',
      summary: '上线 K线教学模块：大纲、章节阅读、分享链接与卡片',
    },
  ],

  todos: [
    { id: 'content-p1-p6', text: '按 partsRegistry 顺序补全 outline.js 六章正文', done: false },
    { id: 'assets', text: '如需配图，将资源放入 js/kline/space/assets/ 并在 partsRegistry.assets 登记文件名', done: false },
    { id: 'share-verify', text: '每章 ready 后在分享模块做一次链接与卡片验证', done: false },
  ],
};

function getKlineSpace() {
  return KLINE_SPACE;
}

function getKlinePartRegistry(partId) {
  return KLINE_SPACE.partsRegistry.find(r => r.partId === partId) || null;
}

/** 根据 outline 自动统计章节完成度（供 Space 展示） */
function getKlinePartProgress(partId) {
  const part = typeof getKlinePart === 'function' ? getKlinePart(partId) : null;
  if (!part) return { sections: 0, filled: 0, sharePoints: 0, chapters: 0 };

  let sections = part.sections || [];
  if (part.chapters && part.chapters.length) {
    sections = part.chapters.flatMap(ch => ch.sections || []);
  }
  const filled = sections.filter(s => s.body && !/待补充/.test(s.body)).length;
  const sharePoints = part.chapters && part.chapters.length
    ? part.chapters.reduce((n, ch) => n + (ch.sharePoints || []).length, 0)
    : (part.sharePoints || []).length;

  return {
    sections: sections.length,
    filled,
    sharePoints,
    chapters: (part.chapters || []).length,
  };
}
