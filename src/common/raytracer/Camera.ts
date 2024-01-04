import { Hittable } from "./hittables/Hittable.ts";
import { Ray } from "./Ray.ts";
import { Color, colors } from "./Color.ts";
import { Interval } from "./Interval.ts";
import { lerpColor } from "./Lerp.ts";
import { Vec3 } from "./Vec3.ts";
import { drawColorSamples } from "../canvas/Canvas.ts";
import { HitRecord } from "./hittables/HitRecord.ts";
import { degreesToRadians } from "./MathUtils.ts";

export class Camera {
  public aspectRatio = 16.0 / 9.0;
  public imageWidth = 400;
  public samplesPerPixel = 100;
  public maxDepth = 10;

  public vfov = 90; // Vertical FOV
  public lookFrom = new Vec3(0, 0, -1);
  public lookAt = new Vec3(0, 0, 0);
  public vup = new Vec3(0, 1, 0);

  public defocusAngle = 0; // Variation angle of rays through each pixel
  public focusDistance = 10; // Distance from the camera lookFrom point to plane of perfect focus

  render(world: Hittable) {
    const start = new Date().getTime();
    this.initialize();

    for (let j = 0; j < this.imageHeight; ++j) {
      for (let i = 0; i < this.imageWidth; ++i) {
        let pixelColor = new Color(0, 0, 0);

        for (let sample = 0; sample < this.samplesPerPixel; sample++) {
          const r = this.getRay(i, j);
          pixelColor = pixelColor.add(this.rayColor(r, this.maxDepth, world));
        }

        drawColorSamples(i, j, pixelColor, this.samplesPerPixel);
      }
    }
    const end = new Date().getTime();
    console.log("Render took " + (end - start) + " ms.");
  }

  private imageHeight: number = 0; // Rendered image height
  private center = Vec3.zero(); // Camera center
  private pixel00Loc = Vec3.zero(); // Location of pixel 0,0
  private pixelDeltaU = Vec3.zero(); // Offset to pixel to the right
  private pixelDeltaV = Vec3.zero(); // Offset to pixel below

  private u = Vec3.zero(); // Camera frame basis vectors
  private v = Vec3.zero();
  private w = Vec3.zero();

  private defocusDiskU = Vec3.zero();
  private defocusDiskV = Vec3.zero();

  initialize() {
    this.imageHeight = Math.max(1, this.imageWidth / this.aspectRatio);
    this.center = this.lookFrom;

    const theta = degreesToRadians(this.vfov);
    const h = Math.tan(theta / 2);
    const viewportHeight = 2.0 * h * this.focusDistance;
    const viewportWidth = viewportHeight * (this.imageWidth / this.imageHeight);

    // Calculate the u,v,w unit basis vectors from the camera coordinate frame.
    this.w = this.lookFrom.sub(this.lookAt).unitVector();
    this.u = this.vup.cross(this.w).unitVector();
    this.v = this.w.cross(this.u);

    const viewportU = this.u.multiplyByNum(viewportWidth);
    const viewportV = this.v.negative().multiplyByNum(viewportHeight);

    // Calculate the horizontal and vertical delta vectors to the next pixel.
    this.pixelDeltaU = viewportU.divideByNum(this.imageWidth);
    this.pixelDeltaV = viewportV.divideByNum(this.imageHeight);

    // Calculate the location of the upper left pixel.
    const viewportUpperLeft = this.center
      .sub(this.w.multiplyByNum(this.focusDistance))
      .sub(viewportU.divideByNum(2))
      .sub(viewportV.divideByNum(2));

    this.pixel00Loc = viewportUpperLeft.add(
      this.pixelDeltaU.add(this.pixelDeltaV).multiplyByNum(0.5),
    );

    // Calculate the camera defocus disk basis vectors
    const defocusRadius =
      this.focusDistance * Math.tan(degreesToRadians(this.defocusAngle / 2));
    this.defocusDiskU = this.u.multiplyByNum(defocusRadius);
    this.defocusDiskV = this.v.multiplyByNum(defocusRadius);
  }

  getRay(i: number, j: number): Ray {
    // Get a randomly-sampled camera ray for the pixel at location i,j,
    // originating from the camera defocus disk.

    const pixelCenter = this.pixel00Loc
      .add(this.pixelDeltaU.multiplyByNum(i))
      .add(this.pixelDeltaV.multiplyByNum(j));

    const pixelSample = pixelCenter.add(this.pixelSampleSquare());

    const rayOrigin =
      this.defocusAngle <= 0 ? this.center : this.defocusDiskSample();
    const rayDirection = pixelSample.sub(rayOrigin);

    return new Ray(rayOrigin, rayDirection);
  }

  defocusDiskSample(): Vec3 {
    const p = Vec3.randomInUnitDisk();
    return this.center
      .add(this.defocusDiskU.multiplyByNum(p.x))
      .add(this.defocusDiskV.multiplyByNum(p.y));
  }

  pixelSampleSquare(): Vec3 {
    const px = -0.5 + Math.random();
    const py = -0.5 + Math.random();

    return this.pixelDeltaU
      .multiplyByNum(px)
      .add(this.pixelDeltaV.multiplyByNum(py));
  }

  rayColor(r: Ray, depth: number, world: Hittable): Color {
    if (depth <= 0) {
      return colors.black;
    }

    const rec = HitRecord.init();

    if (world.hit(r, new Interval(0.001, Infinity), rec)) {
      const scattered = Ray.init();
      const attenuation = new Color(0, 0, 0);

      if (rec.material.scatter(r, rec, attenuation, scattered)) {
        return this.rayColor(scattered, depth - 1, world).multiply(attenuation);
      }

      return new Color(0, 0, 0);
    }

    const unitDirection = r.direction.unitVector();
    const a = 0.5 * (unitDirection.y + 1.0);
    return lerpColor(new Color(1, 1, 1), new Color(0.5, 0.7, 1.0), a);
  }
}
