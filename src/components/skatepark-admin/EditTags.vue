<script setup>
import { ref } from 'vue'
import { useSkateparkStore } from '@/stores/SkateparkStore'

const newTag = ref('')
const skateparkStore = useSkateparkStore()

const addTag = (newTag) => {
  if (newTag !== '') {
    skateparkStore.getCurrentPark.tags.push(newTag)
  }
  resetTagInput()
}

const resetTagInput = () => {
  newTag.value = ''
}

const removeTag = (tagToDelete) => {
  skateparkStore.getCurrentPark.tags = skateparkStore.getCurrentPark.tags.filter(
    (tag) => tag !== tagToDelete,
  )
}
</script>

<template>
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
</template>
