<script setup>
import { useSkateparkStore } from '@/stores/SkateparkStore'
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '@/firebase'

const skateparkStore = useSkateparkStore()
const route = useRoute()

const newTag = ref('')
const currentSkatepark = ref({})

const getCurrentSkatepark = () => {
  const foundPark = skateparkStore.getParks.find(
    (park) => park.state.slice(3) === route.params.stateSlug && park.slug === route.params.slug,
  )
  currentSkatepark.value = { ...foundPark }
}

onMounted(() => getCurrentSkatepark())
watch(
  () => skateparkStore.getParks,
  () => getCurrentSkatepark(),
)

const updatePark = async () => {
  await setDoc(doc(db, 'skateparks', currentSkatepark.value.id), {
    title: currentSkatepark.value.title,
    slug: currentSkatepark.value.slug,
    street: currentSkatepark.value.street,
    city: currentSkatepark.value.city,
    state: currentSkatepark.value.state,
    zip: currentSkatepark.value.zip,
    latitude: currentSkatepark.value.latitude,
    longitude: currentSkatepark.value.longitude,
    description: currentSkatepark.value.description,
    tags: currentSkatepark.value.tags,
    images: currentSkatepark.value.images,
  })
}

const removeTag = (tagToDelete) => {
  currentSkatepark.value.tags = currentSkatepark.value.tags.filter((tag) => tag !== tagToDelete)
}

const addTag = (newTag) => {
  if (newTag !== '') {
    currentSkatepark.value.tags.push(newTag)
  }
  resetTagInput()
}

const resetTagInput = () => {
  newTag.value = ''
}
</script>

<template>
  <section class="section">
    <form @submit.prevent="updatePark">
      <h1 class="title">Edit skatepark</h1>

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
          <input
            v-model="currentSkatepark.slug"
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
            v-model="currentSkatepark.street"
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
            v-model="currentSkatepark.city"
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
            <select v-model="currentSkatepark.state">
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
            v-model="currentSkatepark.zip"
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
            v-model="currentSkatepark.latitude"
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
            v-model="currentSkatepark.longitude"
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
            v-model="currentSkatepark.description"
            class="textarea"
            placeholder="e.g. This skatepark is great!"
          ></textarea>
        </div>
      </div>

      <label class="label">Tags:</label>
      <div class="buttons">
        <div v-for="tag in currentSkatepark.tags">
          <div class="button is-danger is-rounded">
            {{ tag }}
            &nbsp; | &nbsp;
            <span @click="removeTag(tag)">x</span>
          </div>
        </div>
      </div>

      <div class="field has-addons">
        <div class="control">
          <input v-model="newTag" class="input" type="text" placeholder="e.g. lights" />
        </div>
        <div class="control">
          <div @click="addTag(newTag)" class="button is-link">Add tag</div>
        </div>
      </div>

      <label class="label">Images: {{ currentSkatepark.images }}</label>
      <div v-for="img in currentSkatepark.images" class="columns is-mobile is-vcentered">
        <div class="column is-half">
          {{ img.alt_text }}
        </div>
        <div class="column">
          <figure class="image is-128x128 is-square">
            <img :src="img.path" :alt="img.alt_text" />
          </figure>
        </div>
        <div class="column">
          <div class="button is-danger is-outlined is-small">Delete</div>
        </div>
      </div>

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
