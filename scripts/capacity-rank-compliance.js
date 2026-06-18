/**
 * 产能榜付费上架合规文案与中性化规则（视频号付费合集）
 * 生成脚本与复验脚本共用；海报底部文案见 js/industry/capacity-rank-poster.js
 */

const CAPACITY_COLLECTION_DISCLAIMER =
  '本合集仅整理光通信、存储、电子材料等赛道企业公开产能、扩产、产线工艺数据，属于半导体行业产业资料工具书，无证券投资分析、无个股价值研判，不构成任何股票买卖操作建议。本人无证券投资咨询执业资质，不提供任何行情、选股相关指导。';

const CAPACITY_POSTER_FOOTER =
  '数据口径均来自企业年报、行业公开产业调研报道，仅用于行业产业学习参考，请勿仅凭本数据开展证券投资；股市存在高风险，自主投资请独立审慎判断。';

/** 海报/榜单文案禁止出现的投资暗示词（复验 FAIL） */
const INVESTMENT_FORBIDDEN_RE = /龙头|核心供应商|市占率第一|行业第一|全球第一|挖掘成长|潜力标的|把握行情|选股|买入|卖出/;

const NEUTRALIZE_RULES = [
  [/全球龙头/g, '全球规模靠前厂商'],
  [/国内龙头/g, '国内规模靠前厂商'],
  [/行业龙头/g, '行业规模靠前厂商'],
  [/代工龙头/g, '代工规模靠前厂商'],
  [/设备龙头/g, '设备规模靠前厂商'],
  [/芯片龙头/g, '芯片规模靠前厂商'],
  [/模块龙头/g, '模块规模靠前厂商'],
  [/品牌龙头/g, '品牌规模靠前厂商'],
  [/龙头/g, '规模靠前厂商'],
  [/核心供应商/g, '主要供货企业'],
  [/行业第一/g, '出货量规模居前'],
  [/市占率第一/g, '出货量规模居前'],
  [/全球第一/g, '全球规模居前'],
  [/产能第一/g, '产能规模居前'],
  [/出货量第一/g, '出货量规模居前'],
  [/产值第一/g, '产值规模居前'],
];

function neutralizeCapacityText(text) {
  if (!text) return text;
  let s = text;
  NEUTRALIZE_RULES.forEach(([re, rep]) => {
    s = s.replace(re, rep);
  });
  return s;
}

function applyComplianceToPayload(payload) {
  if (!payload) return payload;
  return {
    ...payload,
    title: neutralizeCapacityText(payload.title),
    subtitle: neutralizeCapacityText(payload.subtitle),
    companies: (payload.companies || []).map((co) => ({
      ...co,
      highlight: neutralizeCapacityText(co.highlight),
    })),
  };
}

function assertComplianceText(text, label) {
  const errors = [];
  if (text && INVESTMENT_FORBIDDEN_RE.test(text)) {
    errors.push(`${label} 含投资暗示词汇，应使用产业中性表述`);
  }
  return errors;
}

module.exports = {
  CAPACITY_COLLECTION_DISCLAIMER,
  CAPACITY_POSTER_FOOTER,
  INVESTMENT_FORBIDDEN_RE,
  NEUTRALIZE_RULES,
  neutralizeCapacityText,
  applyComplianceToPayload,
  assertComplianceText,
};
