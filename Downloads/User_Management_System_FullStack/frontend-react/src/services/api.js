import axios from 'axios';

// Prefer env var for deploy; fallback to local dev
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:9090/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// User API calls
export const userAPI = {
    getAllUsers: () => api.get('/users'),
    getUserById: (id) => api.get(`/users/${id}`),
    createUser: (userData) => api.post('/users', userData),
    updateUser: (id, userData) => api.put(`/users/${id}`, userData),
    deleteUser: (id) => api.delete(`/users/${id}`),
    getUsersByStatus: (status) => api.get(`/users/status/${status}`),
};

// Address API calls
export const addressAPI = {
    getAllAddresses: () => api.get('/addresses'),
    getAddressById: (id) => api.get(`/addresses/${id}`),
    getAddressesByUserId: (userId) => api.get(`/addresses/user/${userId}`),
    createAddress: (addressData) => api.post('/addresses', addressData),
    updateAddress: (id, addressData) => api.put(`/addresses/${id}`, addressData),
    deleteAddress: (id) => api.delete(`/addresses/${id}`),
};

export default api;
