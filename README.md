# astar-py

![Pathfinding A* Star](./pathfinding-astar.png)
*Image from [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Pathfinding_A_Star.svg)*

A* is an informed search algorithm, or a best-first search.

## How it works
Starting from a specific starting node of a graph, it looks to find the path to the given end node position with the least distance travelled. It does this by maintaining a tree of paths originating at the start node and extending those paths one edge at a time until its termination criterion is satisfied.
At each iteration of its main loop, A* needs to determine which of its paths to extend. It does so based on the cost of the path and an estimate of the cost required to extend the path all the way to the goal.

f(n) = g(n) + h(n)

