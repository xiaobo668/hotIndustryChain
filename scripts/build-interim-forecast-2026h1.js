#!/usr/bin/env node
/**
 * 生成 2026H1 中报业绩预告数据
 * 增幅榜仅纳入预增/略增（排除扭亏等不可比口径）
 */
const https = require('https');
const fs = require('fs');
const path = require('path');

const AS_OF = '2026-07-10';
const OUT = path.join(__dirname, '../data/interim-forecast-2026h1.js');

const API_BASE =
  'https://datacenter-web.eastmoney.com/api/data/v1/get?sortColumns=NOTICE_DATE&sortTypes=-1'
  + '&pageSize=500&reportName=RPT_PUBLIC_OP_NEWPREDICT&columns=ALL'
  + '&filter=(REPORT_DATE%3D%272026-06-30%27)';

/** 存储芯片赛道成分：中报分析榜 Top10 + 订单榜 Top10 去重 */
const STORAGE_CHIP_UNIVERSE = [
  '江波龙', '佰维存储', '兆易创新', '北京君正', '澜起科技', '普冉股份', '东芯股份', '聚辰股份', '恒烁股份', '国科微',
  '长电科技', '生益科技', '深南电路', '德明利', '深科技', '太极实业', '长川科技', '香农芯创', '中电港', '雅创电子',
  '瑞芯微', '全志科技', '复旦微电', '行云科技', '协创数据', '朗科科技', '联芸科技',
];

const STORAGE_REASON_KW = /存储晶圆|半导体存储|存储产业|存储和算力|存储模组|存储芯片|存储主控|存储业务|存储器|DRAM|NAND|NOR Flash|闪存|内存接口|嵌入式存储|企业级存储|SLC NAND|存储价格/;
const STORAGE_EXCLUDE = new Set(['京东方A', '京东方B', '视源股份']);

const SEMICONDUCTOR_REASON_KW = /半导体|集成电路|IC设计|晶圆|封测|芯片设计|芯片业务|存储芯片|模拟芯片|功率半导体|射频芯片|MCU|FPGA|EDA|光刻|刻蚀|薄膜沉积|CMP|光刻胶|电子特气|探针台|分选机/;
const SEMICONDUCTOR_EXCLUDE = new Set([
  '京东方A', '京东方B', '视源股份', '大族激光', '华测检测', '赛意信息', '新宙邦',
  '诚邦股份', '欧菲光', '万华化学', '立讯精密',
]);

function loadSemiconductorUniverse() {
  const base = path.join(__dirname, '../data');
  const names = new Set(STORAGE_CHIP_UNIVERSE);

  const interimPath = path.join(base, 'interim-report-rank2026.js');
  if (fs.existsSync(interimPath)) {
    const text = fs.readFileSync(interimPath, 'utf8');
    const parts = text.split(/var INTERIM_REPORT_\w+2026 = /).slice(1);
    parts.forEach((part) => {
      if (!part.slice(0, 800).includes('"半导体"')) return;
      const body = part.split('};')[0];
      const re = /"name": "([^"]+)"/g;
      let m;
      while ((m = re.exec(body))) names.add(m[1]);
    });
  }

  const globSemiCapacity = fs.readdirSync(base).filter((f) => f.startsWith('capacity-rank-semi-') && f.endsWith('.json'));
  globSemiCapacity.forEach((file) => {
    const d = JSON.parse(fs.readFileSync(path.join(base, file), 'utf8'));
    const blocks = Array.isArray(d) ? d : [d];
    blocks.forEach((block) => {
      (block.companies || []).forEach((c) => names.add(c.name));
    });
  });

  ['order-rank-storage-chip2026.js', 'order-rank-physical-ai-power-semi2026.json'].forEach((file) => {
    const fp = path.join(base, file);
    if (!fs.existsSync(fp)) return;
    const text = fs.readFileSync(fp, 'utf8');
    const re = /"name": "([^"]+)"/g;
    let m;
    while ((m = re.exec(text))) names.add(m[1]);
  });

  const scarcePath = path.join(base, 'semiconductor-scarce-materials2026.json');
  if (fs.existsSync(scarcePath)) {
    const d = JSON.parse(fs.readFileSync(scarcePath, 'utf8'));
    (d.companies || []).forEach((c) => names.add(c.name));
  }

  return names;
}

