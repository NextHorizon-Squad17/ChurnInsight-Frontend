import { Search } from 'lucide-react';
import { useState } from 'react';
import { SelectedClient } from '../types/dashboard';

interface Props { onSelect: (client: SelectedClient) => void }

export function ClientSearch({ onSelect }: Props) {
  const [term, setTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!term) return;

    // Lógica de simulação "mágica"
    const randomScore = Math.floor(Math.random() * 100);
    const newClient: SelectedClient = {
      id: Date.now(),
      name: term,
      avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${term}&backgroundColor=b6e3f4`, // Gera avatar único
      riskScore: randomScore,
      sentiment: randomScore > 50 ? 'sad' : 'happy'
    };
    onSelect(newClient);
    setTerm('');
  };

  return (
    <div className="bg-white dark:bg-horizon-dark p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800">
      <h3 className="text-slate-700 dark:text-white font-semibold mb-4">Simulação de Risco Individual</h3>
      <form onSubmit={handleSearch} className="flex gap-2">
        <input 
          type="text" 
          placeholder="Digite o nome do cliente..."
          className="flex-1 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-horizon-cyan transition"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
        <button type="submit" className="bg-horizon-blue hover:bg-horizon-cyan text-white p-2 rounded-lg transition-colors shadow-lg">
          <Search />
        </button>
      </form>
    </div>
  );
}