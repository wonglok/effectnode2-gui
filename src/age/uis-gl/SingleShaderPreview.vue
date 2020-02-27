<template>
  <div>
    <!--  -->
  </div>
</template>

<script>
// import * as AGE from '../api/age'
var THREE = require('three')
export default {
  props: {
    connections: {},
    wins: {},
    win: {},
    scenes: {},
    preview: {},
    engine: {}
  },
  data () {
    return {
      mesh: false,
      rAFID: {}
    }
  },
  methods: {
    makeMat () {
      // const shader = this.shader = AGE.GEN.getCode({ wins: this.wins, connections: this.connections })
      // this.$emit('shader', shader)

      for (var kn in this.rAFID) {
        cancelAnimationFrame(this.rAFID[kn] || 0)
      }

      const uniforms = {
      }
      const config = {
        uniforms
      }

      // this.wins.forEach(win => {
      //   // console.log(win)
      //   if (win.hasUniforms) {
      //     win.uniforms.forEach((uni) => {
      //       // if (uni.uniType === 'timer') {
      //       //   AGE.Shader.setupTimer({ uniforms, uni, ctx: this })
      //       // } else if (uni.uniType === 'sampler2D') {
      //       //   AGE.Shader.setupSampler2D({ win, uniforms, uni, ctx: this })
      //       // } else if (uni.uniType === 'resolution') {
      //       //   AGE.Shader.setupResolution({ win, uniforms, uni, ctx: this })
      //       // } else if (uni.uniType === 'sampler2D-audio') {
      //       //   AGE.Shader.setupAudioUniform({ win, uniforms, uni, ctx: this })
      //       // }
      //       AGE.Shader.setupShaderMaterail({ win, uni, uniforms, ctx: this })
      //     })
      //   }
      // })

      var material = new THREE.ShaderMaterial({
        // vertexShader: shader.vertexShader,
        // fragmentShader: shader.fragmentShader,
        transparent: true,
        ...config
        // color: new THREE.Color().setHSL(Math.random(), 1, 0.75),
        // roughness: 0.5,
        // metalness: 0,
        // flatShading: true
      })
      if (this.mesh) {
        this.mesh.material = material
        this.mesh.needsUpdate = true
      }
      return material
    },
    setup () {
      const scene = this.engine.scene
      const geometry = new THREE.SphereBufferGeometry(8.5, 320, 320)
      const material = this.makeMat()
      window.addEventListener('compile-shader', () => {
        this.makeMat()
      }, false)
      const mesh = this.mesh = new THREE.Mesh(geometry, material)
      scene.add(mesh)
      scene.add(new THREE.HemisphereLight(0xaaaaaa, 0x444444))
      var light = new THREE.DirectionalLight(0xffffff, 0.5)
      light.position.set(1, 1, 1)
      scene.add(light)
    }
  },
  mounted () {
    this.setup()
  }
}
</script>

<style>

</style>
