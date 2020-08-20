import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import User from '../views/User.vue'
import UserEdit from '../views/UserEdit.vue'
import Goods from '../views/Goods.vue'
import GoodsEdit from '../views/GoodsEdit.vue'
import Reg from '../views/Reg.vue'
import Login from '../views/Login.vue'


Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '',
    redirect: '/user'
  },
  {
    path: '/',
    name: 'User',
    component: User
  },
  {
    path: 'edit/:id',
    name: 'userEdit',
    component: UserEdit
  },
  {
    path: '/',
    name: 'Goods',
    component: Goods
  },
  {
    path: 'goods/:id',
    name: 'goodsEdit',
    component: GoodsEdit
  },
  {
    path: 'reg',
    component: Reg
  },
  {
    path: 'login',
    component: Login
  },
  {
    path:'*',
    redirect: '/404'
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
