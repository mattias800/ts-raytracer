import * as React from "react";
import { useEffect } from "react";
import { initCanvas } from "../common/canvas/Canvas.ts";
import { main } from "./drawers/RaytracerMain.ts";

export interface RaytracerPanelProps {}

export const RaytracerPanel: React.FC<RaytracerPanelProps> = () => {
  useEffect(() => {
    initCanvas();
    main();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <canvas id={"ray-canvas"} width={1200} height={675}></canvas>
    </div>
  );
};
