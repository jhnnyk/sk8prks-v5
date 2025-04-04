<script setup>
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/firebase'
import { ref, onMounted } from 'vue'

const skateparks = ref([])

onMounted(async () => {
  const querySnapshot = await getDocs(collection(db, 'skateparks'))
  let dbSkateparks = []
  querySnapshot.forEach((doc) => {
    const park = {
      id: doc.id,
      title: doc.data().title,
      description: doc.data().description,
    }
    dbSkateparks.push(park)
  })
  skateparks.value = dbSkateparks
})
</script>

<template>
  <main>hello world</main>
  <ul v-for="park in skateparks">
    <li>{{ park.title }}</li>
  </ul>
</template>
