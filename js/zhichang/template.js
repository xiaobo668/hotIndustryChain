/**
 * 职场海报模版配置
 * 背景图：assets/zhichang/poster-template.jpg（493×580）
 * 中间留白区域用于叠加文字，四角装饰图保留
 */
const ZHICHANG_POSTER_TEMPLATE = {
  src: 'assets/zhichang/poster-template.jpg',
  width: 493,
  height: 580,
  displayWidth: 430,
  /** 中间文字安全区（相对模版宽高的比例） */
  textZone: {
    xRatio: 0.10,
    yRatio: 0.28,
    wRatio: 0.80,
    hRatio: 0.44,
  },
  font: {
    family: '"PingFang SC", "Microsoft YaHei", sans-serif',
    size: 24,
    minSize: 16,
    lineHeight: 1.5,
    color: '#1c1917',
    weight: '700',
  },
  sampleText: '上班第一天\n我已经想退休了',
};

/** 示例职场海报（后续新增内容在此扩展） */
const ZHICHANG_SAMPLES = [
  {
    id: 'demo-1',
    title: '上班第一天',
    text: '上班第一天\n我已经想退休了',
    tags: ['摸鱼', '打工人'],
  },
  {
    id: 'demo-2',
    title: '开会三小时',
    text: '开会三小时\n结论：下次再开',
    tags: ['会议', '职场'],
  },
  {
    id: 'demo-3',
    title: '周五下午',
    text: '周五下午四点\n灵魂已经下班',
    tags: ['周五', '下班'],
  },
];
