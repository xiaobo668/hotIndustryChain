/**
 * 颜色处理工具函数
 * - lightenColor: RGB 颜色亮化（用于产业链思维导图）
 * - shadeColor: Hex 颜色加深/变暗（用于板块龙头海报）
 */

/** RGB 颜色亮化 */
function lightenColor(hex, percent) {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.min(255, (num >> 16) + percent);
  const g = Math.min(255, ((num >> 8) & 0xFF) + percent);
  const b = Math.min(255, (num & 0xFF) + percent);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

/** Hex 颜色加深/变暗（percent 为负数时变暗） */
function shadeColor(color, percent) {
  const num = parseInt(color.replace('#', ''), 16);
  const r = Math.max(0, Math.min(255, (num >> 16) + percent));
  const g = Math.max(0, Math.min(255, ((num >> 8) & 0xFF) + percent));
  const b = Math.max(0, Math.min(255, (num & 0xFF) + percent));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}
