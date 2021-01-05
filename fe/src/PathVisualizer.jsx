import { useState } from "react";
import { createGridArray } from "./Node/helper";
import Node from "./Node/Node";

const PathVisualizer = () => {
  const [grid, setGrid] = useState(createGridArray());
  const start = [3, 10];
  const end = [17, 10];

  const styleSelectedNode = (value) => {
    const x = value[0];
    const y = value[1];

    if (start[0] === x && start[1] === y) {
      return "start";
    } else if (end[0] === x && start[1] === y) {
      return "end";
    } else if (grid[x][y] === 1) {
      return "selected";
    }

    return "";
  };

  const onNodeClick = (e, value) => {
    e.preventDefault();
    const x = value[0];
    const y = value[1];

    const tmpGrid = [...grid];

    if (grid[x][y] === 0) {
      tmpGrid[x][y] = 1;
    } else {
      tmpGrid[x][y] = 0;
    }
    setGrid(tmpGrid);
  };

  const reset = () => setGrid(createGridArray());

  return (
    <div>
      {grid.map((nodes, gridIx) => {
        return (
          <div key={gridIx} className="grid">
            {nodes.map((node, i) => {
              const value = [i, gridIx];
              return (
                <div key={value} onClick={(e) => onNodeClick(e, value)}>
                  <Node classValue={styleSelectedNode(value)} />
                </div>
              );
            })}
          </div>
        );
      })}
      <button>A* Algorithm</button>
      <button onClick={reset}>reset</button>
    </div>
  );
};

export default PathVisualizer;
