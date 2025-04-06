<script setup>
import { useSkateparkStore } from '@/stores/SkateparkStore'
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const skateparkStore = useSkateparkStore()
const route = useRoute()

const currentSkatepark = ref({})

const getCurrentSkatepark = () => {
  const foundPark = skateparkStore.getParks.find(
    (park) => park.stateSlug === route.params.stateSlug && park.slug === route.params.slug,
  )
  currentSkatepark.value = { ...foundPark }
}

onMounted(() => getCurrentSkatepark())
watch(
  () => skateparkStore.getParks,
  () => getCurrentSkatepark(),
)
</script>

<template>
  <section class="section">
    <h1 class="title">{{ currentSkatepark.title }}</h1>
    <p>
      {{ currentSkatepark.street }}<br />
      {{ currentSkatepark.city }}, {{ currentSkatepark.state }} {{ currentSkatepark.zip }}<br />
      <a
        target="_blank"
        :href="`https://www.google.com/maps/search/?api=1&query=${currentSkatepark.latitude}%2C${currentSkatepark.longitude}`"
        >Google Maps</a
      >
      |
      <a
        target="_blank"
        :href="`http://maps.apple.com/?ll=${currentSkatepark.latitude},${currentSkatepark.longitude}&q=${currentSkatepark.title}`"
        >Apple Maps</a
      >
    </p>
    <p>{{ currentSkatepark.description }}</p>
  </section>
  {{ currentSkatepark }}
</template>
