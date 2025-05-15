<script setup>
import { useSkateparkStore } from '@/stores/SkateparkStore'
import { useUserStore } from '@/stores/UserStore'

const skateparkStore = useSkateparkStore()
const userStore = useUserStore()

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
  <section v-if="skateparkStore.loading" class="section">
    <p class="has-text-centered">loading...</p>
  </section>
  <section v-if="!skateparkStore.loading" class="section has-text-centered">
    <h1 class="is-size-1">
      {{ skateparkStore.getCurrentPark.title }}

      <RouterLink
        v-if="userStore.user"
        :to="`/skateparks/${skateparkStore.getCurrentPark.state.slice(3)}/${skateparkStore.getCurrentPark.slug}/edit`"
      >
        <button class="button is-info">Edit</button>
      </RouterLink>
    </h1>

    <p v-if="skateparkStore.getCurrentPark.lastUpdated" class="is-size-6 is-italic mb-4">
      Last updated: {{ months[skateparkStore.getCurrentPark.lastUpdated.substring(4, 6) - 1] }}
      {{ skateparkStore.getCurrentPark.lastUpdated.substring(6, 8) }},
      {{ skateparkStore.getCurrentPark.lastUpdated.substring(0, 4) }}
    </p>

    <p>
      {{ skateparkStore.getCurrentPark.street }}<br />
      {{ skateparkStore.getCurrentPark.city }},
      {{ skateparkStore.getCurrentPark.state.substring(0, 2) }}
      {{ skateparkStore.getCurrentPark.zip }}<br />
      <a
        target="_blank"
        :href="`https://www.google.com/maps/search/?api=1&query=${skateparkStore.getCurrentPark.latitude}%2C${skateparkStore.getCurrentPark.longitude}`"
        >Google Maps</a
      >
      |
      <a
        target="_blank"
        :href="`http://maps.apple.com/?ll=${skateparkStore.getCurrentPark.latitude},${skateparkStore.getCurrentPark.longitude}&q=${skateparkStore.getCurrentPark.title}`"
        >Apple Maps</a
      >
    </p>
    <p class="my-4">{{ skateparkStore.getCurrentPark.description }}</p>
    <div v-for="img in skateparkStore.getCurrentPark.images">
      <img :src="img.path" :alt="img.alt_text" />
    </div>
  </section>
</template>
