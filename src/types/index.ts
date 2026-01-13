// src/types/index.ts

// 1. Re-exporta tudo de dashboard.ts
// Isso permite que você importe qualquer coisa usando apenas: import { ... } from '../types';
export * from './dashboard';

// 2. Definições de Usuário (Auth)
export interface User {
    id: string;
    username: string;
    role: 'ADMIN' | 'USER';
}

export interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (token: string, userData: User) => void;
    logout: () => void;
}