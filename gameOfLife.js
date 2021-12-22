class GameOfLife {
  constructor() {
    this.points = {};
  }

  equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);

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
    const xPoints = this.points.keys();
    for (const neighbour of neighbours) {
      // console.log(this.points.map((p) => this.equals(p, neighbour)));
      if (xPoints.includes(neighbour[0]))
        if (
          this.points
            .filter(x, (y) => x == neighbour[0])
            .values()
            .includes(neighbour[1])
        )
          neighboursAlive++;
    }

    if (neighboursAlive == 2 || neighboursAlive == 3) return true;
    return false;
  }

  nextTurn() {
    let xPoints = this.points.map((x, y) => x);
    let yPoints = this.points.map((x, y) => y);

    let topLeftPoint = [Math.min(...xPoints) - 1, Math.max(...yPoints) + 1];
    let bottomRightPoint = [Math.max(...xPoints) + 1, Math.min(...yPoints) - 1];

    for (let y = topLeftPoint[1]; y >= bottomRightPoint[1]; y--) {
      for (let x = topLeftPoint[0]; x <= bottomRightPoint[0]; x++) {
        let pointAlive = this.checkPoint([x, y]);

        if (pointAlive) {
          this.points[x];
        } else if (this.points.includes([x, y])) {
          i = this.points.indexOf([x, y]);
          this.points.splice(index, 1);
        }

        this.points = [...new Set(this.points)];
      }
    }
  }
}

board = new GameOfLife();

board.points = [
  [0, 0],
  [0, 1],
  [0, -1],
];

for (let i = 0; i < 20; i++) {
  board.nextTurn();
  // console.log(board.points);
  console.log(i);
}
