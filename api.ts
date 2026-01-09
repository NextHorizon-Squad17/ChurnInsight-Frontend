import axios from 'axios';
import { 
  LoginRequest, 
  AuthResponse, 
  RegisterUserRequest, 
  RegisterUserResponse, 
  ChurnPredictionRequest, 
  ChurnPredictionResponse 
} from '../types';

const api = axios.create({
  baseURL: 'http://localhost:8080', // Endereço do Backend Java
});

// Interceptor: Adiciona o Token JWT em todas as requisições
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('churn_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', data);
    return response.data;
  },
  
  // Novo método para criar usuários (Requer ADMIN)
  register: async (data: RegisterUserRequest): Promise<RegisterUserResponse> => {
    const response = await api.post<RegisterUserResponse>('/auth/register', data);
    return response.data;
  }
};

export const predictionService = {
  predict: async (data: ChurnPredictionRequest): Promise<ChurnPredictionResponse> => {
    const response = await api.post<ChurnPredictionResponse>('/predict', data);
    return response.data;
  }
};