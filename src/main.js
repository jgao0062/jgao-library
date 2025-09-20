import 'bootstrap/dist/css/bootstrap.min.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwAIwU_-Emq1yPZ9LMU4ydueQ28nH4RuM",
  authDomain: "week7-jing-f99a5.firebaseapp.com",
  projectId: "week7-jing-f99a5",
  storageBucket: "week7-jing-f99a5.firebasestorage.app",
  messagingSenderId: "1006597253207",
  appId: "1:1006597253207:web:562956adc4172130415b12"
};

const firebaseApp = initializeApp(firebaseConfig)
const app = createApp(App)
app.use(PrimeVue, { theme: { preset: Aura } })
app.use(router)

app.mount('#app')
