import { Activity, Users, Settings, LogOut } from 'lucide-react';

export function Sidebar() {
  return (
    <aside className="w-64 bg-horizon-dark text-white hidden md:flex flex-col flex-shrink-0 shadow-2xl border-r border-slate-800 transition-all duration-300">
      <div className="h-20 flex items-center px-6 bg-gradient-to-r from-horizon-blue to-horizon-purple/80 border-b border-slate-700">
        <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center font-bold mr-3 border border-horizon-cyan/50 text-horizon-cyan shadow-[0_0_10px_rgba(0,212,255,0.5)]">
          NH
        </div>
        <div>
            <span className="font-bold text-lg tracking-wide text-white block">Next Horizon</span>
            <span className="text-[10px] uppercase tracking-wider text-horizon-gold font-semibold">Squad 17</span>
        </div>
      </div>
      
      <nav className="flex-1 px-4 py-6 space-y-2">
        <a href="#" className="flex items-center px-4 py-3 bg-white/5 border-l-4 border-horizon-cyan text-white rounded-r-lg shadow-lg transition hover:bg-white/10">
          <Activity className="w-5 h-5 mr-3 text-horizon-cyan" />
          Dashboard
        </a>
        <a href="#" className="flex items-center px-4 py-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition group">
          <Users className="w-5 h-5 mr-3 group-hover:text-horizon-purple transition-colors" />
          Clientes
        </a>
        <a href="#" className="flex items-center px-4 py-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition group">
          <Settings className="w-5 h-5 mr-3 group-hover:text-horizon-gold transition-colors" />
          Configurações
        </a>
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button className="flex items-center text-sm text-slate-500 hover:text-horizon-cyan transition w-full">
            <LogOut className="w-4 h-4 mr-2" /> Sair do Sistema
        </button>
      </div>
    </aside>
  );
}