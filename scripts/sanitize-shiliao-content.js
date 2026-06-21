/**
 * 健康饮食模块口播/文案合规清理（弱化医疗表述，保留 quote/book 原文与《食疗本草》书名）
 * 运行: node scripts/sanitize-shiliao-content.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', 'js', 'shiliao');
const FILES = [
  'data.js',
  'data-extra.js',
  'data-household.js',
  'disease-data.js',
  'organ-data.js',
  'summary-data.js',
];

const GUARD_TCBC = '\uE000TCBC\uE001';
const GUARD_XDLS = '\uE000XDLS\uE001';

const REPLACEMENTS = [
  ['对症食疗', '场景饮食'],
  ['器官食补', '营养侧重'],
  ['免疫食疗', '增强免疫饮食'],
  ['儿童食疗', '儿童饮食'],
  ['糖尿病食疗', '控糖场景饮食'],
  ['贫血食疗', '补铁场景饮食'],
  ['失眠食疗', '失眠场景饮食'],
  ['便秘食疗', '便秘场景饮食'],
  ['腹泻食疗', '腹泻场景饮食'],
  ['芹菜家常食疗', '芹菜家常吃法'],
  ['黑豆食疗三法', '黑豆三种吃法'],
  ['食疗汇总', '饮食汇总'],
  ['食疗养生', '健康饮食'],
  ['食疗海报', '饮食海报'],
  ['食疗菜品', '推荐菜品'],
  ['食疗知识', '饮食知识'],
  ['食疗文献', '饮食文献'],
  ['食疗典籍', '饮食典籍'],
  ['食疗常选', '饮食常选'],
  ['食疗常配', '饮食常配'],
  ['食疗粮', '杂粮'],
  ['食疗首选', '家常首选'],
  ['食疗三法', '三种吃法'],
  ['食疗方', '饮食方'],
  ['食疗口播', '饮食口播'],
  ['食疗辅助', '饮食搭配'],
  ['食疗仅辅助', '饮食仅供参考'],
  ['食疗只能辅助', '饮食仅供参考'],
  ['食疗只能帮忙', '饮食仅供参考'],
  ['食疗只能辅助', '饮食仅供参考'],
  ['别只靠食疗', '饮食搭配要均衡'],
  ['禁盲目食疗', '不宜盲目依赖单一饮食'],
  ['只靠食疗', '只靠饮食'],
  ['辅助消渴、高脂血症食疗', '控糖控脂日常饮食（控量）'],
  ['辅助高血压、高脂血症食疗', '低盐控脂日常饮食'],
  ['辅助消渴辅助食疗（控量）', '控糖日常饮食（控量）'],
  ['辅助高脂血症辅助食疗', '控脂日常饮食'],
  ['高血压食疗常选', '低盐饮食常选'],
  ['消渴辅助食疗（控量）', '控糖日常饮食（控量）'],
  ['对症调理', '日常搭配'],
  ['食疗需辨证', '因人而异'],
  ['食疗需坚持', '需坚持'],
  ['食疗顺时而食', '顺时而食'],
  ['食疗讲究', '饮食讲究'],
  ['食疗养心', '饮食养心'],
  ['温和食疗', '温和饮食'],
  ['坚持食疗', '坚持搭配'],
  ['家庭食疗', '家庭饮食'],
  ['抗衰食疗', '抗衰饮食'],
  ['不能替代药物', '不能替代均衡作息'],
  ['不能停药', '需保持规律生活'],
  ['药不能停', '需保持规律生活'],
  ['药和监测不能停', '需保持规律监测'],
  ['长期失眠要看医生', '长期失眠建议咨询专业人士'],
  ['胸痛心悸要看医生', '如有不适建议咨询专业人士'],
  ['突然大面积脱发要看医生', '如脱发明显建议咨询专业人士'],
  ['腹痛便血要看医生', '如持续不适应咨询专业人士'],
  ['化脓发烧要就医', '如持续发热请关注身体状况'],
  ['立刻就医', '请及时关注身体状况'],
  ['立即就医', '请及时关注身体状况'],
  ['要就医', '请咨询专业人士'],
  ['请就医', '请咨询专业人士'],
  ['及时就医', '请关注身体状况'],
  ['要看医生', '请咨询专业人士'],
  ['看医生', '咨询专业人士'],
  ['听医生限盐限水', '按个人情况限盐限水'],
  ['肝病指标异常要就医', '如有异常指标请关注身体状况'],
  ['是乳腺炎，要就医', '如有红肿发热请关注身体状况'],
  ['遵医嘱适量', '按需适量'],
  ['遵医嘱', '按需'],
  ['需遵医嘱', '需按需'],
  ['川贝等药材需遵医嘱', '含药材需按需选用'],
  ['免疫疾病请按需，饮食仅供参考', '有特殊体质请按需调整，饮食仅供参考'],
  ['中重度抑郁焦虑请专业治疗', '中重度情绪问题请寻求专业支持'],
  ['专业治疗', '专业支持'],
  ['激素治疗', '相关调理'],
  ['呕家圣药', '厨房好帮手'],
  ['妇科圣药', '女性饮食常用'],
  ['圣药', '好帮手'],
  ['厨房就有良药', '厨房就有好选择'],
  ['良药', '好选择'],
  ['少生病', '吃得更踏实'],
  ['用对食材少生病', '用对食材更安心'],
  ['专治脏躁悲伤', '常用于舒缓情绪'],
  ['治脏躁悲伤', '用于舒缓情绪'],
  ['治外感风寒', '应对风寒不适'],
  ['治产后寒痛', '用于产后暖身'],
  ['消渴', '血糖关注'],
  ['降压', '低盐'],
  ['降糖', '控糖'],
  ['降糖降脂', '控糖控脂'],
  ['降血压脂', '低盐控脂'],
  ['需辨证', '因人而异'],
  ['辨证', '因人而异'],
  ['《现代食疗学》', GUARD_XDLS],
  ['食疗', '健康饮食'],
];

function protectBooks(s) {
  return s.replace(/《食疗本草》/g, GUARD_TCBC);
}

function restoreBooks(s) {
  return s
    .replace(new RegExp(GUARD_TCBC, 'g'), '《食疗本草》')
    .replace(new RegExp(GUARD_XDLS, 'g'), '《饮食营养常识》');
}

function applyReplacements(s) {
  let out = protectBooks(s);
  for (const [from, to] of REPLACEMENTS) {
    if (out.includes(from)) out = out.split(from).join(to);
  }
  return restoreBooks(out);
}

function shouldSkipLine(line) {
  return /^\s*(quote|book):\s*/.test(line) || /,\s*quote:\s*'/.test(line);
}

