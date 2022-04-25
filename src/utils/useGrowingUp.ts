interface Point {
  x: number
  y: number
}

export const useGrowingUp = ({
  canvas,
  ctx,
  baseLength = 2,
  probability = 0.5,
  depth = 60,
  minLevel = 5,
  color = '#fda4af',
  start = { x: 150, y: 300 },
  startAngle = -Math.PI / 2,
  limit = 30
}: {
  canvas: HTMLCanvasElement
  ctx?: CanvasRenderingContext2D
  baseLength?: number
  probability?: number
  depth?: number
  minLevel?: number
  color?: string
  start?: Point
  startAngle?: number
  limit?: number
}) => {
  if (!ctx)
    ctx = canvas.getContext('2d')!;

  ctx.lineWidth = 0.5;
  ctx.strokeStyle = color;

  const control: Record<string, number> = {};

  recursiveGrow(start, startAngle, baseLength);

  function getEndPoint(start: Point, angle: number, length: number) {
    const x = start.x + Math.cos(angle) * length;
    const y = start.y + Math.sin(angle) * length;
    return { x, y };
  }

  function newAngle(angle: number, t: number) {
    return angle + Math.random() * t;
  }

  function newLength() {
    return baseLength + (Math.random()) * baseLength;
  }

  function isInRange(to: Point) {
    const { x, y } = to;
    return x >= 0 && x <= canvas!.width && y >= 0 && y <= canvas!.height;
  }

  function recursiveGrow(from: Point, angle: number, length: number, l = 0) {
    control[l] = (control[l] || 0) + 1;
    const to = getEndPoint(from, angle, length);
    drawLine(from, to);

    if (control[l] > limit)
      return;
    if (l < depth && isInRange(to)) {
      requestAnimationFrame(() => {
        // left
        if (l < minLevel || Math.random() < probability)
          recursiveGrow(to, newAngle(angle, -0.3), newLength(), l + 1);
        // right
        if (l < minLevel || Math.random() < probability)
          recursiveGrow(to, newAngle(angle, 0.3), newLength(), l + 1);
      });
    }
  }

  function drawLine(from: Point, to: Point) {
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
      ctx.stroke();
    }
  }
};
