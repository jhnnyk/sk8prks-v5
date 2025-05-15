<script setup>
import { useSkateparkStore } from '@/stores/SkateparkStore'

const skateparkStore = useSkateparkStore()
</script>

<template>
  <section class="section">
    <img src="/images/site/westlake_00_header.jpg" alt="Westlake Skatepark at sunset" />
    <h1 class="is-size-1 mt-3">About Us</h1>
    <p class="my-3">
      Started in February 2025, this is just a little project to get me out of my routine and see
      how many different skateparks I can visit.
    </p>
    <p>Currently up to {{ skateparkStore.getParks.length }} skateparks and counting!</p>
  </section>
</template>
