<template>
  <div>
    <h1>Books with ISBN > 1000 (Ordered by ISBN, Limited to 5)</h1>
    <ul>
      <li v-for="book in books" :key="book.id" class="book-item">
        <div class="book-info">
          {{ book.name }} - ISBN: {{ book.isbn }}
        </div>
        <div class="book-actions">
          <button @click="editBook(book)" class="btn-edit">Edit</button>
          <button @click="deleteBook(book.id)" class="btn-delete">Delete</button>
        </div>
      </li>
    </ul>

    <!-- Edit Book Modal -->
    <div v-if="editingBook" class="modal-overlay" @click="closeEditModal">
      <div class="modal-content" @click.stop>
        <h3>Edit Book</h3>
        <form @submit.prevent="updateBook">
          <div>
            <label for="edit-name">Name:</label>
            <input type="text" v-model="editingBook.name" id="edit-name" required />
          </div>
          <div>
            <label for="edit-isbn">ISBN:</label>
            <input type="number" v-model="editingBook.isbn" id="edit-isbn" required />
          </div>
          <div class="modal-actions">
            <button type="submit" class="btn-save">Save</button>
            <button type="button" @click="closeEditModal" class="btn-cancel">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import db from '../firebase/init.js'
import { collection, query, where, orderBy, limit, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore'

export default {
  name: 'BookList',
  setup() {
    const books = ref([])
    const editingBook = ref(null)

    const fetchBooks = async () => {
      try {
        // Use where, orderBy, limit query parameters
        const q = query(
          collection(db, 'books'),
          where('isbn', '>', 1000),
          orderBy('isbn', 'asc'),
          limit(5)
        )
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

    const editBook = (book) => {
      editingBook.value = { ...book }
    }

    const closeEditModal = () => {
      editingBook.value = null
    }

    const updateBook = async () => {
      try {
        const bookRef = doc(db, 'books', editingBook.value.id)
        await updateDoc(bookRef, {
          name: editingBook.value.name,
          isbn: Number(editingBook.value.isbn)
        })

        // Refresh book list
        await fetchBooks()
        closeEditModal()
        alert('Book updated successfully!')
      } catch (error) {
        console.error('Error updating book: ', error)
        alert('Error updating book!')
      }
    }

    const deleteBook = async (bookId) => {
      if (confirm('Are you sure you want to delete this book?')) {
        try {
          await deleteDoc(doc(db, 'books', bookId))
          // Refresh book list
          await fetchBooks()
          alert('Book deleted successfully!')
        } catch (error) {
          console.error('Error deleting book: ', error)
          alert('Error deleting book!')
        }
      }
    }

    onMounted(() => {
      fetchBooks()
    })

    return {
      books,
      editingBook,
      editBook,
      closeEditModal,
      updateBook,
      deleteBook
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

.book-item {
  background: #f9f9f9;
  margin-bottom: 10px;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  border-left: 4px solid #007bff;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.book-item:hover {
  background: #e9ecef;
  transform: translateY(-2px);
  transition: all 0.3s ease;
}

.book-info {
  font-size: 16px;
  color: #555;
  flex: 1;
}

.book-actions {
  display: flex;
  gap: 10px;
}

.btn-edit, .btn-delete {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
}

.btn-edit {
  background-color: #28a745;
  color: white;
}

.btn-edit:hover {
  background-color: #218838;
}

.btn-delete {
  background-color: #dc3545;
  color: white;
}

.btn-delete:hover {
  background-color: #c82333;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 400px;
  max-width: 90%;
}

.modal-content h3 {
  margin-top: 0;
  margin-bottom: 20px;
  color: #333;
  text-align: center;
}

.modal-content div {
  margin-bottom: 15px;
}

.modal-content label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
}

.modal-content input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;
}

.modal-content input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0,123,255,0.25);
}

.modal-actions {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 20px;
}

.btn-save, .btn-cancel {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s ease;
}

.btn-save {
  background-color: #007bff;
  color: white;
}

.btn-save:hover {
  background-color: #0056b3;
}

.btn-cancel {
  background-color: #6c757d;
  color: white;
}

.btn-cancel:hover {
  background-color: #545b62;
}
</style>
