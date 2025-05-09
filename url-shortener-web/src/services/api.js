import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',  // Set the base URL for your API
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;  // Attach token to all requests
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
