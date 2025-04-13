<script setup>
import { useSkateparkStore } from '@/stores/SkateparkStore'
import { onUpdated } from 'vue'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import EditTags from '@/components/skatepark-admin/EditTags.vue'
import EditImages from '@/components/skatepark-admin/EditImages.vue'

const skateparkStore = useSkateparkStore()

onUpdated(() => {
  skateparkStore.getCurrentPark
})

const updatePark = async () => {
  await setDoc(doc(db, 'skateparks', skateparkStore.getCurrentPark.id), {
    title: skateparkStore.getCurrentPark.title,
    slug: skateparkStore.getCurrentPark.slug,
    street: skateparkStore.getCurrentPark.street,
    city: skateparkStore.getCurrentPark.city,
    state: skateparkStore.getCurrentPark.state,
    zip: skateparkStore.getCurrentPark.zip,
    latitude: skateparkStore.getCurrentPark.latitude,
    longitude: skateparkStore.getCurrentPark.longitude,
    description: skateparkStore.getCurrentPark.description,
    tags: skateparkStore.getCurrentPark.tags,
    images: skateparkStore.getCurrentPark.images,
  })
}
</script>

<template>
  <section v-if="skateparkStore.loading" class="section">
    <p class="has-text-centered">loading...</p>
  </section>
  <section v-else class="section">
    <form @submit.prevent="updatePark">
      <h1 class="title">Edit skatepark</h1>

      <div class="field">
        <label class="label">Title</label>
        <div class="control">
          <input
            v-model="skateparkStore.getCurrentPark.title"
            class="input"
            type="text"
            placeholder="e.g Roxborough"
          />
        </div>
      </div>

      <div class="field">
        <label class="label">slug</label>
        <div class="control">
          <input
            v-model="skateparkStore.getCurrentPark.slug"
            class="input"
            type="text"
            placeholder="e.g roxborough"
          />
        </div>
      </div>

      <div class="field">
        <label class="label">Street</label>
        <div class="control">
          <input
            v-model="skateparkStore.getCurrentPark.street"
            class="input"
            type="text"
            placeholder="e.g. 123 Main St."
          />
        </div>
      </div>

      <div class="field">
        <label class="label">City</label>
        <div class="control">
          <input
            v-model="skateparkStore.getCurrentPark.city"
            class="input"
            type="text"
            placeholder="e.g. Littleton"
          />
        </div>
      </div>

      <div class="field">
        <label class="label">State</label>
        <div class="control">
          <div class="select">
            <select v-model="skateparkStore.getCurrentPark.state">
              <option value="CA:california">California</option>
              <option value="CO:colorado">Colorado</option>
              <option value="TX:texas">Texas</option>
            </select>
          </div>
        </div>
      </div>

      <div class="field">
        <label class="label">Zip Code</label>
        <div class="control">
          <input
            v-model="skateparkStore.getCurrentPark.zip"
            class="input"
            type="text"
            placeholder="e.g. 12345"
          />
        </div>
      </div>

      <div class="field">
        <label class="label">Latitude</label>
        <div class="control">
          <input
            v-model="skateparkStore.getCurrentPark.latitude"
            class="input"
            type="text"
            placeholder="e.g. 39.8967"
          />
        </div>
      </div>

      <div class="field">
        <label class="label">Longitude</label>
        <div class="control">
          <input
            v-model="skateparkStore.getCurrentPark.longitude"
            class="input"
            type="text"
            placeholder="e.g. -104.9358"
          />
        </div>
      </div>

      <div class="field">
        <label class="label">Description</label>
        <div class="control">
          <textarea
            v-model="skateparkStore.getCurrentPark.description"
            class="textarea"
            placeholder="e.g. This skatepark is great!"
          ></textarea>
        </div>
      </div>

      <EditTags />

      <EditImages />

      <div class="field has-text-centered">
        <div class="control">
          <button class="button is-primary is-large">Save Changes</button>
        </div>
      </div>
    </form>
  </section>
</template>
