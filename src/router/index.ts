import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../components/Home.vue')
    },
    {
      path: '/Entrega',
      name: 'FormEntrega',
      component: () => import('../views/FormEntrega.vue')
    },
    {
      path: '/Devolucion',
      name: 'FormDevolucion',
      component: () => import('../views/FormDevolucion.vue')
    },
    {
      path: '/OrdenSalida',
      name: 'FormOrdenSalida',
      component: () => import('../views/FormOrdenSalida.vue')
    }
  ]
})

export default router