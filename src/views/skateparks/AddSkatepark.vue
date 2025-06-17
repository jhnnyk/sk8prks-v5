<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '@/firebase'

const router = useRouter()

const newTag = ref('')
const newImgPath = ref('')
const newImgText = ref('')

const year = ref('2025')
const month = ref('05')
const day = ref('15')
const title = ref('')
const slug = ref('')
const street = ref('')
const city = ref('')
const state = ref('')
const zip = ref('')
const latitude = ref('')
const longitude = ref('')
const size = ref(0)
const description = ref('')
const tags = ref([])
const images = ref([])

// save new skatepark
const addPark = async () => {
  if (title.value !== '' && slug.value !== '' && state.value !== '') {
    // add to db
    const docRef = await addDoc(collection(db, 'skateparks'), {
      lastUpdated: year.value + month.value + day.value,
      title: title.value,
      slug: slug.value,
      street: street.value,
      city: city.value,
      state: state.value,
      zip: zip.value,
      latitude: latitude.value,
      longitude: longitude.value,
      size: size.value,
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
    size.value = ''
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
        <label class="label">Last updated:</label>
        <div class="control">
          <div class="select">
            <select v-model="year" required>
              <option value="2025">2025</option>
            </select>
          </div>

          <div class="select">
            <select v-model="month" required>
              <option value="01">01</option>
              <option value="02">02</option>
              <option value="03">03</option>
              <option value="04">04</option>
              <option value="05">05</option>
              <option value="06">06</option>
              <option value="07">07</option>
              <option value="08">08</option>
              <option value="09">09</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
            </select>
          </div>

          <div class="select">
            <select v-model="day" required>
              <option value="01">01</option>
              <option value="02">02</option>
              <option value="03">03</option>
              <option value="04">04</option>
              <option value="05">05</option>
              <option value="06">06</option>
              <option value="07">07</option>
              <option value="08">08</option>
              <option value="09">09</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
              <option value="15">15</option>
              <option value="16">16</option>
              <option value="17">17</option>
              <option value="18">18</option>
              <option value="19">19</option>
              <option value="20">20</option>
              <option value="21">21</option>
              <option value="22">22</option>
              <option value="23">23</option>
              <option value="24">24</option>
              <option value="25">25</option>
              <option value="26">26</option>
              <option value="27">27</option>
              <option value="28">28</option>
              <option value="29">29</option>
              <option value="30">30</option>
              <option value="31">31</option>
            </select>
          </div>
        </div>
      </div>

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
              <option value="NV:nevada">Nevada</option>
              <option value="TX:texas">Texas</option>
              <option value="UT:utah">Utah</option>
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
        <label class="label">Size (sqft)</label>
        <div class="control">
          <input v-model="size" class="input" type="number" placeholder="25000" />
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

      <label class="label">Images:</label>
      <div v-for="img in images" class="columns is-mobile is-vcentered">
        <div class="column is-half">
          {{ img.alt_text }}<br />
          <span class="is-size-7 is-italic">{{ img.path }}</span>
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
