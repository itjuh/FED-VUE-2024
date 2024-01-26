import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/world',
      name: 'World',
      component: World
    },
    {
      path: '/foods',
      name: 'Foods',
      component: Foods
    }
  ]
})
