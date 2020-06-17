<!-- 4. Logic -->

<script>
  let user = { loggedIn: false, ok: false }

  function toggle() {
    user.loggedIn = !user.loggedIn
  }


  function toggleOK() {
    user.ok = !user.ok
  }


  let number = 7


  let cats = [
		{ id: 'J---aiyznGQ', name: 'Keyboard Cat' },
		{ id: 'z_AbfPXTKms', name: 'Maru' },
		{ id: 'OUtn3pvWmpg', name: 'Henri The Existential Cat' }
	];


  import Thing from './4.e.thing.svelte'
  let things = [
    {id:1, color: '#0d0887'},
    {id:2, color: '#6a00a8'},
    {id:3, color: '#b12a90'},
    {id:4, color: '#e16462'},
    {id:5, color: '#fca636'}
  ]

  function removeThing() {
    things = things.slice(1)
  }


  let promise = getRandomNumber()

  async function getRandomNumber() {
    const res = await fetch('https://svelte.dev/tutorial/random-number')
    const text = await res.text()

    if (res.ok) {
      return text
    } else {
      throw new Error(text)
    }
  }

  function startFetch() {
    promise = getRandomNumber()
  }
</script>

<!-- HTML tags -->
<main>
  {#if user.loggedIn}
    <button on:click={toggle}>
      Log out
    </button>
  {/if}

  {#if !user.loggedIn}
    <button on:click={toggle}>
      Log in 
    </button>
  {/if}


  {#if user.ok}
    <p on:click={toggleOK}>Just OK</p>
  {:else}
    <p on:click={toggleOK}>Not OK</p>
  {/if}


  {#if number > 10}
  <p>{number} is greater than 10</p>
  {:else if 5 > number}
  <p>{number} is less than 5</p>
  {:else}
  <p>{number} is between 5 and 10</p>
  {/if}


  <h1>Famous Cats on Youtube</h1>
  <ul>
    {#each cats as {id, name}, i}
    <li>
      {i}. <a target='_blank' href='https://www.youtube.com/watch?v={id}'>
        {name}
      </a>
    </li>
    {/each}
  </ul>


  <button on:click={removeThing}>
    Remove first thing
  </button>

  {#each things as thing}
  <Thing current={thing.color}/>
  {/each}


  <button on:click={startFetch}>
    generate RandomNumber
  </button>

  {#await promise}
  <p>...fetching</p>
  {:then number}
  <p>The result is {number}</p>
  {:catch error}
  <p style="color: red">{error.message}</p>
  {/await}
</main>

<style>
</style>
