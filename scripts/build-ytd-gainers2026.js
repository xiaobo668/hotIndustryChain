/**
 * 2026年初至今 A 股涨幅 Top15（沪深主板/创业板，剔除科创/北交所/ST/次新-UW）
 * 行情：东方财富 push2delay f25（年初至今涨跌幅）
 * 运行: node scripts/build-ytd-gainers2026.js
 */
const fs = require('fs');
const https = require('https');
const path = require('path');
const vm = require('vm');

const PERIOD_LABEL = '2026.1–至今';
const PERIOD_NOTE =
  '统计区间：2026年首个交易日至最近收盘（东方财富 f25 年初至今涨跌幅，前复权）；口径：沪深主板+创业板，剔除科创板/北交所/ST/*ST/-UW。';

/** 按股票代码登记涨跌归因（riseType: 业绩 | 情绪 | 炒作） */
const MANUAL_BY_CODE = {
  '301362': {
    riseType: '炒作',
    whyUp: 'LED 户外照明小市值标的，智慧照明/光学题材跟风，涨幅与基本面脱节',
    theme: '光学照明',
  },
  '603256': {
    riseType: '业绩',
    whyUp: '高端电子布（PTFE）供给偏紧，AI 服务器高频覆铜板需求拉动，2025 业绩高增兑现',
    theme: 'PCB上游',
  },
  '600396': {
    riseType: '情绪',
    whyUp: '辽宁地方电力平台，电力改革+区域电价预期+煤价回落改善盈利，资金博弈重组预期',
    theme: '电力',
  },
  '003036': {
    riseType: '炒作',
    whyUp: '纺织机械主业平淡，市场炒作轮胎模具/机器人跨界预期，题材驱动大于订单',
    theme: '高端装备',
  },
  '603629': {
    riseType: '业绩',
    whyUp: '算力租赁转型落地，英伟达 GPU 租赁与上架收入放量，业绩与 AI 算力题材共振',
    theme: '算力租赁',
  },
  '002636': {
    riseType: '业绩',
    whyUp: '覆铜板（CCL）涨价周期，AI 服务器用高频材料需求旺盛，产品提价带动利润弹性',
    theme: 'PCB上游',
  },
  '603618': {
    riseType: '情绪',
    whyUp: '光纤光缆+电力电缆，光通信/算力传输板块情绪带动，订单预期先于财报兑现',
    theme: '光纤概念',
  },
  '603115': {
    riseType: '情绪',
    whyUp: '电极箔（铝电解电容上游），新能源+涨价预期驱动，板块情绪大于单季业绩',
    theme: '被动元件',
  },
  '002980': {
    riseType: '炒作',
    whyUp: '检测仪器小盘股，AI 检测/机器人/智能装备概念蹭热点，缺乏对应订单与利润支撑',
    theme: '仪器仪表',
  },
  '301526': {
    riseType: '业绩',
    whyUp: '风电/电子玻璃纤维材料，风电装机回暖+电子纱提价，2025 营收与毛利改善',
    theme: '新材料',
  },
  '301669': {
    riseType: '炒作',
    whyUp: '新能源车 BMS/均衡管理次新标的，赛道叙事+小市值资金博弈，估值波动大',
    theme: '新能源车',
  },
  '301531': {
    riseType: '情绪',
    whyUp: '汽车流体管路零部件，新能源车产业链情绪回暖，订单预期带动估值修复',
    theme: '汽车零部件',
  },
  '301373': {
    riseType: '炒作',
    whyUp: '纳米二氧化硅涂料助剂，新材料标签+小盘流动性，题材炒作成分偏高',
    theme: '化工新材料',
  },
  '301217': {
    riseType: '业绩',
    whyUp: '锂电/PCB 铜箔，AI 服务器高频铜箔与储能需求双轮，产能利用率提升',
    theme: 'PCB/铜箔',
  },
  '603459': {
    riseType: '炒作',
    whyUp: '医药包装/印刷次新，主业与当前热点关联弱，资金短炒次新流动性',
    theme: '包装印刷',
  },
};

function httpsGetJson(url) {
  return new Promise((resolve, reject) => {
    https
      .get(
        url,
        {
          timeout: 25000,
          headers: { 'User-Agent': 'Mozilla/5.0', Referer: 'https://quote.eastmoney.com/' },
        },
        (res) => {
          let raw = '';
          res.on('data', (c) => {
            raw += c;
          });
          res.on('end', () => {
            try {
              resolve(JSON.parse(raw));
            } catch (e) {
              reject(e);
            }
          });
        }
      )
      .on('error', reject);
  });
}

function codeToSecid(code, mkt) {
  const c = String(code).padStart(6, '0');
  const market = mkt === 1 ? '1' : '0';
  return `${market}.${c}`;
}

