export const createGridArray = () => {
  const result = [];

  for (let i = 0; i < 10; i++) {
    result[i] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  }
  return result;
};
