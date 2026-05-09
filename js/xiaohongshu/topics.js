/**
 * 小红书选题库 (xiaohongshu/topics.js)
 * - 定义各领域的 FAQ 选题模板
 * - 提供选题列表、默认模板、prompt 生成等功能
 *
 * 选题分类：
 *   pet-cat: 养猫（10个选题）
 *   pet-dog: 养狗（10个选题）
 *   digital: 手机数码（10个选题）
 *   cooking: 家庭烹饪（10个选题）
 *   fitness: 健身减脂（10个选题）
 *   baby: 育儿母婴（10个选题）
 *   finance: 个人理财（10个选题）
 */

// ==================== 选题定义 ====================
const XHS_TOPICS = {
  'pet-cat': {
    name: '🐱 养猫',
    icon: '🐱',
    color: '#FF6B6B',
    gradient: ['#FF6B6B', '#FF8E8E'],
    bgColor: '#FFF5F5',
    description: '养猫新手必看！从接猫到日常护理的全方位指南',
    topics: [
      { id: 'cat-newbie-20', title: '养猫新手最常问的20个问题', subtitle: '从接猫到第一次看病，一次讲清楚' },
      { id: 'cat-behavior-10', title: '猫咪为什么不理你？', subtitle: '10个行为背后的真实原因' },
      { id: 'cat-diarrhea-15', title: '猫咪拉稀怎么办？', subtitle: '15个原因+家庭护理方案' },
      { id: 'cat-vaccine-8', title: '宠物疫苗怎么打？', subtitle: '8个关于疫苗的常见疑问' },
      { id: 'cat-neuter-12', title: '猫咪绝育前后', subtitle: '主人最担心的12个问题一次说清' },
      { id: 'cat-food-15', title: '猫粮怎么选？', subtitle: '15个选购常见问题（附成分表解读）' },
      { id: 'cat-shedding-10', title: '宠物掉毛太严重？', subtitle: '10个有效缓解方法实测' },
      { id: 'cat-water-9', title: '猫咪不喝水怎么办？', subtitle: '9个亲测有效的骗水技巧' },
      { id: 'cat-second-18', title: '养第二只猫前必看', subtitle: '18个问题（如何让原住民接受）' },
      { id: 'cat-insurance-7', title: '宠物保险有必要买吗？', subtitle: '7个问题帮你做决定' },
    ],
    // 默认模板：便便健康自查表风格
    defaultPosterStyle: 'health-check',
  },

  'pet-dog': {
    name: '🐶 养狗',
    icon: '🐶',
    color: '#4ECDC4',
    gradient: ['#4ECDC4', '#7EDDD6'],
    bgColor: '#F0FFFF',
    description: '狗狗养护全攻略，从幼犬到老年的陪伴手册',
    topics: [
      { id: 'dog-newbie-20', title: '养狗新手最常问的20个问题', subtitle: '从选狗到训练，新手必备' },
      { id: 'dog-potty-12', title: '狗狗定点大小便训练', subtitle: '12步教会狗狗上厕所' },
      { id: 'dog-food-15', title: '狗粮怎么选？', subtitle: '15个选购要点+热门品牌对比' },
      { id: 'dog-training-10', title: '狗狗基础指令训练', subtitle: '坐下、握手、趴下…10个技巧' },
      { id: 'dog-bark-8', title: '狗狗为什么一直叫？', subtitle: '8种叫声含义+止吠方法' },
      { id: 'dog-walk-10', title: '遛狗的正确方式', subtitle: '10个你不知道的遛狗细节' },
      { id: 'dog-sick-15', title: '狗狗生病信号识别', subtitle: '15个需要立即就医的症状' },
      { id: 'dog-shedding-10', title: '狗狗掉毛季怎么办？', subtitle: '10个护理方法' },
      { id: 'dog-social-12', title: '狗狗社交训练', subtitle: '12个方法让狗狗不凶不怯' },
      { id: 'dog-old-10', title: '老年犬护理指南', subtitle: '10个关爱老年狗狗的方法' },
    ],
    defaultPosterStyle: 'health-check',
  },

  'digital': {
    name: '📱 数码',
    icon: '📱',
    color: '#6C63FF',
    gradient: ['#6C63FF', '#9D93FF'],
    bgColor: '#F5F3FF',
    description: '手机数码使用技巧，让你成为数码达人',
    topics: [
      { id: 'phone-battery-15', title: '手机电池不耐用了？', subtitle: '15个充电护电池的常见误区' },
      { id: 'iphone-20', title: 'iPhone用户最常问的20个问题', subtitle: '从设置到省电全攻略' },
      { id: 'android-lag-12', title: '安卓手机卡顿怎么办？', subtitle: '12个排查步骤+解决方案' },
      { id: 'photo-blur-10', title: '手机拍照模糊？', subtitle: '10个原因和对应的解决方法' },
      { id: 'wechat-space-8', title: '微信占用空间太大？', subtitle: '8种清理方法的实测效果对比' },
      { id: 'phone-lost-10', title: '手机丢了怎么办？', subtitle: '10步紧急操作指南（必收藏）' },
      { id: 'charger-15', title: '充电头/线怎么选？', subtitle: '15个关于快充的常见疑问' },
      { id: 'storage-12', title: '手机内存不够用？', subtitle: '12个释放空间的实用技巧' },
      { id: 'secondhand-20', title: '二手手机怎么验机？', subtitle: '20个检查项（防翻车指南）' },
      { id: 'phone-hot-9', title: '手机发热严重？', subtitle: '9个原因+降温方法（夏季特别版）' },
    ],
    defaultPosterStyle: 'comparison',
  },

  'cooking': {
    name: '🍳 烹饪',
    icon: '🍳',
    color: '#F59E0B',
    gradient: ['#F59E0B', '#FBBF24'],
    bgColor: '#FFFBEB',
    description: '厨房里的那些事儿，让做饭变得简单有趣',
    topics: [
      { id: 'rice-15', title: '米饭怎么煮才好吃？', subtitle: '15个煮饭常见问题（从洗米到焖饭）' },
      { id: 'meat-tender-12', title: '炒肉总是老柴？', subtitle: '12个让肉嫩滑的秘诀' },
      { id: 'veggie-blanch-10', title: '蔬菜焯水', subtitle: '10种常见蔬菜的正确焯水时间+技巧' },
      { id: 'fish-pan-15', title: '煎鱼不破皮的15个技巧', subtitle: '附失败原因排查' },
      { id: 'oven-20', title: '烤箱新手最常问的20个问题', subtitle: '预热、温度、时间全搞定' },
      { id: 'cake-fail-12', title: '做蛋糕总是失败？', subtitle: '12个翻车原因和解决方法' },
      { id: 'fridge-10', title: '冰箱收纳', subtitle: '10个让食材保鲜更久的方法' },
      { id: 'knife-8', title: '切菜刀工', subtitle: '新手最常问的8个问题（附刀型选择）' },
      { id: 'fry-15', title: '油炸食物怎么做才脆？', subtitle: '15个控温+挂糊技巧' },
      { id: 'leftover-12', title: '剩菜怎么保存和加热？', subtitle: '12个食品安全常见问题' },
    ],
    defaultPosterStyle: 'tips-grid',
  },

  'fitness': {
    name: '💪 健身',
    icon: '💪',
    color: '#10B981',
    gradient: ['#10B981', '#34D399'],
    bgColor: '#ECFDF5',
    description: '科学健身不踩坑，减脂增肌全攻略',
    topics: [
      { id: 'diet-fatloss-20', title: '减肥到底怎么吃？', subtitle: '20个减脂期饮食常见问题' },
      { id: 'run-newbie-15', title: '跑步新手最常问的15个问题', subtitle: '膝盖、呼吸、装备全解答' },
      { id: 'squat-knee-12', title: '深蹲伤膝盖？', subtitle: '12个动作细节自查+纠正方法' },
      { id: 'plateau-10', title: '减肥平台期怎么突破？', subtitle: '10个亲测有效的方法' },
      { id: 'protein-15', title: '蛋白粉怎么选怎么喝？', subtitle: '15个常见疑问一次讲清' },
      { id: 'abs-12', title: '腹肌训练没效果？', subtitle: '12个核心发力的常见误区' },
      { id: 'soreness-10', title: '运动后肌肉酸痛怎么办？', subtitle: '10个恢复方法对比' },
      { id: 'progress-13', title: '健身多久才能看到效果？', subtitle: '13个关于进度的问题' },
      { id: 'morning-night-8', title: '早上运动还是晚上运动？', subtitle: '8个时间选择的考量' },
      { id: 'girl-gym-15', title: '女生健身最常问的15个问题', subtitle: '会变壮？经期运动？' },
    ],
    defaultPosterStyle: 'tips-grid',
  },

  'baby': {
    name: '👶 育儿',
    icon: '👶',
    color: '#EC4899',
    gradient: ['#EC4899', '#F472B6'],
    bgColor: '#FDF2F8',
    description: '新手爸妈的育儿百科，0-3岁全覆盖',
    topics: [
      { id: 'newborn-25', title: '新生儿护理', subtitle: '新手爸妈最常问的25个问题' },
      { id: 'baby-cry-15', title: '宝宝为什么哭？', subtitle: '15种哭声的含义+应对方法' },
      { id: 'baby-fever-20', title: '宝宝发烧怎么办？', subtitle: '20个家庭护理常见问题' },
      { id: 'baby-food-18', title: '辅食添加', subtitle: '从第一口到一岁，18个常见疑问' },
      { id: 'baby-sleep-15', title: '宝宝不睡觉？', subtitle: '15个睡眠问题的排查+解决方案' },
      { id: 'eczema-12', title: '湿疹/红屁屁', subtitle: '12个护理误区和正确做法' },
      { id: 'constipation-10', title: '宝宝便秘怎么办？', subtitle: '10个原因+家庭缓解方法' },
      { id: 'vaccine-18', title: '疫苗怎么打？', subtitle: '18个关于自费/免费疫苗的疑问' },
      { id: 'speech-12', title: '宝宝说话晚？', subtitle: '12个语言发育的常见问题' },
      { id: 'weaning-15', title: '断夜奶/戒奶瓶', subtitle: '15个过渡期常见问题解答' },
    ],
    defaultPosterStyle: 'health-check',
  },

  'finance': {
    name: '💰 理财',
    icon: '💰',
    color: '#0EA5E9',
    gradient: ['#0EA5E9', '#38BDF8'],
    bgColor: '#F0F9FF',
    description: '理财从小事做起，让钱为你工作',
    topics: [
      { id: 'credit-card-15', title: '信用卡新手最常问的15个问题', subtitle: '免息期、积分、年费全懂' },
      { id: 'fund-18', title: '公积金怎么用最划算？', subtitle: '18个提取和贷款常见问题' },
      { id: 'tax-20', title: '个人所得税专项附加扣除', subtitle: '20个填报常见疑问' },
      { id: 'fund-invest-12', title: '基金定投', subtitle: '新手最常问的12个问题' },
      { id: 'insurance-15', title: '保险怎么买不踩坑？', subtitle: '15个重疾险/医疗险常见问题' },
      { id: 'rent-deposit-10', title: '租房押金被扣怎么办？', subtitle: '10个维权步骤+话术' },
      { id: 'bonus-10', title: '年终奖怎么花？', subtitle: '10个分钱方案（存钱+花钱平衡）' },
      { id: 'xianyu-15', title: '闲鱼卖二手', subtitle: '15个定价/沟通/防骗常见问题' },
      { id: 'mortgage-12', title: '房贷提前还款', subtitle: '12个划算与否的判断问题' },
      { id: 'accounting-10', title: '记账坚持不下来？', subtitle: '10个轻松记账的实用技巧' },
    ],
    defaultPosterStyle: 'comparison',
  },
};

