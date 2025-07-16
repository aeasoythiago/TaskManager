import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // ajuste conforme necessário
});

// Interceptor de requisição para adicionar o token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Tratamento de erro do interceptor
    console.error('Erro no interceptor de requisição:', error);
    return Promise.reject(error);
  }
);

export default api; 