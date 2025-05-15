<script setup>
import { useSkateparkStore } from '@/stores/SkateparkStore'
import { useRoute } from 'vue-router'

const skateparkStore = useSkateparkStore()
const route = useRoute()
</script>

<template>
  <section v-if="skateparkStore.loading" class="section">
    <p class="has-text-centered">loading...</p>
  </section>
  <section v-if="!skateparkStore.loading" class="section has-text-centered">
    <h2 class="is-size-3 is-uppercase has-text-left">Tagged: {{ route.params.tag }}</h2>

    <ul class="grid is-col-min-10 is-row-gap-3">
      <li v-for="park in skateparkStore.getParksWithTag" :key="park.id" class="cell">
        <RouterLink :to="`/skateparks/${park.state.slice(3)}/${park.slug}`">
          <img :src="park.images[1].path" :alt="park.images[1].alt_text" />

          <p>{{ park.title }}</p>
        </RouterLink>
      </li>
    </ul>
  </section>
</template>
