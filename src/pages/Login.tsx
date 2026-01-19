import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import Logo from '../components/Logo';
import { api } from '../service/api';

export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Ajuste a rota conforme seu Backend AuthController
            const response = await api.post('/auth/login', formData);
            
            // Assume que o backend retorna { token: "...", user: { ... } }
            // Se o backend retornar só o token, você precisará decodificar ou ajustar aqui
            const { token } = response.data;
            
            // Simulando dados do usuário se o backend não retornar o objeto user completo
            // O ideal é o backend retornar user: { username, role, id } junto com o token
            const userData = { 
                id: '1', 
                email: formData.email, 
                role: formData.email === 'admin' ? 'ADMIN' : 'USER' 
            }; 

            login(token, userData as any); // Type assertion temporário
            navigate('/dashboard');
        } catch (err) {
            setError('Falha no login. Verifique suas credenciais.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 p-4">
            <div className="w-full max-w-md bg-slate-900 p-8 rounded-xl border border-slate-800 shadow-2xl">
                <div className="flex justify-center mb-6"><Logo /></div>
                <h2 className="text-2xl font-bold text-white mb-6 text-center">Acessar Plataforma</h2>
                
                {error && <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded text-red-400 text-sm">{error}</div>}

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="text-slate-400 text-sm">E-mail</label>
                        <input 
                            type="email" 
                            required
                            className="w-full bg-slate-800 border border-slate-700 rounded p-3 text-white focus:border-blue-500 outline-none"
                            value={formData.email}
                            onChange={e => setFormData({...formData, email: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="text-slate-400 text-sm">Senha</label>
                        <input 
                            type="password" 
                            required
                            className="w-full bg-slate-800 border border-slate-700 rounded p-3 text-white focus:border-blue-500 outline-none"
                            value={formData.password}
                            onChange={e => setFormData({...formData, password: e.target.value})}
                        />
                    </div>
                    <button 
                        type="submit" 
                        disabled={loading}
                        className={`w-full font-bold py-3 rounded transition ${loading ? 'bg-slate-700 text-slate-400' : 'bg-blue-600 hover:bg-blue-500 text-white'}`}
                    >
                        {loading ? 'Entrando...' : 'Entrar'}
                    </button>
                </form>
                <p className="mt-6 text-center text-slate-500">
                    Não tem conta? <Link to="/register" className="text-blue-400 hover:underline">Crie agora</Link>
                </p>
            </div>
        </div>
    );
}