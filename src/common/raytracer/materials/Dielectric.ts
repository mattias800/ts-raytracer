import { Material } from "./Material.ts";
import { Ray } from "../Ray.ts";
import { HitRecord } from "../hittables/HitRecord.ts";
import { Color, colors } from "../Color.ts";

export class Dielectric implements Material {
  ir: number; // Index of refraction

  constructor(ir: number) {
    this.ir = ir;
  }

  scatter(
    rayIn: Ray,
    rec: HitRecord,
    attenuation: Color,
    scattered: Ray,
  ): boolean {
    attenuation.setAll(colors.white);
    const refractionRatio = rec.frontFace ? 1.0 / this.ir : this.ir;

    const unitDirection = rayIn.direction.unitVector();

    const cosTheta = Math.min(unitDirection.negative().dot(rec.normal), 1.0);
    const sinTheta = Math.sqrt(1.0 - cosTheta * cosTheta);

    const cannotRefract = refractionRatio * sinTheta > 1.0;

    const direction = cannotRefract
      ? unitDirection.reflect(rec.normal)
      : unitDirection.refract(rec.normal, refractionRatio);

    scattered.origin = rec.point;
    scattered.direction = direction;

    return true;
  }
}
