class Node:
    def __init__(self, parent=None, position=None):
        self.position = position
        self.parent = parent
        self.H = 0
        self.G = 0
        self.F = 0
