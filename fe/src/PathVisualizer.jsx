import { useState } from "react";
import { createGridArray, styleSelectedNode } from "./Node/helper";
import Node from "./Node/Node";

const PathVisualizer = () => {
  const [grid, setGrid] = useState(createGridArray());
  const [solution, setSolution] = useState(null);
  const start = [1, 5];
  const end = [8, 5];

  const getAStarSolution = async () => {
    fetch("http://127.0.0.1:5000/api/astar", {
      method: "POST",
      body: JSON.stringify({
        start: start,
        end: end,
        grid: grid,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
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

  const reset = () => {
    setGrid(createGridArray());
    setSolution(null);
  };

  return (
    <div>
      {grid.map((nodes, gridIx) => {
        return (
          <div key={gridIx} className="grid">
            {nodes.map((node, i) => {
              const value = [i, gridIx];
              return (
                <div key={value} onClick={(e) => onNodeClick(e, value)}>
                  <Node
                    classValue={styleSelectedNode(
                      value,
                      grid,
                      start,
                      end,
                      solution
                    )}
                  />
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
