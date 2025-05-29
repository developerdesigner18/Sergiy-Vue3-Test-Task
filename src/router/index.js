import { createRouter, createWebHistory } from 'vue-router'
import HomeTable from '@/views/HomeTable.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeTable
    }
  ]
})

export default router
