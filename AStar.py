from Constants import adjacent_squares
from Node import Node


def astar(grid, start, end):
    start_node = Node(None, start)
    end_node = Node(None, end)

    open_nodes = []
    closed_nodes = []

    open_nodes.append(start_node)

    while len(open_nodes) > 0:
        current_node = open_nodes[0]
        current_index = 0

        for index, item in enumerate(open_nodes):
            if item.F < current_node.F:
                current_node = item
                current_index = index

        open_nodes.pop(current_index)
        closed_nodes.append(current_node)

        if current_node == end_node:
            path = []
            current = current_node

            while current is not None:
                path.append(current.position)
                current = current.parent
            return path[::-1]

        children = generate_children(grid, current_node, closed_nodes)

        for child in children:
            for closed_child in closed_nodes:
                if child == closed_child:
                    continue

            child.G = current_node.G + 1
            child.H = (child.position[0] - end_node.position[0] ** 2) + (
                    (child.position[1] - end_node.position[1]) ** 2)
            child.F = child.G + child.H

            for open_node in open_nodes:
                if child == open_node and child.G > open_node.G:
                    continue

            open_nodes.append(child)


def generate_children(grid, current_node, closed_nodes):
    children = []

    for new_position in adjacent_squares:
        node_position = (current_node.position[0] + new_position[0], current_node.position[1] + new_position[1])

        if is_node_in_range(grid, node_position):
            continue

        if grid[node_position[0]][node_position[1]] != 0:
            continue

        new_node = Node(current_node, node_position)
        if new_node in closed_nodes:
            continue

        children.append(new_node)

    return children


def is_node_in_range(grid, node):
    grid_len = len(grid) - 1
    n0 = node[0]
    n1 = node[1]

    return n0 > grid_len or n0 < 0 or n1 > (len(grid[grid_len]) - 1) or n1 < 0
