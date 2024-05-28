<template>
  <div class="p-4 relative container mx-auto items-center">
    <h1 class="text-2xl font-bold mb-4">Customer List</h1>
    <div
      v-if="!isUserCardVisible || isLargeScreen"
      class="p-4 bg-white rounded"
    >
      <div class="flex flex-col md:flex-row mb-4 justify-between">
        <div class="flex mb-2 md:mb-0 items-center">
          <div class="w-4 h-7 bg-cabdff rounded"></div>
          <h6 class="px-4 text-20x">Customer</h6>
          <div class="relative flex items-center flex-grow md:ml-4">
            <div
              class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
            >
              <svg
                class="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-4.35-4.35M15 11a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search by name or email"
              class="pl-10 py-2 pr-2 bg-gray-100 rounded-lg w-full md:w-96 focus:outline-none focus:shadow-outline"
              v-model="searchQuery"
            />
          </div>
        </div>
        <div class="flex flex-col md:flex-row">
          <div class="flex gap-2 md:gap-4">
            <button
              @click="toggleActive"
              :class="{ 'bg-gray-200': activeSelected }"
              class="px-4 text-15x md:w-auto w-half rounded-md"
            >
              Active
            </button>
            <button
              @click="toggleNew"
              :class="{ 'bg-gray-200': newSelected }"
              class="px-4 text-15x md:w-auto w-half rounded-md"
            >
              New
            </button>
          </div>
          <button
            @click="filterCustomers"
            class="p-2 border rounded-md md:ml-4 mt-4 md:mt-0 hide-below-900"
          >
            <img
              src="../assets/images/filter.svg"
              alt="filter icon"
              class="w-6 h-6"
            />
          </button>
        </div>
      </div>

      <div class="flex">
        <div
          :class="{
            'w-1/3': isUserCardVisible && isLargeScreen,
            'w-full': !isUserCardVisible,
          }"
        >
          <table class="min-w-full bg-white rounded-lg">
            <thead>
              <tr
                :class="{
                  'border-t': isTopBorder,
                  'border-b hide-below-900': !isTopBorder,
                }"
              >
                <th class="p-2">
                  <input
                    type="checkbox"
                    class="checkbox__tick"
                    @click="toggleSelectAll"
                    :checked="areAllSelected"
                  />
                </th>
                <th class="px-4 py-2 text-12x">Name</th>
                <th v-if="!isUserCardVisible" class="px-4 py-2 text-12x">Email</th>
                <th v-if="!isUserCardVisible" class="px-4 py-2 text-12x">Purchase</th>
                <th v-if="!isUserCardVisible" class="px-4 py-2 text-12x">Lifetime</th>
                <th v-if="!isUserCardVisible" class="px-4 py-2 text-12x">Comments</th>
                <th v-if="!isUserCardVisible" class="px-4 py-2 text-12x">Likes</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="customer in filteredCustomers"
                :key="customer.id"
                :class="{ 'border-t': isTopBorder, 'border-b': !isTopBorder }"
              >
                <td
                  class="p-2 hide-below-900"
                  :class="{
                    'bg-gray-100 ': isUserCardVisible && isSelected(customer),
                  }"
                >
                  <input
                    type="checkbox"
                    class="checkbox__tick"
                    :value="customer.id"
                    v-model="selectedCustomers"
                  />
                </td>
                <td
                  class="p-2 flex items-center relative"
                  :class="{
                    'bg-gray-100': isUserCardVisible && isSelected(customer),
                  }"
                >
                  <img
                    :src="getImageUrl(customer.avatar)"
                    alt="avatar"
                    class="w-10 h-10 rounded-full mr-2"
                  />
                  <div>
                    <div
                      class="text-15x clickable hover:text-primary "
                      @click="showUserCard(customer)"
                    >
                      {{ customer.name }}
                    </div>
                    <div class="text-13x">
                      {{ customer.username }}
                    </div>
                  </div>
                  <div
                    v-if="isUserCardVisible && isSelected(customer)"
                    :class="{ 'arrow-icon': isSelected(customer) }"
                  >
                    <svg
                      class="w-6 h-6 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </td>
                <td
                  v-if="!isUserCardVisible"
                  class="px-4 py-2 text-14x hide-below-900 text-gray-600"
                >
                  {{ customer.email }}
                </td>
                <td
                  v-if="!isUserCardVisible"
                  class="px-4 py-2 text-14x hide-below-900 "
                >
                <div class="bg-b5e4ca text-style float-left rounded"> {{ customer.purchase }}</div>
                  
                </td>
                <td
                  v-if="!isUserCardVisible"
                  class="px-4 py-2 text-15x align-right-lifetime text-gray-600"
                >
                  {{ customer.lifetime }}
                  <span
                    :class="{
                      'text-red-500': customer.change < 0,
                      'text-green-500': customer.change >= 0,
                    }"
                  >
                    {{ customer.change }}%
                  </span>
                </td>
                <td
                  v-if="!isUserCardVisible"
                  class="px-4 py-2 text-15x hide-below-900 text-gray-600"
                >
                  {{ customer.comments }}
                </td>
                <td
                  v-if="!isUserCardVisible"
                  class="px-4 py-2 text-15x hide-below-900 text-gray-600"
                >
                  {{ customer.likes }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          :class="{
            'w-2/3 mt-10': isUserCardVisible && isLargeScreen,
            'w-full': isUserCardVisible && !isLargeScreen,
            hidden: !isUserCardVisible,
          }"
        >
          <UserCard
            v-if="isUserCardVisible"
            :user="selectedUser"
            @closeCard="closeUserCard"
          />
        </div>
      </div>
    </div>
    <UserCard
      v-if="isUserCardVisible && !isLargeScreen"
      :user="selectedUser"
      @closeCard="closeUserCard"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useUserDataStore } from "../store/index.js";
