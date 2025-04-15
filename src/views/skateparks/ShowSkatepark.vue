<script setup>
import { useSkateparkStore } from '@/stores/SkateparkStore'
import { useUserStore } from '@/stores/UserStore'

const skateparkStore = useSkateparkStore()
const userStore = useUserStore()
</script>

<template>
  <section v-if="skateparkStore.loading" class="section">
    <p class="has-text-centered">loading...</p>
  </section>
  <section v-if="!skateparkStore.loading" class="section">
    <h1 class="title">
      {{ skateparkStore.getCurrentPark.title }}

      <RouterLink
        v-if="userStore.user"
        :to="`/skateparks/${skateparkStore.getCurrentPark.state.slice(3)}/${skateparkStore.getCurrentPark.slug}/edit`"
      >
        <button class="button is-info">Edit</button>
      </RouterLink>
    </h1>

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
    <p>{{ skateparkStore.getCurrentPark.description }}</p>
    <div v-for="img in skateparkStore.getCurrentPark.images">
      <img :src="img.path" :alt="img.alt_text" />
    </div>
  </section>
</template>
