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
  <g v-if="connection.input.type === 'vec3'">
    <path :fill="'transparent'" stroke-width="1" :stroke="getStroke('r')" stroke-linecap="round" v-if="path" :d="path" />
    <path style="transform: translateY(3px)" :fill="'transparent'" stroke-width="1" :stroke="getStroke('g')" stroke-linecap="round" v-if="path" :d="path" />
    <path style="transform: translateY(-3px)" :fill="'transparent'" stroke-width="1" :stroke="getStroke('b')" stroke-linecap="round" v-if="path" :d="path" />
  </g>
  <g v-else-if="connection.input.type === 'vec2'">
    <path style="transform: translateY(2px)" :fill="'transparent'" stroke-width="1" :stroke="getStroke('u')" stroke-linecap="round" v-if="path" :d="path" />
    <path style="transform: translateY(-2px)" :fill="'transparent'" stroke-width="1" :stroke="getStroke('v')" stroke-linecap="round" v-if="path" :d="path" />
  </g>
  <g v-else-if="connection.input.type === 'mat4'">
    <!-- <path :fill="'transparent'" stroke-width="1" :stroke="getStroke('r')" stroke-linecap="round" v-if="path" :d="path" /> -->
    <path :style="`transform: translateY(${1 * 3 - 8}px)`" :fill="'transparent'" stroke-width="1" :stroke="getStroke('ccc')" stroke-linecap="round" v-if="path" :d="path" />
    <path :style="`transform: translateY(${2 * 3 - 8}px)`" :fill="'transparent'" stroke-width="1" :stroke="getStroke('ccc')" stroke-linecap="round" v-if="path" :d="path" />
    <path :style="`transform: translateY(${3 * 3 - 8}px)`" :fill="'transparent'" stroke-width="1" :stroke="getStroke('ccc')" stroke-linecap="round" v-if="path" :d="path" />
    <path :style="`transform: translateY(${4 * 3 - 8}px)`" :fill="'transparent'" stroke-width="1" :stroke="getStroke('ccc')" stroke-linecap="round" v-if="path" :d="path" />
  </g>
  <g v-else-if="connection.input.type === 'vec4'">
    <!-- <path :fill="'transparent'" stroke-width="1" :stroke="getStroke('r')" stroke-linecap="round" v-if="path" :d="path" /> -->
    <path :style="`transform: translateY(${1 * 3 - 8}px)`" :fill="'transparent'" stroke-width="1" :stroke="getStroke('r')" stroke-linecap="round" v-if="path" :d="path" />
    <path :style="`transform: translateY(${2 * 3 - 8}px)`" :fill="'transparent'" stroke-width="1" :stroke="getStroke('g')" stroke-linecap="round" v-if="path" :d="path" />
    <path :style="`transform: translateY(${3 * 3 - 8}px)`" :fill="'transparent'" stroke-width="1" :stroke="getStroke('b')" stroke-linecap="round" v-if="path" :d="path" />
    <path :style="`transform: translateY(${4 * 3 - 8}px)`" :fill="'transparent'" stroke-width="1" :stroke="getStroke('a')" stroke-linecap="round" v-if="path" :d="path" />
  </g>
  <g v-else>
    <path :fill="'transparent'" stroke-width="1" :stroke="getStroke()" stroke-linecap="round" v-if="path" :d="path" />
  </g>
</template>

<script>
import * as AGE from '../api/age'

export default {
  props: {
    offset: {},
    connection: {},
    connections: {},
    connectorDOMs: {}
  },
  data () {
    return {
      path: ''
    }
  },
  methods: {
    getStroke (v = this.connection.input.type) {
      return AGE.connectorColorTypes[v]
    }
  },
  async mounted () {
    // console.log(this.connectorDOMs)
    // console.log(this.connections)

    const input = this.connection.input
    const output = this.connection.output

    const inputDOMInfo = this.connectorDOMs.find(e => e._id === input._id)
    const outputDOMInfo = this.connectorDOMs.find(e => e._id === output._id)

    const inputDOM = await AGE.UI.getDOM({ domID: inputDOMInfo.domID })
    const outputDOM = await AGE.UI.getDOM({ domID: outputDOMInfo.domID })

    window.addEventListener('plot', () => {
      const ri = inputDOM.getBoundingClientRect()
      const ro = outputDOM.getBoundingClientRect()
      const ix = -this.offset.x + ri.left + ri.width / 2
      const iy = -this.offset.y + ri.top + ri.height / 2
      const ox = -this.offset.x + ro.left + ro.width / 2
      const oy = -this.offset.y + ro.top + ro.height / 2

      const dx = (ox - ix) / 3 * 2

      // console.log(ri, ro)
      this.path = `M${ix},${iy} C${ix + dx},${iy} ${ox - dx},${oy} ${ox},${oy}`
    })

    window.addEventListener('resize', () => {
      window.dispatchEvent(new Event('plot'))
    })

    window.dispatchEvent(new Event('plot'))
  }
}
</script>

<style>

</style>
