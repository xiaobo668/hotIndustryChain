/**
 * 健康饮食模块 — 饮食汇总（当前为空，待录入）
 */
const SHILIAO_SUMMARY_DATA = {};

const SHILIAO_SUMMARY_KEYWORD_MAP = {};

for (const [key, item] of Object.entries(SHILIAO_SUMMARY_DATA)) {
  (item.alias || []).forEach((a) => {
    if (!SHILIAO_SUMMARY_KEYWORD_MAP[a]) SHILIAO_SUMMARY_KEYWORD_MAP[a] = key;
  });
}

function resolveShiliaoSummaryKey(query) {
  const q = (query || '').trim();
  if (!q) return null;
  if (SHILIAO_SUMMARY_DATA[q]) return q;
  if (SHILIAO_SUMMARY_KEYWORD_MAP[q]) return SHILIAO_SUMMARY_KEYWORD_MAP[q];
  for (const [kw, key] of Object.entries(SHILIAO_SUMMARY_KEYWORD_MAP)) {
    if (q.includes(kw) || kw.includes(q)) return key;
  }
  for (const key of Object.keys(SHILIAO_SUMMARY_DATA)) {
    if (key.includes(q) || q.includes(key)) return key;
    const item = SHILIAO_SUMMARY_DATA[key];
    if ((item.alias || []).some((a) => a.includes(q) || q.includes(a))) return key;
  }
  return null;
}

function getShiliaoSummaryList() {
  return Object.values(SHILIAO_SUMMARY_DATA);
}
