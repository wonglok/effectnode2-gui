<template>
  <div class="full">
    <div class="full" ref="mounter">
    </div>
    <!-- <div class="cg-layer" style="zIndex: 10000;">
      <input type="range" v-if="bloomPass" v-model="bloomPass.threshold" step="0.0001" min="0" max="0.5" />
      <input type="range" v-if="bloomPass" v-model="bloomPass.strength" step="0.0001" min="0" max="5" />
      <input type="range" v-if="bloomPass" v-model="bloomPass.radius" step="0.0001" min="0" max="5" />
    </div> -->
    <Scene @ready="(v) => { scene = v; init() }" >
    </Scene>
  </div>
</template>

<script>
//
const THREE = {
  ...require('three'),
  ...require('three/examples/jsm/shaders/CopyShader.js'),
  ...require('three/examples/jsm/shaders/FXAAShader.js'),
  ...require('three/examples/jsm/shaders/ConvolutionShader.js'),
  ...require('three/examples/jsm/shaders/LuminosityHighPassShader.js'),
  ...require('three/examples/jsm/postprocessing/UnrealBloomPass.js'),
  ...require('three/examples/jsm/postprocessing/EffectComposer.js'),
  ...require('three/examples/jsm/postprocessing/RenderPass.js'),
  ...require('three/examples/jsm/postprocessing/MaskPass.js'),
  ...require('three/examples/jsm/postprocessing/ShaderPass.js'),
  ...require('three/examples/jsm/controls/OrbitControls.js')
  // ...require('three/examples/jsm/controls/MapControls.js')
}

// import * as THREE from 'three'
// import * as AuAu from '../Simulation/GeoShader/audio/mic.js'

// let getRD = () => {
//   return `_${(Math.random() * 1000000).toFixed(0)}`
// }

