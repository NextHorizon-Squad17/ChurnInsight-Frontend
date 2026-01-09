// --- Auth DTOs ---

export interface LoginRequest {
  email: string;
  password?: string;
}

export interface AuthResponse {
  token: string;
}

// Novo DTO de Registro (Baseado em RegisterUserRequest.java)
export interface RegisterUserRequest {
  name: string;
  email: string;
  password: string;
}

export interface RegisterUserResponse {
  id?: string;
  name: string;
  email: string;
}

// --- Data Science DTOs ---

export interface ChurnPredictionRequest {
  // Mantendo snake_case para compatibilidade direta com o Java
  tempo_contrato_meses: number; 
  atrasos_pagamento: number;    
  uso_mensal: number;           
  plano: string;                
}

export interface ChurnPredictionResponse {
  previsao: string;
  probabilidade: number;
}

declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}
