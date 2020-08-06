<!-- 5. Events -->

<script>
  // test typescript support
  // function loggingIdentity<T>(arg: T[]): T[] {
  //   console.log(arg.length);  // Array has a .length, so no more error
  //   return arg;
  // }
  // import './base.css'

  import Inner from './5.d.svelte'

  import Outer from './5.e.svelte'

  import CustomButton from './CustomButton.svelte'

  let m = {x:0,y:0}

  function handleMouseMove(e) {
    m.x = e.clientX
    m.y = e.clientY
  }
  

  let inlineM = {x:0,y:0}

  function handleClick() {
    console.log('clicked', Date.now())
    // loggingIdentity()
  }

  function handleMessage(e) {
    console.log(e.detail)
  }

</script>

<!-- HTML tags -->
<main>
  <div id='move' on:mousemove={handleMouseMove}>
    The mouse position is {m.x} x {m.y}
  </div>


  <div style="width: 100px; height: 100px; border: 1px solid gray" on:mousemove="{e => inlineM = {x: e.clientX, y: e.clientY}}">
    100px: The mouse position is {inlineM.x} x {inlineM.y}
  </div>

  <button on:click={handleClick}>
    Click me any times
  </button>

  <button on:click|once={handleClick}>
    Click me only once
  </button>

  <Inner on:message={handleMessage}></Inner>

  <div>
    <Outer on:message={handleMessage}></Outer>
  </div>

    <CustomButton on:click={handleClick} />

  <div class="app">
  <div class="px-5 bg-green-300 box">
    <div>TS Timer</div>
    <div>Rx Timer</div>
  </div>
</div>
</main>

<style>
#move{
  width: 200px;
  height: 200px;
  border: 1px solid black;
}
</style>
