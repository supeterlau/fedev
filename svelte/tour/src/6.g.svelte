<script>
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
  <h2>6.7</h2>
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
  <select multiple bind:value={flavours}>
    {#each menu as flavour}
    <option value={flavour}>
    {flavour}
    </option>
    {/each}
  </select>

  {#if flavours.length === 0}
  <p>Please select at least one flavour</p>
  {:else if flavours.length > scoops}
  <p>Can't order more flavours than scoops!</p>
  {:else}
  <p>You ordered {scoops} {scoops === 1 ? 'scoop' : 'scoops'} of {join(flavours)}</p>
  {/if}
</main>

<style>
</style>
