import { ref } from 'vue'

// Simple authentication store using Vue's reactivity
const isAuthenticated = ref(false)
const currentUser = ref(null)

export const useAuthStore = () => {
  const login = (username) => {
    isAuthenticated.value = true
    currentUser.value = username
  }

  const logout = () => {
    isAuthenticated.value = false
    currentUser.value = null
  }

  return {
    isAuthenticated,
    currentUser,
    login,
    logout
  }
}
