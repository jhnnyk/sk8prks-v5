<script setup>
import { ref } from 'vue'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useUserStore } from '@/stores/UserStore'

const auth = getAuth()
const userStore = useUserStore()

const email = ref('')
const password = ref('')

const login = () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user
      console.log(user)

      userStore.setUser(user)
      // ...
    })
    .catch((error) => {
      console.log(error.code, error.message)
    })
}
</script>

<template>
  <section class="section">
    <form @submit.prevent="login">
      <div class="field">
        <label class="label">Email</label>
        <div class="control">
          <input v-model="email" class="input" type="email" placeholder="e.g. john@email.com" />
        </div>
      </div>
      <div class="field">
        <label class="label">Password</label>
        <div class="control">
          <input v-model="password" class="input" type="password" placeholder="e.g. password123" />
        </div>
      </div>
      <button class="button is-primary">Sign In</button>
    </form>
  </section>
</template>
