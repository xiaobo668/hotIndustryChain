/**
 * UI 通用逻辑
 * - doSearch(query): 主搜索入口（已移至 industry/search.js）
 * - quickSearch(keyword): 热门标签快速搜索
 */

/** 快速搜索（热门标签点击） */
function quickSearch(keyword) {
  const input = document.getElementById('search-input');
  input.value = keyword;
  doSearch(keyword);
}

// ===== 搜索框回车键绑定 =====
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        doSearch(searchInput.value);
      }
    });
  }
});

// doSearch 和 updateLoading 已在 industry/search.js 中定义
// switchMode 已移除（合并为单一模式）
