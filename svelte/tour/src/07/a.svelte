<script>
  import { onMount } from "svelte";
  let photos = [];

  onMount(async () => {
    let url = `https://jsonplaceholder.typicode.com/photos?_limit=20`;
    const res = await fetch(url);
    photos = await res.json();
  });
</script>

<style>
  .photos {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 8px;
  }

  figure,
  img {
    width: 100%;
    margin: 0;
  }
</style>

<main>
  <h1>Photo Album</h1>
  <div class="photos">
    {#each photos as photo}
    <figure>
      <img src="{photo.thumbnailUrl}" alt="{photo.title}" />
      <figcaption>{photo.title}</figcaption>
    </figure>
    {:else}
    <p>Loading...</p>
    {/each}
  </div>
</main>
