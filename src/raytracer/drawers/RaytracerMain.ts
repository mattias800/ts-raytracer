import { Vec3 } from "../../common/raytracer/Vec3.ts";
import { HittableList } from "../../common/raytracer/hittables/HittableList.ts";
import { Sphere } from "../../common/raytracer/hittables/Sphere.ts";
import { Camera } from "../../common/raytracer/Camera.ts";

export const main = () => {
  const world = new HittableList([
    new Sphere(new Vec3(0, 0, -1), 0.5),
    new Sphere(new Vec3(0, -100.5, -1), 100),
  ]);

  const cam = new Camera();
  cam.render(world);
};
