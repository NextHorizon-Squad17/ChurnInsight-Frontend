import axios from 'axios';

export const api = axios.create({
  // Pega a URL do arquivo .env ou usa o padrão localhost:8080
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});