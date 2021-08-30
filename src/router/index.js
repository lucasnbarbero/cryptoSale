import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Transacciones from '../views/Transacciones.vue'
import Historial from '../views/Historial.vue'
import Estado from '../views/Estado.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/transacciones',
    name: 'Transacciones',
    component: Transacciones
  },
  {
    path: '/historial',
    name: 'Historial',
    component: Historial
  },
  {
    path: '/estado',
    name: 'Estado',
    component: Estado
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
