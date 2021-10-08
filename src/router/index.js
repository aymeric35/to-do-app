import Vue from 'vue'
import VueRouter from 'vue-router'
import Inbox from '../views/Inbox.vue'
import store from '@/store.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Inbox',
    component: Inbox
  },
  {
    path: '/lists/:list',
    name: 'List',
    props: true,
    component: () => import('../views/lists/List.vue'),
    beforeEnter: (to, from, next) => {
      const exists = store.lists.find(
        list => list === to.params.list
      );
      if (exists) {
        next()
      } else {
        next({ name: '404' })
      }
    }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('../views/Settings.vue')
  },
  {
    path: '/404',
    alias: '*',
    name: '404',
    component: () => import('../views/404.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
