<script setup>
import { ref } from 'vue'
const showMobileNav = ref(false)
</script>

<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <RouterLink :to="{ name: 'home' }" class="navbar-item">sk8prks.com</RouterLink>

      <a
        role="button"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
        @click="showMobileNav = !showMobileNav"
        :class="{ 'is-active': showMobileNav }"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div class="navbar-menu" :class="{ 'is-active': showMobileNav }">
      <RouterLink class="navbar-item" @click="showMobileNav = false" to="/">Home</RouterLink>
      <RouterLink class="navbar-item" @click="showMobileNav = false" to="/about">About</RouterLink>
    </div>
  </nav>
</template>
