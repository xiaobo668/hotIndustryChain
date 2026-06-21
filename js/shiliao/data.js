/**
 * 健康饮食模块 — 食材百科数据（当前为空，待录入）
 */
const SHILIAO_DATA = {};

Object.assign(SHILIAO_DATA, typeof SHILIAO_DATA_EXTRA !== 'undefined' ? SHILIAO_DATA_EXTRA : {});
Object.assign(SHILIAO_DATA, typeof SHILIAO_DATA_HOUSEHOLD !== 'undefined' ? SHILIAO_DATA_HOUSEHOLD : {});

const SHILIAO_KEYWORD_MAP = {};

for (const [key, item] of Object.entries(SHILIAO_DATA)) {
  (item.alias || []).forEach((a) => {
    if (!SHILIAO_KEYWORD_MAP[a]) SHILIAO_KEYWORD_MAP[a] = key;
  });
}

function resolveShiliaoKey(query) {
  const q = (query || '').trim();
  if (!q) return null;
  if (SHILIAO_DATA[q]) return q;
  if (SHILIAO_KEYWORD_MAP[q]) return SHILIAO_KEYWORD_MAP[q];
  for (const [kw, key] of Object.entries(SHILIAO_KEYWORD_MAP)) {
    if (q.includes(kw) || kw.includes(q)) return key;
  }
  for (const key of Object.keys(SHILIAO_DATA)) {
    if (key.includes(q) || q.includes(key)) return key;
    const item = SHILIAO_DATA[key];
    if ((item.alias || []).some((a) => a.includes(q) || q.includes(a))) return key;
  }
  return null;
}

function getShiliaoList() {
  return Object.values(SHILIAO_DATA);
}
