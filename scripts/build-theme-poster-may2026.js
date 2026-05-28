/**
 * 2026.5.1–5.28 主题板块涨幅 Top5 + 强相关复验 + 海报数据 JSON
 * 区间：2026-05-06（五一后首个交易日）至 2026-05-28 收盘（5.1–5.5 休市）
 * 运行: node scripts/build-theme-poster-may2026.js
 */
const fs = require('fs');
const https = require('https');
const path = require('path');
const vm = require('vm');
const { isStarBoard } = require('./star-board-names');

const BEG = '20260501';
const END = '20260528';
const PERIOD_LABEL = '2026.5.6–5.28';
const PERIOD_NOTE = '统计区间：2026-05-06（节后首日）至 2026-05-28 收盘；五一假期休市。';

/** 板块核心技术口径 + 候选池（须在产业链或明确 CPO/存储口径内） */
const THEMES = {
  PCB: {
    industryKey: 'PCB',
    coreTech: '高频高速覆铜板、HDI/高多层PCB、AI服务器与交换机用板',
    candidates: [
      ['沪电股份', '0.002463'],
      ['深南电路', '0.002916'],
      ['胜宏科技', '0.300476'],
      ['生益科技', '1.600183'],
      ['鹏鼎控股', '0.002938'],
      ['东山精密', '0.002384'],
      ['景旺电子', '1.603228'],
      ['崇达技术', '0.002815'],
      ['大族数控', '0.301200'],
      ['奥士康', '0.002913'],
      ['博敏电子', '1.603936'],
    ],
    strongKw: /PCB|印制电路|覆铜板|HDI|高多层|高速板|背板|CCL|铜箔|钻孔|LDI/i,
    weakKw: /仅概念|蹭概念|白酒|光伏组件/,
  },
  CPO: {
    industryKey: null,
    coreTech: '共封装光学（CPO）、800G/1.6T光模块、硅光/光引擎、MPO与光纤连接器',
    candidates: [
      ['中际旭创', '0.300308'],
      ['新易盛', '0.300502'],
      ['天孚通信', '0.300394'],
      ['光迅科技', '0.002281'],
      ['剑桥科技', '1.603083'],
      ['华工科技', '0.000988'],
      ['太辰光', '0.300570'],
      ['博创科技', '0.300548'],
      ['罗博特科', '0.300757'],
      ['联特科技', '0.301205'],
      ['铭普光磁', '0.002902'],
    ],
    strongKw: /CPO|共封装|光模块|光引擎|硅光|800G|1\.6T|光器件|激光器|FAU|MPO|光纤|数通光/i,
    weakKw: /仅概念|蹭概念|白酒|动力电池(?!.*光)/,
    chainNames: ['中际旭创', '新易盛', '天孚通信', '光迅科技', '华工科技', '剑桥科技', '太辰光', '博创科技', '罗博特科'],
  },
  存储芯片: {
    industryKey: '长鑫存储',
    coreTech: 'DRAM/HBM、存储封测、模组与长鑫产业链设备材料',
    candidates: [
      ['江波龙', '0.301308'],
      ['兆易创新', '1.603986'],
      ['深科技', '0.000021'],
      ['太极实业', '1.600667'],
      ['长川科技', '0.300604'],
      ['通富微电', '0.002156'],
      ['北京君正', '0.300223'],
      ['朗科科技', '0.300042'],
      ['香农芯创', '0.300475'],
      ['协创数据', '0.300857'],
      ['德明利', '0.001309'],
    ],
    strongKw: /DRAM|存储|HBM|NAND|Flash|封测|模组|长鑫|颗粒|内存/i,
    weakKw: /仅概念|蹭概念|白酒|光伏/,
  },
  先进封装: {
    industryKey: '先进封装',
    coreTech: '2.5D/3D、Chiplet、Fan-out、WLP、封装基板与封测 OSAT',
    candidates: [
      ['长电科技', '1.600584'],
      ['通富微电', '0.002156'],
      ['华天科技', '0.002185'],
      ['深南电路', '0.002916'],
      ['兴森科技', '0.002436'],
      ['晶方科技', '1.603005'],
      ['劲拓股份', '0.300400'],
      ['飞凯材料', '0.300398'],
      ['长川科技', '0.300604'],
    ],
    strongKw: /封装|封测|Chiplet|2\.5D|3D|Fan-out|WLP|OSAT|凸块|载板|TSV|HBM|XDFOI/i,
    weakKw: /仅概念|蹭概念|白酒|面板(?!.*封)/,
  },
  算力租赁: {
    industryKey: '算力租赁',
    coreTech: '智算中心运营、GPU/裸金属算力出租、IDC上架与算力调度',
    candidates: [
      ['润泽科技', '0.300442'],
      ['光环新网', '0.300383'],
      ['奥飞数据', '0.300738'],
      ['数据港', '1.603881'],
      ['科华数据', '0.002335'],
      ['利通电子', '1.603629'],
      ['首都在线', '0.300846'],
      ['网宿科技', '0.300017'],
      ['鸿博股份', '0.002229'],
      ['亚康股份', '0.301085'],
      ['云赛智联', '1.600602'],
    ],
    strongKw: /算力租赁|智算|GPU|裸金属|IDC|数据中心|上架|机柜|出租/i,
    weakKw: /仅概念|蹭概念|白酒|光伏组件/,
  },
  液冷: {
    industryKey: '液冷',
    coreTech: '液冷冷板、CDU、浸没液冷、氟化冷却液与液冷服务器',
    candidates: [
      ['英维克', '0.002837'],
      ['高澜股份', '0.300499'],
      ['申菱环境', '0.301018'],
      ['同飞股份', '0.300990'],
      ['浪潮信息', '0.000977'],
      ['中科曙光', '1.603019'],
      ['银轮股份', '0.002126'],
      ['巨化股份', '1.600160'],
      ['三美股份', '1.603379'],
      ['川环科技', '0.300547'],
      ['佳力图', '1.603912'],
      ['依米康', '0.300249'],
    ],
    strongKw: /液冷|CDU|冷板|浸没|氟化|冷却液|温控|散热|PUE/i,
    weakKw: /仅概念|蹭概念|白酒|动力电池(?!.*热)/,
  },
};

