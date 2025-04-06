import { defineStore } from 'pinia'
import { db } from '@/firebase'
import { collection, getDocs } from 'firebase/firestore'

export const useSkateparkStore = defineStore('SkateparkStore', {
  state: () => ({
    parks: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchParks() {
      this.loading = true

      try {
        const querySnapshot = await getDocs(collection(db, 'skateparks'))
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
  },
})
