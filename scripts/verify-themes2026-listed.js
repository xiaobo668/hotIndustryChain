/**
 * 2026六大主线：校验个股是否为沪深京 A 股在上市（简称精确匹配）
 * 数据源：东方财富 push2 clist（沪深主板/创业板/科创板/北交所）
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const https = require('https');

const root = path.join(__dirname, '..');

function loadThemes2026() {
  const sandbox = { INDUSTRY_DATA: {}, KEYWORD_MAP: {} };
  vm.runInNewContext(fs.readFileSync(path.join(root, 'js/industry/themes2026-data.js'), 'utf8'), sandbox);
  return sandbox.INDUSTRY_DATA['2026六大主线'];
}

function httpsGetJson(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { 'User-Agent': 'Mozilla/5.0', Referer: 'https://quote.eastmoney.com/' } }, (res) => {
        let raw = '';
        res.on('data', (c) => (raw += c));
        res.on('end', () => {
          try {
            resolve(JSON.parse(raw));
          } catch (e) {
            reject(e);
          }
        });
      })
      .on('error', reject);
  });
}

/** @returns {Map<string, {code:string, market:string}>} */
async function fetchAshareMap() {
  const fsParam =
    'm:0+t:6,m:0+t:80,m:0+t:81+s:2048,m:1+t:2,m:1+t:23,m:0+t:7,m:1+t:3';
  const host = 'push2delay.eastmoney.com';
  const pz = 100;
  const map = new Map();
  let pn = 1;
  let total = Infinity;

  while ((pn - 1) * pz < total) {
    const path =
      `/api/qt/clist/get?pn=${pn}&pz=${pz}&po=1&np=1&fltt=2&invt=2&fid=f12&fs=${encodeURIComponent(fsParam)}` +
      '&fields=f12,f13,f14&ut=bd1d9ddb04089700cf9c27f6f7426281';
    const json = await httpsGetJson(`https://${host}${path}`);
    const diff = json?.data?.diff;
    if (!diff) throw new Error(`东方财富 A 股列表拉取失败（第 ${pn} 页）`);
    total = Number(json.data.total) || total;
    const items = Array.isArray(diff) ? diff : Object.values(diff);
    if (!items.length) break;
    for (const row of items) {
      const code = String(row.f12 || '').padStart(6, '0');
      const name = String(row.f14 || '').trim();
      const mkt = row.f13;
      if (!code || !name) continue;
      let market = '其他';
      if (/^688|^689/.test(code)) market = '科创板';
      else if (mkt === 1) market = '沪市';
      else if (mkt === 0) {
        if (/^30/.test(code)) market = '创业板';
        else if (/^8|^4/.test(code)) market = '北交所';
        else market = '深市';
      }
      map.set(name, { code, market });
    }
    pn += 1;
    if (items.length < pz) break;
  }
  return map;
}

function collectCompanies(ind) {
  const rows = [];
  const seen = new Set();
  for (const theme of ind.themeGroups || []) {
    for (const seg of theme.segments || []) {
      for (const co of seg.companies || []) {
        const key = co.name;
        if (seen.has(key)) continue;
        seen.add(key);
        rows.push({ theme: theme.title, segment: seg.name, name: co.name });
      }
    }
  }
  return rows;
}

/** 交易所简称核心名（除权 XD、*ST、全角 A、股份/集团 后缀） */
function stockCore(name) {
  return String(name)
    .replace(/\uFF21/g, 'A')
    .replace(/\uFF22/g, 'B')
    .replace(/^XD/i, '')
    .replace(/^\*ST|^ST/i, '')
    .replace(/(股份|集团|控股|科技|电子)$/g, '')
    .replace(/股$/g, '')
    .trim();
}

function lookupName(name, map) {
  const direct = map.get(name);
  if (direct) return { hit: direct, official: name };
  const half = name.replace(/\uFF21/g, 'A').replace(/\uFF22/g, 'B');
  if (half !== name && map.get(half)) return { hit: map.get(half), official: half };
  const full = name.replace(/A$/g, '\uFF21').replace(/B$/g, '\uFF22');
  if (full !== name && map.get(full)) return { hit: map.get(full), official: full };
  const want = stockCore(name);
  for (const [n, info] of map) {
    if (stockCore(n) === want) return { hit: info, official: n };
  }
  return null;
}

function suggest(name, map) {
  const hits = [];
  for (const [n, info] of map) {
    if (n.includes(name) || name.includes(n.replace(/[Aa]$/, ''))) hits.push({ n, ...info });
  }
  return hits.slice(0, 5);
}

async function main() {
  const ind = loadThemes2026();
  if (!ind) {
    console.error('未加载 2026六大主线 数据');
    process.exit(1);
  }

  console.log('正在拉取 A 股简称列表…');
  const map = await fetchAshareMap();
  console.log(`A 股简称共 ${map.size} 条\n`);

  const rows = collectCompanies(ind);
  const ok = [];
  const bad = [];

  for (const r of rows) {
    const found = lookupName(r.name, map);
    if (found) {
      ok.push({ ...r, ...found.hit, official: found.official });
      if (found.official !== r.name) {
        ok[ok.length - 1].renameNote = `数据「${r.name}」↔ 行情简称「${found.official}」`;
      }
    } else {
      bad.push({ ...r, suggest: suggest(r.name, map) });
    }
  }

  console.log('=== 校验通过（A 股在上市，简称匹配）===');
  console.log(`共 ${ok.length} 家（去重）\n`);
  ok.sort((a, b) => a.code.localeCompare(b.code));
  const renames = ok.filter((x) => x.renameNote);
  for (const x of ok) {
    const note = x.renameNote ? `  ← ${x.renameNote}` : '';
    console.log(`  ${x.code} ${x.name.padEnd(8)} ${x.market.padEnd(6)}  ${x.theme} / ${x.segment.split('·').pop()}${note}`);
  }
  if (renames.length) {
    console.log(`\n（${renames.length} 家与行情简称存在 XD/全角A 等差异，数据名可保留便于阅读）`);
  }

  if (bad.length) {
    console.log('\n=== 未匹配 / 可能非 A 股或简称有误 ===');
    for (const x of bad) {
      console.log(`\n  ✗ ${x.name}`);
      console.log(`    位置: ${x.theme} · ${x.segment.split('·').pop()}`);
      if (x.suggest.length) {
        console.log('    相近 A 股简称:');
        x.suggest.forEach((s) => console.log(`      - ${s.n} (${s.code} ${s.market})`));
      } else {
        console.log('    （无相近简称，可能为港股/未上市/名称错误）');
      }
    }
    console.log(`\n❌ FAIL: ${bad.length} 家未通过 A 股简称校验`);
    process.exit(1);
  }

  console.log(`\n✅ PASS: ${ok.length} 家均为 A 股在上市标的，简称与东方财富一致`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
