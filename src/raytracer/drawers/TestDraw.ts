import { drawColor } from "../../common/canvas/Canvas.ts";
import { Color } from "../../common/raytracer/Color.ts";

export const testDraw = () => {
  for (let j = 0; j < 256; j++) {
    for (let i = 0; i < 256; i++) {
      const r = i / (256 - 1);
      const g = j / (256 - 1);
      const b = 0;

      drawColor(i, j, new Color(r, g, b));
    }
  }
};
