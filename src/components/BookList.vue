<template>
  <div>
    <h1>Books with ISBN > 1000</h1>
    <ul>
      <li v-for="book in books" :key="book.id">
        {{ book.name }} - ISBN: {{ book.isbn }}
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import db from '../firebase/init.js'
import { collection, query, where, getDocs } from 'firebase/firestore'

export default {
  name: 'BookList',
  setup() {
    const books = ref([])

    const fetchBooks = async () => {
      try {
        const q = query(collection(db, 'books'), where('isbn', '>', 1000))
        const querySnapshot = await getDocs(q)
        const booksArray = []
        querySnapshot.forEach((doc) => {
          booksArray.push({
            id: doc.id,
            ...doc.data()
          })
        })
        books.value = booksArray
      } catch (error) {
        console.error('Error fetching books: ', error)
      }
    }

    onMounted(() => {
      fetchBooks()
    })

    return {
      books
    }
  }
}
</script>

<style scoped>
div {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
  font-size: 24px;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

li {
  background: #f9f9f9;
  margin-bottom: 10px;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  border-left: 4px solid #007bff;
  font-size: 16px;
  color: #555;
}

li:hover {
  background: #e9ecef;
  transform: translateY(-2px);
  transition: all 0.3s ease;
}
</style>
