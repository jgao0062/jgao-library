<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <h2 class="text-center">Login System</h2>
          </div>
          <div class="card-body">
            <form @submit.prevent="signin">
              <div class="mb-3">
                <label for="email" class="form-label">Email Address</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  v-model="email"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  v-model="password"
                  placeholder="Enter your password"
                  required
                />
              </div>


              <div class="d-grid">
                <button
                  type="submit"
                  class="btn btn-primary"
                  :disabled="isLoading"
                >
                  <span v-if="isLoading" class="spinner-border spinner-border-sm me-2"></span>
                  {{ isLoading ? 'Signing in...' : 'Sign In' }}
                </button>
              </div>
            </form>

            <div v-if="errorMessage" class="alert alert-danger mt-3">
              {{ errorMessage }}
            </div>

            <div class="mt-3 text-center">
              <p>Don't have an account? <router-link to="/FireRegister">Register Now</router-link></p>
            </div>

            <!-- Test Account Information -->
            <div class="mt-4">
              <h6>Test Account Information:</h6>
              <div class="row">
                <div class="col-12">
                  <small class="text-muted">
                    <strong>Administrator:</strong><br>
                    Email: admin@gmail.com<br>
                    Password: Q1w2e3r4?
                  </small>
                </div>
              </div>
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
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useAuthStore } from '../stores/auth'

const email = ref('')
const password = ref('')
const isLoading = ref(false)
const errorMessage = ref('')
const router = useRouter()
const auth = getAuth()
const authStore = useAuthStore()

const signin = async () => {
  if (!email.value || !password.value) {
    errorMessage.value = 'Please fill in all required fields'
    return
  }

  isLoading.value = true
  errorMessage.value = ''

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value)
    console.log("Firebase signin successful:", userCredential.user)

    // Update auth store
    authStore.login(userCredential.user.email)

    // Redirect to home page
    router.push('/')

  } catch (error) {
    console.error('Signin error:', error)
    switch (error.code) {
      case 'auth/user-not-found':
        errorMessage.value = 'User not found, please register first'
        break
      case 'auth/wrong-password':
        errorMessage.value = 'Incorrect password'
        break
      case 'auth/invalid-email':
        errorMessage.value = 'Invalid email format'
        break
      case 'auth/too-many-requests':
        errorMessage.value = 'Too many login attempts, please try again later'
        break
      default:
        errorMessage.value = 'Signin failed: ' + error.message
    }
  } finally {
    isLoading.value = false
  }
}
</script>
