<script setup>
import { useSkateparkStore } from '@/stores/SkateparkStore'
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

// const title = ref('')
const slug = ref('')
const street = ref('')
const city = ref('')
const state = ref('')

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
    <form @submit.prevent="addPark">
      <h1 class="title">Add a skatepark</h1>

      <div class="field">
        <label class="label">Title</label>
        <div class="control">
          <input
            v-model="currentSkatepark.title"
            class="input"
            type="text"
            placeholder="e.g Roxborough"
          />
        </div>
      </div>

      <div class="field">
        <label class="label">slug</label>
        <div class="control">
          <input v-model="slug" class="input" type="text" placeholder="e.g roxborough" />
        </div>
      </div>

      <div class="field">
        <label class="label">Street</label>
        <div class="control">
          <input v-model="street" class="input" type="text" placeholder="e.g. 123 Main St." />
        </div>
      </div>

      <div class="field">
        <label class="label">City</label>
        <div class="control">
          <input v-model="city" class="input" type="text" placeholder="e.g. Littleton" />
        </div>
      </div>

      <div class="field">
        <label class="label">State</label>
        <div class="control">
          <div class="select">
            <select v-model="state">
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
          <input class="input" type="text" placeholder="e.g. 12345" />
        </div>
      </div>

      <div class="field">
        <label class="label">Latitude</label>
        <div class="control">
          <input class="input" type="text" placeholder="e.g. 39.8967" />
        </div>
      </div>

      <div class="field">
        <label class="label">Longitude</label>
        <div class="control">
          <input class="input" type="text" placeholder="e.g. -104.9358" />
        </div>
      </div>

      <div class="field">
        <label class="label">Description</label>
        <div class="control">
          <textarea class="textarea" placeholder="e.g. This skatepark is great!"></textarea>
        </div>
      </div>

      <label class="label">Tags:</label>
      <div class="field has-addons">
        <div class="control">
          <input class="input" type="text" placeholder="e.g. lights" />
        </div>
        <div class="control">
          <button class="button is-link">Add tag</button>
        </div>
      </div>

      <label class="label">Images:</label>
      <div class="field">
        <div class="control">
          <input
            class="input"
            type="text"
            placeholder="Path: e.g. /images/colorado/slocum/img_2345.jpg"
          />
        </div>
        <div class="control">
          <input
            class="input"
            type="text"
            placeholder="Alt Text: e.g. Slocum Skatepark street area"
          />
        </div>
        <div class="control">
          <button class="button is-link">Add image reference</button>
        </div>
      </div>

      <div class="field has-text-centered">
        <div class="control">
          <button class="button is-primary is-large">Save Changes</button>
        </div>
      </div>
    </form>
  </section>
</template>
