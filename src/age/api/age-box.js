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
import { getID, NS } from './age'

export const getIO = (args) => {
  return {
    ...args,
    _id: getID()
  }
}

export const getWin = () => {
  return {
    _id: getID(),
    title: '',
    type: '',
    transition: '',
    order: 0,
    resize: true,
    pos: {
      x: 0,
      y: 0,
      w: 150,
      h: 100,
      s: 1
    },
    inputs: [
    ],
    outputs: [
    ]
  }
}

export const duplicateBox = (win) => {
  const cw = JSON.parse(JSON.stringify(win))
  cw._id = getID()
  cw.inputs.forEach((io) => {
    io.boxID = cw._id
    io._id = getID()
  })
  cw.outputs.forEach((io) => {
    io.boxID = cw._id
    io._id = getID()
  })
  cw.pos.x += 10
  cw.pos.y += 10
  return cw
}

export const makeDefaultBox = ({ wins }) => {
  const win = getWin()
  win.title = 'Default Box'
  win.previewType = false
  win.boxColor = 'purple'

  win.inputs.push(
    getIO({ label: 'vec4', boxID: win._id, io: NS.IO_TYPES.INPUT, type: NS.DATA_TYPES.VEC4 }),
    getIO({ label: 'vec4', boxID: win._id, io: NS.IO_TYPES.INPUT, type: NS.DATA_TYPES.VEC4 })
  )

  win.outputs.push(
    getIO({ label: 'vec4', boxID: win._id, io: NS.IO_TYPES.OUTPUT, type: NS.DATA_TYPES.VEC4 }),
    getIO({ label: 'vec4', boxID: win._id, io: NS.IO_TYPES.OUTPUT, type: NS.DATA_TYPES.VEC4 })
  )

  wins.push(win)

  win.pos.w = 275
  win.pos.h = 150

  return win
}

export const addInputToFunction = ({ win }) => {
  win.inputs.push(
    getIO({ label: 'vec4', boxID: win._id, io: NS.IO_TYPES.INPUT, type: NS.DATA_TYPES.VEC4 })
  )
}

export const addOutputToFunction = ({ win }) => {
  win.outputs.push(
    getIO({ label: 'vec4', boxID: win._id, io: NS.IO_TYPES.OUTPUT, type: NS.DATA_TYPES.VEC4 })
  )
}
