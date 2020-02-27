<template>
  <div>
  </div>
</template>

<script>
import * as AGE from '../api/age'

let THREE = {
  ...require('three'),
  ...require('three/examples/jsm/controls/OrbitControls.js')
}

export default {
  props: {
    wins: {},
    win: {},
    scenes: {},
    preview: {}
  },
  data () {
    return {
      group: {
        scene: false,
        render () {}
      }
    }
  },
  beforeDestroy  () {
    delete this.scenes[this.preview.domID]
  },
  async mounted () {
    console.log(this.preview, this.wins, this.win, this.scenes)

    let dom = await AGE.UI.getDOM({ domID: this.preview.domID })
    let rect = dom.getBoundingClientRect()
    let scene = this.group.scene = new THREE.Scene()
    let fov = 75
    let aspect = rect.width / rect.height
    let near = 0.1
    let far = 100000000

    let camera = this.group.camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
    camera.position.z = 16
    var controls = new THREE.OrbitControls(camera, dom)
    controls.minDistance = 0
    controls.maxDistance = 16
    controls.enablePan = false
    controls.enableZoom = false

    let geometry = new THREE.DodecahedronBufferGeometry(6.5)
    var material = new THREE.MeshStandardMaterial({
      color: new THREE.Color().setHSL(Math.random(), 1, 0.75),
      roughness: 0.5,
      metalness: 0,
      flatShading: true
    })
    scene.add(new THREE.Mesh(geometry, material))
    scene.add(new THREE.HemisphereLight(0xaaaaaa, 0x444444))
    var light = new THREE.DirectionalLight(0xffffff, 0.5)
    light.position.set(1, 1, 1)
    scene.add(light)

    window.addEventListener('resize', () => {
      let size = dom.getBoundingClientRect()
      camera.aspect = size.width / size.height
      camera.updateProjectionMatrix()
    })
    scene.background = new THREE.Color('rgb(192,223,255)')

    this.group.render = ({ renderer }) => {
      controls.update()
      scene.children[0].rotation.y += 0.01
      let rect = dom.getBoundingClientRect()

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