export default {
  props: {
    running: {
      default: true
    },
    bloom: {
      default: 'default'
    },
    toucher: {}
  },
  components: {
    Scene: require('./Scene.vue').default

    // Scene: require('../vfx/Common/Scene.vue').default,
    // Object3D: require('../vfx/Common/Object3D.vue').default,
    // Box3: require('../SceneItem/Box3.vue').default,
    // SimSim: require('../SceneItem/SimSim.vue').default,
    // GeoVert: require('../../vfx/SceneItem/GeoVert.vue').default
  },
  data () {
    return {
      rotator: false,
      mouse: { x: 0, y: 0, z: 0 },
      rect: false,
      execMap: {},
      execStack: [],
      gameReady: false,
      audio: false,
      control: false,
      size: false,
      dpi: 2,
      rAFID: 0,
      scene: false,
      renderer: false,
      camera: false,
      readyInit: false,
      world: false,
      Settings: {
        camPosition: {
          x: 0,
          y: 0,
          z: 20
        },
        bloomModes: {
          // 0.112 1.7297 0.6778
          default: {
            threshold: 0.5246740050804402,
            // threshold: 0.1346740050804403,
            strength: 1.0551227773073666,
            radius: 1.3343776460626588
          },
          bubbles: {
            threshold: 0.112,
            strength: 1.7297,
            radius: 0.6778
          },
          shine: {
            threshold: 0.34014,
            strength: 2.9655,
            radius: 0.5
          }
        },
        bloomPass: {
          threshold: 0.5246740050804402,
          // threshold: 0.1346740050804403,
          strength: 1.0551227773073666,
          radius: 1.3343776460626588
        },
        bloomPassLoading: {
          threshold: 0.4014,
          strength: 2.7655,
          radius: 1.113
        },
        bloomPassBoard: {
          threshold: 0.5246740050804402,
          // threshold: 0.1346740050804403,
          strength: 0.5551227773073666,
          radius: 1.0343776460626588
        }
      }
    }
  },
  beforeDestroy () {
    this.stop()
  },
  created () {

  },
  mounted () {
    // var tiltHandler = (event) => {
    //   if (this.rotator) {
    //     this.rotator.rotation.x = event.beta / -90
    //     this.rotator.rotation.y = event.alpha / -90
    //   }
    // }
    // if (window.DeviceOrientationEvent) {
    //   window.addEventListener('deviceorientation', tiltHandler, false);
    // }
  },
  watch: {
  },
  methods: {
    // startGame (gameReady, audio) {
    //   audio && this.setupAudio()
    //   this.$nextTick(() => {
    //     this.gameReady = gameReady
    //   })
    // },
    init () {
      this.setupRenderer()
      this.setupSizer()
      this.setupCamera()
      this.setupComposer()
      this.setupControl()
      this.syncSize()
      this.start()
      this.$emit('ready', this)
    },
    // setupAudio () {
    //   this.audio = AuAu.setup()
    // },
    setupControl () {
      var control = new THREE.OrbitControls(this.camera, this.$refs.mounter)
      this.control = control
      control.enableDamping = true
      control.enableKeys = false
    },
    // setupControl () {
    //   // var control = new THREE.OrbitControls(this.camera, this.toucher)
    //   var control = new THREE.MapControls(this.camera, this.toucher || this.$refs['mounter'])
    //   // control.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)
    //   control.enableDamping = true // an animation loop is required when either damping or auto-rotation are enabled
    //   control.dampingFactor = 0.65
    //   control.screenSpacePanning = true
    //   control.minDistance = 1
    //   control.enableRotate = false
    //   control.keys.UP = 40
    //   control.keys.BOTTOM = 38
    //   control.keys.LEFT = 39
    //   control.keys.RIGHT = 37

    //   // control.maxDistance = 500
    //   // control.maxPolarAngle = Math.PI / 2

    //   // control.keyPanSpeed = 20.0
    //   // // control.enableRotate = fals
    //   // control.enableDamping = true
    //   // control.dampingFactor = 1.3
    //   // control.enableKeys = true
    //   // control.enablePan = true

    //   this.control = control
    // },
    setupRenderer () {
      this.renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        preserveDrawingBuffer: false
      })
      this.renderer.domElement.style.marginBottom = '-6px'
      this.$refs.mounter.appendChild(this.renderer.domElement)
    },
    setupCamera () {
      const { size, Settings } = this
      const fov = 75
      const aspect = size.width / size.height
      const near = 0.1
      const far = 100000000

      const camera = this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
      camera.position.x = Settings.camPosition.x
      camera.position.y = Settings.camPosition.y
      camera.position.z = Settings.camPosition.z
      // camera.lookAt(0, 0, 0)
    },
    setupComposer () {
      const composer = this.composer = new THREE.EffectComposer(this.renderer)
      const { scene, camera, size, dpi, Settings } = this
      const renderBG = new THREE.RenderPass(scene, camera)

      const bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2(size.width * dpi, size.height * dpi), 1.5, 0.4, 0.85)
      this.bloomPass = bloomPass
      bloomPass.renderToScreen = true

      bloomPass.threshold = Settings.bloomModes[this.bloom].threshold
      bloomPass.strength = Settings.bloomModes[this.bloom].strength
      bloomPass.radius = Settings.bloomModes[this.bloom].radius

      composer.addPass(renderBG)
      composer.addPass(bloomPass)
    },
    setupSizer () {
      this.getSizeInfo()
      window.addEventListener('resize', this.getSizeInfo, false)
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
      }
    },
    syncSize () {
      const sync = () => {
        const { composer, renderer, camera, size, dpi, control } = this
        control.update()
        composer.setSize(size.width * dpi, size.height * dpi)
        renderer.setPixelRatio(dpi)
        renderer.setSize(size.width, size.height)
        camera.aspect = size.width / size.height
        camera.updateProjectionMatrix()
      }
      sync()
      window.addEventListener('resize', sync, false)

      this.$refs.mounter.addEventListener('mousemove', (evt) => {
        this.mouse.x = evt.pageX
        this.mouse.y = evt.pageY
      }, false)
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
      if (!this.running) {
        return
      }
      // let { scene, camera, renderer, composer, mouse, rect, control } = this
      const { scene, camera, renderer, mouse, rect, control } = this
      if (control) {
        control.update()
      }

      for (var kn in this.execMap) {
        this.execMap[kn]({ mouse, rect })
      }

      this.execStack.forEach(e => e({ mouse, rect }))

      renderer.render(scene, camera)
      // if (scene && camera && renderer && composer) {
      //   composer.render()
      // } else if (scene && camera && renderer) {
      //   renderer.render(scene, camera)
      // }
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
