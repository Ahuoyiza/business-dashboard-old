import axios from 'axios';
import { API_URL, X_API_KEY } from '../constants';

const instance = axios.create({
  baseURL: API_URL + '/business',
  headers: {
    'X-API-KEY': X_API_KEY,
  },
});

instance.interceptors.request.use((config) => {
  if (!config.headers) config.headers = {};

  config.headers.Authorization = `Bearer ${localStorage.getItem('business-token')}`;
  return config;
});

export default instance;
