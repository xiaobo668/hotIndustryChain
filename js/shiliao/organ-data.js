/**
 * 食疗模块 — 器官食补（各器官最喜欢的食材）
 */
const SHILIAO_ORGAN_DATA = {
  心脏: {
    name: '心脏',
    icon: '❤️',
    category: '五脏',
    alias: ['心', '养心', '护心'],
    color: '#dc2626',
    summary: '心主血脉、主神明，喜清淡少盐、养血安神的食材。',
    principle: '养血安神、益气通络，少油少盐，忌过饱、浓茶咖啡。',
    ingredients: [
      { name: '红枣', role: '补中益气、养血安神' },
      { name: '桂圆', role: '补益心脾、养血安神' },
      { name: '莲子', role: '养心安神、健脾' },
      { name: '百合', role: '清心安神、润肺' },
      { name: '番茄', role: '生津健胃、辅助护心' },
    ],
    dishes: [
      { name: '红枣桂圆茶', ingredients: '红枣、桂圆', note: '养血安神，日常温饮' },
      { name: '莲子百合粥', ingredients: '莲子、百合、小米', note: '养心安神，晚间温服' },
      { name: '桂圆莲子羹', ingredients: '桂圆、莲子', note: '心脾双补，适量甜食' },
      { name: '番茄鸡蛋汤', ingredients: '番茄、鸡蛋', note: '清淡营养，少油烹饪' },
    ],
    caution: '胸痛、心悸持续请心内科就诊；高血压控盐；桂圆红枣含糖高者适量。',
    voiceTitle: '心脏最爱：红枣桂圆莲子养心',
    voiceSummary: '养心宜养血安神少盐。心脏偏爱红枣、桂圆、莲子、百合，可做红枣桂圆茶、莲子百合粥，忌过饱浓茶。',
    voiceover: '护心先养血安神。心脏偏爱红枣桂圆茶；睡前莲子百合粥；桂圆莲子羹补心脾。饮食少盐少油，胸痛心悸要看医生，别只靠食疗。',
  },

  肝脏: {
    name: '肝脏',
    icon: '🫀',
    category: '五脏',
    alias: ['肝', '养肝', '护肝'],
    color: '#84cc16',
    summary: '肝主疏泄、藏血，喜疏肝理气、清热明目的绿色食材。',
    principle: '疏肝理气、清热明目，少熬夜饮酒，忌肥甘辛辣。',
    ingredients: [
      { name: '枸杞', role: '滋补肝肾、益精明目' },
      { name: '菊花', role: '疏散风热、清肝明目' },
      { name: '菠菜', role: '养血润燥、疏肝' },
      { name: '胡萝卜', role: '健脾消食、明目' },
      { name: '绿豆', role: '清热解毒、解酒' },
    ],
    dishes: [
      { name: '枸杞菊花茶', ingredients: '枸杞、菊花', note: '清肝明目，办公族常备' },
      { name: '菠菜猪肝汤', ingredients: '菠菜、猪肝', note: '养血疏肝，适量食用' },
      { name: '绿豆汤', ingredients: '绿豆', note: '清热解毒，酒后适量' },
      { name: '蒜蓉菠菜', ingredients: '菠菜、大蒜', note: '养血润燥，清淡佐餐' },
      { name: '胡萝卜玉米汤', ingredients: '胡萝卜、玉米', note: '健脾养肝，全家适用' },
    ],
    caution: '肝病、黄疸、转氨酶升高请遵医嘱；菠菜焯水去草酸；忌酗酒熬夜。',
    voiceTitle: '肝脏最爱：枸杞菊花绿豆疏肝',
    voiceSummary: '养肝宜疏肝清热。肝脏偏爱枸杞、菊花、菠菜、绿豆，枸杞菊花茶明目，少熬夜饮酒。',
    voiceover: '养肝少熬夜少喝酒。肝脏偏爱枸杞菊花茶；菠菜补养血；绿豆汤清热解酒；胡萝卜玉米汤健脾。肝病指标异常要就医，护肝不能代替戒酒。',
  },

  脾胃: {
    name: '脾胃',
    icon: '🍚',
    category: '五脏',
    alias: ['脾', '胃', '健脾', '养胃'],
    color: '#eab308',
    summary: '脾胃为后天之本，喜温软易消化、健脾和胃的食材。',
    principle: '健脾和胃、温中益气，细嚼慢咽，忌生冷暴饮暴食。',
    ingredients: [
      { name: '山药', role: '补脾养胃、益肾' },
      { name: '小米', role: '健脾和胃、安神' },
      { name: '南瓜', role: '补中益气、护胃' },
      { name: '生姜', role: '温中止呕、散寒' },
      { name: '红枣', role: '补中益气、养血' },
    ],
    dishes: [
      { name: '山药小米粥', ingredients: '山药、小米', note: '健脾养胃，早餐温服' },
      { name: '南瓜小米粥', ingredients: '南瓜、小米', note: '温中益气，易消化' },
      { name: '生姜大枣茶', ingredients: '生姜、红枣', note: '温中散寒，胃寒适用' },
      { name: '红枣山药粥', ingredients: '红枣、山药', note: '补气健脾，日常调养' },
      { name: '大米粥', ingredients: '大米', note: '养胃益气，煮出米油' },
    ],
    caution: '急性胃肠炎、胃溃疡活动期遵医嘱；生冷油腻少食；儿童积食另查对症卡。',
    voiceTitle: '脾胃最爱：山药小米南瓜养胃',
    voiceSummary: '脾胃喜温软易消化。偏爱山药、小米、南瓜、生姜，山药小米粥最养胃，忌生冷暴食。',
    voiceover: '脾胃是后天之本。最爱山药小米粥；南瓜小米粥温中；胃寒喝生姜大枣茶；大米粥煮出米油最养人。别生冷暴食，胃痛剧烈要看医生。',
  },

  肺: {
    name: '肺',
    icon: '🫁',
    category: '五脏',
    alias: ['肺脏', '养肺', '润肺'],
    color: '#38bdf8',
    summary: '肺主气、司呼吸，喜润肺生津、化痰止咳的白色食材。',
    principle: '润肺生津、化痰止咳，少烟尘辛辣，秋冬润燥为重。',
    ingredients: [
      { name: '梨', role: '生津润燥、化痰' },
      { name: '银耳', role: '滋阴润肺、养胃' },
      { name: '百合', role: '养阴润肺、安神' },
      { name: '白萝卜', role: '消食化痰、下气' },
      { name: '蜂蜜', role: '润燥通便、润肺' },
    ],
    dishes: [
      { name: '冰糖雪梨汤', ingredients: '雪梨、冰糖', note: '润肺止咳，秋燥适用' },
      { name: '银耳雪梨羹', ingredients: '银耳、雪梨', note: '滋阴润肺，秋冬常备' },
      { name: '百合莲子羹', ingredients: '百合、莲子', note: '润肺清心，干咳少痰' },
      { name: '白萝卜蜂蜜饮', ingredients: '白萝卜、蜂蜜', note: '润肺化痰，温水冲服' },
      { name: '银耳红枣羹', ingredients: '银耳、红枣', note: '润肺养血，女性调养' },
    ],
    caution: '黄脓痰、高热胸痛请就医；风寒咳嗽忌过用寒凉；糖尿病控糖。',
    voiceTitle: '肺最爱：梨银耳百合润肺',
    voiceSummary: '润肺宜生津少辛辣。肺偏爱梨、银耳、百合、白萝卜，冰糖雪梨汤、银耳羹秋冬常备。',
    voiceover: '肺喜润恶燥。最爱冰糖雪梨汤；银耳雪梨羹滋阴；百合莲子羹润肺；白萝卜蜂蜜饮化痰。黄痰高热要看医生，别乱用寒凉。',
  },

  肾脏: {
    name: '肾脏',
    icon: '🫘',
    category: '五脏',
    alias: ['肾', '补肾', '养肾'],
    color: '#1e293b',
    summary: '肾主藏精、主水，喜补肾益精、温阳滋阴的食材。',
    principle: '补肾益精、温阳滋阴，节制劳累，忌过咸过寒。',
    ingredients: [
      { name: '黑豆', role: '补肾益阴、活血利水' },
      { name: '核桃', role: '补肾温肺、健脑' },
      { name: '枸杞', role: '滋补肝肾、益精' },
      { name: '山药', role: '补脾益肾' },
      { name: '羊肉', role: '温补肾阳、补虚' },
    ],
    dishes: [
      { name: '黑豆核桃粥', ingredients: '黑豆、核桃、大米', note: '补肾健脑，早餐温服' },
      { name: '枸杞山药粥', ingredients: '枸杞、山药', note: '平补脾肾，日常调养' },
      { name: '核桃芝麻糊', ingredients: '核桃、黑芝麻', note: '补肝肾益精血' },
      { name: '当归生姜羊肉汤', ingredients: '当归、生姜、羊肉', note: '温补肾阳，冬季适宜' },
      { name: '山药排骨汤', ingredients: '山药、排骨', note: '健脾补肾，全家适用' },
    ],
    caution: '肾虚需辨证阴阳；肾炎、水肿遵医嘱限盐；羊肉温补，阴虚火旺适量。',
    voiceTitle: '肾脏最爱：黑豆核桃枸杞补肾',
    voiceSummary: '补肾宜益精温阳。肾偏爱黑豆、核桃、枸杞、山药，黑豆核桃粥、枸杞山药粥日常可吃。',
    voiceover: '补肾要慢慢来。肾脏最爱黑豆核桃粥；枸杞山药粥平补；冬天当归生姜羊肉汤温阳；山药排骨汤健脾补肾。肾炎水肿听医生的，别猛补。',
  },

  眼睛: {
    name: '眼睛',
    icon: '👁️',
    category: '官窍',
    alias: ['目', '护眼', '明目'],
    color: '#6366f1',
    summary: '肝开窍于目，喜富含维生素 A、胡萝卜素的明目食材。',
    principle: '养血明目、疏肝清热，少熬夜屏幕，适当户外活动。',
    ingredients: [
      { name: '胡萝卜', role: '补肝明目、富含胡萝卜素' },
      { name: '枸杞', role: '益精明目、滋补肝肾' },
      { name: '菠菜', role: '养血润燥、护眼' },
      { name: '番茄', role: '生津健胃、抗氧化' },
      { name: '菊花', role: '清肝明目、疏散风热' },
    ],
    dishes: [
      { name: '枸杞菊花茶', ingredients: '枸杞、菊花', note: '清肝明目，用眼过度常备' },
      { name: '胡萝卜玉米排骨汤', ingredients: '胡萝卜、玉米、排骨', note: '明目健脾，全家适用' },
      { name: '菠菜猪肝汤', ingredients: '菠菜、猪肝', note: '养血明目，适量食用' },
      { name: '番茄鸡蛋汤', ingredients: '番茄、鸡蛋', note: '清淡营养，日常汤品' },
      { name: '胡萝卜小米粥', ingredients: '胡萝卜、小米', note: '健脾明目，早餐温服' },
    ],
    caution: '突发视力下降、眼痛请眼科就诊；猪肝不宜过量；屏幕用眼遵循20-20-20法则。',
    voiceTitle: '眼睛最爱：胡萝卜枸杞菊花明目',
    voiceSummary: '护眼宜明目少熬夜。眼睛偏爱胡萝卜、枸杞、菊花，枸杞菊花茶、胡萝卜汤办公族常备。',
    voiceover: '护眼少熬夜少盯屏。眼睛最爱枸杞菊花茶；胡萝卜玉米排骨汤明目；菠菜猪肝汤适量；记得20分钟远眺20秒。视力突然下降要看眼科。',
  },

  大脑: {
    name: '大脑',
    icon: '🧠',
    category: '官窍',
    alias: ['脑', '补脑', '健脑'],
    color: '#a855f7',
    summary: '脑为髓海，喜补肾益精、健脑益智的坚果与优质蛋白。',
    principle: '补肾健脑、益气养血，规律睡眠，少熬夜用脑过度。',
    ingredients: [
      { name: '核桃', role: '补肾温肺、健脑益智' },
      { name: '黑芝麻', role: '补肝肾、益精血' },
      { name: '鸡蛋', role: '滋阴润燥、优质蛋白' },
      { name: '鲫鱼', role: '健脾利湿、补虚' },
      { name: '花生', role: '健脾养胃、养血' },
    ],
    dishes: [
      { name: '核桃芝麻糊', ingredients: '核桃、黑芝麻', note: '健脑补肾，早餐适量' },
      { name: '核桃黑豆粥', ingredients: '核桃、黑豆', note: '补肾健脑，学生族适用' },
      { name: '鲫鱼豆腐汤', ingredients: '鲫鱼、豆腐', note: '补虚蛋白，清淡少油' },
      { name: '花生红枣粥', ingredients: '花生、红枣', note: '养血健脾，日常调养' },
      { name: '蒸鸡蛋羹', ingredients: '鸡蛋', note: '易消化优质蛋白' },
    ],
    caution: '健忘加重、头痛呕吐请神经科排查；坚果油脂高适量；过敏者慎花生核桃。',
    voiceTitle: '大脑最爱：核桃黑芝麻健脑',
    voiceSummary: '健脑宜补肾益精。大脑偏爱核桃、黑芝麻、鸡蛋，核桃芝麻糊、黑豆粥学生族可常备。',
    voiceover: '用脑多备核桃黑芝麻。大脑最爱核桃芝麻糊；核桃黑豆粥补肾健脑；鲫鱼豆腐汤补蛋白；蒸鸡蛋羹好消化。头痛呕吐别硬扛，坚果适量别过量。',
  },

  皮肤: {
    name: '皮肤',
    icon: '✨',
    category: '体表',
    alias: ['肤', '润肤', '养颜'],
    color: '#f472b6',
    summary: '肺主皮毛，喜滋阴润燥、养血润肤的食材。',
    principle: '滋阴润燥、养血润肤，多饮水防晒，少辛辣油炸。',
    ingredients: [
      { name: '银耳', role: '滋阴润肺、润肤' },
      { name: '蜂蜜', role: '润燥解毒、润肤' },
      { name: '黑芝麻', role: '润肠燥、益精血' },
      { name: '番茄', role: '生津健胃、抗氧化' },
      { name: '黄瓜', role: '清热利水、爽肤' },
    ],
    dishes: [
      { name: '银耳红枣羹', ingredients: '银耳、红枣', note: '滋阴养血，秋冬润燥' },
      { name: '蜂蜜柠檬水', ingredients: '蜂蜜、柠檬', note: '生津润燥，晨起少量' },
      { name: '黑芝麻糊', ingredients: '黑芝麻', note: '润肤乌发，早餐温服' },
      { name: '凉拌黄瓜', ingredients: '黄瓜', note: '清热爽肤，夏季凉菜' },
      { name: '银耳雪梨羹', ingredients: '银耳、雪梨', note: '润肺润肤，干燥季节' },
    ],
    caution: '皮疹、过敏、湿疹请皮肤科诊治；蜂蜜糖尿病慎用；防晒补水是基础。',
    voiceTitle: '皮肤最爱：银耳蜂蜜黑芝麻润肤',
    voiceSummary: '润肤宜滋阴润燥。皮肤偏爱银耳、蜂蜜、黑芝麻，银耳红枣羹、蜂蜜柠檬水日常可吃。',
    voiceover: '皮肤干先润肺润燥。皮肤最爱银耳红枣羹；晨起蜂蜜柠檬水；黑芝麻糊润肤；夏天凉拌黄瓜清爽。湿疹过敏要看皮肤科，防晒喝水别忘记。',
  },

  血管: {
    name: '血管',
    icon: '🩸',
    category: '络脉',
    alias: ['心脑血管', '护血管', '血管健康'],
    color: '#ef4444',
    summary: '心主血脉，喜清淡低脂、活血利湿的食材维护血管弹性。',
    principle: '低脂低盐、活血利湿，控体重戒烟限酒，遵医嘱管理三高。',
    ingredients: [
      { name: '芹菜', role: '平肝清热、辅助降压' },
      { name: '海带', role: '软坚化痰、利水' },
      { name: '山楂', role: '消食化瘀、降脂' },
      { name: '茄子', role: '清热活血、低脂' },
      { name: '香菇', role: '扶正补虚、降脂辅助' },
    ],
    dishes: [
      { name: '芹菜汁', ingredients: '芹菜', note: '平肝降压，鲜榨少量' },
      { name: '海带豆腐汤', ingredients: '海带、豆腐', note: '清淡少油，日常汤品' },
      { name: '山楂荷叶茶', ingredients: '山楂、荷叶', note: '消食降脂，代茶饮用' },
      { name: '蒜蓉蒸茄子', ingredients: '茄子、大蒜', note: '少油烹饪，活血消食' },
      { name: '凉拌海带丝', ingredients: '海带', note: '消痰利水，少油凉拌' },
    ],
    caution: '高血压高血脂须服药监测；甲亢限海带；低血压慎芹菜汁。',
    voiceTitle: '血管最爱：芹菜海带山楂清淡',
    voiceSummary: '护血管宜低盐低脂。血管偏爱芹菜、海带、山楂，少油烹饪配合医嘱控三高。',
    voiceover: '护血管低盐低脂戒烟酒。血管最爱芹菜汁少量；海带豆腐汤清淡；山楂荷叶茶消食降脂；茄子蒜蓉蒸少放油。三高要吃药监测，食疗只能辅助。',
  },

  肠道: {
    name: '肠道',
    icon: '🦠',
    category: '六腑',
    alias: ['肠', '润肠', '肠道健康'],
    color: '#14b8a6',
    summary: '大肠主传导，喜润肠通便、健脾利湿的高纤维食材。',
    principle: '润肠通便、健脾利湿，多饮水多纤维，忌久坐少动。',
    ingredients: [
      { name: '红薯', role: '宽肠通便、益气' },
      { name: '蜂蜜', role: '润燥通便' },
      { name: '白菜', role: '养胃生津、通肠' },
      { name: '香蕉', role: '润肠生津（熟用）' },
      { name: '薏米', role: '健脾利湿' },
    ],
    dishes: [
      { name: '蒸红薯', ingredients: '红薯', note: '宽肠通便，温热食用' },
      { name: '蜂蜜芝麻茶', ingredients: '蜂蜜、黑芝麻', note: '润肠通便，晨起温服' },
      { name: '白菜豆腐汤', ingredients: '白菜、豆腐', note: '清热养胃，清淡少油' },
      { name: '香蕉牛奶', ingredients: '熟香蕉、牛奶', note: '润肠生津，早餐适量' },
      { name: '薏米山药粥', ingredients: '薏米、山药', note: '健脾祛湿，调理肠道' },
    ],
    caution: '腹痛便血、持续腹泻请就医；便秘长期不缓解查因；蜂蜜婴儿禁用。',
    voiceTitle: '肠道最爱：红薯蜂蜜高纤维',
    voiceSummary: '肠道喜纤维多饮水。偏爱红薯、蜂蜜、白菜、香蕉，蒸红薯、蜂蜜芝麻茶润肠，忌久坐。',
    voiceover: '肠道喜欢纤维和水。最爱蒸红薯；晨起蜂蜜芝麻茶；白菜豆腐汤清淡；熟香蕉牛奶润肠。腹痛便血要看医生，别长期依赖泻药。',
  },

  骨骼: {
    name: '骨骼',
    icon: '🦴',
    category: '形体',
    alias: ['骨', '补钙', '强骨'],
    color: '#94a3b8',
    summary: '肾主骨生髓，喜补钙壮骨、补肾益精的食材。',
    principle: '补肾壮骨、补钙益精，日晒运动，遵医嘱补充维生素 D。',
    ingredients: [
      { name: '排骨', role: '滋阴补虚、煲汤补钙' },
      { name: '紫菜', role: '补肾养心、配虾皮补钙' },
      { name: '虾仁', role: '补肾壮阳、高钙蛋白' },
      { name: '豆腐', role: '植物蛋白、补钙' },
      { name: '黑芝麻', role: '补肝肾、益精血' },
    ],
    dishes: [
      { name: '排骨玉米汤', ingredients: '排骨、玉米', note: '补钙补虚，撇油煲汤' },
      { name: '紫菜虾皮汤', ingredients: '紫菜、虾皮', note: '平价补钙，日常汤品' },
      { name: '虾仁豆腐羹', ingredients: '虾仁、豆腐', note: '高蛋白钙，清淡' },
      { name: '黑芝麻核桃糊', ingredients: '黑芝麻、核桃', note: '补肾壮骨，早餐温服' },
      { name: '黑豆核桃粥', ingredients: '黑豆、核桃', note: '补肾益精，强骨辅助' },
    ],
    caution: '骨质疏松遵医嘱补钙；肾结石患者遵医嘱；防跌倒锻炼。',
    voiceTitle: '骨骼最爱：排骨紫菜虾仁补钙',
    voiceSummary: '强骨宜补钙补肾。骨骼偏爱排骨、紫菜、虾仁、豆腐，排骨汤、紫菜虾皮汤平价补钙。',
    voiceover: '骨头要钙还要动。骨骼最爱排骨玉米汤；紫菜虾皮汤补钙；虾仁豆腐羹清淡；黑芝麻核桃糊补肾。补钙维D听医生的，多晒太阳防跌倒。',
  },

  头发: {
    name: '头发',
    icon: '💇',
    category: '形体',
    alias: ['发', '乌发', '养发'],
    color: '#57534e',
    summary: '肾其华在发，喜补血益肾、润燥养发的黑色食材。',
    principle: '补血益肾、润燥养发，规律作息，少熬夜染发。',
    ingredients: [
      { name: '黑芝麻', role: '补肝肾、润肠、乌发' },
      { name: '核桃', role: '补肾益精、养发' },
      { name: '黑豆', role: '补肾益阴、乌发' },
      { name: '枸杞', role: '滋补肝肾' },
      { name: '红枣', role: '养血安神' },
    ],
    dishes: [
      { name: '黑芝麻糊', ingredients: '黑芝麻', note: '乌发养颜，早餐温服' },
      { name: '核桃芝麻粥', ingredients: '核桃、黑芝麻', note: '补肾养发，坚持食用' },
      { name: '黑豆核桃粥', ingredients: '黑豆、核桃', note: '乌发补肾，早晚温服' },
      { name: '枸杞山药粥', ingredients: '枸杞、山药', note: '平补脾肾，养发辅助' },
      { name: '红枣花生粥', ingredients: '红枣、花生', note: '养血健脾，发枯适用' },
    ],
    caution: '斑秃、大面积脱发请皮肤科；食疗需坚持；排查甲状腺贫血。',
    voiceTitle: '头发最爱：黑芝麻黑豆乌发',
    voiceSummary: '养发宜补肾养血。头发偏爱黑芝麻、核桃、黑豆，黑芝麻糊、黑豆核桃粥坚持吃，少熬夜。',
    voiceover: '头发枯少白先补肾养血。头发最爱黑芝麻糊；核桃芝麻粥坚持吃；黑豆核桃粥乌发；别熬夜少染发。大面积脱发要看皮肤科。',
  },
};

