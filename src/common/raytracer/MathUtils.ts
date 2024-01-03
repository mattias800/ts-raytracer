export const degreesToRadians = (degrees: number): number =>
  (degrees * Math.PI) / 180.0;

export const getRandom = (min: number, max: number): number => {
  return min + (max - min) * Math.random();
};
