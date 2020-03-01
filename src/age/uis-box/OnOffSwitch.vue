<template>
  <div class="border p-3 mx-2 ml-0 my-1 inline-flex items-center justify-center cursor-pointer" @click="onClickArea()">
    {{ label ? label : 'Label' }}
    <div class="ml-2 h-5 w-12 inline-block border rounded-lg relative" :class="{ 'bg-green-400': switchData, 'bg-red-400': !switchData }">
      <div :class="{ 'ml-8': switchData }" class="h-5 w-5 trans border bg-white rounded-full"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {},
    label: {}
  },
  data () {
    return {
      switchData: this.value
    }
  },
  methods: {
    onClickArea () {
      this.switchData = !this.switchData
      this.$emit('input', this.switchData)
    }
  }
}
</script>

<style scoped>
.trans{
  transform: scale(1.3) translate(-1px, -1px);
}
</style>
