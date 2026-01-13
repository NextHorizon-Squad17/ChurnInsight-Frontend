import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const AdminRoute = () => {
    const { user, isAuthenticated } = useAuth();

    // 1. Se não tá logado, manda pro login
    if (!isAuthenticated) return <Navigate to="/login" />;

    // 2. Se tá logado mas não é ADMIN, manda pro dashboard comum
    if (user?.role !== 'ADMIN') {
        alert("Acesso restrito a administradores!");
        return <Navigate to="/dashboard" />;
    }

    // 3. Se é Admin, libera o acesso
    return <Outlet />;
};