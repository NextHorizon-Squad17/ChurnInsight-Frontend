import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <button 
      onClick={() => setIsDark(!isDark)}
      className="p-2 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-horizon-cyan hover:scale-110 transition shadow-lg border border-transparent dark:border-horizon-cyan/30"
      title={isDark ? "Mudar para Modo Claro" : "Mudar para Modo Escuro"}
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}