function secidToSymbol(secid) {
  const [m, code] = secid.split('.');
  return (m === '1' ? 'sh' : 'sz') + code;
}

/** 腾讯前复权日 K（五一后区间） */
function fetchKlinesOnce(secid) {
  const sym = secidToSymbol(secid);
  const url = `https://web.ifzq.gtimg.cn/appstock/app/fqkline/get?param=${sym},day,2026-05-06,2026-05-28,640,qfq`;
  return new Promise((resolve, reject) => {
    const req = https.get(url, {
      timeout: 20000,
      headers: { 'User-Agent': 'Mozilla/5.0', Referer: 'https://finance.qq.com/' },
    }, (res) => {
      let raw = '';
      res.on('data', (c) => { raw += c; });
      res.on('end', () => {
        try {
          const j = JSON.parse(raw);
          const days = j?.data?.[sym]?.qfqday;
          if (!days?.length) return resolve(null);
          const bars = days.filter((d) => Array.isArray(d) && d.length >= 3);
          if (!bars.length) return resolve(null);
          const first = bars[0];
          const last = bars[bars.length - 1];
          const startClose = parseFloat(first[2]);
          const endClose = parseFloat(last[2]);
          const pct = ((endClose - startClose) / startClose) * 100;
          resolve({
            startDate: first[0],
            endDate: last[0],
            startClose,
            endClose,
            pct: Math.round(pct * 100) / 100,
          });
        } catch (e) {
          reject(e);
        }
      });
    });
    req.on('error', reject);
  });
}

