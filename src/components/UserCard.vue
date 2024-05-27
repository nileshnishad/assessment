<template>
  <div class="user-card p-4 bg-white rounded-lg shadow-md relative">
    <button @click="$emit('closeCard')" class="close-button bg-gray-200 text-gray-600 hover:text-gray-800 z-10">
    <i class="fas fa-times"></i>
</button>

    <div class="flex items-center mb-4">
      <img :src="user.avatar" alt="avatar" class="w-16 h-16 rounded-full mr-4" />
      <div>
        <h2 class="text-2xl font-bold">{{ user.name }}</h2>
        <p class="text-gray-600">{{ user.username }}</p>
      </div>
    </div>
    <div class="flex justify-between items-center mb-4">
      <button class="bg-blue-500 text-white px-4 py-2 rounded-md">Follow</button>
      <button class="bg-blue-500 text-white px-4 py-2 rounded-md">Message</button>
    </div>
    <div class="mb-4">
      <h3 class="text-lg font-semibold">Private note</h3>
      <textarea
        class="w-full p-2 border rounded-md"
        placeholder="Write a private note..."
        v-model="privateNote"
      ></textarea>
    </div>
    <div class="mb-4">
      <h3 class="text-lg font-semibold">Contact</h3>
      <p class="flex items-center"><i class="fas fa-envelope mr-2"></i>{{ user.email }}</p>
      <p class="flex items-center"><i class="fas fa-link mr-2"></i>{{ user.website }}</p>
    </div>
    <div class="mb-4 flex space-x-4">
      <a href="#" class="text-gray-600 hover:text-blue-500"><i class="fab fa-twitter"></i></a>
      <a href="#" class="text-gray-600 hover:text-blue-500"><i class="fab fa-instagram"></i></a>
      <a href="#" class="text-gray-600 hover:text-blue-500"><i class="fab fa-pinterest"></i></a>
      <a href="#" class="text-gray-600 hover:text-blue-500"><i class="fab fa-facebook"></i></a>
    </div>
    <div>
      <h3 class="text-lg font-semibold">Purchase history</h3>
      <table class="min-w-full bg-white rounded-lg">
        <thead>
          <tr>
            <th class="px-4 py-2 text-left">Product</th>
            <th class="px-4 py-2 text-right">Price</th>
            <th class="px-4 py-2 text-right">Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in user.purchaseHistory" :key="item.id">
            <td class="px-4 py-2">{{ item.product }}</td>
            <td class="px-4 py-2 text-right">${{ item.price }}</td>
            <td class="px-4 py-2 text-right">{{ item.date }}</td>
          </tr>
        </tbody>
      </table>
      <div class="flex justify-center mt-4">
        <button @click="loadMore" class="bg-gray-200 px-4 py-2 rounded-md" v-if="!loadingMore">Load More</button>
        <div v-if="loadingMore" class="loader"></div>
      </div>
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

const privateNote = ref('');
const loadingMore = ref(false);

const loadMore = () => {
  loadingMore.value = true;
  setTimeout(() => {
    // Simulate loading more data
    loadingMore.value = false;
  }, 2000);
};


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
</style>
