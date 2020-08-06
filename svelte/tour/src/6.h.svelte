<script>
  let html = '<p>What happend today?</p>'
</script>

<!-- HTML tags -->
<main>
  <h2>6.8</h2>
  <div contenteditable="true" bind:innerHTML={html}></div>
  <pre>{html}</pre>
</main>

<style>
[contenteditable] {
  padding: 0.5em;
  border: 1px solid #eee;
  border-radius: 4px;
}
</style>
