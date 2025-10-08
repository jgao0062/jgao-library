<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container">
      <router-link class="navbar-brand" to="/"> Library App</router-link>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item" v-if="authStore.isAuthenticated.value">
            <router-link class="nav-link" to="/about">About (Members)</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/addbook" active-class="active">Add Book</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/GetBookCount" active-class="active">Book Count</router-link>
          </li>
        </ul>

        <ul class="navbar-nav">
          <li class="nav-item" v-if="!authStore.isAuthenticated.value">
            <router-link class="nav-link" to="/login">Login</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/FireRegister">Firebase Register</router-link>
          </li>
          <li class="nav-item" v-if="!authStore.isAuthenticated.value">
            <router-link class="nav-link" to="/FireLogin">Firebase Login</router-link>
          </li>
          <li class="nav-item" v-if="authStore.isAuthenticated.value">
            <span class="navbar-text me-3">
              Welcome, {{ authStore.currentUser.value }}!
            </span>
          </li>
          <li class="nav-item" v-if="authStore.isAuthenticated.value">
            <button class="btn btn-outline-light btn-sm" @click="handleLogout">
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.b-example-divider {
  height: 3rem;
  background-color: rgba(0, 0, 0, 0.1);
  border: solid rgba(0, 0, 0, 0.15);
  border-width: 1px 0;
  box-shadow:
    inset 0 0.5em 1.5em rgba(0, 0, 0, 0.1),
    inset 0 0.125em 0.5em rgba(0, 0, 0, 0.15);
}

.form-control-dark {
  color: #fff;
  background-color: var(--bs-dark);
  border-color: var(--bs-gray);
}
.form-control-dark:focus {
  color: #fff;
  background-color: var(--bs-dark);
  border-color: #fff;
  box-shadow: 0 0 0 0.25rem rgba(255, 255, 255, 0.25);
}

.bi {
  vertical-align: -0.125em;
  fill: currentColor;
}

.text-small {
  font-size: 85%;
}

.dropdown-toggle {
  outline: 0;
}

/* Additional styles for authentication controls */
.btn-sm {
  font-size: 0.875rem;
}

.text-success {
  font-weight: 500;
}
</style>
