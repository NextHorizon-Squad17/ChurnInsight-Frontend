import { ReactNode } from 'react';
import { Sidebar } from '../components/SideBar';

export function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-900">
      <Sidebar />
      <main className="flex-1 ml-64 p-8 overflow-y-auto relative">
        {/* Background Grid Decoration */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        
        <div className="max-w-6xl mx-auto relative z-10 animate-fade-in">
          {children}
        </div>
      </main>
    </div>
  );
}