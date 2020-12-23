import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('../views/user'),
    meta: { title: 'User Management' },
    children: [
      { path: 'user/add', name: '/user/add', component: import('../views/user/modules/user_add'), meta: { title: 'userAdd', parentPath: '/user' }},
      { path: 'user/modify', name: '/user/modify', component: import('../views/user/modules/user_modify'), meta: { title: 'userModify', parentPath: '/user' }},
      { path: 'user/details', name: '/user/details', component: import('../views/user/modules/user_details'), meta: { title: 'userDetail', parentPath: '/user' }}
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login'),
    meta: { title: 'Login Page' }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
