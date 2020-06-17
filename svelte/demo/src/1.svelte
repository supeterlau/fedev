<script>
  import Nested from './1.e.nested.svelte'
  let name = 'Good'
  let src = 'https://svelte.dev/tutorial/image.gif'
  let rawHTML = `there are some HTML <strong>Attack</strong>`
</script>

<h1>Hello World</h1>
<hr>
<h1>Hello {name}</h1>
<hr>
<img src={src} alt="image">
<hr>
<p>Example paragraph.</p>
<hr>
<Nested/>
<hr>
<p>{rawHTML}</p>
<p>{@html rawHTML}</p>

<style>
p {
  color: purple;
  font-family: 'Comic Sans MS', cursive;
  font-size: 2em;
}
</style>
