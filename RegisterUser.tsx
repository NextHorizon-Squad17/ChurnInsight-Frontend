import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { NextHorizonLogo } from '../components/Logo';
import { authService } from '../service/api';
import { RegisterUserRequest } from '../types';

export function RegisterUser() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }
    setLoading(true);
    try {
      await authService.register({ name, email, password });
      // After registration, log in the user
      await login({ email, password });
      navigate('/');
    } catch (err) {
      setError('Erro ao registrar usuário.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-gray-900 to-gray-900" />

      <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-2xl shadow-2xl w-full max-w-md relative z-10">
        <div className="flex justify-center mb-8">
          <NextHorizonLogo size="lg" />
        </div>

        <h2 className="text-xl font-bold text-white text-center mb-6">Registrar Novo Usuário</h2>

        {error && <div className="mb-4 p-3 bg-red-500/20 text-red-200 rounded text-center text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Nome</label>
            <input
              type="text"
              required
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 outline-none"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">E-mail</label>
            <input
              type="email"
              required
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 outline-none"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Senha</label>
            <input
              type="password"
              required
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 outline-none"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Confirmar Senha</label>
            <input
              type="password"
              required
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 outline-none"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />
          </div>
          <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-all shadow-[0_0_15px_rgba(37,99,235,0.4)]">
            {loading ? 'Registrando...' : 'Registrar'}
          </button>
        </form>
      </div>
    </div>
  );
}
