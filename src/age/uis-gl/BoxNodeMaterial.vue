<template>
  <div>
  </div>
</template>

<script>
import * as AGE from '../api/age'
import _ from 'lodash'
// import * as Audio from '../media/mic-history.js'

const THREE = {
  ...require('three'),
  ...require('three/examples/jsm/controls/OrbitControls.js'),
  ...require('three/examples/jsm/geometries/TeapotBufferGeometry.js')
}
const Nodes = {
  ...require('three/examples/jsm/nodes/Nodes.js')
}

export default {
  props: {
    connections: {},
    wins: {},
    win: {},
    scenes: {},
    preview: {}
  },
  data () {
    return {
      material: false,
      config: {},
      shader: false,
      mesh: false,
      rAFID: {},
      group: {
        scene: false,
        render () {}
      }
    }
  },
  watch: {
    uniformsStr: {
      deep: true,
      handler: _.debounce(function () {
        this.makeMat({ old: this.material })
      }, 100)
    },
    connections: {
      deep: true,
      handler () {
        this.makeMat({ old: this.material })
      }
    }
  },
  computed: {
    uniformsStr () {
      return JSON.stringify({
        uni: (this.win.uniforms || []).filter(e => e.uniType === 'sampler2D')
      })
    }
  },
  beforeDestroy  () {
    delete this.scenes[this.preview.domID]
    for (var kn in this.rAFID) {
      cancelAnimationFrame(this.rAFID[kn] || 0)
    }
  },
  methods: {
    async makeMat ({ old }) {
      if (old && old.dispose) {
        old.dispose()
      }

      // const shader = this.shader = AGE.GEN.getCode({ wins: this.wins, connections: this.connections })
      // this.$emit('shader', shader)

      for (var kn in this.rAFID) {
        cancelAnimationFrame(this.rAFID[kn] || 0)
      }

      const mtl = await AGE.VFX.makeMat({ wins: this.wins, connections: this.connections })

      if (this.mesh && mtl) {
        mtl.side = THREE.DoubleSide
        this.material = mtl
        this.mesh.material = mtl
        this.mesh.needsUpdate = true
      }
      return mtl
    }
  },
  async mounted () {
    // console.log(this.preview, this.wins, this.win, this.scenes)

    const dom = await AGE.UI.getDOM({ domID: this.preview.domID })
    const rect = dom.getBoundingClientRect()
    const scene = this.group.scene = new THREE.Scene()
    const fov = 75
    const aspect = rect.width / rect.height
    const near = 0.1
    const far = 100000000
    const frame = new Nodes.NodeFrame()
    const clock = new THREE.Clock()
    const lightGroup = new THREE.Group()
    scene.add(lightGroup)

    var light = false

    lightGroup.add(new THREE.AmbientLight(0x464646))

    light = new THREE.DirectionalLight(0xffddcc, 1)
    light.position.set(1, 0.75, 0.5)
    lightGroup.add(light)

    light = new THREE.DirectionalLight(0xccccff, 1)
    light.position.set(-1, 0.75, -0.5)
    lightGroup.add(light)

    const camera = this.group.camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
    camera.position.z = 100
    var controls = new THREE.OrbitControls(camera, dom)
    controls.minDistance = 0
    controls.maxDistance = 16
    controls.enablePan = false
    controls.enableZoom = false

    // console.log(this.connections)

    const geometry = new THREE.TeapotBufferGeometry(5, 12)

    this.makeMat({ old: false })
    window.addEventListener('compile-shader', () => {
      this.makeMat({ old: this.material })
    }, false)
    const mesh = this.mesh = new THREE.Mesh(geometry, undefined)
    scene.add(mesh)
    scene.add(new THREE.HemisphereLight(0xaaaaaa, 0x444444))
    // var light = new THREE.DirectionalLight(0xffffff, 0.5)
    // light.position.set(1, 1, 1)
    // scene.add(light)

    window.addEventListener('resize', () => {
      const size = dom.getBoundingClientRect()
      camera.aspect = size.width / size.height
      camera.updateProjectionMatrix()
    })
    scene.background = new THREE.Color('rgb(192,223,255)')

    this.group.render = ({ renderer }) => {
      const delta = clock.getDelta()
      frame.setRenderer(renderer).update(delta)

      if (mesh.material instanceof Nodes.NodeMaterial) {
        frame.updateNode(mesh.material)
      }

      controls.update()
      // scene.children[0].rotation.y += 0.01
      const rect = dom.getBoundingClientRect()

      if (rect.bottom < 0 || rect.top > renderer.domElement.clientHeight ||
          rect.right < 0 || rect.left > renderer.domElement.clientWidth) {
        return // it's off screen
      }

      var width = rect.right - rect.left
      var height = rect.bottom - rect.top
      var left = rect.left
      var bottom = renderer.domElement.clientHeight - rect.bottom

      //
      renderer.setViewport(left, bottom, width, height)
      renderer.setScissor(left, bottom, width, height)

      renderer.render(scene, camera)
    }

    this.scenes[this.preview.domID] = this.group
  }
}
</script>

<style>

</style>
