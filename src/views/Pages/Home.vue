<template>
  <div class="full bg-area">
    <hsc-menu-style-metal style="position: fixed; z-index: 2;">
      <hsc-menu-bar style="border-radius: 0 0 4pt 0">
        <hsc-menu-bar-item label="Number">
          <hsc-menu-item label="New Random Number" keybind="alt+n" @click="newRandomNumber" />
          <!-- <hsc-menu-item label="Clear" keybind="alt+k" @click="numberWindows=[]" /> -->
        </hsc-menu-bar-item>
        <hsc-menu-bar-item label="Windows">
          <hsc-menu-item v-for="w of numberWindows" :key="w.id" :label="w.label" @click="w.isOpen=!w.isOpen" :checked="w.isOpen" />
        </hsc-menu-bar-item>
      </hsc-menu-bar>
    </hsc-menu-style-metal>

    <hsc-window-style-metal style="position: fixed; z-index: 1">
      <hsc-window :resizable="true" v-for="w of numberWindows" :width="w.width" :height="w.height" :key="w.id" :title="w.label" :closeButton="true" :isOpen.sync="w.isOpen">
        <div class="box-content">
          {{ w.n }}
        </div>
      </hsc-window>
    </hsc-window-style-metal>
  </div>
</template>

<script>
import * as _ from 'lodash'

class WinBox {
  static id = 0
  constructor ({ id = WinBox.id++ }) {
    this.id = id
    this.n = this.id
    this.width = 200
    this.height = 200
    this.isOpen = true
  }

  get label () {
    return `Number - ${this.id}`
  }
}

export default {
  data () {
    return {
      numberWindows: _.range(3).map(i => new WinBox({}))
    }
  },
  methods: {
    newRandomNumber () {
      this.numberWindows.push(new WinBox({}))
    }
  }
}
</script>

<style scoped>
/* table {
  white-space: nowrap;
  border-spacing: 0.5em;
}
td,
th {
  text-align: center;
  padding: 1em;
  box-shadow: 0 0 4pt rgba(0, 0, 0, 0.25);
  background-color: #eee;
  border-radius: 4pt;
} */

.box-content{
  width: 100%;
  height: 100%;
  background-color: white;
}

.bg-area{
  background-image: linear-gradient(0deg, gray, white);
}
</style>
