<script>
  import GameOfLife from "./gameOfLife.js";
  import Cell from "./Cell.svelte";

  let game = new GameOfLife();
  game.points = [
    [-1, 0],
    [0, 0],
    [1, 0],
  ];

  let running = false;
  let currentPoints = game.points;
  let topleft = [0, 0];
  let bottomRight = [0, 0];
  [topleft, bottomRight] = getExtremePoints();

  function getExtremePoints() {
    const xs = currentPoints.map(([x, y]) => x);
    const ys = currentPoints.map(([x, y]) => y);

    let newTopleft = [Math.min(...xs), Math.max(...ys)];
    let newBottomRight = [Math.max(...xs), Math.min(...ys)];

    newTopleft = [
      Math.min(topleft[0], newTopleft[0]),
      Math.max(topleft[1], newTopleft[1]),
    ];
    newBottomRight = [
      Math.max(bottomRight[0], newBottomRight[0]),
      Math.min(bottomRight[1], newBottomRight[1]),
    ];

    return [newTopleft, newBottomRight];
  }

  function incrementTurn() {
    game.nextTurn();
    currentPoints = game.points;
    [topleft, bottomRight] = getExtremePoints();
  }

  function switchCell(event) {
    game.switchCell(event.detail.x, event.detail.y, event.detail.alive);
    currentPoints = game.points;
    [topleft, bottomRight] = getExtremePoints();
  }

  function range(min, max) {
    var len = max - min + 1;
    var arr = new Array(len);
    for (var i = 0; i < len; i++) {
      arr[i] = min + i;
    }
    return arr;
  }

  async function run() {
    incrementTurn();
    if (running)
      setTimeout(() => {
        run();
      }, 100);
  }

  function toggleRun() {
    running = !running;
    if (running) run();
  }
</script>

<div id="shadow">
  <div id="floating">
    <button id="run" on:click={toggleRun}>{running ? "Stop" : "Run"}</button>
    <button id="increment" on:click={incrementTurn}>Increment Turn</button>
  </div>
  {#each range(bottomRight[1] - 1, topleft[1] + 1) as y}
    <div id="column">
      {#each range(topleft[0] - 1, bottomRight[0] + 1) as x}
        <Cell
          {x}
          {y}
          alive={currentPoints
            .map(([cellX, cellY]) => x == cellX && y == cellY)
            .includes(true)}
          on:switchCell={switchCell}
        />
      {/each}
    </div>
  {/each}
</div>

<style>
  :global(body) {
    padding: 0;
  }

  #shadow {
    width: 100%;
    height: 100%;
    box-shadow: inset 0px 0px 20px 10px white;
    position: relative;
  }

  #column {
    display: flex;
    flex-direction: row;
  }

  #floating {
    position: fixed;
    bottom: 0;
    left: 0;
  }
</style>
