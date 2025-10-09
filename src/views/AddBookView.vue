<template>
  <div>
    <h1>Add Book (with Capitalization)</h1>
    <p style="text-align: center; color: #666; margin-bottom: 20px;">
      Books will be automatically capitalized when saved to Firestore via Firebase Function
    </p>

    <form @submit.prevent="addBook">
      <div>
        <label for="isbn">ISBN: </label>
        <input type="text" v-model="isbn" id="isbn" required />
      </div>
      <div>
        <label for="name">Book Name: </label>
        <input type="text" v-model="name" id="name" required />
      </div>
      <button type="submit" :disabled="loading">
        {{ loading ? 'Adding...' : 'Add Book' }}
      </button>
    </form>

    <!-- Success/Error Message -->
    <div v-if="message" :class="message.includes('Error') ? 'error-message' : 'success-message'">
      {{ message }}
    </div>

    <!-- BookList component loaded directly under AddBook page -->
    <BookList />
  </div>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'
import BookList from '../components/BookList.vue'

export default {
  name: 'AddBookView',
  components: {
    BookList
  },
  setup() {
    const isbn = ref('')
    const name = ref('')
    const loading = ref(false)
    const message = ref('')

    const addBook = async () => {
      try {
        loading.value = true
        message.value = ''

        const isbnNumber = Number(isbn.value)
        if (isNaN(isbnNumber)) {
          alert('ISBN must be a valid number')
          return
        }

        // Call Firebase Function to add book with capitalized name
        const response = await axios.post('https://addbookcapitalized-mc4qwou5va-uc.a.run.app', {
          isbn: isbnNumber,
          name: name.value
        })

        if (response.data.success) {
          isbn.value = ''
          name.value = ''
          message.value = `Book added successfully! Original: "${response.data.book.originalName}" → Capitalized: "${response.data.book.name}"`
        }
      } catch (error) {
        console.error('Error adding book: ', error)
        message.value = 'Error adding book: ' + (error.response?.data || error.message)
      } finally {
        loading.value = false
      }
    }

    return {
      isbn,
      name,
      loading,
      message,
      addBook
    }
  }
}
</script>

<style scoped>
div {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}

form {
  background: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

div {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;
}

input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0,123,255,0.25);
}

button {
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}

button:active {
  background-color: #004085;
}

button:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}

.success-message {
  background-color: #d4edda;
  color: #155724;
  padding: 10px;
  border-radius: 4px;
  margin-top: 15px;
  border: 1px solid #c3e6cb;
}

.error-message {
  background-color: #f8d7da;
  color: #721c24;
  padding: 10px;
  border-radius: 4px;
  margin-top: 15px;
  border: 1px solid #f5c6cb;
}
</style>
