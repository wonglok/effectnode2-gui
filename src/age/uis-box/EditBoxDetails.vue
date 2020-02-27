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
      <h1>
        Edit Module
      </h1>
      <h2 @click="cloneModule()">
        Clone Module
      </h2>

      <p>
        Is Material Node
        <input class="border border-gray-200 p-2 m-1" type="checkbox" v-model="win.isMaterialNode"  />
      </p>
      <p>
        Is Node
        <input class="border border-gray-200 p-2 m-1" type="checkbox" v-model="win.isNode"  />
      </p>

      <p>
        Node Class
        <input class="border border-gray-200 p-2 m-1" type="text" v-model="win.NodeClass"  />
      </p>

      <p>
        MathNode Args Size
        <select v-model="win.ArgsSize">
          <option :value="1">1</option>
          <option :value="2">2</option>
          <option :value="3">3</option>
        </select>
      </p>

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
        Resize Module Box
        <input class="border border-gray-200 p-2 m-1" type="checkbox" v-model="win.resize"  />
      </p>

      <p>
        Box Title
        <input class="border border-gray-200 p-2 m-1" type="text" v-model="win.title"  />
      </p>

      <p>
        Box Color
        <select v-model="win.boxColor">
          <option :key="ct" v-for="(cv, ct) in colorTypes" :value="ct">{{ ct }}</option>
        </select>
      </p>

      <p>
        Box Preview Type
        <select v-model="win.previewType">
          <option :value="false">No</option>
          <option value="node-material">Node Material</option>
        </select>
      </p>
      <!-- <div class="edit-mod-taller"></div> -->

      <div v-if="win">
        <h2>
          Function Input
        <button class="border border-gray-200 p-2 m-1" @click="addInput({ win })">Add Inputs</button>
        </h2>

        <div :key="input._id" v-for="(input, idx) in win.inputs">
          <div>

            Input Data Type:

            <select v-model="input.type" @change="onChangeArgType({ input, value: $event.target.value })">
              <option value="float">Float</option>
              <option value="vec4">Vector4</option>
              <option value="vec3">Vector3</option>
              <option value="vec2">Vector2</option>
            </select>

            Argument Name:
            <input class="border border-gray-200 p-2 m-1" type="text" v-model="input.label" @input="onChangeArgName({ input, value: input.label })">

            <!-- Defaults:
            <input class="border border-gray-200 p-2 m-1" type="text" v-model="input.defaults"> -->

            <button class="border border-gray-200 p-2 m-1" @click="removeInput({ input, idx, inputs: win.inputs })">Remove</button>
          </div>
        </div>

        <h2>
          Function Output
        <button class="border border-gray-200 p-2 m-1" @click="addOutput({ win })">Add Outputs</button>

        </h2>

        <div :key="output._id" v-for="(output, idx) in win.outputs">
          Output Data Type:

          <select class="border border-gray-200 p-2 m-1" v-model="output.type" @change="onChangeArgType({ output, value: $event.target.value })">
            <option value="float">Float</option>
            <option value="vec4">Vector4</option>
            <option value="vec3">Vector3</option>
            <option value="vec2">Vector2</option>
          </select>

          Argument Name:
          <input class="border border-gray-200 p-2 m-1" type="text" v-model="output.label" @output="onChangeArgName({ output, value: output.label })">

          <button class="border border-gray-200 p-2 m-1" @click="removeOutput({ output, idx, outputs: win.outputs })">Remove</button>
          <!-- Defaults:
          <input class="border border-gray-200 p-2 m-1" type="text" v-model="output.defaults"> -->
        </div>

        <!-- <textarea v-model="win.data" cols="30" rows="10" @input="refresh()"></textarea> -->
        <!-- <textarea v-model="win.fnInner" cols="30" rows="10" @input="compile"></textarea> -->
        <!--  -->

        <p>
          Library
        </p>
        <Brace style="height: 200px;" :mode="'glsl'" :getter="() => win.fnExt" :setter="(v) => { win.fnExt = v }"></Brace>
        <p>
          Function Body
        </p>

        <Brace style="height: 200px;" :mode="'glsl'" :getter="() => win.fnInner" :setter="(v) => { win.fnInner = v }"></Brace>

        <pre>{{ win }}</pre>
      </div>
      <button @click="removeWin({ win })">Remove This</button>
      <div>
        <p>JSON</p>
        <VJsoneditor style="height: 600px" v-model="win" :options="opts"></VJsoneditor>

        <!-- <pre>{{ win }}</pre> -->
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

export default {
  components: {
    VJsoneditor,
    Brace: require('./Brace.vue').default
  },
  props: {
    winID: {},
    wins: {},
    connections: {}
  },
  data () {
    return {
      MathNode: AGE.MathNode,
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
    cloneModule () {
      const mod = AGE.BOX.cloneModule(this.win)
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
</script>

<style>

</style>
