import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '',
    component: () => import( '../views/index.vue')
  },
  {
    path: '/device',
    name: 'device',
    component: () => import( '../views/DevicePopup.vue')
  },
  {
    path: '/warn',
    name: 'warn',
    component: () => import( '../views/WarnPopup')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
