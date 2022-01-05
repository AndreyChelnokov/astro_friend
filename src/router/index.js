import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/user',
    name: 'User',
    meta: {
      layout: 'base'
    },
    component: () => import('../views/User.vue')
  },
  {
    path: '/editProfile',
    name: 'EditProfile',
    meta: {
      layout: 'base'
    },
    component: () => import('../views/EditProfile.vue')
  },
  {
    path: '/message',
    name: 'Message',
    meta: {
      layout: 'base'
    },
    component: () => import('../views/Message.vue')
  },
  {
    path: '/',
    name: 'Home',
    meta: {
      layout: 'base'
    },
    component: () => import('../views/Home.vue')
  },
  {
    path: '/search',
    name: 'Search',
    meta: {
      layout: 'base'
    },
    component: () => import('../views/Search.vue')
  },
  {
    path: '/premium',
    name: 'Premium',
    meta: {
      layout: 'base'
    },
    component: () => import('../views/Premium.vue')
  },
  {
    path: '/create',
    name: 'Create',
    meta: {
      layout: 'auth'
    },
    component: () => import('../views/Create.vue')
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      layout: 'auth'
    },
    component: () => import('../views/Login.vue')
  },
  {
    path: '/chat/:id',
    name: 'Chat',
    meta: {
      layout: 'chat'
    },
    component: () => import('../views/Chat.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

