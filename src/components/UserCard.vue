<template>
  <div class="user-card p-4 bg-white rounded-lg shadow-md relative">
    <button
      @click="$emit('closeCard')"
      class="close-button bg-gray-200 text-gray-600 hover:text-gray-800 z-10"
    >
      <i class="fas fa-times"></i>
    </button>

    <div class="flex md:flex-row flex-col mb-4 justify-between">
      <div class="flex">
        <img
          :src="getAvtar(user.avatar)"
          alt="avatar"
          class="w-16 h-16 rounded-full mr-4"
        />
        <div>
          <h2 class="text-20x">{{ user.name }}</h2>
          <p class="text-12x">{{ user.username }}</p>
        </div>
      </div>
      <div class="flex justify-between items-center mb-4">
        <button class="bg-blue-500 w-half text-white px-4 py-2 mr-1 rounded-md">
          Follow
        </button>
        <button class="bg-blue-500 w-half text-white px-4 py-2 rounded-md">
          Message
        </button>
      </div>
    </div>

    <div class="mb-4">
      <h3 class="text-14x">Private note <i class="fa-solid fa-circle-info"></i></h3>
      <div class="quill-editor-container">
        <quill-editor
          v-model="privateNote"
          :options="editorOptions"
          class="bg-gray-100"
        ></quill-editor>
      </div>
    </div>
    <div class="my-4">
      <p class="flex items-center">
        <i class="fas fa-envelope text-14x mr-2 social-icon"></i>{{ user.email }}
      </p>
    </div>
    <hr class="my-4 border-t border-gray-200" />
    <div class="my-4 flex space-x-4">
      <a href="#" class="text-gray-600 hover:text-blue-500 social-icon"
        ><i class="fab fa-twitter"></i
      ></a>
      <a href="#" class="text-gray-600 hover:text-blue-500 social-icon"
        ><i class="fab fa-instagram"></i
      ></a>
      <a href="#" class="text-gray-600 hover:text-blue-500 social-icon"
        ><i class="fab fa-pinterest"></i
      ></a>
      <a href="#" class="text-gray-600 hover:text-blue-500 social-icon"
        ><i class="fab fa-facebook"></i
      ></a>
    </div>
    <hr class="my-4 border-t border-gray-200" />

    <div class="my-4">
      <p class="flex items-center">
        <i class="fas fa-link mr-2 social-icon"></i>{{ user.website }}
      </p>
    </div>
    <div class="my-4">
      <h4 class="text-14x">
        Purchase history <i class="fa-solid fa-circle-info"></i>
      </h4>
      <table class="min-w-full bg-white rounded-lg">
        <thead>
          <tr>
            <th class="text-left text-12x zero-less">Product</th>
            <th class="px-4 py-2 text-12x text-left">Price</th>
            <th class="px-4 py-2 text-12x text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in user.purchaseHistory"
            :key="item.id"
            class="boder-t clickable hover:bg-gray-100 rounded-lg"
          >
            <td class="p-2 flex items-center relative">
              <img
                :src="getImageUrl(item.productImg)"
                alt="productImg"
                class="w-10 h-10 mr-2 rounded"
              />
              <div>
                <div class="text-15x">
                  {{ item.product }}
                </div>
                <div class="text-13x text-gray-500">
                  {{ item.productLink }}
                </div>
              </div>
            </td>
            <td class="px-4 py-2 text-left">
              <div class="bg-b5e4ca text-14x p-2 float-left rounded">
                ${{ item.price }}
              </div>
            </td>
            <td class="px-4 py-2 text-14x text-left">
              {{ formatDate(item.date) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref } from "vue";
import { formatDate } from '../utils/formatDate';

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});
console.log(props);
const privateNote = ref("");

const editorOptions = {
  modules: {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],
      [{ align: [] }],
      ["link", "image"],
      ["clean"],
      [{ back: '<i class="fas fa-arrow-left"></i>' }],
      [{ next: '<i class="fas fa-arrow-right"></i>' }]
    ],
  },
  placeholder: "Write your message ...",
};

const requireContext = require.context('@/assets/images/product', false, /\.(png|jpe?g|svg)$/);
const getImageUrl = (imageName) => {
  return requireContext(`./${imageName}`);
};
const requireAvtar = require.context('@/assets/images', false, /\.(png|jpe?g|svg)$/);
const getAvtar = (imageName) =>{
  return requireAvtar(`./${imageName}`);
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
  height: 200px; 
  border-radius: 0.7rem; 
  overflow: hidden;
  border: 0.5px solid gray;
}
.zero-less {
  padding: 0 !important;
}
.social-icon {
  padding: 0 5px;
  font-size: 18px; /* Adjust the size as needed */
}

.clickable {
  cursor: pointer;
}
</style>
