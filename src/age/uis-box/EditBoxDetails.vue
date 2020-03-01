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
  <div class="full age-addbox-wrap scroller">
    <div class="age-addbox-close-plane full" @click="close()">
    </div>
    <div class="age-addbox-content scroller" ref="scroller">
      <h1 class=" font-title text-xl">
        Advanced Module Edit
      </h1>
      <div>
        <div class="ml-0 border p-2 border-b-0 mx-1 inline-block font-title text-lg" :class="{ 'text-blue-300': tab === 'module' }" @click="tab = 'module'">
          Module
        </div>
        <div class="border p-2 border-b-0 mx-1 inline-block font-title text-lg" :class="{ 'text-blue-300': tab === 'OperatorNode' }" @click="tab = 'OperatorNode'">
          OperatorNode
        </div>
        <div class="border p-2 border-b-0 mx-1 inline-block font-title text-lg" :class="{ 'text-blue-300': tab === 'MathNode' }" @click="tab = 'MathNode'">
          MathNode
        </div>
        <div class="border p-2 border-b-0 mx-1 inline-block font-title text-lg" :class="{ 'text-blue-300': tab === 'debug' }" @click="tab = 'debug'">
          Debug
        </div>
      </div>

      <div class="border p-3" v-if="tab === 'module'">
        <div class="mb-2">
          Box Title
          <input class="border border-gray-200 p-2" placeholder="Box Title" type="text" v-model="win.title"  />
        </div>
        <div class="mb-2">
          Node Class
          <input class="border border-gray-200 p-2" placeholder="Node Class" type="text" v-model="win.NodeClass"  />
        </div>

        <div class="mb-2">
          Box Color
          <div class="inline-flex relative w-40 flex-no-wrap">
            <select class="inline-block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline" v-model="win.boxColor">
              <option :key="ct" v-for="(cv, ct) in colorTypes" :value="ct">{{ ct }}</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>

        <div class="mb-2">
          Box Preview Type
          <div class="inline-flex relative w-40 flex-no-wrap">
            <select v-model="win.previewType" class="inline-block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline">
              <option :value="false">No</option>
              <option value="node-material">Node Material</option>
              <!-- <option :key="ct" v-for="(cv, ct) in colorTypes" :value="ct">{{ ct }}</option> -->
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>

        <div class="mb-2">
          <div class="ml-0 border p-3 mx-2 inline-block cursor-pointer" @click="copyModuleToClipBoard()">
            Copy Module to Clipboard
          </div>

          <div class="border p-3 mx-2 inline-block cursor-pointer" @click="duplicateBox()">
            Duplicate Box
          </div>

          <div class="border p-3 mx-2 inline-block cursor-pointer text-red-600 bg-red-200" @click="removeWin({ win })">
            Remove This
          </div>
        </div>

        <div>
          <OnOffSwitch :label="'Is Node'" v-model="win.isNode"></OnOffSwitch>
          <OnOffSwitch :label="'Is Module Pinned'" v-model="win.pinned"></OnOffSwitch>
          <OnOffSwitch :label="'Is Material Node'" v-model="win.isMaterialNode"></OnOffSwitch>
          <OnOffSwitch :label="'Resize Module Box'" v-model="win.resize"></OnOffSwitch>
        </div>

        <div class="border-b my-4"></div>

        <div v-if="win">
          <div>
            <h2 class="inline-block mr-2 font-title text-lg">
              Input
            </h2>
            <button class="border border-gray-200 p-2 m-1 bg-green-200" @click="addInput({ win })">Add Inputs</button>

            <div :key="input._id" v-for="(input, idx) in win.inputs">
              <div>
                DataType:
                <div class="inline-flex relative w-40 flex-no-wrap">
                  <select v-model="input.type" @change="onChangeArgType({ input, value: $event.target.value })" class="inline-block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline">
                    <option value="general">General Type</option>
                    <option value="float">Float</option>
                    <option value="vec4">Vector4</option>
                    <option value="vec3">Vector3</option>
                    <option value="vec2">Vector2</option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>

                Prop Name:
                <input class="border border-gray-200 p-2 m-1" type="text" v-model="input.label" @input="onChangeArgName({ input, value: input.label })">

                <!-- Defaults:
                <input class="border border-gray-200 p-2 m-1" type="text" v-model="input.defaults"> -->

                <button class="border border-gray-200 p-2 m-1 bg-red-200" @click="removeInput({ input, idx, inputs: win.inputs })">Remove</button>
              </div>
            </div>
          </div>

          <div>
            <h2 class="inline-block mr-2 font-title text-lg">
              Output
            </h2>
            <button class="border border-gray-200 p-2 m-1 bg-green-200" @click="addOutput({ win })">Add Outputs</button>

            <div :key="output._id" v-for="(output, idx) in win.outputs">
              DataType:
              <div class="inline-flex relative w-40 flex-no-wrap">
                <select v-model="output.type" @change="onChangeArgType({ output, value: $event.target.value })" class="inline-block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline">
                  <option value="general">General Type</option>
                  <option value="float">Float</option>
                  <option value="vec4">Vector4</option>
                  <option value="vec3">Vector3</option>
                  <option value="vec2">Vector2</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>

              <!-- Data Type:

              <select class="border border-gray-200 p-2 m-1" v-model="output.type" @change="onChangeArgType({ output, value: $event.target.value })">
                <option value="general">General Type</option>
                <option value="float">Float</option>
                <option value="vec4">Vector4</option>
                <option value="vec3">Vector3</option>
                <option value="vec2">Vector2</option>
              </select> -->

              Prop Name:
              <input class="border border-gray-200 p-2 m-1" type="text" v-model="output.label" @output="onChangeArgName({ output, value: output.label })">

              <button class="border border-gray-200 p-2 m-1 bg-red-200" @click="removeOutput({ output, idx, outputs: win.outputs })">Remove</button>
              <!-- Defaults:
              <input class="border border-gray-200 p-2 m-1" type="text" v-model="output.defaults"> -->
            </div>
          </div>

          <!-- <textarea v-model="win.data" cols="30" rows="10" @input="refresh()"></textarea> -->
          <!-- <textarea v-model="win.fnInner" cols="30" rows="10" @input="compile"></textarea> -->
          <!--  -->

          <!-- <p>
            Library
          </p>
          <Brace style="height: 200px;" :mode="'glsl'" :getter="() => win.fnExt" :setter="(v) => { win.fnExt = v }"></Brace>
          <p>
            Function Body
          </p>

          <Brace style="height: 200px;" :mode="'glsl'" :getter="() => win.fnInner" :setter="(v) => { win.fnInner = v }"></Brace>

          <pre>{{ win }}</pre> -->
        </div>
      </div>
      <div class="border p-3" v-if="tab === 'OperatorNode'">
        <p>
          OperatorNode
          <select v-model="win.OperatorNode">
            <option :value="false">None</option>
            <option :key="key" v-for="(val, key) in OperatorNode" :value="key">{{ key }}</option>
          </select>
        </p>
      </div>
      <div class="border p-3" v-if="tab === 'MathNode'">
        <p>
          MathNode Mode
          <select v-model="win.MathMode" @input="onSelectMath()" @change="onSelectMath()">
            <option :value="false">None</option>
            <optgroup label="Arg Size 1">
              <option :key="key" v-for="(val, key) in MathNode.A1" :value="key">{{ key }}</option>
            </optgroup>
            <optgroup label="Arg Size 2">
              <option :key="key" v-for="(val, key) in MathNode.A2" :value="key">{{ key }}</option>
            </optgroup>
            <optgroup label="Arg Size 3">
              <option :key="key" v-for="(val, key) in MathNode.A3" :value="key">{{ key }}</option>
            </optgroup>
          </select>
        </p>

        <p>
          MathNode Args Size
          <select v-model="win.ArgsSize" disabled class=" text-red-400">
            <option :value="1">1</option>
            <option :value="2">2</option>
            <option :value="3">3</option>
          </select>
        </p>
      </div>
      <div class="border p-3" v-if="tab === 'debug'">
        <div>
          <VJsoneditor style="height: 600px" v-model="win" :options="opts"></VJsoneditor>
        </div>
      </div>

    </div>
    <div class="age-addbox-close" @click="close()">
      <img src="../icons/close.svg" alt="" />
    </div>
  </div>
