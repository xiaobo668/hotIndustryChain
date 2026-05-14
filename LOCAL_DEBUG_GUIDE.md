# 🔧 本地调试指南

## 快速开始

### 1. 启动本地 HTTP 服务器

```bash
# 使用 Python 3
python3 -m http.server 8080

# 或使用 Node.js http-server
npx http-server -p 8080

# 或使用其他服务器
cd /Users/lirunbo/Desktop/play/hotIndustryChain
# 用你喜欢的任何 HTTP 服务器
```

### 2. 打开浏览器

访问以下地址之一：

- **主应用**：`http://localhost:8080/index.html`
- **测试页面**：`http://localhost:8080/test_local_debug.html`

### 3. 本地数据加载流程

当你在主应用中**点击热门标签**（如"低空经济"、"固态电池"）时，系统会：

1. ✅ **优先检查本地数据库** - 在 `data.js` 中查找预定义的产业链数据
2. 🔗 **然后检查 localStorage 缓存** - 如果本地数据库没有匹配
3. 🤖 **最后调用后端 AI API** - 如果缓存也没有

这意味着新添加的 6 个产业链会**立即显示**，无需等待 AI 生成：

### 4. 支持的新产业

已预设本地产业链数据：

- **低空经济** - eVTOL、飞行汽车、无人机相关产业链
- **固态电池** - 半固态、全固态电池相关企业
- **华为概念** - 鸿蒙、昇腾、华为汽车生态
- **AIDC（智算中心）** - AI 数据中心运营商和设备供应商
- **核聚变** - 聚变能源相关上中下游
- **数据要素** - 数据交易、数据安全、确权服务

## 调试功能

### 快速测试

访问 `test_local_debug.html` 可以：

1. ✓ 验证 `data.js` 是否正确加载
2. ✓ 检查所有新产业是否可检索
3. ✓ 快速测试 `searchIndustry()` 函数

### 浏览器控制台测试

在浏览器控制台中运行：

```javascript
// 查看所有产业
Object.keys(INDUSTRY_DATA)

// 搜索某个产业
searchIndustry('低空经济')

// 手动调用搜索
doSearch('固态电池')

// 查看当前数据
console.log(currentIndustry)
console.log(currentSector)
```

### 缓存清空

如果需要清空所有本地缓存，在浏览器控制台运行：

```javascript
// 清空所有缓存
clearAllCache()

// 或手动清空
localStorage.clear()
```

## 数据来源标识

在产业链分析结果的顶部右侧，你会看到 AI 模型来源标识：

- 🟢 **本地数据** - 绿色，表示从 `data.js` 预设数据加载
- 🟡 **本地缓存** - 黄色，表示从 localStorage 中读取
- 🔴 **Kimi** - 红色，表示从 Kimi AI 生成
- 🟣 **DeepSeek** - 紫色，表示从 DeepSeek 生成
- 🟠 **豆包** - 从豆包（Doubao）生成

## 常见问题

### Q: 为什么我点击热门标签没有显示任何内容？

**A:** 检查：
1. 浏览器控制台有无错误（F12 打开开发者工具）
2. `data.js` 是否正确加载（在控制台输入 `typeof INDUSTRY_DATA`，应返回 "object"）
3. 是否打开了正确的 URL（`http://localhost:8080/index.html`）

### Q: 本地数据和后端 AI 生成的数据有什么区别？

**A:** 
- **本地数据** - 预设的、经过验证的产业链和龙头企业数据
- **AI 生成** - 后端 AI 根据实时请求生成，可能更详细但需要 API 配置

### Q: 可以修改本地产业链数据吗？

**A:** 可以！编辑 `data.js` 文件中的 `INDUSTRY_DATA` 对象即可。记得刷新浏览器使改动生效。

### Q: 如何添加新的产业？

**A:** 在 `data.js` 中：

1. 在 `INDUSTRY_DATA` 对象中添加新产业定义：
```javascript
"你的产业名": {
  name: "你的产业名",
  color: "#颜色代码",
  gradient: ["#颜色1", "#颜色2"],
  description: "产业描述",
  upstream: [...],
  midstream: [...],
  downstream: [...]
}
```

2. 在 `KEYWORD_MAP` 中添加关键词映射：
```javascript
"关键词1": "你的产业名",
"关键词2": "你的产业名",
```

3. 刷新浏览器测试

## 文件结构

```
hotIndustryChain/
├── index.html                 # 主应用
├── test_local_debug.html      # 本地调试测试页面
├── data.js                    # 产业链数据库 + searchIndustry()
├── js/
│   ├── config.js              # 全局配置
│   ├── industry/
│   │   ├── search.js          # 搜索入口（已优化为本地优先）
│   │   ├── render.js          # 渲染产业链
│   │   └── ...
│   ├── sector/
│   │   ├── search.js          # 板块龙头搜索
│   │   └── ...
│   └── ...
└── server/scf/
    └── index.js               # 后端 AI API（可选）
```

## 技术细节

### 本地数据加载优化

在 `js/industry/search.js` 中，`doSearch()` 函数已优化为：

```javascript
// 优先级：本地数据 > 缓存 > API
if (localIndustry) {
  // 立即显示本地数据
  currentIndustry = localIndustry;
  renderResult(localIndustry, 'local');
  cacheIndustry(query, localIndustry);
  industryDone = true;
} else if (industryCached) {
  // 使用缓存
  ...
} else {
  // 调用后端 API
  ...
}
```

### 关键词匹配

`data.js` 中的 `searchIndustry()` 函数支持：

1. **精确匹配** - 直接查找产业名
2. **关键词匹配** - 查找 `KEYWORD_MAP` 中的映射

```javascript
searchIndustry('低空经济')       // ✓ 精确匹配
searchIndustry('eVTOL')         // ✓ 关键词匹配 → "低空经济"
searchIndustry('飞行汽车')      // ✓ 关键词匹配 → "低空经济"
```

## 本地调试建议

1. **使用浏览器开发者工具**（F12）
   - Network 标签：检查 API 调用
   - Console 标签：查看 JavaScript 错误
   - Application 标签：查看 localStorage 缓存

2. **定期清空缓存**
   - 在进行改动测试时运行 `clearAllCache()`
   - 避免老数据干扰

3. **测试不同场景**
   - 点击热门标签（应立即显示本地数据）
   - 手动搜索关键词（支持关键词匹配）
   - 清空缓存后重新搜索（验证加载流程）

---

有任何问题？在浏览器控制台输入 `searchIndustry('你的关键词')` 进行快速诊断！
