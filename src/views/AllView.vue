<script setup>
import { useSkateparkStore } from '@/stores/SkateparkStore'
import { useUserStore } from '@/stores/UserStore'

const skateparkStore = useSkateparkStore()
const userStore = useUserStore()
</script>
<template>
  <section class="section has-text-centered">
    <h1 class="is-size-1 mb-2">All Skateparks</h1>
    <ul class="grid is-col-min-10">
      <li v-for="park in skateparkStore.getParks" :key="park.id" class="cell has-text-centered">
        <RouterLink :to="`/skateparks/${park.state.slice(3)}/${park.slug}`">
          <img :src="park.images[1].path" :alt="park.images[1].alt_text" />
          {{ park.title }}
        </RouterLink>
      </li>
    </ul>
  </section>

  <section v-if="userStore.user" class="section has-text-centered">
    <RouterLink :to="{ name: 'add skatepark' }" class="button is-primary">Add Skatepark</RouterLink>
  </section>
</template>
