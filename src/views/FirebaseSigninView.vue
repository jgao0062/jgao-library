<template>
  <div>
    <h1>Firebase Signin</h1>
    <p><input type="text" v-model="email" placeholder="Email" /></p>
    <p><input type="password" v-model="password" placeholder="Password" /></p>
    <p><button @click="signin">Sign in via Firebase</button></p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

const email = ref('')
const password = ref('')
const router = useRouter()
const auth = getAuth()
const signin = () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
      console.log("firebase signin successful")
      router.push('/')
      console.log(auth.currentUser)
    }).catch((error) => {
      console.log(error.code)
    })
};
</script>
