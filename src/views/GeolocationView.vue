<script setup>
import { onMounted, ref, watch } from 'vue'
import { useSkateparkStore } from '@/stores/SkateparkStore'

const skateparkStore = useSkateparkStore()

const userLat = ref(null)
const userLong = ref(null)
const errorMessage = ref(null)
const isLoading = ref(false)
const skateparksWithDistanceAway = ref([])

const getGeolocation = () => {
  if ('geolocation' in navigator) {
    isLoading.value = true // Set loading to true while waiting for geolocation

    // Request the user's current position
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Success callback: update latitude and longitude
        userLat.value = position.coords.latitude
        userLong.value = position.coords.longitude
        isLoading.value = false // Stop loading once we have the coordinates
      },
      (error) => {
        // Error callback: handle different error cases
        isLoading.value = false
        errorMessage.value = `Error: ${error.message}` // Show the error message
      },
    )
  } else {
    // If geolocation is not supported by the browser
    errorMessage.value = 'Geolocation is not supported by your browser.'
  }
}

const calculateDistance = (
  userLat,
  userLong,
  parkLat = 30.454659165386186,
  parkLong = -97.68298856529738,
) => {
  const r = 3963
  const p = Math.PI / 180

  const a =
    0.5 -
    Math.cos((parkLat - userLat) * p) / 2 +
    (Math.cos(userLat * p) * Math.cos(parkLat * p) * (1 - Math.cos((parkLong - userLong) * p))) / 2

  return 2 * r * Math.asin(Math.sqrt(a))
}

onMounted(async () => {
  getGeolocation()
})

watch([userLat, userLong], ([newLat, newLong], [oldLat, oldLong]) => {
  const withDistance = skateparkStore.getParks.map((park) => {
    return {
      ...park,
      distanceAway: calculateDistance(newLat, newLong, park.latitude, park.longitude),
    }
  })

  withDistance.sort((a, b) => {
    if (a.distanceAway < b.distanceAway) return -1
    if (a.distanceAway > b.distanceAway) return 1
  })

  skateparksWithDistanceAway.value = withDistance.slice(0, 20)
})
</script>

<template>
  <section class="section has-text-centered">
    <h1 class="is-size-1 mb-2">Closest Skateparks</h1>
    <!-- Display error message if any -->
    <p v-if="errorMessage">{{ errorMessage }}</p>

    <!-- Show loading message while waiting for geolocation -->
    <p v-if="isLoading">Loading location...</p>

    <p v-if="!skateparksWithDistanceAway.length">Loading parks...(2)</p>
    <ul v-if="skateparksWithDistanceAway.length" class="grid is-col-min-10">
      <li v-for="park in skateparksWithDistanceAway" :key="park.id" class="cell has-text-centered">
        <RouterLink :to="`/skateparks/${park.state.slice(3)}/${park.slug}`">
          <img :src="park.images[1].path" :alt="park.images[1].alt_text" />
          {{ park.title }}<br />
          {{ park.distanceAway.toFixed(1) }} miles away
        </RouterLink>
      </li>
    </ul>
  </section>
</template>
