<template>
  <div class="posabs top-right">
    <button class="p-3 py-2 mx-1 border bg-gray-300" @click="$parent.overlay = 'add-module'">+</button>
    <button class="p-3 py-2 mx-1 border bg-gray-300" @click="$parent.goHome()">Home</button>
    <button class="p-3 py-2 mx-1 border bg-gray-300" @click="$parent.copy()">Copy</button>
    <button class="p-3 py-2 mx-1 border bg-gray-300" @click="$parent.onReset()">Reset</button>
    <!-- <button class="p-3 py-2 mx-1 border bg-gray-300" @click="onRunDB()">RunDB</button> -->
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
