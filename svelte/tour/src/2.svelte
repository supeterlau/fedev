<!-- 2. Reactivity -->

<script>
  let count = 0

  function handleClick() {
    count += 1
  }


  $: doubled = count * 2


  $: if (count >= 10) {
    alert(`count is too high!`)
    count = 9
  }


  let numbers =[1,2,3,4]

  function addNumber() {
    // numbers.push(numbers.length + 1)
    // fix 1:
    // numbers = numbers
    // fix 2:
    numbers = [...numbers, numbers.length+1]
  }

  $: sum = numbers.reduce((t,n) => t + n, 0)
</script>

<!-- HTML tags -->

<button on:click={handleClick}>
  Clicked {count} {count === 1 ? 'time' : 'times'}
</button>


<p> { count } doubled is {doubled}</p>


<p>{numbers.join(' + ')} = {sum}</p>
<button on:click={addNumber}>
  Add a number
</button>


<style></style>
