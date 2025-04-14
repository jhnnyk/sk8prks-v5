import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AddSkatepark from '@/views/skateparks/AddSkatepark.vue'
import ShowSkatepark from '@/views/skateparks/ShowSkatepark.vue'
import EditSkatepark from '@/views/skateparks/EditSkatepark.vue'
import LoginView from '@/views/admin/LoginView.vue'

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
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/skateparks/add',
      name: 'add skatepark',
      component: AddSkatepark,
    },
    {
      path: '/skateparks/:stateSlug/:slug',
      name: 'show skatepark',
      component: ShowSkatepark,
    },
    {
      path: '/skateparks/:stateSlug/:slug/edit',
      name: 'edit skatepark',
      component: EditSkatepark,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
  ],
})

export default router
