/**
 * 健康饮食模块 — 场景饮食（当前为空，待录入）
 */
const SHILIAO_DISEASE_DATA = {};

const SHILIAO_DISEASE_KEYWORD_MAP = {};

for (const [key, item] of Object.entries(SHILIAO_DISEASE_DATA)) {
  (item.alias || []).forEach((a) => {
    if (!SHILIAO_DISEASE_KEYWORD_MAP[a]) SHILIAO_DISEASE_KEYWORD_MAP[a] = key;
  });
}

function resolveShiliaoDiseaseKey(query) {
  const q = (query || '').trim();
  if (!q) return null;
  if (SHILIAO_DISEASE_DATA[q]) return q;
  if (SHILIAO_DISEASE_KEYWORD_MAP[q]) return SHILIAO_DISEASE_KEYWORD_MAP[q];
  for (const [kw, key] of Object.entries(SHILIAO_DISEASE_KEYWORD_MAP)) {
    if (q.includes(kw) || kw.includes(q)) return key;
  }
  for (const key of Object.keys(SHILIAO_DISEASE_DATA)) {
    if (key.includes(q) || q.includes(key)) return key;
    const item = SHILIAO_DISEASE_DATA[key];
    if ((item.alias || []).some((a) => a.includes(q) || q.includes(a))) return key;
  }
  return null;
}

function getShiliaoDiseaseList() {
  return Object.values(SHILIAO_DISEASE_DATA);
}
