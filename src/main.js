import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import store from './store'
import * as VueWindow from '@hscmap/vue-window'
import * as VueMenu from '@hscmap/vue-menu'
import './app.postcss'

Vue.use(VueMenu)
Vue.use(VueWindow)

Vue.config.productionTip = false

new Vue({
  router,
  // store,
  render: h => h(App)
}).$mount('#app')
