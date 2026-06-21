/**
 * 健康饮食 · Top10 榜单海报模版（三种配色）
 */
const SHILIAO_LIST_POSTER_W = 390;

const SHILIAO_LIST_THEMES = {
  green: {
    id: 'green',
    name: '清新绿',
    bg: '#f4f9f1',
    title: '#4a5d23',
    keyword: '#f5a623',
    desc: '#333333',
    quoteMarks: false,
    bottomDecor: 'leaves',
    titleSparkle: true,
  },
  mint: {
    id: 'mint',
    name: '薄荷紫',
    bg: '#f2f8f5',
    title: '#333333',
    keyword: '#9146ff',
    desc: '#333333',
    quoteMarks: true,
    quoteColor: '#c5ddd0',
    bottomDecor: 'none',
    titleSparkle: true,
  },
  pink: {
    id: 'pink',
    name: '温柔粉',
    bg: '#fdf2f5',
    title: '#8b1c4b',
    keyword: '#b24531',
    desc: '#333333',
    quoteMarks: false,
    bottomDecor: 'playful',
    titleSparkle: true,
  },
  clean: {
    id: 'clean',
    name: '笔记白',
    bg: '#ffffff',
    title: '#111111',
    keyword: '#111111',
    desc: '#333333',
    quoteMarks: false,
    bottomDecor: 'none',
    titleSparkle: true,
    noteStyle: true,
  },
  warm: {
    id: 'warm',
    name: '暖杏色',
    bg: '#fffaf5',
    title: '#7c4a1e',
    keyword: '#c05621',
    desc: '#444444',
    quoteMarks: false,
    bottomDecor: 'none',
    titleSparkle: true,
  },
};

function getShiliaoListTheme(id) {
  return SHILIAO_LIST_THEMES[id] || SHILIAO_LIST_THEMES.green;
}

function getShiliaoListThemeList() {
  return Object.values(SHILIAO_LIST_THEMES);
}
