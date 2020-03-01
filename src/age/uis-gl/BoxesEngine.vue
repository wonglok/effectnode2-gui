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
  <div class="full">
    <canvas class="full" ref="canvas"></canvas>
  </div>
</template>

<script>
const THREE = {
  ...require('three')
  // ...require('three/examples/jsm/controls/MapControls.js')
}

// import * as THREE from 'three'
// import * as AuAu from '../Simulation/GeoShader/audio/mic.js'

// let getRD = () => {
//   return `_${(Math.random() * 1000000).toFixed(0)}`
// }

export default {
  props: {
    toucher: {},
    scenes: {}
  },
  components: {
    // Scene: require('./Scene.vue').default
  },
  data () {
    return {
      rAFID: 0,
      renderer: false,
      size: false
    }
  },
  beforeDestroy () {
    this.stop()
  },
  created () {
  },
  mounted () {
    this.init()
  },
  watch: {
  },
  methods: {
    init () {
      this.setupRenderer()
      this.setupSizer()
      this.start()
    },
    setupRenderer () {
      this.renderer = new THREE.WebGLRenderer({
        canvas: this.$refs.canvas,
        antialias: true,
        alpha: true,
        preserveDrawingBuffer: false
      })
      this.renderer.domElement.style.marginBottom = '-6px'
      // this.$refs['mounter'].appendChild(this.renderer.domElement)
    },
    updateSize () {
      const canvas = this.$refs.canvas
      var width = canvas.clientWidth
      var height = canvas.clientHeight
      if (canvas.width !== width || canvas.height !== height) {
        this.renderer.setSize(width, height, false)
      }
    },
    setupSizer () {
      this.getSizeInfo()
      window.addEventListener('resize', this.getSizeInfo, false)
      // window.addEventListener('ui-layout', this.getSizeInfo, false)
    },
    getSizeInfo () {
      if (this.$refs.mounter) {
        var rect = this.$refs.mounter.getBoundingClientRect()
        this.rect = rect
        this.size = {
          width: rect.width,
          height: rect.height,
          aspect: rect.width / rect.height
        }
        this.dpi = 2.0 // window.devicePixelRatio || 1.0
        this.renderer.setPixelRatio(this.dpi)
        this.renderer.setSize(this.size.width, this.size.height)
      }
    },
    stop () {
      window.cancelAnimationFrame(this.rAFID)
    },
    start () {
      const rAF = () => {
        this.rAFID = window.requestAnimationFrame(rAF)
        this.render()
      }
      this.rAFID = window.requestAnimationFrame(rAF)
    },
    render () {
      this.updateSize()
      this.renderer.setClearColor(0xffffff, 0)
      this.renderer.setScissorTest(false)
      this.renderer.clear()

      this.renderer.setClearColor(0xe0e0e0, 0)
      this.renderer.setScissorTest(true)

      // console.log(this.scenes)

      if (this.scenes) {
        for (var kn in this.scenes) {
          const scene = this.scenes[kn]
          if (scene) {
            scene.render({ renderer: this.renderer })
          }
        }
      }
    }
  }
}
</script>

<style>
/* @import url(../vfx/CSS/util.css); */
html, body{
  margin: 0px;
  width: 100%;
  height: 100%;
}
</style>

<style scoped>
.full {
  width: 100%;
  height: 100%;
}
</style>