// ==================== 海报风格类型 ====================
const POSTER_STYLES = {
  // 健康自查表风格（如：猫咪便便健康自查）
  'health-check': {
    name: '📋 自查表',
    desc: '图标+状态判断表格，适合症状自查类内容',
  },
  // 新手vs老手对比风格（如：新手养猫 vs 5年养猫人）
  'comparison': {
    name: '⚖️ 对比表',
    desc: '左右两栏对比，适合经验对比类内容',
  },
  // 养护方法卡片网格（如：猫咪肠胃养护方法）
  'tips-grid': {
    name: '📝 方法卡',
    desc: '多卡片网格布局，适合步骤/方法类内容',
  },
  // 产品推荐清单（如：蓝氏奶盾猫粮介绍）
  'product-review': {
    name: '🛒 种草卡',
    desc: '产品详情展示，适合好物推荐类内容',
  },
  // FAQ问答长图（标准FAQ格式）
  'faq-list': {
    name: '❓ Q&A长图',
    desc: 'Q&A列表式排版，适合知识科普类内容',
  },
};

/**
 * 根据领域和选题ID获取完整的 AI Prompt
 */
function buildXHSPrompt(categoryId, topicId) {
  const category = XHS_TOPICS[categoryId];
  if (!category) return '';

  let topicTitle = '';
  for (const t of category.topics) {
    if (t.id === topicId) { topicTitle = t.title; break; }
  }
  if (!topicTitle) topicTitle = category.topics[0]?.title || categoryId;

  return `请以小红书博主的口吻，生成一篇关于「${topicTitle}」的高质量 FAQ 内容。

## 输出格式要求

严格输出 JSON 格式（不要有任何其他文字），格式如下：

\`\`\`json
{
  "title": "吸引人的标题（带emoji，适合小红书风格）",
  "subtitle": "副标题/导语（一句话说明覆盖范围）",
  "category": "${category.name}",
  "items": [
    {
      "q": "问题1（用户会怎么问）",
      "a": "答案（50-150字，简洁直接，给出可执行的操作或明确判断）",
      "tag": "标签（如：新手必看/常见误区/紧急/省钱等）"
    }
  ],
  "tips": ["补充提醒1", "补充提醒2"],
  "footer": "结尾互动语（引导评论收藏）",
  "hashtags": ["#标签1", "#标签2", "#标签3"]
}
\`\`\`

## 内容质量要求

1. **数量**：items 数组包含 15-25 个 Q&A 对
2. **每个问题**用 "Q：" 或 "？" 开头，答案直接给结论，不要绕弯子
3. **答案要具体**：给数据、给操作步骤、给判断标准，不要"视情况而定"
4. **口语化**：像朋友聊天一样自然，适当使用 emoji
5. **实用优先**：每个回答都要让读者觉得"学到了"
6. **时效性**：如果涉及价格、政策等，标注参考时间`;
}

/**
 * 获取所有领域列表（用于 UI 展示）
 */
function getXHSCategories() {
  return Object.entries(XHS_TOPICS).map(([key, val]) => ({
    id: key,
    name: val.name,
    icon: val.icon,
    color: val.color,
    topicCount: val.topics.length,
  }));
}

/**
 * 获取某领域的所有选题
 */
function getXHSTopics(categoryId) {
  return XHS_TOPICS[categoryId]?.topics || [];
}

/**
 * 获取领域配置
 */
function getXHSCategory(categoryId) {
  return XHS_TOPICS[categoryId] || null;
}
