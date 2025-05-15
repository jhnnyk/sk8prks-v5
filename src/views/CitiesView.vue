<script setup>
import { computed } from 'vue'
import { useSkateparkStore } from '@/stores/SkateparkStore'

const skateparkStore = useSkateparkStore()

const coloradoCities = computed(() => {
  return skateparkStore.getParkCountByCity.filter((city) => city.state === 'CO')
})

const texasCities = computed(() => {
  return skateparkStore.getParkCountByCity.filter((city) => city.state === 'TX')
})
</script>

<template>
  <section class="section">
    <h1 class="title has-text-centered">Skateparks by City</h1>
    <h2 class="is-size-3 is-uppercase">Colorado</h2>
    <ul class="grid is-col-min-10">
      <li v-for="city in coloradoCities" :key="city.name">
        <RouterLink :to="`/city/colorado/${city.name.toLowerCase().replace(/\s/g, '-')}`">
          {{ city.name }} ({{ city.count }})
        </RouterLink>
      </li>
    </ul>

    <h2 class="is-size-3 is-uppercase">Texas</h2>
    <ul class="grid is-col-min-10">
      <li v-for="city in texasCities" :key="city.name">
        <RouterLink :to="`/city/texas/${city.name.toLowerCase().replace(/\s/g, '-')}`">
          {{ city.name }} ({{ city.count }})
        </RouterLink>
      </li>
    </ul>
  </section>
</template>
