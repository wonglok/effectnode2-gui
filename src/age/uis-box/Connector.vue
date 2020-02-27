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
  <div :id="`${rID}`" class="age-connnector" :style="getStyle()" @click="onClick()" v-if="userdata" :connections="connections" :io="userdata.io" v-drag v-drop :userdata="userdata" :drop="onDrop">
    <div class="age-connnector-after nosel" :style="getStyle()" :connections="connections" :io="userdata.io" v-drag v-drop :userdata="userdata" :drop="onDrop"></div>
    <div class="age-connnector-label nosel" :class="{ [userdata.io]: true }"  v-drag v-drop :userdata="userdata" :drop="onDrop">{{ userdata.label }}</div>
  </div>
</template>

<script>
import Vue from 'vue'
import * as AGE from '../api/age'

const DnDFactory = () => {
  const hand = new Vue({})
  const indicator = document.createElement('div')
  indicator.style.display = 'none'
  document.body.appendChild(indicator)

  const getLandData = ({ api }) => {
    const hoverAt = document.elementFromPoint(api.pageX, api.pageY)
    if (hoverAt) {
      let json = hoverAt.getAttribute('landing')
      if (json) {
        try {
          json = JSON.parse(json)
        } catch (e) {
          json = false
        }
        return json
      } else {
        json = false
      }
    }
    return false
  }

  return () => {
    const mod = {
      drag: {
        // When the bound element is bind into the DOM...
        bind (el, binding, vnode) {
          const connections = vnode.data.attrs.connections
          const handData = vnode.data.attrs.userdata
          const dropHandler = vnode.data.attrs.drop || (() => {})

          const canDrop = ({ landData, handData }) => {
            let noDuplicate = true
            if (landData && handData && connections) {
              const connected = connections.reduce((acc, item) => {
                acc.push(item.input._id)
                acc.push(item.output._id)
                return acc
              }, [])
              noDuplicate = !connected.some(e => e === landData._id) && !connected.some(e => e === handData._id)
            }
            return noDuplicate &&
              landData &&
              handData &&
              landData.boxID !== handData.boxID &&
              landData.io !== handData.io &&
              landData.type === handData.type &&
              (
                landData.shader === handData.shader ||
                landData.shader === AGE.NS.SHADER_TYPES.BOTH ||
                handData.shader === AGE.NS.SHADER_TYPES.BOTH
              )
          }

          // Focus the element
          // el.omg()
          let sent = false
          AGE.UI.makeDrag({
            dom: el,
            onDown: ({ api }) => {
              sent = false
              indicator.innerText = handData.label || ''
              indicator.style.display = 'block'
              indicator.style.opacity = '0'
              indicator.style.transform = `translate3d(${api.pageX}px, ${30 + api.pageY}px, 0px)`
              indicator.style.backgroundColor = 'white'
              indicator.style.zIndex = '100000000'
              indicator.style.position = 'fixed'
              indicator.style.top = '0'
              indicator.style.left = '0'
              indicator.style.fontFamily = 'Avenir, Helvetica, Arial, sans-serif'
              indicator.style.padding = '10px'
              indicator.style.borderRadius = '10px'
              indicator.style.boxShadow = `${'0px 0px 10px 0px grey'}`
              indicator.style.transition = ''
              indicator.style.userSelect = 'none'

              window.dispatchEvent(new Event('plot'))
            },
            onMM: ({ api }) => {
              indicator.style.opacity = '1'
              indicator.style.transform = `translate3d(${api.pageX}px, ${30 + api.pageY}px, 0px)`
              const rect = indicator.getBoundingClientRect()
              const landData = getLandData({ api })
              if (canDrop({ handData, landData })) {
                indicator.style.color = 'white'
                indicator.style.background = 'linear-gradient(45deg, green, lime)'
              } else {
                indicator.style.color = 'black'
                indicator.style.background = 'white'
              }

              hand.x = rect.left - 30
              hand.y = rect.top - 30
            },
            onUp: ({ api, ev }) => {
              // let hoverAt = document.elementFromPoint(api.pageX, api.pageY)
              const landData = getLandData({ api })
              if (!sent && dropHandler && canDrop({ handData, landData })) {
                // console.log(el, hoverAt)
                dropHandler({ hand: handData, land: landData })
                sent = true
              }

              indicator.style.opacity = '0'
              indicator.style.transform = ''
              indicator.style.userSelect = ''
              indicator.style.display = 'none'

              window.dispatchEvent(new Event('plot'))
              // if (!sent) {
              //   hand.$emit('send', { hoverAt, handData: data })
              //   sent = true
              // }
            }
          })
        }
      },
      drop: {
        // When the bound element is bind into the DOM...
        bind (el, binding, vnode) {
          const userdata = vnode.data.attrs.userdata
          el.setAttribute('landing', JSON.stringify(userdata))
          window.dispatchEvent(new Event('plot'))
        }
      }
    }
    return mod
  }
}

const dragServices = DnDFactory()()

export default {
  props: {
    connections: {},
    connectorDOMs: {},
    userdata: {}
  },
  directives: {
    ...dragServices
  },
  data () {
    return {
      rID: AGE.getID()
    }
  },
  watch: {
  },
  mounted () {
    this.connectorDOMs.push({
      ...JSON.parse(JSON.stringify(this.userdata)),
      domID: this.rID
    })
    // console.log(this.connectorDOMs)
  },
  beforeDestroy () {
    const idx = this.connectorDOMs.findIndex(e => e.domID === this.rID)
    this.connectorDOMs.splice(idx, 1)
  },
  methods: {
    getStyle () {
      const colors = AGE.connectorColorTypes
      return {
        backgroundColor: colors[this.userdata.type]
      }
    },
    onClick () {
      this.$emit('clicker', this.userdata)
      // console.log(this.userdata)
    },
    onDrop (v) {
      this.$emit('drop', v)
      // console.log(JSON.stringify(v, null, '\t'))
    }
  }
}
</script>

<style>

</style>
