import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000', // URL da sua API FastAPI
});

export default api;
