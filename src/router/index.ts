import Vue from 'vue'
import Router from 'vue-router'
import App from '@/App.vue'
// import Layout from '@/layout/index.vue'
Vue.use(Router)

export const constantRoutes = [
        {
          path: '/',
          redirect: '/tree-view',
          // component: Layout,
          children: [
            {
              path: '/treee-view',
              name: 'App',
              component: App
            },
            {
              path: '/treee-view/:name',
              name: 'File',
              component: App
            }
          ]
        }
]

const router = new Router({
  mode: 'history',
  routes : constantRoutes
})

export default router
