<script>
  import marked from 'marked'

  let value = `SOME words are *italic*, some are **bold**`
</script>

<!-- HTML tags -->
<main>
  <h2>6.5</h2>
  <textarea bind:value></textarea>
  {@html marked(value)}
</main>

<style>
textarea {
  width: 100%;
  height: 200px;
}
</style>
