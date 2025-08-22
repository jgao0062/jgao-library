<template>
  <div class="container-fluid px-3 px-md-4 py-4">
    <div class="row justify-content-center">
      <div class="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
        <h1 class="text-center mb-4 fs-2 fs-md-1">User Information Form</h1>
        <div class="form-container">
          <form @submit.prevent="submitForm">
            <!-- Username and Password Row -->
            <div class="row g-3 mb-3">
              <div class="col-12 col-sm-6">
                <label for="username" class="form-label">Username</label>
                <input type="text" class="form-control" id="username" v-model="formData.username">
              </div>
              <div class="col-12 col-sm-6">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" v-model="formData.password">
              </div>
            </div>

            <!-- Checkbox and Gender Row -->
            <div class="row g-3 mb-3">
              <div class="col-12 col-sm-6 d-flex align-items-end">
                <div class="form-check">
                  <input type="checkbox" class="form-check-input" id="isAustralian" v-model="formData.isAustralian">
                  <label class="form-check-label" for="isAustralian">Australian Resident?</label>
                </div>
              </div>
              <div class="col-12 col-sm-6">
                <label for="gender" class="form-label">Gender</label>
                <select class="form-select" id="gender" v-model="formData.gender">
                  <option value="">Please select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <!-- Reason Textarea -->
            <div class="mb-4">
              <label for="reason" class="form-label">Reason for joining</label>
              <textarea class="form-control" id="reason" rows="3" v-model="formData.reason"></textarea>
            </div>

            <!-- Buttons -->
            <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
              <button type="submit" class="btn btn-primary btn-lg flex-sm-fill">Submit</button>
              <button type="button" class="btn btn-secondary btn-lg flex-sm-fill" @click="clearForm">Clear</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

  <!-- Cards Section -->
  <div class="container-fluid px-3 px-md-4" v-if="submittedCards.length">
    <div class="row justify-content-center mt-5">
      <div class="col-12">
        <h2 class="text-center mb-4">Submitted Information</h2>
        <div class="cards-container">
          <div v-for="(card, index) in submittedCards" :key="index" class="card-item">
            <div class="card">
              <div class="card-header">
                <h5 class="mb-0">User Information #{{ index + 1 }}</h5>
              </div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">
                  <strong>Username:</strong> {{ card.username }}
                </li>
                <li class="list-group-item">
                  <strong>Password:</strong> {{ card.password }}
                </li>
                <li class="list-group-item">
                  <strong>Australian Resident:</strong> {{ card.isAustralian ? 'Yes' : 'No' }}
                </li>
                <li class="list-group-item">
                  <strong>Gender:</strong> {{ card.gender }}
                </li>
                <li class="list-group-item">
                  <strong>Reason:</strong> {{ card.reason }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const formData = ref({
  username: '',
  password: '',
  isAustralian: false,
  reason: '',
  gender: ''
});

const submittedCards = ref([]);

const submitForm = () => {
  submittedCards.value.push({
    ...formData.value
  });
};

const clearForm = () => {
  formData.value = {
    username: '',
    password: '',
    isAustralian: false,
    reason: '',
    gender: ''
  };
};
</script>

<style scoped>
/* Form Container */
.form-container {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  padding: 2rem;
  margin-bottom: 2rem;
}

/* Responsive form controls */
.form-control,
.form-select {
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  transition: all 0.3s ease;
}

.form-control:focus,
.form-select:focus {
  border-color: #275FDA;
  box-shadow: 0 0 0 0.2rem rgba(39, 95, 218, 0.15);
}

/* Button responsive styling */
.btn {
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s ease;
  min-height: 48px;
}

.btn-primary {
  background-color: #275FDA;
  border-color: #275FDA;
}

.btn-primary:hover {
  background-color: #1e4eb8;
  border-color: #1e4eb8;
}

.btn-secondary {
  background-color: #6c757d;
  border-color: #6c757d;
}

.btn-secondary:hover {
  background-color: #545b62;
  border-color: #545b62;
}

/* Cards container responsive layout */
.cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  padding: 0 1rem;
}

.card-item .card {
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
}

.card-item .card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
}

.card-header {
  background-color: #275FDA;
  color: white;
  padding: 1rem;
  border-radius: 12px 12px 0 0;
  border-bottom: none;
}

.list-group-item {
  padding: 0.75rem 1rem;
  border-color: #f0f0f0;
}

.list-group-item:last-child {
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
}

/* Mobile optimizations */
@media (max-width: 576px) {
  .form-container {
    padding: 1.5rem;
    margin: 0 0.5rem 2rem;
    border-radius: 8px;
  }

  .cards-container {
    grid-template-columns: 1fr;
    padding: 0;
  }

  .card-item .card {
    border-radius: 8px;
  }

  .card-header {
    border-radius: 8px 8px 0 0;
    padding: 0.75rem;
  }

  .btn {
    min-height: 44px;
    font-size: 0.95rem;
  }
}

/* Tablet adjustments */
@media (min-width: 577px) and (max-width: 768px) {
  .cards-container {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }
}

/* Large screens */
@media (min-width: 1200px) {
  .cards-container {
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  }
}

/* Focus and accessibility */
.form-check-input:focus {
  box-shadow: 0 0 0 0.2rem rgba(39, 95, 218, 0.15);
}

.form-label {
  font-weight: 500;
  color: #333;
}

/* Animation for form submission */
.card-item {
  animation: slideIn 0.5s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
