#!/usr/bin/env node
/**
 * 拉取东方财富 f25（年初至今涨跌幅）Top15，合并手工归因，输出 data/ytd-gainers2026.js
 * 用法: node scripts/build-ytd-gainers2026.js
 */
const https = require('https');
const fs = require('fs');
const path = require('path');

const LIST_URL =
  'https://push2delay.eastmoney.com/api/qt/clist/get?pn=1&pz=80&po=1&np=1' +
  '&ut=bd1d9ddb04089700cf9c27f6f7426281&fltt=2&invt=2&fid=f25' +
  '&fs=m:0+t:6,m:0+t:80,m:1+t:2,m:1+t:23&fields=f12,f14,f25,f13';

/** 手工归因（按 code 索引，重跑榜单时保留/更新） */
const ATTRIBUTION = {
  '301362': {
    riseType: '炒作',
    theme: 'PCB钻针/算力',
    whyUp:
      '并购厦芝精密（PCB钻针）切入AI算力耗材，市场按算力产业链重估；照明主业增长乏力，涨幅与并购预期绑定',
  },
  '603629': {
    riseType: '业绩',
    theme: '算力租赁',
    whyUp: '算力租赁转型落地，英伟达 GPU 租赁与上架收入放量，业绩与 AI 算力题材共振',
  },
  '603256': {
    riseType: '业绩',
    theme: 'PCB上游',
    whyUp: '高端电子布（PTFE）供给偏紧，AI 服务器高频覆铜板需求拉动，2025 业绩高增兑现',
  },
  '002636': {
    riseType: '业绩',
    theme: 'PCB上游',
    whyUp: '覆铜板（CCL）涨价周期，AI 服务器用高频材料需求旺盛，产品提价带动利润弹性',
  },
  '603618': {
    riseType: '情绪',
    theme: '光纤概念',
    whyUp: '光纤光缆+电力电缆，光通信/算力传输板块情绪带动，订单预期先于财报兑现',
  },
  '003036': {
    riseType: '炒作',
    theme: '电子布织机',
    whyUp:
      '电子布喷气织机国产替代+纺织机器人+固态电池电解质概念催化；公司提示电子布织机仍处研发，题材大于订单',
  },
  '301373': {
    riseType: '炒作',
    theme: '化工新材料',
    whyUp: '纳米二氧化硅涂料助剂，新材料标签+小盘流动性，题材炒作成分偏高',
  },
  '603115': {
    riseType: '情绪',
    theme: '被动元件',
    whyUp: '电极箔（铝电解电容上游），新能源+涨价预期驱动，板块情绪大于单季业绩',
  },
  '301526': {
    riseType: '业绩',
    theme: '新材料',
    whyUp: '风电/电子玻璃纤维材料，风电装机回暖+电子纱提价，2025 营收与毛利改善',
  },
  '600396': {
    riseType: '情绪',
    theme: '电力',
    whyUp: '辽宁地方电力平台，电力改革+区域电价预期+煤价回落改善盈利，资金博弈重组预期',
  },
  '300209': {
    riseType: '炒作',
    theme: '算力租赁',
    whyUp:
      '破产重整后更名转型，布局算力租赁+液冷设备+芯片设计；五年算力大单预期驱动，公司仍亏损，题材大于业绩',
  },
  '301217': {
    riseType: '业绩',
    theme: 'PCB/铜箔',
    whyUp: '锂电/PCB 铜箔，AI 服务器高频铜箔与储能需求双轮，产能利用率提升',
  },
  '300903': {
    riseType: '情绪',
    theme: 'AI算力PCB',
    whyUp:
      'PCB 向 AI 算力转型，800G 光模块 PCB 与服务器 PCB 小批量供货；陶瓷散热板仍处研发，预期先于量产',
  },
  '002491': {
    riseType: '情绪',
    theme: '光纤概念',
    whyUp:
      '光棒光纤项目推进+一季度扣非扭亏，光通信板块情绪带动；公司澄清不涉及光模块/光芯片，算力光纤逻辑需谨慎',
  },
  '301669': {
    riseType: '情绪',
    theme: '储能BMS',
    whyUp: '储能 BMS 龙头次新上市，大型储能出货量居行业前列；次新溢价+赛道叙事，非单纯新能源车 BMS',
  },
};

