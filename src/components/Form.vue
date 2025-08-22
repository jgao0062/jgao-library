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
                <label for="username" class="form-label">Username *</label>
                <input type="text" class="form-control" id="username"
                @blur="() => validateName(true)"
                @input="() => validateName(false)"
                v-model="formData.username">
                <div v-if="errors.username" class="text-danger mt-1">{{ errors.username }}</div>
              </div>
              <div class="col-12 col-sm-6">
                <label for="password" class="form-label">Password *</label>
                <input type="password" class="form-control" id="password"
                  @blur="() => validatePassword(true)"
                  @input="() => validatePassword(false)"
                  v-model="formData.password" />
                <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
              </div>
            </div>

            <!-- Checkbox and Gender Row -->
            <div class="row g-3 mb-3">
              <div class="col-12 col-sm-6 d-flex align-items-end">
                <div class="form-check">
                  <input type="checkbox" class="form-check-input" id="isAustralian"
                  @change="() => validateResident(true)"
                  v-model="formData.isAustralian">
                  <label class="form-check-label" for="isAustralian">Australian Resident? *</label>
                </div>
                <div v-if="errors.resident" class="text-danger mt-1 ms-2">{{ errors.resident }}</div>
              </div>
              <div class="col-12 col-sm-6">
                <label for="gender" class="form-label">Gender *</label>
                <select class="form-select" id="gender"
                @blur="() => validateGender(true)"
                @change="() => validateGender(false)"
                v-model="formData.gender">
                  <option value="">Please select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                <div v-if="errors.gender" class="text-danger mt-1">{{ errors.gender }}</div>
              </div>
            </div>

            <!-- Reason Textarea -->
            <div class="mb-4">
              <label for="reason" class="form-label">Reason for joining *</label>
              <textarea class="form-control" id="reason" rows="3"
              @blur="() => validateReason(true)"
              @input="() => validateReason(false)"
              v-model="formData.reason"
              placeholder="Please tell us why you want to join (10-200 characters)"></textarea>
              <div v-if="errors.reason" class="text-danger mt-1">{{ errors.reason }}</div>
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

  <!-- DataTable Section -->
  <div class="container-fluid px-3 px-md-4" v-if="submittedCards.length">
    <div class="row justify-content-center mt-5">
      <div class="col-12">
        <DataTable :value="submittedCards"
                   tableStyle="min-width: 50rem"
                   stripedRows
                   showGridlines
                   class="custom-datatable">
          <Column field="username" header="Username" sortable></Column>
          <Column field="password" header="Password" sortable></Column>
          <Column field="isAustralian" header="Australian Resident" sortable>
            <template #body="slotProps">
              {{ slotProps.data.isAustralian ? 'true' : 'false' }}
            </template>
          </Column>
          <Column field="gender" header="Gender" sortable></Column>
          <Column field="reason" header="Reason" sortable></Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

const formData = ref({
  username: '',
  password: '',
  isAustralian: false,
  reason: '',
  gender: ''
});

const submittedCards = ref([]);

const errors = ref({
  username: null,
  password: null,
  resident: null,
  gender: null,
  reason: null
});

const submitForm = () => {
  // 验证所有字段
  validateName(true);
  validatePassword(true);
  validateResident(true);
  validateGender(true);
  validateReason(true);

  // 检查是否有错误
  if (!errors.value.username && !errors.value.password &&
      !errors.value.resident && !errors.value.gender && !errors.value.reason) {
    submittedCards.value.push({...formData.value});
    clearForm();
  }
};

const clearForm = () => {
  formData.value = {
    username: '',
    password: '',
    isAustralian: false,
    reason: '',
    gender: ''
  };
  // 清除所有错误信息
  errors.value = {
    username: null,
    password: null,
    resident: null,
    gender: null,
    reason: null
  };
};

