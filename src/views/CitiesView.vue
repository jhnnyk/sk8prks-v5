<script setup>
import { useSkateparkStore } from '@/stores/SkateparkStore'

const skateparkStore = useSkateparkStore()
</script>

<template>
  <section class="section">
    <h1 class="title">Skateparks by City</h1>
    <ul class="grid is-col-min-10">
      <li v-for="city in skateparkStore.getParkCountByCity" :key="city.name">
        <RouterLink :to="`/city/colorado/${city.name.toLowerCase().replace(/\s/g, '')}`">
          {{ city.name }} ({{ city.count }})
        </RouterLink>
      </li>
    </ul>
  </section>
</template>
