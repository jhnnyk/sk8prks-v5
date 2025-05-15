<script setup>
import { useSkateparkStore } from '@/stores/SkateparkStore'

const skateparkStore = useSkateparkStore()

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]
</script>

<template>
  <section class="section has-text-centered">
    <h1 class="is-size-1 mb-2">Welcome to sk8prks.com</h1>

    <h2 class="is-size-3 is-uppercase">Recently Added / Updated</h2>

    <ul class="grid is-col-min-10">
      <li
        v-for="park in skateparkStore.getRecentlyUpdatedParks"
        :key="park.id"
        class="cell has-text-centered"
      >
        <RouterLink :to="`/skateparks/${park.state.slice(3)}/${park.slug}`">
          <img :src="park.images[1].path" :alt="park.images[1].alt_text" />

          {{ park.title }}<br />
          <span class="is-size-7">
            Updated: {{ months[park.lastUpdated.substring(4, 6) - 1] }}
            {{ park.lastUpdated.substring(6, 8) }},
            {{ park.lastUpdated.substring(0, 4) }}
          </span>
        </RouterLink>
      </li>
    </ul>
  </section>
</template>
