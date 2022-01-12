import Vue from 'vue'
import Router from 'vue-router'
import index from '@/page/index'
Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {path: '/index', component: index, name: 'index'},
    {path: '/', name: 'index', component: index, redirect: ''},
  ]
})
