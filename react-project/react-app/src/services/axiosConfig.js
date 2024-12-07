import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api',  // API base URL
  headers: {
    'Content-Type': 'application/json',  // Set default content type for requests
  },
});

export default axiosInstance;
