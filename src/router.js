import Vue from 'vue'
import Router from 'vue-router'

// import { store } from './store/store'

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
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Employment.vue')
    },
    {
      path: '/attendance',
      name: 'attendance',
      component: () => import('./views/Attendance.vue')
    },
    {
      path: '/ict',
      name: 'ict',
      // component: Ict
      component: () => import('./views/Ict.vue')
    },
    {
      path: '/upload',
      name: 'upload',
      component: () => import('./views/UploadPage.vue')
    },
    // {
    //   path: '/framework',
    //   name: 'framework',
    //   component: () => import('./views/Framework.vue')      
    // },
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

// router.beforeEach((to, from, next) => {
//   if (store.state.loggedIn === false && to.name !== 'login') {
//     alert('Please login before access this page')
//     next('/login')
//   } else if (store.state.loggedIn === true && to.name === 'login') {
//     alert('You alread logged in')
//     next('/home')
//   }
//   next()
// })

export default router
