<script setup>
import { useSkateparkStore } from '@/stores/SkateparkStore'

const skateparkStore = useSkateparkStore()
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
</template>
