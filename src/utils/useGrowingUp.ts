interface Point {
  x: number
  y: number
}

export const useGrowingUp = ({
  canvas,
  baseLength = 2,
  probability = 0.5,
  deep = 80,
  minLevel = 6,
  color = 'red'
}: {
  canvas: HTMLCanvasElement
  baseLength?: number
  probability?: number
  deep?: number
  minLevel?: number
  color?: string
}) => {
  const ctx = canvas.getContext('2d')!;
  ctx.lineWidth = 0.5;
  ctx.strokeStyle = color;

  recursiveGrow({ x: 150, y: 300 }, -Math.PI / 2, baseLength);

  function getCoordinate(from: Point, angle: number, length: number) {
    const x = from.x + Math.cos(angle) * length;
    const y = from.y + Math.sin(angle) * length;
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
    const to = getCoordinate(from, angle, length);
    drawLine(from, to);
    if (l < deep && isInRange(to)) {
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
