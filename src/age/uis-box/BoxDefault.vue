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
  <div class="win-box full">
    <div class="win-title nosel" :style="$parent.getTitleStyle()" ref="win-title">
      <div class="space-between">
        <div>
          {{ $parent.win.title || 'New Box' }}
        </div>
        <div class="center">
          <!-- <img class="age-gear click" @click="win.pinned = !win.pinned" src="../icons/gear.svg" alt=""> -->
          <img class="age-gear click" @click="$emit('gear', { win, connections })" src="../icons/gear.svg" alt="">
        </div>
      </div>
    </div>

    <!-- OMG -->
    <div class="win-content" ref="win-content">
      <div class="space-between connectorsarea" ref="connectorsarea">
        <div class="flex-list age-connector-list">
          <Connector @drop="$emit('drop', $event)" @clicker="$emit('clicker', $event)" :connectorDOMs="connectorDOMs" :connections="connections" class="age-input" :key="input._id" v-for="input in $parent.win.inputs" :userdata="input"></Connector>
        </div>
        <div class="flex-list age-ui-inputs">
          <!-- <div :key="ui.id" v-for="ui in $parent.win.uis || []" class="full center"> -->
            <!-- <MagicInput :ui="ui"></MagicInput> -->
          <!-- </div> -->
          <!-- <div :key="ui.id" v-for="ui in $parent.win.uniforms || []" class="full center"> -->
            <!-- <TextureLoader v-if="$parent.win.isTexture" :ui="ui"></TextureLoader>
            <AudioLoader v-if="$parent.win.isAudio" :ui="ui"></AudioLoader> -->
          <!-- </div> -->
        </div>
        <div class="flex-list age-connector-list">
          <Connector @drop="$emit('drop', $event)" @clicker="$emit('clicker', $event)" :connectorDOMs="connectorDOMs" :connections="connections" class="age-output" :key="output._id" v-for="output in $parent.win.outputs" :userdata="output"></Connector>
        </div>
      </div>
      <div class="full">
        <CubeImageLink class="" v-if="win.NodeClass === 'CubeTextureNode'" :win="win"></CubeImageLink>
        <ImageLink class="" v-if="win.NodeClass === 'TextureNode'" :win="win"></ImageLink>
        <ColorPicker class="full" v-if="win.NodeClass === 'ColorNode'" :win="win"></ColorPicker>
        <MagicInput class="" :ui="{ type: 'ui-vec3' }" v-if="win.NodeClass === 'Vector3Node'" :win="win"></MagicInput>
        <MagicInput class="" :ui="{ type: 'ui-float' }" v-if="win.NodeClass === 'FloatNode'" :win="win"></MagicInput>
        <PreviewRect v-if="win.previewType" :win="win" :previewDOMs="previewDOMs"></PreviewRect>
      </div>
    </div>

  </div>
</template>

<script>
// import * as AGE from '../api/age'
export default {
  props: {
    win: {},
    connections: {},
    previewDOMs: {},
    connectorDOMs: {}
  },
  components: {
    // AudioLoader: require('./AudioLoader.vue').default,
    // TextureLoader: require('./TextureLoader.vue').default,
    CubeImageLink: require('./CubeImageLink.vue').default,
    ImageLink: require('./ImageLink.vue').default,
    MagicInput: require('./MagicInput.vue').default,
    PreviewRect: require('./PreviewRect.vue').default,
    ColorPicker: require('./ColorPicker.vue').default,
    Connector: require('./Connector.vue').default
  },
  data () {
    return {
    }
  },
  mounted () {
    // window.addEventListener('ui-layout', () => {
    //   if (!this.$refs.connectorsarea) {
    //     return
    //   }
    //   if (this.win.preview) {
    //     if (!this.win.pos.h) {
    //       this.win.pos.h = this.$refs.connectorsarea.getBoundingClientRect().height + 200 + 26
    //     }
    //   } else {
    //     this.win.pos.h = this.$refs.connectorsarea.getBoundingClientRect().height + 26
    //   }
    // })
    // window.dispatchEvent(new Event('ui-layout'))

    // const newH = this.$refs.connectorsarea.getBoundingClientRect().height + 26
    // if (this.win.pos.h < newH) {
    //   this.win.pos.h = newH
    // }

    this.$parent.setupSubCompo({ subCompo: this })
  }
}
</script>

<style scoped>

</style>
