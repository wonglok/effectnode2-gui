import { TextureLoader } from 'three'
const Nodes = {
  ...require('three/examples/jsm/nodes/Nodes.js')
}

export const makeNodeByWin = ({ win }) => {
  let inst = false
  if (win.NodeClass === 'MathNode') {
    if (win.ArgsSize === 1) {
      inst = new Nodes[win.NodeClass](...[new Nodes.FloatNode(0), Nodes.MathNode[win.MathMode]])
    } else if (win.ArgsSize === 2) {
      inst = new Nodes[win.NodeClass](...[new Nodes.FloatNode(1), new Nodes.FloatNode(1), Nodes.MathNode[win.MathMode]])
    } else if (win.ArgsSize === 3) {
      inst = new Nodes[win.NodeClass](...[new Nodes.FloatNode(1), new Nodes.FloatNode(1), new Nodes.FloatNode(1), Nodes.MathNode[win.MathMode]])
    }
  } else if (win.NodeClass === 'OperatorNode') {
    inst = new Nodes[win.NodeClass](...[new Nodes.FloatNode(1), new Nodes.FloatNode(1), Nodes.OperatorNode[win.OperatorNode]])
  } else if (win.NodeClass === 'TextureNode') {
    inst = new Nodes[win.NodeClass](...[new TextureLoader().load(win.src)])
    inst.src = win.src
  } else {
    inst = new Nodes[win.NodeClass](...(win.args || []))
  }
  return inst
}

export const makeMat = async ({ wins, connections }) => {
  const nodes = {}

  // instantiate
  wins.filter(e => e.isNode).forEach((win) => {
    nodes[win._id] = makeNodeByWin({ win })
  })

  // initValues
  const initValues = () => {
    wins.filter(e => e.NodeClass === 'ColorNode').forEach((win) => {
      if (nodes[win._id]) {
        nodes[win._id].value.setStyle(win.color)
      }
    })

    wins.filter(e => e.NodeClass === 'FloatNode').forEach((win) => {
      if (nodes[win._id]) {
        nodes[win._id].value = Number(win.value)
      }
    })

    wins.filter(e => e.NodeClass === 'TextureNode').forEach((win) => {
      if (nodes[win._id] && nodes[win._id].src !== win.src) {
        nodes[win._id].value = new TextureLoader().load(win.src)
      }
    })
  }

  initValues()
  window.addEventListener('update-ui', () => {
    initValues()
  })

  // Link Nodes
  connections.forEach((cnn) => {
    const outputNode = nodes[cnn.output.boxID]
    const inputNode = nodes[cnn.input.boxID]
    // node property = label of window input
    inputNode[cnn.input.label] = outputNode
  })

  // console.log(wins, connections)

  const rootNode = wins.find(e => e.isMaterialNode)
  if (rootNode) {
    const rootMaterial = nodes[rootNode._id]
    rootMaterial.needsUpdate = true
    return rootMaterial
  }
}

// export const StandardNodeMaterial = () => {
//   const mtl = new Nodes.StandardNodeMaterial()
//   // mtl.color = // albedo (vec3)
//   // mtl.alpha = // opacity (float)
//   // mtl.roughness = // roughness (float)
//   // mtl.metalness = // metalness (float)
//   // mtl.normal = // normal (vec3)
//   // mtl.emissive = // emissive color (vec3)
//   // mtl.ambient = // ambient color (vec3)
//   // mtl.shadow = // shadowmap (vec3)
//   // mtl.light = // custom-light (vec3)
//   // mtl.ao = // ambient occlusion (float)
//   // mtl.environment = // reflection/refraction (vec3)
//   // mtl.position = // vertex local position (vec3)

//   return mtl
// }
