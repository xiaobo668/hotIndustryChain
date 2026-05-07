/**
 * 腾讯云云函数 (SCF) - 产业链 AI 生成 API
 *
 * 部署方式：
 * 1. 腾讯云控制台 → 云函数 → 新建 → 自定义创建
 * 2. 运行环境：Node.js 18.15 / 20.15
 * 3. 上传方式：本地上传 ZIP 包（将此目录打包为 zip）
 * 4. 入口文件：index.js
 * 5. 执行方法：index.main_handler
 * 6. 环境变量配置：
 *    - DEEPSEEK_API_KEY: 你的 DeepSeek API Key（从 https://platform.deepseek.com/ 获取）
 *    - DEEPSEEK_MODEL: deepseek-chat（默认）或 deepseek-reasoner
 * 7. 触发器配置：
 *    - API 网关触发器 → 启用集成响应 → 路径 /api/industry
 *
 * 本地调试：
 *   DEEPSEEK_API_KEY=sk-xxx node index.js
 */

const https = require('https');

// ==================== 配置 ====================
const CONFIG = {
  // DeepSeek API 配置
  deepseek: {
    host: 'api.deepseek.com',
    path: '/v1/chat/completions',
    method: 'POST',
    model: process.env.DEEPSEEK_MODEL || 'deepseek-chat',
    apiKey: process.env.DEEPSEEK_API_KEY || '',
    maxTokens: 4096,
    temperature: 0.7,
  },
  // 缓存配置（秒）
  cacheTTL: parseInt(process.env.CACHE_TTL, 10) || 3600 * 24, // 默认缓存 24 小时
};

// 内存缓存（云函数单实例内有效，多实例时可用 Redis 替代）
const cache = new Map();

// ==================== AI Prompt 模板 ====================
const SYSTEM_PROMPT = `你是一位资深的产业分析师和投资研究专家。你的任务是根据用户输入的行业名称，生成该行业的完整产业链数据。

## 输出格式要求

你必须严格输出一个合法的 JSON 对象，格式如下（不要有任何其他文字、markdown 标记或解释）：

\`\`\`json
{
  "name": "行业名称",
  "color": "#十六进制颜色",
  "gradient": ["#颜色1", "#颜色2"],
  "description": "一段话描述该产业链的概况、重要性和发展趋势（50-100字）",
  "upstream": [
    {
      "name": "上游细分赛道名称",
      "companies": [
        { "code": "股票代码(可选)", "name": "公司名", "highlight": "该公司在该赛道的核心亮点和竞争优势（20-40字）" }
      ]
    }
  ],
  "midstream": [
    {
      "name": "中游细分赛道名称",
      "companies": [
        { "code": "股票代码(可选)", "name": "公司名", "highlight": "核心亮点" }
      ]
    }
  ],
  "downstream": [
    {
      "name": "下游细分赛道名称",
      "companies": [
        { "code": "股票代码(可选)", "name": "公司名", "highlight": "核心亮点" }
      ]
    }
  ]
}
\`\`\`

## 内容质量要求

1. **上中下游各至少 2 个细分赛道**，每个赛道至少 2-4 家龙头企业
2. **公司必须是真实的 A 股上市公司**，使用正确的股票代码（6 位数字）
3. **highlight 要具体**，包含市占率、技术优势、客户关系等实质性信息
4. **color 和 gradient** 选择与行业气质匹配的颜色：
   - 科技/AI 类：紫色系 #7c3aed、蓝色系 #2563eb
   - 新能源/绿色：绿色系 #059669、#10b981
   - 制造/工业：橙色系 #d97706、#ea580c
   - 医药/生物：青色系 #0891b2、#0f766e
   - 消费/服务：红色系 #dc2626、#f59e0b
5. **description** 要专业、精炼，体现对该行业的深度理解

## 注意事项
- 只输出 JSON，不要输出 \`\`\`json 标记或其他任何文字
- 如果用户查询的不是真实行业，返回 null
- 股票代码格式为 6 位数字字符串`;

function buildUserPrompt(industryName) {
  return `请分析「${industryName}」这个行业的完整产业链结构，包括上中下游各环节的细分赛道和龙头企业。`;
}

