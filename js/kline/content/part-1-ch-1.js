/**
 * 第一部分 · 第一章：MACD（高成功率的指标之王）
 */
const KLINE_PART1_CH1 = {
  id: 'part-1-ch-1',
  chapterLabel: '第一章',
  title: '指标1：MACD — 高成功率的指标之王',
  subtitle: '认识 MACD 四大元素 · 金叉死叉 · 简单粗暴三板斧',
  icon: '👑',
  sharePoints: [
    'MACD 四要素：DIFF 快线、DEA 慢线、红绿柱、零轴线',
    '零上金叉强于零下金叉；零下死叉弱于零上死叉',
    '三板斧：抄底术（底背离）、抓主升、逃顶术（顶背离）',
    '背离：股价与指标背道而驰，MACD 中准确率很高',
    '实际操作需结合 KDJ 等指标，弥补 MACD 滞后',
  ],
  sections: [
    {
      heading: '导读：指标是量化交易的「配件」',
      body:
        '很多人觉得技术指标是「马后炮」，但在量化交易里，指标是必备工具。\n' +
        '可以把交易系统比作「武器」，指标则是提升武器性能的「配件」。\n' +
        '本章从 MACD（Moving Average Convergence Divergence，异同移动平均线）入手——常被称为高成功率的「指标之王」。',
    },
    {
      heading: '一、什么是 MACD？四大元素',
      chart: 'macd-overview',
      body:
        'MACD 由 DIFF、DEA、红绿柱、零轴线组成。\n' +
        '常用参数 MACD(12, 26, 9)。下图上方为 K 线价格，下方为 MACD 副图。',
    },
    {
      heading: '1. DIFF — 快线（黄线）',
      chart: 'macd-diff',
      body:
        'DIFF = 短期 EMA（常用 12 日）− 长期 EMA（常用 26 日）。\n' +
        '对价格变化更敏感，称为快线（图中黄线）。',
    },
    {
      heading: '2. DEA — 慢线（红线）',
      chart: 'macd-dea',
      body:
        'DEA 是对 DIFF 的平滑（常用 9 日移动平均）。\n' +
        '变化比 DIFF 慢，称为慢线（图中红线）。',
    },
    {
      heading: '3. MACD 红绿柱',
      chart: 'macd-bars',
      body:
        '红绿柱 = 2 × (DIFF − DEA)。\n' +
        '柱体高度反映多空能量：红柱偏多、绿柱偏空。',
    },
    {
      heading: '4. 零轴线 — 多空分界线',
      chart: 'macd-zero',
      body:
        '零轴是多空分界线（下图白色虚线）。\n' +
        'DIFF、DEA 在零轴上方 → 多头；在下方 → 空头。',
    },
    {
      heading: '形态一：金叉',
      chart: 'golden-cross-above',
      body:
        '金叉：DIFF 由下向上穿越 DEA，柱体常由绿转红。\n' +
        '含义：股价由跌转涨，多头发力。',
    },
    {
      heading: '零上金叉 vs 零下金叉',
      chart: 'golden-cross-above',
      chart2: 'golden-cross-below',
      chartCaption: '左图：零上金叉 · 右图：零下金叉（反弹）',
      body:
        '零上金叉：两线已在零轴上方 → 牛市「锦上添花」，常预示新一轮上攻。\n' +
        '零下金叉：两线在零轴下方 → 多为熊市反弹，力度通常较弱。\n' +
        '特例：零轴下方多次金叉（多重零下金叉）后，可靠性会提高（见下节配图）。',
    },
    {
      heading: '多重零下金叉',
      chart: 'golden-cross-multi-below',
      body: '零轴下方连续出现多次金叉后，有时会出现较强上涨，仍需结合量价确认。',
    },
    {
      heading: '形态二：死叉',
      chart: 'death-cross-above',
      body:
        '死叉：DIFF 向下跌破 DEA，柱体常由红转绿。\n' +
        '含义：股价由涨转跌，空头占优。',
    },
    {
      heading: '零上死叉 vs 零下死叉',
      chart: 'death-cross-below',
      body:
        '零上死叉：零轴上方死叉 → 多为牛市回调，调整幅度往往有限。\n' +
        '零下死叉：零轴下方死叉 → 常意味新一轮下跌，可靠性较高。',
    },
    {
      heading: '二、简单粗暴的三板斧',
      body: '熟悉金叉、死叉与零轴后，下面三条实战技法最常用。',
    },
    {
      heading: '第一板斧：MACD 抄底术（底背离）',
      chart: 'bottom-divergence',
      body:
        '① 下跌后反弹 → ② 股价再创新低 → ③ DIFF 低点抬高 → ④ 金叉确认买入。\n' +
        '操作要点：底背离 + 金叉确认后再考虑介入。',
    },
    {
      heading: '第二板斧：MACD 抓主升',
      chart: 'catch-uptrend',
      body:
        '① 上涨后调整 → ② 不破前低 → ③ 零轴附近金叉 → ④ 中阳 K 线买入。\n' +
        '操作要点：零轴略上方金叉配合中阳线，常对应主升启动。',
    },
    {
      heading: '第三板斧：MACD 逃顶术（顶背离）',
      chart: 'top-divergence',
      body:
        '① 上涨后调整 → ② 股价创新高 → ③ DIFF 未创新高 → ④ 死叉确认卖出。\n' +
        '操作要点：顶背离 + 死叉确认后考虑减仓或离场。',
    },
    {
      heading: '什么是「背离」？',
      chart: 'divergence-concept',
      body:
        '股价与指标走势相反即为背离。\n' +
        '底背离用于抄底，顶背离用于逃顶；下图示意价格走低而 DIFF 走高。',
    },
    {
      heading: '风险提示与后续学习',
      body:
        '任何形态都有特例，不可机械套用。\n' +
        'MACD 有滞后性，应结合 KDJ 等指标综合判断。',
    },
  ],
};
