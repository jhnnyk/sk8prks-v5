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
  </section>
  {{ currentSkatepark }}
</template>