// ==================== DeepSeek API 调用 ====================
function callDeepSeekAPI(prompt) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      model: CONFIG.deepseek.model,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: prompt },
      ],
      max_tokens: CONFIG.deepseek.maxTokens,
      temperature: CONFIG.deepseek.temperature,
      response_format: { type: 'json_object' },
    });

    const options = {
      hostname: CONFIG.deepseek.host,
      port: 443,
      path: CONFIG.deepseek.path,
      method: CONFIG.deepseek.method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${CONFIG.deepseek.apiKey}`,
        'Content-Length': Buffer.byteLength(body),
      },
      timeout: 30000, // 30 秒超时
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.error) {
            reject(new Error(json.error.message || 'DeepSeek API error'));
            return;
          }
          if (json.choices && json.choices[0] && json.choices[0].message) {
            const content = json.choices[0].message.content.trim();
            // 清理可能的 markdown 代码块标记
            let cleaned = content.replace(/^```json\s*\n?/, '').replace(/\n?```\s*$/, '');
            resolve(cleaned);
          } else {
            reject(new Error('Invalid response from DeepSeek'));
          }
        } catch (e) {
          reject(new Error(`Parse response failed: ${e.message}`));
        }
      });
    });

    req.on('error', (e) => {
      reject(new Error(`Request failed: ${e.message}`));
    });

    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    req.write(body);
    req.end();
  });
}

// ==================== 缓存 ====================
function getCache(key) {
  const item = cache.get(key);
  if (!item) return null;
  if (Date.now() - item.ts > CONFIG.cacheTTL * 1000) {
    cache.delete(key);
    return null;
  }
  return item.data;
}

function setCache(key, data) {
  cache.set(key, { data, ts: Date.now() });
}

// ==================== 主处理逻辑 ====================
async function generateIndustry(industryName) {
  // 1. 查缓存
  const cached = getCache(industryName);
  if (cached) {
    console.log(`[CACHE HIT] ${industryName}`);
    return cached;
  }

  console.log(`[AI GENERATE] ${industryName}`);

  // 2. 调用 DeepSeek
  const prompt = buildUserPrompt(industryName);
  const rawResponse = await callDeepSeekAPI(prompt);

  // 3. 解析并校验 JSON
  let parsed;
  try {
    parsed = JSON.parse(rawResponse);
  } catch (e) {
    throw new Error(`AI 返回的 JSON 格式无效: ${rawResponse.substring(0, 200)}`);
  }

  // 4. 基本校验
  validateIndustryData(parsed);

  // 5. 写入缓存
  setCache(industryName, parsed);

  return parsed;
}

function validateIndustryData(data) {
  if (!data || typeof data !== 'object') {
    throw new Error('返回数据不是有效对象');
  }
  if (!data.name || typeof data.name !== 'string') {
    throw new Error('缺少 name 字段');
  }
  if (!Array.isArray(data.upstream)) {
    throw new Error('缺少 upstream 数组');
  }
  if (!Array.isArray(data.midstream)) {
    throw new Error('缺少 midstream 数组');
  }
  if (!Array.isArray(data.downstream)) {
    throw new Error('缺少 downstream 数组');
  }

  // 校验每个 segment 的 companies
  for (const tier of ['upstream', 'midstream', 'downstream']) {
    for (const seg of data[tier]) {
      if (!seg.name || !Array.isArray(seg.companies)) {
        throw new Error(`${tier} 中 segment 格式错误`);
      }
      for (const comp of seg.companies) {
        if (!comp.name || !comp.highlight) {
          throw new Error(`${tier}/${seg.name} 中公司数据不完整`);
        }
      }
    }
  }
}

// ==================== SCF 入口（腾讯云云函数） ====================
exports.main_handler = async (event, context) => {
  // SCF API 网关触发器传入的是经过 base64 编码的 body
  let body;
  try {
    if (typeof event.body === 'string') {
      body = JSON.parse(event.body);
    } else if (event.body) {
      body = JSON.parse(Buffer.from(event.body, 'base64').toString());
    } else {
      body = event; // 本地测试直接传对象
    }
  } catch (e) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ error: '请求体 JSON 解析失败', code: 'INVALID_REQUEST' }),
    };
  }

  const industryName = (body.industry || body.query || '').trim();

  if (!industryName) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ error: '缺少 industry 参数', code: 'MISSING_PARAM' }),
    };
  }

  // 长度限制
  if (industryName.length > 50) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ error: '行业名称过长', code: 'PARAM_TOO_LONG' }),
    };
  }

  try {
    const result = await generateIndustry(industryName);

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        success: true,
        data: result,
        source: 'ai',
        cached: !!getCache(industryName),
      }),
    };
  } catch (error) {
    console.error(`[ERROR] generateIndustry failed:`, error);

    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        success: false,
        error: error.message,
        code: 'AI_GENERATION_FAILED',
      }),
    };
  }
};

// ==================== 本地开发服务器（用于本地测试） ====================
function startLocalServer(port = 3100) {
  const http = require('http');

  if (!CONFIG.deepseek.apiKey) {
    console.error('❌ 请设置 DEEPSEEK_API_KEY 环境变量');
    console.error('   示例: DEEPSEEK_API_KEY=sk-xxx node index.js');
    process.exit(1);
  }

  const server = http.createServer(async (req, res) => {
    // CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
      res.writeHead(204);
      res.end();
      return;
    }

    // 只处理 POST /api/industry
    if (req.method === 'POST' && (req.url === '/api/industry' || req.url === '/')) {
      let body = '';
      req.on('data', chunk => { body += chunk; });
      req.on('end', async () => {
        try {
          const event = { body };
          const result = await exports.main_handler(event, {});
          res.writeHead(result.statusCode, result.headers);
          res.end(result.body);
        } catch (e) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: e.message }));
        }
      });
    } else if (req.method === 'GET' && req.url === '/health') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ status: 'ok', time: new Date().toISOString() }));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Not Found' }));
    }
  });

  server.listen(port, () => {
    console.log('');
    console.log('🚀 产业链 AI 生成服务已启动');
    console.log(`   本地地址: http://localhost:${port}/api/industry`);
    console.log(`   健康检查: http://localhost:${port}/health`);
    console.log('');
    console.log('   测试命令:');
    console.log(`   curl -X POST http://localhost:${port}/api/industry \\`);
    console.log('     -H "Content-Type: application/json" \\');
    console.log('     -d \'{"industry":"低空经济"}\'');
    console.log('');
  });
}

// 直接运行时启动本地服务器
if (require.main === module) {
  const port = parseInt(process.env.PORT, 10) || 3100;
  startLocalServer(port);
}
