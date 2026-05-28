/** node scripts/fetch-one-kline.js 0.002463 */
const https = require('https');
const secid = process.argv[2];
const BEG = '20260501';
const END = '20260528';
const url = `https://push2his.eastmoney.com/api/qt/stock/kline/get?secid=${secid}&fields1=f1&fields2=f51,f53&klt=101&fqt=1&beg=${BEG}&end=${END}`;
https.get(url, { timeout: 20000 }, (res) => {
  let raw = '';
  res.on('data', (c) => (raw += c));
  res.on('end', () => console.log(raw));
}).on('error', (e) => console.error(e));
