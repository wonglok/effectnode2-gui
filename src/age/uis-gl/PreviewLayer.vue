<template>
  <div class="full age-layers preview-area">
    <BoxesEngine :scenes="scenes" class="full age-layer" bloom="bubbles" @ready="(v) => { engine = v; }">
    </BoxesEngine>

    <div :key="preview.domID" v-for="preview in previewDOMs">
      <BoxNodeMaterial @shader="shader = $event" v-if="connections && getWin({ wins, preview }) && getWin({ wins, preview }).previewType === 'node-material'" :scenes="scenes" :preview="preview" :win="getWin({ wins, preview })" :wins="wins" :connections="connections"></BoxNodeMaterial>
      <!-- <BoxSceneTexturePreview @shader="shader = $event" v-if="connections && getWin({ wins, preview }) && getWin({ wins, preview }).hasUniforms" :scenes="scenes" :preview="preview" :win="getWin({ wins, preview })" :wins="wins" :connections="connections"></BoxSceneTexturePreview> -->
    </div>
    <div class="nomouse age-layer" ref="dom" style="display: flex; justify-content: flex-end; align-items: flex-end;">
      <!-- <div  style="display: flex; justify-content: flex-end;">
        <pre  v-if="shader" class="">{{ shader.vertexShader }}
  ------------
  {{ shader.fragmentShader }}</pre>
      </div> -->
    </div>
    <!-- <Bubbles v-if="engine && engine.renderer && engine.scene && engine.camera" :camera="engine.camera" :amount="20" :renderer="engine.renderer" :scene="engine.scene"></Bubbles> -->
  </div>
</template>

<script>
export default {
  props: {
    offset: {},
    wins: {},
    connections: {},
    previewDOMs: {}
  },
  components: {
    // Bubbles: require('../uis-gl/Bubbles.vue').default,
    // BoxSceneAudioPreview: require('../uis-gl/BoxSceneAudioPreview.vue').default,
    // BoxSceneTexturePreview: require('../uis-gl/BoxSceneTexturePreview.vue').default,
    BoxNodeMaterial: require('../uis-gl/BoxNodeMaterial.vue').default,
    BoxesEngine: require('../uis-gl/BoxesEngine.vue').default
  },
  data () {
    return {
      shader: false,
      scenes: {},
      engine: false
    }
  },
  mounted () {
  },
  methods: {
    getWin ({ wins, preview }) {
      const found = wins.find(w => w._id === preview._id)
      return found
    }
  }
}
</script>

<style>

</style>
