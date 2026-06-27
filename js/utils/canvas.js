/**
 * Canvas 通用工具函数
 * - roundRect: 绘制圆角矩形
 * - drawWrappedText: 绘制自动换行文本
 * - fitOneLineWidth: 文本截断适配单行宽度
 */

/** 绘制圆角矩形路径（不填充/描边，需后续调用 fill/stroke）
 *  @param {CanvasRenderingContext2D} ctx
 *  @param {number} x 左上角 X
 *  @param {number} y 左上角 Y
 *  @param {number} w 宽度
 *  @param {number} h 高度
 *  @param {number|number[]} r 圆角半径（数字或 [tl,tr,br,b] 数组）
 */
function roundRect(ctx, x, y, w, h, r) {
  if (typeof r === 'number') r = [r, r, r, r];
  const [tl, tr, br, bl] = r;
  ctx.beginPath();
  ctx.moveTo(x + tl, y);
  ctx.lineTo(x + w - tr, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + tr);
  ctx.lineTo(x + w, y + h - br);
  ctx.quadraticCurveTo(x + w, y + h, x + w - br, y + h);
  ctx.lineTo(x + bl, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - bl);
  ctx.lineTo(x, y + tl);
  ctx.quadraticCurveTo(x, y, x + tl, y);
  ctx.closePath();
}

/** 在指定宽度内绘制文本，超出则截断并加省略号 */
function fitOneLineWidth(ctx, text, maxWidth) {
  if (!text) return '';
  if (ctx.measureText(text).width <= maxWidth) return text;
  for (let i = text.length - 1; i > 0; i--) {
    const truncated = text.substring(0, i) + '...';
    if (ctx.measureText(truncated).width <= maxWidth) return truncated;
  }
  return '...';
}

/** 绘制自动换行文本 */
function drawWrappedText(ctx, text, x, y, maxWidth, lineHeight, maxLines) {
  if (!text) return y;
  const words = text.split('');
  let line = '';
  let currentY = y;
  let lineCount = 0;

  for (let i = 0; i < words.length; i++) {
    const testLine = line + words[i];
    if (ctx.measureText(testLine).width > maxWidth && line !== '') {
      if (lineCount >= maxLines - 1) {
        ctx.fillText(line + '...', x, currentY);
        return currentY + lineHeight;
      }
      ctx.fillText(line, x, currentY);
      line = words[i];
      currentY += lineHeight;
      lineCount++;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, currentY);
  return currentY + lineHeight;
}
