import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/UserStore'
import HomeView from '../views/HomeView.vue'
import ShowSkatepark from '@/views/skateparks/ShowSkatepark.vue'
import MapView from '@/views/MapView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/AboutView.vue'),
    },
    {
      path: '/skateparks/add',
      name: 'add skatepark',
      component: () => import('@/views/skateparks/AddSkatepark.vue'),
      beforeEnter: (to, from) => {
        const userStore = useUserStore()
        if (!userStore.user) {
          return { name: 'login' }
        }
        return true
      },
    },
    {
      path: '/skateparks/:stateSlug/:slug',
      name: 'show skatepark',
      component: ShowSkatepark,
    },
    {
      path: '/skateparks/:stateSlug/:slug/edit',
      name: 'edit skatepark',
      component: () => import('@/views/skateparks/EditSkatepark.vue'),
      beforeEnter: (to, from) => {
        const userStore = useUserStore()
        if (!userStore.user) {
          return { name: 'login' }
        }
        return true
      },
    },
    {
      path: '/map',
      name: 'map',
      component: () => import('@/views/MapView.vue'),
    },
    {
      path: '/cities',
      name: 'cities',
      component: () => import('@/views/CitiesView.vue'),
    },
    {
      path: '/city/:stateSlug/:citySlug',
      name: 'city skateparks',
      component: () => import('@/views/CityView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/admin/LoginView.vue'),
    },
  ],
})

export default router
