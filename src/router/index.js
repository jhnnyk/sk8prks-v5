import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/UserStore'
import HomeView from '../views/HomeView.vue'
import ShowSkatepark from '@/views/skateparks/ShowSkatepark.vue'

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
      component: () => import('@/views/AboutView.vue'),
      meta: { title: 'about | sk8prks.com' },
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
      meta: { title: 'add skatepark | sk8prks.com' },
    },
    {
      path: '/skateparks/:stateSlug/:slug',
      name: 'show skatepark',
      component: ShowSkatepark,
      meta: { title: (route) => `${route.params.slug.replace(/-/g, ' ')} skatepark | sk8prks.com` },
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
      meta: {
        title: (route) => `edit ${route.params.slug.replace(/-/g, ' ')} skatepark | sk8prks.com`,
      },
    },
    {
      path: '/skateparks/all',
      name: 'all skateparks',
      component: () => import('@/views/AllView.vue'),
      meta: { title: 'all skateparks | sk8prks.com' },
    },
    {
      path: '/map',
      name: 'map',
      component: () => import('@/views/MapView.vue'),
      meta: { title: 'skatepark map | sk8prks.com' },
    },
    {
      path: '/cities',
      name: 'cities',
      component: () => import('@/views/CitiesView.vue'),
      meta: { title: 'skateparks by city | sk8prks.com' },
    },
    {
      path: '/city/:stateSlug/:citySlug',
      name: 'city skateparks',
      component: () => import('@/views/CityView.vue'),
      meta: {
        title: (route) => `${route.params.citySlug.replace(/-/g, ' ')} skateparks | sk8prks.com`,
      },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/admin/LoginView.vue'),
      meta: { title: 'login | sk8prks.com' },
    },
  ],
})

router.afterEach((to) => {
  document.title =
    typeof to.meta.title === 'function' ? to.meta.title(to) : to.meta.title || 'sk8prks.com'
})

export default router
