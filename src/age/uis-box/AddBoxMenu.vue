<!--

/**
 * Copyright 2019 WONG LOK

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

 */
-->

<template>
  <div class="full age-addbox-wrap">
    <div class="age-addbox-close-plane full" @click="close()">
    </div>
    <div class="age-addbox-content scroller">
      <!-- <h1>
        Reset / Examples
      </h1> -->
      <!-- <div class="age-addbox-row">
        <div class="age-addbox-menu-item">
          <p>
            <strong>Examples (Basic)</strong>
          </p>
          <button @click="addJSONTemplate('../code-templates/t1-demo.json')">Demo</button>
        </div>
      </div> -->
      <!-- <div class="age-addbox-row">
        <div class="age-addbox-menu-item">
          <p>
            <strong>Defaults</strong>
          </p>
          <button @click="adder('makeDefaultBox')">Default Box</button>
        </div>
      </div> -->
      <div :key="group" v-for="(list, group) in market">
        <h2 class=" font-title text-xl">{{ group }}</h2>
        <div :key="item.key" v-for="(item) in list" class=" cursor-pointer p-2 m-2 inline-block bg-gray-400" @click="clone(item.value)">
          {{ item.key }}
        </div>
      </div>
    </div>
    <div class="age-addbox-close" @click="close()">
      <img src="../icons/close.svg" alt="" />
    </div>
  </div>
</template>

<script>
import * as AGE from '../api/age'

export default {
  props: {
    offset: {},
    wins: {},
    connections: {}
  },
  data () {
    return {
      market: AGE.Market
      // gorup -> items
      // list: Object.keys(AGE.Market).reduce((ac, gpKN, idx) => {
      //   const group = AGE.Market[gpKN]
      //   const items = group.map(kn => {
      //     return {
      //       key: kn,
      //       value: AGE.Market[kn]
      //     }
      //   }).sort((a, b) => {
      //     return a.key - b.key
      //   })

      //   return ac
      // }, [])
    }
  },
  mounted () {
    const close = (evt) => {
      if (evt.keyCode + '' === '27') {
        this.close()
        window.removeEventListener('keydown', close)
      }
    }
    window.addEventListener('keydown', close)
  },
  methods: {
    clone (win) {
      win = AGE.BOX.cloneModule(win)
      win.pos.x = 15
      win.pos.y = 15
      this.wins.push(win)
      this.close()
    },
    close () {
      this.$parent.overlay = false
      this.$emit('save', true)
    },
    adder (method) {
      const output = AGE.BOX[method]({ wins: this.wins })
      if (output.hasBoth) {
        output.vertex.pos.x = -this.offset.x + 30
        output.vertex.pos.y = -this.offset.y + 30
        output.fragment.pos.x = -this.offset.x + 60
        output.fragment.pos.y = -this.offset.y + 60
      } else {
        output.pos.x = -this.offset.x + 30
        output.pos.y = -this.offset.y + 30
      }
      this.close()
    },
    async loadJSON (v) {
      if (v === '../code-templates/t1-demo.json') {
        return (await import('../code-templates/t1-demo.json')).default
      }
    },
    async addJSONTemplate (str) {
      if (window.confirm('type "reset" to reset')) {
        const { wins, connections } = await this.loadJSON(str)
        console.log(wins, connections)
        this.$emit('wins', [])
        this.$emit('connections', [])
        this.$root.$forceUpdate()

        this.$nextTick(() => {
          this.$emit('wins', wins)
          this.$emit('connections', connections)
          this.close()
        })
      }
    }
  }
}
</script>

<style>

</style>