let SEMICONDUCTOR_UNIVERSE = null;
function getSemiconductorUniverse() {
  if (!SEMICONDUCTOR_UNIVERSE) SEMICONDUCTOR_UNIVERSE = loadSemiconductorUniverse();
  return SEMICONDUCTOR_UNIVERSE;
}

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
        let data = '';
        res.on('data', (c) => (data += c));
        res.on('end', () => {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(e);
          }
        });
      })
      .on('error', reject);
  });
}

async function fetchAllRows() {
  const first = await fetchJson(`${API_BASE}&pageNumber=1`);
  const total = first?.result?.count || 0;
  const pages = Math.ceil(total / 500) || 1;
  let rows = [...(first?.result?.data || [])];
  for (let p = 2; p <= pages; p++) {
    const payload = await fetchJson(`${API_BASE}&pageNumber=${p}`);
    rows = rows.concat(payload?.result?.data || []);
  }
  return rows;
}

function fmtAmt(v) {
  if (v == null) return null;
  const n = Number(v);
  if (Math.abs(n) >= 1e8) {
    const yi = n / 1e8;
    if (yi >= 10 && Number.isInteger(yi)) return `${yi}亿`;
    const s = yi.toFixed(2).replace(/\.?0+$/, '');
    return `${s}亿`;
  }
  if (Math.abs(n) >= 1e4) return `${Math.round(n / 1e4)}万`;
  return `${(n / 1e4).toFixed(2)}万`;
}

function fmtProfit(lo, hi) {
  if (lo == null && hi == null) return '—';
  if (lo != null && hi != null) {
    if (lo === hi) return fmtAmt(lo);
    return `${fmtAmt(lo)}~${fmtAmt(hi)}`;
  }
  return fmtAmt(lo ?? hi);
}

function fmtGrowth(lo, hi, ptype) {
  if (['扭亏', '减亏', '首亏', '增亏', '续盈', '不确定'].includes(ptype)) return ptype;
  if (lo != null && hi != null) {
    if (lo === hi) {
      const g = `${lo.toFixed(0)}%`;
      return lo < 0 ? g : `+${g}`;
    }
    if (lo < 0 || hi < 0) return `${lo.toFixed(0)}%~${hi.toFixed(0)}%`;
    return `+${lo.toFixed(0)}%~${hi.toFixed(0)}%`;
  }
  if (lo != null) return `+${lo.toFixed(0)}%起`;
  if (hi != null) return `至+${hi.toFixed(0)}%`;
  return ptype || '—';
}

function toItem(r, rank) {
  const lo = r.PREDICT_AMT_LOWER;
  const hi = r.PREDICT_AMT_UPPER;
  const profit = fmtProfit(lo, hi);
  const growth = fmtGrowth(r.ADD_AMP_LOWER, r.ADD_AMP_UPPER, r.PREDICT_TYPE);
  const ptype = r.PREDICT_TYPE || '';
  return {
    rank,
    code: r.SECURITY_CODE,
    name: r.SECURITY_NAME_ABBR,
    profit,
    growth,
    type: ptype,
    metricLabel: `${profit}  ${growth}`,
    highlight: ptype,
    noticeDate: (r.NOTICE_DATE || '').slice(0, 10),
    profitUpper: Number(hi ?? lo ?? 0),
    growthUpper: r.ADD_AMP_UPPER != null ? Number(r.ADD_AMP_UPPER) : null,
  };
}

function isGrowthRankEligible(r) {
  return (
    (r.PREDICT_TYPE === '预增' || r.PREDICT_TYPE === '略增')
    && r.ADD_AMP_UPPER != null
    && Number(r.ADD_AMP_UPPER) > 0
  );
}

function isStorageChipCompany(r) {
  const name = r.SECURITY_NAME_ABBR || '';
  if (STORAGE_EXCLUDE.has(name)) return false;
  if (STORAGE_CHIP_UNIVERSE.includes(name)) return true;
  const blob = (r.CHANGE_REASON_EXPLAIN || '') + (r.PREDICT_CONTENT || '');
  return STORAGE_REASON_KW.test(blob);
}

