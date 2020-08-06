<script>
  import Keypad from './6.m.Keypad.svelte'

  let pin;

  $: view = pin ? pin.replace(/\d(?!$)/g, '•') : 'enter your pin';

  function handleSubmit() {
    console.log(`submitted ${pin}`)
  }
</script>

<!-- HTML tags -->
<main>
  <h3 style="color: {pin ? '#333' : '#ccc'}">{view}</h3>
  <Keypad bind:value={pin} on:submit={handleSubmit} />
</main>

<style>
</style>
