<template>
  <div class="edit-preview-box">
    <Engine class="full" :running="running" @ready="engine = $event"></Engine>
    <SingleShaderPreview v-if="engine" :engine="engine" :wins="wins" :connections="connections"></SingleShaderPreview>
  </div>
</template>

<script>
export default {
  props: {
    running: {
      default: true
    },
    wins: {},
    connections: {}
  },
  components: {
    SingleShaderPreview: require('./SingleShaderPreview.vue').default,
    Engine: require('./Engine.vue').default
  },
  data () {
    return {
      preview: false,
      engine: false
    }
  },
  methods: {
    getWin ({ wins, preview }) {
      const found = wins.find(w => w._id === preview._id)
      return found
    }
  },
  mounted () {
  }
}
</script>

<style>

</style>
