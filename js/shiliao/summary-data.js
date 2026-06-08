/**
 * 食疗模块 — 汇总清单（带古籍出处）
 */
const SHILIAO_SUMMARY_DATA = {
  增强免疫力: {
    name: '增强免疫力',
    icon: '🛡️',
    listTitle: '增加免疫力的10种食物',
    color: '#10b981',
    alias: ['免疫力', '增强免疫', '提高抵抗力', '免疫食疗'],
    summary: '益气固表、扶正补虚，配合规律作息与适度运动，有助于增强卫外之气。',
    principle: '以健脾益气、扶正固表为主，宜温热易消化，忌过食生冷油腻。',
    items: [
      {
        rank: 1,
        name: '香菇',
        effect: '扶正补虚、益气健脾',
        book: '《本草纲目》',
        quote: '香菇：扶正补虚，健脾开胃，化痰理气。',
      },
      {
        rank: 2,
        name: '山药',
        effect: '补脾养胃、益气力',
        book: '《神农本草经》',
        quote: '薯蓣，味甘温，补中益气力，长肌肉，除寒热邪气。',
      },
      {
        rank: 3,
        name: '红枣',
        effect: '补中益气、养血安神',
        book: '《神农本草经》',
        quote: '大枣，味甘平，安中养脾，助十二经，平胃气。',
      },
      {
        rank: 4,
        name: '生姜',
        effect: '发汗解表、温中止呕',
        book: '《本草纲目》',
        quote: '生姜：发散，温中，解毒，除痰下气。',
      },
      {
        rank: 5,
        name: '大蒜',
        effect: '解毒杀虫、健胃消食',
        book: '《本草纲目》',
        quote: '大蒜：解毒杀虫，消肿止痛，健胃消食。',
      },
      {
        rank: 6,
        name: '蜂蜜',
        effect: '补中润燥、解毒',
        book: '《神农本草经》',
        quote: '蜂蜜，味甘平，安五脏，平胃气，止痛，解毒。',
      },
      {
        rank: 7,
        name: '枸杞',
        effect: '滋补肝肾、益精明目',
        book: '《本草纲目》',
        quote: '枸杞：滋肾，润肺，养肝，明目，益气。',
      },
      {
        rank: 8,
        name: '鸡肉',
        effect: '温中益气、补精填髓',
        book: '《饮膳正要》',
        quote: '鸡肉，补中益气，治消渴，补虚损，安五脏。',
      },
      {
        rank: 9,
        name: '薏米',
        effect: '健脾利湿、除痹止泻',
        book: '《神农本草经》',
        quote: '薏苡仁，味甘平，主筋急拘挛，利肠胃，消水肿。',
      },
      {
        rank: 10,
        name: '黄芪',
        effect: '益气固表、利水消肿',
        book: '《本草纲目》',
        quote: '黄芪：补气升阳，固表止汗，利水消肿，托毒生肌。',
      },
    ],
    caution: '急性感染发热期忌大补；过敏者慎香菇海鲜；免疫疾病请遵医嘱，食疗仅辅助。',
    voiceTitle: '增强免疫力的10种食物',
    voiceSummary:
      '香菇、山药、红枣、生姜、大蒜、蜂蜜、枸杞、鸡肉、薏米、黄芪，典籍多载其益气扶正。常配黄芪炖鸡、香菇鸡汤、红枣山药粥，规律作息才是关键。',
    voiceover:
      '想增强抵抗力，厨房就有答案。本草纲目赞香菇扶正补虚；神农本草经说山药红枣补中益气；生姜大蒜温中解毒；枸杞滋补肝肾；鸡肉薏米健脾益气；黄芪固表常配炖鸡。食疗只能辅助，发烧感染期别大补，过敏体质要注意。',
  },

  延年益寿: {
    name: '延年益寿',
    icon: '🌿',
    listTitle: '延年益寿常吃的12种食物',
    color: '#15803d',
    alias: ['长寿', '延年', '养生常吃', '长寿食物'],
    summary: '药食同源、平和调养，历代食疗典籍多赞其补虚益气、耐老轻身。',
    principle: '平补不急进，五谷为养、五果为助，少肥甘厚味，持之以恒。',
    items: [
      { rank: 1, name: '山药', effect: '补虚损，益颜色，长肌肉', book: '《本草纲目》', quote: '山药：补虚损，益颜色，长肌肉，强阴。' },
      { rank: 2, name: '红枣', effect: '安中养脾，益气力', book: '《神农本草经》', quote: '大枣，安中养脾，助十二经，平胃气。' },
      { rank: 3, name: '枸杞', effect: '强阴，耐老', book: '《食疗本草》', quote: '枸杞，寒，益人，强阴，耐老。' },
      { rank: 4, name: '黑芝麻', effect: '补肝肾，润五脏', book: '《本草纲目》', quote: '黑芝麻：补肝肾，润五脏，益精血，润肠燥。' },
      { rank: 5, name: '核桃', effect: '益气力，润肌肤', book: '《食疗本草》', quote: '胡桃，温。补腰脚，益气力，润肌肤。' },
      { rank: 6, name: '薏米', effect: '益气力，轻身', book: '《神农本草经》', quote: '薏苡仁，主筋急拘挛，益气力，长肌肉。' },
      { rank: 7, name: '莲子', effect: '补中养神，久服轻身', book: '《神农本草经》', quote: '莲子，主补中养神，益气力，久服轻身耐老。' },
      { rank: 8, name: '银耳', effect: '润肺生津，滋阴养胃', book: '《本草再新》', quote: '银耳，味甘淡，性平，滋阴润肺，养胃生津。' },
      { rank: 9, name: '蜂蜜', effect: '安五脏，除百病', book: '《神农本草经》', quote: '蜂蜜，安五脏，平胃气，除百病。' },
      { rank: 10, name: '大米', effect: '补中益气，止泄痢', book: '《饮膳正要》', quote: '粳米，补中益气，健脾，止泄痢。' },
      { rank: 11, name: '红豆', effect: '利水消肿，健脾', book: '《本草纲目》', quote: '赤小豆：利水消肿，解毒排脓，健脾养胃。' },
      { rank: 12, name: '桂圆', effect: '补益心脾，养血安神', book: '《本草纲目》', quote: '龙眼：补益心脾，养血安神，治思虑伤脾。' },
    ],
    caution: '糖尿病、湿热体质者控枣桂圆蜂蜜；延年靠长期习惯，非短期猛补。',
    voiceTitle: '延年益寿常吃的12种食物',
    voiceSummary:
      '山药、红枣、枸杞、黑芝麻、核桃、薏米、莲子、银耳、蜂蜜、大米、红豆、桂圆，多载于本草与食疗典籍，平补养胃，宜长期坚持。',
    voiceover:
      '延年益寿靠一日三餐的平补。本草纲目说山药补虚益颜色；枸杞强阴耐老；黑芝麻核桃补肝肾；莲子红枣益气安神；银耳蜂蜜润肺养胃；薏米红豆健脾利湿。别指望吃一次就长寿，坚持少油腻才是关键。',
  },

  四十养生: {
    name: '四十养生',
    icon: '🧓',
    listTitle: '40岁以上宜常吃的12种食物',
    color: '#0891b2',
    alias: ['40岁', '中老年', '四十加', '中年养生', '更年期前'],
    summary: '四十后气血渐耗、代谢放缓，宜健脾补肾、活血利湿，清淡少盐。',
    principle: '健脾益肾、养血降脂，控制油盐糖，定期体检，食疗配合运动。',
    items: [
      { rank: 1, name: '芹菜', effect: '平肝清热，辅助降压', book: '《本草纲目》', quote: '芹菜：平肝清热，祛风利湿，凉血止血。' },
      { rank: 2, name: '海带', effect: '软坚散结，消痰利水', book: '《饮膳正要》', quote: '海带，消痰，利水，软坚，去热。' },
      { rank: 3, name: '豆腐', effect: '益气和中，生津润燥', book: '《饮膳正要》', quote: '豆腐，益气，和中，生津，润燥。' },
      { rank: 4, name: '鲫鱼', effect: '健脾利湿，和中补虚', book: '《本草纲目》', quote: '鲫鱼：健脾利湿，和中补虚，通乳。' },
      { rank: 5, name: '山药', effect: '补脾益肾，止泄', book: '《本草纲目》', quote: '山药：补虚损，补肾涩精，止泄。' },
      { rank: 6, name: '枸杞', effect: '滋补肝肾，益精明目', book: '《本草经集注》', quote: '枸杞，微寒，补内伤，益精气，坚筋骨。' },
      { rank: 7, name: '红枣', effect: '补中益气，养血', book: '《本草纲目》', quote: '枣：补中益气，除烦热，润心肺。' },
      { rank: 8, name: '黑芝麻', effect: '补肝肾，润肠燥', book: '《神农本草经》', quote: '胡麻，主伤中虚羸，补五内，益气力，长肌肉。' },
      { rank: 9, name: '核桃', effect: '补肾温肺，润肠通便', book: '《本草纲目》', quote: '核桃：补肾固精，温肺定喘，润肠通便。' },
      { rank: 10, name: '小米', effect: '健脾和胃，益肾', book: '《本草纲目》', quote: '小米：治反胃热痢，开肠胃，益肾气。' },
      { rank: 11, name: '薏米', effect: '健脾渗湿，除痹', book: '《食疗本草》', quote: '薏苡仁，利小肠，去湿，消水肿，健脾。' },
      { rank: 12, name: '银耳', effect: '滋阴润肺，养胃生津', book: '《本草纲目》', quote: '银耳：润肺生津，滋阴养胃，化痰止咳。' },
    ],
    caution: '三高、痛风、肾病等请个体化饮食；甲亢限海带；四十岁后更需体检而非只靠食疗。',
    voiceTitle: '40岁以上宜常吃的12种食物',
    voiceSummary:
      '芹菜、海带、豆腐、鲫鱼、山药、枸杞、红枣、黑芝麻、核桃、小米、薏米、银耳，兼顾降压利湿、补脾益肾与滋阴润燥，清淡少盐为宜。',
    voiceover:
      '四十岁后代谢变慢，饮食要更讲究。芹菜海带助降压利湿；豆腐鲫鱼优质蛋白；山药枸杞红枣补脾益肾；黑芝麻核桃养精血；小米薏米健脾；银耳滋阴润肺。少盐少油定期体检，比吃什么更重要。',
  },

  维C水果: {
    name: '维C水果',
    icon: '🍊',
    listTitle: '水果中维C含量排名前10',
    color: '#f97316',
    alias: ['维C', '维生素C', 'VC水果', '维c', '水果维C', '高维C水果'],
    summary: '按每100克可食部维生素C含量由高到低排序，数据参考《中国食物成分表》，鲜果因品种产地会有浮动。',
    principle: '维C易受热氧化破坏，宜鲜食或短时低温烹调；胃酸过多、空腹不宜猛吃酸果，糖尿病注意含糖。',
    items: [
      {
        rank: 1,
        name: '刺梨',
        effect: '维C≈2585mg/100g · 健胃消食',
        book: '《黔下药志》',
        quote: '刺梨：味酸涩，性平，健胃消食，滋补强身。',
      },
      {
        rank: 2,
        name: '冬枣',
        effect: '维C≈243mg/100g · 补中益气',
        book: '《本草纲目》',
        quote: '枣：补中益气，除烦热，润心肺，杀百药毒。',
      },
      {
        rank: 3,
        name: '番石榴',
        effect: '维C≈68mg/100g · 健脾消积',
        book: '《岭南采药录》',
        quote: '番石榴：甘酸平，健脾消积，涩肠止泻。',
      },
      {
        rank: 4,
        name: '猕猴桃',
        effect: '维C≈62mg/100g · 生津润燥',
        book: '《本草纲目》',
        quote: '猕猴桃：味甘酸，性寒，生津润燥，解热除烦。',
      },
      {
        rank: 5,
        name: '山楂',
        effect: '维C≈53mg/100g · 消食化积',
        book: '《本草纲目》',
        quote: '山楂：消食积，散瘀血，驱绦虫，止泄痢。',
      },
      {
        rank: 6,
        name: '草莓',
        effect: '维C≈47mg/100g · 润肺生津',
        book: '《食物本草》',
        quote: '草莓：味甘酸，性凉，润肺生津，健脾和胃。',
      },
      {
        rank: 7,
        name: '柚子',
        effect: '维C≈38mg/100g · 化痰止咳',
        book: '《本草纲目》',
        quote: '柚：消食，解酒毒，去肠胃中恶气，化痰止咳。',
      },
      {
        rank: 8,
        name: '橙子',
        effect: '维C≈33mg/100g · 理气化痰',
        book: '《本草纲目》',
        quote: '橙子：生津止渴，开胃下气，理气化痰。',
      },
      {
        rank: 9,
        name: '芒果',
        effect: '维C≈23mg/100g · 益胃止呕',
        book: '《名医别录》',
        quote: '芒果：味甘酸，益胃，止呕，止渴。',
      },
      {
        rank: 10,
        name: '柠檬',
        effect: '维C≈22mg/100g · 生津止渴',
        book: '《本草经集注》',
        quote: '柠檬：味酸，微寒，生津止渴，和胃降逆。',
      },
    ],
    caution: '维C含量因品种、成熟度、储存而波动；胃溃疡、反流性食管炎者少食酸果；服药期间请咨询医生是否忌柚类。',
    voiceTitle: '水果维C含量排名前10',
    voiceSummary:
      '刺梨、冬枣、番石榴、猕猴桃、山楂、草莓、柚子、橙子、芒果、柠檬，按每100克维C由高到低排列，鲜食保留更多维C。',
    voiceover:
      '补维C别只会想到柠檬。排名前十：刺梨冬枣含量最高；番石榴猕猴桃山楂草莓紧随其后；柚子橙子日常好买；芒果柠檬适量吃。维C怕热怕氧化，鲜果优于久煮，胃不好别空腹猛吃酸果。',
  },

  高蛋白食材: {
    name: '高蛋白食材',
    icon: '🥩',
    listTitle: '蛋白质排名前十的食材',
    color: '#dc2626',
    alias: ['蛋白质', '高蛋白', '优质蛋白', '补蛋白', '蛋白排行'],
    summary: '按每100克可食部蛋白质含量由高到低排序，数据参考《中国食物成分表》，干豆与干腐竹为干制品测定值。',
    principle: '动植物蛋白搭配更佳；痛风、肾病等需遵医嘱控蛋白种类与总量；肉类宜去皮去肥、蒸煮优于油炸。',
    items: [
      {
        rank: 1,
        name: '腐竹',
        effect: '蛋白≈45g/100g · 益气和中',
        book: '《本草纲目》',
        quote: '豆腐：益气，和中，生津，润燥，清热解毒。',
      },
      {
        rank: 2,
        name: '黑豆',
        effect: '蛋白≈36g/100g · 补肾益阴',
        book: '《本草纲目》',
        quote: '黑豆：补肾益阴，健脾利湿，除热解毒。',
      },
      {
        rank: 3,
        name: '黄豆',
        effect: '蛋白≈35g/100g · 健脾宽中',
        book: '《神农本草经》',
        quote: '大豆，味甘平，宽中，下气，利大肠，消水胀肿毒。',
      },
      {
        rank: 4,
        name: '鸡肉',
        effect: '蛋白≈23g/100g · 温中益气',
        book: '《饮膳正要》',
        quote: '鸡肉，补中益气，治消渴，补虚损，安五脏。',
      },
      {
        rank: 5,
        name: '牛肉',
        effect: '蛋白≈20g/100g · 补中益气',
        book: '《饮膳正要》',
        quote: '牛肉，补中益气，滋养脾胃，强健筋骨。',
      },
      {
        rank: 6,
        name: '虾仁',
        effect: '蛋白≈19g/100g · 补肾壮阳',
        book: '《本草纲目》',
        quote: '虾：性温，味甘，补肾壮阳，通乳，托毒。',
      },
      {
        rank: 7,
        name: '羊肉',
        effect: '蛋白≈19g/100g · 温中补虚',
        book: '《饮膳正要》',
        quote: '羊肉，味甘，大热，补虚劳，益肾气，开胃肥健。',
      },
      {
        rank: 8,
        name: '鲫鱼',
        effect: '蛋白≈17g/100g · 健脾利湿',
        book: '《本草纲目》',
        quote: '鲫鱼：健脾利湿，和中补虚，通乳。',
      },
      {
        rank: 9,
        name: '鸭肉',
        effect: '蛋白≈16g/100g · 滋阴养胃',
        book: '《饮膳正要》',
        quote: '鸭肉，补虚劳，清热，解毒，利水，消肿。',
      },
      {
        rank: 10,
        name: '鸡蛋',
        effect: '蛋白≈13g/100g · 滋阴润燥',
        book: '《本草纲目》',
        quote: '鸡蛋：滋阴润燥，养血安胎，除烦热，开郁闷。',
      },
    ],
    caution: '干腐竹、干豆为干重测定值，泡发后按实际食用量计算；高尿酸、肾功能不全者慎海鲜内脏；生鸡蛋勿生食。',
    voiceTitle: '蛋白质排名前十的食材',
    voiceSummary:
      '腐竹、黑豆、黄豆、鸡肉、牛肉、虾仁、羊肉、鲫鱼、鸭肉、鸡蛋，按每100克蛋白质含量由高到低排列，豆谷与禽鱼蛋搭配更均衡。',
    voiceover:
      '补蛋白别只会吃肉。排名前十：腐竹黑豆黄豆植物蛋白最高；鸡肉牛肉虾仁羊肉紧随其后；鲫鱼鸭肉鸡蛋优质易买。豆鱼蛋搭配更好吸收，痛风肾病要遵医嘱控量，肉类蒸煮少油炸。',
  },
};

