#!/usr/bin/env node
/**
 * 生成 2026H1 中报业绩预告数据
 * 增幅榜仅纳入预增/略增（排除扭亏等不可比口径）
 */
const https = require('https');
const fs = require('fs');
const path = require('path');

const AS_OF = '2026-07-08';
const OUT = path.join(__dirname, '../data/interim-forecast-2026h1.js');

const URL =
  'https://datacenter-web.eastmoney.com/api/data/v1/get?sortColumns=NOTICE_DATE&sortTypes=-1'
  + '&pageSize=500&pageNumber=1&reportName=RPT_PUBLIC_OP_NEWPREDICT&columns=ALL'
  + '&filter=(REPORT_DATE%3D%272026-06-30%27)';

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

/** 增幅榜：仅预增/略增，同比增幅有可比性 */
function isGrowthRankEligible(r) {
  return (
    (r.PREDICT_TYPE === '预增' || r.PREDICT_TYPE === '略增')
    && r.ADD_AMP_UPPER != null
    && Number(r.ADD_AMP_UPPER) > 0
  );
}

async function main() {
  const payload = await fetchJson(URL);
  const rows = payload?.result?.data || [];
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

  const output = {
    meta: {
      asOf: AS_OF,
      reportPeriod: '2026H1',
      totalDisclosed: companies.length,
      positiveRatio: Math.round((good / companies.length) * 1000) / 10,
      positiveCount: good,
      typeCounts,
      source: '东方财富数据中心 · RPT_PUBLIC_OP_NEWPREDICT',
      note: '归母净利润预告；截止2026-07-08已披露公司',
    },
    profitTop15: {
      title: '2026中报预告 · 净利润规模榜',
      subtitle: `截至7月8日共${companies.length}家披露中报预告；按归母净利润预告上限排序 Top15`,
      key: '净利润规模',
      companies: sortedProfit.slice(0, 15).map((r, i) => toItem(r, i + 1)),
    },
    growthTop15: {
      title: '2026中报预告 · 净利润增幅榜',
      subtitle: `截至7月8日预喜率${Math.round((good / companies.length) * 100)}%；按同比增幅上限排序 Top15（仅预增/略增，不含扭亏）`,
      key: '净利润增幅',
      companies: sortedGrowth.slice(0, 15).map((r, i) => toItem(r, i + 1)),
    },
    overview: {
      title: '2026中报业绩预告全景',
      subtitle: `截至2026年7月8日 · A股${companies.length}家已披露2026H1业绩预告 · 预喜${good}家（${((good / companies.length) * 100).toFixed(1)}%）`,
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
        'AI算力/存储/半导体、化工石化、航运船舶等行业预增集中',
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
  console.log(`✅ ${companies.length} 家 · 增幅榜 ${sortedGrowth.length} 家符合条件 · 写入 ${OUT}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
