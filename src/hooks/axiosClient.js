import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,headers:{'Content-Type': 'application/json','Accept': 'application/json'}});
axiosInstance.interceptors.request.use(
  function (config) {
    if (config.url !== '/') {
      const  token  = JSON.parse(localStorage.getItem('token'));
      config.headers.Authorization = token ? `Bearer ${token}` : '';
    }
    return config;
  },
  (error) => {
    toast.error(error)
    return Promise.reject(error);
  },
);
