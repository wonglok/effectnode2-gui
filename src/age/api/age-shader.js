const Nodes = {
  ...require('three/examples/jsm/nodes/Nodes.js')
}

export const makeNodeByWin = ({ win }) => {
  let inst = false
  if (win.NodeClass === 'MathNode') {
    if (win.NodeClass === 'MathNode' && win.ArgsSize === 1) {
      inst = new Nodes[win.NodeClass](...[new Nodes.FloatNode(0), Nodes.MathNode[win.MathMode]])
    } else if (win.NodeClass === 'MathNode' && win.ArgsSize === 2) {
      inst = new Nodes[win.NodeClass](...[new Nodes.FloatNode(0), new Nodes.FloatNode(0), Nodes.MathNode[win.MathMode]])
    } else if (win.NodeClass === 'MathNode' && win.ArgsSize === 3) {
      inst = new Nodes[win.NodeClass](...[new Nodes.FloatNode(0), new Nodes.FloatNode(1), new Nodes.FloatNode(0.5), Nodes.MathNode[win.MathMode]])
    }
  } else {
    inst = new Nodes[win.NodeClass](...(win.args || []))
  }
  return inst
}

export const makeMat = async ({ wins, connections }) => {
  const nodes = {}

  // instantiate
  wins.filter(e => e.isMaterialNode || e.isNode).forEach((win) => {
    nodes[win._id] = makeNodeByWin({ win })
  })

  // initialization
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
  }
  initValues()

  window.addEventListener('pulse', () => {
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

  const root = wins.find(e => e.isMaterialNode)
  if (root) {
    const rootMat = nodes[root._id]
    rootMat.needsUpdate = true
    return rootMat
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
