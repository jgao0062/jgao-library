import { createApp } from 'vue'
import App from './App.vue'
import JSON from './components/JSON.vue'

const app = createApp(App)
app.component('JSON', JSON)
app.mount('#app')
