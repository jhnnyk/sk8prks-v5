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
</script>

<template>
  <label class="label">Images: {{ skateparkStore.getCurrentPark.images }}</label>
  <div v-for="img in skateparkStore.getCurrentPark.images" class="columns is-mobile is-vcentered">
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
</template>
