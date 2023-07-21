import axios from 'axios';
import {retrieveProfile} from '../services/authService';
const api = axios.create({
  baseURL: 'http://10.1.1.105:8080/api',
});
const getHeaders = async () => {
  const profile = await retrieveProfile();
  const headers: {[key: string]: string} = {};

  if (profile && profile.token) {
    headers.Authorization = `Bearer ${profile.token}`;
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
export default api;
