<script setup>
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useSkateparkStore } from './stores/SkateparkStore'
import NavBar from './components/NavBar.vue'

const skateparkStore = useSkateparkStore()

onMounted(() => {
  skateparkStore.fetchParks()
  console.log('fetching all skateparks')
})
</script>

<template>
  <div class="container">
    <NavBar />
    <RouterView />
  </div>
</template>
