import Vue from 'vue'
import Router from 'vue-router'

import { store } from './store/store'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/employment',
      name: 'employment',
      component: () => import(/* webpackChunkName: "about" */ './views/Employment.vue')
    },
    {
      path: '/tenants',
      name: 'tenants',
      component: () => import(/* webpackChunkName: "about" */ './views/TenantsSavings.vue')
    },
    {
      path: '/framework',
      name: 'framework',
      component: () => import(/* webpackChunkName: "about" */ './views/Framework.vue')
    },
    {
      path: '/upload',
      name: 'upload',
      component: () => import('./views/UploadPage.vue')
    },
    {
      path: '/createproject',
      name: 'createproject',
      component: () => import('./views/CreateProject.vue')
    },
    {
      path: '/editproject',
      name: 'editproject',
      component: () => import('./views/EditProject.vue')
    },
    {
      path: '/editdashboard',
      name: 'editdashboard',
      component: () => import('./views/EditDashboard.vue')
    },    
    {
      path: '/404',
      name: 'four-o-four',
      component: () => import('./views/404.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (store.state.loggedIn === false && to.name !== 'login') {
    alert('Please login before access this page')
    next('/login')
  } else if (store.state.loggedIn === true && to.name === 'login') {
    alert('You alread logged in')
    next('/home')
  }
  next()
})

export default router
