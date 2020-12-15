<template>
  <div>{{dataReady}}</div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'async-menu',
  async setup() {
    const dataReady = ref(false)
    dataReady.value = await new Promise((resolve) => {
      setTimeout(() => {
        return resolve(true)
      }, 3000)
    })
    return {
      dataReady
    }
  }
}
</script>

<style>

</style>
