import { Outlet, Navigate } from 'react-router';
import { Sidebar } from '../components/Sidebar';
import { useAuth } from '../contexts/AuthContext';

export default function MainLayout() {
    const { isAuthenticated } = useAuth();

    // Proteção de rota: Se não estiver logado, manda pro Login
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="flex h-screen bg-slate-900 text-slate-200 overflow-hidden">
            <Sidebar />
            <main className="flex-1 flex flex-col w-full overflow-y-auto p-8 relative">
                <Outlet /> {/* Aqui entra o Dashboard ou outras páginas */}
            </main>
        </div>
    );
}