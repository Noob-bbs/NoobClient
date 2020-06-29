import Vue from 'vue'
import VueRouter from 'vue-router'
//import Home from '../views/Home.vue'
import AppIndex from '../components/home/AppIndex.vue'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Home from '@/pages/Home.vue'
Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/index',
    redirect: '/',
    name: 'AppIndex',
    component: AppIndex
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