function sanitizeLineStrings(line) {
  if (shouldSkipLine(line)) return line;
  return line.replace(/'((?:\\.|[^'\\])*)'/g, (full, inner) => {
    const next = applyReplacements(inner);
    return next === inner ? full : `'${next}'`;
  });
}

function processFile(content) {
  const lines = content.split('\n');
  const out = [];
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    if (/^\s*\*\s|^\s*\/\//.test(line)) {
      out.push(applyReplacements(line));
      continue;
    }
    if (/^\s*(voiceSummary|voiceover|voiceTitle):\s*$/.test(line) && i + 1 < lines.length) {
      const nextLine = sanitizeLineStrings(lines[i + 1]);
      out.push(line);
      out.push(nextLine);
      i += 1;
      continue;
    }
    out.push(sanitizeLineStrings(line));
  }
  let result = out.join('\n');
  result = result
    .replace(/食疗模块/g, '健康饮食模块')
    .replace(/对症食疗（39 种常见不适\/疾病）/g, '场景饮食（39 个日常场景）')
    .replace(/结构：疾病 →/g, '结构：场景 →')
    .replace(/器官食补（各器官最喜欢的食材）/g, '营养侧重（各分区推荐食材）')
    .replace(/厨房「厨房好帮手」/g, '厨房好帮手')
    .replace(/「厨房好帮手」：/g, '好帮手：');
  return result;
}

let updated = 0;
for (const file of FILES) {
  const fp = path.join(ROOT, file);
  const before = fs.readFileSync(fp, 'utf8');
  const after = processFile(before);
  if (after !== before) {
    fs.writeFileSync(fp, after, 'utf8');
    console.log('OK', file);
    updated++;
  } else {
    console.log('—', file);
  }
}
console.log('\n已更新', updated, '个文件');
