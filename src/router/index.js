import Vue from 'vue'
import VueRouter from 'vue-router'
import Inbox from '../views/Inbox.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Inbox',
    component: Inbox
  },
  {
    path: '/:list',
    name: 'List',
    component: () => import('../views/List.vue')
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('../views/Settings.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
