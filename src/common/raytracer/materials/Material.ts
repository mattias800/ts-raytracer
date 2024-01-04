import { Ray } from "../Ray.ts";
import { Color } from "../Color.ts";
import {HitRecord} from "../hittables/HitRecord.ts";

export interface Material {
  scatter(
    rayIn: Ray,
    rec: HitRecord,
    attenuation: Color,
    scattered: Ray,
  ): boolean;
}
