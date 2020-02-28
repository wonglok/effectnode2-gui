var path = require('path')
const exporter = module.exports
function importAll (folder, r) {
  exporter[folder] = exporter[folder] || []
  r.keys().forEach(key => {
    try {
      const filename = path.basename(key).replace('.json', '')
      exporter[folder].push({
        group: folder,
        key: filename,
        value: r(key)
      })
    } catch (e) {
    }
  })
}

importAll('UI', require.context('./box/UI', true, /\.json$/))
importAll('Material', require.context('./box/Material', true, /\.json$/))
importAll('Input', require.context('./box/Input', true, /\.json$/))

importAll('FloatMath', require.context('./box/FloatMath', true, /\.json$/))
importAll('Vec3Math', require.context('./box/Vec3Math', true, /\.json$/))

importAll('FloatOperator', require.context('./box/FloatOperator', true, /\.json$/))
importAll('Vec3Operator', require.context('./box/Vec3Operator', true, /\.json$/))

//
