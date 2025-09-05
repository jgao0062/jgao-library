<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <div class="card">
          <div class="card-header">
            <h3 class="text-center">Library Login</h3>
          </div>
          <div class="card-body">
            <form @submit.prevent="handleLogin">
              <div class="mb-3">
                <label for="loginUsername" class="form-label">Username</label>
                <input
                  type="text"
                  class="form-control"
                  id="loginUsername"
                  v-model="credentials.username"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="loginPassword" class="form-label">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="loginPassword"
                  v-model="credentials.password"
                  required
                />
              </div>
              <div v-if="errorMessage" class="alert alert-danger">
                {{ errorMessage }}
              </div>
              <div class="text-center">
                <button type="submit" class="btn btn-primary">Login</button>
              </div>
            </form>
            <div class="mt-3 text-center">
              <small class="text-muted">
                Hint: Username: admin, Password: 123
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const credentials = ref({
  username: '',
  password: ''
})

const errorMessage = ref('')

const handleLogin = () => {
  // Simple hardcoded authentication
  if (credentials.value.username === 'admin' && credentials.value.password === '123') {
    authStore.login(credentials.value.username)
    router.push('/about')
  } else {
    errorMessage.value = 'Invalid username or password'
  }
}
</script>

<style scoped>
.card {
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.card-header {
  background-color: #275fda;
  color: white;
  padding: 10px;
  border-radius: 10px 10px 0 0;
}
</style>
