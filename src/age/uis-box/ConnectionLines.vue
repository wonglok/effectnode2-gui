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
  <svg class="full connectionlines" :width="screen.ww" :height="screen.hh" style="margin-bottom: -6px;" :viewBox="viewBox">
    <!-- <rect x="500" y="500" width="500" height="500" fill="red"></rect> -->
    <ConnectionLineOne :offset="offset" :connection="connection" :connections="connections" :connectorDOMs="connectorDOMs" :key="connection.input._id + connection.output._id" v-for="connection in connections"></ConnectionLineOne>
  </svg>
</template>

<script>
export default {
  components: {
    ConnectionLineOne: require('./ConnectionLineOne.vue').default
  },
  props: {
    offset: {
      default () {
        return {
          x: 0,
          y: 0
        }
      }
    },
    connections: {},
    connectorDOMs: {}
  },
  data () {
    return {
      // offsetX: 0,
      // offsetY: 0,
      viewBox: '0 0 1 1',
      screen: {
        ww: window.innerWidth,
        hh: window.innerHeight
      },
      scale: 1
    }
  },
  computed: {
    offsetX () {
      return this.offset.x
    },
    offsetY () {
      return this.offset.y
    }
  },
  mounted () {
    this.viewBox = this.calcViewBox()
    window.addEventListener('resize', () => {
      this.screen.ww = window.innerWidth
      this.screen.hh = window.innerHeight
      this.viewBox = this.calcViewBox()
    })
    window.addEventListener('plot', () => {
      this.screen.ww = window.innerWidth
      this.screen.hh = window.innerHeight
      this.viewBox = this.calcViewBox()
    })
  },
  methods: {
    calcViewBox () {
      const { offsetX, offsetY, scale, screen } = this
      return ((-offsetX) * scale) + ' ' + ((-offsetY) * scale) + ' ' + screen.ww * scale + ' ' + screen.hh * scale
    }
  }
}
</script>

<style>

</style>
