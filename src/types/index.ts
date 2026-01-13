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

// Reutilizando os tipos do dashboard que já existiam
export interface DashboardData {
    churnScore: number;
    totalCustomers: number;
    accuracy: number;
    riskDistribution: number[];
}