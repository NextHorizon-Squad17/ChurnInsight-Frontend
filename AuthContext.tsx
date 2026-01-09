import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { authService } from '../service/api';
import { LoginRequest } from '../types';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (data: LoginRequest) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('churn_token');
    if (token) setIsAuthenticated(true);
    setLoading(false);
  }, []);

  const login = async (data: LoginRequest) => {
    try {
      const response = await authService.login(data);
      localStorage.setItem('churn_token', response.token);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Erro de Login", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('churn_token');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);