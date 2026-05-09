/**
 * 文本处理工具函数
 * - stripMindTitleParens: 去除思维导图标题括号
 * - mindRichSafe: 思维导图富文本安全处理
 * - wrapMindTrackLabel: 细分赛道标签换行
 */

/** 去除思维导图标题括号 */
function stripMindTitleParens(s) {
  return s.replace(/[（(][^）)]*[）)]\s*$/, '').trim();
}

/** 思维导图富文本安全处理（防止 XSS） */
function mindRichSafe(html) {
  if (!html) return '';
  // 只保留基本格式标签，去除 script/style 等
  return html.replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/on\w+\s*=/gi, '');
}

/** 细分赛道标签换行（每 4 字符插入换行） */
function wrapMindTrackLabel(label) {
  if (!label) return '';
  const maxLen = 4;
  let result = '';
  for (let i = 0; i < label.length; i += maxLen) {
    result += label.substring(i, i + maxLen);
    if (i + maxLen < label.length) result += '\n';
  }
  return result;
}
