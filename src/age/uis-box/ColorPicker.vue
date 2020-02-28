<template>
  <Chrome @input="onInput" v-model="colors" style="width: 100%; height: 100%;"></Chrome>
</template>

<script>
import { Chrome } from 'vue-color'
export default {
  props: {
    win: {}
  },
  data () {
    return {
      colors: {
        hex: this.win.color || '#cccccc'
      }
    }
  },
  components: {
    Chrome
  },
  methods: {
    onInput () {
      this.win.color = this.colors.hex
      window.dispatchEvent(new Event('save-delay'))
      window.dispatchEvent(new Event('update-ui'))
    }
  }
}
</script>

<style scoped>

</style>
