<template>
  <div v-if="refresher" class=" overflow-hidden relative w-full h-full"  ref="area">

    <ConnectionLines :offset="offset" ref="lines" @dom="setupDrag" class="age-layer pointer-events-none" :connections="connections" :connectorDOMs="connectorDOMs"></ConnectionLines>
    <div ref="DragArea" class="age-drag-area age-layer full"></div>
    <Box @gear="onGear({ win, wins, connections })" :offset="offset" @drop="onDropConnection" @clicker="onClickConnector" @click="onClickBox({ win, wins })" class="age-layer" :connections="connections" :previewDOMs="previewDOMs" :connectorDOMs="connectorDOMs" :wins="wins" v-for="(win) in wins" :key="win._id" :win="win"></Box>

    <!-- WebGL -->
    <PreviewLayer class="age-layer noclick" :wins="wins" :previewDOMs="previewDOMs" :connections="connections"></PreviewLayer>

    <ToolBox></ToolBox>

    <AddBoxMenu :offset="offset" @save="onSave()" @connections="connections = $event" @wins="wins = $event" :connections="connections" :wins="wins" class="age-layer" v-if="overlay === 'add-module'"></AddBoxMenu>

    <EditBoxDetails @save="onSave()" :winID="currentWinID" :connections="connections" :wins="wins" class="age-layer" v-if="overlay === 'fix-module'"></EditBoxDetails>
  </div>
</template>

<script>
import '../assets/util.css'
import '../assets/app.css'
import * as AGE from '../api/age'
import copy from 'copy-to-clipboard'

// import _ from 'lodash'

// async function postData (url = '', data = {}) {
//   // Default options are marked with *
//   const response = await fetch(url, {
//     method: 'POST', // *GET, POST, PUT, DELETE, etc.
//     mode: 'cors', // no-cors, *cors, same-origin
//     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//     credentials: 'same-origin', // include, *same-origin, omit
//     headers: {
//       'Content-Type': 'application/json'
//       // 'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     redirect: 'follow', // manual, *follow, error
//     referrer: 'no-referrer', // no-referrer, *client
//     body: JSON.stringify(data) // body data type must match "Content-Type" header
//   })
//   let res = await response.json() // parses JSON response into native JavaScript objects
//   return res
// }

