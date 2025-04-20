import { defineStore } from 'pinia'
import { useRoute } from 'vue-router'
import { db } from '@/firebase'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'

export const useSkateparkStore = defineStore('SkateparkStore', {
  state: () => ({
    parks: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchParks() {
      this.loading = true
      const skateparkCollection = collection(db, 'skateparks')

      try {
        const q = query(skateparkCollection, orderBy('title'))
        const querySnapshot = await getDocs(q)
        this.parks = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        this.loading = false
      } catch (error) {
        this.error = error
        this.loading = false
      }
    },
  },

  getters: {
    getParks: (state) => state.parks,
    getCurrentPark: (state) => {
      const route = useRoute()

      return state.parks.find(
        (park) => park.state.slice(3) === route.params.stateSlug && park.slug === route.params.slug,
      )
    },
  },
})
