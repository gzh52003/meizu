import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import User from '../views/User.vue'
import UserEdit from '../views/UserEdit.vue'
import Goods from '../views/Goods.vue'
import GoodsEdit from '../views/GoodsEdit.vue'
import Order from '../views/Order.vue'
import NotFound from '../views/NotFound.vue'
import Login from '../views/Login.vue'
import Reg from '../views/Reg.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '',
    redirect: '/user'
  },
  {
    path: '/user',
    name: 'User',
    component: User
  },
  {
    path: '/useredit/:id',
    name: 'userEdit',
    component: UserEdit
  },
  {
    path: '/goods',
    name: 'Goods',
    component: Goods
  },
  {
    path: '/goodsedit/:id',
    name: 'goodsEdit',
    component: GoodsEdit
  },
  {
    path: '/order',
    name: 'Order',
    component: Order
  },
  {
      path: '/login', 
      component: Login
  },
  { 
    path: '/reg', 
    component: Reg
  },
  {
    path: '/404',
    component: NotFound
  },
  {
    path:'*',
    redirect: '/404'
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
