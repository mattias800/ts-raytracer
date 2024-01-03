import { HitRecord, Hittable } from "./hittables/Hittable.ts";
import { Ray } from "./Ray.ts";
import { Color } from "./Color.ts";
import { Interval } from "./Interval.ts";
import { lerpColor } from "./Lerp.ts";
import { Vec3 } from "./Vec3.ts";
import { drawColorSamples } from "../canvas/Canvas.ts";

export class Camera {
  public aspectRatio = 16.0 / 9.0;
  public imageWidth = 400;
  public samplesPerPixel = 10;

  render(world: Hittable) {
    this.initialize();

    for (let j = 0; j < this.imageHeight; ++j) {
      for (let i = 0; i < this.imageWidth; ++i) {
        let pixelColor = new Color(0, 0, 0);

        for (let sample = 0; sample < this.samplesPerPixel; sample++) {
          const r = this.getRay(i, j);
          pixelColor = pixelColor.add(this.rayColor(r, world));
        }

        drawColorSamples(i, j, pixelColor, this.samplesPerPixel);
      }
    }
  }

  private imageHeight: number = 0;
  private center = Vec3.zero();
  private pixel00Loc = Vec3.zero();
  private pixelDeltaU = Vec3.zero();
  private pixelDeltaV = Vec3.zero();

  initialize() {
    this.imageHeight = Math.max(1, this.imageWidth / this.aspectRatio);
    this.center = new Vec3(0, 0, 0);

    const focalLength = 1.0;
    const viewportHeight = 2.0;
    const viewportWidth = viewportHeight * (this.imageWidth / this.imageHeight);

    const viewportU = new Vec3(viewportWidth, 0, 0);
    const viewportV = new Vec3(0, -viewportHeight, 0);

    this.pixelDeltaU = viewportU.divideByNum(this.imageWidth);
    this.pixelDeltaV = viewportV.divideByNum(this.imageHeight);

    const viewportUpperLeft = this.center
      .sub(new Vec3(0, 0, focalLength))
      .sub(viewportU.divideByNum(2))
      .sub(viewportV.divideByNum(2));

    this.pixel00Loc = viewportUpperLeft.add(
      this.pixelDeltaU.add(this.pixelDeltaV).multiplyByNum(0.5),
    );
  }

  getRay(i: number, j: number): Ray {
    const pixelCenter = this.pixel00Loc
      .add(this.pixelDeltaU.multiplyByNum(i))
      .add(this.pixelDeltaV.multiplyByNum(j));

    const pixelSample = pixelCenter.add(this.pixelSampleSquare());

    const rayOrigin = this.center;
    const rayDirection = pixelSample.sub(rayOrigin);

    return new Ray(rayOrigin, rayDirection);
  }

  pixelSampleSquare(): Vec3 {
    const px = -0.5 + Math.random();
    const py = -0.5 + Math.random();

    return this.pixelDeltaU
      .multiplyByNum(px)
      .add(this.pixelDeltaV.multiplyByNum(py));
  }

  rayColor(r: Ray, world: Hittable): Color {
    const rec = HitRecord.init();

    if (world.hit(r, new Interval(0, Infinity), rec)) {
      return rec.normal
        .toColor()
        .add(new Color(1, 1, 1))
        .multiplyByNum(0.5);
    }

    const unitDirection = r.direction.unitVector();
    const a = 0.5 * (unitDirection.y + 1.0);
    return lerpColor(new Color(1, 1, 1), new Color(0.5, 0.7, 1.0), a);
  }
}
