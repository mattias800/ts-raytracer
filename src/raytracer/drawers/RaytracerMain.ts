import { Vec3 } from "../../common/raytracer/Vec3.ts";
import { HittableList } from "../../common/raytracer/hittables/HittableList.ts";
import { Sphere } from "../../common/raytracer/hittables/Sphere.ts";
import { Camera } from "../../common/raytracer/Camera.ts";
import { Lambertian } from "../../common/raytracer/materials/Lambertian.ts";
import { Color } from "../../common/raytracer/Color.ts";
import { Metal } from "../../common/raytracer/materials/Metal.ts";
import { Dielectric } from "../../common/raytracer/materials/Dielectric.ts";

export const main = () => {
  const materialGround = new Lambertian(new Color(0.8, 0.8, 0.0));
  const materialCenter = new Lambertian(new Color(0.1, 0.2, 0.5));
  const materialLeft = new Dielectric(1.5);
  const materialRight = new Metal(new Color(0.8, 0.6, 0.2), 0.0);

  const world = new HittableList([
    new Sphere(new Vec3(0.0, -100.5, -1.0), 100.0, materialGround),
    new Sphere(new Vec3(0.0, 0.0, -1.0), 0.5, materialCenter),
    new Sphere(new Vec3(-1.0, 0.0, -1.0), 0.5, materialLeft),
    new Sphere(new Vec3(-1.0, 0.0, -1.0), -0.4, materialLeft),
    new Sphere(new Vec3(1.0, 0.0, -1.0), 0.5, materialRight),
  ]);

  const cam = new Camera();
  cam.vfov = 20;
  cam.lookFrom = new Vec3(-2, 2, 1);
  cam.lookAt = new Vec3(0, 0, -1);
  cam.vup = new Vec3(0, 1, 0);
  cam.defocusAngle = 10.0;
  cam.focusDistance = 3.4;

  cam.render(world);
};
