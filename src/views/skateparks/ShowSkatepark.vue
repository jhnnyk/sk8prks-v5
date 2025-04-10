<script setup>
import { useSkateparkStore } from '@/stores/SkateparkStore'
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const skateparkStore = useSkateparkStore()
const route = useRoute()

const currentSkatepark = ref({})

const getCurrentSkatepark = () => {
  const foundPark = skateparkStore.getParks.find(
    (park) => park.state.slice(3) === route.params.stateSlug && park.slug === route.params.slug,
  )
  currentSkatepark.value = { ...foundPark }
}

onMounted(() => getCurrentSkatepark())
watch(
  () => skateparkStore.getParks,
  () => getCurrentSkatepark(),
)

// const stateAbrv = computed(() => {
//   return currentSkatepark.value.state.substring(0, 2)
// })
</script>

<template>
  <section v-if="currentSkatepark.state" class="section">
    <h1 class="title">{{ currentSkatepark.title }}</h1>
    <button class="button is-info">
      <RouterLink
        :to="`/skateparks/${currentSkatepark.state.slice(3)}/${currentSkatepark.slug}/edit`"
      >
        Edit
      </RouterLink>
    </button>
    <p>
      {{ currentSkatepark.street }}<br />
      {{ currentSkatepark.city }}, {{ currentSkatepark.state.substring(0, 2) }}
      {{ currentSkatepark.zip }}<br />
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
    <div v-for="img in currentSkatepark.images">
      <img :src="img.path" :alt="img.alt_text" />
    </div>
  </section>
  {{ currentSkatepark }}
</template>
