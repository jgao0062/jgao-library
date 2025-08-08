<template>
  <div class="my-name">
    <h2>{{ name }}</h2>
    <p>Student ID: {{ studentId }}</p>
  </div>
</template>

<script>
export default {
  name: 'MyName',
  data() {
    return {
      name: 'Jing Gao',
      studentId: '34529578',
    }
  },
}
</script>

<style scoped>
.my-name {
  text-align: center;
  margin: 20px;
  padding: 40px;
}

.my-name h2 {
  color: #2f107c;
  margin-bottom: 20px;
}

.my-name p {
  color: #4f0d78;
  margin: 10px 0;
}
</style>