function get(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { 'User-Agent': 'Mozilla/5.0', Referer: 'https://quote.eastmoney.com/' } }, (res) => {
        let d = '';
        res.on('data', (c) => (d += c));
        res.on('end', () => {
          try {
            resolve(JSON.parse(d));
          } catch (e) {
            reject(e);
          }
        });
      })
      .on('error', reject);
  });
}

function filterStock(s) {
  const name = s.f14 || '';
  const code = s.f12 || '';
  if (/ST|退/.test(name)) return false;
  if (code.startsWith('688') || code.startsWith('8') || code.startsWith('4')) return false;
  if (/-UW/.test(name)) return false;
  return true;
}

function secidOf(s) {
  const m = s.f13 === 1 ? '1' : '0';
  return `${m}.${s.f12}`;
}

function pctLabel(pct) {
  const sign = pct >= 0 ? '+' : '';
  return `${sign}${pct.toFixed(2)}%`;
}

async function main() {
  const j = await get(LIST_URL);
  const list = (j.data?.diff || []).filter(filterStock).slice(0, 15);
  if (list.length < 15) {
    console.warn('警告: 过滤后不足 15 只，实际', list.length);
  }

  const today = new Date().toISOString().slice(0, 10);
  const companies = list.map((s, i) => {
    const code = s.f12;
    const attr = ATTRIBUTION[code] || {
      riseType: '情绪',
      theme: '—',
      whyUp: '待补充归因说明',
    };
    const pct = Math.round(s.f25 * 100) / 100;
    return {
      rank: i + 1,
      name: s.f14,
      code,
      secid: secidOf(s),
      pct,
      pctLabel: pctLabel(pct),
      riseType: attr.riseType,
      whyUp: attr.whyUp,
      theme: attr.theme,
      highlight: attr.whyUp,
      verify: {
        source: '东方财富 push2delay f25',
        sourceType: 'market',
        field: 'f25',
        secid: secidOf(s),
      },
    };
  });

  const missing = companies.filter((c) => !ATTRIBUTION[c.code]);
  if (missing.length) {
    console.warn('缺少归因配置:', missing.map((c) => c.code + c.name).join(', '));
  }

  const subtitle = `统计区间：2026年首个交易日至最近收盘（东方财富 f25 年初至今涨跌幅，前复权）；口径：沪深主板+创业板，剔除科创板/北交所/ST/*ST/-UW。数据截至 ${today}。`;
  const disclaimer =
    '免责声明：涨幅数据来源于东方财富公开行情（f25 年初至今涨跌幅），涨跌归因为产业信息整理，仅用于行业学习参考，不构成证券投资建议；不提供任何选股、行情或买卖指导。行情实时变动，请以交易所披露为准；自主投资请独立审慎判断。';
  const footerLines = [
    '涨幅数据来源于东方财富公开行情（f25 年初至今涨跌幅），涨跌归因为产业信息整理，仅用于行业学习参考，',
    '不构成证券投资建议；不提供任何选股、行情或买卖指导。',
    '行情实时变动，请以交易所披露为准；自主投资请独立审慎判断。',
  ];

  const out = {
    key: '2026年初涨幅榜',
    title: '2026年初至今涨幅 Top15',
    subtitle,
    disclaimer,
    footerLines,
    period: '2026.1–至今',
    generatedAt: today,
    companies,
  };

  const js =
    '/** 2026 年初至今涨幅 Top15 · 由 scripts/build-ytd-gainers2026.js 生成 */\n' +
    `var YTD_GAINERS2026 = ${JSON.stringify(out, null, 2)};\n` +
    "if (typeof window !== 'undefined') window.YTD_GAINERS2026 = YTD_GAINERS2026;\n";

  const outPath = path.join(__dirname, '../data/ytd-gainers2026.js');
  const jsonPath = path.join(__dirname, '../data/ytd-gainers2026.json');
  fs.writeFileSync(outPath, js, 'utf8');
  fs.writeFileSync(jsonPath, JSON.stringify(out, null, 2), 'utf8');
  console.log('已写入', outPath);
  console.log('已写入', jsonPath);
  companies.forEach((c) => console.log(`${c.rank}. ${c.name} ${c.code} ${c.pctLabel}`));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
