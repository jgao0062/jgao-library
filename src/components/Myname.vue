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
  padding: 20px;
}

.my-name h2 {
  color: #ffffff;
  margin-bottom: 10px;
}

.my-name p {
  color: #ffffff;
  margin: 5px 0;
}
</style>