async function fetchKlines(secid, retries = 4) {
  for (let i = 0; i < retries; i++) {
    try {
      const r = await fetchKlinesOnce(secid);
      if (r) return r;
    } catch (e) {
      if (i === retries - 1) throw e;
      await sleep(400 * (i + 1));
    }
  }
  return null;
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function loadIndustryChains() {
  const root = path.join(__dirname, '..');
  const code = fs.readFileSync(path.join(root, 'data.js'), 'utf8')
    .replace(/\bconst INDUSTRY_DATA\b/, 'var INDUSTRY_DATA');
  const sandbox = {};
  vm.runInNewContext(code + ';this.INDUSTRY_DATA=INDUSTRY_DATA;', sandbox);
  return sandbox.INDUSTRY_DATA;
}

function chainCompanySet(industry) {
  const set = new Set();
  if (!industry) return set;
  for (const tier of [industry.upstream, industry.midstream, industry.downstream]) {
    for (const seg of tier || []) {
      for (const co of seg.companies || []) set.add(co.name);
    }
  }
  return set;
}

function getHighlight(industry, name) {
  const sources = [industry];
  if (!industry && typeof INDUSTRY_DATA !== 'undefined') {
    sources.push(INDUSTRY_DATA['AI算力']);
  }
  for (const ind of sources) {
    if (!ind) continue;
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

async function main() {
  const INDUSTRY_DATA = loadIndustryChains();
  const errors = [];
  const poster = {
    title: '六大科技主题 · 核心技术龙头涨幅榜',
    period: PERIOD_LABEL,
    periodNote: PERIOD_NOTE,
    generatedAt: new Date().toISOString().slice(0, 10),
    themes: [],
  };

  for (const [themeName, cfg] of Object.entries(THEMES)) {
    const industry = cfg.industryKey ? INDUSTRY_DATA[cfg.industryKey] : null;
    const chainSet = chainCompanySet(industry);
    if (cfg.chainNames) cfg.chainNames.forEach((n) => chainSet.add(n));

    const rows = [];
    for (const [name, secid] of cfg.candidates) {
      await sleep(180);
      let ret;
      try {
        ret = await fetchKlines(secid);
      } catch (e) {
        errors.push(`${themeName} ${name} 行情获取失败: ${e.message}`);
        continue;
      }
      if (!ret) {
        errors.push(`${themeName} ${name} 无K线数据`);
        continue;
      }
      if (isStarBoard(name)) continue;
      const hl = getHighlight(industry, name);
      const inChain = chainSet.has(name);
      const strongText = hl || cfg.coreTech;
      const strongOk = cfg.strongKw.test(strongText) || inChain;
      if (!strongOk) errors.push(`${themeName} ${name} 强相关待核对: ${strongText.slice(0, 40)}`);
      if (cfg.weakKw.test(strongText)) errors.push(`${themeName} ${name} 弱相关描述`);

      rows.push({
        name,
        secid,
        pct: ret.pct,
        startDate: ret.startDate,
        endDate: ret.endDate,
        startClose: ret.startClose,
        endClose: ret.endClose,
        inChain,
        highlight: hl || `${cfg.coreTech.split('、')[0]}代表标的`,
      });
    }

    rows.sort((a, b) => b.pct - a.pct);
    const top5 = rows.slice(0, 5);

    top5.forEach((r) => {
      if (!r.inChain && !cfg.chainNames?.includes(r.name)) {
        const ok = cfg.strongKw.test(r.highlight);
        if (!ok) errors.push(`${themeName} Top5 ${r.name} 不在产业链且 highlight 未命中核心技术关键词`);
      }
    });

    poster.themes.push({
      name: themeName,
      coreTech: cfg.coreTech,
      industryKey: cfg.industryKey,
      companies: top5.map((r) => ({
        name: r.name,
        pct: r.pct,
        pctLabel: (r.pct >= 0 ? '+' : '') + r.pct.toFixed(2) + '%',
        highlight: r.highlight,
        verify: {
          start: `${r.startDate} 收${r.startClose}`,
          end: `${r.endDate} 收${r.endClose}`,
          inChain: r.inChain,
        },
      })),
    });

    console.log(`\n【${themeName}】${cfg.coreTech}`);
    top5.forEach((r, i) => {
      console.log(
        `  ${i + 1}. ${r.name}  ${r.pct >= 0 ? '+' : ''}${r.pct.toFixed(2)}%  (${r.startDate}→${r.endDate}  ${r.startClose}→${r.endClose})  ${r.inChain ? '✓产业链' : '○口径外'}`
      );
    });
  }

  const outDir = path.join(__dirname, '..', 'data');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, 'theme-poster-may2026.json');
  fs.writeFileSync(outPath, JSON.stringify(poster, null, 2), 'utf8');
  console.log('\n已写入', outPath);

  if (errors.length) {
    console.log('\n复验提示（' + errors.length + ' 条）:');
    errors.forEach((e) => console.log(' -', e));
  } else {
    console.log('\n复验：全部候选获取成功，Top5 已按涨幅排序');
  }
}

if (require.main === module) {
  main().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}

module.exports = { THEMES, fetchKlines, secidToSymbol };
