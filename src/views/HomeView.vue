<script setup>
import { useSkateparkStore } from '@/stores/SkateparkStore'

const skateparkStore = useSkateparkStore()
</script>

<template>
  <main>
    <h1 class="title">Welcome to sk8prks.com!</h1>

    <ul>
      <li v-for="park in skateparkStore.getParks" :key="park.id">
        {{ park.title }}
      </li>
    </ul>
  </main>
</template>
