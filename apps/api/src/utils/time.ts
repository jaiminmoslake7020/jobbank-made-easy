export const getCurrentTimeInSeconds = (): number => {
  const t = new Date().getTime();
  return parseInt(String(t / 1000));
};

export const isExpired = (timeInSeconds: number): boolean => {
  return timeInSeconds - getCurrentTimeInSeconds() < 0;
};
