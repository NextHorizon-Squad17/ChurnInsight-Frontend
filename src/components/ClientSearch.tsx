import { Search } from 'lucide-react';
import { useState } from 'react';
import { SelectedClient } from '../types/dashboard';

interface Props {
  onSelect: (client: SelectedClient) => void;
}

const API_URL = import.meta.env.VITE_API_URL;

export function ClientSearch({ onSelect }: Props) {
  const [term, setTerm] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!term) return;

    try {
      setLoading(true);

      const token = localStorage.getItem('token');

      if (!token) {
        throw new Error('Token de autenticação não encontrado');
      }

      const response = await fetch(`${API_URL}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          customer_id: term
        })
      });

      if (!response.ok) {
        throw new Error('Erro ao buscar predição');
      }

      const data = await response.json();

      const newClient: SelectedClient = {
        id: Date.now(),
        name: term,
        avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${term}&backgroundColor=b6e3f4`,
        riskScore: Math.round(data.probability * 100),
        sentiment: data.risk_level === 'HIGH' ? 'sad' : 'happy',
        prediction: data.prediction,
        riskLevel: data.risk_level,
        retentionStrategy: data.retention_strategy
      };

      onSelect(newClient);
      setTerm('');
    } catch (error) {
      console.error(error);
      alert('Erro ao consultar risco do cliente');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="bg-white dark:bg-horizon-dark p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800">
      <h3 className="text-slate-700 dark:text-white font-semibold mb-4">
        Simulação de Risco Individual
      </h3>

      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          placeholder="Digite o ID do cliente"
          className="flex-1 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-horizon-cyan transition"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          disabled={loading}
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-horizon-blue hover:bg-horizon-cyan text-white p-2 rounded-lg transition-colors shadow-lg disabled:opacity-50"
        >
          <Search />
        </button>
      </form>
    </div>
  );
}
