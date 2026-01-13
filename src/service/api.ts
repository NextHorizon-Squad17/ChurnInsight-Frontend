import axios from 'axios';
import { PredictionRequest, PredictionResponse } from '../types/dashboard';

// Usa variável de ambiente ou fallback para localhost
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Interceptor: Adiciona o Token automaticamente em TODAS as requisições
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Interceptor: Se der erro 403/401 (Token inválido), desloga o usuário
api.interceptors.response.use(
    response => response,
    error => {
        if (error.response && (error.response.status === 403 || error.response.status === 401)) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            // Opcional: Redirecionar para login via window.location ou evento global
            // window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const churnService = {
    predictChurn: async (data: PredictionRequest): Promise<PredictionResponse> => {
        // Agora a URL é relativa à baseURL
        const response = await api.post<PredictionResponse>('/api/churn/predict', data);
        return response.data;
    }
};