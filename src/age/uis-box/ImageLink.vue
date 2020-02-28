<template>
  <div class="bg-white">
    <input type="text" class="focus:outline-none focus:bg-gray-300 p-1 px-2 text-sm w-full border-b border-gray-400" v-model="win.src" />
    <img :src="win.src" class="w-full h-full" :alt="'Texture Image'">
  </div>
</template>

<script>
// magical
// https://api-ec2-3-91-80-85.creativecodelab.com/uploads/4451daab2ff74ac0a65309a80e8df4f6.png
export default {
  props: {
    win: {}
  },
  watch: {
    'win.src' () {
      window.dispatchEvent(new Event('update-ui'))
      window.dispatchEvent(new Event('save-delay'))
    }
  }
}
</script>

<style>

</style>
