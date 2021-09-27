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
    path: '/list',
    name: 'List',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/List.vue')
  },
  {
    path: '/settings',
    name: 'Settings',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Settings.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router