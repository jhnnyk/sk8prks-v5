<script setup>
import { useSkateparkStore } from '@/stores/SkateparkStore'
import { computed } from 'vue'

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

const recentlyUpdated = computed(() => {
  return skateparkStore.getParksSortedByLastUpdated.slice(0, 5)
})

const largestSkateparks = computed(() => {
  return skateparkStore.getParksSortedBySize.slice(0, 5)
})
</script>

<template>
  <section class="section has-text-centered">
    <h2 class="is-size-4 is-uppercase has-text-left">Recently Updated</h2>

    <ul class="grid is-col-min-10 is-row-gap-3">
      <li v-for="park in recentlyUpdated" :key="park.id" class="cell">
        <RouterLink :to="`/skateparks/${park.state.slice(3)}/${park.slug}`">
          <img :src="park.images[1].path" :alt="park.images[1].alt_text" />

          <p>{{ park.title }}</p>
          <p class="is-size-7">
            Updated: {{ months[park.lastUpdated.substring(4, 6) - 1] }}
            {{ park.lastUpdated.substring(6, 8) }},
            {{ park.lastUpdated.substring(0, 4) }}
          </p>
        </RouterLink>
      </li>
    </ul>
  </section>

  <section class="section has-text-centered">
    <h2 class="is-size-4 is-uppercase has-text-left">Largest Skateparks</h2>

    <ul class="grid is-col-min-10 is-row-gap-3">
      <li v-for="park in largestSkateparks" :key="park.id" class="cell">
        <RouterLink :to="`/skateparks/${park.state.slice(3)}/${park.slug}`">
          <img :src="park.images[1].path" :alt="park.images[1].alt_text" />

          <p>{{ park.title }}</p>
          <p class="is-size-7">{{ park.size.toLocaleString() }} sqft.</p>
        </RouterLink>
      </li>
    </ul>
  </section>

  <section class="section">
    <p class="is-size-3 is-uppercase">
      <RouterLink to="/skateparks/all">all skateparks</RouterLink><br />
      <RouterLink to="/skateparks/tagged/lights">skateparks with lights</RouterLink><br />
      <RouterLink to="/skateparks/tagged/prefab">prefab skateparks</RouterLink><br />
      <RouterLink to="/skateparks/tagged/indoor">indoor skateparks</RouterLink><br />
      <RouterLink to="/skateparks/tagged/DIY">DIY skateparks</RouterLink>
    </p>
  </section>
</template>
