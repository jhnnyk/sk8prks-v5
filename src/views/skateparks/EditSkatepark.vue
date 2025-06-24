<script setup>
import { useSkateparkStore } from '@/stores/SkateparkStore'
import { onMounted, onUpdated, ref } from 'vue'
import { useRouter } from 'vue-router'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import EditTags from '@/components/skatepark-admin/EditTags.vue'
import EditImages from '@/components/skatepark-admin/EditImages.vue'

const skateparkStore = useSkateparkStore()
const router = useRouter()

const year = ref('')
const month = ref('')
const day = ref('')

onMounted(() => {
  if (skateparkStore.getCurrentPark.lastUpdated) {
    year.value = skateparkStore.getCurrentPark.lastUpdated.substring(0, 4)
    month.value = skateparkStore.getCurrentPark.lastUpdated.substring(4, 6)
    day.value = skateparkStore.getCurrentPark.lastUpdated.substring(6, 8)
  }
})

onUpdated(() => {
  skateparkStore.getCurrentPark
})

const updatePark = async () => {
  // save to DB
  await setDoc(doc(db, 'skateparks', skateparkStore.getCurrentPark.id), {
    lastUpdated: year.value + month.value + day.value,
    title: skateparkStore.getCurrentPark.title,
    slug: skateparkStore.getCurrentPark.slug,
    street: skateparkStore.getCurrentPark.street,
    city: skateparkStore.getCurrentPark.city,
    state: skateparkStore.getCurrentPark.state,
    zip: skateparkStore.getCurrentPark.zip,
    latitude: skateparkStore.getCurrentPark.latitude,
    longitude: skateparkStore.getCurrentPark.longitude,
    size: skateparkStore.getCurrentPark.size,
    description: skateparkStore.getCurrentPark.description,
    tags: skateparkStore.getCurrentPark.tags,
    images: skateparkStore.getCurrentPark.images,
  })
  // redirect back to skatepark page after save
  router.push({
    name: 'show skatepark',
    params: {
      stateSlug: skateparkStore.getCurrentPark.state.slice(3),
      slug: skateparkStore.getCurrentPark.slug,
    },
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
        <label class="label">Last updated:</label>
        <div class="control">
          <div class="select">
            <select v-model="year" required>
              <option value="2024">2024</option>
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
              <option value="IA:iowa">Iowa</option>
              <option value="NV:nevada">Nevada</option>
              <option value="TX:texas">Texas</option>
              <option value="UT:utah">Utah</option>
              <option value="WI:wisconsin">Wisconsin</option>
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
        <label class="label">Size (sqft)</label>
        <div class="control">
          <input
            v-model="skateparkStore.getCurrentPark.size"
            class="input"
            type="number"
            placeholder="25000"
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
