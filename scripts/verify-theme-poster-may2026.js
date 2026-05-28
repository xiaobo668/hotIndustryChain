/**
 * 主题涨幅榜复验：强相关 + 涨幅与腾讯行情交叉校验
 * 运行: node scripts/verify-theme-poster-may2026.js
 */
const fs = require('fs');
const https = require('https');
const path = require('path');
const vm = require('vm');
const { THEMES } = require('./build-theme-poster-may2026');

const poster = JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', 'data', 'theme-poster-may2026.json'), 'utf8')
);

function secidToSymbol(secid) {
  const [m, code] = secid.split('.');
  return (m === '1' ? 'sh' : 'sz') + code;
}

const NAME_TO_SECID = {};
Object.values(THEMES).forEach((cfg) => {
  cfg.candidates.forEach(([name, secid]) => {
    NAME_TO_SECID[name] = secid;
  });
});

function fetchPct(secid) {
  const sym = secidToSymbol(secid);
  const url = `https://web.ifzq.gtimg.cn/appstock/app/fqkline/get?param=${sym},day,2026-05-06,2026-05-28,640,qfq`;
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let raw = '';
      res.on('data', (c) => { raw += c; });
      res.on('end', () => {
        const days = JSON.parse(raw)?.data?.[sym]?.qfqday?.filter((d) => Array.isArray(d));
        if (!days?.length) return resolve(null);
        const a = parseFloat(days[0][2]);
        const b = parseFloat(days.at(-1)[2]);
        resolve(Math.round(((b - a) / a) * 10000) / 100);
      });
    }).on('error', reject);
  });
}

function loadIndustry() {
  const code = fs.readFileSync(path.join(__dirname, '..', 'data.js'), 'utf8')
    .replace(/\bconst INDUSTRY_DATA\b/, 'var INDUSTRY_DATA');
  const sandbox = {};
  vm.runInNewContext(code + ';this.INDUSTRY_DATA=INDUSTRY_DATA;', sandbox);
  return sandbox.INDUSTRY_DATA;
}

const INDUSTRY_DATA = loadIndustry();
const errors = [];

poster.themes.forEach((theme) => {
  const cfg = THEMES[theme.name];
  if (!cfg) {
    errors.push(`未知主题: ${theme.name}`);
    return;
  }
  const industry = cfg.industryKey ? INDUSTRY_DATA[cfg.industryKey] : null;
  const chain = new Set();
  if (industry) {
    ['upstream', 'midstream', 'downstream'].forEach((t) => {
      (industry[t] || []).forEach((seg) => {
        (seg.companies || []).forEach((co) => chain.add(co.name));
      });
    });
  }
  (cfg.chainNames || []).forEach((n) => chain.add(n));

  theme.companies.forEach((co, i) => {
    const hl = co.highlight || '';
    if (!cfg.strongKw.test(hl) && !chain.has(co.name)) {
      errors.push(`${theme.name} #${i + 1} ${co.name} 强相关待核对`);
    }
    if (cfg.weakKw.test(hl)) errors.push(`${theme.name} ${co.name} 弱相关描述`);

    const secid = NAME_TO_SECID[co.name];
    if (!secid) {
      errors.push(`${theme.name} ${co.name} 缺少 secid 映射，无法复验涨幅`);
      return;
    }
  });
});

(async () => {
  console.log('=== 主题涨幅榜复验 ===\n');
  for (const theme of poster.themes) {
    console.log(`【${theme.name}】`);
    for (const co of theme.companies) {
      const secid = NAME_TO_SECID[co.name];
      if (!secid) continue;
      await new Promise((r) => setTimeout(r, 200));
      let live;
      try {
        live = await fetchPct(secid);
      } catch (e) {
        errors.push(`${theme.name} ${co.name} 行情拉取失败`);
        continue;
      }
      const diff = Math.abs(live - co.pct);
      const ok = diff < 0.15;
      console.log(
        `  ${co.name}  榜单${co.pctLabel}  复验${live >= 0 ? '+' : ''}${live}%  ${ok ? '✓' : '✗偏差' + diff.toFixed(2)}`
      );
      if (!ok) errors.push(`${theme.name} ${co.name} 涨幅偏差: 榜单${co.pct}% vs 复验${live}%`);
    }
    console.log('');
  }

  if (errors.length) {
    console.log('FAIL:', errors.length);
    errors.forEach((e) => console.log(' -', e));
    process.exit(1);
  }
  console.log('PASS：强相关 + 涨幅复验一致');
})();
