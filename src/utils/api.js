import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.1.1.105:8080/api',
});

export default api;
