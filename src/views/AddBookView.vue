<template>
  <div>
    <h1>Add Book</h1>
    <form @submit.prevent="addBook">
      <div>
        <label for="isbn">ISBN: </label>
        <input type="text" v-model="isbn" id="isbn" required />
      </div>
      <div>
        <label for="name">Name: </label>
        <input type="text" v-model="name" id="name" required />
      </div>
      <button type="submit">Add Book</button>
    </form>

    <!-- BookList component loaded directly under AddBook page -->
    <BookList />
  </div>
</template>

<script>
import { ref } from 'vue'
import db from '../firebase/init.js'
import { collection, addDoc } from 'firebase/firestore'
import BookList from '../components/BookList.vue'

export default {
  name: 'AddBookView',
  components: {
    BookList
  },
  setup() {
    const isbn = ref('')
    const name = ref('')

    const addBook = async () => {
      try {
        const isbnNumber = Number(isbn.value)
        if (isNaN(isbnNumber)) {
          alert('ISBN must be a valid number')
          return
        }

        await addDoc(collection(db, 'books'), {
          isbn: isbnNumber,
          name: name.value
        })

        isbn.value = ''
        name.value = ''
        alert('Book added successfully!')
      } catch (error) {
        console.error('Error adding book: ', error)
      }
    }

    return {
      isbn,
      name,
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
</style>
