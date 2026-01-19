import axios from 'axios';
import { PredictionRequest, PredictionResponse } from '../types/dashboard';

// Pega URL do ambiente ou usa localhost como padrão
const BASE_URL = import.meta.env.VITE_API_URL;

export const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Interceptor para adicionar Token (se existir)
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const churnService = {
    predictChurn: async (data: PredictionRequest): Promise<PredictionResponse> => {
        // CORREÇÃO: A rota no backend é apenas '/predict', não '/api/churn/predict'
        const response = await api.post<PredictionResponse>('/predict', data);
        return response.data;
    }
};