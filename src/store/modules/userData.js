import { defineStore } from 'pinia';

export const useUserDataStore = defineStore('userData', {
  state: () => ({
    count: 0,
    customers: [],
    name:"nilesh"
  }),
  getters: {
    doubleCount(state) {
      return state.count * 2;
    },
  },
  actions: {
    increment() {
      this.count++;
    },
    setCustomers(customers) {
      this.customers = customers;
    },
  },
});
