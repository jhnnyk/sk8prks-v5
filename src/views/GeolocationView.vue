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

watch([userLat, userLong, () => skateparkStore.parks], ([newLat, newLong], [oldLat, oldLong]) => {
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
    <div v-if="errorMessage">
      <div class="notification is-danger is-light">
        <p class="is-italic">{{ errorMessage }}</p>
        <p class="has-text-weight-bold">Please enable Location Services on your device</p>
      </div>

      <article class="message is-info has-text-left">
        <div class="message-header">on iPhone:</div>
        <div class="message-body content">
          <ul>
            <li>Open the Settings app on your iPhone</li>
            <li>Scroll down and tap on "Privacy &amp; Security"</li>
            <li>Tap on "Location Services"</li>
            <li>
              Make sure the "Location Services" switch is toggled to the "on" position (green).
            </li>
            <li>
              Scroll through the list of apps and find the one you want to allow access to your
              location (probably Safari).
            </li>
            <li>Tap on the app's name.</li>
            <li>Choose one of the location access options</li>
          </ul>
        </div>
      </article>

      <article class="message is-info has-text-left mb-5">
        <div class="message-header">on Android:</div>
        <div class="message-body content">
          <ul>
            <li>Open your Android phone's Settings app</li>
            <li>
              Look for Location or Security & location (depending on your device's Android version)
              and tap it
            </li>
            <li>Ensure the master location switch is turned on</li>
            <li>From the Location settings, look for App permissions or App-level permissions</li>
            <li>Select the specific app you want to manage</li>
            <li>Choose the desired location access option</li>
          </ul>
        </div>
      </article>
    </div>

    <!-- Show loading message while waiting for geolocation -->
    <div v-if="isLoading" class="notification is-primary is-light">Finding location...</div>

    <div v-if="!skateparksWithDistanceAway.length" class="notification is-info is-light">
      Loading closest skateparks...
    </div>
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
