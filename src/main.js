import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

Vue.config.productionTip = false
import axiosApi from './api/index.js';
Vue.prototype.$api = axiosApi;

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI);

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
