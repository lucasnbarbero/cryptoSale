import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Transactions from '../views/Transactions.vue'
import History from '../views/History.vue'
import State from '../views/State.vue'
import Investments from '../views/Investments.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/transactions',
    name: 'Transactions',
    component: Transactions
  },
  {
    path: '/history',
    name: 'History',
    component: History
  },
  {
    path: '/state',
    name: 'State',
    component: State
  },
  {
    path: '/investments',
    name: 'Investments',
    component: Investments
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
