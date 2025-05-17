<script setup>
import { onMounted, ref, watch } from 'vue'

const userLat = ref(null)
const userLong = ref(null)
const errorMessage = ref(null)
const isLoading = ref(false)
const distanceToSkatepark = ref(0)

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

const distance = (
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

  distanceToSkatepark.value = 2 * r * Math.asin(Math.sqrt(a))
}

onMounted(async () => {
  getGeolocation()
})

watch([userLat, userLong], ([newLat, newLong], [oldLat, oldLong]) => {
  distance(newLat, newLong)
})
</script>

<template>
  <h1>Geolocation Example</h1>
  <!-- Display error message if any -->
  <p v-if="errorMessage">{{ errorMessage }}</p>

  <!-- Show latitude and longitude when successfully fetched -->
  <p v-if="userLat && userLong">Latitude: {{ userLat }}, Longitude: {{ userLong }}</p>

  <!-- Show loading message while waiting for geolocation -->
  <p v-if="isLoading">Loading location...</p>

  <p v-if="distanceToSkatepark">{{ distanceToSkatepark }}</p>
</template>
