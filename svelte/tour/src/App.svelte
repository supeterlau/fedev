<script>
  import ComponentE from './6.e.svelte'
  import ComponentF from './6.f.svelte'
  import ComponentG from './6.g.svelte'
  import ComponentH from './6.h.svelte'
  import ComponentI from './6.i.svelte'
  import ComponentJ from './6.j.svelte'
  import ComponentK from './6.k.svelte'
  import ComponentL from './6.l.svelte'
  import ComponentM from './6.m.svelte'

  let name = 'John'


  let a = 1
  let b = 2


  let isOpen = false;


  let scoops = 1;
  let flavours = ['Mint choc chip']

  let menu = [
    'Cookie and cream',
    'Mint choc chip',
    'Raspberry ripple'
  ]

  function join(flavours) {
    if(flavours.length === 1) return flavours[0]
    return `${flavours.slice(0, -1).join(', ')} and
    ${flavours[flavours.length - 1]}`;
  }
</script>

<!-- HTML tags -->
<main>
  <input value={name}>
  <input bind:value={name}>

  <h3>Your turn, {name}!</h3>

  <input type=number bind:value={a} min=0 max=10>
  <input type=range bind:value={a} min=0 max=10>

  <input type=number value={b} min=0 max=10>
  <input type=range value={b} min=0 max=10>

  <p>{a} + {b} = {a + b}</p>

  <label>
  <input type=checkbox bind:checked={isOpen}>
  Send me email
  </label>

  {#if isOpen}
  <p>Great, will send you email</p>
  {:else}
  <p>Won't send you email</p>
  {/if}
  <button disabled={!isOpen}>Subscribe</button>

  <h2>6.4</h2>
  <h3>Size</h3>
  <label>
    <input type=radio bind:group={scoops} value={1}>
    One scoop
  </label>

  <label>
    <input type=radio bind:group={scoops} value={2}>
    Two scoops
  </label>

  <label>
    <input type=radio bind:group={scoops} value={3}>
    Three scoops
  </label>

  <h3>Flavours</h3>
  {#each menu as flavour}
  <label>
    <input type=checkbox bind:group={flavours} value={flavour}>
    {flavour}
  </label>
  {/each}

  {#if flavours.length === 0}
  <p>Please select at least one flavour</p>
  {:else if flavours.length > scoops}
  <p>Can't order more flavours than scoops!</p>
  {:else}
  <p>You ordered {scoops} {scoops === 1 ? 'scoop' : 'scoops'} of {join(flavours)}</p>
  {/if}

  <ComponentE />

  <ComponentF />

  <ComponentG />

  <ComponentH />

  <ComponentI />

  <ComponentJ />

  <ComponentK />

  <ComponentL />

  <ComponentM />
</main>

<style>
</style>
