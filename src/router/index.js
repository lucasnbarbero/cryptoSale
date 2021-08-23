import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Prueba from '../views/Prueba.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/prueba',
    name: 'Prueba',
    component: Prueba
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
