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
  timeout: 240000,       // 默认超时 240s（豆包 Responses API 有推理过程，需要较长时间）
  articleTimeout: 240000, // 公众号文章超时 240s
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

// ==================== 全局状态 ====================
let currentIndustry = null;
let currentSector = null;
let mindChartInstance = null;

// 上次 AI 查询状态（用于重试）
let lastAIQuery = '';
let lastAIMode = 'industry';

// ==================== 工具函数 ====================
/** 去掉公司名中的股票代码，如 "中国巨石（600176）" → "中国巨石"，支持任意位数字 */
function stripStockCode(name) {
  if (!name) return name;
  return name.replace(/[（(]\s*\d+\s*[）)]/g, '').trim();
}
