/**
 * 科创板（688/689）A股简称 — 用于龙头「非科创」约束
 */
const fs = require('fs');
const path = require('path');

const SUPPLEMENT = [
  '寒武纪', '海光信息', '芯原股份', '华虹公司', '华润微', '翱捷科技', '佳缘科技',
  '九号公司', '天智航', '百济神州', '埃夫特', '神工股份', '盛美上海', '华海诚科',
  '甬矽电子', '精智达', '敏芯股份', '奥比中光', '国博电子', '雷电微力', '奕瑞科技',
  '奥精医疗', '复旦微电', '普元信息', '天合光能', '云从科技',
  '艾森股份', // 688720
];

/**
 * 确认为沪深/创业板（非 688/689）但误入科创板名单的简称
 * 勿把正帆科技、颀中科技、艾森股份等科创板放入此表
 */
const FORCE_NON_STAR = new Set([
  '联瑞新材', // 603612 沪市主板
]);

function loadStarBoardNames() {
  const jsonPath = path.join(__dirname, 'star-board-names.json');
  const names = new Set();
  if (fs.existsSync(jsonPath)) {
    JSON.parse(fs.readFileSync(jsonPath, 'utf8')).forEach((n) => names.add(n));
  }
  SUPPLEMENT.forEach((n) => names.add(n));
  FORCE_NON_STAR.forEach((n) => names.delete(n));
  return names;
}

const STAR_BOARD_NAMES = loadStarBoardNames();

function isStarBoard(name) {
  return STAR_BOARD_NAMES.has(name);
}

module.exports = { STAR_BOARD_NAMES, isStarBoard, FORCE_NON_STAR };
