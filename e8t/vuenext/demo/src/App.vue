<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3.0 + Vite" /> -->
  <CRUDUser />
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import CRUDUser from './components/CRUDUser.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    CRUDUser
  }
}
</script>
