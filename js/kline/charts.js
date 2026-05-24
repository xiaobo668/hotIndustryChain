/**
 * K线教学 — ECharts K 线 + MACD 配图
 * 依赖：页面已加载 echarts（index.html CDN）
 */

window._klineChartInstances = window._klineChartInstances || [];

function disposeKlineCharts() {
  (window._klineChartInstances || []).forEach(ch => {
    try { ch.dispose(); } catch (e) { /* ignore */ }
  });
  window._klineChartInstances = [];
}

/** 由收盘价序列生成 OHLC（教学示意） */
function closesToOhlc(closes) {
  return closes.map((c, i) => {
    const prev = i > 0 ? closes[i - 1] : c;
    const open = prev;
    const close = c;
    const high = Math.max(open, close) * (1 + 0.008);
    const low = Math.min(open, close) * (1 - 0.008);
    return [open, close, low, high];
  });
}

function calcEMA(arr, period) {
  const k = 2 / (period + 1);
  let ema = arr[0];
  const out = [ema];
  for (let i = 1; i < arr.length; i++) {
    ema = arr[i] * k + ema * (1 - k);
    out.push(ema);
  }
  return out;
}

function calcMACD(closes, fast, slow, signal) {
  fast = fast || 12;
  slow = slow || 26;
  signal = signal || 9;
  const emaF = calcEMA(closes, fast);
  const emaS = calcEMA(closes, slow);
  const diff = emaF.map((v, i) => v - emaS[i]);
  const dea = calcEMA(diff, signal);
  const bar = diff.map((v, i) => +(2 * (v - dea[i])).toFixed(4));
  return { diff, dea, bar };
}

function barColors(bars) {
  return bars.map(v => (v >= 0 ? '#ef4444' : '#10b981'));
}

