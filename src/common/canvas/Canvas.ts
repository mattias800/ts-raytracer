import { Color } from "../raytracer/Color.ts";
import { Interval } from "../raytracer/Interval.ts";

let ctx: CanvasRenderingContext2D | null = null;

export const initCanvas = () => {
  const canvas = <HTMLCanvasElement>document.getElementById("ray-canvas");
  ctx = canvas?.getContext("2d");
};

export const drawPixel = (
  x: number,
  y: number,
  r: number,
  g: number,
  b: number,
  a: number = 255,
): void => {
  if (ctx == null) {
    throw new Error("Canvas context not initialized.");
  }
  ctx.fillStyle = "rgba(" + r + "," + g + "," + b + "," + a / 255 + ")";
  ctx.fillRect(x, y, 1, 1);
};

export const drawColor = (x: number, y: number, { r, g, b, a }: Color) => {
  drawPixel(
    x,
    y,
    255.999 * r,
    255.999 * g,
    255.999 * b,
    a != null ? 255.999 * a : undefined,
  );
};

export const drawColorSamples = (
  x: number,
  y: number,
  color: Color,
  samplesPerPixel: number,
) => {
  const scale = 1.0 / samplesPerPixel;
  const r = linearToGamma(color.r * scale);
  const g = linearToGamma(color.g * scale);
  const b = linearToGamma(color.b * scale);

  const intensity = new Interval(0, 0.999);

  drawPixel(
    x,
    y,
    256 * intensity.clamp(r),
    256 * intensity.clamp(g),
    256 * intensity.clamp(b),
    color.a != null ? 256 * intensity.clamp(color.a) : undefined,
  );
};

const linearToGamma = (linearComponent: number): number =>
  Math.sqrt(linearComponent);
