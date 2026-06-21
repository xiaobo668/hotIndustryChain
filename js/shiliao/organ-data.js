/**
 * 健康饮食模块 — 营养侧重（当前为空，待录入）
 */
const SHILIAO_ORGAN_DATA = {};

const SHILIAO_ORGAN_KEYWORD_MAP = {};

for (const [key, item] of Object.entries(SHILIAO_ORGAN_DATA)) {
  (item.alias || []).forEach((a) => {
    if (!SHILIAO_ORGAN_KEYWORD_MAP[a]) SHILIAO_ORGAN_KEYWORD_MAP[a] = key;
  });
}

function resolveShiliaoOrganKey(query) {
  const q = (query || '').trim();
  if (!q) return null;
  if (SHILIAO_ORGAN_DATA[q]) return q;
  if (SHILIAO_ORGAN_KEYWORD_MAP[q]) return SHILIAO_ORGAN_KEYWORD_MAP[q];
  for (const [kw, key] of Object.entries(SHILIAO_ORGAN_KEYWORD_MAP)) {
    if (q.includes(kw) || kw.includes(q)) return key;
  }
  for (const key of Object.keys(SHILIAO_ORGAN_DATA)) {
    if (key.includes(q) || q.includes(key)) return key;
    const item = SHILIAO_ORGAN_DATA[key];
    if ((item.alias || []).some((a) => a.includes(q) || q.includes(a))) return key;
  }
  return null;
}

function getShiliaoOrganList() {
  return Object.values(SHILIAO_ORGAN_DATA);
}