/** 各教学场景收盘价（手工构造形态） */
const KLINE_CHART_SCENARIOS = {
  'macd-overview': {
    caption: '上图：K 线价格 · 下图：MACD(12,26,9) — 黄线 DIFF 快线、红线 DEA 慢线、红绿柱与零轴',
    closes: [10, 10.2, 10.5, 10.3, 10.8, 11.2, 11, 11.5, 11.8, 12.2, 12, 12.5, 12.8, 13, 12.7, 13.2, 13.5, 13.3, 13.8, 14],
  },
  'macd-diff': {
    caption: '黄线 DIFF 对价格更敏感，往往先于 DEA 转向',
    closes: [12, 11.5, 11, 10.5, 10.2, 10.8, 11.5, 12, 12.8, 13.2, 13.5, 13, 13.8, 14.2, 14.5, 14, 14.8, 15.2, 15.5, 15],
    highlight: 'diff',
  },
  'macd-dea': {
    caption: '红线 DEA 为 DIFF 的平滑，变化更慢，称慢线',
    closes: [12, 11.5, 11, 10.5, 10.2, 10.8, 11.5, 12, 12.8, 13.2, 13.5, 13, 13.8, 14.2, 14.5, 14, 14.8, 15.2, 15.5, 15],
    highlight: 'dea',
  },
  'macd-bars': {
    caption: '红绿柱 = 2×(DIFF−DEA)，柱越高多空能量越强',
    closes: [11, 11.3, 11.8, 12.2, 12.5, 12.3, 12.8, 13.2, 13, 13.5, 13.8, 14, 13.6, 14.2, 14.5, 14.8, 14.4, 14.9, 15.2, 15],
    highlight: 'bar',
  },
  'macd-zero': {
    caption: '零轴上方偏多、下方偏空；DIFF/DEA 与柱体围绕零轴波动',
    closes: [13, 12.5, 12, 11.5, 11, 10.5, 10.2, 10.8, 11.5, 12.2, 12.8, 13.2, 13.5, 13.2, 13.8, 14.2, 14.5, 14.2, 14.8, 15],
    highlight: 'zero',
  },
  'golden-cross-above': {
    caption: '零上金叉：两线已在零轴上方，金叉常对应主升延续',
    closes: [11, 11.5, 12, 12.5, 12.2, 12.8, 13.2, 13.5, 13.2, 13.8, 14.2, 14.5, 14.2, 14.8, 15.2, 15.5, 15.2, 15.8, 16.2, 16.8],
    mark: 'golden-above',
  },
  'golden-cross-below': {
    caption: '零下金叉：零轴下方反弹，力度通常弱于零上金叉',
    closes: [14, 13.2, 12.5, 11.8, 11, 10.5, 10.2, 10.5, 10.8, 10.5, 10.2, 10.6, 10.9, 10.6, 10.3, 10.5, 10.8, 10.5, 10.2, 10.4],
    mark: 'golden-below',
  },
  'golden-cross-multi-below': {
    caption: '多重零下金叉后，有时会出现较强上涨（需结合量价确认）',
    closes: [13, 12, 11, 10.5, 10.2, 10.5, 10, 10.3, 9.8, 10.2, 9.9, 10.4, 10.8, 11.2, 11.8, 12.5, 13.2, 14, 14.8, 15.5],
    mark: 'golden-multi',
  },
  'death-cross-above': {
    caption: '零上死叉：多为牛市回调，调整幅度往往有限',
    closes: [12, 12.8, 13.5, 14, 14.5, 15, 14.8, 15.2, 15.5, 15.2, 14.8, 14.5, 14.8, 14.5, 14.2, 14.5, 14.2, 14, 14.2, 14],
    mark: 'death-above',
  },
  'death-cross-below': {
    caption: '零下死叉：常意味新一轮下跌，可靠性较高',
    closes: [12, 11.5, 11, 10.5, 10, 9.5, 9.2, 9.5, 9, 8.8, 8.5, 8.8, 8.5, 8.2, 8.5, 8.2, 7.9, 8.1, 7.8, 7.5],
    mark: 'death-below',
  },
  'bottom-divergence': {
    caption: '底背离：股价创新低，DIFF 低点抬高；金叉为买入确认',
    closes: [13, 12, 11, 10.5, 10, 10.8, 10.2, 9.8, 9.5, 10, 9.6, 9.2, 9.5, 10.2, 10.8, 11.5, 12.2, 13, 13.8, 14.5],
    mark: 'bottom-div',
  },
  'catch-uptrend': {
    caption: '抓主升：调整不破前低 + 零轴附近金叉 + 中阳突破',
    closes: [11, 11.8, 12.5, 13.2, 13.8, 14.2, 13.8, 14, 13.9, 14.2, 14.5, 14.3, 14.8, 15.2, 15.8, 16.5, 17.2, 18, 18.8, 19.5],
    mark: 'catch-up',
  },
  'top-divergence': {
    caption: '顶背离：股价创新高，DIFF 未创新高；死叉为卖出确认',
    closes: [12, 13, 14, 14.5, 14, 14.8, 15.5, 15, 15.8, 16.5, 16, 16.8, 17.5, 17, 17.8, 18.5, 18, 18.2, 17.5, 16.8],
    mark: 'top-div',
  },
  'divergence-concept': {
    caption: '背离：价格与指标走势背道而驰（下图 DIFF 与价格方向相反处）',
    closes: [12, 11, 10, 9.5, 9, 9.5, 9.2, 8.8, 8.5, 9, 8.6, 8.2, 8.5, 9.2, 10, 10.8, 11.5, 12, 12.5, 13],
    mark: 'divergence',
  },
};

