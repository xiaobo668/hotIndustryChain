/**
 * UI 通用逻辑
 * - doSearch(query): 主搜索入口（已移至 industry/search.js）
 * - quickSearch(keyword): 热门标签快速搜索
 */

/** 快速搜索（热门标签点击） */
function quickSearch(keyword) {
  const input = document.getElementById('industry-select-input');
  if (input) input.value = keyword;
  doSearch(keyword);
}

// ===== 搜索框回车键绑定 =====
// 已移至 index.html 中的自定义 Select 组件内处理

// doSearch 和 updateLoading 已在 industry/search.js 中定义
// switchMode 已移除（合并为单一模式）

/** 清空所有本地缓存（产业链 + 板块龙头 + 文章） */
function clearAllCache() {
  // 使用 cache.js 的 Cache.clearAll()
  if (typeof Cache !== 'undefined' && Cache.clearAll) {
    Cache.clearAll();
  }
  // 兼容：也直接扫 localStorage
  const keys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k && (k.startsWith('industry_ai_') || k.startsWith('sector_ai_') || k.startsWith('article:'))) {
      keys.push(k);
    }
  }
  keys.forEach(k => localStorage.removeItem(k));
  alert(`✅ 已清空 ${keys.length} 条缓存（产业链+龙头+文章），请重新搜索`);
}
