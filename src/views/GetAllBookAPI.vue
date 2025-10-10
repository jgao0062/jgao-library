<template>
  <div id="app">
    <h1>All Books API</h1>
    <pre>{{ jsondata }}</pre>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      jsondata: null,
      error: null
    };
  },
  mounted() {
    this.getAllBooksAPI();
  },
  methods: {
    async getAllBooksAPI() {
      try {
        const response = await axios.get('https://getallbooks-mc4qwou5va-uc.a.run.app');
        this.jsondata = response.data;
        this.error = null;
      } catch (error) {
        console.error('Error fetching all books:', error);
        this.error = error;
        this.jsondata = null;
      }
    }
  }
};
</script>
