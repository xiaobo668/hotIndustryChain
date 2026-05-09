/**
 * 全局配置
 * - API_CONFIG: 后端 API 地址和超时配置
 * - MODE_CONFIG: 各模式的 UI 配置（logo、placeholder、热门标签等）
 * - MODEL_LABELS: AI 模型来源标签映射（所有模块共用）
 */

// ==================== API 配置 ====================
const API_CONFIG = {
  baseUrl: window.INDUSTRY_API_BASE_URL || (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.protocol === 'file:'
    ? 'http://localhost:3100'
    : 'https://1307599460-iu9hscdc7x.ap-guangzhou.tencentscf.com'),
  industryEndpoint: '/api/industry',
  sectorEndpoint: '/api/sector',
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

// ==================== 模式配置（可扩展）====================
const MODE_CONFIG = {
  industry: {
    logoIcon: '🔗',
    logoText: '产业链分析',
    logoSub: 'Industry Chain Analyzer',
    placeholder: '输入行业名称，如：半导体、AI算力、算力租赁、新能源汽车...',
    btnText: '分析 →',
    loadingText: '正在分析产业链数据...',
    welcomeIcon: '🏭',
    welcomeTitle: '产业链深度分析',
    welcomeDesc: '输入任意行业名称，智能解析上中下游龙头企业、核心业绩亮点，生成产业链图谱与可视化海报<br/><span style="color:var(--accent2);font-size:13px">✨ 内置 14 个热门行业 + AI 动态生成任意新行业</span>',
    hotkeys: ['半导体','AI算力','算力租赁','AI应用','新能源汽车','液冷','通讯设备','IT服务','元件','机器人','光伏'],
    resultId: 'result',
    loadingUpdater: 'updateIndustryLoading',
  },
  sector: {
    logoIcon: '🐂',
    logoText: '板块龙头',
    logoSub: 'Sector Leader Analyzer',
    placeholder: '输入板块名称，如：半导体、AI算力、低空经济、机器人、华为概念...',
    btnText: '查询 →',
    loadingText: '正在查询板块龙头数据...',
    welcomeIcon: '📊',
    welcomeTitle: '板块龙头识别',
    welcomeDesc: '输入任意 A 股板块名称，智能识别该板块的中军（趋势龙头）与前锋（情绪龙头），生成可视化海报<br/><span style="color:var(--accent2);font-size:13px">✨ AI 实时分析 + 中军/前锋双维度解读</span>',
    hotkeys: ['半导体','AI算力','低空经济','机器人','华为概念','固态电池','商业航天','消费电子','液冷服务器','CPO','量子科技','合成生物'],
    resultId: 'sector-result',
    loadingUpdater: 'updateSectorLoading',
  },
};

// ==================== 全局状态 ====================
let currentMode = 'industry'; // 当前模式：'industry' | 'sector'
let currentIndustry = null;
let currentSector = null;
let mindChartInstance = null;

// 上次 AI 查询状态（用于重试）
let lastAIQuery = '';
let lastAIMode = 'industry';