</template>

<script>
import * as AGE from '../api/age'
import VJsoneditor from 'v-jsoneditor'
import copy from 'copy-to-clipboard'

export default {
  components: {
    OnOffSwitch: require('./OnOffSwitch').default,
    VJsoneditor //,
    // Brace: require('./Brace.vue').default
  },
  props: {
    winID: {},
    wins: {},
    connections: {}
  },
  data () {
    return {
      tab: 'module',
      MathNode: AGE.MathNode,
      OperatorNode: AGE.OperatorNode,
      colorTypes: AGE.boxColorTypes,
      opts: {
        mode: 'code',
        onChangeText: this.onChangeText
      },
      win: this.wins.find(e => e._id === this.winID)
    }
  },
  watch: {
    win: {
      deep: true,
      handler () {
        this.save()
        this.compile()
        this.plot()
      }
    }
  },
  mounted () {
    // this.$refs['scroller'].addEventListener('scroller', (evt) => {
    //   evt.stopPropagation()
    // }, { passive: false })
    const close = (evt) => {
      if (evt.keyCode === 27) {
        // console.log(evt)
        window.removeEventListener('keydown', close)
        this.close()
      }
    }
    window.addEventListener('keydown', close, { passive: false })
  },
  methods: {
    copyModuleToClipBoard () {
      const str = JSON.stringify(this.win, null, '  ')
      copy(str)
      // window.alert('copied')
    },
    onSelectMath () {
      if (this.win.MathMode in this.MathNode.A1) {
        this.win.ArgsSize = 1
      } else if (this.win.MathMode in this.MathNode.A2) {
        this.win.ArgsSize = 2
      } else if (this.win.MathMode in this.MathNode.A3) {
        this.win.ArgsSize = 3
      }
      window.dispatchEvent(new Event('compile-shader'))
    },
    duplicateBox () {
      const mod = AGE.BOX.duplicateBox(this.win)
      this.wins.push(mod)
      this.close()
    },
    onChangeText (json) {
      try {
        json = JSON.parse(json)
        const idx = this.wins.findIndex(w => w._id === json._id)
        this.wins[idx] = json
        console.log(json)
        this.refresh()
      } catch (e) {
      }
    },
    refresh () {
      this.$emit('save', true)
      this.plot()
      this.$parent.$forceUpdate()
    },
    plot () {
      window.dispatchEvent(new Event('ui-layout'))
      window.dispatchEvent(new Event('plot'))
    },
    removeInput ({ input, idx, inputs }) {
      this.$parent.onClickConnector(input)
      inputs.splice(idx, 1)
    },
    removeOutput ({ output, idx, outputs }) {
      this.$parent.onClickConnector(output)
      outputs.splice(idx, 1)
    },
    onChangeArgName ({ input, output, value }) {
      if (input) {
        input.label = value
      } else if (output) {
        output.label = value
      }
    },
    onChangeArgType ({ output, input, value }) {
      if (input) {
        input.defaults = AGE.NS.DEFAULT_VALUES[value]
        input.type = value
        input.io = 'input'
        input.label = value
      } else if (output) {
        output.defaults = AGE.NS.DEFAULT_VALUES[value]
        output.type = value
        output.io = 'output'
        output.label = value
      }
    },
    addInput ({ win }) {
      AGE.BOX.addInputToFunction({ win })
      this.compile()
      this.save()
    },
    addOutput ({ win }) {
      AGE.BOX.addOutputToFunction({ win })
      this.compile()
      this.save()
    },
    compile () {
      window.dispatchEvent(new Event('compile-shader'))
    },
    save () {
      this.$emit('save', true)
    },
    close () {
      this.compile()
      this.$parent.overlay = false
      this.$forceUpdate()
      this.save()
    },
    remove ({ win }) {
      win.inputs.forEach((conn) => {
        this.$parent.onClickConnector(conn)
      })
      win.outputs.forEach((conn) => {
        this.$parent.onClickConnector(conn)
      })
      this.wins.splice(this.wins.findIndex(w => w._id === win._id), 1)
      this.$root.$forceUpdate()
    },
    removeWin ({ win }) {
      if (window.confirm('delete?')) {
        this.remove({ win })

        if (this.win.alsoRemove) {
          const anotherWinID = this.win.alsoRemove
          const anotherWin = this.wins.find(w => w._id === anotherWinID)
          this.remove({ win: anotherWin })
        }

        this.close()
      }
    }
  }
}
</script>

<style>

</style>
