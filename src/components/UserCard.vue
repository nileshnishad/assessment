<template>
    <div class="user-card">
      <h2>{{ user.name }}</h2>
      <p>Email: {{ user.email }}</p>
      <p>Purchase: {{ user.purchase }}</p>
      <!-- Add more user details as needed -->
    </div>
  </template>
  
  <script>
  export default {
    props: {
      user: {
        type: Object,
        required: true
      }
    }
  }
  </script>
  
  <style scoped>
  .user-card {
    /* Add styles for the user card */
  }
  </style>
  