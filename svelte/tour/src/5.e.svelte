<script>
  import Inner from './5.d.svelte'
  import { createEventDispatcher } from 'svelte'

  import InnerShort from './5.d.svelte'

  const dispatch = createEventDispatcher()

  // event forwarding

  function forward(e) {
    console.log('intermediate components ...')
    dispatch('message', e.detail)
  }
</script>

<!-- <Inner on:message={forward}/> -->

<InnerShort on:message />
