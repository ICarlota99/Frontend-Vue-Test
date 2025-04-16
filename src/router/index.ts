import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import Home from '@/views/HomeView.vue'
import ProductDetail from '@/views/ProductDetailView.vue'

// Define route interfaces for better TypeScript support
declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
    title?: string
    transition?: string
  }
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: 'Home - My Store',
      transition: 'fade'
    }
  },
  {
    path: '/products/:id/details',
    name: 'ProductDetailView',
    component: ProductDetail,
    meta: {
      title: 'Product Details',
      transition: 'slide-down',
      requiresAuth: false
    },
  },
  // Add a catch-all route for 404 errors
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/NotFound.vue'),
    meta: {
      title: 'Page Not Found'
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  // Configure scroll behavior
  scrollBehavior(to, from, savedPosition) {
    void from; // Pending for personalized navigation
    if (savedPosition) {
      return savedPosition
    } else if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  }
})

export default router