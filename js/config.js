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
  timeout: 30000,
};

// ==================== 缓存配置 ====================
const CACHE_PREFIX = 'industry_ai_';
const SECTOR_CACHE_PREFIX = 'sector_ai_';
const CACHE_TTL = 7 * 24 * 60 * 60 * 1000; // 7 天

// ==================== AI 模型来源标签（共用）====================
const MODEL_LABELS = {
  kimi: 'Kimi（Moonshot）',
  deepseek: 'DeepSeek',
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
