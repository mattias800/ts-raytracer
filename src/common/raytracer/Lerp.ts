import { Vec3 } from "./Vec3.ts";
import { Color } from "./Color.ts";

export const lerp = (start: number, end: number, a: number): number =>
  (1 - a) * start + a * end;

export const lerpVec3 = (start: Vec3, end: Vec3, a: number): Vec3 =>
  new Vec3(
    lerp(start.x, end.x, a),
    lerp(start.y, end.y, a),
    lerp(start.z, end.z, a),
  );

export const lerpColor = (start: Color, end: Color, a: number): Color => ({
  r: lerp(start.r, end.r, a),
  g: lerp(start.g, end.g, a),
  b: lerp(start.b, end.b, a),
});
