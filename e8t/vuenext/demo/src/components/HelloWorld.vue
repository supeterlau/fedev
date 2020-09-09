<template>
  <h1>{{ msg }}</h1>
  <button class="btn" @click="count++">count is: {{ count }}</button>
  <p>Edit <code>components/HelloWorld.vue</code> to test hot module replacement.</p>
</template>

<script>
import '@ajusa/lit'
// import '@zencss/vue-lit/button'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      count: 0
    }
  }
}
</script>
