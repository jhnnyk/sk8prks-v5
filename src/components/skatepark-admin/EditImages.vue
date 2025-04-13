<script setup>
import { ref } from 'vue'
import { useSkateparkStore } from '@/stores/SkateparkStore'

const skateparkStore = useSkateparkStore()

const newImgPath = ref('')
const newImgText = ref('')

const addImage = () => {
  if (newImgPath !== '' && newImgText !== '') {
    skateparkStore.getCurrentPark.images.push({
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
  const index = skateparkStore.getCurrentPark.images.findIndex(
    (img) => img.path === imgToDelete.path,
  )
  if (index > -1) {
    skateparkStore.getCurrentPark.images.splice(index, 1)
  }
}

const moveImgUp = (index) => {
  const img = skateparkStore.getCurrentPark.images[index]
  skateparkStore.getCurrentPark.images.splice(index, 1)
  skateparkStore.getCurrentPark.images.splice(index - 1, 0, img)
}

const moveImgDown = (index) => {
  const img = skateparkStore.getCurrentPark.images[index]
  skateparkStore.getCurrentPark.images.splice(index, 1)
  skateparkStore.getCurrentPark.images.splice(index + 1, 0, img)
}
</script>

<template>
  <label class="label">Images: {{ skateparkStore.getCurrentPark.images }}</label>
  <div
    v-for="(img, index) in skateparkStore.getCurrentPark.images"
    :key="index"
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
    <div class="column has-text-centered level">
      <button
        type="button"
        @click="moveImgUp(index)"
        class="button is-small is-rounded"
        :disabled="index === 0"
      >
        {{ index }}
        &#8679;
      </button>
      <button type="button" @click="deleteImg(img)" class="button is-danger is-outlined is-small">
        Delete
      </button>
      <button
        type="button"
        @click="moveImgDown(index)"
        class="button is-small is-rounded"
        :disabled="index === skateparkStore.getCurrentPark.images.length - 1"
      >
        {{ index }} &#8681;
      </button>
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
      <button type="button" @click="addImage" class="button is-link">Add image</button>
    </div>
  </div>
</template>
