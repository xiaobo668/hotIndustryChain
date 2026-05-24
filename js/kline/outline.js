/**
 * K线教学 — 本地大纲（六部分）
 * 具体内容可在 parts[].sections 中补充；sharePoints 用于分享卡片摘要
 */
const KLINE_OUTLINE = {
  title: 'K线教学',
  subtitle: '从入门到实战的系统化课程',
  description: '六章循序渐进，掌握 K 线读图、形态识别与量价分析。正文稍后补充，大纲与分享功能已就绪。',
  parts: [
    {
      id: 'part-1',
      partLabel: '第一部分',
      title: '半小时看懂常用指标',
      subtitle: '从 MACD 开始，建立指标读图框架',
      icon: '📊',
      sharePoints: [
        '第一部分含多章指标教程，可按章阅读与分享',
        '第一章：MACD 四大元素与三板斧',
      ],
      sections: [],
      chapters: [],
    },
    {
      id: 'part-2',
      partLabel: '第二部分',
      title: '单根K线与经典形态',
      subtitle: '读懂每一根蜡烛的信号',
      icon: '🕯️',
      sharePoints: [
        '大阳线、大阴线的力度',
        '十字星、锤子线、吊颈线',
        '单根 K 线的反转与犹豫',
      ],
      sections: [
        { heading: '常见单 K 形态', body: '（内容待补充）' },
        { heading: '反转与持续信号', body: '（内容待补充）' },
      ],
    },
    {
      id: 'part-3',
      partLabel: '第三部分',
      title: '组合形态与趋势判断',
      subtitle: '多空力量在图形上的博弈',
      icon: '📈',
      sharePoints: [
        '双顶、双底与头肩形态',
        '上升/下降通道',
        '趋势与震荡的区分',
      ],
      sections: [
        { heading: '经典组合形态', body: '（内容待补充）' },
        { heading: '趋势识别要点', body: '（内容待补充）' },
      ],
    },
    {
      id: 'part-4',
      partLabel: '第四部分',
      title: '成交量与量价关系',
      subtitle: '量增价涨、量价背离怎么看',
      icon: '📉',
      sharePoints: [
        '放量与缩量的含义',
        '量价配合与背离',
        '地量见地价、天量见天价',
      ],
      sections: [
        { heading: '成交量的读法', body: '（内容待补充）' },
        { heading: '量价配合实战', body: '（内容待补充）' },
      ],
    },
    {
      id: 'part-5',
      partLabel: '第五部分',
      title: '均线、趋势线与关键位',
      subtitle: '画准支撑压力与趋势方向',
      icon: '📐',
      sharePoints: [
        '均线多头排列与空头排列',
        '趋势线画法',
        '支撑位与压力位',
      ],
      sections: [
        { heading: '均线系统', body: '（内容待补充）' },
        { heading: '画线与关键位', body: '（内容待补充）' },
      ],
    },
    {
      id: 'part-6',
      partLabel: '第六部分',
      title: '实战复盘与交易纪律',
      subtitle: '从看懂 K 线到建立交易习惯',
      icon: '🎯',
      sharePoints: [
        '复盘步骤与记录方法',
        '止损止盈与仓位管理',
        '常见误区与风险提示',
      ],
      sections: [
        { heading: '复盘案例框架', body: '（内容待补充）' },
        { heading: '纪律与风控', body: '（内容待补充）' },
      ],
    },
  ],
};

function getKlinePart(partId) {
  return KLINE_OUTLINE.parts.find(p => p.id === partId) || null;
}

function getKlineChapter(partId, chapterId) {
  const part = getKlinePart(partId);
  if (!part || !part.chapters) return null;
  return part.chapters.find(c => c.id === chapterId) || null;
}

function getKlineParts() {
  return KLINE_OUTLINE.parts;
}

/** 挂载第一部分各章正文（由 content/*.js 提供） */
function mergeKlinePartContent() {
  const p1 = getKlinePart('part-1');
  if (!p1) return;
  if (typeof KLINE_PART1_CH1 !== 'undefined') {
    p1.chapters = [KLINE_PART1_CH1];
  }
}