export default {
  components: {
    ToolBox: require('../uis-box/ToolBox.vue').default,
    PreviewLayer: require('../uis-gl/PreviewLayer.vue').default,

    EditBoxDetails: require('../uis-box/EditBoxDetails.vue').default,
    AddBoxMenu: () => import(/* webpackChunkName: "add-box-menu" */ '../uis-box/AddBoxMenu.vue'),
    ConnectionLines: require('../uis-box/ConnectionLines.vue').default,
    Box: require('../uis-box/Box.vue').default
  },
  data () {
    return {
      refresher: true,
      STORAGE_NS: 'AGE_EDITOR_V0',
      overlay: false,
      previewDOMs: [],
      connectorDOMs: [],
      connections: [],
      wins: [],
      offset: {
        x: 0,
        y: 0
      }
    }
  },
  async mounted () {
    this.load()
    if (this.wins.length === 0) {
      const data = (await import('../code-templates/t1-demo.json')).default
      await this.applyJSON({ data })
    }

    this.setupDrag({ dom: this.$refs.DragArea })
    let tout = 0
    const saver = () => {
      clearTimeout(tout)
      tout = setTimeout(() => {
        this.save()
      }, 30)
    }
    // window.addEventListener('save', this.trySave)
    window.addEventListener('plot', saver)
    window.addEventListener('refresh', saver)

    window.addEventListener('save', saver)
    window.addEventListener('save-delay', saver)
    // window.addEventListener('save-age-project', () => {
    //   this.save()
    // })

    window.addEventListener('delay-save', saver)

    window.addEventListener('keydown', (evt) => {
      if (evt.metaKey && evt.keyCode === 83) {
        evt.preventDefault()
        this.save()
      }
    })
  },
  methods: {
    // async onRunDB () {
    //   // let val = await postData(`http://localhost:3001`, {
    //   //   flowTree: {
    //   //     wins: this.wins,
    //   //     connections: this.connections
    //   //   },
    //   //   data: {
    //   //     omg: 123,
    //   //     wa: 1234
    //   //   }
    //   // })
    //   // console.log(val)
    // },
    getEditPreviewStyle () {
      const show = true // || this.overlay === 'fix-module'
      if (show) {
        return {
          opacity: 1
        }
      } else {
        return {
          opacity: 0,
          pointerEvents: 'none'
        }
      }
    },
    onClickBox ({ win, wins }) {
      // console.log('on click box')
      const idx = wins.findIndex(w => w._id === win._id)
      wins.splice(idx, 1)
      wins.push(win)
    },
    copy () {
      const str = JSON.stringify({
        wins: this.wins,
        connections: this.connections
      }, null, '  ')
      copy(str)
      window.alert('copied')
    },
    async onReset () {
      if (window.confirm('clear?')) {
        const data = (await import('../code-templates/t1-demo.json')).default
        await this.applyJSON({ data })
      }
    },
    goHome () {
      this.offset.x = 0
      this.offset.y = 0
      this.$nextTick(() => {
        this.$root.$forceUpdate()
        window.dispatchEvent(new Event('plot'))
      })
    },
    async applyJSON ({ data }) {
      return new Promise((resolve) => {
        this.offset = {
          x: 0,
          y: 0
        }

        window.localStorage.removeItem(this.STORAGE_NS)
        const { connections, wins } = JSON.parse(JSON.stringify(data))
        const refresh = () => {
          this.$root.$forceUpdate()
          this.$forceUpdate()
          window.dispatchEvent(new Event('plot'))
          window.dispatchEvent(new Event('save'))
        }
        const reload = () => {
          return new Promise((resolve) => {
            refresh()
            this.$nextTick(() => {
              refresh()
              resolve()
            })
          })
        }
        this.$nextTick(async () => {
          this.connections = []
          this.wins = []
          await reload()
          this.connections = connections
          this.wins = wins
          await reload()
        })
      })
    },
    // makeNew () {
    //   // AGE.BOX.makeDefaultBox({ wins: this.wins })
    //   // AGE.BOX.makeDefaultBox({ wins: this.wins })

    //   // this.connections.push({
    //   //   output: this.wins[0].outputs[0],
    //   //   input: this.wins[1].inputs[0]
    //   // })

    //   const { connections, wins } = require('../code-templates/t1-demo.json')
    //   this.connections = connections
    //   this.wins = wins
    //   this.$nextTick(() => {
    //     this.$root.$forceUpdate()
    //     window.dispatchEvent(new Event('plot'))
    //   })
    // },
    clear () {
      if (window.confirm('clear?')) {
        window.localStorage.removeItem(this.STORAGE_NS)
        this.connections = []
        this.wins = []
        this.$root.$forceUpdate()
        window.dispatchEvent(new Event('plot'))
      }
    },
    onSave () {
      this.save()
    },
    onGear ({ win, wins, connections }) {
      this.currentWinID = win._id
      this.overlay = 'fix-module'
    },
    // trySave: _.debounce(function () {
    //   this.save()
    // }, 10),
    save () {
      const saveDoc = {
        connections: this.connections || [],
        wins: this.wins || []
      }
      window.localStorage.setItem(this.STORAGE_NS, JSON.stringify(saveDoc))
    },
    load () {
      let saveDoc = window.localStorage.getItem(this.STORAGE_NS)
      if (saveDoc) {
        try {
          saveDoc = JSON.parse(saveDoc)
          const { connections, wins } = saveDoc
          this.connections = connections
          this.wins = wins
        } catch (e) {
          console.log(e)
          window.localStorage.removeItem(this.STORAGE_NS)
        }
      }
    },
    setupDrag ({ dom }) {
      this.$refs.area.addEventListener('wheel', (evt) => {
        if (this.overlay) {
          return
        }
        evt.preventDefault()
        this.offset.x += -evt.deltaX
        this.offset.y += -evt.deltaY
        this.$root.$forceUpdate()
        this.$nextTick(() => {
          this.$root.$forceUpdate()
          window.dispatchEvent(new Event('plot'))
        })
      }, { passive: false })

      AGE.UI.makeDrag({
        dom,
        onMM: ({ api, ev }) => {
          this.offset.x += api.dX
          this.offset.y += api.dY
          this.$root.$forceUpdate()
          this.$nextTick(() => {
            this.$root.$forceUpdate()
            window.dispatchEvent(new Event('plot'))
          })
        }
      })
    },
    getStyle () {
      return {
        transform: `translate3d(${this.offset.x}px, ${this.offset.y}px, 0px)`
      }
    },
    onDropConnection (v) {
      const arr = [v.hand, v.land]
      const stuff = {
        [arr[0].io]: arr[0],
        [arr[1].io]: arr[1]
      }
      this.connections.push({
        input: stuff.input,
        output: stuff.output
      })
      this.$root.$forceUpdate()
      // console.log(JSON.stringify(this.connections, null, ' '))
    },
    onClickConnector (connt) {
      let idx = -1
      this.connections.forEach((c, idxo) => {
        if (c.input._id === connt._id || c.output._id === connt._id) {
          idx = idxo
        }
      })
      if (idx !== -1) {
        this.connections.splice(idx, 1)
      }
      // console.log(JSON.stringify(conn, null, ' '))
    }
  }
}
</script>

<style>

</style>
