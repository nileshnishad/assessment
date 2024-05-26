<template>
  <div class="p-4">
   <h1 class="text-2xl font-bold mb-4">Customer List</h1>
  <div class="p-4 bg-white rounded">
    <div class="flex items-center mb-4">
      <div class="w-3 h-6 bg-cabdff rounded"></div>
      <h6 class="text-xl px-4">Customer</h6>
      <div class="relative flex items-center flex-grow">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M15 11a4 4 0 11-8 0 4 4 0 018 0z"/>
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search by name or email"
            class="pl-10 py-2 pr-2 bg-gray-100 rounded-lg w-96 focus:outline-none focus:shadow-outline"
            v-model="searchQuery"
          />
          
        </div>
        <button @click="toggleActive" :class="{ 'bg-gray-200': activeSelected }" class="px-4 py-2 mx-2 rounded-md">
          Active
        </button>
        <button @click="toggleNew" :class="{ 'bg-gray-200': newSelected }" class="px-4 py-2 mx-2 rounded-md">
          New
        </button>
        <button @click="filterCustomers" class="p-2 border rounded-md hide-below-900">
          <img src="../assets/images/filter.svg" alt="filter icon" class="w-6 h-6"> 
        </button>
    </div>
    <table class="min-w-full bg-white rounded-lg">
      <thead>
        <tr :class="{'border-t': isTopBorder,'border-b hide-below-900': !isTopBorder}">
          <th class="p-2 ">
            <input type="checkbox" class="checkbox__tick" @click="toggleSelectAll" :checked="areAllSelected">
          </th>
          <th class="px-4 py-2">Name</th>
          <th class="px-4 py-2">Email</th>
          <th class="px-4 py-2">Purchase</th>
          <th class="px-4 py-2">Lifetime</th>
          <th class="px-4 py-2">Comments</th>
          <th class="px-4 py-2">Likes</th>
        </tr>
      </thead>
      <tbody>
          <tr v-for="customer in filteredCustomers" :key="customer.id" :class="{'border-t': isTopBorder, 'border-b': !isTopBorder}">
            <td class="p-2 hide-below-900">
              <input type="checkbox" class="checkbox__tick" :value="customer.id" v-model="selectedCustomers">
            </td>
            <td class="px-4 py-2 flex items-center">
              <img :src="customer.avatar" alt="avatar" class="w-10 h-10 rounded-full mr-2" />
              <div>
                <div class="font-bold clickable hover:text-primary">{{ customer.name }}</div>
                <div class="text-sm text-gray-500">{{ customer.username }}</div>
              </div>
            </td>
            <td class="px-4 py-2 hide-below-900 text-gray-600">{{ customer.email }}</td>
            <td class="px-4 py-2 hide-below-900 text-gray-600">{{ customer.purchase }}</td>
            <td class="px-4 py-2 align-right-lifetime text-gray-600">
              {{ customer.lifetime }}
              <span :class="{'text-red-500': customer.change < 0, 'text-green-500': customer.change >= 0}">
                {{ customer.change }}%
              </span>
            </td>
            <td class="px-4 py-2 hide-below-900 text-gray-600">{{ customer.comments }}</td>
            <td class="px-4 py-2 hide-below-900 text-gray-600">{{ customer.likes }}</td>
          </tr>
        </tbody>
    </table>
  </div>
  <UserCard v-if="userCardVisible" :user="selectedUser" />
</div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useUserDataStore } from '../store/index.js';
import UserCard from '../components/UserCard.vue';
import avatar1 from '@/assets/images/avatar-1.jpg';
import avatar2 from '@/assets/images/avatar-2.jpg';
import avatar3 from '@/assets/images/avatar-2.jpg';
import avatar4 from '@/assets/images/avatar-2.jpg';
import avatar5 from '@/assets/images/avatar-2.jpg';
import avatar6 from '@/assets/images/avatar-2.jpg';
// Import other avatar images as needed

const store = useUserDataStore();

