import axios from 'axios';
import { logout } from '../services/authService';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const BASE_URL = import.meta.env.VITE_BASE_URL;

const apiClient = axios.create({
    baseURL: API_BASE_URL, 
  });
  
  // Add an Axios interceptor to handle token expiration
  apiClient.interceptors.request.use(
    (config) => {
      const accessToken = localStorage.getItem('token');
  
      if (accessToken) {
        // Set the access token in the request headers
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
  
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  apiClient.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response && (error.response.status === 401 )) {
        return logout();
      }
      return Promise.reject(error);
    }
  );

export default apiClient;