<template>
  <div class="user-card p-4 bg-white rounded-lg shadow-md relative">
    <button @click="$emit('closeCard')" class="close-button bg-gray-200 text-gray-600 hover:text-gray-800 z-10">
      <i class="fas fa-times"></i>
    </button>

    <div class="flex md:flex-row flex-col mb-4 justify-between">
      <div class="flex">
        <img :src="user.avatar" alt="avatar" class="w-16 h-16 rounded-full mr-4" />
        <div>
          <h2 class="text-2xl font-bold">{{ user.name }}</h2>
          <p class="text-gray-600">{{ user.username }}</p>
        </div>
      </div>
      <div class="flex justify-between items-center mb-4">
        <button class="bg-blue-500 w-half text-white px-4 py-2 mr-1 rounded-md">Follow</button>
        <button class="bg-blue-500 w-half text-white px-4 py-2 rounded-md">Message</button>
      </div>
    </div>

    <div class="mb-4">
      <h3 class="text-lg font-semibold">Private note</h3>
      <div class="quill-editor-container">
      <quill-editor  v-model="privateNote" :options="editorOptions" class="bg-gray-100"></quill-editor>
      </div>
    </div>
    <div class="my-4">
      <p class="flex items-center"><i class="fas fa-envelope mr-2"></i>{{ user.email }}</p>
    </div>
    <hr class="my-4 border-t border-gray-200">
    <div class="my-4 flex space-x-4">
      <a href="#" class="text-gray-600 hover:text-blue-500"><i class="fab fa-twitter"></i></a>
      <a href="#" class="text-gray-600 hover:text-blue-500"><i class="fab fa-instagram"></i></a>
      <a href="#" class="text-gray-600 hover:text-blue-500"><i class="fab fa-pinterest"></i></a>
      <a href="#" class="text-gray-600 hover:text-blue-500"><i class="fab fa-facebook"></i></a>
    </div>
    <hr class="my-4 border-t border-gray-200">

    <div class="my-4">
      <p class="flex items-center"><i class="fas fa-link mr-2"></i>{{ user.website }}</p>
    </div>
    <div class="my-4">
      <h4 class="text-lg">Purchase history <i class="fa-solid fa-circle-info"></i></h4> 
      <table class="min-w-full bg-white rounded-lg">
        <thead>
          <tr>
            <th class="text-left zero-less">Product</th>
            <th class="px-4 py-2 text-left">Price</th>
            <th class="px-4 py-2 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in user.purchaseHistory" :key="item.id" class="boder-t">
            <td class="px-4 py-2">{{ item.product }}</td>
            <td class="px-4 py-2 text-left">${{ item.price }}</td>
            <td class="px-4 py-2 text-left">{{ item.date }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref } from 'vue';


const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});

console.log(props);

const privateNote = ref('');


const editorOptions = {
  modules: {
          toolbar: [
          ['bold', 'italic', 'underline', 'strike'], 
          ['blockquote', 'code-block'],
          [{ 'align': [] }],
          ['link', 'image'],
          ['clean'], 
          [{ 'back': '<i class="fas fa-arrow-left"></i>' }],
      [{ 'next': '<i class="fas fa-arrow-right"></i>' }]
          ]
        },
        placeholder: 'Write your Message ...',
}


</script>

<style scoped>
.user-card {
  max-width: 1024px;
  margin: auto;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
  position: relative;
}

.user-card img {
  border-radius: 9999px;
}

.user-card h2 {
  margin-bottom: 0.25rem;
}

.user-card h3 {
  margin-bottom: 0.5rem;
}

.user-card p {
  margin-bottom: 0.5rem;
}

.user-card table {
  width: 100%;
  border-collapse: collapse;
}

.user-card th,
.user-card td {
  padding: 0.5rem;
  border-bottom: 1px solid #e2e8f0;
}

.loader {
  border: 4px solid #f3f3f3;
  border-radius: 50%;
  border-top: 4px solid #3498db;
  width: 20px;
  height: 20px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.close-button {
  position: absolute;
  top: -40px;
  right: 10px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ccc;
  z-index: 100;
}
.w-half {
  width: 50%;
}

.quill-editor-container {
  height: 150px; /* Set the minimum height for the editor */
  border-radius: 0.7rem; /* Set border-radius for all corners */
  overflow: auto;
  border: 0.5px solid gray;
}
.zero-less {
  padding: 0 !important;
}

</style>
