<script setup>
import { useSkateparkStore } from '@/stores/SkateparkStore'
import { useUserStore } from '@/stores/UserStore'

const skateparkStore = useSkateparkStore()
const userStore = useUserStore()
</script>

<template>
  <section class="section">
    <h1 class="title">Welcome to sk8prks.com!</h1>

    <ul>
      <li v-for="park in skateparkStore.getParks" :key="park.id">
        <RouterLink :to="`/skateparks/${park.state.slice(3)}/${park.slug}`">
          {{ park.title }}
        </RouterLink>
      </li>
    </ul>
  </section>
  <section v-if="userStore.user" class="section has-text-centered">
    <RouterLink :to="{ name: 'add skatepark' }" class="button is-primary">Add Skatepark</RouterLink>
  </section>
</template>
