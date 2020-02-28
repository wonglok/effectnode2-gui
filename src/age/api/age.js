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
// import Vue from 'vue'

export const UI = require('./age-ui.js')
export const BOX = require('./age-box.js')
export const VFX = require('./age-shader.js')
export const Market = require('./age-box-market.js')

export const OperatorNode = {
  ADD: true,
  SUB: true,
  MUL: true,
  DIV: true
}

const A1 = {}
const A2 = {}
const A3 = {}
export const MathNode = {
  A1,
  A2,
  A3
}

// 1 input
A1.RAD = true
A1.DEG = true
A1.EXP = true
A1.EXP2 = true
A1.LOG = true
A1.LOG2 = true
A1.SQRT = true
A1.INV_SQRT = true
A1.FLOOR = true
A1.CEIL = true
A1.NORMALIZE = true
A1.FRACT = true
A1.SATURATE = true
A1.SIN = true
A1.COS = true
A1.TAN = true
A1.ASIN = true
A1.ACOS = true
A1.ARCTAN = true
A1.ABS = true
A1.SIGN = true
A1.LENGTH = true
A1.NEGATE = true
A1.INVERT = true

// 2 inputs
A2.MIN = true
A2.MAX = true
A2.MOD = true
A2.STEP = true
A2.REFLECT = true
A2.DISTANCE = true
A2.DOT = true
A2.CROSS = true
A2.POW = true

// 3 inputs
A3.MIX = true
A3.CLAMP = true
A3.REFRACT = true
A3.SMOOTHSTEP = true
A3.FACEFORWARD = true

/*
----------------------------------

----------------------------------
*/

/* eslint-disable quotes */

export const NS = {
  SHADER_TYPES: {
    BOTH: 'both',
    VARYING_VERTEX: 'varying_vertex',
    VARYING_FRAGMENT: 'varying_fragment',
    VERTEX: 'vertexShader',
    FRAGMENT: 'fragmentShader'
  },
  IO_TYPES: {
    BOTH: 'both',
    INPUT: 'input',
    OUTPUT: 'output'
  },
  DEFAULT_VALUES: {
    NULL: 'null',

    float: '0.0',
    vec2: `vec2(0.0, 0.0)`,
    vec3: `vec3(0.0, 0.0, 0.0)`,
    vec4: `vec4(0.0, 0.0, 0.0, 0.0)`,

    VEC2: `vec2(0.0, 0.0)`,
    VEC3: `vec3(0.0, 0.0, 0.0)`,
    VEC4: `vec4(0.0, 0.0, 0.0, 0.0)`,

    VEC2_MIX: `vec2(1.0, 1.0)`,
    VEC3_MIX: `vec3(1.0, 1.0, 1.0)`,
    VEC4_MIX: `vec4(1.0, 1.0, 1.0, 1.0)`,

    float0: '0.0',
    float1: '1.0',

    gl_Position: 'vec4(position, 1.0)',
    gl_PointSize: '1.0',
    gl_FragColor: 'vec4(0.5, 0.5, 0.5, 0.5)'
  },
  DATA_TYPES: {
    SAMPLER2D: 'sampler2D',
    TEXTURE2D: 'texture2D',

    VEC4: 'vec4',
    VEC3: 'vec3',
    VEC2: 'vec2',
    FLOAT: 'float'
  }
}

export const boxColorTypes = {
  grey: `linear-gradient(251deg, #ccc 9%, #b1b1b1 100%)`,
  purple: `linear-gradient(251deg, rgba(214, 192, 255, 0.72) 9%, rgb(133, 27, 255) 100%)`,
  blue: `linear-gradient(251deg, rgba(192,223,255,0.72) 9%, #1B86FF 100%)`,
  red: `linear-gradient(251deg, rgba(255,192,192,0.72) 9%, #FF1B1B 100%)`,
  yellow: `linear-gradient(251deg, rgba(255,221,192,0.72) 9%, #FF881B 100%)`,
  default: `linear-gradient(251deg, rgba(255,221,192,0.72) 9%, #FF881B 100%)`,
  insta: `linear-gradient(251deg, rgba(255, 192, 250, 0.72) 9%, rgb(27, 234, 255) 100%)`,
  green: `linear-gradient(251deg, rgba(192,255,210,0.72) 9%, #18CA1A 100%)`
}

/* eslint-disable quote-props */

export const connectorColorTypes = {
  'u': `#cccccc`,
  'v': `#b1b1b1`,

  'ccc': `#ccc`,
  'a': `#b1b1b1`,
  'r': `#F72626`,
  'g': `#1FC938`,
  'b': `#1F59C9`,

  'sampler2D': `#F72626`,
  'float': `#1FC938`,
  'vec2': `hsl(38, 93%, 66%)`,
  'vec3': `hsl(38, 93%, 55%)`,
  'vec4': `hsl(38, 93%, 35%)`,
  'mat3': `#1F59C9`,
  'mat4': `#1F59C9`
}

export const getID = () => {
  return `_${Number(100000000 * Math.random()).toFixed(0)}_`
}

export const waitGet = ({ getter }) => {
  return new Promise((resolve) => {
    let tout = 0
    tout = setInterval(() => {
      const val = getter()
      if (val) {
        resolve(val)
        clearTimeout(tout)
      }
    })
  })
}
