import axios from 'axios';



const apiClient = axios.create({
  baseURL: 'https://mockapi-two.vercel.app', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchCustomers = async () => {
  try {
    const response = await apiClient.get('/customers');
    return response.data;
  } catch (error) {
    console.error('Error fetching customers:', error);
    throw error;
  }
};
