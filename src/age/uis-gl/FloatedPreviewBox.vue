<template>
  <div class="absolute floatingbox" :id="rID">
    <BoxesEngine :scenes="scenes" class="full age-layer" bloom="bubbles" @ready="(v) => { engine = v; }">
    </BoxesEngine>

    <BoxNodeMaterial @shader="shader = $event" v-if="connections" :scenes="scenes" :preview="{ domID: `${rID}` }" :win="false" :wins="wins" :connections="connections"></BoxNodeMaterial>
  </div>
</template>

<script>
import * as AGE from '../../age/api/age'
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
      rID: AGE.getID(),
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

<style scoped>
.floatingbox{
  top: 0px;
  right: 0px;
  width: 250px;
  height: 250px;
}
</style>