const validateName = (blur) => {
  if (formData.value.username.length < 3) {
    if (blur) errors.value.username = 'Name must be at least 3 characters long.';
  } else {
    errors.value.username = null;
  }
};

const validatePassword = (blur) => {
  const password = formData.value.password;
  const minLength = 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (password.length < minLength) {
    if (blur) errors.value.password = `Password must be at least ${minLength} characters long.`;
  } else if (!hasUppercase) {
    if (blur) errors.value.password = "Password must contain at least one uppercase letter.";
  } else if (!hasLowercase) {
    if (blur) errors.value.password = "Password must contain at least one lowercase letter.";
  } else if (!hasNumber) {
    if (blur) errors.value.password = "Password must contain at least one number.";
  } else if (!hasSpecialChar) {
    if (blur) errors.value.password = "Password must contain at least one special character.";
  } else {
    errors.value.password = null;
  }
};

const validateResident = (blur) => {
  if (!formData.value.isAustralian) {
    if (blur) errors.value.resident = 'You must be an Australian resident to proceed.';
  } else {
    errors.value.resident = null;
  }
};

const validateGender = (blur) => {
  if (!formData.value.gender || formData.value.gender === '') {
    if (blur) errors.value.gender = 'Please select your gender.';
  } else {
    errors.value.gender = null;
  }
};

const validateReason = (blur) => {
  const reason = formData.value.reason.trim();
  if (reason.length < 10) {
    if (blur) errors.value.reason = 'Reason must be at least 10 characters long.';
  } else if (reason.length > 200) {
    if (blur) errors.value.reason = 'Reason must not exceed 200 characters.';
  } else {
    errors.value.reason = null;
  }
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

/* Form validation styles */
.form-control:invalid,
.form-select:invalid {
  border-color: #dc3545;
  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.15);
}

.form-control:valid,
.form-select:valid {
  border-color: #198754;
}

.form-check-input:invalid {
  border-color: #dc3545;
}

.form-check-input:valid {
  border-color: #198754;
}

/* Error message styling */
.text-danger {
  font-size: 0.875rem;
  font-weight: 500;
}

/* Placeholder styling */
::placeholder {
  color: #6c757d;
  opacity: 0.7;
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

/* DataTable styling */
.custom-datatable {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  margin-top: 2rem;
  border: 1px solid #e0e0e0;
}

.custom-datatable :deep(.p-datatable-table) {
  width: 100%;
  border-collapse: collapse;
}

.custom-datatable :deep(.p-datatable-thead > tr > th) {
  background-color: #275FDA !important;
  color: white !important;
  border: 1px solid #1e4eb8 !important;
  font-weight: 600;
  padding: 1rem;
  text-align: center;
}

.custom-datatable :deep(.p-datatable-tbody > tr > td) {
  padding: 0.75rem 1rem;
  text-align: center;
  border: 1px solid #e0e0e0;
  background-color: white;
}

.custom-datatable :deep(.p-datatable-tbody > tr:nth-child(odd) > td) {
  background-color: #f8f9fa;
}

.custom-datatable :deep(.p-datatable-tbody > tr:hover > td) {
  background-color: #e3f2fd !important;
}

.custom-datatable :deep(.p-sortable-column) {
  cursor: pointer;
}

.custom-datatable :deep(.p-sortable-column:hover) {
  background-color: #1e4eb8 !important;
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

  .custom-datatable {
    font-size: 0.875rem;
  }

  .custom-datatable .p-datatable-thead > tr > th,
  .custom-datatable .p-datatable-tbody > tr > td {
    padding: 0.5rem;
  }

  .btn {
    min-height: 44px;
    font-size: 0.95rem;
  }
}

/* Tablet adjustments */
@media (min-width: 577px) and (max-width: 768px) {
  .custom-datatable {
    font-size: 0.9rem;
  }
}

/* Large screens */
@media (min-width: 1200px) {
  .custom-datatable {
    font-size: 1rem;
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
.custom-datatable {
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
