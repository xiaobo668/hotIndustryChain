/**
 * 器官食补海报 Canvas 绘制
 */
function getShiliaoOrganPosterLayout() {
  return getShiliaoDiseasePosterLayout();
}

function measureOrganPosterSections(ctx, data, innerW) {
  return measureDiseasePosterSections(ctx, data, innerW);
}

function estimateShiliaoOrganPosterHeight(data) {
  return estimateShiliaoDiseasePosterHeight(data);
}

function renderShiliaoOrganPoster(data) {
  renderShiliaoTherapyPoster(data, 'organ');
}

function drawShiliaoOrganPoster(ctx, data, W, H) {
  drawShiliaoTherapyPoster(ctx, data, W, H, 'organ');
}
