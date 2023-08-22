import axios, {AxiosRequestConfig} from 'axios';
import {retrieveProfile, updateTokenInStorage} from '../services/authService';
const api = axios.create({
  baseURL: 'http://192.168.0.12:8080/api',
});
const getHeaders = async () => {
  const profile = await retrieveProfile();
  const headers: {[key: string]: string} = {};

  if (profile && profile.token) {
    headers.Authorization = `Bearer ${profile.token}`;
    headers.user = `User ${profile.profile.userId}`;
  }
  return headers;
};

api.interceptors.request.use(
  async (config: any) => {
    const headers = await getHeaders();
    return {...config, headers};
  },
  error => Promise.reject(error),
);
let isRefreshing = false;
api.interceptors.response.use(
  response => response,
  async error => {
    const errorMessage = error?.response?.data?.message || '';
    if (errorMessage.includes('Expired JWT token')) {
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const newToken = error.response.data.newToken;
          await updateTokenInStorage(newToken);
          const originalRequest = error.config as AxiosRequestConfig;
          originalRequest.headers!.Authorization = `Bearer ${newToken}`;
          isRefreshing = false;
          return api(originalRequest);
        } catch (refreshError) {
          isRefreshing = false;
          return Promise.reject(error);
        }
      }
    }

    return Promise.reject(error);
  },
);

export default api;
