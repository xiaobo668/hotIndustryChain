/**
 * 健康饮食 · Top10 榜单示例数据
 */
const SHILIAO_LIST_TOPICS = [
  {
    id: 'liver-care',
    icon: '🥬',
    title: '养肝护肝的10种食物',
    defaultTheme: 'green',
    items: [
      { name: '西兰花', desc: '富含多种维生素与抗氧化成分，适合日常配菜' },
      { name: '芹菜', desc: '口感清爽、脂肪较低，适合清炒或凉拌' },
      { name: '菠菜', desc: '营养密度高，可快炒或做汤' },
      { name: '番茄', desc: '酸甜开胃，富含番茄红素，可做沙拉' },
      { name: '冬瓜', desc: '水分足、负担轻，适合夏季煲汤' },
      { name: '葡萄', desc: '含花青素与多种维生素，可当加餐水果' },
      { name: '蓝莓', desc: '抗氧化成分丰富，适合早餐或酸奶搭配' },
      { name: '木瓜', desc: '含天然酶类，口感软糯，适合餐后水果' },
      { name: '小米', desc: '易消化，可熬粥，搭配蔬菜更均衡' },
      { name: '鲈鱼', desc: '肉质细嫩、优质蛋白，适合清蒸' },
    ],
  },
  {
    id: 'bowel-care',
    icon: '🍇',
    title: '清肠通便的10种食物',
    defaultTheme: 'mint',
    items: [
      { name: '火龙果', desc: '膳食纤维与果胶丰富，适合早餐或加餐' },
      { name: '香蕉', desc: '熟香蕉口感润，含膳食纤维，方便携带' },
      { name: '西梅', desc: '含膳食纤维与有机酸，常作小份零食' },
      { name: '芹菜', desc: '粗纤维含量较高，适合凉拌或快炒' },
      { name: '韭菜', desc: '纤维丰富，可炒蛋或做馅' },
      { name: '冬瓜', desc: '水分高、脂肪低，适合煲汤' },
      { name: '燕麦', desc: '含可溶性膳食纤维，可做早餐粥' },
      { name: '玉米', desc: '粗粮代表，纤维充足，可蒸或煮' },
      { name: '红薯', desc: '纤维足、饱腹感强，适合替代部分主食' },
      { name: '木耳', desc: '含胶质与纤维，适合凉拌或做汤' },
    ],
  },
  {
    id: 'qi-blood',
    icon: '🍒',
    title: '补气血的10种食物',
    defaultTheme: 'pink',
    items: [
      { name: '红枣', desc: '营养温和，可泡茶或煮粥' },
      { name: '桂圆', desc: '果肉香甜，适合少量作加餐' },
      { name: '红豆', desc: '煮软后易消化，可做成甜汤' },
      { name: '花生', desc: '红皮花生营养足，可与杂粮同煮' },
      { name: '猪肝', desc: '含铁丰富，建议清炒或做汤，适量食用' },
      { name: '红糖', desc: '性质温和，可用于日常饮品调味' },
      { name: '乌鸡', desc: '肉质细，适合炖汤' },
      { name: '菠菜', desc: '含铁与多种维生素，快炒即可' },
      { name: '枸杞', desc: '可泡茶或入汤，口感温和' },
      { name: '羊肉', desc: '偏温补，冬季炖汤较常见' },
    ],
  },
];

function getShiliaoListTopics() {
  const notes = typeof getShiliaoListNoteTopics === 'function' ? getShiliaoListNoteTopics() : [];
  return [...SHILIAO_LIST_TOPICS, ...notes];
}

function getShiliaoListTopic(id) {
  return getShiliaoListTopics().find((t) => t.id === id) || null;
}
