export const getProgressAsPercent = (done: number, total: number): string => {
  const percent = Math.floor((done / total) * 100);
  return `${percent}%`;
};
