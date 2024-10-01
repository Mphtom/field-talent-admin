
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const config ={
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json'
  }

}

const api = axios.create(config);

api.interceptors.request.use(
  (config) => {

    const user = localStorage.getItem('user');

    const token =JSON.parse(user).token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) =>{return Promise.reject(error)}
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401 && error.response.data === 'invalid signature') {
      localStorage.removeItem('user');

      window.location.href = '/login';
    }
   

    return Promise.reject(error)
  }
);

const apiService = {

  loginAdmin: (credentials) => api.post('/login', credentials),
};
export {api};
export default apiService;
