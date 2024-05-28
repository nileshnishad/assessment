import { fetchCustomers } from '@/api/api';
import { defineStore } from 'pinia';

export const useUserDataStore = defineStore('userData', {
  state: () => ({
    customers: [],
    loading: false,
    error: null,
    name:"nilesh"
  }),
  getters: {
    
  },
  actions: {
    async getCustomers() {
      this.loading = true;
      this.error = null;
      try {
        const customers = await fetchCustomers();
        this.setCustomers(customers);
      } catch (error) {
        this.error = 'Failed to load customers';
      } finally {
        this.loading = false;
      }
    },
    setCustomers(customers) {
      this.customers = customers;
    },
  },
});
