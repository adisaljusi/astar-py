export const createGridArray = () => {
  const result = [];

  for (let i = 0; i < 10; i++) {
    result[i] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  }
  return result;
};

export const styleSelectedNode = (value, grid, start, end, solution) => {
  const x = value[0];
  const y = value[1];

  if (start[0] === x && start[1] === y) {
    return "start";
  } else if (end[0] === x && start[1] === y) {
    return "end";
  } else if (grid[x][y] !== 0) {
    return "selected";
  } else if (solution !== null) {
    for (let node of solution) {
      const sX = node[0];
      const sY = node[1];

      if (sX === x && sY === y) {
        return "solution";
      }
    }
  } 

  return "";
};
