/**
 * 全局状态管理模块 (state.js)
 * 集中管理应用状态，避免全局变量污染
 *
 * 使用方式：
 *   import { store } from './state.js'; // ES6 模块
 *   或直接访问 window.AppState (全局兼容)
 */

// ==================== State Store ====================
const AppState = {
  // ===== 产业链数据 =====
  industry: {
    current: null,           // 当前产业链数据
    chartInstance: null,     // ECharts 思维导图实例
  },

  // ===== 板块龙头数据 =====
  sector: {
    current: null,           // 当前板块龙头数据
  },

  // ===== 公众号文章数据 =====
  article: {
    current: null,           // 当前文章数据
    generating: false,       // 是否正在生成中
  },

  // ===== 小红书数据 =====
  xiaohongshu: {
    currentData: null,       // 当前小红书内容数据
    currentCategory: 'pet-cat', // 当前选中的领域
    currentModule: 'industry',  // 当前激活的模块
  },

  // ===== 搜索状态 =====
  search: {
    lastQuery: '',           // 上次搜索关键词
    lastMode: 'industry',    // 上次搜索模式
    currentQuery: '',        // 当前搜索关键词
  },

  // ===== UI 状态 =====
  ui: {
    activeTab: 'table',      // 当前激活的 Tab
    loading: false,          // 全局加载状态
  },

  // ==================== Getter 方法 ====================
  getIndustry() { return this.industry.current; },
  getSector() { return this.sector.current; },
  getArticle() { return this.article.current; },
  getXHSData() { return this.xiaohongshu.currentData; },
  getSearchQuery() { return this.search.currentQuery; },

  // ==================== Setter 方法（带事件触发）====================
  setIndustry(data) {
    this.industry.current = data;
    this._emit('industry:change', data);
  },

  setSector(data) {
    this.sector.current = data;
    this._emit('sector:change', data);
  },

  setArticle(data) {
    this.article.current = data;
    this._emit('article:change', data);
  },

  setXHSData(data) {
    this.xiaohongshu.currentData = data;
    this._emit('xhs:change', data);
  },

  setSearchQuery(query) {
    this.search.currentQuery = query;
    this.search.lastQuery = query;
  },

  setActiveTab(tab) {
    this.ui.activeTab = tab;
    this._emit('tab:change', tab);
  },

  // ==================== 图表实例管理 ====================
  setChartInstance(instance) {
    this.industry.chartInstance = instance;
  },

  getChartInstance() {
    return this.industry.chartInstance;
  },

  clearChartInstance() {
    if (this.industry.chartInstance) {
      this.industry.chartInstance.dispose();
      this.industry.chartInstance = null;
    }
  },

  // ==================== 重置方法 ====================
  reset() {
    this.industry.current = null;
    this.sector.current = null;
    this.article.current = null;
    this.article.generating = false;
    this.xiaohongshu.currentData = null;
    this.search.currentQuery = '';
    this.ui.activeTab = 'table';
    this.clearChartInstance();
  },

  // ==================== 事件系统（简单实现）====================
  _listeners: {},

  on(event, callback) {
    if (!this._listeners[event]) this._listeners[event] = [];
    this._listeners[event].push(callback);
  },

  off(event, callback) {
    if (!this._listeners[event]) return;
    const idx = this._listeners[event].indexOf(callback);
    if (idx > -1) this._listeners[event].splice(idx, 1);
  },

  _emit(event, data) {
    if (!this._listeners[event]) return;
    this._listeners[event].forEach(cb => {
      try { cb(data); } catch (e) { console.error(e); }
    });
  },
};

// 全局暴露（兼容旧代码）
window.AppState = AppState;
console.log('[state.js] 加载完成');

// 便捷访问器（保持向后兼容）
Object.defineProperty(window, 'currentIndustry', {
  get() { return AppState.getIndustry(); },
  set(v) { AppState.setIndustry(v); },
});

Object.defineProperty(window, 'currentSector', {
  get() { return AppState.getSector(); },
  set(v) { AppState.setSector(v); },
});

Object.defineProperty(window, 'currentArticleData', {
  get() { return AppState.getArticle(); },
  set(v) { AppState.setArticle(v); },
});

Object.defineProperty(window, 'currentXHSData', {
  get() { return AppState.getXHSData(); },
  set(v) { AppState.setXHSData(v); },
});

Object.defineProperty(window, 'mindChartInstance', {
  get() { return AppState.getChartInstance(); },
  set(v) { AppState.setChartInstance(v); },
});

Object.defineProperty(window, 'lastAIQuery', {
  get() { return AppState.search.lastQuery; },
  set(v) { AppState.search.lastQuery = v; },
});

Object.defineProperty(window, 'lastAIMode', {
  get() { return AppState.search.lastMode; },
  set(v) { AppState.search.lastMode = v; },
});

Object.defineProperty(window, 'articleGenerating', {
  get() { return AppState.article.generating; },
  set(v) { AppState.article.generating = v; },
});

Object.defineProperty(window, 'currentSearchQuery', {
  get() { return AppState.search.lastQuery; },
  set(v) { AppState.search.lastQuery = v; },
});
