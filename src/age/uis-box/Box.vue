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
  <div class="win-wrap bg-white rounded-lg" :style="getBoxLayoutStyle()" @click="focusApp">
    <BoxDefault @gear="$emit('gear', $event)" @drop="$emit('drop', $event)" @clicker="$emit('clicker', $event)" :connections="connections" :win="win" :previewDOMs="previewDOMs" :connectorDOMs="connectorDOMs"></BoxDefault>
    <div v-if="useResize" class="win-resize win-box-top-left" ref="top-left"></div>
    <div v-if="useResize" class="win-resize win-box-top-right" ref="top-right"></div>
    <div v-if="useResize" class="win-resize win-box-bottom-left" ref="bottom-left"></div>
    <div v-if="useResize" class="win-resize win-box-bottom-right" ref="bottom-right"></div>
  </div>
</template>

<script>
import * as AGE from '../api/age'

export default {
  components: {
    BoxDefault: require('./BoxDefault.vue').default
  },
  props: {
    offset: {},
    type: {},
    win: {},
    wins: {},
    connections: {},
    previewDOMs: {},
    connectorDOMs: {}
  },
  data () {
    return {
      useResize: false,
      ready: false,
      omg: 0
    }
  },
  watch: {
    'win.resize' () {
      if (this.win.resize) {
        this.enableResize({ subCompo: this })
      }
    }
  },
  methods: {
    enableResize ({ subCompo }) {
      this.useResize = true
      this.$nextTick(() => {
        const makeDrag = AGE.UI.makeDrag

        const resize = () => {
          window.dispatchEvent(new Event('plot'))
          window.dispatchEvent(new Event('resize'))
          window.dispatchEvent(new Event('delay-save'))
        }

        makeDrag({
          dom: this.$refs['top-left'],
          onMM: ({ api }) => {
            this.win.pos.x += api.dX
            this.win.pos.y += api.dY
            this.win.pos.w -= api.dX
            this.win.pos.h -= api.dY

            if (this.win.pos.w < 76) {
              this.win.pos.w = 76
            }
            // if (this.win.pos.h < 86) {
            //   this.win.pos.h = 86
            // }
            resize()
          }
        })

        makeDrag({
          dom: this.$refs['top-right'],
          onMM: ({ api }) => {
            // this.win.pos.x += api.dX
            this.win.pos.y += api.dY
            this.win.pos.w += api.dX
            this.win.pos.h -= api.dY

            if (this.win.pos.w < 76) {
              this.win.pos.w = 76
            }
            // if (this.win.pos.h < 86) {
            //   this.win.pos.h = 86
            // }
            resize()
          }
        })

        makeDrag({
          dom: this.$refs['bottom-right'],
          onMM: ({ api }) => {
            // this.win.pos.x += api.dX
            // this.win.pos.y += api.dY
            this.win.pos.w += api.dX
            this.win.pos.h += api.dY

            if (this.win.pos.w < 76) {
              this.win.pos.w = 76
            }
            // if (this.win.pos.h < 86) {
            //   this.win.pos.h = 86
            // }
            resize()
          }
        })

        makeDrag({
          dom: this.$refs['bottom-left'],
          onMM: ({ api }) => {
            this.win.pos.x += api.dX
            // this.win.pos.y += api.dY
            this.win.pos.w -= api.dX
            this.win.pos.h += api.dY

            if (this.win.pos.w < 76) {
              this.win.pos.w = 76
            }
            // if (this.win.pos.h < 86) {
            //   this.win.pos.h = 86
            // }
            resize()
          }
        })
      })
    },
    // { _id: omg, val: omg, io: 'input', type: 'sampler2D', label: 'vec4' }
    focusApp () {
      this.$emit('click')
      // AGE.UI.getDOM({ wins: this.wins, win: this.win })
    },
    getTitleStyle () {
      const types = AGE.boxColorTypes
      return {
        color: 'white',
        textShadow: 'rgb(37, 37, 37) 0px 0px 3px',
        backgroundImage: types[this.win.boxColor] || ''
      }
    },
    getHeight () {
      let h = 0
      h += this.win.previewType ? 300 : 0
      h += this.win.NodeClass === 'ColorNode' ? 215 : 0
      h += this.win.NodeClass === 'FloatNode' ? 40 : 0
      h += this.win.NodeClass === 'TextureNode' ? 170 : 0
      return h
    },
    getBoxLayoutStyle () {
      return {
        position: 'absolute',
        top: '0px',
        left: '0px',
        width: `${this.win.pos.w}px`,
        height: `${this.win.pos.h + (this.getHeight())}px`,
        minHeight: `calc(${26}px)`,
        minWidth: `calc(${100}px)`,
        transform: `translate3d(${this.offset.x + this.win.pos.x}px, ${this.offset.y + this.win.pos.y}px, 1px)`
      }
    },
    setupSubCompo ({ subCompo }) {
      const makeDrag = AGE.UI.makeDrag
      makeDrag({
        dom: subCompo.$refs['win-title'],
        onMM: ({ api }) => {
          this.win.pos.x += api.dX
          this.win.pos.y += api.dY

          window.dispatchEvent(new Event('plot'))
        }
      })
    }
  },
  mounted () {
    this.ready = true
    if (this.win.resize) {
      this.enableResize({ subCompo: this })
    }
  }
}
</script>

<style>

</style>
