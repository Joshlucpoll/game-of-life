<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let x;
  export let y;
  export let alive;

  function switchCell() {
    dispatch("switchCell", {
      x: x,
      y: y,
      alive: alive,
    });
  }
</script>

<div
  id="cell"
  class={alive ? "alive" : "dead" + (x == 0 && y == 0 ? "origin " : "")}
  on:click={switchCell}
/>

<style>
  #cell {
    width: 20px;
    height: 20px;
    outline: solid black 1px;
  }

  .alive {
    background-color: black;
  }
  .dead {
    background-color: white;
  }
  .origin {
    opacity: 0.8;
    background-color: yellow;
  }
</style>
