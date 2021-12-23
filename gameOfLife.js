class GameOfLife {
  constructor() {
    this.points = [];
  }

  isAlive = (point) =>
    this.points.map(([x, y]) => x == point[0] && y == point[1]).includes(true);

  getNeighbours(point) {
    let neighbours = [];

    for (let y = -1; y < 2; y++) {
      for (let x = -1; x < 2; x++) {
        neighbours.push([point[0] + x, point[1] + y]);
      }
    }

    neighbours.splice(4, 1);
    return neighbours;
  }

  checkPoint(point) {
    const neighbours = this.getNeighbours(point);

    let neighboursAlive = 0;
    for (const neighbour of neighbours)
      if (this.isAlive(neighbour)) neighboursAlive++;

    if (!this.isAlive(point)) return neighboursAlive == 3;

    if (neighboursAlive == 2 || neighboursAlive == 3) return true;
    return false;
  }

  nextTurn() {
    let newPoints = [];
    let pointsToCheck = [];

    for (const point of this.points)
      for (const neighbour of this.getNeighbours(point))
        if (
          !pointsToCheck
            .map(([x, y]) => x == neighbour[0] && y == neighbour[1])
            .includes(true)
        )
          pointsToCheck.push(neighbour);

    for (const point of pointsToCheck) {
      if (this.checkPoint(point)) newPoints.push(point);
    }
    this.points = newPoints;
  }
}

board = new GameOfLife();

board.points = [
  [0, 0],
  [0, 1],
  [0, -1],
  [1, 0],
  [2, 1],
];

for (let i = 0; i < 1000; i++) {
  board.nextTurn();
  console.log(board.points);
}
