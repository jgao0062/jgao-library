<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <div class="card">
          <div class="card-header">
            <h3 class="text-center">Access Denied</h3>
          </div>
          <div class="card-body text-center">
            <h4>&#128274; Unauthorized Access</h4>
            <p class="mt-3">
              You need to be logged in to access this page.
            </p>
            <p>
              Please log in with valid credentials to continue.
            </p>
            <div class="mt-4">
              <router-link to="/login" class="btn btn-primary me-2">
                Go to Login
              </router-link>
              <router-link to="/" class="btn btn-secondary">
                Back to Home
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// No script needed for this component
</script>

<style scoped>
.card {
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.card-header {
  background-color: #dc3545;
  color: white;
  padding: 10px;
  border-radius: 10px 10px 0 0;
}
</style>
