/**
 * 中报分析榜合规文案（视频号/平台审核）
 * 生成脚本与复验脚本共用
 */
const {
  INVESTMENT_FORBIDDEN_RE,
  neutralizeCapacityText,
} = require('./capacity-rank-compliance');

const INTERIM_REPORT_DISCLAIMER =
  '本合集整理热门赛道上市公司公开披露的中报/半年报财务数据，属于产业链财报学习资料工具书，无证券投资分析、无个股价值研判，不构成任何股票买卖操作建议。本人无证券投资咨询执业资质，不提供任何行情、选股相关指导。';

const INTERIM_REPORT_POSTER_FOOTER = [
  '数据均来自上市公司公开披露的中报/半年报，仅用于财报与产业学习参考，',
  '请勿仅凭本数据开展证券投资；股市存在高风险，自主投资请独立审慎判断。',
];

function applyInterimReportCompliance(payload) {
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

module.exports = {
  INTERIM_REPORT_DISCLAIMER,
  INTERIM_REPORT_POSTER_FOOTER,
  INVESTMENT_FORBIDDEN_RE,
  applyInterimReportCompliance,
};
