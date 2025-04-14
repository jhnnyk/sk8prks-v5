<script setup>
import { ref } from 'vue'
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'
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

const logout = () => {
  signOut(auth)
    .then(() => {
      userStore.clearUser()
      console.log('user signed out')
    })
    .catch((error) => {
      console.log('Error signing out: ', error)
    })
}
</script>

<template>
  <section class="section" v-if="!userStore.user">
    <h1 class="is-size-1 has-text-centered">Login</h1>
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

  <section class="section" v-else>
    <h2 class="is-size-2 has-text-centered">Already logged in as:</h2>
    <p class="has-text-centered">{{ userStore.user.email }}</p>
    <p class="has-text-centered my-5">
      <button @click="logout" class="button is-link">Log out</button>
    </p>
  </section>
</template>
