import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Logo } from '../components/Logo'; // Vamos criar esse simples abaixo
import axios from 'axios';

export function RegisterUser() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ username: '', password: '', role: 'USER' });
    const [error, setError] = useState('');

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/auth/register', formData);
            alert('Usuário criado com sucesso!');
            navigate('/login');
        } catch (err) {
            setError('Erro ao criar conta. Tente outro usuário.');
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 p-4">
            <div className="w-full max-w-md bg-slate-900 p-8 rounded-xl border border-slate-800 shadow-2xl">
                <div className="flex justify-center mb-6"><Logo /></div>
                <h2 className="text-2xl font-bold text-white mb-6 text-center">Criar Nova Conta</h2>
                
                {error && <p className="text-red-400 text-sm mb-4 bg-red-900/20 p-2 rounded">{error}</p>}

                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label className="text-slate-400 text-sm">Usuário</label>
                        <input 
                            type="text" 
                            className="w-full bg-slate-800 border border-slate-700 rounded p-3 text-white focus:border-blue-500 outline-none"
                            value={formData.username}
                            onChange={e => setFormData({...formData, username: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="text-slate-400 text-sm">Senha</label>
                        <input 
                            type="password" 
                            className="w-full bg-slate-800 border border-slate-700 rounded p-3 text-white focus:border-blue-500 outline-none"
                            value={formData.password}
                            onChange={e => setFormData({...formData, password: e.target.value})}
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded transition">
                        Registrar
                    </button>
                </form>
                <p className="mt-6 text-center text-slate-500">
                    Já tem conta? <Link to="/login" className="text-blue-400 hover:underline">Faça Login</Link>
                </p>
            </div>
        </div>
    );
}