// Example customers data
store.customers = [
  {
    "id": 1,
    "name": "Chelsie Haley",
    "username": "@chelsie",
    "email": "chelsie@ui8.net",
    "purchase": 4,
    "lifetime": "$384",
    "change": -12.8,
    "comments": 8,
    "likes": 16,
    "avatar": avatar1
  },
  {
    "id": 2,
    "name": "Filomena Fahey",
    "username": "@filomena",
    "email": "fahey.designer@robot.co",
    "purchase": 12,
    "lifetime": "$223",
    "change": 2.8,
    "comments": 14,
    "likes": 6,
    "avatar": avatar2
  },
  {
    "id": 3,
    "name": "John Doe",
    "username": "@john",
    "email": "john.doe@example.com",
    "purchase": 5,
    "lifetime": "$500",
    "change": 10.5,
    "comments": 12,
    "likes": 20,
    "avatar": avatar3
  },
  {
    "id": 4,
    "name": "Jane Smith",
    "username": "@jane",
    "email": "jane.smith@example.com",
    "purchase": 8,
    "lifetime": "$300",
    "change": -5.0,
    "comments": 10,
    "likes": 15,
    "avatar": avatar4
  },
  {
    "id": 5,
    "name": "Alice Johnson",
    "username": "@alice",
    "email": "alice.johnson@example.com",
    "purchase": 3,
    "lifetime": "$150",
    "change": 0.0,
    "comments": 5,
    "likes": 7,
    "avatar": avatar5
  },
  {
    "id": 6,
    "name": "Robert Brown",
    "username": "@robert",
    "email": "robert.brown@example.com",
    "purchase": 10,
    "lifetime": "$600",
    "change": 20.0,
    "comments": 18,
    "likes": 25,
    "avatar": avatar6
  }
];

// Reactive properties
const customers = computed(() => store.customers);
const selectedCustomers = ref([]);
const selectedUser = ref(null);
const userCardVisible = ref(false);
const searchQuery = ref('');
const activeSelected = ref(true);
const newSelected = ref(false);
const filteredCustomers = computed(() => {
  return customers.value.filter(customer => 
    customer.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});


const toggleActive = () => {
  activeSelected.value = true;
  newSelected.value = false;
};

const toggleNew = () => {
  newSelected.value = true;
  activeSelected.value = false;
};
// Methods
const areAllSelected = computed(() => {
  return selectedCustomers.value.length === filteredCustomers.value.length;
});
const toggleSelectAll = () => {
  if (areAllSelected.value) {
    handleDeselectAll();
  } else {
    handleSelectAll();
  }
};

const handleSelectAll = () => {
  selectedCustomers.value = filteredCustomers.value.map(customer => customer.id);
};

const handleDeselectAll = () => {
  selectedCustomers.value = [];
};

const filterCustomers = () => {
  // No-op because filteredCustomers is a computed property
};
</script>

<style >
th {
  text-align: left;
}

tbody tr:hover {
  background-color: #f7fafc;
  border-radius: 1rem;
}
tbody tr:first-child:hover {
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
}

tbody tr:last-child:hover {
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
}
@media screen and (max-width: 1024px) {
  .hide-below-900 {
    display: none;
  }
  .align-right-lifetime {
  text-align: right;
}
}
input[type="text"] {
  border-radius: 1rem;
}

input[type="text"]:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(124, 58, 237, 0.25);
}

.focus\:outline-none:focus {
  outline: none;
}

.focus\:shadow-outline:focus {
  box-shadow: 0 0 0 2px rgba(124, 58, 237, 0.25);
}
.text-gray-600 {
  color: #4b5563; /* Adjust this color to match your desired text color */
}

.font-bold {
  font-weight: bold;
}

.clickable {
  cursor: pointer;
}

.checkbox__tick{
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    border-radius: 10px;
    border: 3px solid rgba(111, 118, 126, 0.4);
    transition: all .2s;
}
</style>