function shouldExclude(code, name) {
  if (/^688|^689/.test(code)) return true;
  if (/^8|^4|^92/.test(code)) return true;
  if (/ST|\*|退/.test(name)) return true;
  if (/-UW|-W$/.test(name)) return true;
  return false;
}

function loadChainHighlight(name) {
  let code = fs.readFileSync(path.join(__dirname, '..', 'data.js'), 'utf8');
  code = code.replace(/\bconst INDUSTRY_DATA\b/, 'var INDUSTRY_DATA');
  const INDUSTRY_DATA = vm.runInNewContext(`${code}\nINDUSTRY_DATA;`);
  for (const ind of Object.values(INDUSTRY_DATA)) {
    for (const tier of [ind.upstream, ind.midstream, ind.downstream]) {
      for (const seg of tier || []) {
        for (const co of seg.companies || []) {
          if (co.name === name) return co.highlight || '';
        }
      }
    }
  }
  return '';
}

function classifyFallback(highlight, theme) {
  const text = `${highlight} ${theme}`;
  if (/业绩|净利|营收|订单|年报|一季报|涨价|放量|高增|扭亏|预增|毛利/.test(text)) return '业绩';
  if (/概念|题材|蹭|炒作|博弈|次新|小盘|跟风|传闻/.test(text)) return '炒作';
  return '情绪';
}

async function fetchTopYtd(n = 15) {
  const fsParam = 'm:0+t:6,m:0+t:80,m:1+t:2,m:0+t:81+s:2048,m:1+t:23';
  const url =
    `https://push2delay.eastmoney.com/api/qt/clist/get?pn=1&pz=200&po=1&np=1&fltt=2&invt=2&fid=f25&fs=${encodeURIComponent(fsParam)}` +
    '&fields=f12,f13,f14,f2,f25,f3,f20&ut=bd1d9ddb04089700cf9c27f6f7426281';
  const json = await httpsGetJson(url);
  const items = Object.values(json?.data?.diff || {});
  if (!items.length) throw new Error('东方财富行情拉取失败');

  const rows = [];
  for (const row of items) {
    const code = String(row.f12 || '').padStart(6, '0');
    const name = String(row.f14 || '').trim();
    if (!code || !name || shouldExclude(code, name)) continue;
    const pct = Math.round(Number(row.f25) * 100) / 100;
    const manual = MANUAL_BY_CODE[code] || {};
    const chainHl = loadChainHighlight(name);
    const riseType = manual.riseType || classifyFallback(chainHl, manual.theme || '');
    const whyUp =
      manual.whyUp ||
      chainHl ||
      `${name}年初至今领涨，驱动因素待结合公告与行业报道进一步核实`;
    rows.push({
      rank: rows.length + 1,
      name,
      code,
      secid: codeToSecid(code, row.f13),
      pct,
      pctLabel: (pct >= 0 ? '+' : '') + pct.toFixed(2) + '%',
      riseType,
      whyUp,
      theme: manual.theme || '—',
      highlight: whyUp,
      verify: {
        source: '东方财富 push2delay f25',
        sourceType: 'market',
        field: 'f25',
        secid: codeToSecid(code, row.f13),
      },
    });
    if (rows.length >= n) break;
  }
  return rows;
}

async function main() {
  const companies = await fetchTopYtd(15);
  const endDate = new Date().toISOString().slice(0, 10);
  const payload = {
    key: '2026年初涨幅榜',
    title: '2026年初至今涨幅 Top15',
    subtitle: PERIOD_NOTE,
    period: PERIOD_LABEL,
    generatedAt: endDate,
    companies,
  };

  const outDir = path.join(__dirname, '..', 'data');
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'ytd-gainers2026.json'), JSON.stringify(payload, null, 2), 'utf8');
  const js = `/** 2026 年初至今涨幅 Top15 · 由 scripts/build-ytd-gainers2026.js 生成 */\nvar YTD_GAINERS2026 = ${JSON.stringify(payload, null, 2)};\nif (typeof window !== 'undefined') window.YTD_GAINERS2026 = YTD_GAINERS2026;\n`;
  fs.writeFileSync(path.join(outDir, 'ytd-gainers2026.js'), js, 'utf8');

  console.log('OK 写入 ytd-gainers2026.js / .json 共', companies.length, '家');
  companies.forEach((c) => {
    console.log(`  ${c.rank}. ${c.name}  ${c.pctLabel}  [${c.riseType}]  ${c.whyUp.slice(0, 36)}…`);
  });
}

if (require.main === module) {
  main().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}

module.exports = { MANUAL_BY_CODE, fetchTopYtd, PERIOD_NOTE };