const SHILIAO_SUMMARY_KEYWORD_MAP = {
  免疫力: '增强免疫力',
  长寿食物: '延年益寿',
  中年: '四十养生',
  水果: '维C水果',
  蛋白: '高蛋白食材',
};

for (const [key, item] of Object.entries(SHILIAO_SUMMARY_DATA)) {
  (item.alias || []).forEach((a) => {
    if (!SHILIAO_SUMMARY_KEYWORD_MAP[a]) SHILIAO_SUMMARY_KEYWORD_MAP[a] = key;
  });
}

function resolveShiliaoSummaryKey(query) {
  const q = (query || '').trim();
  if (!q) return null;
  if (SHILIAO_SUMMARY_DATA[q]) return q;
  if (SHILIAO_SUMMARY_KEYWORD_MAP[q]) return SHILIAO_SUMMARY_KEYWORD_MAP[q];
  for (const [kw, key] of Object.entries(SHILIAO_SUMMARY_KEYWORD_MAP)) {
    if (q.includes(kw) || kw.includes(q)) return key;
  }
  for (const key of Object.keys(SHILIAO_SUMMARY_DATA)) {
    if (key.includes(q) || q.includes(key)) return key;
    const item = SHILIAO_SUMMARY_DATA[key];
    if ((item.alias || []).some((a) => a.includes(q) || q.includes(a))) return key;
  }
  return null;
}

function getShiliaoSummaryList() {
  return Object.values(SHILIAO_SUMMARY_DATA);
}
