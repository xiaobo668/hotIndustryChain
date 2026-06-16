/**
 * 年初涨幅榜复验：东方财富 f25 与腾讯前复权 K 线交叉校验
 * 运行: node scripts/verify-ytd-gainers2026.js
 */
const fs = require('fs');
const https = require('https');
const path = require('path');

const payload = JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', 'data', 'ytd-gainers2026.json'), 'utf8')
);

function secidToSymbol(secid) {
  const [m, code] = secid.split('.');
  return (m === '1' ? 'sh' : 'sz') + code;
}

function fetchKlinePct(secid) {
  const sym = secidToSymbol(secid);
  const url = `https://web.ifzq.gtimg.cn/appstock/app/fqkline/get?param=${sym},day,2026-01-02,2026-06-30,640,qfq`;
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
        let raw = '';
        res.on('data', (c) => {
          raw += c;
        });
        res.on('end', () => {
          try {
            const days = JSON.parse(raw)?.data?.[sym]?.qfqday?.filter((d) => Array.isArray(d));
            if (!days?.length) return resolve(null);
            const a = parseFloat(days[0][2]);
            const b = parseFloat(days.at(-1)[2]);
            resolve({
              pct: Math.round(((b - a) / a) * 10000) / 100,
              start: days[0][0],
              end: days.at(-1)[0],
            });
          } catch (e) {
            reject(e);
          }
        });
      })
      .on('error', reject);
  });
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

(async () => {
  console.log('=== 2026 年初涨幅榜复验 ===\n');
  const errors = [];
  for (const co of payload.companies) {
    await sleep(220);
    let live;
    try {
      live = await fetchKlinePct(co.verify.secid);
    } catch (e) {
      errors.push(`${co.name} K线拉取失败`);
      continue;
    }
    if (!live) {
      console.log(`  ${co.rank}. ${co.name}  榜单${co.pctLabel}  K线—  [${co.riseType}]  △无K线(次新)`);
      continue;
    }
    const diff = Math.abs(live.pct - co.pct);
    const ok = diff < 15;
    const warn = diff >= 15 && diff < 100;
    console.log(
      `  ${co.rank}. ${co.name}  榜单${co.pctLabel}  K线${live.pct >= 0 ? '+' : ''}${live.pct}% (${live.start}→${live.end})  [${co.riseType}]  ${ok ? '✓' : warn ? '△偏差' + diff.toFixed(1) : '✗偏差' + diff.toFixed(1)}`
    );
    if (!ok && !warn) errors.push(`${co.name} 偏差过大 ${diff.toFixed(2)}% (榜单${co.pct}% vs K线${live.pct}%)`);
    if (!['业绩', '情绪', '炒作'].includes(co.riseType)) {
      errors.push(`${co.name} riseType 非法: ${co.riseType}`);
    }
    if (!co.whyUp || co.whyUp.length < 8) errors.push(`${co.name} whyUp 过短`);
  }

  if (errors.length) {
    console.log('\nFAIL:', errors.length);
    errors.forEach((e) => console.log(' -', e));
    process.exit(1);
  }
  console.log('\nPASS');
})();
