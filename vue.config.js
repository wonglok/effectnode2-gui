module.exports = {
  devServer: {
    // proxy: {
    //   // netlify dev with functions
    //   '/.netlify/functions/': {
    //     target: 'http://localhost:8888'
    //   }
    // }
  },
  runtimeCompiler: true,
  css: {
    extract: false
  },
  configureWebpack: {
    plugins: [
    ]
  }
}
