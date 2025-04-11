<script setup>
import { useSkateparkStore } from '@/stores/SkateparkStore'
import { onUpdated, ref } from 'vue'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '@/firebase'

const skateparkStore = useSkateparkStore()

const newImgPath = ref('')
const newImgText = ref('')
const newTag = ref('')
const currentSkatepark = ref({})

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

const addTag = (newTag) => {
  if (newTag !== '') {
    currentSkatepark.value.tags.push(newTag)
  }
  resetTagInput()
}

const resetTagInput = () => {
  newTag.value = ''
}

const removeTag = (tagToDelete) => {
  currentSkatepark.value.tags = currentSkatepark.value.tags.filter((tag) => tag !== tagToDelete)
}

const addImage = () => {
  if (newImgPath !== '' && newImgText !== '') {
    currentSkatepark.value.images.push({
      path: newImgPath.value,
      alt_text: newImgText.value,
    })
  }
  resetImgInput()
}

const resetImgInput = () => {
  newImgPath.value = ''
  newImgText.value = ''
}

const deleteImg = (imgToDelete) => {
  const index = currentSkatepark.value.images.findIndex((img) => img.path === imgToDelete.path)
  if (index > -1) {
    currentSkatepark.value.images.splice(index, 1)
  }
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

      <label class="label">Tags:</label>
      <div class="buttons">
        <div v-for="tag in skateparkStore.getCurrentPark.tags">
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

      <label class="label">Images: {{ skateparkStore.getCurrentPark.images }}</label>
      <div
        v-for="img in skateparkStore.getCurrentPark.images"
        class="columns is-mobile is-vcentered"
      >
        <div class="column is-half">
          {{ img.alt_text }}
        </div>
        <div class="column">
          <figure class="image is-128x128 is-square">
            <img :src="img.path" :alt="img.alt_text" />
          </figure>
        </div>
        <div class="column">
          <div @click="deleteImg(img)" class="button is-danger is-outlined is-small">Delete</div>
        </div>
      </div>

      <div class="field">
        <div class="control">
          <input
            v-model="newImgPath"
            class="input"
            type="text"
            placeholder="Path: e.g. /images/colorado/slocum/img_2345.jpg"
          />
        </div>
        <div class="control">
          <input
            v-model="newImgText"
            class="input"
            type="text"
            placeholder="Alt Text: e.g. Slocum Skatepark street area"
          />
        </div>
        <div class="control">
          <div @click="addImage" class="button is-link">Add image</div>
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
