import Vue from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'
import ajax from './utils/ajax.js'
import './plugins/element-ui.js'
import './assets/css/global.css'
import 'node_modules/element-ui/lib/theme-chalk/index.css'

Vue.prototype.$http = ajax
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
