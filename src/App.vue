<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>


</template>

<script>
import { onMounted } from '@vue/runtime-core'
import HelloWorld from './components/HelloWorld.vue'
import 'whatwg-fetch'

export default {
  setup() {
    // function testCall() {
    //   fetch('/api/test')
    //   .then(function(response) {
    //     console.log(response)
    //     console.log(response.json())
    //     // return response.text()
    //   }).then(function(body) {
    //     document.body.innerHTML = body
    //   })
    // }

    onMounted(() => {
      // testCall()
    })
  },
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
