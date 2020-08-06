<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher()

  function sayHello() {
    dispatch('message', {
      text: 'Hello Dispatch'
    })
  }
</script>

<button on:click={sayHello}>
  Click to say Hello
</button>
