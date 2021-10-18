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
    path: '/lists/:list',
    name: 'List',
    props: true,
    component: () => import('../views/lists/List.vue'),
    beforeEnter: (to, from, next) => {
      const exists = router.app.$store.state.lists.find(
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