import UserCard from "../components/UserCard.vue";


// Reactive properties
const customers = computed(() => store.customers);
const selectedCustomers = ref([]);
const selectedUser = ref(null);
const userCardVisible = ref(false);
const searchQuery = ref("");
const activeSelected = ref(true);
const newSelected = ref(false);
const isUserCardVisible = ref(false);
const isLargeScreen = ref(window.innerWidth > 1024);
const store = useUserDataStore();

onMounted(() => {
  store.getCustomers();
  window.addEventListener("resize", handleResize);
});

const handleResize = () => {
  isLargeScreen.value = window.innerWidth > 1024;
};

const filteredCustomers = computed(() => {
  const query = searchQuery.value.toLowerCase();
  return customers.value.filter(
    (customer) =>
      customer.name.toLowerCase().includes(query) ||
      customer.email.toLowerCase().includes(query)
  );
});
const filterCustomers = () => {
  searchQuery.value = "";
};

const showUserCard = (customer) => {
  selectedUser.value = customer;
  userCardVisible.value = true;
  isUserCardVisible.value = true;
};
const isSelected = (customer) => {
  return customer === selectedUser.value;
};

const toggleActive = () => {
  activeSelected.value = true;
  newSelected.value = false;
};

const toggleNew = () => {
  newSelected.value = true;
  activeSelected.value = false;
};
const closeUserCard = () => {
  isUserCardVisible.value = false;
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
  selectedCustomers.value = filteredCustomers.value.map(
    (customer) => customer.id
  );
};

const handleDeselectAll = () => {
  selectedCustomers.value = [];
};

const requireContext = require.context('@/assets/images', false, /\.(png|jpe?g|svg)$/);
const getImageUrl = (imageName) => {
  return requireContext(`./${imageName}`);
};
</script>

<style scoped>
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

.checkbox__tick {
  flex-shrink: 0;
  width: 15px;
  height: 15px;
  border-radius: 10px;
  border: 2px solid rgba(111, 118, 126, 0.4);
  transition: all 0.2s;
}

button.absolute {
  z-index: 10;
}
.w-half {
  width: 50%;
}
.arrow-icon {
  position: absolute;
  top: 18px;
  right: 21px;
}
.text-style{
  display: inline-block;
    padding: 0 8px;
    border-radius: 6px;
    font-size: 12px;
    line-height: 24px;
    font-weight: 700;
}
</style>
