<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '@/firebase'

const router = useRouter()

const newTag = ref('')
const newImgPath = ref('')
const newImgText = ref('')

const title = ref('')
const slug = ref('')
const street = ref('')
const city = ref('')
const state = ref('')
const zip = ref('')
const latitude = ref('')
const longitude = ref('')
const description = ref('')
const tags = ref([])
const images = ref([])

// save new skatepark
const addPark = async () => {
  if (title.value !== '' && slug.value !== '' && state.value !== '') {
    // add to db
    const docRef = await addDoc(collection(db, 'skateparks'), {
      title: title.value,
      slug: slug.value,
      street: street.value,
      city: city.value,
      state: state.value,
      zip: zip.value,
      latitude: latitude.value,
      longitude: longitude.value,
      description: description.value,
      tags: tags.value,
      images: images.value,
    })

    // confirm write
    console.log('Skatepark added with ID: ', docRef.id)

    // reset form
    title.value = ''
    slug.value = ''
    street.value = ''
    city.value = ''
    state.value = ''
    zip.value = ''
    latitude.value = ''
    longitude.value = ''
    description.value = ''
    tags.value = []
    images.value = []

    // redirect to home screen
    router.push({ name: 'home' })
  } else {
    console.log('make sure you have a title and slug')
  }
}

// handle tags
const addTag = (newTag) => {
  if (newTag !== '') {
    tags.value.push(newTag)
  }
  resetTagInput()
}

const resetTagInput = () => {
  newTag.value = ''
}

const removeTag = (tagToDelete) => {
  tags.value = tags.value.filter((tag) => tag !== tagToDelete)
}

// handle images
const addImage = () => {
  if (newImgPath !== '' && newImgText !== '') {
    images.value.push({
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
  const index = images.value.findIndex((img) => img.path === imgToDelete.path)
  if (index > -1) {
    images.value.splice(index, 1)
  }
}
</script>

<template>
  <section class="section">
    <form @submit.prevent="addPark">
      <h1 class="title">Add a skatepark</h1>

      <div class="field">
        <label class="label">Title</label>
        <div class="control">
          <input v-model="title" class="input" type="text" placeholder="e.g Roxborough" required />
        </div>
      </div>

      <div class="field">
        <label class="label">slug</label>
        <div class="control">
          <input v-model="slug" class="input" type="text" placeholder="e.g roxborough" required />
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
            <select v-model="state" required>
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
          <input v-model="zip" class="input" type="text" placeholder="e.g. 12345" />
        </div>
      </div>

      <div class="field">
        <label class="label">Latitude</label>
        <div class="control">
          <input v-model="latitude" class="input" type="text" placeholder="e.g. 39.8967" />
        </div>
      </div>

      <div class="field">
        <label class="label">Longitude</label>
        <div class="control">
          <input v-model="longitude" class="input" type="text" placeholder="e.g. -104.9358" />
        </div>
      </div>

      <div class="field">
        <label class="label">Description</label>
        <div class="control">
          <textarea
            v-model="description"
            class="textarea"
            placeholder="e.g. This skatepark is great!"
          ></textarea>
        </div>
      </div>

      <label class="label">Tags:</label>
      <div class="buttons">
        <div v-for="tag in tags">
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

      <label class="label">Images: {{ images }}</label>
      <div v-for="img in images" class="columns is-mobile is-vcentered">
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
          <button class="button is-primary is-large">Save Skatepark</button>
        </div>
      </div>
    </form>
  </section>
</template>
