<script setup>
import { useSkateparkStore } from '@/stores/SkateparkStore'

const skateparkStore = useSkateparkStore()
</script>

<template>
  <section v-if="skateparkStore.loading" class="section">
    <p class="has-text-centered">loading...</p>
  </section>
  <section v-if="!skateparkStore.loading" class="section">
    <h1 class="title">City</h1>
    <ul class="grid is-col-min-10">
      <li v-for="park in skateparkStore.getCityParks" :key="park.id" class="cell has-text-centered">
        <RouterLink :to="`/skateparks/${park.state.slice(3)}/${park.slug}`">
          <img :src="park.images[1].path" :alt="park.images[1].alt_text" />
          {{ park.title }}
        </RouterLink>
      </li>
    </ul>
  </section>
</template>
