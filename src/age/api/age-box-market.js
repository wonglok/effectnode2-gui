var path = require('path')

const exporter = module.exports

function importAll (r) {
  r.keys().forEach(key => {
    try {
      const filename = path.basename(key).replace('.json', '')
      exporter[filename] = r(key)
    } catch (e) {
    }
  })
}

importAll(require.context('./box', true, /\.json$/))