function buildKlineMacdOption(scenarioKey) {
  const scenario = KLINE_CHART_SCENARIOS[scenarioKey];
  if (!scenario) return null;

  const closes = scenario.closes;
  const n = closes.length;
  const labels = closes.map((_, i) => String(i + 1));
  const ohlc = closesToOhlc(closes);
  const { diff, dea, bar } = calcMACD(closes);

  const option = {
    backgroundColor: 'transparent',
    animation: false,
    legend: {
      data: ['DIFF', 'DEA', 'MACD柱'],
      top: 4,
      textStyle: { color: '#94a3b8', fontSize: 11 },
    },
    axisPointer: { link: [{ xAxisIndex: [0, 1] }] },
    grid: [
      { left: 52, right: 16, top: 36, height: '42%' },
      { left: 52, right: 16, top: '56%', height: '36%' },
    ],
    xAxis: [
      { type: 'category', data: labels, gridIndex: 0, axisLine: { lineStyle: { color: '#334155' } }, axisLabel: { color: '#64748b', fontSize: 10 } },
      { type: 'category', data: labels, gridIndex: 1, axisLine: { lineStyle: { color: '#334155' } }, axisLabel: { show: false } },
    ],
    yAxis: [
      { scale: true, gridIndex: 0, splitLine: { lineStyle: { color: 'rgba(255,255,255,0.06)' } }, axisLabel: { color: '#64748b', fontSize: 10 } },
      { scale: true, gridIndex: 1, splitLine: { lineStyle: { color: 'rgba(255,255,255,0.06)' } }, axisLabel: { color: '#64748b', fontSize: 10 } },
    ],
    series: [
      {
        name: 'K线',
        type: 'candlestick',
        xAxisIndex: 0,
        yAxisIndex: 0,
        data: ohlc,
        itemStyle: {
          color: '#ef4444',
          color0: '#10b981',
          borderColor: '#ef4444',
          borderColor0: '#10b981',
        },
      },
      {
        name: 'DIFF',
        type: 'line',
        xAxisIndex: 1,
        yAxisIndex: 1,
        data: diff,
        symbol: 'none',
        lineStyle: { width: 2, color: '#fbbf24' },
      },
      {
        name: 'DEA',
        type: 'line',
        xAxisIndex: 1,
        yAxisIndex: 1,
        data: dea,
        symbol: 'none',
        lineStyle: { width: 2, color: '#ef4444' },
      },
      {
        name: 'MACD柱',
        type: 'bar',
        xAxisIndex: 1,
        yAxisIndex: 1,
        data: bar.map((v, i) => ({
          value: v,
          itemStyle: { color: v >= 0 ? '#ef4444' : '#10b981' },
        })),
      },
    ],
  };

  addScenarioMarkLines(option, scenario, labels, n, diff, dea, closes);
  return { option, caption: scenario.caption };
}

