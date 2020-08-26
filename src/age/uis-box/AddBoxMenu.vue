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
      <div :key="group" v-for="(list, group) in market">
        <h2 class="font-title text-xl">{{ group }}</h2>
        <div :key="item.key" v-for="(item) in list" class=" cursor-pointer p-2 m-2 inline-block bg-gray-400" @click="installFromMarket(item.value)">
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
import * as Market from '../api/age-box-market'
import * as AGE from '../api/age'

export default {
  props: {
    offset: {},
    wins: {},
    connections: {}
  },
  data () {
    return {
      market: Market
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
    installFromMarket (win) {
      win = AGE.BOX.duplicateBox(win)
      win.pos.x = 30 - this.offset.x
      win.pos.y = 30 - this.offset.y
      this.wins.push(win)
      this.close()
    },
    close () {
      this.$parent.overlay = false
      this.$emit('save', true)
    }
  }
}
</script>

<style>

</style>
