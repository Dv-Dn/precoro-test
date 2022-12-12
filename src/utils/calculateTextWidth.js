export function calculateTextWidth(text, font = "500 14px Inter") {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  context.font = font;
  const metrics = context.measureText(text);
  return Math.ceil(metrics.width);
}
