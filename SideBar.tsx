import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, UserPlus, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { NextHorizonLogo } from './Logo';

export function Sidebar() {
  const { logout } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path 
    ? 'bg-blue-600/20 text-blue-400 border-r-2 border-blue-500' 
    : 'text-gray-400 hover:bg-white/5 hover:text-gray-200';

  return (
    <aside className="w-64 bg-gray-900 border-r border-white/10 flex flex-col h-screen fixed left-0 top-0 z-50">
      <div className="p-6 border-b border-white/10 bg-gray-900/50 backdrop-blur-md">
        <NextHorizonLogo size="sm" />
      </div>

      <nav className="flex-1 py-6 space-y-1">
        <Link to="/" className={`flex items-center gap-3 px-6 py-3 transition-all ${isActive('/')}`}>
          <LayoutDashboard size={20} /> Dashboard
        </Link>
        
        <Link to="/register-user" className={`flex items-center gap-3 px-6 py-3 transition-all ${isActive('/register-user')}`}>
          <UserPlus size={20} /> Gestão de Time
        </Link>
      </nav>

      <div className="p-4 border-t border-white/10">
        <button onClick={logout} className="flex items-center gap-3 px-4 py-3 w-full text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
          <LogOut size={20} /> Sair
        </button>
      </div>
    </aside>
  );
}