function addScenarioMarkLines(option, scenario, labels, n, diff, dea, closes) {
  const markLineStyle = { color: '#f59e0b', type: 'dashed', width: 1 };
  const markPointStyle = (name, color) => ({
    symbol: 'pin',
    symbolSize: 42,
    label: { show: true, formatter: name, color: '#fff', fontSize: 11, fontWeight: 'bold' },
    itemStyle: { color: color || '#f59e0b' },
  });

  if (scenario.highlight === 'zero' || scenario.mark) {
    option.yAxis[1].splitLine = option.yAxis[1].splitLine || {};
  }

  switch (scenario.mark || scenario.highlight) {
    case 'zero':
      option.series[3].markLine = {
        silent: true,
        data: [{ yAxis: 0, lineStyle: { color: '#e2e8f0', width: 2 }, label: { formatter: '零轴', color: '#e2e8f0' } }],
      };
      break;
    case 'golden-above':
      option.series[1].markPoint = {
        data: [{ coord: [n - 8, diff[n - 8]], ...markPointStyle('金叉', '#ef4444') }],
      };
      option.series[3].markLine = { data: [{ yAxis: 0, lineStyle: markLineStyle }] };
      break;
    case 'golden-below':
      option.series[1].markPoint = {
        data: [{ coord: [n - 6, diff[n - 6]], ...markPointStyle('零下金叉', '#f59e0b') }],
      };
      option.series[3].markLine = { data: [{ yAxis: 0, lineStyle: { color: '#94a3b8', type: 'dashed' } }] };
      break;
    case 'golden-multi':
      option.series[0].markPoint = {
        data: [
          { coord: [4, closesToOhlc(closes)[4][3]], ...markPointStyle('金叉', '#f59e0b') },
          { coord: [9, closesToOhlc(closes)[9][3]], ...markPointStyle('金叉', '#f59e0b') },
          { coord: [14, closesToOhlc(closes)[14][3]], ...markPointStyle('金叉', '#f59e0b') },
        ],
      };
      break;
    case 'death-above':
      option.series[1].markPoint = { data: [{ coord: [n - 6, diff[n - 6]], ...markPointStyle('死叉', '#10b981') }] };
      break;
    case 'death-below':
      option.series[1].markPoint = { data: [{ coord: [n - 5, diff[n - 5]], ...markPointStyle('零下死叉', '#10b981') }] };
      option.series[3].markLine = { data: [{ yAxis: 0, lineStyle: markLineStyle }] };
      break;
    case 'bottom-div': {
      const i1 = 8;
      const i2 = 12;
      option.series[0].markPoint = {
        data: [
          { coord: [i1, closes[i1]], label: { formatter: '价新低' }, itemStyle: { color: '#10b981' }, symbolSize: 36 },
          { coord: [i2, closes[i2]], label: { formatter: '价再低' }, itemStyle: { color: '#10b981' }, symbolSize: 36 },
        ],
      };
      option.series[1].markPoint = {
        data: [
          { coord: [i1, diff[i1]], label: { formatter: 'DIFF抬高' }, itemStyle: { color: '#fbbf24' }, symbolSize: 36 },
          { coord: [n - 4, diff[n - 4]], ...markPointStyle('金叉买', '#ef4444') },
        ],
      };
      break;
    }
    case 'top-div': {
      const i1 = 6;
      const i2 = 13;
      option.series[0].markPoint = {
        data: [
          { coord: [i1, closes[i1]], label: { formatter: '前高' }, symbolSize: 32, itemStyle: { color: '#94a3b8' } },
          { coord: [i2, closes[i2]], label: { formatter: '创新高' }, symbolSize: 36, itemStyle: { color: '#ef4444' } },
        ],
      };
      option.series[1].markPoint = {
        data: [
          { coord: [i2, diff[i2]], label: { formatter: 'DIFF未新高' }, symbolSize: 36, itemStyle: { color: '#f59e0b' } },
          { coord: [n - 3, diff[n - 3]], ...markPointStyle('死叉卖', '#10b981') },
        ],
      };
      break;
    }
    case 'catch-up':
      option.series[0].markPoint = {
        data: [{ coord: [8, closes[8]], label: { formatter: '不破前低' }, symbolSize: 36, itemStyle: { color: '#f59e0b' } }],
      };
      option.series[1].markPoint = {
        data: [{ coord: [11, diff[11]], ...markPointStyle('零上金叉', '#ef4444') }],
      };
      option.series[3].markLine = { data: [{ yAxis: 0, lineStyle: markLineStyle }] };
      break;
    case 'divergence':
      option.series[0].markLine = {
        data: [
          [{ coord: [2, closes[2]] }, { coord: [12, closes[12]] }],
        ],
        lineStyle: { color: '#ef4444', type: 'solid' },
        label: { formatter: '价格走低', position: 'middle', color: '#ef4444' },
      };
      option.series[1].markLine = {
        data: [
          [{ coord: [2, diff[2]] }, { coord: [12, diff[12]] }],
        ],
        lineStyle: { color: '#fbbf24', type: 'solid' },
        label: { formatter: 'DIFF走高', position: 'middle', color: '#fbbf24' },
      };
      break;
    default:
      break;
  }
}

function initKlineCharts() {
  if (typeof echarts === 'undefined') {
    console.warn('ECharts 未加载，K 线配图跳过');
    return;
  }
  disposeKlineCharts();
  document.querySelectorAll('.kline-chart-slot[data-chart]').forEach(el => {
    const key = el.getAttribute('data-chart');
    const built = buildKlineMacdOption(key);
    if (!built) return;
    const chart = echarts.init(el, null, { renderer: 'canvas' });
    chart.setOption(built.option);
    window._klineChartInstances.push(chart);
    const cap = el.parentElement && el.parentElement.querySelector('.kline-chart-caption');
    if (cap && built.caption) cap.textContent = built.caption;
  });
  if (!window._klineChartResizeBound) {
    window._klineChartResizeBound = true;
    window.addEventListener('resize', () => {
      (window._klineChartInstances || []).forEach(ch => {
        try { ch.resize(); } catch (e) { /* ignore */ }
      });
    });
  }
}
