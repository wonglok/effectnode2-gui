<template>
  <div></div>
</template>

<script>
import * as THREE from 'three'
export default {
  props: {
    scene: {},
    camera: {},
    amount: {
      default: 500
    }
  },
  data () {
    return {
      clean () {}
    }
  },
  mounted () {
    this.setup({ parent: this.scene })
  },
  beforeDestroy () {
    this.clean()
    cancelAnimationFrame(this.RAFID)
  },
  methods: {
    setup ({ parent }) {
      /* eslint-disable */
      this.scene.background = new THREE.Color('#000000')

      let maxParticleCount = 15
      let particleCount = maxParticleCount
      let r = 100
      var particlesData = []
      let uniforms =  {
        time: { value: 0 }
      }
      var pMaterial = new THREE.ShaderMaterial({
        uniforms,
        transparent: true,
        vertexShader: `
          #include <common>

          attribute vec3 color;

          uniform float time;
          varying vec3 vColor;

          void main() {
            vColor = color;

            vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
            gl_Position = projectionMatrix * mvPosition;
            float sa = ${(this.camera.position.z * 10).toFixed(1)} / -mvPosition.z;
            float dpi = 2.0;
            gl_PointSize = sa * 20.0 * color.x;
          }
        `,
        fragmentShader: `
          #include <common>
          varying vec3 vColor;
          void main() {
              if (length(gl_PointCoord.xy - 0.5) > 0.5) {
                  discard;
              } else {
                  vec3 oColor = vec3(vColor);
                  if (oColor.r > 0.95 && oColor.g > 0.95 && oColor.b > 0.95) {
                    gl_FragColor = vec4(oColor, 0.0);
                  } else {
                    gl_FragColor = vec4(oColor, 0.3);
                  }
              }
          }
        `,
        transparent: true
      })
      var particles = new THREE.BufferGeometry();
      var particlePositions = new Float32Array(maxParticleCount * 3);
      var particleColors = new Float32Array(maxParticleCount * 3);
      let color3js = new THREE.Color();

      for (var i = 0; i < maxParticleCount; i++) {
        var x = Math.random() * r - r / 2;
        var y = Math.random() * r - r / 2;
        var z = Math.random() * r - r / 2;
        particlePositions[i * 3] = x;
        particlePositions[i * 3 + 1] = y;
        particlePositions[i * 3 + 2] = z;

        color3js.setHSL(Math.random(), 1, 0.58);
        color3js.addScalar(Math.random())

        particleColors[i * 3] = color3js.r; //0.4 + 0.2 + Math.random()
        particleColors[i * 3 + 1] = color3js.g; //0.4 + 0.2 + Math.random()
        particleColors[i * 3 + 2] = color3js.b; //0.4 + Math.random()
        // add it to the geometry
        let velocity = new THREE.Vector3(-1 + Math.random() * 2,-1 + Math.random() * 2,-1 + Math.random() * 2)
        velocity.multiplyScalar(0.0187)
        particlesData.push({
          velocity,
          numConnections: 0
        });
      }
      particles.setDrawRange(0, particleCount);
      particles.addAttribute('color', new THREE.BufferAttribute(particleColors,3).setDynamic(true));
      particles.addAttribute('position', new THREE.BufferAttribute(particlePositions,3).setDynamic(true));
      // create the particle system
      let points = new THREE.Points(particles,pMaterial);
      this.clean = () => {
        // this.$parent.$emit('remove', points)
        parent.remove(points)
      }
      // this.$parent.$emit('add', points)
      parent.add(points);
      // points.position.z = -maxParticleCount * 0.5;
      points.position.z = -300;
      points.scale.x = 10
      points.scale.y = 10
      points.scale.z = 1

      console.log(points)

      var self = this
      function animate() {
        uniforms.time.value = window.performance.now() * 0.0001
        let time = uniforms.time.value
        let rHalf = r / 2;
        self.RAFID = requestAnimationFrame(animate);
        var vertexpos = 0;
        var colorpos = 0;
        var numConnected = 0;
        for (var i = 0; i < particleCount; i++)
          particlesData[i].numConnections = 0;
        for (var i = 0; i < particleCount; i++) {
          // get the particle
          var particleData = particlesData[i];
          particlePositions[i * 3] += (particleData.velocity.x);
          particlePositions[i * 3 + 1] += (particleData.velocity.y);
          particlePositions[i * 3 + 2] += (particleData.velocity.z);

          if (particlePositions[i * 3 + 1] < -rHalf || particlePositions[i * 3 + 1] > rHalf)
            particleData.velocity.y = -particleData.velocity.y;
          if (particlePositions[i * 3] < -rHalf || particlePositions[i * 3] > rHalf)
            particleData.velocity.x = -particleData.velocity.x;
          if (particlePositions[i * 3 + 2] < -rHalf || particlePositions[i * 3 + 2] > rHalf)
            particleData.velocity.z = -particleData.velocity.z;
        }
        points.geometry.attributes.position.needsUpdate = true;
      }
      this.RAFID = requestAnimationFrame(animate);

      // console.log(parent)

      this.$emit('ready', this)
    }
  }
}
</script>

<style>

</style>