const SHILIAO_ORGAN_KEYWORD_MAP = {
  养心: '心脏',
  养肝: '肝脏',
  养胃: '脾胃',
  健脾: '脾胃',
  润肺: '肺',
  补肾: '肾脏',
  护眼: '眼睛',
  补脑: '大脑',
  润肤: '皮肤',
  补钙: '骨骼',
  乌发: '头发',
};

for (const [key, item] of Object.entries(SHILIAO_ORGAN_DATA)) {
  (item.alias || []).forEach((a) => {
    if (!SHILIAO_ORGAN_KEYWORD_MAP[a]) SHILIAO_ORGAN_KEYWORD_MAP[a] = key;
  });
}

function resolveShiliaoOrganKey(query) {
  const q = (query || '').trim();
  if (!q) return null;
  if (SHILIAO_ORGAN_DATA[q]) return q;
  if (SHILIAO_ORGAN_KEYWORD_MAP[q]) return SHILIAO_ORGAN_KEYWORD_MAP[q];
  for (const [kw, key] of Object.entries(SHILIAO_ORGAN_KEYWORD_MAP)) {
    if (q.includes(kw) || kw.includes(q)) return key;
  }
  for (const key of Object.keys(SHILIAO_ORGAN_DATA)) {
    if (key.includes(q) || q.includes(key)) return key;
    const item = SHILIAO_ORGAN_DATA[key];
    if ((item.alias || []).some((a) => a.includes(q) || q.includes(a))) return key;
  }
  return null;
}

function getShiliaoOrganList() {
  return Object.values(SHILIAO_ORGAN_DATA);
}
