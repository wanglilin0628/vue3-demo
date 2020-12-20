import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/branch',
    name: 'Branch',
    component: () => import('../views/branch'),
    meta: { title: 'Branch Management' },
    children: [
      { path: 'branch/add', name: '/branch/add', component: import('../views/branch/modules/branch_add'), meta: { title: 'newBranch', parentPath: '/branch' }},
      { path: 'branch/add', name: '/branch/modify', component: import('../views/branch/modules/branch_modify'), meta: { title: 'modifyBranch', parentPath: '/branch' }},
      { path: 'branch/details', name: '/branch/details', component: import('../views/branch/modules/branch_details'), meta: { title: 'detailsBranch', parentPath: '/branch' }}
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
