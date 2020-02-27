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
  <div :id="`${rID}`" :style="{ height: height }" class="focus:outline-none age-preview-area border-gray-100 border"></div>
</template>

<script>
import * as AGE from '../api/age'

export default {
  props: {
    win: {},
    previewDOMs: {}
  },
  data () {
    return {
      height: 200 + 'px',
      rID: AGE.getID()
    }
  },
  mounted () {
    this.previewDOMs.push({
      ...this.win,
      domID: this.rID
    })

    window.addEventListener('resize', () => {
      const dom = this.$parent.$refs['win-content']
      const connectorsDOM = this.$parent.$refs.connectorsarea
      if (dom && connectorsDOM) {
        const h2 = connectorsDOM.getBoundingClientRect().height
        this.height = (dom.getBoundingClientRect().height - h2) + 'px'
        // if (this.win.type === 'preview-box') {
        // }
      }
    }, false)

    window.dispatchEvent(new Event('resize'))

    this.$nextTick(() => {
      window.dispatchEvent(new Event('resize'))
    })
  }
}
</script>

<style>

</style>
