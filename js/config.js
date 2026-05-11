/**
 * 全局配置
 * - API_CONFIG: 后端 API 地址和超时配置
 * - MODEL_LABELS: AI 模型来源标签映射（所有模块共用）
 * - 全局状态变量
 */

// ==================== API 配置 ====================
const API_CONFIG = {
  baseUrl: window.INDUSTRY_API_BASE_URL || (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.protocol === 'file:'
    ? 'http://localhost:3100'
    : 'https://1307599460-iu9hscdc7x.ap-guangzhou.tencentscf.com'),
  industryEndpoint: '/api/industry',
  sectorEndpoint: '/api/sector',
  xhsEndpoint: '/api/xhs',
  articleEndpoint: '/api/article',
  timeout: 240000,       // 默认超时 240s
  articleTimeout: 300000, // 公众号文章超时 300s（5分钟）
};

// ==================== 缓存配置 ====================
const CACHE_PREFIX = 'industry_ai_';
const SECTOR_CACHE_PREFIX = 'sector_ai_';
const CACHE_TTL = 7 * 24 * 60 * 60 * 1000; // 7 天

// ==================== AI 模型来源标签（共用）====================
const MODEL_LABELS = {
  kimi: 'Kimi（Moonshot）',
  deepseek: 'DeepSeek',
  doubao: '豆包（Doubao）',
  cache: '本地缓存',
  local: '本地数据',
};

// ==================== 全局变量（搜索状态）====================
let lastAIQuery = '';
let lastAIMode = '';

console.log('[config.js] 加载完成');

// ==================== 工具函数 ====================
// 注意：全局状态已迁移到 state.js，使用 AppState 对象管理
/**
 * 清理公司名：
 * 1. 去掉股票代码，如 "中国巨石（600176）" → "中国巨石"
 * 2. 去掉 ST/*ST 标记，如 "*ST左江" → ""（返回空字符串表示应过滤）
 * 3. 去掉退市标记，如 "退市紫晶" → ""
 * 4. 去掉科创板 U 标记，如 "中芯国际-U" → "中芯国际"
 * 支持任意位数字的股票代码
 */
function stripStockCode(name) {
  if (!name) return name;
  let s = String(name).replace(/[（(]\s*\d+\s*[）)]/g, '').trim();
  // 过滤 ST / *ST / 退市
  if (/(^\*?ST|退市)/i.test(s)) return '';
  // 去掉 -U / -W 等科创板后缀
  s = s.replace(/[-_][UW]$/i, '').trim();
  return s;
}
