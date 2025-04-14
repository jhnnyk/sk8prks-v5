<script setup>
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useSkateparkStore } from './stores/SkateparkStore'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useUserStore } from './stores/UserStore'
import NavBar from './components/NavBar.vue'

const skateparkStore = useSkateparkStore()
const userStore = useUserStore()

const auth = getAuth()

onMounted(() => {
  skateparkStore.fetchParks()
  console.log('fetching all skateparks')

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in
      userStore.setUser(user)
    } else {
      // User is signed out
      userStore.clearUser()
    }
  })
})
</script>

<template>
  <div class="container">
    <NavBar />
    <RouterView />
  </div>
</template>
