import { useState } from "react";
import { createGridArray } from "./Node/helper";
import Node from "./Node/Node";

const PathVisualizer = () => {
  const [grid, setGrid] = useState(createGridArray());
  const [solution, setSolution] = useState(null);
  const start = [3, 5];
  const end = [7, 5];

  const styleSelectedNode = (value) => {
    const x = value[0];
    const y = value[1];


    if (start[0] === x && start[1] === y) {
      return "start";
    } else if (end[0] === x && start[1] === y) {
      return "end";
    } else if (grid[x][y] !== 0) {
      return "selected";
    }

    if (solution !== null) {
      for (let t of solution) {
        const sX = t[0];
        const sY = t[1];

        if (sX === x && sY === y) {
          return "solution";
        }
      }
    }

    return "";
  };

  const getAStarSolution = async () => {
    fetch("http://127.0.0.1:5000/api/astar", {
      method: "POST",
      body: JSON.stringify({
        start: start,
        end: end,
        grid: grid,
      }),
      headers: new Headers({
        "Content-Type": "application/json"
      }),
    })
      .then((res) => res.json())
      .then((res) => setSolution(res));
  };

  const onNodeClick = (e, value) => {
    e.preventDefault();
    setSolution(null);
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
      <button className="btn btn-primary" onClick={getAStarSolution}>
        A* Algorithm
      </button>
      <button className="btn btn-danger" onClick={reset}>
        Reset
      </button>
    </div>
  );
};

export default PathVisualizer;
