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
    minSize: 10,
    lineHeight: 1.45,
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
  {
    id: 'demo-4',
    title: '周日晚上十点',
    text: '周日晚上十点\n领导发来：在吗？',
    tags: ['边界感', '周末'],
  },
  {
    id: 'demo-5',
    title: '八十份简历',
    text: '简历投了八十份\n全部：已读不回',
    tags: ['求职', '焦虑'],
  },
  {
    id: 'demo-6',
    title: '人还在工位',
    text: '人在工位坐着\n心已经离职八百回',
    tags: ['内耗', '倦怠'],
  },
  {
    id: 'demo-7',
    title: '工作第五年',
    text: '工作第五年\n唯一成长：秒回「收到」',
    tags: ['成长', '讽刺'],
  },
  {
    id: 'demo-8',
    title: '工资到账',
    text: '房租水电扣完\n又成月光打工人',
    tags: ['薪资', '现实'],
  },
];