function isSemiconductorCompany(r) {
  const name = r.SECURITY_NAME_ABBR || '';
  if (SEMICONDUCTOR_EXCLUDE.has(name)) return false;
  if (getSemiconductorUniverse().has(name)) return true;
  const blob = (r.CHANGE_REASON_EXPLAIN || '') + (r.PREDICT_CONTENT || '');
  return SEMICONDUCTOR_REASON_KW.test(blob);
}

function profitUpperValue(r) {
  return Number(r.PREDICT_AMT_UPPER ?? r.PREDICT_AMT_LOWER ?? -Infinity);
}

function formatAsOfLabel(iso) {
  const [, m, d] = iso.split('-');
  return `${Number(m)}月${Number(d)}日`;
}

async function main() {
  const rows = await fetchAllRows();
  const filtered = rows.filter(
    (r) => (r.NOTICE_DATE || '').slice(0, 10) <= AS_OF && r.PREDICT_FINANCE_CODE === '004'
  );

  const byCode = {};
  filtered.forEach((r) => {
    const code = r.SECURITY_CODE;
    if (!byCode[code] || r.NOTICE_DATE > byCode[code].NOTICE_DATE) byCode[code] = r;
  });
  const companies = Object.values(byCode);

  const goodTypes = ['预增', '略增', '扭亏', '续盈', '减亏'];
  const good = companies.filter((r) => goodTypes.includes(r.PREDICT_TYPE)).length;
  const typeCounts = {};
  companies.forEach((r) => {
    typeCounts[r.PREDICT_TYPE] = (typeCounts[r.PREDICT_TYPE] || 0) + 1;
  });

  const sortedProfit = [...companies].sort(
    (a, b) => Number(b.PREDICT_AMT_UPPER ?? b.PREDICT_AMT_LOWER ?? 0) - Number(a.PREDICT_AMT_UPPER ?? a.PREDICT_AMT_LOWER ?? 0)
  );
  const sortedGrowth = [...companies].filter(isGrowthRankEligible).sort(
    (a, b) => Number(b.ADD_AMP_UPPER) - Number(a.ADD_AMP_UPPER)
  );

  const storageDisclosed = companies.filter(isStorageChipCompany);
  const storageGrowth = [...storageDisclosed].filter(isGrowthRankEligible).sort(
    (a, b) => Number(b.ADD_AMP_UPPER) - Number(a.ADD_AMP_UPPER)
  );
  const storageTop = storageGrowth.slice(0, 10);

  const semiDisclosed = companies.filter(isSemiconductorCompany);
  const semiProfit = [...semiDisclosed]
    .filter((r) => profitUpperValue(r) > 0)
    .sort((a, b) => profitUpperValue(b) - profitUpperValue(a));
  const semiProfitTop = semiProfit.slice(0, 15);
  const asOfLabel = formatAsOfLabel(AS_OF);

  const output = {
    meta: {
      asOf: AS_OF,
      reportPeriod: '2026H1',
      totalDisclosed: companies.length,
      positiveRatio: Math.round((good / companies.length) * 1000) / 10,
      positiveCount: good,
      typeCounts,
      storageDisclosed: storageDisclosed.length,
      storageGrowthEligible: storageGrowth.length,
      semiDisclosed: semiDisclosed.length,
      semiProfitPositive: semiProfit.length,
      source: '东方财富数据中心 · RPT_PUBLIC_OP_NEWPREDICT',
      note: '归母净利润预告；赛道成分来自产业链榜单与预告文本匹配',
    },
    profitTop15: {
      title: '2026中报预告 · 净利润规模榜',
      subtitle: `截至${asOfLabel}共${companies.length}家披露中报预告；按归母净利润预告上限排序 Top15`,
      key: '净利润规模',
      companies: sortedProfit.slice(0, 15).map((r, i) => toItem(r, i + 1)),
    },
    growthTop15: {
      title: '2026中报预告 · 净利润增幅榜',
      subtitle: `截至${asOfLabel}预喜率${Math.round((good / companies.length) * 100)}%；按同比增幅上限排序 Top15（仅预增/略增，不含扭亏）`,
      key: '净利润增幅',
      companies: sortedGrowth.slice(0, 15).map((r, i) => toItem(r, i + 1)),
    },
    storageGrowthTop10: {
      title: '2026中报预告 · 存储芯片增幅榜',
      subtitle: `截至${asOfLabel}存储赛道已披露${storageDisclosed.length}家、可比增幅${storageGrowth.length}家；按归母净利润同比增幅排序 Top10（仅预增/略增）`,
      key: '存储芯片',
      cardHead: '存储芯片 · 归母净利润预告增幅 Top10',
      companies: storageTop.map((r, i) => toItem(r, i + 1)),
    },
    semiProfitTop15: {
      title: '2026中报预告 · 半导体净利润榜',
      subtitle: `截至${asOfLabel}半导体赛道已披露${semiDisclosed.length}家、盈利预告${semiProfit.length}家；按归母净利润预告上限排序 Top15`,
      key: '半导体',
      cardHead: '半导体 · 归母净利润预告规模 Top15',
      companies: semiProfitTop.map((r, i) => toItem(r, i + 1)),
    },
    overview: {
      title: '2026中报业绩预告全景',
      subtitle: `截至${asOfLabel} · A股${companies.length}家已披露2026H1业绩预告 · 预喜${good}家（${((good / companies.length) * 100).toFixed(1)}%）`,
      key: '市场全景',
      stats: [
        { label: '已披露', value: `${companies.length}家` },
        { label: '预喜率', value: `${((good / companies.length) * 100).toFixed(1)}%` },
        { label: '预增', value: `${typeCounts['预增'] || 0}家` },
        { label: '略增', value: `${typeCounts['略增'] || 0}家` },
        { label: '扭亏', value: `${typeCounts['扭亏'] || 0}家` },
        {
          label: '预减/首亏',
          value: `${(typeCounts['预减'] || 0) + (typeCounts['略减'] || 0) + (typeCounts['首亏'] || 0) + (typeCounts['增亏'] || 0)}家`,
        },
      ],
      highlights: [
        `净利润榜首：${sortedProfit[0].SECURITY_NAME_ABBR} ${fmtProfit(sortedProfit[0].PREDICT_AMT_LOWER, sortedProfit[0].PREDICT_AMT_UPPER)}`,
        `增幅榜首：${sortedGrowth[0].SECURITY_NAME_ABBR} ${fmtGrowth(sortedGrowth[0].ADD_AMP_LOWER, sortedGrowth[0].ADD_AMP_UPPER, sortedGrowth[0].PREDICT_TYPE)}`,
        `存储芯片增幅榜首：${storageTop[0] ? storageTop[0].SECURITY_NAME_ABBR + ' ' + fmtGrowth(storageTop[0].ADD_AMP_LOWER, storageTop[0].ADD_AMP_UPPER, storageTop[0].PREDICT_TYPE) : '待更多公司披露'}`,
        `半导体净利润榜首：${semiProfitTop[0] ? semiProfitTop[0].SECURITY_NAME_ABBR + ' ' + fmtProfit(semiProfitTop[0].PREDICT_AMT_LOWER, semiProfitTop[0].PREDICT_AMT_UPPER) : '待更多公司披露'}`,
        '强制披露截止日7月15日，名单持续更新中',
      ],
    },
    allCompanies: sortedProfit.map((r, i) => toItem(r, i + 1)),
  };

  const js =
    '/** 2026H1 中报业绩预告数据 · 来源东方财富 · 截至' + AS_OF + ' */\n'
    + 'const INTERIM_FORECAST_2026H1 = '
    + JSON.stringify(output, null, 2)
    + ';\n';

  fs.writeFileSync(OUT, js, 'utf8');
  console.log(
    `✅ 全市场 ${companies.length} 家 · 存储增幅 ${storageTop.length} 家 · 半导体净利润 ${semiProfitTop.length} 家 → ${OUT}`
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
