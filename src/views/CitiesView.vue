<script setup>
import { computed } from 'vue'
import { useSkateparkStore } from '@/stores/SkateparkStore'

const skateparkStore = useSkateparkStore()

const coloradoCities = computed(() => {
  return skateparkStore.getParkCountByCity.filter((city) => city.state === 'CO')
})

const iowaCities = computed(() => {
  return skateparkStore.getParkCountByCity.filter((city) => city.state === 'IA')
})

const nevadaCities = computed(() => {
  return skateparkStore.getParkCountByCity.filter((city) => city.state === 'NV')
})

const texasCities = computed(() => {
  return skateparkStore.getParkCountByCity.filter((city) => city.state === 'TX')
})

const utahCities = computed(() => {
  return skateparkStore.getParkCountByCity.filter((city) => city.state === 'UT')
})

const wisconsinCities = computed(() => {
  return skateparkStore.getParkCountByCity.filter((city) => city.state === 'WI')
})
</script>

<template>
  <section class="section">
    <h1 class="is-size-1 has-text-centered">Skateparks by City</h1>
    <h2 class="is-size-3 is-uppercase">Colorado</h2>
    <ul class="grid is-col-min-10">
      <li v-for="city in coloradoCities" :key="city.name">
        <RouterLink :to="`/city/colorado/${city.name.toLowerCase().replace(/\s/g, '-')}`">
          {{ city.name }} ({{ city.count }})
        </RouterLink>
      </li>
    </ul>

    <h2 class="is-size-3 is-uppercase">Iowa</h2>
    <ul class="grid is-col-min-10">
      <li v-for="city in iowaCities" :key="city.name">
        <RouterLink :to="`/city/iowa/${city.name.toLowerCase().replace(/\s/g, '-')}`">
          {{ city.name }} ({{ city.count }})
        </RouterLink>
      </li>
    </ul>

    <h2 class="is-size-3 is-uppercase">Nevada</h2>
    <ul class="grid is-col-min-10">
      <li v-for="city in nevadaCities" :key="city.name">
        <RouterLink :to="`/city/nevada/${city.name.toLowerCase().replace(/\s/g, '-')}`">
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

    <h2 class="is-size-3 is-uppercase">Utah</h2>
    <ul class="grid is-col-min-10">
      <li v-for="city in utahCities" :key="city.name">
        <RouterLink :to="`/city/utah/${city.name.toLowerCase().replace(/\s/g, '-')}`">
          {{ city.name }} ({{ city.count }})
        </RouterLink>
      </li>
    </ul>

    <h2 class="is-size-3 is-uppercase">Wisconsin</h2>
    <ul class="grid is-col-min-10">
      <li v-for="city in wisconsinCities" :key="city.name">
        <RouterLink :to="`/city/wisconsin/${city.name.toLowerCase().replace(/\s/g, '-')}`">
          {{ city.name }} ({{ city.count }})
        </RouterLink>
      </li>
    </ul>
  </section>
</template>
