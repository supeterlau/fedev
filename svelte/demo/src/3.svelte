<!-- 3. Props -->

<script>
  import Nested from './3.a.nested.svelte'

  import Info from'./3.c.info.svelte'

  const pkg = {
    name: 'svelte',
    version: 3,
    speed: 'blazing',
    website: 'https://svelte.dev'
  }
</script>

<!-- HTML tags -->
<main>
  <Nested answer={1000}/>

  <Nested/>

  <Nested hello={"world"}/>

  <Info {...pkg}/>
</main>

<style>
</style>
